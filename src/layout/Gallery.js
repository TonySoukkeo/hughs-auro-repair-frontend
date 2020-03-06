import React, { useState, useEffect, useCallback, useRef } from "react";
import { Helmet } from "react-helmet";

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

  const [loading, setLoading, loadingType, setLoadingType] = useLoading();
  const [error, setError] = useError();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        setLoadingType("main");

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
        setLoadingType("");
      } catch (err) {
        setLoadingType("");
        setLoading(false);
        setError(err.message);
      }
    };

    fetchGallery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const viewImage = img => {
    setSelectImage(img);
  };

  const closeImage = () => {
    setSelectImage("");
  };

  // Observer and ref for infinite loading
  const observer = useRef();

  const lastImageElement = useCallback(
    node => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0] && entries[0].isIntersecting && loadMore) {
          const loadMoreImages = async () => {
            try {
              setPage(prevPage => prevPage + 1);
              setLoading(true);
              setLoadingType("load more");

              const images = await fetch(
                `${process.env.REACT_APP_BASE_URL}/gallery/images?page=${page +
                  1}&limit=${12}`
              );

              const imagesData = await images.json();

              // Check for any errors
              if (imagesData.status !== 200) {
                const error = new Error();
                error.message = imagesData.message;

                throw error;
              }

              setImages(prevState => [...prevState, ...imagesData.gallery]);
              setLoadMore(imagesData.loadMore);
              setLoading(false);
              setLoadingType("");
            } catch (err) {
              setLoading(false);
              setLoadingType("");
              setError(err.message);
            }
          };
          loadMoreImages();
        }
      });

      if (node) observer.current.observe(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loadMore, loading]
  );

  return (
    <React.Fragment>
      {selectImage ? <Overlay classname="overlay--dark" /> : null}

      <section className="gallery container">
        <Helmet>
          <title>Hugh's diesel and auto repair | Gallery</title>
          <meta
            title="description"
            content="Hugh's diesel and auto repair service, located in Great Falls, Montana. We provide the best quality repair service in town for a great price! Check out some of our work here."
          />
        </Helmet>
        {error ? <div className="alert alert--err">{error}</div> : null}

        {selectImage ? (
          <GalleryModal image={selectImage} closeModal={closeImage} />
        ) : null}

        {loading && loadingType === "main" ? (
          <Loading
            styles={{
              width: "4rem",
              alignSelf: "center"
            }}
          />
        ) : (
          <React.Fragment>
            {selectImage ? (
              <GalleryModal image={selectImage} closeModal={closeImage} />
            ) : null}

            {images.length > 0 ? (
              <div className="gallery__grid">
                {images.map((image, index) => {
                  if (index + 1 === images.length) {
                    return (
                      <Image
                        ref={lastImageElement}
                        key={image._id}
                        image={image}
                        viewImage={viewImage}
                      />
                    );
                  } else
                    return (
                      <Image
                        key={image._id}
                        image={image}
                        viewImage={viewImage}
                      />
                    );
                })}
              </div>
            ) : (
              <h1>No images currently</h1>
            )}
          </React.Fragment>
        )}
        {loading && loadingType === "load more" ? (
          <Loading
            styles={{ width: "3rem", marginTop: "2rem", alignSelf: "center" }}
          />
        ) : null}
      </section>
    </React.Fragment>
  );
};

export default Gallery;
