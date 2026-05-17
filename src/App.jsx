import { useEffect, useMemo, useRef, useState } from 'react'
import denImage from './assets/den.png'
import dongHoImage from './assets/dongho.png'
import bongDenImage from './assets/bongden.png'
import robotImage from './assets/ai-robot.png'
import cucPinImage from './assets/cucpin.png'
import dienTroImage from './assets/dientro.png'
import lesson22CircuitImage from './assets/lesson-22-circuit.png'
import omegaImage from './assets/omega.png'
import pinImage from './assets/pin.png'
import soDoImage from './assets/sodo.png'
import sidebarCircuitImage from './assets/sidebar-circuit-render.png'
import vonKeImage from './assets/vonke.png'
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
    actions: ['Luyện phần yếu', 'Xem lộ trình'],
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
  { key: 'games', label: 'Trò chơi tổng hợp', icon: 'game' },
  { key: 'review', label: 'Ôn tập - Kiểm tra', icon: 'clipboard' },
  { key: 'profile', label: 'Hồ sơ học tập', icon: 'users' },
  { key: 'formulas', label: 'Sổ tay công thức', icon: 'notebook' },
  { key: 'ai', label: 'Trợ lí ảo (AI)', icon: 'bot' },
  { key: 'guide', label: 'Hướng dẫn sử dụng', icon: 'help' },
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

