import React, { useDebugValue, useEffect, useState } from "react";
import bannerImg1 from "../../../assets/images/banner-img-1.jpg";
import bannerImg2 from "../../../assets/images/banner-img-2.jpg";
import bannerImg3 from "../../../assets/images/banner-img-3.jpg";
import { toast } from "react-toastify";
import { bannerServiceObj } from "../../cms/admin/banner";
import { NavLink } from "react-router-dom";

export const Banner = () => {
  const [loading, setLoading] = useState(true);
  const [bannerData, setBannerData] = useState();

  const getHomePageBanner = async () => {
    try {
      let response = await bannerServiceObj.getBannerForHomePage();
      setBannerData(response.data?.data);
    } catch (error) {
      toast.error("Something went wrong!!!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHomePageBanner();
  }, []);
  console.log(bannerData);
  return (
    <>
      {loading ? (
        <>
          <div className="nav-margin text-center fs-3">Loading...</div>
        </>
      ) : (
        <>
          <section id="header" className="nav-margin mb-3">
            <div
              id="carouselExample"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                {bannerData &&
                  bannerData.map((banner, i) => (
                    <div
                      className={
                        i == 1 ? "carousel-item active" : "carousel-item"
                      }
                    >
                      <img
                        src={`${import.meta.env.VITE_IMAGE_URL}/banner/${
                          banner?.image
                        }`}
                        className="d-block w-100"
                        alt="banner-img-1"
                      />
                      <div className="carousel-caption top-0 mt-5 d-md-flex align-items-center flex-column justify-content-center">
                        <div className="caption-overlay rounded-4">
                          {/* <p>Samsung</p> */}
                          <h2>{banner?.title}</h2>
                          <NavLink to={`${banner?.link}`}>
                            <button className="btn btn-primary">
                              Shop Now
                            </button>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </section>
        </>
      )}
    </>
  );
};
