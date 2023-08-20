import React from "react";

export const Banner = () => {
  return (
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
            <div className="carousel-item active">
              <img
                src="../../src/assets/images/banner-img-1.jpg"
                className="d-block w-100"
                alt="banner-img-1"
              />
              <div className="carousel-caption top-0 mt-5 d-md-flex align-items-center flex-column justify-content-center">
                <div className="caption-overlay rounded-4">
                  <p>Samsung</p>
                  <h2>Samsung For Today and Tomorrow</h2>
                  <button className="btn btn-primary">Shop Now</button>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="../../src/assets/images/banner-img-2.jpg"
                className="d-block w-100"
                alt="banner-img-2"
              />
              <div className="carousel-caption top-0 mt-5 d-md-flex align-items-center flex-column justify-content-center">
                <div className="caption-overlay rounded-4">
                  <p className="">Apple</p>
                  <h2>Think different, think Apple</h2>
                  <button className="btn btn-primary">Shop Now</button>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="../../src/assets/images/banner-img-3.jpg"
                className="d-block w-100"
                alt="banner-img-3"
              />
              <div className="carousel-caption top-0 mt-5 d-md-flex align-items-center flex-column justify-content-center">
                <div className="caption-overlay rounded-4">
                  <p>reamme</p>
                  <h2>Dare To Leap</h2>
                  <button className="btn btn-primary">Shop Now</button>
                </div>
              </div>
            </div>
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
  );
};
