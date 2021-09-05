import { Images } from '../constants';
import faker from 'faker';

const data = [
  {
    id: 1,
    name: 'Black Coffee',
    price: 25_000,
    description:
      'Một tách cà phê "tươi" nguyên chất, không tẩm trộn, không phối hương, cà phê đen The Cups Coffee chính là hương vị mà bất cứ ai đặt chân đến Đà Nẵng đều nên thử qua.',
    image: Images.cafe_back,
    type: 'Coffee',
  },
  {
    id: 2,
    name: 'Popcorn coffee macchiato',
    price: 39_000,
    description: 'Popcorn coffee macchiato',
    image: Images.cafe_bap,
    type: 'Coffee',
  },
  {
    id: 3,
    name: 'Choco Coffee',
    price: 49_000,
    description: 'Choco Coffee',
    image: Images.cafe_choco,
    type: 'Coffee',
  },
  {
    id: 4,
    name: 'Cold Brew Coffee',
    price: 59_000,
    description:
      'Không bị ‘cưỡng ép’ bởi nhiệt độ và thời gian, Cold Brew luôn giữ lại được những đặc tính đặc trưng nhất của cà phê. Tại The Cups Coffee, ly Cold Brew Coffee sẽ trở nên thú vị hơn bao hết nhờ sự kết hợp của hương cam nồng nàn.',
    image: Images.cafe_coldbrew,
    type: 'Coffee',
  },
  {
    id: 5,
    name: 'Nitro Coffee',
    price: 65_000,
    description:
      'Được pha chế bằng phương pháp sục khí nitơ vào cà phê Cold Brew thành phẩm, ly Nitro Cold Brew mang một lớp bọt béo giúp cà phê dày và mượt hơn trong miệng, còn được gọi bằng cái tên mỹ miều "cà phê bia".',
    image: Images.cafe_nitro,
    type: 'Coffee',
  },
  {
    id: 6,
    name: 'Vietnammese latte',
    price: 25_000,
    description:
      'Là cà phê sữa đá được pha theo phong cách của người Hoa, nhiều sữa ít cà phê, hương vị Bạc xỉu The Cups Coffee thơm ngậy mà vẫn nồng nàn hương cafe dành cho các bạn không thích uống đen đá hay nâu đá.',
    image: Images.bac_xiu,
    type: 'Coffee',
  },
  {
    id: 7,
    name: 'Lime tea',
    price: 39_000,
    description:
      'Vị chua ngọt của chanh quyện với hương thơm đặc biệt từ sả tắc, trà chanh sả tắc không những thơm ngon mà còn giúp cơ thể thanh lọc giải nhiệt, xua tan mệt mỏi sau một ngày làm việc căng thẳng.',
    image: Images.tea_lemon,
    type: 'Tea',
  },
  {
    id: 8,
    name: 'Oolong tea with lotus seed',
    price: 39_000,
    description: 'Oolong tea with lotus seed',
    image: Images.tea_olong,
    type: 'Tea',
  },
  {
    id: 9,
    name: 'OOlong tea with white pearl',
    price: 39_000,
    description: 'OOlong tea with white pearl',
    image: Images.tea_olong_tran_chau,
    type: 'Tea',
  },
  {
    id: 10,
    name: 'Peach tea mania',
    price: 39_000,
    description:
      'Là vedette của dòng trà trái cây đẹp dáng sáng da, trà đào luôn mang nét tươi ngon, sự sảng khoái mà không thức uống nào có thể thay thế được.',
    image: Images.tea_peach,
    type: 'Tea',
  },
  {
    id: 11,
    name: 'Rose Lychee tea',
    price: 39_000,
    description:
      'Những lát vải tươi nhai sần sật, dai dai, tan dần trong miệng hòa cùng nước trà hoa hồng đậm đà, Trà vải Hoa hồng - The Cups Coffee sẽ tạo nên những dư vị trên cả tuyệt vời.',
    image: Images.tea_rose,
    type: 'Tea',
  },

  {
    id: 12,
    name: 'Passion fruit soda',
    price: 49_000,
    description:
      'Đi đầu trong dòng soda, đây là món thức uống được nhiều người yêu thích với hương chanh dây thơm thơm, chua chua ngọt ngọt không bị chán.',
    image: Images.soda_chanh_day,
    type: 'Soda',
  },
  {
    id: 13,
    name: 'Raspberry soda',
    price: 49_000,
    description:
      'Soda phúc bồn tử thơm mát, màu sắc hồng tươi hấp dẫn mà bất cứ ai cũng sẽ thích mê chỉ trong lần đầu thưởng thức, ngoài ra còn giúp giải nhiệt cực tốt trong những ngày hè oi bức.',
    image: Images.soda_phuc_bon_tu,
    type: 'Soda',
  },

  {
    id: 14,
    name: 'Blueberry soda',
    price: 39_000,
    description:
      'Vị soda tươi được pha chế trực tiếp, thêm chút hương việt quất thơm thơm, chỉ cần nhấp một ngụm là đã thấy “mát lạnh tức thì”, đảm bảo “bật tung năng lượng" để đương đầu với deadline đang chờ!',
    image: Images.soda_viet_quat,
    type: 'Soda',
  },
  {
    id: 15,
    name: 'Milk Coffee',
    price: 25_000,
    description:
      'Từ những hạt cà phê chín mọng được chọn lọc kĩ càng, pha bằng máy rồi kết hợp cùng sữa đặc, đây là thức uống luôn nằm trong top những món được ưa chuộng nhất tại The Cups Coffee.',
    image: Images.milk_cafe,
    type: 'Coffee',
  },
  {
    id: 16,
    name: 'Passion fruit yogurt',
    price: 49_000,
    description:
      'Là thức uống thơm ngon mà cả đầu lưỡi lẫn dàn da đều ưa thích, yogurt chanh dây kết hợp hoàn hảo giữa chanh dây chua thanh và sữa chua trắng mịn, tạo nên tổng thể đượm hương thanh mát, có chút béo ngọt, càng ăn càng ghiền.',
    image: Images.yogurt_chanh_day,
    type: 'Yogurt',
  },
  {
    id: 17,
    name: 'Raspberry Yogurt',
    price: 49_000,
    description:
      'Được ủ theo công thức riêng và giám sát chặt chẽ trong từng quy trình, The Cups Coffee mang đến một ly yogurt thơm hương phúc bồn tử ngon mịn, chuẩn cả về hương vị lẫn chất lượng, thơm ngon lại cực tốt cho sức khoẻ.',
    image: Images.yogurt_phuc_bon_tu,
    type: 'Yogurt',
  },
  {
    id: 18,
    name: 'Blueberry yogurt',
    price: 49_000,
    description:
      'Hương việt quất thoảng ngọt kết hợp với sữa chua ngon mịn, mang đến sự hoà quyện vị giác độc đáo mà ít ai có thể cưỡng lại.',
    image: Images.yogurt_viet_quat,
    type: 'Yogurt',
  },

  {
    id: 19,
    name: 'Caramel coffee frappe',
    price: 49_000,
    description:
      'ét nồng nàn của cà phê sánh đôi hoàn hảo với caramel ngọt ngào, đệm thêm một chút béo ngậy của sữa và kem tươi, ngọt đậm mà hòa nhã, chính là dư vị mà bạn đang kiếm tìm.',
    image: Images.ice_cafe,
    type: 'Ice blended',
  },

  {
    id: 20,
    name: 'Chocolate frappe',
    price: 49_000,
    description:
      'Vị sô-cô-la ngọt ngào kích thích vị giác nay được kết hợp cùng đá xay mát mịn, đây chính là thức uống lí tưởng cho những buổi hẹn ngày hè.',
    image: Images.ice_choco,
    type: 'Ice blended',
  },
  {
    id: 21,
    name: 'Coconut coffee frappe',
    price: 49_000,
    description:
      'Vẫn đượm hương cà phê nồng nàn, nhưng với đá xay sánh mịn và nước cốt dừa tươi, ly Cà phê dừa đá xay The Cups Coffee đã loại bỏ hoàn toàn những hậu vị đắng thông thường, mang đến một tổng thể mới lạ, hoàn hảo khó cưỡng.',
    image: Images.ice_coconut_cafe,
    type: 'Ice blended',
  },
  {
    id: 22,
    name: 'Mango Frappe',
    price: 49_000,
    description: 'Mango Frappe',
    image: Images.ice_mango,
    type: 'Ice blended',
  },
  {
    id: 23,
    name: 'Matcha frappe',
    price: 49_000,
    description:
      'Matcha thanh, nhẫn, và đắng nhẹ được nhân đôi sảng khoái khi uống lạnh, lại được kết hợp với sự bùi-béo của kem và sữa, đem đến một trải nghiệm vị giác cực kì thú vị.',
    image: Images.ice_matcha,
    type: 'Ice blended',
  },
];

const levels = [
  {
    id: 1,
    label: '0%',
    value: 0,
  },
  {
    id: 2,
    label: '30%',
    value: 1,
  },
  {
    id: 3,
    label: '50%',
    value: 2,
  },
  {
    id: 4,
    label: '100%',
    value: 3,
  },
];

export const categories = [
  'All',
  'Coffee',
  'Tea',
  'Ice blended',
  'Soda',
  'Yogurt',
];

export const productList = data.map((item, index) => {
  return {
    ...item,
    qty: 1,
    rating: `${faker.datatype.number(5) + 20 / 10}`,
    options: {
      level_of_ice: levels,
      level_of_sweet: levels,
    },
  };
});

export const bookAgainList = faker.helpers.shuffle(data).map((item, index) => ({
  ...item,
  rating: `${faker.datatype.number(5) + 20 / 10}`,
  qty: 1,
  options: {
    level_of_ice: levels,
    level_of_sweet: levels,
  },
}));

export const recommendedList = faker.helpers
  .shuffle(productList)
  .filter((item) => item.rating > 4)
  .slice(0, 4);

export const banners = [
  { image: Images.banner1 },
  { image: Images.banner2 },
  { image: Images.banner3 },
];
