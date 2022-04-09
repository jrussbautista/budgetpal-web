import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import formatDate from 'utils/formatDate';
import getDateRanges from 'utils/getDateRanges';

import SelectDateRangeModal from '.';

test('should shows date ranges', () => {
  const onClose = jest.fn();

  const onSelectDateRange = jest.fn();

  const dateRanges = getDateRanges();

  render(
    <SelectDateRangeModal show={true} onClose={onClose} onSelectDateRange={onSelectDateRange} />
  );

  dateRanges.forEach((dateRange) => {
    const dateRangeButtonName = `${dateRange.label} ${formatDate(
      dateRange.start_date
    )} - ${formatDate(dateRange.end_date)}`;
    const dateRangeButton = screen.getByRole('button', {
      name: dateRangeButtonName,
    });

    userEvent.click(dateRangeButton);

    expect(onSelectDateRange).toHaveBeenCalledWith(dateRange);
  });
});
