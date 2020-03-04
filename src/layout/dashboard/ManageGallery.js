import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback
} from "react";
import { Route, Redirect } from "react-router-dom";
import { Helmet } from 'react-helmet';

// Components
import ManageGalleryImage from "../../components/dashboard/ManageGalleryImage";
import Loading from "../../components/loading/Loading";
import Overlay from "../../components/overlay/Overlay";

// custom hooks
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";

// Context
import { StateContext } from "../../context/StateProvider";

const ManageGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [image, setImage] = useState("");
  const [page, setPage] = useState(1);
  const [imageId, setImageId] = useState("");
  const [loadMore, setLoadMore] = useState(false);

  const [loading, setLoading, loadingType, setLoadingType] = useLoading();
  const [error, setError] = useError();

  const { token, isAuth } = useContext(StateContext);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        setLoadingType("main");

        const images = await fetch(
          `${
            process.env.REACT_APP_BASE_URL
          }/gallery/images?page=${page}&limit=${6}`
        );

        const imagesData = await images.json();

        // Check for any errors
        if (imagesData.status !== 200) {
          const error = new Error();
          error.message = imagesData.message;

          throw error;
        }

        // Continue if there are no errors

        setGallery(imagesData.gallery);
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
  }, []);

  // Image select
  const selectImage = e => {
    try {
      // reset error if any
      setError("");

      const file = e.target.files[0];

      if (!file) {
        setImage("");
        return;
      }

      // Verify image type
      if (
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg"
      ) {
        // Set valid image to true
        setImage(file);
      } else {
        // Set valid image to false
        setImage("");
        const error = new Error();
        error.message = "Image format must be png, jpg, or jpeg";

        throw error;
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Upload image
  const uploadImage = async () => {
    try {
      setLoading(true);
      setLoadingType("upload");

      const formData = new FormData();

      formData.append("img", image);

      const postImage = await fetch(
        `${process.env.REACT_APP_BASE_URL}/gallery/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        }
      );

      const postImageData = await postImage.json();

      // Check for any errors
      if (postImageData.status !== 200) {
        const error = new Error();
        error.message = postImageData.message;

        throw error;
      }

      setGallery(prevState => [postImageData.image, ...prevState]);
      setImage("");
      setLoadingType("");
      setLoading(false);
    } catch (err) {
      setImage("");
      setLoading(false);
      setLoadingType("");
      setError(err.message);
    }
  };

  // Delete image
  const deleteImage = async () => {
    try {
      setLoading(true);
      setLoadingType("delete");

      const deletedImage = await fetch(
        `${process.env.REACT_APP_BASE_URL}/gallery/upload?imageId=${imageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const deletedImageData = await deletedImage.json();

      // Check for any errors
      if (deletedImageData.status !== 201) {
        const error = new Error();
        error.message = deletedImageData.message;
        throw error;
      }

      setGallery(gallery.filter(image => image._id !== imageId));
      setImageId("");
      setLoading(false);
      setLoadingType("");
    } catch (err) {
      setLoading(false);
      setLoadingType("");
      setImageId("");
      setError(err.message);
    }
  };

  // Observer and ref for infinite loading
  const observer = useRef();

  const lastImageElement = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && loadMore) {
          // Load from api
          const loadMoreImages = async () => {
            try {
              setPage(prevPage => prevPage + 1);
              setLoading(true);
              setLoadingType("load more");

              const images = await fetch(
                `${process.env.REACT_APP_BASE_URL}/gallery/images?page=${page +
                  1}&limit=${6}`
              );

              const imagesData = await images.json();

              // Check for any errors
              if (imagesData.status !== 200) {
                const error = new Error();
                error.message = imagesData.message;

                throw error;
              }

              setGallery(prevState => [...prevState, ...imagesData.gallery]);
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
    [loading, loadMore]
  );

  return (
    <Route
      render={() =>
        isAuth ? (
          <React.Fragment>
            {imageId ? <Overlay classname="overlay--dark" /> : null}

            <section className="dashboard__manage-gallery container">
              <Helmet>
                <title>Hugh's diesel and auto repair | Manage Galery</title>
              </Helmet>  
              {error ? <div className="alert alert--err">{error}</div> : null}

              {imageId ? (
                <div className="dashboard__manage-gallery__alert">
                  <h3>Are you sure you want to delete this image?</h3>

                  {loading && loadingType === "delete" ? (
                    <Loading styles={{ width: "3rem", alignSelf: "center" }} />
                  ) : (
                    <div className="dashboard__manage-gallery__alert-actions">
                      <button
                        onClick={() => setImageId("")}
                        className="btn btn--white"
                      >
                        No
                      </button>
                      <button onClick={deleteImage} className="btn btn--blue">
                        Yes
                      </button>
                    </div>
                  )}
                </div>
              ) : null}

              <div className="dashboard__manage-gallery__upload">
                <h3>Upload Image</h3>

                <label htmlFor="image">
                  <i
                    className={
                      image
                        ? "fas fa-file-upload color-green"
                        : "fas fa-file-upload"
                    }
                  ></i>
                </label>
                <input
                  onChange={e => {
                    e.persist();
                    selectImage(e);
                  }}
                  id="image"
                  type="file"
                />

                {loading && loadingType === "upload" ? (
                  <Loading styles={{ width: "2rem", alignSelf: "center" }} />
                ) : (
                  <button
                    onClick={image ? uploadImage : null}
                    className={image ? "btn btn--blue" : "btn btn--disabled"}
                  >
                    Upload
                  </button>
                )}
              </div>

              {loading && loadingType === "main" ? (
                <Loading styles={{ width: "5rem", alignSelf: "center" }} />
              ) : (
                <div className="dashboard__manage-gallery__images">
                  {gallery.map((image, index) => {
                    if (index + 1 === gallery.length) {
                      return (
                        <ManageGalleryImage
                          key={image._id}
                          ref={lastImageElement}
                          image={image.url}
                          onClick={() => setImageId(image._id)}
                        />
                      );
                    } else {
                      return (
                        <ManageGalleryImage
                          key={image._id}
                          image={image.url}
                          onClick={() => setImageId(image._id)}
                        />
                      );
                    }
                  })}
                </div>
              )}

              {loading && loadingType === "load more" ? (
                <Loading
                  styles={{
                    width: "3rem",
                    alignSelf: "center",
                    marginTop: "2rem"
                  }}
                />
              ) : null}
            </section>
          </React.Fragment>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ManageGallery;
