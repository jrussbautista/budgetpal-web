import { Category } from './../../shared/models/Category';

export interface Budget {
  id: string;
  created_at: string;
  category: Category;
  amount: string;
  amount_spent: string;
  start_date: string;
  end_date: string;
  status: string;
}
