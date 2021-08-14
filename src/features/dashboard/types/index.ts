import { Budget } from '@/features/budgets/types';
import { Transaction } from '@/features/transactions/types';

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
