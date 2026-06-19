# MeroBazar Frontend (Client Web App)

This is the React frontend web application for MeroBazar. It is a single-page application built on React + Vite, styled using Bootstrap, React Bootstrap, and MDBReact, and powered by Redux Toolkit for state management.

---

## 🛠️ Key Technologies & Packages

- **Bundler & Build Tool**: Vite (React template)
- **State Management**: Redux Toolkit & React Redux
- **Routing**: React Router DOM (v6)
- **HTTP Client**: Axios (configured with interceptors for authentication and refresh token rotation)
- **Form Validation**: React Hook Form with Yup resolvers
- **Styling UI**: Bootstrap (v5), React Bootstrap, styled-components, and MDBReact
- **Real-time Notifications**: Socket.io-client (connects to the backend admin room for live notifications)
- **Popups & Alerts**: SweetAlert2 & React Toastify

---

## 📂 Folder Structure

All source code is located in the `src/` directory:

```
src/
├── assets/           # Static asset assets (images, logos, stylesheets)
├── components/       # Global reusable UI components (Headers, Footers, Loaders, Sidebar)
├── config/           # Application-level service setups
│   ├── axios.config.js # Central Axios setup with token verification & refresh token interceptors
│   ├── http.service.js # Core service base class wrapping GET, POST, PUT, DELETE requests
│   └── SocketConfig.jsx # Socket.io event subscription component connecting clients to backend
├── pages/            # View Pages split by Role and Area
│   ├── buyer/        # Customer dashboard panel view, order list, and wishlist
│   ├── cms/          # Admin Content Management System dashboards and lists
│   │   └── admin/    # Admin views (Banners, Brands, Categories, Users, Products, Orders)
│   ├── home/         # Public pages (Landing page, Shop, Search, Cart, Checkout, Auth)
│   ├── routing/      # Authorization guard check components (e.g., CheckPermission)
│   └── seller/       # Seller dashboard view, seller product lists, and order reviews
├── reducers/         # Redux slices managing global state
├── store.js          # Redux Store configuration
├── Router.jsx        # Routing configuration mapping layouts, paths, and RBAC guards
└── main.jsx          # App bootstrap entry point mounting React
```

---

## 🧭 Page Routes & Site Map

The routing is structured with layouts and permission checks:

### 🌐 Public View Layout (`/`)

- `/` — Landing Page (featured banner carousels, categories list, and featured product listings).
- `/shop` — Browse all active products with pagination and filters.
- `/categories` — View catalog of all product categories.
- `/category/:categorySlug` — Browse products belonging to a specific category.
- `/brand/:brandId` — Browse products belonging to a specific brand.
- `/product/:productSlug` — Detailed product view page with magnifying glass and related products.
- `/search` — Custom text-search product listing page.
- `/cart` — Review cart items, modify item counts, and view order checkout subtotals.
- `/checkout` — Shipping / Billing address submission and payment details.
- `/login` / `/register` — Account login and new registration (uploads profile image).
- `/activate/:token` — Verify registration token and activate account.
- `/forgot-password` — Enter email to initiate password recovery.

### 👤 Customer (Buyer) Dashboard (`/customer`)

Requires `role: customer` auth check.
- `/customer` — Buyer Dashboard overview.
- `/customer/orders` — List of purchases, statuses, and delivery logs.
- `/customer/wishlist` — Retrieve and shop items saved to wishlist.
- `/customer/password-change` — Change password.

### 🤝 Seller Center Dashboard (`/seller`)

Requires `role: seller` auth check.
- `/seller` — Seller dashboard and summary statistics.
- `/seller/products` — Manage products listed by this seller.
- `/seller/orders` — View orders placed for items listed by this seller.
- `/seller/wishlist` — Retrieve and review saved items.
- `/seller/password-change` — Edit account credentials.

### 👑 Admin CMS Dashboard (`/admin`)

Requires `role: admin` auth check.
- `/admin` — Administration metrics.
- `/admin/banner` — CRUD banner slides.
- `/admin/brand` — CRUD brand attributes and logos.
- `/admin/category` — CRUD category hierarchy and covers.
- `/admin/user` — View/edit users and set roles.
- `/admin/product` — Complete catalog administration.
- `/admin/orders` — View all store transactions, update status, and manage logistics.

---

## ⚙️ Environment Variables

Copy or create a `.env` file in the `mern-frontend/` directory with the following variables:

```env
# URL pointing to the Express server API
VITE_API_URL=http://localhost:3005/api/

# URL pointing to the uploads folder served by backend
VITE_IMAGE_URL=http://localhost:3005/assets
```

---

## ⚡ Setup and Execution

1. Install frontend packages:
   ```bash
   npm install
   ```
2. Start Vite dev server with Hot Module Replacement (HMR):
   ```bash
   npm run dev
   ```
3. Build optimized static assets for production:
   ```bash
   npm run build
   ```
4. Preview production build locally:
   ```bash
   npm run preview
   ```
