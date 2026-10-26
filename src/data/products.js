// Dữ liệu mẫu — thay bằng API thật khi có backend
export const CATEGORIES = [
  { id: 'dog', name: 'Chó', count: '1.240+ sản phẩm', bg: '#FFE7A3', tagline: 'Từ cún con đến chó già, giống nhỏ đến giống lớn', subs: ['Hạt khô', 'Pate', 'Bánh thưởng', 'Chó con'] },
  { id: 'cat', name: 'Mèo', count: '980+ sản phẩm', bg: '#C9F0F5', tagline: 'Cho hoàng thượng kén ăn, mèo con và mèo trong nhà', subs: ['Hạt khô', 'Pate', 'Súp thưởng', 'Mèo con'] },
]

export const TYPES = [
  { id: 'all', name: 'Tất cả' },
  { id: 'food', name: 'Hạt khô' },
  { id: 'pate', name: 'Pate & súp' },
  { id: 'snack', name: 'Bánh thưởng' },
]

const w = (base, list) => list.map(([label, k]) => ({ label, price: Math.round((base * k) / 1000) * 1000 }))

export const PRODUCTS = [
  {
    id: 'p1', name: 'Hạt Canimé Gà & Gạo lứt cho chó trưởng thành', short: 'Gà & Gạo lứt', line: 'ADULT',
    pet: 'dog', type: 'food', pack: 'bag', color: '#9B111E', accent: '#FFC000',
    price: 285000, oldPrice: 330000, rating: 4.9, reviews: 1240, sold: '12,4k', badge: 'Bán chạy', best: true,
    weights: w(285000, [['1.5kg', 1], ['3kg', 1.85], ['7kg', 3.9]]),
    desc: 'Công thức thịt gà tươi là thành phần số 1, kết hợp gạo lứt dễ tiêu hoá giúp bé no lâu, lông mượt và đi tiêu đẹp. Không phẩm màu, không chất bảo quản nhân tạo.',
    ingredients: ['Thịt gà tươi 32%', 'Gạo lứt', 'Yến mạch', 'Dầu cá hồi', 'Bí đỏ', 'Vitamin E tự nhiên'],
  },
  {
    id: 'p2', name: 'Hạt Canimé Puppy Sữa dê cho chó con', short: 'Puppy Sữa dê', line: 'PUPPY',
    pet: 'dog', type: 'food', pack: 'bag', color: '#FFC000', accent: '#9B111E',
    price: 320000, rating: 4.8, reviews: 860, sold: '8,1k', badge: 'Mới', best: true,
    weights: w(320000, [['1.5kg', 1], ['3kg', 1.85], ['7kg', 3.9]]),
    desc: 'Hạt nhỏ mềm cho chó con 2–12 tháng. Bổ sung sữa dê, DHA và canxi giúp phát triển trí não, xương và răng chắc khoẻ.',
    ingredients: ['Thịt gà 28%', 'Sữa dê', 'DHA từ dầu cá', 'Canxi', 'Khoai lang', 'Prebiotic'],
  },
  {
    id: 'p3', name: 'Hạt Canimé Cá hồi Omega cho chó da nhạy cảm', short: 'Cá hồi Omega', line: 'SENSITIVE',
    pet: 'dog', type: 'food', pack: 'bag', color: '#00B7CD', accent: '#FFF8E7',
    price: 345000, oldPrice: 399000, rating: 4.9, reviews: 702, sold: '6,3k', best: true,
    weights: w(345000, [['1.5kg', 1], ['3kg', 1.85], ['7kg', 3.9]]),
    desc: 'Cá hồi Na Uy giàu Omega 3–6 giúp giảm ngứa, rụng lông và hỗ trợ làn da nhạy cảm. Không chứa ngũ cốc gây dị ứng.',
    ingredients: ['Cá hồi 30%', 'Khoai tây', 'Đậu Hà Lan', 'Dầu cá', 'Hạt lanh', 'Biotin'],
  },
  {
    id: 'p4', name: 'Hạt Canimé Bò & Rau củ cho chó giống nhỏ', short: 'Bò & Rau củ', line: 'SMALL BREED',
    pet: 'dog', type: 'food', pack: 'bag', color: '#8C482D', accent: '#FFC000',
    price: 299000, rating: 4.7, reviews: 433, sold: '4,2k', best: true,
    weights: w(299000, [['1.5kg', 1], ['3kg', 1.85], ['7kg', 3.9]]),
    desc: 'Hạt size mini cho Poodle, Phốc, Corgi. Thịt bò giàu đạm cùng rau củ tươi cho bé năng động cả ngày.',
    ingredients: ['Thịt bò 26%', 'Cà rốt', 'Đậu xanh', 'Gạo', 'Dầu hướng dương', 'Kẽm'],
  },
  {
    id: 'p5', name: 'Pate Canimé Gà xé sợi cho chó', short: 'Pate Gà xé', line: 'PATE',
    pet: 'dog', type: 'pate', pack: 'can', color: '#9B111E', accent: '#FFF8E7',
    price: 45000, rating: 4.8, reviews: 512, sold: '15k',
    weights: w(45000, [['Lon 400g', 1], ['Lốc 6 lon', 5.6], ['Thùng 24 lon', 21]]),
    desc: 'Gà xé sợi trong nước dùng xương hầm, kích thích vị giác cho bé biếng ăn. Có thể trộn chung với hạt.',
    ingredients: ['Thịt gà 60%', 'Nước hầm xương', 'Bí đỏ', 'Taurine'],
  },
  {
    id: 'p6', name: 'Bánh thưởng Canimé Xương sữa sạch răng', short: 'Xương sữa', line: 'SNACK',
    pet: 'dog', type: 'snack', pack: 'pouch', color: '#FFC000', accent: '#8C482D',
    price: 79000, rating: 4.6, reviews: 288, sold: '3,9k', badge: '-15%', oldPrice: 93000,
    weights: w(79000, [['Túi 200g', 1], ['Túi 500g', 2.3]]),
    desc: 'Bánh xương giòn giúp làm sạch mảng bám, thơm miệng. Phần thưởng hoàn hảo khi huấn luyện.',
    ingredients: ['Sữa bò', 'Bột gạo', 'Bạc hà', 'Canxi'],
  },
  {
    id: 'p7', name: 'Hạt Canimé Cá ngừ cho mèo trưởng thành', short: 'Cá ngừ', line: 'CAT ADULT',
    pet: 'cat', type: 'food', pack: 'bag', color: '#00B7CD', accent: '#9B111E',
    price: 265000, oldPrice: 299000, rating: 4.9, reviews: 1033, sold: '10,8k', badge: 'Bán chạy', best: true,
    weights: w(265000, [['1.2kg', 1], ['2.5kg', 1.9], ['6kg', 4.2]]),
    desc: 'Cá ngừ đại dương giàu đạm và taurine cho mắt sáng, tim khoẻ. Giảm búi lông nhờ chất xơ tự nhiên.',
    ingredients: ['Cá ngừ 34%', 'Gà sấy', 'Gạo', 'Taurine', 'Chất xơ củ cải đường'],
  },
  {
    id: 'p8', name: 'Hạt Canimé Kitten Gà & Sữa cho mèo con', short: 'Kitten Gà', line: 'KITTEN',
    pet: 'cat', type: 'food', pack: 'bag', color: '#FFF8E7', accent: '#9B111E',
    price: 289000, rating: 4.8, reviews: 540, sold: '5,7k', best: true,
    weights: w(289000, [['1.2kg', 1], ['2.5kg', 1.9], ['6kg', 4.2]]),
    desc: 'Hạt siêu nhỏ cho mèo con 1–12 tháng, dễ nhai, giàu DHA và kháng thể từ sữa non.',
    ingredients: ['Thịt gà 30%', 'Sữa non', 'DHA', 'Trứng', 'Vitamin A'],
  },
  {
    id: 'p9', name: 'Pate Canimé Cá thu cho mèo', short: 'Pate Cá thu', line: 'PATE',
    pet: 'cat', type: 'pate', pack: 'pouch', color: '#8C482D', accent: '#00B7CD',
    price: 32000, rating: 4.7, reviews: 690, sold: '20k',
    weights: w(32000, [['Gói 85g', 1], ['Hộp 12 gói', 11]]),
    desc: 'Pate mềm mịn từ cá thu tươi, bổ sung nước cho mèo lười uống.',
    ingredients: ['Cá thu 55%', 'Nước', 'Taurine', 'Dầu cá'],
  },
  {
    id: 'p10', name: 'Súp thưởng Canimé Catnip vị gà', short: 'Súp Catnip', line: 'TREAT',
    pet: 'cat', type: 'snack', pack: 'pouch', color: '#9B111E', accent: '#FFC000',
    price: 99000, rating: 4.9, reviews: 1500, sold: '18k', badge: 'Hot',
    weights: w(99000, [['20 thanh', 1], ['50 thanh', 2.3]]),
    desc: 'Súp kem dạng thanh, mèo nào cũng mê. Có catnip giúp bé thư giãn.',
    ingredients: ['Thịt gà 70%', 'Catnip', 'Inulin', 'Vitamin E'],
  },
  {
    id: 'p11', name: 'Hạt Canimé Indoor kiểm soát búi lông cho mèo', short: 'Indoor Hairball', line: 'INDOOR',
    pet: 'cat', type: 'food', pack: 'bag', color: '#8C482D', accent: '#FFC000',
    price: 279000, oldPrice: 315000, rating: 4.8, reviews: 476, sold: '4,6k', best: true,
    weights: w(279000, [['1.2kg', 1], ['2.5kg', 1.9], ['6kg', 4.2]]),
    desc: 'Dành cho mèo nuôi trong nhà, ít vận động. Chất xơ tự nhiên giúp đẩy búi lông ra ngoài, kiểm soát cân nặng và giảm mùi phân.',
    ingredients: ['Thịt gà 30%', 'Chất xơ psyllium', 'L-carnitine', 'Dầu cá', 'Taurine'],
  },
  {
    id: 'p12', name: 'Bánh thưởng Canimé Cá ngừ sấy giòn cho mèo', short: 'Cá ngừ sấy', line: 'TREAT',
    pet: 'cat', type: 'snack', pack: 'pouch', color: '#FFC000', accent: '#00B7CD',
    price: 65000, rating: 4.7, reviews: 352, sold: '6,2k', badge: '-20%', oldPrice: 81000,
    weights: w(65000, [['Túi 60g', 1], ['Túi 150g', 2.3]]),
    desc: 'Cá ngừ nguyên miếng sấy lạnh, giữ trọn mùi vị. Giòn nhẹ, giúp làm sạch răng, dùng làm phần thưởng hằng ngày.',
    ingredients: ['Cá ngừ 100%'],
  },
]

export const REVIEWS = [
  { name: 'Minh Thư', pet: 'Mochi · Corgi 2 tuổi', stars: 5, text: 'Bé nhà mình kén ăn mà đổ ra là ăn sạch bát. Lông mượt hẳn sau 3 tuần.' },
  { name: 'Quốc Bảo', pet: 'Mướp · mèo ta', stars: 5, text: 'Giao nhanh, đóng gói kỹ, có cả túi zip. Sẽ mua lại.' },
  { name: 'Thảo Vy', pet: 'Lu · Poodle', stars: 4, text: 'Hạt nhỏ vừa miệng, mùi thơm nhẹ không bị hắc.' },
]

export const formatVND = (n) => n.toLocaleString('vi-VN') + 'đ'
