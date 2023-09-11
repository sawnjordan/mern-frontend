import React from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

export const ImagePreview = ({ imageURL, imgFolder }) => {
  const onInit = () => {
    // console.log("lightGallery has been initialized");
  };
  return (
    <LightGallery onInit={onInit} speed={500} plugins={[lgThumbnail, lgZoom]}>
      <a href={`${import.meta.env.VITE_IMAGE_URL}/${imgFolder}/${imageURL}`}>
        <img
          width="100px"
          height="100px !important"
          className="rounded"
          alt={`${imgFolder}-image`}
          src={`${import.meta.env.VITE_IMAGE_URL}/${imgFolder}/${imageURL}`}
        />
      </a>
    </LightGallery>
  );
};
