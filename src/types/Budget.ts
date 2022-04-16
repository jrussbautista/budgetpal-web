import { Category } from './Category';

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

export interface ManageBudgetFields {
  amount: number;
  category_id: string;
  start_date: string;
  end_date: string;
}
