import { Budget } from '@/features/budgets/types/Budget';
import { Transaction } from '@/features/transactions/types/Transaction';

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
