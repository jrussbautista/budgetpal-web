import { Category } from '@/features/categories/types';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: Category;
  happened_on: string;
  created_at: string;
}
