import { Budget } from './Budget';
import { Transaction } from './Transaction';

interface Analytics {
  name: string;
  value: number;
}

export interface Dashboard {
  analytics: Analytics[];
  date: string;
  recentTransaction: Transaction;
  recentOnGoingBudget: Budget;
}
