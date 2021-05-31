import { Transaction } from '../../transactions/TransactionModel';

const getTransactionByDay = (transactions: Transaction[], day: number) => {
  let amount = 0;
  let selected = false;
  let selectedDate = '';

  transactions.forEach((transaction) => {
    const date = new Date(transaction.happened_on).getDate();
    if (date === day) {
      amount += parseFloat(transaction.amount.toString());
      selectedDate = new Date(transaction.happened_on).toDateString();
      selected = true;
    }
  });

  if (selected) {
    return {
      amount,
      selectedDate,
    };
  }
};

export default getTransactionByDay;
