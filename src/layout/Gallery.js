import React, { useState } from "react";

// Components
import Overlay from "../components/overlay/Overlay";
import GalleryModal from "../components/gallery/GalleryModal";

const Gallery = () => {
  const [selectImage, setSelectImage] = useState("");

  const viewImage = img => {
    setSelectImage(img);
  };

  const closeImage = () => {
    setSelectImage("");
  };

  return (
    <React.Fragment>
      {selectImage ? <Overlay classname="overlay--dark" /> : null}

      <section className="gallery container">
        {selectImage ? (
          <GalleryModal image={selectImage} closeModal={closeImage} />
        ) : null}

        <div
          onClick={() =>
            viewImage(
              "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            )
          }
          className="gallery__image-container"
        >
          <img
            src="https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt=""
          />
        </div>

        <div className="gallery__image-container">
          <img
            src="https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt=""
          />
        </div>

        <div className="gallery__image-container">
          <img
            src="https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt=""
          />
        </div>

        <div className="gallery__image-container">
          <img
            style={{ objectFit: "cover" }}
            src="https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt=""
          />
        </div>

        <div className="gallery__image-container">
          <img
            style={{ objectFit: "cover" }}
            src="https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt=""
          />
        </div>

        <div className="gallery__image-container">
          <img
            style={{ objectFit: "cover" }}
            src="https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt=""
          />
        </div>
      </section>
    </React.Fragment>
  );
};

export default Gallery;
