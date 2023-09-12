import { AdminCreateProduct } from "./AdminCreateProduct";
import { AdminProductList } from "./AdminProductList";
import ProductService from "./product.service";

const productServiceObj = new ProductService();

export { AdminProductList, AdminCreateProduct, productServiceObj };
