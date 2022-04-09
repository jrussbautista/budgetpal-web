import { DateRange } from 'types';
import { getStartAndEndDate } from 'utils/getDateRange';

const getDateRanges = () => {
  const ranges: DateRange[] = [];

  const thisMonth = getStartAndEndDate('thisMonth');
  const lastMonth = getStartAndEndDate('lastMonth', 1);
  const last3Months = getStartAndEndDate('lastMonth', 3);
  const last6Months = getStartAndEndDate('lastMonth', 6);
  const thisYear = getStartAndEndDate('year');
  const lastYear = getStartAndEndDate('year', 1);

  ranges.push({
    label: 'This Month',
    start_date: thisMonth.startDate,
    end_date: thisMonth.endDate,
  });

  ranges.push({
    label: 'Last Month',
    start_date: lastMonth.startDate,
    end_date: lastMonth.endDate,
  });

  ranges.push({
    label: 'Last 3 Months',
    start_date: last3Months.startDate,
    end_date: last3Months.endDate,
  });

  ranges.push({
    label: 'Last 6 Months',
    start_date: last6Months.startDate,
    end_date: last6Months.endDate,
  });

  ranges.push({
    label: 'This Year',
    start_date: thisYear.startDate,
    end_date: thisYear.endDate,
  });

  ranges.push({
    label: 'Last Year',
    start_date: lastYear.startDate,
    end_date: lastYear.endDate,
  });

  return ranges;
};

export default getDateRanges;
