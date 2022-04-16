import { Category } from './Category';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: Category;
  happened_on: string;
  created_at: string;
}

export interface UpdateTransactionFields {
  title?: string;
  amount?: string;
  category_id?: string;
  type?: string;
  happened_on?: string;
}
