import { Category } from './../../shared/models/Category';

export interface Budget {
  id: string;
  created_at: string;
  category: Category;
  amount: number;
  amount_spent: number;
}
