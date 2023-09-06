import { AdminCreateBrand } from "./AdminCreateBrand";
import { AdminBrandList } from "./AdminBrandList";
import { AdminUpdateBrand } from "./AdminUpdateBrand";
import BrandService from "./brand.service";

const brandServiceObj = new BrandService();

export { AdminCreateBrand, AdminBrandList, AdminUpdateBrand, brandServiceObj };
