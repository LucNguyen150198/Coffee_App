import faker from 'faker';
export const notificationList = [...Array(10).keys()].map((item) => ({
  key: item + '',
  name: 'Offer',
  title: faker.commerce.productName(),
  content: faker.commerce.productDescription(),
  unread: faker.datatype.boolean(),
}));
