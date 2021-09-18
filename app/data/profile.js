import faker from 'faker';

export const profile = {
  rating: `${faker.datatype.number(5) + 100}`,
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  phone_number: faker.phone.phoneNumber(),
  image: faker.internet.avatar(),
};

export const settingList = [
  {
    key: 1,
    name: 'Account',
  },
  {
    key: 2,
    name: 'Setting',
  },
  { key: 3, name: 'Support' },
  { key: 4, name: 'Privacy and Policy' },
];
