import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { categoryServiceObj } from "../../cms/admin/category";
import { CategoryCard } from "./CategoryCard";

export const AllCategories = () => {
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
      {loading ? (
        <>
          <div className="nav-margin text-center fw-medium h3">Loading...</div>
        </>
      ) : (
        <>
          <Container className="nav-margin bg-body-secondary" fluid>
            <Row className="p-3">
              <Col sm={12} className="text-center">
                <h4>All Categories</h4>
              </Col>
            </Row>
          </Container>
          <Container>
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
        </>
      )}
    </>
  );
};
