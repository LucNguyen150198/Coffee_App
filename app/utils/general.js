import moment from 'moment';

export const getMomentInDay = () => {
  const currDate = new Date();
  const currHours = currDate.getHours();
  if (currHours < 12) {
    return 'morning';
  }
  if (currHours >= 12 && currHours <= 17) {
    return 'afternoon';
  }
  return 'evening';
};

export const getWeekDays = (date = moment()) => {
  const now_date = moment();
  const current_date = moment(date);
  const begin = current_date.startOf('week');
  let days = [];
  for (let index = 0; index < 7; index++) {
    const day_of_week = {
      name: begin.format('ddd'),
      day: begin.format('D'),
      day_formatted: begin.format('DD/MM'),
      key: index,
    };
    days = [...days, day_of_week];
    begin.add(1, 'd');
  }
  return days;
};
