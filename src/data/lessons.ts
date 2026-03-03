export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Section {
  id: string;
  type: 'theory' | 'major_consolidation' | 'final_consolidation';
  title: string;
  content?: string;
  questions: Question[];
}

export interface Lesson {
  id: number;
  title: string;
  sections: Section[];
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "Bài 1: Ester - Lipid",
    sections: [
      {
        id: "1-I-1",
        type: "theory",
        title: "1. Khái niệm và Cấu tạo Ester",
        content: `
          <p>Khi thay nhóm -OH trong nhóm carboxyl của carboxylic acid bằng nhóm -OR' thì được ester.</p>
          <p>Công thức chung của ester đơn chức, mạch hở: CₙH₂ₙO₂ (n ≥ 2).</p>
          <p>Cấu tạo: R-COO-R' (R là gốc hydrocarbon hoặc H, R' là gốc hydrocarbon).</p>
        `,
        questions: [
          { id: 1, text: "Ester đơn chức có nhóm chức là gì?", options: ["-COOH", "-OH", "-COO-", "-CHO"], correctAnswer: 2, explanation: "Nhóm chức của ester là -COO-." },
          { id: 2, text: "Công thức tổng quát của ester no, đơn chức, mạch hở là:", options: ["CₙH₂ₙ₊₂O₂", "CₙH₂ₙO₂", "CₙH₂ₙ₋₂O₂", "CₙH₂ₙO"], correctAnswer: 1, explanation: "Ester no, đơn chức, mạch hở có công thức CₙH₂ₙO₂ với n ≥ 2." },
          { id: 3, text: "Trong phân tử ester R-COO-R', gốc R' không thể là:", options: ["-CH₃", "-C₂H₅", "-H", "-C₆H₅"], correctAnswer: 2, explanation: "R' phải là gốc hydrocarbon, không thể là nguyên tử H (nếu là H thì là acid)." },
          { id: 4, text: "Số đồng phân ester ứng với công thức C₂H₄O₂ là:", options: ["1", "2", "3", "4"], correctAnswer: 0, explanation: "Chỉ có 1 đồng phân là HCOOCH₃ (methyl formate)." },
          { id: 5, text: "Số đồng phân ester ứng với công thức C₃H₆O₂ là:", options: ["1", "2", "3", "4"], correctAnswer: 1, explanation: "Có 2 đồng phân: HCOOC₂H₅ và CH₃COOCH₃." }
        ]
      },
      {
        id: "1-I-2",
        type: "theory",
        title: "2. Danh pháp Ester",
        content: `
          <p>Tên ester = Tên gốc hydrocarbon R' + Tên gốc acid (đuôi "ate").</p>
          <p>Một số gốc acid thường gặp:</p>
          <ul>
            <li>HCOO-: Formate</li>
            <li>CH₃COO-: Acetate</li>
            <li>C₂H₅COO-: Propionate</li>
            <li>CH₂=CHCOO-: Acrylate</li>
          </ul>
        `,
        questions: [
          { id: 1, text: "Tên gọi của CH₃COOC₂H₅ là:", options: ["Methyl acetate", "Ethyl acetate", "Ethyl formate", "Propyl acetate"], correctAnswer: 1, explanation: "C₂H₅ là ethyl, CH₃COO là acetate." },
          { id: 2, text: "Ester có tên gọi methyl formate có công thức là:", options: ["CH₃COOCH₃", "HCOOC₂H₅", "HCOOCH₃", "CH₃COOH"], correctAnswer: 2, explanation: "Methyl là CH₃, formate là HCOO." },
          { id: 3, text: "Tên gọi của CH₂=CHCOOCH₃ là:", options: ["Methyl acrylate", "Methyl methacrylate", "Ethyl acrylate", "Vinyl acetate"], correctAnswer: 0, explanation: "CH₂=CHCOO là acrylate, CH₃ là methyl." },
          { id: 4, text: "Ester benzyl acetate có mùi hoa nhài, công thức của gốc benzyl là:", options: ["-C₆H₅", "-CH₂C₆H₅", "-C₂H₅", "-C₆H₄CH₃"], correctAnswer: 1, explanation: "Gốc benzyl là C₆H₅CH₂-." },
          { id: 5, text: "Tên gọi của (CH₃)₂CH-COOCH₃ là:", options: ["Methyl butyrate", "Methyl isobutyrate", "Isopropyl acetate", "Methyl propionate"], correctAnswer: 1, explanation: "(CH₃)₂CH-COO là gốc isobutyrate." }
        ]
      },
      {
        id: "1-I-C",
        type: "major_consolidation",
        title: "Củng cố mục I: Ester",
        questions: [
          { id: 1, text: "Phát biểu nào sau đây đúng về ester?", options: ["Ester là sản phẩm của phản ứng giữa acid và base", "Ester có nhiệt độ sôi cao hơn acid tương ứng", "Thủy phân ester trong môi trường kiềm là phản ứng một chiều", "Ester tan tốt trong nước"], correctAnswer: 2, explanation: "Thủy phân ester trong môi trường kiềm (xà phòng hóa) là phản ứng một chiều." },
          { id: 2, text: "Sản phẩm của phản ứng thủy phân ethyl acetate trong dung dịch NaOH là:", options: ["CH₃COOH và C₂H₅OH", "CH₃COONa và C₂H₅OH", "HCOONa và C₂H₅OH", "CH₃COONa và CH₃OH"], correctAnswer: 1, explanation: "CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH." },
          { id: 3, text: "Ester nào sau đây khi thủy phân thu được alcohol methylic?", options: ["CH₃COOC₂H₅", "HCOOCH₃", "CH₃COOCH=CH₂", "C₂H₅COOC₂H₅"], correctAnswer: 1, explanation: "HCOOCH₃ thủy phân tạo CH₃OH (alcohol methylic)." },
          { id: 4, text: "Phản ứng ester hóa giữa CH₃COOH và C₂H₅OH (xúc tác H₂SO₄ đặc) là phản ứng:", options: ["Một chiều", "Thuận nghịch", "Không xảy ra", "Tỏa nhiệt mạnh"], correctAnswer: 1, explanation: "Phản ứng ester hóa là phản ứng thuận nghịch." },
          { id: 5, text: "Ester X có công thức phân tử C₄H₈O₂, khi thủy phân trong môi trường acid thu được alcohol ethylic. Tên của X là:", options: ["Ethyl acetate", "Methyl propionate", "Propyl formate", "Ethyl formate"], correctAnswer: 0, explanation: "Tạo C₂H₅OH nên gốc R' là ethyl. C₄H₈O₂ - C₂H₅ = CH₃COO. Vậy là ethyl acetate." }
        ]
      },
      {
        id: "1-II-1",
        type: "theory",
        title: "1. Khái niệm Lipid và Chất béo",
        content: `
          <p>Lipid là những hợp chất hữu cơ có trong tế bào sống, không tan trong nước nhưng tan nhiều trong dung môi hữu cơ không phân cực.</p>
          <p>Chất béo là triester của glycerol với acid béo, gọi chung là triglyceride.</p>
          <p>Công thức: (RCOO)₃C₃H₅.</p>
        `,
        questions: [
          { id: 1, text: "Chất béo là triester của glycerol với:", options: ["Acid vô cơ", "Acid béo", "Alcohol đơn chức", "Amino acid"], correctAnswer: 1, explanation: "Chất béo là triester của glycerol và acid béo." },
          { id: 2, text: "Thành phần nào luôn có trong phân tử chất béo?", options: ["Gốc ethylene glycol", "Gốc glycerol", "Gốc glucose", "Gốc sáp"], correctAnswer: 1, explanation: "Chất béo luôn chứa gốc glycerol (C₃H₅)." },
          { id: 3, text: "Acid béo là những carboxylic acid có đặc điểm:", options: ["Mạch ngắn, phân nhánh", "Mạch dài, không phân nhánh, số C chẵn", "Mạch vòng", "Có nhóm -OH"], correctAnswer: 1, explanation: "Acid béo có mạch carbon dài (thường 12-24C), không phân nhánh, số C thường chẵn." },
          { id: 4, text: "Chất nào sau đây không phải là lipid?", options: ["Chất béo", "Sáp", "Steroid", "Protein"], correctAnswer: 3, explanation: "Protein là hợp chất cao phân tử tạo từ amino acid, không thuộc lipid." },
          { id: 5, text: "Công thức của glycerol là:", options: ["C₂H₄(OH)₂", "C₃H₅(OH)₃", "CH₃OH", "C₂H₅OH"], correctAnswer: 1, explanation: "Glycerol là propan-1,2,3-triol (C₃H₅(OH)₃)." }
        ]
      },
      {
        id: "1-F",
        type: "final_consolidation",
        title: "Củng cố toàn bài 1: Ester - Lipid",
        questions: [
          { id: 1, text: "Khi đun nóng chất béo với dung dịch NaOH, thu được:", options: ["Glycerol và acid béo", "Glycerol và muối của acid béo", "Alcohol ethylic và muối của acid béo", "Ethylene glycol và acid béo"], correctAnswer: 1, explanation: "Đây là phản ứng xà phòng hóa, tạo glycerol và muối sodium của acid béo (xà phòng)." },
          { id: 2, text: "Để chuyển chất béo lỏng thành chất béo rắn, người ta dùng phản ứng:", options: ["Thủy phân", "Xà phòng hóa", "Hydrogen hóa", "Oxy hóa"], correctAnswer: 2, explanation: "Cộng H₂ vào gốc acid béo không no để chuyển thành gốc no (rắn)." },
          { id: 3, text: "Tristearin có công thức là:", options: ["(C₁₅H₃₁COO)₃C₃H₅", "(C₁₇H₃₅COO)₃C₃H₅", "(C₁₇H₃₃COO)₃C₃H₅", "(C₁₇H₃₁COO)₃C₃H₅"], correctAnswer: 1, explanation: "Stearic acid là C₁₇H₃₅COOH." },
          { id: 4, text: "Ester X có mùi chuối chín, công thức là CH₃COOCH₂CH₂CH(CH₃)₂. Tên gọi của X là:", options: ["Ethyl acetate", "Isoamyl acetate", "Benzyl acetate", "Methyl butyrate"], correctAnswer: 1, explanation: "Gốc R' là isoamyl, gốc acid là acetate." },
          { id: 5, text: "Phát biểu nào sau đây sai?", options: ["Chất béo nhẹ hơn nước", "Chất béo không tan trong nước", "Dầu ăn và mỡ bôi trơn máy có cùng thành phần hóa học", "Thủy phân chất béo luôn thu được glycerol"], correctAnswer: 2, explanation: "Dầu ăn là ester (lipid), mỡ bôi trơn là hydrocarbon." }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Bài 2: Xà phòng và Chất giặt rửa",
    sections: [
      {
        id: "2-I-1",
        type: "theory",
        title: "1. Khái niệm Xà phòng",
        content: `
          <p>Xà phòng là hỗn hợp muối sodium hoặc potassium của các acid béo và chất phụ gia.</p>
          <p>Thành phần chính: R-COONa hoặc R-COOK.</p>
        `,
        questions: [
          { id: 1, text: "Xà phòng là muối của acid béo với kim loại nào?", options: ["Fe, Cu", "Na, K", "Ca, Mg", "Al, Zn"], correctAnswer: 1, explanation: "Xà phòng là muối sodium (Na) hoặc potassium (K) của acid béo." },
          { id: 2, text: "Chất nào sau đây có thể dùng làm xà phòng?", options: ["CH₃COONa", "C₁₇H₃₅COONa", "C₆H₅COONa", "CH₃(CH₂)₁₁SO₃Na"], correctAnswer: 1, explanation: "C₁₇H₃₅COONa là muối của acid béo (stearic acid)." },
          { id: 3, text: "Xà phòng có tác dụng giặt rửa vì phân tử có:", options: ["Một đầu ưa nước, một đầu kị nước", "Hai đầu ưa nước", "Hai đầu kị nước", "Tính acid mạnh"], correctAnswer: 0, explanation: "Cấu tạo lưỡng tính giúp xà phòng bám vào vết bẩn và lôi chúng vào nước." },
          { id: 4, text: "Trong công nghiệp, xà phòng được sản xuất từ:", options: ["Dầu mỏ", "Chất béo", "Than đá", "Gỗ"], correctAnswer: 1, explanation: "Xà phòng hóa chất béo là phương pháp truyền thống." },
          { id: 5, text: "Xà phòng kali (potassium) thường có đặc điểm:", options: ["Rất cứng", "Mềm hoặc lỏng", "Không tan", "Màu đen"], correctAnswer: 1, explanation: "Muối potassium thường tạo xà phòng mềm hoặc lỏng." }
        ]
      },
      {
        id: "2-F",
        type: "final_consolidation",
        title: "Củng cố toàn bài 2: Xà phòng và Chất giặt rửa",
        questions: [
          { id: 1, text: "Ưu điểm của chất giặt rửa tổng hợp so với xà phòng là:", options: ["Rẻ hơn", "Dùng được trong nước cứng", "Dễ phân hủy sinh học hơn", "Làm từ mỡ động vật"], correctAnswer: 1, explanation: "Chất giặt rửa tổng hợp không tạo kết tủa với ion Ca²⁺, Mg²⁺ trong nước cứng." },
          { id: 2, text: "Nước cứng làm mất tác dụng của xà phòng vì tạo kết tủa với:", options: ["Ion Na⁺", "Ion Cl⁻", "Ion Ca²⁺, Mg²⁺", "Ion H⁺"], correctAnswer: 2, explanation: "Tạo muối calcium/magnesium của acid béo không tan." },
          { id: 3, text: "Thành phần ưa nước trong xà phòng là:", options: ["Gốc hydrocarbon", "Nhóm -COONa", "Nhóm -OH", "Nhóm -CH₃"], correctAnswer: 1, explanation: "Nhóm muối carboxylate phân cực nên ưa nước." },
          { id: 4, text: "Để bảo vệ môi trường, nên dùng chất giặt rửa tổng hợp có đặc điểm:", options: ["Mạch carbon phân nhánh", "Mạch carbon không phân nhánh", "Chứa nhiều phosphate", "Có tính kiềm mạnh"], correctAnswer: 1, explanation: "Mạch không phân nhánh dễ bị vi sinh vật phân hủy hơn." },
          { id: 5, text: "Sản phẩm phụ thu được khi sản xuất xà phòng từ chất béo là:", options: ["Ethanol", "Glycerol", "Ethylene glycol", "Methanol"], correctAnswer: 1, explanation: "Thủy phân triglyceride luôn tạo glycerol." }
        ]
      }
    ]
  }
];
