import { AdminCreateCategory } from "./AdminCreateCategory";
import { AdminCategoryList } from "./AdminCategoryList";
import { AdminUpdateCategory } from "./AdminUpdateCategory";
import CategoryService from "./category.service";

const categoryServiceObj = new CategoryService();

export {
  AdminCreateCategory,
  AdminCategoryList,
  AdminUpdateCategory,
  categoryServiceObj,
};
