import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import denImage from './assets/den.png'
import dongHoImage from './assets/dongho.png'
import bongDenImage from './assets/bongden.png'
import robotImage from './assets/ai-robot.png'
import cucPinImage from './assets/cucpin.png'
import dienTroImage from './assets/dientro.png'
import emfSymbolImage from './assets/emf-symbol-e.png'
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
const REVIEW_STORAGE_KEY = `${STORAGE_KEY}:electric-repair-game`
const PREVIEW_ALL_LESSON_PARTS = false
const CHAPTER_REVIEW_PROGRESS_ID = 'chapter-review-self-assessment'
const CHAPTER_REVIEW_TITLE = 'Hoạt động ôn tập và tự đánh giá cuối chương'

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
      'Hình thành: W = UIt và P = A/t = UI.',
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
      points: ['Cường độ dòng điện là đại lượng đặc trưng cho tác dụng mạnh, yếu của dòng điện'],
    },
    {
      title: 'Công thức chính',
      points: [{ type: 'fraction', left: 'I =', numerator: 'Δq', denominator: 'Δt' }],
    },
    {
      title: 'Đơn vị',
      points: ['Ampe (A)'],
    },
    {
      title: '',
      points: ['Biểu thức liên hệ giữa cường độ dòng điện trong dây dẫn kim loại với mật độ hạt mang điện và tốc độ dịch chuyển có hướng của các hạt mang điện là I = Snve'],
    },
    {
      title: 'Vận dụng',
      points: [
        'Giải bài tập tính cường độ dòng điện.',
        'Giải thích hiện tượng liên quan đến cường độ dòng điện.',
        'Vận dụng kiến thức để giải quyết tình huống thực tiễn.',
      ],
    },
  ],
  'dien-tro-dinh-luat-om': [
    {
      title: 'Điện trở R',
      points: [
        'là đại lượng đặc trưng cho mức độ cản trở dòng điện của vật dẫn',
        'Đơn vị Ôm (Ω)',
        'Đường đặc trung vôn - ampe của điện trở là đường thẳng đi qua gốc tọa độ, đường thẳng có độ dốc càng lớn khi giá trị của điện trở R càng nhỏ.',
      ],
    },
    {
      title: 'Định luật Ôm',
      points: [
        'Cường độ dòng điện chạy qua vật dẫn tỉ lệ thuận với hiệu điện thế ở hai đầu vật dẫn, tỉ lệ nghịch với điện trở của vật dẫn.',
        { type: 'fraction', left: 'Biểu thức: I =', numerator: 'U', denominator: 'R' },
      ],
    },
    {
      title: 'Nguyên nhân gây ra điện trở',
      points: [
        'Trong kim loại có:',
        '+ Ion dương nằm tại các nút mạng tinh thể.',
        '+ Electron tự do chuyển động tạo dòng điện.',
        'Electron tự do va chạm với các ion dương khi chuyển động.',
        'Sự va chạm này cản trở chuyển động của electron ⇒ xuất hiện điện trở.',
      ],
    },
    {
      title: 'Ảnh hưởng của nhiệt độ lên điện trở',
      points: [
        'Kim loại: T ↑ ⇒ R ↑.',
        'Dây tóc bóng đèn: T ↑ ⇒ R ↑.',
        'NTC: T ↑ ⇒ R ↓.',
        'PTC: T ↑ ⇒ R ↑.',
      ],
    },
  ],
  'nguon-dien': [
    {
      title: 'Nguồn điện',
      points: [
        'Là thiết bị để tạo ra và duy trì hiệu điện thế, nhằm duy tri dòng điện trong mạch',
        'Có hai cực:',
        '+ Cực dương (+)',
        '+ Cực âm (-)',
        'Ví dụ: Pin, ắc quy, máy phát điện, pin mặt trời.',
      ],
    },
    {
      title: 'Suất điện động của nguồn điện',
      points: [
        'là đại lượng đặc trưng cho khả năng thực hiện công của nguồn điện và đo bằng thương số giữa công A của lực lạ thực hiện khi làm dịch chuyển một điện tích dương q bên trong nguồn điện từ cực âm đến cực dương và độ lớn của điện tích q đó',
        { type: 'symbolLine', label: 'Kí hiệu:', symbol: 'emf' },
        { type: 'fraction', left: 'biểu thức:', symbol: 'emf', operator: '=', numerator: 'A', denominator: 'q' },
        'Đơn vị là vôn (V)',
      ],
    },
    {
      title: 'Điện trở trong của nguồn điện.',
      points: [
        'Trong mạch kín, dòng điện chạy qua mạch ngoài và cả mạch trong. Như vậy, nguồn điện cũng là một vật dẫn và cũng có điện trở. Điện trở này được gọi là điện trở trong của nguồn điện.',
        'Kí hiệu: r',
        'Đơn vị là Ôm (Ω)',
      ],
    },
    {
      title: 'Ảnh hưởng của điện trở trong của nguồn',
      points: [
        'Định luật Ôm toàn mạch: Cường độ dòng điện chạy trong mạch điện kín tỉ lệ thuận với suất điện động của nguồn điện và tỉ lệ nghịch với điện trở toàn phần của mạch điện đó.',
        { type: 'fraction', left: 'I =', numeratorSymbol: 'emf', denominator: 'R + r' },
        { type: 'richLine', parts: ['Công của nguồn điện: A = q', { symbol: 'emf' }, ' = ', { symbol: 'emf' }, 'It'] },
        { type: 'richLine', parts: ['Hiệu điện thế mạch ngoài: U = ', { symbol: 'emf' }, ' - Ir'] },
        'Độ giảm thế mạch ngoài: U = IR',
      ],
    },
  ],
  'nang-luong-cong-suat-dien': [
    {
      title: 'Năng lượng điện',
      points: [
        'Năng lượng điện tiêu thị của đoạn mạch bằng công của lực điện thực hiện khi di chuyển các điện tích.',
        'Biểu thức: W = A = UIt',
        'Đơn vị là jun',
        'Kí hiệu là J',
      ],
    },
    {
      title: 'Chuyển hóa năng lượng điện',
      points: [
        'Dòng điện chạy qua mạch gây ra các tác dụng khác nhau và khi đó có sự chuyển hoá năng lượng điện tiêu thụ của đoạn mạch thành các dạng năng lượng khác.',
        'Đối với đoạn mạch thuần điện trở, nhiệt lượng đoạn mạch toả ra khi dòng điện chạy qua được tính bằng công thức: Q = RI²t.',
      ],
    },
    {
      title: 'Công suất điện',
      points: [
        {
          type: 'richLine',
          parts: [
            'Công suất tiêu thụ năng lượng điện (gọi tắt là công suất điện) của một đoạn mạch là năng lượng điện mà mạch tiêu thụ trong một đơn vị thời gian: ',
            { formula: 'power' },
          ],
        },
        'Đơn vị là oát',
        'Kí hiệu là W',
      ],
    },
    {
      title: 'Vận dụng',
      points: [
        'Giải một số bài tập về công suất điện',
        'Tính được điện năng tiêu thụ của một số thiết bị điện trong gia đình...',
      ],
    },
  ],
  'thuc-hanh-pin-dien-hoa': [
    {
      title: 'Mục tiêu',
      points: [{ type: 'richLine', parts: ['Đo suất điện động ', { symbol: 'emf' }] }, 'Xác định điện trở trong r của pin'],
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
      points: [
        'Ghi các cặp U, I',
        'Vẽ đồ thị U = f(I)',
        { type: 'richLine', parts: ['Kéo dài đến I = 0 để tìm ', { symbol: 'emf' }] },
        { type: 'fraction', left: 'Tính toán giá trị r theo công thức: r =', numeratorParts: ['U', { sub: 'M' }, ' - U', { sub: 'N' }], denominatorParts: ['I', { sub: 'N' }, ' - I', { sub: 'M' }] },
      ],
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
  { key: 'review', label: CHAPTER_REVIEW_TITLE, icon: 'clipboard' },
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

const escapeReportHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const getLearningReportNote = (item) => {
  if (item.selfAssessment) {
    return item.selfAssessment
  }

  if (item.progress >= 100) {
    return 'Hoàn thành tốt'
  }

  if (item.progress > 0) {
    return 'Cần ôn lại'
  }

  return 'Chưa có tự đánh giá'
}

const openLearningReportWindow = ({ studentName, exportedAt, details }) => {
  const rows = details
    .map((item) => `
      <tr>
        <td>${escapeReportHtml(item.title)}</td>
        <td>${escapeReportHtml(item.status)}</td>
        <td>${escapeReportHtml(item.progress)}%</td>
        <td>${escapeReportHtml(item.quizScore)}/10</td>
        <td>${escapeReportHtml(getLearningReportNote(item))}</td>
      </tr>
    `)
    .join('')
  const reportHtml = `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Báo cáo tiến trình học tập</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      color: #111827;
      background: #f3f6fb;
      font-family: Arial, "Helvetica Neue", sans-serif;
      line-height: 1.5;
    }
    .report {
      width: min(980px, calc(100% - 32px));
      margin: 28px auto;
      border: 1px solid #d7deea;
      border-radius: 10px;
      padding: 28px;
      background: #ffffff;
      box-shadow: 0 18px 50px rgba(15, 23, 42, 0.12);
    }
    h1 {
      margin: 0 0 18px;
      color: #102a83;
      font-size: 28px;
      line-height: 1.2;
      text-align: center;
    }
    .meta {
      display: grid;
      gap: 6px;
      margin-bottom: 22px;
      color: #26325f;
      font-size: 15px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      overflow: hidden;
      border: 1px solid #d8e0f0;
      border-radius: 8px;
      font-size: 14px;
    }
    th, td {
      border: 1px solid #d8e0f0;
      padding: 11px 12px;
      text-align: left;
      vertical-align: top;
    }
    th {
      color: #102a83;
      background: #eef4ff;
      font-weight: 800;
    }
    tbody tr:nth-child(even) td {
      background: #f8fbff;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 22px;
    }
    button {
      border: 0;
      border-radius: 8px;
      padding: 12px 18px;
      color: #ffffff;
      background: #1746c7;
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
    }
    button:hover,
    button:focus-visible {
      outline: 0;
      background: #0d3195;
    }
    @media print {
      body { background: #ffffff; }
      .report {
        width: 100%;
        margin: 0;
        border: 0;
        box-shadow: none;
      }
      .actions { display: none; }
    }
  </style>
</head>
<body>
  <main class="report">
    <h1>BÁO CÁO TIẾN TRÌNH HỌC TẬP</h1>
    <section class="meta" aria-label="Thông tin báo cáo">
      <div><strong>Họ tên học sinh:</strong> ${escapeReportHtml(studentName)}</div>
      <div><strong>Thời gian xuất báo cáo:</strong> ${escapeReportHtml(exportedAt)}</div>
    </section>
    <table>
      <thead>
        <tr>
          <th>Nội dung học tập</th>
          <th>Trạng thái</th>
          <th>Tiến độ</th>
          <th>Điểm Quiz</th>
          <th>Ghi chú</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="actions">
      <button type="button" onclick="window.print()">In / Lưu PDF</button>
    </div>
  </main>
</body>
</html>`
  const reportWindow = window.open('', '_blank', 'width=1100,height=800')

  if (!reportWindow) {
    return false
  }

  reportWindow.document.open()
  reportWindow.document.write(reportHtml)
  reportWindow.document.close()
  reportWindow.focus()
  return true
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
    'cong thuc',
    'cong thuc nao',
    'cach lam',
    'lam sao',
    'phuong phap',
    'ki hieu',
    'ky hieu',
    'don vi',
    'dinh nghia',
    'khai niem',
    'cach mac',
    'mac dung cu',
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
    normalizedQuestion.includes('em chon') ||
    normalizedQuestion.includes('em tinh duoc') ||
    normalizedQuestion.includes('em ra') ||
    normalizedQuestion.includes('dap an cua em') ||
    normalizedQuestion.includes('ket qua cua em') ||
    normalizedQuestion.startsWith('chon ') ||
    normalizedQuestion.startsWith('dap an la') ||
    normalizedQuestion.startsWith('ket qua la')
  ) {
    return 'student-answer'
  }

  if (
    normalizedQuestion.includes('cong thuc') ||
    normalizedQuestion.includes('dinh luat') ||
    normalizedQuestion.includes('he thuc') ||
    normalizedQuestion.includes('bieu thuc')
  ) {
    return 'formula'
  }

  if (
    normalizedQuestion.includes('ki hieu') ||
    normalizedQuestion.includes('ky hieu') ||
    normalizedQuestion.includes('don vi') ||
    normalizedQuestion.includes('dinh nghia') ||
    normalizedQuestion.includes('khai niem') ||
    normalizedQuestion.includes('chuc nang') ||
    normalizedQuestion.includes('la gi') ||
    normalizedQuestion.includes('mac dung cu') ||
    normalizedQuestion.includes('mac ampe ke') ||
    normalizedQuestion.includes('mac von ke') ||
    normalizedQuestion.includes('cach mac')
  ) {
    return 'direct'
  }

  if (
    normalizedQuestion.includes('cach lam') ||
    normalizedQuestion.includes('lam sao') ||
    normalizedQuestion.includes('lam the nao') ||
    normalizedQuestion.includes('nhu the nao') ||
    normalizedQuestion.includes('phuong phap') ||
    normalizedQuestion.includes('quy trinh') ||
    normalizedQuestion.includes('cac buoc')
  ) {
    return 'method'
  }

  if (
    normalizedQuestion.includes('chua hieu') ||
    normalizedQuestion.includes('khong hieu') ||
    normalizedQuestion.includes('chua ro') ||
    normalizedQuestion.includes('mo ho') ||
    normalizedQuestion.includes('ban chat')
  ) {
    return 'stuck'
  }

  if (
    normalizedQuestion.includes('vi sao') ||
    normalizedQuestion.includes('tai sao') ||
    normalizedQuestion.includes('giai thich') ||
    normalizedQuestion.includes('hien tuong')
  ) {
    return 'concept'
  }

  if (
    normalizedQuestion.includes('giai giup') ||
    normalizedQuestion.includes('giai bai') ||
    normalizedQuestion.includes('bai nay') ||
    normalizedQuestion.includes('cau nay') ||
    normalizedQuestion.includes('khong biet lam') ||
    normalizedQuestion.includes('tinh') ||
    normalizedQuestion.includes('cho biet') ||
    normalizedQuestion.includes('dat ') ||
    /\d/.test(normalizedQuestion)
  ) {
    return 'exercise'
  }

  return 'general'
}

const isMoreGuidanceRequest = (question) => {
  const normalizedQuestion = normalizeText(question)

  return [
    'chua hieu',
    'khong hieu',
    'goi y',
    'goi y tiep',
    'them goi y',
    'noi ro hon',
    'giai thich lai',
    'giup em tiep',
    'van chua',
    'cho dap an',
    'dap an la gi',
  ].some((cue) => normalizedQuestion.includes(cue))
}

const buildDirectAnswerFallback = (question, topic) => {
  const normalizedQuestion = normalizeText(question)

  if (normalizedQuestion.includes('ampe ke') || normalizedQuestion.includes('am pe ke')) {
    return 'Ampe kế dùng để đo cường độ dòng điện.\n\nNó được mắc nối tiếp với dụng cụ hoặc đoạn mạch cần đo dòng điện.\n\nLưu ý: ampe kế đo I, không đo hiệu điện thế U.'
  }

  if (normalizedQuestion.includes('von ke') || normalizedQuestion.includes('volt ke')) {
    return 'Vôn kế dùng để đo hiệu điện thế.\n\nNó được mắc song song với hai đầu dụng cụ hoặc nguồn cần đo.\n\nLưu ý: vôn kế đo U, không đo cường độ dòng điện I.'
  }

  if (normalizedQuestion.includes('cong thuc') || normalizedQuestion.includes('dinh luat') || normalizedQuestion.includes('bieu thuc') || normalizedQuestion.includes('he thuc')) {
    if (topic.id === 'cuong-do-dong-dien') {
      return 'Công thức cường độ dòng điện: I = Δq / Δt.\n\nTrong đó I là cường độ dòng điện, Δq là điện lượng đi qua tiết diện dây dẫn, Δt là thời gian.\n\nLưu ý: I càng lớn khi Δq càng lớn hoặc Δt càng nhỏ.'
    }

    if (topic.id === 'dien-tro-dinh-luat-om') {
      return 'Định luật Ôm cho đoạn mạch chỉ có điện trở: I = U / R.\n\nSuy ra U = I.R và R = U / I.\n\nLưu ý: R là điện trở của vật dẫn, không phải điện trở suất ρ của vật liệu.'
    }

    if (topic.id === 'nguon-dien') {
      return 'Với nguồn điện: ξ = A / q; I = ξ / (R + r); U = ξ - Ir.\n\nξ là suất điện động, r là điện trở trong, U là hiệu điện thế mạch ngoài.\n\nLưu ý: khi có dòng điện, U thường nhỏ hơn ξ do có độ giảm thế Ir trong nguồn.'
    }

    if (topic.id === 'nang-luong-cong-suat-dien') {
      return 'Công suất điện: P = A / t = UI.\n\nĐiện năng tiêu thụ: W = A = UIt. Với điện trở thuần có thể dùng P = I²R = U² / R.\n\nLưu ý: công suất P khác điện năng W; P cho biết tốc độ tiêu thụ điện năng.'
    }

    return 'Bài thực hành dùng hệ thức U = ξ - Ir.\n\nTừ đồ thị U theo I, giao điểm với trục U khi I = 0 cho ξ; độ dốc âm liên hệ với điện trở trong r.\n\nLưu ý: không xác định r chỉ bằng một lần đo U.'
  }

  if (normalizedQuestion.includes('don vi')) {
    if (normalizedQuestion.includes('cuong do') || normalizedQuestion.includes('dong dien') || normalizedQuestion.includes(' i')) return 'Đơn vị của cường độ dòng điện là ampe, kí hiệu A.\n\n1 A = 1 C/s, nghĩa là trong 1 giây có 1 C điện lượng đi qua tiết diện dây dẫn.\n\nLưu ý: A ở đây là ampe, không phải công A.'
    if (normalizedQuestion.includes('dien tro suat') || normalizedQuestion.includes('rho')) return 'Đơn vị của điện trở suất là ôm mét, kí hiệu Ω.m.\n\nĐiện trở suất đặc trưng cho khả năng cản trở dòng điện của vật liệu.\n\nLưu ý: điện trở suất ρ khác điện trở R.'
    if (normalizedQuestion.includes('dien tro') || normalizedQuestion.includes(' r')) return 'Đơn vị của điện trở là ôm, kí hiệu Ω.\n\n1 Ω = 1 V/A.\n\nLưu ý: điện trở R khác điện trở suất ρ.'
    if (normalizedQuestion.includes('hieu dien the') || normalizedQuestion.includes('suat dien dong') || normalizedQuestion.includes(' u') || normalizedQuestion.includes('ξ')) return 'Đơn vị của hiệu điện thế và suất điện động là vôn, kí hiệu V.\n\nHiệu điện thế U gắn với hai điểm trong mạch; suất điện động ξ gắn với nguồn điện.\n\nLưu ý: U của nguồn khi có dòng điện thường nhỏ hơn ξ.'
    if (normalizedQuestion.includes('cong suat') || normalizedQuestion.includes(' p')) return 'Đơn vị của công suất điện là oát, kí hiệu W.\n\nCông suất cho biết thiết bị tiêu thụ điện năng nhanh hay chậm.\n\nLưu ý: W có thể là oát trong công suất, nhưng W cũng có thể được dùng làm kí hiệu điện năng trong một số bài.'
    return 'Một số đơn vị chính: I đo bằng A, q đo bằng C, t đo bằng s, U và ξ đo bằng V, R và r đo bằng Ω, P đo bằng W, điện năng hoặc công đo bằng J.\n\nLưu ý: cần nhìn đúng đại lượng trước khi chọn đơn vị.'
  }

  if (normalizedQuestion.includes('ki hieu') || normalizedQuestion.includes('ky hieu')) {
    if (normalizedQuestion.includes('dien tro suat')) return 'Điện trở suất được kí hiệu là ρ (rho).\n\nĐây là đại lượng đặc trưng cho khả năng cản trở dòng điện của vật liệu.\n\nLưu ý: điện trở suất ρ khác điện trở R của một dây dẫn cụ thể.'
    return 'Kí hiệu chính trong chương: I là cường độ dòng điện, q là điện lượng, t là thời gian, U là hiệu điện thế, R là điện trở, ρ là điện trở suất, ξ là suất điện động, r là điện trở trong, P là công suất điện.\n\nLưu ý: R và r đều là điện trở nhưng R thường là điện trở mạch ngoài, r là điện trở trong của nguồn.'
  }

  if (topic.id === 'cuong-do-dong-dien') {
    return 'Cường độ dòng điện là đại lượng đặc trưng cho tác dụng mạnh, yếu của dòng điện.\n\nNó cho biết điện lượng đi qua tiết diện dây dẫn trong một đơn vị thời gian.\n\nLưu ý: dòng điện mạnh hơn nghĩa là I lớn hơn, không nhất thiết là hiệu điện thế lớn hơn trong mọi trường hợp.'
  }

  if (topic.id === 'dien-tro-dinh-luat-om') {
    return 'Điện trở là đại lượng đặc trưng cho mức độ cản trở dòng điện của vật dẫn.\n\nKí hiệu R, đơn vị ôm (Ω).\n\nLưu ý: điện trở R khác điện trở suất ρ; R phụ thuộc cả vật liệu, chiều dài và tiết diện dây.'
  }

  if (topic.id === 'nguon-dien') {
    return 'Nguồn điện là thiết bị tạo ra và duy trì hiệu điện thế giữa hai cực để tạo dòng điện trong mạch kín.\n\nVí dụ: pin, acquy, máy phát điện.\n\nLưu ý: nguồn điện không tự tạo dòng điện nếu mạch chưa kín.'
  }

  if (topic.id === 'nang-luong-cong-suat-dien') {
    return 'Công suất điện là năng lượng điện mà mạch hoặc thiết bị tiêu thụ trong một đơn vị thời gian.\n\nKí hiệu P, đơn vị oát (W).\n\nLưu ý: công suất lớn thì tiêu thụ điện nhanh, nhưng tiền điện còn phụ thuộc thời gian sử dụng.'
  }

  return 'Suất điện động đặc trưng cho khả năng thực hiện công của nguồn điện trên một đơn vị điện tích.\n\nKí hiệu ξ, đơn vị vôn (V).\n\nLưu ý: suất điện động ξ không luôn bằng hiệu điện thế U giữa hai cực nguồn khi mạch kín.'
}

const buildMethodFallback = (question, topic) => {
  const normalizedQuestion = normalizeText(question)

  if (normalizedQuestion.includes('tien dien') || normalizedQuestion.includes('hoa don')) {
    return 'Tính tiền điện gồm 3 bước:\n\nBước 1: Tính điện năng tiêu thụ W = P.t.\n\nBước 2: Đổi điện năng sang kWh nếu cần.\n\nBước 3: Nhân số kWh với đơn giá điện.\n\nLưu ý: phải đổi W sang kW và đổi phút/giây sang giờ nếu đơn giá tính theo kWh.'
  }

  if (normalizedQuestion.includes('dien tro trong') || normalizedQuestion.includes('suat dien dong')) {
    return 'Xác định suất điện động và điện trở trong thường làm theo quy trình:\n\nBước 1: Đo nhiều cặp giá trị U và I.\n\nBước 2: Vẽ đồ thị U theo I.\n\nBước 3: Kéo dài đồ thị, giao điểm với trục U cho ξ; độ dốc âm liên hệ với r.\n\nLưu ý: không kết luận ξ và r chắc chắn chỉ từ một lần đo.'
  }

  if (normalizedQuestion.includes('dinh luat om') || normalizedQuestion.includes('dien tro')) {
    return 'Cách làm dạng định luật Ôm:\n\nBước 1: Xác định đề cho U, I hay R.\n\nBước 2: Chọn công thức I = U / R, U = I.R hoặc R = U / I.\n\nBước 3: Thay số và ghi đúng đơn vị.\n\nLưu ý: R phải tính bằng Ω, U bằng V, I bằng A.'
  }

  return `Cách làm chung với phần ${topic.label}:\n\nBước 1: Xác định đại lượng đang cần tìm.\n\nBước 2: Chọn công thức hoặc mối liên hệ đúng trong bài.\n\nBước 3: Thay số, đổi đơn vị nếu cần và kết luận.\n\nLưu ý: chỉ dùng kiến thức thuộc đúng phần ${topic.shortLabel}, không nhảy sang bài khác nếu đề không yêu cầu.`
}

const buildStuckFallback = (question, topic) => {
  const normalizedQuestion = normalizeText(question)

  if (normalizedQuestion.includes('dien tro suat')) {
    return 'Em đang vướng ở khái niệm và ý nghĩa vật lí của điện trở suất.\n\nĐiện trở suất ρ cho biết vật liệu đó cản trở dòng điện mạnh hay yếu. Cùng chiều dài và tiết diện, vật liệu có ρ lớn hơn thì dây có điện trở lớn hơn.\n\nLưu ý: ρ là tính chất của vật liệu; R là điện trở của một dây dẫn cụ thể. Em nên xem lại phần Điện trở suất.'
  }

  if (normalizedQuestion.includes('suat dien dong')) {
    return 'Em đang vướng ở ý nghĩa vật lí của suất điện động.\n\nSuất điện động ξ cho biết nguồn điện thực hiện bao nhiêu công để dịch chuyển một đơn vị điện tích bên trong nguồn. Nó đặc trưng cho khả năng cung cấp năng lượng của nguồn.\n\nLưu ý: ξ không hoàn toàn giống U giữa hai cực nguồn khi mạch kín. Em nên xem lại phần Suất điện động của nguồn điện.'
  }

  if (normalizedQuestion.includes('cong thuc')) {
    return `Em đang vướng ở công thức của phần ${topic.shortLabel}.\n\nTrước hết hãy xác định mỗi kí hiệu trong công thức là đại lượng nào, rồi mới thay số. Nếu chưa hiểu kí hiệu, rất dễ chọn nhầm công thức.\n\nEm nên xem lại phần công thức trọng tâm của ${topic.shortLabel}.`
  }

  if (normalizedQuestion.includes('bai tap') || normalizedQuestion.includes('lam bai')) {
    return `Em đang vướng ở cách áp dụng kiến thức vào bài tập.\n\nHãy tách bài ra thành: dữ kiện đã cho, đại lượng cần tìm, công thức liên hệ. Với phần ${topic.shortLabel}, chỉ chọn công thức thuộc đúng bài đang học.\n\nEm nên xem lại phần bài tập vận dụng của ${topic.shortLabel}.`
  }

  return `Em có thể đang vướng ở ý nghĩa vật lí của phần ${topic.shortLabel}.\n\nNói ngắn gọn: ${topic.tip}\n\nLưu ý: nếu em nhầm kí hiệu hoặc đơn vị, hãy xem lại phần khái niệm/công thức trước khi làm bài tập.`
}

const buildFirstHintFallback = (question, topic) => {
  const questionKind = getQuestionKind(question)

  if (questionKind === 'direct') {
    return buildDirectAnswerFallback(question, topic)
  }

  if (questionKind === 'method') {
    return buildMethodFallback(question, topic)
  }

  if (questionKind === 'stuck') {
    return buildStuckFallback(question, topic)
  }

  if (questionKind === 'formula') {
    return buildDirectAnswerFallback(question, topic)
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
  const hasTeacherExerciseRequest =
    normalizedQuestion.includes('giao vien') ||
    normalizedQuestion.includes('thay co') ||
    normalizedQuestion.includes('duoc giao') ||
    normalizedQuestion.includes('yeu cau lam')
  const asksForRoadmap =
    normalizedQuestion.includes('lo trinh') ||
    normalizedQuestion.includes('hoc tiep') ||
    normalizedQuestion.includes('nen hoc gi') ||
    normalizedQuestion.includes('tien trinh')
  const needsSlowExplanation =
    normalizedQuestion.includes('chua hieu') ||
    normalizedQuestion.includes('giai thich lai') ||
    normalizedQuestion.includes('don gian')
  const questionKind = getQuestionKind(question)

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

  if (asksForQuiz && !hasTeacherExerciseRequest) {
    return {
      memory: nextMemory,
      text: `Mình không tự tạo bài tập mới nếu không có yêu cầu của giáo viên. Em hãy gửi câu hỏi hoặc câu trả lời trong Video khởi động, Phiếu học tập, Quiz hay Tự đánh giá; mình sẽ gợi ý và chấm giúp em. Em nên quay lại đúng phần bài học đang làm rồi thử nêu điều em chưa hiểu.`,
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
      text: `Câu được yêu cầu trong ${topic.label}: ${topic.exercise} Em hãy trả lời ngắn, mình sẽ đánh giá và gợi ý phần cần xem lại.`,
    }
  }

  if (questionKind === 'method') {
    return {
      memory: nextMemory,
      text: buildMethodFallback(question, topic),
    }
  }

  if (questionKind === 'stuck') {
    return {
      memory: {
        ...nextMemory,
        level: 'Giải thích chậm',
      },
      text: buildStuckFallback(question, topic),
    }
  }

  if (questionKind === 'direct' || questionKind === 'formula') {
    return {
      memory: nextMemory,
      text: buildDirectAnswerFallback(question, topic),
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
    text: `${topic.label}: ${topic.summary} Mẹo làm bài: ${topic.tip} Em có thể gửi câu hỏi hoặc câu trả lời trong phần đang học, mình sẽ gợi ý và đánh giá giúp em.`,
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
  guidanceAttempt = 1,
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
    questionKind === 'direct' || questionKind === 'formula'
      ? 'Nhóm A: khái niệm, định nghĩa, kí hiệu, đơn vị, công thức, cách mắc dụng cụ hoặc chức năng dụng cụ. Phải trả lời trực tiếp theo cấu trúc: trả lời ngắn gọn; giải thích dễ hiểu; nêu lỗi dễ nhầm. Không dẫn dắt, không hỏi ngược, không yêu cầu học sinh tự nhớ lại, không lan sang bài khác.'
      : questionKind === 'method'
        ? 'Nhóm B: hỏi cách làm hoặc phương pháp giải. Nếu chưa có dữ kiện cụ thể, giải thích quy trình chung theo các bước rõ ràng. Không yêu cầu học sinh phân tích đề nếu học sinh chưa đưa đề.'
        : questionKind === 'stuck'
          ? 'Nhóm E: học sinh chưa hiểu bản chất. Trước tiên xác định học sinh đang vướng khái niệm, ý nghĩa vật lí, công thức hay bài tập; sau đó giải thích đúng phần đang vướng.'
      : questionKind === 'concept'
        ? 'Đây là câu hỏi giải thích hiện tượng hoặc bản chất. Có thể dẫn dắt ngắn gọn bằng ngôn ngữ đời thường, nhưng phải bám đúng hiện tượng học sinh hỏi.'
        : questionKind === 'exercise'
          ? 'Nhóm C: bài tập cụ thể. Không đưa đáp án ngay. Gợi ý theo mức: lần 1 hướng suy nghĩ, lần 2 chi tiết hơn, lần 3 gần đáp án, sau 3 lần bắt buộc đưa đáp án đầy đủ và chỉ ra lỗi hiểu sai.'
          : questionKind === 'student-answer'
            ? 'Nhóm D: học sinh đưa ra đáp án. Không chỉ nói đúng hoặc sai; phải đánh giá phần đúng, chỉ ra phần sai nếu có, giải thích nguyên nhân và chốt kiến thức đúng.'
            : 'Đây là câu hỏi học tập chung. Hãy trả lời đúng trọng tâm, ngắn gọn, tự nhiên như giáo viên đang hỗ trợ học sinh.'
  const tutorRoleRule = `VAI TRÒ:
Bạn là AI trợ lí học tập trên website hỗ trợ tự học Vật lí 11.

Mục tiêu của bạn không phải là trả lời thật nhiều mà là giúp học sinh hiểu đúng kiến thức, phát hiện lỗi sai, biết nội dung cần ôn tập và hình thành năng lực tự học.

BƯỚC 1. XÁC ĐỊNH LOẠI CÂU HỎI
Trước khi trả lời, tự phân loại câu hỏi:
Nhóm A: khái niệm, định nghĩa, kí hiệu, đơn vị, công thức, cách mắc dụng cụ, chức năng dụng cụ.
Nhóm B: hỏi cách làm, hỏi phương pháp giải.
Nhóm C: hỏi bài tập cụ thể.
Nhóm D: học sinh đưa ra đáp án.
Nhóm E: học sinh chưa hiểu bản chất kiến thức.

BƯỚC 2. QUY TẮC TRẢ LỜI
Nhóm A: trả lời trực tiếp; không dẫn dắt; không hỏi ngược; không yêu cầu học sinh tự nhớ lại; không lan sang bài khác. Cấu trúc gồm: 1. Trả lời ngắn gọn. 2. Giải thích dễ hiểu. 3. Nêu lỗi dễ nhầm.
Nhóm B: nếu chưa có dữ kiện cụ thể, giải thích quy trình chung theo từng bước. Không yêu cầu học sinh phân tích đề nếu chưa có đề bài.
Nhóm C: không đưa đáp án ngay. Lần 1 gợi ý hướng suy nghĩ; lần 2 gợi ý chi tiết hơn; lần 3 gợi ý gần đáp án; sau 3 lần bắt buộc đưa đáp án đầy đủ, giải thích từng bước và chỉ ra lỗi hiểu sai.
Nhóm D: không chỉ nói "Đúng" hoặc "Sai". Phải đánh giá phần đúng, chỉ ra phần sai, giải thích nguyên nhân và chốt kiến thức đúng.
Nhóm E: trước tiên xác định học sinh đang vướng khái niệm, ý nghĩa vật lí, công thức hay bài tập; sau đó giải thích đúng phần đang vướng.

KIỂM TRA TRƯỚC KHI GỬI
Trước khi gửi phản hồi, tự kiểm tra: có trả lời đúng câu hỏi không; có lạc sang bài khác không; có dùng kiến thức sai không; có đang dẫn dắt một câu hỏi cần trả lời trực tiếp không; học sinh đọc xong có hiểu ngay không. Nếu vi phạm, sửa lại trước khi gửi.

PHẠM VI KIẾN THỨC:
Chỉ hỗ trợ dựa trên kiến thức đã có trong website: Bài 22 Cường độ dòng điện; Bài 23 Điện trở và Định luật Ôm; Bài 24 Nguồn điện; Bài 25 Năng lượng và công suất điện; Bài 26 Thực hành đo suất điện động và điện trở trong của pin điện hóa.

KHÔNG ĐƯỢC LÀM:
Không tạo bài tập mới nếu học sinh không yêu cầu. Không làm thay toàn bộ nhiệm vụ của học sinh khi câu hỏi thuộc diện cần dẫn dắt. Không dẫn dắt đối với Nhóm A. Không trả lời lan man ngoài phạm vi bài học. Không dùng ngôn ngữ quá hàn lâm. Không khuyến khích học sinh học thuộc máy móc.

NÊN LÀM:
Nếu phát hiện học sinh còn yếu, chỉ gợi ý "Em nên xem lại phần..." kèm đúng nội dung như Định luật Ôm, Điện trở suất, Điện năng, Công suất điện. Không tự tạo bài tập mới nếu học sinh không yêu cầu.

PHONG CÁCH:
Ngắn gọn, dễ hiểu, chính xác, giống giáo viên đang hỗ trợ học sinh. Ưu tiên hiểu bản chất vật lí. Không trả lời dài dòng. Không dùng thuật ngữ khó nếu có thể diễn đạt đơn giản hơn.`
  const hintLevelRule =
    guidanceAttempt <= 1
      ? 'Đây là lần gợi ý 1: đưa gợi ý nhẹ, yêu cầu học sinh quan sát lại hiện tượng, dữ kiện hoặc nội dung đã học. Không đưa đáp án cuối.'
      : guidanceAttempt === 2
        ? 'Đây là lần gợi ý 2: đưa gợi ý cụ thể hơn, định hướng công thức, khái niệm hoặc mối liên hệ cần dùng. Không đưa lời giải hoàn chỉnh.'
        : 'Đây là lần gợi ý 3 hoặc hơn. Phải trình bày đáp án đầy đủ, giải thích chi tiết, chỉ ra lỗi hiểu sai hoặc lỗi dễ nhầm của học sinh, rồi đề xuất ôn lại phần tương ứng.'
  const guidanceRule =
    mode === 'direct'
      ? `Đây là Nhóm A. Câu hỏi của học sinh: "${question}". Trả lời theo đúng cấu trúc: trả lời ngắn gọn; giải thích dễ hiểu; lỗi dễ nhầm. Không dẫn dắt, không hỏi ngược, không mở rộng sang bài khác.`
      : mode === 'method'
        ? `Đây là Nhóm B. Câu hỏi của học sinh: "${question}". Nếu chưa có dữ kiện cụ thể, hãy nêu quy trình chung theo từng bước. Không yêu cầu học sinh phân tích đề nếu chưa có đề bài.`
        : mode === 'stuck'
          ? `Đây là Nhóm E. Câu hỏi của học sinh: "${question}". Trước tiên nói học sinh đang vướng ở khái niệm, ý nghĩa vật lí, công thức hay bài tập; sau đó giải thích đúng phần đó, ngắn gọn và dễ hiểu.`
      : mode === 'answer'
      ? `Đây là Nhóm D: học sinh đưa ra đáp án. Câu hỏi ban đầu hoặc ngữ cảnh là: "${originalQuestion || question}". Học sinh vừa phản hồi: "${question}". Hãy chấm độ chính xác câu trả lời theo thang 0-100 cho hệ thống dùng nội bộ. Dòng đầu tiên bắt buộc viết đúng mẫu: "Điểm: NN%". Từ dòng thứ hai trở đi tuyệt đối không nhắc lại điểm, phần trăm, ngưỡng chấm hay chữ "độ chính xác". Không chỉ nói đúng hoặc sai. Nếu đủ ngữ cảnh, phải đánh giá phần đúng, chỉ ra phần sai nếu có, giải thích nguyên nhân và chốt kiến thức đúng. Nếu thiếu câu hỏi gốc nên nói rõ chưa đủ dữ kiện để kết luận, nhưng vẫn nhận xét được phần nào có thể. ${guidanceAttempt >= 3 ? 'Vì học sinh đã được gợi ý nhiều lần, hãy trình bày đáp án đúng và đề xuất phần cần xem lại.' : 'Nếu câu trả lời chưa đạt và chưa đủ 3 lần gợi ý, hãy đưa thêm một gợi ý vừa sức để học sinh sửa lại.'} Luôn kết thúc bằng một định hướng học tập ngắn.`
      : `Đây là lượt gợi ý cho câu hỏi học tập. ${hintLevelRule} ${firstHintRule} ${guidanceAttempt < 3 ? 'Gợi ý phải vừa sức, cụ thể theo câu hỏi của học sinh, tối đa 2-4 câu và kết thúc bằng một câu hỏi nhỏ để học sinh thử trả lời tiếp.' : 'Không hỏi tiếp để kéo dài gợi ý; hãy chốt đáp án đầy đủ trong lượt này.'} Luôn kết thúc bằng một định hướng học tập ngắn.`

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
            `${tutorRoleRule}\n\nTrả lời bằng tiếng Việt, thân thiện, ngắn gọn, đúng kiến thức phổ thông. Không hiển thị quá trình suy nghĩ nội bộ, không dùng thẻ <think>. Không dùng markdown đậm kiểu **...** cho công thức; hãy viết công thức rõ ràng như P = U × I, I = U / R.`,
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

const defaultLessonMindmapPositions = ['left-top', 'left-middle', 'left-bottom', 'right-top', 'right-bottom']

const lessonMindmapLayouts = {
  'dien-tro-dinh-luat-om': ['left-top', 'left-bottom', 'right-top', 'right-bottom'],
  'nguon-dien': ['left-top', 'left-bottom', 'right-top', 'right-bottom'],
  'nang-luong-cong-suat-dien': ['left-top', 'left-bottom', 'right-top', 'right-bottom'],
}

const lessonMindmapLinePaths = {
  'left-top': 'M642 170 H712 C785 170 785 312 785 340 H865',
  'left-middle': 'M642 445 H865',
  'left-bottom': 'M642 718 H712 C785 718 785 560 785 520 H865',
  'right-top': 'M1115 340 C1115 245 1192 218 1270 218 H1318',
  'right-bottom': 'M1115 520 C1115 646 1196 676 1318 676',
}

const getMindmapPalette = (topicId) =>
  mindmapCards.find((card) => card.topicId === topicId) || {
    color: '#246bff',
    softColor: '#f6fbff',
  }

function LessonMindmap({ topic, onClose }) {
  const branches = lessonMindmaps[topic.id] || []
  const palette = getMindmapPalette(topic.id)
  const positions = lessonMindmapLayouts[topic.id] || defaultLessonMindmapPositions
  const getPointKey = (point) => (typeof point === 'string' ? point : `${point.type}-${JSON.stringify(point)}`)
  const getPointClassName = (point) => (typeof point === 'string' && point.trim().startsWith('+') ? 'lesson-mindmap__subpoint' : undefined)
  const renderSymbol = (symbol) => {
    if (symbol === 'emf') {
      return (
        <span
          aria-label="E"
          className="lesson-mindmap-symbol lesson-mindmap-symbol--emf"
          role="img"
          style={{ '--symbol-image': `url(${emfSymbolImage})` }}
        />
      )
    }

    return null
  }
  const renderRichParts = (parts) => parts.map((part, index) => (
    typeof part === 'string'
      ? <span key={`${index}-${part}`}>{part}</span>
      : (
        <Fragment key={`${index}-${part.symbol || part.formula}`}>
          {part.symbol ? renderSymbol(part.symbol) : null}
          {part.formula === 'power' ? (
            <span className="lesson-mindmap-inline-formula" aria-label="P bằng A trên t bằng U I">
              <span>P =</span>
              <span className="lesson-mindmap-fraction">
                <span>A</span>
                <span>t</span>
              </span>
              <span>= UI</span>
            </span>
          ) : null}
        </Fragment>
      )
  ))
  const renderFormulaParts = (parts) => parts?.map((part, index) => (
    typeof part === 'string'
      ? <Fragment key={`${index}-${part}`}>{part}</Fragment>
      : <sub key={`${index}-${part.sub}`}>{part.sub}</sub>
  ))
  const renderPoint = (point) => {
    if (typeof point === 'string') {
      return point.trim().startsWith('+') ? point.trim().slice(1).trim() : point
    }

    if (point.type === 'richLine') {
      return <span className="lesson-mindmap-rich-line">{renderRichParts(point.parts)}</span>
    }

    if (point.type === 'symbolLine') {
      return (
        <span className="lesson-mindmap-symbol-line">
          <span>{point.label}</span>
          {renderSymbol(point.symbol)}
        </span>
      )
    }

    if (point.type === 'fraction') {
      return (
        <span className="lesson-mindmap-formula">
          <span>{point.left}</span>
          {point.symbol && renderSymbol(point.symbol)}
          {point.operator && <span>{point.operator}</span>}
          <span className="lesson-mindmap-fraction" aria-label={`${point.numerator} trên ${point.denominator}`}>
            <span>{point.numeratorParts ? renderFormulaParts(point.numeratorParts) : (point.numeratorSymbol ? renderSymbol(point.numeratorSymbol) : point.numerator)}</span>
            <span>{point.denominatorParts ? renderFormulaParts(point.denominatorParts) : point.denominator}</span>
          </span>
        </span>
      )
    }

    return ''
  }

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

        <div className={lessonMindmapLayouts[topic.id] ? 'lesson-mindmap lesson-mindmap--balanced' : 'lesson-mindmap'}>
          <div className="lesson-mindmap__center">
            <span>{`Bài ${topic.number}`}</span>
            <strong>{topic.shortLabel}</strong>
          </div>

          <svg className="lesson-mindmap__lines" viewBox="0 0 1768 890" aria-hidden="true" preserveAspectRatio="none">
            {positions.slice(0, branches.length).map((position) => (
              <path d={lessonMindmapLinePaths[position]} key={position} />
            ))}
          </svg>

          {branches.map((branch, index) => (
            <article
              className={`lesson-mindmap__branch lesson-mindmap__branch--${positions[index] || 'left-middle'}`}
              key={`${index}-${branch.title || getPointKey(branch.points[0])}`}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {branch.title && <h3>{branch.title}</h3>}
              <ul className={branch.points.length === 1 ? 'lesson-mindmap__branch-list--plain' : undefined}>
                {branch.points.map((point) => (
                  <li className={getPointClassName(point)} key={getPointKey(point)}>{renderPoint(point)}</li>
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
    endTime: 3,
    text: 'Hoạt động trước khi học: quan sát hai bóng đèn và chuẩn bị trả lời câu hỏi.',
    pauseOnShow: true,
    actionLabel: 'Tiếp tục',
  },
  {
    id: 'brighter-case',
    type: 'question',
    time: 3.8,
    question: 'Bóng đèn nào sáng hơn?',
    options: ['Bóng đèn ở Trường hợp 1', 'Bóng đèn ở Trường hợp 2'],
    answer: 0,
    correctFeedback: 'Đúng. Em đã quan sát được sự khác nhau về độ sáng giữa hai bóng đèn.',
    wrongHint: 'Hãy quan sát lại phần phát sáng của hai bóng đèn và chọn bóng có ánh sáng rõ hơn.',
  },
  {
    id: 'stronger-current-prediction',
    type: 'question',
    time: 28.5,
    question: 'Theo em, dòng điện trong mạch nào mạnh hơn?',
    options: ['Mạch có bóng đèn sáng hơn', 'Mạch có bóng đèn sáng yếu hơn'],
    answer: 0,
    correctFeedback: 'Đúng hướng. Đây là dự đoán ban đầu dựa trên hiện tượng quan sát được.',
    wrongHint: 'Hãy liên hệ độ sáng của bóng đèn với mức độ hoạt động mạnh hoặc yếu của thiết bị.',
  },
  {
    id: 'observe-two-circuits',
    type: 'info',
    time: 15.5,
    lines: [
      'Hãy quan sát bóng đèn của 2 mạch sau để trả lời câu hỏi.',
    ],
  },
  {
    id: 'current-can-vary',
    type: 'info',
    time: 30,
    lines: [
      'Gợi ý định hướng:',
      'Dòng điện có thể có mức độ mạnh, yếu khác nhau.',
      'Ta cần tìm một đại lượng để mô tả mức độ đó.',
    ],
  },
  {
    id: 'needed-quantity',
    type: 'question',
    time: 31.5,
    question: 'Cần đại lượng nào để đặc trưng cho mức độ mạnh, yếu của dòng điện?',
    options: [
      'Một đại lượng mô tả dòng điện mạnh hay yếu',
      'Màu sắc của dây dẫn',
      'Hình dạng của bóng đèn',
    ],
    answer: 0,
    correctFeedback: 'Đúng hướng. Hãy giữ dự đoán này để kiểm chứng ở phiếu học tập.',
    wrongHint: 'Câu hỏi đang hướng tới một đại lượng dùng để mô tả chính mức độ mạnh, yếu của dòng điện.',
  },
  {
    id: 'worksheet-reminder',
    type: 'info',
    time: 34,
    completeOnContinue: true,
    lines: [
      'Vấn đề học tập:',
      'Đại lượng nào đặc trưng cho mức độ mạnh, yếu của dòng điện?',
      'Hãy hoàn thành phiếu học tập để tìm hiểu đại lượng này.',
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
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [activeInteraction, setActiveInteraction] = useState(null)
  const [answeredInteractions, setAnsweredInteractions] = useState({})
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [dragAnswers, setDragAnswers] = useState({})
  const [answerResult, setAnswerResult] = useState(null)
  const [sequenceIndex, setSequenceIndex] = useState(0)
  const [sequenceCorrect, setSequenceCorrect] = useState([])
  const [sequenceWrongCount, setSequenceWrongCount] = useState(0)
  const [isMobileVideoExpanded, setIsMobileVideoExpanded] = useState(false)

  useEffect(() => {
    const syncFullscreenState = () => {
      const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

      if (!fullscreenElement || fullscreenElement !== containerRef.current) {
        setIsMobileVideoExpanded(false)
      }
    }

    document.addEventListener('fullscreenchange', syncFullscreenState)
    document.addEventListener('webkitfullscreenchange', syncFullscreenState)

    return () => {
      document.removeEventListener('fullscreenchange', syncFullscreenState)
      document.removeEventListener('webkitfullscreenchange', syncFullscreenState)
    }
  }, [])

  const shouldUseMobileVideoMode = () => window.matchMedia?.('(max-width: 640px)').matches

  const exitNativeVideoFullscreen = (video) => {
    if (video?.webkitDisplayingFullscreen && typeof video.webkitExitFullscreen === 'function') {
      video.webkitExitFullscreen()
    }
  }

  const toggleMobileVideoFullscreen = async () => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (fullscreenElement === container) {
      const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen
      await exitFullscreen?.call(document)
      setIsMobileVideoExpanded(false)
      return
    }

    setIsMobileVideoExpanded(true)

    const requestFullscreen = container.requestFullscreen || container.webkitRequestFullscreen

    try {
      await requestFullscreen?.call(container)
    } catch {
      setIsMobileVideoExpanded(true)
    }
  }

  const collapseMobileVideoMode = async () => {
    if (!shouldUseMobileVideoMode()) {
      return
    }

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (fullscreenElement === containerRef.current) {
      const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen
      await exitFullscreen?.call(document)
    }

    setIsMobileVideoExpanded(false)
  }

  const openTimedInteraction = (interaction) => {
    const video = videoRef.current

    if (!video) {
      return
    }

    if (shouldUseMobileVideoMode()) {
      exitNativeVideoFullscreen(video)
      setIsMobileVideoExpanded(false)
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

    if (['question', 'drag-fill', 'info', 'sequence'].includes(activeInteraction?.type) || activeInteraction?.pauseOnShow) {
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

    if (timedMessage?.pauseOnShow && !answeredInteractions[timedMessage.id]) {
      openTimedInteraction(timedMessage)
      return
    }

    if (timedMessage && !timedMessage.pauseOnShow) {
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
      return
    }

    collapseMobileVideoMode()
    onComplete?.()
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
      collapseMobileVideoMode()
      onComplete?.()
      return
    }

    if (activeInteraction.completeOnContinue) {
      collapseMobileVideoMode()
      onComplete?.()
      return
    }

    if (activeInteraction.type !== 'sequence') {
      collapseMobileVideoMode()
      window.setTimeout(() => video.play(), 80)
    }
  }

  const isBlockingOverlay = ['question', 'drag-fill', 'info', 'sequence'].includes(activeInteraction?.type)
  const isSequenceDone = activeInteraction?.type === 'sequence' && sequenceIndex >= activeInteraction.cards.length
  const videoClassName = [
    'interactive-video',
    isBlockingOverlay ? 'interactive-video--paused' : '',
    isMobileVideoExpanded ? 'interactive-video--mobile-expanded' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={videoClassName} ref={containerRef}>
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

      <button
        className="video-mobile-fullscreen-btn"
        type="button"
        onClick={toggleMobileVideoFullscreen}
      >
        {isMobileVideoExpanded ? 'Thu nhỏ video' : 'Toàn màn hình tương tác'}
      </button>

      {activeInteraction?.type === 'message' && (
        <div className={activeInteraction.transparent ? 'video-toast video-toast--transparent' : 'video-toast'}>
          <strong>{activeInteraction.text}</strong>
          {activeInteraction.pauseOnShow && <button className="video-toast-action" type="button" onClick={handleContinueVideo}>{activeInteraction.actionLabel || 'Tiếp tục'}</button>}
          {!activeInteraction.pauseOnShow && activeInteraction.actionLabel && <button className="video-toast-action" type="button" onClick={() => onComplete?.()}>{activeInteraction.actionLabel}</button>}
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

function Lesson22InteractiveWorksheet({ onAction, activePart = 'before' }) {
  const isBeforePart = activePart === 'before'
  const isWorksheetPart = activePart === 'during'
  const isAfterPart = activePart === 'after'
  const [revealedBlocks, setRevealedBlocks] = useState({
    worksheet: PREVIEW_ALL_LESSON_PARTS || isWorksheetPart || isAfterPart,
    quiz: PREVIEW_ALL_LESSON_PARTS || isAfterPart,
    selfCheck: PREVIEW_ALL_LESSON_PARTS || isAfterPart,
  })
  const [answers, setAnswers] = useState({
    task1Fill: '',
    task1Short: '',
    task3FirstCase: '',
    task3SecondCase: '',
    task3Predict: '',
    task4UnitChoice: '',
    task4Charge: '',
    task4Meaning: '',
    task5CarrierChoice: '',
    task5Tf: '',
    task5Fill: '',
    task5Direction: '',
    task6CountChoice: '',
    task6SpeedChoice: '',
    task6Short: '',
  })
  const [attempts, setAttempts] = useState({})
  const [feedbacks, setFeedbacks] = useState({})
  const [worksheetStep, setWorksheetStep] = useState(1)
  const [lampCurrent, setLampCurrent] = useState(0.2)
  const [magnetCurrent, setMagnetCurrent] = useState(0.2)
  const [selfChecks, setSelfChecks] = useState({})
  const [selfReflection, setSelfReflection] = useState({
    question: '',
    plan: '',
  })

  const revealBlock = (key) => {
    setRevealedBlocks((current) => (current[key] ? current : { ...current, [key]: true }))
  }

  const revealWorksheetFromVideo = () => {
    revealBlock('worksheet')
    window.setTimeout(() => {
      document.getElementById('lesson22-worksheet')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  const revealSelfCheckFromQuiz = () => {
    revealBlock('selfCheck')
    window.setTimeout(() => {
      document.getElementById('lesson22-self-check')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
  }

  const updateAnswer = (key, value) => {
    setAnswers((current) => ({ ...current, [key]: value }))
  }

  const worksheetTaskKeys = ['task1', 'task3', 'task4', 'task5', 'task6']

  const setProgressFeedback = (key, isCorrect, answer, hint, explanation, correctMessage = 'Đúng. Em đang suy luận theo đúng hướng.', nextWorksheetStep) => {
    if (isCorrect) {
      setAttempts((current) => ({ ...current, [key]: 0 }))
      const nextFeedbacks = { ...feedbacks, [key]: { type: 'correct', message: correctMessage } }
      const worksheetDone = worksheetTaskKeys.every((item) => nextFeedbacks[item]?.type === 'correct')
      const taskNumber = Number(key.replace('task', ''))

      setFeedbacks(nextFeedbacks)
      const targetStep = nextWorksheetStep === false ? null : nextWorksheetStep ?? (Number.isFinite(taskNumber) ? Math.min(taskNumber + 1, 5) : null)
      if (targetStep) {
        setWorksheetStep((current) => Math.max(current, targetStep))
      }
      if (worksheetDone) {
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

  const includesAny = (text, keywords) => keywords.some((keyword) => text.includes(keyword))

  const checkTask1 = () => {
    const observation = normalizeText(answers.task1Short)
    const concept = normalizeText(answers.task1Fill)
    const hasCurrentStrengthConcept =
      concept.includes('dong dien') &&
      (
        concept.includes('dong dien co tac dung manh hay yeu') ||
        concept.includes('dong dien co the manh hoac yeu') ||
        concept.includes('dong dien manh yeu') ||
        (concept.includes('manh') && concept.includes('yeu'))
      )
    const isCorrect =
      observation.includes('bong den') &&
      includesAny(observation, ['sang hon', 'sang manh', 'sang manh hon']) &&
      includesAny(observation, ['ghim', 'nam cham']) &&
      includesAny(observation, ['nhieu hon', 'nhieu ghim', 'hut duoc nhieu', 'tang', 'tang len']) &&
      hasCurrentStrengthConcept
    setProgressFeedback(
      'task1',
      isCorrect,
      'Bóng đèn sáng hơn, nam châm điện hút được nhiều ghim hơn; dòng điện có thể mạnh hoặc yếu khác nhau.',
      'Gợi ý: so sánh độ sáng bóng đèn, số ghim bị hút khi số chỉ ampe kế tăng, rồi rút ra nhận xét về dòng điện.',
      'Cần nêu được: bóng đèn sáng hơn, nam châm điện hút nhiều ghim hơn; dòng điện có thể mạnh hoặc yếu khác nhau.',
      'Cường độ dòng điện là đại lượng đặc trưng cho tác dụng mạnh hay yếu của dòng điện.',
      false,
    )
  }

  const checkTask3 = () => {
    const predict = normalizeText(answers.task3Predict)
    const isCorrect =
      answers.task3FirstCase === 'b' &&
      answers.task3SecondCase === 'a' &&
      predict.includes('dien luong') &&
      includesAny(predict, ['thoi gian', 'thoi gian chuyen qua'])
    setProgressFeedback(
      'task3',
      isCorrect,
      'Cường độ dòng điện phụ thuộc vào điện lượng chuyển qua tiết diện dây dẫn và thời gian chuyển qua. Công thức: I = Δq / Δt.',
      'Gợi ý: trước hết so sánh điện lượng trong cùng 1 giây, sau đó so sánh thời gian khi cùng có 6 C điện lượng đi qua.',
      'Cần chọn B ở phần điện lượng, chọn A ở phần thời gian và nêu được hai đại lượng: điện lượng, thời gian.',
      'Cường độ dòng điện được xác định bằng điện lượng chuyển qua tiết diện thẳng của dây dẫn trong một đơn vị thời gian.',
      3,
    )
  }

  const isTask4ChargeCorrect = (value) => {
    const compactValue = normalizeText(value).replace(/\s/g, '')
    return ['1c', '1culong', 'motc', 'motculong'].some((answer) => compactValue.includes(answer))
  }

  const checkTask4 = () => {
    const charge = answers.task4Charge
    const meaning = normalizeText(answers.task4Meaning)
    const hasOne = meaning.includes('1') || meaning.includes('mot')
    const hasCoulomb = /\bc\b/.test(meaning) || meaning.includes('culong')
    const hasOneSecond = meaning.includes('1 giay') || meaning.includes('mot giay') || meaning.includes('moi giay') || /\b1\s*s\b/.test(meaning)
    const describesPassing = includesAny(meaning, ['chuyen qua', 'di qua', 'qua tiet dien'])
    const mentionsSection = meaning.includes('tiet dien')
    const isCorrect =
      answers.task4UnitChoice === 'a' &&
      isTask4ChargeCorrect(charge) &&
      hasOne &&
      hasCoulomb &&
      hasOneSecond &&
      describesPassing &&
      mentionsSection
    setProgressFeedback(
      'task4',
      isCorrect,
      '1 ampe là cường độ dòng điện mà khi chạy qua tiết diện thẳng của dây dẫn thì trong 1 giây có điện lượng 1 culông chuyển qua tiết diện đó.',
      'Gợi ý: từ I = Δq/Δt suy ra Δq = IΔt. Thay I = 1 A và Δt = 1 s để tìm Δq.',
      'Cần chọn A, tính Δq = 1 C và nêu được trong 1 giây có 1 C điện lượng chuyển qua tiết diện dây dẫn.',
      '1 ampe là cường độ dòng điện mà khi chạy qua tiết diện thẳng của dây dẫn thì trong 1 giây có điện lượng 1 culông chuyển qua tiết diện đó.',
      4,
    )
  }

  const checkTask5 = () => {
    const fill = normalizeText(answers.task5Fill)
    const isCorrect =
      answers.task5CarrierChoice === 'electron' &&
      answers.task5Tf === 'true' &&
      fill.includes('co huong') &&
      answers.task5Direction === 'opposite'
    setProgressFeedback(
      'task5',
      isCorrect,
      'Trong kim loại, hạt tải điện là electron tự do; khi có điện trường, electron tự do dịch chuyển có hướng; chiều dòng điện quy ước ngược chiều chuyển động của electron.',
      'Gợi ý: electron mang điện âm nên chiều chuyển động của electron không trùng chiều dòng điện quy ước.',
      'Cần chọn electron tự do, xác nhận chuyển động hỗn loạn khi chưa có điện trường, điền có hướng và chọn ngược chiều.',
      undefined,
      5,
    )
  }

  const checkTask6 = () => {
    const short = normalizeText(answers.task6Short)
    const isCorrect =
      answers.task6CountChoice === 'increase' &&
      answers.task6SpeedChoice === 'increase' &&
      includesAny(short, ['tang', 'lon hon', 'manh hon']) &&
      (short.includes('so') || short.includes('nhieu') || short.includes('toc do'))
    setProgressFeedback(
      'task6',
      isCorrect,
      'Số hạt mang điện đi qua tiết diện trong một giây tăng hoặc tốc độ dịch chuyển có hướng tăng thì cường độ dòng điện tăng.',
      'Gợi ý: nhiều hạt đi qua hơn trong cùng thời gian nghĩa là tác dụng của dòng điện mạnh hơn.',
      'Cần chọn tăng ở cả hai quan sát và rút ra nhận xét về số lượng hạt, tốc độ chuyển động với cường độ dòng điện.',
      undefined,
      6,
    )
  }

  const finishWorksheet = () => {
    onAction('Đã hoàn thành phiếu học tập Bài 22')
  }

  const updateSelfCheck = (key) => {
    setSelfChecks((current) => ({ ...current, [key]: !current[key] }))
  }

  const updateSelfReflection = (key, value) => {
    setSelfReflection((current) => ({ ...current, [key]: value }))
  }

  const completedWorksheetTasks = worksheetTaskKeys.filter((key) => feedbacks[key]?.type === 'correct').length
  const worksheetProgress = Math.round((completedWorksheetTasks / worksheetTaskKeys.length) * 100)
  const task4ChargeIsCorrect = isTask4ChargeCorrect(answers.task4Charge)
  const lampBrightness = Math.round(((Number(lampCurrent) - 0.2) / 0.8) * 100)
  const lampBrightnessLevel = lampBrightness / 100
  const lampGlowLevel = lampBrightnessLevel ** 1.2
  const lampCurrentDuration = 1.35 - lampBrightnessLevel * 0.9
  const lampCurrentSpeed = `${lampCurrentDuration}s`
  const lampEffectStyle = {
    '--lamp-aura-scale': (0.38 + lampBrightnessLevel * 0.86).toFixed(3),
    '--lamp-aura-blur': `${6 + lampBrightnessLevel * 22}px`,
    '--lamp-aura-opacity': (0.02 + lampGlowLevel * 0.96).toFixed(3),
    '--lamp-core-opacity': (0.01 + lampGlowLevel * 0.92).toFixed(3),
    '--lamp-scene-warm-opacity': (0.01 + lampGlowLevel * 0.24).toFixed(3),
    '--lamp-highlight-opacity': (0.1 + lampGlowLevel * 0.88).toFixed(3),
    '--lamp-warm-opacity': (0.02 + lampGlowLevel * 0.92).toFixed(3),
    '--lamp-warm-mid-opacity': (0.01 + lampGlowLevel * 0.68).toFixed(3),
    '--lamp-glow-size': `${1 + lampBrightnessLevel * 68}px`,
    '--lamp-glow-opacity': (0.02 + lampGlowLevel * 0.96).toFixed(3),
    '--lamp-inset-size': `${1 + lampBrightnessLevel * 22}px`,
    '--lamp-inset-opacity': (0.03 + lampGlowLevel * 0.76).toFixed(3),
    '--filament-glow-size': `${1 + lampBrightnessLevel * 18}px`,
    '--filament-glow-opacity': (0.05 + lampGlowLevel * 0.88).toFixed(3),
    '--wire-glow-size': `${1 + lampBrightnessLevel * 20}px`,
    '--wire-glow-opacity': (0.03 + lampBrightnessLevel * 0.52).toFixed(3),
    '--electron-glow-size': `${4 + lampBrightnessLevel * 24}px`,
    '--electron-glow-opacity': (0.16 + lampBrightnessLevel * 0.68).toFixed(3),
    '--electron-opacity': (0.04 + lampBrightnessLevel * 0.96).toFixed(3),
    '--lamp-pulse-min-scale': (0.48 + lampBrightnessLevel * 0.52).toFixed(3),
    '--lamp-pulse-max-scale': (0.56 + lampBrightnessLevel * 0.72).toFixed(3),
    '--lamp-speed': lampCurrentSpeed,
    '--lamp-delay-2': `${-lampCurrentDuration / 3}s`,
    '--lamp-delay-3': `${-lampCurrentDuration / 1.5}s`,
  }
  const attractedPins = Math.round(((Number(magnetCurrent) - 0.2) / 0.8) * 5)
  const currentLabel = (value, weakText, strongText) => Number(value) < 0.65 ? weakText : strongText

  const renderChoiceGroup = (answerKey, options) => (
    <div className="worksheet-choice-grid">
      {options.map((option) => (
        <button
          className={answers[answerKey] === option.id ? 'soft-choice soft-choice--active' : 'soft-choice'}
          key={option.id}
          type="button"
          onClick={() => updateAnswer(answerKey, option.id)}
        >
          {option.text}
        </button>
      ))}
    </div>
  )

  const renderStepFeedback = (answerKey, correctValue, correctText = 'Đúng hướng.', wrongText = 'Hãy quan sát lại dữ kiện trước đó.') => {
    if (!answers[answerKey]) return null
    return <p className={answers[answerKey] === correctValue ? 'worksheet-step-feedback worksheet-step-feedback--correct' : 'worksheet-step-feedback'}>{answers[answerKey] === correctValue ? correctText : wrongText}</p>
  }
  return (
    <section className="restored-lesson restored22">
      <div className="restored-hero">
        <span>Bài 22</span>
        <h1>Cường độ dòng điện</h1>
        <p>Cấu trúc tự học gồm 4 phần: Video khởi động, Phiếu học tập, Quiz và Tự đánh giá.</p>
      </div>

      {isBeforePart && <article className="restored-card">
        <div className="journey-heading">
          <span>Phần 1</span>
          <h2>Video khởi động</h2>
          <p>Hoạt động trước khi học: quan sát thiết bị điện hoạt động mạnh/yếu để hình thành vấn đề học tập.</p>
        </div>
        <div className="lesson22-section-meta" aria-label="Thông tin phần video khởi động">
          <div>
            <strong>Mục tiêu</strong>
            <p>Tạo tình huống có vấn đề và định hướng nhiệm vụ tìm hiểu đại lượng đặc trưng cho dòng điện mạnh, yếu.</p>
          </div>
          <div>
            <strong>Nhiệm vụ của học sinh</strong>
            <p>Quan sát hai bóng đèn hoặc thiết bị điện, trả lời câu hỏi tương tác và nêu dự đoán ban đầu.</p>
          </div>
          <div>
            <strong>Sản phẩm học tập</strong>
            <p>Câu trả lời và dự đoán ban đầu của học sinh trước khi chuyển sang phiếu học tập.</p>
          </div>
        </div>
        <div className="h5p-embed local-video-embed">
          <InteractiveLessonVideo
            interactions={lesson22VideoInteractions}
            onComplete={revealWorksheetFromVideo}
            src="/videos/bai22.mp4"
            title="Video tương tác bài 22"
          />
        </div>
      </article>}

      {revealedBlocks.worksheet && isWorksheetPart && <article className="restored-card journey-card lesson22-reveal-block" id="lesson22-worksheet">
        <div className="journey-heading">
          <span>Phần 2</span>
          <h2>Phiếu học tập</h2>
          <strong className="journey-heading__subhead">Khám phá cường độ dòng điện</strong>
          <p>Từ quan sát định tính đến dữ kiện định lượng, em tự hình thành khái niệm và công thức cường độ dòng điện.</p>
        </div>
        <div className="lesson22-section-meta" aria-label="Thông tin phần phiếu học tập">
          <div>
            <strong>Mục tiêu</strong>
            <p>Dẫn dắt học sinh tự khám phá khái niệm cường độ dòng điện, công thức I = Δq / Δt, đơn vị đo và dòng điện trong kim loại.</p>
          </div>
          <div>
            <strong>Nhiệm vụ của học sinh</strong>
            <p>Quan sát, so sánh dữ kiện, trả lời ngắn và rút ra kết luận sau từng nhiệm vụ.</p>
          </div>
          <div>
            <strong>Sản phẩm học tập</strong>
            <p>Phiếu học tập đã hoàn thành với các nhận xét và kết luận do học sinh tự rút ra.</p>
          </div>
        </div>

        <div className="worksheet-progress-card">
          <div>
            <strong>Tiến trình phiếu học tập</strong>
            <span>{completedWorksheetTasks}/5 nhiệm vụ đã hoàn thành</span>
          </div>
          <div className="review-progress" aria-label="Tiến trình phiếu học tập">
            <span style={{ width: `${worksheetProgress}%` }} />
          </div>
        </div>

        <div className="journey-line">
          {worksheetStep >= 1 && <section className="journey-item">
            <b>1</b>
            <div>
              <h3>Nhiệm vụ 1. Hình thành khái niệm cường độ dòng điện</h3>
              <p className="worksheet-prompt"><b>Mục tiêu:</b> Nhận biết dòng điện có thể mạnh hoặc yếu khác nhau và hình thành khái niệm cường độ dòng điện.</p>
              <div className="current-sim-grid">
                <section className="current-sim-card current-sim-card--lamp">
                  <div className="current-sim-top">
                    <strong>Thí nghiệm bóng đèn</strong>
                    <span className="ammeter-readout">A = {Number(lampCurrent).toFixed(1)} A</span>
                  </div>
                  <div
                    className="lamp-sim-scene"
                    style={lampEffectStyle}
                  >
                    <div className="lamp-bulb"><span /></div>
                    <div className="simple-wire"><i /><i /><i /></div>
                    <div className="sim-ammeter">A</div>
                  </div>
                  <label className="sim-slider">
                    <span>{currentLabel(lampCurrent, 'Dòng điện nhỏ → đèn sáng yếu', 'Dòng điện lớn → đèn sáng mạnh')}</span>
                    <input min="0.2" max="1" step="0.1" type="range" value={lampCurrent} onChange={(event) => setLampCurrent(event.target.value)} />
                  </label>
                </section>

                <section className="current-sim-card current-sim-card--magnet">
                  <div className="current-sim-top">
                    <strong>Thí nghiệm nam châm điện</strong>
                    <span className="ammeter-readout">A = {Number(magnetCurrent).toFixed(1)} A</span>
                  </div>
                  <div className="magnet-sim-scene">
                    <div className="coil-core"><span /><span /><span /><span /></div>
                    <div className="paperclip-field">
                      {[0, 1, 2, 3, 4].map((pin) => (
                        <i className={pin < attractedPins ? 'paperclip paperclip--attracted' : 'paperclip'} key={pin} style={{ '--pin': pin }} />
                      ))}
                    </div>
                    <div className="sim-ammeter">A</div>
                  </div>
                  <label className="sim-slider">
                    <span>{currentLabel(magnetCurrent, 'Dòng điện nhỏ → hút ít ghim', 'Dòng điện lớn → hút nhiều ghim')}</span>
                    <input min="0.2" max="1" step="0.1" type="range" value={magnetCurrent} onChange={(event) => setMagnetCurrent(event.target.value)} />
                  </label>
                </section>
              </div>
              <div className="worksheet-observe-step">
                <strong>Bước 1. Quan sát</strong>
                <p>Quan sát độ sáng của bóng đèn, số lượng ghim giấy bị nam châm điện hút và số chỉ ampe kế tương ứng.</p>
              </div>
              <label className="worksheet-answer"><span>Bước 2. Khi số chỉ ampe kế tăng thì độ sáng bóng đèn và số lượng ghim bị hút thay đổi như thế nào?</span><textarea value={answers.task1Short} onChange={(event) => updateAnswer('task1Short', event.target.value)} placeholder="Ví dụ: Bóng đèn sáng hơn..." /></label>
              <label className="worksheet-answer"><span>Bước 3. Từ các hiện tượng trên, em có nhận xét gì về dòng điện trong các trường hợp?</span><textarea value={answers.task1Fill} onChange={(event) => updateAnswer('task1Fill', event.target.value)} placeholder="Ví dụ: Dòng điện có thể..." /></label>
              {feedbacks.task1?.type === 'correct' && (
                <>
                  <div className="worksheet-question-block">
                    <strong>Bước 4. Hình thành đại lượng mới</strong>
                    <p>Để biểu thị mức độ mạnh hay yếu của dòng điện, người ta sử dụng đại lượng gọi là cường độ dòng điện.</p>
                  </div>
                  <div className="worksheet-conclusion"><strong>Bước 5. Kết luận</strong><span>Cường độ dòng điện là đại lượng đặc trưng cho tác dụng mạnh hay yếu của dòng điện.</span></div>
                </>
              )}
              {feedbacks.task1?.type === 'wrong' && <p className="inline-feedback inline-feedback--wrong">{feedbacks.task1.message}</p>}
              <button className="primary-soft-btn" type="button" onClick={feedbacks.task1?.type === 'correct' ? () => setWorksheetStep((current) => Math.max(current, 2)) : checkTask1}>{feedbacks.task1?.type === 'correct' ? 'Tiếp tục nhiệm vụ tiếp theo' : 'Kiểm tra câu trả lời'}</button>
            </div>
          </section>}

          {worksheetStep >= 2 && <section className="journey-item">
            <b>2</b>
            <div>
              <h3>Nhiệm vụ 2. Xác định cường độ dòng điện</h3>
              <p className="worksheet-prompt"><b>Mục tiêu:</b> Nhận ra cường độ dòng điện phụ thuộc vào điện lượng chuyển qua tiết diện dây dẫn và thời gian chuyển qua.</p>
              <div className="worksheet-observe-step">
                <strong>Bước 1. Quan sát dữ kiện: Ảnh hưởng của điện lượng</strong>
                <div className="case-compare-card">
                  <span className="case-compare-label">Cùng thời gian: 1 s</span>
                  <div className="case-compare-options">
                    <div><b>Trường hợp A</b><strong>2 C</strong><small>điện lượng đi qua tiết diện dây dẫn</small></div>
                    <div><b>Trường hợp B</b><strong>6 C</strong><small>điện lượng đi qua tiết diện dây dẫn</small></div>
                  </div>
                </div>
              </div>
              <div className="worksheet-question-block"><strong>Bước 2. So sánh điện lượng: Trong cùng một khoảng thời gian, trường hợp nào có nhiều điện lượng đi qua tiết diện dây dẫn hơn?</strong>{renderChoiceGroup('task3FirstCase', [{ id: 'a', text: 'Trường hợp A' }, { id: 'b', text: 'Trường hợp B' }])}{renderStepFeedback('task3FirstCase', 'b', 'Đúng: trong 1 giây, trường hợp B có 6 C đi qua, nhiều hơn trường hợp A.')}</div>
              {answers.task3FirstCase === 'b' && <div className="worksheet-conclusion"><strong>Bước 3. Nhận xét</strong><span>Trong cùng một khoảng thời gian, điện lượng chuyển qua tiết diện dây dẫn càng lớn thì dòng điện càng mạnh.</span></div>}
              <div className="worksheet-observe-step">
                <strong>Bước 4. Quan sát dữ kiện: Ảnh hưởng của thời gian</strong>
                <div className="case-compare-card">
                  <span className="case-compare-label">Cùng điện lượng: 6 C</span>
                  <div className="case-compare-options">
                    <div><b>Trường hợp A</b><strong>1 s</strong><small>thời gian chuyển qua tiết diện</small></div>
                    <div><b>Trường hợp B</b><strong>3 s</strong><small>thời gian chuyển qua tiết diện</small></div>
                  </div>
                </div>
              </div>
              <div className="worksheet-question-block"><strong>Bước 5. So sánh thời gian: Ở trường hợp nào điện lượng đi qua tiết diện dây dẫn nhanh hơn?</strong>{renderChoiceGroup('task3SecondCase', [{ id: 'a', text: 'Trường hợp A' }, { id: 'b', text: 'Trường hợp B' }])}{renderStepFeedback('task3SecondCase', 'a', 'Đúng: cùng 6 C điện lượng nhưng trường hợp A chỉ mất 1 giây.')}</div>
              {answers.task3SecondCase === 'a' && <div className="worksheet-conclusion"><strong>Bước 6. Nhận xét</strong><span>Với cùng một điện lượng, thời gian chuyển qua tiết diện dây dẫn càng ngắn thì dòng điện càng mạnh.</span></div>}
              <label className="worksheet-answer"><span>Bước 7. Từ các nhận xét trên, cường độ dòng điện phụ thuộc vào những đại lượng nào?</span><textarea value={answers.task3Predict} onChange={(event) => updateAnswer('task3Predict', event.target.value)} placeholder="Ví dụ: Điện lượng chuyển qua..." /></label>
              <div className="worksheet-question-block">
                <strong>Bước 8. Kết luận</strong>
                <p>Cường độ dòng điện được xác định bằng điện lượng chuyển qua tiết diện thẳng của dây dẫn trong một đơn vị thời gian.</p>
              </div>
              <div className="formula-reveal">
                <span>Bước 9. Công thức</span>
                <strong>I = Δq / Δt</strong>
                <small>I là cường độ dòng điện; Δq là điện lượng chuyển qua tiết diện dây dẫn; Δt là thời gian điện lượng chuyển qua tiết diện dây dẫn.</small>
              </div>
              <button className="primary-soft-btn" type="button" onClick={checkTask3}>Tiếp tục nhiệm vụ tiếp theo</button>
              {feedbacks.task3 && <p className={`inline-feedback inline-feedback--${feedbacks.task3.type}`}>{feedbacks.task3.message}</p>}
              {feedbacks.task3?.type === 'correct' && <div className="worksheet-conclusion"><strong>Kết luận:</strong><span>I = Δq / Δt, với I là cường độ dòng điện, Δq là điện lượng, Δt là thời gian.</span></div>}
            </div>
          </section>}

          {worksheetStep >= 3 && <section className="journey-item">
            <b>3</b>
            <div>
              <h3>Nhiệm vụ 3. Đơn vị đo cường độ dòng điện</h3>
              <p className="worksheet-prompt"><b>Mục tiêu:</b> Hiểu đơn vị đo và ý nghĩa của đơn vị.</p>
              <div className="worksheet-question-block">
                <strong>Bước 1. Đơn vị đo cường độ dòng điện là:</strong>
                {renderChoiceGroup('task4UnitChoice', [{ id: 'v', text: 'V' }, { id: 'a', text: 'A' }, { id: 'w', text: 'W' }, { id: 'ohm', text: 'Ω' }])}
                {renderStepFeedback('task4UnitChoice', 'a', 'Đúng.')}
              </div>
              <div className="worksheet-question-block">
                <strong>Bước 2. Từ công thức I = Δq / Δt, suy ra Δq = IΔt.</strong>
                <p>Nếu I = 1 A và Δt = 1 s thì điện lượng chuyển qua tiết diện dây dẫn là:</p>
                <div className="formula-input"><span>Δq =</span><input value={answers.task4Charge} onChange={(event) => updateAnswer('task4Charge', event.target.value)} placeholder="... C" /></div>
                {answers.task4Charge && task4ChargeIsCorrect && <p className="worksheet-step-feedback worksheet-step-feedback--correct">Chính xác. Khi cường độ dòng điện bằng 1 A thì trong 1 giây có 1 C điện lượng chuyển qua tiết diện dây dẫn.</p>}
              </div>
              <label className="worksheet-answer"><span>Bước 3. 1 A cho biết điều gì về điện lượng chuyển qua tiết diện dây dẫn trong mỗi giây?</span><textarea value={answers.task4Meaning} onChange={(event) => updateAnswer('task4Meaning', event.target.value)} placeholder="Trả lời ngắn..." /></label>
              <button className="primary-soft-btn" type="button" onClick={checkTask4}>Tiếp tục nhiệm vụ tiếp theo</button>
              {feedbacks.task4 && <p className={`inline-feedback inline-feedback--${feedbacks.task4.type}`}>{feedbacks.task4.message}</p>}
              {feedbacks.task4?.type === 'correct' && <div className="worksheet-conclusion"><strong>Kết luận:</strong><span>1 ampe là cường độ dòng điện mà khi chạy qua tiết diện thẳng của dây dẫn thì trong 1 giây có điện lượng 1 culông chuyển qua tiết diện đó.</span></div>}
            </div>
          </section>}

          {worksheetStep >= 4 && <section className="journey-item">
            <b>4</b>
            <div>
              <h3>Nhiệm vụ 4. Dòng điện trong kim loại</h3>
              <p className="worksheet-prompt"><b>Mục tiêu:</b> Nhận biết bản chất dòng điện trong kim loại.</p>
              <div className="electron-sim" aria-hidden="true"><span>e</span><span>e</span><span>e</span><span>e</span><strong>Electron tự do trong dây dẫn kim loại</strong></div>
              <div className="worksheet-question-block"><strong>Bước 1. Hạt tải điện trong kim loại là:</strong>{renderChoiceGroup('task5CarrierChoice', [{ id: 'proton', text: 'Proton' }, { id: 'electron', text: 'Electron tự do' }, { id: 'positiveIon', text: 'Ion dương' }, { id: 'negativeIon', text: 'Ion âm' }])}{renderStepFeedback('task5CarrierChoice', 'electron')}</div>
              <div className="worksheet-question-block"><strong>Bước 2. Electron tự do chuyển động hỗn loạn khi chưa có điện trường.</strong>{renderChoiceGroup('task5Tf', [{ id: 'true', text: 'Đúng' }, { id: 'false', text: 'Sai' }])}{renderStepFeedback('task5Tf', 'true')}</div>
              <label className="worksheet-answer"><span>Bước 3. Khi có điện trường, electron chuyển động ... tạo thành dòng điện.</span><input value={answers.task5Fill} onChange={(event) => updateAnswer('task5Fill', event.target.value)} placeholder="Điền khuyết..." /></label>
              <div className="worksheet-question-block"><strong>Bước 4. Chiều dòng điện quy ước:</strong>{renderChoiceGroup('task5Direction', [{ id: 'same', text: 'Cùng chiều electron' }, { id: 'opposite', text: 'Ngược chiều electron' }])}{renderStepFeedback('task5Direction', 'opposite')}</div>
              <button className="primary-soft-btn" type="button" onClick={checkTask5}>Tiếp tục nhiệm vụ tiếp theo</button>
              {feedbacks.task5 && <p className={`inline-feedback inline-feedback--${feedbacks.task5.type}`}>{feedbacks.task5.message}</p>}
              {feedbacks.task5?.type === 'correct' && <div className="worksheet-conclusion"><strong>Kết luận:</strong><span>Dòng điện trong kim loại là dòng chuyển dời có hướng của electron tự do; chiều dòng điện quy ước ngược chiều electron.</span></div>}
            </div>
          </section>}

          {worksheetStep >= 5 && <section className="journey-item">
            <b>5</b>
            <div>
              <h3>Nhiệm vụ 5. Liên hệ giữa cường độ dòng điện và hạt mang điện</h3>
              <p className="worksheet-prompt"><b>Mục tiêu:</b> Hiểu định tính sự phụ thuộc của cường độ dòng điện.</p>
              <div className="worksheet-observe-step">
                <strong>Bước 1. Quan sát ảnh hưởng của số hạt mang điện</strong>
                <div className="worksheet-flow worksheet-flow--particles"><span>Số electron qua tiết diện tăng</span><strong>Tiết diện dây dẫn</strong><span>Cùng thời gian quan sát</span></div>
              </div>
              <div className="worksheet-question-block"><strong>Bước 2. Nhận xét số hạt: Khi số electron đi qua tiết diện tăng, cường độ dòng điện:</strong>{renderChoiceGroup('task6CountChoice', [{ id: 'decrease', text: 'Giảm' }, { id: 'same', text: 'Không đổi' }, { id: 'increase', text: 'Tăng' }])}{renderStepFeedback('task6CountChoice', 'increase')}</div>
              <div className="worksheet-observe-step">
                <strong>Bước 3. Quan sát ảnh hưởng của tốc độ dịch chuyển</strong>
                <div className="worksheet-flow worksheet-flow--particles"><span>Tốc độ dịch chuyển tăng</span><strong>Tiết diện dây dẫn</strong><span>Cùng số hạt mang điện</span></div>
              </div>
              <div className="worksheet-question-block"><strong>Bước 4. Nhận xét tốc độ: Khi tốc độ dịch chuyển của electron tăng, cường độ dòng điện:</strong>{renderChoiceGroup('task6SpeedChoice', [{ id: 'decrease', text: 'Giảm' }, { id: 'same', text: 'Không đổi' }, { id: 'increase', text: 'Tăng' }])}{renderStepFeedback('task6SpeedChoice', 'increase')}</div>
              <label className="worksheet-answer"><span>Bước 5. Rút ra nhận xét về mối liên hệ giữa cường độ dòng điện với số lượng và tốc độ chuyển động của hạt mang điện.</span><textarea value={answers.task6Short} onChange={(event) => updateAnswer('task6Short', event.target.value)} placeholder="Trả lời ngắn..." /></label>
              <button className="primary-soft-btn" type="button" onClick={checkTask6}>Hoàn thành phiếu học tập</button>
              {feedbacks.task6 && <p className={`inline-feedback inline-feedback--${feedbacks.task6.type}`}>{feedbacks.task6.message}</p>}
              {feedbacks.task6?.type === 'correct' && <div className="worksheet-conclusion"><strong>Kết luận:</strong><span>Số hạt mang điện qua tiết diện trong mỗi giây tăng hoặc tốc độ dịch chuyển có hướng tăng thì cường độ dòng điện tăng.</span></div>}
            </div>
          </section>}
        </div>

      </article>}

      {revealedBlocks.quiz && isAfterPart && <Lesson22ReviewQuest onAction={onAction} onComplete={revealSelfCheckFromQuiz} />}

      {revealedBlocks.selfCheck && isAfterPart && <article className="restored-card self-check lesson22-reveal-block" id="lesson22-self-check">
        <div className="journey-heading">
          <span>Phần 4</span>
          <h2>Tự đánh giá</h2>
          <p>Đối chiếu kết quả học tập với yêu cầu của bài Cường độ dòng điện.</p>
        </div>
        <div className="lesson22-section-meta" aria-label="Thông tin phần tự đánh giá">
          <div>
            <strong>Mục tiêu</strong>
            <p>Tự nhận biết mức độ hoàn thành sau video, phiếu học tập và quiz.</p>
          </div>
          <div>
            <strong>Nhiệm vụ của học sinh</strong>
            <p>Đánh dấu các năng lực đã đạt, xem lại phần còn yếu và lưu kết quả tự học.</p>
          </div>
          <div>
            <strong>Sản phẩm học tập</strong>
            <p>Nội dung tự đánh giá của học sinh.</p>
          </div>
        </div>
        <div className="self-evaluation-grid">
          <section className="self-evaluation-panel">
            <h3>1. Mức độ hoàn thành nhiệm vụ</h3>
            {[
              ['watchedVideo', 'Tôi đã xem video khởi động.'],
              ['answeredGuide', 'Tôi đã trả lời câu hỏi định hướng.'],
              ['completedWorksheet', 'Tôi đã hoàn thành phiếu học tập.'],
              ['completedQuiz', 'Tôi đã hoàn thành Quiz.'],
            ].map(([key, label]) => (
              <label className="soft-checkbox" key={key}>
                <input checked={Boolean(selfChecks[key])} onChange={() => updateSelfCheck(key)} type="checkbox" />
                <span>{label}</span>
              </label>
            ))}
          </section>

          <section className="self-evaluation-panel">
            <h3>2. Mức độ hiểu bài</h3>
            {[
              ['understandMeaning', 'Tôi hiểu cường độ dòng điện đặc trưng cho điều gì.'],
              ['knowFormula', 'Tôi biết công thức I = Δq/Δt.'],
              ['knowUnit', 'Tôi biết đơn vị đo cường độ dòng điện.'],
              ['understandMetalCurrent', 'Tôi hiểu dòng điện trong kim loại là gì.'],
              ['canApplyFormula', 'Tôi biết vận dụng công thức để giải bài tập đơn giản.'],
            ].map(([key, label]) => (
              <label className="soft-checkbox" key={key}>
                <input checked={Boolean(selfChecks[key])} onChange={() => updateSelfCheck(key)} type="checkbox" />
                <span>{label}</span>
              </label>
            ))}
          </section>

          <section className="self-evaluation-panel">
            <h3>3. Nội dung còn khó khăn</h3>
            {[
              ['hardConcept', 'Khái niệm cường độ dòng điện.'],
              ['hardFormula', 'Công thức tính.'],
              ['hardUnit', 'Đơn vị đo.'],
              ['hardMetalCurrent', 'Dòng điện trong kim loại.'],
              ['hardPractice', 'Bài tập vận dụng.'],
            ].map(([key, label]) => (
              <label className="soft-checkbox" key={key}>
                <input checked={Boolean(selfChecks[key])} onChange={() => updateSelfCheck(key)} type="checkbox" />
                <span>{label}</span>
              </label>
            ))}
          </section>

          <section className="self-evaluation-panel">
            <h3>4. Ghi chú cá nhân</h3>
            <label className="worksheet-answer">
              <span>Điều em còn thắc mắc.</span>
              <textarea value={selfReflection.question} onChange={(event) => updateSelfReflection('question', event.target.value)} placeholder="Nhập thắc mắc của em..." />
            </label>
            <label className="worksheet-answer">
              <span>Kế hoạch học tập tiếp theo của em.</span>
              <textarea value={selfReflection.plan} onChange={(event) => updateSelfReflection('plan', event.target.value)} placeholder="Ví dụ: xem lại công thức, làm thêm 3 bài tập..." />
            </label>
          </section>
        </div>
        <button className="primary-soft-btn" type="button" onClick={finishWorksheet}>Lưu kết quả</button>
      </article>}
    </section>
  )
}

const lesson22ReviewQuestions = [
  {
    id: 'q1',
    badge: 'Khái niệm',
    prompt: 'Cường độ dòng điện là đại lượng đặc trưng cho điều gì?',
    options: [
      { id: 'a', text: 'Hình dạng của dây dẫn' },
      { id: 'b', text: 'Tác dụng mạnh, yếu của dòng điện' },
      { id: 'c', text: 'Màu sắc của bóng đèn' },
      { id: 'd', text: 'Khối lượng của nguồn điện' },
    ],
    answer: 'b',
    review: 'Xem lại Nhiệm vụ 1: khái niệm cường độ dòng điện.',
    explain: 'Cường độ dòng điện đặc trưng cho tác dụng mạnh, yếu của dòng điện.',
  },
  {
    id: 'q2',
    badge: 'Ý nghĩa',
    prompt: 'Khi số chỉ ampe kế tăng, bóng đèn sáng hơn và nam châm điện hút nhiều ghim hơn. Nhận xét nào phù hợp?',
    options: [
      { id: 'a', text: 'Nguồn điện luôn yếu đi' },
      { id: 'b', text: 'Dòng điện không có tác dụng' },
      { id: 'c', text: 'Tác dụng của dòng điện mạnh hơn' },
      { id: 'd', text: 'Dây dẫn đổi màu nên đèn sáng hơn' },
    ],
    answer: 'c',
    review: 'Xem lại Nhiệm vụ 1: quan sát tác dụng của dòng điện.',
    explain: 'Đèn sáng hơn và nam châm hút nhiều ghim hơn cho thấy tác dụng của dòng điện mạnh hơn.',
  },
  {
    id: 'q3',
    badge: 'Công thức',
    prompt: 'Công thức xác định cường độ dòng điện là:',
    options: [
      { id: 'a', text: 'I = Δq.Δt' },
      { id: 'b', text: 'I = Δt / Δq' },
      { id: 'c', text: 'I = Δq + Δt' },
      { id: 'd', text: 'I = Δq / Δt' },
    ],
    answer: 'd',
    review: 'Xem lại Nhiệm vụ 2: xây dựng công thức.',
    explain: 'Cường độ dòng điện bằng điện lượng chuyển qua tiết diện dây dẫn chia cho thời gian.',
  },
  {
    id: 'q4',
    badge: 'Kí hiệu',
    prompt: 'Trong công thức I = Δq/Δt, Δq là đại lượng nào?',
    options: [
      { id: 'a', text: 'Thời gian dòng điện chạy qua' },
      { id: 'b', text: 'Cường độ dòng điện' },
      { id: 'c', text: 'Điện lượng chuyển qua tiết diện dây dẫn' },
      { id: 'd', text: 'Điện trở của dây dẫn' },
    ],
    answer: 'c',
    review: 'Xem lại Nhiệm vụ 2: ý nghĩa I, Δq và Δt.',
    explain: 'Δq là điện lượng chuyển qua tiết diện dây dẫn trong khoảng thời gian Δt.',
  },
  {
    id: 'q5',
    badge: 'Đơn vị',
    prompt: 'Đơn vị đo cường độ dòng điện là:',
    options: [
      { id: 'a', text: 'Vôn (V)' },
      { id: 'b', text: 'Culông (C)' },
      { id: 'c', text: 'Ampe (A)' },
      { id: 'd', text: 'Giây (s)' },
    ],
    answer: 'c',
    review: 'Xem lại Nhiệm vụ 3: đơn vị đo.',
    explain: 'Đơn vị đo cường độ dòng điện là ampe, kí hiệu A.',
  },
  {
    id: 'q6',
    badge: 'Hệ thức',
    prompt: 'Hệ thức nào đúng?',
    options: [
      { id: 'a', text: '1 A = 1 s/C' },
      { id: 'b', text: '1 A = 1 V/s' },
      { id: 'c', text: '1 A = 1 C.s' },
      { id: 'd', text: '1 A = 1 C/s' },
    ],
    answer: 'd',
    review: 'Xem lại Nhiệm vụ 3: từ I = Δq/Δt suy ra đơn vị.',
    explain: 'Nếu Δq tính bằng C và Δt tính bằng s thì I có đơn vị C/s, nên 1 A = 1 C/s.',
  },
  {
    id: 'q7',
    badge: 'Kim loại',
    prompt: 'Hạt tải điện trong kim loại là:',
    options: [
      { id: 'a', text: 'Proton tự do' },
      { id: 'b', text: 'Nguyên tử trung hòa' },
      { id: 'c', text: 'Electron tự do' },
      { id: 'd', text: 'Phân tử khí' },
    ],
    answer: 'c',
    review: 'Xem lại Nhiệm vụ 4: dòng điện trong kim loại.',
    explain: 'Trong kim loại, hạt tải điện là các electron tự do.',
  },
  {
    id: 'q8',
    badge: 'Chiều dòng điện',
    prompt: 'Trong dây dẫn kim loại, chiều dòng điện quy ước so với chiều chuyển động của electron là:',
    options: [
      { id: 'a', text: 'Không có liên hệ' },
      { id: 'b', text: 'Cùng chiều' },
      { id: 'c', text: 'Luôn vuông góc' },
      { id: 'd', text: 'Ngược chiều' },
    ],
    answer: 'd',
    review: 'Xem lại Nhiệm vụ 4: electron mang điện âm nên chuyển động ngược chiều dòng điện quy ước.',
    explain: 'Electron tự do dịch chuyển ngược chiều dòng điện quy ước.',
  },
  {
    id: 'q9',
    badge: 'Vận dụng',
    prompt: 'Trong 5 s có điện lượng 15 C chuyển qua tiết diện dây dẫn. Cường độ dòng điện là:',
    options: [
      { id: 'a', text: '10 A' },
      { id: 'b', text: '75 A' },
      { id: 'c', text: '0,33 A' },
      { id: 'd', text: '3 A' },
    ],
    answer: 'd',
    review: 'Xem lại Nhiệm vụ 2: vận dụng I = Δq/Δt.',
    explain: 'I = Δq/Δt = 15/5 = 3 A.',
  },
  {
    id: 'q10',
    badge: 'Định tính',
    prompt: 'Nếu số hạt mang điện đi qua tiết diện dây dẫn trong 1 giây tăng và tốc độ dịch chuyển có hướng tăng thì cường độ dòng điện:',
    options: [
      { id: 'a', text: 'Luôn bằng 0' },
      { id: 'b', text: 'Giảm' },
      { id: 'c', text: 'Tăng' },
      { id: 'd', text: 'Không thể thay đổi' },
    ],
    answer: 'c',
    review: 'Xem lại Nhiệm vụ 5: liên hệ định tính giữa số hạt, tốc độ dịch chuyển và cường độ dòng điện.',
    explain: 'Nhiều hạt mang điện đi qua hơn trong cùng thời gian hoặc hạt dịch chuyển nhanh hơn thì cường độ dòng điện tăng.',
  },
]

function Lesson22ReviewQuest({ onAction, onComplete }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState({})
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

  const isQuestionCorrect = (question) => {
    return answers[question.id] === question.answer
  }

  const submitQuizAnswer = () => {
    const correct = isQuestionCorrect(activeQuestion)
    setResults((current) => ({ ...current, [activeQuestion.id]: correct }))
    playLessonTone(correct ? 'correct' : 'wrong')
    if (activeIndex === lesson22ReviewQuestions.length - 1) {
      window.setTimeout(() => {
        setActiveIndex(lesson22ReviewQuestions.length)
        onAction('Đã hoàn thành Quiz Bài 22')
      }, 450)
    }
  }

  const goToNextQuestion = () => {
    const nextIndex = activeIndex + 1
    setActiveIndex(nextIndex)
    if (nextIndex === lesson22ReviewQuestions.length) {
      onAction('Đã hoàn thành Quiz Bài 22')
    }
  }

  const currentResult = activeQuestion ? results[activeQuestion.id] : undefined
  const wrongQuestions = lesson22ReviewQuestions.filter((question) => results[question.id] === false)
  const isLastQuestion = activeIndex === lesson22ReviewQuestions.length - 1

  return (
    <article className="review-quest-card" id="lesson22-review-quiz">
      <div className="review-quest-header">
        <div>
          <span className="review-quest-kicker"><b>⚡</b> Phần 3</span>
          <h2>Quiz</h2>
          <p>Hoạt động sau khi học: củng cố kiến thức và tự kiểm tra mức độ hiểu bài Cường độ dòng điện.</p>
        </div>
        <div className="review-score-orb">
          <strong>{score}</strong>
          <span>điểm</span>
        </div>
      </div>

      <div className="lesson22-section-meta lesson22-section-meta--quiz" aria-label="Thông tin phần quiz">
        <div>
          <strong>Mục tiêu</strong>
          <p>Củng cố kiến thức trọng tâm và giúp học sinh tự kiểm tra sau khi hoàn thành phiếu học tập.</p>
        </div>
        <div>
          <strong>Nhiệm vụ của học sinh</strong>
          <p>Trả lời 10 câu hỏi trắc nghiệm, nộp từng câu và xem tổng kết sau câu cuối.</p>
        </div>
        <div>
          <strong>Sản phẩm học tập</strong>
          <p>Số câu đúng, đáp án đúng và phản hồi ngắn về nội dung cần xem lại.</p>
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

          <div className="quest-options quest-options--grid">
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

          {currentResult !== undefined && (
            <div className={currentResult ? 'quest-feedback quest-feedback--correct' : 'quest-feedback quest-feedback--wrong'}>
              <strong>{currentResult ? '✓ Chính xác' : 'Chưa đúng'}</strong>
              <p>{activeQuestion.explain}</p>
              {!currentResult && <p><b>Cần xem lại:</b> {activeQuestion.review}</p>}
            </div>
          )}

          <div className="quest-actions">
            {currentResult === undefined ? (
              <button className="quest-primary" disabled={!answers[activeQuestion.id]} type="button" onClick={submitQuizAnswer}>Nộp câu trả lời</button>
            ) : isLastQuestion ? (
              <button className="quest-primary" disabled type="button">Đang tổng kết quiz...</button>
            ) : (
              <button className="quest-primary" type="button" onClick={goToNextQuestion}>Câu tiếp theo</button>
            )}
          </div>
        </section>
      ) : (
        <section className="quest-summary">
          <span>Nhiệm vụ hoàn thành!</span>
          <h3>{score}/{lesson22ReviewQuestions.length} câu đúng</h3>
          <strong>{percent}%</strong>
          <p>{level}</p>
          <div className="quest-answer-review">
            <h4>Đáp án đúng</h4>
            {lesson22ReviewQuestions.map((question, index) => {
              const correctOption = question.options.find((option) => option.id === question.answer)
              const userOption = question.options.find((option) => option.id === answers[question.id])
              const isCorrect = results[question.id]
              return (
                <article className={isCorrect ? 'quest-answer-item quest-answer-item--correct' : 'quest-answer-item quest-answer-item--wrong'} key={question.id}>
                  <strong>Câu {index + 1}: {correctOption?.text}</strong>
                  <p>Em chọn: {userOption?.text || 'Chưa chọn'}</p>
                  <span>{question.explain}</span>
                </article>
              )
            })}
          </div>
          <div className="quest-review-note">
            <h4>Nội dung cần xem lại</h4>
            {wrongQuestions.length > 0 ? (
              wrongQuestions.map((question) => <p key={question.id}>{question.review}</p>)
            ) : (
              <p>Em đã trả lời đúng toàn bộ câu hỏi. Có thể chuyển sang phần tự đánh giá.</p>
            )}
          </div>
          <button className="quest-primary" type="button" onClick={onComplete}>Mở tự đánh giá</button>
        </section>
      )}
    </article>
  )
}

function UnifiedSelfAssessment({
  className = '',
  id,
  title = 'Tự đánh giá',
  description,
  meta,
  completionItems,
  understandingItems,
  difficultyItems,
  checks,
  onToggleCheck,
  reflectionQuestion,
  reflectionPlan,
  onReflectionChange,
  onPlanChange,
  doneMessage,
}) {
  const renderChecklist = (items) =>
    items.map(([key, label]) => (
      <label className="soft-checkbox" key={key}>
        <input checked={Boolean(checks?.[key])} onChange={() => onToggleCheck(key)} type="checkbox" />
        <span>{label}</span>
      </label>
    ))

  return (
    <article className={`restored-card self-check lesson22-reveal-block ${className}`.trim()} id={id}>
      <div className="journey-heading">
        <span>Phần 4</span>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      <div className="lesson22-section-meta" aria-label="Thông tin phần tự đánh giá">
        <div>
          <strong>Mục tiêu</strong>
          <p>{meta.objective}</p>
        </div>
        <div>
          <strong>Nhiệm vụ của học sinh</strong>
          <p>{meta.task}</p>
        </div>
        <div>
          <strong>Sản phẩm học tập</strong>
          <p>{meta.product}</p>
        </div>
      </div>
      <div className="self-evaluation-grid">
        <section className="self-evaluation-panel">
          <h3>1. Mức độ hoàn thành nhiệm vụ</h3>
          {renderChecklist(completionItems)}
        </section>
        <section className="self-evaluation-panel">
          <h3>2. Mức độ hiểu bài</h3>
          {renderChecklist(understandingItems)}
        </section>
        <section className="self-evaluation-panel">
          <h3>3. Nội dung còn khó khăn</h3>
          {renderChecklist(difficultyItems)}
        </section>
        <section className="self-evaluation-panel">
          <h3>4. Ghi chú cá nhân</h3>
          <label className="worksheet-answer">
            <span>Điều em còn thắc mắc.</span>
            <textarea value={reflectionQuestion} onChange={(event) => onReflectionChange(event.target.value)} placeholder="Nhập thắc mắc của em..." />
          </label>
          <label className="worksheet-answer">
            <span>Kế hoạch học tập tiếp theo của em.</span>
            <textarea value={reflectionPlan} onChange={(event) => onPlanChange(event.target.value)} placeholder="Ví dụ: xem lại công thức, làm thêm 3 bài tập..." />
          </label>
        </section>
      </div>
      {doneMessage && <div className="lesson25-final-card"><strong>{doneMessage}</strong></div>}
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

function Lesson23FinalChallengeGame({ onComplete }) {
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
      onComplete?.()
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

function Lesson23OhmLesson({ activePart = 'before' }) {
  const isBeforePart = activePart === 'before'
  const isWorksheetPart = activePart === 'during'
  const isAfterPart = activePart === 'after'
  const discoveryRef = useRef(null)
  const voltageControlRef = useRef(null)
  const quizRef = useRef(null)
  const selfCheckRef = useRef(null)

  const [conductorChoice, setConductorChoice] = useState('')
  const [electronFlowChoice, setElectronFlowChoice] = useState('')
  const [resistanceQuestion, setResistanceQuestion] = useState('')
  const [ratioMeasurementCount, setRatioMeasurementCount] = useState(0)
  const [ratiosCalculated, setRatiosCalculated] = useState(false)
  const [ratioObservation, setRatioObservation] = useState('')
  const [showResistanceConfetti, setShowResistanceConfetti] = useState(false)
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
  const [temperatureCardStep, setTemperatureCardStep] = useState(1)
  const [filamentShapeFinding, setFilamentShapeFinding] = useState('')
  const [showFilamentHint, setShowFilamentHint] = useState(false)
  const [filamentApplyFinding, setFilamentApplyFinding] = useState('')
  const [showTemperatureHint, setShowTemperatureHint] = useState(false)
  const [ntcTemperature, setNtcTemperature] = useState(20)
  const [hasHeatedNtc, setHasHeatedNtc] = useState(false)
  const [ntcFinding, setNtcFinding] = useState('')
  const [showNtcHint, setShowNtcHint] = useState(false)
  const [thermistorCompareFinding, setThermistorCompareFinding] = useState('')
  const [competencyRatings, setCompetencyRatings] = useState({})
  const [reflectionText, setReflectionText] = useState('')
  const [overallUnderstanding, setOverallUnderstanding] = useState('')
  const [lesson23UnlockedParts, setLesson23UnlockedParts] = useState({
    worksheet: PREVIEW_ALL_LESSON_PARTS || isWorksheetPart || isAfterPart,
    quiz: PREVIEW_ALL_LESSON_PARTS || isAfterPart,
    selfCheck: PREVIEW_ALL_LESSON_PARTS || isAfterPart,
  })

  const hasElectronFlowInsight = electronFlowChoice === 'decrease'
  const isBarrierExplored = conductorChoice === 'hard' && hasElectronFlowInsight && resistanceQuestion === 'not-same'
  const isConceptRevealed = ratioObservation === 'constant'
  const ratioExperimentData = [
    { attempt: 1, voltage: 2, current: 0.4 },
    { attempt: 2, voltage: 4, current: 0.8 },
    { attempt: 3, voltage: 6, current: 1.2 },
  ]
  const visibleRatioRows = ratioExperimentData.slice(0, ratioMeasurementCount)
  const ratioActivitySteps = [
    isBarrierExplored,
    ratioMeasurementCount >= 3,
    ratiosCalculated,
    ratioObservation === 'constant',
  ]
  const ratioActivityProgress = Math.round((ratioActivitySteps.filter(Boolean).length / ratioActivitySteps.length) * 100)
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

  const collectRatioMeasurement = () => {
    setRatioMeasurementCount((current) => Math.min(current + 1, ratioExperimentData.length))
    playLessonTone('correct')
  }

  const calculateRatios = () => {
    setRatiosCalculated(true)
    playLessonTone('correct')
  }

  const chooseRatioObservation = (value) => {
    setRatioObservation(value)
    const isCorrect = value === 'constant'
    playLessonTone(isCorrect ? 'correct' : 'wrong')

    if (isCorrect) {
      setShowResistanceConfetti(true)
      window.setTimeout(() => setShowResistanceConfetti(false), 2800)
    }
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
  const filamentUnderstood = filamentShapeFinding === 'curved'
  const temperatureConclusionUnderstood = filamentApplyFinding === 'increase'
  const ntcUnderstood = ntcFinding === 'decrease'
  const thermistorCompareUnderstood = thermistorCompareFinding === 'opposite'
  const temperatureJourneyComplete = temperatureConclusionUnderstood && ntcUnderstood && thermistorCompareUnderstood
  const ntcResistance = (ntcTemperature <= 50
    ? 10 - ((ntcTemperature - 20) / 30) * 6
    : 4 - ((ntcTemperature - 50) / 30) * 2.5).toFixed(1)

  const answerCauseSituation = (scenario, answerIndex) => {
    setCauseSituationAnswers((current) => ({ ...current, [scenario.id]: answerIndex }))
    playLessonTone(answerIndex === scenario.answer ? 'correct' : 'wrong')
  }

  const usedStatementKeywords = Object.values(statementSlots)
  const availableStatementBank = ohmStatementBank.filter((word) => !usedStatementKeywords.includes(word.id))
  const assessmentItemCount = lesson23SelfAssessment.reduce((total, section) => total + section.items.length, 0)
  const assessedCount = Object.keys(competencyRatings).length
  const worksheetMilestones = [
    isConceptRevealed,
    isOhmReady,
    isStatementComplete,
    causeSituationsComplete,
    temperatureJourneyComplete,
  ]
  const worksheetCompletedCount = worksheetMilestones.filter(Boolean).length
  const worksheetProgress = Math.round((worksheetCompletedCount / worksheetMilestones.length) * 100)

  const completeLesson23Video = () => {
    setLesson23UnlockedParts((current) => current.worksheet ? current : { ...current, worksheet: true })
    window.setTimeout(() => discoveryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  const completeLesson23Worksheet = () => {
    setLesson23UnlockedParts((current) => current.quiz ? current : { ...current, quiz: true })
    window.setTimeout(() => quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  const completeLesson23Quiz = () => {
    setLesson23UnlockedParts((current) => current.selfCheck ? current : { ...current, selfCheck: true })
    window.setTimeout(() => selfCheckRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  const lesson23SectionMeta = {
    video: {
      goals: [
        'Tạo tình huống có vấn đề.',
        'Khơi gợi hứng thú học tập.',
        'Hình thành nhu cầu tìm hiểu bài học.',
      ],
      tasks: [
        'Quan sát video tương tác.',
        'Trả lời các câu hỏi định hướng.',
        'Đưa ra dự đoán ban đầu.',
      ],
      products: [
        'Câu trả lời của học sinh.',
        'Dự đoán ban đầu về nguyên nhân làm dòng điện mạnh hoặc yếu khác nhau.',
      ],
    },
    worksheet: {
      goals: [
        'Hình thành kiến thức mới.',
        'Giúp học sinh tự khám phá nội dung bài học thông qua các nhiệm vụ học tập.',
        'Phát triển khả năng tự tìm hiểu và tự chiếm lĩnh kiến thức.',
      ],
      tasks: [
        'Thực hiện các nhiệm vụ học tập.',
        'Quan sát hiện tượng.',
        'Phân tích dữ liệu.',
        'Trả lời câu hỏi.',
        'Rút ra nhận xét và kết luận.',
      ],
      products: [
        'Phiếu học tập đã hoàn thành.',
        'Các câu trả lời của học sinh.',
        'Các kết luận rút ra từ từng nhiệm vụ.',
      ],
    },
    quiz: {
      goals: [
        'Củng cố kiến thức.',
        'Tự kiểm tra mức độ hiểu bài.',
      ],
      tasks: [
        'Trả lời các câu hỏi Quiz.',
        'Kiểm tra kết quả học tập của bản thân.',
      ],
      products: [
        'Điểm số.',
        'Kết quả thực hiện Quiz.',
      ],
    },
    selfCheck: {
      goals: [
        'Giúp học sinh tự nhìn nhận quá trình học tập.',
        'Điều chỉnh hoạt động học tập của bản thân.',
      ],
      tasks: [
        'Tự đánh giá mức độ hoàn thành nhiệm vụ học tập.',
        'Xác định những nội dung còn khó khăn.',
        'Xây dựng kế hoạch học tập tiếp theo.',
      ],
      products: [
        'Nội dung tự đánh giá.',
        'Kế hoạch học tập tiếp theo.',
      ],
    },
  }
  const renderLesson23SectionMeta = ({ goals, tasks, products }) => (
    <div className="lesson22-section-meta lesson23-framework-meta" aria-label="Thông tin tổ chức hoạt động">
      {[
        ['Mục tiêu', goals],
        ['Nhiệm vụ của học sinh', tasks],
        ['Sản phẩm học tập', products],
      ].map(([title, items]) => (
        <div key={title}>
          <strong>{title}</strong>
          <ul>
            {items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      ))}
    </div>
  )

  return (
    <section className="lesson23-lab lesson23-framework">
      {isBeforePart && <article className="lesson23-video-card lesson23-framework-section">
        <div className="lesson23-video-title">
          <span>Bài 23</span>
          <h1>Điện trở. Định luật Ôm</h1>
        </div>
        <div className="journey-heading">
          <span>Phần 1</span>
          <h2>Video khởi động</h2>
        </div>
        {renderLesson23SectionMeta(lesson23SectionMeta.video)}
        <div className="lesson23-video-slot">
          <div className="lesson23-video-screen">
            <InteractiveLessonVideo
              interactions={lesson23VideoInteractions}
              onComplete={completeLesson23Video}
              src="/videos/bai23.mp4"
              title="Video tương tác bài 23 - Điện trở. Định luật Ôm"
            />
          </div>
        </div>
      </article>}

      {lesson23UnlockedParts.worksheet && isWorksheetPart && (
      <section className="lesson23-learning-part lesson23-framework-section" ref={discoveryRef}>
        <div className="journey-heading">
          <span>Phần 2</span>
          <h2>Phiếu học tập</h2>
        </div>
        {renderLesson23SectionMeta(lesson23SectionMeta.worksheet)}

        <article className="lesson23-worksheet-unified">
          <div className="lesson23-worksheet-progress" aria-label={`Tiến trình Phiếu học tập: ${worksheetProgress}%`}>
            <div>
              <strong>Tiến trình Phiếu học tập</strong>
              <span>{worksheetCompletedCount}/{worksheetMilestones.length} chặng đã hoàn thành</span>
            </div>
            <i><b style={{ width: `${worksheetProgress}%` }} /></i>
          </div>

      <article className="lesson23-flow lesson23-worksheet-task">
        <div className="lesson23-task-heading">
          <span>Nhiệm vụ 1</span>
          <h3>Khám phá điện trở</h3>
        </div>
        <h4 className="lesson23-step-title">Bước 1: Khám phá mức độ cản trở</h4>
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
        {isBarrierExplored && <div className="formula-reveal lesson23-reveal lesson23-reveal--barrier"><span>Các vật dẫn cản trở dòng điện ở những mức độ khác nhau.</span></div>}

        {isBarrierExplored && (
          <section className="lesson23-ratio-discovery" aria-label="Bước 2 tìm đại lượng đặc trưng cho mức độ cản trở dòng điện">
            {showResistanceConfetti && (
              <div className="lesson23-confetti" aria-hidden="true">
                {Array.from({ length: 18 }, (_, index) => <i key={index} style={{ '--i': index }} />)}
              </div>
            )}
            <div className="lesson23-step-heading">
              <span>Bước 2</span>
              <h3>Tìm đại lượng đặc trưng cho mức độ cản trở dòng điện</h3>
              <p>Ở nhiệm vụ trước, em đã nhận thấy các vật dẫn cản trở dòng điện ở những mức độ khác nhau. Vậy làm thế nào để xác định và so sánh mức độ cản trở đó? Hãy thực hiện thí nghiệm dưới đây.</p>
            </div>

            <div className="lesson23-ratio-progress" aria-label={`Tiến trình hoạt động: ${ratioActivityProgress}%`}>
              <div>
                <strong>Tiến trình hoạt động</strong>
                <span>{ratioActivitySteps.filter(Boolean).length}/{ratioActivitySteps.length} bước</span>
              </div>
              <i><b style={{ width: `${ratioActivityProgress}%` }} /></i>
            </div>

            <article className="lesson23-ratio-card">
              <div className="lesson23-ratio-card__header">
                <div>
                  <span>Thí nghiệm với vật dẫn X</span>
                  <strong>Khảo sát mối liên hệ giữa U và I</strong>
                </div>
                <button className="primary-soft-btn" type="button" onClick={collectRatioMeasurement} disabled={ratioMeasurementCount >= ratioExperimentData.length}>
                  {ratioMeasurementCount >= ratioExperimentData.length ? 'Đã đủ 3 phép đo' : 'Thực hiện phép đo'}
                </button>
              </div>

              <div className="lesson23-ratio-table-wrap">
                <table className={ratiosCalculated ? 'lesson23-ratio-table lesson23-ratio-table--calculated' : 'lesson23-ratio-table'}>
                  <thead>
                    <tr>
                      <th>Lần đo</th>
                      <th>U (V)</th>
                      <th>I (A)</th>
                      <th>U/I</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRatioRows.length === 0 && (
                      <tr className="lesson23-ratio-empty">
                        <td colSpan="4">Nhấn “Thực hiện phép đo” để thu thập số liệu.</td>
                      </tr>
                    )}
                    {visibleRatioRows.map((row) => (
                      <tr className="lesson23-ratio-row" key={row.attempt}>
                        <td>Lần {row.attempt}</td>
                        <td>{row.voltage}</td>
                        <td>{row.current.toLocaleString('vi-VN')}</td>
                        <td>{ratiosCalculated ? row.voltage / row.current : '?'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {ratioMeasurementCount >= ratioExperimentData.length && !ratiosCalculated && (
                <button className="primary-soft-btn lesson23-ratio-calc" type="button" onClick={calculateRatios}>Tính U/I</button>
              )}
            </article>

            {ratiosCalculated && (
              <article className="question-card lesson23-ratio-question">
                <h3>Em có nhận xét gì về giá trị U/I của vật dẫn X?</h3>
                <div className="choice-row">
                  <button className={ratioObservation === 'increase' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => chooseRatioObservation('increase')}>A. U/I tăng dần</button>
                  <button className={ratioObservation === 'decrease' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => chooseRatioObservation('decrease')}>B. U/I giảm dần</button>
                  <button className={ratioObservation === 'constant' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => chooseRatioObservation('constant')}>C. U/I không đổi</button>
                </div>
                {ratioObservation && ratioObservation !== 'constant' && <p className="inline-feedback inline-feedback--wrong">Hãy so sánh ba giá trị ở cột U/I vừa tính được.</p>}
              </article>
            )}

            {isConceptRevealed && (
              <>
                <article className="lesson23-resistance-message">
                  <strong>Giá trị U/I là một hằng số được kí hiệu là R, có R = U/I.</strong>
                  <p>=&gt; I = U/R cho thấy với cùng 1 hiệu điện thế, R càng lớn thì cường độ dòng điện I càng nhỏ. Điều này chứng tỏ sự cản trở dịch chuyển của các điện tích trong dây dẫn càng lớn.</p>
                </article>

                <article className="lesson23-final-conclusion">
                  <p>Vậy <strong>R</strong> là đại lượng đặc trưng cho mức độ cản trở dòng điện của vật dẫn và được gọi là <strong>điện trở</strong>.</p>
                  <p>Đơn vị là <strong>ôm (ohm)</strong>, kí hiệu là <strong>Ω</strong>.</p>
                </article>
              </>
            )}
          </section>
        )}
      </article>

      {isConceptRevealed && (
        <article className="lesson23-flow lesson23-flow--experiment">
          <div className="lesson23-task-heading">
            <span>Nhiệm vụ 2</span>
            <h3>Khám phá đường đặc trưng vôn-ampe</h3>
          </div>
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
                  <h3>Độ dốc của đường đặc trưng vôn-ampe liên quan đến điện trở như thế nào?</h3>
                  <div className="choice-row">
                    <button className={conductionChoice === 'larger' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setConductionChoice, 'larger', 'smaller')}>A. Đường càng dốc thì điện trở càng lớn.</button>
                    <button className={conductionChoice === 'smaller' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setConductionChoice, 'smaller', 'smaller')}>B. Đường càng dốc thì điện trở càng nhỏ.</button>
                  </div>
                  {conductionChoice === 'larger' && <p className="inline-feedback inline-feedback--wrong">Hãy dùng hệ thức k = I/U = 1/R để suy luận lại.</p>}
                  {conductionChoice === 'smaller' && <p className="inline-feedback inline-feedback--correct">Đúng. Vì k = 1/R nên độ dốc càng lớn thì điện trở càng nhỏ.</p>}
                </div>
              )}
              {isOhmReady && (
                <div className="slope-conclusion">
                  <h3>Đường đặc trưng vôn-ampe của điện trở</h3>
                  <div className="slope-formula-block" aria-label="Công thức đường đặc trưng vôn-ampe của điện trở">
                    <span>I = kU</span>
                    <span>k = <em>I</em>/<em>U</em> = 1/<em>R</em></span>
                  </div>
                  <div className="slope-explanation">
                    <p>Đường đặc trưng vôn-ampe của điện trở là đường thẳng đi qua gốc tọa độ.</p>
                    <p>Độ dốc của đường thẳng được xác định bởi: <strong>k = I/U = 1/R</strong>.</p>
                    <p><strong>k</strong> là hệ số không đổi gọi là độ dẫn điện.</p>
                  </div>
                  <div className="slope-summary">
                    <p>Đường càng dốc → k càng lớn → R càng nhỏ.</p>
                    <p>Đường càng thoải → k càng nhỏ → R càng lớn.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </article>
      )}

      {isOhmReady && (
        <article className="lesson23-flow">
          <div className="lesson23-task-heading">
            <span>Nhiệm vụ 3</span>
            <h3>Khám phá định luật Ôm</h3>
          </div>
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
            <div className="lesson23-task-heading">
              <span>Nhiệm vụ 4</span>
              <h3>Nguyên nhân gây ra điện trở</h3>
            </div>
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
                  Dao động nhiệt của các ion trong mạng tinh thể cản trở chuyển động của các electron tự do là nguyên nhân chính gây ra điện trở của kim loại.
                </div>
              </>
            )}
          </article>

          {causeSituationsComplete && (
            <article className="lesson23-flow temperature-discovery" id="lesson23-temperature">
              <div className="lesson23-task-heading">
                <span>Nhiệm vụ 5</span>
                <h3>Ảnh hưởng của nhiệt độ đến điện trở</h3>
              </div>
              <p>Quan sát đường đặc trưng vôn-ampe và bảng số liệu để rút ra nhận xét về sự phụ thuộc của điện trở vào nhiệt độ.</p>

              <section className="temperature-sgk-card">
                <div className="temperature-sgk-head">
                  <span>Card 1</span>
                  <h3>Dây tóc nóng lên, điện trở có đổi không?</h3>
                  <p>Mục tiêu: quan sát đường đặc trưng vôn-ampe của đèn sợi đốt và nhận ra điện trở của đèn sợi đốt không phải luôn không đổi.</p>
                </div>
                <div className="filament-sgk-layout">
                  <div className="filament-sgk-visual">
                    <div className="filament-sgk-bulb">
                      <img alt="Bóng đèn sợi đốt" src={bongDenImage} />
                      <span>Dây tóc nóng lên và phát sáng</span>
                    </div>
                    <svg className="filament-sgk-chart" viewBox="0 0 460 300" role="img" aria-label="Đường đặc trưng vôn-ampe của đèn sợi đốt">
                      <line x1="56" y1="248" x2="420" y2="248" />
                      <line x1="56" y1="248" x2="56" y2="36" />
                      <text x="405" y="278">U</text>
                      <text x="25" y="48">I</text>
                      <path className="filament-sgk-guide" d="M56 248 L398 74" />
                      <path className="filament-sgk-curve" d="M56 248 C110 202 154 174 205 153 C265 128 328 113 398 104" />
                      <circle cx="205" cy="153" r="6" />
                      <circle cx="398" cy="104" r="6" />
                    </svg>
                  </div>
                  <div className="temperature-observe-box">
                    <strong>Nội dung quan sát</strong>
                    <p>Khi dòng điện chạy qua đèn sợi đốt, dây tóc nóng lên và phát sáng. Lúc này nhiệt độ của dây tóc tăng.</p>
                    <ul>
                      <li>Quan sát đồ thị I - U của đèn sợi đốt.</li>
                      <li>Nhận xét đồ thị có phải là đường thẳng hay không.</li>
                      <li>So sánh sự thay đổi của I khi U tăng.</li>
                      <li>Dự đoán điện trở của dây tóc khi đèn sáng mạnh hơn.</li>
                    </ul>
                  </div>
                </div>
                <div className="question-card">
                  <h3>Đồ thị I - U của đèn sợi đốt có dạng đường thẳng không?</h3>
                  <div className="choice-row">
                    <button className={filamentShapeFinding === 'straight' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setFilamentShapeFinding, 'straight', 'curved')}>Có, là đường thẳng</button>
                    <button className={filamentShapeFinding === 'curved' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setFilamentShapeFinding, 'curved', 'curved')}>Không, là đường cong</button>
                  </div>
                  <div className="temperature-card-actions">
                    <button className="ghost-soft-btn" type="button" onClick={() => setShowFilamentHint((current) => !current)}>Xem gợi ý</button>
                    <button className="primary-soft-btn" type="button" onClick={() => checkSoftAnswer(setFilamentShapeFinding, filamentShapeFinding || 'straight', 'curved')}>Kiểm tra</button>
                    {filamentUnderstood && <button className="primary-soft-btn" type="button" onClick={() => setTemperatureCardStep(Math.max(temperatureCardStep, 2))}>Tiếp tục</button>}
                  </div>
                  {showFilamentHint && <p className="inline-feedback">Hãy so sánh đường cong màu cam với đường thẳng mờ đi qua gốc tọa độ.</p>}
                  {filamentShapeFinding === 'straight' && <p className="inline-feedback inline-feedback--wrong">Quan sát lại: đường biểu diễn không trùng với một đường thẳng.</p>}
                  {filamentUnderstood && <p className="inline-feedback inline-feedback--correct">Đường đặc trưng vôn-ampe của đèn sợi đốt không phải là đường thẳng. Điều đó cho thấy điện trở của dây tóc bóng đèn thay đổi khi nhiệt độ thay đổi.</p>}
                </div>
              </section>

              {temperatureCardStep >= 2 && (
                <section className="temperature-sgk-card">
                  <div className="temperature-sgk-head">
                    <span>Card 2</span>
                    <h3>Nhiệt độ tăng thì điện trở thay đổi ra sao?</h3>
                    <p>Mục tiêu: rút ra kết luận điện trở dây tóc bóng đèn tăng khi nhiệt độ tăng.</p>
                  </div>
                  <div className="temperature-flow">
                    <span>Dòng điện chạy qua dây tóc</span><b>→</b><span>dây tóc nóng lên</span><b>→</b><span>nhiệt độ tăng</span><b>→</b><span>điện trở của dây tóc tăng</span>
                  </div>
                  <div className="question-card">
                    <h3>Khi nhiệt độ của dây tóc bóng đèn tăng, điện trở của dây tóc ______.</h3>
                    <div className="choice-row">
                      {[
                        ['increase', 'tăng'],
                        ['decrease', 'giảm'],
                        ['same', 'không đổi'],
                      ].map(([value, label]) => (
                        <button className={filamentApplyFinding === value ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" key={value} onClick={() => checkSoftAnswer(setFilamentApplyFinding, value, 'increase')}>{label}</button>
                      ))}
                    </div>
                    <div className="temperature-card-actions">
                      <button className="ghost-soft-btn" type="button" onClick={() => setShowTemperatureHint((current) => !current)}>Xem gợi ý</button>
                      <button className="primary-soft-btn" type="button" onClick={() => checkSoftAnswer(setFilamentApplyFinding, filamentApplyFinding || 'same', 'increase')}>Kiểm tra</button>
                      {temperatureConclusionUnderstood && <button className="primary-soft-btn" type="button" onClick={() => setTemperatureCardStep(Math.max(temperatureCardStep, 3))}>Tiếp tục</button>}
                    </div>
                    {showTemperatureHint && <p className="inline-feedback">Vì khi hiệu điện thế tăng, dòng điện làm dây tóc nóng hơn, khiến điện trở của dây tóc thay đổi.</p>}
                    {filamentApplyFinding && !temperatureConclusionUnderstood && <p className="inline-feedback inline-feedback--wrong">Hãy đối chiếu với sơ đồ phía trên và đường cong I - U của đèn sợi đốt.</p>}
                    {temperatureConclusionUnderstood && <p className="inline-feedback inline-feedback--correct">Điện trở của dây tóc bóng đèn phụ thuộc vào nhiệt độ. Khi nhiệt độ tăng, điện trở của dây tóc tăng.</p>}
                  </div>
                </section>
              )}

              {temperatureCardStep >= 3 && (
                <section className="temperature-sgk-card">
                  <div className="temperature-sgk-head">
                    <span>Card 3</span>
                    <h3>Điện trở nhiệt: khi nhiệt độ thay đổi, điện trở thay đổi rõ rệt</h3>
                    <p>Mục tiêu: biết điện trở nhiệt là linh kiện có điện trở thay đổi rõ rệt theo nhiệt độ và phân biệt được NTC, PTC.</p>
                  </div>
                  <div className="thermistor-type-grid">
                    <article>
                      <img src={ntcThermistorImage} alt="Điện trở nhiệt NTC" />
                      <span>NTC</span>
                      <strong>Negative Temperature Coefficient</strong>
                      <p>Nhiệt độ tăng → điện trở giảm</p>
                    </article>
                    <article>
                      <img src={ptcThermistorImage} alt="Điện trở nhiệt PTC" />
                      <span>PTC</span>
                      <strong>Positive Temperature Coefficient</strong>
                      <p>Nhiệt độ tăng → điện trở tăng</p>
                    </article>
                  </div>
                  <div className="ntc-sgk-lab">
                    <div>
                      <strong>Khảo sát NTC</strong>
                      <label className="thermal-slider">
                        <span>Nhiệt độ <strong>{ntcTemperature} °C</strong></span>
                        <input type="range" min="20" max="80" value={ntcTemperature} onChange={(event) => { const nextTemperature = Number(event.target.value); setNtcTemperature(nextTemperature); setHasHeatedNtc(nextTemperature > 20) }} />
                      </label>
                      <div className="simple-resistance-readout">
                        <span>Điện trở NTC</span>
                        <strong>{ntcResistance} kΩ</strong>
                      </div>
                    </div>
                    <table>
                      <thead><tr><th>Nhiệt độ</th><th>Điện trở NTC</th></tr></thead>
                      <tbody>
                        <tr><td>20 °C</td><td>10 kΩ</td></tr>
                        <tr><td>50 °C</td><td>4 kΩ</td></tr>
                        <tr><td>80 °C</td><td>1,5 kΩ</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="question-card">
                    <h3>Khi nhiệt độ tăng, điện trở NTC thay đổi như thế nào?</h3>
                    <div className="choice-row">
                      <button className={ntcFinding === 'increase' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setNtcFinding, 'increase', 'decrease')}>Tăng</button>
                      <button className={ntcFinding === 'decrease' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setNtcFinding, 'decrease', 'decrease')}>Giảm</button>
                    </div>
                    <div className="temperature-card-actions">
                      <button className="ghost-soft-btn" type="button" onClick={() => setShowNtcHint((current) => !current)}>Xem gợi ý</button>
                      <button className="primary-soft-btn" type="button" onClick={() => checkSoftAnswer(setNtcFinding, ntcFinding || 'increase', 'decrease')}>Kiểm tra</button>
                    </div>
                    {showNtcHint && <p className="inline-feedback">Ở nhiệt độ thấp, điện trở NTC lớn; khi nhiệt độ tăng, giá trị điện trở trong bảng giảm.</p>}
                    {hasHeatedNtc && !ntcFinding && <p className="inline-feedback">Hãy quan sát giá trị điện trở khi kéo nhiệt độ từ thấp lên cao.</p>}
                    {ntcFinding === 'increase' && <p className="inline-feedback inline-feedback--wrong">Hãy đối chiếu bảng số liệu: 10 kΩ, 4 kΩ, 1,5 kΩ.</p>}
                    {ntcUnderstood && <p className="inline-feedback inline-feedback--correct">Đúng. Với NTC, nhiệt độ tăng thì điện trở giảm.</p>}
                  </div>
                  {ntcUnderstood && (
                    <div className="question-card">
                      <h3>PTC khác NTC ở điểm nào?</h3>
                      <div className="choice-row">
                        <button className={thermistorCompareFinding === 'same' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setThermistorCompareFinding, 'same', 'opposite')}>Cả hai đều giảm điện trở khi nhiệt độ tăng</button>
                        <button className={thermistorCompareFinding === 'opposite' ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" onClick={() => checkSoftAnswer(setThermistorCompareFinding, 'opposite', 'opposite')}>NTC giảm, PTC tăng điện trở khi nhiệt độ tăng</button>
                      </div>
                      {thermistorCompareFinding === 'same' && <p className="inline-feedback inline-feedback--wrong">Hãy đọc lại đặc điểm của hai thẻ NTC và PTC.</p>}
                      {thermistorCompareUnderstood && <p className="inline-feedback inline-feedback--correct">Điện trở nhiệt là linh kiện có điện trở thay đổi rõ rệt theo nhiệt độ. Với NTC, nhiệt độ tăng thì điện trở giảm. Với PTC, nhiệt độ tăng thì điện trở tăng.</p>}
                    </div>
                  )}
                </section>
              )}
              {false && <>
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
              </>}
            </article>
          )}

        </>
      )}
          {temperatureJourneyComplete && !lesson23UnlockedParts.quiz && (
            <button className="primary-soft-btn lesson23-complete-worksheet" type="button" onClick={completeLesson23Worksheet}>
              Hoàn thành Phiếu học tập
            </button>
          )}
        </article>
      </section>
      )}

      {lesson23UnlockedParts.quiz && isAfterPart && (
        <section className="lesson23-learning-part lesson23-framework-section" ref={quizRef}>
          <div className="journey-heading">
            <span>Phần 3</span>
            <h2>Quiz</h2>
          </div>
          {renderLesson23SectionMeta(lesson23SectionMeta.quiz)}
          <Lesson23FinalChallengeGame onComplete={completeLesson23Quiz} />
        </section>
      )}

      {lesson23UnlockedParts.selfCheck && isAfterPart && (
        <section className="lesson23-learning-part lesson23-framework-section" ref={selfCheckRef}>
          <UnifiedSelfAssessment
            checks={competencyRatings}
            className="lesson23-self-review"
            description="Đối chiếu kết quả học tập với yêu cầu của bài Điện trở. Định luật Ôm."
            meta={{
              objective: 'Tự nhận biết mức độ hoàn thành sau video, phiếu học tập và quiz.',
              task: 'Đánh dấu các năng lực đã đạt, xem lại phần còn yếu và lưu kết quả học tập.',
              product: 'Nội dung tự đánh giá của học sinh.',
            }}
            completionItems={[
              ['watchedVideo', 'Tôi đã xem video khởi động.'],
              ['answeredGuide', 'Tôi đã trả lời câu hỏi định hướng.'],
              ['completedWorksheet', 'Tôi đã hoàn thành phiếu học tập.'],
              ['completedQuiz', 'Tôi đã hoàn thành Quiz.'],
            ]}
            difficultyItems={[
              ['hardResistance', 'Khái niệm điện trở.'],
              ['hardOhmFormula', 'Công thức định luật Ôm.'],
              ['hardGraph', 'Đường đặc trưng vôn-ampe.'],
              ['hardTemperature', 'Ảnh hưởng của nhiệt độ.'],
              ['hardThermistor', 'Điện trở nhiệt NTC và PTC.'],
            ]}
            doneMessage={assessedCount >= 9 && reflectionText.trim() && overallUnderstanding.trim() ? 'Bạn đã hoàn thành phiếu tự đánh giá Bài 23.' : ''}
            id="lesson23-self-check"
            onPlanChange={setOverallUnderstanding}
            onReflectionChange={setReflectionText}
            onToggleCheck={(key) => setCompetencyRatings((current) => ({ ...current, [key]: !current[key] }))}
            reflectionPlan={overallUnderstanding}
            reflectionQuestion={reflectionText}
            understandingItems={[
              ['understandResistance', 'Tôi hiểu điện trở đặc trưng cho mức cản trở dòng điện.'],
              ['knowOhmLaw', 'Tôi biết công thức I = U/R.'],
              ['readGraph', 'Tôi nhận biết được đường đặc trưng vôn-ampe.'],
              ['explainCollision', 'Tôi giải thích được nguyên nhân gây ra điện trở.'],
              ['understandTemperature', 'Tôi hiểu điện trở kim loại phụ thuộc nhiệt độ.'],
              ['distinguishThermistors', 'Tôi phân biệt được NTC và PTC.'],
            ]}
          />
        </section>
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
    solution: ['Đồng hồ điện tử dùng pin cúc áo.', 'Đèn pin thường dùng pin AA.', 'Quạt cần nguồn mạnh hơn, có thể dùng acquy/pin sạc.'],
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
  ['fan', 'quạt'],
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

function Lesson24ReviewGame({ onComplete, showSelfAssessment = true }) {
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

  useEffect(() => {
    if (allMissionsDone) {
      onComplete?.()
    }
  }, [allMissionsDone, onComplete])

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
      <Lesson24SectionMeta
        title="Phần 3. Quiz"
        objective="Kiểm tra mức độ hiểu bài."
        tasks={['Hoàn thành các câu hỏi trắc nghiệm.']}
        product={['Kết quả làm bài và điểm số.']}
      />
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

      {showSelfAssessment && <section className="review-self-assessment">
        <UnifiedSelfAssessment
          checks={ratings}
          className="lesson24-self-review"
          description="Đối chiếu kết quả học tập với yêu cầu của bài Nguồn điện."
          meta={{
            objective: 'Tự nhận biết mức độ hoàn thành sau video, phiếu học tập và quiz.',
            task: 'Đánh dấu các năng lực đã đạt, xem lại phần còn yếu và lưu kết quả học tập.',
            product: 'Nội dung tự đánh giá của học sinh.',
          }}
          completionItems={[
            ['watchedVideo', 'Tôi đã xem video khởi động.'],
            ['answeredGuide', 'Tôi đã trả lời câu hỏi định hướng.'],
            ['completedWorksheet', 'Tôi đã hoàn thành phiếu học tập.'],
            ['completedQuiz', 'Tôi đã hoàn thành Quiz.'],
          ]}
          difficultyItems={[
            ['hardCondition', 'Điều kiện duy trì dòng điện.'],
            ['hardSource', 'Vai trò của nguồn điện.'],
            ['hardEmf', 'Suất điện động.'],
            ['hardInternal', 'Điện trở trong.'],
            ['hardWholeCircuit', 'Định luật Ôm toàn mạch.'],
          ]}
          doneMessage={allMissionsDone && allRated && answers.selfQuestion?.trim() && answers.selfPlan?.trim() ? reflectionMessage : ''}
          onPlanChange={(value) => updateAnswer('selfPlan', value)}
          onReflectionChange={(value) => updateAnswer('selfQuestion', value)}
          onToggleCheck={(key) => setRatings((current) => ({ ...current, [key]: !current[key] }))}
          reflectionPlan={answers.selfPlan || ''}
          reflectionQuestion={answers.selfQuestion || ''}
          understandingItems={[
            ['condition', 'Tôi hiểu điều kiện duy trì dòng điện.'],
            ['source', 'Tôi hiểu vai trò của nguồn điện.'],
            ['emf', 'Tôi hiểu suất điện động.'],
            ['internal', 'Tôi hiểu điện trở trong của nguồn.'],
            ['wholeOhm', 'Tôi biết công thức I = ξ/(R+r) và U = ξ - Ir.'],
            ['reality', 'Tôi vận dụng được kiến thức nguồn điện vào thực tế.'],
          ]}
        />
      </section>}
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
    title: 'Điện trở trong của nguồn điện',
    lead: 'Suy luận từ dòng điện trong mạch kín để hình thành khái niệm điện trở trong.',
    questions: [
      {
        id: 'q1',
        prompt: 'Trong mạch kín, dòng điện đi qua những phần nào?',
        options: ['Chỉ bóng đèn', 'Chỉ dây dẫn ngoài', 'Cả mạch ngoài và bên trong nguồn điện'],
        answer: 'Cả mạch ngoài và bên trong nguồn điện',
        conclusion: 'Dòng điện chạy qua cả mạch ngoài và bên trong nguồn điện.',
      },
      {
        id: 'q2',
        prompt: 'Điện trở của nguồn điện được gọi là gì?',
        options: ['Điện trở mạch ngoài', 'Điện trở trong', 'Hiệu điện thế'],
        answer: 'Điện trở trong',
        conclusion: 'Nguồn điện cũng có điện trở; điện trở đó gọi là điện trở trong và kí hiệu là r.',
      },
    ],
  },
  {
    id: 'voltage',
    title: 'Ảnh hưởng của điện trở trong lên hiệu điện thế giữa hai cực nguồn',
    lead: 'Khám phá vì sao hiệu điện thế giữa hai cực nguồn khi có dòng điện nhỏ hơn suất điện động.',
    questions: [
      {
        id: 'q1',
        prompt: 'Khi mạch kín, năng lượng nguồn điện cung cấp được tiêu thụ ở đâu?',
        options: ['Chỉ trên điện trở ngoài R', 'Chỉ trên điện trở trong r', 'Trên cả điện trở ngoài R và điện trở trong r'],
        answer: 'Trên cả điện trở ngoài R và điện trở trong r',
        conclusion: 'Năng lượng nguồn điện được tiêu thụ trên cả điện trở ngoài và điện trở trong.',
      },
      {
        id: 'q2',
        prompt: 'Khi mạch kín, hiệu điện thế giữa hai cực nguồn liên hệ với suất điện động như thế nào?',
        options: ['Bằng suất điện động', 'Nhỏ hơn suất điện động', 'Luôn bằng 0'],
        answer: 'Nhỏ hơn suất điện động',
        conclusion: 'Khi mạch kín: U = ξ − Ir; hiệu điện thế giữa hai cực nguồn nhỏ hơn suất điện động.',
      },
    ],
  },
  {
    id: 'whole-ohm',
    title: 'Định luật Ôm toàn mạch',
    lead: 'Khám phá mối liên hệ giữa ξ, điện trở toàn phần và cường độ dòng điện trong mạch kín.',
    questions: [
      {
        id: 'q1',
        prompt: 'Điện trở toàn phần của mạch gồm những điện trở nào?',
        options: ['Chỉ R', 'Chỉ r', 'R + r'],
        answer: 'R + r',
        conclusion: 'Điện trở toàn phần của mạch là R + r.',
      },
      {
        id: 'q2',
        prompt: 'Khi ξ tăng thì I thay đổi thế nào nếu R và r không đổi?',
        options: ['Tăng', 'Giảm', 'Không đổi'],
        answer: 'Tăng',
        conclusion: 'Khi điện trở toàn phần không đổi, ξ càng lớn thì I càng lớn.',
      },
      {
        id: 'q3',
        prompt: 'Khi điện trở toàn phần tăng thì I thay đổi thế nào nếu ξ không đổi?',
        options: ['Tăng', 'Giảm', 'Không đổi'],
        answer: 'Giảm',
        conclusion: 'Điện trở toàn phần càng lớn thì dòng điện càng nhỏ.',
      },
    ],
  },
  {
    id: 'short',
    title: '⚠️ Em có biết? Đoản mạch',
    lead: 'Khi hai cực của nguồn điện được nối trực tiếp với nhau bằng dây dẫn có điện trở rất nhỏ, hiện tượng đoản mạch có thể xảy ra.',
    questions: [
      {
        id: 'q1',
        prompt: 'Sơ đồ nào mô tả hiện tượng đoản mạch?',
        options: ['Nguồn – bóng đèn – dây dẫn', 'Nguồn có công tắc mở', 'Hai cực nguồn nối trực tiếp bằng dây dẫn'],
        answer: 'Hai cực nguồn nối trực tiếp bằng dây dẫn',
        conclusion: 'Đoản mạch xảy ra khi hai cực nguồn được nối trực tiếp bằng dây dẫn có điện trở rất nhỏ.',
      },
      {
        id: 'q2',
        prompt: 'Vì sao đoản mạch nguy hiểm?',
        options: ['Dòng điện tăng rất lớn', 'Dòng điện giảm về 0', 'Không ảnh hưởng gì'],
        answer: 'Dòng điện tăng rất lớn',
        conclusion: 'Khi đoản mạch, điện trở mạch ngoài rất nhỏ nên cường độ dòng điện có thể tăng rất lớn.',
      },
    ],
  },
]

const lesson24OpeningSequence = [
  ['weak-pin', '🪫 Pin yếu'],
  ['dim-light', '💡 Đèn sáng mờ'],
  ['replace-pin', '🔋 Thay pin mới'],
  ['bright-light', '💡 Đèn sáng mạnh trở lại'],
]

const lesson24OpeningCards = [
  ['bright-light', '💡 Đèn sáng mạnh trở lại'],
  ['dim-light', '💡 Đèn sáng mờ'],
  ['weak-pin', '🪫 Pin yếu'],
  ['replace-pin', '🔋 Thay pin mới'],
]

const lesson24OpeningFocusCards = [
  ['color', 'A. Pin mới có màu sắc khác.'],
  ['current', 'B. Pin mới giúp dòng điện tiếp tục tồn tại trong mạch.'],
  ['wire', 'C. Dây dẫn ngắn hơn.'],
]

function Lesson24SectionMeta({ title, objective, tasks, product }) {
  return (
    <div className="lesson24-section-meta">
      {title && <span>{title}</span>}
      <div className="lesson24-section-meta__grid">
        <section>
          <strong>Mục tiêu:</strong>
          <p>{objective}</p>
        </section>
        <section>
          <strong>Nhiệm vụ học tập:</strong>
          <ul>
            {tasks.map((task) => <li key={task}>{task}</li>)}
          </ul>
        </section>
        <section>
          <strong>Sản phẩm học tập:</strong>
          <ul>
            {product.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
      </div>
    </div>
  )
}

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
  const [electronTransfers, setElectronTransfers] = useState(0)
  const [spheresConnected, setSpheresConnected] = useState(false)
  const [conditionAnswers, setConditionAnswers] = useState({})
  const [conditionFeedback, setConditionFeedback] = useState({})
  const [sourcePolesRevealed, setSourcePolesRevealed] = useState(false)
  const [sourceAnswers, setSourceAnswers] = useState({})
  const [sourceFeedback, setSourceFeedback] = useState({})
  const [internalAnswers, setInternalAnswers] = useState({})
  const [internalFeedback, setInternalFeedback] = useState({})
  const [internalDraggedPhrase, setInternalDraggedPhrase] = useState('')
  const [voltageAnswers, setVoltageAnswers] = useState({})
  const [voltageFeedback, setVoltageFeedback] = useState({})
  const [voltageDraggedToken, setVoltageDraggedToken] = useState('')
  const [wholeOhmAnswers, setWholeOhmAnswers] = useState({})
  const [wholeOhmFeedback, setWholeOhmFeedback] = useState({})
  const [wholeOhmDraggedToken, setWholeOhmDraggedToken] = useState('')
  const [wholeOhmEmf, setWholeOhmEmf] = useState(9)
  const [wholeOhmTotalResistance, setWholeOhmTotalResistance] = useState(6)
  const [shortAnswers, setShortAnswers] = useState({})
  const [shortFeedback, setShortFeedback] = useState({})
  const [quizOpen, setQuizOpen] = useState(PREVIEW_ALL_LESSON_PARTS)
  const [selfOpen, setSelfOpen] = useState(PREVIEW_ALL_LESSON_PARTS)

  useEffect(() => {
    if (!spheresConnected || electronTransfers >= 4) return undefined

    const timer = window.setInterval(() => {
      setElectronTransfers((current) => {
        if (current >= 4) {
          window.clearInterval(timer)
          return current
        }
        return current + 1
      })
    }, 950)

    return () => window.clearInterval(timer)
  }, [spheresConnected, electronTransfers])

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
  const worksheetComplete = currentCardDone && cardIndex === lesson24WorksheetCards.length - 1
  const worksheetTaskCount = lesson24WorksheetCards.length + 1
  const completedTaskCount = (openingDone ? 1 : 0) + completedCards.length
  const worksheetProgress = Math.round((completedTaskCount / worksheetTaskCount) * 100)
  const worksheetSummaryLines = [
    'Pin mới giúp dòng điện tiếp tục được duy trì.',
    'Muốn đèn sáng liên tục cần duy trì dòng điện.',
    ...lesson24WorksheetCards.flatMap((card) => card.questions.map((question) => question.conclusion)),
  ]

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
      '✅ Chính xác! Pin yếu → đèn sáng mờ → thay pin mới → đèn sáng mạnh trở lại.',
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
      '✅ Đúng! Sau khi thay pin mới, dòng điện trong mạch tiếp tục tồn tại nên đèn sáng trở lại. Nhưng pin đã làm gì để dòng điện không bị mất đi?',
    )
  }

  const checkOpeningConclusion = () => {
    setOpeningSmartFeedback(
      'conclusion',
      true,
      '💡 Hãy giữ lại câu hỏi khoa học vừa xuất hiện sau khi thay pin mới.',
      '💡 Câu hỏi này chưa cần trả lời ngay; ta sẽ khám phá ở nhiệm vụ tiếp theo.',
      '✅ Câu hỏi đã sẵn sàng: Vì sao pin có thể giúp dòng điện tồn tại lâu dài trong mạch?',
    )
  }

  const connectSpheres = () => {
    setElectronTransfers(0)
    setSpheresConnected(true)
    playLessonTone('correct')
  }

  const answerConditionQuestion = (key, value, correct, successText, wrongText) => {
    const isCorrect = value === correct
    setConditionAnswers((current) => ({ ...current, [key]: value }))
    setConditionFeedback((current) => ({ ...current, [key]: { type: isCorrect ? 'success' : 'hint', text: isCorrect ? successText : wrongText } }))
    playLessonTone(isCorrect ? 'correct' : 'wrong')
  }

  const completeConditionTask = () => {
    setCompletedCards((current) => current.includes('condition') ? current : [...current, 'condition'])
    playLessonTone('correct')
  }

  const answerSourceQuestion = (key, value, correct, successText, wrongText) => {
    const isCorrect = value === correct
    setSourceAnswers((current) => ({ ...current, [key]: value }))
    setSourceFeedback((current) => ({ ...current, [key]: { type: isCorrect ? 'success' : 'hint', text: isCorrect ? successText : wrongText } }))
    playLessonTone(isCorrect ? 'correct' : 'wrong')
  }

  const completeSourceTask = () => {
    setCompletedCards((current) => current.includes('source') ? current : [...current, 'source'])
    playLessonTone('correct')
  }

  const answerInternalQuestion = (key, value, correct, successText, wrongText) => {
    const isCorrect = value === correct
    setInternalAnswers((current) => ({ ...current, [key]: value }))
    setInternalFeedback((current) => ({ ...current, [key]: { type: isCorrect ? 'success' : 'hint', text: isCorrect ? successText : wrongText } }))
    playLessonTone(isCorrect ? 'correct' : 'wrong')
  }

  const completeInternalTask = () => {
    setCompletedCards((current) => current.includes('internal') ? current : [...current, 'internal'])
    playLessonTone('correct')
  }

  const answerVoltageQuestion = (key, value, correct, successText, wrongText) => {
    const isCorrect = value === correct
    setVoltageAnswers((current) => ({ ...current, [key]: value }))
    setVoltageFeedback((current) => ({ ...current, [key]: { type: isCorrect ? 'success' : 'hint', text: isCorrect ? successText : wrongText } }))
    playLessonTone(isCorrect ? 'correct' : 'wrong')
  }

  const placeVoltageToken = (slot) => {
    if (!voltageDraggedToken) return
    setVoltageAnswers((current) => ({ ...current, [slot]: voltageDraggedToken }))
    setVoltageDraggedToken('')
    setVoltageFeedback((current) => ({ ...current, formula: '' }))
  }

  const checkVoltageFormula = () => {
    const isCorrect = voltageAnswers.emf === 'ξ' && voltageAnswers.terminal === 'U' && voltageAnswers.drop === 'Ir'
    setVoltageFeedback((current) => ({
      ...current,
      formula: {
        type: isCorrect ? 'success' : 'hint',
        text: isCorrect
          ? 'Đúng! Suất điện động bằng tổng hiệu điện thế mạch ngoài và độ giảm điện thế trên điện trở trong.'
          : 'Hãy ghép: suất điện động là ξ, hiệu điện thế mạch ngoài là U, độ giảm điện thế trên điện trở trong là Ir.',
      },
    }))
    if (isCorrect) {
      setVoltageAnswers((current) => ({ ...current, formula: 'done' }))
      playLessonTone('correct')
    } else {
      playLessonTone('wrong')
    }
  }

  const completeVoltageTask = () => {
    setCompletedCards((current) => current.includes('voltage') ? current : [...current, 'voltage'])
    playLessonTone('correct')
  }

  const answerWholeOhmQuestion = (key, value, correct, successText, wrongText) => {
    const isCorrect = value === correct
    setWholeOhmAnswers((current) => ({ ...current, [key]: value }))
    setWholeOhmFeedback((current) => ({ ...current, [key]: { type: isCorrect ? 'success' : 'hint', text: isCorrect ? successText : wrongText } }))
    playLessonTone(isCorrect ? 'correct' : 'wrong')
  }

  const placeWholeOhmToken = (slot) => {
    if (!wholeOhmDraggedToken) return
    setWholeOhmAnswers((current) => ({ ...current, [slot]: wholeOhmDraggedToken }))
    setWholeOhmDraggedToken('')
    setWholeOhmFeedback((current) => ({ ...current, formula: '' }))
  }

  const checkWholeOhmFormula = () => {
    const isCorrect = wholeOhmAnswers.left === 'I' && wholeOhmAnswers.numerator === 'ξ' && wholeOhmAnswers.denominator === 'R+r'
    setWholeOhmFeedback((current) => ({
      ...current,
      formula: {
        type: isCorrect ? 'success' : 'hint',
        text: isCorrect
          ? 'Đúng! Từ ξ = I(R + r) suy ra cường độ dòng điện trong toàn mạch.'
          : 'Hãy đặt I ở vế trái, ξ ở tử số và R+r ở mẫu số.',
      },
    }))
    if (isCorrect) {
      setWholeOhmAnswers((current) => ({ ...current, formula: 'done' }))
      playLessonTone('correct')
    } else {
      playLessonTone('wrong')
    }
  }

  const checkWholeOhmStatement = () => {
    const isCorrect = wholeOhmAnswers.direct === 'tỉ lệ thuận' && wholeOhmAnswers.inverse === 'tỉ lệ nghịch'
    setWholeOhmFeedback((current) => ({
      ...current,
      statement: {
        type: isCorrect ? 'success' : 'hint',
        text: isCorrect
          ? 'Đúng! Cường độ dòng điện tỉ lệ thuận với suất điện động và tỉ lệ nghịch với điện trở toàn phần.'
          : 'Hãy dựa vào hai mô phỏng: ξ tăng làm I tăng, còn R+r tăng làm I giảm.',
      },
    }))
    if (isCorrect) {
      setWholeOhmAnswers((current) => ({ ...current, statement: 'done' }))
      playLessonTone('correct')
    } else {
      playLessonTone('wrong')
    }
  }

  const completeWholeOhmTask = () => {
    setCompletedCards((current) => current.includes('whole-ohm') ? current : [...current, 'whole-ohm'])
    playLessonTone('correct')
  }

  const answerShortQuestion = (key, value, correct, successText, wrongText) => {
    const isCorrect = value === correct
    setShortAnswers((current) => ({ ...current, [key]: value }))
    setShortFeedback((current) => ({ ...current, [key]: { type: isCorrect ? 'success' : 'hint', text: isCorrect ? successText : wrongText } }))
    playLessonTone(isCorrect ? 'correct' : 'wrong')
  }

  const completeShortTask = () => {
    setCompletedCards((current) => current.includes('short') ? current : [...current, 'short'])
    playLessonTone('correct')
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

  const renderConditionTask = (index) => {
    const voltagePercent = Math.max(0, 100 - electronTransfers * 25)
    const predictionCorrect = conditionAnswers.prediction === 'b-to-a'
    const q1Ready = spheresConnected && electronTransfers >= 1
    const finalStateReached = spheresConnected && electronTransfers >= 4
    const q2Ready = finalStateReached && conditionAnswers.q1 === 'current'
    const conclusionReady = conditionAnswers.q2 === 'same-potential'
    const done = completedCards.includes('condition')

    return (
      <section className={done ? 'worksheet24-section is-done' : 'worksheet24-section'} key="condition">
        <div className="worksheet24-card-head worksheet24-section-head">
          <span>Nhiệm vụ {index + 2}</span>
          <h3>Điều kiện để duy trì dòng điện</h3>
          <p>Dự đoán hiện tượng, nối hai quả cầu rồi quan sát dòng điện có thể tồn tại lâu dài hay không.</p>
        </div>

        <article className="worksheet24-question">
          <strong>Nếu nối hai quả cầu này bằng dây dẫn thì điều gì xảy ra?</strong>
          <div className="worksheet24-options">
            <button className={conditionAnswers.prediction === 'b-to-a' ? 'is-selected' : ''} type="button" onClick={() => answerConditionQuestion('prediction', 'b-to-a', 'b-to-a', 'Hãy kiểm chứng dự đoán bằng mô phỏng.', 'Hãy xét chiều dịch chuyển của electron giữa quả cầu âm và quả cầu dương.')}>A. Electron dịch chuyển từ B sang A.</button>
            <button className={conditionAnswers.prediction === 'a-to-b' ? 'is-selected' : ''} type="button" onClick={() => answerConditionQuestion('prediction', 'a-to-b', 'b-to-a', 'Hãy kiểm chứng dự đoán bằng mô phỏng.', 'Quả cầu A mang điện dương, quả cầu B mang điện âm. Hãy dự đoán lại.')}>B. Electron dịch chuyển từ A sang B.</button>
            <button className={conditionAnswers.prediction === 'none' ? 'is-selected' : ''} type="button" onClick={() => answerConditionQuestion('prediction', 'none', 'b-to-a', 'Hãy kiểm chứng dự đoán bằng mô phỏng.', 'Giữa hai quả cầu có hiệu điện thế nên cần kiểm tra xem electron có dịch chuyển không.')}>C. Không có electron nào dịch chuyển.</button>
          </div>
          {conditionFeedback.prediction && <div className={conditionFeedback.prediction.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{conditionFeedback.prediction.text}</strong></div>}
        </article>

        <article className="source24-condition-lab">
          <div className="source24-lab-head">
            <span>Thí nghiệm tương tác</span>
            <h3>Hãy thử nối hai quả cầu</h3>
          </div>
          <div className="source24-sphere-lab" style={{ '--voltage-level': `${voltagePercent}%` }}>
            <div className="source24-charge-sphere source24-charge-sphere--a">
              <strong>Quả cầu A</strong>
              <span>Mang điện tích dương (+)</span>
              <div className="source24-plus-cloud">{Array.from({ length: 8 }, (_, item) => <i key={item}>+</i>)}</div>
              <div className="source24-a-electrons">{Array.from({ length: electronTransfers }, (_, item) => <b key={item} />)}</div>
            </div>
            <div className="source24-connection">
              <div
                className={spheresConnected ? (electronTransfers > 0 && electronTransfers < 4 ? 'source24-wire is-active' : 'source24-wire') : 'source24-wire source24-wire--hidden'}
                style={{ '--electron-speed': `${0.85 + electronTransfers * 0.42}s` }}
              >
                {spheresConnected && electronTransfers < 4 && Array.from({ length: 3 }, (_, item) => <i key={item} />)}
              </div>
              {!spheresConnected && <span className="source24-potential-label">VA ≠ VB</span>}
              {predictionCorrect && (
                <button className="primary-soft-btn source24-connect-btn" disabled={spheresConnected} type="button" onClick={connectSpheres}>
                  NỐI HAI QUẢ CẦU
                </button>
              )}
            </div>
            <div className="source24-charge-sphere source24-charge-sphere--b">
              <strong>Quả cầu B</strong>
              <span>Mang điện tích âm (-)</span>
              <div className="source24-electron-cloud">{Array.from({ length: Math.max(0, 8 - electronTransfers) }, (_, item) => <b key={item} />)}</div>
            </div>
          </div>
          <div className="source24-voltage-meter" aria-label={`Hiệu điện thế còn ${voltagePercent}%`}>
            <div><strong>Hiệu điện thế</strong><span>{finalStateReached ? '0' : spheresConnected ? `${voltagePercent}%` : 'VA ≠ VB'}</span></div>
            <i><b style={{ width: `${voltagePercent}%` }} /></i>
            {finalStateReached && <p>VA = VB. Hiệu điện thế = 0. Không còn electron chuyển động.</p>}
          </div>
        </article>

        {q1Ready && (
          <article className="worksheet24-question">
            <strong>Trong quá trình electron dịch chuyển qua dây dẫn, hiện tượng nào xuất hiện?</strong>
            <div className="worksheet24-options">
              <button className={conditionAnswers.q1 === 'current' ? 'is-selected' : ''} type="button" onClick={() => answerConditionQuestion('q1', 'current', 'current', '✅ Đúng! Sự dịch chuyển có hướng của electron trong dây dẫn tạo thành dòng điện.', 'Hãy quan sát electron đang tự dịch chuyển qua dây nối.')}>A. Dòng điện trong dây dẫn.</button>
              <button className={conditionAnswers.q1 === 'still' ? 'is-selected' : ''} type="button" onClick={() => answerConditionQuestion('q1', 'still', 'current', '✅ Đúng! Sự dịch chuyển có hướng của electron trong dây dẫn tạo thành dòng điện.', 'Electron không đứng yên sau khi hai quả cầu được nối bằng dây.')}>B. Electron đứng yên.</button>
              <button className={conditionAnswers.q1 === 'none' ? 'is-selected' : ''} type="button" onClick={() => answerConditionQuestion('q1', 'none', 'current', '✅ Đúng! Sự dịch chuyển có hướng của electron trong dây dẫn tạo thành dòng điện.', 'Có electron dịch chuyển qua dây nối, hãy quan sát lại mô phỏng.')}>C. Không có hiện tượng gì.</button>
            </div>
            {conditionFeedback.q1 && <div className={conditionFeedback.q1.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{conditionFeedback.q1.text}</strong></div>}
          </article>
        )}

        {q2Ready && (
          <article className="worksheet24-question">
            <strong>Vì sao dòng điện không còn tồn tại?</strong>
            <div className="worksheet24-options">
              <button className={conditionAnswers.q2 === 'lost' ? 'is-selected' : ''} type="button" onClick={() => answerConditionQuestion('q2', 'lost', 'same-potential', '✅ Đúng! Khi điện thế hai quả cầu bằng nhau thì giữa hai đầu dây dẫn không còn hiệu điện thế nên dòng điện mất đi.', 'Electron không biến mất; hãy quan sát trạng thái VA = VB.')}>A. Electron biến mất.</button>
              <button className={conditionAnswers.q2 === 'same-potential' ? 'is-selected' : ''} type="button" onClick={() => answerConditionQuestion('q2', 'same-potential', 'same-potential', '✅ Đúng! Khi điện thế hai quả cầu bằng nhau thì giữa hai đầu dây dẫn không còn hiệu điện thế nên dòng điện mất đi.', 'Hãy quan sát trạng thái cuối của hai quả cầu.')}>B. Hai quả cầu đã có cùng điện thế.</button>
              <button className={conditionAnswers.q2 === 'broken' ? 'is-selected' : ''} type="button" onClick={() => answerConditionQuestion('q2', 'broken', 'same-potential', '✅ Đúng! Khi điện thế hai quả cầu bằng nhau thì giữa hai đầu dây dẫn không còn hiệu điện thế nên dòng điện mất đi.', 'Dây dẫn không bị hỏng; hiệu điện thế mới là đại lượng đã giảm về 0.')}>C. Dây dẫn bị hỏng.</button>
            </div>
            {conditionFeedback.q2 && <div className={conditionFeedback.q2.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{conditionFeedback.q2.text}</strong></div>}
          </article>
        )}

        {conclusionReady && (
          <article className="worksheet24-question">
            <strong>Điều kiện nào giúp dòng điện tồn tại lâu dài?</strong>
            <strong>Muốn dòng điện tồn tại lâu dài cần duy trì ______ giữa hai đầu mạch.</strong>
            <div className="worksheet24-options">
              <button className={conditionAnswers.conclusion === 'voltage' ? 'is-selected' : ''} type="button" onClick={() => answerConditionQuestion('conclusion', 'voltage', 'voltage', '✅ Chính xác. Muốn duy trì dòng điện lâu dài cần duy trì hiệu điện thế giữa hai đầu mạch.', 'Hãy nhớ đại lượng đã giảm dần về 0 trong thí nghiệm.')}>Hiệu điện thế</button>
              <button className={conditionAnswers.conclusion === 'color' ? 'is-selected' : ''} type="button" onClick={() => answerConditionQuestion('conclusion', 'color', 'voltage', '✅ Chính xác. Muốn duy trì dòng điện lâu dài cần duy trì hiệu điện thế giữa hai đầu mạch.', 'Màu sắc của vật dẫn không phải điều kiện tạo dòng điện.')}>Màu sắc của vật dẫn</button>
              <button className={conditionAnswers.conclusion === 'length' ? 'is-selected' : ''} type="button" onClick={() => answerConditionQuestion('conclusion', 'length', 'voltage', '✅ Chính xác. Muốn duy trì dòng điện lâu dài cần duy trì hiệu điện thế giữa hai đầu mạch.', 'Chiều dài dây không phải đại lượng đã mất đi trong mô phỏng.')}>Chiều dài dây dẫn</button>
            </div>
            {conditionFeedback.conclusion && <div className={conditionFeedback.conclusion.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{conditionFeedback.conclusion.text}</strong></div>}
          </article>
        )}

        {conditionAnswers.conclusion === 'voltage' && (
          <div className="worksheet24-info-box worksheet24-info-box--remember">
            <strong>Kết luận</strong>
            <p>✔ Khi giữa hai đầu vật dẫn có hiệu điện thế, electron dịch chuyển có hướng tạo thành dòng điện.</p>
            <p>✔ Trong trường hợp hai quả cầu mang điện, hiệu điện thế giảm dần nên dòng điện chỉ tồn tại trong thời gian ngắn.</p>
            <p>✔ Muốn duy trì dòng điện lâu dài cần duy trì hiệu điện thế giữa hai đầu mạch.</p>
            <p>🤔 Chúng ta vừa biết muốn duy trì dòng điện lâu dài cần duy trì hiệu điện thế. Vậy thiết bị nào có thể liên tục duy trì hiệu điện thế giữa hai đầu mạch?</p>
            {!done && <button className="primary-soft-btn" type="button" onClick={completeConditionTask}>Khám phá tiếp</button>}
          </div>
        )}

        {done && index < lesson24WorksheetCards.length - 1 && index === cardIndex && (
          <button className="primary-soft-btn" type="button" onClick={() => setCardIndex((current) => current + 1)}>Mở nhiệm vụ tiếp theo</button>
        )}
      </section>
    )
  }

  const renderSourceTask = (index) => {
    const sourceIdentified = sourceAnswers.device === 'source'
    const polesUnderstood = sourceAnswers.poles === 'two'
    const separationUnderstood = sourceAnswers.separation === 'separate'
    const done = completedCards.includes('source')

    return (
      <section className={done ? 'worksheet24-section is-done' : 'worksheet24-section'} key="source">
        <div className="worksheet24-card-head worksheet24-section-head">
          <span>Nhiệm vụ {index + 2}</span>
          <h3>Nguồn điện</h3>
          <p>Trong thí nghiệm hai quả cầu, dòng điện chỉ tồn tại trong thời gian ngắn vì hiệu điện thế dần mất đi. Tuy nhiên chiếc đèn pin vẫn có thể sáng liên tục trong thời gian dài.</p>
        </div>
        <div className="worksheet24-bridge worksheet24-bridge--reflect">
          <p><strong>🤔 Điều gì giúp hiệu điện thế giữa hai đầu mạch luôn được duy trì?</strong></p>
        </div>

        <article className="worksheet24-question">
          <strong>Thiết bị nào có khả năng duy trì hiệu điện thế giữa hai đầu mạch?</strong>
          <div className="worksheet24-options">
            <button className={sourceAnswers.device === 'wire' ? 'is-selected' : ''} type="button" onClick={() => answerSourceQuestion('device', 'wire', 'source', '✅ Đúng! Nguồn điện là thiết bị tạo ra và duy trì hiệu điện thế giữa hai cực của nó.', 'Dây dẫn chỉ tạo đường đi cho dòng điện, không duy trì hiệu điện thế.')}>A. Dây dẫn</button>
            <button className={sourceAnswers.device === 'lamp' ? 'is-selected' : ''} type="button" onClick={() => answerSourceQuestion('device', 'lamp', 'source', '✅ Đúng! Nguồn điện là thiết bị tạo ra và duy trì hiệu điện thế giữa hai cực của nó.', 'Bóng đèn là thiết bị tiêu thụ điện, không duy trì hiệu điện thế.')}>B. Bóng đèn</button>
            <button className={sourceAnswers.device === 'source' ? 'is-selected' : ''} type="button" onClick={() => answerSourceQuestion('device', 'source', 'source', '✅ Đúng! Nguồn điện là thiết bị tạo ra và duy trì hiệu điện thế giữa hai cực của nó.', 'Hãy chọn thiết bị có thể duy trì hiệu điện thế lâu dài.')}>C. Nguồn điện</button>
          </div>
          {sourceFeedback.device && <div className={sourceFeedback.device.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{sourceFeedback.device.text}</strong></div>}
        </article>

        {sourceIdentified && (
          <article className="source24-source-device">
            <div className="source24-source-head">
              <span>Hoạt động 2</span>
              <h3>Quan sát nguồn điện</h3>
              <p>Bấm khám phá để quan sát cấu tạo ngoài của một pin.</p>
            </div>
            <div className={sourcePolesRevealed ? 'source24-battery-observe is-revealed' : 'source24-battery-observe'}>
              <img src={pinImage} alt="Pin điện" />
              {sourcePolesRevealed && (
                <>
                  <span className="source24-pole source24-pole--plus">Cực dương (+)</span>
                  <span className="source24-pole source24-pole--minus">Cực âm (-)</span>
                </>
              )}
            </div>
            {!sourcePolesRevealed && <button className="primary-soft-btn" type="button" onClick={() => setSourcePolesRevealed(true)}>Khám phá</button>}
          </article>
        )}

        {sourcePolesRevealed && (
          <article className="worksheet24-question">
            <strong>Nguồn điện luôn có:</strong>
            <div className="worksheet24-options">
              <button className={sourceAnswers.poles === 'one' ? 'is-selected' : ''} type="button" onClick={() => answerSourceQuestion('poles', 'one', 'two', '✅ Đúng! Nguồn điện có hai cực: cực dương (+) và cực âm (-). Giữa hai cực luôn tồn tại hiệu điện thế.', 'Quan sát lại hai nhãn trên pin.')}>A. Một cực</button>
              <button className={sourceAnswers.poles === 'two' ? 'is-selected' : ''} type="button" onClick={() => answerSourceQuestion('poles', 'two', 'two', '✅ Đúng! Nguồn điện có hai cực: cực dương (+) và cực âm (-). Giữa hai cực luôn tồn tại hiệu điện thế.', 'Quan sát lại hai nhãn trên pin.')}>B. Hai cực</button>
              <button className={sourceAnswers.poles === 'three' ? 'is-selected' : ''} type="button" onClick={() => answerSourceQuestion('poles', 'three', 'two', '✅ Đúng! Nguồn điện có hai cực: cực dương (+) và cực âm (-). Giữa hai cực luôn tồn tại hiệu điện thế.', 'Quan sát lại hai nhãn trên pin.')}>C. Ba cực</button>
            </div>
            {sourceFeedback.poles && <div className={sourceFeedback.poles.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{sourceFeedback.poles.text}</strong></div>}
          </article>
        )}

        {polesUnderstood && (
          <article className="source24-separation-card">
            <div className="source24-source-head">
              <span>Hoạt động 3</span>
              <h3>Vì sao nguồn điện duy trì được hiệu điện thế?</h3>
            </div>
            <div className="source24-separation-sim" aria-label="Mô phỏng nguồn điện tách điện tích">
              <div className="source24-pole-well source24-pole-well--plus"><strong>Cực dương (+)</strong><i>+</i><i>+</i><i>+</i></div>
              <div className="source24-separator">
                <span>tách điện tích</span>
                <b className="source24-moving-positive">+</b>
                <b className="source24-moving-electron" />
              </div>
              <div className="source24-pole-well source24-pole-well--minus"><strong>Cực âm (-)</strong><i>-</i><i>-</i><i>-</i></div>
            </div>
          </article>
        )}

        {polesUnderstood && (
          <article className="worksheet24-question">
            <strong>Nguồn điện phải thực hiện việc gì để duy trì hiệu điện thế?</strong>
            <div className="worksheet24-options">
              <button className={sourceAnswers.separation === 'separate' ? 'is-selected' : ''} type="button" onClick={() => answerSourceQuestion('separation', 'separate', 'separate', '✅ Đúng! Muốn duy trì hiệu điện thế, nguồn điện phải liên tục tách các điện tích dương và âm về hai cực khác nhau.', 'Hãy quan sát mô phỏng tách điện tích về hai cực.')}>A. Liên tục tách điện tích dương và âm.</button>
              <button className={sourceAnswers.separation === 'shorten' ? 'is-selected' : ''} type="button" onClick={() => answerSourceQuestion('separation', 'shorten', 'separate', '✅ Đúng! Muốn duy trì hiệu điện thế, nguồn điện phải liên tục tách các điện tích dương và âm về hai cực khác nhau.', 'Làm dây dẫn ngắn lại không tạo ra hai cực có hiệu điện thế.')}>B. Làm dây dẫn ngắn lại.</button>
              <button className={sourceAnswers.separation === 'lamp' ? 'is-selected' : ''} type="button" onClick={() => answerSourceQuestion('separation', 'lamp', 'separate', '✅ Đúng! Muốn duy trì hiệu điện thế, nguồn điện phải liên tục tách các điện tích dương và âm về hai cực khác nhau.', 'Bóng đèn sáng là kết quả khi có dòng điện, không phải cơ chế duy trì hiệu điện thế.')}>C. Làm bóng đèn sáng hơn.</button>
            </div>
            {sourceFeedback.separation && <div className={sourceFeedback.separation.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{sourceFeedback.separation.text}</strong></div>}
          </article>
        )}

        {separationUnderstood && (
          <>
            <div className="worksheet24-info-box">
              <strong>Kiến thức mới</strong>
              <p>Bên trong nguồn điện tồn tại một lực đặc biệt.</p>
              <p>Lực này không phải lực điện.</p>
              <p>Lực đó được gọi là: <b>⭐ Lực lạ</b></p>
              <p>Lực lạ giúp tách điện tích và duy trì hiệu điện thế giữa hai cực của nguồn điện.</p>
            </div>
            <div className="worksheet24-info-box worksheet24-info-box--remember">
              <strong>Kết luận</strong>
              <p>✔ Nguồn điện là thiết bị tạo ra và duy trì hiệu điện thế.</p>
              <p>✔ Nguồn điện có hai cực: cực dương và cực âm.</p>
              <p>✔ Để duy trì hiệu điện thế, nguồn điện phải liên tục tách các điện tích.</p>
              <p>✔ Công việc đó được thực hiện bởi lực lạ bên trong nguồn điện.</p>
              {!done && <button className="primary-soft-btn" type="button" onClick={completeSourceTask}>Hoàn thành Nhiệm vụ 3</button>}
            </div>
          </>
        )}

        {done && index < lesson24WorksheetCards.length - 1 && index === cardIndex && (
          <button className="primary-soft-btn" type="button" onClick={() => setCardIndex((current) => current + 1)}>Mở nhiệm vụ tiếp theo</button>
        )}
      </section>
    )
  }

  const renderInternalResistanceTask = (index) => {
    const circuitUnderstood = internalAnswers.path === 'whole'
    const conductorUnderstood = internalAnswers.conductor === 'conductor'
    const inferenceUnderstood = internalAnswers.inference === 'Vật dẫn điện có điện trở'
    const symbolUnderstood = internalAnswers.symbol === 'r'
    const done = completedCards.includes('internal')

    return (
      <section className={done ? 'worksheet24-section is-done' : 'worksheet24-section'} key="internal">
        <div className="worksheet24-card-head worksheet24-section-head">
          <span>Nhiệm vụ {index + 2}</span>
          <h3>Nguồn điện có điện trở không?</h3>
          <p>Suy luận từng bước từ dòng điện trong mạch kín.</p>
        </div>

        <article className="internal24-card">
          <div className="internal24-head">
            <span>Card 1</span>
            <h3>Dòng điện chỉ chạy ở mạch ngoài hay còn đi qua nguồn điện?</h3>
          </div>
          <div className="internal24-circuit" aria-label="Mô phỏng dòng điện trong mạch kín">
            <div className="internal24-battery"><Icon name="battery" /><span>Nguồn điện</span></div>
            <div className="internal24-lamp"><span /></div>
            <div className="internal24-wire internal24-wire--top">{Array.from({ length: 4 }, (_, item) => <i key={item} />)}</div>
            <div className="internal24-wire internal24-wire--bottom">{Array.from({ length: 4 }, (_, item) => <i key={item} />)}</div>
            <div className="internal24-source-path">{Array.from({ length: 3 }, (_, item) => <i key={item} />)}</div>
          </div>
          <article className="worksheet24-question">
            <strong>Trong mạch kín, dòng điện đi qua:</strong>
            <div className="worksheet24-options">
              <button className={internalAnswers.path === 'lamp' ? 'is-selected' : ''} type="button" onClick={() => answerInternalQuestion('path', 'lamp', 'whole', '✅ Đúng! Dòng điện trong mạch kín đi qua toàn bộ mạch, bao gồm cả phần bên trong nguồn điện.', 'Hãy quan sát electron chuyển động cả trên dây, qua đèn và bên trong nguồn.')}>A. Chỉ bóng đèn</button>
              <button className={internalAnswers.path === 'outside' ? 'is-selected' : ''} type="button" onClick={() => answerInternalQuestion('path', 'outside', 'whole', '✅ Đúng! Dòng điện trong mạch kín đi qua toàn bộ mạch, bao gồm cả phần bên trong nguồn điện.', 'Mạch kín gồm cả mạch ngoài và phần bên trong nguồn điện.')}>B. Chỉ dây dẫn ngoài</button>
              <button className={internalAnswers.path === 'whole' ? 'is-selected' : ''} type="button" onClick={() => answerInternalQuestion('path', 'whole', 'whole', '✅ Đúng! Dòng điện trong mạch kín đi qua toàn bộ mạch, bao gồm cả phần bên trong nguồn điện.', 'Hãy quan sát electron chuyển động cả trên dây, qua đèn và bên trong nguồn.')}>C. Cả mạch ngoài và bên trong nguồn điện</button>
            </div>
            {internalFeedback.path && <div className={internalFeedback.path.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{internalFeedback.path.text}</strong></div>}
          </article>
        </article>

        {circuitUnderstood && (
          <article className="internal24-card">
            <div className="internal24-head">
              <span>Card 2</span>
              <h3>Nếu dòng điện đi qua được nguồn điện thì điều đó cho biết điều gì?</h3>
            </div>
            <article className="worksheet24-question">
              <strong>Nguồn điện là:</strong>
              <div className="worksheet24-options">
                <button className={internalAnswers.conductor === 'insulator' ? 'is-selected' : ''} type="button" onClick={() => answerInternalQuestion('conductor', 'insulator', 'conductor', '✅ Đúng! Dòng điện chỉ có thể đi qua vật dẫn điện. Điều đó cho thấy nguồn điện cũng là một vật dẫn điện.', 'Nếu là vật cách điện thì dòng điện không đi qua được.')}>A. Vật cách điện</button>
                <button className={internalAnswers.conductor === 'conductor' ? 'is-selected' : ''} type="button" onClick={() => answerInternalQuestion('conductor', 'conductor', 'conductor', '✅ Đúng! Dòng điện chỉ có thể đi qua vật dẫn điện. Điều đó cho thấy nguồn điện cũng là một vật dẫn điện.', 'Dòng điện đi qua được nguồn điện, hãy suy luận tính chất của nó.')}>B. Vật dẫn điện</button>
                <button className={internalAnswers.conductor === 'vacuum' ? 'is-selected' : ''} type="button" onClick={() => answerInternalQuestion('conductor', 'vacuum', 'conductor', '✅ Đúng! Dòng điện chỉ có thể đi qua vật dẫn điện. Điều đó cho thấy nguồn điện cũng là một vật dẫn điện.', 'Nguồn điện không phải chân không trong mạch kín đang xét.')}>C. Chân không</button>
              </div>
              {internalFeedback.conductor && <div className={internalFeedback.conductor.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{internalFeedback.conductor.text}</strong></div>}
            </article>
          </article>
        )}

        {conductorUnderstood && (
          <article className="internal24-card">
            <div className="internal24-head">
              <span>Card 3</span>
              <h3>Suy luận từ điều vừa khám phá</h3>
            </div>
            <div className="internal24-reasoning">
              <span>Nguồn điện là vật dẫn điện</span>
              <b>↓</b>
              <button
                className={inferenceUnderstood ? 'internal24-drop is-filled' : 'internal24-drop'}
                type="button"
                onClick={() => {
                  if (internalDraggedPhrase) answerInternalQuestion('inference', internalDraggedPhrase, 'Vật dẫn điện có điện trở', 'Chính xác! Vì nguồn điện là vật dẫn điện nên nguồn điện cũng có điện trở. Điện trở của chính nguồn điện được gọi là điện trở trong.', 'Hãy đặt cụm từ liên hệ giữa vật dẫn điện và điện trở.')
                }}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault()
                  answerInternalQuestion('inference', internalDraggedPhrase, 'Vật dẫn điện có điện trở', 'Chính xác! Vì nguồn điện là vật dẫn điện nên nguồn điện cũng có điện trở. Điện trở của chính nguồn điện được gọi là điện trở trong.', 'Hãy đặt cụm từ liên hệ giữa vật dẫn điện và điện trở.')
                }}
              >
                {internalAnswers.inference || '?'}
              </button>
              <b>↓</b>
              <span>Nguồn điện có điện trở</span>
            </div>
            <div className="opening-card-bank">
              <button
                className={internalDraggedPhrase === 'Vật dẫn điện có điện trở' ? 'opening-drag-card is-selected' : 'opening-drag-card'}
                draggable={!inferenceUnderstood}
                type="button"
                onClick={() => setInternalDraggedPhrase('Vật dẫn điện có điện trở')}
                onDragStart={() => setInternalDraggedPhrase('Vật dẫn điện có điện trở')}
              >
                Vật dẫn điện có điện trở
              </button>
            </div>
            {internalFeedback.inference && <div className={internalFeedback.inference.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{internalFeedback.inference.text}</strong></div>}
          </article>
        )}

        {inferenceUnderstood && (
          <article className="internal24-card">
            <div className="internal24-head">
              <span>Card 4</span>
              <h3>Khái niệm mới</h3>
            </div>
            <div className="internal24-concept">
              <p>Điện trở của nguồn điện được gọi là <strong>điện trở trong</strong>.</p>
              <p>Kí hiệu: <strong>r</strong></p>
            </div>
            <article className="worksheet24-question">
              <strong>Điện trở trong của nguồn điện được kí hiệu bằng:</strong>
              <div className="worksheet24-options">
                <button className={internalAnswers.symbol === 'U' ? 'is-selected' : ''} type="button" onClick={() => answerInternalQuestion('symbol', 'U', 'r', '✅ Đúng! Điện trở trong của nguồn điện được kí hiệu là r.', 'U là kí hiệu hiệu điện thế, không phải điện trở trong.')}>A. U</button>
                <button className={internalAnswers.symbol === 'R' ? 'is-selected' : ''} type="button" onClick={() => answerInternalQuestion('symbol', 'R', 'r', '✅ Đúng! Điện trở trong của nguồn điện được kí hiệu là r.', 'R thường dùng cho điện trở mạch ngoài; điện trở trong dùng chữ r.')}>B. R</button>
                <button className={internalAnswers.symbol === 'r' ? 'is-selected' : ''} type="button" onClick={() => answerInternalQuestion('symbol', 'r', 'r', '✅ Đúng! Điện trở trong của nguồn điện được kí hiệu là r.', 'Điện trở trong của nguồn điện được kí hiệu bằng chữ r.')}>C. r</button>
              </div>
              {internalFeedback.symbol && <div className={internalFeedback.symbol.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{internalFeedback.symbol.text}</strong></div>}
            </article>
          </article>
        )}

        {symbolUnderstood && (
          <div className="internal24-summary">
            <strong>Tổng kết</strong>
            <div className="internal24-reasoning internal24-reasoning--summary">
              <span>Dòng điện đi qua cả bên trong nguồn điện</span><b>↓</b>
              <span>Nguồn điện là vật dẫn điện</span><b>↓</b>
              <span>Nguồn điện có điện trở</span><b>↓</b>
              <span>Điện trở đó gọi là điện trở trong</span><b>↓</b>
              <span>Kí hiệu: r</span>
            </div>
            <div className="worksheet24-info-box worksheet24-info-box--remember">
              <strong>Em đã học</strong>
              <p>✔ Dòng điện chạy qua cả mạch ngoài và bên trong nguồn điện.</p>
              <p>✔ Nguồn điện cũng là vật dẫn điện.</p>
              <p>✔ Vì vậy nguồn điện có điện trở.</p>
              <p>✔ Điện trở đó gọi là điện trở trong.</p>
              <p>✔ Điện trở trong được kí hiệu là r.</p>
              <p>✔ Mỗi nguồn điện được đặc trưng bởi suất điện động ξ và điện trở trong r.</p>
              {!done && <button className="primary-soft-btn" type="button" onClick={completeInternalTask}>Hoàn thành Nhiệm vụ 5</button>}
            </div>
          </div>
        )}

        {done && index < lesson24WorksheetCards.length - 1 && index === cardIndex && (
          <button className="primary-soft-btn" type="button" onClick={() => setCardIndex((current) => current + 1)}>Mở nhiệm vụ tiếp theo</button>
        )}
      </section>
    )
  }

  const renderVoltageDropTask = (index) => {
    const energyDone = voltageAnswers.energy === 'both'
    const stateDone = voltageAnswers.state === 'closed'
    const formulaDone = voltageAnswers.formula === 'done'
    const relationDone = voltageAnswers.relation === 'minus'
    const openDone = voltageAnswers.open === 'emf'
    const challengeDone = voltageAnswers.challenge === 'nhỏ hơn'
    const done = completedCards.includes('voltage')
    const tokenLabels = ['ξ', 'U', 'Ir']

    const renderVoltageChoice = (key, value, correct, successText, wrongText, label) => (
      <button
        className={voltageAnswers[key] === value ? 'is-selected' : ''}
        type="button"
        onClick={() => answerVoltageQuestion(key, value, correct, successText, wrongText)}
      >
        {label}
      </button>
    )

    return (
      <section className={done ? 'worksheet24-section is-done' : 'worksheet24-section'} key="voltage">
        <div className="worksheet24-card-head worksheet24-section-head">
          <span>Nhiệm vụ {index + 2}</span>
          <h3>Ảnh hưởng của điện trở trong lên hiệu điện thế giữa hai cực nguồn</h3>
          <p>Quan sát sơ đồ năng lượng để rút ra hệ thức giữa U, ξ và Ir.</p>
        </div>

        <article className="voltage24-card">
          <div className="voltage24-head">
            <span>Card 1</span>
            <h3>Khi mạch kín, năng lượng nguồn điện được sử dụng như thế nào?</h3>
          </div>
          <div className="voltage24-energy-map">
            <strong>Nguồn điện (ξ, r)</strong>
            <b>↓</b>
            <span>Cung cấp năng lượng</span>
            <b>↓</b>
            <div>
              <em>Điện trở ngoài R</em>
              <em>Điện trở trong r</em>
            </div>
          </div>
          <article className="worksheet24-question">
            <strong>Khi mạch kín, năng lượng nguồn điện cung cấp được tiêu thụ ở đâu?</strong>
            <div className="worksheet24-options">
              {renderVoltageChoice('energy', 'outside', 'both', 'Đúng! Dòng điện chạy qua toàn bộ mạch nên năng lượng nguồn điện cung cấp được tiêu thụ trên cả điện trở ngoài và điện trở trong.', 'Dòng điện trong mạch kín còn đi qua bên trong nguồn điện.', 'A. Chỉ trên điện trở ngoài R')}
              {renderVoltageChoice('energy', 'inside', 'both', 'Đúng! Dòng điện chạy qua toàn bộ mạch nên năng lượng nguồn điện cung cấp được tiêu thụ trên cả điện trở ngoài và điện trở trong.', 'Mạch kín còn có điện trở ngoài R trong mạch ngoài.', 'B. Chỉ trên điện trở trong r')}
              {renderVoltageChoice('energy', 'both', 'both', 'Đúng! Dòng điện chạy qua toàn bộ mạch nên năng lượng nguồn điện cung cấp được tiêu thụ trên cả điện trở ngoài và điện trở trong.', 'Hãy xét cả phần mạch ngoài và phần bên trong nguồn.', 'C. Trên cả điện trở ngoài R và điện trở trong r')}
            </div>
            {voltageFeedback.energy && <div className={voltageFeedback.energy.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{voltageFeedback.energy.text}</strong></div>}
          </article>
        </article>

        {energyDone && (
          <article className="voltage24-card">
            <div className="voltage24-head">
              <span>Card 2</span>
              <h3>Điều gì xảy ra với hiệu điện thế hai cực nguồn khi có dòng điện?</h3>
            </div>
            <div className="voltage24-states">
              <div>
                <strong>Trạng thái A</strong>
                <p>Mạch hở</p>
                <span>I = 0</span>
                <small>Không có dòng điện</small>
              </div>
              <div>
                <strong>Trạng thái B</strong>
                <p>Mạch kín</p>
                <span>I &gt; 0</span>
                <small>Có dòng điện chạy qua điện trở trong</small>
              </div>
            </div>
            <article className="worksheet24-question">
              <strong>Ở trạng thái nào điện trở trong ảnh hưởng đến hiệu điện thế giữa hai cực nguồn?</strong>
              <div className="worksheet24-options">
                {renderVoltageChoice('state', 'open', 'closed', 'Đúng! Khi có dòng điện chạy qua điện trở trong, một phần năng lượng bị tiêu thụ trong nguồn điện.', 'Mạch hở có I = 0 nên chưa có dòng điện qua điện trở trong.', 'A. Mạch hở')}
                {renderVoltageChoice('state', 'closed', 'closed', 'Đúng! Khi có dòng điện chạy qua điện trở trong, một phần năng lượng bị tiêu thụ trong nguồn điện.', 'Hãy chọn trạng thái có dòng điện chạy qua điện trở trong.', 'B. Mạch kín')}
              </div>
              {voltageFeedback.state && <div className={voltageFeedback.state.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{voltageFeedback.state.text}</strong></div>}
            </article>
          </article>
        )}

        {stateDone && (
          <article className="voltage24-card">
            <div className="voltage24-head">
              <span>Card 3</span>
              <h3>Từ bảo toàn năng lượng</h3>
            </div>
            <div className="opening-card-bank">
              {tokenLabels.map((token) => (
                <button
                  className={voltageDraggedToken === token ? 'opening-drag-card is-selected' : 'opening-drag-card'}
                  draggable={!formulaDone}
                  key={token}
                  type="button"
                  onClick={() => setVoltageDraggedToken(token)}
                  onDragStart={() => setVoltageDraggedToken(token)}
                >
                  {token}
                </button>
              ))}
            </div>
            <div className="voltage24-formula-drop">
              <button
                className={voltageAnswers.emf ? 'is-filled' : ''}
                type="button"
                onClick={() => placeVoltageToken('emf')}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault()
                  placeVoltageToken('emf')
                }}
              >
                {voltageAnswers.emf || 'Suất điện động của nguồn'}
              </button>
              <b>=</b>
              <button
                className={voltageAnswers.terminal ? 'is-filled' : ''}
                type="button"
                onClick={() => placeVoltageToken('terminal')}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault()
                  placeVoltageToken('terminal')
                }}
              >
                {voltageAnswers.terminal || 'Hiệu điện thế mạch ngoài'}
              </button>
              <b>+</b>
              <button
                className={voltageAnswers.drop ? 'is-filled' : ''}
                type="button"
                onClick={() => placeVoltageToken('drop')}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault()
                  placeVoltageToken('drop')
                }}
              >
                {voltageAnswers.drop || 'Độ giảm điện thế trên điện trở trong'}
              </button>
            </div>
            <button className="primary-soft-btn" type="button" onClick={checkVoltageFormula}>Kiểm tra</button>
            {voltageFeedback.formula && <div className={voltageFeedback.formula.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{voltageFeedback.formula.text}</strong></div>}
            {formulaDone && <div className="voltage24-formula-result">ξ = U + Ir</div>}
          </article>
        )}

        {formulaDone && (
          <article className="voltage24-card">
            <div className="voltage24-head">
              <span>Card 4</span>
              <h3>Hiệu điện thế giữa hai cực nguồn</h3>
            </div>
            <div className="voltage24-given">Cho: <strong>ξ = U + Ir</strong></div>
            <article className="worksheet24-question">
              <strong>Biểu thức nào sau đây đúng?</strong>
              <div className="worksheet24-options">
                {renderVoltageChoice('relation', 'minus', 'minus', 'Đúng! Từ ξ = U + Ir suy ra U = ξ − Ir.', 'Hãy chuyển Ir sang vế bên kia.', 'A. U = ξ − Ir')}
                {renderVoltageChoice('relation', 'plus', 'minus', 'Đúng! Từ ξ = U + Ir suy ra U = ξ − Ir.', 'Dấu cộng đã nằm trong hệ thức ξ = U + Ir.', 'B. U = ξ + Ir')}
                {renderVoltageChoice('relation', 'drop', 'minus', 'Đúng! Từ ξ = U + Ir suy ra U = ξ − Ir.', 'U là hiệu điện thế hai cực nguồn, không chỉ là độ giảm trên r.', 'C. U = Ir')}
              </div>
              {voltageFeedback.relation && <div className={voltageFeedback.relation.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{voltageFeedback.relation.text}</strong></div>}
            </article>
            {relationDone && <div className="voltage24-formula-result">U = ξ − Ir</div>}
          </article>
        )}

        {relationDone && (
          <article className="voltage24-card">
            <div className="voltage24-head">
              <span>Card 5</span>
              <h3>Khi mạch hở</h3>
            </div>
            <div className="voltage24-open-case"><strong>I = 0</strong></div>
            <article className="worksheet24-question">
              <strong>Khi mạch hở, hiệu điện thế giữa hai cực nguồn bằng:</strong>
              <div className="worksheet24-options">
                {renderVoltageChoice('open', 'emf', 'emf', 'Đúng! Khi mạch hở: I = 0 ⇒ U = ξ − Ir = ξ. Đó cũng chính là số vôn ghi trên nguồn điện.', 'Mạch hở có I = 0, hãy thay vào U = ξ − Ir.', 'A. ξ')}
                {renderVoltageChoice('open', 'drop', 'emf', 'Đúng! Khi mạch hở: I = 0 ⇒ U = ξ − Ir = ξ. Đó cũng chính là số vôn ghi trên nguồn điện.', 'Ir bằng 0 khi I = 0.', 'B. Ir')}
                {renderVoltageChoice('open', 'zero', 'emf', 'Đúng! Khi mạch hở: I = 0 ⇒ U = ξ − Ir = ξ. Đó cũng chính là số vôn ghi trên nguồn điện.', 'Mạch hở không làm hiệu điện thế hai cực nguồn bằng 0.', 'C. 0')}
              </div>
              {voltageFeedback.open && <div className={voltageFeedback.open.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{voltageFeedback.open.text}</strong></div>}
            </article>
          </article>
        )}

        {openDone && (
          <article className="voltage24-card">
            <div className="voltage24-head">
              <span>Thử thách cuối</span>
              <h3>Hoàn thành bản đồ tư duy</h3>
            </div>
            <div className="voltage24-mindmap">
              <span>Mạch kín</span><b>↓</b>
              <span>Có dòng điện qua điện trở trong</span><b>↓</b>
              <span>Có độ giảm điện thế Ir</span><b>↓</b>
              <span>Hiệu điện thế hai cực nguồn <button className={challengeDone ? 'is-filled' : ''} type="button" onClick={() => answerVoltageQuestion('challenge', 'nhỏ hơn', 'nhỏ hơn', 'Chính xác! Khi mạch kín, hiệu điện thế hai cực nguồn nhỏ hơn suất điện động.', 'Cần chọn quan hệ giữa U và ξ khi có độ giảm Ir.')}>{challengeDone ? 'nhỏ hơn' : '______'}</button> suất điện động</span>
            </div>
            <div className="opening-card-bank">
              <button className="opening-drag-card" type="button" onClick={() => answerVoltageQuestion('challenge', 'nhỏ hơn', 'nhỏ hơn', 'Chính xác! Khi mạch kín, hiệu điện thế hai cực nguồn nhỏ hơn suất điện động.', 'Cần chọn quan hệ giữa U và ξ khi có độ giảm Ir.')}>nhỏ hơn</button>
            </div>
            {voltageFeedback.challenge && <div className={voltageFeedback.challenge.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{voltageFeedback.challenge.text}</strong></div>}
          </article>
        )}

        {challengeDone && (
          <div className="worksheet24-info-box worksheet24-info-box--remember">
            <strong>Em đã học</strong>
            <p>✔ Năng lượng nguồn điện được tiêu thụ trên cả điện trở ngoài và điện trở trong.</p>
            <p>✔ Khi mạch kín: U = ξ − Ir.</p>
            <p>✔ Hiệu điện thế giữa hai cực nguồn nhỏ hơn suất điện động.</p>
            <p>✔ Khi mạch hở: U = ξ.</p>
            <p>✔ Số vôn ghi trên nguồn điện chính là giá trị hiệu điện thế giữa hai cực nguồn khi mạch hở.</p>
            {!done && <button className="primary-soft-btn" type="button" onClick={completeVoltageTask}>Hoàn thành Nhiệm vụ 6</button>}
          </div>
        )}

        {done && index < lesson24WorksheetCards.length - 1 && index === cardIndex && (
          <button className="primary-soft-btn" type="button" onClick={() => setCardIndex((current) => current + 1)}>Mở nhiệm vụ tiếp theo</button>
        )}
      </section>
    )
  }

  const renderWholeOhmTask = (index) => {
    const totalDone = wholeOhmAnswers.total === 'R+r'
    const emfDone = wholeOhmAnswers.emf === 'increase'
    const resistanceDone = wholeOhmAnswers.resistance === 'decrease'
    const formulaDone = wholeOhmAnswers.formula === 'done'
    const statementDone = wholeOhmAnswers.statement === 'done'
    const challengeDone = wholeOhmAnswers.challengeUp === 'tăng' && wholeOhmAnswers.challengeDown === 'giảm'
    const done = completedCards.includes('whole-ohm')
    const emfCurrent = (wholeOhmEmf / 6).toFixed(1)
    const resistanceCurrent = (12 / wholeOhmTotalResistance).toFixed(1)
    const formulaTokens = ['I', 'ξ', 'R+r']
    const statementTokens = ['tỉ lệ thuận', 'tỉ lệ nghịch']

    const renderWholeChoice = (key, value, correct, successText, wrongText, label) => (
      <button
        className={wholeOhmAnswers[key] === value ? 'is-selected' : ''}
        type="button"
        onClick={() => answerWholeOhmQuestion(key, value, correct, successText, wrongText)}
      >
        {label}
      </button>
    )

    const placeStatementToken = (slot) => {
      if (!wholeOhmDraggedToken) return
      setWholeOhmAnswers((current) => ({ ...current, [slot]: wholeOhmDraggedToken }))
      setWholeOhmDraggedToken('')
      setWholeOhmFeedback((current) => ({ ...current, statement: '' }))
    }

    return (
      <section className={done ? 'worksheet24-section is-done' : 'worksheet24-section'} key="whole-ohm">
        <div className="worksheet24-card-head worksheet24-section-head">
          <span>Nhiệm vụ {index + 2}</span>
          <h3>Định luật Ôm toàn mạch</h3>
          <p>Ta đã biết: U = ξ − Ir và U = IR. Vậy cường độ dòng điện trong toàn mạch phụ thuộc như thế nào vào ξ, R và r?</p>
        </div>

        <article className="whole24-card">
          <div className="whole24-head">
            <span>Card 1</span>
            <h3>Toàn mạch gồm những điện trở nào?</h3>
          </div>
          <div className="whole24-total-map">
            <span>Nguồn điện <strong>r</strong></span>
            <b>↓</b>
            <span>Điện trở ngoài <strong>R</strong></span>
          </div>
          <article className="worksheet24-question">
            <strong>Điện trở toàn phần của mạch gồm:</strong>
            <div className="worksheet24-options">
              {renderWholeChoice('total', 'R', 'R+r', 'Đúng! Điện trở toàn phần của mạch bằng tổng điện trở ngoài và điện trở trong: R + r.', 'Toàn mạch còn có điện trở trong của nguồn điện.', 'A. Chỉ R')}
              {renderWholeChoice('total', 'r', 'R+r', 'Đúng! Điện trở toàn phần của mạch bằng tổng điện trở ngoài và điện trở trong: R + r.', 'Toàn mạch còn có điện trở ngoài R.', 'B. Chỉ r')}
              {renderWholeChoice('total', 'R+r', 'R+r', 'Đúng! Điện trở toàn phần của mạch bằng tổng điện trở ngoài và điện trở trong: R + r.', 'Hãy cộng điện trở ngoài và điện trở trong.', 'C. R + r')}
            </div>
            {wholeOhmFeedback.total && <div className={wholeOhmFeedback.total.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{wholeOhmFeedback.total.text}</strong></div>}
          </article>
        </article>

        {totalDone && (
          <article className="whole24-card">
            <div className="whole24-head">
              <span>Card 2</span>
              <h3>Nếu suất điện động tăng</h3>
            </div>
            <div className="whole24-sim">
              <label>
                <span>Giữ nguyên R và r. Tăng ξ.</span>
                <input min="6" max="18" step="1" type="range" value={wholeOhmEmf} onChange={(event) => setWholeOhmEmf(Number(event.target.value))} />
              </label>
              <div className="whole24-meter">
                <strong>ξ = {wholeOhmEmf} V</strong>
                <span>Ampe kế</span>
                <b>{emfCurrent} A</b>
                <i style={{ width: `${Math.min(100, (Number(emfCurrent) / 3) * 100)}%` }} />
              </div>
            </div>
            <article className="worksheet24-question">
              <strong>Khi ξ tăng, cường độ dòng điện sẽ:</strong>
              <div className="worksheet24-options">
                {renderWholeChoice('emf', 'increase', 'increase', 'Đúng! Khi điện trở toàn phần không đổi, suất điện động càng lớn thì dòng điện càng lớn.', 'Quan sát ampe kế khi kéo ξ tăng.', 'A. Tăng')}
                {renderWholeChoice('emf', 'decrease', 'increase', 'Đúng! Khi điện trở toàn phần không đổi, suất điện động càng lớn thì dòng điện càng lớn.', 'Dòng điện không giảm khi ξ tăng và R+r giữ nguyên.', 'B. Giảm')}
                {renderWholeChoice('emf', 'same', 'increase', 'Đúng! Khi điện trở toàn phần không đổi, suất điện động càng lớn thì dòng điện càng lớn.', 'Ampe kế thay đổi khi ξ thay đổi.', 'C. Không đổi')}
              </div>
              {wholeOhmFeedback.emf && <div className={wholeOhmFeedback.emf.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{wholeOhmFeedback.emf.text}</strong></div>}
            </article>
          </article>
        )}

        {emfDone && (
          <article className="whole24-card">
            <div className="whole24-head">
              <span>Card 3</span>
              <h3>Nếu điện trở toàn phần tăng</h3>
            </div>
            <div className="whole24-sim">
              <label>
                <span>Giữ nguyên ξ. Tăng R hoặc r.</span>
                <input min="4" max="12" step="1" type="range" value={wholeOhmTotalResistance} onChange={(event) => setWholeOhmTotalResistance(Number(event.target.value))} />
              </label>
              <div className="whole24-meter">
                <strong>R+r = {wholeOhmTotalResistance} Ω</strong>
                <span>Ampe kế</span>
                <b>{resistanceCurrent} A</b>
                <i style={{ width: `${Math.min(100, (Number(resistanceCurrent) / 3) * 100)}%` }} />
              </div>
            </div>
            <article className="worksheet24-question">
              <strong>Khi điện trở toàn phần tăng, cường độ dòng điện:</strong>
              <div className="worksheet24-options">
                {renderWholeChoice('resistance', 'increase', 'decrease', 'Đúng! Điện trở toàn phần càng lớn thì dòng điện càng nhỏ.', 'Quan sát ampe kế khi R+r tăng.', 'A. Tăng')}
                {renderWholeChoice('resistance', 'decrease', 'decrease', 'Đúng! Điện trở toàn phần càng lớn thì dòng điện càng nhỏ.', 'Quan sát ampe kế khi R+r tăng.', 'B. Giảm')}
                {renderWholeChoice('resistance', 'same', 'decrease', 'Đúng! Điện trở toàn phần càng lớn thì dòng điện càng nhỏ.', 'Ampe kế thay đổi khi R+r thay đổi.', 'C. Không đổi')}
              </div>
              {wholeOhmFeedback.resistance && <div className={wholeOhmFeedback.resistance.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{wholeOhmFeedback.resistance.text}</strong></div>}
            </article>
          </article>
        )}

        {resistanceDone && (
          <article className="whole24-card">
            <div className="whole24-head">
              <span>Card 4</span>
              <h3>Rút ra biểu thức của cường độ dòng điện</h3>
            </div>
            <div className="whole24-given">Cho: <strong>ξ = I(R + r)</strong></div>
            <div className="opening-card-bank">
              {formulaTokens.map((token) => (
                <button
                  className={wholeOhmDraggedToken === token ? 'opening-drag-card is-selected' : 'opening-drag-card'}
                  draggable={!formulaDone}
                  key={token}
                  type="button"
                  onClick={() => setWholeOhmDraggedToken(token)}
                  onDragStart={() => setWholeOhmDraggedToken(token)}
                >
                  {token}
                </button>
              ))}
            </div>
            <div className="whole24-formula-drop">
              <button className={wholeOhmAnswers.left ? 'is-filled' : ''} type="button" onClick={() => placeWholeOhmToken('left')} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); placeWholeOhmToken('left') }}>{wholeOhmAnswers.left || 'vế trái'}</button>
              <b>=</b>
              <div>
                <button className={wholeOhmAnswers.numerator ? 'is-filled' : ''} type="button" onClick={() => placeWholeOhmToken('numerator')} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); placeWholeOhmToken('numerator') }}>{wholeOhmAnswers.numerator || 'tử số'}</button>
                <i />
                <button className={wholeOhmAnswers.denominator ? 'is-filled' : ''} type="button" onClick={() => placeWholeOhmToken('denominator')} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); placeWholeOhmToken('denominator') }}>{wholeOhmAnswers.denominator || 'mẫu số'}</button>
              </div>
            </div>
            <button className="primary-soft-btn" type="button" onClick={checkWholeOhmFormula}>Kiểm tra</button>
            {wholeOhmFeedback.formula && <div className={wholeOhmFeedback.formula.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{wholeOhmFeedback.formula.text}</strong></div>}
            {formulaDone && <div className="whole24-formula-result">I = ξ/(R + r)</div>}
          </article>
        )}

        {formulaDone && (
          <article className="whole24-card">
            <div className="whole24-head">
              <span>Card 5</span>
              <h3>Hoàn thành phát biểu</h3>
            </div>
            <div className="opening-card-bank">
              {statementTokens.map((token) => (
                <button
                  className={wholeOhmDraggedToken === token ? 'opening-drag-card is-selected' : 'opening-drag-card'}
                  draggable={!statementDone}
                  key={token}
                  type="button"
                  onClick={() => setWholeOhmDraggedToken(token)}
                  onDragStart={() => setWholeOhmDraggedToken(token)}
                >
                  {token}
                </button>
              ))}
            </div>
            <div className="whole24-statement">
              <span>Cường độ dòng điện trong mạch kín</span>
              <button className={wholeOhmAnswers.direct ? 'is-filled' : ''} type="button" onClick={() => placeStatementToken('direct')} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); placeStatementToken('direct') }}>{wholeOhmAnswers.direct || '_____'}</button>
              <span>với suất điện động ξ</span>
              <span>và</span>
              <button className={wholeOhmAnswers.inverse ? 'is-filled' : ''} type="button" onClick={() => placeStatementToken('inverse')} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); placeStatementToken('inverse') }}>{wholeOhmAnswers.inverse || '_____'}</button>
              <span>với điện trở toàn phần (R+r)</span>
            </div>
            <button className="primary-soft-btn" type="button" onClick={checkWholeOhmStatement}>Kiểm tra</button>
            {wholeOhmFeedback.statement && <div className={wholeOhmFeedback.statement.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{wholeOhmFeedback.statement.text}</strong></div>}
          </article>
        )}

        {statementDone && (
          <div className="worksheet24-info-box worksheet24-info-box--remember">
            <strong>Định luật Ôm toàn mạch</strong>
            <p>Cường độ dòng điện trong mạch kín tỉ lệ thuận với suất điện động của nguồn điện và tỉ lệ nghịch với điện trở toàn phần của mạch.</p>
            <div className="whole24-formula-result">I = ξ/(R + r)</div>
            <p>ξ là suất điện động của nguồn điện.</p>
            <p>R là điện trở mạch ngoài.</p>
            <p>r là điện trở trong của nguồn điện.</p>
            <p>R+r là điện trở toàn phần của mạch.</p>
          </div>
        )}

        {statementDone && (
          <article className="whole24-card">
            <div className="whole24-head">
              <span>Thử thách cuối</span>
              <h3>Hoàn thành sơ đồ tư duy</h3>
            </div>
            <div className="whole24-mindmap">
              <span>ξ tăng</span><b>↓</b>
              <span>I <button className={wholeOhmAnswers.challengeUp ? 'is-filled' : ''} type="button" onClick={() => answerWholeOhmQuestion('challengeUp', 'tăng', 'tăng', 'Đúng.', 'Khi ξ tăng và R+r không đổi thì I tăng.')}>{wholeOhmAnswers.challengeUp || '______'}</button></span>
              <span>R+r tăng</span><b>↓</b>
              <span>I <button className={wholeOhmAnswers.challengeDown ? 'is-filled' : ''} type="button" onClick={() => answerWholeOhmQuestion('challengeDown', 'giảm', 'giảm', 'Đúng.', 'Khi R+r tăng và ξ không đổi thì I giảm.')}>{wholeOhmAnswers.challengeDown || '______'}</button></span>
            </div>
            <div className="opening-card-bank">
              <button className="opening-drag-card" type="button" onClick={() => answerWholeOhmQuestion('challengeUp', 'tăng', 'tăng', 'Đúng.', 'Khi ξ tăng và R+r không đổi thì I tăng.')}>tăng</button>
              <button className="opening-drag-card" type="button" onClick={() => answerWholeOhmQuestion('challengeDown', 'giảm', 'giảm', 'Đúng.', 'Khi R+r tăng và ξ không đổi thì I giảm.')}>giảm</button>
            </div>
            {(wholeOhmFeedback.challengeUp || wholeOhmFeedback.challengeDown) && (
              <div className="worksheet24-feedback is-correct"><strong>{challengeDone ? 'Chính xác! Em đã hoàn thành sơ đồ tư duy.' : 'Hoàn thành cả hai nhánh của sơ đồ.'}</strong></div>
            )}
          </article>
        )}

        {challengeDone && (
          <div className="worksheet24-info-box worksheet24-info-box--remember">
            <strong>Em đã học</strong>
            <p>✔ Điện trở toàn phần của mạch kín là R+r.</p>
            <p>✔ ξ tăng thì I tăng nếu điện trở toàn phần không đổi.</p>
            <p>✔ R+r tăng thì I giảm nếu ξ không đổi.</p>
            <p>✔ Định luật Ôm toàn mạch: I = ξ/(R+r).</p>
            {!done && <button className="primary-soft-btn" type="button" onClick={completeWholeOhmTask}>Hoàn thành Nhiệm vụ 7</button>}
          </div>
        )}

        {done && index < lesson24WorksheetCards.length - 1 && index === cardIndex && (
          <button className="primary-soft-btn" type="button" onClick={() => setCardIndex((current) => current + 1)}>Mở nhiệm vụ tiếp theo</button>
        )}
      </section>
    )
  }

  const renderShortCircuitTask = (index) => {
    const firstDone = shortAnswers.diagram === 'direct'
    const secondDone = shortAnswers.danger === 'large-current'
    const done = completedCards.includes('short')

    const renderShortChoice = (key, value, correct, successText, wrongText, label) => (
      <button
        className={shortAnswers[key] === value ? 'is-selected' : ''}
        type="button"
        onClick={() => answerShortQuestion(key, value, correct, successText, wrongText)}
      >
        {label}
      </button>
    )

    return (
      <section className={done ? 'worksheet24-section is-done' : 'worksheet24-section'} key="short">
        <div className="worksheet24-card-head worksheet24-section-head">
          <span>Nhiệm vụ {index + 2}</span>
          <h3>⚠️ Em có biết? Đoản mạch</h3>
          <p>Khi hai cực của nguồn điện được nối trực tiếp với nhau bằng dây dẫn có điện trở rất nhỏ, hiện tượng đoản mạch có thể xảy ra.</p>
        </div>

        <div className="short24-know">
          <article className="worksheet24-question">
            <strong>Sơ đồ nào mô tả hiện tượng đoản mạch?</strong>
            <div className="worksheet24-options">
              {renderShortChoice('diagram', 'lamp', 'direct', 'Đúng! Đoản mạch xảy ra khi hai cực nguồn được nối trực tiếp bằng dây dẫn có điện trở rất nhỏ.', 'Sơ đồ này vẫn có bóng đèn trong mạch ngoài.', 'A. Nguồn – bóng đèn – dây dẫn')}
              {renderShortChoice('diagram', 'open', 'direct', 'Đúng! Đoản mạch xảy ra khi hai cực nguồn được nối trực tiếp bằng dây dẫn có điện trở rất nhỏ.', 'Công tắc mở làm mạch không kín.', 'B. Nguồn có công tắc mở')}
              {renderShortChoice('diagram', 'direct', 'direct', 'Đúng! Đoản mạch xảy ra khi hai cực nguồn được nối trực tiếp bằng dây dẫn có điện trở rất nhỏ.', 'Hãy chọn sơ đồ nối trực tiếp hai cực nguồn.', 'C. Hai cực nguồn nối trực tiếp bằng dây dẫn')}
            </div>
            {shortFeedback.diagram && <div className={shortFeedback.diagram.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{shortFeedback.diagram.text}</strong></div>}
          </article>

          {firstDone && (
            <article className="worksheet24-question">
              <strong>Vì sao đoản mạch nguy hiểm?</strong>
              <div className="worksheet24-options">
                {renderShortChoice('danger', 'large-current', 'large-current', 'Đúng! Khi đoản mạch, điện trở mạch ngoài rất nhỏ nên cường độ dòng điện có thể tăng rất lớn. Dòng điện lớn có thể làm nóng dây dẫn, làm hỏng nguồn điện hoặc gây cháy.', 'Hãy chú ý điện trở mạch ngoài khi đoản mạch rất nhỏ.', 'A. Dòng điện tăng rất lớn')}
                {renderShortChoice('danger', 'zero', 'large-current', 'Đúng! Khi đoản mạch, điện trở mạch ngoài rất nhỏ nên cường độ dòng điện có thể tăng rất lớn. Dòng điện lớn có thể làm nóng dây dẫn, làm hỏng nguồn điện hoặc gây cháy.', 'Đoản mạch không làm dòng điện giảm về 0.', 'B. Dòng điện giảm về 0')}
                {renderShortChoice('danger', 'no-effect', 'large-current', 'Đúng! Khi đoản mạch, điện trở mạch ngoài rất nhỏ nên cường độ dòng điện có thể tăng rất lớn. Dòng điện lớn có thể làm nóng dây dẫn, làm hỏng nguồn điện hoặc gây cháy.', 'Đoản mạch là hiện tượng nguy hiểm.', 'C. Không ảnh hưởng gì')}
              </div>
              {shortFeedback.danger && <div className={shortFeedback.danger.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{shortFeedback.danger.text}</strong></div>}
            </article>
          )}

          {secondDone && (
            <div className="short24-note">
              <strong>Em có biết</strong>
              <p>⚠️ Đoản mạch là hiện tượng hai cực nguồn điện nối trực tiếp với nhau bằng dây dẫn có điện trở rất nhỏ.</p>
              <p>⚠️ Khi đoản mạch xảy ra, dòng điện có thể rất lớn và gây nguy hiểm.</p>
              {!done && <button className="primary-soft-btn" type="button" onClick={completeShortTask}>Hoàn thành Nhiệm vụ 8</button>}
            </div>
          )}
        </div>

        {done && index < lesson24WorksheetCards.length - 1 && index === cardIndex && (
          <button className="primary-soft-btn" type="button" onClick={() => setCardIndex((current) => current + 1)}>Mở nhiệm vụ tiếp theo</button>
        )}
      </section>
    )
  }

  return (
    <div className="worksheet24">
      <section className="worksheet24-intro">
        <span>Bài 24 - Nguồn điện</span>
        <h2>Phiếu học tập</h2>
        <p>Hoàn thành các nhiệm vụ học tập để tự hình thành kiến thức của bài.</p>
      </section>

      <Lesson24SectionMeta
        objective="Tự khám phá kiến thức mới của bài học."
        tasks={[
          'Quan sát mô phỏng.',
          'Thao tác với các công cụ tương tác.',
          'Trả lời các câu hỏi.',
          'Rút ra nhận xét và kết luận.',
        ]}
        product={[
          'Các câu trả lời.',
          'Các nhận xét.',
          'Các kết luận được hình thành trong quá trình học.',
        ]}
      />

      <div className="worksheet24-progress" aria-label={`Tiến trình Phiếu học tập ${worksheetProgress}%`}>
        <div>
          <strong>{completedTaskCount}/{worksheetTaskCount} nhiệm vụ</strong>
          <span>{worksheetProgress}% hoàn thành</span>
        </div>
        <i><b style={{ width: `${worksheetProgress}%` }} /></i>
      </div>

      <section className={openingDone ? 'worksheet24-card is-done' : 'worksheet24-card'}>
        <div className="worksheet24-card-head">
          <span>Nhiệm vụ 1</span>
          <h3>Tại sao thay pin thì đèn lại sáng trở lại?</h3>
          <p>Kết nối với tình huống mở đầu để hình thành câu hỏi khoa học cần khám phá.</p>
        </div>
        <div className="worksheet24-card-head worksheet24-section-head">
          <span>Phần 1</span>
          <h3>Hãy sắp xếp sự việc theo đúng thực tế</h3>
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
              <span>Phần 2</span>
              <h3>Điều gì thực sự thay đổi?</h3>
              <p>Pin mới giúp đèn sáng mạnh trở lại. Nhưng điều gì ở pin đã làm được điều đó?</p>
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
              {lesson24OpeningFocusCards.find(([id]) => id === focusChoice)?.[1] || 'Chọn câu trả lời'}
            </button>
            <button className="primary-soft-btn" disabled={!focusChoice || openingStepDone.focus} type="button" onClick={checkOpeningFocus}>Kiểm tra</button>
            {openingFeedback.focus && <div className={openingFeedback.focus.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{openingFeedback.focus.text}</strong></div>}
          </div>
        )}

        {openingStepDone.focus && (
          <div className="opening-mini-task">
            <div className="worksheet24-card-head">
              <span>Thử thách cuối</span>
              <h3>🤔 Vì sao pin có thể giúp dòng điện tồn tại lâu dài trong mạch?</h3>
              <p>Chưa cần trả lời ngay. Hãy tiếp tục khám phá để tự tìm điều kiện duy trì dòng điện.</p>
            </div>
            <button className="primary-soft-btn" disabled={openingStepDone.conclusion} type="button" onClick={checkOpeningConclusion}>Khám phá tiếp</button>
            {openingFeedback.conclusion && <div className={openingFeedback.conclusion.type === 'success' ? 'worksheet24-feedback is-correct' : 'worksheet24-feedback'}><strong>{openingFeedback.conclusion.text}</strong></div>}
          </div>
        )}

        {openingDone && (
          <div className="worksheet24-bridge worksheet24-bridge--reflect">
            <p><strong>📌 Câu hỏi mới xuất hiện:</strong></p>
            <p>Pin đã làm gì để dòng điện không bị mất đi?</p>
            {!openingComplete && (
              <button className="primary-soft-btn" type="button" onClick={() => setOpeningComplete(true)}>Bắt đầu Nhiệm vụ 2</button>
            )}
          </div>
        )}
      </section>

      {openingComplete && (
        <section className="worksheet24-card worksheet24-unified-card">
          {lesson24WorksheetCards.slice(0, cardIndex + 1).map((card, index) => {
            const done = completedCards.includes(card.id)

            if (card.id === 'condition') {
              return renderConditionTask(index)
            }

            if (card.id === 'source') {
              return renderSourceTask(index)
            }

            if (card.id === 'internal') {
              return renderInternalResistanceTask(index)
            }

            if (card.id === 'voltage') {
              return renderVoltageDropTask(index)
            }

            if (card.id === 'whole-ohm') {
              return renderWholeOhmTask(index)
            }

            if (card.id === 'short') {
              return renderShortCircuitTask(index)
            }

            return (
              <section className={done ? 'worksheet24-section is-done' : 'worksheet24-section'} key={card.id}>
                <div className="worksheet24-card-head worksheet24-section-head">
                  <span>Nhiệm vụ {index + 2}</span>
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
                  <button className="primary-soft-btn" type="button" onClick={() => setCardIndex((current) => current + 1)}>Mở nhiệm vụ tiếp theo</button>
                )}
              </section>
            )
          })}
        </section>
      )}

      {worksheetComplete && (
        <section className="worksheet24-card worksheet24-summary">
          <div className="worksheet24-card-head">
            <span>Tổng kết</span>
            <h3>TỔNG KẾT KIẾN THỨC</h3>
          </div>
          <div className="worksheet24-summary-list">
            {worksheetSummaryLines.map((line) => <p key={line}>{line}</p>)}
          </div>
          {!quizOpen && (
            <button className="primary-soft-btn" type="button" onClick={() => setQuizOpen(true)}>Chuyển sang Quiz</button>
          )}
        </section>
      )}

      {quizOpen && (
        <Lesson24ReviewGame onComplete={() => setSelfOpen(true)} showSelfAssessment={selfOpen} />
      )}
    </div>
  )
}

function Lesson24StructuredLessonV2({ activePart = 'before' }) {
  const isBeforePart = activePart === 'before'
  const isWorksheetPart = activePart === 'during'
  const isAfterPart = activePart === 'after'
  const knowledgeRef = useRef(null)
  const storyVideoRef = useRef(null)
  const storyVideoShellRef = useRef(null)
  const [videoFinished, setVideoFinished] = useState(false)
  const [videoCheckpointOpen, setVideoCheckpointOpen] = useState(false)
  const [videoCheckpointResolved, setVideoCheckpointResolved] = useState(false)
  const [videoCheckpointFeedback, setVideoCheckpointFeedback] = useState('')
  const [isStoryVideoExpanded, setIsStoryVideoExpanded] = useState(false)
  const [knowledgeUnlocked, setKnowledgeUnlocked] = useState(PREVIEW_ALL_LESSON_PARTS || isWorksheetPart || isAfterPart)
  const [journeyStarted, setJourneyStarted] = useState(PREVIEW_ALL_LESSON_PARTS || isWorksheetPart || isAfterPart)

  const shouldUseLesson24MobileVideoMode = () => window.matchMedia?.('(max-width: 640px)').matches

  const exitLesson24NativeFullscreen = () => {
    const video = storyVideoRef.current

    if (video?.webkitDisplayingFullscreen && typeof video.webkitExitFullscreen === 'function') {
      video.webkitExitFullscreen()
    }
  }

  const collapseLesson24VideoMode = async () => {
    if (!shouldUseLesson24MobileVideoMode()) {
      return
    }

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (fullscreenElement === storyVideoShellRef.current) {
      const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen
      await exitFullscreen?.call(document)
    }

    setIsStoryVideoExpanded(false)
  }

  const toggleLesson24VideoFullscreen = async () => {
    const shell = storyVideoShellRef.current

    if (!shell) {
      return
    }

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (fullscreenElement === shell) {
      await collapseLesson24VideoMode()
      return
    }

    setIsStoryVideoExpanded(true)

    const requestFullscreen = shell.requestFullscreen || shell.webkitRequestFullscreen

    try {
      await requestFullscreen?.call(shell)
    } catch {
      setIsStoryVideoExpanded(true)
    }
  }

  const finishVideo = () => {
    collapseLesson24VideoMode()
    setVideoFinished(true)
    setKnowledgeUnlocked(true)
    setJourneyStarted(true)
  }

  const handleStoryVideoTime = (event) => {
    if (videoCheckpointResolved || videoCheckpointOpen || event.currentTarget.currentTime < 10.25) return
    event.currentTarget.pause()
    if (shouldUseLesson24MobileVideoMode()) {
      exitLesson24NativeFullscreen()
      setIsStoryVideoExpanded(false)
    }
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
      collapseLesson24VideoMode()
      storyVideoRef.current?.play().catch(() => {})
    }, 360)
  }

  useEffect(() => {
    const syncLesson24FullscreenState = () => {
      const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

      if (!fullscreenElement || fullscreenElement !== storyVideoShellRef.current) {
        setIsStoryVideoExpanded(false)
      }
    }

    document.addEventListener('fullscreenchange', syncLesson24FullscreenState)
    document.addEventListener('webkitfullscreenchange', syncLesson24FullscreenState)

    return () => {
      document.removeEventListener('fullscreenchange', syncLesson24FullscreenState)
      document.removeEventListener('webkitfullscreenchange', syncLesson24FullscreenState)
    }
  }, [])

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

      {isBeforePart && <article className="restored-card">
        <Lesson24SectionMeta
          title="Phần 1. Video khởi động"
          objective="Kích hoạt kiến thức nền và tạo tình huống học tập."
          tasks={[
            'Quan sát video.',
            'Trả lời câu hỏi gợi mở.',
          ]}
          product={['Câu trả lời hoặc dự đoán ban đầu của học sinh.']}
        />
        <div className="journey-heading">
          <span>Video dẫn dắt</span>
          <h2>Chiếc đèn pin trong bóng tối</h2>
          <p>Hãy theo dõi tình huống. Khi video kết thúc, phiếu học tập sẽ mở ra.</p>
        </div>
        <div className={isStoryVideoExpanded ? 'lesson24-story-video lesson24-story-video--mobile-expanded' : 'lesson24-story-video'} ref={storyVideoShellRef}>
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
          <button
            className="video-mobile-fullscreen-btn lesson24-video-fullscreen-btn"
            type="button"
            onClick={toggleLesson24VideoFullscreen}
          >
            {isStoryVideoExpanded ? 'Thu nhỏ video' : 'Toàn màn hình tương tác'}
          </button>
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
      </article>}

      {knowledgeUnlocked && isWorksheetPart && (
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
      {isAfterPart && <Lesson24ReviewGame showSelfAssessment />}
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

// Kept for the older lesson 25 unit-matching activity.
// eslint-disable-next-line no-unused-vars
const lesson25UnitPairs = [
  ['J', 'Đơn vị điện năng hoặc công'],
  ['W', 'Đơn vị công suất'],
  ['s', 'Đơn vị thời gian'],
  ['V', 'Đơn vị hiệu điện thế'],
  ['A', 'Đơn vị cường độ dòng điện'],
]

const lesson25NewQuiz = [
  { id: 'q1', type: 'single', badge: 'Trắc nghiệm', prompt: 'Điện năng tiêu thụ của đoạn mạch được xác định bằng công thức nào?', options: ['U/I', 'UIt', 'UI', 'A/t'], answer: 1, explain: 'Điện năng tiêu thụ bằng công của lực điện và được xác định bởi công thức A = UIt.' },
  { id: 'q2', type: 'single', badge: 'Trắc nghiệm', prompt: 'Thiết bị nào dùng để đo điện năng tiêu thụ trong gia đình?', options: ['Ampe kế', 'Vôn kế', 'Công tơ điện', 'Ôm kế'], answer: 2, explain: 'Công tơ điện dùng để đo điện năng tiêu thụ trong gia đình.' },
  {
    id: 'q3',
    type: 'truefalse',
    badge: 'Đúng - Sai',
    prompt: 'Đánh dấu Đúng hoặc Sai.',
    statements: [
      ['a', 'Điện năng tiêu thụ bằng công của lực điện.'],
      ['b', 'Công suất điện cho biết tốc độ tiêu thụ điện năng.'],
      ['c', 'Công tơ điện dùng để đo cường độ dòng điện.'],
      ['d', 'Thiết bị có công suất lớn hơn luôn tiêu thụ ít điện năng hơn.'],
    ],
    answer: { a: true, b: true, c: false, d: false },
    explain: 'Điện năng tiêu thụ bằng công của lực điện; công suất điện cho biết tốc độ tiêu thụ điện năng; công tơ điện đo điện năng, không đo cường độ dòng điện.',
  },
  {
    id: 'q4',
    type: 'truefalse',
    badge: 'Đúng - Sai',
    prompt: 'Đánh dấu Đúng hoặc Sai.',
    statements: [
      ['a', 'Đơn vị của công suất điện là W.'],
      ['b', 'Đơn vị của điện năng tiêu thụ là J.'],
      ['c', '1 kWh = 360 J.'],
      ['d', 'Điện năng tiêu thụ tăng khi thời gian sử dụng tăng.'],
    ],
    answer: { a: true, b: true, c: false, d: true },
    explain: 'Công suất điện có đơn vị W, điện năng có đơn vị J; 1 kWh = 3,6 × 10^6 J và điện năng tiêu thụ tăng khi thời gian sử dụng tăng.',
  },
  { id: 'q5', type: 'blank', badge: 'Điền khuyết', prompt: 'Hoàn thành công thức: A = ______', answer: 'uit', explain: 'Điện năng tiêu thụ của đoạn mạch được xác định bởi A = UIt.' },
  { id: 'q6', type: 'blank', badge: 'Điền khuyết', prompt: 'Hoàn thành công thức: P = ______', answer: 'ui', explain: 'Từ P = A/t và A = UIt, ta được P = UI.' },
  { id: 'q7', type: 'match', badge: 'Ghép nối', prompt: 'Ghép đại lượng với đơn vị phù hợp.', pairs: [['Điện năng tiêu thụ', 'J'], ['Công suất điện', 'W'], ['Hiệu điện thế', 'V'], ['Cường độ dòng điện', 'A']], targets: ['J', 'W', 'V', 'A'], explain: 'Điện năng tiêu thụ đo bằng J, công suất điện đo bằng W, hiệu điện thế đo bằng V và cường độ dòng điện đo bằng A.' },
  {
    id: 'q8',
    type: 'group',
    badge: 'Kéo thả',
    prompt: 'Kéo các thiết bị vào nhóm phù hợp.',
    groups: [
      { id: 'small', title: 'Công suất nhỏ', answers: ['Đèn LED 20 W', 'Quạt điện 55 W'] },
      { id: 'large', title: 'Công suất lớn', answers: ['Nồi cơm điện 600 W', 'Điều hòa 2638 W'] },
    ],
    items: ['Đèn LED 20 W', 'Quạt điện 55 W', 'Nồi cơm điện 600 W', 'Điều hòa 2638 W'],
    explain: 'Đèn LED 20 W và quạt điện 55 W thuộc nhóm công suất nhỏ; nồi cơm điện 600 W và điều hòa 2638 W thuộc nhóm công suất lớn.',
  },
  {
    id: 'q9',
    type: 'order',
    badge: 'Sắp xếp',
    prompt: 'Sắp xếp các bước hình thành công thức điện năng.',
    items: ['A = qU', 'I = q/t', 'q = It', 'A = UIt'],
    answer: ['A = qU', 'I = q/t', 'q = It', 'A = UIt'],
    explain: 'Từ A = qU và I = q/t suy ra q = It, sau đó thay vào A = qU để được A = UIt.',
  },
  {
    id: 'q10',
    type: 'multi',
    badge: 'Vận dụng',
    prompt: 'Một gia đình muốn giảm tiền điện. Hãy chọn các biện pháp phù hợp.',
    options: ['Tắt thiết bị khi không sử dụng.', 'Chọn thiết bị tiết kiệm điện.', 'Bật đồng thời tất cả thiết bị điện.', 'Giảm thời gian sử dụng các thiết bị không cần thiết.'],
    answer: [0, 1, 3],
    explain: 'Tắt thiết bị khi không sử dụng, chọn thiết bị tiết kiệm điện và giảm thời gian sử dụng thiết bị không cần thiết đều giúp giảm điện năng tiêu thụ.',
  },
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

function Lesson25InteractiveVideo({ onComplete, src }) {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [activePrompt, setActivePrompt] = useState(null)
  const [answeredPrompts, setAnsweredPrompts] = useState({})
  const [multiAnswers, setMultiAnswers] = useState({})
  const [singleAnswer, setSingleAnswer] = useState('')
  const [groupAnswers, setGroupAnswers] = useState({})
  const [selectedDragItem, setSelectedDragItem] = useState('')
  const [result, setResult] = useState(null)
  const [isMobileVideoExpanded, setIsMobileVideoExpanded] = useState(false)

  const shouldUseMobileVideoMode = () => window.matchMedia?.('(max-width: 640px)').matches

  const exitNativeVideoFullscreen = () => {
    const video = videoRef.current

    if (video?.webkitDisplayingFullscreen && typeof video.webkitExitFullscreen === 'function') {
      video.webkitExitFullscreen()
    }
  }

  const collapseMobileVideoMode = async () => {
    if (!shouldUseMobileVideoMode()) {
      return
    }

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (fullscreenElement === containerRef.current) {
      const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen
      await exitFullscreen?.call(document)
    }

    setIsMobileVideoExpanded(false)
  }

  const toggleMobileVideoFullscreen = async () => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (fullscreenElement === container) {
      await collapseMobileVideoMode()
      return
    }

    setIsMobileVideoExpanded(true)

    const requestFullscreen = container.requestFullscreen || container.webkitRequestFullscreen

    try {
      await requestFullscreen?.call(container)
    } catch {
      setIsMobileVideoExpanded(true)
    }
  }

  useEffect(() => {
    const syncFullscreenState = () => {
      const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

      if (!fullscreenElement || fullscreenElement !== containerRef.current) {
        setIsMobileVideoExpanded(false)
      }
    }

    document.addEventListener('fullscreenchange', syncFullscreenState)
    document.addEventListener('webkitfullscreenchange', syncFullscreenState)

    return () => {
      document.removeEventListener('fullscreenchange', syncFullscreenState)
      document.removeEventListener('webkitfullscreenchange', syncFullscreenState)
    }
  }, [])

  useEffect(() => {
    if (!isMobileVideoExpanded || !shouldUseMobileVideoMode()) {
      return undefined
    }

    const scrollY = window.scrollY
    const originalStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    }

    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'

    return () => {
      document.body.style.overflow = originalStyles.overflow
      document.body.style.position = originalStyles.position
      document.body.style.top = originalStyles.top
      document.body.style.width = originalStyles.width
      window.scrollTo(0, scrollY)
    }
  }, [isMobileVideoExpanded])

  function openPrompt(prompt) {
    videoRef.current?.pause()
    if (shouldUseMobileVideoMode()) {
      exitNativeVideoFullscreen()
      setIsMobileVideoExpanded(false)
    }
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
    collapseMobileVideoMode()
    window.setTimeout(() => videoRef.current?.play(), 80)
  }

  const unplacedItems = activePrompt?.type === 'group-drag'
    ? activePrompt.items.filter((item) => !Object.values(groupAnswers).flat().includes(item))
    : []

  const handleVideoEnded = () => {
    collapseMobileVideoMode()
    onComplete?.()
  }

  const videoClassName = [
    'lesson25-interactive-video',
    activePrompt ? 'is-paused' : '',
    isMobileVideoExpanded ? 'lesson25-interactive-video--mobile-expanded' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={videoClassName} ref={containerRef}>
      <video controls playsInline preload="metadata" ref={videoRef} onEnded={handleVideoEnded} onLoadedMetadata={syncVideoPrompt} onPause={syncVideoPrompt} onPlay={syncVideoPrompt} onSeeked={syncVideoPrompt} onTimeUpdate={syncVideoPrompt}>
        <source src={src} type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ phát video HTML5.
      </video>

      <button
        className="video-mobile-fullscreen-btn lesson25-video-fullscreen-btn"
        type="button"
        onClick={toggleMobileVideoFullscreen}
      >
        {isMobileVideoExpanded ? 'Thu nhỏ video' : 'Toàn màn hình tương tác'}
      </button>

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

function Lesson25ElectricJourney({ activePart = 'before' }) {
  const isBeforePart = activePart === 'before'
  const isWorksheetPart = activePart === 'during'
  const isAfterPart = activePart === 'after'
  const [worksheetOpen, setWorksheetOpen] = useState(PREVIEW_ALL_LESSON_PARTS || isWorksheetPart || isAfterPart)
  const [maxStep, setMaxStep] = useState(0)
  const [answers, setAnswers] = useState({ meanings: {}, units: {}, checks: {} })
  const [feedbacks, setFeedbacks] = useState({})
  const [hints, setHints] = useState({})
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizResults, setQuizResults] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [selectedQuizMatch, setSelectedQuizMatch] = useState('')
  const [selectedEnergyDevice, setSelectedEnergyDevice] = useState('')
  const [selfOpen, setSelfOpen] = useState(PREVIEW_ALL_LESSON_PARTS || isAfterPart)

  const normalizeFormula = (value) => normalizeText(String(value || '')).replace(/[∆Δδ]/g, 'delta').replace(/[÷:]/g, '/').replace(/\s/g, '').replace(/[.×*]/g, '')
  const isEnergyWorkFormula = (value) => normalizeFormula(value).replace(/^a=/, '').split('').sort().join('') === 'itu'
  const numberFrom = (value) => Number(String(value || '').replace(/(\d)\s+(?=\d)/g, '$1').replace(',', '.').match(/-?\d+(\.\d+)?/)?.[0])
  const completeStep = (step) => setMaxStep((current) => Math.max(current, step + 1))
  const setFeedback = (key, correct, good, bad) => {
    setFeedbacks((current) => ({ ...current, [key]: { type: correct ? 'correct' : 'wrong', message: correct ? good : bad } }))
    playLessonTone(correct ? 'correct' : 'wrong')
  }
  const updateAnswer = (key, value) => setAnswers((current) => ({ ...current, [key]: value }))
  const showHint = (key, max) => setHints((current) => ({ ...current, [key]: Math.min(max, (current[key] || 0) + 1) }))

  const checkObservation = () => {
    const correct = normalizeText(answers.observation || '').includes('nhieu') || normalizeText(answers.observation || '').includes('lon')
    setFeedback('observation', correct, 'Đúng. Trong cùng một khoảng thời gian, thiết bị có công suất lớn hơn sẽ tiêu thụ nhiều điện năng hơn.', 'Gợi ý: có thể điền “nhiều hơn” hoặc “lớn hơn”.')
    if (correct) completeStep(0)
  }

  const checkEnergyForms = () => {
    const matches = answers.energyMatches || {}
    const correct = matches.bike === 'motion' && matches.kettle === 'heat' && matches.lamp === 'light'
    setFeedback(
      'energyForms',
      correct,
      'Chính xác! Dòng điện làm các thiết bị hoạt động và điện năng được chuyển hóa thành những dạng năng lượng khác nhau.',
      'Gợi ý: xe đạp điện chuyển động, ấm đun nước làm nước nóng lên, bóng đèn phát sáng.',
    )
    if (correct) completeStep(1)
  }

  const placeEnergyForm = (deviceId, formId) => {
    updateAnswer('energyMatches', { ...(answers.energyMatches || {}), [deviceId]: formId })
    setFeedbacks((current) => ({ ...current, energyForms: '' }))
  }

  const checkChargeFormula = () => {
    const value = normalizeFormula(answers.chargeFormula).replace(/^q=/, '')
    const correct = value === 'it'
    setFeedback('chargeFormula', correct, 'Chính xác! Nếu cường độ dòng điện là I và dòng điện chạy trong thời gian t thì điện lượng chuyển qua tiết diện dây dẫn là: q = It.', 'Gợi ý: từ I = q/t, hãy nhân cả hai vế với t để biểu diễn q theo I và t.')
  }

  const checkDerive = () => {
    const correct = isEnergyWorkFormula(answers.derive)
    setFeedback('derive', correct, 'Đúng! Công của lực điện trong đoạn mạch được tính bằng: A = UIt.', 'Gợi ý: thay q = It vào A = qU.')
  }

  const checkEnergyFormulaTask = () => {
    const charge = normalizeFormula(answers.chargeFormula).replace(/^q=/, '') === 'it'
    const energy = isEnergyWorkFormula(answers.derive)
    const correct = charge && energy && answers.energyConclusion === 'electric-work'
    setFeedback('energyFormulaTask', correct, 'Hoàn thành! Năng lượng điện tiêu thụ của đoạn mạch bằng công của lực điện.', 'Gợi ý: điện năng tiêu thụ bằng công mà lực điện thực hiện khi dịch chuyển các điện tích.')
    if (correct) completeStep(2)
  }

  const checkMeter = () => {
    const correct = answers.meterTool === 'meter'
    setFeedback('meterTool', correct, 'Đúng. Thiết bị dùng để đo điện năng tiêu thụ trong gia đình là công tơ điện.', 'Gợi ý: dụng cụ này thường được lắp ở hệ thống điện gia đình để theo dõi lượng điện tiêu thụ.')
  }

  const isKwhStep1Correct = () => String(answers.kwhWatts || '').replace(/\D/g, '') === '1000' && String(answers.kwhSeconds || '').replace(/\D/g, '') === '3600'
  const isKwhFinalCorrect = () => {
    const compact = normalizeText(String(answers.kwhRelation || ''))
      .replace(/[⁶]/g, '^6')
      .replace(/\s/g, '')
      .replace(/j|jun/g, '')
    const digitsOnly = compact.replace(/\D/g, '')

    return digitsOnly === '3600000' || /3[,.]6(?:x|×|\*|\.)?10\^?6/.test(compact)
  }

  const checkKwhStep1 = () => {
    const correct = isKwhStep1Correct()
    setFeedback('kwhStep1', correct, 'Đúng. Ta có 1 kW = 1000 W và 1 h = 3600 s.', 'Gợi ý: đổi riêng kW sang W và h sang s.')
  }

  const checkKwh = () => {
    const correct = isKwhStep1Correct() && isKwhFinalCorrect()
    setFeedback('kwhRelation', correct, 'Đúng. Từ 1000 × 3600 ta suy ra 1 kWh = 3,6 × 10⁶ J.', 'Gợi ý: 1000 × 3600 = 3 600 000 = 3,6 × 10⁶.')
  }

  const checkMeterTask = () => {
    const correct = answers.meterTool === 'meter' && isKwhStep1Correct() && isKwhFinalCorrect()
    setFeedback('meterTask', correct, 'Đúng. Em đã xác định được công tơ điện và tự chứng minh được mối liên hệ giữa kWh và J.', 'Cần chọn công tơ điện và hoàn thành chứng minh 1 kWh = 3,6 × 10⁶ J.')
    if (correct) completeStep(3)
  }

  const checkPowerDevice = () => {
    const correct = answers.powerDevice === 'ac'
    setFeedback('powerDevice', correct, 'Đúng! Trong cùng một khoảng thời gian, thiết bị có công suất lớn hơn sẽ tiêu thụ nhiều điện năng hơn.', 'Gợi ý: so sánh công suất 55 W và 2638 W.')
  }

  const checkPowerMeaning = () => {
    const correct = answers.powerMeaning === 'energy-time'
    setFeedback('powerMeaning', correct, 'Chính xác! Công suất điện là lượng điện năng mà đoạn mạch tiêu thụ trong một đơn vị thời gian.', 'Gợi ý: công suất điện liên hệ với lượng điện năng tiêu thụ trong mỗi đơn vị thời gian.')
  }

  const checkRatedPower = () => {
    const correct = answers.ratedPower === 'rated'
    setFeedback('ratedPower', correct, 'Đúng! Khi thiết bị hoạt động ở hiệu điện thế định mức 220 V thì công suất của nó là 100 W. Công suất này được gọi là công suất định mức.', 'Gợi ý: 100 W là số ghi công suất của thiết bị.')
  }

  const checkLedLowerPower = () => {
    const correct = answers.lowerPowerLamp === 'led'
    setFeedback('lowerPowerLamp', correct, 'Đúng. Đèn LED có công suất 20 W, nhỏ hơn đèn sợi đốt 100 W.', 'Gợi ý: so sánh 20 W với 100 W.')
  }

  const checkLampTime = () => {
    const correct = Math.abs(numberFrom(answers.lampUseTime) - 150) <= 0.1
    setFeedback('lampUseTime', correct, 'Đúng. Tổng thời gian sử dụng là 5 × 30 = 150 giờ.', 'Gợi ý: mỗi ngày dùng 5 giờ trong 30 ngày.')
  }

  const checkIncandescentEnergy = () => {
    const correct = Math.abs(numberFrom(answers.incandescentEnergy) - 15) <= 0.1
    setFeedback('incandescentEnergy', correct, 'Đúng. A = 0,1 × 150 = 15 kWh.', 'Gợi ý: dùng P = 0,1 kW và t = 150 h.')
  }

  const checkLedEnergy = () => {
    const correct = Math.abs(numberFrom(answers.ledEnergy) - 3) <= 0.1
    setFeedback('ledEnergy', correct, 'Đúng. A = 0,02 × 150 = 3 kWh.', 'Gợi ý: dùng P = 0,02 kW và t = 150 h.')
  }

  const checkIncandescentMoney = () => {
    const correct = numberFrom(answers.incandescentMoney) === 30000
    setFeedback('incandescentMoney', correct, '✅ Chính xác! Đèn sợi đốt tiêu thụ 15 kWh điện năng. Với giá điện 2000 đồng cho mỗi kWh: Tiền điện = 15 × 2000 = 30 000 đồng.', 'Gợi ý: lấy điện năng tiêu thụ nhân với giá điện.')
  }

  const checkLedMoney = () => {
    const correct = numberFrom(answers.ledMoney) === 6000
    setFeedback('ledMoney', correct, '✅ Chính xác! Đèn LED tiêu thụ 3 kWh điện năng. Với giá điện 2000 đồng cho mỗi kWh: Tiền điện = 3 × 2000 = 6 000 đồng.', 'Gợi ý: lấy điện năng tiêu thụ nhân với giá điện.')
    if (correct) completeStep(4)
  }

  const worksheetSteps = [
    'Nhận xét từ video',
    'Khái niệm điện năng tiêu thụ',
    'Công thức điện năng tiêu thụ',
    'Đơn vị điện năng và công tơ điện',
    'Khái niệm công suất điện',
  ]
  const worksheetProgress = Math.round((Math.min(maxStep, worksheetSteps.length) / worksheetSteps.length) * 100)
  const currentQuiz = lesson25NewQuiz[quizIndex]
  const quizDone = quizIndex >= lesson25NewQuiz.length
  const quizScore = Object.values(quizResults).filter(Boolean).length
  const lesson25SelfCriteria = [
    ['energy-concept', 'Tôi hiểu điện năng tiêu thụ là gì.'],
    ['energy-formula', 'Tôi vận dụng được công thức A = UIt.'],
    ['kwh', 'Tôi hiểu ý nghĩa của đơn vị kWh.'],
    ['meter', 'Tôi biết công tơ điện dùng để làm gì.'],
    ['power-concept', 'Tôi hiểu công suất điện là gì.'],
    ['power-formula', 'Tôi suy luận được công thức P = A/t = UI.'],
    ['power-compare', 'Tôi giải thích được vì sao thiết bị có công suất lớn hơn thường tiêu thụ nhiều điện năng hơn.'],
    ['power-saving', 'Tôi so sánh được mức tiêu thụ và tiền điện của đèn sợi đốt với đèn LED.'],
  ]
  const selfRatingCount = Object.values(answers.selfChecks || {}).filter(Boolean).length
  const selfReflectionDone = ['unclearContent', 'nextPlan'].every((key) => String(answers[key] || '').trim())

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
    if (currentQuiz.type === 'truefalse') {
      correct = currentQuiz.statements.every(([id]) => value?.[id] === currentQuiz.answer[id])
    }
    if (currentQuiz.type === 'match') {
      correct = currentQuiz.pairs.every(([source, target]) => value?.[source] === target)
    }
    if (currentQuiz.type === 'group') {
      correct = currentQuiz.groups.every((group) => {
        const actual = [...(value?.[group.id] || [])].sort()
        const expected = [...group.answers].sort()
        return actual.length === expected.length && expected.every((item, index) => item === actual[index])
      })
    }
    if (currentQuiz.type === 'order') {
      correct = currentQuiz.answer.length === (value || []).length && currentQuiz.answer.every((item, index) => value[index] === item)
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
        <p>Cấu trúc tự học gồm 4 phần: Video khởi động, Phiếu học tập, Quiz và Tự đánh giá.</p>
      </div>

      {isBeforePart && <article className="restored-card lesson25-real-video-card">
        <div className="journey-heading">
          <span>Bài 25</span>
          <h2>Phần 1. Video khởi động</h2>
        </div>
        <div className="lesson22-section-meta lesson25-section-meta" aria-label="Thông tin phần video khởi động">
          <div>
            <strong>Mục tiêu</strong>
            <p>Kích hoạt kiến thức nền và tạo tình huống học tập.</p>
          </div>
          <div>
            <strong>Nhiệm vụ học tập</strong>
            <p>Quan sát video và trả lời các câu hỏi gợi mở.</p>
          </div>
          <div>
            <strong>Sản phẩm học tập</strong>
            <p>Câu trả lời hoặc dự đoán ban đầu của học sinh.</p>
          </div>
        </div>
        <Lesson25InteractiveVideo onComplete={() => setWorksheetOpen(true)} src="/videos/bai25.mp4" />
      </article>}

      {worksheetOpen && isWorksheetPart && (
        <article className="restored-card lesson25-discovery-sheet lesson22-reveal-block">
          <div className="lesson25-sheet-head">
            <div>
              <span>Bài 25</span>
              <h2>Phần 2. Phiếu học tập</h2>
            </div>
            <img src={robotImage} alt="Mascot trợ lí học tập" />
          </div>
          <div className="lesson22-section-meta lesson25-section-meta" aria-label="Thông tin phần phiếu học tập">
            <div>
              <strong>Mục tiêu</strong>
              <p>Hình thành kiến thức về năng lượng điện, công suất điện và vận dụng vào tình huống sử dụng điện trong thực tế.</p>
            </div>
            <div>
              <strong>Nhiệm vụ học tập</strong>
              <p>Hoàn thành các nhiệm vụ học tập theo trình tự từ quan sát, nhận xét, suy luận công thức đến vận dụng thực tiễn.</p>
            </div>
            <div>
              <strong>Sản phẩm học tập</strong>
              <p>Câu trả lời, công thức hoàn thiện, kết luận nhiệm vụ và bảng tổng hợp kiến thức cuối phiếu.</p>
            </div>
          </div>
          <div className="lesson25-sheet-progress"><span style={{ width: `${worksheetProgress}%` }} /><b>{worksheetProgress}%</b></div>

          <div className="lesson25-unlock-list">
            <section className="lesson25-task-group">
              <div className="lesson25-task-heading">
                <span>Nhiệm vụ 1</span>
                <h3>Hoàn thành nhận xét từ video</h3>
              </div>
              <section className="lesson25-unlock-card is-open">
                <p>Thiết bị có công suất càng lớn thì trong cùng một khoảng thời gian sẽ tiêu thụ điện năng càng ________.</p>
                <div className="answer-row"><input value={answers.observation || ''} onChange={(event) => updateAnswer('observation', event.target.value)} placeholder="Điền từ còn thiếu..." /><button type="button" onClick={checkObservation}>Kiểm tra</button></div>
                {feedbacks.observation && <p className={`inline-feedback inline-feedback--${feedbacks.observation.type}`}>{feedbacks.observation.message}</p>}
              </section>
            </section>

            {maxStep >= 1 && (
            <section className="lesson25-task-group lesson25-energy-task">
              <div className="lesson25-task-heading">
                <span>Nhiệm vụ 2</span>
                <h3>Nhận biết sự chuyển hóa của điện năng</h3>
                <p>Trong thực tế, dòng điện có thể làm nhiều thiết bị hoạt động như xe đạp điện, ấm đun nước và bóng đèn.</p>
              </div>
              <section className="lesson25-unlock-card lesson25-energy-conversion">
                <p>Hãy quan sát các thiết bị dưới đây và xác định điện năng đã chuyển hóa thành dạng năng lượng nào.</p>
                <div className="lesson25-device-match">
                  {[
                    ['bike', '🚲', 'Xe đạp điện'],
                    ['kettle', '♨️', 'Ấm đun nước'],
                    ['lamp', '💡', 'Bóng đèn'],
                  ].map(([id, icon, name]) => {
                    const pickedForm = answers.energyMatches?.[id]
                    const pickedLabel = {
                      motion: 'Cơ năng',
                      heat: 'Nhiệt năng',
                      light: 'Quang năng',
                    }[pickedForm]

                    return (
                      <button
                        className={selectedEnergyDevice === id ? 'lesson25-device-card is-selected' : pickedForm ? 'lesson25-device-card is-filled' : 'lesson25-device-card'}
                        key={id}
                        type="button"
                        onClick={() => setSelectedEnergyDevice(id)}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={(event) => {
                          event.preventDefault()
                          placeEnergyForm(id, event.dataTransfer.getData('text/plain'))
                        }}
                      >
                        <span>{icon}</span>
                        <strong>{name}</strong>
                        <em>{pickedLabel || 'Chọn dạng năng lượng'}</em>
                      </button>
                    )
                  })}
                </div>
                <div className="lesson25-energy-bank" aria-label="Các dạng năng lượng">
                  {[
                    ['motion', 'Cơ năng'],
                    ['heat', 'Nhiệt năng'],
                    ['light', 'Quang năng'],
                  ].map(([id, label]) => (
                    <button
                      className="lesson25-energy-token"
                      draggable
                      key={id}
                      type="button"
                      onClick={() => selectedEnergyDevice && placeEnergyForm(selectedEnergyDevice, id)}
                      onDragStart={(event) => event.dataTransfer.setData('text/plain', id)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <button className="primary-soft-btn" type="button" onClick={checkEnergyForms}>Kiểm tra</button>
                {feedbacks.energyForms && <p className={`inline-feedback inline-feedback--${feedbacks.energyForms.type}`}>{feedbacks.energyForms.message}</p>}
                {feedbacks.energyForms?.type === 'correct' && (
                  <>
                    <div className="lesson25-energy-feedback">
                      <p>Xe đạp điện nhận cơ năng.</p>
                      <p>Ấm đun nước nhận nhiệt năng.</p>
                      <p>Bóng đèn phát ra quang năng.</p>
                    </div>
                    <div className="worksheet-conclusion">
                      <strong>Kết luận:</strong>
                      <span>Từ các ví dụ trên có thể thấy: điện năng tiêu thụ của đoạn mạch không mất đi mà được chuyển hóa thành các dạng năng lượng khác như cơ năng, nhiệt năng, quang năng,... Đây là cơ sở để tìm hiểu khái niệm điện năng tiêu thụ trong phần tiếp theo.</span>
                    </div>
                  </>
                )}
              </section>
            </section>
            )}

            {maxStep >= 2 && (
            <section className="lesson25-task-group lesson25-formula-task">
              <div className="lesson25-task-heading">
                <span>Nhiệm vụ 3</span>
                <h3>Hình thành công thức điện năng tiêu thụ</h3>
              </div>
              <section className="lesson25-unlock-card lesson25-formula-steps">
                <div className="lesson25-formula-intro">
                  <p>Trong một đoạn mạch, khi điện tích q dịch chuyển dưới tác dụng của hiệu điện thế U thì lực điện thực hiện công:</p>
                  <strong>A = qU</strong>
                  <p>Mặt khác:</p>
                  <strong>I = q/t</strong>
                  <p>Hãy sử dụng hai công thức trên để tìm biểu thức điện năng tiêu thụ của đoạn mạch.</p>
                </div>
                <article className="lesson25-reason-step is-active">
                  <span>Bước 1</span>
                  <h3>Từ công thức I = q/t, hãy biểu diễn q theo I và t.</h3>
                  <div className="formula-input">
                    <span>q =</span>
                    <input
                      value={answers.chargeFormula || ''}
                      onChange={(event) => {
                        updateAnswer('chargeFormula', event.target.value)
                        setFeedbacks((current) => ({ ...current, chargeFormula: '', derive: '', energyFormulaTask: '' }))
                      }}
                      placeholder="..."
                    />
                    <button type="button" onClick={checkChargeFormula}>Kiểm tra</button>
                  </div>
                  {feedbacks.chargeFormula && <p className={`inline-feedback inline-feedback--${feedbacks.chargeFormula.type}`}>{feedbacks.chargeFormula.message}</p>}
                </article>
                {feedbacks.chargeFormula?.type === 'correct' && (
                  <article className="lesson25-reason-step is-active">
                    <span>Bước 2</span>
                    <h3>Thay q = It vào công thức A = qU, ta được:</h3>
                    <div className="formula-input">
                      <span>A =</span>
                      <input
                        value={answers.derive || ''}
                        onChange={(event) => {
                          updateAnswer('derive', event.target.value)
                          setFeedbacks((current) => ({ ...current, derive: '', energyFormulaTask: '' }))
                        }}
                        placeholder="..."
                      />
                      <button type="button" onClick={checkDerive}>Kiểm tra</button>
                    </div>
                    {feedbacks.derive && <p className={`inline-feedback inline-feedback--${feedbacks.derive.type}`}>{feedbacks.derive.message}</p>}
                  </article>
                )}
                {feedbacks.derive?.type === 'correct' && (
                  <article className="lesson25-reason-step is-active">
                    <span>Bước 3</span>
                    <h3>Hoàn thành kết luận</h3>
                    <p>"Năng lượng điện tiêu thụ của đoạn mạch bằng ______"</p>
                    <div className="choice-row">
                      {[
                        ['electric-work', 'công của lực điện'],
                        ['heat', 'nhiệt lượng'],
                        ['resistance', 'điện trở'],
                      ].map(([value, label]) => (
                        <button
                          className={answers.energyConclusion === value ? 'soft-choice soft-choice--active' : 'soft-choice'}
                          key={value}
                          type="button"
                          onClick={() => {
                            updateAnswer('energyConclusion', value)
                            setFeedbacks((current) => ({ ...current, energyFormulaTask: '' }))
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <button className="primary-soft-btn" type="button" onClick={checkEnergyFormulaTask}>Kiểm tra kết luận</button>
                    {feedbacks.energyFormulaTask && <p className={`inline-feedback inline-feedback--${feedbacks.energyFormulaTask.type}`}>{feedbacks.energyFormulaTask.message}</p>}
                    {feedbacks.energyFormulaTask?.type === 'correct' && (
                      <div className="worksheet-conclusion lesson25-energy-final">
                        <strong>Kết luận:</strong>
                        <span>Năng lượng điện tiêu thụ của đoạn mạch bằng công của lực điện thực hiện khi dịch chuyển các điện tích.</span>
                        <b>W = A = UIt</b>
                        <em>Đơn vị: Jun (J)</em>
                      </div>
                    )}
                  </article>
                )}
              </section>
            </section>
            )}

            {maxStep >= 3 && (
            <section className="lesson25-task-group">
              <div className="lesson25-task-heading">
                <span>Nhiệm vụ 4</span>
                <h3>Tìm hiểu đơn vị điện năng và công tơ điện</h3>
              </div>
              <section className="lesson25-unlock-card">
                <p>Trong thực tế, điện năng tiêu thụ của gia đình được theo dõi bằng công tơ điện và thường được tính theo đơn vị kWh.</p>
                <h3>Thiết bị dùng để đo điện năng tiêu thụ trong gia đình là gì?</h3>
                <div className="choice-row">{[['ammeter', 'Ampe kế'], ['voltmeter', 'Vôn kế'], ['meter', 'Công tơ điện'], ['ohmmeter', 'Ôm kế']].map(([value, label]) => <button className={answers.meterTool === value ? 'soft-choice soft-choice--active' : 'soft-choice'} type="button" key={value} onClick={() => updateAnswer('meterTool', value)}>{label}</button>)}</div>
                <button className="primary-soft-btn" type="button" onClick={checkMeter}>Kiểm tra câu 1</button>
                {feedbacks.meterTool && <p className={`inline-feedback inline-feedback--${feedbacks.meterTool.type}`}>{feedbacks.meterTool.message}</p>}
                <div className="lesson25-kwh-proof">
                  <h3>Hãy chứng minh rằng 1 kWh = 3,6 × 10⁶ J</h3>
                  <div className="lesson25-kwh-hints" aria-label="Gợi ý đổi đơn vị">
                    <span>1 kW = 1000 W</span>
                    <span>1 h = 3600 s</span>
                    <span>1 W = 1 J/s</span>
                  </div>
                  <article className="lesson25-kwh-step">
                    <strong>Bước 1</strong>
                    <div className="lesson25-kwh-line">
                      <span>1 kWh =</span>
                      <input
                        value={answers.kwhWatts || ''}
                        onChange={(event) => {
                          updateAnswer('kwhWatts', event.target.value)
                          setFeedbacks((current) => ({ ...current, kwhStep1: '', kwhRelation: '', meterTask: '' }))
                        }}
                        inputMode="numeric"
                        placeholder="..."
                      />
                      <span>W ×</span>
                      <input
                        value={answers.kwhSeconds || ''}
                        onChange={(event) => {
                          updateAnswer('kwhSeconds', event.target.value)
                          setFeedbacks((current) => ({ ...current, kwhStep1: '', kwhRelation: '', meterTask: '' }))
                        }}
                        inputMode="numeric"
                        placeholder="..."
                      />
                      <span>s</span>
                      <button type="button" onClick={checkKwhStep1}>Kiểm tra bước 1</button>
                    </div>
                    {feedbacks.kwhStep1 && <p className={`inline-feedback inline-feedback--${feedbacks.kwhStep1.type}`}>{feedbacks.kwhStep1.message}</p>}
                  </article>
                  {feedbacks.kwhStep1?.type === 'correct' && (
                    <>
                      <article className="lesson25-kwh-step lesson25-kwh-step--static">
                        <strong>Bước 2</strong>
                        <p>1 kWh = 1000 × 3600 J</p>
                      </article>
                      <article className="lesson25-kwh-step">
                        <strong>Bước 3</strong>
                        <div className="formula-input">
                          <span>1 kWh =</span>
                          <input
                            value={answers.kwhRelation || ''}
                            onChange={(event) => {
                              updateAnswer('kwhRelation', event.target.value)
                              setFeedbacks((current) => ({ ...current, kwhRelation: '', meterTask: '' }))
                            }}
                            placeholder="..."
                          />
                          <button type="button" onClick={checkKwh}>Kiểm tra bước 3</button>
                        </div>
                        {feedbacks.kwhRelation && <p className={`inline-feedback inline-feedback--${feedbacks.kwhRelation.type}`}>{feedbacks.kwhRelation.message}</p>}
                      </article>
                    </>
                  )}
                  {feedbacks.kwhRelation?.type === 'correct' && (
                    <div className="worksheet-conclusion lesson25-kwh-result">
                      <strong>Vậy:</strong>
                      <span>1 kWh = 3,6 × 10⁶ J = 3600 kJ.</span>
                      <em>Đây là mối liên hệ giữa đơn vị điện năng dùng trong thực tế (kWh) và đơn vị năng lượng trong hệ SI (J).</em>
                    </div>
                  )}
                </div>
                <button className="primary-soft-btn" type="button" onClick={checkMeterTask}>Hoàn thành nhiệm vụ</button>
                {feedbacks.meterTask && <p className={`inline-feedback inline-feedback--${feedbacks.meterTask.type}`}>{feedbacks.meterTask.message}</p>}
              </section>
            </section>
            )}

            {maxStep >= 4 && (
            <section className="lesson25-task-group lesson25-power-concept-task">
              <div className="lesson25-task-heading">
                <span>Nhiệm vụ 5</span>
                <h3>Khám phá công suất điện</h3>
                <p>Các thiết bị điện có công suất khác nhau. Vậy công suất điện cho biết điều gì và giúp chúng ta đánh giá mức tiêu thụ điện năng như thế nào?</p>
              </div>
              <section className="lesson25-unlock-card lesson25-power-concept">
                <div className="lesson25-power-intro">
                  <h3>Bước 1. Thiết bị nào tiêu thụ điện nhanh hơn?</h3>
                  <p>Quan sát một số thiết bị điện thường gặp và công suất ghi trên thiết bị.</p>
                </div>
                <div className="lesson25-power-device-table">
                  {[
                    ['Quạt cây', '55 W'],
                    ['Tivi LED', '69 W'],
                    ['Nồi cơm điện', '600 W'],
                    ['Bàn là', '1000 W'],
                    ['Điều hòa', '2638 W'],
                  ].map(([name, power]) => (
                    <div key={name}>
                      <span>{name}</span>
                      <strong>{power}</strong>
                    </div>
                  ))}
                </div>
                <article className="lesson25-power-step">
                  <span>Câu hỏi 1</span>
                  <h3>Hai thiết bị cùng hoạt động trong 1 giờ: quạt cây 55 W và điều hòa 2638 W. Thiết bị nào tiêu thụ nhiều điện năng hơn?</h3>
                  <div className="choice-row">
                    {[
                      ['fan', 'Quạt cây'],
                      ['ac', 'Điều hòa'],
                    ].map(([value, label]) => (
                      <button
                        className={answers.powerDevice === value ? 'soft-choice soft-choice--active' : 'soft-choice'}
                        key={value}
                        type="button"
                        onClick={() => {
                          updateAnswer('powerDevice', value)
                          setFeedbacks((current) => ({ ...current, powerDevice: '', powerMeaning: '', ratedPower: '', lowerPowerLamp: '' }))
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <button className="primary-soft-btn" type="button" onClick={checkPowerDevice}>Kiểm tra câu 1</button>
                  {feedbacks.powerDevice && <p className={`inline-feedback inline-feedback--${feedbacks.powerDevice.type}`}>{feedbacks.powerDevice.message}</p>}
                  {feedbacks.powerDevice?.type === 'correct' && <p className="lesson25-power-transition">Vậy đại lượng công suất điện cho biết điều gì?</p>}
                </article>
                {feedbacks.powerDevice?.type === 'correct' && (
                  <article className="lesson25-power-step">
                    <span>Bước 2</span>
                    <h3>Khám phá ý nghĩa công suất điện</h3>
                    <div className="lesson25-power-formula-panel">
                      <p>Ở bài trước ta đã biết:</p>
                      <strong>W = A = UIt</strong>
                      <p>Trong đó W là điện năng tiêu thụ của đoạn mạch.</p>
                      <p>Nếu xét lượng điện năng tiêu thụ trong mỗi đơn vị thời gian thì ta có một đại lượng mới gọi là công suất điện.</p>
                    </div>
                    <h3>Công suất điện cho biết điều gì?</h3>
                    <div className="lesson25-power-options">
                      {[
                        ['energy-time', 'A. Điện năng tiêu thụ trong một đơn vị thời gian'],
                        ['voltage', 'B. Hiệu điện thế giữa hai đầu đoạn mạch'],
                        ['resistance', 'C. Điện trở của đoạn mạch'],
                      ].map(([value, label]) => (
                        <button
                          className={answers.powerMeaning === value ? 'soft-choice soft-choice--active' : 'soft-choice'}
                          key={value}
                          type="button"
                          onClick={() => {
                            updateAnswer('powerMeaning', value)
                            setFeedbacks((current) => ({ ...current, powerMeaning: '' }))
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <button className="primary-soft-btn" type="button" onClick={checkPowerMeaning}>Kiểm tra bước 2</button>
                    {feedbacks.powerMeaning && <p className={`inline-feedback inline-feedback--${feedbacks.powerMeaning.type}`}>{feedbacks.powerMeaning.message}</p>}
                  </article>
                )}
                {feedbacks.powerMeaning?.type === 'correct' && (
                  <>
                    <div className="lesson25-power-knowledge">
                      <strong>Kết luận công thức công suất điện</strong>
                      <b>P = A/t = UI</b>
                      <em>Đơn vị của công suất điện là oát (W).</em>
                    </div>
                    <article className="lesson25-power-step">
                      <span>Bước 4</span>
                      <h3>Đọc thông tin trên thiết bị điện</h3>
                      <div className="lesson25-rating-card">220 V - 100 W</div>
                      <h3>Số 100 W trên thiết bị cho biết điều gì?</h3>
                      <div className="lesson25-power-options">
                        {[
                          ['voltage', 'A. Hiệu điện thế định mức'],
                          ['rated', 'B. Công suất định mức'],
                          ['energy', 'C. Điện năng tiêu thụ'],
                        ].map(([value, label]) => (
                          <button
                            className={answers.ratedPower === value ? 'soft-choice soft-choice--active' : 'soft-choice'}
                            key={value}
                            type="button"
                            onClick={() => {
                              updateAnswer('ratedPower', value)
                              setFeedbacks((current) => ({ ...current, ratedPower: '', lowerPowerLamp: '' }))
                            }}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                      <button className="primary-soft-btn" type="button" onClick={checkRatedPower}>Kiểm tra bước 4</button>
                      {feedbacks.ratedPower && <p className={`inline-feedback inline-feedback--${feedbacks.ratedPower.type}`}>{feedbacks.ratedPower.message}</p>}
                    </article>
                  </>
                )}
                {feedbacks.ratedPower?.type === 'correct' && (
                  <article className="lesson25-power-step lesson25-lamp-task">
                    <span>Bước 5</span>
                    <h3>Thiết bị nào tiết kiệm điện hơn?</h3>
                    <div className="lesson25-lamp-grid">
                      <section>
                        <h4>Đèn sợi đốt</h4>
                        <p>Công suất: 100 W</p>
                        <p>Tuổi thọ: 1000 giờ</p>
                        <p>Giá: 8000 đồng</p>
                        <div className="lesson25-energy-split"><span style={{ '--share': '5%' }}>5 J ánh sáng</span><b style={{ '--share': '95%' }}>95 J nhiệt</b></div>
                      </section>
                      <section>
                        <h4>Đèn LED</h4>
                        <p>Công suất: 20 W</p>
                        <p>Tuổi thọ: 30000 giờ</p>
                        <p>Giá: 48000 đồng</p>
                        <div className="lesson25-energy-split"><span style={{ '--share': '80%' }}>80 J ánh sáng</span><b style={{ '--share': '20%' }}>20 J nhiệt</b></div>
                      </section>
                    </div>
                    <div className="lesson25-electric-price">Giá điện: 2000 đồng/kWh</div>
                    <h3>Câu hỏi 1: Loại đèn nào có công suất nhỏ hơn?</h3>
                    <div className="choice-row">
                      {[
                        ['incandescent', 'Đèn sợi đốt'],
                        ['led', 'Đèn LED'],
                      ].map(([value, label]) => (
                        <button
                          className={answers.lowerPowerLamp === value ? 'soft-choice soft-choice--active' : 'soft-choice'}
                          key={value}
                            type="button"
                            onClick={() => {
                              updateAnswer('lowerPowerLamp', value)
                              setFeedbacks((current) => ({ ...current, lowerPowerLamp: '', lampUseTime: '' }))
                            }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <button className="primary-soft-btn" type="button" onClick={checkLedLowerPower}>Kiểm tra câu 1</button>
                    {feedbacks.lowerPowerLamp && <p className={`inline-feedback inline-feedback--${feedbacks.lowerPowerLamp.type}`}>{feedbacks.lowerPowerLamp.message}</p>}
                    {feedbacks.lowerPowerLamp?.type === 'correct' && (
                      <div className="lesson25-power-calc-list">
                        <label>
                          <span>Câu hỏi 2: Dùng 5 giờ/ngày trong 30 ngày. Tổng thời gian sử dụng là bao nhiêu giờ?</span>
                          <input value={answers.lampUseTime || ''} onChange={(event) => updateAnswer('lampUseTime', event.target.value)} placeholder="... giờ" />
                          <button className="primary-soft-btn" type="button" onClick={checkLampTime}>Kiểm tra câu 2</button>
                          {feedbacks.lampUseTime && <p className={`inline-feedback inline-feedback--${feedbacks.lampUseTime.type}`}>{feedbacks.lampUseTime.message}</p>}
                        </label>
                        {feedbacks.lampUseTime?.type === 'correct' && (
                          <label>
                            <span>Câu hỏi 3: Đèn sợi đốt: A = P × t, P = 100 W = 0,1 kW, t = 150 h. A = ?</span>
                            <input value={answers.incandescentEnergy || ''} onChange={(event) => updateAnswer('incandescentEnergy', event.target.value)} placeholder="... kWh" />
                            <button className="primary-soft-btn" type="button" onClick={checkIncandescentEnergy}>Kiểm tra câu 3</button>
                            {feedbacks.incandescentEnergy && <p className={`inline-feedback inline-feedback--${feedbacks.incandescentEnergy.type}`}>{feedbacks.incandescentEnergy.message}</p>}
                          </label>
                        )}
                        {feedbacks.incandescentEnergy?.type === 'correct' && (
                          <label>
                            <span>Câu hỏi 4: Đèn LED: P = 20 W = 0,02 kW, t = 150 h. A = ?</span>
                            <input value={answers.ledEnergy || ''} onChange={(event) => updateAnswer('ledEnergy', event.target.value)} placeholder="... kWh" />
                            <button className="primary-soft-btn" type="button" onClick={checkLedEnergy}>Kiểm tra câu 4</button>
                            {feedbacks.ledEnergy && <p className={`inline-feedback inline-feedback--${feedbacks.ledEnergy.type}`}>{feedbacks.ledEnergy.message}</p>}
                          </label>
                        )}
                        {feedbacks.ledEnergy?.type === 'correct' && (
                          <label>
                            <span>
                              Câu hỏi 5: Tiền điện được tính theo công thức:
                              <br />
                              Tiền điện = Điện năng tiêu thụ × Giá điện.
                              <br />
                              Biết rằng:
                              <br />
                              - Điện năng tiêu thụ của đèn sợi đốt: 15 kWh.
                              <br />
                              - Giá điện: 2000 đồng/kWh.
                              <br />
                              Hãy tính số tiền điện phải trả cho đèn sợi đốt.
                            </span>
                            <input value={answers.incandescentMoney || ''} onChange={(event) => updateAnswer('incandescentMoney', event.target.value)} placeholder="Tiền điện = ... đồng" />
                            <button className="primary-soft-btn" type="button" onClick={checkIncandescentMoney}>Kiểm tra câu 5</button>
                            {feedbacks.incandescentMoney && <p className={`inline-feedback inline-feedback--${feedbacks.incandescentMoney.type}`}>{feedbacks.incandescentMoney.message}</p>}
                          </label>
                        )}
                        {feedbacks.incandescentMoney?.type === 'correct' && (
                          <label>
                            <span>
                              Câu hỏi 6: Tiền điện được tính theo công thức:
                              <br />
                              Tiền điện = Điện năng tiêu thụ × Giá điện.
                              <br />
                              Biết rằng:
                              <br />
                              - Điện năng tiêu thụ của đèn LED: 3 kWh.
                              <br />
                              - Giá điện: 2000 đồng/kWh.
                              <br />
                              Hãy tính số tiền điện phải trả cho đèn LED.
                            </span>
                            <input value={answers.ledMoney || ''} onChange={(event) => updateAnswer('ledMoney', event.target.value)} placeholder="Tiền điện = ... đồng" />
                            <button className="primary-soft-btn" type="button" onClick={checkLedMoney}>Kiểm tra câu 6</button>
                            {feedbacks.ledMoney && <p className={`inline-feedback inline-feedback--${feedbacks.ledMoney.type}`}>{feedbacks.ledMoney.message}</p>}
                          </label>
                        )}
                      </div>
                    )}
                  </article>
                )}
              </section>
            </section>
            )}

          </div>

          {maxStep >= 5 && (
            <section className="lesson25-worksheet-summary">
              <div className="lesson25-task-heading">
                <span>Tổng kết</span>
                <h3>TỔNG HỢP KIẾN THỨC</h3>
              </div>
              <div className="lesson25-summary-grid">
                <section>
                  <h4>1. Điện năng tiêu thụ</h4>
                  <p>Điện năng tiêu thụ của đoạn mạch là năng lượng điện mà đoạn mạch nhận được từ nguồn điện và chuyển hóa thành các dạng năng lượng khác.</p>
                  <p>Điện năng tiêu thụ bằng công của lực điện.</p>
                  <strong>W = A = UIt</strong>
                  <p>W là điện năng tiêu thụ, A là công của lực điện, đơn vị J. U là hiệu điện thế, đơn vị V. I là cường độ dòng điện, đơn vị A. t là thời gian, đơn vị s.</p>
                </section>
                <section>
                  <h4>2. Đơn vị điện năng trong thực tế</h4>
                  <p>Ngoài đơn vị J, điện năng tiêu thụ trong đời sống thường được tính bằng kWh.</p>
                  <p>1 kWh = 3,6 × 10^6 J.</p>
                  <p>Công tơ điện dùng để đo điện năng tiêu thụ.</p>
                </section>
                <section>
                  <h4>3. Công suất điện</h4>
                  <p>Công suất điện cho biết điện năng tiêu thụ trong một đơn vị thời gian.</p>
                  <strong>P = A/t = UI</strong>
                  <p>P là công suất điện, đơn vị W.</p>
                </section>
              </div>
              <button className="primary-soft-btn lesson25-open-quiz" type="button" onClick={() => completeStep(7)}>Hoàn thành Phiếu học tập và chuyển sang Quiz</button>
            </section>
          )}
        </article>
      )}

      {isAfterPart && (
        <article className="review-quest-card lesson25-review">
          <div className="review-quest-header"><div><span className="review-quest-kicker"><b>⚡</b> Bài 25</span><h2>Phần 3. Quiz</h2></div></div>
          <div className="lesson22-section-meta lesson25-section-meta lesson25-section-meta--quiz" aria-label="Thông tin phần quiz">
            <div>
              <strong>Mục tiêu</strong>
              <ul>
                <li>Củng cố kiến thức đã hình thành trong Phiếu học tập.</li>
                <li>Giúp học sinh tự kiểm tra mức độ hiểu bài.</li>
                <li>Chuẩn bị cho hoạt động tự đánh giá.</li>
              </ul>
            </div>
            <div>
              <strong>Nhiệm vụ học tập</strong>
              <ul>
                <li>Hoàn thành toàn bộ câu hỏi Quiz.</li>
                <li>Xem phản hồi sau mỗi câu trả lời.</li>
                <li>Xác định nội dung còn chưa nắm vững.</li>
              </ul>
            </div>
            <div>
              <strong>Sản phẩm học tập</strong>
              <ul>
                <li>Kết quả Quiz.</li>
                <li>Điểm số đạt được.</li>
                <li>Danh sách câu trả lời đúng và sai.</li>
              </ul>
            </div>
          </div>
          <div className="lesson25-quiz-score-row">
            <div className="review-score-orb"><strong>{quizScore}</strong><span>điểm</span></div>
          </div>
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

              {currentQuiz.type === 'truefalse' && (
                <div className="lesson25-truefalse">
                  {currentQuiz.statements.map(([id, statement]) => (
                    <div className="lesson25-truefalse-row" key={id}>
                      <p>{statement}</p>
                      <div className="choice-row">
                        {[[true, 'Đúng'], [false, 'Sai']].map(([value, label]) => (
                          <button
                            className={quizAnswers[currentQuiz.id]?.[id] === value ? 'soft-choice soft-choice--active' : 'soft-choice'}
                            disabled={quizSubmitted}
                            key={label}
                            type="button"
                            onClick={() => setQuizAnswers((current) => ({ ...current, [currentQuiz.id]: { ...(current[currentQuiz.id] || {}), [id]: value } }))}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
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

              {currentQuiz.type === 'group' && (
                <div className="lesson25-drag-groups lesson25-quiz-groups">
                  <div className="lesson25-drag-bank">
                    {currentQuiz.items.filter((item) => !Object.values(quizAnswers[currentQuiz.id] || {}).flat().includes(item)).map((item) => (
                      <button
                        className={selectedQuizMatch === item ? 'is-selected' : ''}
                        disabled={quizSubmitted}
                        draggable={!quizSubmitted}
                        key={item}
                        type="button"
                        onClick={() => setSelectedQuizMatch(item)}
                        onDragStart={(event) => event.dataTransfer.setData('text/plain', item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <div className="lesson25-group-columns">
                    {currentQuiz.groups.map((group) => {
                      const placeItem = (item) => {
                        if (!item || quizSubmitted) return
                        setQuizAnswers((current) => {
                          const previous = current[currentQuiz.id] || {}
                          const next = Object.fromEntries(Object.entries(previous).map(([key, values]) => [key, values.filter((value) => value !== item)]))
                          next[group.id] = [...(next[group.id] || []), item]
                          return { ...current, [currentQuiz.id]: next }
                        })
                        setSelectedQuizMatch('')
                      }
                      return (
                        <div className="lesson25-drop-column" key={group.id} onDragOver={(event) => event.preventDefault()} onDrop={(event) => placeItem(event.dataTransfer.getData('text/plain'))}>
                          <strong>{group.title}</strong>
                          <button disabled={quizSubmitted} type="button" onClick={() => placeItem(selectedQuizMatch)}>{selectedQuizMatch ? `Thả "${selectedQuizMatch}" vào đây` : 'Chọn hoặc kéo thiết bị vào đây'}</button>
                          {(quizAnswers[currentQuiz.id]?.[group.id] || []).map((item) => (
                            <button
                              className="lesson25-placed-item"
                              disabled={quizSubmitted}
                              key={item}
                              type="button"
                              onClick={() => setQuizAnswers((current) => ({ ...current, [currentQuiz.id]: { ...(current[currentQuiz.id] || {}), [group.id]: (current[currentQuiz.id]?.[group.id] || []).filter((value) => value !== item) } }))}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {currentQuiz.type === 'order' && (
                <div className="quest-match lesson25-order-quiz">
                  <div className="quest-match-bank">
                    {currentQuiz.items.filter((item) => !(quizAnswers[currentQuiz.id] || []).includes(item)).map((item) => (
                      <button className={selectedQuizMatch === item ? 'is-selected' : ''} disabled={quizSubmitted} draggable={!quizSubmitted} key={item} type="button" onClick={() => setSelectedQuizMatch(item)} onDragStart={(event) => event.dataTransfer.setData('text/plain', item)}>{item}</button>
                    ))}
                  </div>
                  <div className="quest-match-targets">
                    {currentQuiz.answer.map((_, index) => {
                      const assigned = quizAnswers[currentQuiz.id]?.[index]
                      const placeItem = (item) => {
                        if (!item || quizSubmitted) return
                        setQuizAnswers((current) => {
                          const previous = [...(current[currentQuiz.id] || [])].filter((value) => value !== item)
                          previous[index] = item
                          return { ...current, [currentQuiz.id]: previous }
                        })
                        setSelectedQuizMatch('')
                      }
                      return (
                        <button className={assigned ? 'quest-match-target is-filled' : 'quest-match-target'} disabled={quizSubmitted} key={index} type="button" onClick={() => placeItem(selectedQuizMatch)} onDragOver={(event) => event.preventDefault()} onDrop={(event) => placeItem(event.dataTransfer.getData('text/plain'))}>
                          <strong>Bước {index + 1}</strong>
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
              <p>Điểm số: {quizScore * 10}/{lesson25NewQuiz.length * 10}</p>
              <p>Tỉ lệ hoàn thành: {Math.round((quizScore / lesson25NewQuiz.length) * 100)}%</p>
              <p>{quizScore >= 8 ? 'Em đã nắm vững kiến thức của bài học.' : quizScore >= 5 ? 'Em đã hiểu phần lớn nội dung bài học. Hãy xem lại những câu chưa chính xác.' : 'Em nên xem lại Phiếu học tập và phần Tổng hợp kiến thức trước khi thực hiện lại Quiz.'}</p>
              <div className="lesson25-quiz-review-list">
                {lesson25NewQuiz.map((question, index) => (
                  <span className={quizResults[question.id] ? 'is-correct' : 'is-wrong'} key={question.id}>
                    Câu {index + 1}: {quizResults[question.id] ? 'Đúng' : 'Sai'}
                  </span>
                ))}
              </div>
            </section>
          )}
        </article>
      )}

      {selfOpen && isAfterPart && (
        <UnifiedSelfAssessment
          checks={answers.selfChecks || {}}
          className="lesson25-self-review"
          description="Đối chiếu kết quả học tập với yêu cầu của bài Năng lượng và công suất điện."
          meta={{
            objective: 'Tự nhận biết mức độ hoàn thành sau video, phiếu học tập và quiz.',
            task: 'Đánh dấu các năng lực đã đạt, xem lại phần còn yếu và lưu kết quả học tập.',
            product: 'Nội dung tự đánh giá của học sinh.',
          }}
          completionItems={[
            ['watchedVideo', 'Tôi đã xem video khởi động.'],
            ['answeredGuide', 'Tôi đã trả lời câu hỏi định hướng.'],
            ['completedWorksheet', 'Tôi đã hoàn thành phiếu học tập.'],
            ['completedQuiz', 'Tôi đã hoàn thành Quiz.'],
          ]}
          difficultyItems={[
            ['hardEnergy', 'Khái niệm điện năng tiêu thụ.'],
            ['hardEnergyFormula', 'Công thức A = UIt.'],
            ['hardKwh', 'Đơn vị kW.h.'],
            ['hardPower', 'Công suất điện.'],
            ['hardBill', 'Bài toán hóa đơn điện.'],
          ]}
          doneMessage={selfRatingCount === lesson25SelfCriteria.length && selfReflectionDone ? 'Bạn đã hoàn thành hành trình khám phá Năng lượng và công suất điện.' : ''}
          onPlanChange={(value) => updateAnswer('nextPlan', value)}
          onReflectionChange={(value) => updateAnswer('unclearContent', value)}
          onToggleCheck={(key) => updateAnswer('selfChecks', { ...(answers.selfChecks || {}), [key]: !answers.selfChecks?.[key] })}
          reflectionPlan={answers.nextPlan || ''}
          reflectionQuestion={answers.unclearContent || ''}
          understandingItems={[
            ['energy-concept', 'Tôi hiểu điện năng tiêu thụ là gì.'],
            ['energy-formula', 'Tôi vận dụng được công thức A = UIt.'],
            ['kwh', 'Tôi hiểu ý nghĩa của đơn vị kW.h.'],
            ['meter', 'Tôi biết công tơ điện dùng để làm gì.'],
            ['power-concept', 'Tôi hiểu công suất điện là gì.'],
            ['power-formula', 'Tôi suy luận được công thức P = A/t = UI.'],
            ['power-saving', 'Tôi so sánh được mức tiêu thụ và tiền điện của đèn sợi đốt với đèn LED.'],
          ]}
        />
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
    badge: 'Trắc nghiệm lựa chọn',
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
    id: 'truefalse',
    type: 'truefalse',
    badge: 'Đúng - Sai',
    prompt: 'Đánh dấu đúng hoặc sai cho các nhận định về thí nghiệm.',
    statements: [
      { id: 'ammeter', text: 'Ampe kế được mắc nối tiếp với mạch.' },
      { id: 'voltmeter', text: 'Vôn kế được mắc song song với hai cực nguồn.' },
      { id: 'oneMeasure', text: 'Chỉ đo một lần hiệu điện thế là đủ để xác định cả suất điện động và điện trở trong.' },
    ],
    answer: { ammeter: true, voltmeter: true, oneMeasure: false },
    explain: 'Cần mắc đúng ampe kế, vôn kế và thu thập các cặp số đo U, I để xử lí kết quả.',
  },
  {
    id: 'blank',
    type: 'blank',
    badge: 'Điền khuyết',
    prompt: 'Khi kéo dài đồ thị U-I đến I = 0, giá trị điện áp tại giao điểm với trục U cho biết ______ của pin.',
    answerKeywords: ['suat dien dong', 'suất điện động'],
    explain: 'Khi I = 0, giá trị điện áp trên đồ thị được dùng để xác định suất điện động của pin.',
  },
  {
    id: 'match',
    type: 'match',
    badge: 'Ghép đôi',
    prompt: 'Ghép dụng cụ với chức năng phù hợp.',
    options: [
      { id: 'measureU', text: 'Đo hiệu điện thế' },
      { id: 'measureI', text: 'Đo cường độ dòng điện' },
      { id: 'changeI', text: 'Thay đổi dòng điện qua mạch' },
    ],
    pairs: [
      { id: 'voltmeter', source: 'Vôn kế', answer: 'measureU' },
      { id: 'ammeter', source: 'Ampe kế', answer: 'measureI' },
      { id: 'rheostat', source: 'Biến trở', answer: 'changeI' },
    ],
    explain: 'Vôn kế đo U, ampe kế đo I, biến trở giúp thay đổi dòng điện qua mạch.',
  },
  {
    id: 'drag',
    type: 'drag',
    badge: 'Kéo thả',
    prompt: 'Phân loại các dụng cụ theo vai trò trong thí nghiệm.',
    groups: [
      { id: 'source', text: 'Nguồn điện' },
      { id: 'meter', text: 'Dụng cụ đo' },
      { id: 'circuit', text: 'Hoàn thiện mạch' },
    ],
    items: [
      { id: 'pin', text: 'Pin điện hóa', answer: 'source' },
      { id: 'v', text: 'Vôn kế', answer: 'meter' },
      { id: 'a', text: 'Ampe kế', answer: 'meter' },
      { id: 'switch', text: 'Công tắc', answer: 'circuit' },
      { id: 'wire', text: 'Dây nối', answer: 'circuit' },
    ],
    explain: 'Pin là nguồn điện, vôn kế và ampe kế là dụng cụ đo, công tắc và dây nối giúp hoàn thiện mạch.',
  },
  {
    id: 'order',
    type: 'order',
    badge: 'Sắp xếp quy trình',
    prompt: 'Sắp xếp quy trình lắp mạch đo theo thứ tự hợp lí.',
    steps: [
      { id: 'pin', text: 'Kéo pin vào vùng làm việc.' },
      { id: 'ammeter', text: 'Mắc ampe kế nối tiếp với mạch.' },
      { id: 'resistor', text: 'Mắc điện trở nối tiếp với ampe kế.' },
      { id: 'voltmeter', text: 'Mắc vôn kế song song hai đầu nguồn.' },
      { id: 'wire', text: 'Nối dây để tạo thành mạch kín.' },
    ],
    answer: ['pin', 'ammeter', 'resistor', 'voltmeter', 'wire'],
    explain: 'Quy trình cần bắt đầu từ nguồn, mắc các phần tử chính, đặt vôn kế song song hai đầu nguồn rồi nối dây tạo mạch kín.',
  },
]

const lesson26SelfChecks = [
  ['tools', 'Nhận biết được các dụng cụ thí nghiệm.'],
  ['functions', 'Nêu được chức năng của các dụng cụ.'],
  ['procedure', 'Mô tả được quy trình đo.'],
  ['dataGraph', 'Đọc được bảng số liệu và đồ thị.'],
  ['emf', 'Xác định được suất điện động của pin.'],
  ['resistance', 'Xác định được điện trở trong của pin.'],
  ['meaning', 'Giải thích được ý nghĩa của các đại lượng đo được.'],
]

const createLesson26Rows = (prefix) =>
  Array.from({ length: 5 }, (_, index) => ({
    id: `${prefix}-${index + 1}`,
    r: '',
    u: '',
    i: '',
  }))

const lesson26SampleRows = {
  new: [
    ['50', '1,47', '0,03'],
    ['31', '1,45', '0,05'],
    ['22', '1,43', '0,07'],
    ['18', '1,42', '0,08'],
    ['15', '1,41', '0,09'],
  ],
  old: [
    ['50', '1,02', '0,015'],
    ['41', '0,98', '0,02'],
    ['27', '0,90', '0,03'],
    ['20', '0,83', '0,04'],
    ['11', '0,66', '0,06'],
  ],
}

const lesson26IntroImages = {
  pinA: '/images/bai26/pin-a.png',
  pinB: '/images/bai26/pin-b.png',
  denpinA: '/images/bai26/denpin-a.png',
  denpinB: '/images/bai26/denpin-b.png',
}

function Lesson26IntroAsset({ alt, className = '', name, src }) {
  const [missing, setMissing] = useState(false)

  if (missing) {
    return (
      <div className={`lesson26-intro-placeholder ${className}`} role="img" aria-label={alt}>
        {/* Thay placeholder bằng ảnh thật trong public/images/bai26/ với đúng tên file hiển thị bên dưới. */}
        <span>{name}</span>
      </div>
    )
  }

  return <img className={className} src={src} alt={alt} onError={() => setMissing(true)} />
}

function Lesson26SectionHeader({ meta, title }) {
  return (
    <div className="lesson26-section-head">
      <div className="journey-heading lesson26-section-title">
        <span>Bài 26</span>
        <h2>{title}</h2>
      </div>
      <div className="lesson22-section-meta lesson26-section-meta" aria-label={`Thông tin học tập ${title}`}>
        <div>
          <strong>Mục tiêu</strong>
          <p>{meta.objective}</p>
        </div>
        <div>
          <strong>Nhiệm vụ học tập</strong>
          <p>{meta.task}</p>
        </div>
        <div>
          <strong>Sản phẩm học tập</strong>
          <p>{meta.product}</p>
        </div>
      </div>
    </div>
  )
}

function InteractiveIntroBai26({ onStartWorksheet }) {
  const [slideIndex, setSlideIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const currentSlide = slideIndex + 1
  const introTimes = ['0:03', '0:06', '0:09', '0:12', '0:15', '0:18']
  const questionAnswered = Boolean(selectedAnswer)

  const goNext = () => {
    setSlideIndex((current) => Math.min(current + 1, 5))
  }

  const goBack = () => {
    setSlideIndex((current) => Math.max(current - 1, 0))
  }

  const chooseAnswer = (value) => {
    setSelectedAnswer(value)
    playLessonTone(value === 'c' ? 'correct' : 'wrong')
  }

  return (
    <article className="lesson26-intro-card">
      <div className="journey-heading lesson26-intro-heading">
        <span>Bài 26</span>
        <h2>Phần 1. Video khởi động</h2>
      </div>

      <div className="lesson22-section-meta lesson26-intro-meta" aria-label="Thông tin phần video khởi động">
        <div>
          <strong>Mục tiêu</strong>
          <p>Nhận biết tình huống thực tiễn dẫn tới nhu cầu đánh giá chất lượng của pin điện hóa.</p>
        </div>
        <div>
          <strong>Nhiệm vụ học tập</strong>
          <p>Quan sát video và trả lời các câu hỏi dẫn dắt.</p>
        </div>
        <div>
          <strong>Sản phẩm học tập</strong>
          <p>Dự đoán ban đầu về các đại lượng cần đo để đánh giá chất lượng của pin.</p>
        </div>
      </div>

      <div className="lesson26-intro-player" aria-label={`Video tương tác cảnh ${currentSlide} trên 6`}>
        <div className="lesson26-intro-topbar">
          <div className="lesson26-intro-progress" aria-hidden="true">
            <i style={{ width: `${(currentSlide / 6) * 100}%` }} />
          </div>
          <span className="lesson26-intro-time">{introTimes[slideIndex]} / 0:18</span>
        </div>

        <div className={`lesson26-intro-slide lesson26-intro-slide--${currentSlide}`} key={slideIndex}>
          {slideIndex === 0 && (
            <section className="lesson26-intro-scene lesson26-intro-scene--batteries">
              <div className="lesson26-intro-battery-pair">
                <div>
                  <Lesson26IntroAsset className="lesson26-intro-img lesson26-intro-img--battery" src={lesson26IntroImages.pinA} alt="Pin A" name="pin-a.png" />
                  <strong>Pin A</strong>
                  <span>1,5 V</span>
                </div>
                <div>
                  <Lesson26IntroAsset className="lesson26-intro-img lesson26-intro-img--battery" src={lesson26IntroImages.pinB} alt="Pin B" name="pin-b.png" />
                  <strong>Pin B</strong>
                  <span>1,5 V</span>
                </div>
              </div>
              <h3>Hai viên pin đều ghi 1,5 V.</h3>
            </section>
          )}

          {slideIndex === 1 && (
            <section className="lesson26-intro-scene lesson26-intro-scene--test is-strong">
              <div className="lesson26-intro-test-row">
                <div className="lesson26-intro-labeled-img">
                  <Lesson26IntroAsset className="lesson26-intro-img lesson26-intro-img--battery" src={lesson26IntroImages.pinA} alt="Pin A" name="pin-a.png" />
                  <strong>Pin A</strong>
                </div>
                <div className="lesson26-intro-device">
                  <Lesson26IntroAsset className="lesson26-intro-img lesson26-intro-img--flashlight" src={lesson26IntroImages.denpinA} alt="Đèn pin sáng mạnh khi dùng Pin A" name="denpin-a.png" />
                </div>
              </div>
              <h3>Pin A giúp đèn sáng mạnh.</h3>
            </section>
          )}

          {slideIndex === 2 && (
            <section className="lesson26-intro-scene lesson26-intro-scene--test is-weak">
              <div className="lesson26-intro-test-row">
                <div className="lesson26-intro-labeled-img">
                  <Lesson26IntroAsset className="lesson26-intro-img lesson26-intro-img--battery" src={lesson26IntroImages.pinB} alt="Pin B" name="pin-b.png" />
                  <strong>Pin B</strong>
                </div>
                <div className="lesson26-intro-device">
                  <Lesson26IntroAsset className="lesson26-intro-img lesson26-intro-img--flashlight" src={lesson26IntroImages.denpinB} alt="Đèn pin sáng yếu khi dùng Pin B" name="denpin-b.png" />
                </div>
              </div>
              <h3>Pin B khiến đèn sáng yếu hơn.</h3>
            </section>
          )}

          {slideIndex === 3 && (
            <section className="lesson26-intro-scene lesson26-intro-scene--problem">
              <h3>Hai viên pin đều ghi 1,5 V nhưng khả năng hoạt động khác nhau. Vì sao lại như vậy?</h3>
              <p>Chỉ quan sát thông số ghi trên vỏ pin có đủ để đánh giá chất lượng của pin không?</p>
            </section>
          )}

          {slideIndex === 4 && (
            <section className="lesson26-intro-scene lesson26-intro-scene--question">
              <h3>Làm thế nào để đánh giá chính xác chất lượng của pin?</h3>
              <div className="lesson26-intro-options">
                {[
                  ['a', 'A. Chỉ cần nhìn thông số 1,5 V ghi trên vỏ pin.'],
                  ['b', 'B. Chỉ cần đo một lần hiệu điện thế của pin.'],
                  ['c', 'C. Cần thực hiện thí nghiệm để xác định các đại lượng đặc trưng của nguồn điện.'],
                ].map(([value, label]) => (
                  <button
                    className={selectedAnswer === value ? 'is-selected' : ''}
                    key={value}
                    type="button"
                    onClick={() => chooseAnswer(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {questionAnswered && (
                <p className={selectedAnswer === 'c' ? 'lesson26-intro-feedback is-correct' : 'lesson26-intro-feedback'}>
                  {selectedAnswer === 'c'
                    ? 'Chính xác. Để đánh giá chất lượng của nguồn điện, cần thực hiện thí nghiệm để xác định các đại lượng đặc trưng của nguồn điện.'
                    : 'Chưa chính xác. Chỉ nhìn thông số trên vỏ pin hoặc chỉ đo một đại lượng chưa đủ để đánh giá đầy đủ chất lượng của pin.'}
                </p>
              )}
            </section>
          )}

          {slideIndex === 5 && (
            <section className="lesson26-intro-scene lesson26-intro-scene--handoff">
              <h3>Hãy cùng thực hiện thí nghiệm để tìm hiểu.</h3>
              <ul>
                <li>Suất điện động của pin.</li>
                <li>Điện trở trong của pin.</li>
              </ul>
              <p>Hãy bắt đầu Phiếu học tập để nhận diện dụng cụ, thiết kế phương án đo, thu thập số liệu và xử lí kết quả.</p>
            </section>
          )}
        </div>

        <div className="lesson26-intro-controls">
          <button type="button" onClick={goBack} disabled={slideIndex === 0}>Quay lại</button>
          {slideIndex < 3 && <button type="button" onClick={goNext}>Tiếp tục</button>}
          {slideIndex === 3 && <button type="button" onClick={goNext}>Tiếp tục</button>}
          {slideIndex === 4 && <button type="button" onClick={goNext} disabled={!questionAnswered}>Tiếp tục</button>}
          {slideIndex === 5 && <button type="button" onClick={onStartWorksheet}>KHÁM PHÁ THÍ NGHIỆM</button>}
        </div>
      </div>
    </article>
  )
}

function Lesson26FinalReview({ onComplete, showSelfAssessment = true }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState({})
  const [selfChecks, setSelfChecks] = useState({})
  const [selfReflection, setSelfReflection] = useState({ question: '', plan: '' })
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
    if (question.type === 'truefalse') {
      return question.statements.every((statement) => value?.[statement.id] === question.answer[statement.id])
    }
    if (question.type === 'blank') {
      const normalized = normalizeText(value || '')
      return question.answerKeywords.some((keyword) => normalized.includes(normalizeText(keyword)))
    }
    if (question.type === 'match') {
      return question.pairs.every((pair) => value?.[pair.id] === pair.answer)
    }
    if (question.type === 'drag') {
      return question.items.every((item) => value?.[item.id] === item.answer)
    }
    if (question.type === 'order') {
      return question.answer.length === (value || []).length && question.answer.every((id, index) => value[index] === id)
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

  useEffect(() => {
    if (isComplete) {
      onComplete?.()
    }
  }, [isComplete, onComplete])

  return (
    <>
      <article className="review-quest-card lesson26-review-card">
        <Lesson26SectionHeader
          title="Phần 3. Quiz"
          meta={{
            objective: 'Củng cố kiến thức vừa hình thành.',
            task: 'Hoàn thành các câu hỏi tương tác.',
            product: 'Kết quả trả lời và điểm số.',
          }}
        />
        <div className="review-quest-header">
          <div>
            <span className="review-quest-kicker"><b>AI</b> Kiểm tra tương tác</span>
            <h2>Kiểm tra nhanh sau thí nghiệm pin điện hóa</h2>
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

            {activeQuestion.type === 'blank' && (
              <div className="quest-write">
                <textarea
                  disabled={currentResult !== undefined}
                  value={answers[activeQuestion.id] || ''}
                  onChange={(event) => updateAnswer(activeQuestion.id, event.target.value)}
                  placeholder="Điền cụm từ còn thiếu..."
                />
              </div>
            )}

            {activeQuestion.type === 'truefalse' && (
              <div className="lesson26-quiz-rows">
                {activeQuestion.statements.map((statement) => (
                  <div className="lesson26-quiz-row" key={statement.id}>
                    <p>{statement.text}</p>
                    <div>
                      {[true, false].map((value) => (
                        <button
                          className={answers[activeQuestion.id]?.[statement.id] === value ? 'is-selected' : ''}
                          disabled={currentResult !== undefined}
                          key={String(value)}
                          type="button"
                          onClick={() => updateAnswer(activeQuestion.id, { ...(answers[activeQuestion.id] || {}), [statement.id]: value })}
                        >
                          {value ? 'Đúng' : 'Sai'}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeQuestion.type === 'match' && (
              <div className="lesson26-match-grid">
                {activeQuestion.pairs.map((pair) => (
                  <label key={pair.id}>
                    <span>{pair.source}</span>
                    <select
                      disabled={currentResult !== undefined}
                      value={answers[activeQuestion.id]?.[pair.id] || ''}
                      onChange={(event) => updateAnswer(activeQuestion.id, { ...(answers[activeQuestion.id] || {}), [pair.id]: event.target.value })}
                    >
                      <option value="">Chọn chức năng...</option>
                      {activeQuestion.options.map((option) => <option key={option.id} value={option.id}>{option.text}</option>)}
                    </select>
                  </label>
                ))}
              </div>
            )}

            {activeQuestion.type === 'drag' && (
              <div className="lesson26-drag-grid">
                {activeQuestion.items.map((item) => (
                  <div className="lesson26-drag-item" key={item.id}>
                    <strong>{item.text}</strong>
                    <div>
                      {activeQuestion.groups.map((group) => (
                        <button
                          className={answers[activeQuestion.id]?.[item.id] === group.id ? 'is-selected' : ''}
                          disabled={currentResult !== undefined}
                          key={group.id}
                          type="button"
                          onClick={() => updateAnswer(activeQuestion.id, { ...(answers[activeQuestion.id] || {}), [item.id]: group.id })}
                        >
                          {group.text}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeQuestion.type === 'order' && (
              <div className="lesson26-order-task">
                <div className="lesson26-order-picked">
                  {(answers[activeQuestion.id] || []).map((id, index) => {
                    const step = activeQuestion.steps.find((item) => item.id === id)
                    return <span key={`${id}-${index}`}>{index + 1}. {step?.text}</span>
                  })}
                  {!(answers[activeQuestion.id] || []).length && <em>Chọn lần lượt các bước bên dưới.</em>}
                </div>
                <div className="lesson26-order-bank">
                  {activeQuestion.steps.map((step) => {
                    const picked = (answers[activeQuestion.id] || []).includes(step.id)
                    return (
                      <button
                        disabled={currentResult !== undefined || picked}
                        key={step.id}
                        type="button"
                        onClick={() => updateAnswer(activeQuestion.id, [...(answers[activeQuestion.id] || []), step.id])}
                      >
                        {step.text}
                      </button>
                    )
                  })}
                </div>
                {currentResult === undefined && Boolean((answers[activeQuestion.id] || []).length) && (
                  <button className="ghost-soft-btn" type="button" onClick={() => updateAnswer(activeQuestion.id, [])}>Làm lại thứ tự</button>
                )}
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

      {showSelfAssessment && <UnifiedSelfAssessment
        checks={selfChecks}
        className="lesson26-self-review"
        description="Đối chiếu kết quả học tập với yêu cầu của bài thực hành đo suất điện động và điện trở trong của pin điện hoá."
        meta={{
          objective: 'Tự nhận biết mức độ hoàn thành sau video, phiếu học tập và quiz.',
          task: 'Đánh dấu các năng lực đã đạt, xem lại phần còn yếu và lưu kết quả học tập.',
          product: 'Nội dung tự đánh giá của học sinh.',
        }}
        completionItems={[
          ['watchedVideo', 'Tôi đã xem video khởi động.'],
          ['answeredGuide', 'Tôi đã trả lời câu hỏi định hướng.'],
          ['completedWorksheet', 'Tôi đã hoàn thành phiếu học tập.'],
          ['completedQuiz', 'Tôi đã hoàn thành Quiz.'],
        ]}
        difficultyItems={[
          ['hardTools', 'Nhận biết dụng cụ thí nghiệm.'],
          ['hardCircuit', 'Mắc mạch đo đúng cách.'],
          ['hardData', 'Ghi bảng số liệu U và I.'],
          ['hardGraph', 'Vẽ và đọc đồ thị U-I.'],
          ['hardResult', 'Tính suất điện động và điện trở trong.'],
        ]}
        doneMessage={checkedCount >= 11 && selfReflection.question.trim() && selfReflection.plan.trim() ? 'Bạn đã hoàn thành phiếu tự đánh giá Bài 26.' : ''}
        onPlanChange={(value) => setSelfReflection((current) => ({ ...current, plan: value }))}
        onReflectionChange={(value) => setSelfReflection((current) => ({ ...current, question: value }))}
        onToggleCheck={(key) => setSelfChecks((current) => ({ ...current, [key]: !current[key] }))}
        reflectionPlan={selfReflection.plan}
        reflectionQuestion={selfReflection.question}
        understandingItems={[
          ['tools', 'Tôi nhận biết được các dụng cụ thí nghiệm.'],
          ['functions', 'Tôi nêu được chức năng của các dụng cụ.'],
          ['procedure', 'Tôi mô tả được quy trình đo.'],
          ['dataGraph', 'Tôi đọc được bảng số liệu và đồ thị.'],
          ['emf', 'Tôi xác định được suất điện động của pin.'],
          ['resistance', 'Tôi xác định được điện trở trong của pin.'],
          ['meaning', 'Tôi giải thích được ý nghĩa của các đại lượng đo được.'],
        ]}
      />}
    </>
  )
}

function Lesson26BatteryLab({ activePart = 'before' }) {
  const isBeforePart = activePart === 'before'
  const isWorksheetPart = activePart === 'during'
  const isAfterPart = activePart === 'after'
  const [started, setStarted] = useState(PREVIEW_ALL_LESSON_PARTS || isWorksheetPart || isAfterPart)
  const [quantityAnswer, setQuantityAnswer] = useState('')
  const [circuitChoice, setCircuitChoice] = useState('')
  const [guideMode, setGuideMode] = useState('hint')
  const [answerImageMissing, setAnswerImageMissing] = useState(false)
  const [newBatteryRows, setNewBatteryRows] = useState(() => createLesson26Rows('new-battery'))
  const [oldBatteryRows, setOldBatteryRows] = useState(() => createLesson26Rows('old-battery'))
  const [resistanceSelections, setResistanceSelections] = useState({
    new: { mId: '', nId: '' },
    old: { mId: '', nId: '' },
  })
  const [visiblePointLabels, setVisiblePointLabels] = useState({})
  const [relationAnswer, setRelationAnswer] = useState('')
  const [extendedLine, setExtendedLine] = useState(false)
  const [compareAnswer, setCompareAnswer] = useState('')
  const [finished, setFinished] = useState(PREVIEW_ALL_LESSON_PARTS || isAfterPart)
  const [selfOpen, setSelfOpen] = useState(PREVIEW_ALL_LESSON_PARTS || isAfterPart)
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
  const createFit = (items) => {
    if (items.length < 2) return null
    const sumI = items.reduce((total, item) => total + item.iValue, 0)
    const sumU = items.reduce((total, item) => total + item.uValue, 0)
    const sumII = items.reduce((total, item) => total + item.iValue * item.iValue, 0)
    const sumIU = items.reduce((total, item) => total + item.iValue * item.uValue, 0)
    const denominator = items.length * sumII - sumI * sumI
    if (Math.abs(denominator) < 0.000001) return null
    const slope = (items.length * sumIU - sumI * sumU) / denominator
    const intercept = (sumU - slope * sumI) / items.length
    return { intercept, slope }
  }
  const newFit = createFit(newMeasurements)
  const oldFit = createFit(oldMeasurements)
  const iValues = validMeasurements.map((item) => item.iValue)
  const uValues = [
    ...validMeasurements.map((item) => item.uValue),
    ...[newFit?.intercept, oldFit?.intercept].filter((value) => Number.isFinite(value)),
  ]
  const iMin = 0
  const iMax = iValues.length ? Math.max(...iValues) : 0.05
  const chartIMax = Math.max(iMax * 1.15, 0.05)
  const uMin = uValues.length ? Math.min(...uValues) - 0.03 : 1.35
  const uMax = uValues.length ? Math.max(...uValues) + 0.03 : 1.65
  const mapI = (value) => 70 + ((value - iMin) / Math.max(0.001, chartIMax - iMin)) * 390
  const mapU = (value) => 240 - ((value - uMin) / Math.max(0.01, uMax - uMin)) * 175
  const mapToPoints = (items) =>
    items.map((item) => ({
      ...item,
      x: mapI(item.iValue),
      y: mapU(item.uValue),
    }))
  const newPoints = mapToPoints(newMeasurements)
  const oldPoints = mapToPoints(oldMeasurements)
  const points = [...newPoints, ...oldPoints]
  const createFitPath = (items, fit) => {
    if (!fit || items.length < 2) return ''
    const maxMeasuredI = Math.max(...items.map((item) => item.iValue), 0)
    return `M${mapI(0)} ${mapU(fit.intercept)}L${mapI(maxMeasuredI)} ${mapU(fit.intercept + fit.slope * maxMeasuredI)}`
  }
  const newTrendPath = createFitPath(newMeasurements, newFit)
  const oldTrendPath = createFitPath(oldMeasurements, oldFit)
  const chartXTicks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => ({
    x: mapI(chartIMax * ratio),
    value: chartIMax * ratio,
  }))
  const chartYTicks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => ({
    y: mapU(uMin + (uMax - uMin) * ratio),
    value: uMin + (uMax - uMin) * ratio,
  }))
  const formatChartValue = (value, digits = 2) =>
    Number.isFinite(value)
      ? value.toFixed(digits).replace(/\.?0+$/, '')
      : ''
  const getPointKey = (series, pointId) => `${series}:${pointId}`
  const isPointLabelVisible = (series, pointId) => Boolean(visiblePointLabels[getPointKey(series, pointId)])
  const getPointLabelProps = (point, index) => {
    const isNearRight = point.x > 390
    const isNearBottom = point.y > 212
    return {
      x: isNearRight ? point.x - 13 : point.x + 13,
      y: Math.max(24, Math.min(236, point.y + (isNearBottom ? -28 : -12) + (index % 2) * 10)),
      textAnchor: isNearRight ? 'end' : 'start',
    }
  }

  const selectResistancePoint = (series, point) => {
    const pointKey = getPointKey(series, point.id)
    setVisiblePointLabels((current) => ({
      ...current,
      [pointKey]: !current[pointKey],
    }))
    setResistanceSelections((current) => {
      const seriesSelection = current[series] || { mId: '', nId: '' }
      const nextSeriesSelection =
        !seriesSelection.mId || seriesSelection.nId
          ? { mId: point.id, nId: '' }
          : seriesSelection.mId === point.id
            ? { mId: point.id, nId: '' }
            : { ...seriesSelection, nId: point.id }

      return {
        ...current,
        [series]: nextSeriesSelection,
      }
    })
  }

  const handleResistancePointKey = (event, series, point) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return
    }

    event.preventDefault()
    selectResistancePoint(series, point)
  }

  const getResistancePointClass = (series, pointId) => {
    const selection = resistanceSelections[series] || {}

    if (selection.mId === pointId) {
      return ' data-dot--selected data-dot--m'
    }

    if (selection.nId === pointId) {
      return ' data-dot--selected data-dot--n'
    }

    return ''
  }

  const getResistanceSelection = (series) => {
    const seriesPoints = series === 'new' ? newPoints : oldPoints
    const selection = resistanceSelections[series] || {}

    return {
      m: seriesPoints.find((point) => point.id === selection.mId) || null,
      n: seriesPoints.find((point) => point.id === selection.nId) || null,
    }
  }

  const formatLesson26Value = (value, unit) => Number.isFinite(value) ? `${value.toFixed(2)} ${unit}` : '...'

  const renderInternalResistanceFormula = (series) => {
    const { m, n } = getResistanceSelection(series)
    const denominator = n && m ? n.iValue - m.iValue : null
    const resistance =
      m && n && Math.abs(denominator) > 0.000001
        ? Math.abs((m.uValue - n.uValue) / denominator)
        : null

    return (
      <section className="lesson26-resistance-formula" aria-label={`Công thức tính điện trở trong của ${series === 'new' ? 'pin mới' : 'pin cũ'}`}>
        <b>r = (UM - UN) / (IN - IM)</b>
        <p>Bấm lần lượt 2 điểm đo trên đồ thị: điểm 1 là M, điểm 2 là N.</p>
        <span>UM = {formatLesson26Value(m?.uValue, 'V')}</span>
        <span>IM = {formatLesson26Value(m?.iValue, 'A')}</span>
        <span>UN = {formatLesson26Value(n?.uValue, 'V')}</span>
        <span>IN = {formatLesson26Value(n?.iValue, 'A')}</span>
        {resistance === null ? (
          <em>r = ... Ω</em>
        ) : (
          <strong>r = {resistance.toFixed(2)} Ω</strong>
        )}
      </section>
    )
  }

  const updateMeasurement = (setRows, rowId, field, value) => {
    setRows((current) =>
      current.map((item) => (item.id === rowId ? { ...item, [field]: value } : item)),
    )
  }

  const addMeasurementRow = (setRows, prefix) => {
    setRows((current) => [...current, { id: `${prefix}-${Date.now()}`, r: '', u: '', i: '' }])
  }

  const createSampleMeasurementRows = (prefix, samples) =>
    samples.map(([r, u, i], index) => ({
      id: `${prefix}-${index + 1}`,
      r,
      u,
      i,
    }))

  const fillSampleMeasurements = () => {
    setNewBatteryRows(createSampleMeasurementRows('new-battery', lesson26SampleRows.new))
    setOldBatteryRows(createSampleMeasurementRows('old-battery', lesson26SampleRows.old))
    setVisiblePointLabels({})
    setResistanceSelections({
      new: { mId: '', nId: '' },
      old: { mId: '', nId: '' },
    })
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
      <div><span>Lần đo</span><span>R (Ω)</span><span>U (V)</span><span>I (A)</span></div>
      {rows.map((item, index) => (
        <div key={item.id}>
          <span>{index + 1}</span>
          <input value={item.r} inputMode="decimal" onChange={(event) => updateMeasurement(setRows, item.id, 'r', event.target.value)} aria-label={`${title} điện trở lần đo ${index + 1}`} />
          <input value={item.u} inputMode="decimal" onChange={(event) => updateMeasurement(setRows, item.id, 'u', event.target.value)} aria-label={`${title} hiệu điện thế lần đo ${index + 1}`} />
          <input value={item.i} inputMode="decimal" onChange={(event) => updateMeasurement(setRows, item.id, 'i', event.target.value)} aria-label={`${title} cường độ dòng điện đơn vị ampe lần đo ${index + 1}`} />
        </div>
      ))}
      <button type="button" onClick={() => addMeasurementRow(setRows, prefix)}>Thêm dòng đo</button>
    </div>
  )

  return (
    <section className={finished ? 'lesson26-lab lesson26-lab--finished' : 'lesson26-lab'}>
      <div className="lesson26-bg" aria-hidden="true"><i /><i /><i /><i /><i /></div>

      {isBeforePart && (
        <InteractiveIntroBai26
          onStartWorksheet={() => {
            setStarted(true)
            window.setTimeout(() => toolsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
          }}
        />
      )}

      {(started || PREVIEW_ALL_LESSON_PARTS) && isWorksheetPart && (
        <>
        <article className="lesson26-worksheet-unified">
          <Lesson26SectionHeader
            title="Phần 2. Phiếu học tập"
            meta={{
              objective: 'Tìm hiểu cách xác định suất điện động và điện trở trong của pin điện hóa bằng thí nghiệm.',
              task: 'Thực hiện các hoạt động quan sát, phân tích dụng cụ, thiết kế phương án và xử lí kết quả thí nghiệm.',
              product: 'Phiếu học tập hoàn chỉnh và kết luận về suất điện động, điện trở trong của pin.',
            }}
          />
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
              <span>Nhiệm vụ 1. Khám phá dụng cụ thí nghiệm</span>
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
            <span className="lesson26-task-label">Nhiệm vụ 2. Chuẩn bị mạch điện thí nghiệm</span>
            <h2>Muốn biết pin hoạt động mạnh hay yếu, ta cần đo các đại lượng nào?</h2>
            <div className="lesson26-thinking-prompts">
              <span>Cần đo những đại lượng nào?</span>
              <span>Tại sao cần đo U và I?</span>
              <span>Có thể đo trực tiếp suất điện động và điện trở trong hay không?</span>
            </div>
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
                  <span>Nhiệm vụ 3. Thu thập số liệu và vẽ đồ thị</span>
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
                        <div className="lesson26-phet-mode-note">
                          <strong>Lưu ý</strong>
                          <span>Trong mô phỏng PhET bên dưới, chọn chế độ <b>Lab</b> để mở khu vực lắp mạch.</span>
                        </div>
                        <div className="lesson26-guide-steps">
                          {[
                            { text: 'Kéo pin vào vùng làm việc, chỉnh hiệu điện thế của pin về giá trị 1,5 V.' },
                            { text: 'Mắc ampe kế nối tiếp với mạch.' },
                            { text: 'Mắc điện trở nối tiếp với ampe kế.' },
                            { text: 'Mắc vôn kế song song hai đầu nguồn.' },
                            { text: 'Nối dây để tạo thành mạch kín.' },
                            { text: 'Đặt giá trị điện trở ngoài ban đầu là 50 Ω.' },
                            { text: 'Kéo thanh Battery Resistance trong PhET lên giá trị 1 Ω.', note: 'Ấn vào Advanced để mở thanh trên' },
                            { text: 'Đóng công tắc hoặc nối kín mạch.' },
                            {
                              text: 'Đọc và ghi giá trị vào bảng bên dưới:',
                              details: ['Hiệu điện thế U trên vôn kế.', 'Cường độ dòng điện I trên ampe kế.'],
                            },
                            { text: 'Ngắt mạch.' },
                            { text: 'Giảm dần giá trị điện trở ngoài R và lặp lại phép đo ít nhất 5 lần, đồng thời ghi vào bảng bên dưới.' },
                            { text: 'Tương tự như thế với pin cũ bằng cách kéo thanh Battery Resistance trong PhET lên giá trị lớn nhất và đặt giá trị hiệu điện thế của pin là 1,2 V để mô phỏng pin cũ.' },
                          ].map((step, index) => (
                            <div className="lesson26-guide-step" style={{ '--i': index }} key={step.text}>
                              <b>{index + 1}</b>
                              <div>
                                <p>{step.text}</p>
                                {step.note && <small>{step.note}</small>}
                                {step.details && <ul>{step.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}
                              </div>
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
                    <button className="lesson26-sample-data-btn" type="button" onClick={fillSampleMeasurements}>dữ liệu mẫu</button>
                    <div className="lesson26-table-graph">
                      <svg className="lesson26-chart lesson26-chart--compact" viewBox="0 0 520 300" role="img" aria-label="Đồ thị U theo I từ bảng nhập liệu">
                        <path className="axis" d="M70 245H470M70 245V45" />
                        <text className="axis-title" x="438" y="286">I (A)</text>
                        <text x="42" y="55">U</text>
                        <path className="grid" d="M70 200H470M70 155H470M70 110H470M160 245V45M250 245V45M340 245V45M430 245V45" />
                        <g className="axis-ticks axis-ticks--x">
                          {chartXTicks.map((tick) => (
                            <text key={`i-${tick.value}`} textAnchor="middle" x={tick.x} y="264">{formatChartValue(tick.value, 3)}</text>
                          ))}
                        </g>
                        <g className="axis-ticks axis-ticks--y">
                          {chartYTicks.map((tick) => (
                            <text key={`u-${tick.value}`} textAnchor="end" x="62" y={tick.y + 4}>{formatChartValue(tick.value)}</text>
                          ))}
                        </g>
                        {newTrendPath && <path className="trend-line trend-line--live trend-line--new" d={newTrendPath} />}
                        {oldTrendPath && <path className="trend-line trend-line--live trend-line--old" d={oldTrendPath} />}
                        {newPoints.map((point, index) => {
                          const label = getPointLabelProps(point, index)
                          const showLabel = isPointLabelVisible('new', point.id)
                          return (
                            <Fragment key={point.id}>
                              <circle
                                aria-label={`Chọn điểm pin mới: U = ${point.uValue.toFixed(2)} V, I = ${point.iValue.toFixed(2)} A`}
                                className={`data-dot data-dot--new${getResistancePointClass('new', point.id)}`}
                                cx={point.x}
                                cy={point.y}
                                onClick={() => selectResistancePoint('new', point)}
                                onKeyDown={(event) => handleResistancePointKey(event, 'new', point)}
                                r="7"
                                role="button"
                                style={{ '--delay': `${index * 80}ms` }}
                                tabIndex="0"
                              />
                              {showLabel && (
                                <text className="point-label point-label--new" textAnchor={label.textAnchor} x={label.x} y={label.y}>
                                  <tspan x={label.x}>U={formatChartValue(point.uValue)}V</tspan>
                                  <tspan dy="13" x={label.x}>I={formatChartValue(point.iValue, 3)}A</tspan>
                                </text>
                              )}
                            </Fragment>
                          )
                        })}
                        {oldPoints.map((point, index) => {
                          const label = getPointLabelProps(point, index)
                          const showLabel = isPointLabelVisible('old', point.id)
                          return (
                            <Fragment key={point.id}>
                              <circle
                                aria-label={`Chọn điểm pin cũ: U = ${point.uValue.toFixed(2)} V, I = ${point.iValue.toFixed(2)} A`}
                                className={`data-dot data-dot--old${getResistancePointClass('old', point.id)}`}
                                cx={point.x}
                                cy={point.y}
                                onClick={() => selectResistancePoint('old', point)}
                                onKeyDown={(event) => handleResistancePointKey(event, 'old', point)}
                                r="7"
                                role="button"
                                style={{ '--delay': `${index * 80}ms` }}
                                tabIndex="0"
                              />
                              {showLabel && (
                                <text className="point-label point-label--old" textAnchor={label.textAnchor} x={label.x} y={label.y}>
                                  <tspan x={label.x}>U={formatChartValue(point.uValue)}V</tspan>
                                  <tspan dy="13" x={label.x}>I={formatChartValue(point.iValue, 3)}A</tspan>
                                </text>
                              )}
                            </Fragment>
                          )
                        })}
                        {newFit && <circle className="emf-point emf-point--new" cx={mapI(0)} cy={mapU(newFit.intercept)} r="8" />}
                        {oldFit && <circle className="emf-point emf-point--old" cx={mapI(0)} cy={mapU(oldFit.intercept)} r="8" />}
                        {newFit && <text className="emf-label emf-label--new" x="84" y={Math.max(24, mapU(newFit.intercept) - 8)}>U0 mới</text>}
                        {oldFit && <text className="emf-label emf-label--old" x="84" y={Math.min(268, mapU(oldFit.intercept) + 18)}>U0 cũ</text>}
                        <g className="chart-legend">
                          <circle className="data-dot--new" cx="330" cy="36" r="6" />
                          <text x="342" y="41">Pin mới</text>
                          <circle className="data-dot--old" cx="410" cy="36" r="6" />
                          <text x="422" y="41">Pin cũ</text>
                        </g>
                        {!points.length && <text className="chart-placeholder" x="138" y="150">Nhập U và I để vẽ đồ thị</text>}
                      </svg>
                      <section className="lesson26-emf-result-card" aria-label="Kết quả tự động xác định suất điện động từ giao điểm U0">
                        {newFit || oldFit ? (
                          <>
                            {newFit && (
                              <article>
                                <span>Pin mới</span>
                                <strong>E = U0 = {newFit.intercept.toFixed(2)} V</strong>
                                {renderInternalResistanceFormula('new')}
                              </article>
                            )}
                            {oldFit && (
                              <article>
                                <span>Pin cũ</span>
                                <strong>E = U0 = {oldFit.intercept.toFixed(2)} V</strong>
                                {renderInternalResistanceFormula('old')}
                              </article>
                            )}
                          </>
                        ) : (
                          <p>Nhập ít nhất 2 cặp giá trị U, I cho một pin để tự động kéo dài đường đồ thị đến trục U và xác định E = U0.</p>
                        )}
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )}

          {enoughData && (
            <article className="lesson26-insight-card" ref={graphPromptRef}>
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
                <span className="lesson26-task-label">Nhiệm vụ 4. Kết luận kiến thức</span>
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
              <article className="lesson26-learned-card">
                <h2>EM ĐÃ HỌC ĐƯỢC</h2>
                <ul>
                  <li>Suất điện động của pin được xác định từ giá trị điện áp khi dòng điện bằng 0.</li>
                  <li>Điện trở trong đặc trưng cho sự cản trở dòng điện bên trong nguồn điện.</li>
                  <li>Có thể xác định suất điện động và điện trở trong thông qua thí nghiệm đo U và I.</li>
                  <li>Đồ thị U-I giúp xác định các đại lượng đặc trưng của nguồn điện.</li>
                </ul>
              </article>
            </>
          )}
        </article>
        </>
      )}
      {isAfterPart && <Lesson26FinalReview onComplete={() => setSelfOpen(true)} showSelfAssessment={selfOpen} />}
    </section>
  )
}

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

const getChapterReviewProgressItem = (gameState) => {
  const bankIds = new Set(physicsBank.map((exercise) => exercise.id))
  const totalMissions = bankIds.size
  const completedCount = new Set(
    (gameState?.completedMissionIds || []).filter((id) => bankIds.has(id)),
  ).size
  const failedCount = new Set(
    (gameState?.failedMissionIds || []).filter((id) => bankIds.has(id)),
  ).size
  const progress = totalMissions ? Math.round((completedCount / totalMissions) * 100) : 0
  const maxScore = totalMissions * 100
  const storedScore = Number(gameState?.score || 0)
  const score = Number.isFinite(storedScore) ? Math.min(maxScore, Math.max(0, storedScore)) : 0
  const quizScore = maxScore ? ((score / maxScore) * 10).toFixed(1) : '0.0'
  const rank = getEngineerRank(score, maxScore)
  const hasStarted = completedCount > 0 || failedCount > 0 || score > 0

  return {
    id: CHAPTER_REVIEW_PROGRESS_ID,
    title: CHAPTER_REVIEW_TITLE,
    chartLabel: 'Ôn tập cuối chương',
    status: gameState?.finished || progress >= 100
      ? 'Đã hoàn thành'
      : hasStarted
      ? 'Đang ôn tập'
      : 'Chưa bắt đầu',
    progress,
    quizScore,
    selfAssessment: `${rank}. Hoàn thành ${completedCount}/${totalMissions} nhiệm vụ; ${failedCount} lần cần xem lại.`,
  }
}

const readChapterReviewProgressItem = () => {
  try {
    return getChapterReviewProgressItem(JSON.parse(window.localStorage.getItem(REVIEW_STORAGE_KEY) || 'null'))
  } catch {
    return getChapterReviewProgressItem(null)
  }
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
              <span>{item.chartLabel || item.title.replace('Bài ', '')}</span>
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

const lessonActivityCards = [
  {
    id: 'before',
    title: 'Trước khi học',
    subtitle: 'Video khởi động',
    icon: '▶',
    description: 'Xem tình huống mở đầu và trả lời câu hỏi gợi mở.',
  },
  {
    id: 'during',
    title: 'Trong khi học',
    subtitle: 'Phiếu học tập',
    icon: '✎',
    description: 'Thực hiện nhiệm vụ khám phá, luyện công thức và rút ra kết luận.',
  },
  {
    id: 'after',
    title: 'Sau khi học',
    subtitle: 'Quiz và tự đánh giá',
    icon: '✓',
    description: 'Làm quiz củng cố rồi tự kiểm tra mức độ hiểu bài.',
  },
]

function LessonActivityGate({ content, onSelect }) {
  return (
    <div className="lesson-activity-gate">
      <header className="lesson-activity-hero">
        <span>{content.title?.match(/Bài \d+/)?.[0] || 'Bài học'}</span>
        <h2>{content.title}</h2>
        <p>Chọn hoạt động muốn học. Nội dung chi tiết chỉ hiện sau khi chọn một card.</p>
      </header>
      <div className="lesson-activity-grid" aria-label="Chọn hoạt động bài học">
        {lessonActivityCards.map((card) => (
          <button className={`lesson-activity-card lesson-activity-card--${card.id}`} key={card.id} type="button" onClick={() => onSelect(card.id)}>
            <span className="lesson-activity-card__icon">{card.icon}</span>
            <strong>{card.title}</strong>
            <b>{card.subtitle}</b>
            <small>{card.description}</small>
          </button>
        ))}
      </div>
    </div>
  )
}

function FeatureDialog({ content, onClose, onAction, onOpenLesson, onStartExercise, onExportReport, studyData }) {
  const [activeLessonPart, setActiveLessonPart] = useState(null)
  const isRestoredLesson = content.lessonId === 'cuong-do-dong-dien' || content.lessonId === 'dien-tro-dinh-luat-om' || content.lessonId === 'nguon-dien' || content.lessonId === 'nang-luong-cong-suat-dien' || content.lessonId === 'thuc-hanh-pin-dien-hoa'
  const isSelfStudyMenu = ['overview', 'lessons', 'games', 'review', 'profile', 'formulas'].includes(content.featureKey)
  const showsLegacyLessonExtras = !isSelfStudyMenu && !isRestoredLesson

  useEffect(() => {
    setActiveLessonPart(null)
  }, [content.lessonId, content.featureKey])

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
              {content.featureKey === 'progress' && (
                <button className="learning-report-export-btn" type="button" onClick={onExportReport}>
                  Xuất báo cáo học tập
                </button>
              )}
            </div>
          )}
        </>
      )}
      {isRestoredLesson && !activeLessonPart && <LessonActivityGate content={content} onSelect={setActiveLessonPart} />}
      {isRestoredLesson && activeLessonPart && (
        <div className="lesson-activity-detail">
          <button className="lesson-activity-back" type="button" onClick={() => setActiveLessonPart(null)}>
            ← Quay lại
          </button>
          {content.lessonId === 'cuong-do-dong-dien' && <Lesson22InteractiveWorksheet activePart={activeLessonPart} onAction={onAction} />}
          {content.lessonId === 'dien-tro-dinh-luat-om' && <Lesson23OhmLesson activePart={activeLessonPart} onAction={onAction} />}
          {content.lessonId === 'nguon-dien' && <Lesson24StructuredLessonV2 activePart={activeLessonPart} />}
          {content.lessonId === 'nang-luong-cong-suat-dien' && <Lesson25ElectricJourney activePart={activeLessonPart} />}
          {content.lessonId === 'thuc-hanh-pin-dien-hoa' && <Lesson26BatteryLab activePart={activeLessonPart} />}
        </div>
      )}
      {showsLegacyLessonExtras && content.branches?.length > 0 && (
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
      {showsLegacyLessonExtras && content.actions?.length > 0 && (
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
        'Xin chào! Mình là trợ lí học tập Vật lí 11. Câu hỏi khái niệm, kí hiệu, đơn vị, công thức hoặc dụng cụ mình sẽ trả lời trực tiếp; câu hỏi cách làm mình sẽ nêu quy trình; bài tập và đáp án của em mình sẽ gợi ý, đánh giá và chốt kiến thức đúng.',
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
            ? 'Xin chào! Thành tích và tiến độ học trước đó của bạn đã được tải lại. Mình sẽ trả lời thẳng phần kiến thức cơ bản, nêu quy trình khi hỏi cách làm, và đánh giá đáp án theo phần đúng/sai cụ thể.'
            : 'Xin chào! Tài khoản mới đã bắt đầu từ 0. Mình sẽ trả lời thẳng phần kiến thức cơ bản, nêu quy trình khi hỏi cách làm, và đánh giá đáp án theo phần đúng/sai cụ thể.',
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
        text: `Mình sẽ hỗ trợ em với câu có sẵn trong bài ${topic.label}: ${topic.exercise} Em hãy thử trả lời ngắn, mình sẽ đánh giá và gợi ý tiếp.`,
      },
    ])
    setPendingGuidance({
      question: topic.exercise,
      topicId: topic.id,
      attempts: 1,
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

    const wantsMoreGuidance = Boolean(pendingGuidance && isMoreGuidanceRequest(question))
    const startsNewQuestion = Boolean(pendingGuidance && isLikelyNewQuestion(question) && !wantsMoreGuidance)
    const activeMemory = startsNewQuestion
      ? {
          ...memory,
          pendingQuiz: null,
        }
      : memory
    const questionKind = getQuestionKind(question)
    const needsImmediateResponse =
      ['direct', 'formula', 'method', 'stuck'].includes(questionKind) && (!pendingGuidance || startsNewQuestion)
    const result = buildTutorResponse(question, activeMemory)
    const previousMessages = startsNewQuestion ? [] : messages
    const responseMode = needsImmediateResponse
      ? questionKind === 'method'
        ? 'method'
        : questionKind === 'stuck'
          ? 'stuck'
          : 'direct'
      : (pendingGuidance && !startsNewQuestion && !wantsMoreGuidance) || questionKind === 'student-answer'
        ? 'answer'
        : 'hint'
    const originalQuestion = pendingGuidance && !startsNewQuestion ? pendingGuidance.question || question : question
    const guidanceAttempt = wantsMoreGuidance
      ? (pendingGuidance?.attempts || 1) + 1
      : responseMode === 'answer'
        ? pendingGuidance?.attempts || 1
        : 1
    const conversationTopic =
      pendingGuidance && !startsNewQuestion
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
        guidanceAttempt,
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
        (responseMode === 'hint' && guidanceAttempt < 3) ||
        (responseMode === 'answer' && assessment && !assessment.passed)

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
              attempts: guidanceAttempt,
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
        responseMode === 'direct' || responseMode === 'method' || responseMode === 'stuck'
          ? result.text
          : responseMode === 'hint'
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
        (responseMode === 'hint' && guidanceAttempt < 3) || (responseMode === 'answer' && !canShowFallbackAnswer)
          ? {
              question: originalQuestion,
              topicId: conversationTopic.id,
              attempts: guidanceAttempt,
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

    if (normalizedAction.includes('bai tiep theo')) {
      openLesson(nextTopic.id)
      return
    }

    if (
      normalizedAction.includes('tiep tuc hoc') ||
      normalizedAction.includes('bat dau hoc') ||
      normalizedAction.includes('on lai') ||
      normalizedAction.includes('hoc ngay') ||
      normalizedAction.includes('xem bai hoc') ||
      normalizedAction.includes('mo bai tuong tac')
    ) {
      openLesson(activeFeature?.startsWith('lesson:') ? activeFeature.replace('lesson:', '') : selectedTopicId)
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
        attempts: 1,
      })
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: 'assistant',
          text: `Đã mở nhánh "${action}" của ${lessonFromDialog.label}. Em có thể gõ "gợi ý" hoặc gửi câu trả lời cụ thể để mình đánh giá.`,
        },
      ])
      document.querySelector('.ai-question-input')?.focus()
      return
    }

    showToast(`Đã chọn: ${action}`)
  }

  const handleExportLearningReport = () => {
    const exportedAt = new Date().toLocaleString('vi-VN', {
      dateStyle: 'short',
      timeStyle: 'short',
    })
    const opened = openLearningReportWindow({
      studentName: currentStudent?.username || 'Học sinh',
      exportedAt,
      details: progressDetails,
    })

    showToast(opened ? 'Đã mở báo cáo học tập.' : 'Trình duyệt đã chặn cửa sổ báo cáo.')
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
        actions: ['Hỏi AI về bài này', 'Xem gợi ý học phần này', 'Đánh dấu đã học'],
      }
    : activeFeature
      ? { ...featureContent[activeFeature], featureKey: activeFeature }
      : null
  const topicProgressList = topics.map((topic) => getTopicProgress(memory, topic.id))
  const completedLessons = topicProgressList.filter((progress) => progress >= 100).length
  const inProgressLessons = topicProgressList.filter((progress) => progress > 0 && progress < 100).length
  const notStartedLessons = topics.length - completedLessons - inProgressLessons
  const averageQuizScore = (topicProgressList.reduce((total, progress) => total + progress / 10, 0) / topics.length).toFixed(1)
  const chapterReviewProgress = readChapterReviewProgressItem()
  const progressDetails = [
    ...topics.map((topic) => {
      const progress = getTopicProgress(memory, topic.id)
      return {
        id: topic.id,
        title: `Bài ${topic.number}: ${topic.shortLabel}`,
        chartLabel: `Bài ${topic.number}`,
        status: getTopicStatus(progress),
        progress,
        quizScore: (progress / 10).toFixed(1),
      }
    }),
    chapterReviewProgress,
  ]
  const averageLearningProgress = Math.round(
    progressDetails.reduce((total, item) => total + item.progress, 0) / progressDetails.length,
  )
  const studyHours = Math.floor((memory.studyMinutes || 0) / 60)
  const studyMinutes = (memory.studyMinutes || 0) % 60
  const studyTimeLabel = studyHours > 0 ? `${studyHours} giờ ${studyMinutes} phút` : `${studyMinutes} phút`
  const weeklyGoal = 5
  const nextTopic =
    topics.find((topic) => getTopicProgress(memory, topic.id) > 0 && getTopicProgress(memory, topic.id) < 100) ||
    topics.find((topic) => getTopicProgress(memory, topic.id) < 100) ||
    topics[0]
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
    averageLearningProgress >= 100
      ? `Bạn đã hoàn thành toàn bộ chương học, bao gồm hoạt động ôn tập và tự đánh giá cuối chương. Điểm quiz trung bình các bài là ${averageQuizScore}/10.`
      : `Bạn đã hoàn thành ${averageLearningProgress}% tiến trình học tập, bao gồm cả hoạt động ôn tập cuối chương. Điểm quiz trung bình các bài là ${averageQuizScore}/10.`
  const studyData = {
    averageLessonProgress: averageLearningProgress,
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
                body: `Hoàn thành ${averageLearningProgress}% tiến trình học tập. Đã hoàn thành ${completedLessons}/${topics.length} bài, đang học ${inProgressLessons} bài, chưa học ${notStartedLessons} bài. ${CHAPTER_REVIEW_TITLE}: ${chapterReviewProgress.progress}% (${chapterReviewProgress.quizScore}/10). Điểm Quiz trung bình các bài: ${averageQuizScore}/10.`,
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
              <h2>{`${topics.length} bài học trong chương`}</h2>
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
                        onClick={() => openLesson(topic.id)}
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
                <div className="progress-ring" style={{ '--progress': `${averageLearningProgress}%` }}>
                  <span>{`${averageLearningProgress}%`}</span>
                  <small>Hoàn thành</small>
                </div>
                <div className="progress-legend">
                  <span><i className="dot dot-green" />Đã hoàn thành: {completedLessons}/{topics.length} bài</span>
                  <span><i className="dot dot-orange" />Đang học: {inProgressLessons} bài</span>
                  <span><i className="dot dot-purple" />Chưa học: {notStartedLessons} bài</span>
                  <span><i className="dot dot-green" />Ôn tập cuối chương: {chapterReviewProgress.progress}%</span>
                </div>
              </div>
              <p className="quiz-average">Điểm Quiz trung bình các bài: <strong>{averageQuizScore}/10</strong></p>
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
                  <p>Xin chào! Mình là trợ lí học tập Vật lí 11. Mình có thể giúp bạn:</p>
                  <ul>
                    <li>Trả lời nhanh khái niệm, kí hiệu, đơn vị</li>
                    <li>Nhắc công thức, chức năng và cách mắc dụng cụ</li>
                    <li>Nêu quy trình khi hỏi cách làm</li>
                    <li>Gợi ý bài tập, đánh giá đáp án</li>
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
          onExportReport={handleExportLearningReport}
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
