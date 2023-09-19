import React from "react";
import { Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const ProductCard = ({ product }) => {
  // console.log(product);
  const limitedCat = product?.categories.slice(0, 2)
    ? product?.categories.slice(0, 2)
    : null;
  // console.log(limitedCat);
  return (
    <>
      <div className="card mb-3">
        <div className="card-body text-center">
          <NavLink to={`/product/${product?.slug}`}>
            <img
              src={`${import.meta.env.VITE_IMAGE_URL}/products/${
                product.images[0]
              }`}
              className="card-img-top img-thumbnail equal-height-image"
              alt="..."
            />
          </NavLink>
          {/* <p>
            {limitedCat &&
              limitedCat.map((cat, i) => (
                <NavLink key={i} to={`/category/${cat?.slug}`}>
                  <Badge bg="warning me-1 mt-3">{cat.name}</Badge>
                </NavLink>
              ))}
          </p> */}
          <p>
            <NavLink to={`/brand/${product.brand?.slug}`}>
              <Badge bg="info" className="me-1 mt-4">
                {product.brand?.name}
              </Badge>
            </NavLink>
          </p>
          <NavLink className={"nav-link"} to={`/product/${product?.slug}`}>
            <h6 className="card-title pt-2 text-dark">{product.name}</h6>
          </NavLink>

          {product?.afterDiscount !== null ? (
            <>
              <p style={{ margin: "0" }} className="fw-medium me-1">
                Rs.{product.afterDiscount}
              </p>
              <span className="text-danger text-decoration-line-through me-1">
                Rs.{product.price}
              </span>
              <span className="fw-lighter">(-{product.discount}%)</span>
            </>
          ) : (
            <></>
          )}
          <p className="text-center mt-3">
            <button className="btn btn-sm btn-primary">Add To Cart</button>
          </p>
        </div>
      </div>
    </>
  );
};
