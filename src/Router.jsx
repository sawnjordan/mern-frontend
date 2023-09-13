import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminLayout } from "./pages/cms/admin/layout/AdminLayout";
import { ForgotPassword } from "./pages/home/auth/ForgotPassword";
import { LoginPage } from "./pages/home/auth/LoginPage";
import { RegisterPage } from "./pages/home/auth/RegisterPage";
import { CategoryList } from "./pages/home/category/CategoryList";
import { CategoryProductList } from "./pages/home/category/CategoryProductList";
import { HomePageLayout } from "./pages/home/landing/HomePageLayout";
import { LandingPage } from "./pages/home/landing/LandingPage";
import { CheckPermission } from "./pages/routing/CheckPermission";
import { ActivateUser } from "./pages/home/auth/ActivateUser";
import { HomePageBanner } from "./pages/home/components/HomePageBanner";
import { NotFound } from "./pages/home/error/NotFound";
import { AdminDashboard } from "./pages/cms/admin/component/AdminDashboard";
import {
  AdminCreateBanner,
  AdminBannerList,
  AdminUpdateBanner,
} from "./pages/cms/admin/banner";
import {
  AdminCreateCategory,
  AdminCategoryList,
  AdminUpdateCategory,
} from "./pages/cms/admin/category";
import {
  AdminBrandList,
  AdminCreateBrand,
  AdminUpdateBrand,
} from "./pages/cms/admin/brand";
import {
  AdminUserList,
  AdminCreateUser,
  AdminUpdateUser,
} from "./pages/cms/admin/user";
import {
  AdminCreateProduct,
  AdminProductList,
  AdminUpdateProduct,
} from "./pages/cms/admin/product";
import { Provider } from "react-redux";
import { store } from "./store";
// import { AdminCreateBanner } from "./pages/cms/admin/banner/AdminCreateBanner";
// import { BannerList } from "./pages/cms/admin/banner/BannerList";

export const Routing = () => {
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePageLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="/activate/:token" element={<ActivateUser />} />

              <Route path="forgot-password" element={<ForgotPassword />} />
              {/* <Route path="banner" element={<HomePageBanner />} /> */}

              <Route path="categories" element={<CategoryList />} />
              <Route
                path="category/:categorySlug"
                element={<CategoryProductList />}
              />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route
              path="/admin"
              element={
                <CheckPermission Component={<AdminLayout />} role="admin" />
              }
            >
              <Route index element={<AdminDashboard />} />
              {/* Admin Banner Route */}
              <Route path="banner" element={<AdminBannerList />} />
              <Route path="banner/create" element={<AdminCreateBanner />} />
              <Route path="banner/:id" element={<AdminUpdateBanner />} />

              {/* Admin Brand Route */}
              <Route path="brand" element={<AdminBrandList />} />
              <Route path="brand/create" element={<AdminCreateBrand />} />
              <Route path="brand/:id" element={<AdminUpdateBrand />} />

              {/* Admin Category Route */}
              <Route path="category" element={<AdminCategoryList />} />
              <Route path="category/create" element={<AdminCreateCategory />} />
              <Route path="category/:id" element={<AdminUpdateCategory />} />

              {/* Admin User Route */}
              <Route path="user" element={<AdminUserList />} />
              <Route path="user/create" element={<AdminCreateUser />} />
              <Route path="user/:id" element={<AdminUpdateUser />} />

              {/* Admin Product Route */}
              <Route path="product" element={<AdminProductList />} />
              <Route path="product/create" element={<AdminCreateProduct />} />
              <Route path="product/:id" element={<AdminUpdateProduct />} />
              {/* <Route path="user/:id" element={<AdminUpdateUser />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};
