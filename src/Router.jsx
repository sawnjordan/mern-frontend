import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminLayout } from "./pages/cms/admin/layout/AdminLayout";
import { ForgotPassword } from "./pages/home/auth/ForgotPassword";
import { LoginPage } from "./pages/home/auth/LoginPage";
import { RegisterPage } from "./pages/home/auth/RegisterPage";
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
import { AdminOrderList } from "./pages/cms/admin/order";
import { Provider } from "react-redux";
import { store } from "./store";
import { AllProductList } from "./pages/home/product/AllProductList";
import { AllCategories } from "./pages/home/category/AllCategories";
import { ProductDetail } from "./pages/home/product/ProductDetail";
import { SearchResult } from "./pages/home/product/SearchResult";
import { BrandProductList } from "./pages/home/product/BrandProductList";
import { Cart } from "./pages/home/cart/Cart";
import { Checkout } from "./pages/home/cart/Checkout";
import { BuyerLayout } from "./pages/buyer/layout/BuyerLayout";
import { BuyerDashboard } from "./pages/buyer/components/BuyerDashboard";
import { BuyerOrders } from "./pages/buyer/BuyerOrders";
import { BuyerWishList } from "./pages/buyer/BuyerWishList";
import { BuyerChangePassword } from "./pages/buyer/components/BuyerChangePassword";
import { AdminUpdateOrder } from "./pages/cms/admin/order/AdminUpdateOrder";
import { BuyerEditOrder } from "./pages/buyer/components/BuyerEditOrder";
import { SellerLayout } from "./pages/seller/layout/SellerLayout";
import { SellerDashboard } from "./pages/seller/components/SellerDashboard";
import { SellerOrders } from "./pages/seller/SellerOrders";
import { SellerEditOrder } from "./pages/seller/components/SellerEditOrder";
import { SellerWishList } from "./pages/seller/SellerWishList";
import { SellerChangePassword } from "./pages/seller/components/SellerChangePassword";
import { SellerProducts } from "./pages/seller/components/SellerProducts";
import { SocketConfig } from "./config/SocketConfig";
// import { AdminCreateBanner } from "./pages/cms/admin/banner/AdminCreateBanner";
// import { BannerList } from "./pages/cms/admin/banner/BannerList";

export const Routing = () => {
  return (
    <>
      <ToastContainer />
      <SocketConfig />
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePageLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="shop" element={<AllProductList />} />
              <Route path="categories" element={<AllCategories />} />
              <Route path="search" element={<SearchResult />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="/activate/:token" element={<ActivateUser />} />

              <Route path="forgot-password" element={<ForgotPassword />} />
              {/* <Route path="banner" element={<HomePageBanner />} /> */}
              <Route
                path="category/:categorySlug"
                element={<CategoryProductList />}
              />
              <Route path="brand/:brandId" element={<BrandProductList />} />
              <Route
                path="product/:productSlug"
                element={<ProductDetail slug={true} />}
              />
              <Route
                path="product/id/:productId"
                element={<ProductDetail slug={false} />}
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

              {/* Admin Order Route */}
              <Route path="orders" element={<AdminOrderList />} />
              <Route path="order/:id" element={<AdminUpdateOrder />} />
            </Route>

            {/* Customer/Buyer Dashboard Route */}
            <Route
              path="/customer"
              element={
                <CheckPermission Component={<BuyerLayout />} role="customer" />
              }
            >
              <Route index element={<BuyerDashboard />}></Route>
              <Route path="orders" element={<BuyerOrders />}></Route>
              <Route path="order/:orderId" element={<BuyerEditOrder />}></Route>
              <Route path="wishlist" element={<BuyerWishList />}></Route>
              {/* <Route path="address" element={<BuyerAddress />}></Route> */}
              <Route
                path="password-change"
                element={<BuyerChangePassword />}
              ></Route>
            </Route>

            {/* Seller Dashboard Route */}
            <Route
              path="/seller"
              element={
                <CheckPermission Component={<SellerLayout />} role="seller" />
              }
            >
              <Route index element={<SellerDashboard />}></Route>
              <Route path="orders" element={<SellerOrders />}></Route>
              <Route
                path="order/:orderId"
                element={<SellerEditOrder />}
              ></Route>
              <Route path="wishlist" element={<SellerWishList />}></Route>
              <Route path="products" element={<SellerProducts />}></Route>
              {/* <Route path="address" element={<SellerAddress />}></Route> */}
              <Route
                path="password-change"
                element={<SellerChangePassword />}
              ></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};
