import { Category } from '@/features/categories/types';

export interface Budget {
  id: string;
  created_at: string;
  category: Category;
  amount: number;
  amount_spent: number;
  start_date: string;
  end_date: string;
  status: string;
  spent_percentage: string;
}
