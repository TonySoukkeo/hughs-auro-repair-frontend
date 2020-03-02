import React from "react";

const Image = ({ image, index, viewImage }) => {
  return (
    <div onClick={() => viewImage(image)} className="gallery__image-container">
      <img src={image} alt={`Gallery image ${index + 1}`} />
    </div>
  );
};

export default Image;
