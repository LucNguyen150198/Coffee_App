import { productList } from './productList';
import faker from 'faker';
import moment from 'moment';
export const orderList = faker.helpers
  .shuffle(productList)
  .map((item, index) => ({
    // items: item,
    shipper: {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      phone_number: faker.phone.phoneNumber(),
      image: faker.internet.avatar(),
      location: {
        latitude: +10.75888,
        longitude: +106.659126,
      },
    },
    shipping_address: {
      location: {
        latitude: +10.75475,
        longitude: +106.647537,
      },
    },
    order_id: faker.datatype.uuid().slice(0, 4),
    image: item.image,
    price: item.price * Math.floor(Math.random() * 2 + 5),
    createAt: moment().format('DD/MM/YYYY'),
    status: index % 2 ? 'processing' : 'success',
  }))
  .slice(0, 7);
