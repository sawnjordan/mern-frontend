import { useState } from "react";
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
import { Link, NavLink } from "react-router-dom";
export const Header = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
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
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" variant="" className="me-5">
                <FaUser className="icon" size={18} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Link to="/login" className="dropdown-item">
                  Login
                </Link>
                <Link to="/register" className="dropdown-item">
                  Register
                </Link>
                <Link to="/admin" className="dropdown-item">
                  Profile
                </Link>
              </Dropdown.Menu>
            </Dropdown>
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
                <a href="/shop" className="nav-link text-uppercase text-dark">
                  Shop
                </a>
              </li>

              <li className="  nav-items px-2 py-2 dropdown">
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
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form className="d-flex">
            <Form.Control type="search" placeholder="Search" className="me-2" />
            <Button variant="outline-primary" type="submit">
              Search
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
