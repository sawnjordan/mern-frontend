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
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { logoutUser } from "../reducers/user.reducers";
import { categoryServiceObj } from "../pages/cms/admin/category";
export const Header = () => {
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState(null);

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
      return null; // No subcategories, return null
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

  const userDetails = useSelector((state) => {
    // console.log(state);
    return state.User?.loggedInUser;
  });
  const handleLogout = async () => {
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
    // navigate(`/search?${params}`);
    // console.log(params);
    // let params = serializeFormQuery(event.target);
    // setSearchParams(params);
    // console.log(params);
    // console.log(searchParams);
  };

  // console.log(categoryData);
  return (
    <>
      {loading ? (
        <>
          <div className="nav-margin text-center fw-medium h3">Loading...</div>
        </>
      ) : (
        <>
          <Navbar
            expand="lg"
            bg="light"
            variant="light"
            className=" fixed-top py-4  "
          >
            <Container>
              <NavLink
                className="navbar-brand d-flex justify-content-between align-items-center order-lg-0"
                to="/"
              >
                <Image
                  src="../../src/assets/images/shopping-bag-icon.png"
                  alt="Site Logo"
                  srcSet=""
                />

                <span className="text-uppercase fw-lighter">eCommerce</span>
              </NavLink>
              <div className="order-lg-3 d-flex justify-content-between">
                <Button variant="" className="position-relative" type="button">
                  <FaShoppingCart size={18} className="icon" />
                  <span className="position-absolute top-0 start-100 translate-middle badge bg-primary">
                    5
                  </span>
                </Button>

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
                      {/* <FaUser className="icon" size={18} /> */}
                      <span className="fw-medium">{userDetails?.name}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {/* <Link to="/login" className="dropdown-item">
                    Login
                  </Link>
                  <Link to="/register" className="dropdown-item">
                    Register
                  </Link> */}
                      <Link
                        to={`/${userDetails?.role}`}
                        className="dropdown-item"
                      >
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
                      {/* <Link to="/admin" className="dropdown-item">
                    Profile
                  </Link> */}
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

                  {categoryData && (
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
                              <>
                                <li className="nav-item dropend">
                                  <NavLink
                                    to={`/category/${cat?.slug}`}
                                    className="dropdown-item"
                                  >
                                    {cat?.name}
                                  </NavLink>
                                  {renderSubcategories(cat?._id)}
                                </li>
                                <li></li>
                              </>
                            )}
                          </React.Fragment>
                        ))}
                      </ul>
                    </li>
                  )}

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
      )}
    </>
  );
};
