import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { bannerServiceObj } from "../../cms/admin/banner";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import the CSS for Skeleton

export const Banner = () => {
  const [loading, setLoading] = useState(true);
  const [bannerData, setBannerData] = useState([]);

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

  return (
    <>
      <section id="header" className="nav-margin mb-3">
        <div
          id="carouselExample"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {loading ? (
              // Show skeleton loading while data is being fetched
              <>
                <div className="carousel-item active">
                  {/* <Skeleton height={400} /> Placeholder for banner image */}
                  <Skeleton
                    height={400}
                    baseColor="#f0f0f0"
                    highlightColor="#e0e0e0"
                    duration={1.5}
                  />
                  <div className="carousel-caption top-0 mt-5 d-md-flex align-items-center flex-column justify-content-center">
                    <div className="caption-overlay rounded-4">
                      <Skeleton width={200} height={30} />{" "}
                      {/* Placeholder for title */}
                      <Skeleton width={100} height={40} />{" "}
                      {/* Placeholder for button */}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {bannerData && bannerData.length > 0 ? (
                  bannerData.map((banner, i) =>
                    banner.status === "active" ? (
                      <div
                        key={i}
                        className={
                          i === 0 ? "carousel-item active" : "carousel-item"
                        }
                      >
                        <img
                          src={`${import.meta.env.VITE_IMAGE_URL}/banner/${
                            banner?.image
                          }`}
                          className="d-block w-100"
                          alt={banner?.title}
                        />
                        <div className="carousel-caption top-0 mt-5 d-md-flex align-items-center flex-column justify-content-center">
                          <div className="caption-overlay rounded-4">
                            <h2 className="fw-bold mb-3">{banner?.title}</h2>
                            <a
                              target="_blank"
                              href={`${banner.link}`}
                              className="btn btn-primary"
                            >
                              Shop Now
                            </a>
                          </div>
                        </div>
                      </div>
                    ) : null
                  )
                ) : (
                  <div className="carousel-item active">
                    <div 
                      className="d-flex align-items-center justify-content-center w-100" 
                      style={{ 
                        height: "520px", 
                        background: "linear-gradient(135deg, var(--primary-color) 0%, #312e81 100%)",
                        color: "#ffffff"
                      }}
                    >
                      <div className="text-center px-4" style={{ animation: "fadeInUp 0.8s ease" }}>
                        <h1 className="fw-extrabold mb-3 display-4 text-white" style={{ letterSpacing: "-1px" }}>Discover MeroBazar</h1>
                        <p className="lead mb-4 opacity-90 mx-auto" style={{ maxWidth: "600px", fontSize: "1.1rem" }}>
                          Welcome to the ultimate ads posting and boosting platform. Explore top categories, featured ads, and premium seller listings today!
                        </p>
                        <a href="/shop" className="btn btn-light btn-lg px-4 py-2.5 fw-semibold text-primary shadow-sm" style={{ border: "none", borderRadius: "8px" }}>
                          Explore Shop
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          {!loading && (
            <>
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
            </>
          )}
        </div>
      </section>
    </>
  );
};
