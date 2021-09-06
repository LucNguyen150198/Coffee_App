export const calculateTotal = (data = []) => {
  const calculate = (previousValue, currentValue) => {
    return previousValue + currentValue?.qty * currentValue?.price;
  };
  return data.reduce(calculate, 0);
};

export const currency = (number) => {
  let price = number.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return price?.replace('₫', '');
};
