import { ProductOrder } from './ProductOrder';
import { Product } from './Product';
export interface Order {
      orderId: number;
      customerId: number;
      customerName: string;
      products: Array<ProductOrder>;
      statusId: number;
      statusName: string;
      totalOrderCost: number;
      orderDate: Date;
      comment: string;
}
