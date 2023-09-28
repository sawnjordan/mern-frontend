import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { productServiceObj } from "../../cms/admin/product";
import { ProductCard } from "../product/ProductCard";
import { toast } from "react-toastify";

export const CategoryProductList = () => {
  const { categorySlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState(null);
  const [catName, setCatName] = useState("");

  const getProductsWithCatSlug = async () => {
    try {
      let response = await productServiceObj.getProductWithCatSlug(
        categorySlug
      );
      // console.log(response);
      setProductList(response.data?.data.products);
      setCatName(response.data?.data?.catName);
    } catch (error) {
      setProductList(null);
      // toast.error(`${error.data?.msg}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductsWithCatSlug();
  }, [categorySlug]);
  return (
    <>
      {loading ? (
        <>
          <div className="nav-margin text-center fs-3">Loading...</div>
        </>
      ) : (
        <>
          <Container className="nav-margin bg-body-secondary" fluid>
            <Row className="bg-primary-l1">
              <Col sm={12} className="text-center">
                <h3 className="text-center p-3">{catName}</h3>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row className="my-3 d-flex justify-content-center">
              {!productList ? (
                <Col className="text-center fs-3">Products Not Found</Col>
              ) : (
                productList &&
                productList.map((product, i) =>
                  product.status === "active" ? (
                    <Col key={i} sm={6} md={3} lg={3} xl={2} className="mb-4">
                      <ProductCard product={product} />
                    </Col>
                  ) : (
                    <></>
                  )
                )
              )}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};
