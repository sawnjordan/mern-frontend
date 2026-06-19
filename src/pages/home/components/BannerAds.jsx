import React from "react";
import adsImg from "../../../assets/images/banner-img-1.jpg";
import { Card, Col, Container, Row } from "react-bootstrap";
export const BannerAds = () => {
  return (
    <>
      <div id="banner-ads-1" className="container-fluid ads-wrapper pt-3 pb-3">
        <div className="row">
          <div className="col-lg-12">
            <a href="/">
              <img className="img-fluid" src={adsImg} alt="Advertisement Banner" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
