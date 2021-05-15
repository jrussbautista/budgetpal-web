const formatMoney = (money: number, currency = '$') => {
  return (
    currency +
    money
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  );
};

export default formatMoney;
