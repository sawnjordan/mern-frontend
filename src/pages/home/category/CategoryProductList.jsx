import React from "react";
import { useParams } from "react-router-dom";

export const CategoryProductList = () => {
  const { categorySlug } = useParams();
  return (
    <>
      <div className="nav-margin"></div>
      <h3>Category Product List</h3>
      <p>{categorySlug}</p>
    </>
  );
};
