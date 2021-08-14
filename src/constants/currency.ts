interface KeyValue {
  title: string;
  locale: string;
}

interface Currency {
  [key: string]: KeyValue;
}

export const CURRENCIES: Currency = {
  USD: {
    title: 'U.S. Dollar',
    locale: 'en-US',
  },
  PHP: {
    title: 'Philippine Peso',
    locale: 'en-PH',
  },
};
