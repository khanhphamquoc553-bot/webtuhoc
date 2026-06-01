import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import denImage from './assets/den.png'
import dongHoImage from './assets/dongho.png'
import bongDenImage from './assets/bongden.png'
import robotImage from './assets/ai-robot.png'
import cucPinImage from './assets/cucpin.png'
import dienTroImage from './assets/dientro.png'
import lesson22CircuitImage from './assets/lesson-22-circuit.png'
import machImage from './assets/mach.png'
import omegaImage from './assets/omega.png'
import pinImage from './assets/pin.png'
import soDoImage from './assets/sodo.png'
import sidebarCircuitImage from './assets/sidebar-circuit-render.png'
import vonKeImage from './assets/vonke.png'
import ntcThermistorImage from './assets/ntc-thermistor.png'
import ptcThermistorImage from './assets/ptc-thermistor.png'
import physicsBank from '../physics-bank.json'
import './App.css'

const STORAGE_KEY = 'vat-ly-11-self-learning-ai'
const ACCOUNTS_KEY = `${STORAGE_KEY}:accounts`
const SESSION_KEY = `${STORAGE_KEY}:current-student`

const topics = [
  {
    id: 'cuong-do-dong-dien',
    label: 'Cường độ dòng điện',
    shortLabel: 'Cường độ dòng điện',
    number: 22,
    color: '#27a96f',
    softColor: '#ecfbf4',
    accent: '#21a56b',
    icon: 'bolt',
    progress: 80,
    status: 'Đang học',
    action: 'Tiếp tục học',
    summary: 'Cường độ dòng điện, công thức I = Δq / Δt và liên hệ I = Snve trong dây dẫn kim loại.',
    keywords: ['cuong do dong dien', 'ampe', 'miliampe', 'microampe', 'dien luong', 'dung luong pin', 'mah', 'delta q', 'i =', 'snve', 'electron', 'vat dan kim loai', 'dien phan', 'chieu dong dien'],
    tip: 'Cường độ dòng điện đặc trưng cho tác dụng mạnh, yếu của dòng điện; đơn vị là ampe (A).',
    exercise: 'Trong 5 s có điện lượng 10 C đi qua tiết diện dây dẫn. Tính cường độ dòng điện.',
    answerKeywords: ['2a', '2 a', '2', 'hai'],
    answerText: 'I = Δq / Δt = 10 / 5 = 2 A.',
    branches: [
      'Thí nghiệm khảo sát tác dụng mạnh yếu của dòng điện',
      'Công thức I = Δq / Δt',
      'Dòng điện trong dây dẫn kim loại',
      'Liên hệ I = Snve',
      'Bài tập vận dụng',
    ],
  },
  {
    id: 'dien-tro-dinh-luat-om',
    label: 'Điện trở. Định luật Ôm',
    shortLabel: 'Điện trở. Định luật Ôm',
    number: 23,
    color: '#ff8a1d',
    softColor: '#fff4e8',
    accent: '#ff7b00',
    icon: 'ohm',
    progress: 40,
    status: 'Đang học',
    action: 'Tiếp tục học',
    summary: 'Điện trở, đường đặc trưng vôn-ampe, định luật Ôm I = U / R, điện trở kim loại phụ thuộc nhiệt độ.',
    keywords: ['dien tro', 'dien tro suat', 'rho', 'dinh luat om', 'ohm', 'von ampe', 'i = u / r', 'r = rho', 'nhiet dien tro', 'ntc', 'ptc', 'bong den day toc'],
    tip: 'Điện trở đặc trưng cho mức độ cản trở dòng điện; với vật dẫn kim loại, I tỉ lệ thuận với U và tỉ lệ nghịch với R.',
    exercise: 'Đặt hiệu điện thế 12 V vào điện trở 4 Ω. Tính cường độ dòng điện.',
    answerKeywords: ['3a', '3 a', '3', 'ba'],
    answerText: 'I = U / R = 12 / 4 = 3 A.',
    branches: [
      'Điện trở',
      'Định nghĩa điện trở R = U / I',
      'Đường đặc trưng vôn-ampe',
      'Định luật Ôm I = U / R',
      'Nguyên nhân gây ra điện trở',
      'Ảnh hưởng của nhiệt độ lên điện trở',
      'Nhiệt điện trở NTC và PTC',
    ],
  },
  {
    id: 'nguon-dien',
    label: 'Nguồn điện',
    shortLabel: 'Nguồn điện',
    number: 24,
    color: '#7a52e8',
    softColor: '#f2edff',
    accent: '#724ce1',
    icon: 'battery',
    progress: 20,
    status: 'Chưa học',
    action: 'Bắt đầu học',
    summary: 'Nguồn điện, suất điện động, điện trở trong của nguồn và ảnh hưởng đến hiệu điện thế giữa hai cực.',
    keywords: ['nguon dien', 'suat dien dong', 'luc la', 'pin', 'ac quy', 'may phat dien', 'dien tro trong', 'hieu dien the mach ngoai', 'u = xi', 'u = ξ'],
    tip: 'Nguồn điện duy trì hiệu điện thế giữa hai cực; trong mạch kín cần xét thêm điện trở trong r của nguồn.',
    exercise: 'Nguồn có suất điện động 10 V và điện trở trong 1 Ω, dòng điện 2 A. Tính hiệu điện thế mạch ngoài.',
    answerKeywords: ['8v', '8 v', '8', 'tam'],
    answerText: 'U = ξ - Ir = 10 - 2.1 = 8 V.',
    branches: [
      'Điều kiện duy trì dòng điện',
      'Nguồn điện',
      'Suất điện động của nguồn điện',
      'Điện trở trong của nguồn',
      'Hiệu điện thế mạch ngoài U = ξ - Ir',
      'Bài tập luyện tập',
    ],
  },
  {
    id: 'nang-luong-cong-suat-dien',
    label: 'Năng lượng và công suất điện',
    shortLabel: 'Năng lượng và công suất điện',
    number: 25,
    color: '#ee4d7b',
    softColor: '#fff0f4',
    accent: '#e83d6d',
    icon: 'bulb',
    progress: 10,
    status: 'Chưa học',
    action: 'Bắt đầu học',
    summary: 'Năng lượng điện, công của lực điện, công suất điện, công suất định mức và bài toán tiêu thụ điện.',
    keywords: ['nang luong dien', 'cong suat dien', 'cong suat dinh muc', 'cong to dien', 'kw h', 'kwh', 'hoa don tien dien', 'den led', 'tiet kiem dien'],
    tip: 'Công suất điện là năng lượng điện tiêu thụ trong một đơn vị thời gian; dùng P = A / t = U.I.',
    exercise: 'Một thiết bị dùng điện ở U = 220 V có I = 2 A. Tính công suất điện.',
    answerKeywords: ['440w', '440 w', '440'],
    answerText: 'P = U.I = 220.2 = 440 W.',
    branches: [
      'Năng lượng điện',
      'Công của lực điện A = UIt',
      'Công suất điện P = A / t = U.I',
      'Nhiệt lượng tỏa ra Q = I²Rt',
      'Đơn vị kW.h và hóa đơn điện',
      'Công suất định mức',
      'Bài tập ví dụ và bài tập tiết kiệm điện',
    ],
  },
  {
    id: 'thuc-hanh-pin-dien-hoa',
    label: 'Thực hành: Đo suất điện động và điện trở trong của pin điện hoá',
    shortLabel: 'Thực hành: Đo suất điện động và điện trở trong của pin điện hoá',
    number: 26,
    color: '#0ea5a6',
    softColor: '#e9fbfb',
    accent: '#0b9094',
    icon: 'flask',
    progress: 0,
    status: 'Chưa mở khóa',
    action: 'Chưa mở khóa',
    summary: 'Thực hành đo suất điện động và điện trở trong của pin điện hoá bằng dụng cụ thí nghiệm.',
    keywords: ['thuc hanh', 'do suat dien dong', 'dien tro trong', 'pin dien hoa', 'pin cu', 'pin moi', 'do thi u i'],
    tip: 'Từ đồ thị U theo I, kéo dài đường thẳng cắt trục tung tại U0 để xác định suất điện động ξ; dùng hai điểm để tính r.',
    exercise: 'Khi I = 0 thì hiệu điện thế U0 trên đồ thị U - I cho biết đại lượng nào của pin?',
    answerKeywords: ['suat dien dong', 'ξ', 'epsilon', 'u0'],
    answerText: 'Khi I = 0, U0 chính là suất điện động ξ của pin.',
    branches: [
      'Dụng cụ thí nghiệm',
      'Thiết kế phương án thí nghiệm',
      'Tiến hành thí nghiệm với pin cũ',
      'Tiến hành thí nghiệm với pin mới',
      'Vẽ đồ thị U theo I',
      'Xác định ξ và r của pin',
      'Nhận xét và đánh giá kết quả',
    ],
  },
]

const lessonBlueprints = [
  {
    topicId: 'cuong-do-dong-dien',
    duration: '35 phút',
    difficulty: 'Dễ - vừa',
    goal: 'Nhìn độ sáng bóng đèn để đoán dòng điện mạnh hay yếu.',
    formula: 'I = Δq/Δt, I = nSev',
    steps: [
      'Khởi động: bóng đèn sáng mạnh/yếu nói gì về dòng điện?',
      'Khám phá: electron đi ngược chiều dòng điện quy ước.',
      'Hình thành: đọc ý nghĩa Δq và Δt trong I = Δq/Δt.',
      'Mô phỏng: thay số electron, tiết diện, vận tốc để thấy I đổi.',
      'Luyện tập: tính I từ điện lượng đi qua dây.',
      'Tóm tắt: ampe cho biết mức độ mạnh yếu của dòng điện.',
    ],
  },
  {
    topicId: 'dien-tro-dinh-luat-om',
    duration: '40 phút',
    difficulty: 'Vừa',
    goal: 'Tự phát hiện vật dẫn cản dòng điện và rút ra định luật Ôm.',
    formula: 'R = U/I, I = U/R, R = ρl/S',
    steps: [
      'Khởi động: vì sao cùng pin nhưng đèn có thể sáng khác nhau?',
      'Khám phá: hạt tải điện va chạm trong vật dẫn.',
      'Hình thành: điện trở đặc trưng cho mức cản trở dòng điện.',
      'Thí nghiệm số liệu: tăng U và quan sát I tăng tỉ lệ.',
      'Mô phỏng dây dẫn: đổi l, S, vật liệu để thấy R thay đổi.',
      'Tình huống: NTC, PTC trong cảm biến và bảo vệ mạch.',
    ],
  },
  {
    topicId: 'nguon-dien',
    duration: '40 phút',
    difficulty: 'Vừa',
    goal: 'Hiểu vì sao pin duy trì dòng điện và vì sao pin yếu làm đèn mờ.',
    formula: 'ξ = A/q, I = ξ/(R+r), U = ξ - Ir',
    steps: [
      'Khởi động: mạch kín cần gì để dòng điện không tắt?',
      'Khám phá: lực lạ đưa điện tích về cực nguồn.',
      'Hình thành: suất điện động đo công của nguồn trên một đơn vị điện tích.',
      'Mô phỏng: tăng điện trở trong r để thấy U mạch ngoài giảm.',
      'Luyện tập: tính U = ξ - Ir từ số liệu.',
      'Tóm tắt: toàn mạch gồm R ngoài và r trong nguồn.',
    ],
  },
  {
    topicId: 'nang-luong-cong-suat-dien',
    duration: '45 phút',
    difficulty: 'Vừa',
    goal: 'Tính được điện năng, công suất và đọc tình huống hóa đơn điện.',
    formula: 'W = UIt, P = UI, Q = RI²t',
    steps: [
      'Khởi động: thiết bị nào làm hóa đơn điện tăng nhanh?',
      'Khám phá: công suất cho biết tốc độ tiêu thụ điện năng.',
      'Hình thành: W = UIt và P = W/t = UI.',
      'So sánh: LED sáng tương đương nhưng tiêu thụ ít hơn đèn sợi đốt.',
      'Vận dụng: tính tiền điện từ kW.h.',
      'Tóm tắt: chọn thiết bị và thời gian dùng quyết định chi phí.',
    ],
  },
  {
    topicId: 'thuc-hanh-pin-dien-hoa',
    duration: '50 phút',
    difficulty: 'Thực hành',
    goal: 'Kéo thả dụng cụ, lấy số liệu, vẽ đồ thị để tìm ξ và r.',
    formula: 'U = ξ - Ir',
    steps: [
      'Khởi động: pin mới và pin cũ khác nhau ở đâu?',
      'Khám phá: mắc vôn kế song song, ampe kế nối tiếp.',
      'Thực hành ảo: kéo thả pin, biến trở, khóa K, đồng hồ đo.',
      'Thu thập: ghi cặp giá trị U và I.',
      'Đồ thị: kéo đường U-I, giao trục tung là ξ.',
      'Tóm tắt: độ dốc âm của đồ thị liên quan đến r.',
    ],
  },
]

const formulaCards = [
  { icon: 'bolt', formula: 'I = Δq/Δt', meaning: 'Cường độ dòng điện bằng điện lượng qua tiết diện trong một đơn vị thời gian.', units: 'I: A, q: C, t: s', example: '10 C đi qua trong 5 s thì I = 2 A.' },
  { icon: 'bolt', formula: 'I = nSev', meaning: 'Dòng điện trong kim loại phụ thuộc mật độ electron, tiết diện và vận tốc trôi.', units: 'n: m⁻³, S: m², e: C, v: m/s', example: 'Dây to hơn hoặc electron trôi nhanh hơn thì I lớn hơn.' },
  { icon: 'ohm', formula: 'R = U/I', meaning: 'Điện trở đo mức cản trở dòng điện của vật dẫn.', units: 'R: Ω, U: V, I: A', example: 'U = 12 V, I = 3 A thì R = 4 Ω.' },
  { icon: 'ohm', formula: 'I = U/R', meaning: 'Định luật Ôm cho đoạn mạch chỉ có điện trở.', units: 'I: A, U: V, R: Ω', example: 'U = 9 V, R = 3 Ω thì I = 3 A.' },
  { icon: 'ohm', formula: 'R = ρl/S', meaning: 'Điện trở dây dẫn tăng theo chiều dài, giảm khi tiết diện lớn.', units: 'ρ: Ωm, l: m, S: m²', example: 'Dây dài hơn thì đèn thường sáng yếu hơn.' },
  { icon: 'battery', formula: 'ξ = A/q', meaning: 'Suất điện động là công của nguồn trên một đơn vị điện tích.', units: 'ξ: V, A: J, q: C', example: 'Nguồn làm công 18 J cho 3 C thì ξ = 6 V.' },
  { icon: 'battery', formula: 'I = ξ/(R+r)', meaning: 'Dòng điện toàn mạch phụ thuộc điện trở ngoài và điện trở trong.', units: 'ξ: V, R,r: Ω, I: A', example: 'ξ = 12 V, R+r = 6 Ω thì I = 2 A.' },
  { icon: 'battery', formula: 'U = ξ − Ir', meaning: 'Hiệu điện thế mạch ngoài giảm khi dòng điện và điện trở trong tăng.', units: 'U,ξ: V, I: A, r: Ω', example: 'ξ = 10 V, I = 2 A, r = 1 Ω thì U = 8 V.' },
  { icon: 'bulb', formula: 'W = UIt', meaning: 'Điện năng tiêu thụ phụ thuộc hiệu điện thế, dòng điện và thời gian dùng.', units: 'W: J, U: V, I: A, t: s', example: 'Dùng càng lâu thì điện năng càng lớn.' },
  { icon: 'bulb', formula: 'Q = RI²t', meaning: 'Nhiệt lượng tỏa ra trên điện trở theo định luật Jun-Len-xơ.', units: 'Q: J, R: Ω, I: A, t: s', example: 'Dòng điện tăng gấp đôi thì Q tăng 4 lần.' },
  { icon: 'bulb', formula: 'P = UI', meaning: 'Công suất điện cho biết thiết bị tiêu thụ điện nhanh hay chậm.', units: 'P: W, U: V, I: A', example: '220 V và 0,5 A thì P = 110 W.' },
  { icon: 'bulb', formula: 'P = I²R', meaning: 'Công suất tỏa nhiệt trên điện trở khi biết dòng điện.', units: 'P: W, I: A, R: Ω', example: 'I = 2 A, R = 5 Ω thì P = 20 W.' },
  { icon: 'bulb', formula: 'P = U²/R', meaning: 'Công suất trên điện trở khi biết hiệu điện thế hai đầu.', units: 'P: W, U: V, R: Ω', example: 'U = 12 V, R = 6 Ω thì P = 24 W.' },
]

const mindmapCards = [
  {
    topicId: 'cuong-do-dong-dien',
    position: 'left-top',
    color: '#246bff',
    softColor: '#f6fbff',
  },
  {
    topicId: 'dien-tro-dinh-luat-om',
    position: 'left-middle',
    color: '#7b4be8',
    softColor: '#fbf8ff',
  },
  {
    topicId: 'nguon-dien',
    position: 'left-bottom',
    color: '#19b86b',
    softColor: '#f5fff9',
  },
  {
    topicId: 'nang-luong-cong-suat-dien',
    position: 'right-top',
    color: '#ff7a00',
    softColor: '#fff9f3',
  },
  {
    topicId: 'thuc-hanh-pin-dien-hoa',
    position: 'right-bottom',
    color: '#ec3f74',
    softColor: '#fff6f9',
  },
]

const lessonMindmaps = {
  'cuong-do-dong-dien': [
    {
      title: 'Khái niệm',
      points: ['Dòng chuyển dời có hướng của hạt mang điện', 'Đặc trưng cho tác dụng mạnh yếu của dòng điện'],
    },
    {
      title: 'Công thức chính',
      points: ['I = Δq / Δt', 'Δq = I.Δt', '1 C = 1 A.s'],
    },
    {
      title: 'Đơn vị',
      points: ['Ampe (A)', 'mA = 10^-3 A', 'μA = 10^-6 A'],
    },
    {
      title: 'Trong kim loại',
      points: ['Electron tự do chuyển động ngược chiều dòng điện quy ước', 'I = S.n.v.e'],
    },
    {
      title: 'Vận dụng',
      points: ['Tính I, q, t', 'Đổi dung lượng pin mAh sang điện lượng', 'So sánh dòng điện mạnh yếu'],
    },
  ],
  'dien-tro-dinh-luat-om': [
    {
      title: 'Điện trở',
      points: ['Đặc trưng mức cản trở dòng điện', 'R = U / I', 'Đơn vị ôm (Ω)'],
    },
    {
      title: 'Định luật Ôm',
      points: ['I = U / R', 'U = I.R', 'Dòng điện tỉ lệ thuận với U và nghịch với R'],
    },
    {
      title: 'Đặc trưng V-A',
      points: ['Đường thẳng qua gốc tọa độ với vật dẫn kim loại', 'Độ dốc liên hệ với điện trở'],
    },
    {
      title: 'Yếu tố ảnh hưởng',
      points: ['Vật liệu', 'Chiều dài', 'Tiết diện', 'Nhiệt độ'],
    },
    {
      title: 'Mở rộng',
      points: ['Điện trở nhiệt NTC, PTC', 'Bóng đèn dây tóc', 'Hiện tượng siêu dẫn'],
    },
  ],
  'nguon-dien': [
    {
      title: 'Vai trò',
      points: ['Tạo và duy trì hiệu điện thế', 'Cung cấp dòng điện cho mạch kín'],
    },
    {
      title: 'Cấu tạo cơ bản',
      points: ['Cực dương (+)', 'Cực âm (-)', 'Lực lạ tách điện tích trong nguồn'],
    },
    {
      title: 'Suất điện động',
      points: ['Kí hiệu ξ', 'ξ = A / q', 'Số vôn ghi trên nguồn khi mạch hở'],
    },
    {
      title: 'Điện trở trong',
      points: ['Kí hiệu r', 'Làm hiệu điện thế hai cực giảm khi có dòng điện'],
    },
    {
      title: 'Toàn mạch',
      points: ['I = ξ / (R + r)', 'U = ξ - I.r', 'Phân tích đồ thị U-I của nguồn'],
    },
  ],
  'nang-luong-cong-suat-dien': [
    {
      title: 'Năng lượng điện',
      points: ['Lực điện thực hiện công', 'W = A = U.I.t'],
    },
    {
      title: 'Công suất điện',
      points: ['P = A / t', 'P = U.I', 'Đơn vị oát (W)'],
    },
    {
      title: 'Mạch thuần trở',
      points: ['Q = I².R.t', 'P = I².R', 'P = U² / R'],
    },
    {
      title: 'Điện năng tiêu thụ',
      points: ['1 kW.h = 3,6.10^6 J', 'Đọc công tơ điện và hóa đơn điện'],
    },
    {
      title: 'Định mức',
      points: ['Thông số 220 V - 100 W', 'Dùng đúng hiệu điện thế định mức', 'Tiết kiệm điện'],
    },
  ],
  'thuc-hanh-pin-dien-hoa': [
    {
      title: 'Mục tiêu',
      points: ['Đo suất điện động ξ', 'Xác định điện trở trong r của pin'],
    },
    {
      title: 'Dụng cụ',
      points: ['Pin cũ, pin mới', 'Biến trở', 'Đồng hồ đo điện', 'Điện trở bảo vệ'],
    },
    {
      title: 'Lắp mạch',
      points: ['Mắc ampe kế và vôn kế đúng vị trí', 'Điều chỉnh biến trở để đổi I'],
    },
    {
      title: 'Xử lí số liệu',
      points: ['Ghi các cặp U, I', 'Vẽ đồ thị U = f(I)', 'Kéo dài đến I = 0 để tìm ξ'],
    },
    {
      title: 'Kết luận',
      points: ['Độ dốc đồ thị liên hệ với r', 'So sánh pin cũ và pin mới', 'Nhận xét sai số'],
    },
  ],
}

const chapterKnowledgeBase = [
  {
    title: 'Dòng điện. Mạch điện',
    content:
      'Chương IV - Dòng điện. Mạch điện gồm các nội dung: cường độ dòng điện; điện trở và định luật Ohm; nguồn điện; năng lượng điện và công suất điện; thực hành đo suất điện động và điện trở trong của pin điện hoá. Bối cảnh mở đầu: xe điện phát triển nhờ pin có khả năng dự trữ năng lượng, sau khi sạc có thể duy trì dòng điện trong mạch kín.',
  },
  {
    title: 'Bài 22 - Cường độ dòng điện',
    content:
      'Cường độ dòng điện đặc trưng cho tác dụng mạnh, yếu của dòng điện. Công thức định nghĩa: I = Δq / Δt, trong đó I có đơn vị ampe (A), điện lượng q có đơn vị culông (C), thời gian t có đơn vị giây (s). Từ công thức suy ra Δq = I.Δt. 1 C = 1 A.s. Trong kim loại, electron tự do dịch chuyển ngược chiều quy ước của dòng điện; chiều dòng điện trong mạch được quy ước từ cực dương sang cực âm của nguồn. Liên hệ giữa cường độ dòng điện với mật độ hạt mang điện và tốc độ dịch chuyển có hướng: I = Snve, với S là diện tích tiết diện thẳng, n là mật độ hạt mang điện, v là tốc độ dịch chuyển có hướng, e là độ lớn điện tích electron. Bài tập mẫu dùng công thức I = Snve và v = I / (nSe).',
  },
  {
    title: 'Bài 23 - Điện trở. Định luật Ôm',
    content:
      'Điện trở là đại lượng đặc trưng cho mức độ cản trở dòng điện của vật dẫn, kí hiệu R, đơn vị ôm (Ω). Từ thí nghiệm, tỉ số U / I đối với một vật dẫn là hằng số, gọi là điện trở: R = U / I, suy ra I = U / R. 1 Ω = 1 V / 1 A; 1 kΩ = 1000 Ω; 1 MΩ = 1000000 Ω. Đường đặc trưng vôn-ampe biểu diễn sự phụ thuộc giữa hiệu điện thế U và cường độ dòng điện I; với điện trở R đơn giản, đường đặc trưng là đường thẳng đi qua gốc tọa độ. Định luật Ohm: cường độ dòng điện chạy qua vật dẫn kim loại tỉ lệ thuận với hiệu điện thế ở hai đầu vật dẫn và tỉ lệ nghịch với điện trở của vật dẫn: I = U / R. Điện trở kim loại phụ thuộc nhiệt độ gần đúng theo R = R0[1 + α(t - t0)]. Điện trở nhiệt là linh kiện có điện trở thay đổi rõ rệt theo nhiệt độ; có loại NTC và PTC. NTC có điện trở giảm khi nhiệt độ tăng, PTC có điện trở tăng khi nhiệt độ tăng. Hiện tượng siêu dẫn là hiện tượng một số kim loại hoặc hợp kim khi nhiệt độ thấp hơn nhiệt độ tới hạn Tc thì điện trở giảm đột ngột gần bằng 0.',
  },
  {
    title: 'Bài 24 - Nguồn điện',
    content:
      'Nguồn điện là thiết bị tạo ra và duy trì hiệu điện thế để tạo ra dòng điện trong mạch. Mỗi nguồn điện có hai cực: cực dương (+) và cực âm (-). Để duy trì dòng điện lâu dài trong mạch kín, bên trong nguồn phải có lực lạ thực hiện công tách và chuyển các hạt tải điện, không phải lực điện trường thông thường. Suất điện động của nguồn điện, kí hiệu ξ, đặc trưng cho khả năng thực hiện công của nguồn điện: ξ = A / q, đơn vị là vôn (V). Số vôn ghi trên nguồn cho biết suất điện động của nguồn và cũng là hiệu điện thế giữa hai cực khi mạch hở. Trong mạch kín, nguồn điện có điện trở trong r. Công của nguồn A = qξ = ξIt. Nhiệt lượng tỏa ra trên mạch ngoài R và điện trở trong r: Q = RI²t + rI²t. Định luật Ôm đối với toàn mạch: I = ξ / (R + r). Hiệu điện thế mạch ngoài: U = ξ - Ir. Khi đo hiệu điện thế giữa hai cực nguồn bằng vôn kế, số chỉ nhỏ hơn suất điện động nếu có dòng điện chạy vì có độ giảm thế trong nguồn.',
  },
  {
    title: 'Bài 25 - Năng lượng và công suất điện',
    content:
      'Khi đặt hiệu điện thế U vào hai đầu đoạn mạch tiêu thụ điện, lực điện làm các điện tích tự do dịch chuyển có hướng và thực hiện công. Công của lực điện: A = qU. Nếu dòng điện chạy trong thời gian t, với I = q / t thì A = UIt. Năng lượng điện tiêu thụ của đoạn mạch bằng công của lực điện khi dịch chuyển các điện tích: W = A = UIt, đơn vị jun (J). Với đoạn mạch thuần điện trở, nhiệt lượng tỏa ra khi dòng điện chạy qua: Q = I²Rt = U²t / R. Công suất điện là năng lượng điện mà mạch tiêu thụ trong một đơn vị thời gian: P = A / t = UI = U² / R, đơn vị oát (W). Ngoài jun, năng lượng điện tiêu thụ còn dùng kilôoát giờ: 1 kW.h = 3,6.10^6 J. Công suất định mức là công suất của thiết bị khi dùng đúng hiệu điện thế định mức. Ví dụ trên nhãn 220 V - 100 W nghĩa là khi dùng đúng U = 220 V thì công suất điện của thiết bị là 100 W.',
  },
  {
    title: 'Bài 26 - Thực hành: Đo suất điện động và điện trở trong của pin điện hoá',
    content:
      'Mục tiêu thực hành: xác định suất điện động và điện trở trong của một pin hoặc acquy bằng dụng cụ thí nghiệm. Dụng cụ gồm hai pin điện hoá 1,5 V (một pin cũ, một pin mới), biến trở 100 Ω, hai đồng hồ đo điện đa năng hiện số, dây nối, công tắc K, điện trở bảo vệ R0 và bảng lắp mạch điện. Không nên dùng đồng hồ đa năng đo trực tiếp suất điện động và điện trở trong của pin theo cách đơn giản nếu không xét ảnh hưởng dòng điện và điện trở trong. Tiến hành: lắp mạch, điều chỉnh biến trở, đóng khóa K, ghi U và I, lặp lại với nhiều giá trị R, vẽ đồ thị U = f(I). Kéo dài đường đồ thị cắt trục tung tại U0, khi I = 0 thì U0 = ξ. Chọn hai điểm M, N trên đồ thị để tính điện trở trong: r = -(UM - UN) / (IN - IM) hoặc r = (UM - UN) / (IM - IN) theo độ giảm U khi I tăng. Cần nhận xét dạng đồ thị và quan hệ U, I đối với pin cũ và pin mới.',
  },
  {
    title: 'Tài liệu bổ sung - Chủ đề 4: Dòng điện và mạch điện',
    content:
      'Tài liệu bổ sung chia chủ đề Dòng điện và mạch điện thành bốn bài chính: Cường độ dòng điện; Điện trở - Định luật Ohm; Nguồn điện; Năng lượng và công suất điện. Các bài gắn kiến thức với hiện tượng thực tế như tia sét, pin điện thoại, sạc dự phòng, công tơ điện, đèn LED, bóng đèn dây tóc, xe điện và lươn điện. Khi giải bài, cần xác định đúng đại lượng đang hỏi: điện lượng q, cường độ dòng điện I, hiệu điện thế U, điện trở R, suất điện động ξ, điện trở trong r, năng lượng W, công suất P hoặc thời gian t.',
  },
  {
    title: 'Tài liệu bổ sung - Bài 1: Cường độ dòng điện',
    content:
      'Dòng điện là dòng chuyển dời có hướng của các hạt mang điện. Chiều dòng điện quy ước là chiều chuyển động của điện tích dương, trong mạch ngoài đi từ cực dương sang cực âm của nguồn; trong kim loại electron tự do chuyển động ngược chiều dòng điện quy ước. Cường độ dòng điện đặc trưng cho độ mạnh yếu của dòng điện, được xác định bởi điện lượng chuyển qua một tiết diện trong một đơn vị thời gian: I = Δq / Δt. Đơn vị cường độ dòng điện là ampe (A); 1 mA = 10^-3 A, 1 μA = 10^-6 A. Đơn vị điện lượng là culông (C), với 1 C = 1 A.s. Dung lượng pin hoặc sạc dự phòng thường ghi bằng mAh; muốn đổi sang điện lượng dùng q = I.t, ví dụ 10000 mAh = 10 Ah tương ứng khoảng 36000 C. Trong dây dẫn kim loại, cường độ dòng điện còn liên hệ với mật độ hạt mang điện và tốc độ trôi: I = S.n.e.v, trong đó S là tiết diện dây, n là mật độ electron tự do, e là độ lớn điện tích electron, v là tốc độ dịch chuyển có hướng. Trong dung dịch điện phân, dòng điện do ion dương và ion âm chuyển động có hướng tạo thành; ion dương đi về cathode, ion âm đi về anode. Bài tập thường yêu cầu tính I, q, t; ước lượng dòng điện tia sét; đọc thông số mAh trên pin; hoặc so sánh dòng điện trong kim loại và dung dịch điện phân.',
  },
  {
    title: 'Tài liệu bổ sung - Bài 2: Điện trở và định luật Ohm',
    content:
      'Điện trở biểu thị mức độ cản trở dòng điện của vật dẫn. Điện trở của đoạn dây kim loại phụ thuộc vào vật liệu, chiều dài, tiết diện và nhiệt độ. Công thức điện trở của dây dẫn kim loại: R = ρ.l / S, trong đó ρ là điện trở suất của vật liệu, l là chiều dài dây, S là tiết diện. Dây càng dài thì R càng lớn; tiết diện càng lớn thì R càng nhỏ; vật liệu có điện trở suất lớn thì cản trở dòng điện mạnh hơn. Một số điện trở suất ở 20 °C: bạc khoảng 1,62.10^-8 Ωm, đồng 1,69.10^-8 Ωm, vàng 2,44.10^-8 Ωm, nhôm 2,75.10^-8 Ωm, sắt 9,68.10^-8 Ωm. Đường đặc trưng vôn-ampe mô tả sự phụ thuộc giữa I và U; với điện trở kim loại ở nhiệt độ gần như không đổi, đường đặc trưng là đường thẳng qua gốc tọa độ. Nếu trục đứng là I và trục ngang là U thì độ dốc k = tan α = I / U = 1 / R; đường càng dốc thì điện trở càng nhỏ. Định luật Ohm cho đoạn mạch: I = U / R, tương đương U = I.R và R = U / I. Điện trở kim loại thường tăng khi nhiệt độ tăng. Bóng đèn dây tóc có đường đặc trưng vôn-ampe cong vì khi nóng lên điện trở dây tóc tăng. Điện trở nhiệt NTC có điện trở giảm khi nhiệt độ tăng; PTC có điện trở tăng khi nhiệt độ tăng.',
  },
  {
    title: 'Tài liệu bổ sung - Bài 3: Nguồn điện',
    content:
      'Nguồn điện là thiết bị tạo ra và duy trì hiệu điện thế giữa hai cực để cung cấp dòng điện cho mạch kín. Nguồn điện có hai cực: cực dương (+) và cực âm (-). Ví dụ nguồn điện gồm pin, acquy, sạc dự phòng, máy phát điện. Trong nguồn điện có lực lạ thực hiện công để dịch chuyển các điện tích, duy trì sự tách điện tích giữa hai cực. Suất điện động ξ của nguồn đặc trưng cho khả năng thực hiện công của nguồn: ξ = A / q, đơn vị vôn (V). Công của nguồn khi dịch chuyển điện lượng q là A = q.ξ = ξ.I.t. Nguồn điện thực tế có điện trở trong r; khi có dòng điện I chạy qua, hiệu điện thế giữa hai cực nguồn nhỏ hơn suất điện động: U = ξ - I.r. Với mạch ngoài có điện trở R nối với nguồn có điện trở trong r, định luật Ohm cho toàn mạch là I = ξ / (R + r). Đồ thị U theo I của nguồn có dạng đường thẳng giảm; kéo dài đến I = 0 cho U = ξ, còn độ dốc liên quan đến điện trở trong r. Khi ghép nguồn hoặc dùng pin đã cũ, cần xét sự giảm hiệu điện thế do điện trở trong. Bài tập thường yêu cầu tính ξ, r, U, I, công của nguồn hoặc phân tích số liệu U-I.',
  },
  {
    title: 'Tài liệu bổ sung - Bài 4: Năng lượng và công suất điện',
    content:
      'Năng lượng điện tiêu thụ của đoạn mạch bằng công của lực điện thực hiện khi dịch chuyển điện tích qua đoạn mạch: W = U.I.t. Công suất điện cho biết năng lượng điện tiêu thụ trong một đơn vị thời gian: P = W / t = U.I. Đơn vị năng lượng là jun (J), đơn vị công suất là oát (W). Với đoạn mạch thuần điện trở, có thể dùng P = I².R = U² / R và nhiệt lượng tỏa ra Q = I².R.t = U².t / R. Trong đời sống, điện năng tiêu thụ thường tính bằng kilôoát giờ: 1 kW.h = 3,6.10^6 J. Công tơ điện ghi chỉ số điện năng đã tiêu thụ; điện năng dùng giữa hai lần chốt chỉ số bằng chỉ số mới trừ chỉ số cũ. Hóa đơn tiền điện tính theo kW.h và có thể tính lũy tiến để khuyến khích tiết kiệm điện. Thông số định mức như 220 V - 100 W nghĩa là thiết bị hoạt động đúng công suất định mức khi dùng ở hiệu điện thế định mức. Đèn LED thường tiết kiệm điện hơn bóng đèn sợi đốt vì chuyển nhiều năng lượng điện thành ánh sáng hơn và ít tỏa nhiệt hơn. Khi điện thoại gần hết pin, giảm độ sáng màn hình làm giảm công suất tiêu thụ, giúp kéo dài thời gian dùng pin. Nhãn năng lượng trên thiết bị giúp so sánh mức tiêu thụ và hiệu quả tiết kiệm điện.',
  },
]

const featureContent = {
  overview: {
    title: 'Tổng quan chương',
    body: 'Chương IV gồm 5 bài học chính theo nội dung trong hình: Bài 22, Bài 23, Bài 24, Bài 25 và Bài 26.',
    actions: ['Tiếp tục học', 'Xem lộ trình'],
  },
  lessons: {
    title: 'Bài học',
    body: 'Danh sách bài học được đặt ở giữa màn hình, đúng vị trí như bản mẫu. Mỗi thẻ bài học có tiến độ, trạng thái và nút hành động riêng.',
    actions: ['Bài tiếp theo', 'Ôn phần yếu'],
  },
  games: {
    title: 'Trò chơi tổng hợp',
    body: 'Luyện nhanh bằng câu hỏi chọn đáp án, ghép công thức và thử thách tính cường độ dòng điện.',
    actions: ['Bắt đầu 5 câu', 'Chơi phần yếu'],
  },
  review: {
    title: 'Ôn tập - Kiểm tra',
    body: 'AI sẽ tạo câu hỏi theo phần bạn học chưa chắc, tự chấm câu trả lời và cập nhật mức nắm vững.',
    actions: ['Tạo đề 10 câu', 'Hỏi AI'],
  },
  profile: {
    title: 'Hồ sơ học tập',
    body: 'Dữ liệu học tập được lưu trong trình duyệt: số câu đã hỏi, chuỗi câu đúng và phần kiến thức đang cần luyện.',
    actions: ['Xem thống kê', 'Đặt mục tiêu'],
  },
  formulas: {
    title: 'Sổ tay công thức',
    body: 'Công thức trọng tâm theo Chương IV: I = Δq / Δt, q = I.t, I = Snve, R = U / I, I = U / R, R = ρ.l / S, ξ = A / q, I = ξ / (R + r), U = ξ - Ir, W = UIt, P = W / t = UI, Q = I²Rt, 1 kW.h = 3,6.10^6 J.',
    actions: ['Tạo ví dụ', 'Hỏi AI'],
  },
  guide: {
    title: 'Hướng dẫn sử dụng',
    body: 'Nhấn vào bài học để mở nội dung, dùng thanh tìm kiếm để tìm chủ đề, hoặc nhập câu hỏi trong ô AI để được giải thích.',
    actions: ['Mở AI', 'Xem bài học'],
  },
  feedback: {
    title: 'Góp ý & Liên hệ',
    body: 'Khu vực tiếp nhận góp ý về bài học, giao diện và dạng bài cần bổ sung cho chương này.',
    actions: ['Gửi góp ý', 'Báo lỗi'],
  },
  progress: {
    title: 'Tiến trình học tập',
    body: 'Bạn đang học Chương IV với 5 bài: Bài 22, Bài 23, Bài 24, Bài 25 và Bài 26 thực hành.',
    actions: [],
  },
  achievements: {
    title: 'Thành tích của bạn',
    body: 'Điểm kinh nghiệm: 1200. Chuỗi ngày học: 7. Huy hiệu đã đạt: 3.',
    actions: ['Xem huy hiệu', 'Nhận thưởng'],
  },
  badges: {
    title: 'Huy hiệu',
    body: 'Bạn đang có các huy hiệu Khám phá, Kiên trì và Tự học tốt. Hoàn thành kiểm tra cuối chương để mở thêm huy hiệu mới.',
    actions: ['Xem tất cả', 'Mục tiêu tiếp theo'],
  },
  roadmap: {
    title: 'Lộ trình chương',
    body: 'Hoàn thành các bài đang học, sau đó mở khóa bài kiểm tra cuối chương và nhận huy hiệu nâng cao.',
    actions: ['Bài tiếp theo', 'Kiểm tra thử'],
  },
  notifications: {
    title: 'Thông báo',
    body: 'Bạn có 3 nhắc nhở: tiếp tục Bài 22 Cường độ dòng điện, xem Bài 23 Điện trở. Định luật Ôm và chuẩn bị Bài 26 thực hành.',
    actions: ['Đánh dấu đã đọc', 'Học ngay'],
  },
  account: {
    title: 'Tài khoản học sinh',
    body: 'Xin chào, Học sinh. Tiến độ và dữ liệu AI tự học đang được lưu cục bộ trong trình duyệt.',
    actions: ['Xem hồ sơ', 'Đặt lại AI'],
  },
}

const navItems = [
  { key: 'overview', label: 'Tổng quan chương', icon: 'home' },
  { key: 'lessons', label: 'Bài học', icon: 'document' },
  { key: 'review', label: 'Ôn tập cuối chương', icon: 'clipboard' },
  { key: 'profile', label: 'Hồ sơ học tập', icon: 'users' },
  { key: 'formulas', label: 'Sổ tay công thức', icon: 'notebook' },
]

const normalizeText = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')

const createFreshMemory = () => ({
  interactions: 0,
  streak: 0,
  level: 'Cơ bản',
  experience: 0,
  badges: 0,
  studyMinutes: 0,
  pendingQuiz: null,
  lastTopicId: 'cuong-do-dong-dien',
  history: [],
  mastery: topics.reduce((result, topic) => {
    result[topic.id] = { seen: 0, score: 0 }
    return result
  }, {}),
})

const mergeMemory = (saved) => {
  const fresh = createFreshMemory()

  if (!saved || typeof saved !== 'object') {
    return fresh
  }

  return {
    ...fresh,
    ...saved,
    lastTopicId: topics.some((topic) => topic.id === saved.lastTopicId)
      ? saved.lastTopicId
      : fresh.lastTopicId,
    mastery: {
      ...fresh.mastery,
      ...(saved.mastery || {}),
    },
    history: Array.isArray(saved.history) ? saved.history.slice(-8) : [],
  }
}

const getStudentMemoryKey = (username) => `${STORAGE_KEY}:memory:${username}`

const readAccounts = () => {
  try {
    const accounts = JSON.parse(window.localStorage.getItem(ACCOUNTS_KEY))
    return Array.isArray(accounts) ? accounts : []
  } catch {
    return []
  }
}

const saveAccounts = (accounts) => {
  window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
}

const readCurrentStudent = () => {
  try {
    const username = window.localStorage.getItem(SESSION_KEY)
    if (!username) {
      return null
    }

    const account = readAccounts().find((item) => item.username === username)
    return account ? { username: account.username } : null
  } catch {
    return null
  }
}

const readMemory = (username) => {
  if (!username) {
    return createFreshMemory()
  }

  try {
    return mergeMemory(JSON.parse(window.localStorage.getItem(getStudentMemoryKey(username))))
  } catch {
    return createFreshMemory()
  }
}

const getTopicProgress = (memory, topicId) => Math.min(100, Math.max(0, memory.mastery[topicId]?.score ?? 0))

const getTopicStatus = (progress) => {
  if (progress >= 100) {
    return 'Đã hoàn thành'
  }

  return progress > 0 ? 'Đang học' : 'Chưa học'
}

const getTopicAction = (progress) => {
  if (progress >= 100) {
    return 'Ôn lại'
  }

  return progress > 0 ? 'Tiếp tục học' : 'Bắt đầu học'
}

const lesson22Quiz = [
  {
    id: 'direction',
    question: 'Trong dây dẫn kim loại, chiều dịch chuyển thực tế của electron tự do là chiều nào?',
    options: [
      'Từ cực dương sang cực âm',
      'Từ cực âm sang cực dương',
      'Không có hướng xác định khi nối với nguồn',
    ],
    answer: 1,
    explain:
      'Electron mang điện âm nên trong mạch ngoài chúng dịch chuyển ngược chiều dòng điện quy ước, tức từ cực âm sang cực dương.',
  },
  {
    id: 'charge',
    question: 'Dòng điện không đổi I = 2 A chạy trong 5 s. Điện lượng q đi qua tiết diện dây là bao nhiêu?',
    options: ['2,5 C', '7 C', '10 C'],
    answer: 2,
    explain: 'Với dòng điện không đổi: q = I.t = 2.5 = 10 C.',
  },
  {
    id: 'micro',
    question: 'Công thức vi mô liên hệ cường độ dòng điện trong kim loại là công thức nào?',
    options: ['I = Snve', 'I = U / R', 'q = I.t'],
    answer: 0,
    explain:
      'Công thức I = Snve cho thấy I phụ thuộc tiết diện dây S, mật độ hạt tải n, tốc độ trôi v và điện tích electron e.',
  },
]

const playLessonTone = (type) => {
  if (typeof window === 'undefined') {
    return
  }

  const AudioContext = window.AudioContext || window.webkitAudioContext
  if (!AudioContext) {
    return
  }

  const audioContext = new AudioContext()
  const now = audioContext.currentTime
  const notes = type === 'correct'
    ? [
        { frequency: 880, start: 0, duration: 0.11 },
        { frequency: 1175, start: 0.12, duration: 0.14 },
      ]
    : [
        { frequency: 180, start: 0, duration: 0.12 },
        { frequency: 135, start: 0.14, duration: 0.16 },
      ]

  notes.forEach(({ frequency, start, duration }) => {
    const oscillator = audioContext.createOscillator()
    const gain = audioContext.createGain()
    oscillator.type = type === 'correct' ? 'sine' : 'sawtooth'
    oscillator.frequency.setValueAtTime(frequency, now + start)
    gain.gain.setValueAtTime(0.0001, now + start)
    gain.gain.exponentialRampToValueAtTime(type === 'correct' ? 0.18 : 0.12, now + start + 0.015)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + start + duration)
    oscillator.connect(gain)
    gain.connect(audioContext.destination)
    oscillator.start(now + start)
    oscillator.stop(now + start + duration + 0.02)
  })

  window.setTimeout(() => audioContext.close(), 450)
}

const buildLessonKnowledgeContext = () =>
  chapterKnowledgeBase
    .map((entry, index) => `Mục kiến thức ${index + 1}: ${entry.title}\n${entry.content}`)
    .join('\n\n')
    .slice(0, 20000)

const findTopic = (question, memory) => {
  const normalizedQuestion = normalizeText(question)
  const matchedTopic = topics.find((topic) =>
    topic.keywords.some((keyword) => normalizedQuestion.includes(keyword)),
  )

  if (matchedTopic) {
    return matchedTopic
  }

  return (
    topics.find((topic) => topic.id === memory.lastTopicId) ||
    topics.reduce((weakest, topic) => {
      const topicScore = memory.mastery[topic.id]?.score ?? 0
      const weakestScore = memory.mastery[weakest.id]?.score ?? 0
      return topicScore < weakestScore ? topic : weakest
    }, topics[0])
  )
}

const rememberTopic = (memory, topicId, delta) => {
  const current = memory.mastery[topicId] || { seen: 0, score: 0 }
  const nextScore = Math.min(100, Math.max(0, current.score + delta))
  const gainedScore = Math.max(0, nextScore - current.score)
  const nextExperience = (memory.experience || 0) + gainedScore * 10
  const nextBadges = Math.min(3, Math.floor(nextExperience / 400))

  return {
    ...memory,
    lastTopicId: topicId,
    experience: nextExperience,
    badges: nextBadges,
    studyMinutes: (memory.studyMinutes || 0) + 5,
    mastery: {
      ...memory.mastery,
      [topicId]: {
        seen: current.seen + 1,
        score: nextScore,
      },
    },
  }
}

const getWeakTopics = (memory) =>
  [...topics]
    .sort((a, b) => (memory.mastery[a.id]?.score ?? 0) - (memory.mastery[b.id]?.score ?? 0))
    .slice(0, 2)

const answerMatches = (question, quiz) => {
  const normalizedQuestion = normalizeText(question)
  return quiz.answerKeywords.some((keyword) => normalizedQuestion.includes(normalizeText(keyword)))
}

const PASSING_ANSWER_SCORE = 60

const isLikelyNewQuestion = (question) => {
  const normalizedQuestion = normalizeText(question).trim()

  if (!normalizedQuestion) {
    return false
  }

  const hasQuestionMark = normalizedQuestion.includes('?')
  const hasQuestionPhrase = [
    'la gi',
    'vi sao',
    'tai sao',
    'nhu the nao',
    'nhu nao',
    'cong thuc nao',
    'em hoi',
    'toi hoi',
  ].some((cue) => normalizedQuestion.includes(cue))
  const startsLikeExercise = [
    'tinh ',
    'hay tinh',
    'cho ',
    'mot ',
    'bai ',
    'giai ',
  ].some((cue) => normalizedQuestion.startsWith(cue))

  return hasQuestionMark || hasQuestionPhrase || startsLikeExercise
}

const getQuestionKind = (question) => {
  const normalizedQuestion = normalizeText(question)

  if (
    normalizedQuestion.includes('cong thuc') ||
    normalizedQuestion.includes('dinh luat') ||
    normalizedQuestion.includes('he thuc') ||
    normalizedQuestion.includes('bieu thuc')
  ) {
    return 'formula'
  }

  if (
    normalizedQuestion.includes('la gi') ||
    normalizedQuestion.includes('khai niem') ||
    normalizedQuestion.includes('vi sao') ||
    normalizedQuestion.includes('tai sao') ||
    normalizedQuestion.includes('giai thich')
  ) {
    return 'concept'
  }

  if (
    normalizedQuestion.includes('tinh') ||
    normalizedQuestion.includes('cho biet') ||
    normalizedQuestion.includes('dat ') ||
    /\d/.test(normalizedQuestion)
  ) {
    return 'exercise'
  }

  return 'general'
}

const buildFirstHintFallback = (question, topic) => {
  const questionKind = getQuestionKind(question)

  if (questionKind === 'formula') {
    if (topic.id === 'cuong-do-dong-dien') {
      return 'Gợi ý dễ nhé: cường độ dòng điện cho biết trong một khoảng thời gian có bao nhiêu điện lượng đi qua dây. Nếu gọi điện lượng là Δq và thời gian là Δt, em thử đoán I bằng Δq chia Δt hay Δt chia Δq?'
    }

    if (topic.id === 'dien-tro-dinh-luat-om') {
      return 'Gợi ý dễ nhé: định luật Ôm liên hệ 3 đại lượng U, I, R. Dòng điện I sẽ lớn hơn khi U lớn hơn, và nhỏ hơn khi R lớn hơn. Vậy em thử đoán I = U / R hay I = R / U?'
    }

    if (topic.id === 'nguon-dien') {
      return 'Gợi ý dễ nhé: với nguồn điện trong mạch kín, hiệu điện thế mạch ngoài U thường nhỏ hơn suất điện động ξ vì bị mất một phần trên điện trở trong r. Phần bị mất đó có dạng I.r, vậy em thử viết U theo ξ và I.r xem?'
    }

    if (topic.id === 'nang-luong-cong-suat-dien') {
      return 'Gợi ý dễ nhé: công suất điện phụ thuộc vào hiệu điện thế U và cường độ dòng điện I. Nếu U hoặc I tăng thì công suất cũng tăng. Em thử đoán P bằng U nhân I hay U chia I?'
    }

    return `Gợi ý dễ nhé: câu này hỏi công thức của ${topic.label}. Em thử nhớ các chữ cái chính trong bài này trước, rồi đoán chúng được nhân hay chia với nhau như thế nào?`
  }

  if (questionKind === 'concept') {
    return `Gợi ý nhé: câu này đang hỏi ý nghĩa, chưa cần tính toán. Em thử trả lời bằng một câu ngắn: ${topic.label} dùng để mô tả điều gì trong mạch điện?`
  }

  if (questionKind === 'exercise') {
    return `Gợi ý đầu tiên: bài này là dạng tính toán, nên em hãy tìm trong đề hai phần trước: số liệu đã cho là gì và đại lượng cần tính là gì. Sau đó mình mới chọn công thức.`
  }

  return `Gợi ý nhé: em thử nói trước điều em nhớ được về ${topic.label}. Chỉ cần một ý ngắn cũng được, rồi mình sẽ dựa vào đó để gợi ý tiếp.`
}

const getAnswerAccuracy = (question, quiz) => {
  if (!quiz) {
    return 0
  }

  return answerMatches(question, quiz) ? 100 : 30
}

const stripAiControlTags = (text) =>
  text
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/<\/?think>/gi, '')

const stripAiScoreLines = (text) =>
  text
    .split('\n')
    .filter((line) => !/^\s*\[?\s*(?:diem|điểm|score)\s*[:=]\s*\d{1,3}\s*%?\s*\]?\s*$/i.test(line))
    .join('\n')
    .trim()

const cleanAiDisplayText = (text) => stripAiScoreLines(stripAiControlTags(text)).trim()

const parseAiAssessment = (text) => {
  const textWithoutTags = stripAiControlTags(text)
  const scoreMatch =
    textWithoutTags.match(/\[?\s*(?:diem|điểm|score)\s*[:=]\s*(\d{1,3})\s*%?\s*\]?/i) ||
    textWithoutTags.match(/\b(\d{1,3})\s*%\s*(?:chinh xac|chính xác|dung|đúng)/i)
  const score = scoreMatch ? Math.min(100, Math.max(0, Number(scoreMatch[1]))) : null
  const passed =
    score !== null
      ? score >= PASSING_ANSWER_SCORE
      : /\b(?:dat|đạt|pass)\b/i.test(textWithoutTags) && !/\b(?:chua dat|chưa đạt|fail)\b/i.test(textWithoutTags)

  return {
    score,
    passed,
    text: cleanAiDisplayText(textWithoutTags)
      .replace(/^\s*\[?\s*(?:diem|điểm|score)\s*[:=]\s*\d{1,3}\s*%?\s*[-–—,;:]?\s*(?:dat|đạt|pass|chua dat|chưa đạt|fail|can goi y|cần gợi ý)?\s*\]?\s*/i, '')
      .replace(/^\s*(?:dat|đạt|pass|chua dat|chưa đạt|fail)\s*[-–—,;:]?\s*/i, '')
      .trim(),
  }
}

const buildTutorResponse = (question, memory) => {
  const normalizedQuestion = normalizeText(question)
  let nextMemory = {
    ...memory,
    interactions: memory.interactions + 1,
    history: [...memory.history, question].slice(-8),
  }

  if (
    nextMemory.pendingQuiz &&
    !isLikelyNewQuestion(question) &&
    !normalizedQuestion.includes('bai tap') &&
    !normalizedQuestion.includes('kiem tra')
  ) {
    const topic = topics.find((item) => item.id === nextMemory.pendingQuiz.topicId) || topics[0]
    const accuracy = getAnswerAccuracy(question, nextMemory.pendingQuiz)
    const isPassing = accuracy >= PASSING_ANSWER_SCORE
    nextMemory = rememberTopic(nextMemory, topic.id, isPassing ? 18 : -8)
    nextMemory = {
      ...nextMemory,
      streak: isPassing ? nextMemory.streak + 1 : 0,
      level: isPassing && nextMemory.streak >= 2 ? 'Tăng tốc' : nextMemory.level,
      pendingQuiz: isPassing ? null : nextMemory.pendingQuiz,
    }

    return {
      memory: nextMemory,
      text: isPassing
        ? `Đáp án đạt yêu cầu. Lời giải chuẩn: ${topic.answerText}. AI đã tăng điểm nắm vững phần ${topic.label}.`
        : `Chưa đủ để chốt đáp án. Gợi ý thêm: em hãy nhìn lại đề, tìm đại lượng đã biết và đại lượng cần tính trước, rồi thử viết công thức phù hợp.`,
    }
  }

  const topic = findTopic(question, nextMemory)
  const asksForQuiz =
    normalizedQuestion.includes('bai tap') ||
    normalizedQuestion.includes('kiem tra') ||
    normalizedQuestion.includes('hoi toi') ||
    normalizedQuestion.includes('tu luyen')
  const asksForRoadmap =
    normalizedQuestion.includes('lo trinh') ||
    normalizedQuestion.includes('hoc tiep') ||
    normalizedQuestion.includes('nen hoc gi') ||
    normalizedQuestion.includes('tien trinh')
  const needsSlowExplanation =
    normalizedQuestion.includes('chua hieu') ||
    normalizedQuestion.includes('giai thich lai') ||
    normalizedQuestion.includes('don gian')

  nextMemory = rememberTopic(nextMemory, topic.id, needsSlowExplanation ? -3 : 8)

  if (asksForRoadmap) {
    const weakTopics = getWeakTopics(nextMemory)
      .map((item) => item.label)
      .join(' và ')

    return {
      memory: {
        ...nextMemory,
        level: 'Cá nhân hóa',
      },
      text: `Lộ trình hiện tại: ôn ${weakTopics}, sau đó làm bài ${topic.label}. AI ưu tiên phần có điểm nắm vững thấp nhất.`,
    }
  }

  if (asksForQuiz) {
    return {
      memory: {
        ...nextMemory,
        pendingQuiz: {
          topicId: topic.id,
          answerKeywords: topic.answerKeywords,
        },
      },
      text: `Bài luyện ${topic.label}: ${topic.exercise} Trả lời ngắn, AI sẽ tự chấm và cập nhật mức hiểu của bạn.`,
    }
  }

  if (needsSlowExplanation) {
    return {
      memory: {
        ...nextMemory,
        level: 'Giải thích chậm',
      },
      text: `${topic.label}: ${topic.summary} Nói ngắn gọn: ${topic.tip} AI đã ghi nhớ bạn cần giải thích chậm hơn ở phần này.`,
    }
  }

  return {
    memory: nextMemory,
    text: `${topic.label}: ${topic.summary} Mẹo làm bài: ${topic.tip} Bạn có thể gõ "bài tập" để AI tạo câu luyện theo đúng phần này.`,
  }
}

const extractAiText = (data) => {
  const content = data?.choices?.[0]?.message?.content

  const rawText = Array.isArray(content)
    ? content
      .map((item) => item?.text || item?.content || '')
      .filter(Boolean)
      .join('\n')
    : content || data?.output_text || data?.message || ''

  const answerOnly = stripAiControlTags(rawText).trim()

  return normalizeFormulaText(answerOnly)
}

const normalizeFormulaText = (value) =>
  value
    .replace(/\$([^$]+)\$/g, '$1')
    .replace(/\\times/g, '×')
    .replace(/\\cdot/g, '·')
    .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '$1 / $2')

const requestAiResponse = async ({
  question,
  topic,
  memory,
  previousMessages,
  mode,
  originalQuestion,
}) => {
  const weakTopics = getWeakTopics(memory)
    .map((item) => item.label)
    .join(', ')
  const lessonKnowledgeContext = buildLessonKnowledgeContext()
  const questionKind = getQuestionKind(originalQuestion || question)
  const firstHintRule =
    questionKind === 'formula'
      ? 'Đây là câu hỏi về công thức hoặc định luật, không phải bài toán có đề cho số liệu. Gợi ý phải thật dễ: nêu rõ các kí hiệu liên quan, nói quan hệ tăng/giảm bằng lời đơn giản, rồi đưa một lựa chọn gần đáp án để học sinh đoán, ví dụ "I = U / R hay I = R / U?". Tránh gợi ý trừu tượng như "đại lượng đứng vế trái" hoặc "ghép quan hệ". Chưa chốt đáp án cuối nếu học sinh chưa trả lời.'
      : questionKind === 'concept'
        ? 'Đây là câu hỏi khái niệm/giải thích, không phải bài toán tính. Hãy gợi ý bằng ngôn ngữ đời thường, hỏi học sinh thử nêu ý nghĩa hoặc vai trò của khái niệm đó. Không hỏi "đề cho gì, đề hỏi gì".'
        : questionKind === 'exercise'
          ? 'Đây là bài tính toán hoặc bài có dữ kiện. Hãy gợi ý học sinh xác định dữ kiện đã cho, đại lượng cần tìm và công thức phù hợp. Chỉ dùng mẫu "đề cho gì, hỏi gì" trong loại bài này.'
          : 'Đây là câu hỏi học tập chung. Hãy gợi ý theo đúng nội dung học sinh hỏi, tự nhiên như gia sư đang trò chuyện, không dùng mẫu cứng.'
  const guidanceRule =
    mode === 'answer'
      ? `Đây là lượt học sinh trả lời sau khi đã nhận gợi ý. Câu hỏi ban đầu là: "${originalQuestion || question}". Học sinh vừa phản hồi: "${question}". Hãy chấm độ chính xác câu trả lời theo thang 0-100 cho hệ thống dùng nội bộ. Dòng đầu tiên bắt buộc viết đúng mẫu: "Điểm: NN%". Từ dòng thứ hai trở đi tuyệt đối không nhắc lại điểm, phần trăm, ngưỡng chấm hay chữ "độ chính xác". Nếu NN >= ${PASSING_ANSWER_SCORE}, hãy chốt đáp án thật, giải từng bước ngắn gọn và chỉ rõ lỗi sai/thiếu trong câu trả lời của học sinh. Nếu NN < ${PASSING_ANSWER_SCORE}, tuyệt đối chưa đưa đáp án cuối hoặc lời giải hoàn chỉnh; chỉ nói còn thiếu ý nào và đưa thêm một gợi ý vừa sức để học sinh trả lời lại.`
      : `Đây là lượt đầu tiên của một câu hỏi mới. Không trả lời đáp án cuối ngay. ${firstHintRule} Gợi ý phải vừa sức, cụ thể theo câu hỏi của học sinh, tối đa 2-3 câu. Kết thúc bằng một câu hỏi nhỏ để học sinh thử trả lời tiếp. Không trình bày lời giải hoàn chỉnh.`

  const response = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      temperature: 0.35,
      max_tokens: 1400,
      messages: [
        {
          role: 'system',
          content:
            'Bạn là AI tự học cho website Vật lí 11. Trả lời bằng tiếng Việt, ngắn gọn, đúng kiến thức phổ thông, ưu tiên giải thích từng bước và luôn khuyến khích học sinh tự làm tiếp. Không hiển thị quá trình suy nghĩ nội bộ, không dùng thẻ <think>. Không dùng markdown đậm kiểu **...** cho công thức; hãy viết công thức rõ ràng như P = U × I, I = U / R.',
        },
        {
          role: 'system',
          content: `Ngữ cảnh học tập: học sinh đang ở Chương IV - Dòng điện. Mạch điện. Chủ đề đang chọn: ${topic.label}. Điểm nắm vững gần đúng: ${memory.mastery[topic.id]?.score ?? 0}/100. Các phần nên luyện thêm: ${weakTopics}.`,
        },
        {
          role: 'system',
          content: `Hệ thống kiến thức cố định của Chương IV. Khi trả lời, phải ưu tiên bám sát hệ thống kiến thức này hơn kiến thức chung; nếu cần suy luận ngoài phạm vi thì nói rõ.\n\n${lessonKnowledgeContext}`,
        },
        {
          role: 'system',
          content: guidanceRule,
        },
        ...previousMessages.slice(-6).map((message) => ({
          role: message.role === 'user' ? 'user' : 'assistant',
          content: message.text,
        })),
        {
          role: 'user',
          content: question,
        },
      ],
    }),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error || data.message || 'Không gọi được AI endpoint')
  }

  const text = extractAiText(data).trim()

  if (!text) {
    throw new Error('AI endpoint không trả về nội dung')
  }

  return text
}

function Icon({ name }) {
  if (name === 'ohm') {
    return <img className="icon icon-ohm icon-image" src={omegaImage} alt="" aria-hidden="true" />
  }

  if (name === 'battery') {
    return <img className="icon icon-battery icon-image" src={cucPinImage} alt="" aria-hidden="true" />
  }

  if (name === 'bulb') {
    return <img className="icon icon-bulb icon-image" src={bongDenImage} alt="" aria-hidden="true" />
  }

  if (name === 'flask') {
    return <img className="icon icon-flask icon-image" src={vonKeImage} alt="" aria-hidden="true" />
  }

  return (
    <svg className={`icon icon-${name}`} viewBox="0 0 24 24" aria-hidden="true">
      {name === 'home' && <path d="M3 11.5 12 4l9 7.5v8a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />}
      {name === 'document' && <path d="M6 3h9l3 3v15H6zM9 10h6M9 14h6M9 18h4" />}
      {name === 'game' && <path d="M7 8h10a4 4 0 0 1 3.8 5.3l-.9 2.8a2 2 0 0 1-3.4.7L14.8 15H9.2l-1.7 1.8a2 2 0 0 1-3.4-.7l-.9-2.8A4 4 0 0 1 7 8zm1.5 3v4M6.5 13h4M16 12h.1M18 15h.1" />}
      {name === 'clipboard' && <path d="M8 5h8v3H8zM6 7H4v14h16V7h-2M8 12h8M8 16h8" />}
      {name === 'users' && <path d="M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm7-1a3 3 0 1 0 0-6M2 21a7 7 0 0 1 14 0M15 15a6 6 0 0 1 7 6" />}
      {name === 'notebook' && <path d="M7 4h12v16H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zm0 0v16M10 8h6M10 12h6" />}
      {name === 'bot' && <path d="M8 9h8a4 4 0 0 1 4 4v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2a4 4 0 0 1 4-4zm4 0V5m0 0h.1M9 14h.1M15 14h.1M9 17h6" />}
      {name === 'help' && <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm-3-11a3 3 0 1 1 4.5 2.6c-.9.5-1.5 1.1-1.5 2.4M12 18h.1" />}
      {name === 'headset' && <path d="M4 13a8 8 0 0 1 16 0v4a2 2 0 0 1-2 2h-2v-7h4M4 12h4v7H6a2 2 0 0 1-2-2zm8 8h4" />}
      {name === 'menu' && <path d="M4 7h16M4 12h16M4 17h16" />}
      {name === 'search' && <path d="M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm5-2 4 4" />}
      {name === 'bell' && <path d="M6 17h12l-1.5-2v-4a4.5 4.5 0 0 0-9 0v4zm4 3h4" />}
      {name === 'book' && <path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v17H7.5A3.5 3.5 0 0 0 4 22zm0 0V22M8 6h8M8 10h8" />}
      {name === 'clock' && <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0-14v5l3 2" />}
      {name === 'target' && <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0-4a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-3 7-7" />}
      {name === 'bar' && <path d="M5 20V10M12 20V4M19 20v-7" />}
      {name === 'star' && <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />}
      {name === 'flame' && <path d="M12 21a7 7 0 0 0 6-10.6c-1.4 1.2-3.2.7-3.2-1.2 0-2-1.4-4.2-3.8-6.2.4 3.3-1.8 5.4-3.8 7.3A6.5 6.5 0 0 0 12 21z" />}
      {name === 'shield' && <path d="M12 3 20 6v5c0 5-3.3 8.5-8 10-4.7-1.5-8-5-8-10V6zm-3 9 2 2 4-5" />}
      {name === 'send' && <path d="M21 3 3 11l7 3 3 7zM10 14l11-11" />}
      {name === 'play' && <path d="m8 5 11 7-11 7z" />}
      {name === 'lock' && <path d="M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5zm7 4v3" />}
      {name === 'bolt' && <path d="M13 2 4 14h7l-1 8 10-13h-7z" />}
      {name === 'trophy' && <path d="M8 4h8v3a4 4 0 0 1-8 0zm0 2H4a4 4 0 0 0 4 4M16 6h4a4 4 0 0 1-4 4M12 11v6M9 21h6M8 17h8" />}
    </svg>
  )
}

function CircuitHeroSvg() {
  if (denImage) {
    return <img className="circuit-hero circuit-hero--image" src={denImage} alt="" aria-hidden="true" />
  }

  return (
    <svg className="circuit-hero" viewBox="0 0 720 280" aria-hidden="true">
      <defs>
        <pattern id="circuitPattern" width="118" height="72" patternUnits="userSpaceOnUse">
          <path d="M0 36H30l16-16h28M74 20h24M46 20v32h30l16 16h26" />
          <circle cx="30" cy="36" r="4" />
          <circle cx="98" cy="20" r="4" />
          <circle cx="92" cy="68" r="4" />
        </pattern>
        <radialGradient id="heroHalo" cx="52%" cy="54%" r="52%">
          <stop offset="0%" stopColor="#fff1a8" stopOpacity="0.65" />
          <stop offset="48%" stopColor="#ff8c39" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#0c3292" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glassGlow" cx="42%" cy="26%" r="64%">
          <stop offset="0%" stopColor="#fff9c8" />
          <stop offset="46%" stopColor="#ffc15b" />
          <stop offset="100%" stopColor="#f58a31" />
        </radialGradient>
        <linearGradient id="batteryCan" x1="0" x2="1">
          <stop offset="0%" stopColor="#0b111d" />
          <stop offset="46%" stopColor="#2b3344" />
          <stop offset="100%" stopColor="#050812" />
        </linearGradient>
        <linearGradient id="copperTop" x1="0" x2="1">
          <stop offset="0%" stopColor="#be681f" />
          <stop offset="42%" stopColor="#ffd192" />
          <stop offset="100%" stopColor="#a45219" />
        </linearGradient>
        <linearGradient id="meterBody" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#566071" />
          <stop offset="38%" stopColor="#202838" />
          <stop offset="100%" stopColor="#101622" />
        </linearGradient>
      </defs>
      <rect className="circuit-pattern-fill" width="720" height="280" />
      <rect className="hero-halo" x="0" y="0" width="720" height="280" />

      <path className="wire wire-dark wire-main" d="M75 80C118 40 196 32 252 47" />
      <path className="wire wire-red wire-main" d="M278 50C322 24 364 39 386 74" />
      <path className="wire wire-red wire-main" d="M446 198C514 244 592 236 652 176" />
      <path className="wire wire-gold wire-main" d="M218 197C266 224 312 220 352 182" />

      <g className="switch-board">
        <path className="board-face" d="M42 176 190 134l92 52-154 50z" />
        <path className="board-side" d="M42 176 128 236 282 186 282 199 128 251 42 190z" />
        <circle cx="91" cy="177" r="12" />
        <circle cx="188" cy="162" r="10" />
        <circle cx="222" cy="191" r="10" />
        <circle cx="124" cy="220" r="10" />
        <path className="switch-post" d="M104 174h100M118 216l92-25" />
        <rect className="switch-handle" x="89" y="150" width="92" height="13" rx="6" />
        <rect className="switch-lever" x="125" y="147" width="76" height="7" rx="3" transform="rotate(-19 163 150)" />
      </g>

      <g className="battery-hero">
        <path d="M226 60h102v118c0 19-23 32-51 32s-51-13-51-32z" />
        <ellipse cx="277" cy="60" rx="51" ry="18" />
        <ellipse cx="277" cy="178" rx="51" ry="22" />
        <rect x="248" y="30" width="18" height="28" rx="6" />
        <ellipse cx="257" cy="29" rx="10" ry="5" />
        <rect x="292" y="43" width="31" height="12" rx="6" />
        <ellipse cx="308" cy="42" rx="16" ry="5" />
        <path d="M230 70c22 12 72 12 94 0" />
        <circle cx="239" cy="104" r="2" />
        <circle cx="239" cy="133" r="2" />
      </g>

      <g className="bulb-hero">
        <circle className="bulb-aura" cx="392" cy="132" r="83" />
        <circle className="bulb-glass" cx="392" cy="132" r="49" />
        <path className="bulb-shine" d="M373 105c9-12 21-19 36-20" />
        <path className="bulb-filament" d="M374 142c7-15 18-15 23 0 5-15 16-15 23 0M397 140v30M377 169h40" />
        <path className="bulb-base" d="M363 174h58v16c0 8-13 14-29 14s-29-6-29-14z" />
        <path className="bulb-base-lines" d="M364 181h56M367 191h50M372 201h40" />
        <ellipse className="bulb-foot" cx="392" cy="212" rx="74" ry="19" />
      </g>

      <g className="meter">
        <path className="meter-body" d="M538 25h118a24 24 0 0 1 24 24v164a22 22 0 0 1-22 22H520a22 22 0 0 1-21-29l38-165a24 24 0 0 1 1-16z" />
        <path className="meter-screen" d="M545 49h99a14 14 0 0 1 14 14v73H530V64a15 15 0 0 1 15-15z" />
        <path className="meter-arc" d="M547 115a46 46 0 0 1 94 0" />
        <path className="meter-needle" d="M594 117l-37-43" />
        <path className="meter-ticks" d="M549 93l-9-5M559 77l-7-8M576 67l-4-11M612 67l4-11M630 78l7-8M640 95l9-5" />
        <text x="585" y="111">A</text>
        <path className="meter-base" d="M512 179h151l20 42H495z" />
        <circle className="meter-knob" cx="592" cy="165" r="14" />
        <circle className="terminal terminal-red" cx="531" cy="205" r="8" />
        <circle className="terminal" cx="588" cy="211" r="6" />
        <circle className="terminal terminal-gold" cx="645" cy="205" r="8" />
        <text className="meter-sign minus" x="523" y="170">-</text>
        <text className="meter-sign plus" x="645" y="170">+</text>
      </g>
    </svg>
  )
}

function SidebarCircuitArt() {
  return (
    <div className="sidebar-art" aria-hidden="true">
      <img src={sidebarCircuitImage} alt="" />
    </div>
  )
}

function AtomLogo() {
  return (
    <svg className="atom-logo" viewBox="0 0 44 44" aria-hidden="true">
      <circle cx="22" cy="22" r="4" />
      <ellipse cx="22" cy="22" rx="18" ry="7" />
      <ellipse cx="22" cy="22" rx="18" ry="7" transform="rotate(60 22 22)" />
      <ellipse cx="22" cy="22" rx="18" ry="7" transform="rotate(120 22 22)" />
    </svg>
  )
}

function Avatar() {
  return (
    <svg className="avatar" viewBox="0 0 44 44" aria-hidden="true">
      <circle cx="22" cy="22" r="22" fill="#d9efff" />
      <circle cx="22" cy="19" r="11" fill="#f2b37b" />
      <path d="M11 20c1-11 6-15 13-15 7 2 10 6 9 15-6-6-15-5-22 0z" fill="#1c2f48" />
      <path d="M10 36c3-7 8-10 12-10s9 3 12 10c-6 5-18 5-24 0z" fill="#1f74dc" />
      <circle cx="18" cy="20" r="1.4" fill="#132338" />
      <circle cx="26" cy="20" r="1.4" fill="#132338" />
      <path d="M18 25c3 2 6 2 8 0" stroke="#8b4f37" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function LessonDiagram({ topic }) {
  if (topic.id === 'cuong-do-dong-dien') {
    return (
      <img
        className="lesson-diagram lesson-diagram--image"
        src={lesson22CircuitImage}
        alt="Sơ đồ mạch điện có chiều dòng điện I"
      />
    )
  }

  if (topic.id === 'dien-tro-dinh-luat-om') {
    return (
      <img
        className="lesson-diagram lesson-diagram--image"
        src={dienTroImage}
        alt="Sơ đồ điện trở và đường đặc trưng vôn-ampe"
      />
    )
  }

  if (topic.id === 'nguon-dien') {
    return (
      <img
        className="lesson-diagram lesson-diagram--image"
        src={pinImage}
        alt="Sơ đồ nguồn điện trong mạch điện"
      />
    )
  }

  if (topic.id === 'nang-luong-cong-suat-dien') {
    return (
      <img
        className="lesson-diagram lesson-diagram--image"
        src={dongHoImage}
        alt="Sơ đồ đồng hồ đo điện và công suất điện"
      />
    )
  }

  return (
    <img
      className="lesson-diagram lesson-diagram--image"
      src={soDoImage}
      alt="Sơ đồ mạch đo suất điện động và điện trở trong của pin"
    />
  )
}

const lessonMindmapPositions = ['left-top', 'left-middle', 'left-bottom', 'right-top', 'right-bottom']

const getMindmapPalette = (topicId) =>
  mindmapCards.find((card) => card.topicId === topicId) || {
    color: '#246bff',
    softColor: '#f6fbff',
  }

function LessonMindmap({ topic, onClose }) {
  const branches = lessonMindmaps[topic.id] || []
  const palette = getMindmapPalette(topic.id)

  return (
    <div className="lesson-mindmap-backdrop" role="presentation" onClick={onClose}>
      <section
        aria-modal="true"
        aria-label={`Sơ đồ tư duy ${topic.shortLabel}`}
        className="lesson-mindmap-popup"
        role="dialog"
        style={{
          '--topic-color': palette.color,
          '--topic-soft': palette.softColor,
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="lesson-mindmap-heading">
          <h2>{`Sơ đồ tư duy Bài ${topic.number}`}</h2>
          <button type="button" aria-label="Đóng sơ đồ tư duy" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="lesson-mindmap">
          <div className="lesson-mindmap__center">
            <span>{`Bài ${topic.number}`}</span>
            <strong>{topic.shortLabel}</strong>
          </div>

          <svg className="lesson-mindmap__lines" viewBox="0 0 1768 890" aria-hidden="true" preserveAspectRatio="none">
            <path d="M642 170 H712 C785 170 785 312 785 340 H865" />
            <path d="M642 445 H865" />
            <path d="M642 718 H712 C785 718 785 560 785 520 H865" />
            <path d="M1115 340 C1115 245 1192 218 1270 218 H1318" />
            <path d="M1115 520 C1115 646 1196 676 1318 676" />
          </svg>

          {branches.map((branch, index) => (
            <article
              className={`lesson-mindmap__branch lesson-mindmap__branch--${lessonMindmapPositions[index] || 'left-middle'}`}
              key={branch.title}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{branch.title}</h3>
              <ul>
                {branch.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

// Kept as the older guided lesson variant for quick rollback/reference.
// eslint-disable-next-line no-unused-vars
function Lesson22Content({ onAction }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [prediction, setPrediction] = useState(null)
  const [formulaChoice, setFormulaChoice] = useState(null)
  const [metalChoice, setMetalChoice] = useState(null)
  const [batteryAnswer, setBatteryAnswer] = useState('')
  const [batteryFeedback, setBatteryFeedback] = useState(null)
  const [answers, setAnswers] = useState({})
  const [pulse, setPulse] = useState(null)
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)
  const [hasSavedCompletion, setHasSavedCompletion] = useState(false)
  const lessonSteps = [
    'Hiện tượng',
    'Dự đoán',
    'Công thức',
    'Kim loại',
    'mAh thực tế',
    'Quiz',
    'Tổng kết',
  ]
  const answeredCount = Object.keys(answers).length
  const correctCount = lesson22Quiz.filter((item) => answers[item.id] === item.answer).length
  const isUnlocked =
    prediction === 0 &&
    formulaChoice === 0 &&
    metalChoice === 1 &&
    batteryFeedback === 'correct' &&
    answeredCount === lesson22Quiz.length

  const giveFeedback = (isCorrect) => {
    const type = isCorrect ? 'correct' : 'wrong'
    setPulse(type)
    playLessonTone(type)
    window.setTimeout(() => setPulse(null), 520)
  }

  const goNext = () => setCurrentStep((step) => Math.min(lessonSteps.length - 1, step + 1))

  const handlePrediction = (index) => {
    setPrediction(index)
    giveFeedback(index === 0)
    if (index === 0) {
      window.setTimeout(goNext, 620)
    }
  }

  const handleFormulaChoice = (index) => {
    setFormulaChoice(index)
    giveFeedback(index === 0)
    if (index === 0) {
      window.setTimeout(goNext, 620)
    }
  }

  const handleMetalChoice = (index) => {
    setMetalChoice(index)
    giveFeedback(index === 1)
    if (index === 1) {
      window.setTimeout(goNext, 620)
    }
  }

  const handleBatteryCheck = () => {
    const normalizedAnswer = normalizeText(batteryAnswer).replace(/\s/g, '')
    const isCorrect =
      normalizedAnswer.includes('400') ||
      normalizedAnswer.includes('0.4') ||
      normalizedAnswer.includes('0,4')

    setBatteryFeedback(isCorrect ? 'correct' : 'wrong')
    giveFeedback(isCorrect)
    if (isCorrect) {
      window.setTimeout(goNext, 620)
    }
  }

  const handleQuizAnswer = (item, optionIndex) => {
    setAnswers((currentAnswers) => ({ ...currentAnswers, [item.id]: optionIndex }))
    giveFeedback(optionIndex === item.answer)
  }

  const handleSummaryClick = () => {
    if (!isUnlocked) {
      return
    }

    setIsSummaryOpen((currentValue) => !currentValue)
    if (!hasSavedCompletion) {
      setHasSavedCompletion(true)
      onAction('Đã hoàn thành nội dung Bài 22')
    }
  }

  return (
    <div className={`lesson22-content ${pulse ? `lesson22-content--${pulse}` : ''}`}>
      <div className="lesson22-progress" aria-label="Tiến trình học Bài 22">
        {lessonSteps.map((step, index) => (
          <button
            className={index === currentStep ? 'lesson22-step lesson22-step--active' : index < currentStep ? 'lesson22-step lesson22-step--done' : 'lesson22-step'}
            key={step}
            type="button"
            onClick={() => index <= currentStep && setCurrentStep(index)}
          >
            <span>{index + 1}</span>
            {step}
          </button>
        ))}
      </div>

      {currentStep === 0 && (
        <section className="lesson22-stage lesson22-stage--hero">
          <div>
            <p>Trước khi học</p>
            <h3>Khi dòng điện mạnh hơn, thiết bị thay đổi ra sao?</h3>
            <span>
              Quan sát bóng đèn, bếp điện hoặc sạc dự phòng: đèn có thể sáng hơn, bếp nóng hơn. Bài học này giúp em
              tìm đại lượng đo độ mạnh yếu đó.
            </span>
            <button className="lesson22-primary" type="button" onClick={goNext}>Bắt đầu khám phá</button>
          </div>
          <div className="lesson22-lab" aria-hidden="true">
            <div className="lesson22-wire" />
            <div className="lesson22-bulb"><span /></div>
            <div className="lesson22-battery">4000 mAh</div>
          </div>
        </section>
      )}

      {currentStep === 1 && (
        <section className="lesson22-stage">
          <p>Dự đoán nhanh</p>
          <h3>Đại lượng nào đặc trưng cho dòng điện mạnh hay yếu?</h3>
          <div className="lesson22-choice-grid">
            {[
              'Nhiều điện lượng đi qua thiết bị trong một đơn vị thời gian.',
              'Dây dẫn càng dài thì dòng điện luôn càng mạnh.',
              'Độ mạnh yếu của dòng điện không định lượng được.',
            ].map((option, index) => (
              <button
                className={
                  prediction === index
                    ? index === 0
                      ? 'lesson22-card-choice lesson22-card-choice--correct'
                      : 'lesson22-card-choice lesson22-card-choice--wrong'
                    : 'lesson22-card-choice'
                }
                key={option}
                onClick={() => handlePrediction(index)}
                type="button"
              >
                <strong>{String.fromCharCode(65 + index)}</strong>
                <span>{option}</span>
              </button>
            ))}
          </div>
          {prediction !== null && prediction !== 0 && <p className="lesson22-feedback lesson22-feedback--wrong">Tẹt tẹt. Chưa đúng: dây dài hay ngắn không tự nói lên dòng điện mạnh hay yếu. Hãy chọn theo lượng điện tích đi qua mỗi giây.</p>}
          {prediction === 0 && <p className="lesson22-feedback lesson22-feedback--correct">Ting ting. Đúng hướng rồi: ta cần so sánh điện lượng đi qua trong cùng một khoảng thời gian.</p>}
        </section>
      )}

      {currentStep === 2 && (
        <section className="lesson22-stage">
          <p>Kiến thức cốt lõi</p>
          <h3>Cường độ dòng điện được tính như thế nào?</h3>
          <div className="lesson22-formula-panel">
            <div className="lesson22-formula">I = Δq / Δt</div>
            <span>Với dòng điện không đổi: I = q / t. Đơn vị là ampe (A), và 1 C = 1 A.s.</span>
          </div>
          <div className="lesson22-choice-grid lesson22-choice-grid--compact">
            {[
              'I = Δq / Δt',
              'I = Δt / Δq',
              'I = q.t',
            ].map((option, index) => (
              <button
                className={
                  formulaChoice === index
                    ? index === 0
                      ? 'lesson22-card-choice lesson22-card-choice--correct'
                      : 'lesson22-card-choice lesson22-card-choice--wrong'
                    : 'lesson22-card-choice'
                }
                key={option}
                onClick={() => handleFormulaChoice(index)}
                type="button"
              >
                <strong>{option}</strong>
                <span>{index === 0 ? 'Điện lượng chia thời gian' : 'Thử kiểm tra lại ý nghĩa của thương số.'}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {currentStep === 3 && (
        <section className="lesson22-stage">
          <p>Dòng điện trong kim loại</p>
          <h3>Electron tự do chuyển động theo chiều nào?</h3>
          <div className="lesson22-metal">
            <div className="lesson22-current-arrow">Chiều dòng điện quy ước →</div>
            <div className="lesson22-electrons">
              <span>e</span><span>e</span><span>e</span><span>e</span>
            </div>
            <div className="lesson22-electron-arrow">← Chiều electron tự do</div>
          </div>
          <p className="lesson22-note">Trong kim loại, electron tự do dịch chuyển có hướng ngược chiều dòng điện quy ước. Công thức vi mô: I = Snve.</p>
          <div className="lesson22-choice-grid lesson22-choice-grid--compact">
            {[
              'Electron đi cùng chiều dòng điện quy ước.',
              'Electron đi ngược chiều dòng điện quy ước.',
            ].map((option, index) => (
              <button
                className={
                  metalChoice === index
                    ? index === 1
                      ? 'lesson22-card-choice lesson22-card-choice--correct'
                      : 'lesson22-card-choice lesson22-card-choice--wrong'
                    : 'lesson22-card-choice'
                }
                key={option}
                onClick={() => handleMetalChoice(index)}
                type="button"
              >
                <strong>{index === 0 ? 'Cùng chiều' : 'Ngược chiều'}</strong>
                <span>{option}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {currentStep === 4 && (
        <section className="lesson22-stage">
          <p>Vận dụng thực tế</p>
          <h3>Pin 4000 mAh dùng được bao lâu?</h3>
          <div className="lesson22-real-card">
            <strong>Sạc dự phòng: 4000 mAh</strong>
            <span>Nếu thiết bị dùng dòng 1000 mA, thời gian dùng xấp xỉ là 4 giờ. Nếu thiết bị dùng dòng 400 mA, pin dùng khoảng bao nhiêu giờ?</span>
          </div>
          <div className="lesson22-answer-row">
            <input
              value={batteryAnswer}
              onChange={(event) => setBatteryAnswer(event.target.value)}
              placeholder="Nhập đáp án, ví dụ: 10 giờ"
            />
            <button type="button" onClick={handleBatteryCheck}>Kiểm tra</button>
          </div>
          {batteryFeedback === 'wrong' && <p className="lesson22-feedback lesson22-feedback--wrong">Tẹt tẹt. Gợi ý: 4000 mAh / 400 mA = ? giờ.</p>}
          {batteryFeedback === 'correct' && <p className="lesson22-feedback lesson22-feedback--correct">Ting ting. Đúng: 4000 / 400 = 10 giờ.</p>}
        </section>
      )}

      {currentStep === 5 && (
        <section className="lesson22-stage">
          <p>Luyện tập tự động</p>
          <h3>Hoàn thành 3 câu để mở tổng kết</h3>
          <div className="lesson22-quiz">
            {lesson22Quiz.map((item, questionIndex) => {
              const selectedAnswer = answers[item.id]
              const hasAnswered = selectedAnswer !== undefined

              return (
                <fieldset className="lesson22-question" key={item.id}>
                  <legend>{questionIndex + 1}. {item.question}</legend>
                  {item.options.map((option, optionIndex) => (
                    <label
                      className={
                        hasAnswered && optionIndex === item.answer
                          ? 'lesson22-option lesson22-option--correct'
                          : hasAnswered && selectedAnswer === optionIndex
                            ? 'lesson22-option lesson22-option--wrong'
                            : 'lesson22-option'
                      }
                      key={option}
                    >
                      <input
                        checked={selectedAnswer === optionIndex}
                        name={`lesson22-${item.id}`}
                        onChange={() => handleQuizAnswer(item, optionIndex)}
                        type="radio"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                  {hasAnswered && <p>{item.explain}</p>}
                </fieldset>
              )
            })}
            <strong>{answeredCount}/{lesson22Quiz.length} câu đã trả lời, đúng {correctCount}/{lesson22Quiz.length} câu.</strong>
          </div>
          <button className="lesson22-primary" disabled={answeredCount < lesson22Quiz.length} type="button" onClick={goNext}>Sang phần tổng kết</button>
        </section>
      )}

      {currentStep === 6 && (
        <section className="lesson22-summary">
          <button
            className={isUnlocked ? 'lesson22-summary-button lesson22-summary-button--unlocked' : 'lesson22-summary-button'}
            disabled={!isUnlocked}
            onClick={handleSummaryClick}
            type="button"
          >
            {isUnlocked ? 'Bấm vào đây để tổng kết kiến thức' : 'Khóa: hãy sửa các câu sai để mở tổng kết'}
          </button>
          {isSummaryOpen && (
            <div className="lesson22-summary-panel">
              <strong>Tổng kết Bài 22</strong>
              <p>Cường độ dòng điện cho biết dòng điện mạnh hay yếu: I = Δq / Δt, với dòng điện không đổi I = q / t.</p>
              <p>Trong kim loại, dòng điện do electron tự do dịch chuyển có hướng; chiều electron ngược chiều dòng điện quy ước.</p>
              <p>Công thức vi mô cần nhớ: I = Snve. Khi vận dụng pin mAh/Ah, hãy hiểu đó là điện lượng q và dùng q = I.t.</p>
            </div>
          )}
        </section>
      )}
    </div>
  )
}

const lesson22VideoInteractions = [
  {
    id: 'intro-observe',
    type: 'message',
    startTime: 0,
    endTime: 2,
    text: 'Quan sát video để trả lời câu hỏi',
  },
  {
    id: 'brighter-case',
    type: 'question',
    time: 3.6,
    question: 'Sau khi quan sát video, trong trường hợp nào bóng đèn sáng hơn?',
    options: ['Trường hợp 1', 'Trường hợp 2'],
    answer: 0,
    wrongHint: 'Hãy quan sát phần phát sáng của bóng đèn ở hai trường hợp. Bóng ở Trường hợp 1 sáng rõ hơn, cho thấy tác dụng của dòng điện mạnh hơn.',
  },
  {
    id: 'observe-electrons',
    type: 'message',
    startTime: 15,
    endTime: 17,
    text: 'Quan sát sự chuyển động của các electron',
  },
  {
    id: 'electron-opposite-current',
    type: 'question',
    time: 21,
    question: 'Các electron chuyển động ngược chiều dòng điện.',
    options: ['Đúng', 'Sai'],
    answer: 0,
    correctFeedback: 'Đúng. Chiều chuyển động của các electron ngược với chiều dòng điện vì chiều dòng điện là chiều từ cực dương sang cực âm.',
    wrongFeedback: 'Sai. Chiều quy ước của dòng điện là chiều từ cực dương sang cực âm.',
    wrongHint: 'Sai. Chiều quy ước của dòng điện là chiều từ cực dương sang cực âm.',
  },
  {
    id: 'metal-wire-fill',
    type: 'drag-fill',
    time: 24,
    instruction: 'Hãy kéo những nội dung phù hợp cho phần còn thiếu',
    slots: [
      { id: 'particles', answer: 'electron tự do' },
      { id: 'motion', answer: 'có hướng' },
      { id: 'current', answer: 'dòng điện' },
    ],
    options: ['dòng điện', 'electron tự do', 'có hướng'],
    wrongHint: 'Hãy đọc thành câu trọn nghĩa: trong dây dẫn kim loại có electron tự do; các hạt này dịch chuyển có hướng; sự dịch chuyển đó tạo thành dòng điện.',
  },
  {
    id: 'brighter-fast-electrons',
    type: 'question',
    time: 28,
    question: 'Bóng đèn sáng hơn khi các electron tự do dịch chuyển nhanh hơn.',
    options: ['Đúng', 'Sai'],
    answer: 0,
    wrongHint: 'Trong cùng một thời gian, electron dịch chuyển nhanh hơn làm nhiều điện tích đi qua tiết diện dây hơn. Dòng điện mạnh hơn nên bóng đèn sáng hơn.',
  },
  {
    id: 'current-intensity-summary',
    type: 'info',
    time: 29,
    lines: [
      'Electron dịch chuyển nhanh hơn nên có nhiều điện tích',
      'đi qua dây dẫn hơn trong cùng một khoảng thời gian',
      'dẫn đến dòng điện mạnh hơn.',
      'Để đặc trưng cho độ mạnh, yếu của dòng điện',
      'cần một đại lượng là cường độ dòng điện.',
    ],
  },
  {
    id: 'current-intensity-formula',
    type: 'question',
    time: 33,
    question: 'Cường độ dòng điện được xác định bằng biểu thức?',
    options: ['I = Δq/Δt', 'I = Δt/Δq'],
    answer: 0,
    wrongHint: 'Cường độ dòng điện cho biết điện lượng đi qua tiết diện dây trong một đơn vị thời gian, nên phải lấy điện lượng Δq chia cho thời gian Δt.',
  },
  {
    id: 'final-review-sequence',
    type: 'sequence',
    time: 35,
    title: 'Lựa chọn ý đúng nhất',
    cards: [
      {
        id: 'fast-electrons',
        options: [
          'Khi electron dịch chuyển nhanh hơn, lượng điện tích đi qua tiết diện dây dẫn trong cùng thời gian sẽ ít hơn làm bóng đèn sáng mờ hơn nên dòng điện nhỏ hơn.',
          'Khi electron dịch chuyển nhanh hơn, lượng điện tích đi qua tiết diện dây dẫn trong cùng thời gian sẽ nhiều hơn làm bóng đèn sáng hơn nên dòng điện lớn hơn.',
        ],
        answer: 1,
        wrongHint: 'Electron đi nhanh hơn nghĩa là trong cùng khoảng thời gian sẽ có nhiều điện tích đi qua dây hơn, không phải ít hơn.',
      },
      {
        id: 'current-meaning',
        options: [
          'Cường độ dòng điện đặc trưng cho tác dụng mạnh, yếu của dòng điện.',
          'Cường độ dòng điện không đặc trưng cho tác dụng mạnh, yếu của dòng điện.',
        ],
        answer: 0,
        wrongHint: 'Hãy liên hệ với bóng đèn sáng mạnh hoặc yếu: cường độ dòng điện là đại lượng dùng để mô tả tác dụng mạnh, yếu đó.',
      },
      {
        id: 'formula',
        options: [
          'Cường độ dòng điện được xác định bằng công thức I = Δt/Δq.',
          'Cường độ dòng điện được xác định bằng công thức I = Δq/Δt.',
        ],
        answer: 1,
        wrongHint: 'Từ ý nghĩa “điện lượng trong một đơn vị thời gian”, tử số phải là Δq và mẫu số phải là Δt: I = Δq/Δt.',
      },
    ],
  },
]

const lesson23VideoInteractions = [
  {
    id: 'lamp-current-intensity',
    type: 'question',
    time: 4.8,
    question: 'Khi đèn sáng mạnh hơn cho thấy cường độ dòng điện như thế nào?',
    options: ['Cường độ dòng điện nhỏ hơn', 'Cường độ dòng điện lớn hơn'],
    answer: 1,
    instantFeedback: true,
    continueAfterAnswer: true,
    correctFeedback: 'Đúng rồi. Khi đèn sáng mạnh hơn cho thấy cường độ dòng điện lớn hơn.',
    wrongFeedback: 'Sai rồi. Khi đèn sáng mạnh hơn cho thấy cường độ dòng điện lớn hơn.',
  },
  {
    id: 'different-brightness-resistance',
    type: 'question',
    time: 5.5,
    question: 'Tại sao cùng một bóng đèn lại có thể có nhiều mức sáng khác nhau như vậy?',
    options: [
      'Dòng điện có các mức độ mạnh, yếu khác nhau do electron được sinh ra thêm trong dây dẫn nên bóng đèn có nhiều mức sáng khác nhau.',
      'Dòng điện có các mức độ mạnh, yếu khác nhau do electron trong dây dẫn bị cản trở khi đang dịch chuyển nên bóng đèn có nhiều mức sáng khác nhau.',
    ],
    answer: 1,
    instantFeedback: true,
    continueAfterAnswer: true,
    correctFeedback: 'Đúng rồi, các electron có thể bị cản trở trong khi dịch chuyển sinh ra các dòng điện khác nhau nên bóng đèn cũng sẽ có mức độ sáng khác nhau.',
    wrongFeedback: 'Sai rồi, các electron có thể bị cản trở trong khi dịch chuyển sinh ra các dòng điện khác nhau nên bóng đèn cũng sẽ có mức độ sáng khác nhau chứ không thể tự tạo thêm electron được.',
  },
  {
    id: 'go-inside-bulb',
    type: 'info',
    time: 6.3,
    lines: ['Cùng đi sâu vào trong bóng đèn nhé'],
  },
  {
    id: 'observe-conductors-lead',
    type: 'message',
    startTime: 10,
    endTime: Number.POSITIVE_INFINITY,
    transparent: true,
    text: 'Theo em, bên trong vật dẫn có thể tồn tại điều gì khiến electron bị cản trở như vậy? Hãy quan sát sự chuyển động của các electron trong 2 vật dẫn dưới đây.',
    actionLabel: 'Tiếp tục',
  },
]

function InteractiveLessonVideo({ src, title, interactions, onComplete }) {
  const videoRef = useRef(null)
  const [activeInteraction, setActiveInteraction] = useState(null)
  const [answeredInteractions, setAnsweredInteractions] = useState({})
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [dragAnswers, setDragAnswers] = useState({})
  const [answerResult, setAnswerResult] = useState(null)
  const [sequenceIndex, setSequenceIndex] = useState(0)
  const [sequenceCorrect, setSequenceCorrect] = useState([])
  const [sequenceWrongCount, setSequenceWrongCount] = useState(0)

  const openTimedInteraction = (interaction) => {
    const video = videoRef.current

    if (!video) {
      return
    }

    video.pause()
    setSelectedAnswer(null)
    setDragAnswers({})
    setAnswerResult(null)
    setSequenceIndex(0)
    setSequenceCorrect([])
    setSequenceWrongCount(0)
    setActiveInteraction(interaction)
  }

  const syncInteractionWithTime = () => {
    const video = videoRef.current

    if (!video) {
      return
    }

    if (['question', 'drag-fill', 'info', 'sequence'].includes(activeInteraction?.type)) {
      return
    }

    const currentTime = video.currentTime
    const dueInteraction = interactions.find(
      (interaction) =>
        ['question', 'drag-fill', 'info', 'sequence'].includes(interaction.type) &&
        currentTime >= interaction.time &&
        !answeredInteractions[interaction.id],
    )

    if (dueInteraction) {
      openTimedInteraction(dueInteraction)
      return
    }

    const timedMessage = interactions.find(
      (interaction) =>
        interaction.type === 'message' &&
        currentTime >= interaction.startTime &&
        currentTime <= interaction.endTime,
    )

    if (timedMessage) {
      setActiveInteraction(timedMessage)
      return
    }

    if (activeInteraction?.type === 'message') {
      setActiveInteraction(null)
    }
  }

  const handleVideoEnded = () => {
    const finalInteraction = interactions.find((interaction) => interaction.type === 'sequence' && !answeredInteractions[interaction.id])

    if (finalInteraction) {
      openTimedInteraction(finalInteraction)
    }
  }

  const handleCheckAnswer = () => {
    if (!activeInteraction || activeInteraction.type !== 'question' || selectedAnswer === null) {
      return
    }

    setAnswerResult(selectedAnswer === activeInteraction.answer ? 'correct' : 'wrong')
  }

  const handleSelectAnswer = (interaction, answerIndex) => {
    setSelectedAnswer(answerIndex)
    setAnswerResult(interaction.instantFeedback ? (answerIndex === interaction.answer ? 'correct' : 'wrong') : null)
  }

  const handleDropAnswer = (slotId, option) => {
    setDragAnswers((current) => {
      const nextAnswers = Object.fromEntries(Object.entries(current).filter(([, value]) => value !== option))
      nextAnswers[slotId] = option
      return nextAnswers
    })
    setAnswerResult(null)
  }

  const handleCheckDragFill = () => {
    if (!activeInteraction || activeInteraction.type !== 'drag-fill') {
      return
    }

    const isComplete = activeInteraction.slots.every((slot) => dragAnswers[slot.id])
    const isCorrect = activeInteraction.slots.every((slot) => dragAnswers[slot.id] === slot.answer)
    setAnswerResult(isComplete && isCorrect ? 'correct' : 'wrong')
  }

  const handleSequenceAnswer = (optionIndex) => {
    if (!activeInteraction || activeInteraction.type !== 'sequence') {
      return
    }

    const currentCard = activeInteraction.cards[sequenceIndex]

    if (optionIndex !== currentCard.answer) {
      setSequenceWrongCount((count) => count + 1)
      setAnswerResult('wrong')
      return
    }

    const correctText = currentCard.options[currentCard.answer]
    setSequenceCorrect((current) => [...current, correctText])
    setAnswerResult(null)
    setSequenceIndex((index) => index + 1)
  }

  const handleContinueVideo = () => {
    const video = videoRef.current

    if (!activeInteraction || !video) {
      return
    }

    const isFinalSequenceComplete = activeInteraction.type === 'sequence' && sequenceIndex >= activeInteraction.cards.length

    setAnsweredInteractions((current) => ({ ...current, [activeInteraction.id]: true }))
    setActiveInteraction(null)
    setAnswerResult(null)

    if (isFinalSequenceComplete) {
      onComplete?.()
    }

    if (activeInteraction.type !== 'sequence') {
      window.setTimeout(() => video.play(), 80)
    }
  }

  const isBlockingOverlay = ['question', 'drag-fill', 'info', 'sequence'].includes(activeInteraction?.type)
  const isSequenceDone = activeInteraction?.type === 'sequence' && sequenceIndex >= activeInteraction.cards.length

  return (
    <div className={isBlockingOverlay ? 'interactive-video interactive-video--paused' : 'interactive-video'}>
      <video
        controls
        playsInline
        preload="metadata"
        ref={videoRef}
        title={title}
        onEnded={handleVideoEnded}
        onTimeUpdate={syncInteractionWithTime}
      >
        <source src={src} type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ phát video HTML5.
      </video>

      {activeInteraction?.type === 'message' && (
        <div className={activeInteraction.transparent ? 'video-toast video-toast--transparent' : 'video-toast'}>
          <strong>{activeInteraction.text}</strong>
          {activeInteraction.actionLabel && <button className="video-toast-action" type="button" onClick={() => onComplete?.()}>{activeInteraction.actionLabel}</button>}
        </div>
      )}

      {isBlockingOverlay && (
        <div className="video-overlay">
          {activeInteraction.type === 'question' && (
            <div className="video-popup video-popup--question">
              <h3>{activeInteraction.question}</h3>
              <div className="video-option-list">
                {activeInteraction.options.map((option, index) => (
                  <label className={selectedAnswer === index ? `video-option video-option--active${answerResult ? ` video-option--${answerResult}` : ''}` : 'video-option'} key={option}>
                    <input checked={selectedAnswer === index} name={activeInteraction.id} onChange={() => {
                      handleSelectAnswer(activeInteraction, index)
                    }} type="radio" />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              <div className="video-popup-actions">
                {!activeInteraction.instantFeedback && <button type="button" onClick={handleCheckAnswer}>Kiểm tra</button>}
                {(answerResult === 'correct' || (activeInteraction.continueAfterAnswer && answerResult)) && <button className="video-continue" type="button" onClick={handleContinueVideo}>Tiếp tục video</button>}
              </div>
              {answerResult === 'correct' && <p className="video-result video-result--correct">{activeInteraction.correctFeedback || 'Đúng'}</p>}
              {answerResult === 'wrong' && activeInteraction.wrongFeedback && <p className="video-result video-result--wrong">{activeInteraction.wrongFeedback}</p>}
              {answerResult === 'wrong' && !activeInteraction.wrongFeedback && (
                <div className="video-guidance">
                  <strong>Chưa đúng. Gợi ý suy luận</strong>
                  <p>{activeInteraction.wrongHint}</p>
                  <span>Chọn lại đáp án sau khi đối chiếu với video.</span>
                </div>
              )}
            </div>
          )}

          {activeInteraction.type === 'drag-fill' && (
            <div className="video-popup video-popup--wide">
              <h3>{activeInteraction.instruction}</h3>
              <div className="drag-sentence">
                <span>Trong dây dẫn kim loại có các hạt</span>
                {activeInteraction.slots.map((slot) => (
                  <button
                    className={dragAnswers[slot.id] ? 'drop-slot drop-slot--filled' : 'drop-slot'}
                    key={slot.id}
                    onClick={() => {
                      setDragAnswers((current) => {
                        const nextAnswers = { ...current }
                        delete nextAnswers[slot.id]
                        return nextAnswers
                      })
                      setAnswerResult(null)
                    }}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => handleDropAnswer(slot.id, event.dataTransfer.getData('text/plain'))}
                    type="button"
                  >
                    {dragAnswers[slot.id] || ''}
                  </button>
                )).reduce((items, slotButton, index) => {
                  const words = ['dịch chuyển', 'tạo thành']
                  return index === 0 ? [slotButton, <span key="word-1">{words[0]}</span>] : index === 1 ? [...items, slotButton, <span key="word-2">{words[1]}</span>] : [...items, slotButton]
                }, [])}
              </div>
              <div className="drag-bank">
                {activeInteraction.options
                  .filter((option) => !Object.values(dragAnswers).includes(option))
                  .map((option) => (
                    <button
                      draggable
                      key={option}
                      onClick={() => {
                        const emptySlot = activeInteraction.slots.find((slot) => !dragAnswers[slot.id])
                        if (emptySlot) {
                          handleDropAnswer(emptySlot.id, option)
                        }
                      }}
                      onDragStart={(event) => event.dataTransfer.setData('text/plain', option)}
                      type="button"
                    >
                      <span>::</span>
                      {option}
                    </button>
                  ))}
              </div>
              <div className="video-popup-actions">
                <button type="button" onClick={handleCheckDragFill}>Kiểm tra</button>
                {answerResult === 'correct' && <button className="video-continue" type="button" onClick={handleContinueVideo}>Tiếp tục</button>}
              </div>
              {answerResult === 'correct' && <p className="video-result video-result--correct">Đúng</p>}
              {answerResult === 'wrong' && (
                <div className="video-guidance">
                  <strong>Chưa đúng. Gợi ý suy luận</strong>
                  <p>{activeInteraction.wrongHint}</p>
                  <span>Chạm vào ô đã điền để xóa rồi ghép lại.</span>
                </div>
              )}
            </div>
          )}

          {activeInteraction.type === 'info' && (
            <div className="video-info-card">
              {activeInteraction.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <button className="video-continue" type="button" onClick={handleContinueVideo}>Tiếp tục</button>
            </div>
          )}

          {activeInteraction.type === 'sequence' && (
            <div className="video-sequence-card">
              <div className="sequence-topbar">
                <h3>{isSequenceDone ? 'Kết quả' : activeInteraction.title}</h3>
                <span>Tiến độ: {Math.min(sequenceIndex, activeInteraction.cards.length)}/{activeInteraction.cards.length}</span>
              </div>

              {sequenceCorrect.length > 0 && (
                <div className="sequence-correct-list">
                  {sequenceCorrect.map((text, index) => (
                    <p key={`${text}-${index}`}>{text}<b>✓</b></p>
                  ))}
                </div>
              )}

              {!isSequenceDone ? (
                <>
                  <div className="sequence-options">
                    {activeInteraction.cards[sequenceIndex].options.map((option, index) => (
                      <button key={option} type="button" onClick={() => handleSequenceAnswer(index)}>
                        {option}
                      </button>
                    ))}
                  </div>
                  {answerResult === 'wrong' && (
                    <div className="video-guidance">
                      <strong>Chưa đúng. Gợi ý suy luận</strong>
                      <p>{activeInteraction.cards[sequenceIndex].wrongHint}</p>
                      <span>Đọc lại hai lựa chọn rồi chọn ý phù hợp nhất.</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="sequence-summary">
                  <strong>{activeInteraction.cards.length}/{activeInteraction.cards.length} điểm</strong>
                  <span>Số lần chọn sai: {sequenceWrongCount}</span>
                  <button className="video-continue" type="button" onClick={handleContinueVideo}>Hoàn thành</button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Lesson22InteractiveWorksheet({ onAction }) {
  const [revealedBlocks, setRevealedBlocks] = useState({
    worksheet: false,
    nsve: false,
    quiz: false,
    selfCheck: false,
  })
  const [answers, setAnswers] = useState({
    concept: '',
    formula: '',
    i: '',
    q: '',
    t: '',
    charge: '',
    current: '',
    n: '',
    s: '',
    v: '',
    e: '',
    advanced: '',
  })
  const [attempts, setAttempts] = useState({})
  const [feedbacks, setFeedbacks] = useState({})
  const [quickChoices, setQuickChoices] = useState({})
  const [showHint, setShowHint] = useState(false)
  const [selfChecks, setSelfChecks] = useState({})
  const [lesson22CardStep, setLesson22CardStep] = useState(0)

  const revealBlock = (key) => {
    setRevealedBlocks((current) => (current[key] ? current : { ...current, [key]: true }))
  }

  const updateAnswer = (key, value) => {
    setAnswers((current) => ({ ...current, [key]: value }))
  }

  const setProgressFeedback = (key, isCorrect, answer, hint, explanation) => {
    if (isCorrect) {
      setAttempts((current) => ({ ...current, [key]: 0 }))
      const nextFeedbacks = { ...feedbacks, [key]: { type: 'correct', message: 'Đúng. Em đang suy luận theo đúng hướng.' } }
      const worksheetDone = ['concept', 'formula', 'meanings', 'charge', 'current'].every((item) => nextFeedbacks[item]?.type === 'correct')
      const nsveDone = nextFeedbacks.quick?.type === 'correct' && nextFeedbacks.advanced?.type === 'correct'
      const unlockStep = {
        concept: 1,
        formula: 2,
        meanings: 3,
        charge: 4,
        current: 5,
        quick: 6,
        advanced: 7,
      }[key]

      setFeedbacks(nextFeedbacks)
      if (unlockStep !== undefined) {
        setLesson22CardStep((current) => Math.max(current, unlockStep))
      }

      if (worksheetDone) {
        revealBlock('nsve')
      }

      if (nsveDone) {
        revealBlock('quiz')
      }

      playLessonTone('correct')
      return
    }

    const nextAttempt = (attempts[key] || 0) + 1
    const message =
      nextAttempt >= 3
        ? `Đáp án: ${answer}. ${explanation}`
        : nextAttempt === 2
          ? hint
          : 'Chưa đúng. Em hãy đọc lại câu hỏi và thử thêm một lần nữa.'

    setAttempts((current) => ({ ...current, [key]: nextAttempt }))
    setFeedbacks((current) => ({ ...current, [key]: { type: 'wrong', message } }))
    playLessonTone('wrong')
  }

  const checkFormula = () => {
    const normalized = normalizeText(answers.formula)
      .replace(/[∆Δδ]/g, 'delta')
      .replace(/[÷:]/g, '/')
      .replace(/\s/g, '')
      .replace(/^i=/, '')
    const isCorrect = ['deltaq/deltat', 'q/t'].includes(normalized)
    setProgressFeedback(
      'formula',
      isCorrect,
      'I = Δq / Δt',
      'Gợi ý: cường độ dòng điện bằng điện lượng đi qua tiết diện chia cho thời gian.',
      'Ô đã có sẵn I = nên em chỉ cần nhập Δq / Δt. Δq là điện lượng đi qua tiết diện, còn Δt là thời gian; phải lấy điện lượng chia cho thời gian, không đảo thứ tự hay dùng phép nhân.',
    )
  }

  const checkMeanings = () => {
    const i = normalizeText(answers.i)
    const q = normalizeText(answers.q)
    const t = normalizeText(answers.t)
    const isCorrect = i.includes('cuong do') && (q.includes('dien luong') || q.includes('dien tich')) && t.includes('thoi gian')
    setProgressFeedback(
      'meanings',
      isCorrect,
      'I là cường độ dòng điện; Δq là điện lượng đi qua tiết diện dây; Δt là thời gian',
      'Gợi ý: đọc từng kí hiệu trong công thức I = Δq / Δt.',
      'Bảng cần nêu đủ ý nghĩa của cả ba đại lượng, đặc biệt Δq là điện lượng đi qua tiết diện dây.',
    )
  }

  const checkCharge = () => {
    const normalized = normalizeText(answers.charge).replace(/\s/g, '')
    setProgressFeedback(
      'charge',
      normalized.includes('12'),
      'q = I.t = 3.4 = 12 C',
      'Gợi ý: dùng q = I.t với I = 3 A và t = 4 s.',
      'Sai thường gặp là lấy 3 / 4; bài này cần nhân cường độ dòng điện với thời gian.',
    )
  }

  const checkCurrent = () => {
    const normalized = normalizeText(answers.current).replace(/\s/g, '')
    setProgressFeedback(
      'current',
      normalized.includes('2'),
      'I = q / t = 10 / 5 = 2 A',
      'Gợi ý: dùng I = q / t với q = 10 C và t = 5 s.',
      'Sai thường gặp là nhân 10 với 5; công thức định nghĩa yêu cầu chia điện lượng cho thời gian.',
    )
  }

  const checkQuick = () => {
    const isCorrect = quickChoices.n && quickChoices.s && quickChoices.v && !quickChoices.e
    setProgressFeedback(
      'quick',
      isCorrect,
      'Tăng n, tăng S hoặc tăng v; không tăng e',
      'Gợi ý: e là điện tích của một electron nên coi là hằng số.',
      'Nếu chọn tăng e thì sai vì e không thay đổi trong bài học này.',
    )
  }

  const checkAdvanced = () => {
    const normalized = normalizeText(answers.advanced).replace(/\s/g, '')
    const isCorrect = ['0,3264', '0.3264', '0,33', '0.33', '0,326', '0.326'].some((item) => normalized.includes(item))
    setProgressFeedback(
      'advanced',
      isCorrect,
      'I ≈ 0,326 A',
      'Gợi ý: đổi S = 2 mm² = 2.10^-6 m² và v = 0,12 mm/s = 1,2.10^-4 m/s, rồi dùng I = nSev.',
      'Kết quả lệch nhiều thường do quên đổi mm² sang m² hoặc mm/s sang m/s.',
    )
  }

  const finishWorksheet = () => {
    onAction('Đã hoàn thành phiếu học tập Bài 22')
  }
  return (
    <section className="restored-lesson restored22">
      <div className="restored-hero">
        <span>Bài 22</span>
        <h1>Cường độ dòng điện</h1>
        <p>Hoàn thành các điểm dừng tương tác trong video trước khi làm phiếu học tập bên dưới.</p>
      </div>

      <article className="restored-card">
        <div className="h5p-embed local-video-embed">
          <InteractiveLessonVideo
            interactions={lesson22VideoInteractions}
            onComplete={() => revealBlock('worksheet')}
            src="/videos/bai22.mp4"
            title="Video tương tác bài 22"
          />
        </div>
      </article>

      {revealedBlocks.worksheet && <article className="restored-card journey-card lesson22-reveal-block">
        <div className="journey-heading">
          <span>Phiếu học tập</span>
          <h2>Khám phá cường độ dòng điện</h2>
          <p>Từ bóng đèn sáng mạnh/yếu, em tự nối hiện tượng với công thức và bài tập.</p>
        </div>

        <div className="journey-line">
          <section className="journey-item">
            <b>1</b>
            <div>
              <h3>Nếu trong cùng một khoảng thời gian có nhiều điện tích đi qua tiết diện dây dẫn hơn thì:</h3>
              <div className="choice-row">
                {[
                  ['stronger', 'Dòng điện mạnh hơn'],
                  ['weaker', 'Dòng điện yếu hơn'],
                ].map(([value, label]) => (
                  <button
                    className={answers.concept === value ? 'soft-choice soft-choice--active' : 'soft-choice'}
                    key={value}
                    type="button"
                    onClick={() => {
                      updateAnswer('concept', value)
                      setProgressFeedback('concept', value === 'stronger', 'Dòng điện mạnh hơn', 'Gợi ý: nhiều điện lượng hơn trong cùng thời gian làm I lớn hơn.', 'Dòng điện yếu hơn là nhầm chiều so sánh.')
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {feedbacks.concept && <p className={`inline-feedback inline-feedback--${feedbacks.concept.type}`}>{feedbacks.concept.message}</p>}
            </div>
          </section>

          {lesson22CardStep >= 1 && <section className="journey-item">
            <b>2</b>
            <div>
              <h3>Hoàn thành công thức định nghĩa cường độ dòng điện</h3>
              <div className="formula-input">
                <span>I =</span>
                <input value={answers.formula} onChange={(event) => updateAnswer('formula', event.target.value)} placeholder="Điền công thức vào đây" />
                <button type="button" onClick={checkFormula}>Kiểm tra</button>
              </div>
              {feedbacks.formula && <p className={`inline-feedback inline-feedback--${feedbacks.formula.type}`}>{feedbacks.formula.message}</p>}
            </div>
          </section>}

          {lesson22CardStep >= 2 && <section className="journey-item">
            <b>3</b>
            <div>
              <h3>Điền ý nghĩa các đại lượng trong công thức I = Δq / Δt</h3>
              <div className="symbol-table">
                {[
                  ['I', 'i'],
                  ['Δq', 'q'],
                  ['Δt', 't'],
                ].map(([symbol, key]) => (
                  <label key={key}>
                    <strong>{symbol}</strong>
                    <input value={answers[key]} onChange={(event) => updateAnswer(key, event.target.value)} placeholder="Điền câu trả lời vào đây" />
                  </label>
                ))}
              </div>
              <button className="primary-soft-btn" type="button" onClick={checkMeanings}>Kiểm tra bảng</button>
              {feedbacks.meanings && <p className={`inline-feedback inline-feedback--${feedbacks.meanings.type}`}>{feedbacks.meanings.message}</p>}
            </div>
          </section>}

          {lesson22CardStep >= 3 && <section className="journey-item">
            <b>4</b>
            <div>
              <h3>Dòng điện I = 3 A chạy qua dây trong 4 s. Tính q.</h3>
              <div className="answer-row">
                <input value={answers.charge} onChange={(event) => updateAnswer('charge', event.target.value)} placeholder="Nhập lời giải ngắn..." />
                <button type="button" onClick={checkCharge}>Kiểm tra</button>
              </div>
              {feedbacks.charge && <p className={`inline-feedback inline-feedback--${feedbacks.charge.type}`}>{feedbacks.charge.message}</p>}
            </div>
          </section>}

          {lesson22CardStep >= 4 && <section className="journey-item">
            <b>5</b>
            <div>
              <h3>Trong 5 s có điện lượng 10 C đi qua tiết diện dây. Tính I.</h3>
              <div className="answer-row">
                <input value={answers.current} onChange={(event) => updateAnswer('current', event.target.value)} placeholder="Nhập lời giải ngắn..." />
                <button type="button" onClick={checkCurrent}>Kiểm tra</button>
              </div>
              {feedbacks.current && <p className={`inline-feedback inline-feedback--${feedbacks.current.type}`}>{feedbacks.current.message}</p>}
            </div>
          </section>}
        </div>
      </article>}

      {revealedBlocks.nsve && <article className="restored-card nsve-discovery lesson22-reveal-block">
        <div className="journey-heading">
          <span>Khám phá công thức vi mô</span>
          <h2>Đi sâu hơn vào chuyển động của electron</h2>
        </div>
        <div className="timeline-cards">
          {[
            ['e-', 'Electron dịch chuyển nhanh hơn'],
            ['q', 'Có nhiều điện tích đi qua dây dẫn hơn'],
            ['I', 'Cường độ dòng điện lớn hơn'],
          ].map(([icon, text], index) => (
            <div className="glow-card" style={{ '--delay': `${index * 120}ms` }} key={text}><span>{icon}</span><strong>{text}</strong></div>
          ))}
        </div>
        <div className="big-question"><span>?</span><strong>Vậy ngoài tốc độ electron, cường độ dòng điện còn phụ thuộc vào điều gì?</strong></div>
        <div className="factor-grid">
          {[
            ['n', 'Nhiều electron tự do hơn', 'có nhiều điện tích đi qua hơn'],
            ['S', 'Dây dẫn lớn hơn', 'nhiều electron đi qua cùng lúc hơn'],
            ['v', 'Electron chuyển động nhanh hơn', 'điện tích đi qua nhanh hơn'],
          ].map(([icon, title, note]) => (
            <div className="factor-card" key={title}><span>{icon}</span><strong>{title}</strong><small>→ {note}</small></div>
          ))}
        </div>
        <div className="formula-reveal"><span>Cường độ dòng điện trong dây dẫn kim loại phụ thuộc vào số electron tự do, tiết diện dây dẫn và tốc độ dịch chuyển có hướng của electron.</span><strong>I = nSev</strong></div>
        <div className="symbol-grid">
          {[
            ['n', 'Mật độ electron tự do trong dây dẫn', 'n càng lớn → càng nhiều electron'],
            ['S', 'Tiết diện dây dẫn', 'Dây càng to → nhiều electron đi qua cùng lúc hơn'],
            ['v', 'Tốc độ dịch chuyển có hướng của electron', 'Electron đi nhanh hơn → cường độ dòng điện lớn hơn'],
            ['e', 'Điện tích của một electron', 'e là hằng số'],
          ].map(([symbol, title, note]) => (
            <div className="symbol-card" key={symbol}><strong>{symbol}</strong><span>{title}</span><small>{note}</small></div>
          ))}
        </div>
        <div className="quick-check">
          <h3>Muốn cường độ dòng điện lớn hơn thì có thể thay đổi yếu tố nào?</h3>
          {[
            ['n', 'tăng n'],
            ['s', 'tăng S'],
            ['v', 'tăng v'],
            ['e', 'tăng e'],
          ].map(([key, label]) => (
            <label className="soft-checkbox" key={key}>
              <input checked={Boolean(quickChoices[key])} onChange={() => setQuickChoices((current) => ({ ...current, [key]: !current[key] }))} type="checkbox" />
              <span>{label}</span>
            </label>
          ))}
          <button className="primary-soft-btn" type="button" onClick={checkQuick}>Kiểm tra</button>
          {feedbacks.quick && <p className={`inline-feedback inline-feedback--${feedbacks.quick.type}`}>{feedbacks.quick.message}</p>}
        </div>
        {lesson22CardStep >= 6 && <div className="advanced-card">
          <h3>Bài vận dụng nâng cao</h3>
          <p>Một dây dẫn kim loại có n = 8,5 × 10²⁸ electron/m³, S = 2 mm², v = 0,12 mm/s. Biết e = 1,6 × 10⁻¹⁹ C. Tính cường độ dòng điện trong dây dẫn.</p>
          <button className="ghost-soft-btn" type="button" onClick={() => setShowHint((current) => !current)}>Xem gợi ý</button>
          {showHint && <div className="hint-panel"><p>Đổi S = 2 mm² = 2.10^-6 m².</p><p>Đổi v = 0,12 mm/s = 1,2.10^-4 m/s.</p><p>Sử dụng công thức I = nSev.</p></div>}
          <textarea value={answers.advanced} onChange={(event) => updateAnswer('advanced', event.target.value)} placeholder="Trình bày lời giải..." />
          <button className="primary-soft-btn" type="button" onClick={checkAdvanced}>Kiểm tra</button>
          {feedbacks.advanced && <p className={`inline-feedback inline-feedback--${feedbacks.advanced.type}`}>{feedbacks.advanced.message}</p>}
        </div>}
      </article>}

      {revealedBlocks.quiz && <Lesson22ReviewQuest onAction={onAction} onComplete={() => revealBlock('selfCheck')} />}

      {revealedBlocks.selfCheck && <article className="restored-card self-check lesson22-reveal-block">
        <h3>Tự đánh giá mức độ hiểu bài</h3>
        {[
          ['concept', 'Em hiểu cường độ dòng điện'],
          ['formula', 'Em sử dụng được công thức I = Δq / Δt'],
          ['nsve', 'Em hiểu ý nghĩa công thức I = nSev'],
          ['practice', 'Em giải được bài tập vận dụng'],
        ].map(([key, label]) => (
          <label className="soft-checkbox" key={key}>
            <input checked={Boolean(selfChecks[key])} onChange={() => setSelfChecks((current) => ({ ...current, [key]: !current[key] }))} type="checkbox" />
            <span>{label}</span>
          </label>
        ))}
        <button className="primary-soft-btn" type="button" onClick={finishWorksheet}>Lưu kết quả</button>
      </article>}
    </section>
  )
}

const lesson22ReviewQuestions = [
  {
    id: 'q1',
    type: 'single',
    badge: 'Khái niệm',
    prompt: 'Nếu trong cùng một khoảng thời gian có nhiều điện tích đi qua tiết diện dây dẫn hơn thì:',
    options: [
      { id: 'stronger', text: 'Dòng điện mạnh hơn' },
      { id: 'weaker', text: 'Dòng điện yếu hơn' },
    ],
    answer: 'stronger',
    explain: 'Cùng một thời gian, điện lượng đi qua tiết diện càng nhiều thì I càng lớn, dòng điện càng mạnh.',
  },
  {
    id: 'q2',
    type: 'formula',
    badge: 'Công thức',
    prompt: 'Hoàn thành công thức cường độ dòng điện',
    answer: ['Δq', 'Δt'],
    explain: 'Cường độ dòng điện được xác định bởi I = Δq / Δt.',
  },
  {
    id: 'q3',
    type: 'single',
    badge: 'Chiều dòng điện',
    prompt: 'Trong kim loại, electron chuyển động như thế nào so với chiều dòng điện?',
    options: [
      { id: 'same', text: 'Cùng chiều' },
      { id: 'opposite', text: 'Ngược chiều' },
    ],
    answer: 'opposite',
    explain: 'Electron mang điện âm nên trong kim loại chúng dịch chuyển ngược chiều dòng điện quy ước.',
  },
  {
    id: 'q4',
    type: 'multi',
    badge: 'I = nSev',
    prompt: 'Yếu tố nào làm cường độ dòng điện tăng?',
    options: [
      { id: 'n', text: 'tăng n' },
      { id: 's', text: 'tăng S' },
      { id: 'v', text: 'tăng v' },
      { id: 'e', text: 'tăng e' },
    ],
    answer: ['n', 's', 'v'],
    explain: 'Theo I = nSev, I tăng khi n, S hoặc v tăng. e là độ lớn điện tích electron, xem như hằng số.',
  },
  {
    id: 'q5',
    type: 'scenario',
    badge: 'Thực tế',
    prompt: 'Tại sao dây điện dùng cho máy lạnh thường to hơn dây đèn LED?',
    placeholder: 'Nhập câu trả lời ngắn...',
    required: ['tiet dien', 'lon', 'dong dien', 'may lanh', 'den led'],
    exactAnswer: 'Dây máy lạnh cần tiết diện lớn hơn để cho dòng điện lớn hơn đi qua ổn định và an toàn hơn.',
    explain: 'Câu trả lời đã nêu được một phần ý chính. Đáp án đầy đủ cần nhấn mạnh tiết diện dây lớn hơn và dòng điện lớn hơn.',
  },
  {
    id: 'q6',
    type: 'numeric',
    badge: 'Tính nhanh',
    prompt: 'Trong 5 s có điện lượng 15 C đi qua tiết diện dây dẫn. Tính I.',
    suffix: 'A',
    answer: 3,
    explain: 'I = Δq / Δt = 15 / 5 = 3 A.',
  },
  {
    id: 'q7',
    type: 'advanced',
    badge: 'Vận dụng',
    prompt: 'Một dây dẫn có n = 8,5 × 10²⁸ electron/m³, S = 2 mm², v = 0,1 mm/s, e = 1,6 × 10⁻¹⁹ C. Tính cường độ dòng điện.',
    suffix: 'A',
    answer: 2.72,
    hints: [
      'Đổi đơn vị: S = 2 mm² = 2 × 10⁻⁶ m²; v = 0,1 mm/s = 1 × 10⁻⁴ m/s.',
      'Xác định công thức: I = nSev.',
    ],
    explain: 'Điểm dễ sai nhất là đổi mm² và mm/s sang đơn vị SI trước khi thay số.',
    solution: [
      'Đổi đơn vị: S = 2 mm² = 2 × 10⁻⁶ m²; v = 0,1 mm/s = 1 × 10⁻⁴ m/s.',
      'Áp dụng công thức: I = nSev.',
      'Thay số: I = 8,5 × 10²⁸ × 2 × 10⁻⁶ × 1 × 10⁻⁴ × 1,6 × 10⁻¹⁹ = 2,72 A.',
    ],
  },
  {
    id: 'q8',
    type: 'drag',
    badge: 'Kéo thả',
    prompt: 'Ghép từng kí hiệu trong I = nSev với ý nghĩa đúng.',
    slots: [
      { id: 'n', label: 'n', answer: 'Mật độ electron tự do' },
      { id: 'S', label: 'S', answer: 'Diện tích tiết diện dây' },
      { id: 'v', label: 'v', answer: 'Tốc độ dịch chuyển có hướng' },
      { id: 'e', label: 'e', answer: 'Độ lớn điện tích electron' },
    ],
    bank: ['Tốc độ dịch chuyển có hướng', 'Độ lớn điện tích electron', 'Mật độ electron tự do', 'Diện tích tiết diện dây'],
    explain: 'Nhớ bộ bốn: n là mật độ hạt, S là tiết diện, v là tốc độ trôi, e là điện tích electron.',
  },
  {
    id: 'q9',
    type: 'trueFalse',
    badge: 'Đúng sai',
    prompt: 'Đánh dấu đúng hoặc sai cho các nhận định sau.',
    statements: [
      { id: 'a', text: 'Dòng điện trong kim loại là dòng chuyển dời có hướng của electron tự do.', answer: true },
      { id: 'b', text: 'Chiều dòng điện quy ước trong mạch ngoài đi từ cực âm sang cực dương.', answer: false },
      { id: 'c', text: 'Dòng điện càng mạnh thì tác dụng của dòng điện thường càng rõ.', answer: true },
    ],
    explain: 'Trong mạch ngoài, chiều dòng điện quy ước đi từ cực dương sang cực âm; electron trong kim loại đi ngược chiều đó.',
  },
]

function Lesson22ReviewQuest({ onAction, onComplete }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState({})
  const [showHint, setShowHint] = useState(false)
  const [draggingText, setDraggingText] = useState('')
  const [selfChecks, setSelfChecks] = useState({})
  const activeQuestion = lesson22ReviewQuestions[activeIndex]
  const answeredCount = Object.keys(results).length
  const score = Object.values(results).filter(Boolean).length
  const progress = Math.round((answeredCount / lesson22ReviewQuestions.length) * 100)
  const isComplete = activeIndex >= lesson22ReviewQuestions.length
  const percent = Math.round((score / lesson22ReviewQuestions.length) * 100)
  const level =
    percent >= 90
      ? 'Bạn đã hiểu rất tốt bài học!'
      : percent >= 70
        ? 'Bạn đã nắm được phần lớn kiến thức!'
        : 'Hãy xem lại một số nội dung nhé!'

  const updateQuizAnswer = (id, value) => {
    setAnswers((current) => ({ ...current, [id]: value }))
  }

  const normalizeQuizText = (value) =>
    String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[∆Δδ]/g, 'delta')

  const isQuestionCorrect = (question) => {
    const value = answers[question.id]
    if (question.type === 'single') return value === question.answer
    if (question.type === 'multi') {
      const selected = Object.keys(value || {}).filter((key) => value[key]).sort()
      return selected.length === question.answer.length && question.answer.every((item, index) => item === selected[index])
    }
    if (question.type === 'formula') {
      const left = normalizeQuizText(value?.top).replace(/\s/g, '')
      const right = normalizeQuizText(value?.bottom).replace(/\s/g, '')
      const isCharge = ['δq', 'dq', 'deltaq', 'q'].includes(left)
      const isTime = ['δt', 'dt', 'deltat', 't'].includes(right)
      return isCharge && isTime
    }
    if (question.type === 'scenario') {
      const normalized = normalizeQuizText(value)
      const matchedCount = question.required.filter((keyword) => normalized.includes(keyword)).length
      return matchedCount / question.required.length >= 0.5
    }
    if (question.type === 'numeric' || question.type === 'advanced') {
      const numeric = Number(String(value || '').replace(',', '.').match(/-?\d+(\.\d+)?/)?.[0])
      return Number.isFinite(numeric) && Math.abs(numeric - question.answer) <= 0.02
    }
    if (question.type === 'drag') {
      return question.slots.every((slot) => value?.[slot.id] === slot.answer)
    }
    if (question.type === 'trueFalse') {
      return question.statements.every((statement) => value?.[statement.id] === statement.answer)
    }
    return false
  }

  const submitQuizAnswer = () => {
    const correct = isQuestionCorrect(activeQuestion)
    setResults((current) => ({ ...current, [activeQuestion.id]: correct }))
    playLessonTone(correct ? 'correct' : 'wrong')
  }

  const goToNextQuestion = () => {
    const nextIndex = activeIndex + 1
    setShowHint(false)
    setActiveIndex(nextIndex)
    if (nextIndex === lesson22ReviewQuestions.length) {
      onAction('Đã hoàn thành thử thách ôn tập Bài 22')
      onComplete?.()
    }
  }

  const fillDragSlot = (slotId, text) => {
    if (!text) return
    updateQuizAnswer(activeQuestion.id, { ...(answers[activeQuestion.id] || {}), [slotId]: text })
    setDraggingText('')
  }

  const currentResult = activeQuestion ? results[activeQuestion.id] : undefined

  return (
    <article className="review-quest-card" id="lesson22-review-quiz">
      <div className="review-quest-header">
        <div>
          <span className="review-quest-kicker"><b>⚡</b> Quiz ôn tập cuối bài</span>
          <h2>Thử thách ôn tập bài 22</h2>
          <p>Đi qua từng nhiệm vụ nhỏ để tự kiểm tra mức độ hiểu bài Cường độ dòng điện.</p>
        </div>
        <div className="review-score-orb">
          <strong>{score}</strong>
          <span>điểm</span>
        </div>
      </div>

      <div className="review-progress" aria-label="Tiến trình hoàn thành quiz">
        <span style={{ width: `${progress}%` }} />
      </div>
      <div className="review-progress-meta">
        <span>{answeredCount}/{lesson22ReviewQuestions.length} nhiệm vụ</span>
        <strong>{progress}%</strong>
      </div>

      {!isComplete ? (
        <section className={`quest-question ${currentResult === false ? 'quest-question--wrong' : ''}`} key={activeQuestion.id}>
          <div className="quest-question-top">
            <span>{activeQuestion.badge}</span>
            <strong>Câu {activeIndex + 1}</strong>
          </div>
          <h3>{activeQuestion.prompt}</h3>

          {activeQuestion.type === 'single' && (
            <div className="quest-options">
              {activeQuestion.options.map((option) => (
                <button
                  className={answers[activeQuestion.id] === option.id ? 'quest-option quest-option--active' : 'quest-option'}
                  disabled={currentResult !== undefined}
                  key={option.id}
                  type="button"
                  onClick={() => updateQuizAnswer(activeQuestion.id, option.id)}
                >
                  <span />
                  {option.text}
                </button>
              ))}
            </div>
          )}

          {activeQuestion.type === 'multi' && (
            <div className="quest-options quest-options--grid">
              {activeQuestion.options.map((option) => (
                <button
                  className={answers[activeQuestion.id]?.[option.id] ? 'quest-option quest-option--active' : 'quest-option'}
                  disabled={currentResult !== undefined}
                  key={option.id}
                  type="button"
                  onClick={() => updateQuizAnswer(activeQuestion.id, { ...(answers[activeQuestion.id] || {}), [option.id]: !answers[activeQuestion.id]?.[option.id] })}
                >
                  <span />
                  {option.text}
                </button>
              ))}
            </div>
          )}

          {activeQuestion.type === 'formula' && (
            <div className="quest-formula">
              <strong>I =</strong>
              <input aria-label="Tử số của công thức cường độ dòng điện" disabled={currentResult !== undefined} value={answers[activeQuestion.id]?.top || ''} onChange={(event) => updateQuizAnswer(activeQuestion.id, { ...(answers[activeQuestion.id] || {}), top: event.target.value })} />
              <em>/</em>
              <input aria-label="Mẫu số của công thức cường độ dòng điện" disabled={currentResult !== undefined} value={answers[activeQuestion.id]?.bottom || ''} onChange={(event) => updateQuizAnswer(activeQuestion.id, { ...(answers[activeQuestion.id] || {}), bottom: event.target.value })} />
            </div>
          )}

          {(activeQuestion.type === 'scenario' || activeQuestion.type === 'numeric' || activeQuestion.type === 'advanced') && (
            <div className="quest-write">
              {activeQuestion.type === 'advanced' && (
                <>
                  <button className="quest-hint-btn" type="button" onClick={() => setShowHint((current) => !current)}>Xem gợi ý</button>
                  {showHint && (
                    <div className="quest-hint-panel">
                      {activeQuestion.hints.map((hint) => <p key={hint}>{hint}</p>)}
                    </div>
                  )}
                </>
              )}
              <textarea
                disabled={currentResult !== undefined}
                value={answers[activeQuestion.id] || ''}
                onChange={(event) => updateQuizAnswer(activeQuestion.id, event.target.value)}
                placeholder={activeQuestion.placeholder || `Nhập đáp án${activeQuestion.suffix ? ` (${activeQuestion.suffix})` : ''}...`}
              />
            </div>
          )}

          {activeQuestion.type === 'drag' && (
            <div className="quest-drag-wrap">
              <div className="quest-drop-grid">
                {activeQuestion.slots.map((slot) => (
                  <button
                    className={answers[activeQuestion.id]?.[slot.id] ? 'quest-drop quest-drop--filled' : 'quest-drop'}
                    disabled={currentResult !== undefined}
                    key={slot.id}
                    onClick={() => fillDragSlot(slot.id, draggingText)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => fillDragSlot(slot.id, event.dataTransfer.getData('text/plain'))}
                    type="button"
                  >
                    <strong>{slot.label}</strong>
                    <span>{answers[activeQuestion.id]?.[slot.id] || 'Thả đáp án vào đây'}</span>
                  </button>
                ))}
              </div>
              <div className="quest-bank">
                {activeQuestion.bank
                  .filter((item) => !Object.values(answers[activeQuestion.id] || {}).includes(item))
                  .map((item) => (
                    <button
                      className={draggingText === item ? 'quest-chip quest-chip--active' : 'quest-chip'}
                      draggable={currentResult === undefined}
                      disabled={currentResult !== undefined}
                      key={item}
                      onClick={() => setDraggingText(item)}
                      onDragStart={(event) => event.dataTransfer.setData('text/plain', item)}
                      type="button"
                    >
                      {item}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {activeQuestion.type === 'trueFalse' && (
            <div className="quest-truefalse">
              {activeQuestion.statements.map((statement) => (
                <div className="quest-tf-row" key={statement.id}>
                  <p>{statement.text}</p>
                  <div>
                    {[true, false].map((value) => (
                      <button
                        className={answers[activeQuestion.id]?.[statement.id] === value ? 'quest-tf-btn quest-tf-btn--active' : 'quest-tf-btn'}
                        disabled={currentResult !== undefined}
                        key={String(value)}
                        type="button"
                        onClick={() => updateQuizAnswer(activeQuestion.id, { ...(answers[activeQuestion.id] || {}), [statement.id]: value })}
                      >
                        {value ? 'Đúng' : 'Sai'}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {currentResult !== undefined && (
            <div className={currentResult ? 'quest-feedback quest-feedback--correct' : 'quest-feedback quest-feedback--wrong'}>
              <strong>{currentResult ? '✓ Chính xác' : 'Chưa đúng'}</strong>
              <p>{activeQuestion.explain}</p>
              {activeQuestion.exactAnswer && <p><b>Đáp án chính xác:</b> {activeQuestion.exactAnswer}</p>}
              {activeQuestion.solution && (
                <div className="quest-solution">
                  <b>Bài giải hoàn chỉnh:</b>
                  {activeQuestion.solution.map((step) => <p key={step}>{step}</p>)}
                </div>
              )}
            </div>
          )}

          <div className="quest-actions">
            {currentResult === undefined ? (
              <button className="quest-primary" type="button" onClick={submitQuizAnswer}>Kiểm tra</button>
            ) : (
              <button className="quest-primary" type="button" onClick={goToNextQuestion}>{activeIndex === lesson22ReviewQuestions.length - 1 ? 'Xem tổng kết' : 'Câu tiếp theo'}</button>
            )}
          </div>
        </section>
      ) : (
        <section className="quest-summary">
          <span>Nhiệm vụ hoàn thành!</span>
          <h3>{score}/{lesson22ReviewQuestions.length} câu đúng</h3>
          <strong>{percent}%</strong>
          <p>{level}</p>
          <div className="quest-self-check">
            <h4>Tự đánh giá</h4>
            {[
              ['concept', 'Em hiểu cường độ dòng điện'],
              ['formula', 'Em sử dụng được I = Δq / Δt'],
              ['nsve', 'Em hiểu I = nSev'],
              ['practice', 'Em vận dụng được vào thực tế'],
            ].map(([key, label]) => (
              <label key={key}>
                <input checked={Boolean(selfChecks[key])} onChange={() => setSelfChecks((current) => ({ ...current, [key]: !current[key] }))} type="checkbox" />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}

const ohmStatementOrder = ['cuong-do', 'ti-le-thuan', 'hieu-dien-the', 'ti-le-nghich', 'dien-tro']

const ohmStatementBank = [
  { id: 'cuong-do', label: 'cường độ dòng điện' },
  { id: 'ti-le-thuan', label: 'tỉ lệ thuận' },
  { id: 'hieu-dien-the', label: 'hiệu điện thế' },
  { id: 'ti-le-nghich', label: 'tỉ lệ nghịch' },
  { id: 'dien-tro', label: 'điện trở' },
]

const voltageExperimentConductors = {
  r1: { label: 'R₁', resistance: 4, color: '#14b8a6' },
  r2: { label: 'R₂', resistance: 8, color: '#f97316' },
}

const resistanceCauseSituations = [
  {
    id: 'low',
    caseLabel: 'Trường hợp A',
    title: 'Nhiệt độ thấp',
    readings: [['Va chạm electron', 'Thấp'], ['Mức cản trở', 'Thấp']],
    question: 'Trong trường hợp này, electron di chuyển như thế nào?',
    options: ['Khá dễ dàng', 'Khó di chuyển', 'Không thể di chuyển'],
    answer: 0,
    feedback: 'Đúng. Khi các hạt trong kim loại dao động ít, electron ít va chạm nên chuyển động dễ hơn.',
  },
  {
    id: 'warm',
    caseLabel: 'Trường hợp B',
    title: 'Nhiệt độ tăng',
    readings: [['Dao động ion', 'Tăng'], ['Va chạm electron', 'Tăng'], ['Mức cản trở', 'Tăng']],
    question: 'Khi nhiệt độ tăng, điều gì xảy ra với electron?',
    options: ['Va chạm nhiều hơn', 'Va chạm ít hơn', 'Di chuyển nhanh vô hạn'],
    answer: 0,
    feedback: 'Đúng. Nhiệt độ tăng làm các ion dao động mạnh hơn, khiến electron va chạm nhiều hơn và bị cản trở nhiều hơn.',
  },
  {
    id: 'impure',
    caseLabel: 'Trường hợp C',
    title: 'Xuất hiện tạp chất',
    readings: [['Tạp chất', 'Có'], ['Va chạm electron', 'Tăng mạnh'], ['Mức cản trở', 'Cao']],
    question: 'Các hạt tạp chất ảnh hưởng như thế nào đến chuyển động electron?',
    options: ['Làm electron bị cản trở nhiều hơn', 'Giúp electron đi dễ hơn', 'Không ảnh hưởng'],
    answer: 0,
    feedback: 'Đúng. Các nguyên tử tạp chất làm electron khó di chuyển hơn nên điện trở tăng.',
  },
]

const wireMaterialOptions = {
  copper: { label: 'Đồng', resistance: 1.7, collisions: 'Thấp' },
  iron: { label: 'Sắt', resistance: 9.7, collisions: 'Trung bình' },
  nichrome: { label: 'Nichrome', resistance: 110, collisions: 'Cao' },
}

const lesson23SelfAssessment = [
  {
    title: 'Bản chất dòng điện',
    icon: '01',
    items: [
      { id: 'current-electrons', text: 'Biết dòng điện trong kim loại là dòng chuyển dời có hướng của electron tự do.' },
      { id: 'electron-obstruction', text: 'Biết electron có thể bị cản trở khi chuyển động trong vật dẫn.' },
    ],
  },
  {
    title: 'Điện trở',
    icon: '02',
    items: [
      { id: 'conductor-difference', text: 'Giải thích được vì sao các vật dẫn cản trở dòng điện khác nhau.' },
      { id: 'resistance-meaning', text: 'Hiểu điện trở liên quan đến mức độ cản trở chuyển động của electron.' },
    ],
  },
  {
    title: 'Định luật Ôm',
    icon: '03',
    items: [
      { id: 'ohm-calculation', text: 'Vận dụng được công thức I = U/R để tính cường độ dòng điện.' },
      { id: 'ohm-prediction', text: 'Dự đoán được khi U hoặc R thay đổi thì I thay đổi thế nào.' },
    ],
  },
  {
    title: 'Đồ thị vôn - ampe',
    icon: '04',
    items: [
      { id: 'vi-characteristic', text: 'Nhận biết được đường đặc trưng vôn-ampe của điện trở.' },
      { id: 'vi-slope', text: 'Biết điện trở nhỏ thì đường I-U dốc hơn.' },
    ],
  },
  {
    title: 'Nguyên nhân gây điện trở',
    icon: '05',
    items: [
      { id: 'ion-collision', text: 'Biết electron va chạm với các ion dương trong mạng tinh thể kim loại.' },
      { id: 'lattice-disorder', text: 'Hiểu sự mất trật tự của mạng tinh thể làm tăng điện trở.' },
    ],
  },
  {
    title: 'Ảnh hưởng của nhiệt độ',
    icon: '06',
    items: [
      { id: 'heating-effect', text: 'Giải thích được vì sao dây dẫn nóng lên khi có dòng điện chạy qua.' },
      {
        id: 'temperature-types',
        text: 'Phân biệt được sự thay đổi điện trở theo nhiệt độ:',
        details: [
          'Kim loại thường: nhiệt độ tăng → điện trở tăng',
          'NTC: nhiệt độ tăng → điện trở giảm',
          'PTC: nhiệt độ tăng → điện trở tăng',
        ],
      },
    ],
  },
]

const resistanceGameMissions = [
  'Kích hoạt bóng đèn',
  'Truy tìm va chạm',
  'Đọc tín hiệu đồ thị',
  'Giải mã mạch điện',
  'Giải nhiệt quá tải',
  'Chế tạo dây dẫn',
  'Kiểm soát nhiệt độ',
  'Lắp linh kiện bảo vệ',
  'Giải cứu thành phố',
]

function Lesson23FinalChallengeGame() {
  const totalMissions = resistanceGameMissions.length
  const [started, setStarted] = useState(false)
  const [mission, setMission] = useState(0)
  const [missionSolved, setMissionSolved] = useState(false)
  const [completedCount, setCompletedCount] = useState(0)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [highestCombo, setHighestCombo] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [startedAt, setStartedAt] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [finished, setFinished] = useState(false)
  const [bulbVoltageGame, setBulbVoltageGame] = useState(2)
  const [bulbResistanceGame, setBulbResistanceGame] = useState(8)
  const [graphAttempts, setGraphAttempts] = useState(0)
  const [circuitInput, setCircuitInput] = useState('')
  const [circuitAttempts, setCircuitAttempts] = useState(0)
  const [overloadVoltage, setOverloadVoltage] = useState(12)
  const [overloadResistance, setOverloadResistance] = useState(2)
  const [labLength, setLabLength] = useState(3)
  const [labArea, setLabArea] = useState(1)
  const [labMaterial, setLabMaterial] = useState('nichrome')
  const [gameTemperature, setGameTemperature] = useState(20)
  const [temperatureAttempts, setTemperatureAttempts] = useState(0)
  const [draggedThermistor, setDraggedThermistor] = useState('')
  const [selectedThermistor, setSelectedThermistor] = useState('')
  const [thermistorSlots, setThermistorSlots] = useState({ sensor: '', protect: '' })
  const [bossVoltage, setBossVoltage] = useState(12)
  const [bossResistance, setBossResistance] = useState(2)
  const [bossMaterial, setBossMaterial] = useState('nichrome')
  const [bossProtection, setBossProtection] = useState('ntc')

  useEffect(() => {
    if (!started || finished) {
      return undefined
    }
    const timer = window.setInterval(() => setElapsed(Math.floor((Date.now() - startedAt) / 1000)), 1000)
    return () => window.clearInterval(timer)
  }, [finished, started, startedAt])

  const startGame = () => {
    setStarted(true)
    setMission(0)
    setMissionSolved(false)
    setCompletedCount(0)
    setScore(0)
    setCombo(0)
    setHighestCombo(0)
    setFeedback('')
    setStartedAt(Date.now())
    setElapsed(0)
    setFinished(false)
    setBulbVoltageGame(2)
    setBulbResistanceGame(8)
    setGraphAttempts(0)
    setCircuitInput('')
    setCircuitAttempts(0)
    setOverloadVoltage(12)
    setOverloadResistance(2)
    setLabLength(3)
    setLabArea(1)
    setLabMaterial('nichrome')
    setGameTemperature(20)
    setTemperatureAttempts(0)
    setSelectedThermistor('')
    setThermistorSlots({ sensor: '', protect: '' })
    setBossVoltage(12)
    setBossResistance(2)
    setBossMaterial('nichrome')
    setBossProtection('ntc')
  }

  const solveMission = (message, basePoints = 100) => {
    if (missionSolved || finished) {
      return
    }
    const nextCombo = combo + 1
    setMissionSolved(true)
    setCompletedCount((current) => current + 1)
    setScore((current) => current + basePoints + nextCombo * 20)
    setCombo(nextCombo)
    setHighestCombo((current) => Math.max(current, nextCombo))
    setFeedback(message)
    playLessonTone('correct')
    if (mission === totalMissions - 1) {
      setFinished(true)
    }
  }

  const missMission = (message) => {
    setCombo(0)
    setFeedback(message)
    playLessonTone('wrong')
  }

  const nextMission = () => {
    setMission((current) => Math.min(current + 1, totalMissions - 1))
    setMissionSolved(false)
    setFeedback('')
  }

  const bulbCurrentGame = bulbVoltageGame / bulbResistanceGame
  const overloadCurrent = overloadVoltage / overloadResistance
  const wireGameResistance = ({ copper: 1.7, iron: 9.7, nichrome: 110 }[labMaterial] * labLength / labArea).toFixed(1)
  const bossCurrent = bossVoltage / bossResistance
  const bossStable = bossCurrent >= 1.5 && bossCurrent <= 2.5 && bossMaterial === 'copper' && bossProtection === 'ptc'

  const assignThermistor = (slot, component = selectedThermistor || draggedThermistor) => {
    if (!component || missionSolved) {
      return
    }
    const nextSlots = { ...thermistorSlots, [slot]: component }
    setThermistorSlots(nextSlots)
    setSelectedThermistor('')
    if (nextSlots.sensor === 'ntc' && nextSlots.protect === 'ptc') {
      solveMission('Kết nối chính xác. Cảm biến và mạch bảo vệ đã hoạt động trở lại.', 150)
    } else if (nextSlots.sensor && nextSlots.protect) {
      missMission('Hai linh kiện đang lắp nhầm vị trí. NTC đo nhiệt độ, PTC bảo vệ khi quá nóng.')
    }
  }

  const timeLabel = `${String(Math.floor(elapsed / 60)).padStart(2, '0')}:${String(elapsed % 60).padStart(2, '0')}`

  return (
    <article className="resistance-game">
      {!started ? (
        <section className="resistance-game-intro">
          <div className="electric-city" aria-hidden="true">
            <span /><span /><span /><span /><span />
            <i /><i /><i />
          </div>
          <div className="game-intro-copy">
            <small>Quiz thử thách cuối bài</small>
            <h2>Thành phố điện đang mất ổn định</h2>
            <p>Hệ thống điện đang gặp sự cố. Hãy hoàn thành các thử thách để trở thành kỹ sư điện!</p>
            <button type="button" onClick={startGame}>Bắt đầu hành trình</button>
          </div>
          <img className="game-ai-guide" src={robotImage} alt="Robot AI đồng hành trong hành trình kỹ sư điện" />
        </section>
      ) : (
        <>
          <header className="game-hud">
            <div className="game-hud-title">
              <small>Quiz thử thách cuối bài</small>
              <strong>{finished ? 'Nhiệm vụ hoàn tất' : `Level ${mission + 1}: ${resistanceGameMissions[mission]}`}</strong>
            </div>
            <div className="game-hud-values">
              <span>Điểm <b>{score}</b></span>
              <span>Combo <b>x{combo}</b></span>
              <span>Thời gian <b>{timeLabel}</b></span>
            </div>
            <div className="game-progress" aria-label={`${completedCount} trên ${totalMissions} nhiệm vụ hoàn thành`}>
              <i style={{ width: `${(completedCount / totalMissions) * 100}%` }} />
              {resistanceGameMissions.map((label, index) => <b className={index < completedCount ? 'is-complete' : index === mission && !finished ? 'is-active' : ''} title={label} key={label}>{index + 1}</b>)}
            </div>
          </header>

          {!finished && (
            <section className="game-mission">
              {mission === 0 && (
                <div className="game-panel bulb-mission">
                  <div className="game-mission-head"><span>Thử thách 1</span><h3>Làm bóng đèn sáng mạnh hơn.</h3></div>
                  <div className="bulb-console">
                    <div className="game-bulb" style={{ '--intensity': Math.min(bulbCurrentGame / 2, 1) }}><img src={bongDenImage} alt="Bóng đèn cần được điều chỉnh độ sáng" /><div className="electron-stream"><i /><i /><i /></div></div>
                    <div className="game-controls">
                      <label>Hiệu điện thế U <b>{bulbVoltageGame} V</b><input type="range" min="1" max="12" value={bulbVoltageGame} onChange={(event) => setBulbVoltageGame(Number(event.target.value))} /></label>
                      <label>Điện trở R <b>{bulbResistanceGame} Ω</b><input type="range" min="1" max="10" value={bulbResistanceGame} onChange={(event) => setBulbResistanceGame(Number(event.target.value))} /></label>
                      <strong>Dòng điện I = {bulbCurrentGame.toFixed(2)} A</strong>
                    </div>
                  </div>
                  {bulbCurrentGame >= 1.5 && (
                    <div className="game-question">
                      <p>Khi điện trở giảm, dòng điện thay đổi thế nào?</p>
                      <button type="button" onClick={() => solveMission('Bóng đèn đã sáng ổn định. Điện trở giảm làm dòng điện tăng.')}>Tăng</button>
                      <button type="button" onClick={() => missMission('Quan sát lại: R đang giảm trong khi đèn sáng mạnh và I tăng.')}>Giảm</button>
                    </div>
                  )}
                </div>
              )}

              {mission === 1 && (
                <div className="game-panel collision-mission">
                  <div className="game-mission-head"><span>Thử thách 2</span><h3>Chạm vào nơi electron bị cản trở.</h3></div>
                  <div className="collision-wire">
                    <div className="game-electron-path" />
                    {['a', 'b', 'impact', 'c', 'd'].map((ion, index) => (
                      <button className={ion === 'impact' ? 'ion-target is-impact' : 'ion-target'} style={{ '--index': index }} type="button" key={ion} onClick={() => ion === 'impact' ? solveMission('Chính xác. Electron đổi hướng khi va chạm với ion dương.', 130) : missMission('Chưa phải vị trí va chạm. Hãy tìm điểm quỹ đạo electron đổi hướng.')}>
                        <span>+</span>
                      </button>
                    ))}
                    <i className="traveling-electron" />
                    {missionSolved && <span className="collision-spark" />}
                  </div>
                </div>
              )}

              {mission === 2 && (
                <div className="game-panel graph-mission">
                  <div className="game-mission-head"><span>Thử thách 3</span><h3>Chọn dây dẫn có điện trở nhỏ hơn.</h3></div>
                  <svg className={graphAttempts >= 2 ? 'game-graph show-slopes' : 'game-graph'} viewBox="0 0 520 310" aria-label="Hai đường đặc trưng vôn ampe">
                    <line x1="55" y1="265" x2="486" y2="265" /><line x1="55" y1="265" x2="55" y2="30" />
                    <text x="472" y="294">U</text><text x="28" y="40">I</text>
                    <path className="graph-r1" d="M55 265 L428 52" /><path className="graph-r2" d="M55 265 L428 160" />
                    <text x="402" y="44">R₁</text><text x="402" y="153">R₂</text>
                  </svg>
                  <div className="game-graph-options">
                    <button type="button" onClick={() => solveMission('Đúng. Đường dốc hơn biểu diễn điện trở nhỏ hơn.', 130)}>Chọn đường R₁</button>
                    <button type="button" onClick={() => { const next = graphAttempts + 1; setGraphAttempts(next); missMission(next === 1 ? 'Hãy quan sát tốc độ tăng của dòng điện.' : 'Độ dốc đã được làm nổi bật: đường càng dốc thì R càng nhỏ.') }}>Chọn đường R₂</button>
                  </div>
                </div>
              )}

              {mission === 3 && (
                <div className="game-panel circuit-mission">
                  <div className="game-mission-head"><span>Thử thách 4 - Giải mã mạch điện</span><h3>Tính dòng điện để mở khóa hệ thống.</h3></div>
                  <div className="locked-circuit">
                    <div><span>U</span><strong>12 V</strong></div><i /><div><span>R</span><strong>4 Ω</strong></div>
                    <b className={missionSolved ? 'is-open' : ''}>Khóa điện</b>
                    {missionSolved && <em className="circuit-power"><i /><i /><i /></em>}
                  </div>
                  <form className="circuit-answer" onSubmit={(event) => { event.preventDefault(); if (Number(circuitInput) === 3) { solveMission('Mở khóa thành công. I = U/R = 3 A.', 150) } else { const next = circuitAttempts + 1; setCircuitAttempts(next); missMission(next === 1 ? 'Hãy sử dụng định luật Ôm.' : 'I = U / R = 12 / 4 = 3 A.') } }}>
                    <label>I = <input value={circuitInput} onChange={(event) => setCircuitInput(event.target.value)} inputMode="decimal" placeholder="?" /> A</label>
                    <button type="submit">Mở khóa</button>
                  </form>
                </div>
              )}

              {mission === 4 && (
                <div className="game-panel overload-mission">
                  <div className="game-mission-head"><span>Thử thách 5 - Dây điện quá tải</span><h3>Làm dây dẫn bớt nóng.</h3></div>
                  <div className={overloadCurrent <= 2 ? 'overload-wire is-safe' : 'overload-wire'}>
                    <span>Cảnh báo quá tải</span><i /><strong>{overloadCurrent <= 2 ? 'Ổn định' : 'Đang nóng'}</strong>
                  </div>
                  <div className="game-controls game-controls--columns">
                    <label>Giảm U <b>{overloadVoltage} V</b><input type="range" min="2" max="12" value={overloadVoltage} onChange={(event) => setOverloadVoltage(Number(event.target.value))} /></label>
                    <label>Tăng R <b>{overloadResistance} Ω</b><input type="range" min="1" max="10" value={overloadResistance} onChange={(event) => setOverloadResistance(Number(event.target.value))} /></label>
                    <strong>I = {overloadCurrent.toFixed(2)} A</strong>
                  </div>
                  {overloadCurrent <= 2 && (
                    <div className="game-question">
                      <p>Tại sao dây dẫn nóng lên khi dòng điện quá lớn?</p>
                      <button type="button" onClick={() => solveMission('Dòng điện giảm nên electron va chạm và truyền năng lượng ít hơn, dây dẫn nguội dần.', 140)}>Electron truyền năng lượng khi va chạm</button>
                      <button type="button" onClick={() => missMission('Electron không biến mất; dòng lớn làm hiệu ứng nhiệt mạnh hơn.')}>Electron biến mất</button>
                    </div>
                  )}
                </div>
              )}

              {mission === 5 && (
                <div className="game-panel wire-lab-mission">
                  <div className="game-mission-head"><span>Thử thách 6 - Phòng thí nghiệm điện trở</span><h3>Tạo dây dẫn có điện trở nhỏ nhất.</h3></div>
                  <div className="wire-lab-result">
                    <div className={labMaterial === 'copper' && labLength === 1 && labArea === 4 ? 'crafted-wire is-optimal' : 'crafted-wire'} style={{ '--wire-width': `${10 + labArea * 8}px`, '--wire-length': `${34 + labLength * 15}%` }} />
                    <strong>R quan sát: {wireGameResistance} Ω</strong>
                  </div>
                  <div className="game-controls game-controls--three">
                    <label>Chiều dài <b>{labLength} m</b><input type="range" min="1" max="4" value={labLength} onChange={(event) => setLabLength(Number(event.target.value))} /></label>
                    <label>Tiết diện <b>{labArea} mm²</b><input type="range" min="1" max="4" value={labArea} onChange={(event) => setLabArea(Number(event.target.value))} /></label>
                    <label>Vật liệu<select value={labMaterial} onChange={(event) => setLabMaterial(event.target.value)}><option value="copper">Đồng</option><option value="iron">Sắt</option><option value="nichrome">Nichrome</option></select></label>
                  </div>
                  <button className="game-confirm-btn" type="button" onClick={() => labMaterial === 'copper' && labLength === 1 && labArea === 4 ? solveMission('Thiết kế tối ưu: dây đồng ngắn, tiết diện lớn cho điện trở nhỏ nhất.', 180) : missMission('Cần dây ngắn hơn, tiết diện lớn hơn và vật liệu dẫn điện tốt hơn.')}>Kiểm tra thiết kế</button>
                </div>
              )}

              {mission === 6 && (
                <div className="game-panel heat-mission">
                  <div className="game-mission-head"><span>Thử thách 7 - Nhiệt độ</span><h3>Quan sát electron khi dây kim loại nóng dần.</h3></div>
                  <div className="heated-lattice" style={{ '--heat': gameTemperature }}>
                    {Array.from({ length: 8 }, (_, index) => <i key={index} />)}
                    <span className="heated-electron" />
                  </div>
                  <label className="game-temperature">Nhiệt độ <b>{gameTemperature} °C</b><input type="range" min="20" max="100" value={gameTemperature} onChange={(event) => setGameTemperature(Number(event.target.value))} /></label>
                  {gameTemperature >= 65 && (
                    <div className="game-question">
                      <p>Khi nhiệt độ tăng, điện trở kim loại thay đổi thế nào?</p>
                      <button type="button" onClick={() => solveMission('Đúng. Ion dao động mạnh, electron va chạm nhiều hơn nên điện trở tăng.', 150)}>Tăng</button>
                      <button type="button" onClick={() => { const next = temperatureAttempts + 1; setTemperatureAttempts(next); missMission(next === 1 ? 'Hãy chú ý số lần va chạm electron.' : 'Ion đang rung mạnh và electron đi zigzag nhiều hơn.') }}>Giảm</button>
                    </div>
                  )}
                </div>
              )}

              {mission === 7 && (
                <div className="game-panel thermistor-match-mission">
                  <div className="game-mission-head"><span>Thử thách 8 - NTC và PTC</span><h3>Kéo đúng linh kiện vào đúng hệ thống.</h3></div>
                  <div className="thermistor-tokens">
                    {[
                      ['ntc', ntcThermistorImage, 'NTC'],
                      ['ptc', ptcThermistorImage, 'PTC'],
                    ].map(([value, image, label]) => (
                      <button className={selectedThermistor === value ? 'is-selected' : ''} draggable="true" type="button" key={value} onDragStart={() => setDraggedThermistor(value)} onClick={() => setSelectedThermistor(value)}>
                        <img src={image} alt={`Điện trở nhiệt ${label}`} /><strong>{label}</strong>
                      </button>
                    ))}
                  </div>
                  <div className="thermistor-slots">
                    {[
                      ['sensor', 'Cảm biến nhiệt độ'],
                      ['protect', 'Bảo vệ quá tải'],
                    ].map(([slot, label]) => (
                      <button className={thermistorSlots[slot] ? 'is-filled' : ''} type="button" key={slot} onDragOver={(event) => event.preventDefault()} onDrop={() => assignThermistor(slot, draggedThermistor)} onClick={() => assignThermistor(slot)}>
                        <span>{label}</span>
                        <strong>{thermistorSlots[slot] ? thermistorSlots[slot].toUpperCase() : 'Thả linh kiện vào đây'}</strong>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {mission === 8 && (
                <div className="game-panel boss-mission">
                  <div className="game-mission-head"><span>Boss cuối - Giải cứu thành phố</span><h3>Ổn định toàn bộ hệ thống điện.</h3></div>
                  <div className={bossStable ? 'boss-city is-stable' : 'boss-city'}>
                    <div className="boss-buildings"><i /><i /><i /><i /><i /></div>
                    <p>{bossStable ? 'Hệ thống sẵn sàng kích hoạt' : 'Dây quá tải - đèn chập chờn - nhiệt độ cao'}</p>
                  </div>
                  <div className="game-controls game-controls--boss">
                    <label>Hiệu điện thế U <b>{bossVoltage} V</b><input type="range" min="2" max="12" value={bossVoltage} onChange={(event) => setBossVoltage(Number(event.target.value))} /></label>
                    <label>Điện trở R <b>{bossResistance} Ω</b><input type="range" min="1" max="8" value={bossResistance} onChange={(event) => setBossResistance(Number(event.target.value))} /></label>
                    <label>Vật liệu<select value={bossMaterial} onChange={(event) => setBossMaterial(event.target.value)}><option value="nichrome">Nichrome</option><option value="iron">Sắt</option><option value="copper">Đồng</option></select></label>
                    <label>Bảo vệ nhiệt<select value={bossProtection} onChange={(event) => setBossProtection(event.target.value)}><option value="ntc">NTC</option><option value="ptc">PTC</option></select></label>
                  </div>
                  <div className="boss-readout"><span>Dòng điện: <b>{bossCurrent.toFixed(2)} A</b></span><span>Nhiệt độ: <b>{bossStable ? 'Ổn định' : 'Cảnh báo'}</b></span></div>
                  <button className="game-confirm-btn" type="button" onClick={() => bossStable ? solveMission('Thành phố đã sáng trở lại. Hệ thống điện hoàn toàn ổn định.', 300) : missMission('Cần I từ 1.5 A đến 2.5 A, dây đồng và PTC để bảo vệ khi quá nhiệt.')}>Kích hoạt lưới điện</button>
                </div>
              )}

              {feedback && <div className={missionSolved ? 'game-feedback is-success' : 'game-feedback'}>{feedback}</div>}
              {missionSolved && mission < totalMissions - 1 && <button className="next-mission-btn" type="button" onClick={nextMission}>Nhiệm vụ tiếp theo</button>}
            </section>
          )}

          {finished && (
            <section className="game-victory">
              <div className="victory-city" aria-hidden="true"><i /><i /><i /><i /><i /></div>
              <small>Hệ thống điện ổn định</small>
              <h2>Bạn đã hoàn thành hành trình khám phá điện trở và định luật Ôm!</h2>
              <div className="victory-stats">
                <span>Tổng điểm <b>{score}</b></span>
                <span>Thời gian <b>{timeLabel}</b></span>
                <span>Thử thách <b>{completedCount}/{totalMissions}</b></span>
                <span>Combo cao nhất <b>x{highestCombo}</b></span>
              </div>
              <div className="victory-badges">
                {['Người khám phá electron', 'Bậc thầy định luật Ôm', 'Kỹ sư điện trở', 'Chuyên gia nhiệt điện trở'].map((badge) => <strong key={badge}><i />{badge}</strong>)}
              </div>
              <button type="button" onClick={startGame}>Chơi lại hành trình</button>
            </section>
          )}
        </>
      )}
    </article>
  )
}

function Lesson23OhmLesson() {
  const discoveryRef = useRef(null)
  const voltageControlRef = useRef(null)
  const [conductorChoice, setConductorChoice] = useState('')
  const [electronFlowChoice, setElectronFlowChoice] = useState('')
  const [resistanceQuestion, setResistanceQuestion] = useState('')
  const [activeTestConductor, setActiveTestConductor] = useState('r1')
  const [liveVoltage, setLiveVoltage] = useState(1)
  const [experimentRows, setExperimentRows] = useState({ r1: [], r2: [] })
  const [lineShapeChoice, setLineShapeChoice] = useState('')
  const [doublingChoice, setDoublingChoice] = useState('')
  const [lineComparisonChoice, setLineComparisonChoice] = useState('')
  const [slopeChoice, setSlopeChoice] = useState('')
  const [conductionChoice, setConductionChoice] = useState('')
  const [hoveredPoint, setHoveredPoint] = useState(null)
  const [draggedKeyword, setDraggedKeyword] = useState('')
  const [statementSlots, setStatementSlots] = useState({})
  const [causeSituationAnswers, setCauseSituationAnswers] = useState({})
  const [factorPrediction, setFactorPrediction] = useState('')
  const [wireLength, setWireLength] = useState(2)
  const [hasChangedLength, setHasChangedLength] = useState(false)
  const [lengthFinding, setLengthFinding] = useState('')
  const [wireArea, setWireArea] = useState(2)
  const [hasChangedArea, setHasChangedArea] = useState(false)
  const [areaFinding, setAreaFinding] = useState('')
  const [wireMaterial, setWireMaterial] = useState('copper')
  const [hasChangedMaterial, setHasChangedMaterial] = useState(false)
  const [materialFinding, setMaterialFinding] = useState('')
  const [temperaturePrediction, setTemperaturePrediction] = useState('')
  const [metalTemperature, setMetalTemperature] = useState(20)
  const [hasHeatedMetal, setHasHeatedMetal] = useState(false)
  const [ionMotionFinding, setIonMotionFinding] = useState('')
  const [collisionFinding, setCollisionFinding] = useState('')
  const [metalResistanceFinding, setMetalResistanceFinding] = useState('')
  const [showColdCurve, setShowColdCurve] = useState(true)
  const [showHotCurve, setShowHotCurve] = useState(true)
  const [curveFinding, setCurveFinding] = useState('')
  const [bulbVoltage, setBulbVoltage] = useState(1)
  const [hasAdjustedBulb, setHasAdjustedBulb] = useState(false)
  const [bulbCurveFinding, setBulbCurveFinding] = useState('')
  const [ntcTemperature, setNtcTemperature] = useState(20)
  const [hasHeatedNtc, setHasHeatedNtc] = useState(false)
  const [ntcFinding, setNtcFinding] = useState('')
  const [ptcTemperature, setPtcTemperature] = useState(20)
  const [hasHeatedPtc, setHasHeatedPtc] = useState(false)
  const [ptcFinding, setPtcFinding] = useState('')
  const [competencyRatings, setCompetencyRatings] = useState({})
  const [reflectionText, setReflectionText] = useState('')
  const [overallUnderstanding, setOverallUnderstanding] = useState('')

  const hasElectronFlowInsight = electronFlowChoice === 'decrease'
  const isConceptRevealed = conductorChoice === 'hard' && hasElectronFlowInsight && resistanceQuestion === 'not-same'
  const r1PointsComplete = experimentRows.r1.length >= 4
  const hasR1Conclusion = lineShapeChoice === 'straight' && doublingChoice === 'double'
  const r2PointsComplete = experimentRows.r2.length >= 4
  const isOhmReady = hasR1Conclusion && lineComparisonChoice === 'different' && slopeChoice === 'r1' && conductionChoice === 'smaller'
  const isStatementComplete = ohmStatementOrder.every((slotId) => statementSlots[slotId] === slotId)
  const activeTest = voltageExperimentConductors[activeTestConductor]
  const hasActiveReading = experimentRows[activeTestConductor].length > 0
  const liveCurrent = liveVoltage / activeTest.resistance
  const shownConductors = hasR1Conclusion ? ['r1', 'r2'] : ['r1']
  const groupedChartPoints = shownConductors.map((id) => ({
    ...voltageExperimentConductors[id],
    id,
    points: experimentRows[id],
  }))
  const maxU = 10
  const maxI = 2.5
  const toX = (voltage) => 58 + (voltage / maxU) * 428
  const toY = (current) => 276 - (current / maxI) * 220
  const getChartPath = (points) => [{ voltage: 0, current: 0 }, ...points].map((point, index) => `${index === 0 ? 'M' : 'L'} ${toX(point.voltage)} ${toY(point.current)}`).join(' ')

  const collectVoltagePoint = (value) => {
    const voltage = Number(value)
    setLiveVoltage(voltage)

    setExperimentRows((current) => {
      const point = {
        id: `${activeTestConductor}-${voltage}`,
        voltage,
        resistance: activeTest.resistance,
        current: voltage / activeTest.resistance,
        isFresh: true,
      }
      const nextRows = current[activeTestConductor].some((row) => row.voltage === voltage)
        ? current[activeTestConductor].map((row) => (row.voltage === voltage ? point : { ...row, isFresh: false }))
        : [...current[activeTestConductor].map((row) => ({ ...row, isFresh: false })), point]

      return {
        ...current,
        [activeTestConductor]: nextRows.sort((a, b) => a.voltage - b.voltage),
      }
    })
  }

  const selectTestConductor = (conductorId) => {
    setActiveTestConductor(conductorId)
    setLiveVoltage(1)

    if (conductorId === 'r2') {
      window.setTimeout(() => voltageControlRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80)
    }
  }

  const checkSoftAnswer = (setter, value, correct) => {
    setter(value)
    playLessonTone(value === correct ? 'correct' : 'wrong')
  }

  const placeKeyword = (slotId, keywordId = draggedKeyword) => {
    if (!keywordId && statementSlots[slotId]) {
      setStatementSlots((current) => {
        const nextSlots = { ...current }
        delete nextSlots[slotId]
        return nextSlots
      })
      return
    }

    if (!keywordId) {
      return
    }

    setStatementSlots((current) => ({ ...current, [slotId]: keywordId }))
    setDraggedKeyword('')
    playLessonTone(keywordId === slotId ? 'correct' : 'wrong')
  }

  const resetStatement = () => {
    setStatementSlots({})
    setDraggedKeyword('')
  }

  const causeSituationsComplete = resistanceCauseSituations.every((scenario) => causeSituationAnswers[scenario.id] === scenario.answer)
  const hasFactorPrediction = factorPrediction === 'all'
  const hasLengthFinding = lengthFinding === 'more'
  const hasAreaFinding = areaFinding === 'easier'
  const hasMaterialFinding = materialFinding === 'different'
  const lengthResistance = (1.7 * wireLength).toFixed(1)
  const areaResistance = (8.5 / wireArea).toFixed(1)
  const selectedMaterial = wireMaterialOptions[wireMaterial]
  const wireFactorsComplete = hasMaterialFinding
  const ionsUnderstood = ionMotionFinding === 'stronger'
  const collisionsUnderstood = collisionFinding === 'more'
  const metalTemperatureUnderstood = metalResistanceFinding === 'increase'
  const curvesUnderstood = curveFinding === 'resistance-up'
  const bulbUnderstood = bulbCurveFinding === 'temperature'
  const ntcUnderstood = ntcFinding === 'decrease'
  const ptcUnderstood = ptcFinding === 'increase'
  const temperatureJourneyComplete = ptcUnderstood
  const metalResistance = (4 * (1 + 0.004 * (metalTemperature - 20))).toFixed(2)
  const metalCollisions = Math.round(5 + (metalTemperature - 20) * 0.16)
  const electronsPerSecond = Math.round(44 - (metalTemperature - 20) * 0.22)
  const bulbHeat = Math.round(24 + bulbVoltage * 208)
  const bulbThermalFactor = 0.04 + (bulbVoltage / 6) * 0.12
  const getBulbCurrent = (voltage) => voltage / (2.4 + bulbThermalFactor * voltage * voltage)
  const bulbResistance = (2.4 + bulbThermalFactor * bulbVoltage * bulbVoltage).toFixed(1)
  const bulbCurrent = getBulbCurrent(bulbVoltage)
  const bulbChartX = (voltage) => 44 + (voltage / 6) * 314
  const bulbChartY = (current) => 222 - current * 104
  const bulbCurvePath = Array.from({ length: 25 }, (_, index) => {
    const voltage = (index / 24) * 6
    return `${index === 0 ? 'M' : 'L'} ${bulbChartX(voltage).toFixed(1)} ${bulbChartY(getBulbCurrent(voltage)).toFixed(1)}`
  }).join(' ')
  const ntcResistance = (ntcTemperature <= 50
    ? 10 - ((ntcTemperature - 20) / 30) * 6
    : 4 - ((ntcTemperature - 50) / 30) * 2.5).toFixed(1)
  const ptcResistance = (ptcTemperature <= 50
    ? 200 + ((ptcTemperature - 20) / 30) * 600
    : 800 + ((ptcTemperature - 50) / 30) * 2200)
  const ptcResistanceLabel = ptcResistance >= 1000 ? `${(ptcResistance / 1000).toFixed(1)} kΩ` : `${Math.round(ptcResistance)} Ω`

  const answerCauseSituation = (scenario, answerIndex) => {
    setCauseSituationAnswers((current) => ({ ...current, [scenario.id]: answerIndex }))
    playLessonTone(answerIndex === scenario.answer ? 'correct' : 'wrong')
  }

  const usedStatementKeywords = Object.values(statementSlots)
  const availableStatementBank = ohmStatementBank.filter((word) => !usedStatementKeywords.includes(word.id))
  const assessmentItemCount = lesson23SelfAssessment.reduce((total, section) => total + section.items.length, 0)
  const assessedCount = Object.keys(competencyRatings).length

  return (
    <section className="lesson23-lab">
      <article className="lesson23-video-card">
        <div className="lesson23-video-title">
          <span>Bài 23</span>
          <h1>Điện trở. Định luật Ôm</h1>
        </div>
        <div className="lesson23-video-slot">
          <div className="lesson23-video-screen">
            <InteractiveLessonVideo
              interactions={lesson23VideoInteractions}
              onComplete={() => discoveryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              src="/videos/bai23.mp4"
              title="Video tương tác bài 23 - Điện trở. Định luật Ôm"
            />
          </div>
        </div>
      </article>

      <article className="lesson23-flow" ref={discoveryRef}>
        <div className="conductor-grid">
          {[
            ['easy', 'Vật dẫn A', '46'],
            ['hard', 'Vật dẫn B', '21'],
          ].map(([value, title, count]) => (
            <button className={conductorChoice === value ? 'conductor-card conductor-card--active' : 'conductor-card'} key={value} type="button" onClick={() => checkSoftAnswer(setConductorChoice, value, 'hard')}>
              <span className={`electron-track electron-track--${value}`} aria-hidden="true">
                <i /><i /><i /><i /><i /><i /><i />
                <b style={{ '--shake': value === 'hard' ? '18px' : '4px', '--duration': value === 'hard' ? '2.9s' : '1.4s' }} />
                <b style={{ '--shake': value === 'hard' ? '-16px' : '-3px', '--duration': value === 'hard' ? '3.2s' : '1.55s', '--delay': '0.38s' }} />
                <b style={{ '--shake': value === 'hard' ? '13px' : '2px', '--duration': value === 'hard' ? '3.4s' : '1.75s', '--delay': '0.76s' }} />
              </span>
              <strong>{title}</strong>
              <em>{count} electron qua tiết diện mỗi giây</em>
            </button>
          ))}
        </div>
        <div className="question-card">
          <h3>Trong vật dẫn nào electron khó di chuyển hơn?</h3>
          <div className="choice-row">
            <button className={conductorChoice === 'easy' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setConductorChoice, 'easy', 'hard')}>Vật dẫn A</button>
            <button className={conductorChoice === 'hard' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setConductorChoice, 'hard', 'hard')}>Vật dẫn B</button>
          </div>
          {conductorChoice === 'easy' && <p className="inline-feedback inline-feedback--wrong">Ở A electron đi thẳng hơn và qua tiết diện nhiều hơn. Hãy nhìn lại B.</p>}
          {conductorChoice === 'hard' && (
            <>
              <p className="inline-feedback inline-feedback--correct">Ở B electron đổi hướng nhiều hơn, nên chuyển động khó hơn.</p>
              <div className="lesson23-followup">
                <h3>Nếu electron di chuyển khó hơn, số electron đi qua tiết diện mỗi giây sẽ tăng hay giảm?</h3>
                <div className="choice-row">
                  <button className={electronFlowChoice === 'increase' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setElectronFlowChoice, 'increase', 'decrease')}>Tăng</button>
                  <button className={electronFlowChoice === 'decrease' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setElectronFlowChoice, 'decrease', 'decrease')}>Giảm</button>
                </div>
                {electronFlowChoice === 'increase' && <p className="inline-feedback inline-feedback--wrong">Hãy quan sát lại số electron đi qua tiết diện mỗi giây đã liệt kê ở hai vật dẫn trên.</p>}
                {hasElectronFlowInsight && <p className="inline-feedback inline-feedback--correct">Đúng. Electron bị cản trở nhiều hơn nên ít electron đi qua tiết diện mỗi giây hơn.</p>}
              </div>
              {hasElectronFlowInsight && (
                <>
                  <div className="lesson23-prior-link">Ở bài trước, chúng ta đã biết: số electron đi qua tiết diện mỗi giây càng lớn thì cường độ dòng điện càng lớn.</div>
                  <div className="lesson23-next-question">
                    <strong>Các vật dẫn có cản trở dòng điện giống nhau không?</strong>
                    <button className={resistanceQuestion === 'same' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setResistanceQuestion, 'same', 'not-same')}>Giống nhau</button>
                    <button className={resistanceQuestion === 'not-same' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setResistanceQuestion, 'not-same', 'not-same')}>Không giống nhau</button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        {isConceptRevealed && <div className="formula-reveal lesson23-reveal"><span>Mức độ cản trở dòng điện của vật dẫn được gọi là điện trở.</span></div>}
      </article>

      {isConceptRevealed && (
        <article className="lesson23-flow lesson23-flow--experiment">
          <p>Nếu vật dẫn cản trở dòng điện... vậy cường độ dòng điện phụ thuộc vào hiệu điện thế như thế nào?</p>
          <div className="voltage-lab-guide">
            <strong>Vật dẫn {activeTest.label}</strong>
            <span>{activeTestConductor === 'r1' ? 'Hãy kéo U đến ít nhất 4 giá trị khác nhau đặt vào hai đầu vật dẫn R₁ và quan sát cường độ dòng điện I.' : 'Hãy tiếp tục với R₂: kéo U đến ít nhất 4 giá trị khác nhau để tạo đường biểu diễn mới.'}</span>
          </div>
          {hasR1Conclusion && (
            <div className="conductor-switch" aria-label="Chọn vật dẫn khảo sát">
              {['r1', 'r2'].map((id) => (
                <button className={activeTestConductor === id ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" key={id} onClick={() => selectTestConductor(id)}>{voltageExperimentConductors[id].label}</button>
              ))}
            </div>
          )}
          <div className="live-dashboard">
            {[
              ['U', hasActiveReading ? `${liveVoltage} V` : '-- V'],
              ['Vật dẫn', activeTest.label],
              ['I', hasActiveReading ? `${liveCurrent.toFixed(2)} A` : '-- A'],
            ].map(([label, value]) => <div className="live-stat" key={label}><span>{label}</span><strong>{value}</strong></div>)}
          </div>
          <div className="experiment-voltage-control" ref={voltageControlRef}>
            <label>
              <span>Hiệu điện thế U của {activeTest.label}</span>
              <input type="range" min="1" max="10" step="1" value={liveVoltage} onChange={(event) => collectVoltagePoint(event.target.value)} />
            </label>
            <div className="voltage-scale" aria-hidden="true">{Array.from({ length: 10 }, (_, index) => <span key={index + 1}>{index + 1}V</span>)}</div>
            <div className={experimentRows[activeTestConductor].length >= 4 ? 'experiment-count experiment-count--done' : 'experiment-count'}>
              <span>Đã thử {experimentRows[activeTestConductor].length}/4 giá trị U</span>
              <strong>{experimentRows[activeTestConductor].length >= 4 ? 'Đủ dữ liệu để tạo đường biểu diễn' : 'Kéo thêm các mức U khác nhau'}</strong>
            </div>
          </div>
          <div className="chart-layout" id="lesson23-ui-chart">
            <div>
              <h3>Đồ thị U-I</h3>
              <svg className={lineComparisonChoice === 'different' ? 'ohm-chart ohm-chart--slope-focus' : 'ohm-chart'} viewBox="0 0 540 320" role="img" aria-label="Đồ thị I theo U">
                <line x1="58" y1="276" x2="506" y2="276" />
                <line x1="58" y1="276" x2="58" y2="44" />
                <text x="496" y="306">U</text>
                <text x="18" y="58">I</text>
                {groupedChartPoints.map((group) => (
                  <g className={`chart-series chart-series--${group.id}`} key={group.id} style={{ '--chart-color': group.color }}>
                    {group.points.length >= 4 && <path d={getChartPath(group.points)} />}
                    {group.points.map((point) => (
                      <circle key={`point-${group.id}-${point.voltage}`} cx={toX(point.voltage)} cy={toY(point.current)} r="8" onMouseEnter={() => setHoveredPoint({ ...point, label: group.label })} onMouseLeave={() => setHoveredPoint(null)} />
                    ))}
                  </g>
                ))}
              </svg>
              <div className="chart-legend">
                {groupedChartPoints.map((group) => <span key={`legend-${group.id}`} style={{ '--legend-color': group.color }}>{group.label}</span>)}
              </div>
              <div className="data-tip">{hoveredPoint ? `${hoveredPoint.label}: U = ${hoveredPoint.voltage} V, I = ${hoveredPoint.current.toFixed(2)} A` : 'Kéo U để thêm điểm vào đồ thị.'}</div>
            </div>
            <div className="experiment-tables">
              {shownConductors.map((id) => (
                <div className="live-table-wrap" key={`table-${id}`}>
                  <h3>Bảng số liệu {voltageExperimentConductors[id].label}</h3>
                  <table className="live-table">
                    <thead><tr><th>Lần thử</th><th>U</th><th>I</th></tr></thead>
                    <tbody>
                      {experimentRows[id].length === 0 && <tr><td className="empty-data" colSpan="3">Chưa có dữ liệu</td></tr>}
                      {experimentRows[id].map((row, index) => (
                        <tr className={row.isFresh ? 'row-fresh' : ''} key={row.id}><td>{index + 1}</td><td>{row.voltage} V</td><td>{row.current.toFixed(2)} A</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
          {r1PointsComplete && (
            <div className="question-card">
              <h3>Đường biểu diễn vừa tạo có đặc điểm gì?</h3>
              <div className="choice-row">
                <button className={lineShapeChoice === 'straight' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setLineShapeChoice, 'straight', 'straight')}>Là đường thẳng đi qua gốc tọa độ</button>
                <button className={lineShapeChoice === 'curve' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setLineShapeChoice, 'curve', 'straight')}>Là đường cong bất kì</button>
              </div>
              {lineShapeChoice === 'curve' && <p className="inline-feedback inline-feedback--wrong">Hãy nhìn đường nối từ gốc tọa độ qua các điểm em vừa tạo.</p>}
              {lineShapeChoice === 'straight' && <p className="inline-feedback inline-feedback--correct">Đúng. Khi U tăng thì I cũng tăng theo.</p>}
            </div>
          )}
          {lineShapeChoice === 'straight' && (
            <div className="question-card">
              <h3>Khi tăng gấp đôi U thì I thay đổi như thế nào?</h3>
              <div className="choice-row">
                <button className={doublingChoice === 'double' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setDoublingChoice, 'double', 'double')}>Tăng gấp đôi</button>
                <button className={doublingChoice === 'same' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setDoublingChoice, 'same', 'double')}>Không đổi</button>
                <button className={doublingChoice === 'decrease' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setDoublingChoice, 'decrease', 'double')}>Giảm</button>
              </div>
              {doublingChoice && doublingChoice !== 'double' && <p className="inline-feedback inline-feedback--wrong">Đối chiếu hai dòng số liệu có giá trị U gấp đôi nhau.</p>}
              {doublingChoice === 'double' && <p className="inline-feedback inline-feedback--correct">Đúng. Với cùng vật dẫn, U tăng gấp đôi thì I cũng tăng gấp đôi.</p>}
            </div>
          )}
          {hasR1Conclusion && (
            <div className="r1-conclusion">
              <strong>Đối với cùng một điện trở R₁:</strong>
              <span>cường độ dòng điện I tỉ lệ thuận với hiệu điện thế U.</span>
              <button className="primary-soft-btn" type="button" onClick={() => selectTestConductor('r2')}>Thí nghiệm tiếp với R₂</button>
              <small>Sau khi chọn R₂, hãy kéo thanh hiệu điện thế U ở phía trên đến ít nhất 4 giá trị khác nhau để tạo đường mới trên đồ thị.</small>
            </div>
          )}
          {hasR1Conclusion && r2PointsComplete && (
            <div className="comparison-sequence" id="lesson23-resistance-role">
              <div className="question-card">
                <h3>Hai đường đặc trưng vôn-ampe có giống nhau không?</h3>
                <div className="choice-row">
                  <button className={lineComparisonChoice === 'same' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setLineComparisonChoice, 'same', 'different')}>Giống nhau</button>
                  <button className={lineComparisonChoice === 'different' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setLineComparisonChoice, 'different', 'different')}>Không giống nhau</button>
                </div>
                {lineComparisonChoice === 'same' && <p className="inline-feedback inline-feedback--wrong">Quan sát lại hai đường trên cùng hệ trục: chúng có độ nghiêng khác nhau.</p>}
                {lineComparisonChoice === 'different' && <p className="inline-feedback inline-feedback--correct">Đúng. Mỗi điện trở tạo ra một đường đặc trưng riêng.</p>}
              </div>
              {lineComparisonChoice === 'different' && (
                <div className="question-card slope-question">
                  <span>Quan sát vùng độ dốc được làm nổi bật trên đồ thị.</span>
                  <h3>Đường nào có độ dốc lớn hơn?</h3>
                  <div className="choice-row">
                    <button className={slopeChoice === 'r1' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setSlopeChoice, 'r1', 'r1')}>R₁</button>
                    <button className={slopeChoice === 'r2' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setSlopeChoice, 'r2', 'r1')}>R₂</button>
                  </div>
                  {slopeChoice === 'r2' && <p className="inline-feedback inline-feedback--wrong">Tại cùng U, hãy xem đường nào có giá trị I cao hơn.</p>}
                </div>
              )}
              {slopeChoice === 'r1' && (
                <div className="question-card">
                  <h3>Điện trở nào làm dòng điện tăng dễ hơn khi tăng U?</h3>
                  <div className="choice-row">
                    <button className={conductionChoice === 'smaller' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setConductionChoice, 'smaller', 'smaller')}>Điện trở nhỏ hơn</button>
                    <button className={conductionChoice === 'larger' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setConductionChoice, 'larger', 'smaller')}>Điện trở lớn hơn</button>
                  </div>
                  {conductionChoice === 'larger' && <p className="inline-feedback inline-feedback--wrong">Đường dốc hơn cho I lớn hơn tại cùng U. Hãy suy luận lại mức cản trở.</p>}
                  {conductionChoice === 'smaller' && <p className="inline-feedback inline-feedback--correct">Đúng. Điện trở càng nhỏ thì dòng điện tăng càng nhanh.</p>}
                </div>
              )}
              {isOhmReady && (
                <div className="slope-conclusion">
                  <strong>Độ dốc của đường đặc trưng vôn-ampe cho biết mức độ dẫn điện của vật dẫn.</strong>
                  <b>k = I / U = 1 / R</b>
                  <span>Đường càng dốc → k càng lớn → R càng nhỏ.</span>
                  <span>Đường càng thoải → k càng nhỏ → R càng lớn.</span>
                </div>
              )}
            </div>
          )}
        </article>
      )}

      {isOhmReady && (
        <article className="lesson23-flow">
          <p>Vậy cường độ dòng điện phụ thuộc đồng thời vào hiệu điện thế và điện trở như thế nào?</p>
          <div className="ohm-builder">
            <div className="drag-sentence">
              <button className="drop-slot" type="button" onDragOver={(event) => event.preventDefault()} onDrop={() => placeKeyword('cuong-do')} onClick={() => placeKeyword('cuong-do')}>{ohmStatementBank.find((word) => word.id === statementSlots['cuong-do'])?.label || '...'}</button>
              <span>qua vật dẫn</span>
              <button className="drop-slot" type="button" onDragOver={(event) => event.preventDefault()} onDrop={() => placeKeyword('ti-le-thuan')} onClick={() => placeKeyword('ti-le-thuan')}>{ohmStatementBank.find((word) => word.id === statementSlots['ti-le-thuan'])?.label || '...'}</button>
              <span>với</span>
              <button className="drop-slot" type="button" onDragOver={(event) => event.preventDefault()} onDrop={() => placeKeyword('hieu-dien-the')} onClick={() => placeKeyword('hieu-dien-the')}>{ohmStatementBank.find((word) => word.id === statementSlots['hieu-dien-the'])?.label || '...'}</button>
              <span>giữa hai đầu vật dẫn và</span>
              <button className="drop-slot" type="button" onDragOver={(event) => event.preventDefault()} onDrop={() => placeKeyword('ti-le-nghich')} onClick={() => placeKeyword('ti-le-nghich')}>{ohmStatementBank.find((word) => word.id === statementSlots['ti-le-nghich'])?.label || '...'}</button>
              <span>với</span>
              <button className="drop-slot" type="button" onDragOver={(event) => event.preventDefault()} onDrop={() => placeKeyword('dien-tro')} onClick={() => placeKeyword('dien-tro')}>{ohmStatementBank.find((word) => word.id === statementSlots['dien-tro'])?.label || '...'}</button>
              <span>của vật dẫn.</span>
            </div>
            <div className="drag-bank">
              {availableStatementBank.map((word) => (
                <button className={draggedKeyword === word.id ? 'soft-choice soft-choice--active' : 'soft-choice'} draggable type="button" key={word.id} onClick={() => setDraggedKeyword(word.id)} onDragStart={() => setDraggedKeyword(word.id)}>
                  {word.label}
                </button>
              ))}
              <button className="ghost-soft-btn" type="button" onClick={resetStatement}>Làm lại</button>
            </div>
          </div>
          {isStatementComplete && (
            <div className="formula-reveal lesson23-formula-pop">
              <p className="lesson23-law-intro">Đây chính là nội dung của định luật Ôm</p>
              <span>Cường độ dòng điện qua vật dẫn tỉ lệ thuận với hiệu điện thế giữa hai đầu vật dẫn và tỉ lệ nghịch với điện trở của vật dẫn.</span>
              <strong>I = U / R</strong>
              <div className="lesson23-symbols">
                <span><b>I</b><em>cường độ dòng điện (A)</em></span>
                <span><b>U</b><em>hiệu điện thế (V)</em></span>
                <span><b>R</b><em>điện trở (Ω)</em></span>
              </div>
            </div>
          )}
        </article>
      )}

      {isStatementComplete && (
        <>
          <article className="lesson23-flow lesson23-metal-cause" id="lesson23-cause">
            <p>Nguyên nhân gây ra điện trở</p>
            <span className="cause-observe-intro">Quan sát chuyển động electron trong ba trường hợp rồi so sánh mức cản trở.</span>
            <div className="cause-situation-grid">
              {resistanceCauseSituations.map((scenario) => {
                const selectedAnswer = causeSituationAnswers[scenario.id]
                const isCorrect = selectedAnswer === scenario.answer

                return (
                  <section className={`cause-situation cause-situation--${scenario.id}`} id={scenario.id === 'warm' ? 'lesson23-collision-effect' : undefined} key={scenario.id}>
                    <span className="cause-situation-label">{scenario.caseLabel}</span>
                    <h3>{scenario.title}</h3>
                    <div className="cause-motion" aria-label={`Mô phỏng ${scenario.title.toLowerCase()}`}>
                      <span className="cause-path cause-path--one" />
                      <span className="cause-path cause-path--two" />
                      {Array.from({ length: 8 }, (_, index) => <i className="cause-ion" key={`${scenario.id}-ion-${index}`} />)}
                      {scenario.id === 'impure' && <><i className="cause-impurity cause-impurity--one" /><i className="cause-impurity cause-impurity--two" /></>}
                      <b className="cause-electron cause-electron--one" />
                      <b className="cause-electron cause-electron--two" />
                    </div>
                    <div className="cause-live-readout" aria-live="polite">
                      {scenario.readings.map(([label, value]) => (
                        <div key={label}><span>{label}</span><strong>{value}</strong></div>
                      ))}
                    </div>
                    <div className="cause-situation-question">
                      <h4>{scenario.question}</h4>
                      <div>
                        {scenario.options.map((option, index) => (
                          <button className={selectedAnswer === index ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" key={option} onClick={() => answerCauseSituation(scenario, index)}>{option}</button>
                        ))}
                      </div>
                      {isCorrect && <p className="inline-feedback inline-feedback--correct">{scenario.feedback}</p>}
                      {selectedAnswer !== undefined && !isCorrect && <p className="inline-feedback inline-feedback--wrong">Hãy quan sát lại quỹ đạo electron và chỉ báo mức cản trở.</p>}
                    </div>
                  </section>
                )
              })}
            </div>
            {causeSituationsComplete && (
              <>
                <div className="cause-summary-table">
                  <strong>So sánh em vừa khám phá</strong>
                  <span>Va chạm ít <b>→</b> điện trở nhỏ</span>
                  <span>Va chạm nhiều <b>→</b> điện trở lớn</span>
                  <span>Nhiệt độ tăng <b>→</b> điện trở kim loại thường tăng</span>
                  <span>Tạp chất nhiều <b>→</b> điện trở tăng</span>
                </div>
                <div className="cause-conclusion">
                  Điện trở xuất hiện do sự mất trật tự của mạng tinh thể làm electron bị cản trở khi chuyển động.
                </div>
              </>
            )}
          </article>

          {causeSituationsComplete && (
            <article className="lesson23-flow wire-factor-discovery" id="lesson23-wire-factors">
              <p>Điều gì làm mức cản trở mạnh hay yếu?</p>
              <span className="cause-observe-intro">Ta đã biết các vật dẫn khác nhau có mức cản trở dòng điện khác nhau. Vậy những yếu tố nào làm điện trở của một dây dẫn tăng hoặc giảm?</span>
              <div className="question-card factor-entry-question">
                <h3>Điều gì có thể làm điện trở của dây dẫn thay đổi?</h3>
                <div className="choice-row">
                  {[
                    ['length', 'Chiều dài dây'],
                    ['area', 'Tiết diện dây'],
                    ['material', 'Vật liệu dây'],
                    ['all', 'Cả 3 yếu tố trên'],
                  ].map(([value, label]) => (
                    <button className={factorPrediction === value ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" key={value} onClick={() => checkSoftAnswer(setFactorPrediction, value, 'all')}>{label}</button>
                  ))}
                </div>
                {factorPrediction && factorPrediction !== 'all' && <p className="inline-feedback inline-feedback--wrong">Hãy suy nghĩ xem ngoài yếu tố em chọn, hình dạng và chất làm dây có thể ảnh hưởng không.</p>}
                {hasFactorPrediction && <p className="inline-feedback inline-feedback--correct">Đúng. Điện trở của dây dẫn phụ thuộc vào chiều dài, tiết diện và vật liệu làm dây.</p>}
              </div>

              {hasFactorPrediction && (
                <section className="factor-stage factor-stage--length">
                  <div className="factor-stage-heading"><span>Khảo sát 1</span><h3>Chiều dài dây dẫn</h3><small>Giữ nguyên vật liệu và tiết diện.</small></div>
                  <div className="factor-sim-grid">
                    <div className="factor-wire-panel">
                      <div className="factor-wire-scene factor-wire-scene--length" style={{ '--wire-span': `${35 + wireLength * 12}%`, '--drift': `${2.4 + wireLength * 0.18}s` }}>
                        <span className="factor-wire" />
                        <b /><b /><b />
                      </div>
                      <label className="factor-slider">
                        <span>Chiều dài dây <strong>{wireLength} m</strong></span>
                        <input type="range" min="1" max="5" step="1" value={wireLength} onChange={(event) => { setWireLength(Number(event.target.value)); setHasChangedLength(true) }} />
                      </label>
                    </div>
                    <div className="factor-realtime">
                      <div><span>Quãng đường electron</span><strong>{wireLength <= 2 ? 'Ngắn' : wireLength <= 3 ? 'Tăng' : 'Dài'}</strong></div>
                      <div><span>Va chạm</span><strong>{wireLength <= 2 ? 'Ít' : wireLength <= 3 ? 'Tăng' : 'Nhiều'}</strong></div>
                      <div><span>Điện trở R</span><strong>{lengthResistance} Ω</strong></div>
                    </div>
                  </div>
                  {hasChangedLength && (
                    <div className="question-card">
                      <h3>Khi dây dẫn dài hơn, điều gì xảy ra với electron?</h3>
                      <div className="choice-row">
                        {[
                          ['more', 'Va chạm nhiều hơn'],
                          ['less', 'Va chạm ít hơn'],
                          ['same', 'Không thay đổi'],
                        ].map(([value, label]) => <button className={lengthFinding === value ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" key={value} onClick={() => checkSoftAnswer(setLengthFinding, value, 'more')}>{label}</button>)}
                      </div>
                      {lengthFinding && !hasLengthFinding && <p className="inline-feedback inline-feedback--wrong">Hãy kéo dây dài hơn và quan sát chỉ báo va chạm, điện trở R.</p>}
                      {hasLengthFinding && <p className="inline-feedback inline-feedback--correct">Đúng. Dây càng dài, electron càng dễ va chạm nên điện trở tăng.</p>}
                    </div>
                  )}
                  {hasLengthFinding && <div className="factor-conclusion">Chiều dài dây dẫn tăng <b>→</b> điện trở tăng.</div>}
                </section>
              )}

              {hasLengthFinding && (
                <section className="factor-stage factor-stage--area">
                  <div className="factor-stage-heading"><span>Khảo sát 2</span><h3>Tiết diện dây dẫn</h3><small>Giữ nguyên chiều dài và vật liệu.</small></div>
                  <div className="factor-sim-grid">
                    <div className="factor-wire-panel">
                      <div className="factor-wire-scene factor-wire-scene--area" style={{ '--wire-height': `${24 + wireArea * 11}px`, '--drift': `${3 - wireArea * 0.24}s` }}>
                        <span className="factor-wire" />
                        <i className="factor-cross-section" />
                        <b /><b /><b /><b />
                      </div>
                      <label className="factor-slider">
                        <span>Tiết diện dây <strong>{wireArea} mm²</strong></span>
                        <input type="range" min="1" max="5" step="1" value={wireArea} onChange={(event) => { setWireArea(Number(event.target.value)); setHasChangedArea(true) }} />
                      </label>
                    </div>
                    <div className="factor-realtime">
                      <div><span>Không gian di chuyển</span><strong>{wireArea <= 2 ? 'Hẹp' : wireArea <= 3 ? 'Tăng' : 'Rộng'}</strong></div>
                      <div><span>Mức cản trở</span><strong>{wireArea <= 2 ? 'Cao' : wireArea <= 3 ? 'Giảm' : 'Thấp'}</strong></div>
                      <div><span>Điện trở R</span><strong>{areaResistance} Ω</strong></div>
                    </div>
                  </div>
                  {hasChangedArea && (
                    <div className="question-card">
                      <h3>Khi dây dẫn có tiết diện lớn hơn, electron sẽ di chuyển như thế nào?</h3>
                      <div className="choice-row">
                        {[
                          ['easier', 'Dễ hơn'],
                          ['harder', 'Khó hơn'],
                          ['same', 'Không thay đổi'],
                        ].map(([value, label]) => <button className={areaFinding === value ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" key={value} onClick={() => checkSoftAnswer(setAreaFinding, value, 'easier')}>{label}</button>)}
                      </div>
                      {areaFinding && !hasAreaFinding && <p className="inline-feedback inline-feedback--wrong">Hãy tăng tiết diện và đối chiếu mức cản trở với giá trị R.</p>}
                      {hasAreaFinding && <p className="inline-feedback inline-feedback--correct">Đúng. Tiết diện lớn giúp electron di chuyển dễ hơn nên điện trở giảm.</p>}
                    </div>
                  )}
                  {hasAreaFinding && <div className="factor-conclusion">Tiết diện dây dẫn tăng <b>→</b> điện trở giảm.</div>}
                </section>
              )}

              {hasAreaFinding && (
                <section className="factor-stage factor-stage--material">
                  <div className="factor-stage-heading"><span>Khảo sát 3</span><h3>Vật liệu làm dây</h3><small>Giữ nguyên chiều dài và tiết diện.</small></div>
                  <div className="material-switch">
                    {Object.entries(wireMaterialOptions).map(([id, item]) => (
                      <button className={wireMaterial === id ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" key={id} onClick={() => { setWireMaterial(id); setHasChangedMaterial(true) }}>{item.label}</button>
                    ))}
                  </div>
                  <div className="factor-sim-grid">
                    <div className="factor-wire-panel">
                      <div className={`factor-wire-scene factor-wire-scene--material factor-wire-scene--${wireMaterial}`} style={{ '--drift': wireMaterial === 'copper' ? '2.1s' : wireMaterial === 'iron' ? '2.8s' : '3.5s' }}>
                        <span className="factor-wire" />
                        <i /><i /><i />
                        <b /><b /><b />
                      </div>
                    </div>
                    <div className="factor-realtime">
                      <div><span>Vật liệu</span><strong>{selectedMaterial.label}</strong></div>
                      <div><span>Va chạm electron</span><strong>{selectedMaterial.collisions}</strong></div>
                      <div><span>Điện trở R</span><strong>{selectedMaterial.resistance} Ω</strong></div>
                    </div>
                  </div>
                  {hasChangedMaterial && (
                    <div className="question-card">
                      <h3>Tại sao các vật liệu khác nhau lại có điện trở khác nhau?</h3>
                      <div className="choice-row">
                        {[
                          ['different', 'Vì mức cản trở electron khác nhau'],
                          ['generated', 'Vì electron tự sinh thêm'],
                          ['automatic', 'Vì dòng điện tự thay đổi'],
                        ].map(([value, label]) => <button className={materialFinding === value ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" key={value} onClick={() => checkSoftAnswer(setMaterialFinding, value, 'different')}>{label}</button>)}
                      </div>
                      {materialFinding && !hasMaterialFinding && <p className="inline-feedback inline-feedback--wrong">Hãy chuyển giữa các vật liệu và quan sát số va chạm cùng R.</p>}
                      {hasMaterialFinding && <p className="inline-feedback inline-feedback--correct">Đúng. Mỗi vật liệu cản trở electron khác nhau nên điện trở khác nhau.</p>}
                    </div>
                  )}
                  {hasMaterialFinding && <div className="factor-conclusion">Vật liệu khác nhau <b>→</b> điện trở khác nhau.</div>}
                </section>
              )}

              {wireFactorsComplete && (
                <div className="factor-final-summary">
                  <strong>Tổng kết</strong>
                  <div>
                    <span>Dây dài hơn <b>→</b> điện trở tăng</span>
                    <span>Tiết diện lớn hơn <b>→</b> điện trở giảm</span>
                    <span>Vật liệu khác nhau <b>→</b> điện trở khác nhau</span>
                  </div>
                  <p className="factor-resistance-formula">R = <span className="factor-fraction"><b><em>ρ</em><em>l</em></b><b>S</b></span></p>
                  <div className="factor-symbols">
                    <span><b>l</b> chiều dài dây dẫn</span>
                    <span><b>S</b> tiết diện dây dẫn</span>
                    <span><b>ρ</b> điện trở suất của vật liệu</span>
                  </div>
                  <p className="factor-final-conclusion">Điện trở của dây dẫn phụ thuộc vào chiều dài, tiết diện và vật liệu làm dây.</p>
                </div>
              )}
            </article>
          )}

          {wireFactorsComplete && (
            <article className="lesson23-flow temperature-discovery" id="lesson23-temperature">
              <p>Nhiệt độ có làm điện trở thay đổi không?</p>
              <div className="thermal-scenarios" aria-label="Các tình huống vật dẫn nóng lên trong thực tế">
                <div className="thermal-scenario thermal-scenario--charger"><i /><strong>Dây sạc nóng lên khi sạc nhanh</strong></div>
                <div className="thermal-scenario thermal-scenario--bulb"><img alt="" src={bongDenImage} /><strong>Bóng đèn dây tóc càng nóng càng sáng</strong></div>
                <div className="thermal-scenario thermal-scenario--overload"><i /><strong>Dây điện quá tải bị nóng</strong></div>
              </div>
              <div className="question-card thermal-opening-question">
                <h3>Khi vật dẫn nóng lên, electron sẽ di chuyển dễ hơn hay khó hơn?</h3>
                <div className="choice-row">
                  {[
                    ['easier', 'Dễ hơn'],
                    ['harder', 'Khó hơn'],
                    ['same', 'Không thay đổi'],
                  ].map(([value, label]) => (
                    <button className={temperaturePrediction === value ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" key={value} onClick={() => setTemperaturePrediction(value)}>{label}</button>
                  ))}
                </div>
                {temperaturePrediction && <span className="thermal-no-grade">Hãy dùng mô phỏng dưới đây để kiểm tra dự đoán của em.</span>}
              </div>

              {temperaturePrediction && (
                <section className="thermal-metal-lab">
                  <div className="thermal-metal-layout">
                    <div className="thermal-wire-control">
                      <div className="thermal-wire-scene" style={{ '--heat': `${metalTemperature}%`, '--thermal-speed': `${Math.max(1.6, 3.1 - metalTemperature / 78)}s`, '--thermal-shake': `${1 + metalTemperature / 18}px` }}>
                        <span>Dây kim loại</span>
                        {Array.from({ length: 12 }, (_, index) => <i key={`thermal-ion-${index}`} />)}
                        <b className="thermal-electron thermal-electron--one" />
                        <b className="thermal-electron thermal-electron--two" />
                        <b className="thermal-electron thermal-electron--three" />
                      </div>
                      <label className="thermal-slider">
                        <span>Nhiệt độ <strong>{metalTemperature} °C</strong></span>
                        <input type="range" min="20" max="100" value={metalTemperature} onChange={(event) => { const nextTemperature = Number(event.target.value); setMetalTemperature(nextTemperature); setHasHeatedMetal(nextTemperature > 20) }} />
                      </label>
                    </div>
                    <div className="thermal-readout" aria-live="polite">
                      <div><span>Va chạm electron</span><strong>{metalCollisions} lần/giây</strong></div>
                      <div><span>Mức cản trở</span><strong>{metalTemperature < 40 ? 'Thấp' : metalTemperature < 70 ? 'Tăng' : 'Cao'}</strong></div>
                      <div><span>Electron qua tiết diện</span><strong>{electronsPerSecond} / giây</strong></div>
                      <div><span>Điện trở R</span><strong>{metalResistance} Ω</strong></div>
                    </div>
                  </div>

                  {hasHeatedMetal && (
                    <div className="thermal-reasoning">
                      <div className="question-card">
                        <h3>Khi nhiệt độ tăng, các hạt trong vật dẫn dao động như thế nào?</h3>
                        <div className="choice-row">
                          {[
                            ['stronger', 'Dao động mạnh hơn'],
                            ['weaker', 'Dao động yếu hơn'],
                            ['same', 'Không đổi'],
                          ].map(([value, label]) => <button className={ionMotionFinding === value ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" key={value} onClick={() => checkSoftAnswer(setIonMotionFinding, value, 'stronger')}>{label}</button>)}
                        </div>
                        {ionsUnderstood && <p className="inline-feedback inline-feedback--correct">Đúng. Nhiệt độ tăng làm các hạt trong mạng tinh thể dao động mạnh hơn.</p>}
                        {ionMotionFinding && !ionsUnderstood && <p className="inline-feedback inline-feedback--wrong">Hãy kéo nhiệt độ tăng và quan sát các hạt màu cam.</p>}
                      </div>
                      {ionsUnderstood && (
                        <div className="question-card">
                          <h3>Khi các hạt dao động mạnh hơn, electron sẽ thế nào?</h3>
                          <div className="choice-row">
                            {[
                              ['more', 'Va chạm nhiều hơn'],
                              ['less', 'Va chạm ít hơn'],
                              ['straight', 'Di chuyển thẳng hơn'],
                            ].map(([value, label]) => <button className={collisionFinding === value ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" key={value} onClick={() => checkSoftAnswer(setCollisionFinding, value, 'more')}>{label}</button>)}
                          </div>
                          {collisionsUnderstood && <p className="inline-feedback inline-feedback--correct">Đúng. Electron bị cản trở nhiều hơn nên va chạm nhiều hơn.</p>}
                          {collisionFinding && !collisionsUnderstood && <p className="inline-feedback inline-feedback--wrong">Quan sát đường zigzag và số lần va chạm đang tăng.</p>}
                        </div>
                      )}
                      {collisionsUnderstood && (
                        <div className="question-card">
                          <h3>Khi electron bị cản trở nhiều hơn, điện trở của dây dẫn sẽ thay đổi thế nào?</h3>
                          <div className="choice-row">
                            {[
                              ['increase', 'Tăng'],
                              ['decrease', 'Giảm'],
                              ['same', 'Không đổi'],
                            ].map(([value, label]) => <button className={metalResistanceFinding === value ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" key={value} onClick={() => checkSoftAnswer(setMetalResistanceFinding, value, 'increase')}>{label}</button>)}
                          </div>
                          {metalTemperatureUnderstood && <p className="inline-feedback inline-feedback--correct">Đúng. Electron khó di chuyển hơn nên điện trở tăng.</p>}
                          {metalResistanceFinding && !metalTemperatureUnderstood && <p className="inline-feedback inline-feedback--wrong">Đối chiếu giá trị R khi nhiệt độ được tăng lên.</p>}
                        </div>
                      )}
                    </div>
                  )}
                  {metalTemperatureUnderstood && (
                    <div className="thermal-chain-conclusion">Nhiệt độ tăng <b>→</b> các hạt trong mạng tinh thể dao động mạnh hơn <b>→</b> electron bị cản trở nhiều hơn <b>→</b> điện trở kim loại tăng.</div>
                  )}
                </section>
              )}

              {metalTemperatureUnderstood && (
                <section className="thermal-graph-study">
                  <div className="factor-stage-heading"><span>Đồ thị</span><h3>Cùng một dây kim loại ở hai nhiệt độ</h3></div>
                  <div className="thermal-chart-layout">
                    <svg className="thermal-characteristic-chart" viewBox="0 0 500 300" role="img" aria-label="Hai đường đặc trưng vôn-ampe ở hai nhiệt độ khác nhau">
                      <line x1="56" y1="258" x2="468" y2="258" />
                      <line x1="56" y1="258" x2="56" y2="30" />
                      <text x="454" y="285">U</text>
                      <text x="25" y="40">I</text>
                      {showColdCurve && <path className="thermal-line thermal-line--cold" d="M56 258 L446 62" />}
                      {showHotCurve && <path className="thermal-line thermal-line--hot" d="M56 258 L446 142" />}
                    </svg>
                    <div className="thermal-line-controls">
                      <label><input checked={showColdCurve} onChange={(event) => setShowColdCurve(event.target.checked)} type="checkbox" /><i className="is-cold" /> Nhiệt độ thấp - đường dốc hơn</label>
                      <label><input checked={showHotCurve} onChange={(event) => setShowHotCurve(event.target.checked)} type="checkbox" /><i className="is-hot" /> Nhiệt độ cao - đường thoải hơn</label>
                    </div>
                  </div>
                  <div className="question-card">
                    <h3>Ở nhiệt độ cao hơn, vì sao đường đặc trưng vôn-ampe thoải hơn?</h3>
                    <div className="choice-row">
                      {[
                        ['resistance-up', 'Vì điện trở tăng'],
                        ['resistance-down', 'Vì điện trở giảm'],
                        ['voltage-down', 'Vì hiệu điện thế giảm'],
                      ].map(([value, label]) => <button className={curveFinding === value ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" key={value} onClick={() => checkSoftAnswer(setCurveFinding, value, 'resistance-up')}>{label}</button>)}
                    </div>
                    {curvesUnderstood && <p className="inline-feedback inline-feedback--correct">Đúng. Khi nhiệt độ tăng, điện trở tăng nên dòng điện tăng chậm hơn.</p>}
                    {curveFinding && !curvesUnderstood && <p className="inline-feedback inline-feedback--wrong">Đường thoải hơn cho I nhỏ hơn ở cùng U. Hãy liên hệ với R.</p>}
                  </div>
                </section>
              )}

              {curvesUnderstood && (
                <section className="filament-study">
                  <div className="factor-stage-heading"><span>Ứng dụng</span><h3>Bóng đèn dây tóc</h3></div>
                  <div className="filament-layout">
                    <div className="filament-control">
                      <div className="filament-bulb" style={{ '--bulb-glow': `${bulbVoltage / 6}` }}>
                        <img alt="Bóng đèn dây tóc" src={bongDenImage} />
                      </div>
                      <label className="thermal-slider"><span>Hiệu điện thế U <strong>{bulbVoltage} V</strong></span><input type="range" min="1" max="6" value={bulbVoltage} onChange={(event) => { setBulbVoltage(Number(event.target.value)); setHasAdjustedBulb(true) }} /></label>
                      <div className="filament-values"><span>Nhiệt độ: <b>{bulbHeat} °C</b></span><span>Điện trở: <b>{bulbResistance} Ω</b></span><span>Dòng điện: <b>{bulbCurrent.toFixed(2)} A</b></span></div>
                    </div>
                    <svg className="filament-chart" viewBox="0 0 400 260" role="img" aria-label="Đồ thị U-I cong của bóng đèn dây tóc">
                      <line x1="44" y1="222" x2="365" y2="222" />
                      <line x1="44" y1="222" x2="44" y2="30" />
                      <text x="350" y="248">U</text>
                      <text x="17" y="40">I</text>
                      <text className="filament-chart-temperature" x="198" y="34">{bulbHeat} °C</text>
                      <path d={bulbCurvePath} />
                      <circle cx={bulbChartX(bulbVoltage)} cy={bulbChartY(bulbCurrent)} r="7" />
                    </svg>
                  </div>
                  {hasAdjustedBulb && (
                    <div className="question-card">
                      <h3>Tại sao đồ thị của bóng đèn dây tóc không còn là đường thẳng?</h3>
                      <div className="choice-row">
                        {[
                          ['temperature', 'Vì điện trở thay đổi theo nhiệt độ'],
                          ['wrong-law', 'Vì định luật Ôm sai'],
                          ['lost', 'Vì dòng điện bị mất'],
                        ].map(([value, label]) => <button className={bulbCurveFinding === value ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" key={value} onClick={() => checkSoftAnswer(setBulbCurveFinding, value, 'temperature')}>{label}</button>)}
                      </div>
                      {bulbUnderstood && <p className="inline-feedback inline-feedback--correct">Đúng. Dây tóc nóng lên làm điện trở tăng nên đồ thị bị cong.</p>}
                      {bulbCurveFinding && !bulbUnderstood && <p className="inline-feedback inline-feedback--wrong">Quan sát điện trở tăng cùng nhiệt độ của dây tóc.</p>}
                    </div>
                  )}
                </section>
              )}

              {bulbUnderstood && (
                <section className="thermistor-study">
                  <p>Một số điện trở có thể thay đổi theo nhiệt độ</p>
                  <div className="thermistor-real-components">
                    <figure>
                      <img src={ntcThermistorImage} alt="Linh kiện thực tế NTC Thermistor" />
                      <figcaption>
                        <strong>NTC Thermistor</strong>
                        <span>Quan sát hình dạng thật của linh kiện.</span>
                      </figcaption>
                    </figure>
                    <figure>
                      <img src={ptcThermistorImage} alt="Linh kiện thực tế PTC Thermistor" />
                      <figcaption>
                        <strong>PTC Thermistor</strong>
                        <span>Quan sát hình dạng thật của linh kiện.</span>
                      </figcaption>
                    </figure>
                  </div>

                  <section className="simple-thermistor-lab simple-thermistor-lab--ntc">
                    <div className="thermistor-info">
                      <span>Phần NTC</span>
                      <h3>NTC <small>(Negative Temperature Coefficient)</small></h3>
                      <p>Là điện trở nhiệt có giá trị điện trở giảm khi nhiệt độ tăng.</p>
                    </div>
                    <div className="simple-thermistor-layout">
                      <div className="thermistor-photo-sim">
                        <img src={ntcThermistorImage} alt="NTC được nhúng vào cốc nước nóng" />
                        <div className="simple-water" style={{ '--water-heat': ntcTemperature / 100 }}><span>Nước nóng</span></div>
                      </div>
                      <div className="simple-thermal-controls">
                        <label className="thermal-slider">
                          <span>Nhiệt độ <strong>{ntcTemperature} °C</strong></span>
                          <input type="range" min="20" max="80" value={ntcTemperature} onChange={(event) => { const nextTemperature = Number(event.target.value); setNtcTemperature(nextTemperature); setHasHeatedNtc(nextTemperature > 20) }} />
                        </label>
                        <div className="simple-resistance-readout">
                          <span>Điện trở NTC</span>
                          <strong>{ntcResistance} kΩ</strong>
                        </div>
                        <div className="thermal-anchor-values" aria-label="Giá trị tham chiếu của NTC">
                          <span>20°C <b>10 kΩ</b></span>
                          <span>50°C <b>4 kΩ</b></span>
                          <span>80°C <b>1.5 kΩ</b></span>
                        </div>
                      </div>
                    </div>
                    {hasHeatedNtc && (
                      <div className="question-card">
                        <h3>Khi nhiệt độ tăng, điện trở của NTC thay đổi thế nào?</h3>
                        <div className="choice-row">
                          <button className={ntcFinding === 'increase' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setNtcFinding, 'increase', 'decrease')}>Tăng</button>
                          <button className={ntcFinding === 'decrease' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setNtcFinding, 'decrease', 'decrease')}>Giảm</button>
                        </div>
                        {ntcUnderstood && <p className="inline-feedback inline-feedback--correct">Đúng. NTC có điện trở giảm khi nhiệt độ tăng.</p>}
                        {ntcFinding === 'increase' && <p className="inline-feedback inline-feedback--wrong">Hãy đối chiếu giá trị điện trở khi nhiệt độ tăng.</p>}
                      </div>
                    )}
                    {ntcUnderstood && (
                      <div className="thermistor-applications">
                        <strong>Ứng dụng thực tế NTC</strong>
                        <div><span>Cảm biến nhiệt độ</span><span>Nhiệt kế điện tử</span><span>Máy điều hòa</span><span>Pin điện thoại</span><span>Mạch đo nhiệt độ</span></div>
                        <p>NTC thường dùng để cảm nhận hoặc đo nhiệt độ.</p>
                      </div>
                    )}
                  </section>

                  {ntcUnderstood && (
                    <section className="simple-thermistor-lab simple-thermistor-lab--ptc">
                      <div className="thermistor-info">
                        <span>Phần PTC</span>
                        <h3>PTC <small>(Positive Temperature Coefficient)</small></h3>
                        <p>Là điện trở nhiệt có giá trị điện trở tăng khi nhiệt độ tăng.</p>
                      </div>
                      <div className="simple-thermistor-layout">
                        <div className="ptc-heating-photo">
                          <img src={ptcThermistorImage} alt="Điện trở nhiệt PTC khi được làm nóng" />
                          <span>Nhiệt độ tăng</span>
                        </div>
                        <div className="simple-thermal-controls">
                          <label className="thermal-slider">
                            <span>Nhiệt độ <strong>{ptcTemperature} °C</strong></span>
                            <input type="range" min="20" max="80" value={ptcTemperature} onChange={(event) => { const nextTemperature = Number(event.target.value); setPtcTemperature(nextTemperature); setHasHeatedPtc(nextTemperature > 20) }} />
                          </label>
                          <div className="simple-resistance-readout simple-resistance-readout--ptc">
                            <span>Điện trở PTC</span>
                            <strong>{ptcResistanceLabel}</strong>
                          </div>
                          <div className="thermal-anchor-values thermal-anchor-values--ptc" aria-label="Giá trị tham chiếu của PTC">
                            <span>20°C <b>200 Ω</b></span>
                            <span>50°C <b>800 Ω</b></span>
                            <span>80°C <b>3 kΩ</b></span>
                          </div>
                        </div>
                      </div>
                      {hasHeatedPtc && (
                        <div className="question-card">
                          <h3>Khi nhiệt độ tăng, điện trở của PTC thay đổi thế nào?</h3>
                          <div className="choice-row">
                            <button className={ptcFinding === 'increase' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setPtcFinding, 'increase', 'increase')}>Tăng</button>
                            <button className={ptcFinding === 'decrease' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setPtcFinding, 'decrease', 'increase')}>Giảm</button>
                          </div>
                          {ptcUnderstood && <p className="inline-feedback inline-feedback--correct">Đúng. PTC có điện trở tăng khi nhiệt độ tăng.</p>}
                          {ptcFinding === 'decrease' && <p className="inline-feedback inline-feedback--wrong">Hãy đối chiếu giá trị điện trở khi nhiệt độ tăng.</p>}
                        </div>
                      )}
                      {ptcUnderstood && (
                        <div className="thermistor-applications thermistor-applications--ptc">
                          <strong>Ứng dụng thực tế PTC</strong>
                          <div><span>Mạch bảo vệ quá nhiệt</span><span>Cầu chì tự phục hồi</span><span>Bảo vệ pin</span><span>Thiết bị chống quá tải</span></div>
                          <p>PTC thường dùng để bảo vệ mạch điện khi nhiệt độ tăng quá cao.</p>
                        </div>
                      )}
                    </section>
                  )}

                  {temperatureJourneyComplete && (
                    <div className="thermistor-comparison thermistor-comparison--simple">
                      <strong>Kết luận</strong>
                      <table>
                        <thead><tr><th>Linh kiện</th><th>Khi nhiệt độ tăng</th></tr></thead>
                        <tbody>
                          <tr><td>NTC</td><td>Điện trở giảm</td></tr>
                          <tr><td>PTC</td><td>Điện trở tăng</td></tr>
                        </tbody>
                      </table>
                      <p>NTC và PTC là các điện trở nhiệt có khả năng thay đổi điện trở theo nhiệt độ nên được ứng dụng nhiều trong thực tế.</p>
                    </div>
                  )}
                </section>
              )}
            </article>
          )}

          {temperatureJourneyComplete && <Lesson23FinalChallengeGame />}

          {temperatureJourneyComplete && (
            <article className="lesson23-capability-review">
              <header className="capability-review-head">
                <h2>Em đã làm được những gì sau bài học này?</h2>
                <div className="capability-review-progress" aria-label={`Đã tự đánh giá ${assessedCount} trên ${assessmentItemCount} năng lực`}>
                  <span style={{ width: `${(assessedCount / assessmentItemCount) * 100}%` }} />
                  <strong>{assessedCount}/{assessmentItemCount} mục đã đánh giá</strong>
                </div>
              </header>

              <div className="capability-sections">
                {lesson23SelfAssessment.map((section) => (
                  <section className="capability-group" key={section.title}>
                    <h3><span>{section.icon}</span>{section.title}</h3>
                    {section.items.map((item) => (
                      <div className={competencyRatings[item.id] ? 'capability-row is-assessed' : 'capability-row'} key={item.id}>
                        <div className="capability-description">
                          <i aria-hidden="true">{competencyRatings[item.id] ? '✓' : ''}</i>
                          <div>
                            <p>{item.text}</p>
                            {item.details && (
                              <ul>
                                {item.details.map((detail) => <li key={detail}>{detail}</li>)}
                              </ul>
                            )}
                          </div>
                        </div>
                        <div className="capability-levels" role="group" aria-label={`Tự đánh giá: ${item.text}`}>
                          {[
                            ['review', 'Chưa rõ'],
                            ['understand', 'Đã hiểu'],
                            ['explain', 'Có thể giải thích cho người khác'],
                          ].map(([value, label]) => (
                            <button
                              className={competencyRatings[item.id] === value ? `is-selected is-${value}` : ''}
                              type="button"
                              key={value}
                              onClick={() => setCompetencyRatings((current) => ({ ...current, [item.id]: value }))}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </section>
                ))}
              </div>

              <section className="capability-reflection">
                <h3>Điều em thấy thú vị nhất trong bài học này là gì?</h3>
                <textarea
                  value={reflectionText}
                  onChange={(event) => setReflectionText(event.target.value)}
                  placeholder="Viết suy nghĩ của em sau khi quan sát và thực hiện các thí nghiệm..."
                  rows="4"
                />
              </section>

              <section className="understanding-summary">
                <h3>Mức độ hiểu bài của em</h3>
                <div>
                  {[
                    ['review', 'Cần ôn thêm'],
                    ['basic', 'Đã hiểu cơ bản'],
                    ['apply', 'Đã hiểu và có thể vận dụng'],
                  ].map(([value, label]) => (
                    <button className={overallUnderstanding === value ? 'is-selected' : ''} type="button" key={value} onClick={() => setOverallUnderstanding(value)}>
                      <span />
                      {label}
                    </button>
                  ))}
                </div>
              </section>
            </article>
          )}
        </>
      )}
    </section>
  )
}

const lesson24Timeline = [
  'Hiệu điện thế',
  'dòng điện xuất hiện',
  'dòng điện mất đi',
  'cần nguồn điện',
  'nguồn điện duy trì dòng điện',
  'nguồn điện thực hiện công',
  'có hao phí bên trong nguồn',
  'điện trở trong',
  'đoản mạch nguy hiểm',
]

const lesson24Exercises = [
  {
    id: 'emf',
    title: 'Một nguồn thực hiện công 12 J để dịch chuyển 3 C điện tích. Suất điện động là bao nhiêu?',
    choices: ['4 V', '9 V', '36 V'],
    answer: 0,
    hint: ['Dữ kiện: A = 12 J, q = 3 C.', 'Chọn công thức: E = A / q.', 'Thay số: E = 12 / 3 = 4 V.'],
  },
  {
    id: 'voltage',
    title: 'Nguồn có ℰ = 9 V, r = 1 Ω, dòng điện I = 2 A. Hiệu điện thế mạch ngoài là:',
    choices: ['11 V', '7 V', '4,5 V'],
    answer: 1,
    hint: ['Dữ kiện: ℰ = 9 V, I = 2 A, r = 1 Ω.', 'Chọn công thức: U = ℰ - Ir.', 'Thay số: U = 9 - 2.1 = 7 V.'],
  },
  {
    id: 'heat',
    title: 'Vì sao pin đang cấp điện có thể nóng lên?',
    choices: ['Có hao phí năng lượng bên trong nguồn', 'Vì pin đổi màu', 'Vì electron biến mất'],
    answer: 0,
    hint: ['Pin vừa cấp năng lượng cho mạch ngoài, vừa có phần mất bên trong.', 'Phần mất bên trong liên hệ với điện trở trong r.', 'Vì vậy pin có thể nóng lên khi hoạt động.'],
  },
  {
    id: 'short',
    title: 'Đoản mạch nguy hiểm vì:',
    choices: ['Dòng điện tăng rất lớn', 'Nguồn điện nhỏ lại', 'Dây dẫn tự ngắt ngay'],
    answer: 0,
    hint: ['Khi điện trở ngoài rất nhỏ, toàn mạch gần như chỉ còn r.', 'I có thể tăng mạnh.', 'Dòng lớn gây nóng, tóe lửa, cháy hỏng thiết bị.'],
  },
]

// Kept as the first cinematic draft for quick rollback/reference.
// eslint-disable-next-line no-unused-vars
function Lesson24PowerSourceLesson({ onAction }) {
  const [started, setStarted] = useState(false)
  const [strengthChoice, setStrengthChoice] = useState(null)
  const [shortCircuit, setShortCircuit] = useState(false)
  const [exerciseAnswers, setExerciseAnswers] = useState({})
  const [openHints, setOpenHints] = useState({})
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const nodes = document.querySelectorAll('.lesson24-reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('lesson24-reveal--visible')
          }
        })
      },
      { threshold: 0.18 },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      const nextCard = document.querySelector('#lesson24-after-video')
      nextCard?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 650)

    return () => window.clearTimeout(timer)
  }, [started])

  const correctCount = lesson24Exercises.filter((item) => exerciseAnswers[item.id] === item.answer).length

  const chooseExercise = (exerciseId, answerIndex) => {
    setExerciseAnswers((current) => ({ ...current, [exerciseId]: answerIndex }))
    playLessonTone(lesson24Exercises.find((item) => item.id === exerciseId)?.answer === answerIndex ? 'correct' : 'wrong')
  }

  const finishJourney = () => {
    setIsComplete(true)
    playLessonTone('correct')
    onAction('Đã hoàn thành hành trình khám phá Bài 24')
  }

  return (
    <section className={isComplete ? 'lesson24 lesson24--complete' : 'lesson24'}>
      <div className="lesson24-particles" aria-hidden="true">
        {Array.from({ length: 26 }).map((_, index) => <i key={`particle-${index}`} />)}
      </div>

      <div className="lesson24-hero">
        <div className="lesson24-hero-copy">
          <span>Bài 24</span>
          <h1>Bài 24 - Nguồn điện</h1>
          <p>Điều gì giúp dòng điện tồn tại liên tục trong mạch?</p>
          <button className="lesson24-glow-btn" type="button" onClick={() => setStarted(true)}>
            <Icon name="play" />
            Bắt đầu khám phá
          </button>
        </div>
        <div className="lesson24-hero-visual" aria-hidden="true">
          <div className="lesson24-orbit"><i /><i /><i /></div>
          <div className="lesson24-battery-core"><Icon name="battery" /></div>
        </div>
      </div>

      <article className="lesson24-video-card lesson24-reveal">
        <div className="lesson24-video-head">
          <span>Video dẫn dắt</span>
          <strong>Trung tâm dẫn dắt bài học</strong>
        </div>
        <div className="lesson24-video-slot">
          <div className="lesson24-video-screen">
            <div className="lesson24-sphere lesson24-sphere--plus">A+</div>
            <div className="lesson24-wire-preview"><i /><i /><i /></div>
            <div className="lesson24-sphere lesson24-sphere--minus">B-</div>
            <div className="lesson24-video-placeholder">
              <Icon name="play" />
              <b>Ô trống video Bài 24</b>
              <small>Thêm video sau: hai quả cầu tích điện, electron dịch chuyển, đèn mờ dần và câu hỏi cuối.</small>
            </div>
          </div>
        </div>
      </article>

      {started && (
        <>
          <article className="lesson24-ai-card lesson24-reveal" id="lesson24-after-video">
            <div className="lesson24-ai-icon"><Icon name="bot" /></div>
            <p>Có vẻ chúng ta cần một thiết bị<br />có thể liên tục duy trì sự chênh lệch điện tích...</p>
            <div className="lesson24-loop-circuit" aria-hidden="true">
              <span className="lesson24-loop-battery"><Icon name="battery" /></span>
              <i /><i /><i /><i /><i />
              <span className="lesson24-loop-lamp" />
            </div>
          </article>

          <article className="lesson24-soft-conclusion lesson24-reveal">
            <strong>Nguồn điện giúp duy trì hiệu điện thế<br />để dòng điện tồn tại lâu dài.</strong>
          </article>

          <article className="lesson24-discovery-grid lesson24-reveal">
            <div className="lesson24-pump-visual" aria-hidden="true">
              <div className="lesson24-pump"><Icon name="bolt" /></div>
              <div className="lesson24-water-loop"><i /><i /><i /></div>
              <div className="lesson24-reverse-electrons"><b /><b /><b /></div>
            </div>
            <div className="lesson24-thought">
              <span>So sánh trực quan</span>
              <div className="lesson24-compare">
                <button type="button"><Icon name="bolt" />Máy bơm nước</button>
                <button type="button"><Icon name="battery" />Nguồn điện</button>
              </div>
              <p>Nguồn điện phải liên tục thực hiện công để duy trì dòng điện.</p>
            </div>
          </article>

          <article className="lesson24-question-card lesson24-reveal">
            <h2>Nguồn điện mạnh hơn là nguồn:</h2>
            <div className="lesson24-options">
              {[
                'thực hiện nhiều công hơn cho mỗi điện tích',
                'có kích thước lớn hơn',
                'có màu sáng hơn',
              ].map((choice, index) => (
                <button
                  className={strengthChoice === index ? (index === 0 ? 'is-correct' : 'is-wrong') : ''}
                  key={choice}
                  type="button"
                  onClick={() => {
                    setStrengthChoice(index)
                    playLessonTone(index === 0 ? 'correct' : 'wrong')
                  }}
                >
                  {choice}
                </button>
              ))}
            </div>
            {strengthChoice === 0 && (
              <div className="lesson24-formula-pop">
                <strong>ℰ = A / q</strong>
                <div className="lesson24-symbols">
                  <span tabIndex="0">A<em>công của lực lạ</em></span>
                  <span tabIndex="0">q<em>điện tích</em></span>
                  <span tabIndex="0">ℰ<em>suất điện động</em></span>
                </div>
              </div>
            )}
          </article>

          <article className="lesson24-heat-card lesson24-reveal">
            <div className="lesson24-hot-battery" aria-hidden="true"><Icon name="battery" /><i /></div>
            <div>
              <div className="lesson24-ai-mini"><Icon name="bot" />Nếu nguồn điện luôn cung cấp năng lượng, vì sao pin lại nóng lên?</div>
              <p>Một phần năng lượng bị hao phí bên trong nguồn điện.</p>
              <strong>Điện trở trong xuất hiện.</strong>
            </div>
          </article>

          <article className="lesson24-energy-card lesson24-reveal">
            <div className="lesson24-energy-flow">
              <span className="energy-e">ℰ</span>
              <i />
              <span className="energy-loss">Ir</span>
              <i />
              <span className="energy-u">U</span>
            </div>
            <strong>U = ℰ - Ir</strong>
          </article>

          <article className={shortCircuit ? 'lesson24-danger lesson24-danger--active lesson24-reveal' : 'lesson24-danger lesson24-reveal'}>
            <div className="lesson24-danger-scenes" aria-hidden="true">
              <span><Icon name="bolt" /></span>
              <span><Icon name="battery" /></span>
              <span><Icon name="flame" /></span>
            </div>
            <h2>Nếu điện trở gần như bằng 0 thì chuyện gì xảy ra?</h2>
            <button className="lesson24-danger-btn" type="button" onClick={() => setShortCircuit(true)}>Thử tình huống</button>
            {shortCircuit && <p>Đoản mạch làm cường độ dòng điện tăng rất lớn và rất nguy hiểm.</p>}
          </article>

          <article className="lesson24-practice lesson24-reveal">
            <div className="lesson24-practice-head">
              <span>Bạn có muốn thử giải quyết tình huống này không?</span>
              <strong>{correctCount}/{lesson24Exercises.length}</strong>
            </div>
            <div className="lesson24-exercise-list">
              {lesson24Exercises.map((exercise) => {
                const selected = exerciseAnswers[exercise.id]
                const isAnswered = selected !== undefined
                const isCorrect = selected === exercise.answer

                return (
                  <div className={isAnswered ? (isCorrect ? 'lesson24-exercise is-correct' : 'lesson24-exercise is-wrong') : 'lesson24-exercise'} key={exercise.id}>
                    <h3>{exercise.title}</h3>
                    <div className="lesson24-options lesson24-options--small">
                      {exercise.choices.map((choice, index) => (
                        <button key={choice} type="button" onClick={() => chooseExercise(exercise.id, index)}>{choice}</button>
                      ))}
                    </div>
                    <button className="lesson24-hint-btn" type="button" onClick={() => setOpenHints((current) => ({ ...current, [exercise.id]: !current[exercise.id] }))}>
                      Gợi ý từng bước
                    </button>
                    {openHints[exercise.id] && (
                      <ol className="lesson24-hints">
                        {exercise.hint.map((hint) => <li key={hint}>{hint}</li>)}
                      </ol>
                    )}
                  </div>
                )
              })}
            </div>
          </article>

          <article className="lesson24-final lesson24-reveal">
            <div className="lesson24-journey-line">
              {lesson24Timeline.map((item, index) => <span style={{ '--step': index }} key={item}>{item}</span>)}
            </div>
            <button className="lesson24-glow-btn" type="button" onClick={finishJourney}>Hoàn thành hành trình</button>
            {isComplete && <h2>Bạn đã hoàn thành hành trình khám phá nguồn điện.</h2>}
          </article>
        </>
      )}
    </section>
  )
}

const lesson24ReviewMissions = [
  {
    id: 'weak-flashlight',
    title: 'Đèn pin bị yếu',
    badge: 'Chẩn đoán đèn pin',
    kind: 'single',
    prompt: 'Một chiếc đèn pin vẫn sáng nhưng ánh sáng rất yếu. Nguyên nhân phù hợp nhất là gì?',
    options: [
      ['weak-pin', 'Pin yếu'],
      ['broken-wire', 'Dây dẫn đứt'],
      ['burnt-bulb', 'Bóng đèn cháy'],
      ['short', 'Đoản mạch'],
    ],
    answer: 'weak-pin',
    hint: 'Đèn vẫn còn sáng, nghĩa là mạch chưa đứt và bóng đèn chưa cháy.',
    solution: ['Đèn vẫn sáng nên mạch còn hoạt động.', 'Ánh sáng yếu cho thấy dòng điện nhỏ.', 'Pin yếu làm khả năng duy trì sự chênh lệch điện tích giảm, dòng điện yếu đi.'],
    mistake: 'Lỗi hay gặp: thấy đèn mờ liền nghĩ bóng đèn hỏng, nhưng bóng hỏng thường làm đèn không sáng.',
  },
  {
    id: 'source-match',
    title: 'Chọn nguồn điện phù hợp',
    badge: 'Ghép nguồn điện',
    kind: 'matching',
    prompt: 'Kéo nguồn điện phù hợp vào từng thiết bị.',
    hint: 'Thiết bị nhỏ cần nguồn nhỏ; thiết bị cần dòng lớn hơn cần nguồn có khả năng cấp điện tốt hơn.',
    solution: ['Đồng hồ điện tử dùng pin cúc áo.', 'Đèn pin thường dùng pin AA.', 'Quạt mini cần nguồn mạnh hơn, có thể dùng acquy/pin sạc.'],
    mistake: 'Lỗi hay gặp: chỉ nhìn kích thước thiết bị mà quên nhu cầu cấp dòng điện.',
  },
  {
    id: 'emf-calc',
    title: 'Tính suất điện động',
    badge: 'Công thức ε',
    kind: 'number',
    prompt: 'Nguồn điện thực hiện công 12 J để dịch chuyển điện tích 2 C. Tính suất điện động.',
    unit: 'V',
    answer: 6,
    tolerance: 0.05,
    hint: 'Suất điện động bằng công thực hiện trên một đơn vị điện tích.',
    solution: ['Dữ kiện: A = 12 J, q = 2 C.', 'Dùng công thức ε = A/q.', 'ε = 12/2 = 6 V.'],
    mistake: 'Lỗi hay gặp: nhân 12 × 2 thay vì chia A cho q.',
  },
  {
    id: 'terminal-voltage',
    title: 'Hiệu điện thế hai cực nguồn',
    badge: 'Tính U',
    kind: 'number',
    prompt: 'Nguồn điện có ε = 12 V, I = 1 A, r = 2 Ω. Tính hiệu điện thế hai cực nguồn khi có dòng điện.',
    unit: 'V',
    answer: 10,
    tolerance: 0.05,
    hint: 'Khi có dòng điện, một phần hiệu điện thế bị hao phí trên điện trở trong.',
    solution: ['Dùng công thức U = ε − Ir.', 'Thay số: U = 12 − 1 × 2.', 'U = 10 V.'],
    mistake: 'Lỗi hay gặp: lấy U = ε và quên phần hao phí Ir bên trong nguồn.',
  },
  {
    id: 'whole-ohm',
    title: 'Định luật Ôm toàn mạch',
    badge: 'Tính I',
    kind: 'number',
    prompt: 'Nguồn điện có ε = 12 V, R = 5 Ω, r = 1 Ω. Tính cường độ dòng điện trong mạch.',
    unit: 'A',
    answer: 2,
    tolerance: 0.05,
    hint: 'Điện trở toàn mạch là R + r, không chỉ có R.',
    solution: ['Điện trở toàn mạch: R + r = 5 + 1 = 6 Ω.', 'Dùng I = ε/(R + r).', 'I = 12/6 = 2 A.'],
    mistake: 'Lỗi hay gặp: dùng I = ε/R nên ra 2,4 A, vì bỏ qua điện trở trong.',
  },
  {
    id: 'short-detect',
    title: 'Phát hiện đoản mạch',
    badge: 'An toàn điện',
    kind: 'single',
    prompt: 'Chỉ có một sơ đồ nối trực tiếp hai cực nguồn bằng dây dẫn gần như không có điện trở. Hãy chọn sơ đồ đoản mạch.',
    options: [
      ['lamp', 'Nguồn - bóng đèn - dây dẫn'],
      ['switch-open', 'Nguồn có công tắc đang mở'],
      ['direct', 'Hai cực nguồn nối thẳng bằng dây'],
      ['resistor', 'Nguồn - điện trở - bóng đèn'],
    ],
    answer: 'direct',
    hint: 'Đoản mạch xảy ra khi điện trở mạch ngoài gần bằng 0.',
    solution: ['Sơ đồ đoản mạch là sơ đồ nối thẳng hai cực nguồn.', 'Khi R ngoài gần bằng 0, I = ε/(R + r) tăng rất lớn.', 'Dây có thể nóng đỏ, gây nguy hiểm.'],
    mistake: 'Lỗi hay gặp: thấy mạch kín là nghĩ đoản mạch, nhưng mạch có bóng đèn/điện trở không phải nối tắt trực tiếp.',
  },
  {
    id: 'energy-consumption',
    title: 'Tính điện năng tiêu thụ',
    badge: 'Điện năng',
    kind: 'number',
    prompt: 'Một bóng đèn 100 W hoạt động 4 giờ. Tính điện năng tiêu thụ theo kW.h.',
    unit: 'kW.h',
    answer: 0.4,
    tolerance: 0.02,
    hint: 'Đổi W sang kW rồi nhân với thời gian dùng điện.',
    solution: ['100 W = 0,1 kW.', 'Điện năng tiêu thụ: A = P.t = 0,1 × 4 = 0,4 kW.h.'],
    mistake: 'Lỗi hay gặp: giữ nguyên đơn vị W rồi nhân ra W.h nhưng chưa đổi sang kW.h.',
  },
  {
    id: 'electric-bill',
    title: 'Tiền điện gia đình',
    badge: 'Vật lí đời sống',
    kind: 'dual-number',
    prompt: 'Máy lạnh 1200 W hoạt động 8 giờ mỗi ngày trong 30 ngày. Đơn giá 2 500 đồng/kW.h. Tính điện năng tiêu thụ và tiền điện.',
    answers: { energy: 288, cost: 720000 },
    tolerance: { energy: 0.5, cost: 1000 },
    hint: '1200 W = 1,2 kW. Điện năng bằng công suất nhân thời gian.',
    solution: ['1200 W = 1,2 kW.', 'Thời gian dùng: 8 × 30 = 240 giờ.', 'Điện năng: 1,2 × 240 = 288 kW.h.', 'Tiền điện: 288 × 2500 = 720 000 đồng.'],
    mistake: 'Lỗi hay gặp: quên nhân với 30 ngày hoặc quên đổi W sang kW.',
  },
  {
    id: 'led-saving',
    title: 'So sánh chi phí đèn',
    badge: 'Tiết kiệm điện',
    kind: 'saving',
    prompt: 'Mỗi ngày dùng đèn 5 giờ trong 30 ngày. Đơn giá 2 500 đồng/kW.h. So sánh đèn sợi đốt 60 W với đèn LED 10 W.',
    answers: { incandescentCost: 22500, ledCost: 3750, saving: 18750 },
    tolerance: { incandescentCost: 100, ledCost: 50, saving: 100 },
    hint: 'Đổi W.h sang kW.h bằng cách chia cho 1000.',
    solution: ['Đèn sợi đốt: 60 W × 5 h × 30 = 9000 W.h = 9 kW.h, tiền điện 22 500 đồng.', 'Đèn LED: 10 W × 5 h × 30 = 1500 W.h = 1,5 kW.h, tiền điện 3 750 đồng.', 'Số tiền tiết kiệm: 22 500 − 3 750 = 18 750 đồng.'],
    mistake: 'Lỗi hay gặp: quên đổi W.h sang kW.h trước khi tính tiền.',
  },
  {
    id: 'final-repair',
    title: 'Thợ sửa điện',
    badge: 'Xử lí tổng hợp',
    kind: 'diagnosis',
    prompt: 'Một đèn pin sáng yếu, pin đã dùng lâu và điện trở trong tăng. Hãy xác định nguyên nhân, chọn giải pháp và giải thích.',
    hint: 'Hãy liên hệ pin cũ, điện trở trong tăng và cường độ dòng điện giảm.',
    solution: ['Nguyên nhân: pin cũ, điện trở trong tăng, khả năng duy trì dòng điện giảm.', 'Giải pháp: thay pin phù hợp, không nối tắt hai cực.', 'Giải thích: r tăng làm I = ε/(R + r) giảm nên đèn mờ.'],
    mistake: 'Lỗi hay gặp: chỉ lắc đèn hoặc nối tắt hai cực, cách này không giải quyết được nguyên nhân và có thể nguy hiểm.',
  },
]

const lesson24ReviewSources = [
  ['coin', 'pin cúc áo'],
  ['aa', 'pin AA'],
  ['acquy', 'acquy'],
]

const lesson24ReviewDevices = [
  ['clock', 'đồng hồ điện tử'],
  ['flashlight', 'đèn pin'],
  ['fan', 'quạt mini'],
]

const lesson24ReviewMatches = {
  clock: 'coin',
  flashlight: 'aa',
  fan: 'acquy',
}

const lesson24SelfCriteria = [
  ['condition', 'Tôi hiểu điều kiện duy trì dòng điện.'],
  ['source', 'Tôi hiểu vai trò của nguồn điện.'],
  ['emf', 'Tôi hiểu suất điện động.'],
  ['internal', 'Tôi hiểu điện trở trong.'],
  ['wholeOhm', 'Tôi hiểu định luật Ôm toàn mạch.'],
  ['reality', 'Tôi vận dụng được vào thực tế.'],
]

function parseLesson24Number(value) {
  const rawValue = String(value ?? '').trim().toLowerCase().replace(/kwh|kw\.h|đồng|dong|v|a/g, '')
  const numericText = rawValue.replace(/\s/g, '').replace(/[^\d,.-]/g, '')

  if (!numericText) return Number.NaN

  let normalized = numericText
  if (normalized.includes(',') && normalized.includes('.')) {
    normalized = normalized.replace(/\./g, '').replace(',', '.')
  } else if (normalized.includes(',')) {
    normalized = normalized.replace(',', '.')
  } else {
    const parts = normalized.split('.')
    if (parts.length > 1 && parts.at(-1)?.length === 3) {
      normalized = parts.join('')
    }
  }

  return Number.parseFloat(normalized)
}

function getLesson24AnswerText(item) {
  if (!item) return ''
  if (Array.isArray(item.answer)) return item.answer.join(', ')
  if (item.options && item.answer !== undefined) {
    return item.options.find(([value]) => value === item.answer)?.[1] || item.answer
  }
  if (item.answers?.energy !== undefined) return `Điện năng ${item.answers.energy} kW.h, tiền điện ${item.answers.cost} đồng`
  if (item.answers?.incandescentCost !== undefined) {
    return `Sợi đốt ${item.answers.incandescentCost} đồng, LED ${item.answers.ledCost} đồng, tiết kiệm ${item.answers.saving} đồng`
  }
  if (item.answer !== undefined) return `${item.answer}${item.unit ? ` ${item.unit}` : ''}`
  return 'Pin cũ, thay pin phù hợp, r tăng làm dòng điện giảm'
}

function getLesson24Guidance(prompt, selectedText, attempt, isNumberQuestion = false) {
  const text = normalizeText(`${prompt} ${selectedText || ''}`)

  if (isNumberQuestion) {
    return attempt === 1
      ? '💡 Hãy xác định đại lượng đề bài đang yêu cầu tìm.'
      : '💡 Hãy nhớ lại công thức liên hệ giữa các đại lượng trong phần vừa học.'
  }

  if (text.includes('khong con') || text.includes('can bang dien tich')) {
    return attempt === 1
      ? '💡 Dòng điện xuất hiện nhờ sự chênh lệch điện tích. Hãy suy nghĩ xem điều gì xảy ra khi sự chênh lệch đó giảm đi.'
      : '💡 Khi hai đầu hoàn toàn giống nhau về điện tích thì electron còn lý do để dịch chuyển nữa không?'
  }

  if (text.includes('kha nang thuc hien cong')) {
    if (text.includes('dien tro')) return '💡 Điện trở thường làm cản trở dòng điện chứ không thể hiện khả năng cung cấp năng lượng.'
    if (text.includes('cuong do')) return '💡 Cường độ dòng điện cho biết mức độ mạnh yếu của dòng điện nhưng không phải đại lượng đặc trưng cho bản thân nguồn điện.'
  }

  if (text.includes('pin dung lau') || text.includes('electron bien mat') || text.includes('day dan dai hon')) {
    if (text.includes('electron bien mat')) return '💡 Electron không tự nhiên biến mất khỏi mạch điện.'
    if (text.includes('day dan dai hon')) return '💡 Hãy tập trung vào sự thay đổi xảy ra bên trong nguồn điện chứ không phải dây dẫn bên ngoài.'
    return '💡 Hãy nghĩ đến phần cản trở nằm bên trong viên pin sau thời gian sử dụng.'
  }

  if (text.includes('r tang') || text.includes('dien tro ngoai') || text.includes('dien tro trong')) {
    return attempt === 1
      ? '💡 Hãy nhớ rằng điện trở càng lớn thì dòng điện càng khó đi qua.'
      : '💡 Trong toàn mạch, dòng điện phụ thuộc vào tổng điện trở R + r.'
  }

  if (text.includes('doan mach') || text.includes('dong dien giam')) {
    return attempt === 1
      ? '💡 Hãy quan sát xem điện trở của mạch khi đoản mạch thay đổi như thế nào.'
      : '💡 Khi hai cực nguồn bị nối gần như trực tiếp, điện trở mạch ngoài rất nhỏ.'
  }

  if (text.includes('nguon dien')) {
    return attempt === 1
      ? '💡 Hãy tìm thiết bị có thể tạo ra và duy trì sự chênh lệch giữa hai cực.'
      : '💡 Dây dẫn chỉ cho dòng điện đi qua, bóng đèn chỉ tiêu thụ điện. Thiết bị nào cung cấp điện cho mạch?'
  }

  return attempt === 1
    ? '💡 Hãy suy nghĩ lại từ hiện tượng trong chiếc đèn pin.'
    : '💡 Hãy liên hệ với kết luận vừa rút ra ở câu trước.'
}

function getLesson24SolutionText(question, answerText) {
  const explanation = question.conclusion || 'Hãy đối chiếu đáp án với hiện tượng đã quan sát trong bài.'
  const mistake = question.type === 'number'
    ? 'Nhiều học sinh thay số vội mà chưa xác định đúng đại lượng cần tìm hoặc chưa đổi đơn vị.'
    : 'Nhiều học sinh chọn theo cảm giác mà chưa xét vai trò của sự chênh lệch điện tích, nguồn điện hoặc điện trở.'

  return {
    type: 'solution',
    text: `✅ Đáp án đúng: ${answerText}.`,
    explain: `📖 ${explanation}`,
    steps: question.type === 'number'
      ? ['Bước 1: Xác định dữ kiện đề bài cho.', 'Bước 2: Chọn công thức liên hệ đúng.', 'Bước 3: Thế số và tính toán.', 'Bước 4: Kết luận kèm đơn vị.']
      : null,
    mistake: `⚠️ ${mistake}`,
  }
}

function Lesson24ReviewGame() {
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [attempts, setAttempts] = useState({})
  const [feedbacks, setFeedbacks] = useState({})
  const [completedMissions, setCompletedMissions] = useState([])
  const [draggedSource, setDraggedSource] = useState('')
  const [selectedSource, setSelectedSource] = useState('')
  const [ratings, setRatings] = useState({})

  const mission = lesson24ReviewMissions[currentMissionIndex]
  const missionAnswer = answers[mission.id]
  const missionFeedback = feedbacks[mission.id]
  const completedCount = completedMissions.length
  const isMissionCompleted = completedMissions.includes(mission.id)
  const allMissionsDone = completedCount === lesson24ReviewMissions.length
  const rank = completedCount >= 8 ? 'Chuyên gia nguồn điện' : completedCount >= 4 ? 'Kỹ thuật viên' : 'Người học việc'
  const progressPercent = Math.round((completedCount / lesson24ReviewMissions.length) * 100)
  const allRated = lesson24SelfCriteria.every(([key]) => ratings[key] > 0)
  const averageRating = allRated
    ? lesson24SelfCriteria.reduce((sum, [key]) => sum + ratings[key], 0) / lesson24SelfCriteria.length
    : 0
  const weakestCriterion = lesson24SelfCriteria.find(([key]) => ratings[key] && ratings[key] <= 2)
  const reflectionMessage = !allRated
    ? ''
    : weakestCriterion
      ? `Bạn nên xem lại phần: ${weakestCriterion[1].replace('Tôi hiểu ', '').replace('Tôi tính được ', '').replace('Tôi vận dụng được vào ', '')}`
      : averageRating >= 4.5
        ? 'Chúc mừng! Bạn đã hoàn thành hành trình khám phá Nguồn điện.'
        : 'Bạn đã nắm được kiến thức cơ bản.'

  const updateAnswer = (missionId, value) => {
    setAnswers((current) => ({ ...current, [missionId]: value }))
  }

  const assignSource = (deviceId, sourceId) => {
    if (!sourceId) return

    setAnswers((current) => {
      const currentMap = current['source-match'] || {}
      const nextMap = Object.fromEntries(Object.entries(currentMap).filter(([, assignedSource]) => assignedSource !== sourceId))
      return { ...current, 'source-match': { ...nextMap, [deviceId]: sourceId } }
    })
    setSelectedSource('')
    setDraggedSource('')
  }

  const completeMission = (missionId) => {
    setCompletedMissions((current) => current.includes(missionId) ? current : [...current, missionId])
    playLessonTone('correct')
  }

  const hasAnswer = (activeMission, answer) => {
    if (activeMission.kind === 'matching') {
      return lesson24ReviewDevices.every(([deviceId]) => answer?.[deviceId])
    }

    if (activeMission.kind === 'dual-number') {
      return answer?.energy !== undefined && answer?.cost !== undefined && String(answer.energy).trim() && String(answer.cost).trim()
    }

    if (activeMission.kind === 'saving') {
      return answer?.incandescentCost !== undefined
        && answer?.ledCost !== undefined
        && answer?.saving !== undefined
        && String(answer.incandescentCost).trim()
        && String(answer.ledCost).trim()
        && String(answer.saving).trim()
    }

    if (activeMission.kind === 'diagnosis') {
      return answer?.cause && answer?.solution && answer?.explain
    }

    return answer !== undefined && String(answer).trim() !== ''
  }

  const isCorrect = (activeMission, answer) => {
    if (activeMission.kind === 'single') {
      return answer === activeMission.answer
    }

    if (activeMission.kind === 'number') {
      return Math.abs(parseLesson24Number(answer) - activeMission.answer) <= activeMission.tolerance
    }

    if (activeMission.kind === 'dual-number') {
      return Math.abs(parseLesson24Number(answer.energy) - activeMission.answers.energy) <= activeMission.tolerance.energy
        && Math.abs(parseLesson24Number(answer.cost) - activeMission.answers.cost) <= activeMission.tolerance.cost
    }

    if (activeMission.kind === 'saving') {
      return Math.abs(parseLesson24Number(answer.incandescentCost) - activeMission.answers.incandescentCost) <= activeMission.tolerance.incandescentCost
        && Math.abs(parseLesson24Number(answer.ledCost) - activeMission.answers.ledCost) <= activeMission.tolerance.ledCost
        && Math.abs(parseLesson24Number(answer.saving) - activeMission.answers.saving) <= activeMission.tolerance.saving
    }

    if (activeMission.kind === 'matching') {
      return lesson24ReviewDevices.every(([deviceId]) => answer?.[deviceId] === lesson24ReviewMatches[deviceId])
    }

    if (activeMission.kind === 'diagnosis') {
      return answer?.cause === 'old-internal'
        && answer?.solution === 'replace'
        && answer?.explain === 'current-drop'
    }

    return false
  }

  const submitMission = () => {
    if (!hasAnswer(mission, missionAnswer)) {
      setFeedbacks((current) => ({
        ...current,
        [mission.id]: { type: 'coach', text: 'Hãy hoàn thành thao tác của nhiệm vụ rồi kiểm tra.' },
      }))
      return
    }

    if (isCorrect(mission, missionAnswer)) {
      completeMission(mission.id)
      setFeedbacks((current) => ({
        ...current,
        [mission.id]: {
          type: 'success',
          text: '✅ Chính xác!',
          explain: mission.solution?.[0] || `Huy hiệu mở khóa: ${mission.badge}.`,
        },
      }))
      return
    }

    const nextAttempt = (attempts[mission.id] || 0) + 1
    setAttempts((current) => ({ ...current, [mission.id]: nextAttempt }))
    playLessonTone('wrong')

    if (nextAttempt === 1) {
      const selectedText = mission.options?.find(([value]) => value === missionAnswer)?.[1] || ''
      setFeedbacks((current) => ({
        ...current,
        [mission.id]: {
          type: 'coach',
          text: getLesson24Guidance(mission.prompt, selectedText, 1, mission.kind === 'number' || mission.kind === 'dual-number' || mission.kind === 'saving'),
        },
      }))
      return
    }

    if (nextAttempt === 2) {
      setFeedbacks((current) => ({
        ...current,
        [mission.id]: { type: 'hint', text: `💡 ${mission.hint}` },
      }))
      return
    }

    completeMission(mission.id)
    setFeedbacks((current) => ({
      ...current,
      [mission.id]: {
        type: 'solution',
        text: `✅ Đáp án đúng: ${getLesson24AnswerText(mission)}.`,
        steps: mission.solution.map((step, index) => index === 0 ? `📖 ${step}` : step),
        mistake: `⚠️ ${mission.mistake}`,
      },
    }))
  }

  const goNextMission = () => {
    setCurrentMissionIndex((current) => Math.min(current + 1, lesson24ReviewMissions.length - 1))
  }

  const renderChoiceMission = () => (
    <div className={mission.id === 'short-detect' ? 'review-diagram-grid' : 'review-choice-grid'}>
      {mission.options.map(([value, label]) => (
        <button
          className={[
            mission.id === 'short-detect' ? `review-diagram-card review-diagram-card--${value}` : 'review-choice-card',
            missionAnswer === value ? 'is-selected' : '',
          ].filter(Boolean).join(' ')}
          key={value}
          type="button"
          onClick={() => updateAnswer(mission.id, value)}
        >
          <span>{label}</span>
          {mission.id === 'short-detect' && <i aria-hidden="true" />}
        </button>
      ))}
    </div>
  )

  const renderMatchingMission = () => {
    const matchAnswer = missionAnswer || {}

    return (
      <div className="review-match-workbench">
        <div className="review-source-bank">
          {lesson24ReviewSources.map(([sourceId, label]) => (
            <button
              className={selectedSource === sourceId ? 'review-source-chip is-selected' : 'review-source-chip'}
              draggable
              key={sourceId}
              type="button"
              onClick={() => setSelectedSource(sourceId)}
              onDragStart={() => setDraggedSource(sourceId)}
            >
              <b>{sourceId === 'coin' ? '◉' : sourceId === 'aa' ? '🔋' : '▣'}</b>
              <span>{label}</span>
            </button>
          ))}
        </div>
        <div className="review-drop-grid">
          {lesson24ReviewDevices.map(([deviceId, label]) => {
            const assignedSource = matchAnswer[deviceId]
            const assignedLabel = lesson24ReviewSources.find(([sourceId]) => sourceId === assignedSource)?.[1]

            return (
              <button
                className={assignedSource ? 'review-drop-zone review-drop-zone--filled' : 'review-drop-zone'}
                key={deviceId}
                type="button"
                onClick={() => assignSource(deviceId, selectedSource)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault()
                  assignSource(deviceId, draggedSource)
                }}
              >
                <strong>{label}</strong>
                <span>{assignedLabel || 'Thả nguồn điện vào đây'}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const renderNumberMission = () => (
    <div className="review-number-lab">
      <label>
        <span>Nhập kết quả ({mission.unit})</span>
        <input
          inputMode="decimal"
          value={missionAnswer || ''}
          onChange={(event) => updateAnswer(mission.id, event.target.value)}
          placeholder={`Đơn vị ${mission.unit}`}
        />
      </label>
    </div>
  )

  const renderBillMission = () => {
    const billAnswer = missionAnswer || {}

    if (mission.kind === 'dual-number') {
      return (
        <div className="review-number-lab review-number-lab--bill">
          <div className="review-bill-data">
            <span>Máy lạnh 1200 W</span>
            <span>8 giờ/ngày</span>
            <span>30 ngày</span>
            <span>2 500 đồng/kW.h</span>
          </div>
          <label>
            <span>Điện năng tiêu thụ (kW.h)</span>
            <input inputMode="decimal" value={billAnswer.energy || ''} onChange={(event) => updateAnswer(mission.id, { ...billAnswer, energy: event.target.value })} placeholder="Ví dụ: 288" />
          </label>
          <label>
            <span>Tiền điện (đồng)</span>
            <input inputMode="decimal" value={billAnswer.cost || ''} onChange={(event) => updateAnswer(mission.id, { ...billAnswer, cost: event.target.value })} placeholder="Ví dụ: 720000" />
          </label>
        </div>
      )
    }

    return (
      <div className="review-number-lab review-number-lab--bill">
        <div className="review-bill-data">
          <span>Sợi đốt 60 W</span>
          <span>LED 10 W</span>
          <span>5 giờ/ngày</span>
          <span>30 ngày</span>
          <span>2 500 đồng/kW.h</span>
        </div>
        <label>
          <span>Tiền điện đèn sợi đốt (đồng)</span>
          <input inputMode="decimal" value={billAnswer.incandescentCost || ''} onChange={(event) => updateAnswer(mission.id, { ...billAnswer, incandescentCost: event.target.value })} placeholder="Ví dụ: 22500" />
        </label>
        <label>
          <span>Tiền điện đèn LED (đồng)</span>
          <input inputMode="decimal" value={billAnswer.ledCost || ''} onChange={(event) => updateAnswer(mission.id, { ...billAnswer, ledCost: event.target.value })} placeholder="Ví dụ: 3750" />
        </label>
        <label>
          <span>Số tiền tiết kiệm (đồng)</span>
          <input inputMode="decimal" value={billAnswer.saving || ''} onChange={(event) => updateAnswer(mission.id, { ...billAnswer, saving: event.target.value })} placeholder="Ví dụ: 18750" />
        </label>
      </div>
    )
  }

  const renderDiagnosisMission = () => {
    const diagnosisAnswer = missionAnswer || {}
    const groups = [
      ['cause', 'Nguyên nhân', [
        ['old-internal', 'Pin cũ, điện trở trong tăng'],
        ['bulb-color', 'Bóng đèn đổi màu'],
        ['shake', 'Chưa lắc đủ mạnh'],
      ]],
      ['solution', 'Giải pháp', [
        ['replace', 'Thay pin phù hợp'],
        ['direct', 'Nối tắt hai cực'],
        ['wait', 'Đợi một lúc'],
      ]],
      ['explain', 'Giải thích', [
        ['current-drop', 'r tăng làm dòng điện giảm'],
        ['electron-created', 'Bóng đèn tự tạo electron'],
        ['size-only', 'Pin to thì luôn tốt hơn'],
      ]],
    ]

    return (
      <div className="review-diagnosis-grid">
        {groups.map(([key, label, choices]) => (
          <div className="review-diagnosis-group" key={key}>
            <strong>{label}</strong>
            {choices.map(([value, text]) => (
              <button
                className={diagnosisAnswer[key] === value ? 'is-selected' : ''}
                key={value}
                type="button"
                onClick={() => updateAnswer(mission.id, { ...diagnosisAnswer, [key]: value })}
              >
                {text}
              </button>
            ))}
          </div>
        ))}
      </div>
    )
  }

  const renderMissionBody = () => {
    if (mission.kind === 'matching') return renderMatchingMission()
    if (mission.kind === 'number') return renderNumberMission()
    if (mission.kind === 'dual-number' || mission.kind === 'saving') return renderBillMission()
    if (mission.kind === 'diagnosis') return renderDiagnosisMission()
    return renderChoiceMission()
  }

  return (
    <section className="lesson24-review-game">
      <div className="review-game-header">
        <div>
          <span>Hành trình kỹ thuật viên điện</span>
          <h2>Hành trình kỹ thuật viên điện</h2>
          <p>Hoàn thành từng nhiệm vụ để mở khóa cấp bậc mới.</p>
        </div>
        <div className="review-rank-card">
          <Icon name="trophy" />
          <strong>{rank}</strong>
          <span>{completedCount}/{lesson24ReviewMissions.length} nhiệm vụ</span>
        </div>
      </div>

      <div className="review-progress-track" aria-label={`Tiến trình ${progressPercent}%`}>
        <span style={{ width: `${progressPercent}%` }} />
      </div>
      <div className="review-rank-path">
        <span className={completedCount >= 0 ? 'is-active' : ''}>Người học việc</span>
        <span className={completedCount >= 4 ? 'is-active' : ''}>Kỹ thuật viên</span>
        <span className={completedCount >= 8 ? 'is-active' : ''}>Chuyên gia nguồn điện</span>
      </div>

      <div className="review-mission-layout">
        <div className="review-mission-rail">
          {lesson24ReviewMissions.map((item, index) => {
            const isUnlocked = index <= completedCount
            const isCompleted = completedMissions.includes(item.id)

            return (
              <button
                className={[
                  'review-mission-tab',
                  currentMissionIndex === index ? 'is-active' : '',
                  isCompleted ? 'is-completed' : '',
                  !isUnlocked ? 'is-locked' : '',
                ].filter(Boolean).join(' ')}
                disabled={!isUnlocked}
                key={item.id}
                type="button"
                onClick={() => setCurrentMissionIndex(index)}
              >
                <b>{index + 1}</b>
                <span>{item.title}</span>
              </button>
            )
          })}
        </div>

        <article className="review-mission-card">
          <div className="review-mission-title">
            <span>Nhiệm vụ {currentMissionIndex + 1}</span>
            <h3>{mission.title}</h3>
            <p>{mission.prompt}</p>
          </div>

          {mission.id === 'weak-flashlight' && (
            <div className={isMissionCompleted ? 'review-flashlight-sim review-flashlight-sim--weak' : 'review-flashlight-sim'} aria-hidden="true">
              <i /><b /><span />
            </div>
          )}

          {mission.id === 'short-detect' && attempts[mission.id] > 0 && !isMissionCompleted && (
            <div className="review-short-current" aria-hidden="true"><span /><i /><i /><i /></div>
          )}

          <div className="review-mission-body">
            {renderMissionBody()}
          </div>

          {missionFeedback && (
            <div className={`review-feedback review-feedback--${missionFeedback.type}`}>
              <strong>{missionFeedback.text}</strong>
              {missionFeedback.explain && <p>{missionFeedback.explain}</p>}
              {missionFeedback.steps && (
                <ol>
                  {missionFeedback.steps.map((step) => <li key={step}>{step}</li>)}
                </ol>
              )}
              {missionFeedback.mistake && <p>{missionFeedback.mistake}</p>}
            </div>
          )}

          <div className="review-actions">
            <button className="primary-soft-btn" disabled={isMissionCompleted} type="button" onClick={submitMission}>
              Kiểm tra nhiệm vụ
            </button>
            {isMissionCompleted && currentMissionIndex < lesson24ReviewMissions.length - 1 && (
              <button className="primary-soft-btn" type="button" onClick={goNextMission}>Mở nhiệm vụ tiếp theo</button>
            )}
          </div>
        </article>
      </div>

      {allMissionsDone && (
        <section className="review-self-assessment">
          <div>
            <span>Tự đánh giá cuối bài</span>
            <h3>Em cảm thấy mình đã làm chủ phần nào?</h3>
          </div>
          <div className="review-rating-list">
            {lesson24SelfCriteria.map(([key, label]) => (
              <div className="review-rating-row" key={key}>
                <strong>{label}</strong>
                <div className="review-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      className={ratings[key] >= star ? 'is-active' : ''}
                      key={star}
                      type="button"
                      aria-label={`${label} ${star} sao`}
                      onClick={() => setRatings((current) => ({ ...current, [key]: star }))}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {allRated && (
            <div className={averageRating >= 4.5 ? 'review-final-badge review-final-badge--high' : 'review-final-badge'}>
              <Icon name="trophy" />
              <strong>🏆 Chuyên gia nguồn điện</strong>
              <p>{reflectionMessage}</p>
            </div>
          )}
        </section>
      )}
    </section>
  )
}

const lesson24WorksheetCards = [
  {
    id: 'condition',
    title: 'Điều kiện để duy trì dòng điện',
    lead: 'Để hiểu vì sao pin có thể duy trì dòng điện, trước hết hãy tìm hiểu dòng điện xuất hiện như thế nào và khi nào nó sẽ mất đi.',
    questions: [
      {
        id: 'q1',
        prompt: 'Khi một đầu có nhiều electron hơn đầu còn lại thì điều gì sẽ xảy ra?',
        options: ['Electron có xu hướng dịch chuyển', 'Electron đứng yên', 'Không có hiện tượng gì'],
        answer: 'Electron có xu hướng dịch chuyển',
        conclusion: 'Khi tồn tại sự chênh lệch điện tích, electron có xu hướng dịch chuyển.',
      },
      {
        id: 'q2',
        prompt: 'Nếu sự chênh lệch điện tích giảm dần thì dòng điện thay đổi như thế nào?',
        options: ['Tăng lên', 'Không đổi', 'Yếu dần'],
        answer: 'Yếu dần',
        conclusion: 'Khi sự chênh lệch điện tích giảm, dòng điện cũng giảm.',
      },
      {
        id: 'q3',
        prompt: 'Nếu hai đầu hoàn toàn cân bằng điện tích thì điều gì xảy ra?',
        options: ['Dòng điện ngừng', 'Dòng điện mạnh hơn', 'Không thay đổi'],
        answer: 'Dòng điện ngừng',
        conclusion: 'Khi không còn sự chênh lệch điện tích, dòng điện không thể tồn tại.',
      },
      {
        id: 'q4',
        prompt: 'Muốn duy trì dòng điện lâu dài cần điều gì?',
        options: ['Duy trì sự chênh lệch điện tích giữa hai đầu mạch', 'Tăng chiều dài dây dẫn', 'Giảm số electron'],
        answer: 'Duy trì sự chênh lệch điện tích giữa hai đầu mạch',
        conclusion: 'Điều kiện để duy trì dòng điện là duy trì hiệu điện thế giữa hai đầu mạch.',
        major: true,
      },
    ],
  },
  {
    id: 'source',
    title: 'Nguồn điện',
    lead: 'Chiếc đèn pin sáng lâu hơn thí nghiệm cân bằng điện tích. Hãy tìm thiết bị giữ vai trò duy trì.',
    bridge: 'Trong thí nghiệm vừa rồi, sự chênh lệch điện tích sẽ dần mất đi. Nhưng chiếc đèn pin của cậu bé vẫn có thể sáng liên tục trong thời gian dài. Điều gì đã giúp sự chênh lệch này luôn được duy trì?',
    questions: [
      {
        id: 'q1',
        prompt: 'Thiết bị nào có nhiệm vụ tạo và duy trì sự chênh lệch điện tích?',
        options: ['Nguồn điện', 'Dây dẫn', 'Bóng đèn'],
        answer: 'Nguồn điện',
        conclusion: 'Nguồn điện tạo và duy trì hiệu điện thế giữa hai cực.',
      },
      {
        id: 'q2',
        prompt: 'Thiết bị nào dưới đây là nguồn điện?',
        type: 'multi',
        options: ['Pin', 'Acquy', 'Pin mặt trời', 'Bóng đèn'],
        answer: ['Pin', 'Acquy', 'Pin mặt trời'],
        conclusion: 'Pin, acquy, pin mặt trời đều là nguồn điện.',
      },
    ],
    info: {
      title: '📖 Kiến thức mới',
      body: 'Bên trong nguồn điện tồn tại một lực đặc biệt gọi là lực lạ.',
      detail: 'Lực lạ giúp liên tục duy trì sự chênh lệch điện tích giữa hai cực của nguồn điện, nhờ đó dòng điện có thể tồn tại lâu dài trong mạch.',
    },
  },
  {
    id: 'emf',
    title: 'Suất điện động của nguồn điện',
    lead: 'Từ vai trò của lực lạ, hãy suy luận vì sao cần một đại lượng đặc trưng cho khả năng thực hiện công của nguồn điện.',
    transition: [
      '📌 Chúng ta vừa biết rằng:',
      'Electron có xu hướng dịch chuyển từ nơi thừa electron sang nơi thiếu electron.',
      'Muốn duy trì dòng điện lâu dài cần duy trì sự chênh lệch điện tích.',
      'Bên trong nguồn điện tồn tại lực lạ giúp liên tục đưa electron trở về cực âm.',
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Electron đang được đưa từ nơi thiếu electron về nơi nhiều electron hơn. Theo em, quá trình này có cần tiêu tốn năng lượng không?',
        options: ['Có', 'Không'],
        answer: 'Có',
        conclusion: 'Lực lạ bên trong nguồn điện phải thực hiện công để đưa điện tích ngược chiều điện trường.',
        hints: {
          'Không': '💡 Hãy tưởng tượng việc đưa một vật ngược chiều lực kéo. Muốn làm được điều đó thường phải thực hiện công.',
        },
      },
      {
        id: 'q2',
        prompt: 'Nếu công A đo bằng Jun (J), điện tích q đo bằng Culông (C), thì đơn vị của suất điện động sẽ là gì?',
        options: ['J/C', 'A', 'Ω'],
        answer: 'J/C',
        conclusion: 'J/C được gọi là Vôn (V). Đơn vị của suất điện động là Vôn.',
      },
    ],
    note: {
      title: '📌 Nhận xét',
      lines: [
        'Như vậy nguồn điện không chỉ duy trì sự chênh lệch điện tích mà còn phải liên tục thực hiện công lên các điện tích.',
        'Vấn đề đặt ra là: Làm thế nào để đánh giá khả năng thực hiện công của một nguồn điện?',
      ],
    },
    info: {
      title: '📖 Kiến thức mới',
      body: 'Người ta dùng đại lượng gọi là suất điện động để đặc trưng cho khả năng thực hiện công của nguồn điện.',
      detail: 'Suất điện động cho biết nguồn điện thực hiện được bao nhiêu công khi dịch chuyển một đơn vị điện tích bên trong nguồn điện từ cực âm đến cực dương.',
    },
    formula: 'ξ = A/q',
    formulaDetails: ['ξ là suất điện động của nguồn điện', 'A là công của lực lạ thực hiện', 'q là điện tích được dịch chuyển'],
    reminder: ['📌 Suất điện động đặc trưng cho khả năng thực hiện công của nguồn điện.', '📌 Công thức: ξ = A/q', '📌 Đơn vị: Vôn (V).'],
  },
  {
    id: 'internal',
    title: 'Điện trở trong',
    lead: 'Pin mới và pin đã sử dụng lâu làm đèn sáng khác nhau.',
    questions: [
      {
        id: 'q1',
        prompt: 'Tại sao pin dùng lâu thường làm đèn sáng yếu hơn?',
        options: ['Điện trở trong tăng', 'Dây dẫn dài hơn', 'Electron biến mất'],
        answer: 'Điện trở trong tăng',
        conclusion: 'Bên trong nguồn điện tồn tại điện trở trong.',
      },
      {
        id: 'q2',
        prompt: 'Kí hiệu điện trở trong là gì?',
        options: ['r', 'R', 'U'],
        answer: 'r',
        conclusion: 'Điện trở trong được kí hiệu là r nhỏ.',
      },
    ],
  },
  {
    id: 'voltage',
    title: 'Hiệu điện thế giữa hai cực nguồn',
    lead: 'So sánh nguồn khi mạch hở và khi mạch kín.',
    questions: [
      {
        id: 'q1',
        prompt: 'Khi chưa có dòng điện chạy qua nguồn thì U bằng đại lượng nào?',
        options: ['U = ε', 'U = Ir', 'U = 0'],
        answer: 'U = ε',
        conclusion: 'Khi mạch hở: U = ε.',
      },
      {
        id: 'q2',
        prompt: 'Tại sao hiệu điện thế hai cực nguồn giảm khi mạch kín?',
        options: ['Do hao phí trên điện trở trong', 'Do dây dẫn dài hơn', 'Do electron mất đi'],
        answer: 'Do hao phí trên điện trở trong',
        conclusion: 'Khi mạch kín: U = ε − Ir.',
      },
    ],
  },
  {
    id: 'whole-ohm',
    title: 'Định luật Ôm toàn mạch',
    lead: 'Quan sát mối liên hệ giữa ε, R, r và cường độ dòng điện I.',
    questions: [
      {
        id: 'q1',
        prompt: 'Khi ε tăng thì I thay đổi thế nào?',
        options: ['Tăng', 'Giảm', 'Không đổi'],
        answer: 'Tăng',
        conclusion: 'ε tăng làm I tăng nếu R và r không đổi.',
      },
      {
        id: 'q2',
        prompt: 'Khi R tăng thì I thay đổi thế nào?',
        options: ['Tăng', 'Giảm', 'Không đổi'],
        answer: 'Giảm',
        conclusion: 'R tăng làm điện trở toàn mạch tăng, nên I giảm.',
      },
      {
        id: 'q3',
        prompt: 'Khi r tăng thì I thay đổi thế nào?',
        options: ['Tăng', 'Giảm', 'Không đổi'],
        answer: 'Giảm',
        conclusion: 'r tăng cũng làm điện trở toàn mạch tăng, nên I giảm.',
      },
      {
        id: 'q4',
        type: 'number',
        prompt: 'Tính I khi ε = 12 V, R = 5 Ω, r = 1 Ω.',
        answer: 2,
        unit: 'A',
        conclusion: 'I = ε/(R + r) = 12/(5 + 1) = 2 A.',
      },
    ],
    formula: 'I = ε/(R + r)',
  },
  {
    id: 'short',
    title: 'Đoản mạch',
    lead: 'Một sơ đồ nối trực tiếp hai cực nguồn có thể rất nguy hiểm.',
    questions: [
      {
        id: 'q1',
        prompt: 'Sơ đồ nào có hiện tượng đoản mạch?',
        options: ['Nguồn - bóng đèn - dây dẫn', 'Nguồn có công tắc mở', 'Hai cực nguồn nối thẳng bằng dây', 'Nguồn - điện trở - bóng đèn'],
        answer: 'Hai cực nguồn nối thẳng bằng dây',
        conclusion: 'Đoản mạch xảy ra khi hai cực nguồn bị nối trực tiếp bằng dây dẫn có điện trở rất nhỏ.',
      },
      {
        id: 'q2',
        prompt: 'Vì sao đoản mạch nguy hiểm?',
        options: ['Dòng điện tăng rất lớn', 'Dòng điện giảm', 'Không ảnh hưởng'],
        answer: 'Dòng điện tăng rất lớn',
        conclusion: 'Khi đoản mạch, dòng điện có thể tăng rất lớn làm dây nóng lên và gây nguy hiểm.',
      },
    ],
  },
]

const lesson24OpeningSequence = [
  ['weak-pin', '🪫 Pin yếu'],
  ['replace-pin', '🔋 Thay pin mới'],
  ['current-maintained', '⚡ Dòng điện được duy trì'],
  ['bright-light', '💡 Đèn sáng mạnh trở lại'],
]

const lesson24OpeningCards = [
  ['bright-light', '💡 Đèn sáng mạnh trở lại'],
  ['weak-pin', '🪫 Pin yếu'],
  ['current-maintained', '⚡ Dòng điện được duy trì'],
  ['replace-pin', '🔋 Thay pin mới'],
]

const lesson24OpeningFocusCards = [
  ['color', '🎨 Màu sắc của pin'],
  ['current', '⚡ Dòng điện trong mạch'],
  ['wire', '📏 Chiều dài dây dẫn'],
]

function Lesson24WorksheetV2() {
  const [cardIndex, setCardIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [attempts, setAttempts] = useState({})
  const [completedCards, setCompletedCards] = useState([])
  const [resolvedQuestions, setResolvedQuestions] = useState([])
  const [feedbacks, setFeedbacks] = useState({})
  const [openingComplete, setOpeningComplete] = useState(false)
  const [openingSequence, setOpeningSequence] = useState([])
  const [draggedOpeningCard, setDraggedOpeningCard] = useState('')
  const [openingStepDone, setOpeningStepDone] = useState({ sequence: false, focus: false, conclusion: false })
  const [openingFeedback, setOpeningFeedback] = useState({})
  const [openingAttempts, setOpeningAttempts] = useState({})
  const [focusChoice, setFocusChoice] = useState('')
  const [conclusionChoice, setConclusionChoice] = useState('')

  const isQuestionCorrect = (question, value) => {
    if (question.type === 'number') {
      return Math.abs(parseLesson24Number(value) - question.answer) <= 0.05
    }

    if (question.type === 'multi') {
      const selected = Array.isArray(value) ? [...value].sort() : []
      const expected = [...question.answer].sort()
      return selected.length === expected.length && selected.every((item, index) => item === expected[index])
    }

    return value === question.answer
  }

  const isQuestionResolved = (cardId, question) => {
    const key = `${cardId}:${question.id}`
    return resolvedQuestions.includes(key) || isQuestionCorrect(question, answers[key])
  }

  const updateWorksheetAnswer = (cardId, question, value) => {
    const key = `${cardId}:${question.id}`
    setAnswers((current) => {
      const currentValue = current[key] || []
      const nextValue = question.type === 'multi'
        ? currentValue.includes(value)
          ? currentValue.filter((item) => item !== value)
          : [...currentValue, value]
        : value

      return { ...current, [key]: nextValue }
    })
    setFeedbacks((current) => ({ ...current, [key]: '' }))
  }

  const submitQuestion = (card, question) => {
    const key = `${card.id}:${question.id}`
    const value = answers[key]
    const selectedText = Array.isArray(value) ? value.join(', ') : value

    if (!isQuestionCorrect(question, value)) {
      const nextAttempt = (attempts[key] || 0) + 1
      setAttempts((current) => ({ ...current, [key]: nextAttempt }))
      playLessonTone('wrong')

      if (nextAttempt >= 3) {
        const answerText = Array.isArray(question.answer) ? question.answer.join(', ') : `${question.answer}${question.unit ? ` ${question.unit}` : ''}`
        setResolvedQuestions((current) => current.includes(key) ? current : [...current, key])
        setFeedbacks((current) => ({ ...current, [key]: getLesson24SolutionText(question, answerText) }))

        const cardDoneAfterSolution = card.questions.every((item) => item.id === question.id || isQuestionResolved(card.id, item))
        if (cardDoneAfterSolution) {
          setCompletedCards((current) => current.includes(card.id) ? current : [...current, card.id])
        }
        return
      }

      setFeedbacks((current) => ({
        ...current,
        [key]: {
          type: 'hint',
          text: question.hints?.[selectedText] || getLesson24Guidance(question.prompt, selectedText, nextAttempt, question.type === 'number'),
        },
      }))
      return
    }

    setResolvedQuestions((current) => current.includes(key) ? current : [...current, key])
    setFeedbacks((current) => ({
      ...current,
      [key]: {
        type: 'success',
        text: '✅ Chính xác!',
        explain: question.conclusion ? `📖 ${question.conclusion.replace(/^📖\\s*/, '')}` : '',
      },
    }))
    playLessonTone('correct')

    const cardDone = card.questions.every((item) => {
      if (item.id === question.id) return true
      return isQuestionResolved(card.id, item)
    })

    if (cardDone) {
      setCompletedCards((current) => current.includes(card.id) ? current : [...current, card.id])
    }
  }

  const currentCardDone = completedCards.includes(lesson24WorksheetCards[cardIndex]?.id)
  const openingDone = openingStepDone.sequence && openingStepDone.focus && openingStepDone.conclusion

  const setOpeningSmartFeedback = (key, isCorrect, firstHint, secondHint, successText) => {
    if (isCorrect) {
      setOpeningStepDone((current) => ({ ...current, [key]: true }))
      setOpeningFeedback((current) => ({ ...current, [key]: { type: 'success', text: successText } }))
      playLessonTone('correct')
      return
    }

    const nextAttempt = (openingAttempts[key] || 0) + 1
    setOpeningAttempts((current) => ({ ...current, [key]: nextAttempt }))
    setOpeningFeedback((current) => ({ ...current, [key]: { type: 'hint', text: nextAttempt >= 2 ? secondHint : firstHint } }))
    playLessonTone('wrong')
  }

  const placeOpeningCard = (cardId, index) => {
    if (!cardId || openingStepDone.sequence) return
    setOpeningSequence((current) => {
      const next = current.filter((item) => item !== cardId)
      next[index] = cardId
      return next
    })
  }

  const checkOpeningSequence = () => {
    const expected = lesson24OpeningSequence.map(([id]) => id)
    const isCorrect = expected.every((id, index) => openingSequence[index] === id)
    setOpeningSmartFeedback(
      'sequence',
      isCorrect,
      '💡 Hãy suy nghĩ xem điều gì xảy ra trước và điều gì là kết quả cuối cùng mà em quan sát được.',
      '💡 Đèn sáng mạnh trở lại là kết quả cuối cùng chứ không phải nguyên nhân.',
      '✅ Chính xác! Pin mới giúp dòng điện tiếp tục được duy trì trong mạch nên đèn sáng mạnh trở lại.',
    )
  }

  const checkOpeningFocus = () => {
    const hint = focusChoice === 'color'
      ? '💡 Hai viên pin khác màu vẫn có thể làm đèn sáng giống nhau. Hãy tập trung vào điều đang làm bóng đèn phát sáng.'
      : '💡 Trong video dây dẫn không thay đổi nhưng độ sáng của đèn lại thay đổi. Điều gì liên quan trực tiếp đến độ sáng?'
    setOpeningSmartFeedback(
      'focus',
      focusChoice === 'current',
      hint,
      hint,
      '✅ Đúng rồi! Muốn đèn sáng thì phải có dòng điện trong mạch.',
    )
  }

  const checkOpeningConclusion = () => {
    setOpeningSmartFeedback(
      'conclusion',
      conclusionChoice === 'current',
      '💡 Hãy nhớ lại điều vừa được xác định là quan trọng nhất đối với hoạt động của đèn.',
      '💡 Muốn đèn sáng liên tục thì điều quan trọng đó cũng phải được duy trì liên tục.',
      '✅ Chính xác! Muốn đèn sáng liên tục thì dòng điện trong mạch phải được duy trì liên tục.',
    )
  }

  const renderWorksheetQuestion = (card, question) => {
    const key = `${card.id}:${question.id}`
    const value = answers[key]
    const correct = isQuestionResolved(card.id, question)
    const selectedValues = Array.isArray(value) ? value : []
    const feedback = feedbacks[key]

    return (
      <article className={correct ? 'worksheet24-question is-correct' : 'worksheet24-question'} key={question.id}>
        <strong>{question.prompt}</strong>
        {question.type === 'number' ? (
          <label className="worksheet24-number">
            <input inputMode="decimal" value={value || ''} onChange={(event) => updateWorksheetAnswer(card.id, question, event.target.value)} placeholder={`Nhập kết quả ${question.unit || ''}`} />
            <span>{question.unit}</span>
          </label>
        ) : (
          <div className="worksheet24-options">
            {question.options.map((option) => (
              <button
                className={(question.type === 'multi' ? selectedValues.includes(option) : value === option) ? 'is-selected' : ''}
                key={option}
                type="button"
                onClick={() => updateWorksheetAnswer(card.id, question, option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
        <button className="primary-soft-btn" type="button" onClick={() => submitQuestion(card, question)}>Kiểm tra</button>
        {feedback && (
          <div className={feedback.type === 'success' || feedback.type === 'solution' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}>
            <strong>{feedback.text}</strong>
            {feedback.explain && <p>{feedback.explain}</p>}
            {feedback.steps && (
              <ol>
                {feedback.steps.map((step) => <li key={step}>{step}</li>)}
              </ol>
            )}
            {feedback.mistake && <p>{feedback.mistake}</p>}
          </div>
        )}
      </article>
    )
  }

  return (
    <div className="worksheet24">
      <section className="worksheet24-intro">
        <span>Phiếu học tập khởi động</span>
        <h2>Vì sao thay pin mới thì đèn sáng trở lại?</h2>
        <p>Dẫn dắt từ hiện tượng thực tế sang nhu cầu tìm hiểu điều kiện duy trì dòng điện.</p>
      </section>

      <section className={openingDone ? 'worksheet24-card is-done' : 'worksheet24-card'}>
        <div className="worksheet24-card-head">
          <span>Nhiệm vụ</span>
          <h3>Hãy hoàn thành chuỗi suy luận</h3>
          <p>Kéo các thẻ vào đúng thứ tự xảy ra trong thực tế.</p>
        </div>
        <div className="opening-card-bank">
          {lesson24OpeningCards.map(([id, label]) => (
            <button
              className={draggedOpeningCard === id ? 'opening-drag-card is-selected' : 'opening-drag-card'}
              draggable={!openingStepDone.sequence}
              key={id}
              type="button"
              onClick={() => setDraggedOpeningCard(id)}
              onDragStart={() => setDraggedOpeningCard(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="opening-sequence-drop">
          {[0, 1, 2, 3].map((index) => {
            const cardId = openingSequence[index]
            const label = lesson24OpeningSequence.find(([id]) => id === cardId)?.[1]

            return (
              <button
                className={cardId ? 'opening-drop-slot is-filled' : 'opening-drop-slot'}
                key={index}
                type="button"
                onClick={() => placeOpeningCard(draggedOpeningCard, index)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault()
                  placeOpeningCard(draggedOpeningCard, index)
                }}
              >
                <span>{label || `Vị trí ${index + 1}`}</span>
              </button>
            )
          })}
        </div>
        <button className="primary-soft-btn" disabled={openingStepDone.sequence} type="button" onClick={checkOpeningSequence}>Kiểm tra chuỗi</button>
        {openingFeedback.sequence && <div className={openingFeedback.sequence.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{openingFeedback.sequence.text}</strong></div>}

        {openingStepDone.sequence && (
          <div className="opening-mini-task">
            <div className="worksheet24-card-head">
              <span>Thử thách tiếp theo</span>
              <h3>Điều gì thực sự quan trọng?</h3>
              <p>Kéo thẻ quan trọng nhất vào ô trung tâm.</p>
            </div>
            <div className="opening-card-bank">
              {lesson24OpeningFocusCards.map(([id, label]) => (
                <button
                  className={focusChoice === id ? 'opening-drag-card is-selected' : 'opening-drag-card'}
                  draggable={!openingStepDone.focus}
                  key={id}
                  type="button"
                  onClick={() => setFocusChoice(id)}
                  onDragStart={() => setDraggedOpeningCard(id)}
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              className={focusChoice ? 'opening-center-drop is-filled' : 'opening-center-drop'}
              type="button"
              onClick={() => draggedOpeningCard && setFocusChoice(draggedOpeningCard)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault()
                setFocusChoice(draggedOpeningCard)
              }}
            >
              {lesson24OpeningFocusCards.find(([id]) => id === focusChoice)?.[1] || 'Ô trung tâm'}
            </button>
            <button className="primary-soft-btn" disabled={!focusChoice || openingStepDone.focus} type="button" onClick={checkOpeningFocus}>Kiểm tra</button>
            {openingFeedback.focus && <div className={openingFeedback.focus.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{openingFeedback.focus.text}</strong></div>}
          </div>
        )}

        {openingStepDone.focus && (
          <div className="opening-mini-task">
            <div className="worksheet24-card-head">
              <span>Thử thách cuối</span>
              <h3>Hoàn thành câu kết luận</h3>
            </div>
            <div className="opening-fill-sentence">
              <span>Muốn đèn sáng liên tục thì cần duy trì</span>
              <button
                className={conclusionChoice ? 'opening-blank is-filled' : 'opening-blank'}
                type="button"
                onClick={() => draggedOpeningCard && setConclusionChoice(draggedOpeningCard)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault()
                  setConclusionChoice(draggedOpeningCard)
                }}
              >
                {lesson24OpeningFocusCards.find(([id]) => id === conclusionChoice)?.[1] || '________'}
              </button>
            </div>
            <div className="opening-card-bank">
              {lesson24OpeningFocusCards.map(([id, label]) => (
                <button
                  className={conclusionChoice === id ? 'opening-drag-card is-selected' : 'opening-drag-card'}
                  draggable={!openingStepDone.conclusion}
                  key={id}
                  type="button"
                  onClick={() => setConclusionChoice(id)}
                  onDragStart={() => setDraggedOpeningCard(id)}
                >
                  {label}
                </button>
              ))}
            </div>
            <button className="primary-soft-btn" disabled={!conclusionChoice || openingStepDone.conclusion} type="button" onClick={checkOpeningConclusion}>Kiểm tra</button>
            {openingFeedback.conclusion && <div className={openingFeedback.conclusion.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{openingFeedback.conclusion.text}</strong></div>}
          </div>
        )}

        {openingDone && (
          <div className="worksheet24-bridge worksheet24-bridge--reflect">
            <p><strong>📌 Chúng ta đã biết:</strong></p>
            <p>Pin mới giúp dòng điện tiếp tục được duy trì.</p>
            <p>Muốn đèn sáng liên tục cần duy trì dòng điện.</p>
            <p>Nhưng dòng điện có thể tồn tại lâu dài nhờ điều gì?</p>
            <p>Điều kiện nào giúp dòng điện không bị mất đi?</p>
            {!openingComplete && (
              <button className="primary-soft-btn" type="button" onClick={() => setOpeningComplete(true)}>👉 Chuyển sang phiếu tiếp theo: Điều kiện duy trì dòng điện</button>
            )}
          </div>
        )}
      </section>

      {openingComplete && (
        <section className="worksheet24-card worksheet24-unified-card">
          <div className="worksheet24-card-head">
            <span>Phiếu học tập</span>
            <h3>Nguồn điện</h3>
            <p>Hoàn thành từng phần để mở tiếp nội dung trong cùng một phiếu.</p>
          </div>
          {lesson24WorksheetCards.slice(0, cardIndex + 1).map((card, index) => {
            const done = completedCards.includes(card.id)

            return (
              <section className={done ? 'worksheet24-section is-done' : 'worksheet24-section'} key={card.id}>
                <div className="worksheet24-card-head worksheet24-section-head">
                  <span>Phần {index + 1}</span>
                  <h3>{card.title}</h3>
                  <p>{card.lead}</p>
                </div>
                {card.transition && (
                  <div className="worksheet24-info-box worksheet24-info-box--soft">
                    {card.transition.map((line, lineIndex) => (
                      lineIndex === 0 ? <strong key={line}>{line}</strong> : <p key={line}>{line}</p>
                    ))}
                  </div>
                )}
                {card.bridge && <div className="worksheet24-bridge">{card.bridge}</div>}
                <div className="worksheet24-questions">
                  {card.questions.map((question, questionIndex) => (
                    <Fragment key={question.id}>
                      {card.note && questionIndex === 1 && (
                        <div className="worksheet24-info-box worksheet24-info-box--note">
                          <strong>{card.note.title}</strong>
                          {card.note.lines.map((line) => <p key={line}>{line}</p>)}
                        </div>
                      )}
                      {card.info && questionIndex === 1 && (
                        <div className="worksheet24-info-box">
                          <strong>{card.info.title}</strong>
                          <p>{card.info.body}</p>
                          <p>{card.info.detail}</p>
                        </div>
                      )}
                      {card.formula && questionIndex === 1 && (
                        <div className="worksheet24-formula-panel">
                          <strong>{card.formula}</strong>
                          {card.formulaDetails?.map((line) => <p key={line}>{line}</p>)}
                        </div>
                      )}
                      {renderWorksheetQuestion(card, question)}
                    </Fragment>
                  ))}
                </div>
                {card.info && !card.note && (
                  <div className="worksheet24-info-box">
                    <strong>{card.info.title}</strong>
                    <p>{card.info.body}</p>
                    <p>{card.info.detail}</p>
                  </div>
                )}
                {card.formula && done && !card.note && <div className="worksheet24-formula">{card.formula}</div>}
                {card.reminder && done && (
                  <div className="worksheet24-info-box worksheet24-info-box--remember">
                    <strong>Ghi nhớ</strong>
                    {card.reminder.map((line) => <p key={line}>{line}</p>)}
                  </div>
                )}
                {done && index < lesson24WorksheetCards.length - 1 && index === cardIndex && (
                  <button className="primary-soft-btn" type="button" onClick={() => setCardIndex((current) => current + 1)}>Mở phần tiếp theo</button>
                )}
              </section>
            )
          })}
        </section>
      )}

      {currentCardDone && cardIndex === lesson24WorksheetCards.length - 1 && (
        <Lesson24ReviewGame />
      )}
    </div>
  )
}

function Lesson24StructuredLessonV2() {
  const knowledgeRef = useRef(null)
  const storyVideoRef = useRef(null)
  const [videoFinished, setVideoFinished] = useState(false)
  const [videoCheckpointOpen, setVideoCheckpointOpen] = useState(false)
  const [videoCheckpointResolved, setVideoCheckpointResolved] = useState(false)
  const [videoCheckpointFeedback, setVideoCheckpointFeedback] = useState('')
  const [knowledgeUnlocked, setKnowledgeUnlocked] = useState(false)
  const [journeyStarted, setJourneyStarted] = useState(false)

  const finishVideo = () => {
    setVideoFinished(true)
    setKnowledgeUnlocked(true)
  }

  const handleStoryVideoTime = (event) => {
    if (videoCheckpointResolved || videoCheckpointOpen || event.currentTarget.currentTime < 10.25) return
    event.currentTarget.pause()
    setVideoCheckpointOpen(true)
  }

  const chooseVideoAction = (action) => {
    if (action !== 'battery') {
      setVideoCheckpointFeedback('Có vẻ đèn pin vẫn chưa sáng mạnh hơn…')
      return
    }

    setVideoCheckpointResolved(true)
    setVideoCheckpointFeedback('')
    window.setTimeout(() => {
      setVideoCheckpointOpen(false)
      storyVideoRef.current?.play().catch(() => {})
    }, 360)
  }

  return (
    <section className="restored-lesson restored24">
      <div className="restored-hero lesson24-top">
        <div>
          <span>Bài 24</span>
          <h1>Nguồn điện</h1>
          <p>Điều gì giúp dòng điện tồn tại liên tục trong mạch?</p>
        </div>
        <div className="lesson24-hero-visual lesson24-hero-visual--compact" aria-hidden="true">
          <div className="lesson24-orbit"><i /><i /><i /></div>
          <div className="lesson24-battery-core"><Icon name="battery" /></div>
        </div>
      </div>

      <article className="restored-card">
        <div className="journey-heading">
          <span>Video dẫn dắt</span>
          <h2>Chiếc đèn pin trong bóng tối</h2>
          <p>Hãy theo dõi tình huống. Khi video kết thúc, phiếu học tập sẽ mở ra.</p>
        </div>
        <div className="lesson24-story-video">
          <video
            className={videoCheckpointOpen ? 'lesson24-story-video__media lesson24-story-video__media--paused' : 'lesson24-story-video__media'}
            controls
            playsInline
            preload="metadata"
            ref={storyVideoRef}
            onEnded={finishVideo}
            onTimeUpdate={handleStoryVideoTime}
            title="Tình huống mở đầu Bài 24 - Nguồn điện"
          >
            <source src="/videos/copy_635AC7C0-C022-4240-8365-3FC398A643E4.mp4" type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ phát video HTML5.
          </video>
          {videoCheckpointOpen && (
            <div className={videoCheckpointResolved ? 'lesson24-video-choice lesson24-video-choice--leaving' : 'lesson24-video-choice'}>
              <div className="lesson24-video-choice__card">
                <span>Giúp cậu bé</span>
                <h2>Bạn muốn cậu bé thử cách nào để đèn pin sáng mạnh hơn?</h2>
                <div className="lesson24-video-choice__grid">
                  <button type="button" onClick={() => chooseVideoAction('toggle')}><b>📴</b>Tắt rồi bật lại đèn pin</button>
                  <button type="button" onClick={() => chooseVideoAction('shake')}><b>👋</b>Lắc nhẹ đèn pin</button>
                  <button type="button" onClick={() => chooseVideoAction('battery')}><b>🔋</b>Thay pin mới</button>
                </div>
                {videoCheckpointFeedback && <p>{videoCheckpointFeedback}</p>}
              </div>
            </div>
          )}
          {videoFinished && (
            <div className="lesson24-video-ended">
              <h2>Điều gì đã giúp đèn pin sáng mạnh trở lại?</h2>
              <button className="lesson24-start-inspection" type="button" onClick={() => knowledgeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Bắt đầu khám phá</button>
            </div>
          )}
        </div>
      </article>

      {knowledgeUnlocked && (
        <article className="source-quest source-quest--lite source-journey24" ref={knowledgeRef}>
          <div className="source-quest-intro source-quest-intro--lite source-start-panel">
            <span>Bài 24</span>
            <h2>Vì sao thay pin mới thì đèn sáng trở lại?</h2>
            <p>Cậu bé đã thay pin mới và đèn pin sáng mạnh trở lại.</p>
            {!journeyStarted && <button className="primary-soft-btn" type="button" onClick={() => setJourneyStarted(true)}>Bắt đầu phiếu học tập</button>}
          </div>
          {journeyStarted && <Lesson24WorksheetV2 />}
        </article>
      )}
    </section>
  )
}

const lesson25RequiredFeedback = [
  'device',
  'time',
  'factors',
  'formulaW',
  'meaningsW',
  'powerPredict',
  'powerMeaning',
  'formulaP',
  'formulaUI',
  'acReason',
  'ledReason',
  'offReason',
  'energyCalc',
  'powerCalc',
  'billCalc',
  'compareDevice',
  'advanced',
]

const lesson25ReviewQuestions = [
  {
    id: 'home-device',
    type: 'single',
    badge: 'Đời sống',
    prompt: 'Trong một buổi tối nóng, điều gì thường làm tiền điện tăng nhanh hơn?',
    options: [
      { id: 'ac-long', text: 'Bật điều hòa nhiều giờ' },
      { id: 'led-short', text: 'Bật một bóng LED 20 W trong vài phút' },
      { id: 'charger', text: 'Rút sạc điện thoại khi pin đầy' },
    ],
    answer: 'ac-long',
    explain: 'Điều hòa có công suất lớn và thường dùng lâu nên điện năng tiêu thụ lớn.',
  },
  {
    id: 'w-formula',
    type: 'formula',
    badge: 'Công thức',
    prompt: 'Điền công thức điện năng tiêu thụ theo U, I, t.',
    answer: 'w=uit',
    explain: 'Điện năng tiêu thụ phụ thuộc vào hiệu điện thế, cường độ dòng điện và thời gian: W = UIt.',
  },
  {
    id: 'fast-consume',
    type: 'single',
    badge: 'Công suất',
    prompt: 'LED 20 W, quạt 55 W, điều hòa 2600 W cùng hoạt động 1 giờ. Thiết bị nào tiêu thụ điện nhanh nhất?',
    options: [
      { id: 'led', text: 'LED 20 W' },
      { id: 'fan', text: 'Quạt 55 W' },
      { id: 'ac', text: 'Điều hòa 2600 W' },
    ],
    answer: 'ac',
    explain: 'Công suất càng lớn thì tốc độ tiêu thụ điện năng càng cao.',
  },
  {
    id: 'save-electricity',
    type: 'multi',
    badge: 'Tiết kiệm điện',
    prompt: 'Việc nào giúp giảm điện năng tiêu thụ trong gia đình?',
    options: [
      { id: 'turn-off', text: 'Tắt thiết bị khi không sử dụng' },
      { id: 'led', text: 'Dùng đèn LED thay đèn sợi đốt' },
      { id: 'open-ac', text: 'Mở cửa khi bật điều hòa' },
      { id: 'short-time', text: 'Giảm thời gian dùng thiết bị công suất lớn' },
    ],
    answer: ['turn-off', 'led', 'short-time'],
    explain: 'Tiết kiệm điện thường bắt đầu từ giảm thời gian dùng, chọn thiết bị hiệu suất cao và tránh hao phí.',
  },
  {
    id: 'calc-energy',
    type: 'numeric',
    badge: 'Tính nhanh',
    prompt: 'Một đèn 40 W dùng trong 5 giờ. Điện năng tiêu thụ là bao nhiêu Wh?',
    suffix: 'Wh',
    answer: 200,
    explain: 'Dùng A = P.t = 40 × 5 = 200 Wh.',
  },
  {
    id: 'real-situation',
    type: 'scenario',
    badge: 'Giải thích',
    prompt: 'Vì sao nên tắt quạt, đèn, tivi khi ra khỏi phòng?',
    placeholder: 'Trả lời ngắn theo ý hiểu của em...',
    required: ['thoi gian', 'dien nang', 'giam'],
    explain: 'Khi tắt thiết bị, thời gian sử dụng giảm về 0 nên điện năng tiêu thụ và tiền điện giảm.',
  },
]

// Kept as the older lesson 25 opener for quick rollback/reference.
// eslint-disable-next-line no-unused-vars
function Lesson25InteractiveOpener({ onComplete }) {
  const [step, setStep] = useState(0)
  const [causes, setCauses] = useState({})
  const [deviceChoice, setDeviceChoice] = useState('')
  const [timeChoice, setTimeChoice] = useState('')

  const progress = Math.round(((step + 1) / 6) * 100)
  const selectedCauseCount = Object.values(causes).filter(Boolean).length

  const chooseDevice = (value) => {
    setDeviceChoice(value)
    playLessonTone(value === 'ac' ? 'correct' : 'wrong')
  }

  const chooseTime = (value) => {
    setTimeChoice(value)
    playLessonTone(value === 'ten' ? 'correct' : 'wrong')
  }

  const goNext = () => setStep((current) => Math.min(5, current + 1))

  return (
    <article className="restored-card lesson25-opener-card">
      <div className="lesson25-opener-head">
        <div>
          <span>Hoạt động mở đầu</span>
          <h2>Khám phá điện năng trong cuộc sống</h2>
        </div>
        <strong>{progress}%</strong>
      </div>
      <div className="lesson25-opener-progress" aria-label="Tiến trình hoạt động mở đầu">
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="lesson25-opener-stage" key={step}>
        {step === 0 && (
          <section className="lesson25-bill-scenario">
            <div className="lesson25-bill-visual" aria-label="Minh họa hóa đơn tiền điện">
              <span>Hóa đơn điện</span>
              <strong>650.000 đ</strong>
              <div><b>Tháng trước</b><em>380.000 đ</em></div>
              <i />
            </div>
            <div className="lesson25-robot-dialog">
              <img src={robotImage} alt="Robot trợ giảng" />
              <div className="lesson25-chat-stack">
                <p style={{ '--delay': '0ms' }}>Gia đình Minh nhận được hóa đơn điện tháng này là 650.000 đồng.</p>
                <p style={{ '--delay': '120ms' }}>Tháng trước chỉ có 380.000 đồng.</p>
                <p style={{ '--delay': '240ms' }}>Trong khi số lượng thiết bị điện gần như không thay đổi.</p>
                <p style={{ '--delay': '360ms' }}>Có chuyện gì đã xảy ra?</p>
              </div>
            </div>
            <button className="lesson25-opener-primary" type="button" onClick={goNext}>Bắt đầu khám phá</button>
          </section>
        )}

        {step === 1 && (
          <section className="lesson25-opener-question">
            <div className="lesson25-robot-dialog lesson25-robot-dialog--compact">
              <img src={robotImage} alt="" />
              <p>Theo em nguyên nhân nào làm tiền điện tăng?</p>
            </div>
            <div className="lesson25-cause-grid">
              {[
                ['longer', 'Dùng thiết bị lâu hơn'],
                ['power', 'Dùng thiết bị có công suất lớn hơn'],
                ['old', 'Thiết bị cũ bị hỏng'],
                ['unknown', 'Không biết'],
              ].map(([key, label]) => (
                <label className={causes[key] ? 'lesson25-check-tile is-selected' : 'lesson25-check-tile'} key={key}>
                  <input checked={Boolean(causes[key])} onChange={() => setCauses((current) => ({ ...current, [key]: !current[key] }))} type="checkbox" />
                  <span>{label}</span>
                </label>
              ))}
            </div>
            {selectedCauseCount > 0 && (
              <div className="lesson25-robot-feedback">
                <img src={robotImage} alt="" />
                <div>
                  <p>Những dự đoán của em rất hợp lí.</p>
                  <p>Để biết chính xác, hãy tiếp tục khám phá.</p>
                </div>
              </div>
            )}
            <button className="lesson25-opener-primary" disabled={selectedCauseCount === 0} type="button" onClick={goNext}>Tiếp tục</button>
          </section>
        )}

        {step === 2 && (
          <section className="lesson25-opener-question">
            <h3>Nếu cùng hoạt động trong 1 giờ, thiết bị nào theo em tiêu thụ nhiều điện nhất?</h3>
            <div className="lesson25-appliance-choice">
              {[
                ['fan', 'Quạt điện', '55 W'],
                ['kettle', 'Ấm siêu tốc', '1800 W'],
                ['ac', 'Điều hòa', '2600 W'],
              ].map(([key, name, power]) => (
                <button className={deviceChoice === key ? `is-selected ${key === 'ac' ? 'is-correct' : 'is-wrong'}` : ''} key={key} type="button" onClick={() => chooseDevice(key)}>
                  <span>{name}</span>
                  <strong>{power}</strong>
                </button>
              ))}
            </div>
            {deviceChoice && (
              <div className={deviceChoice === 'ac' ? 'lesson25-opener-feedback is-correct' : 'lesson25-opener-feedback is-wrong'}>
                <strong>{deviceChoice === 'ac' ? 'Đúng hướng' : 'Thử nghĩ thêm'}</strong>
                <p>Không phải mọi thiết bị đều tiêu thụ điện giống nhau.</p>
                <p>Vậy đại lượng nào cho biết mức độ tiêu thụ điện của thiết bị?</p>
              </div>
            )}
            <button className="lesson25-opener-primary" disabled={!deviceChoice} type="button" onClick={goNext}>Tiếp tục</button>
          </section>
        )}

        {step === 3 && (
          <section className="lesson25-opener-question">
            <h3>Một ấm điện hoạt động trong hai lần khác nhau. Trường hợp nào tiêu thụ nhiều điện năng hơn?</h3>
            <div className="lesson25-time-choice">
              {[
                ['two', 'Lần 1', '2 phút'],
                ['ten', 'Lần 2', '10 phút'],
              ].map(([key, label, time]) => (
                <button className={timeChoice === key ? `is-selected ${key === 'ten' ? 'is-correct' : 'is-wrong'}` : ''} key={key} type="button" onClick={() => chooseTime(key)}>
                  <span>{label}</span>
                  <strong>{time}</strong>
                  <i />
                </button>
              ))}
            </div>
            {timeChoice && (
              <div className={timeChoice === 'ten' ? 'lesson25-opener-feedback is-correct' : 'lesson25-opener-feedback is-wrong'}>
                <strong>{timeChoice === 'ten' ? 'Chính xác' : 'Chưa hợp lí'}</strong>
                <p>Có vẻ điện năng tiêu thụ không chỉ phụ thuộc vào thiết bị mà còn phụ thuộc vào thời gian sử dụng.</p>
              </div>
            )}
            <button className="lesson25-opener-primary" disabled={!timeChoice} type="button" onClick={goNext}>Xem sơ đồ suy nghĩ</button>
          </section>
        )}

        {step === 4 && (
          <section className="lesson25-mind-flow">
            {[
              'Thiết bị điện',
              'Tiêu thụ điện năng',
              'Phụ thuộc vào điều gì?',
            ].map((item, index) => (
              <div className="lesson25-flow-node" style={{ '--delay': `${index * 180}ms` }} key={item}>
                <span>{item}</span>
                {index < 2 && <b>↓</b>}
              </div>
            ))}
            <button className="lesson25-opener-primary" type="button" onClick={goNext}>Rút ra câu hỏi học tập</button>
          </section>
        )}

        {step === 5 && (
          <section className="lesson25-opener-summary">
            <div className="lesson25-robot-dialog">
              <img src={robotImage} alt="Robot trợ giảng" />
              <div className="lesson25-chat-stack">
                <p style={{ '--delay': '0ms' }}>Qua các tình huống trên, em có nhận thấy rằng:</p>
                <p style={{ '--delay': '120ms' }}>- Thiết bị khác nhau tiêu thụ điện khác nhau.</p>
                <p style={{ '--delay': '240ms' }}>- Thời gian sử dụng càng lâu thì điện năng tiêu thụ càng lớn.</p>
                <p style={{ '--delay': '360ms' }}>Nhưng điện năng được tính như thế nào?</p>
                <p style={{ '--delay': '480ms' }}>Công suất điện có ý nghĩa gì?</p>
                <p style={{ '--delay': '600ms' }}>Chúng ta sẽ cùng khám phá trong phiếu học tập.</p>
              </div>
            </div>
            <button className="lesson25-opener-primary lesson25-opener-primary--large" type="button" onClick={onComplete}>Chuyển sang phiếu học tập</button>
          </section>
        )}
      </div>
    </article>
  )
}

// Kept as the older lesson 25 journey for quick rollback/reference.
// eslint-disable-next-line no-unused-vars
function Lesson25ElectricJourneyOld() {
  const [revealedBlocks, setRevealedBlocks] = useState({
    worksheet: false,
    quiz: false,
    selfCheck: false,
  })
  const [answers, setAnswers] = useState({
    factors: {},
    meanings: {},
    selfChecks: {},
  })
  const [feedbacks, setFeedbacks] = useState({})
  const [attempts, setAttempts] = useState({})
  const [advancedHintStep, setAdvancedHintStep] = useState(0)
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizResults, setQuizResults] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const revealBlock = (key) => {
    setRevealedBlocks((current) => (current[key] ? current : { ...current, [key]: true }))
  }

  const updateAnswer = (key, value) => {
    setAnswers((current) => ({ ...current, [key]: value }))
  }

  const normalized = (value) => normalizeText(String(value || '')).replace(/[∆Δδ]/g, 'delta').replace(/[÷:]/g, '/').replace(/\s/g, '')

  const setLesson25Feedback = (key, isCorrect, correctMessage, hint, answerExplain) => {
    if (isCorrect) {
      setAttempts((current) => ({ ...current, [key]: 0 }))
      setFeedbacks((current) => ({ ...current, [key]: { type: 'correct', message: correctMessage } }))
      playLessonTone('correct')
      return
    }

    const nextAttempt = (attempts[key] || 0) + 1
    const message = nextAttempt >= 3 ? answerExplain : hint
    setAttempts((current) => ({ ...current, [key]: nextAttempt }))
    setFeedbacks((current) => ({ ...current, [key]: { type: 'wrong', message } }))
    playLessonTone('wrong')
  }

  const checkTextIncludes = (key, keywords, correctMessage, hint, answerExplain) => {
    const value = normalizeText(answers[key] || '')
    const isCorrect = keywords.every((keyword) => value.includes(keyword))
    setLesson25Feedback(key, isCorrect, correctMessage, hint, answerExplain)
  }

  const checkFormulaW = () => {
    const value = normalized(answers.formulaW).replace(/^w=/, '')
    setLesson25Feedback(
      'formulaW',
      value === 'uit' || value === 'u*i*t' || value === 'u.it',
      'Đúng. Ta vừa hình thành được công thức W = UIt.',
      'Gợi ý: điện năng phụ thuộc đồng thời vào U, I và t nên ba đại lượng được nhân với nhau.',
      'Đáp án: W = UIt. W là điện năng tiêu thụ, U là hiệu điện thế, I là cường độ dòng điện, t là thời gian dùng điện.',
    )
  }

  const checkMeaningsW = () => {
    const meanings = answers.meanings || {}
    const ok =
      normalizeText(meanings.u || '').includes('hieu dien the') &&
      normalizeText(meanings.i || '').includes('cuong do') &&
      normalizeText(meanings.t || '').includes('thoi gian')
    setLesson25Feedback(
      'meaningsW',
      ok,
      'Đúng. Em đã gắn được công thức với ý nghĩa từng đại lượng.',
      'Gợi ý: U gắn với hiệu điện thế, I gắn với dòng điện, t gắn với thời gian sử dụng.',
      'Đáp án: U là hiệu điện thế, I là cường độ dòng điện, t là thời gian sử dụng điện.',
    )
  }

  const checkFormulaP = () => {
    const value = normalized(answers.formulaP).replace(/^p=/, '')
    setLesson25Feedback(
      'formulaP',
      value === 'a/t' || value === 'w/t',
      'Đúng. Công suất điện cho biết điện năng tiêu thụ trong một đơn vị thời gian.',
      'Gợi ý: tốc độ tiêu thụ nghĩa là lấy điện năng/công chia cho thời gian.',
      'Đáp án: P = A/t hoặc P = W/t. Công suất càng lớn thì điện năng tiêu thụ càng nhanh.',
    )
  }

  const checkFormulaUI = () => {
    const value = normalized(answers.formulaUI).replace(/^p=/, '')
    setLesson25Feedback(
      'formulaUI',
      value === 'ui' || value === 'u*i' || value === 'u.i',
      'Đúng. Khi thay A = UIt vào P = A/t, ta được P = UI.',
      'Gợi ý: lấy W = UIt chia cho t, thời gian t được rút gọn.',
      'Đáp án: P = UI. Công suất phụ thuộc vào hiệu điện thế U và cường độ dòng điện I.',
    )
  }

  const checkNumber = (key, expected, tolerance, correctMessage, hint, answerExplain) => {
    const numeric = Number(String(answers[key] || '').replace(',', '.').match(/-?\d+(\.\d+)?/)?.[0])
    setLesson25Feedback(key, Number.isFinite(numeric) && Math.abs(numeric - expected) <= tolerance, correctMessage, hint, answerExplain)
  }

  const worksheetDone = lesson25RequiredFeedback.every((key) => feedbacks[key]?.type === 'correct')
  const quizQuestion = lesson25ReviewQuestions[quizIndex]
  const quizScore = Object.values(quizResults).filter(Boolean).length
  const quizComplete = quizIndex >= lesson25ReviewQuestions.length
  const checkedCount = Object.values(answers.selfChecks || {}).filter(Boolean).length

  const submitQuiz = () => {
    if (!quizQuestion) return
    const value = quizAnswers[quizQuestion.id]
    let correct = false

    if (quizQuestion.type === 'single') correct = value === quizQuestion.answer
    if (quizQuestion.type === 'multi') {
      const selected = Object.keys(value || {}).filter((key) => value[key]).sort()
      correct = selected.length === quizQuestion.answer.length && quizQuestion.answer.every((item, index) => selected[index] === item)
    }
    if (quizQuestion.type === 'formula') correct = normalized(value).replace(/^w=/, '') === 'uit'
    if (quizQuestion.type === 'numeric') {
      const numeric = Number(String(value || '').replace(',', '.').match(/-?\d+(\.\d+)?/)?.[0])
      correct = Number.isFinite(numeric) && Math.abs(numeric - quizQuestion.answer) <= 0.5
    }
    if (quizQuestion.type === 'scenario') {
      const text = normalizeText(value || '')
      correct = quizQuestion.required.filter((keyword) => text.includes(keyword)).length >= 2
    }

    setQuizResults((current) => ({ ...current, [quizQuestion.id]: correct }))
    setQuizSubmitted(true)
    playLessonTone(correct ? 'correct' : 'wrong')
  }

  const nextQuiz = () => {
    setQuizSubmitted(false)
    setQuizIndex((current) => {
      const next = current + 1
      if (next === lesson25ReviewQuestions.length) {
        revealBlock('selfCheck')
      }
      return next
    })
  }

  return (
    <section className="restored-lesson restored25">
      <div className="restored-hero lesson25-top">
        <span>Bài 25</span>
        <h1>Năng lượng và công suất điện</h1>
        <p>Học theo đúng lộ trình: xem video, hoàn thành phiếu khám phá, làm quiz ôn tập rồi tự đánh giá.</p>
      </div>

      <article className="restored-card lesson25-real-video-card">
        <div className="journey-heading">
          <span>Video bài học</span>
          <h2>Khởi động: năng lượng điện trong đời sống</h2>
        </div>
        <Lesson25InteractiveVideo src="/videos/bai25.mp4" />
        <button className="primary-soft-btn lesson25-start-btn" type="button" onClick={() => revealBlock('worksheet')}>
          Chuyển sang phiếu học tập
        </button>
      </article>

      {revealedBlocks.worksheet && (
        <article className="restored-card journey-card lesson25-worksheet lesson22-reveal-block">
          <div className="journey-heading">
            <span>Phiếu học tập</span>
            <h2>Khám phá điện năng và công suất điện</h2>
            <p>Các câu hỏi nối tiếp nhau để em tự đi từ hóa đơn tiền điện tới công thức và cách dùng điện tiết kiệm.</p>
          </div>

          <div className="journey-line">
            <section className="journey-item">
              <b>1</b>
              <div>
                <h3>Sau khi xem video, thiết bị nào trong gia đình thường làm tiền điện tăng nhiều nhất?</h3>
                <div className="choice-row">
                  {[
                    ['ac', 'Điều hòa'],
                    ['led', 'Bóng LED'],
                    ['charger', 'Cục sạc điện thoại'],
                  ].map(([value, label]) => (
                    <button className={answers.device === value ? 'soft-choice soft-choice--active' : 'soft-choice'} key={value} type="button" onClick={() => {
                      updateAnswer('device', value)
                      setLesson25Feedback('device', value === 'ac', 'Đúng. Điều hòa thường có công suất lớn và được dùng nhiều giờ.', 'Gợi ý: hãy nghĩ tới thiết bị vừa công suất lớn vừa chạy lâu.', 'Đáp án: điều hòa. Công suất lớn và thời gian sử dụng dài làm điện năng tiêu thụ tăng mạnh.')
                    }}>{label}</button>
                  ))}
                </div>
                {feedbacks.device && <p className={`inline-feedback inline-feedback--${feedbacks.device.type}`}>{feedbacks.device.message}</p>}
              </div>
            </section>

            <section className="journey-item">
              <b>2</b>
              <div>
                <h3>Nếu cùng một thiết bị nhưng sử dụng lâu hơn thì điện năng tiêu thụ thay đổi như thế nào?</h3>
                <div className="choice-row">
                  {[
                    ['increase', 'Tăng lên'],
                    ['same', 'Không đổi'],
                    ['decrease', 'Giảm đi'],
                  ].map(([value, label]) => (
                    <button className={answers.time === value ? 'soft-choice soft-choice--active' : 'soft-choice'} key={value} type="button" onClick={() => {
                      updateAnswer('time', value)
                      setLesson25Feedback('time', value === 'increase', 'Đúng. Điện năng tiêu thụ phụ thuộc vào thời gian sử dụng.', 'Gợi ý: công tơ vẫn chạy trong suốt thời gian thiết bị còn bật.', 'Đáp án: tăng lên. Cùng thiết bị, thời gian dùng càng dài thì điện năng tiêu thụ càng lớn.')
                    }}>{label}</button>
                  ))}
                </div>
                {feedbacks.time && <p className={`inline-feedback inline-feedback--${feedbacks.time.type}`}>{feedbacks.time.message}</p>}
              </div>
            </section>

            <section className="journey-item">
              <b>3</b>
              <div>
                <h3>Ngoài thời gian sử dụng, điện năng tiêu thụ còn phụ thuộc vào những yếu tố nào?</h3>
                <div className="choice-row choice-row--wrap">
                  {[
                    ['u', 'Hiệu điện thế U'],
                    ['i', 'Cường độ dòng điện I'],
                    ['t', 'Thời gian t'],
                    ['color', 'Màu vỏ thiết bị'],
                  ].map(([key, label]) => (
                    <label className="soft-checkbox" key={key}>
                      <input checked={Boolean(answers.factors?.[key])} onChange={() => updateAnswer('factors', { ...(answers.factors || {}), [key]: !answers.factors?.[key] })} type="checkbox" />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
                <button className="primary-soft-btn" type="button" onClick={() => {
                  const factors = answers.factors || {}
                  setLesson25Feedback('factors', factors.u && factors.i && factors.t && !factors.color, 'Đúng. Điện năng tiêu thụ phụ thuộc vào U, I và t.', 'Gợi ý: chọn các đại lượng xuất hiện trong công thức vật lí, không chọn đặc điểm hình thức của thiết bị.', 'Đáp án: hiệu điện thế U, cường độ dòng điện I và thời gian t.')
                }}>Kiểm tra</button>
                {feedbacks.factors && <p className={`inline-feedback inline-feedback--${feedbacks.factors.type}`}>{feedbacks.factors.message}</p>}
              </div>
            </section>

            <section className="journey-item">
              <b>4</b>
              <div>
                <h3>Hoàn thành công thức điện năng tiêu thụ</h3>
                <div className="formula-input">
                  <span>W =</span>
                  <input value={answers.formulaW || ''} onChange={(event) => updateAnswer('formulaW', event.target.value)} placeholder="Điền theo U, I, t" />
                  <button type="button" onClick={checkFormulaW}>Kiểm tra</button>
                </div>
                {feedbacks.formulaW && <p className={`inline-feedback inline-feedback--${feedbacks.formulaW.type}`}>{feedbacks.formulaW.message}</p>}
              </div>
            </section>

            <section className="journey-item">
              <b>5</b>
              <div>
                <h3>Ghép ý nghĩa các đại lượng trong W = UIt</h3>
                <div className="symbol-table">
                  {[
                    ['U', 'u'],
                    ['I', 'i'],
                    ['t', 't'],
                  ].map(([symbol, key]) => (
                    <label key={key}>
                      <strong>{symbol}</strong>
                      <input value={answers.meanings?.[key] || ''} onChange={(event) => updateAnswer('meanings', { ...(answers.meanings || {}), [key]: event.target.value })} placeholder="Điền ý nghĩa..." />
                    </label>
                  ))}
                </div>
                <button className="primary-soft-btn" type="button" onClick={checkMeaningsW}>Kiểm tra bảng</button>
                {feedbacks.meaningsW && <p className={`inline-feedback inline-feedback--${feedbacks.meaningsW.type}`}>{feedbacks.meaningsW.message}</p>}
              </div>
            </section>

            <section className="journey-item">
              <b>6</b>
              <div>
                <h3>Hai thiết bị dùng cùng thời gian nhưng vẫn tiêu thụ điện khác nhau. Vì sao?</h3>
                <div className="lesson25-device-race">
                  {[
                    ['LED', '20 W'],
                    ['Quạt', '55 W'],
                    ['Điều hòa', '2600 W'],
                  ].map(([name, power]) => <span key={name}><b>{name}</b><strong>{power}</strong></span>)}
                </div>
                <div className="choice-row">
                  {[
                    ['ac', 'Điều hòa tiêu thụ nhanh nhất'],
                    ['led', 'LED tiêu thụ nhanh nhất'],
                    ['same', 'Ba thiết bị như nhau'],
                  ].map(([value, label]) => (
                    <button className={answers.powerPredict === value ? 'soft-choice soft-choice--active' : 'soft-choice'} key={value} type="button" onClick={() => {
                      updateAnswer('powerPredict', value)
                      setLesson25Feedback('powerPredict', value === 'ac', 'Đúng. Điều hòa 2600 W có công suất lớn nhất nên tiêu thụ điện nhanh nhất.', 'Gợi ý: so sánh các số W ghi trên thiết bị.', 'Đáp án: điều hòa. Công suất 2600 W lớn hơn 55 W và 20 W rất nhiều.')
                    }}>{label}</button>
                  ))}
                </div>
                {feedbacks.powerPredict && <p className={`inline-feedback inline-feedback--${feedbacks.powerPredict.type}`}>{feedbacks.powerPredict.message}</p>}
              </div>
            </section>

            <section className="journey-item">
              <b>7</b>
              <div>
                <h3>Công suất điện cho biết điều gì?</h3>
                <div className="choice-row">
                  {[
                    ['speed', 'Tốc độ tiêu thụ điện năng'],
                    ['color', 'Màu ánh sáng của thiết bị'],
                    ['mass', 'Khối lượng thiết bị'],
                  ].map(([value, label]) => (
                    <button className={answers.powerMeaning === value ? 'soft-choice soft-choice--active' : 'soft-choice'} key={value} type="button" onClick={() => {
                      updateAnswer('powerMeaning', value)
                      setLesson25Feedback('powerMeaning', value === 'speed', 'Đúng. Công suất điện cho biết tốc độ tiêu thụ điện năng.', 'Gợi ý: thiết bị công suất lớn làm công tơ tăng nhanh hơn.', 'Đáp án: công suất điện cho biết điện năng tiêu thụ trong một đơn vị thời gian.')
                    }}>{label}</button>
                  ))}
                </div>
                {feedbacks.powerMeaning && <p className={`inline-feedback inline-feedback--${feedbacks.powerMeaning.type}`}>{feedbacks.powerMeaning.message}</p>}
              </div>
            </section>

            <section className="journey-item">
              <b>8</b>
              <div>
                <h3>Hoàn thành công thức công suất điện</h3>
                <div className="formula-input">
                  <span>P =</span>
                  <input value={answers.formulaP || ''} onChange={(event) => updateAnswer('formulaP', event.target.value)} placeholder="A/t hoặc W/t" />
                  <button type="button" onClick={checkFormulaP}>Kiểm tra</button>
                </div>
                <div className="formula-input">
                  <span>P =</span>
                  <input value={answers.formulaUI || ''} onChange={(event) => updateAnswer('formulaUI', event.target.value)} placeholder="Theo U và I" />
                  <button type="button" onClick={checkFormulaUI}>Kiểm tra</button>
                </div>
                {feedbacks.formulaP && <p className={`inline-feedback inline-feedback--${feedbacks.formulaP.type}`}>{feedbacks.formulaP.message}</p>}
                {feedbacks.formulaUI && <p className={`inline-feedback inline-feedback--${feedbacks.formulaUI.type}`}>{feedbacks.formulaUI.message}</p>}
              </div>
            </section>

            <section className="journey-item">
              <b>9</b>
              <div>
                <h3>Giải thích các tình huống thực tế</h3>
                <div className="lesson25-situation-grid">
                  {[
                    ['acReason', 'Tại sao điều hòa làm tiền điện tăng nhanh hơn quạt?', ['cong suat', 'lon']],
                    ['ledReason', 'Tại sao đèn LED tiết kiệm điện hơn đèn sợi đốt?', ['cong suat', 'nho']],
                    ['offReason', 'Tại sao nên tắt thiết bị khi không sử dụng?', ['thoi gian', 'giam']],
                  ].map(([key, prompt, keywords]) => (
                    <div className="question-card" key={key}>
                      <h4>{prompt}</h4>
                      <textarea value={answers[key] || ''} onChange={(event) => updateAnswer(key, event.target.value)} placeholder="Giải thích ngắn..." />
                      <button className="primary-soft-btn" type="button" onClick={() => checkTextIncludes(key, keywords, 'Đúng. Em đã giải thích được bằng công suất/thời gian sử dụng.', 'Gợi ý: dùng các ý công suất lớn, thời gian sử dụng và điện năng tiêu thụ.', 'Gợi ý đáp án: thiết bị công suất lớn hoặc dùng lâu sẽ tiêu thụ nhiều điện; tắt thiết bị làm thời gian sử dụng giảm nên tiết kiệm điện.')}>Kiểm tra</button>
                      {feedbacks[key] && <p className={`inline-feedback inline-feedback--${feedbacks[key].type}`}>{feedbacks[key].message}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="journey-item">
              <b>10</b>
              <div>
                <h3>Vận dụng tính toán</h3>
                <div className="lesson25-practice-grid">
                  <div className="question-card">
                    <h4>Đèn 40 W dùng 5 giờ. Điện năng tiêu thụ là bao nhiêu Wh?</h4>
                    <input value={answers.energyCalc || ''} onChange={(event) => updateAnswer('energyCalc', event.target.value)} placeholder="Nhập đáp án..." />
                    <button className="primary-soft-btn" type="button" onClick={() => checkNumber('energyCalc', 200, 1, 'Đúng. A = P.t = 40 × 5 = 200 Wh.', 'Gợi ý: dùng A = P.t, đơn vị Wh khi P tính bằng W và t tính bằng giờ.', 'Đáp án: A = 40 × 5 = 200 Wh.')}>Kiểm tra</button>
                    {feedbacks.energyCalc && <p className={`inline-feedback inline-feedback--${feedbacks.energyCalc.type}`}>{feedbacks.energyCalc.message}</p>}
                  </div>
                  <div className="question-card">
                    <h4>Thiết bị ở U = 220 V, I = 2 A. Công suất là bao nhiêu W?</h4>
                    <input value={answers.powerCalc || ''} onChange={(event) => updateAnswer('powerCalc', event.target.value)} placeholder="Nhập đáp án..." />
                    <button className="primary-soft-btn" type="button" onClick={() => checkNumber('powerCalc', 440, 1, 'Đúng. P = UI = 220 × 2 = 440 W.', 'Gợi ý: dùng P = UI.', 'Đáp án: P = 220 × 2 = 440 W.')}>Kiểm tra</button>
                    {feedbacks.powerCalc && <p className={`inline-feedback inline-feedback--${feedbacks.powerCalc.type}`}>{feedbacks.powerCalc.message}</p>}
                  </div>
                  <div className="question-card">
                    <h4>Gia đình dùng 120 kW.h, giá 2 000 đồng/kW.h. Tiền điện khoảng bao nhiêu đồng?</h4>
                    <input value={answers.billCalc || ''} onChange={(event) => updateAnswer('billCalc', event.target.value)} placeholder="Nhập đáp án..." />
                    <button className="primary-soft-btn" type="button" onClick={() => checkNumber('billCalc', 240000, 1000, 'Đúng. Tiền điện khoảng 240 000 đồng.', 'Gợi ý: tiền điện = số kW.h × đơn giá.', 'Đáp án: 120 × 2 000 = 240 000 đồng.')}>Kiểm tra</button>
                    {feedbacks.billCalc && <p className={`inline-feedback inline-feedback--${feedbacks.billCalc.type}`}>{feedbacks.billCalc.message}</p>}
                  </div>
                  <div className="question-card">
                    <h4>Dùng 5 giờ mỗi ngày: đèn sợi đốt 100 W hay LED 20 W tiết kiệm hơn?</h4>
                    <input value={answers.compareDevice || ''} onChange={(event) => updateAnswer('compareDevice', event.target.value)} placeholder="Nhập lựa chọn và lí do..." />
                    <button className="primary-soft-btn" type="button" onClick={() => checkTextIncludes('compareDevice', ['led'], 'Đúng. LED tiết kiệm hơn vì công suất nhỏ hơn.', 'Gợi ý: so sánh 20 W với 100 W khi thời gian dùng như nhau.', 'Đáp án: đèn LED tiết kiệm hơn. Cùng 5 giờ, LED 20 W tiêu thụ ít hơn đèn 100 W.')}>Kiểm tra</button>
                    {feedbacks.compareDevice && <p className={`inline-feedback inline-feedback--${feedbacks.compareDevice.type}`}>{feedbacks.compareDevice.message}</p>}
                  </div>
                </div>
              </div>
            </section>

            <section className="journey-item">
              <b>11</b>
              <div>
                <h3>Bài tập nâng cao có gợi ý từng bước</h3>
                <p>Một ấm điện 1 500 W dùng 12 phút mỗi ngày. Trong 30 ngày, ấm tiêu thụ bao nhiêu kW.h?</p>
                <button className="ghost-soft-btn" type="button" onClick={() => setAdvancedHintStep((step) => Math.min(3, step + 1))}>Xem gợi ý</button>
                {advancedHintStep > 0 && (
                  <ol className="hint-panel lesson25-hints">
                    {[
                      'Đổi 1 500 W = 1,5 kW.',
                      'Đổi 12 phút = 0,2 giờ.',
                      'Tính điện năng: A = P.t.số ngày.',
                    ].slice(0, advancedHintStep).map((hint) => <li key={hint}>{hint}</li>)}
                  </ol>
                )}
                <div className="answer-row">
                  <input value={answers.advanced || ''} onChange={(event) => updateAnswer('advanced', event.target.value)} placeholder="Nhập đáp án kW.h..." />
                  <button type="button" onClick={() => checkNumber('advanced', 9, 0.1, 'Đúng. Ấm tiêu thụ 9 kW.h trong 30 ngày.', 'Gợi ý: sau khi đổi đơn vị, dùng A = P.t rồi nhân 30 ngày.', 'Đáp án: A = 1,5 × 0,2 × 30 = 9 kW.h.')}>Kiểm tra</button>
                </div>
                {feedbacks.advanced && <p className={`inline-feedback inline-feedback--${feedbacks.advanced.type}`}>{feedbacks.advanced.message}</p>}
              </div>
            </section>
          </div>

          <div className="lesson25-worksheet-footer">
            <strong>{lesson25RequiredFeedback.filter((key) => feedbacks[key]?.type === 'correct').length}/{lesson25RequiredFeedback.length} điểm khám phá đã hoàn thành</strong>
            <button className="primary-soft-btn" disabled={!worksheetDone} type="button" onClick={() => revealBlock('quiz')}>
              {worksheetDone ? 'Mở quiz ôn tập' : 'Hoàn thành các điểm khám phá để mở quiz'}
            </button>
          </div>
        </article>
      )}

      {revealedBlocks.quiz && (
        <article className="review-quest-card lesson25-review" id="lesson25-review-quiz">
          <div className="review-quest-header">
            <div>
              <span className="review-quest-kicker"><b>⚡</b> Quiz ôn tập</span>
              <h2>Thử thách dùng điện thông minh</h2>
              <p>Mỗi câu là một tình huống đời sống để kiểm tra cách em hiểu điện năng và công suất điện.</p>
            </div>
            <div className="review-score-orb"><strong>{quizScore}</strong><span>điểm</span></div>
          </div>
          <div className="review-progress"><span style={{ width: `${(Object.keys(quizResults).length / lesson25ReviewQuestions.length) * 100}%` }} /></div>

          {!quizComplete ? (
            <section className={`quest-question ${quizSubmitted && !quizResults[quizQuestion.id] ? 'quest-question--wrong' : ''}`} key={quizQuestion.id}>
              <div className="quest-question-top"><span>{quizQuestion.badge}</span><strong>Câu {quizIndex + 1}</strong></div>
              <h3>{quizQuestion.prompt}</h3>

              {quizQuestion.type === 'single' && (
                <div className="quest-options">
                  {quizQuestion.options.map((option) => (
                    <button className={quizAnswers[quizQuestion.id] === option.id ? 'quest-option quest-option--active' : 'quest-option'} disabled={quizSubmitted} key={option.id} type="button" onClick={() => setQuizAnswers((current) => ({ ...current, [quizQuestion.id]: option.id }))}><span />{option.text}</button>
                  ))}
                </div>
              )}
              {quizQuestion.type === 'multi' && (
                <div className="quest-options quest-options--grid">
                  {quizQuestion.options.map((option) => (
                    <button className={quizAnswers[quizQuestion.id]?.[option.id] ? 'quest-option quest-option--active' : 'quest-option'} disabled={quizSubmitted} key={option.id} type="button" onClick={() => setQuizAnswers((current) => ({ ...current, [quizQuestion.id]: { ...(current[quizQuestion.id] || {}), [option.id]: !current[quizQuestion.id]?.[option.id] } }))}><span />{option.text}</button>
                  ))}
                </div>
              )}
              {quizQuestion.type === 'formula' && <div className="quest-formula"><strong>W =</strong><input disabled={quizSubmitted} value={quizAnswers[quizQuestion.id] || ''} onChange={(event) => setQuizAnswers((current) => ({ ...current, [quizQuestion.id]: event.target.value }))} placeholder="Điền theo U, I, t" /></div>}
              {(quizQuestion.type === 'numeric' || quizQuestion.type === 'scenario') && (
                <div className="quest-write">
                  <textarea disabled={quizSubmitted} value={quizAnswers[quizQuestion.id] || ''} onChange={(event) => setQuizAnswers((current) => ({ ...current, [quizQuestion.id]: event.target.value }))} placeholder={quizQuestion.placeholder || `Nhập đáp án${quizQuestion.suffix ? ` (${quizQuestion.suffix})` : ''}...`} />
                </div>
              )}

              {quizSubmitted && (
                <div className={quizResults[quizQuestion.id] ? 'quest-feedback quest-feedback--correct' : 'quest-feedback quest-feedback--wrong'}>
                  <strong>{quizResults[quizQuestion.id] ? '✓ Chính xác' : 'Chưa đúng'}</strong>
                  <p>{quizQuestion.explain}</p>
                </div>
              )}
              <div className="quest-actions">
                {!quizSubmitted ? <button className="quest-primary" type="button" onClick={submitQuiz}>Kiểm tra</button> : <button className="quest-primary" type="button" onClick={nextQuiz}>{quizIndex === lesson25ReviewQuestions.length - 1 ? 'Xem tự đánh giá' : 'Câu tiếp theo'}</button>}
              </div>
            </section>
          ) : (
            <section className="quest-summary">
              <span>Nhiệm vụ hoàn thành!</span>
              <h3>{quizScore}/{lesson25ReviewQuestions.length} câu đúng</h3>
              <p>{quizScore >= 5 ? 'Em đã vận dụng tốt kiến thức điện năng và công suất điện vào đời sống.' : 'Em nên xem lại công thức W = UIt, P = UI và các tình huống tiết kiệm điện.'}</p>
            </section>
          )}
        </article>
      )}

      {revealedBlocks.selfCheck && (
        <article className="restored-card self-check lesson22-reveal-block lesson25-self-review">
          <h3>Tự đánh giá mức độ hiểu bài</h3>
          {[
            ['factors', 'Em hiểu điện năng tiêu thụ phụ thuộc vào những yếu tố nào'],
            ['w', 'Em sử dụng được công thức W = UIt'],
            ['power', 'Em hiểu ý nghĩa công suất điện'],
            ['ui', 'Em sử dụng được công thức P = UI'],
            ['practice', 'Em giải được bài tập vận dụng'],
            ['saving', 'Em biết cách sử dụng điện tiết kiệm hơn trong thực tế'],
          ].map(([key, label]) => (
            <label className="soft-checkbox" key={key}>
              <input checked={Boolean(answers.selfChecks?.[key])} onChange={() => updateAnswer('selfChecks', { ...(answers.selfChecks || {}), [key]: !answers.selfChecks?.[key] })} type="checkbox" />
              <span>{label}</span>
            </label>
          ))}
          {checkedCount === 6 && (
            <div className="lesson25-final-card">
              <strong>Bạn đã hoàn thành hành trình khám phá Năng lượng và công suất điện.</strong>
            </div>
          )}
        </article>
      )}
    </section>
  )
}

const lesson25UnitPairs = [
  ['J', 'Đơn vị điện năng hoặc công'],
  ['W', 'Đơn vị công suất'],
  ['s', 'Đơn vị thời gian'],
  ['V', 'Đơn vị hiệu điện thế'],
  ['A', 'Đơn vị cường độ dòng điện'],
]

const lesson25NewQuiz = [
  { id: 'q1', type: 'single', badge: 'Nhiệm vụ 1', prompt: 'Gia đình A có điều hòa 2638 W, quạt điện 55 W và đèn LED 20 W. Thiết bị nào có khả năng làm hóa đơn điện tăng nhiều nhất nếu sử dụng liên tục?', options: ['Đèn LED', 'Quạt điện', 'Điều hòa'], answer: 2, explain: 'Điều hòa có công suất lớn nhất nên trong cùng một khoảng thời gian sẽ tiêu thụ điện năng nhiều hơn.' },
  { id: 'q2', type: 'match', badge: 'Nhiệm vụ 2', prompt: 'Thám tử công suất: ghép thiết bị với công suất phù hợp.', pairs: [['Đèn LED', '20 W'], ['Quạt điện', '55 W'], ['Điều hòa', '2638 W']], targets: ['20 W', '55 W', '2638 W'], explain: 'Đèn LED thường có công suất nhỏ khoảng 20 W, quạt điện khoảng 55 W, còn điều hòa có công suất rất lớn 2638 W.' },
  { id: 'q3', type: 'blank', badge: 'Nhiệm vụ 3', prompt: 'Hoàn thành bí mật công thức: A = U × I × _____.', answer: 't', explain: 'Điện năng tiêu thụ của đoạn mạch được tính bởi A = UIt, nên ô còn thiếu là t.' },
  { id: 'q4', type: 'single', badge: 'Nhiệm vụ 4', prompt: 'Một bóng đèn hoạt động với U = 220 V, I = 0,5 A, t = 10 s. Điện năng tiêu thụ là bao nhiêu?', options: ['110 J', '1100 J', '2200 J'], answer: 1, explain: 'A = UIt = 220 × 0,5 × 10 = 1100 J.' },
  { id: 'q5', type: 'single', badge: 'Nhiệm vụ 5', prompt: 'Hai thiết bị cùng tiêu thụ 1000 J. Thiết bị A tiêu thụ trong 10 s, thiết bị B tiêu thụ trong 100 s. Thiết bị nào có công suất lớn hơn?', options: ['Thiết bị A', 'Thiết bị B'], answer: 0, explain: 'Cùng tiêu thụ 1000 J nhưng thiết bị A dùng trong thời gian ngắn hơn nên công suất lớn hơn.' },
  { id: 'q6', type: 'single', badge: 'Nhiệm vụ 6', prompt: 'Trên điều hòa ghi 220 V - 2638 W. Số 2638 W cho biết điều gì?', options: ['Hiệu điện thế', 'Công suất điện', 'Điện năng tiêu thụ'], answer: 1, explain: 'Đơn vị W là oát, dùng để chỉ công suất điện của thiết bị.' },
  { id: 'q7', type: 'single', badge: 'Nhiệm vụ 7', prompt: 'Đúng hay sai: Khi thời gian sử dụng tăng gấp đôi thì điện năng tiêu thụ cũng tăng gấp đôi nếu U và I không đổi.', options: ['Đúng', 'Sai'], answer: 0, explain: 'Theo A = UIt, khi U và I không đổi thì A tỉ lệ thuận với t.' },
  { id: 'q8', type: 'single', badge: 'Nhiệm vụ 8', prompt: 'Một quạt điện 55 W hoạt động trong 2 giờ. Điện năng tiêu thụ là bao nhiêu?', options: ['110 Wh', '55 Wh', '220 Wh'], answer: 0, explain: 'A = Pt = 55 × 2 = 110 Wh.' },
  { id: 'q9', type: 'singleExplain', badge: 'Nhiệm vụ 9', prompt: 'Gia đình có hai lựa chọn: đèn sợi đốt 100 W hoặc đèn LED 20 W. Muốn tiết kiệm điện nên chọn loại nào? Giải thích ngắn.', options: ['Đèn sợi đốt', 'Đèn LED'], answer: 1, explain: 'Nên chọn đèn LED vì công suất nhỏ hơn nhiều, nên dùng cùng thời gian sẽ tiêu thụ ít điện năng hơn.' },
  { id: 'q10', type: 'blank', badge: 'Nhiệm vụ 10', prompt: 'Hoàn thành công thức công suất: P = _____ / t.', answer: 'a', explain: 'Công suất điện là điện năng tiêu thụ trong một đơn vị thời gian: P = A/t.' },
  { id: 'q11', type: 'match', badge: 'Nhiệm vụ 11', prompt: 'Săn đơn vị: ghép đại lượng với đơn vị phù hợp.', pairs: [['A', 'J'], ['P', 'W'], ['t', 's'], ['U', 'V'], ['I', 'A']], targets: ['J', 'W', 's', 'V', 'A'], explain: 'A đo bằng J, P đo bằng W, t đo bằng s, U đo bằng V, I đo bằng A.' },
  { id: 'q12', type: 'numeric', badge: 'Nhiệm vụ 12', prompt: 'Một điều hòa 2638 W hoạt động trong 4 giờ. Điện năng tiêu thụ là bao nhiêu kWh? Có thể nhập 10,552 kWh hoặc 10552 Wh.', answer: [10.552, 10552], tolerance: 0.05, hint: ['Bước 1: Đổi 2638 W = 2,638 kW nếu tính theo kWh.', 'Bước 2: Dùng công thức A = Pt.'], explain: 'A = Pt = 2,638 × 4 = 10,552 kWh, tương đương 10552 Wh.' },
  { id: 'q13', type: 'multi', badge: 'Nhiệm vụ 13', prompt: 'Nhà tư vấn tiết kiệm điện: chọn 3 hành động giúp giảm tiền điện.', options: ['Tắt thiết bị khi không sử dụng', 'Bật điều hòa 18°C cả ngày', 'Sử dụng đèn LED', 'Tận dụng ánh sáng tự nhiên', 'Mở tủ lạnh liên tục'], answer: [0, 2, 3], explain: 'Tắt thiết bị khi không sử dụng, dùng đèn LED và tận dụng ánh sáng tự nhiên đều giúp giảm điện năng tiêu thụ.' },
  { id: 'q14', type: 'scenario', badge: 'Nhiệm vụ 14', prompt: 'Thử thách cuối: viết một biện pháp giúp gia đình em tiết kiệm điện.', required: ['tat', 'led', 'anh sang', 'dieu hoa', 'tiet kiem', 'khong su dung'], explain: 'Một biện pháp hợp lí có thể là tắt thiết bị khi không dùng, dùng đèn LED, tận dụng ánh sáng tự nhiên hoặc dùng điều hòa hợp lí.' },
  { id: 'q15', type: 'single', badge: 'Nhiệm vụ 15', prompt: 'Huy hiệu hoàn thành: mục tiêu cao nhất của thử thách này là gì?', options: ['Trở thành chuyên gia điện năng', 'Học thuộc lòng mọi số liệu', 'Dùng nhiều thiết bị hơn'], answer: 0, explain: 'Mục tiêu là hiểu điện năng, công suất và biết vận dụng để sử dụng điện tiết kiệm trong đời sống.' },
]

const lesson25VideoPrompts = [
  {
    id: 'bill-causes',
    type: 'multi',
    time: 5,
    title: 'Hóa đơn điện tăng cao',
    prompt: 'Gia đình nhận thấy hóa đơn điện tháng này tăng cao hơn tháng trước. Theo em, nguyên nhân nào có thể làm lượng điện năng tiêu thụ tăng?',
    options: [
      ['longer', 'Sử dụng thiết bị điện lâu hơn'],
      ['higher-power', 'Sử dụng thiết bị có công suất lớn hơn'],
      ['both', 'Cả hai nguyên nhân trên'],
    ],
    answer: ['both'],
    correctText: 'Đúng. Điện năng tiêu thụ có thể tăng khi thiết bị dùng lâu hơn hoặc khi thiết bị có công suất lớn hơn.',
    wrongText: 'Chưa đúng. Hãy chọn ý khái quát được cả thời gian sử dụng và công suất thiết bị.',
  },
  {
    id: 'power-groups',
    type: 'group-drag',
    time: 9,
    title: 'Quan sát các thiết bị điện',
    prompt: 'Kéo thả thiết bị vào nhóm phù hợp.',
    groups: [
      { id: 'small', title: 'Công suất nhỏ', answers: ['Đèn LED 20 W', 'Quạt điện 55 W'] },
      { id: 'large', title: 'Công suất lớn', answers: ['Điều hòa 2638 W', 'Bàn là 1000 W', 'Nồi cơm điện 600 W'] },
    ],
    items: ['Đèn LED 20 W', 'Quạt điện 55 W', 'Điều hòa 2638 W', 'Bàn là 1000 W', 'Nồi cơm điện 600 W'],
    correctText: 'Đúng. Nhóm công suất lớn thường làm điện năng tiêu thụ tăng nhanh hơn khi dùng trong cùng thời gian.',
    wrongText: 'Chưa đúng. Hãy xem số W: 20 W và 55 W nhỏ hơn nhiều so với 600 W, 1000 W và 2638 W.',
  },
  {
    id: 'ac-vs-fan',
    type: 'single',
    time: 21,
    title: 'So sánh điều hòa và quạt điện',
    prompt: 'Điều hòa có công suất 2638 W. Quạt điện có công suất 55 W. Nếu cùng hoạt động trong 1 giờ, thiết bị nào tiêu thụ nhiều điện năng hơn?',
    options: [
      ['ac', 'Điều hòa'],
      ['fan', 'Quạt điện'],
    ],
    answer: 'ac',
    correctText: 'Đúng. Cùng thời gian 1 giờ, thiết bị có công suất lớn hơn tiêu thụ nhiều điện năng hơn.',
    wrongText: 'Chưa đúng. Hãy so sánh 2638 W với 55 W: công suất của điều hòa lớn hơn rất nhiều.',
  },
]

function Lesson25InteractiveVideo({ src }) {
  const videoRef = useRef(null)
  const [activePrompt, setActivePrompt] = useState(null)
  const [answeredPrompts, setAnsweredPrompts] = useState({})
  const [multiAnswers, setMultiAnswers] = useState({})
  const [singleAnswer, setSingleAnswer] = useState('')
  const [groupAnswers, setGroupAnswers] = useState({})
  const [selectedDragItem, setSelectedDragItem] = useState('')
  const [result, setResult] = useState(null)

  function openPrompt(prompt) {
    videoRef.current?.pause()
    setActivePrompt(prompt)
    setMultiAnswers({})
    setSingleAnswer('')
    setGroupAnswers({})
    setSelectedDragItem('')
    setResult(null)
  }

  function syncVideoPrompt() {
    const video = videoRef.current
    if (!video || activePrompt) return
    const prompt = lesson25VideoPrompts.find((item) => video.currentTime >= item.time - 1 && !answeredPrompts[item.id])
    if (prompt) openPrompt(prompt)
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      syncVideoPrompt()
    }, 120)

    return () => window.clearInterval(timer)
  })

  const placeGroupItem = (item, groupId) => {
    if (!item) return
    setGroupAnswers((current) => {
      const next = Object.fromEntries(
        Object.entries(current).map(([key, values]) => [key, values.filter((value) => value !== item)]),
      )
      next[groupId] = [...(next[groupId] || []), item]
      return next
    })
    setSelectedDragItem('')
    setResult(null)
  }

  const removeGroupItem = (item) => {
    setGroupAnswers((current) =>
      Object.fromEntries(Object.entries(current).map(([key, values]) => [key, values.filter((value) => value !== item)])),
    )
    setResult(null)
  }

  const checkPrompt = () => {
    if (!activePrompt) return
    let correct = false

    if (activePrompt.type === 'multi') {
      const selected = Object.keys(multiAnswers).filter((key) => multiAnswers[key]).sort()
      correct = selected.length === activePrompt.answer.length && activePrompt.answer.every((item, index) => selected[index] === item)
    }

    if (activePrompt.type === 'single') {
      correct = singleAnswer === activePrompt.answer
    }

    if (activePrompt.type === 'group-drag') {
      correct = activePrompt.groups.every((group) => {
        const actual = [...(groupAnswers[group.id] || [])].sort()
        const expected = [...group.answers].sort()
        return actual.length === expected.length && expected.every((item, index) => actual[index] === item)
      })
    }

    setResult(correct ? 'correct' : 'wrong')
    playLessonTone(correct ? 'correct' : 'wrong')
  }

  const continueVideo = () => {
    if (!activePrompt) return
    setAnsweredPrompts((current) => ({ ...current, [activePrompt.id]: true }))
    setActivePrompt(null)
    setResult(null)
    window.setTimeout(() => videoRef.current?.play(), 80)
  }

  const unplacedItems = activePrompt?.type === 'group-drag'
    ? activePrompt.items.filter((item) => !Object.values(groupAnswers).flat().includes(item))
    : []

  return (
    <div className={activePrompt ? 'lesson25-interactive-video is-paused' : 'lesson25-interactive-video'}>
      <video controls playsInline preload="metadata" ref={videoRef} onLoadedMetadata={syncVideoPrompt} onPause={syncVideoPrompt} onPlay={syncVideoPrompt} onSeeked={syncVideoPrompt} onTimeUpdate={syncVideoPrompt}>
        <source src={src} type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ phát video HTML5.
      </video>

      {activePrompt && (
        <div className="lesson25-video-overlay">
          <article className="lesson25-video-card">
            <div className="lesson25-video-card-head">
              <span>{activePrompt.title}</span>
              <strong>0:{String(activePrompt.time).padStart(2, '0')}</strong>
            </div>
            <h3>{activePrompt.prompt}</h3>

            {activePrompt.type === 'multi' && (
              <div className="lesson25-video-options">
                {activePrompt.options.map(([value, label]) => (
                  <label className={multiAnswers[value] ? 'is-selected' : ''} key={value}>
                    <input checked={Boolean(multiAnswers[value])} onChange={() => {
                      setMultiAnswers((current) => ({ ...current, [value]: !current[value] }))
                      setResult(null)
                    }} type="checkbox" />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            )}

            {activePrompt.type === 'single' && (
              <div className="lesson25-video-options lesson25-video-options--radio">
                {activePrompt.options.map(([value, label]) => (
                  <label className={singleAnswer === value ? 'is-selected' : ''} key={value}>
                    <input checked={singleAnswer === value} name={activePrompt.id} onChange={() => {
                      setSingleAnswer(value)
                      setResult(null)
                    }} type="radio" />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            )}

            {activePrompt.type === 'group-drag' && (
              <div className="lesson25-drag-groups">
                <div className="lesson25-drag-bank">
                  {unplacedItems.map((item) => (
                    <button
                      className={selectedDragItem === item ? 'is-selected' : ''}
                      draggable
                      key={item}
                      type="button"
                      onClick={() => setSelectedDragItem(item)}
                      onDragStart={(event) => event.dataTransfer.setData('text/plain', item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <div className="lesson25-group-columns">
                  {activePrompt.groups.map((group) => (
                    <div className="lesson25-drop-column" key={group.id} onDragOver={(event) => event.preventDefault()} onDrop={(event) => placeGroupItem(event.dataTransfer.getData('text/plain'), group.id)}>
                      <strong>{group.title}</strong>
                      <button type="button" onClick={() => placeGroupItem(selectedDragItem, group.id)}>
                        {selectedDragItem ? `Thả "${selectedDragItem}" vào đây` : 'Chọn hoặc kéo thiết bị vào đây'}
                      </button>
                      {(groupAnswers[group.id] || []).map((item) => <button className="lesson25-placed-item" key={item} type="button" onClick={() => removeGroupItem(item)}>{item}</button>)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result && (
              <p className={result === 'correct' ? 'lesson25-video-result is-correct' : 'lesson25-video-result is-wrong'}>
                {result === 'correct' ? activePrompt.correctText : activePrompt.wrongText}
              </p>
            )}

            <div className="lesson25-video-actions">
              <button type="button" onClick={checkPrompt}>Kiểm tra</button>
              {result === 'correct' && <button className="is-continue" type="button" onClick={continueVideo}>Xem tiếp</button>}
            </div>
          </article>
        </div>
      )}
    </div>
  )
}

function Lesson25ElectricJourney() {
  const [worksheetOpen, setWorksheetOpen] = useState(false)
  const [maxStep, setMaxStep] = useState(0)
  const [answers, setAnswers] = useState({ meanings: {}, units: {}, checks: {} })
  const [feedbacks, setFeedbacks] = useState({})
  const [hints, setHints] = useState({})
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizResults, setQuizResults] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [selectedQuizMatch, setSelectedQuizMatch] = useState('')
  const [selfOpen, setSelfOpen] = useState(false)

  const normalizeFormula = (value) => normalizeText(String(value || '')).replace(/[∆Δδ]/g, 'delta').replace(/[÷:]/g, '/').replace(/\s/g, '').replace(/[.×*]/g, '')
  const numberFrom = (value) => Number(String(value || '').replace(',', '.').match(/-?\d+(\.\d+)?/)?.[0])
  const completeStep = (step) => setMaxStep((current) => Math.max(current, step + 1))
  const setFeedback = (key, correct, good, bad) => {
    setFeedbacks((current) => ({ ...current, [key]: { type: correct ? 'correct' : 'wrong', message: correct ? good : bad } }))
    playLessonTone(correct ? 'correct' : 'wrong')
  }
  const updateAnswer = (key, value) => setAnswers((current) => ({ ...current, [key]: value }))
  const showHint = (key, max) => setHints((current) => ({ ...current, [key]: Math.min(max, (current[key] || 0) + 1) }))

  const checkObservation = () => {
    const correct = normalizeText(answers.observation || '').includes('nhieu') || normalizeText(answers.observation || '').includes('lon')
    setFeedback('observation', correct, 'Đúng. Cùng thời gian, công suất lớn hơn làm điện năng tiêu thụ nhiều hơn.', 'Gợi ý: nhớ lại điều hòa 2638 W tiêu thụ nhiều hơn quạt.')
    if (correct) completeStep(0)
  }

  const checkDerive = () => {
    const value = normalizeFormula(answers.derive).replace(/^a=/, '')
    const correct = value === 'uit' || value === 'uIt'.toLowerCase()
    setFeedback('derive', correct, 'Chính xác. Từ q = It thay vào A = qU, ta được A = UIt.', 'Gợi ý: từ I = q/t hãy suy ra q = I.t, rồi thay vào A = qU.')
    if (correct) completeStep(1)
  }

  const checkMeanings = () => {
    const meanings = answers.meanings || {}
    const correct =
      meanings.A === 'energy' &&
      meanings.U === 'voltage' &&
      meanings.I === 'current' &&
      meanings.t === 'time'
    setFeedback('meanings', correct, 'Đúng. Em đã ghép đúng ý nghĩa các đại lượng trong A = UIt.', 'Hãy ghép A với điện năng/công, U với hiệu điện thế, I với cường độ dòng điện, t với thời gian.')
    if (correct) completeStep(2)
  }

  const checkNumber = (key, expected, tolerance, good, bad, nextStep) => {
    const numeric = numberFrom(answers[key])
    const correct = Number.isFinite(numeric) && Math.abs(numeric - expected) <= tolerance
    setFeedback(key, correct, good, bad)
    if (correct && nextStep !== undefined) completeStep(nextStep)
  }

  const checkText = (key, keywords, good, bad, nextStep) => {
    const text = normalizeText(answers[key] || '')
    const correct = keywords.filter((keyword) => text.includes(keyword)).length >= Math.min(2, keywords.length)
    setFeedback(key, correct, good, bad)
    if (correct && nextStep !== undefined) completeStep(nextStep)
  }

  const checkPowerIntro = () => {
    const correct = answers.powerIntro === 'A'
    setFeedback('powerIntro', correct, 'Đúng. Thiết bị A dùng điện mạnh hơn vì tiêu thụ cùng 1000 J trong thời gian ngắn hơn.', 'Gợi ý: cùng 1000 J, thiết bị nào tiêu thụ trong thời gian ngắn hơn thì mạnh hơn.')
    if (correct) completeStep(5)
  }

  const checkPowerNeed = () => {
    const correct = answers.powerNeed === 'not-enough'
    setFeedback('powerNeed', correct, 'Đúng. Chỉ biết điện năng chưa đủ, cần biết điện năng đó tiêu thụ trong bao lâu.', 'Hãy so sánh 1000 J trong 10 s và 1000 J trong 100 s.')
    if (correct) completeStep(6)
  }

  const checkPowerFormula = () => {
    const value = normalizeFormula(answers.powerFormula).replace(/^p=/, '')
    const correct = value === 'a/t'
    setFeedback('powerFormula', correct, 'Đúng. Công suất điện P = A/t.', 'Gợi ý: công suất là điện năng tiêu thụ chia cho thời gian.')
    if (correct) completeStep(7)
  }

  const checkUnits = () => {
    const units = answers.units || {}
    const correct = lesson25UnitPairs.every(([unit, meaning]) => units[meaning] === unit)
    setFeedback('units', correct, 'Đúng. Em đã ghép đúng các đơn vị thường gặp.', 'Gợi ý: J cho điện năng, W cho công suất, s cho thời gian, V cho hiệu điện thế, A cho cường độ dòng điện.')
    if (correct) completeStep(8)
  }

  const checkCostChallenge = () => {
    const correct =
      Math.abs(numberFrom(answers.ledCost) - 40) <= 1 &&
      Math.abs(numberFrom(answers.fanCost) - 110) <= 1 &&
      Math.abs(numberFrom(answers.acCost) - 5276) <= 20
    setFeedback('cost', correct, 'Đúng. LED khoảng 40 đồng/giờ, quạt 110 đồng/giờ, điều hòa khoảng 5276 đồng/giờ.', 'Gợi ý: đổi W sang kW rồi nhân 1 giờ và nhân 2000 đồng/kWh.')
    if (correct) completeStep(10)
  }

  const worksheetSteps = [
    'Nhận xét từ video',
    'Suy luận A = UIt',
    'Ý nghĩa đại lượng',
    'Luyện A = UIt',
    'Giải thích thực tế',
    'So sánh tốc độ dùng điện',
    'Vì sao cần công suất',
    'Hình thành P = A/t',
    'Ghép đơn vị',
    'Bài tập công suất',
    'Thử thách chi phí',
  ]
  const worksheetProgress = Math.round((Math.min(maxStep, worksheetSteps.length) / worksheetSteps.length) * 100)
  const currentQuiz = lesson25NewQuiz[quizIndex]
  const quizDone = quizIndex >= lesson25NewQuiz.length
  const quizScore = Object.values(quizResults).filter(Boolean).length
  const selfDone = Object.values(answers.checks || {}).filter(Boolean).length

  const submitQuiz = () => {
    if (!currentQuiz) return
    const value = quizAnswers[currentQuiz.id]
    let correct = false
    if (currentQuiz.type === 'single') correct = value === currentQuiz.answer
    if (currentQuiz.type === 'singleExplain') correct = value?.choice === currentQuiz.answer
    if (currentQuiz.type === 'multi') {
      const selected = Object.keys(value || {}).filter((key) => value[key]).map(Number).sort((a, b) => a - b)
      const expected = [...currentQuiz.answer].sort((a, b) => a - b)
      correct = selected.length === expected.length && expected.every((item, index) => item === selected[index])
    }
    if (currentQuiz.type === 'match') {
      correct = currentQuiz.pairs.every(([source, target]) => value?.[source] === target)
    }
    if (currentQuiz.type === 'blank') correct = normalizeFormula(value).replace(/^a=/, '').replace(/^p=/, '') === normalizeFormula(currentQuiz.answer).replace(/^a=/, '').replace(/^p=/, '')
    if (currentQuiz.type === 'numeric') {
      const numeric = numberFrom(value)
      const expected = Array.isArray(currentQuiz.answer) ? currentQuiz.answer : [currentQuiz.answer]
      correct = expected.some((answer) => Math.abs(numeric - answer) <= (currentQuiz.tolerance || Math.max(0.02, answer * 0.02)))
    }
    if (currentQuiz.type === 'scenario') {
      const text = normalizeText(value || '')
      correct = currentQuiz.required.some((keyword) => text.includes(keyword))
    }
    setQuizResults((current) => ({ ...current, [currentQuiz.id]: correct }))
    setQuizSubmitted(true)
    playLessonTone(correct ? 'correct' : 'wrong')
  }

  const nextQuiz = () => {
    setQuizSubmitted(false)
    setSelectedQuizMatch('')
    setQuizIndex((current) => {
      const next = current + 1
      if (next === lesson25NewQuiz.length) setSelfOpen(true)
      return next
    })
  }

  return (
    <section className="restored-lesson restored25 lesson25-new">
      <div className="restored-hero lesson25-top">
        <span>Bài 25</span>
        <h1>Năng lượng và công suất điện</h1>
        <p>Sau video, em tiếp tục tự khám phá công thức, ý nghĩa đại lượng và cách vận dụng vào tiền điện gia đình.</p>
      </div>

      <article className="restored-card lesson25-real-video-card">
        <div className="journey-heading">
          <span>Video bài học</span>
          <h2>Khởi động: năng lượng điện trong đời sống</h2>
        </div>
        <Lesson25InteractiveVideo src="/videos/bai25.mp4" />
        <button className="primary-soft-btn lesson25-start-btn" type="button" onClick={() => setWorksheetOpen(true)}>Chuyển sang phiếu học tập</button>
      </article>

      {worksheetOpen && (
        <article className="restored-card lesson25-discovery-sheet lesson22-reveal-block">
          <div className="lesson25-sheet-head">
            <div>
              <span>Phiếu học tập</span>
            </div>
            <img src={robotImage} alt="Mascot trợ lí học tập" />
          </div>
          <div className="lesson25-sheet-progress"><span style={{ width: `${worksheetProgress}%` }} /><b>{worksheetProgress}%</b></div>

          <div className="lesson25-unlock-list">
            <section className="lesson25-unlock-card is-open">
              <header><b>1</b><h3>Hoàn thành nhận xét từ video</h3></header>
              <p>Thiết bị có công suất càng lớn thì trong cùng một khoảng thời gian sẽ tiêu thụ điện năng càng ________.</p>
              <div className="answer-row"><input value={answers.observation || ''} onChange={(event) => updateAnswer('observation', event.target.value)} placeholder="Điền từ còn thiếu..." /><button type="button" onClick={checkObservation}>Kiểm tra</button></div>
              {feedbacks.observation && <p className={`inline-feedback inline-feedback--${feedbacks.observation.type}`}>{feedbacks.observation.message}</p>}
            </section>

            {maxStep >= 1 && <section className="lesson25-unlock-card">
              <header><b>2</b><h3>Tự suy luận công thức điện năng</h3></header>
              <div className="lesson25-formula-clues"><span>A = qU</span><span>I = q/t</span><span>q = ?</span></div>
              <p>Hãy thay q theo I và t để tìm công thức điện năng tiêu thụ.</p>
              <button className="ghost-soft-btn" type="button" onClick={() => showHint('derive', 2)}>Gợi ý</button>
              {hints.derive > 0 && <div className="hint-panel">{['Từ I = q/t suy ra q = I.t.', 'Thay q = I.t vào A = qU.'][hints.derive - 1]}</div>}
              <div className="formula-input"><span>A =</span><input value={answers.derive || ''} onChange={(event) => updateAnswer('derive', event.target.value)} placeholder="Không nhập ngay nếu chưa suy luận" /><button type="button" onClick={checkDerive}>Kiểm tra</button></div>
              {feedbacks.derive && <p className={`inline-feedback inline-feedback--${feedbacks.derive.type}`}>{feedbacks.derive.message}</p>}
              {feedbacks.derive?.type === 'correct' && <div className="lesson25-formula-reveal">A = UIt</div>}
            </section>}

            {maxStep >= 2 && <section className="lesson25-unlock-card">
              <header><b>3</b><h3>Ghép ý nghĩa đại lượng</h3></header>
              <div className="lesson25-match-grid">
                {['A', 'U', 'I', 't'].map((symbol) => (
                  <label key={symbol}><strong>{symbol}</strong><select value={answers.meanings?.[symbol] || ''} onChange={(event) => updateAnswer('meanings', { ...(answers.meanings || {}), [symbol]: event.target.value })}><option value="">Chọn ý nghĩa</option><option value="energy">Điện năng tiêu thụ hoặc công của dòng điện</option><option value="voltage">Hiệu điện thế</option><option value="current">Cường độ dòng điện</option><option value="time">Thời gian sử dụng</option></select></label>
                ))}
              </div>
              <button className="primary-soft-btn" type="button" onClick={checkMeanings}>Kiểm tra ghép cặp</button>
              {feedbacks.meanings && <p className={`inline-feedback inline-feedback--${feedbacks.meanings.type}`}>{feedbacks.meanings.message}</p>}
            </section>}

            {maxStep >= 3 && <section className="lesson25-unlock-card">
              <header><b>4</b><h3>Hai bài tập cơ bản với A = UIt</h3></header>
              <div className="lesson25-practice-grid">
                {[['basic1', 'Thiết bị U = 220 V, I = 2 A dùng 10 s. Tính A (J).', 4400, 'Dùng A = UIt = 220 × 2 × 10.'], ['basic2', 'Đèn U = 12 V, I = 0,5 A dùng 60 s. Tính A (J).', 360, 'Dùng A = 12 × 0,5 × 60.']].map(([key, prompt, expected, hint]) => (
                  <div className="question-card" key={key}><h4>{prompt}</h4><button className="ghost-soft-btn" type="button" onClick={() => showHint(key, 1)}>Gợi ý</button>{hints[key] && <p className="hint-panel">{hint}</p>}<input value={answers[key] || ''} onChange={(event) => updateAnswer(key, event.target.value)} placeholder="Nhập đáp án..." /><button className="primary-soft-btn" type="button" onClick={() => checkNumber(key, expected, 1, 'Đúng. Em đã áp dụng đúng A = UIt.', 'Kiểm tra lại phép nhân U × I × t.', key === 'basic2' ? 3 : undefined)}>Kiểm tra</button>{feedbacks[key] && <p className={`inline-feedback inline-feedback--${feedbacks[key].type}`}>{feedbacks[key].message}</p>}</div>
                ))}
              </div>
              {feedbacks.basic1?.type === 'correct' && feedbacks.basic2?.type === 'correct' && <button className="primary-soft-btn" type="button" onClick={() => completeStep(3)}>Mở tình huống tiếp theo</button>}
            </section>}

            {maxStep >= 4 && <section className="lesson25-unlock-card">
              <header><b>5</b><h3>Giải thích bằng lời của em</h3></header>
              <p>Một điều hòa 2638 W và một quạt điện 55 W cùng hoạt động trong 1 giờ. Vì sao điều hòa tiêu thụ điện năng nhiều hơn?</p>
              <textarea value={answers.acExplain || ''} onChange={(event) => updateAnswer('acExplain', event.target.value)} placeholder="Viết 2-3 câu..." />
              <button className="primary-soft-btn" type="button" onClick={() => checkText('acExplain', ['cong suat', 'lon', '2638'], 'Đúng. Em đã dùng ý công suất lớn để giải thích.', 'Gợi ý: so sánh 2638 W với 55 W, cùng thời gian 1 giờ.', 4)}>Kiểm tra</button>
              {feedbacks.acExplain && <p className={`inline-feedback inline-feedback--${feedbacks.acExplain.type}`}>{feedbacks.acExplain.message}</p>}
            </section>}

            {maxStep >= 5 && <section className="lesson25-unlock-card">
              <header><b>6</b><h3>So sánh tốc độ sử dụng điện</h3></header>
              <p>Thiết bị A tiêu thụ 1000 J trong 10 s. Thiết bị B tiêu thụ 1000 J trong 100 s. Thiết bị nào sử dụng điện mạnh hơn?</p>
              <div className="choice-row">{[['A', 'Thiết bị A'], ['B', 'Thiết bị B'], ['same', 'Như nhau']].map(([value, label]) => <button className={answers.powerIntro === value ? 'soft-choice soft-choice--active' : 'soft-choice'} key={value} type="button" onClick={() => updateAnswer('powerIntro', value)}>{label}</button>)}</div>
              <button className="primary-soft-btn" type="button" onClick={checkPowerIntro}>Kiểm tra</button>
              {feedbacks.powerIntro && <p className={`inline-feedback inline-feedback--${feedbacks.powerIntro.type}`}>{feedbacks.powerIntro.message}</p>}
            </section>}

            {maxStep >= 6 && <section className="lesson25-unlock-card">
              <header><b>7</b><h3>Vậy chỉ biết điện năng đã đủ chưa?</h3></header>
              <p>Nếu chỉ biết hai thiết bị đều tiêu thụ 1000 J, đã đủ để đánh giá mức độ tiêu thụ điện chưa?</p>
              <div className="choice-row">{[['enough', 'Đủ'], ['not-enough', 'Chưa đủ, cần biết thời gian'], ['random', 'Không liên quan']].map(([value, label]) => <button className={answers.powerNeed === value ? 'soft-choice soft-choice--active' : 'soft-choice'} key={value} type="button" onClick={() => updateAnswer('powerNeed', value)}>{label}</button>)}</div>
              <button className="primary-soft-btn" type="button" onClick={checkPowerNeed}>Kiểm tra</button>
              {feedbacks.powerNeed && <p className={`inline-feedback inline-feedback--${feedbacks.powerNeed.type}`}>{feedbacks.powerNeed.message}</p>}
            </section>}

            {maxStep >= 7 && <section className="lesson25-unlock-card">
              <header><b>8</b><h3>Hình thành công suất điện</h3></header>
              <p>Công suất điện cho biết điện năng tiêu thụ trong một đơn vị thời gian. Hãy hoàn thành:</p>
              <div className="formula-input"><span>P =</span><input value={answers.powerFormula || ''} onChange={(event) => updateAnswer('powerFormula', event.target.value)} placeholder="..." /><button type="button" onClick={checkPowerFormula}>Kiểm tra</button></div>
              {feedbacks.powerFormula && <p className={`inline-feedback inline-feedback--${feedbacks.powerFormula.type}`}>{feedbacks.powerFormula.message}</p>}
              {feedbacks.powerFormula?.type === 'correct' && <div className="lesson25-formula-reveal">P = A/t</div>}
            </section>}

            {maxStep >= 8 && <section className="lesson25-unlock-card">
              <header><b>9</b><h3>Ghép đơn vị</h3></header>
              <div className="lesson25-match-grid">{lesson25UnitPairs.map(([, meaning]) => <label key={meaning}><strong>{meaning}</strong><select value={answers.units?.[meaning] || ''} onChange={(event) => updateAnswer('units', { ...(answers.units || {}), [meaning]: event.target.value })}><option value="">Chọn đơn vị</option>{lesson25UnitPairs.map(([item]) => <option value={item} key={item}>{item}</option>)}</select></label>)}</div>
              <button className="primary-soft-btn" type="button" onClick={checkUnits}>Kiểm tra đơn vị</button>
              {feedbacks.units && <p className={`inline-feedback inline-feedback--${feedbacks.units.type}`}>{feedbacks.units.message}</p>}
            </section>}

            {maxStep >= 9 && <section className="lesson25-unlock-card">
              <header><b>10</b><h3>Ba bài tập công suất điện</h3></header>
              <div className="lesson25-practice-grid">{[
                ['powerBasic', 'Cơ bản: A = 600 J, t = 20 s. Tính P (W).', 30, ['Dùng P = A/t.', 'P = 600/20.']],
                ['powerMedium', 'Trung bình: thiết bị P = 500 W chạy 12 phút. Tính A (J).', 360000, ['Đổi 12 phút = 720 s.', 'A = P.t.']],
                ['powerReal', 'Vận dụng: quạt 55 W dùng 4 giờ. Tính điện năng (Wh).', 220, ['Dùng A = P.t nếu P tính W và t tính giờ.', 'A = 55 × 4.']],
              ].map(([key, prompt, expected, hintList]) => <div className="question-card" key={key}><h4>{prompt}</h4><button className="ghost-soft-btn" type="button" onClick={() => showHint(key, hintList.length)}>Gợi ý</button>{hints[key] > 0 && <ol className="hint-panel">{hintList.slice(0, hints[key]).map((hint) => <li key={hint}>{hint}</li>)}</ol>}<input value={answers[key] || ''} onChange={(event) => updateAnswer(key, event.target.value)} placeholder="Nhập đáp án..." /><button className="primary-soft-btn" type="button" onClick={() => checkNumber(key, expected, expected > 1000 ? 1000 : 1, 'Đúng. Em đã xử lí đúng công thức và đơn vị.', 'Xem lại gợi ý từng bước.')}>Kiểm tra</button>{feedbacks[key] && <p className={`inline-feedback inline-feedback--${feedbacks[key].type}`}>{feedbacks[key].message}</p>}</div>)}</div>
              {['powerBasic', 'powerMedium', 'powerReal'].every((key) => feedbacks[key]?.type === 'correct') && <button className="primary-soft-btn" type="button" onClick={() => completeStep(9)}>Mở thử thách thực tế</button>}
            </section>}

            {maxStep >= 10 && <section className="lesson25-unlock-card" id="lesson25-final-question">
              <header><b>11</b><h3>Thử thách thực tế cuối bài</h3></header>
              <p>Giá điện 2000 đồng/kWh. Tính chi phí dùng trong 1 giờ.</p>
              <div className="lesson25-cost-table"><span>LED 20 W</span><span>Quạt 55 W</span><span>Điều hòa 2638 W</span></div>
              <button className="ghost-soft-btn" type="button" onClick={() => showHint('cost', 3)}>Gợi ý nhiều cấp độ</button>
              {hints.cost > 0 && <ol className="hint-panel">{['Đổi W sang kW: chia cho 1000.', 'Trong 1 giờ, số kWh bằng kW × 1.', 'Chi phí = kWh × 2000 đồng.'].slice(0, hints.cost).map((hint) => <li key={hint}>{hint}</li>)}</ol>}
              <div className="lesson25-practice-grid">{[['ledCost', 'LED (đồng)'], ['fanCost', 'Quạt (đồng)'], ['acCost', 'Điều hòa (đồng)']].map(([key, label]) => <label key={key}><span>{label}</span><input value={answers[key] || ''} onChange={(event) => updateAnswer(key, event.target.value)} /></label>)}</div>
              <button className="primary-soft-btn" type="button" onClick={checkCostChallenge}>Kiểm tra chi phí</button>
              {feedbacks.cost && <p className={`inline-feedback inline-feedback--${feedbacks.cost.type}`}>{feedbacks.cost.message}</p>}
            </section>}
          </div>

          {maxStep >= 11 && <button className="primary-soft-btn lesson25-open-quiz" type="button" onClick={() => completeStep(11)}>Mở quiz ôn tập 15 câu</button>}
        </article>
      )}

      {maxStep >= 12 && (
        <article className="review-quest-card lesson25-review">
          <div className="review-quest-header"><div><span className="review-quest-kicker"><b>⚡</b> Thử thách</span><h2>Trở thành chuyên gia tiết kiệm điện</h2><p>Hoàn thành 15 nhiệm vụ để nhận huy hiệu cuối bài.</p></div><div className="review-score-orb"><strong>{quizScore}</strong><span>điểm</span></div></div>
          <div className="review-progress"><span style={{ width: `${(Object.keys(quizResults).length / lesson25NewQuiz.length) * 100}%` }} /></div>
          {!quizDone ? (
            <section className={`quest-question ${quizSubmitted && !quizResults[currentQuiz.id] ? 'quest-question--wrong' : ''}`} key={currentQuiz.id}>
              <div className="quest-question-top"><span>{currentQuiz.badge}</span><strong>Câu {quizIndex + 1}</strong></div>
              <h3>{currentQuiz.prompt}</h3>

              {currentQuiz.type === 'single' && (
                <div className="quest-options">
                  {currentQuiz.options.map((option, index) => (
                    <button className={quizAnswers[currentQuiz.id] === index ? 'quest-option quest-option--active' : 'quest-option'} disabled={quizSubmitted} type="button" key={option} onClick={() => setQuizAnswers((current) => ({ ...current, [currentQuiz.id]: index }))}><span />{option}</button>
                  ))}
                </div>
              )}

              {currentQuiz.type === 'multi' && (
                <div className="quest-options">
                  {currentQuiz.options.map((option, index) => (
                    <button className={quizAnswers[currentQuiz.id]?.[index] ? 'quest-option quest-option--active' : 'quest-option'} disabled={quizSubmitted} type="button" key={option} onClick={() => setQuizAnswers((current) => ({ ...current, [currentQuiz.id]: { ...(current[currentQuiz.id] || {}), [index]: !current[currentQuiz.id]?.[index] } }))}><span />{option}</button>
                  ))}
                </div>
              )}

              {currentQuiz.type === 'singleExplain' && (
                <>
                  <div className="quest-options">
                    {currentQuiz.options.map((option, index) => (
                      <button className={quizAnswers[currentQuiz.id]?.choice === index ? 'quest-option quest-option--active' : 'quest-option'} disabled={quizSubmitted} type="button" key={option} onClick={() => setQuizAnswers((current) => ({ ...current, [currentQuiz.id]: { ...(current[currentQuiz.id] || {}), choice: index } }))}><span />{option}</button>
                    ))}
                  </div>
                  <div className="quest-write"><textarea disabled={quizSubmitted} value={quizAnswers[currentQuiz.id]?.explain || ''} onChange={(event) => setQuizAnswers((current) => ({ ...current, [currentQuiz.id]: { ...(current[currentQuiz.id] || {}), explain: event.target.value } }))} placeholder="Giải thích ngắn..." /></div>
                </>
              )}

              {currentQuiz.type === 'match' && (
                <div className="quest-match">
                  <div className="quest-match-bank">
                    {currentQuiz.pairs.map(([source]) => (
                      <button className={selectedQuizMatch === source ? 'is-selected' : ''} disabled={quizSubmitted} draggable={!quizSubmitted} key={source} type="button" onClick={() => setSelectedQuizMatch(source)} onDragStart={(event) => event.dataTransfer.setData('text/plain', source)}>{source}</button>
                    ))}
                  </div>
                  <div className="quest-match-targets">
                    {currentQuiz.targets.map((target) => {
                      const assigned = Object.entries(quizAnswers[currentQuiz.id] || {}).find(([, value]) => value === target)?.[0]
                      const assignMatch = (source) => {
                        if (!source || quizSubmitted) return
                        setQuizAnswers((current) => {
                          const previous = current[currentQuiz.id] || {}
                          const withoutTarget = Object.fromEntries(Object.entries(previous).filter(([, value]) => value !== target))
                          return { ...current, [currentQuiz.id]: { ...withoutTarget, [source]: target } }
                        })
                        setSelectedQuizMatch('')
                      }
                      return (
                        <button className={assigned ? 'quest-match-target is-filled' : 'quest-match-target'} disabled={quizSubmitted} key={target} type="button" onClick={() => assignMatch(selectedQuizMatch)} onDragOver={(event) => event.preventDefault()} onDrop={(event) => assignMatch(event.dataTransfer.getData('text/plain'))}>
                          <strong>{target}</strong>
                          <span>{assigned || 'Kéo/chọn thẻ vào đây'}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {(currentQuiz.type === 'blank' || currentQuiz.type === 'numeric' || currentQuiz.type === 'scenario') && (
                <div className="quest-write">
                  <textarea disabled={quizSubmitted} value={quizAnswers[currentQuiz.id] || ''} onChange={(event) => setQuizAnswers((current) => ({ ...current, [currentQuiz.id]: event.target.value }))} placeholder="Nhập câu trả lời..." />
                </div>
              )}

              {currentQuiz.hint && !quizSubmitted && (
                <button className="ghost-soft-btn lesson25-quiz-hint" type="button" onClick={() => showHint(currentQuiz.id, currentQuiz.hint.length)}>Xem gợi ý</button>
              )}
              {currentQuiz.hint && hints[currentQuiz.id] > 0 && !quizSubmitted && (
                <div className="hint-panel">{currentQuiz.hint.slice(0, hints[currentQuiz.id]).map((hint) => <p key={hint}>{hint}</p>)}</div>
              )}

              {quizSubmitted && <div className={quizResults[currentQuiz.id] ? 'quest-feedback quest-feedback--correct' : 'quest-feedback quest-feedback--wrong'}><strong>{quizResults[currentQuiz.id] ? '✓ Chính xác' : 'Chưa đúng'}</strong><p>{currentQuiz.explain}</p></div>}
              <div className="quest-actions">{!quizSubmitted ? <button className="quest-primary" type="button" onClick={submitQuiz}>Kiểm tra</button> : <button className="quest-primary" type="button" onClick={nextQuiz}>{quizIndex === lesson25NewQuiz.length - 1 ? 'Xem tổng kết' : 'Câu tiếp theo'}</button>}</div>
            </section>
          ) : (
            <section className="quest-summary">
              <span>Nhiệm vụ hoàn thành!</span>
              <h3>{quizScore}/{lesson25NewQuiz.length} câu đúng</h3>
              <p>{quizScore >= 12 ? '🏅 Chuyên gia điện năng' : quizScore >= 9 ? '🥈 Nhà quản lý điện năng' : '📚 Hãy xem lại bài học và thử lại.'}</p>
            </section>
          )}
        </article>
      )}

      {selfOpen && (
        <article className="restored-card self-check lesson25-self-review lesson22-reveal-block">
          <h3>Tự đánh giá cuối bài</h3>
          <p className="lesson25-self-note">Phần này không chấm điểm. Em chọn mức phù hợp nhất với cảm nhận của mình sau khi hoàn thành quiz.</p>
          <div className="lesson25-self-mood">
            {[
              ['very-clear', '😊', 'Em hiểu rất rõ bài học.'],
              ['mostly-clear', '🙂', 'Em hiểu phần lớn nội dung.'],
              ['not-sure', '😐', 'Em còn một vài phần chưa chắc chắn.'],
              ['review-needed', '😟', 'Em cần xem lại bài học.'],
            ].map(([key, icon, label]) => (
              <button className={answers.mood === key ? 'lesson25-mood-btn is-selected' : 'lesson25-mood-btn'} key={key} type="button" onClick={() => updateAnswer('mood', key)}>
                <span>{icon}</span>
                <strong>{label}</strong>
              </button>
            ))}
          </div>
          {[
            ['bill', 'Em giải thích được vì sao tiền điện tăng.'],
            ['energy', 'Em tính được điện năng tiêu thụ bằng A = UIt.'],
            ['power', 'Em tính được công suất điện bằng P = A/t.'],
            ['label', 'Em đọc được thông số công suất trên thiết bị điện.'],
            ['saving-device', 'Em biết lựa chọn thiết bị tiết kiệm điện.'],
            ['saving', 'Em có thể đề xuất biện pháp tiết kiệm điện cho gia đình.'],
            ['next', 'Em sẵn sàng chuyển sang bài học tiếp theo.'],
          ].map(([key, label]) => <label className="soft-checkbox" key={key}><input checked={Boolean(answers.checks?.[key])} onChange={() => updateAnswer('checks', { ...(answers.checks || {}), [key]: !answers.checks?.[key] })} type="checkbox" /><span>{label}</span></label>)}
          {answers.mood && selfDone === 7 && <div className="lesson25-final-card"><strong>Bạn đã hoàn thành hành trình khám phá Năng lượng và công suất điện.</strong></div>}
        </article>
      )}
    </section>
  )
}

const lesson26Tools = [
  ['cell', 'Pin điện hoá', 'Nguồn cần kiểm tra trong thí nghiệm.'],
  ['voltmeter', 'Vôn kế', 'Dùng để đo hiệu điện thế.'],
  ['ammeter', 'Ampe kế', 'Dùng để đo cường độ dòng điện.'],
  ['rheostat', 'Biến trở', 'Thay đổi dòng điện qua mạch.'],
  ['wire', 'Dây nối', 'Tạo đường dẫn điện khép kín.'],
  ['switch', 'Công tắc', 'Đóng hoặc ngắt mạch khi đo.'],
  ['guard', 'Điện trở bảo vệ', 'Giúp mạch không bị dòng quá lớn.'],
]

const lesson26Completion = [
  'biết đo U và I',
  'biết xử lí dữ liệu thực nghiệm',
  'biết đọc đồ thị U-I',
  'xác định được suất điện động',
  'xác định được điện trở trong',
]

const lesson26ReviewQuestions = [
  {
    id: 'circuit',
    type: 'single',
    badge: 'Lắp mạch',
    prompt: 'Trong thí nghiệm đo suất điện động và điện trở trong, cách mắc nào đúng?',
    options: [
      { id: 'right', text: 'Ampe kế nối tiếp với mạch, vôn kế song song hai cực nguồn' },
      { id: 'wrong-a', text: 'Ampe kế song song với nguồn, vôn kế nối tiếp với mạch' },
      { id: 'wrong-b', text: 'Cả ampe kế và vôn kế đều mắc nối tiếp' },
    ],
    answer: 'right',
    explain: 'Ampe kế đo dòng điện nên mắc nối tiếp. Vôn kế đo hiệu điện thế giữa hai cực nguồn nên mắc song song.',
  },
  {
    id: 'data',
    type: 'multi',
    badge: 'Dữ liệu',
    prompt: 'Những đại lượng nào cần ghi lại để vẽ đồ thị U-I?',
    options: [
      { id: 'u', text: 'Hiệu điện thế U' },
      { id: 'i', text: 'Cường độ dòng điện I' },
      { id: 'r', text: 'Điện trở ngoài R' },
      { id: 'color', text: 'Màu dây nối' },
    ],
    answer: ['i', 'r', 'u'],
    explain: 'Bảng đo cần R, U và I. Đồ thị dùng cặp U-I để nhận ra quan hệ tuyến tính của nguồn điện.',
  },
  {
    id: 'relation',
    type: 'single',
    badge: 'Đồ thị',
    prompt: 'Khi I tăng, U ở mạch ngoài thường thay đổi như thế nào?',
    options: [
      { id: 'up', text: 'U tăng' },
      { id: 'down', text: 'U giảm' },
      { id: 'same', text: 'U không đổi' },
    ],
    answer: 'down',
    explain: 'Theo U = E - rI, khi dòng điện I tăng thì phần hao hụt rI tăng, nên U giảm.',
  },
  {
    id: 'emf',
    type: 'single',
    badge: 'Suất điện động',
    prompt: 'Kéo dài đường thẳng U-I đến I = 0, giao điểm với trục U cho biết đại lượng nào?',
    options: [
      { id: 'e', text: 'Suất điện động E của nguồn' },
      { id: 'r', text: 'Điện trở ngoài của mạch' },
      { id: 'i', text: 'Cường độ dòng điện cực đại' },
    ],
    answer: 'e',
    explain: 'Khi I = 0 thì U = E, nên giao điểm với trục U chính là suất điện động của nguồn.',
  },
  {
    id: 'old-battery',
    type: 'single',
    badge: 'Pin cũ',
    prompt: 'Vì sao pin cũ vẫn còn điện nhưng thiết bị hoạt động yếu hơn?',
    options: [
      { id: 'internal', text: 'Điện trở trong của pin thường lớn hơn' },
      { id: 'wire', text: 'Dây nối trong thiết bị dài hơn' },
      { id: 'voltmeter', text: 'Vôn kế làm pin yếu đi' },
    ],
    answer: 'internal',
    explain: 'Điện trở trong lớn làm hao hụt điện áp bên trong nguồn nhiều hơn, nên thiết bị nhận được hiệu điện thế nhỏ hơn.',
  },
  {
    id: 'calculate',
    type: 'numeric',
    badge: 'Tính nhanh',
    prompt: 'Một pin có E = 1,50 V. Khi I = 0,10 A thì U = 1,45 V. Tính điện trở trong r.',
    suffix: 'Ω',
    answer: 0.5,
    explain: 'Từ U = E - rI suy ra r = (E - U) / I = (1,50 - 1,45) / 0,10 = 0,50 Ω.',
  },
]

const lesson26SelfChecks = [
  ['circuit', 'Em lắp được mạch đo với ampe kế nối tiếp và vôn kế song song'],
  ['measure', 'Em biết nhập và kiểm tra số đo R, U, I'],
  ['graph', 'Em đọc được đồ thị U-I từ dữ liệu thực nghiệm'],
  ['emf', 'Em xác định được suất điện động từ giao điểm I = 0'],
  ['resistance', 'Em hiểu điện trở trong làm U giảm khi I tăng'],
  ['compare', 'Em giải thích được vì sao pin cũ hoạt động yếu hơn'],
]

const createLesson26Rows = (prefix) =>
  Array.from({ length: 5 }, (_, index) => ({
    id: `${prefix}-${index + 1}`,
    r: '',
    u: '',
    i: '',
  }))

function Lesson26FinalReview() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState({})
  const [selfChecks, setSelfChecks] = useState({})
  const activeQuestion = lesson26ReviewQuestions[activeIndex]
  const answeredCount = Object.keys(results).length
  const score = Object.values(results).filter(Boolean).length
  const progress = Math.round((answeredCount / lesson26ReviewQuestions.length) * 100)
  const isComplete = activeIndex >= lesson26ReviewQuestions.length
  const checkedCount = Object.values(selfChecks).filter(Boolean).length

  const updateAnswer = (id, value) => {
    setAnswers((current) => ({ ...current, [id]: value }))
  }

  const isCorrect = (question) => {
    const value = answers[question.id]
    if (question.type === 'single') return value === question.answer
    if (question.type === 'multi') {
      const selected = Object.keys(value || {}).filter((key) => value[key]).sort()
      const correct = [...question.answer].sort()
      return selected.length === correct.length && correct.every((item, index) => item === selected[index])
    }
    if (question.type === 'numeric') {
      const numeric = Number(String(value || '').replace(',', '.').match(/-?\d+(\.\d+)?/)?.[0])
      return Number.isFinite(numeric) && Math.abs(numeric - question.answer) <= 0.03
    }
    return false
  }

  const submitAnswer = () => {
    const correct = isCorrect(activeQuestion)
    setResults((current) => ({ ...current, [activeQuestion.id]: correct }))
    playLessonTone(correct ? 'correct' : 'wrong')
  }

  const goNext = () => {
    setActiveIndex((current) => current + 1)
  }

  const currentResult = activeQuestion ? results[activeQuestion.id] : undefined

  return (
    <>
      <article className="review-quest-card lesson26-review-card">
        <div className="review-quest-header">
          <div>
            <span className="review-quest-kicker"><b>AI</b> Quiz ôn tập cuối bài</span>
            <h2>Kiểm tra nhanh sau thí nghiệm pin điện hoá</h2>
            <p>Trả lời từng câu để tự kiểm tra cách lắp mạch, xử lí số liệu và đọc đồ thị U-I.</p>
          </div>
          <div className="review-score-orb">
            <strong>{score}</strong>
            <span>điểm</span>
          </div>
        </div>

        <div className="review-progress" aria-label="Tiến trình hoàn thành quiz">
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="review-progress-meta">
          <span>{answeredCount}/{lesson26ReviewQuestions.length} câu</span>
          <strong>{progress}%</strong>
        </div>

        {!isComplete ? (
          <section className={`quest-question ${currentResult === false ? 'quest-question--wrong' : ''}`} key={activeQuestion.id}>
            <div className="quest-question-top">
              <span>{activeQuestion.badge}</span>
              <strong>Câu {activeIndex + 1}</strong>
            </div>
            <h3>{activeQuestion.prompt}</h3>

            {(activeQuestion.type === 'single' || activeQuestion.type === 'multi') && (
              <div className="quest-options quest-options--grid">
                {activeQuestion.options.map((option) => (
                  <button
                    className={
                      activeQuestion.type === 'single'
                        ? answers[activeQuestion.id] === option.id ? 'quest-option quest-option--active' : 'quest-option'
                        : answers[activeQuestion.id]?.[option.id] ? 'quest-option quest-option--active' : 'quest-option'
                    }
                    disabled={currentResult !== undefined}
                    key={option.id}
                    type="button"
                    onClick={() => {
                      if (activeQuestion.type === 'single') {
                        updateAnswer(activeQuestion.id, option.id)
                      } else {
                        updateAnswer(activeQuestion.id, { ...(answers[activeQuestion.id] || {}), [option.id]: !answers[activeQuestion.id]?.[option.id] })
                      }
                    }}
                  >
                    <span />
                    {option.text}
                  </button>
                ))}
              </div>
            )}

            {activeQuestion.type === 'numeric' && (
              <div className="quest-write">
                <textarea
                  disabled={currentResult !== undefined}
                  value={answers[activeQuestion.id] || ''}
                  onChange={(event) => updateAnswer(activeQuestion.id, event.target.value)}
                  placeholder={`Nhập đáp án (${activeQuestion.suffix})...`}
                />
              </div>
            )}

            {currentResult !== undefined && (
              <div className={currentResult ? 'quest-feedback quest-feedback--correct' : 'quest-feedback quest-feedback--wrong'}>
                <strong>{currentResult ? 'Chính xác' : 'Chưa đúng'}</strong>
                <p>{activeQuestion.explain}</p>
              </div>
            )}

            <div className="quest-actions">
              {currentResult === undefined ? (
                <button className="quest-primary" type="button" onClick={submitAnswer}>Kiểm tra</button>
              ) : (
                <button className="quest-primary" type="button" onClick={goNext}>{activeIndex === lesson26ReviewQuestions.length - 1 ? 'Xem điểm' : 'Câu tiếp theo'}</button>
              )}
            </div>
          </section>
        ) : (
          <section className="quest-summary">
            <span>Quiz đã hoàn thành</span>
            <h3>{score}/{lesson26ReviewQuestions.length} câu đúng</h3>
            <strong>{Math.round((score / lesson26ReviewQuestions.length) * 100)}%</strong>
            <p>{score >= 5 ? 'Em đã nắm tốt cách đo và đọc đồ thị của nguồn điện.' : 'Em nên xem lại cách mắc mạch, công thức U = E - rI và ý nghĩa đồ thị U-I.'}</p>
          </section>
        )}
      </article>

      <article className="restored-card self-check lesson26-self-review">
        <div className="lesson26-self-head">
          <span>Tự đánh giá</span>
          <h3>Nhận xét mức độ hoàn thành bài thực hành</h3>
          <p>Đánh dấu những việc em đã tự làm được sau khi hoàn thành phòng lab.</p>
        </div>
        <div className="lesson26-self-progress" aria-label={`Đã tự đánh giá ${checkedCount} trên ${lesson26SelfChecks.length} tiêu chí`}>
          <span style={{ width: `${(checkedCount / lesson26SelfChecks.length) * 100}%` }} />
        </div>
        {lesson26SelfChecks.map(([key, label]) => (
          <label className="soft-checkbox" key={key}>
            <input checked={Boolean(selfChecks[key])} onChange={() => setSelfChecks((current) => ({ ...current, [key]: !current[key] }))} type="checkbox" />
            <span>{label}</span>
          </label>
        ))}
        <strong>{checkedCount}/{lesson26SelfChecks.length} tiêu chí đã hoàn thành</strong>
      </article>
    </>
  )
}

function Lesson26BatteryLab() {
  const [started, setStarted] = useState(false)
  const [quantityAnswer, setQuantityAnswer] = useState('')
  const [circuitChoice, setCircuitChoice] = useState('')
  const [guideMode, setGuideMode] = useState('hint')
  const [answerImageMissing, setAnswerImageMissing] = useState(false)
  const [newBatteryRows, setNewBatteryRows] = useState(() => createLesson26Rows('new-battery'))
  const [oldBatteryRows, setOldBatteryRows] = useState(() => createLesson26Rows('old-battery'))
  const [lineDrawn, setLineDrawn] = useState(false)
  const [relationAnswer, setRelationAnswer] = useState('')
  const [extendedLine, setExtendedLine] = useState(false)
  const [compareAnswer, setCompareAnswer] = useState('')
  const [finished, setFinished] = useState(false)
  const toolsRef = useRef(null)
  const quantityPromptRef = useRef(null)
  const circuitPromptRef = useRef(null)
  const dataLabRef = useRef(null)
  const graphPromptRef = useRef(null)

  const circuitReady = circuitChoice === 'series'
  const parseRows = (rows, series) =>
    rows
      .map((item, index) => ({
      ...item,
      index,
      series,
      uValue: Number.parseFloat(String(item.u).replace(',', '.')),
      iValue: Number.parseFloat(String(item.i).replace(',', '.')),
      }))
      .filter((item) => Number.isFinite(item.uValue) && Number.isFinite(item.iValue))
  const newMeasurements = parseRows(newBatteryRows, 'new')
  const oldMeasurements = parseRows(oldBatteryRows, 'old')
  const validMeasurements = [...newMeasurements, ...oldMeasurements]
  const enoughData = validMeasurements.length >= 3
  const iValues = validMeasurements.map((item) => item.iValue)
  const uValues = validMeasurements.map((item) => item.uValue)
  const iMin = iValues.length ? Math.min(...iValues, 0) : 0
  const iMax = iValues.length ? Math.max(...iValues, 100) : 100
  const uMin = uValues.length ? Math.min(...uValues) - 0.03 : 1.35
  const uMax = uValues.length ? Math.max(...uValues) + 0.03 : 1.65
  const mapToPoints = (items) =>
    items.map((item) => ({
      ...item,
      x: 70 + ((item.iValue - iMin) / Math.max(1, iMax - iMin)) * 390,
      y: 240 - ((item.uValue - uMin) / Math.max(0.01, uMax - uMin)) * 175,
    }))
  const newPoints = mapToPoints(newMeasurements)
  const oldPoints = mapToPoints(oldMeasurements)
  const points = [...newPoints, ...oldPoints]
  const createTrendPath = (items) => {
    const sortedPoints = [...items].sort((a, b) => a.iValue - b.iValue)
    return sortedPoints.length >= 2
    ? `M${sortedPoints[0].x} ${sortedPoints[0].y}L${sortedPoints[sortedPoints.length - 1].x} ${sortedPoints[sortedPoints.length - 1].y}`
    : ''
  }
  const newTrendPath = createTrendPath(newPoints)
  const oldTrendPath = createTrendPath(oldPoints)

  const updateMeasurement = (setRows, rowId, field, value) => {
    setRows((current) =>
      current.map((item) => (item.id === rowId ? { ...item, [field]: value } : item)),
    )
  }

  const addMeasurementRow = (setRows, prefix) => {
    setRows((current) => [...current, { id: `${prefix}-${Date.now()}`, r: '', u: '', i: '' }])
  }

  const scrollToCard = (targetRef) => {
    targetRef.current?.scrollIntoView({ block: 'start' })
  }

  useEffect(() => {
    if (quantityAnswer) {
      window.setTimeout(() => circuitPromptRef.current?.scrollIntoView({ block: 'start' }), 120)
    }
  }, [quantityAnswer])

  useEffect(() => {
    if (circuitReady) {
      window.setTimeout(() => dataLabRef.current?.scrollIntoView({ block: 'start' }), 180)
    }
  }, [circuitReady])

  useEffect(() => {
    if (enoughData) {
      window.setTimeout(() => graphPromptRef.current?.scrollIntoView({ block: 'start' }), 180)
    }
  }, [enoughData])

  const chooseQuantity = (value) => {
    setQuantityAnswer(value)
    playLessonTone(value === 'both' ? 'correct' : 'wrong')
  }

  const chooseCircuit = (value) => {
    setCircuitChoice(value)
    playLessonTone(value === 'series' ? 'correct' : 'wrong')
  }

  const renderMeasurementTable = (title, tone, rows, setRows, prefix) => (
    <div className={`lesson26-edit-table lesson26-edit-table--${tone}`}>
      <strong>{title}</strong>
      <div><span>Lần đo</span><span>R (Ω)</span><span>U (V)</span><span>I (mA)</span></div>
      {rows.map((item, index) => (
        <div key={item.id}>
          <span>{index + 1}</span>
          <input value={item.r} inputMode="decimal" onChange={(event) => updateMeasurement(setRows, item.id, 'r', event.target.value)} aria-label={`${title} điện trở lần đo ${index + 1}`} />
          <input value={item.u} inputMode="decimal" onChange={(event) => updateMeasurement(setRows, item.id, 'u', event.target.value)} aria-label={`${title} hiệu điện thế lần đo ${index + 1}`} />
          <input value={item.i} inputMode="decimal" onChange={(event) => updateMeasurement(setRows, item.id, 'i', event.target.value)} aria-label={`${title} cường độ dòng điện lần đo ${index + 1}`} />
        </div>
      ))}
      <button type="button" onClick={() => addMeasurementRow(setRows, prefix)}>Thêm dòng đo</button>
    </div>
  )

  return (
    <section className={finished ? 'lesson26-lab lesson26-lab--finished' : 'lesson26-lab'}>
      <div className="lesson26-bg" aria-hidden="true"><i /><i /><i /><i /><i /></div>

      {!started ? (
        <article className="lesson26-hero">
          <div className="lesson26-hero-copy">
            <span>Bài 26</span>
            <h1>Tại sao pin cũ vẫn còn điện nhưng thiết bị hoạt động yếu hơn?</h1>
            <p className="lesson26-delayed">Liệu có cách nào kiểm tra được trạng thái của pin bằng thí nghiệm?</p>
            <button type="button" onClick={() => setStarted(true)}>Bắt đầu khám phá</button>
          </div>
          <div className="lesson26-real-scene" aria-hidden="true">
            <div className="lesson26-battery lesson26-battery--new"><b>PIN MỚI</b><i /></div>
            <div className="lesson26-battery lesson26-battery--old"><b>PIN CŨ</b><i /></div>
            <div className="lesson26-remote"><span /><span /><span /><span /></div>
            <div className="lesson26-toycar"><i /><b /><em /></div>
          </div>
        </article>
      ) : (
        <>
          <div className="lesson26-timeline" aria-label="Hành trình khám phá">
            {[
              ['quan sát', toolsRef],
              ['lắp mạch', circuitPromptRef],
              ['đo đạc', dataLabRef],
              ['đồ thị', graphPromptRef],
              ['pin mới - pin cũ', null],
            ].map(([item, targetRef], index) => (
              <button
                className={index <= Math.min(4, 1 + validMeasurements.length) ? 'is-lit' : ''}
                disabled={!targetRef || (index === 1 && !quantityAnswer) || (index === 2 && !circuitReady) || (index === 3 && !enoughData)}
                key={item}
                type="button"
                onClick={() => targetRef && scrollToCard(targetRef)}
              >
                {item}
              </button>
            ))}
          </div>

          <article className="lesson26-workbench" ref={toolsRef}>
            <div className="lesson26-bench-head">
              <span>AI physics lab</span>
              <h2>Bàn thí nghiệm đã mở, từng dụng cụ đang được đặt vào đúng vị trí.</h2>
            </div>
            <div className="lesson26-tool-grid">
              {lesson26Tools.map(([id, name, note], index) => (
                <button className={`lesson26-tool lesson26-tool--${id}`} style={{ '--delay': `${index * 90}ms` }} key={id} type="button">
                  <i />
                  <strong>{name}</strong>
                  <small>{note}</small>
                </button>
              ))}
            </div>
          </article>

          <article className="lesson26-question-card" ref={quantityPromptRef}>
            <h2>Muốn biết pin hoạt động mạnh hay yếu, ta cần đo các đại lượng nào?</h2>
            <div className="lesson26-choice-row">
              {[
                ['u', 'U'],
                ['i', 'I'],
                ['both', 'Cả U và I'],
              ].map(([value, label]) => (
                <button className={quantityAnswer === value ? 'is-selected' : ''} key={value} type="button" onClick={() => chooseQuantity(value)}>
                  {label}
                </button>
              ))}
            </div>
            {quantityAnswer && (
              <p className={quantityAnswer === 'both' ? 'lesson26-feedback is-correct' : 'lesson26-feedback'}>
                {quantityAnswer === 'both'
                  ? 'Đúng hướng. Cặp số U và I sẽ để lại dấu vết trên đồ thị.'
                  : 'Chưa đủ. Một phép đo riêng lẻ chưa cho thấy pin thay đổi thế nào khi có dòng điện.'}
              </p>
            )}
            {quantityAnswer === 'both' && (
              <button className="lesson26-next-btn" type="button" onClick={() => circuitPromptRef.current?.scrollIntoView({ block: 'start' })}>
                Tiếp tục lắp mạch
              </button>
            )}
          </article>

          {quantityAnswer === 'both' && (
            <article className="lesson26-circuit-card" ref={circuitPromptRef}>
              <div>
                <h2>Bây giờ hãy thử lắp mạch điện để kiểm tra pin.</h2>
              </div>
              <div className="lesson26-schemes">
                {[
                  ['parallel', 'A và V cùng song song'],
                  ['series', 'A nối tiếp, V song song'],
                  ['missing', 'Thiếu biến trở'],
                ].map(([value, label]) => (
                  <button className={circuitChoice === value ? 'is-selected' : ''} key={value} type="button" onClick={() => chooseCircuit(value)}>
                    <span className={`lesson26-mini-circuit lesson26-mini-circuit--${value}`} />
                    <strong>{label}</strong>
                  </button>
                ))}
              </div>
              {circuitReady && <div className="lesson26-ready">Mạch đã sẵn sàng cho thí nghiệm.</div>}
            </article>
          )}

          {circuitReady && (
            <article className="lesson26-data-card" ref={dataLabRef}>
              <div className="lesson26-data-head">
                <div>
                  <span>Dữ liệu thực nghiệm</span>
                  <h2>Nhập các số đo U và I, đồ thị sẽ hiện ngay bên cạnh.</h2>
                </div>
              </div>
              <div className="lesson26-data-workspace">
                <div className="lesson26-phet-stack">
                  <div className="lesson26-guide-card">
                    <div className="lesson26-guide-head">
                      <div>
                        <span>Hướng dẫn PhET</span>
                        <h2>Hướng dẫn lắp mạch đo suất điện động và điện trở trong của pin</h2>
                      </div>
                      <div className="lesson26-guide-tabs">
                        <button className={guideMode === 'hint' ? 'is-active' : ''} type="button" onClick={() => setGuideMode('hint')}>Gợi ý lắp mạch</button>
                        <button className={guideMode === 'answer' ? 'is-active' : ''} type="button" onClick={() => setGuideMode('answer')}>Hiện đáp án</button>
                      </div>
                    </div>

                    {guideMode === 'hint' ? (
                      <div className="lesson26-guide-hint">
                        <div className="lesson26-part-list">
                          {[
                            ['Pin điện', '1 pin điện'],
                            ['Ampe kế', '1 ampe kế'],
                            ['Vôn kế', '1 vôn kế'],
                            ['Điện trở', '1 điện trở'],
                            ['Dây nối', 'Dây nối'],
                          ].map(([name, label]) => (
                            <div className="lesson26-part-pill" key={name}>
                              <Icon name={name === 'Pin điện' ? 'battery' : name === 'Điện trở' ? 'ohm' : name === 'Dây nối' ? 'bolt' : 'bar'} />
                              <span>{label}</span>
                            </div>
                          ))}
                        </div>
                        <div className="lesson26-guide-steps">
                          {[
                            'Kéo pin vào vùng làm việc.',
                            'Mắc ampe kế nối tiếp với mạch.',
                            'Mắc điện trở nối tiếp với ampe kế.',
                            'Mắc vôn kế song song hai đầu nguồn.',
                            'Nối dây để tạo thành mạch kín.',
                          ].map((step, index) => (
                            <div className="lesson26-guide-step" style={{ '--i': index }} key={step}>
                              <b>{index + 1}</b>
                              <p>{step}</p>
                            </div>
                          ))}
                        </div>
                        <div className="lesson26-guide-note">
                          <strong>Lưu ý</strong>
                          <span>Ampe kế mắc nối tiếp.</span>
                          <span>Vôn kế mắc song song.</span>
                          <span>Đóng công tắc sau khi kiểm tra mạch.</span>
                        </div>
                      </div>
                    ) : (
                      <div className="lesson26-answer-card">
                        {!answerImageMissing && (
                          <img src={machImage} alt="Sơ đồ mạch tham khảo" onError={() => setAnswerImageMissing(true)} />
                        )}
                        {answerImageMissing && <div className="lesson26-answer-placeholder">Thêm ảnh sơ đồ mạch tại đây</div>}
                        <p>Sơ đồ mạch tham khảo.</p>
                      </div>
                    )}
                  </div>
                  <div className="lesson26-phet-shell">
                    <iframe
                      className="lesson26-phet-frame"
                      src="https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_all.html"
                      title="PhET Circuit Construction Kit DC"
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="lesson26-data-bottom">
                  <div className="lesson26-recorder">
                    <div className="lesson26-table-pair">
                      {renderMeasurementTable('Pin mới', 'new', newBatteryRows, setNewBatteryRows, 'new-battery')}
                      {renderMeasurementTable('Pin cũ', 'old', oldBatteryRows, setOldBatteryRows, 'old-battery')}
                    </div>
                    <div className="lesson26-table-graph">
                      <svg className="lesson26-chart lesson26-chart--compact" viewBox="0 0 520 300" role="img" aria-label="Đồ thị U theo I từ bảng nhập liệu">
                        <path className="axis" d="M70 245H470M70 245V45" />
                        <text x="462" y="270">I</text>
                        <text x="42" y="55">U</text>
                        <path className="grid" d="M70 200H470M70 155H470M70 110H470M160 245V45M250 245V45M340 245V45M430 245V45" />
                        {newPoints.map((point, index) => <circle className="data-dot data-dot--new" style={{ '--delay': `${index * 80}ms` }} cx={point.x} cy={point.y} r="7" key={point.id} />)}
                        {oldPoints.map((point, index) => <circle className="data-dot data-dot--old" style={{ '--delay': `${index * 80}ms` }} cx={point.x} cy={point.y} r="7" key={point.id} />)}
                        {newTrendPath && <path className="trend-line trend-line--live trend-line--new" d={newTrendPath} />}
                        {oldTrendPath && <path className="trend-line trend-line--live trend-line--old" d={oldTrendPath} />}
                        <g className="chart-legend">
                          <circle className="data-dot--new" cx="330" cy="36" r="6" />
                          <text x="342" y="41">Pin mới</text>
                          <circle className="data-dot--old" cx="410" cy="36" r="6" />
                          <text x="422" y="41">Pin cũ</text>
                        </g>
                        {!points.length && <text className="chart-placeholder" x="138" y="150">Nhập U và I để vẽ đồ thị</text>}
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )}

          {enoughData && (
            <article className="lesson26-graph-card" ref={graphPromptRef}>
              <div className="lesson26-graph-copy">
                <h2>Liệu giữa U và I có mối liên hệ nào không?</h2>
                <p>Các điểm đo đang tự hiện lên. Hãy tìm đường đi gần đúng của chúng.</p>
                <button type="button" onClick={() => setLineDrawn(true)}>Vẽ đường gần đúng</button>
              </div>
              <svg className={lineDrawn ? 'lesson26-chart lesson26-chart--line' : 'lesson26-chart'} viewBox="0 0 520 300" role="img" aria-label="Đồ thị U theo I">
                <path className="axis" d="M70 245H470M70 245V45" />
                <text x="462" y="270">I</text>
                <text x="42" y="55">U</text>
                <path className="grid" d="M70 200H470M70 155H470M70 110H470M160 245V45M250 245V45M340 245V45M430 245V45" />
                {newPoints.map((point, index) => <circle className="data-dot data-dot--new" style={{ '--delay': `${index * 130}ms` }} cx={point.x} cy={point.y} r="7" key={point.id} />)}
                {oldPoints.map((point, index) => <circle className="data-dot data-dot--old" style={{ '--delay': `${index * 130}ms` }} cx={point.x} cy={point.y} r="7" key={point.id} />)}
                {lineDrawn && newTrendPath && <path className="trend-line trend-line--new" d={newTrendPath} />}
                {lineDrawn && oldTrendPath && <path className="trend-line trend-line--old" d={oldTrendPath} />}
                {extendedLine && (
                  <>
                    <path className="extend-line" d="M70 55L82 60" />
                    <circle className="emf-point" cx="70" cy="55" r="10" />
                    <text className="emf-label" x="84" y="50">U = ℰ</text>
                  </>
                )}
              </svg>
            </article>
          )}

          {lineDrawn && (
            <article className="lesson26-insight-card">
              <h2>Khi cường độ dòng điện tăng, hiệu điện thế mạch ngoài thay đổi như thế nào?</h2>
              <div className="lesson26-choice-row">
                {[
                  ['up', 'tăng'],
                  ['down', 'giảm'],
                  ['same', 'không đổi'],
                ].map(([value, label]) => (
                  <button className={relationAnswer === value ? 'is-selected' : ''} key={value} type="button" onClick={() => setRelationAnswer(value)}>
                    {label}
                  </button>
                ))}
              </div>
              {relationAnswer && (
                <div className="lesson26-formula-flow">
                  <p>U giảm dần khi I tăng.</p>
                  <button type="button" onClick={() => setExtendedLine(true)}>Kéo dài đến I = 0</button>
                  {extendedLine && (
                    <div className="lesson26-emf-reveal">
                      <strong>Khi I = 0: U = ℰ</strong>
                      <b>U = ℰ - rI</b>
                      <span>ℰ cho biết khả năng cung cấp điện của nguồn. r thể hiện sự cản trở bên trong pin.</span>
                    </div>
                  )}
                </div>
              )}
            </article>
          )}

          {extendedLine && (
            <article className="lesson26-compare-card">
              <div>
                <h2>Quan sát hai đường đặc trưng của pin mới và pin cũ.</h2>
                <p>Đường nào dốc xuống mạnh hơn thì điện trở trong lớn hơn.</p>
              </div>
              <div className="lesson26-dual-graph">
                <span className="new-line">pin mới</span>
                <span className="old-line">pin cũ</span>
              </div>
              <div className="lesson26-choice-row">
                {[
                  ['new', 'Pin mới'],
                  ['old', 'Pin cũ'],
                ].map(([value, label]) => (
                  <button className={compareAnswer === value ? 'is-selected' : ''} key={value} type="button" onClick={() => setCompareAnswer(value)}>
                    {label}
                  </button>
                ))}
              </div>
              {compareAnswer && (
                <p className="lesson26-feedback is-correct">
                  Pin cũ thường có điện trở trong lớn hơn, nên hoạt động yếu hơn dù vẫn còn điện.
                </p>
              )}
            </article>
          )}

          {compareAnswer && (
            <>
              <article className="lesson26-finish-card">
                <h2>Hôm nay bạn vừa hoàn thành một thí nghiệm vật lí thực sự.</h2>
                <div>
                  {lesson26Completion.map((item) => <span key={item}>✓ {item}</span>)}
                </div>
                <button type="button" onClick={() => setFinished(true)}>Hoàn thành lab</button>
              </article>
              <article className="lesson26-real-card">
                <div><Icon name="battery" /><strong>pin điện thoại</strong></div>
                <div><Icon name="bolt" /><strong>xe điện</strong></div>
                <div><Icon name="document" /><strong>laptop</strong></div>
                <p>Các thiết bị hiện đại đều cần nguồn điện có suất điện động phù hợp và điện trở trong nhỏ để hoạt động hiệu quả.</p>
              </article>
              <Lesson26FinalReview />
            </>
          )}
        </>
      )}
    </section>
  )
}

const REVIEW_STORAGE_KEY = `${STORAGE_KEY}:electric-repair-game`

const formulaHintsByTopic = [
  ['nhiệt lượng', 'Q = mcΔt'],
  ['công suất', 'P = A/t = UI'],
  ['định luật ohm', 'I = U/R'],
  ['điện năng', 'A = UIt'],
  ['điện trở tương đương', 'Rnt = R1 + R2; 1/Rss = 1/R1 + 1/R2'],
  ['suất điện động', 'ξ = A/q hoặc ξ = U + Ir'],
]

const classifyPhysicsExercise = (exercise) => {
  const stepCount = (exercise.method?.length || 0) + (exercise.solution?.length || 0)
  const difficulty = Number(exercise.difficulty || 1)

  if (difficulty >= 5 || stepCount >= 10) return 'advanced'
  if (difficulty >= 4 || stepCount >= 8) return 'strong'
  if (difficulty >= 3 || stepCount >= 5) return 'medium'
  return 'basic'
}

const reviewLevelLabel = {
  basic: 'Cơ bản',
  medium: 'Trung bình',
  strong: 'Khá',
  advanced: 'Nâng cao',
}

const repairStationBlueprints = [
  {
    id: 'boot',
    name: 'Khởi động hệ thống',
    tagline: 'Bảng điều khiển vừa mất tín hiệu. Khôi phục các phép đo nền để cấp nguồn trở lại.',
    success: 'Đèn báo nguồn đã sáng trở lại.',
    failure: 'Đồng hồ đo vẫn chưa hoạt động. Có lẽ bạn nên kiểm tra lại quan hệ giữa các đại lượng.',
    icon: 'bolt',
  },
  {
    id: 'heat',
    name: 'Trạm gia nhiệt',
    tagline: 'Một bình nước trong phòng thí nghiệm cần được đun nóng để kích hoạt hệ thống.',
    success: 'Buồng gia nhiệt đã đạt ngưỡng kích hoạt.',
    failure: 'Thanh nhiệt vẫn nguội. Hãy rà lại nhiệt lượng, công suất và thời gian.',
    icon: 'bulb',
  },
  {
    id: 'resistor',
    name: 'Trạm điện trở',
    tagline: 'Kỹ sư trưởng làm mất nhãn điện trở. Bạn cần suy luận từ cách mắc mạch.',
    success: 'Cụm điện trở đã được định danh.',
    failure: 'Cầu chì vẫn chưa hoạt động. Thiếu một bước suy luận về mạch nối tiếp hoặc song song.',
    icon: 'ohm',
  },
  {
    id: 'source',
    name: 'Nguồn điện bí ẩn',
    tagline: 'Nguồn cấp chính dao động bất thường. Hãy tìm suất điện động, điện trở trong hoặc hiệu suất.',
    success: 'Nguồn điện đã ổn định trở lại.',
    failure: 'Bộ nguồn vẫn báo lỗi. Hãy kiểm tra lại quan hệ giữa U, I, r và ξ.',
    icon: 'battery',
  },
  {
    id: 'lab',
    name: 'Phòng thí nghiệm mạch điện',
    tagline: 'Khu đo đạc yêu cầu quan sát dữ kiện trước khi kết luận đại lượng cần tìm.',
    success: 'Thiết bị đo đã ghi nhận tín hiệu hợp lệ.',
    failure: 'Mẫu đo chưa khớp. Bạn đang đi đúng hướng, nhưng cần đọc lại dữ kiện.',
    icon: 'flask',
  },
  {
    id: 'engineer',
    name: 'Thử thách kỹ sư',
    tagline: 'Các lỗi cuối cùng cần lập phương trình và phối hợp nhiều công thức.',
    success: 'Trạm điện đã được khôi phục.',
    failure: 'Mạch chính chưa thông. Hãy mở thêm gợi ý nếu cần lập hệ phương trình.',
    icon: 'trophy',
  },
]

const stationPriorityIds = {
  heat: ['IV.20'],
  resistor: ['IV.5', 'IV.6', 'IV.7', 'IV.8', 'IV.21'],
  source: ['IV.9', 'IV.10', 'IV.11', 'IV.12', 'IV.13', 'IV.22', 'IV.23'],
  lab: ['IV.17', 'IV.18'],
  engineer: ['IV.24', 'IV.25', 'IV.26'],
}

const shuffleItems = (items) => [...items].sort(() => Math.random() - 0.5)

const getExerciseById = (id) => physicsBank.find((exercise) => exercise.id === id)

const compactQuestion = (question) =>
  question
    .split('\n')
    .filter((line) => !/^[A-D]\./.test(line.trim()))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()

const getQuestionParts = (question) => {
  const source = compactQuestion(question)
  const markers = [...source.matchAll(/(?:^|\s)([a-d])\)\s*/gi)]

  if (markers.length < 2) {
    return {
      stem: source,
      parts: [],
    }
  }

  return {
    stem: source.slice(0, markers[0].index).trim(),
    parts: markers.map((marker, index) => {
      const start = marker.index + marker[0].length
      const end = markers[index + 1]?.index ?? source.length

      return {
        key: marker[1].toUpperCase(),
        prompt: source.slice(start, end).trim(),
      }
    }),
  }
}

const getQuestionOptions = (question) =>
  question
    .split('\n')
    .map((line) => line.trim().match(/^([A-D])\.\s*(.+)$/))
    .filter(Boolean)
    .map((match) => ({
      key: match[1],
      text: match[2].trim(),
    }))

const graphChoiceOptions = [
  { id: 'origin-line', label: 'Đường thẳng đi qua gốc tọa độ' },
  { id: 'decreasing-line', label: 'Đường thẳng giảm dần' },
  { id: 'horizontal-line', label: 'Đường nằm ngang' },
  { id: 'curved-line', label: 'Đường cong' },
]

const isGraphExercise = (exercise) =>
  normalizeText(`${exercise.topic} ${exercise.question}`).includes('ve do thi') ||
  normalizeText(`${exercise.topic} ${exercise.question}`).includes('do thi')

const getGraphAnswer = (exercise) => {
  const source = normalizeText(`${exercise.final_answer || ''} ${(exercise.solution || []).join(' ')}`)

  if (source.includes('di qua goc')) return 'origin-line'
  if (source.includes('giam') || source.includes('doc am')) return 'decreasing-line'
  if (source.includes('khong doi') || source.includes('nam ngang')) return 'horizontal-line'
  return 'origin-line'
}

const isGraphAnswerCorrect = (exercise, value) =>
  isGraphExercise(exercise) && value === getGraphAnswer(exercise)

const getExerciseImage = (exercise) => exercise.imageUrl || exercise.image || exercise.mediaUrl || ''

const getImportantData = (exercise) => {
  const numbers = compactQuestion(exercise.question).match(/(?:\d+[,.]?\d*|\d+\.\d+)(?:\s*\.?\s*10\^?-?\d+)?\s*(?:A|V|Ω|C|J|W|mJ|s|phút|kg|mL|mm\^2|m\/s|kg\/m\^3)?/g)

  return numbers?.slice(0, 5).join('; ') || 'Đọc kỹ các số liệu xuất hiện trong bảng điều khiển.'
}

const getFormulaHint = (exercise) => {
  const source = normalizeText(`${exercise.topic} ${exercise.question} ${(exercise.method || []).join(' ')}`)
  const matched = formulaHintsByTopic.find(([keyword]) => source.includes(normalizeText(keyword)))

  if (matched) return matched[1]

  const formulaLine = (exercise.method || []).find((line) => /[=ξΔ]/.test(line))
  return formulaLine || 'Xác định đại lượng cần tìm rồi chọn công thức liên hệ trực tiếp.'
}

const getAcceptedAnswersFromText = (text) => {
  const optionMatch = text.match(/Chọn\s+([A-D])/i)
  const answers = new Set()
  const cleanAnswer = text
    .replace(/Chọn\s+[A-D]\.?/gi, '')
    .replace(/\s+/g, ' ')
    .trim()

  if (optionMatch) answers.add(optionMatch[1].toLowerCase())

  if (cleanAnswer) answers.add(normalizeText(cleanAnswer).replace(/[.。]+$/g, '').trim())

  ;[...cleanAnswer.matchAll(/-?\d+(?:[,.]\d+)?(?:\.\d+)?(?:\s*(?:A|V|C|J|W|Ω|ohm|m\/s|mm\/s|mJ))?/g)]
    .filter((match) => {
      const previousCharacter = cleanAnswer[match.index - 1] || ''
      return !/[A-Za-z]/.test(previousCharacter)
    })
    .forEach((match) => answers.add(normalizeText(match[0]).replace(/\s+/g, ' ').trim()))

  cleanAnswer
    .split(/[;]/)
    .map((part) => normalizeText(part).replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .forEach((part) => answers.add(part))

  return [...answers]
}

const getAcceptedAnswers = (exercise) => getAcceptedAnswersFromText(exercise.final_answer || '')

const normalizeAnswerValue = (value) =>
  normalizeText(String(value))
    .replace(/ohm/g, 'ω')
    .replace(/[=≈~]/g, ' ')
    .replace(/,/g, '.')
    .replace(/\s+/g, ' ')
    .trim()

const compactAnswerValue = (value) => normalizeAnswerValue(value).replace(/\s+/g, '')

const repairAnswerMatches = (value, answer) => {
  const normalizedValue = normalizeAnswerValue(value)
  const normalizedAnswer = normalizeAnswerValue(answer)
  const compactValue = compactAnswerValue(value)
  const compactAnswer = compactAnswerValue(answer)

  return (
    normalizedValue === normalizedAnswer ||
    normalizedValue.includes(normalizedAnswer) ||
    normalizedAnswer.includes(normalizedValue) ||
    compactValue === compactAnswer ||
    compactValue.includes(compactAnswer) ||
    compactAnswer.includes(compactValue)
  )
}

const isAnswerCorrect = (exercise, value) => {
  const normalizedValue = normalizeAnswerValue(value)

  if (!normalizedValue) return false

  return getAcceptedAnswers(exercise).some((answer) => repairAnswerMatches(value, answer))
}

const getPartAcceptedAnswers = (exercise, partIndex, partCount) => {
  const finalSegments = (exercise.final_answer || '')
    .split(';')
    .map((segment) => segment.trim())
    .filter(Boolean)

  if (finalSegments.length >= partCount) {
    return getAcceptedAnswersFromText(finalSegments[partIndex])
  }

  return getAcceptedAnswers(exercise)
}

const arePartAnswersCorrect = (exercise, parts, answerMap) =>
  parts.every((part, index) => {
    const normalizedValue = normalizeAnswerValue(answerMap?.[part.key] || '')

    if (!normalizedValue) return false

    return getPartAcceptedAnswers(exercise, index, parts.length).some((answer) => repairAnswerMatches(answerMap?.[part.key] || '', answer))
  })

const getStationForExercise = (exercise) => {
  const text = normalizeText(`${exercise.id} ${exercise.topic} ${exercise.question}`)

  if (stationPriorityIds.engineer.includes(exercise.id)) return 'engineer'
  if (stationPriorityIds.heat.includes(exercise.id) || text.includes('nhiet') || text.includes('toa nhiet')) return 'heat'
  if (stationPriorityIds.lab.includes(exercise.id) || getExerciseImage(exercise)) return 'lab'
  if (stationPriorityIds.source.includes(exercise.id) || text.includes('nguon') || text.includes('suat dien dong') || text.includes('acquy')) return 'source'
  if (stationPriorityIds.resistor.includes(exercise.id) || text.includes('noi tiep') || text.includes('song song') || text.includes('dien tro tuong duong')) return 'resistor'
  return 'boot'
}

const createRepairStations = () => {
  const grouped = repairStationBlueprints.reduce((result, station) => ({ ...result, [station.id]: [] }), {})

  physicsBank.forEach((exercise) => {
    grouped[getStationForExercise(exercise)].push(exercise.id)
  })

  return repairStationBlueprints
    .map((station) => ({
      id: station.id,
      missionIds: shuffleItems(grouped[station.id] || []),
    }))
    .filter((station) => station.missionIds.length > 0)
}

const createRepairGameState = () => ({
  runId: Date.now(),
  stations: createRepairStations(),
  stationIndex: 0,
  missionIndex: 0,
  score: 0,
  completedMissionIds: [],
  failedMissionIds: [],
  answers: {},
  hintsUsedByMission: {},
  wrongAttemptByMission: {},
  solutionOpenByMission: {},
  imageViewedByMission: {},
  finished: false,
  feedback: 'Hệ thống đang chờ kỹ sư điện tập sự khởi động lại các trạm.',
})

const readRepairGameState = () => {
  try {
    const saved = JSON.parse(window.localStorage.getItem(REVIEW_STORAGE_KEY) || 'null')
    const savedIds = new Set(saved?.stations?.flatMap((station) => station.missionIds) || [])
    const bankIds = new Set(physicsBank.map((exercise) => exercise.id))
    const isUsable = saved?.stations?.length && [...bankIds].every((id) => savedIds.has(id))

    return isUsable ? saved : createRepairGameState()
  } catch {
    return createRepairGameState()
  }
}

const getMissionBrief = (station, exercise) => {
  const briefs = {
    boot: `Bảng điều khiển báo lỗi ở cụm "${exercise.topic}". Nhập giá trị cần khôi phục để bật lại nguồn phụ.`,
    heat: 'Bình nước trong phòng thí nghiệm cần đạt mức nhiệt kích hoạt. Hãy xử lý số liệu để đưa thanh nhiệt về đúng công suất.',
    resistor: 'Nhãn điện trở bị cháy mất. Hãy suy luận từ cách mắc mạch để hệ thống nhận diện lại linh kiện.',
    source: 'Nguồn cấp đang dao động. Hãy xác định đại lượng còn thiếu để bộ ổn áp ngừng cảnh báo.',
    lab: 'Khu đo đạc chỉ chấp nhận kết quả sau khi bạn quan sát dữ kiện và xác định đúng đại lượng cần tìm.',
    engineer: 'Lỗi cuối cùng nằm trong mạch chính. Hãy lập luận đủ bước để mở khóa rơ-le an toàn.',
  }

  return briefs[station.id]
}

const getHintDeck = (stationId, exercise) => {
  const method = exercise.method || []
  const dataHint = `Dữ kiện quan trọng: ${getImportantData(exercise)}.`
  const formulaHint = `Công thức liên quan: ${getFormulaHint(exercise)}.`

  if (stationId === 'heat') {
    return [dataHint, formulaHint]
  }

  if (stationId === 'engineer') {
    return [
      method[0] || 'Hãy xác định đại lượng mạch ngoài trước.',
      method[1] || 'Hãy áp dụng định luật Ôm cho toàn mạch.',
      method.find((step) => normalizeText(step).includes('phuong trinh')) || method[2] || 'Hãy lập hệ phương trình từ các trạng thái của mạch.',
    ]
  }

  if (stationId === 'resistor') {
    return [
      method[0] || 'Hãy phân biệt trạng thái mắc nối tiếp và mắc song song.',
      method[1] || formulaHint,
    ]
  }

  return [
    dataHint,
    method[0] || formulaHint,
  ]
}

const getMissionScore = (hintsUsed, hadWrongAttempt) => {
  if (hadWrongAttempt) return 0
  if (hintsUsed === 0) return 100
  if (hintsUsed === 1) return 70
  return 50
}

const getEngineerRank = (score, total) => {
  const ratio = total ? score / total : 0
  if (ratio >= 0.85) return 'Chuyên gia mạch điện'
  if (ratio >= 0.65) return 'Kỹ sư'
  if (ratio >= 0.4) return 'Kỹ thuật viên'
  return 'Người mới'
}

function SourceStationGraph({ visible }) {
  if (!visible) return null

  return (
    <div className="source-graph" aria-label="Minh họa nguồn điện">
      <svg viewBox="0 0 420 220" role="img">
        <path className="source-graph-axis" d="M55 175H375M55 175V35" />
        <path className="source-graph-grid" d="M55 140H375M55 105H375M55 70H375M130 175V35M205 175V35M280 175V35" />
        <path className="source-graph-line" d="M70 55L345 160" />
        <circle cx="70" cy="55" r="7" />
        <circle cx="345" cy="160" r="7" />
        <text x="48" y="28">U</text>
        <text x="378" y="190">I</text>
        <text x="82" y="50">ξ</text>
      </svg>
      <p>Khi dòng điện tăng, hiệu điện thế mạch ngoài giảm do độ giảm thế bên trong nguồn.</p>
    </div>
  )
}

function LabCircuitPreview() {
  return (
    <div className="lab-circuit-preview" aria-hidden="true">
      <span className="lab-node lab-node--battery">ξ</span>
      <span className="lab-wire lab-wire--top" />
      <span className="lab-node lab-node--resistor">R</span>
      <span className="lab-wire lab-wire--bottom" />
      <span className="lab-node lab-node--meter">V</span>
    </div>
  )
}

function ChapterReviewContent() {
  const [gameState, setGameState] = useState(readRepairGameState)

  useEffect(() => {
    window.localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(gameState))
  }, [gameState])

  const stations = gameState.stations
  const activeStation = stations[gameState.stationIndex] || stations[0]
  const stationMeta = repairStationBlueprints.find((station) => station.id === activeStation?.id) || repairStationBlueprints[0]
  const activeMissionId = activeStation?.missionIds?.[gameState.missionIndex]
  const activeExercise = getExerciseById(activeMissionId) || getExerciseById(stations[0]?.missionIds?.[0])
  const completedCount = gameState.completedMissionIds.length
  const totalMissions = stations.reduce((total, station) => total + station.missionIds.length, 0)
  const progressValue = totalMissions ? Math.round((completedCount / totalMissions) * 100) : 0
  const missionHintsUsed = gameState.hintsUsedByMission[activeExercise?.id] || 0
  const hintDeck = activeExercise ? getHintDeck(stationMeta.id, activeExercise) : []
  const isMissionComplete = gameState.completedMissionIds.includes(activeExercise?.id)
  const needsImageObservation = Boolean(activeExercise && getExerciseImage(activeExercise) && !gameState.imageViewedByMission[activeExercise.id])
  const stationCompleted = activeStation?.missionIds?.every((id) => gameState.completedMissionIds.includes(id))
  const maxScore = totalMissions * 100
  const rank = getEngineerRank(gameState.score, maxScore)
  const questionOptions = getQuestionOptions(activeExercise.question)
  const questionParts = getQuestionParts(activeExercise.question)
  const isGraphMission = isGraphExercise(activeExercise)
  const storedAnswer = gameState.answers[activeExercise.id]
  const selectedAnswer = typeof storedAnswer === 'string' ? storedAnswer : ''
  const partAnswers = storedAnswer && typeof storedAnswer === 'object' ? storedAnswer : {}

  const updateGame = (updater) => {
    setGameState((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater
      return next
    })
  }

  const resetGame = () => setGameState(createRepairGameState())

  const setAnswer = (value) => {
    updateGame((current) => ({
      ...current,
      answers: {
        ...current.answers,
        [activeExercise.id]: value,
      },
    }))
  }

  const setPartAnswer = (partKey, value) => {
    updateGame((current) => {
      const currentAnswer = current.answers[activeExercise.id]
      const nextAnswer = currentAnswer && typeof currentAnswer === 'object' ? currentAnswer : {}

      return {
        ...current,
        answers: {
          ...current.answers,
          [activeExercise.id]: {
            ...nextAnswer,
            [partKey]: value,
          },
        },
      }
    })
  }

  const revealImage = () => {
    updateGame((current) => ({
      ...current,
      imageViewedByMission: {
        ...current.imageViewedByMission,
        [activeExercise.id]: true,
      },
      feedback: 'Bạn đã quan sát sơ đồ. Bây giờ hãy dự đoán đại lượng cần khôi phục.',
    }))
  }

  const requestHint = () => {
    updateGame((current) => {
      const currentHints = current.hintsUsedByMission[activeExercise.id] || 0
      const nextHints = Math.min(hintDeck.length, currentHints + 1)

      return {
        ...current,
        hintsUsedByMission: {
          ...current.hintsUsedByMission,
          [activeExercise.id]: nextHints,
        },
        feedback: nextHints >= 3 ? 'Gợi ý cuối đã mở. Hãy ghép các dữ kiện thành phương trình.' : 'Bạn đang đi đúng hướng.',
      }
    })
  }

  const submitAnswer = () => {
    if (!activeExercise || isMissionComplete) return

    const answer = gameState.answers[activeExercise.id] || ''
    const isCorrect = isGraphMission
      ? isGraphAnswerCorrect(activeExercise, answer)
      : questionParts.parts.length
      ? arePartAnswersCorrect(activeExercise, questionParts.parts, answer)
      : isAnswerCorrect(activeExercise, answer)

    updateGame((current) => {
      if (!isCorrect) {
        return {
          ...current,
          failedMissionIds: current.failedMissionIds.includes(activeExercise.id)
            ? current.failedMissionIds
            : [...current.failedMissionIds, activeExercise.id],
          wrongAttemptByMission: {
            ...current.wrongAttemptByMission,
            [activeExercise.id]: true,
          },
          feedback: stationMeta.failure,
        }
      }

      const earnedScore = getMissionScore(
        current.hintsUsedByMission[activeExercise.id] || 0,
        Boolean(current.wrongAttemptByMission[activeExercise.id]),
      )

      return {
        ...current,
        score: current.score + earnedScore,
        completedMissionIds: [...current.completedMissionIds, activeExercise.id],
        feedback: `${stationMeta.success} Điểm khôi phục: +${earnedScore}.`,
      }
    })
  }

  const toggleSolution = () => {
    updateGame((current) => ({
      ...current,
      solutionOpenByMission: {
        ...current.solutionOpenByMission,
        [activeExercise.id]: !current.solutionOpenByMission[activeExercise.id],
      },
    }))
  }

  const goNext = () => {
    updateGame((current) => {
      const currentStation = current.stations[current.stationIndex]
      const hasNextMission = current.missionIndex < currentStation.missionIds.length - 1
      const hasNextStation = current.stationIndex < current.stations.length - 1

      if (hasNextMission) {
        return {
          ...current,
          missionIndex: current.missionIndex + 1,
          feedback: 'Một tín hiệu mới vừa xuất hiện trên bảng điều khiển.',
        }
      }

      if (hasNextStation) {
        return {
          ...current,
          stationIndex: current.stationIndex + 1,
          missionIndex: 0,
          feedback: 'Trạm tiếp theo đã được mở khóa.',
        }
      }

      return {
        ...current,
        finished: true,
        feedback: 'Hệ thống điện đã hoạt động trở lại. Nhật ký sửa chữa đã hoàn tất.',
      }
    })
  }

  const jumpToUnlockedStation = (index) => {
    if (index > gameState.stationIndex) return

    updateGame((current) => ({
      ...current,
      stationIndex: index,
      missionIndex: 0,
      feedback: 'Đang kiểm tra lại trạm đã mở khóa.',
    }))
  }

  if (!activeExercise) {
    return (
      <div className="repair-game">
        <p>Chưa tìm thấy dữ liệu nhiệm vụ trong ngân hàng bài tập.</p>
      </div>
    )
  }

  if (gameState.finished) {
    return (
      <div className="repair-game repair-game--summary">
        <section className="repair-summary">
          <span>Nhật ký sửa chữa hoàn tất</span>
          <h2>{rank}</h2>
          <p>Điểm hệ thống: {gameState.score}/{maxScore}. Bạn đã khôi phục {completedCount}/{totalMissions} trạm thử thách trong ngân hàng dữ liệu.</p>
          <div className="repair-summary-grid">
            <article><strong>{completedCount}</strong><span>Tín hiệu đã sửa</span></article>
            <article><strong>{gameState.failedMissionIds.length}</strong><span>Lần cảnh báo lỗi</span></article>
            <article><strong>{progressValue}%</strong><span>Tiến độ</span></article>
          </div>
          <button className="repair-primary" type="button" onClick={resetGame}>Khởi động lượt chơi mới</button>
        </section>
      </div>
    )
  }

  return (
    <div className="repair-game">
      <header className="repair-hero">
        <div>
          <span>Kỹ sư điện tập sự</span>
          <h2>Sửa chữa hệ thống điện Chương IV</h2>
          <p>Vượt qua các trạm bằng chính dữ liệu từ ngân hàng bài tập. Công thức và lời giải chỉ mở khi bạn chủ động yêu cầu.</p>
        </div>
        <div className="repair-score">
          <strong>{gameState.score}</strong>
          <span>điểm</span>
        </div>
      </header>

      <div className="repair-progress" aria-label="Tiến độ sửa chữa">
        <i><b style={{ width: `${progressValue}%` }} /></i>
        <span>{completedCount}/{totalMissions} tín hiệu</span>
      </div>

      <nav className="repair-station-rail" aria-label="Các trạm thử thách">
        {stations.map((station, index) => {
          const meta = repairStationBlueprints.find((item) => item.id === station.id)
          const completedStationCount = station.missionIds.filter((id) => gameState.completedMissionIds.includes(id)).length
          const locked = index > gameState.stationIndex

          return (
            <button
              className={index === gameState.stationIndex ? 'is-active' : locked ? 'is-locked' : ''}
              disabled={locked}
              key={station.id}
              type="button"
              onClick={() => jumpToUnlockedStation(index)}
            >
              <Icon name={meta.icon} />
              <strong>{meta.name}</strong>
              <span>{completedStationCount}/{station.missionIds.length}</span>
            </button>
          )
        })}
      </nav>

      <main className="repair-stage">
        <aside className="repair-briefing">
          <div className="repair-station-icon"><Icon name={stationMeta.icon} /></div>
          <span>{reviewLevelLabel[classifyPhysicsExercise(activeExercise)]}</span>
          <h3>{stationMeta.name}</h3>
          <p>{stationMeta.tagline}</p>
          <div className="repair-feedback">{gameState.feedback}</div>
          {stationMeta.id === 'lab' && !getExerciseImage(activeExercise) && <LabCircuitPreview />}
          <SourceStationGraph visible={stationMeta.id === 'source' && isMissionComplete} />
        </aside>

        <section className="repair-console">
          {needsImageObservation ? (
            <article className="repair-observation">
              <span>Quan sát sơ đồ</span>
              <h3>Hãy quan sát hình trước khi thao tác.</h3>
              <img src={getExerciseImage(activeExercise)} alt="Sơ đồ nhiệm vụ" />
              <button className="repair-primary" type="button" onClick={revealImage}>Tôi đã quan sát</button>
            </article>
          ) : (
            <>
              <div className="repair-mission-head">
                <span>{activeExercise.topic}</span>
                <h3>{getMissionBrief(stationMeta, activeExercise)}</h3>
              </div>

              <div className="repair-question-panel">
                <p>{questionParts.stem}</p>
              </div>

              {isGraphMission && (
                <div className="repair-graph-task">
                  <div className="repair-graph-canvas" aria-label="Khung phác thảo đồ thị">
                    <svg viewBox="0 0 420 220" role="img">
                      <path className="source-graph-axis" d="M55 175H375M55 175V35" />
                      <path className="source-graph-grid" d="M55 140H375M55 105H375M55 70H375M130 175V35M205 175V35M280 175V35" />
                      {isMissionComplete && getGraphAnswer(activeExercise) === 'origin-line' && <path className="source-graph-line" d="M60 170L350 48" />}
                      {isMissionComplete && getGraphAnswer(activeExercise) === 'decreasing-line' && <path className="source-graph-line" d="M60 52L350 160" />}
                      {isMissionComplete && getGraphAnswer(activeExercise) === 'horizontal-line' && <path className="source-graph-line" d="M60 96L350 96" />}
                      {isMissionComplete && getGraphAnswer(activeExercise) === 'curved-line' && <path className="source-graph-line" d="M60 165C140 80 245 55 350 45" />}
                      <text x="42" y="32">H</text>
                      <text x="378" y="192">I</text>
                    </svg>
                    <p>{isMissionComplete ? 'Đồ thị minh họa đã được dựng sau khi trạm xác nhận đáp án.' : 'Chọn dạng đồ thị cần dựng cho hệ thống.'}</p>
                  </div>
                  <div className="repair-graph-options">
                    {graphChoiceOptions.map((option) => (
                      <button
                        className={selectedAnswer === option.id ? 'is-selected' : ''}
                        disabled={isMissionComplete}
                        key={option.id}
                        type="button"
                        onClick={() => setAnswer(option.id)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!isGraphMission && questionOptions.length > 0 && (
                <div className="repair-option-grid" aria-label="Các phương án khôi phục">
                  {questionOptions.map((option) => (
                    <button
                      className={selectedAnswer.toUpperCase() === option.key ? 'is-selected' : ''}
                      disabled={isMissionComplete}
                      key={option.key}
                      type="button"
                      onClick={() => setAnswer(option.key)}
                    >
                      <b>{option.key}</b>
                      <span>{option.text}</span>
                    </button>
                  ))}
                </div>
              )}

              {!isGraphMission && questionParts.parts.length > 0 && (
                <div className="repair-part-grid">
                  {questionParts.parts.map((part) => (
                    <label className="repair-answer-box repair-answer-box--part" key={part.key}>
                      <span>{`Ý ${part.key}: ${part.prompt}`}</span>
                      <input
                        value={partAnswers[part.key] || ''}
                        disabled={isMissionComplete}
                        onChange={(event) => setPartAnswer(part.key, event.target.value)}
                        placeholder={part.key === 'A' ? 'Nhập kết quả ý A kèm đơn vị' : `Nhập kết quả ý ${part.key} kèm đơn vị`}
                      />
                    </label>
                  ))}
                </div>
              )}

              {!isGraphMission && questionOptions.length === 0 && questionParts.parts.length === 0 && (
                <label className="repair-answer-box">
                  <span>Nhập kết quả khôi phục</span>
                  <input
                    value={selectedAnswer}
                    disabled={isMissionComplete}
                    onChange={(event) => setAnswer(event.target.value)}
                    placeholder="VD: 2,5 A hoặc r = 1 Ω; ξ = 4,5 V"
                  />
                </label>
              )}

              <div className="repair-action-row">
                <button className="repair-primary" type="button" disabled={isMissionComplete} onClick={submitAnswer}>Kích hoạt trạm</button>
                <button className="repair-secondary" type="button" disabled={missionHintsUsed >= hintDeck.length || isMissionComplete} onClick={requestHint}>
                  Gợi ý {stationMeta.id === 'engineer' ? `${missionHintsUsed}/3` : ''}
                </button>
                <button className="repair-secondary" type="button" onClick={toggleSolution}>Xem lời giải</button>
              </div>

              {missionHintsUsed > 0 && (
                <div className="repair-hint-stack">
                  {hintDeck.slice(0, missionHintsUsed).map((hint, index) => (
                    <article key={`${hint}-${index}`}>
                      <strong>Tín hiệu hỗ trợ {index + 1}</strong>
                      <p>{hint}</p>
                    </article>
                  ))}
                </div>
              )}

              {gameState.solutionOpenByMission[activeExercise.id] && (
                <div className="repair-solution">
                  <strong>Nhật ký sửa chữa từng bước</strong>
                  <ol>
                    {activeExercise.method.map((step) => <li key={`method-${step}`}>{step}</li>)}
                    {activeExercise.solution.map((step) => <li key={`solution-${step}`}>{step}</li>)}
                  </ol>
                  <b>{activeExercise.final_answer}</b>
                </div>
              )}

              {isMissionComplete && (
                <div className="repair-complete-panel">
                  <span>{stationCompleted ? 'Trạm hiện tại đã khôi phục' : 'Tín hiệu đã ổn định'}</span>
                  <button className="repair-primary" type="button" onClick={goNext}>
                    {completedCount === totalMissions ? 'Xem tổng kết' : stationCompleted ? 'Sang trạm tiếp theo' : 'Tín hiệu kế tiếp'}
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <div className="repair-footer">
        <button className="repair-secondary" type="button" onClick={resetGame}>Xáo trộn lượt chơi</button>
        <span>Toàn bộ {physicsBank.length} bài trong ngân hàng đã được đưa vào các trạm.</span>
      </div>
    </div>
  )
}

function SelfStudyMenuContent({ content, studyData, onOpenLesson, onStartExercise, onClose }) {
  const [activeLessonId, setActiveLessonId] = useState(lessonBlueprints[0].topicId)
  const [selectedGame, setSelectedGame] = useState(0)
  const [gameFeedback, setGameFeedback] = useState('Chọn một thử thách để bắt đầu.')
  const [gameStats, setGameStats] = useState([
    { score: 0, progress: 20, badge: 'Chặng 1' },
    { score: 0, progress: 0, badge: 'Sẵn sàng' },
    { score: 0, progress: 0, badge: 'Thợ săn mới' },
  ])
  const activeBlueprint = lessonBlueprints.find((lesson) => lesson.topicId === activeLessonId) || lessonBlueprints[0]
  const activeTopic = topics.find((topic) => topic.id === activeBlueprint.topicId) || topics[0]

  const playGameRound = (index, isCorrect) => {
    setSelectedGame(index)
    setGameStats((current) =>
      current.map((game, gameIndex) =>
        gameIndex === index
          ? {
              score: game.score + (isCorrect ? 10 : 0),
              progress: Math.min(100, game.progress + (isCorrect ? 20 : 10)),
              badge: game.progress + (isCorrect ? 20 : 10) >= 100 ? 'Hoàn thành' : game.badge,
            }
          : game,
      ),
    )
    setGameFeedback(isCorrect ? 'Chính xác. Bạn vừa mở thêm một mảnh kiến thức mới.' : 'Chưa đúng. Xem gợi ý rồi thử lại nhé.')
  }

  if (content.featureKey === 'overview') {
    return (
      <div className="self-menu self-menu--overview">
        <header className="self-menu-hero">
          <span>Chương IV</span>
          <h2>Dòng điện. Mạch điện</h2>
          <p>Khám phá dòng điện bằng quan sát, kéo thả, câu hỏi nhanh và bài tập ngắn. Mục tiêu là hiểu cách mạch hoạt động, không học thuộc dài dòng.</p>
        </header>
        <section className="chapter-map" aria-label="Sơ đồ tư duy toàn chương">
          {lessonBlueprints.map((lesson, index) => {
            const topic = topics.find((item) => item.id === lesson.topicId)
            return (
              <button
                className={lesson.topicId === activeLessonId ? 'chapter-node is-active' : 'chapter-node'}
                key={lesson.topicId}
                style={{ '--node-color': topic.color }}
                type="button"
                onClick={() => setActiveLessonId(lesson.topicId)}
              >
                <Icon name={topic.icon} />
                <span>{`Bài ${topic.number}`}</span>
                <strong>{topic.shortLabel}</strong>
                <i>{index + 1}</i>
              </button>
            )
          })}
        </section>
        <section className="overview-lesson-grid">
          {lessonBlueprints.map((lesson) => {
            const topic = topics.find((item) => item.id === lesson.topicId)
            return (
              <article className="overview-lesson-card" key={lesson.topicId}>
                <div className="overview-lesson-head">
                  <Icon name={topic.icon} />
                  <div>
                    <span>{`Bài ${topic.number}`}</span>
                    <h3>{topic.shortLabel}</h3>
                  </div>
                </div>
                <p>{lesson.goal}</p>
                <div className="lesson-meta-grid">
                  <span><b>Công thức</b>{lesson.formula}</span>
                  <span><b>Thời gian</b>{lesson.duration}</span>
                  <span><b>Độ khó</b>{lesson.difficulty}</span>
                </div>
                <button type="button" onClick={() => onOpenLesson(topic.id)}>Bắt đầu học</button>
              </article>
            )
          })}
        </section>
      </div>
    )
  }

  if (content.featureKey === 'lessons') {
    return (
      <div className="self-menu">
        <header className="self-menu-hero">
          <span>Bài học tương tác</span>
          <h2>Học theo 6 bước ngắn</h2>
          <p>Mỗi bài đi từ tình huống quen thuộc đến mô phỏng, phiếu học tập, bài luyện và tóm tắt.</p>
        </header>
        <div className="lesson-workspace">
          <nav className="lesson-tabs" aria-label="Chọn bài học">
            {lessonBlueprints.map((lesson) => {
              const topic = topics.find((item) => item.id === lesson.topicId)
              return (
                <button className={lesson.topicId === activeLessonId ? 'is-active' : ''} key={lesson.topicId} type="button" onClick={() => setActiveLessonId(lesson.topicId)}>
                  <span>{`Bài ${topic.number}`}</span>
                  <strong>{topic.shortLabel}</strong>
                </button>
              )
            })}
          </nav>
          <article className="lesson-path-card">
            <div className="lesson-path-head">
              <Icon name={activeTopic.icon} />
              <div>
                <span>{`Bài ${activeTopic.number}`}</span>
                <h3>{activeTopic.shortLabel}</h3>
                <p>{activeBlueprint.goal}</p>
              </div>
            </div>
            <div className="learning-steps">
              {['Khởi động', 'Khám phá', 'Hình thành kiến thức', 'Luyện tập', 'Vận dụng', 'Tóm tắt'].map((step, index) => (
                <article key={step}>
                  <b>{index + 1}</b>
                  <div>
                    <strong>{step}</strong>
                    <span>{activeBlueprint.steps[index]}</span>
                  </div>
                </article>
              ))}
            </div>
            <div className="lesson-path-actions">
              <button type="button" onClick={() => onOpenLesson(activeTopic.id)}>Mở bài tương tác</button>
              <button type="button" onClick={() => onStartExercise(activeTopic.id)}>Làm bài luyện</button>
            </div>
          </article>
        </div>
      </div>
    )
  }

  if (content.featureKey === 'games') {
    const games = [
      ['Nhà thám hiểm điện học', 'Vượt 5 chặng tương ứng 5 bài. Mỗi chặng mở một mảnh bản đồ kiến thức.', 'Dòng điện mạnh hơn thường làm bóng đèn thế nào?', 'Sáng mạnh hơn'],
      ['Đấu trường Vật lí', 'Câu hỏi ngẫu nhiên toàn chương, phản hồi đúng/sai ngay sau mỗi lượt.', 'Công thức định luật Ôm cho đoạn mạch là gì?', 'I = U/R'],
      ['Săn kho báu công thức', 'Ghép đại lượng với công thức để mở khóa huy hiệu công thức.', 'Công thức tính công suất khi biết U và I?', 'P = UI'],
    ]

    return (
      <div className="self-menu">
        <header className="self-menu-hero">
          <span>Trò chơi tổng hợp</span>
          <h2>Luyện nhanh, phản hồi ngay</h2>
          <p>Chơi từng lượt ngắn để kiểm tra hiểu bài. Sai thì nhận gợi ý, đúng thì tăng điểm và tiến trình.</p>
        </header>
        <section className="game-menu-grid">
          {games.map(([title, body, prompt, answer], index) => (
            <article className={selectedGame === index ? 'menu-game-card is-active' : 'menu-game-card'} key={title}>
              <div className="menu-game-head">
                <Icon name={index === 0 ? 'trophy' : index === 1 ? 'bolt' : 'notebook'} />
                <div><h3>{title}</h3><p>{body}</p></div>
              </div>
              <div className="menu-game-progress"><span style={{ width: `${gameStats[index].progress}%` }} /></div>
              <div className="menu-game-stats">
                <span>Điểm: <b>{gameStats[index].score}</b></span>
                <span>Huy hiệu: <b>{gameStats[index].badge}</b></span>
              </div>
              <div className="menu-game-question">
                <strong>{prompt}</strong>
                <div>
                  <button type="button" onClick={() => playGameRound(index, true)}>{answer}</button>
                  <button type="button" onClick={() => playGameRound(index, false)}>Đáp án khác</button>
                </div>
              </div>
            </article>
          ))}
        </section>
        <p className="menu-feedback">{gameFeedback}</p>
      </div>
    )
  }

  if (content.featureKey === 'review') {
    return <ChapterReviewContent onClose={onClose} />
  }

  if (content.featureKey === 'profile') {
    return (
      <div className="self-menu">
        <header className="self-menu-hero">
          <span>Hồ sơ học tập</span>
          <h2>Theo dõi đúng thứ cần cải thiện</h2>
          <p>Chỉ giữ các chỉ số giúp bạn biết đã học đến đâu, học có ổn không và cần quay lại bài nào.</p>
        </header>
        <section className="profile-metric-grid">
          <article><span>% hoàn thành</span><strong>{studyData.averageLessonProgress}%</strong></article>
          <article><span>Số bài đã học</span><strong>{studyData.completedLessons}/{topics.length}</strong></article>
          <article><span>Điểm trung bình</span><strong>{studyData.averageQuizScore}/10</strong></article>
          <article><span>Thời gian học</span><strong>{studyData.studyTimeLabel}</strong></article>
        </section>
        <section className="profile-progress-chart" aria-label="Biểu đồ tiến bộ học tập">
          {studyData.progressDetails.map((item) => (
            <div key={item.id}>
              <span>{item.title.replace('Bài ', '')}</span>
              <i><b style={{ width: `${item.progress}%` }} /></i>
              <strong>{item.progress}%</strong>
            </div>
          ))}
        </section>
        <section className="profile-badges">
          <h3>Thành tích đã mở khóa</h3>
          <div>
            {studyData.earnedBadges.map((badge) => (
              <span className={badge.unlocked ? 'is-unlocked' : ''} key={badge.key}>{badge.icon} {badge.title}</span>
            ))}
          </div>
        </section>
      </div>
    )
  }

  if (content.featureKey === 'formulas') {
    return (
      <div className="self-menu">
        <header className="self-menu-hero">
          <span>Sổ tay công thức</span>
          <h2>Công thức đi kèm cách dùng</h2>
          <p>Mỗi thẻ chỉ giữ ý nghĩa, đơn vị và một ví dụ nhanh để tra cứu khi làm bài.</p>
        </header>
        <section className="formula-card-grid">
          {formulaCards.map((item) => (
            <article className="formula-study-card" key={item.formula}>
              <Icon name={item.icon} />
              <h3>{item.formula}</h3>
              <p>{item.meaning}</p>
              <span><b>Đơn vị:</b> {item.units}</span>
              <small>{item.example}</small>
            </article>
          ))}
        </section>
      </div>
    )
  }

  return null
}

function FeatureDialog({ content, onClose, onAction, onOpenLesson, onStartExercise, studyData }) {
  const isRestoredLesson = content.lessonId === 'cuong-do-dong-dien' || content.lessonId === 'dien-tro-dinh-luat-om' || content.lessonId === 'nguon-dien' || content.lessonId === 'nang-luong-cong-suat-dien' || content.lessonId === 'thuc-hanh-pin-dien-hoa'
  const isSelfStudyMenu = ['overview', 'lessons', 'games', 'review', 'profile', 'formulas'].includes(content.featureKey)

  return (
    <section className={isRestoredLesson ? 'feature-dialog feature-dialog--lesson' : isSelfStudyMenu ? 'feature-dialog feature-dialog--self-menu' : 'feature-dialog'} aria-live="polite" aria-label={content.title}>
      <button className="dialog-close" type="button" aria-label="Đóng" onClick={onClose}>
        ×
      </button>
      {isSelfStudyMenu && (
        <SelfStudyMenuContent
          content={content}
          studyData={studyData}
          onOpenLesson={onOpenLesson}
          onStartExercise={onStartExercise}
          onClose={onClose}
        />
      )}
      {!isRestoredLesson && !isSelfStudyMenu && (
        <>
          <p>Chức năng</p>
          <h2>{content.title}</h2>
          <span>{content.body}</span>
          {content.details?.length > 0 && (
            <div className="progress-detail-list">
              {content.details.map((item) => (
                <article className="progress-detail-item" key={item.id}>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.status}</span>
                  </div>
                  <div className="progress-detail-score">
                    <b>{item.quizScore}/10</b>
                    <span>{item.progress}%</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
      {content.lessonId === 'cuong-do-dong-dien' && <Lesson22InteractiveWorksheet onAction={onAction} />}
      {content.lessonId === 'dien-tro-dinh-luat-om' && <Lesson23OhmLesson onAction={onAction} />}
      {content.lessonId === 'nguon-dien' && <Lesson24StructuredLessonV2 />}
      {content.lessonId === 'nang-luong-cong-suat-dien' && <Lesson25ElectricJourney />}
      {content.lessonId === 'thuc-hanh-pin-dien-hoa' && <Lesson26BatteryLab />}
      {!isSelfStudyMenu && content.lessonId !== 'nguon-dien' && content.lessonId !== 'dien-tro-dinh-luat-om' && content.lessonId !== 'nang-luong-cong-suat-dien' && content.lessonId !== 'thuc-hanh-pin-dien-hoa' && content.branches?.length > 0 && (
        <div className="lesson-branches">
          <strong>Nhánh học tập của bài</strong>
          <div>
            {content.branches.map((branch) => (
              <button key={branch} type="button" onClick={() => onAction(branch)}>
                {branch}
              </button>
            ))}
          </div>
        </div>
      )}
      {!isSelfStudyMenu && content.lessonId !== 'nguon-dien' && content.lessonId !== 'dien-tro-dinh-luat-om' && content.lessonId !== 'nang-luong-cong-suat-dien' && content.lessonId !== 'thuc-hanh-pin-dien-hoa' && content.actions?.length > 0 && (
        <div className="dialog-actions">
          {content.actions.map((action) => (
            <button key={action} type="button" onClick={() => onAction(action)}>
              {action}
            </button>
          ))}
        </div>
      )}
    </section>
  )
}

function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const isRegistering = mode === 'register'

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextUsername = username.trim()
    const nextPassword = password.trim()
    const nextConfirmPassword = confirmPassword.trim()
    const accounts = readAccounts()

    if (nextUsername.length < 3) {
      setError('Tên đăng nhập cần ít nhất 3 ký tự.')
      return
    }

    if (nextPassword.length < 4) {
      setError('Mật khẩu cần ít nhất 4 ký tự.')
      return
    }

    if (isRegistering) {
      if (nextPassword !== nextConfirmPassword) {
        setError('Mật khẩu nhập lại chưa khớp.')
        return
      }

      if (accounts.some((account) => account.username.toLowerCase() === nextUsername.toLowerCase())) {
        setError('Tên đăng nhập này đã tồn tại.')
        return
      }

      const account = {
        username: nextUsername,
        password: nextPassword,
        createdAt: new Date().toISOString(),
      }
      saveAccounts([...accounts, account])
      onLogin(account.username)
      return
    }

    const account = accounts.find(
      (item) => item.username.toLowerCase() === nextUsername.toLowerCase() && item.password === nextPassword,
    )

    if (!account) {
      setError('Tên đăng nhập hoặc mật khẩu chưa đúng.')
      return
    }

    onLogin(account.username)
  }

  return (
    <main className="auth-page">
      <section className="auth-panel" aria-label="Đăng nhập học sinh">
        <div className="auth-brand">
          <AtomLogo />
          <div>
            <strong>Vật lí 11</strong>
            <span>Tài khoản học sinh</span>
          </div>
        </div>

        <div className="auth-tabs" role="tablist" aria-label="Chọn chế độ tài khoản">
          <button
            className={mode === 'login' ? 'auth-tab auth-tab--active' : 'auth-tab'}
            type="button"
            onClick={() => {
              setMode('login')
              setError('')
            }}
          >
            Đăng nhập
          </button>
          <button
            className={mode === 'register' ? 'auth-tab auth-tab--active' : 'auth-tab'}
            type="button"
            onClick={() => {
              setMode('register')
              setError('')
            }}
          >
            Tạo tài khoản
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Tên đăng nhập</span>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              placeholder="VD: hoc_sinh_01"
            />
          </label>

          <label>
            <span>Mật khẩu</span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete={isRegistering ? 'new-password' : 'current-password'}
              placeholder="Nhập mật khẩu"
              type="password"
            />
          </label>

          {isRegistering && (
            <label>
              <span>Nhập lại mật khẩu</span>
              <input
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                autoComplete="new-password"
                placeholder="Nhập lại mật khẩu"
                type="password"
              />
            </label>
          )}

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-submit" type="submit">
            {isRegistering ? 'Tạo tài khoản và vào học' : 'Đăng nhập'}
          </button>
        </form>
      </section>
    </main>
  )
}

const looksLikeFormula = (value) =>
  /[=+\-×*/^]/.test(value) && /[A-ZIUQRVPt]/i.test(value)

const renderInlineText = (text) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const content = part.slice(2, -2)

      return (
        <strong className={looksLikeFormula(content) ? 'formula-token' : undefined} key={`${content}-${index}`}>
          {content}
        </strong>
      )
    }

    return <span key={`${part}-${index}`}>{part}</span>
  })
}

function MessageContent({ text }) {
  return (
    <>
      {text.split('\n').map((line, index) => (
        <span className="message-line" key={`${line}-${index}`}>
          {renderInlineText(line)}
        </span>
      ))}
    </>
  )
}

function App() {
  const [currentStudent, setCurrentStudent] = useState(readCurrentStudent)
  const [memory, setMemory] = useState(() => readMemory(currentStudent?.username))
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedTopicId, setSelectedTopicId] = useState('cuong-do-dong-dien')
  const [mindmapTopicId, setMindmapTopicId] = useState('cuong-do-dong-dien')
  const [isMindmapOpen, setIsMindmapOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [toast, setToast] = useState('')
  const [aiInput, setAiInput] = useState('')
  const [isAiLoading, setIsAiLoading] = useState(false)
  const [pendingGuidance, setPendingGuidance] = useState(null)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text:
        'Xin chào! Khi bạn đặt câu hỏi, mình sẽ gợi ý trước để bạn tự trả lời. Khi câu trả lời đủ tốt, mình sẽ chốt đáp án thật kèm lời giải và chỉ ra phần sai.',
    },
  ])
  const chatEndRef = useRef(null)

  useEffect(() => {
    if (!currentStudent) {
      return
    }

    window.localStorage.setItem(getStudentMemoryKey(currentStudent.username), JSON.stringify(memory))
  }, [currentStudent, memory])

  useEffect(() => {
    if (!toast) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => setToast(''), 2200)
    return () => window.clearTimeout(timeoutId)
  }, [toast])

  useEffect(() => {
    if (!isMindmapOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMindmapOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMindmapOpen])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ block: 'end' })
  }, [messages])

  const selectedTopic = topics.find((topic) => topic.id === selectedTopicId) || topics[0]
  const mindmapTopic = topics.find((topic) => topic.id === mindmapTopicId) || topics[0]

  const closeSidebarOnSmallScreen = () => {
    if (window.matchMedia('(max-width: 980px)').matches) {
      setIsSidebarOpen(false)
    }
  }

  const searchableItems = useMemo(
    () => [
      ...topics.map((topic) => ({
        key: `topic-${topic.id}`,
        title: topic.label,
        body: `${topic.summary} ${topic.tip}`,
        topicId: topic.id,
      })),
      ...Object.entries(featureContent).map(([key, value]) => ({
        key,
        title: value.title,
        body: value.body,
      })),
      ...chapterKnowledgeBase.map((entry, index) => ({
        key: `knowledge-${index}`,
        title: entry.title,
        body: entry.content,
        knowledgeId: index,
      })),
    ],
    [],
  )

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return []
    }

    const normalizedQuery = normalizeText(searchQuery)
    return searchableItems
      .filter((item) => normalizeText(`${item.title} ${item.body}`).includes(normalizedQuery))
      .slice(0, 5)
  }, [searchQuery, searchableItems])

  const showToast = (message) => setToast(message)

  const handleLogin = (username) => {
    const savedMemory = window.localStorage.getItem(getStudentMemoryKey(username))
    const nextMemory = savedMemory ? readMemory(username) : createFreshMemory()

    if (!savedMemory) {
      window.localStorage.setItem(getStudentMemoryKey(username), JSON.stringify(nextMemory))
    }

    window.localStorage.setItem(SESSION_KEY, username)
    setCurrentStudent({ username })
    setMemory(nextMemory)
    setSelectedTopicId(nextMemory.lastTopicId || 'cuong-do-dong-dien')
    setMindmapTopicId(nextMemory.lastTopicId || 'cuong-do-dong-dien')
    setActiveFeature(null)
    setPendingGuidance(
      nextMemory.pendingQuiz
        ? {
            question: 'Bài luyện đang làm dở',
            topicId: nextMemory.pendingQuiz.topicId,
          }
        : null,
    )
    setMessages([
      {
        role: 'assistant',
        text:
          savedMemory
            ? 'Xin chào! Thành tích và tiến độ học trước đó của bạn đã được tải lại. Khi bạn đặt câu hỏi, mình sẽ gợi ý trước để bạn tự trả lời.'
            : 'Xin chào! Tài khoản mới đã bắt đầu từ 0. Khi bạn đặt câu hỏi, mình sẽ gợi ý trước để bạn tự trả lời.',
      },
    ])
    showToast(savedMemory ? 'Đã đăng nhập và tải lại thành tích đã lưu.' : 'Đã tạo tài khoản mới.')
  }

  const handleLogout = () => {
    window.localStorage.removeItem(SESSION_KEY)
    setCurrentStudent(null)
    setMemory(createFreshMemory())
    setAiInput('')
    setPendingGuidance(null)
    setActiveFeature(null)
    setIsMindmapOpen(false)
  }

  const openFeature = (key) => {
    if (key === 'lessons') {
      setActiveFeature(null)
      document.querySelector('.lessons-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      showToast('Đã chuyển đến danh sách bài học')
      return
    }

    if (key === 'ai') {
      document.querySelector('.ai-question-input')?.focus()
    }

    setActiveFeature(key)
    showToast(`${featureContent[key]?.title || 'Chức năng'} đã mở`)
  }

  const openLesson = (topicId) => {
    const topic = topics.find((item) => item.id === topicId)

    if (!topic) {
      return
    }

    setSelectedTopicId(topicId)
    setActiveFeature(`lesson:${topicId}`)
    setMemory((currentMemory) => rememberTopic(currentMemory, topicId, 6))
    showToast(`Đang mở bài: ${topic.label}`)
  }

  const showLessonMindmap = (topicId) => {
    const topic = topics.find((item) => item.id === topicId)

    if (!topic) {
      return
    }

    setMindmapTopicId(topicId)
    setIsMindmapOpen(true)
    showToast(`Đang xem sơ đồ tư duy: ${topic.label}`)
  }

  const startAiExercise = (topicId = selectedTopicId) => {
    const topic = topics.find((item) => item.id === topicId) || selectedTopic

    setActiveFeature(null)
    setMemory((currentMemory) => ({
      ...rememberTopic(currentMemory, topic.id, 4),
      pendingQuiz: {
        topicId: topic.id,
        answerKeywords: topic.answerKeywords,
      },
    }))
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        role: 'assistant',
        text: `Bài luyện ${topic.label}: ${topic.exercise} Trả lời ngắn, AI sẽ tự chấm.`,
      },
    ])
    setPendingGuidance({
      question: topic.exercise,
      topicId: topic.id,
    })
    document.querySelector('.ai-question-input')?.focus()
  }

  const handleAiSubmit = async (event) => {
    event.preventDefault()
    const question = aiInput.trim()

    if (!question || isAiLoading) {
      document.querySelector('.ai-question-input')?.focus()
      return
    }

    const startsNewQuestion = Boolean(pendingGuidance && isLikelyNewQuestion(question))
    const activeMemory = startsNewQuestion
      ? {
          ...memory,
          pendingQuiz: null,
        }
      : memory
    const result = buildTutorResponse(question, activeMemory)
    const previousMessages = startsNewQuestion ? [] : messages
    const responseMode = pendingGuidance && !startsNewQuestion ? 'answer' : 'hint'
    const originalQuestion = responseMode === 'answer' ? pendingGuidance?.question || question : question
    const conversationTopic =
      responseMode === 'answer'
        ? topics.find((topic) => topic.id === pendingGuidance?.topicId) || selectedTopic
        : findTopic(question, activeMemory)
    setMessages((currentMessages) => [
      ...currentMessages,
      { role: 'user', text: question },
    ])
    setMemory(result.memory)
    setAiInput('')
    setIsAiLoading(true)

    try {
      const aiText = await requestAiResponse({
        question,
        topic: conversationTopic,
        memory: result.memory,
        previousMessages,
        mode: responseMode,
        originalQuestion,
      })
      const assessment = responseMode === 'answer' ? parseAiAssessment(aiText) : null
      const visibleAiText =
        assessment?.score !== null
          ? assessment.text || 'Câu trả lời của em đã được ghi nhận. Em thử viết rõ thêm bước tiếp theo nhé.'
          : cleanAiDisplayText(aiText)
      const shouldKeepGuiding =
        responseMode === 'hint' || (responseMode === 'answer' && assessment && !assessment.passed)

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: 'assistant', text: visibleAiText },
      ])
      if (responseMode === 'answer' && assessment?.score !== null) {
        setMemory((currentMemory) =>
          rememberTopic(
            currentMemory,
            conversationTopic.id,
            assessment.passed ? 12 : -6,
          ),
        )
      }
      setPendingGuidance(
        shouldKeepGuiding
          ? {
              question: originalQuestion,
              topicId: conversationTopic.id,
            }
          : null,
      )
    } catch (error) {
      const fallbackAccuracy =
        responseMode === 'answer' && result.memory.pendingQuiz
          ? getAnswerAccuracy(question, result.memory.pendingQuiz)
          : null
      const canShowFallbackAnswer =
        responseMode === 'answer' &&
        (fallbackAccuracy === null || fallbackAccuracy >= PASSING_ANSWER_SCORE)
      const fallbackText =
        responseMode === 'hint'
          ? buildFirstHintFallback(question, conversationTopic)
          : canShowFallbackAnswer
            ? `Mình giải tiếp theo chế độ nội bộ: ${result.text}`
            : result.text

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: 'assistant',
          text: fallbackText,
        },
      ])
      setPendingGuidance(
        responseMode === 'hint' || !canShowFallbackAnswer
          ? {
              question: originalQuestion,
              topicId: conversationTopic.id,
            }
          : null,
      )
      showToast(error instanceof Error ? error.message : 'Không gọi được AI endpoint')
    } finally {
      setIsAiLoading(false)
    }
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()

    if (searchResults[0]?.topicId) {
      openLesson(searchResults[0].topicId)
    } else if (searchResults[0]?.knowledgeId !== undefined) {
      openFeature('lessons')
      showToast(`Đã tìm thấy trong hệ thống kiến thức: ${searchResults[0].title}`)
    } else if (searchResults[0]?.key) {
      openFeature(searchResults[0].key)
    } else if (searchQuery.trim()) {
      const result = buildTutorResponse(searchQuery, memory)
      setMessages((currentMessages) => [
        ...currentMessages,
        { role: 'user', text: searchQuery },
        { role: 'assistant', text: result.text },
      ])
      setMemory(result.memory)
      showToast('AI đã xử lí nội dung tìm kiếm')
    }

    setSearchQuery('')
    setIsSearchOpen(false)
  }

  const handleDialogAction = (action) => {
    const normalizedAction = normalizeText(action)

    if (normalizedAction.includes('dang xuat')) {
      handleLogout()
      return
    }

    if (normalizedAction.includes('hoan thanh noi dung bai 22')) {
      setMemory((currentMemory) => rememberTopic(currentMemory, 'cuong-do-dong-dien', 20))
      showToast('Đã lưu hoàn thành nội dung Bài 22 vào thành tích học tập.')
      return
    }

    if (normalizedAction.includes('ai') || normalizedAction.includes('hoi')) {
      setActiveFeature(null)
      document.querySelector('.ai-question-input')?.focus()
      return
    }

    if (
      normalizedAction.includes('bai') ||
      normalizedAction.includes('luyen') ||
      normalizedAction.includes('kiem tra') ||
      normalizedAction.includes('cau') ||
      normalizedAction.includes('de')
    ) {
      startAiExercise(activeFeature?.startsWith('lesson:') ? activeFeature.replace('lesson:', '') : selectedTopicId)
      return
    }

    const lessonFromDialog = activeFeature?.startsWith('lesson:')
      ? topics.find((topic) => topic.id === activeFeature.replace('lesson:', ''))
      : null

    if (lessonFromDialog?.branches?.includes(action)) {
      setSelectedTopicId(lessonFromDialog.id)
      setActiveFeature(null)
      setPendingGuidance({
        question: `Học nhánh ${action} trong ${lessonFromDialog.label}`,
        topicId: lessonFromDialog.id,
      })
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: 'assistant',
          text: `Đã mở nhánh "${action}" của ${lessonFromDialog.label}. Em có thể gõ "gợi ý", "bài tập", hoặc câu hỏi cụ thể về nhánh này.`,
        },
      ])
      document.querySelector('.ai-question-input')?.focus()
      return
    }

    showToast(`Đã chọn: ${action}`)
  }

  const activeLessonId = activeFeature?.startsWith('lesson:')
    ? activeFeature.replace('lesson:', '')
    : null
  const activeLesson = topics.find((topic) => topic.id === activeLessonId)
  const activeContent = activeLesson
      ? {
        lessonId: activeLesson.id,
        title: activeLesson.label,
        body: `${activeLesson.summary} ${activeLesson.tip}`,
        branches: activeLesson.branches || [],
        actions: ['Tạo bài tập theo bài này', 'Hỏi AI về bài này', 'Đánh dấu đã học'],
      }
    : activeFeature
      ? { ...featureContent[activeFeature], featureKey: activeFeature }
      : null
  const topicProgressList = topics.map((topic) => getTopicProgress(memory, topic.id))
  const completedLessons = topicProgressList.filter((progress) => progress >= 100).length
  const inProgressLessons = topicProgressList.filter((progress) => progress > 0 && progress < 100).length
  const notStartedLessons = topics.length - completedLessons - inProgressLessons
  const averageLessonProgress = Math.round(
    topicProgressList.reduce((total, progress) => total + progress, 0) / topics.length,
  )
  const averageQuizScore = (topicProgressList.reduce((total, progress) => total + progress / 10, 0) / topics.length).toFixed(1)
  const studyHours = Math.floor((memory.studyMinutes || 0) / 60)
  const studyMinutes = (memory.studyMinutes || 0) % 60
  const studyTimeLabel = studyHours > 0 ? `${studyHours} giờ ${studyMinutes} phút` : `${studyMinutes} phút`
  const weeklyGoal = 5
  const nextTopic =
    topics.find((topic) => getTopicProgress(memory, topic.id) > 0 && getTopicProgress(memory, topic.id) < 100) ||
    topics.find((topic) => getTopicProgress(memory, topic.id) < 100) ||
    topics[0]
  const progressDetails = topics.map((topic) => {
    const progress = getTopicProgress(memory, topic.id)
    return {
      id: topic.id,
      title: `Bài ${topic.number}: ${topic.shortLabel}`,
      status: getTopicStatus(progress),
      progress,
      quizScore: (progress / 10).toFixed(1),
    }
  })
  const earnedBadges = [
    {
      key: 'explore',
      icon: '🥉',
      title: 'Khám phá',
      description: 'Hoàn thành bài học đầu tiên',
      unlocked: completedLessons >= 1,
      unlockHint: 'Hoàn thành 1 bài học để mở khóa',
    },
    {
      key: 'consistent',
      icon: '🥈',
      title: 'Kiên trì',
      description: 'Hoàn thành nhiều bài liên tiếp',
      unlocked: completedLessons >= 2 || (memory.streak || 0) >= 2,
      unlockHint: 'Hoàn thành 2 bài hoặc trả lời đúng liên tiếp',
    },
    {
      key: 'self-study',
      icon: '🥇',
      title: 'Tự học tốt',
      description: 'Đạt điểm quiz cao',
      unlocked: Number(averageQuizScore) >= 8.5,
      unlockHint: 'Đạt quiz trung bình từ 8.5/10',
    },
  ]
  const autoAssessment =
    averageLessonProgress >= 100
      ? `Bạn đã hoàn thành toàn bộ chương học và đạt điểm quiz trung bình ${averageQuizScore}/10. Hãy ôn lại các bài có điểm thấp để giữ phong độ.`
      : `Bạn đã hoàn thành ${averageLessonProgress}% chương học và đạt điểm quiz trung bình ${averageQuizScore}/10. Hãy tiếp tục hoàn thành bài còn lại để mở khóa huy hiệu cao nhất.`
  const studyData = {
    averageLessonProgress,
    completedLessons,
    inProgressLessons,
    notStartedLessons,
    averageQuizScore,
    studyTimeLabel,
    progressDetails,
    earnedBadges,
  }
  const dialogContent =
    activeFeature === 'account'
      ? {
          ...activeContent,
          title: `Tài khoản: ${currentStudent?.username || 'Học sinh'}`,
          body: 'Tài khoản được lưu riêng trong trình duyệt. Khi đăng nhập lại, điểm kinh nghiệm, chuỗi học, huy hiệu và tiến độ của học sinh này sẽ được giữ nguyên.',
          actions: ['Đăng xuất'],
        }
      : activeFeature === 'achievements'
        ? {
            ...activeContent,
            body: `Điểm Quiz trung bình: ${averageQuizScore}/10. Mục tiêu tuần: ${Math.min(completedLessons, weeklyGoal)}/${weeklyGoal} bài. Bài đã hoàn thành: ${completedLessons} bài.`,
          }
        : activeFeature === 'badges'
          ? {
              ...activeContent,
              body: earnedBadges
                .map((badge) => `${badge.title}: ${badge.unlocked ? badge.description : badge.unlockHint}`)
                .join('. '),
          }
          : activeFeature === 'progress'
            ? {
                ...activeContent,
                body: `Hoàn thành ${averageLessonProgress}% chương. Đã hoàn thành ${completedLessons}/${topics.length} bài, đang học ${inProgressLessons} bài, chưa học ${notStartedLessons} bài. Điểm Quiz trung bình: ${averageQuizScore}/10.`,
                details: progressDetails,
              }
          : activeContent

  if (!currentStudent) {
    return <AuthScreen onLogin={handleLogin} />
  }

  return (
    <div className={`app-shell ${isSidebarOpen ? 'app-shell--sidebar-open' : 'app-shell--sidebar-closed'}`}>
      {isSidebarOpen && (
        <button
          className="sidebar-backdrop"
          type="button"
          aria-label="Đóng sidebar"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className="sidebar">
        <div className="brand">
          <AtomLogo />
          <div>
            <strong>Vật lí 11</strong>
            <span>Hỗ trợ tự học</span>
          </div>
        </div>

        <nav className="side-nav" aria-label="Điều hướng chính">
          {navItems.map((item) => (
            <button
              className={`side-link ${activeFeature === item.key ? 'side-link--active' : ''}`}
              key={item.key}
              type="button"
              onClick={() => {
                openFeature(item.key)
                closeSidebarOnSmallScreen()
              }}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
              {item.key === 'lessons' && <span className="chevron">⌄</span>}
            </button>
          ))}
        </nav>

        <SidebarCircuitArt />

        <button
          className="support-button"
          type="button"
          onClick={() => {
            openFeature('feedback')
            closeSidebarOnSmallScreen()
          }}
        >
          <Icon name="headset" />
          <span>Góp ý & Liên hệ</span>
        </button>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <button
            className="icon-button menu-button"
            type="button"
            aria-label={isSidebarOpen ? 'Đóng sidebar' : 'Mở sidebar'}
            aria-expanded={isSidebarOpen}
            onClick={() => setIsSidebarOpen((currentValue) => !currentValue)}
          >
            <Icon name="menu" />
          </button>
          <h1>Chương IV: Dòng điện. Mạch điện</h1>

          <form className="search-box" onSubmit={handleSearchSubmit}>
            <input
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value)
                setIsSearchOpen(true)
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Tìm kiếm bài học, nội dung..."
              aria-label="Tìm kiếm bài học, nội dung"
            />
            <button type="submit" aria-label="Tìm kiếm">
              <Icon name="search" />
            </button>
            {isSearchOpen && searchQuery && (
              <div className="search-popover" role="listbox">
                {searchResults.length ? (
                  searchResults.map((result) => (
                    <button
                      key={result.key}
                      type="button"
                      onClick={() => {
                        if (result.topicId) {
                          openLesson(result.topicId)
                        } else if (result.knowledgeId !== undefined) {
                          openFeature('lessons')
                          showToast(`Đã tìm thấy trong hệ thống kiến thức: ${result.title}`)
                        } else {
                          openFeature(result.key)
                        }

                        setSearchQuery('')
                        setIsSearchOpen(false)
                      }}
                    >
                      <strong>{result.title}</strong>
                      <span>{result.body}</span>
                    </button>
                  ))
                ) : (
                  <button type="submit">
                    <strong>Hỏi AI về "{searchQuery}"</strong>
                    <span>Không có bài hoặc nội dung trùng khớp. AI sẽ giải thích theo nội dung bạn nhập.</span>
                  </button>
                )}
              </div>
            )}
          </form>

          <button className="icon-button bell-button" type="button" aria-label="Thông báo" onClick={() => openFeature('notifications')}>
            <Icon name="bell" />
            <span>3</span>
          </button>
          <button className="account-button" type="button" onClick={() => openFeature('account')}>
            <Avatar />
            <span>
              Xin chào,
              <strong>{currentStudent.username}</strong>
            </span>
            <span className="chevron">⌄</span>
          </button>
        </header>

        <main className="dashboard-main">
          <section className="content-column">
            <section className="chapter-hero">
              <div className="chapter-copy">
                <p>CHƯƠNG IV</p>
                <h2>DÒNG ĐIỆN. MẠCH ĐIỆN</h2>
                <span>
                  Tìm hiểu về dòng điện, nguồn điện, điện năng, công suất điện và định luật Ôm.
                  Vận dụng kiến thức để giải thích hiện tượng thực tế và giải bài tập.
                </span>
              </div>
              <CircuitHeroSvg />
            </section>

            <section className="mindmap-section">
              <div className="section-heading">
                <h2>SƠ ĐỒ TƯ DUY CHƯƠNG IV</h2>
                <button type="button" onClick={() => showLessonMindmap(mindmapTopic.id)}>
                  Xem chi tiết
                </button>
              </div>
              <div className="mindmap">
                <button
                  className="mind-center"
                  type="button"
                  onClick={() => openFeature('overview')}
                >
                  <strong>DÒNG ĐIỆN. MẠCH ĐIỆN</strong>
                </button>

                <svg className="mind-lines" viewBox="0 0 1768 890" aria-hidden="true" preserveAspectRatio="none">
                  <path className="line-blue" d="M610 168 H665 C760 168 760 306 760 333 H850" />
                  <path className="line-purple" d="M610 445 H850" />
                  <path className="line-green" d="M610 660 H666 C760 660 760 552 760 500 H850" />
                  <path className="line-orange" d="M1098 340 C1098 245 1168 220 1250 220 H1280" />
                  <path className="line-pink" d="M1098 500 C1098 622 1180 650 1280 650" />
                </svg>

                {mindmapCards.map(({ topicId, position, color, softColor }) => {
                  const topic = topics.find((item) => item.id === topicId)

                  if (!topic) {
                    return null
                  }

                  return (
                    <button
                      aria-pressed={mindmapTopicId === topic.id}
                      className={`mind-node mind-node--${position} ${mindmapTopicId === topic.id ? 'mind-node--active' : ''}`}
                      key={topic.id}
                      style={{
                        '--topic-color': color,
                        '--topic-soft': softColor,
                      }}
                      type="button"
                      onClick={() => showLessonMindmap(topic.id)}
                    >
                      <Icon name={topic.icon} />
                      <span className="mind-node__text">
                        <span>{`Bài ${topic.number}`}</span>
                        <strong>{topic.shortLabel}</strong>
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="lesson-map-grid">
                {topics.map((topic) => (
                  <button
                    className="lesson-map-item"
                    key={topic.id}
                    style={{
                      '--topic-color': topic.color,
                      '--topic-soft': topic.softColor,
                    }}
                    type="button"
                    onClick={() => showLessonMindmap(topic.id)}
                  >
                    <Icon name={topic.icon} />
                    <span>{`Bài ${topic.number}`}</span>
                    <strong>{topic.shortLabel}</strong>
                  </button>
                ))}
              </div>
            </section>

            <section className="lessons-section">
              <h2>{`${topics.length} BÀI HỌC TRONG CHƯƠNG`}</h2>
              <div className="lesson-grid">
                {topics.map((topic) => {
                  const progress = getTopicProgress(memory, topic.id)
                  const status = getTopicStatus(progress)

                  return (
                    <article
                      className={`lesson-card ${selectedTopicId === topic.id ? 'lesson-card--active' : ''}`}
                      key={topic.id}
                      style={{
                        '--topic-color': topic.color,
                        '--topic-soft': topic.softColor,
                      }}
                    >
                      <button className="lesson-main" type="button" onClick={() => openLesson(topic.id)}>
                        <div className="lesson-title-row">
                          <span className="lesson-number">{topic.number}</span>
                          <h3>{topic.shortLabel}</h3>
                        </div>
                        <LessonDiagram topic={topic} />
                        <p>{topic.summary}</p>
                        <div className="progress-track">
                          <span style={{ width: `${progress}%` }} />
                        </div>
                        <strong>{progress}%</strong>
                      </button>
                      <button
                        className="lesson-action"
                        type="button"
                        onClick={() => (progress === 100 ? openLesson(topic.id) : startAiExercise(topic.id))}
                      >
                        <Icon name={progress === 100 ? 'shield' : 'play'} />
                        <span>{getTopicAction(progress)}</span>
                      </button>
                      <span className="lesson-status">{status}</span>
                    </article>
                  )
                })}
              </div>
            </section>

            <section className="roadmap-strip">
              <div className="cup-badge">
                <Icon name="trophy" />
              </div>
              <span>Hãy hoàn thành 5 bài học trong chương để mở khóa kiểm tra cuối chương và nhận huy hiệu nhé!</span>
              <button type="button" onClick={() => openFeature('roadmap')}>
                Xem chi tiết lộ trình
              </button>
            </section>
          </section>

          <aside className="right-column">
            <section className="panel progress-panel">
              <h2>TIẾN TRÌNH HỌC TẬP</h2>
              <div className="progress-body">
                <div className="progress-ring" style={{ '--progress': `${averageLessonProgress}%` }}>
                  <span>{`${averageLessonProgress}%`}</span>
                  <small>Hoàn thành</small>
                </div>
                <div className="progress-legend">
                  <span><i className="dot dot-green" />Đã hoàn thành: {completedLessons}/{topics.length} bài</span>
                  <span><i className="dot dot-orange" />Đang học: {inProgressLessons} bài</span>
                  <span><i className="dot dot-purple" />Chưa học: {notStartedLessons} bài</span>
                </div>
              </div>
              <p className="quiz-average">Điểm Quiz trung bình: <strong>{averageQuizScore}/10</strong></p>
              <button className="primary-button" type="button" onClick={() => openFeature('progress')}>
                <Icon name="bar" />
                Xem chi tiết tiến trình
              </button>
            </section>

            <section className="panel achievements-panel">
              <h2>THÀNH TÍCH CỦA BẠN</h2>
              <div className="stat-row">
                <button type="button" onClick={() => openFeature('achievements')}>
                  <Icon name="star" />
                  <strong>{averageQuizScore} / 10</strong>
                  <span>Điểm Quiz trung bình</span>
                </button>
                <button type="button" onClick={() => openFeature('achievements')}>
                  <Icon name="target" />
                  <strong>{Math.min(completedLessons, weeklyGoal)} / {weeklyGoal} bài</strong>
                  <span>Mục tiêu tuần</span>
                </button>
                <button type="button" onClick={() => openFeature('badges')}>
                  <Icon name="trophy" />
                  <strong>{completedLessons} bài</strong>
                  <span>Bài đã hoàn thành</span>
                </button>
              </div>
              <div className="badge-heading">
                <h3>Huy hiệu</h3>
              </div>
              <div className="badge-row">
                {earnedBadges.map((badge) => (
                  <button
                    className={`badge ${badge.unlocked ? 'badge--unlocked' : 'badge--locked'}`}
                    key={badge.key}
                    title={badge.unlocked ? badge.description : badge.unlockHint}
                    type="button"
                    onClick={() => openFeature('badges')}
                  >
                    <span className="badge-icon" aria-hidden="true">{badge.icon}</span>
                    <strong>{badge.title}</strong>
                    <small>{badge.unlocked ? badge.description : badge.unlockHint}</small>
                  </button>
                ))}
              </div>
            </section>

            <section className="panel next-study-panel">
              <div className="next-study-icon" aria-hidden="true">📌</div>
              <div>
                <h2>GỢI Ý TIẾP THEO</h2>
                <p>{`Bài ${nextTopic.number}: ${nextTopic.shortLabel} đang chờ bạn khám phá.`}</p>
              </div>
              <button type="button" onClick={() => openLesson(nextTopic.id)}>
                <Icon name="play" />
                Học tiếp
              </button>
            </section>

            <section className="panel auto-assessment-panel">
              <h2>NHẬN XÉT TỰ ĐỘNG</h2>
              <p>{autoAssessment}</p>
            </section>

            <section className="panel ai-panel">
              <div className="ai-heading">
                <h2>AI TRỢ LÍ ẢO</h2>
                <span>BETA</span>
              </div>
              <div className="ai-intro">
                <img src={robotImage} alt="Robot trợ lí ảo" />
                <div>
                  <p>Xin chào! Mình là trợ lí ảo. Mình có thể giúp bạn:</p>
                  <ul>
                    <li>Gợi ý trước khi giải</li>
                    <li>Đánh giá câu trả lời</li>
                    <li>Phân tích lỗi sai</li>
                    <li>Tạo bài tập thêm</li>
                  </ul>
                </div>
              </div>
              <div className="ai-chat-log">
                {messages.map((message, index) => (
                  <div className={`ai-message ai-message--${message.role}`} key={`${message.role}-${index}`}>
                    <MessageContent text={message.text} />
                  </div>
                ))}
                {isAiLoading && (
                  <div className="ai-message ai-message--assistant">
                    <MessageContent text="AI đang suy nghĩ..." />
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              <form className="ai-form" onSubmit={handleAiSubmit}>
                <input
                  className="ai-question-input"
                  value={aiInput}
                  onChange={(event) => setAiInput(event.target.value)}
                  disabled={isAiLoading}
                  placeholder={isAiLoading ? 'Đang chờ AI trả lời...' : 'Nhập câu hỏi cho trợ lí ảo...'}
                  aria-label="Nhập câu hỏi cho trợ lí ảo"
                />
                <button type="submit" aria-label="Gửi câu hỏi" disabled={isAiLoading}>
                  <Icon name="send" />
                </button>
              </form>
            </section>
          </aside>
        </main>
      </div>

      {activeContent && (
        <FeatureDialog
          content={dialogContent}
          studyData={studyData}
          onAction={handleDialogAction}
          onClose={() => setActiveFeature(null)}
          onOpenLesson={openLesson}
          onStartExercise={startAiExercise}
        />
      )}
      {isMindmapOpen && (
        <LessonMindmap
          topic={mindmapTopic}
          onClose={() => setIsMindmapOpen(false)}
        />
      )}
      {toast && <div className="interaction-toast">{toast}</div>}
    </div>
  )
}

export default App
