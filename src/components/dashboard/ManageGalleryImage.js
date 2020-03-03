import React from "react";

const ManageGalleryImage = React.forwardRef(({ image, onClick }, ref) => {
  return (
    <div ref={ref} className="dashboard__manage-gallery__images-container">
      <span onClick={onClick}>
        <i className="fas fa-trash"></i>
      </span>
      <img
        src={`${process.env.REACT_APP_BASE_URL}${image}`}
        alt="Gallery image"
      />
    </div>
  );
});

export default ManageGalleryImage;
