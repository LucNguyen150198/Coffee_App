import { productList } from './productList';
import faker from 'faker';
import moment from 'moment';
export const orderList = faker.helpers
  .shuffle(productList)
  .map((item, index) => ({
    // items: item,
    order_id :faker.datatype.uuid().slice(0,4),
    image: item.image,
    price: item.price * Math.floor(Math.random() * 2 + 5),
    createAt: moment().format('DD/MM/YYYY'),
    status: index % 2 ? 'processing' : 'complete',
  }))
  .slice(0, 7);
