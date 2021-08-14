const formatMoney = (money: number, currency = 'USD', locale = 'en-US') => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(money);
};

export default formatMoney;
