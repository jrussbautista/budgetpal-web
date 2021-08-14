export type Status = 'idle' | 'loading' | 'succeed' | 'failed';

export interface DateRange {
  label: string;
  start_date: string;
  end_date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  language: string;
  theme: string;
  currency: string;
  is_email_verified: boolean;
}
