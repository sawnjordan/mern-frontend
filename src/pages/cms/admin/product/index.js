import { AdminCreateProduct } from "./AdminCreateProduct";
import { AdminProductList } from "./AdminProductList";
import { AdminUpdateProduct } from "./AdminUpdateProduct";
import ProductService from "./product.service";

const productServiceObj = new ProductService();

export {
  AdminProductList,
  AdminCreateProduct,
  AdminUpdateProduct,
  productServiceObj,
};
