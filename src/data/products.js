// Dữ liệu sản phẩm Canimé — giá, thành phần, số liệu đánh giá là SỐ MẪU, sửa lại cho đúng thực tế
import imgChicko from '../assets/products/chicko.jpg'
import imgCaHoi from '../assets/products/cahoi.jpg'
import imgPhoMaiSua from '../assets/products/phomaisua.jpg'
import imgMixie from '../assets/products/mixie.jpg'
import imgPumpi from '../assets/products/pumpi.jpg'

export const CATEGORIES = [
  { id: 'dog', name: 'Chó', count: '5 vị bánh thưởng', bg: '#FFE7A3' },
  { id: 'cat', name: 'Mèo', count: '5 vị bánh thưởng', bg: '#C9F0F5' },
]

const w = (base, list) => list.map(([label, k]) => ({ label, price: Math.round((base * k) / 1000) * 1000 }))
const SIZES = [['Hũ 150g', 1], ['Hũ 300g', 1.8]]
const BOTH = ['dog', 'cat']

export const PRODUCTS = [
  {
    id: 'chicko', name: 'Chicko', short: 'Chicko', line: 'ỨC GÀ SẤY',
    image: imgChicko, pets: BOTH, pet: 'dog', type: 'snack', color: '#9B111E', accent: '#FFC000',
    price: 89000, oldPrice: 105000, rating: 4.9, reviews: 312, sold: '1,2k', badge: 'Bán chạy', best: true,
    weights: w(89000, SIZES),
    desc: 'Bánh thưởng làm từ 100% ức gà tươi, lọc bỏ da và xương, sấy khô giữ trọn vị ngọt tự nhiên. Không pha tạp, không phẩm màu, không chất bảo quản nhân tạo.',
    ingredients: ['100% ức gà tươi', 'Lọc bỏ da và xương', 'Không pha tạp', 'Không phẩm màu nhân tạo', 'Không chất bảo quản nhân tạo'],
    facts: [['Protein', 'Cao'], ['Chất béo', 'Thấp'], ['Thành phần', '1 loại'], ['Phẩm màu', 'Không'], ['Bảo quản', 'Tự nhiên']],
  },
  {
    id: 'cahoi', name: 'Cá Hồi', short: 'Cá Hồi', line: 'CÁ HỒI SẤY',
    image: imgCaHoi, pets: BOTH, pet: 'dog', type: 'snack', color: '#00B7CD', accent: '#9B111E',
    price: 109000, rating: 4.8, reviews: 204, sold: '860', best: true,
    weights: w(109000, SIZES),
    desc: 'Cá hồi phi lê sấy giòn, giàu Omega-3 giúp lông mượt và da khoẻ. Miếng nhỏ vừa miệng, dùng làm phần thưởng khi tập luyện.',
    ingredients: ['Cá hồi phi lê', 'Không phẩm màu nhân tạo', 'Không chất bảo quản nhân tạo'],
    facts: [['Protein', 'Cao'], ['Omega-3', 'Giàu'], ['Chất béo', 'Vừa'], ['Phẩm màu', 'Không'], ['Bảo quản', 'Tự nhiên']],
  },
  {
    id: 'phomaisua', name: 'Phô Mai Sữa', short: 'Phô Mai Sữa', line: 'PHÔ MAI SỮA',
    image: imgPhoMaiSua, pets: BOTH, pet: 'dog', type: 'snack', color: '#FFC000', accent: '#9B111E',
    price: 95000, rating: 4.9, reviews: 176, sold: '740', badge: 'Mới', best: true,
    weights: w(95000, SIZES),
    desc: 'Viên phô mai sữa thơm béo nhẹ, mềm vừa phải, hợp với bé thích vị sữa. Bổ sung canxi cho xương và răng chắc khoẻ.',
    ingredients: ['Phô mai', 'Sữa', 'Không phẩm màu nhân tạo', 'Không chất bảo quản nhân tạo'],
    facts: [['Canxi', 'Giàu'], ['Protein', 'Vừa'], ['Chất béo', 'Vừa'], ['Phẩm màu', 'Không'], ['Bảo quản', 'Tự nhiên']],
  },
  {
    id: 'mixie', name: 'Mixie', short: 'Mixie', line: 'MIX VỊ',
    image: imgMixie, pets: BOTH, pet: 'dog', type: 'snack', color: '#8C482D', accent: '#FFC000',
    price: 99000, oldPrice: 115000, rating: 4.8, reviews: 158, sold: '690', best: true,
    weights: w(99000, SIZES),
    desc: 'Hũ trộn nhiều vị trong một cho bé đổi khẩu vị mỗi ngày. Phù hợp làm quà hoặc để bé thử xem mình mê vị nào nhất.',
    ingredients: ['Ức gà sấy', 'Cá hồi sấy', 'Phô mai sữa', 'Không chất bảo quản nhân tạo'],
    facts: [['Protein', 'Cao'], ['Số vị', 'Nhiều'], ['Chất béo', 'Thấp'], ['Phẩm màu', 'Không'], ['Bảo quản', 'Tự nhiên']],
  },
  {
    id: 'pumpi', name: 'Pumpi', short: 'Pumpi', line: 'BÍ ĐỎ & GÀ',
    image: imgPumpi, pets: BOTH, pet: 'dog', type: 'snack', color: '#F2A500', accent: '#9B111E',
    price: 89000, rating: 4.7, reviews: 131, sold: '520', best: true,
    weights: w(89000, SIZES),
    desc: 'Bí đỏ nghiền kết hợp ức gà, giàu chất xơ hỗ trợ tiêu hoá. Vị ngọt nhẹ tự nhiên, ít béo, hợp với bé cần giữ dáng.',
    ingredients: ['Bí đỏ', 'Ức gà tươi', 'Không phẩm màu nhân tạo', 'Không chất bảo quản nhân tạo'],
    facts: [['Chất xơ', 'Giàu'], ['Protein', 'Vừa'], ['Chất béo', 'Thấp'], ['Phẩm màu', 'Không'], ['Bảo quản', 'Tự nhiên']],
  },
]

export const REVIEWS = [
  { name: 'Minh Thư', pet: 'Mochi · Corgi 2 tuổi', stars: 5, text: 'Bé nhà mình kén ăn mà đổ ra là ăn sạch bát. Lông mượt hẳn sau 3 tuần.' },
  { name: 'Quốc Bảo', pet: 'Mướp · mèo ta', stars: 5, text: 'Giao nhanh, hũ thuỷ tinh xinh lắm, mèo nhà mình mê vị Cá Hồi. Sẽ mua lại.' },
  { name: 'Thảo Vy', pet: 'Lu · Poodle', stars: 4, text: 'Miếng nhỏ vừa miệng, mùi thơm nhẹ không bị hắc, dùng tập lệnh rất tiện.' },
]

export const formatVND = (n) => n.toLocaleString('vi-VN') + 'đ'
