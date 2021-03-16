import { ProductOrder } from './ProductOrder';
export interface OutputOrder {
  orderId: number;
  customerId: number;
  customerName: string;
  customerAddress?: string;
  products: Array<ProductOrder>;
  statusId: number;
  statusName: string;
  totalOrderCost: number;
  orderDate: Date;
  comment: string;
}
