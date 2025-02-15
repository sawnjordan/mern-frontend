import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  Form,
  Image,
  Modal,
  Navbar,
} from "react-bootstrap";
import logoImg from "../assets/images/shopping-bag-icon.png";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../reducers/user.reducers";
import { categoryServiceObj } from "../pages/cms/admin/category";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const Header = () => {
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState(null);
  const cartItems = useSelector((store) => store?.Cart?.cart);

  const getAllCategories = async () => {
    try {
      let response = await categoryServiceObj.getCategoryForHomePage();
      setCategoryData(response.data?.data);
    } catch (error) {
      toast.error("Something went wrong!!!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const renderSubcategories = (parentId) => {
    const subcategories = categoryData.filter(
      (cat) => cat.parent && cat.parent._id === parentId
    );

    if (subcategories.length === 0) {
      return null;
    }

    return (
      <ul className="dropdown-menu">
        {subcategories.map((subcat, i) => (
          <li key={i} className="nav-item dropend">
            <NavLink to={`/category/${subcat?.slug}`} className="dropdown-item">
              {subcat?.name}
            </NavLink>
            {renderSubcategories(subcat._id)}
          </li>
        ))}
      </ul>
    );
  };

  const userDetails = useSelector((state) => state.User?.loggedInUser);
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      dispatch(logoutUser());
      toast.success("Logged out.");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    let params = `keyword=${query}`;
    window.location.href = `/search?${params}`;
  };

  return (
    <>
      <Navbar
        expand="lg"
        bg="light"
        variant="light"
        className=" fixed-top py-4"
      >
        <Container>
          <NavLink
            className="navbar-brand d-flex justify-content-between align-items-center order-lg-0"
            to="/"
          >
            <Image src={logoImg} alt="Site Logo" />
            <span className="text-uppercase fw-lighter">eCommerce</span>
          </NavLink>
          <div className="order-lg-3 d-flex justify-content-between">
            <NavLink to={"/cart"}>
              <Button variant="" className="position-relative">
                <FaShoppingCart size={18} className="icon" />
                <span className="position-absolute top-0 start-100 translate-middle badge bg-primary">
                  {cartItems && cartItems.length ? cartItems.length : 0}
                </span>
              </Button>
            </NavLink>

            <Button
              type="button"
              variant=""
              className="position-relative"
              onClick={handleShow}
            >
              <FaSearch className="icon" size={18} />
            </Button>
            {userDetails ? (
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  variant=""
                  className="me-5"
                >
                  <span className="fw-medium">{userDetails?.name}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Link to={`/${userDetails?.role}`} className="dropdown-item">
                    Profile
                  </Link>
                  <Link onClick={handleLogout} className="dropdown-item">
                    Logout
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  variant=""
                  className="me-5"
                >
                  <FaUser className="icon" size={18} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Link to="/login" className="dropdown-item">
                    Login
                  </Link>
                  <Link to="/register" className="dropdown-item">
                    Register
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            )}
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
              {loading ? (
                <>
                  <li className="nav-items px-2 py-2">
                    <Skeleton width={80} height={20} />
                  </li>
                  <li className="nav-items px-2 py-2">
                    <Skeleton width={80} height={20} />
                  </li>
                  <li className="nav-items px-2 py-2">
                    <Skeleton width={80} height={20} />
                  </li>
                  <li className="nav-items px-2 py-2">
                    <Skeleton width={80} height={20} />
                  </li>
                  <li className="nav-items px-2 py-2">
                    <Skeleton width={80} height={20} />
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-items px-2 py-2">
                    <a href="/" className="nav-link text-uppercase text-dark">
                      Home
                    </a>
                  </li>
                  <li className="nav-items px-2 py-2">
                    <NavLink
                      to="/shop"
                      className="nav-link text-uppercase text-dark"
                    >
                      Shop
                    </NavLink>
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
                      </li>
                      {categoryData.map((cat, i) => (
                        <React.Fragment key={i}>
                          {cat.parent === null && (
                            <li className="nav-item dropend">
                              <NavLink
                                to={`/category/${cat?.slug}`}
                                className="dropdown-item"
                              >
                                {cat?.name}
                              </NavLink>
                              {renderSubcategories(cat?._id)}
                            </li>
                          )}
                        </React.Fragment>
                      ))}
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
                </>
              )}
            </ul>
          </div>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form className="d-flex" onSubmit={handleSearchSubmit}>
            <Form.Control
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Search"
              className="me-2"
              name="search"
              autoFocus
            />
            <Button variant="outline-primary" type="submit">
              Search
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
