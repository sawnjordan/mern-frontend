import React, { useCallback, useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { brandServiceObj } from "../../cms/admin/brand";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./BrandListing.css"; // Custom CSS file

export const BrandListing = () => {
  const [loading, setLoading] = useState(true);
  const [brandList, setBrandList] = useState([]);

  const getBrandListForHome = useCallback(async () => {
    try {
      let response = await brandServiceObj.getBrandForHomePage();
      setBrandList(response.data?.data);
    } catch (error) {
      toast.error(error.data?.msg);
    }
  }, []);

  useEffect(() => {
    getBrandListForHome();
  }, [getBrandListForHome]);

  useEffect(() => {
    if (brandList.length > 0) {
      setLoading(false);
    }
  }, [brandList]);

  return (
    <>
      <Container className="pt-3 pb-3">
        <div className="brand-listing">
          {loading
            ? // Show dynamic skeleton loaders based on brandList length during loading
              Array.from({ length: brandList.length || 10 }).map((_, i) => (
                <div className="brand-item" key={i}>
                  <Card className="d-flex align-items-center p-2 shadow-sm rounded-3">
                    <div className="home-brand-image d-flex justify-content-center">
                      <Skeleton
                        height={60}
                        width={80}
                        containerClassName="skeleton-image"
                        borderRadius={8}
                      />
                    </div>
                    <div className="text-center p-2 w-100">
                      {/* Skeleton loader for title */}
                      <Skeleton
                        width="80%"
                        height={12}
                        style={{ marginTop: 10, marginBottom: 5 }}
                      />
                    </div>
                  </Card>
                </div>
              ))
            : // Once data is fetched, show the actual items
              brandList.map((brand, i) => (
                <div className="brand-item" key={i}>
                  <NavLink to={`/brand/${brand._id}`} className="nav-link">
                    <Card className="d-flex align-items-center p-2 shadow-sm rounded-3">
                      <div className="home-brand-image d-flex justify-content-center">
                        <img
                          width="80%"
                          height="80px"
                          className="img-thumbnail rounded-3"
                          src={`${import.meta.env.VITE_IMAGE_URL}/brands/${
                            brand.logo
                          }`}
                          alt={brand.name}
                        />
                      </div>
                      <div
                        style={{ fontSize: "12px" }}
                        className="text-center p-2"
                      >
                        {brand.name}
                      </div>
                    </Card>
                  </NavLink>
                </div>
              ))}
        </div>
      </Container>
    </>
  );
};
