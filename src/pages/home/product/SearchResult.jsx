import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { productServiceObj } from "../../cms/admin/product";
import { ProductCard } from "./ProductCard";

export const SearchResult = () => {
  const [loading, setLoading] = useState(false);
  let [query, setQuery] = useSearchParams();
  let [productResult, setProductResult] = useState();

  const fetchSearchResult = useCallback(async () => {
    try {
      let response = await productServiceObj.getProductBySearchKeyword(
        query.get("keyword")
      );
      //   console.log(response.data);
      setProductResult(response.data?.data);
    } catch (error) {
      toast.error(error.data?.msg);
    }
  }, [query]);

  useEffect(() => {
    fetchSearchResult();
  }, [query]);

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
                <h4>Search Result for "{query.get("keyword")}"</h4>
                <p>
                  <NavLink
                    className={"nav-link"}
                    style={{ display: "inline-block" }}
                    to={"/"}
                  >
                    Home
                  </NavLink>{" "}
                  /{" "}
                  <NavLink
                    className={"nav-link"}
                    style={{ display: "inline-block" }}
                    to={"/shop"}
                  >
                    Shop
                  </NavLink>
                </p>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row
              id="product-listing"
              className="my-3 d-flex justify-content-center"
              lg={{ span: 8, offset: 2 }}
            >
              {productResult &&
                productResult.map((product, i) => (
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
