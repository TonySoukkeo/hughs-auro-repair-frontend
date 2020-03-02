import React, { useState, useEffect } from "react";

// Components
import Overlay from "../components/overlay/Overlay";
import GalleryModal from "../components/gallery/GalleryModal";
import Image from "../components/gallery/Image";
import Loading from "../components/loading/Loading";

// Custom hooks
import useLoading from "../hooks/useLoading";
import useError from "../hooks/useError";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectImage, setSelectImage] = useState("");
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useLoading();
  const [error, setError] = useError();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);

        const images = await fetch(
          `${
            process.env.REACT_APP_BASE_URL
          }/gallery/images?page=${page}&limit=${12}`
        );

        const imagesData = await images.json();

        // Check for any errors
        if (imagesData.status !== 200) {
          const error = new Error();
          error.message = imagesData.message;

          throw error;
        }

        // Continue if there are no errors

        setImages(imagesData.gallery);
        setLoadMore(imagesData.loadMore);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };

    fetchGallery();
  }, []);

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
        {error ? <div className="alert alert--err">{error}</div> : null}

        {selectImage ? (
          <GalleryModal image={selectImage} closeModal={closeImage} />
        ) : null}

        {images.length > 0 ? (
          <div className="gallery__grid">
            {images.map(image => (
              <Image key={image._id} image={image} viewImage={viewImage} />
            ))}
          </div>
        ) : (
          <h1>No images currently</h1>
        )}
      </section>
    </React.Fragment>
  );
};

export default Gallery;
