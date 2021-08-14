const getFormattedDate = (initialDate: Date) => {
  const date = new Date(initialDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formatted = `${year}-${month}-${day}`;
  return formatted;
};

export default getFormattedDate;
