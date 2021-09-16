
import faker from 'faker';
export const channelList = [...Array(4).keys()].map((item) => ({
  key: item + '',
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  message: faker.commerce.productDescription(),
  image: faker.internet.avatar(),
}));
