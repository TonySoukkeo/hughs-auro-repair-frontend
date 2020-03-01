import React, { useEffect, useState, useContext } from "react";

// Components
import PostCards from "../../components/dashboard/PostCards";
import Loading from "../../components/loading/Loading";

// Context
import { StateContext } from "../../context/StateProvider";

// Custom hooks
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";

const ViewPosts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);

  const { isAuth, token } = useContext(StateContext);

  const [loading, setLoading, loadingType, setLoadingType] = useLoading();
  const [error, setError] = useError();

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        setLoadingType("main");

        const fetchedPosts = await fetch(
          `${
            process.env.REACT_APP_BASE_URL
          }/blog/posts?page=${page}&limit=${20}`
        );

        const fetchedPostsData = await fetchedPosts.json();

        // Check for any errors
        if (fetchedPostsData.status !== 200) {
          const error = new Error();
          error.message = fetchedPostsData.message;

          throw error;
        }

        // Set posts
        setPosts(fetchedPostsData.blog);

        // Set load more
        setLoadMore(fetchedPostsData.loadMore);

        setLoading(false);
        setLoadingType("");
      } catch (err) {
        setLoading(false);
        setLoadingType("");
        setError(err.message);
      }
    };

    getPosts();
  }, [page]);
  return (
    <section className="dashboard__view-posts container">
      <h2>Manage blog posts</h2>

      {error ? <div className="alert alert--err mb-md">{error}</div> : null}
      {loading && loadingType === "main" ? (
        <Loading
          styles={{ width: "4rem", alignSelf: "center", marginTop: "2rem" }}
        />
      ) : (
        <div className="dashboard__view-posts-grid">
          {posts.map(post => (
            <PostCards
              key={post._id}
              title={post.title}
              postedDate={post.postedDate}
              body={post.body}
              edited={post.edited && post.edited.date}
              id={post._id}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ViewPosts;