const selfStudyLessons = {
  'cuong-do-dong-dien': {
    context: 'Đèn sáng mạnh hơn hoặc thiết bị nóng nhanh hơn thường liên quan đến dòng điện mạnh hơn.',
    leadQuestion: 'Muốn so sánh dòng điện mạnh hay yếu, em cần nhìn vào điều gì?',
    predictionOptions: [
      'Điện lượng đi qua tiết diện dây trong một giây.',
      'Màu sắc của dây dẫn trong mạch.',
      'Tên gọi của nguồn điện đang dùng.',
    ],
    predictionAnswer: 0,
    predictionFeedback: 'Đúng: cường độ dòng điện đo lượng điện tích đi qua trong một đơn vị thời gian.',
    formula: 'I = Δq / Δt',
    formulaNote: 'Với dòng điện không đổi: I = q / t. Đơn vị I là ampe (A), 1 C = 1 A.s.',
    formulaOptions: ['I = Δq / Δt', 'I = Δt / Δq', 'I = q.t'],
    formulaAnswer: 0,
    connectTitle: 'Trong kim loại, electron đi ngược chiều dòng điện quy ước.',
    connectNote: 'Dòng điện quy ước đi từ cực dương sang cực âm ở mạch ngoài; electron tự do mang điện âm nên chuyển động ngược chiều đó. Công thức vi mô: I = Snve.',
    applyPrompt: 'Sạc dự phòng 4000 mAh cấp dòng 400 mA. Thời gian dùng gần đúng là bao nhiêu giờ?',
    applyPlaceholder: 'Ví dụ: 10 giờ',
    applyCheck: (value) => normalizeText(value).replace(/\s/g, '').includes('10'),
    applyWrong: 'Gợi ý: lấy dung lượng 4000 mAh chia cho dòng điện 400 mA.',
    applyCorrect: 'Đúng: 4000 / 400 = 10 giờ.',
    quiz: lesson22Quiz,
    summary: [
      'Cường độ dòng điện đặc trưng cho độ mạnh yếu của dòng điện.',
      'Công thức cần nhớ: I = Δq / Δt, với dòng điện không đổi I = q / t.',
      'Trong kim loại, electron tự do chuyển động ngược chiều dòng điện quy ước.',
    ],
  },
  'dien-tro-dinh-luat-om': {
    context: 'Cùng một nguồn điện, bóng đèn hoặc điện trở khác nhau có thể làm dòng điện mạnh yếu khác nhau.',
    leadQuestion: 'Đại lượng nào cho biết vật dẫn cản trở dòng điện nhiều hay ít?',
    predictionOptions: ['Điện trở R của vật dẫn.', 'Khối lượng của vật dẫn.', 'Màu vỏ ngoài của linh kiện.'],
    predictionAnswer: 0,
    predictionFeedback: 'Đúng: điện trở càng lớn thì dòng điện qua vật dẫn càng khó tăng.',
    formula: 'I = U / R',
    formulaNote: 'Định luật Ôm: cường độ dòng điện tỉ lệ thuận với U và tỉ lệ nghịch với R. Từ đó R = U / I.',
    formulaOptions: ['I = U / R', 'I = R / U', 'I = U.R'],
    formulaAnswer: 0,
    connectTitle: 'Đường đặc trưng vôn-ampe của điện trở kim loại là đường thẳng qua gốc tọa độ.',
    connectNote: 'Nếu trục đứng là I và trục ngang là U, đường càng dốc thì R càng nhỏ. Điện trở dây dẫn còn phụ thuộc vật liệu, chiều dài, tiết diện và nhiệt độ.',
    applyPrompt: 'Đặt U = 12 V vào điện trở R = 4 Ω. Cường độ dòng điện bằng bao nhiêu?',
    applyPlaceholder: 'Ví dụ: 3 A',
    applyCheck: (value) => normalizeText(value).replace(/\s/g, '').includes('3'),
    applyWrong: 'Gợi ý: dùng I = U / R = 12 / 4.',
    applyCorrect: 'Đúng: I = 12 / 4 = 3 A.',
    quiz: [
      {
        id: 'meaning',
        question: 'Điện trở R đặc trưng cho điều gì?',
        options: ['Mức cản trở dòng điện của vật dẫn', 'Năng lượng pin còn lại', 'Chiều dòng điện quy ước'],
        answer: 0,
        explain: 'Điện trở cho biết vật dẫn cản trở dòng điện nhiều hay ít.',
      },
      {
        id: 'ohm',
        question: 'Theo định luật Ôm, nếu U không đổi mà R tăng thì I thay đổi thế nào?',
        options: ['Tăng', 'Giảm', 'Không đổi trong mọi trường hợp'],
        answer: 1,
        explain: 'I = U / R nên khi R tăng, I giảm nếu U không đổi.',
      },
      {
        id: 'ntc',
        question: 'Điện trở nhiệt NTC có đặc điểm nào?',
        options: ['R tăng khi nhiệt độ tăng', 'R giảm khi nhiệt độ tăng', 'R luôn bằng 0'],
        answer: 1,
        explain: 'NTC là điện trở nhiệt có điện trở giảm khi nhiệt độ tăng.',
      },
    ],
    summary: [
      'Điện trở R đặc trưng cho mức độ cản trở dòng điện, đơn vị là ôm (Ω).',
      'Định luật Ôm cho đoạn mạch: I = U / R.',
      'Điện trở kim loại phụ thuộc vật liệu, chiều dài, tiết diện và nhiệt độ.',
    ],
  },
  'nguon-dien': {
    context: 'Pin, acquy và máy phát điện đều có nhiệm vụ duy trì hiệu điện thế để mạch kín có dòng điện.',
    leadQuestion: 'Bên trong nguồn cần có gì để duy trì sự tách điện tích?',
    predictionOptions: ['Lực lạ thực hiện công lên điện tích.', 'Chỉ cần dây dẫn thật dài.', 'Chỉ cần bóng đèn có công suất lớn.'],
    predictionAnswer: 0,
    predictionFeedback: 'Đúng: lực lạ trong nguồn giúp tách và chuyển điện tích để duy trì hiệu điện thế.',
    formula: 'U = ξ - I.r',
    formulaNote: 'Suất điện động ξ đặc trưng cho khả năng thực hiện công của nguồn. Mạch kín còn có điện trở trong r nên U hai cực giảm khi I tăng.',
    formulaOptions: ['U = ξ - I.r', 'U = ξ + I.r', 'I = R / ξ'],
    formulaAnswer: 0,
    connectTitle: 'Nguồn điện thực tế có điện trở trong.',
    connectNote: 'Với mạch ngoài R nối nguồn có điện trở trong r: I = ξ / (R + r). Khi mạch hở, số vôn trên nguồn gần bằng ξ.',
    applyPrompt: 'Nguồn có ξ = 10 V, r = 1 Ω, dòng điện I = 2 A. Hiệu điện thế mạch ngoài là bao nhiêu?',
    applyPlaceholder: 'Ví dụ: 8 V',
    applyCheck: (value) => normalizeText(value).replace(/\s/g, '').includes('8'),
    applyWrong: 'Gợi ý: U = ξ - I.r = 10 - 2.1.',
    applyCorrect: 'Đúng: U = 10 - 2 = 8 V.',
    quiz: [
      {
        id: 'source',
        question: 'Nguồn điện có vai trò chính là gì?',
        options: ['Tạo và duy trì hiệu điện thế', 'Làm mất điện tích trong mạch', 'Chỉ làm dây dẫn nóng lên'],
        answer: 0,
        explain: 'Nguồn điện duy trì hiệu điện thế giữa hai cực để mạch kín có dòng điện.',
      },
      {
        id: 'emf',
        question: 'Suất điện động của nguồn kí hiệu là gì?',
        options: ['R', 'ξ', 'P'],
        answer: 1,
        explain: 'Suất điện động thường kí hiệu là ξ, đơn vị là vôn (V).',
      },
      {
        id: 'internal',
        question: 'Vì sao U giữa hai cực nguồn khi có dòng điện thường nhỏ hơn ξ?',
        options: ['Do có độ giảm thế trên điện trở trong r', 'Do dây dẫn biến mất', 'Do dòng điện không có chiều'],
        answer: 0,
        explain: 'Nguồn thực tế có điện trở trong r nên U = ξ - I.r.',
      },
    ],
    summary: [
      'Nguồn điện tạo và duy trì hiệu điện thế giữa hai cực.',
      'Suất điện động ξ đặc trưng cho khả năng thực hiện công của nguồn.',
      'Nguồn thực tế có điện trở trong r; mạch kín dùng I = ξ / (R + r) và U = ξ - I.r.',
    ],
  },
  'nang-luong-cong-suat-dien': {
    context: 'Công tơ điện, hóa đơn tiền điện và nhãn 220 V - 100 W đều nói về năng lượng và công suất điện.',
    leadQuestion: 'Công suất điện cho biết điều gì?',
    predictionOptions: ['Năng lượng điện tiêu thụ trong một đơn vị thời gian.', 'Chiều dài dây dẫn trong nhà.', 'Số cực của một viên pin.'],
    predictionAnswer: 0,
    predictionFeedback: 'Đúng: công suất càng lớn thì trong cùng thời gian thiết bị tiêu thụ càng nhiều năng lượng.',
    formula: 'P = U.I',
    formulaNote: 'Năng lượng điện W = U.I.t. Công suất P = W / t = U.I. Ngoài J còn dùng kW.h, với 1 kW.h = 3,6.10^6 J.',
    formulaOptions: ['P = U.I', 'P = U / I', 'P = I / U'],
    formulaAnswer: 0,
    connectTitle: 'Thông số định mức cho biết điều kiện hoạt động bình thường của thiết bị.',
    connectNote: 'Ví dụ 220 V - 100 W nghĩa là dùng đúng 220 V thì thiết bị tiêu thụ công suất 100 W. Đèn LED tiết kiệm hơn vì ít biến điện năng thành nhiệt vô ích.',
    applyPrompt: 'Một thiết bị dùng U = 220 V và I = 2 A. Công suất điện là bao nhiêu?',
    applyPlaceholder: 'Ví dụ: 440 W',
    applyCheck: (value) => normalizeText(value).replace(/\s/g, '').includes('440'),
    applyWrong: 'Gợi ý: dùng P = U.I = 220 × 2.',
    applyCorrect: 'Đúng: P = 220 × 2 = 440 W.',
    quiz: [
      {
        id: 'power',
        question: 'Công suất điện được tính bằng công thức nào?',
        options: ['P = U.I', 'P = R / U', 'P = t / W'],
        answer: 0,
        explain: 'Công suất điện P = W / t = U.I.',
      },
      {
        id: 'kwh',
        question: '1 kW.h bằng bao nhiêu J?',
        options: ['3,6.10^6 J', '360 J', '1000 J'],
        answer: 0,
        explain: '1 kW.h = 1000 W × 3600 s = 3,6.10^6 J.',
      },
      {
        id: 'phone',
        question: 'Vì sao giảm độ sáng màn hình giúp điện thoại dùng pin lâu hơn?',
        options: ['Làm giảm công suất tiêu thụ', 'Làm tăng điện trở trong pin vô hạn', 'Làm mất dòng điện trong mạch'],
        answer: 0,
        explain: 'Giảm độ sáng làm màn hình tiêu thụ công suất nhỏ hơn, nên cùng năng lượng pin dùng được lâu hơn.',
      },
    ],
    summary: [
      'Năng lượng điện tiêu thụ: W = U.I.t.',
      'Công suất điện: P = W / t = U.I, đơn vị là oát (W).',
      'Điện năng sinh hoạt thường tính bằng kW.h; công suất định mức giúp dùng thiết bị đúng và tiết kiệm.',
    ],
  },
  'thuc-hanh-pin-dien-hoa': {
    context: 'Bài thực hành dùng pin cũ, pin mới, biến trở, vôn kế và ampe kế để xác định suất điện động và điện trở trong.',
    leadQuestion: 'Vì sao không chỉ đọc số vôn ghi trên pin rồi kết luận ngay điện trở trong?',
    predictionOptions: [
      'Vì khi có dòng điện, hiệu điện thế hai cực giảm do điện trở trong.',
      'Vì pin không có cực dương và cực âm.',
      'Vì vôn kế chỉ đo được khối lượng của pin.',
    ],
    predictionAnswer: 0,
    predictionFeedback: 'Đúng: muốn tìm r phải đo nhiều cặp U, I rồi xử lí bằng đồ thị U theo I.',
    formula: 'U = ξ - I.r',
    formulaNote: 'Vẽ đồ thị U theo I. Khi kéo dài đến I = 0, tung độ cho biết ξ; độ dốc âm liên hệ với điện trở trong r.',
    formulaOptions: ['U = ξ - I.r', 'U = I / r', 'ξ = R.I.t'],
    formulaAnswer: 0,
    connectTitle: 'Quy trình thực hành cần mắc đúng đồng hồ và thay đổi biến trở.',
    connectNote: 'Ampe kế mắc nối tiếp để đo I, vôn kế mắc song song hai cực nguồn để đo U. Mỗi lần thay đổi biến trở, ghi một cặp U, I cho pin cũ và pin mới.',
    applyPrompt: 'Trên đồ thị U-I của pin, khi I = 0 thì U0 cho biết đại lượng nào?',
    applyPlaceholder: 'Ví dụ: suất điện động',
    applyCheck: (value) => {
      const normalized = normalizeText(value)
      return normalized.includes('suat dien dong') || normalized.includes('xi') || value.includes('ξ')
    },
    applyWrong: 'Gợi ý: khi mạch hở I = 0, công thức U = ξ - I.r còn lại U = ξ.',
    applyCorrect: 'Đúng: U0 chính là suất điện động ξ của nguồn.',
    quiz: [
      {
        id: 'tool',
        question: 'Trong mạch thực hành, ampe kế được mắc như thế nào?',
        options: ['Mắc nối tiếp với mạch', 'Mắc song song hai cực pin', 'Không cần mắc vào mạch'],
        answer: 0,
        explain: 'Ampe kế phải mắc nối tiếp để đo cường độ dòng điện chạy qua mạch.',
      },
      {
        id: 'graph',
        question: 'Đồ thị nào được dùng để xác định ξ và r của pin?',
        options: ['U theo I', 'P theo thời gian', 'Khối lượng theo thể tích'],
        answer: 0,
        explain: 'Bài thực hành ghi các cặp U, I rồi vẽ đồ thị U = f(I).',
      },
      {
        id: 'old-new',
        question: 'Pin cũ thường khác pin mới ở điểm nào?',
        options: ['Điện trở trong lớn hơn, U giảm mạnh hơn khi có dòng', 'Không còn cực dương', 'Luôn có suất điện động bằng 0'],
        answer: 0,
        explain: 'Pin cũ thường có điện trở trong lớn hơn nên hiệu điện thế hai cực sụt nhiều hơn khi có dòng điện.',
      },
    ],
    summary: [
      'Mục tiêu thực hành: xác định suất điện động ξ và điện trở trong r của pin.',
      'Đo nhiều cặp U, I bằng cách thay đổi biến trở, rồi vẽ đồ thị U theo I.',
      'Từ U = ξ - I.r: giao điểm tại I = 0 cho ξ, độ dốc âm cho biết r.',
    ],
  },
}

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

