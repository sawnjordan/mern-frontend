import React, { useCallback, useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { brandServiceObj } from "../../cms/admin/brand";
import { NavLink } from "react-router-dom";

export const BrandListing = () => {
  const [loading, setLoading] = useState(true);

  const [brandList, setBrandList] = useState();

  const getBrandListForHome = useCallback(async () => {
    try {
      let response = await brandServiceObj.getBrandForHomePage();
      setBrandList(response.data?.data);
    } catch (error) {
      toast.error(error.data?.msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getBrandListForHome();
  }, []);
  return (
    <>
      {loading ? (
        <>
          <div className="text-center fw-medium h3">Loading...</div>
        </>
      ) : (
        <>
          <Container className="pt-3 pb-3">
            <Row className="d-flex justify-content-center">
              {brandList &&
                brandList.map((brand, i) => (
                  <Col lg={1} md={3} sm={4} className="mb-3">
                    <NavLink to={`/brand/${brand._id}`} className={"nav-link"}>
                      <Card>
                        <div className="home-brand-image">
                          <img
                            width={"100px"}
                            height={"100px"}
                            variant="top"
                            className="img-thumbnail"
                            src={`${import.meta.env.VITE_IMAGE_URL}/brands/${
                              brand.logo
                            }`}
                          />
                        </div>
                        <div
                          style={{ fontSize: "14px" }}
                          className="text-center p-1"
                        >
                          {brand.name}
                        </div>
                      </Card>
                    </NavLink>
                  </Col>
                ))}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};
