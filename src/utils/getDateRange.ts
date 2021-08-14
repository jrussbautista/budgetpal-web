import {
  formatISO,
  startOfMonth,
  endOfMonth,
  subMonths,
  subYears,
  startOfYear,
  endOfYear,
} from 'date-fns';

export const getStartAndEndDate = (range = 'month', value = 0) => {
  let date = new Date();
  let startDate = date;
  let endDate = date;

  switch (range) {
    case 'thisMonth':
      startDate = startOfMonth(date);
      endDate = endOfMonth(date);
      break;
    case 'lastMonth': {
      const subStartDate = subMonths(date, value);
      const subEndDate = subMonths(date, 1);
      startDate = startOfMonth(subStartDate);
      endDate = endOfMonth(subEndDate);
      break;
    }
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
