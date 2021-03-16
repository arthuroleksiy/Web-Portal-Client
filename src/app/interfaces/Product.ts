export interface Product {
  productId: number;
  productName: string;
  categoryId: number;
  categoryName: string;
  availableQuantity: number;
  price: number;
  description: string;
  createDate: Date;
  productSizeId: number;
  productSize: string;
}
