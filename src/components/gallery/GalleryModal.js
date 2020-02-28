import React from "react";

const GalleryModal = ({ image, closeModal }) => {
  return (
    <div className="gallery__modal">
      <span onClick={closeModal}>close</span>
      <img src={image} alt="Gallery img" />
    </div>
  );
};

export default GalleryModal;
