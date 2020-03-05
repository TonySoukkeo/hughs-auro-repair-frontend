import React, { useEffect, useState, useCallback, useRef } from "react";
import { Helmet } from "react-helmet";

// Components
import ReviewCard from "../components/reviews/ReviewCard";
import Loading from "../components/loading/Loading";

// Custom hooks
import useError from "../hooks/useError";
import useLoading from "../hooks/useLoading";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const [error, setError] = useError();
  const [loading, setLoading, loadingType, setLoadingType] = useLoading();

  const [page, setPage] = useState(0);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setLoading(true);
        setLoadingType("main");
        const reviews = await fetch(
          `${process.env.REACT_APP_BASE_URL}/reviews?limit=${20}`
        );

        const reviewsData = await reviews.json();

        // Check for errors
        if (reviewsData.status !== 200) {
          const error = new Error();
          error.message = reviewsData.message;

          throw error;
        }

        setReviews(reviewsData.reviews);
        setLoadMore(reviewsData.loadMore);
        setLoading(false);
        setLoadingType("");
      } catch (err) {
        setLoading(false);
        setLoadingType("");
        setError(err.message);
      }
    };

    getReviews();

    // Cleanup
    return () => setReviews([]);
  }, []);

  // Set up pages for infinite load
  const observer = useRef();

  const lastElement = useCallback(node => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0] && entries[0].isIntersecting && loadMore) {
        const loadMoreReviews = async () => {
          try {
            setPage(prevPage => prevPage + 1);

            setLoading(true);
            setLoadingType("load more");

            const reviews = await fetch(
              `${process.env.REACT_APP_BASE_URL}/reviews?limit=${20}`
            );

            const reviewsData = await reviews.json();

            // Check for any errors
            if (reviewsData.status !== 200) {
              const error = new Error();
              error.message = reviewsData.message;

              throw error;
            }

            setReviews(prevState => ({
              ...prevState,
              ...reviewsData.reviews
            }));

            setLoadMore(reviewsData.loadMore);

            setLoading(false);
            setLoadingType("");
          } catch (err) {
            setLoading(false);
            setLoadingType("");
            setError(err.message);
          }
        };

        loadMoreReviews();
      }
    });
  });

  return (
    <section className="reviews container">
      <Helmet>
        <title>Hugh's diesel and auto repair | Testimonials</title>

        <meta
          name="description"
          content="We offer the best quality service that you can find. We have 5 out of 5 stars and customers always leave happy! Our reviews speak for themselves! If you're looking for any automotive repair, you can request a free quote, or give us a call at (406)866-0113, located in Great Falls, Montana"
        />
      </Helmet>

      <h1>Top quality service you can depend on!</h1>

      <p>See what others have to say!</p>

      {error ? <div className="alert alert--err mt-sm">{error}</div> : null}

      {loading && loadingType === "main" ? (
        <Loading
          styles={{ width: "3rem", alignSelf: "center", marginTop: "1rem" }}
        />
      ) : (
        <div className="reviews__grid">
          {reviews.map((item, index) => {
            if (index + 1 === reviews.length) {
              return (
                <ReviewCard
                  ref={lastElement}
                  key={item._id}
                  name={item.name}
                  review={item.review}
                />
              );
            } else
              return (
                <ReviewCard
                  key={item._id}
                  name={item.name}
                  review={item.review}
                />
              );
          })}
        </div>
      )}

      {loading && loadingType === "load more" ? (
        <Loading styles={{ width: "3rem", alignSelf: "center" }} />
      ) : null}
    </section>
  );
};

export default Reviews;
