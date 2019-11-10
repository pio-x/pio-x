export interface INotification {
  n_ID: number;
  t_ID: number|null;
  timestamp: number;
  title: string;
  text: string;
  read: boolean;
}