function SelfStudyLessonContent({ topic, onAction }) {
  const lesson = selfStudyLessons[topic.id] || selfStudyLessons['cuong-do-dong-dien']
  const [currentStep, setCurrentStep] = useState(0)
  const [prediction, setPrediction] = useState(null)
  const [formulaChoice, setFormulaChoice] = useState(null)
  const [connectionChoice, setConnectionChoice] = useState(null)
  const [applyAnswer, setApplyAnswer] = useState('')
  const [applyFeedback, setApplyFeedback] = useState(null)
  const [answers, setAnswers] = useState({})
  const [pulse, setPulse] = useState(null)
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)
  const [hasSavedCompletion, setHasSavedCompletion] = useState(false)
  const lessonSteps = ['Trước học', 'Dự đoán', 'Cốt lõi', 'Kết nối', 'Vận dụng', 'Tự kiểm tra', 'Sau học']
  const answeredCount = Object.keys(answers).length
  const correctCount = lesson.quiz.filter((item) => answers[item.id] === item.answer).length
  const isUnlocked =
    prediction === lesson.predictionAnswer &&
    formulaChoice === lesson.formulaAnswer &&
    connectionChoice === 0 &&
    applyFeedback === 'correct' &&
    answeredCount === lesson.quiz.length

  const giveFeedback = (isCorrect) => {
    const type = isCorrect ? 'correct' : 'wrong'
    setPulse(type)
    playLessonTone(type)
    window.setTimeout(() => setPulse(null), 520)
  }

  const goNext = () => setCurrentStep((step) => Math.min(lessonSteps.length - 1, step + 1))

  const handlePrediction = (index) => {
    setPrediction(index)
    giveFeedback(index === lesson.predictionAnswer)
    if (index === lesson.predictionAnswer) {
      window.setTimeout(goNext, 620)
    }
  }

  const handleFormulaChoice = (index) => {
    setFormulaChoice(index)
    giveFeedback(index === lesson.formulaAnswer)
    if (index === lesson.formulaAnswer) {
      window.setTimeout(goNext, 620)
    }
  }

  const handleConnectionChoice = (index) => {
    setConnectionChoice(index)
    giveFeedback(index === 0)
    if (index === 0) {
      window.setTimeout(goNext, 620)
    }
  }

  const handleApplyCheck = () => {
    const isCorrect = lesson.applyCheck(applyAnswer)
    setApplyFeedback(isCorrect ? 'correct' : 'wrong')
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
      onAction(`Đã hoàn thành nội dung Bài ${topic.number}`)
    }
  }

  return (
    <div className={`lesson22-content ${pulse ? `lesson22-content--${pulse}` : ''}`}>
      <div className="lesson22-progress" aria-label={`Tiến trình tự học Bài ${topic.number}`}>
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
            <h3>{`Bài ${topic.number}: ${topic.shortLabel}`}</h3>
            <span>{lesson.context}</span>
            <button className="lesson22-primary" type="button" onClick={goNext}>Bắt đầu khám phá</button>
          </div>
          <div className="lesson22-lab" aria-hidden="true">
            <div className="lesson22-wire" />
            <div className="lesson22-bulb"><span /></div>
            <div className="lesson22-battery">{lesson.formula}</div>
          </div>
        </section>
      )}

      {currentStep === 1 && (
        <section className="lesson22-stage">
          <p>Dự đoán nhanh</p>
          <h3>{lesson.leadQuestion}</h3>
          <div className="lesson22-choice-grid">
            {lesson.predictionOptions.map((option, index) => (
              <button
                className={
                  prediction === index
                    ? index === lesson.predictionAnswer
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
          {prediction !== null && prediction !== lesson.predictionAnswer && <p className="lesson22-feedback lesson22-feedback--wrong">Chưa đúng. Hãy chọn ý gắn trực tiếp với hiện tượng hoặc công thức của bài.</p>}
          {prediction === lesson.predictionAnswer && <p className="lesson22-feedback lesson22-feedback--correct">{lesson.predictionFeedback}</p>}
        </section>
      )}

      {currentStep === 2 && (
        <section className="lesson22-stage">
          <p>Trong khi học</p>
          <h3>Chọn công thức trung tâm của bài</h3>
          <div className="lesson22-formula-panel">
            <div className="lesson22-formula">{lesson.formula}</div>
            <span>{lesson.formulaNote}</span>
          </div>
          <div className="lesson22-choice-grid lesson22-choice-grid--compact">
            {lesson.formulaOptions.map((option, index) => (
              <button
                className={
                  formulaChoice === index
                    ? index === lesson.formulaAnswer
                      ? 'lesson22-card-choice lesson22-card-choice--correct'
                      : 'lesson22-card-choice lesson22-card-choice--wrong'
                    : 'lesson22-card-choice'
                }
                key={option}
                onClick={() => handleFormulaChoice(index)}
                type="button"
              >
                <strong>{option}</strong>
                <span>{index === lesson.formulaAnswer ? 'Đúng công thức cần nhớ.' : 'Hãy đối chiếu lại ý nghĩa các đại lượng.'}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {currentStep === 3 && (
        <section className="lesson22-stage">
          <p>Kết nối kiến thức</p>
          <h3>{lesson.connectTitle}</h3>
          <div className="lesson22-metal">
            <div className="lesson22-current-arrow">Ý chính →</div>
            <div className="lesson22-electrons">
              <span>1</span><span>2</span><span>3</span><span>4</span>
            </div>
            <div className="lesson22-electron-arrow">← Vận dụng</div>
          </div>
          <p className="lesson22-note">{lesson.connectNote}</p>
          <div className="lesson22-choice-grid lesson22-choice-grid--compact">
            {[
              'Em đã đọc ý chính và sẵn sàng vận dụng.',
              'Em bỏ qua ý chính và muốn đoán đáp án.',
            ].map((option, index) => (
              <button
                className={
                  connectionChoice === index
                    ? index === 0
                      ? 'lesson22-card-choice lesson22-card-choice--correct'
                      : 'lesson22-card-choice lesson22-card-choice--wrong'
                    : 'lesson22-card-choice'
                }
                key={option}
                onClick={() => handleConnectionChoice(index)}
                type="button"
              >
                <strong>{index === 0 ? 'Sẵn sàng' : 'Chưa chắc'}</strong>
                <span>{option}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {currentStep === 4 && (
        <section className="lesson22-stage">
          <p>Vận dụng thực tế</p>
          <h3>{lesson.applyPrompt}</h3>
          <div className="lesson22-real-card">
            <strong>{lesson.formula}</strong>
            <span>Nhập đáp án ngắn. Nếu sai, hệ thống sẽ đưa gợi ý để em tự sửa trước khi đi tiếp.</span>
          </div>
          <div className="lesson22-answer-row">
            <input
              value={applyAnswer}
              onChange={(event) => setApplyAnswer(event.target.value)}
              placeholder={lesson.applyPlaceholder}
            />
            <button type="button" onClick={handleApplyCheck}>Kiểm tra</button>
          </div>
          {applyFeedback === 'wrong' && <p className="lesson22-feedback lesson22-feedback--wrong">{lesson.applyWrong}</p>}
          {applyFeedback === 'correct' && <p className="lesson22-feedback lesson22-feedback--correct">{lesson.applyCorrect}</p>}
        </section>
      )}

      {currentStep === 5 && (
        <section className="lesson22-stage">
          <p>Sau khi học</p>
          <h3>Hoàn thành 3 câu để mở tổng kết</h3>
          <div className="lesson22-quiz">
            {lesson.quiz.map((item, questionIndex) => {
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
                        name={`${topic.id}-${item.id}`}
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
            <strong>{answeredCount}/{lesson.quiz.length} câu đã trả lời, đúng {correctCount}/{lesson.quiz.length} câu.</strong>
          </div>
          <button className="lesson22-primary" disabled={answeredCount < lesson.quiz.length} type="button" onClick={goNext}>Sang phần tổng kết</button>
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
              <strong>{`Tổng kết Bài ${topic.number}`}</strong>
              {lesson.summary.map((point) => (
                <p key={point}>{point}</p>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}

export function Lesson22Content({ onAction }) {
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

function FeatureDialog({ content, onClose, onAction }) {
  const studyTopic = topics.find((topic) => topic.id === content.lessonId)
  const hasSelfStudyLesson = studyTopic && selfStudyLessons[studyTopic.id]

  return (
    <section className={hasSelfStudyLesson ? 'feature-dialog feature-dialog--lesson' : 'feature-dialog'} aria-live="polite" aria-label={content.title}>
      <button className="dialog-close" type="button" aria-label="Đóng" onClick={onClose}>
        ×
      </button>
      <p>Chức năng</p>
      <h2>{content.title}</h2>
      <span>{content.body}</span>
      {hasSelfStudyLesson && <SelfStudyLessonContent key={studyTopic.id} topic={studyTopic} onAction={onAction} />}
      {content.branches?.length > 0 && (
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
      <div className="dialog-actions">
        {content.actions.map((action) => (
          <button key={action} type="button" onClick={() => onAction(action)}>
            {action}
          </button>
        ))}
      </div>
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
      ? featureContent[activeFeature]
      : null
  const topicProgressList = topics.map((topic) => getTopicProgress(memory, topic.id))
  const completedLessons = topicProgressList.filter((progress) => progress >= 100).length
  const inProgressLessons = topicProgressList.filter((progress) => progress > 0 && progress < 100).length
  const notStartedLessons = topics.length - completedLessons - inProgressLessons
  const averageLessonProgress = Math.round(
    topicProgressList.reduce((total, progress) => total + progress, 0) / topics.length,
  )
  const studyHours = Math.floor((memory.studyMinutes || 0) / 60)
  const studyMinutes = (memory.studyMinutes || 0) % 60
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
            body: `Điểm kinh nghiệm: ${memory.experience || 0}. Chuỗi học hiện tại: ${memory.streak || 0}. Huy hiệu đã đạt: ${memory.badges || 0}.`,
          }
        : activeFeature === 'badges'
          ? {
              ...activeContent,
              body: `Bạn đang có ${memory.badges || 0} huy hiệu. Học và trả lời đúng để mở thêm huy hiệu mới trong ngày.`,
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
                <div className="progress-ring">
                  <span>{`${averageLessonProgress}%`}</span>
                </div>
                <div className="progress-legend">
                  <span><i className="dot dot-green" />Đã hoàn thành: {completedLessons} bài</span>
                  <span><i className="dot dot-orange" />Đang học: {inProgressLessons} bài</span>
                  <span><i className="dot dot-purple" />Chưa học: {notStartedLessons} bài</span>
                </div>
              </div>
              <p className="study-time">Thời gian học: {studyHours} giờ {studyMinutes} phút</p>
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
                  <strong>{memory.experience || 0}</strong>
                  <span>Điểm kinh nghiệm</span>
                </button>
                <button type="button" onClick={() => openFeature('achievements')}>
                  <Icon name="flame" />
                  <strong>{memory.streak || 0}</strong>
                  <span>Ngày học liên tục</span>
                </button>
                <button type="button" onClick={() => openFeature('badges')}>
                  <Icon name="shield" />
                  <strong>{memory.badges || 0}</strong>
                  <span>Huy hiệu</span>
                </button>
              </div>
              <div className="badge-heading">
                <h3>Huy hiệu</h3>
                <button type="button" onClick={() => openFeature('badges')}>Xem tất cả</button>
              </div>
              <div className="badge-row">
                <button className="badge badge-bronze" type="button" onClick={() => openFeature('badges')}>
                  <Icon name="shield" />
                  <span>Khám phá</span>
                </button>
                <button className="badge badge-silver" type="button" onClick={() => openFeature('badges')}>
                  <Icon name="star" />
                  <span>Kiên trì</span>
                </button>
                <button className="badge badge-purple" type="button" onClick={() => openFeature('badges')}>
                  <Icon name="bolt" />
                  <span>Tự học tốt</span>
                </button>
              </div>
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
          onAction={handleDialogAction}
          onClose={() => setActiveFeature(null)}
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
