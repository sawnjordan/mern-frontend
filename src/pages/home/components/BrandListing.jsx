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
      setBrandList(response.data?.data || []);
    } catch (error) {
      toast.error(error.data?.msg || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getBrandListForHome();
  }, [getBrandListForHome]);

  return (
    <>
      <section className="brand-section">
        <Container>
          <h3 className="brand-section-heading">Featured Brands</h3>
          <div className="brand-listing">
            {loading
              ? // Show dynamic skeleton loaders based on brandList length during loading
                Array.from({ length: brandList.length || 10 }).map((_, i) => (
                  <div className="brand-item" key={i}>
                    <Card className="d-flex align-items-center p-2">
                      <div className="home-brand-image">
                        <Skeleton
                          height={40}
                          width={60}
                          containerClassName="skeleton-image"
                          borderRadius={6}
                        />
                      </div>
                      <div className="text-center p-2 w-100">
                        {/* Skeleton loader for title */}
                        <Skeleton
                          width="70%"
                          height={10}
                          style={{ marginTop: 8 }}
                        />
                      </div>
                    </Card>
                  </div>
                ))
              : // Once data is fetched, show the actual items
                brandList.map((brand, i) => (
                  <div className="brand-item" key={i}>
                    <NavLink to={`/brand/${brand._id}`} className="nav-link">
                      <Card className="d-flex align-items-center p-2">
                        <div className="home-brand-image">
                          <img
                            src={`${import.meta.env.VITE_IMAGE_URL}/brands/${
                              brand.logo
                            }`}
                            alt={brand.name}
                          />
                        </div>
                        <div className="brand-name-text text-center">
                          {brand.name}
                        </div>
                      </Card>
                    </NavLink>
                  </div>
                ))}
          </div>
        </Container>
      </section>
    </>
  );
};
