import React from "react";
import { NavLink } from "react-router-dom";

export const ProductCard = ({ product }) => {
  return (
    <>
      <div className="card h-100">
        <NavLink to={`/product/${product?.slug}`} className="position-relative overflow-hidden d-block">
          <img
            src={`${import.meta.env.VITE_IMAGE_URL}/products/${
              product.images[0]
            }`}
            className="card-img-top equal-height-image"
            alt={product.name}
          />
        </NavLink>
        <div className="card-body d-flex flex-column justify-content-between p-3">
          <div className="text-center mb-2">
            <NavLink to={`/brand/${product.brand?.slug}`}>
              <span 
                className="badge me-1" 
                style={{ 
                  backgroundColor: "var(--primary-color-l4)", 
                  color: "var(--primary-color)", 
                  fontSize: "11px",
                  fontWeight: "600",
                  padding: "4px 8px"
                }}
              >
                {product.brand?.name}
              </span>
            </NavLink>
          </div>
          
          <NavLink to={`/product/${product?.slug}`}>
            <h6 className="card-title text-center mb-2" style={{ fontSize: "15px" }}>{product.name}</h6>
          </NavLink>

          <div className="product-price-container my-2 text-center">
            {product?.afterDiscount !== null ? (
              <div className="d-flex align-items-center justify-content-center flex-wrap gap-2">
                <span className="fw-bold text-dark" style={{ fontSize: "1.05rem" }}>
                  Rs. {product.afterDiscount.toLocaleString()}
                </span>
                <span className="text-muted text-decoration-line-through small">
                  Rs. {product.price.toLocaleString()}
                </span>
                <span className="badge bg-danger-subtle text-danger fw-semibold" style={{ fontSize: "10px", padding: "3px 6px" }}>
                  -{product.discount}%
                </span>
              </div>
            ) : (
              <span className="fw-bold text-dark" style={{ fontSize: "1.05rem" }}>
                Rs. {product?.price.toLocaleString()}
              </span>
            )}
          </div>

          <div className="text-center mt-2">
            <button className="btn btn-sm btn-primary w-100">Add To Cart</button>
          </div>
        </div>
      </div>
    </>
  );
};
