import React, { useState, useEffect } from "react";

// custom hooks
import useError from "../../hooks/useError";

import useLoading from "../../hooks/useLoading";

const ManageGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);

  const [loading, setLoading] = useLoading();
  const [error, setError] = useError();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);

        const images = await fetch(
          `${
            process.env.REACT_APP_BASE_URL
          }/gallery/images?page=${page}&limit=${16}`
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
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };

    fetchGallery();
  }, []);

  return (
    <section className="dashboard__manage-gallery container">
      {error ? <div className="alert alert--err">{error}</div> : null}

      <div className="dashboard__manage-gallery__upload">
        <h3>Upload Image</h3>

        <label htmlFor="image">
          <i className="fas fa-file-upload"></i>
        </label>
        <input id="image" type="file" />
      </div>

      <div className="dashboard__manage-gallery__images">
        {gallery.length > 0 ? (
          <p>Has Images</p>
        ) : (
          <h5>Your images will display here</h5>
        )}
      </div>
    </section>
  );
};

export default ManageGallery;
