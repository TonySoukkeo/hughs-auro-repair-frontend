import React from "react";

const Image = React.forwardRef(({ image, index, viewImage }, ref) => {
  return (
    <div
      ref={ref}
      onClick={() => viewImage(image)}
      className="gallery__image-container"
    >
      <img
        src={`${process.env.REACT_APP_BASE_URL}${image.url}`}
        alt={`Gallery ${index + 1}`}
      />
    </div>
  );
});

export default Image;
