import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LandingPage } from "./pages/home/landing/LandingPage";
import { LoginPage } from "./pages/home/auth/LoginPage";
import { HomePageLayout } from "./pages/home/landing/HomePageLayout";
import { RegisterPage } from "./pages/home/auth/RegisterPage";
import { CategoryProductList } from "./pages/home/category/CategoryProductList";
import { CategoryList } from "./pages/home/category/CategoryList";
import { ForgotPassword } from "./pages/home/auth/ForgotPassword";
import { AdminLayout } from "./pages/cms/admin/layout/AdminLayout";
import { AdminDashboard } from "./pages/cms/admin/component/AdminDashboard";

export const Routing = () => {
  return (
    <>
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
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
