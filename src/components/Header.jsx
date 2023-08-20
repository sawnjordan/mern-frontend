import { Link, NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg py-4 fixed-top bg-white">
        <div className="container">
          <NavLink
            className="navbar-brand d-flex justify-content-between align-items-center order-lg-0"
            to="/"
          >
            <img
              src="../../src/assets/images/shopping-bag-icon.png"
              alt="Site Logo"
              srcSet=""
            />
            <span className="text-uppercase fw-lighter">eCommerce</span>
          </NavLink>
          <div className="order-lg-3 d-flex justify-content-between">
            <button className="btn position-relative" type="button">
              <i className="fa fa-shopping-cart"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge bg-primary">
                5
              </span>
            </button>
            <button
              className="btn position-relative"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#header-search"
            >
              <i className="fa fa-search"></i>
            </button>

            <div className="dropdown-center">
              <button
                className="btn position-relative dropdown-toggle me-5"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-solid fa-user"></i>
              </button>
              <ul className="dropdown-menu me-4">
                <li>
                  <Link to="/login" className="dropdown-item">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="dropdown-item">
                    Register
                  </Link>
                </li>
                <li>
                  <a href="#" className="dropdown-item">
                    Profile
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
            aria-expanded="false"
            aria-controls="#navMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse order-lg-1" id="navMenu">
            <ul className="navbar-nav mx-auto text-center">
              <li className="nav-items px-2 py-2">
                <a href="#" className="nav-link text-uppercase text-dark">
                  Home
                </a>
              </li>
              <li className="nav-items px-2 py-2">
                <a href="/shop" className="nav-link text-uppercase text-dark">
                  Shop
                </a>
              </li>

              <li className="nav-items px-2 py-2 dropdown">
                <a
                  className="nav-link text-uppercase text-dark dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="/categories" className="dropdown-item">
                      All
                    </NavLink>
                    <NavLink
                      to="/category/electronics-devices"
                      className="dropdown-item"
                    >
                      Electronics Devices
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/category/clothing" className="dropdown-item">
                      Clothing
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/category/babies-toys"
                      className="dropdown-item"
                    >
                      Babies and Toys
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="nav-items px-2 py-2">
                <a href="#" className="nav-link text-uppercase text-dark">
                  About Us
                </a>
              </li>
              <li className="nav-items px-2 py-2">
                <a href="#" className="nav-link text-uppercase text-dark">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div
        className="modal fade"
        id="header-search"
        tabIndex="-1"
        aria-labelledby="header-search"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-primary" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
