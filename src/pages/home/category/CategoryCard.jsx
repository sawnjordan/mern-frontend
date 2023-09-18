import React from "react";
import { NavLink } from "react-router-dom";

export const CategoryCard = ({ cat }) => {
  return (
    <>
      <div className="card">
        <NavLink
          to={`/category/${cat?.slug}`}
          className="text-decoration-none text-dark"
        >
          <img
            src={`${import.meta.env.VITE_IMAGE_URL}/category/${cat.image}`}
            className="card-img-top equal-height-image img-thumbnail"
            alt="..."
          />
          <p className="text-center pt-2 fw-medium">{cat?.name}</p>
        </NavLink>
      </div>
    </>
  );
};
