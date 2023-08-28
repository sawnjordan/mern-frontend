import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminCreateBanner } from "./pages/cms/admin/component/AdminCreateBanner";
import { AdminDashboard } from "./pages/cms/admin/component/AdminDashboard";
import { AdminLayout } from "./pages/cms/admin/layout/AdminLayout";
import { ForgotPassword } from "./pages/home/auth/ForgotPassword";
import { LoginPage } from "./pages/home/auth/LoginPage";
import { RegisterPage } from "./pages/home/auth/RegisterPage";
import { CategoryList } from "./pages/home/category/CategoryList";
import { CategoryProductList } from "./pages/home/category/CategoryProductList";
import { HomePageLayout } from "./pages/home/landing/HomePageLayout";
import { LandingPage } from "./pages/home/landing/LandingPage";
import { CheckPermission } from "./pages/routing/CheckPermission";

export const Routing = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePageLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="categories" element={<CategoryList />} />
            <Route
              path="category/:categorySlug"
              element={<CategoryProductList />}
            />
          </Route>
          <Route
            path="/admin"
            element={
              <CheckPermission Component={<AdminLayout />} role="admin" />
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="banner/create" element={<AdminCreateBanner />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};