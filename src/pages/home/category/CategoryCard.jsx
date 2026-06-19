import React from "react";
import { NavLink } from "react-router-dom";

export const CategoryCard = ({ cat }) => {
  return (
    <>
      <div className="category-card">
        <NavLink
          to={`/category/${cat?.slug}`}
          className="text-decoration-none"
        >
          <img
            src={`${import.meta.env.VITE_IMAGE_URL}/category/${cat.image}`}
            alt={cat?.name}
          />
          <p className="category-title text-center">{cat?.name}</p>
        </NavLink>
      </div>
    </>
  );
};
