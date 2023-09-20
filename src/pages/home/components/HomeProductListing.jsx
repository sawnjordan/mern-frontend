import React, { useEffect, useState } from "react";
import prodImg from "../../../assets/images/product-one.jpg";
import { Col, Container, Row } from "react-bootstrap";
import { productServiceObj } from "../../cms/admin/product";
import { ProductCard } from "../product/ProductCard";
import { NavLink } from "react-router-dom";

export const HomeProductListing = () => {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState();
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
      <div
        id="product-listing"
        className="container-fluid bg-body-secondary pb-4 pt-4 mt-3"
      >
        <div className="row">
          <div className="col-lg-12">
            <h4 className="text-center">Product Listing</h4>
            <NavLink to="/shop" className="btn btn-link float-end mb-3">
              View All
            </NavLink>
          </div>
        </div>
        {loading ? (
          <>Loading...</>
        ) : (
          <Container fluid>
            <Row className="my-3 d-flex justify-content-center">
              {productList &&
                productList.map((product, i) => (
                  <Col key={i} sm={12} md={3} lg={3} xl={2}>
                    <ProductCard product={product} />
                  </Col>
                ))}
            </Row>
          </Container>
        )}
      </div>
    </>
  );
};
