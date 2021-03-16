import { Order } from './Order';
export interface Customer {
  customerId: number;
  creationDate: Date;
  customerName: string;
  customerAddress: string;
  orders: Array<Order>;
  orderedCount: number;
  totalOrderCost: number;
  statusId: number;
  status: string;
  comment: string;
}
