import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CategoryCard } from "../category/CategoryCard";
import { toast } from "react-toastify";
import { categoryServiceObj } from "../../cms/admin/category";

export const CategoryListing = () => {
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState();

  const getAllCategories = async () => {
    try {
      let response = await categoryServiceObj.getCategoryForHomePage();
      setCategoryData(response.data?.data);
    } catch (error) {
      toast.error("Something went wrong!!!");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  // console.log(categoryData);
  return (
    <>
      <div
        id="category-listing"
        className="container-fluid bg-light mt-3 pt-3 mb-3"
      >
        <div className="row">
          <div className="col-lg-12 text-center">
            <h3>Categories</h3>
            <a href="#" className="btn btn-link float-end">
              View All
            </a>
          </div>
        </div>
        <Container fluid>
          <Row className="my-3">
            {categoryData &&
              categoryData.map((cat, i) =>
                cat.status === "active" ? (
                  <Col key={i} sm={6} md={3} lg={3} xl={2} className="mb-4">
                    <CategoryCard cat={cat} />
                  </Col>
                ) : (
                  <></>
                )
              )}
          </Row>
        </Container>
      </div>
    </>
  );
};
