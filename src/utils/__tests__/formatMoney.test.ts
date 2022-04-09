import formatMoney from 'utils/formatMoney';

test('correctly format price with default currency', () => {
  expect(formatMoney(500)).toBe('$500.00');
  expect(formatMoney(4000)).toBe('$4,000.00');
});

test('correctly format price with different currency', () => {
  expect(formatMoney(600, 'PHP')).toBe('₱600.00');
  expect(formatMoney(10000, 'PHP')).toBe('₱10,000.00');
});
