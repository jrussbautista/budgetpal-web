import {
  formatISO,
  startOfMonth,
  endOfMonth,
  subMonths,
  subYears,
  startOfYear,
  endOfYear,
} from 'date-fns';

export const getStartAndEndDate = (
  range: string = 'month',
  value: number = 0
) => {
  let date = new Date();
  let startDate = date;
  let endDate = date;

  switch (range) {
    case 'month':
      date = subMonths(date, value);
      startDate = startOfMonth(date);
      endDate = endOfMonth(date);
      break;
    case 'year':
      date = subYears(date, value);
      startDate = startOfYear(date);
      endDate = endOfYear(date);
      break;
  }

  const formattedStartedDate = formatISO(startDate, {
    representation: 'date',
  });

  const formattedEndDate = formatISO(endDate, {
    representation: 'date',
  });

  return {
    startDate: formattedStartedDate,
    endDate: formattedEndDate,
  };
};
