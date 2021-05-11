interface Analytics {
  name: string;
  value: number;
}

export interface Dashboard {
  analytics: Analytics[];
  date: string;
}
