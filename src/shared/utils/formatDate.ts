import { format, parseISO } from 'date-fns';

const formatDate = (startDate: string) => {
  return format(parseISO(startDate), 'MMMM d, yyyy');
};

export default formatDate;
