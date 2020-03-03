import React from "react";

const GalleryModal = ({ image, closeModal }) => {
  return (
    <div className="gallery__modal">
      <span onClick={closeModal}>close</span>
      <img
        src={`${process.env.REACT_APP_BASE_URL}${image.url}`}
        alt="Gallery img"
      />
    </div>
  );
};

export default GalleryModal;
