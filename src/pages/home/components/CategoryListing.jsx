import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CategoryCard } from "../category/CategoryCard";
import { toast } from "react-toastify";
import { categoryServiceObj } from "../../cms/admin/category";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./CategoryListing.css";

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
      <div
        id="category-listing"
        className="container-fluid bg-light mt-3 pt-3 mb-3"
      >
        <div className="row">
          <div className="col-lg-12 text-center">
            <h3 className="category-heading">Categories</h3>
            <a href="#" className="btn btn-primary btn-view-all float-end">
              View All
            </a>
          </div>
        </div>
        <Container fluid>
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
