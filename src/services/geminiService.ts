import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getChatResponse(message: string, history: { role: "user" | "model"; parts: { text: string }[] }[]) {
  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: `Bạn là một trợ lý ảo chuyên về Hóa học lớp 12, đặc biệt là Chương 1: Ester - Lipid - Xà phòng và Chất giặt rửa. 
        Hãy trả lời các câu hỏi của học sinh một cách dễ hiểu, chính xác dựa trên kiến thức sách giáo khoa. 
        Nếu học sinh hỏi ngoài lề, hãy khéo léo dẫn dắt quay lại chủ đề học tập.
        Sử dụng tiếng Việt tự nhiên, thân thiện.
        QUY TẮC TRẢ LỜI:
        - Trả lời dạng văn bản thuần, KHÔNG dùng Markdown.
        - KHÔNG dùng các ký hiệu: #, *, **.
        - Chỉ dùng câu ngắn, xuống dòng, hoặc gạch đầu dòng bằng dấu -.
        - Khi viết công thức hóa học, luôn dùng ký tự chỉ số dưới Unicode (₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉ ₀), ví dụ: H₂O, CO₂.`,
      },
    });

    // Note: sendMessage only takes the message string, but we can't easily pass history in this simple SDK call without more complex setup.
    // However, for this app, we'll just send the last message or a concatenated context if needed.
    // To keep it simple and robust per guidelines:
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Xin lỗi, mình đang gặp chút trục trặc kỹ thuật. Bạn thử lại sau nhé!";
  }
}
