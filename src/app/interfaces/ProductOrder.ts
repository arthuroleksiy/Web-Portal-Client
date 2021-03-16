import {Product} from "../interfaces/Product";
export interface ProductOrder {
  product: Product;
  productId: number;
  quantity: number;
}
