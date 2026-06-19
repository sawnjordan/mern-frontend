import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CategoryCard } from "../category/CategoryCard";
import { toast } from "react-toastify";
import { categoryServiceObj } from "../../cms/admin/category";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./CategoryListing.css";
import { NavLink } from "react-router-dom";

export const CategoryListing = () => {
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([]);

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

  return (
    <>
      <div id="category-listing">
        <Container fluid className="px-lg-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="category-heading">Categories</h3>
            <NavLink to="/categories" className="btn-view-all">
              View All
            </NavLink>
          </div>
          <Row className="g-4">
            {" "}
            {/* Adjusted gutter size for better spacing */}
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Col key={i} sm={6} md={4} lg={3} xl={2}>
                    <div className="category-skeleton-card p-3 shadow-sm rounded">
                      <Skeleton height={150} className="w-100 rounded" />
                      <Skeleton width={80} height={20} className="mt-3" />
                    </div>
                  </Col>
                ))
              : categoryData &&
                categoryData.map((cat, i) =>
                  cat.status === "active" ? (
                    <Col key={i} sm={6} md={4} lg={3} xl={2}>
                      <CategoryCard cat={cat} />
                    </Col>
                  ) : null
                )}
          </Row>
        </Container>
      </div>
    </>
  );
};
