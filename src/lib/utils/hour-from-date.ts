export const getHourFromDate = (date: string) => {
  const dateTmp = new Date(date);
  const hour = dateTmp.getHours();
  return hour;
};
