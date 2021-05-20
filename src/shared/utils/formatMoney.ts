const formatMoney = (money: number, currency = 'USD', locale = 'en-US') => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency })
    .format(money)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default formatMoney;
