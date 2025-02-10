import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { productServiceObj } from "../../cms/admin/product";
import { ProductCard } from "../product/ProductCard";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./ProductListing.css";

export const HomeProductListing = () => {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);

  const getAllProductForHomePage = async () => {
    try {
      let response = await productServiceObj.getProductForHomePage();
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
          <Container fluid>
            <Row className="my-3 d-flex justify-content-center">
              {[...Array(8)].map((_, i) => (
                <Col key={i} sm={12} md={3} lg={3} xl={2}>
                  <div className="product-card-skeleton p-3">
                    <Skeleton height={200} className="w-100 skeleton-image" />
                    <Skeleton
                      width={80}
                      height={20}
                      className="mt-2 skeleton-title"
                    />
                    <Skeleton
                      width={120}
                      height={20}
                      className="mt-2 skeleton-description"
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
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
