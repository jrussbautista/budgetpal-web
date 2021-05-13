import { Category } from './../../shared/models/Category';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: Category;
  created_at: string;
}
