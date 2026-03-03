import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  MessageSquare, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  XCircle, 
  Send, 
  Menu, 
  X,
  GraduationCap,
  BrainCircuit,
  HelpCircle,
  Trophy,
  Target,
  AlertCircle
} from 'lucide-react';
import { lessons, Lesson, Section, Question } from './data/lessons';
import { getChatResponse } from './services/geminiService';

export default function App() {
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [revealedQuestions, setRevealedQuestions] = useState<Set<number>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentLesson = lessons[currentLessonIdx];
  const currentSection = currentLesson.sections[currentSectionIdx];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleAnswer = (questionId: number, optionIdx: number) => {
    if (revealedQuestions.has(questionId)) return;
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
    setRevealedQuestions(prev => {
      const next = new Set(prev);
      next.add(questionId);
      return next;
    });
  };

  const handleSubmitQuiz = () => {
    setSubmitted(true);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setRevealedQuestions(new Set());
    setSubmitted(false);
    setShowQuiz(false);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    const newMessage = { role: 'user' as const, text: userInput };
    setChatMessages(prev => [...prev, newMessage]);
    setUserInput('');
    setIsTyping(true);

    const response = await getChatResponse(userInput, chatMessages.map(m => ({ role: m.role, parts: [{ text: m.text }] })));
    setChatMessages(prev => [...prev, { role: 'model', text: response || '' }]);
    setIsTyping(false);
  };

  const scoreOutOf10 = currentSection.questions.length > 0 
    ? ((currentSection.questions.reduce((acc, q) => acc + (quizAnswers[q.id] === q.correctAnswer ? 1 : 0), 0) / currentSection.questions.length) * 10).toFixed(1)
    : "0.0";

  const correctCount = currentSection.questions.reduce((acc, q) => {
    return acc + (quizAnswers[q.id] === q.correctAnswer ? 1 : 0);
  }, 0);

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'major_consolidation': return <Target size={16} />;
      case 'final_consolidation': return <Trophy size={16} />;
      default: return <BookOpen size={16} />;
    }
  };

  const getSectionColor = (type: string) => {
    switch (type) {
      case 'major_consolidation': return 'bg-orange-500';
      case 'final_consolidation': return 'bg-rose-500';
      default: return 'bg-teal-600';
    }
  };

  return (
    <div className="min-h-screen bg-teal-50 text-teal-950 font-sans flex overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 320 : 0, opacity: isSidebarOpen ? 1 : 0 }}
        className="bg-white border-r border-teal-100 flex-shrink-0 relative z-20 shadow-xl overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-teal-600 p-2 rounded-lg text-white">
              <GraduationCap size={24} />
            </div>
            <h1 className="font-bold text-xl tracking-tight text-teal-900">Hóa Học 12</h1>
          </div>

          <nav className="space-y-6">
            {lessons.map((lesson, lIdx) => (
              <div key={lesson.id} className="space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-widest text-teal-500 px-2">
                  {lesson.title}
                </h2>
                <div className="space-y-1">
                  {lesson.sections.map((section, sIdx) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        setCurrentLessonIdx(lIdx);
                        setCurrentSectionIdx(sIdx);
                        resetQuiz();
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                        currentLessonIdx === lIdx && currentSectionIdx === sIdx
                          ? `${getSectionColor(section.type)} text-white shadow-md`
                          : 'hover:bg-teal-50 text-teal-700'
                      }`}
                    >
                      {getSectionIcon(section.type)}
                      <span className="truncate">{section.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-bottom border-teal-100 flex items-center justify-between px-6 sticky top-0 z-10">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-teal-50 rounded-lg text-teal-600 transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm font-medium text-teal-600">
              <span>{currentLesson.title}</span>
              <ChevronRight size={14} />
              <span className="text-teal-900">{currentSection.title}</span>
            </div>
          </div>

          <button 
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-teal-700 transition-all shadow-lg shadow-teal-200"
          >
            <BrainCircuit size={18} />
            <span>Hỏi AI</span>
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {(!showQuiz && currentSection.type === 'theory') ? (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-teal-100"
                >
                  <div className="flex items-center gap-2 text-teal-600 mb-4 font-semibold uppercase tracking-wider text-xs">
                    <BookOpen size={16} />
                    <span>Kiến thức trọng tâm</span>
                  </div>
                  <h2 className="text-3xl font-bold text-teal-900 mb-8">{currentSection.title}</h2>
                  
                  <div 
                    className="prose prose-teal max-w-none 
                      prose-h3:text-teal-800 prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-4
                      prose-p:text-teal-700 prose-p:leading-relaxed prose-p:mb-4
                      prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
                      prose-li:text-teal-700 prose-li:mb-2"
                    dangerouslySetInnerHTML={{ __html: currentSection.content || '' }}
                  />

                  <div className="mt-12 pt-8 border-t border-teal-50 flex justify-between items-center">
                    <button 
                      onClick={() => {
                        if (currentSectionIdx > 0) {
                          setCurrentSectionIdx(currentSectionIdx - 1);
                        } else if (currentLessonIdx > 0) {
                          setCurrentLessonIdx(currentLessonIdx - 1);
                          setCurrentSectionIdx(lessons[currentLessonIdx - 1].sections.length - 1);
                        }
                        resetQuiz();
                      }}
                      disabled={currentLessonIdx === 0 && currentSectionIdx === 0}
                      className="flex items-center gap-2 text-teal-600 font-medium hover:text-teal-800 disabled:opacity-30"
                    >
                      <ChevronLeft size={20} />
                      Bài trước
                    </button>
                    
                    <button 
                      onClick={() => setShowQuiz(true)}
                      className="bg-teal-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-teal-700 transition-all shadow-xl shadow-teal-100 flex items-center gap-2"
                    >
                      Luyện tập mục này
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between mb-4">
                    {currentSection.type === 'theory' ? (
                      <button 
                        onClick={() => setShowQuiz(false)}
                        className="flex items-center gap-2 text-teal-600 font-medium"
                      >
                        <ChevronLeft size={20} />
                        Quay lại lý thuyết
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-teal-600 font-bold uppercase tracking-widest text-sm">
                        {getSectionIcon(currentSection.type)}
                        <span>{currentSection.title}</span>
                      </div>
                    )}
                    <div className="bg-teal-100 text-teal-700 px-4 py-1 rounded-full text-sm font-bold">
                      {currentSection.questions.length} Câu hỏi
                    </div>
                  </div>

                  {currentSection.type !== 'theory' && (
                    <div className="bg-teal-600 text-white p-6 rounded-3xl shadow-lg flex items-center gap-6">
                      <div className="bg-white/20 p-4 rounded-2xl">
                        {currentSection.type === 'major_consolidation' ? <Target size={32} /> : <Trophy size={32} />}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{currentSection.title}</h3>
                        <p className="text-teal-100 text-sm">Củng cố kiến thức quan trọng và khắc phục các lỗi thường gặp.</p>
                      </div>
                    </div>
                  )}

                  {currentSection.questions.map((q, idx) => (
                    <div key={q.id} className="bg-white rounded-2xl p-6 shadow-sm border border-teal-100">
                      <div className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center font-bold text-sm">
                          {idx + 1}
                        </span>
                        <div className="flex-1">
                          <p className="text-lg font-semibold text-teal-900 mb-6">{q.text}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {q.options.map((option, oIdx) => (
                              <button
                                key={oIdx}
                                onClick={() => handleAnswer(q.id, oIdx)}
                                className={`text-left p-4 rounded-xl border-2 transition-all ${
                                  quizAnswers[q.id] === oIdx
                                    ? revealedQuestions.has(q.id)
                                      ? oIdx === q.correctAnswer
                                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                                        : 'bg-rose-50 border-rose-500 text-rose-900'
                                      : 'bg-teal-50 border-teal-500 text-teal-900'
                                    : revealedQuestions.has(q.id) && oIdx === q.correctAnswer
                                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                                      : 'bg-white border-teal-50 hover:border-teal-200 text-teal-700'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{option}</span>
                                  {revealedQuestions.has(q.id) && oIdx === q.correctAnswer && <CheckCircle2 size={18} className="text-emerald-600" />}
                                  {revealedQuestions.has(q.id) && quizAnswers[q.id] === oIdx && oIdx !== q.correctAnswer && <XCircle size={18} className="text-rose-600" />}
                                </div>
                              </button>
                            ))}
                          </div>

                          {revealedQuestions.has(q.id) && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-6 p-4 bg-teal-50 rounded-xl border border-teal-100"
                            >
                              <div className="flex items-center gap-2 text-teal-700 font-bold mb-2">
                                <HelpCircle size={16} />
                                <span>Giải thích:</span>
                              </div>
                              <p className="text-sm text-teal-800 leading-relaxed">{q.explanation}</p>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex flex-col items-center gap-6 py-10">
                    {!submitted ? (
                      <button 
                        onClick={handleSubmitQuiz}
                        disabled={revealedQuestions.size < currentSection.questions.length}
                        className="bg-teal-600 text-white px-12 py-4 rounded-2xl font-bold hover:bg-teal-700 transition-all shadow-xl shadow-teal-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Xem kết quả tổng kết
                      </button>
                    ) : (
                      <div className="text-center space-y-6 w-full max-w-md mx-auto">
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-teal-100">
                          <h3 className="text-2xl font-bold text-teal-900 mb-2">Điểm số</h3>
                          <div className="text-6xl font-black text-teal-600 mb-4">
                            {scoreOutOf10}<span className="text-2xl text-teal-300">/10</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-teal-600 font-medium mb-4">
                            <CheckCircle2 size={18} />
                            <span>Đúng {correctCount}/{currentSection.questions.length} câu</span>
                          </div>
                          <p className="text-teal-600 font-medium">
                            {parseFloat(scoreOutOf10) >= 8 
                              ? "Tuyệt vời! Bạn đã nắm vững kiến thức." 
                              : parseFloat(scoreOutOf10) >= 5
                                ? "Khá tốt! Hãy xem lại các câu sai nhé."
                                : "Bạn cần ôn tập kỹ hơn phần này."}
                          </p>
                        </div>
                        
                        <div className="flex gap-4 justify-center">
                          <button 
                            onClick={resetQuiz}
                            className="bg-white text-teal-600 border-2 border-teal-600 px-8 py-3 rounded-2xl font-bold hover:bg-teal-50 transition-all"
                          >
                            Làm lại
                          </button>
                          <button 
                            onClick={() => {
                              if (currentSectionIdx < currentLesson.sections.length - 1) {
                                setCurrentSectionIdx(currentSectionIdx + 1);
                                resetQuiz();
                              } else if (currentLessonIdx < lessons.length - 1) {
                                setCurrentLessonIdx(currentLessonIdx + 1);
                                setCurrentSectionIdx(0);
                                resetQuiz();
                              }
                            }}
                            className="bg-teal-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-100"
                          >
                            Tiếp tục học
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Chatbot Overlay */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChatOpen(false)}
              className="fixed inset-0 bg-teal-900/20 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-teal-50 flex items-center justify-between bg-teal-600 text-white">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <BrainCircuit size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold">Trợ lý Hóa Học AI</h3>
                    <p className="text-xs text-teal-100">Luôn sẵn sàng hỗ trợ bạn</p>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-teal-50/30">
                {chatMessages.length === 0 && (
                  <div className="text-center py-10">
                    <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-teal-100">
                      <HelpCircle size={32} className="text-teal-400" />
                    </div>
                    <p className="text-teal-600 font-medium">Chào bạn! Bạn có thắc mắc gì về Ester hay Lipid không?</p>
                    <p className="text-xs text-teal-400 mt-2">Ví dụ: "Ester là gì?", "Cách gọi tên ethyl acetate?"</p>
                  </div>
                )}
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-teal-600 text-white rounded-tr-none' 
                        : 'bg-white text-teal-900 shadow-sm border border-teal-100 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-teal-100 rounded-tl-none flex gap-1">
                      <span className="w-1.5 h-1.5 bg-teal-300 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-teal-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-teal-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-4 border-t border-teal-50 bg-white">
                <div className="relative">
                  <input 
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Nhập câu hỏi của bạn..."
                    className="w-full bg-teal-50 border-none rounded-2xl py-4 pl-4 pr-12 text-sm focus:ring-2 focus:ring-teal-500 transition-all"
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
