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
