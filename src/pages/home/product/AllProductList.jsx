import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ProductCard } from "./ProductCard";
import { toast } from "react-toastify";
import { productServiceObj } from "../../cms/admin/product";

export const AllProductList = () => {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);

  const getAllProductForHomePage = async () => {
    try {
      let response = await productServiceObj.getProductForHomePage();
      // console.log(response);
      setProductList(response.data?.data);
    } catch (error) {
      toast.error("Something went wrong!!!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProductForHomePage();
  }, []);

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
                <h4>Shop</h4>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row id="product-listing" className="my-3">
              {productList &&
                productList.map((product, i) => (
                  <Col key={i} sm={6} md={3} lg={3} xl={2}>
                    <ProductCard product={product} />
                  </Col>
                ))}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};
