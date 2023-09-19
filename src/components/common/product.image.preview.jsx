import React from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { Col, Row } from "react-bootstrap";

export const ProductImagePreview = ({ imgNames, imgFolder }) => {
  const onInit = () => {
    // console.log("lightGallery has been initialized");
  };
  //   console.log(imgNames);
  return (
    // <LightGallery onInit={onInit} speed={500} plugins={[lgThumbnail, lgZoom]}>
    //   {imgNames.map((img, i) => (
    //     <a
    //       key={i}
    //       href={`${import.meta.env.VITE_IMAGE_URL}/${imgFolder}/${img}`}
    //     >
    //       <img
    //         className="rounded p-2 img img-fluid"
    //         alt={`${img}`}
    //         src={`${import.meta.env.VITE_IMAGE_URL}/${imgFolder}/${img}`}
    //       />
    //     </a>
    //   ))}
    // </LightGallery>
    <LightGallery onInit={onInit} speed={500} plugins={[lgThumbnail, lgZoom]}>
      <Row>
        {imgNames.map((img, i) => (
          <Col lg={3} key={i} style={{ cursor: "pointer" }}>
            <a
              key={i}
              href={`${import.meta.env.VITE_IMAGE_URL}/${imgFolder}/${img}`}
            >
              <img
                className="rounded p-2 img img-fluid"
                alt={`${img}`}
                src={`${import.meta.env.VITE_IMAGE_URL}/${imgFolder}/${img}`}
              />
            </a>
          </Col>
        ))}
      </Row>
    </LightGallery>
  );
};
