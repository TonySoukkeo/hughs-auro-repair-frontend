import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback
} from "react";
import { Route, Redirect } from "react-router-dom";

// Components
import PostCards from "../../components/dashboard/PostCards";
import Loading from "../../components/loading/Loading";
import Overlay from "../../components/overlay/Overlay";

// Context
import { StateContext } from "../../context/StateProvider";

// Custom hooks
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";

const ViewPosts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [postId, setPostId] = useState("");

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
  }, []);

  // Observer and ref for infinite loading
  const observer = useRef();
  const lastPostElement = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && loadMore) {
        // Load more from api

        // Increment page number
        setPage(prevPage => prevPage + 1);

        // Get next set of posts
        const loadMorePosts = async () => {
          try {
            setLoading(true);
            setLoadingType("load more");

            const results = await fetch(
              `${process.env.REACT_APP_BASE_URL}/blog/posts?page=${page +
                1}&limit=${20}`
            );

            const resultsData = await results.json();

            // Check for any errors
            if (resultsData.status !== 200) {
              const error = new Error();
              error.message = resultsData.message;

              throw error;
            }

            setPosts(prevPosts => [...prevPosts, ...resultsData.blog]);
            setLoadMore(resultsData.loadMore);
            setLoading(false);
            setLoadingType("");
          } catch (err) {
            setLoading(false);
            setLoadingType("");
            setError(err.message);
          }
        };

        loadMorePosts();
      }
    });

    if (node) observer.current.observe(node);
  });

  const showDeleteAlert = id => {
    setDeleteAlert(true);
    setPostId(id);
  };

  // Delete post
  const deletePost = async id => {
    try {
      setLoading(true);
      setLoadingType("delete");
      setError("");

      const deletedPost = await fetch(
        `${process.env.REACT_APP_BASE_URL}/blog/posts?blogId=${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const deletedPostData = await deletedPost.json();

      // Check for any errors
      if (deletedPostData.status !== 201) {
        const error = new Error();
        error.message = deletedPostData.message;

        throw error;
      }

      setPosts(prevPosts => prevPosts.filter(post => post._id !== id));
      setLoading(false);
      setLoadingType("");
      setDeleteAlert(false);
      setPostId("");
    } catch (err) {
      setDeleteAlert(false);
      setPostId("");
      setLoading(false);
      setLoadingType("");
      setError(err.message);
    }
  };

  return (
    <Route
      render={() =>
        isAuth ? (
          <React.Fragment>
            {deleteAlert ? <Overlay classname="overlay--dark" /> : null}

            <section className="dashboard__view-posts container">
              <h2>Manage blog posts</h2>

              {deleteAlert ? (
                <div className="dashboard__view-posts__alert">
                  <h2>Are you sure you want to delete this post?</h2>

                  {loading && loadingType === "delete" ? (
                    <Loading
                      styles={{
                        width: "3rem",
                        alignSelf: "center",
                        marginTop: "1rem"
                      }}
                    />
                  ) : (
                    <div className="dashboard__view-posts__alert-actions">
                      <button
                        onClick={() => {
                          setDeleteAlert(false);
                          setPostId("");
                        }}
                        className="btn btn--white"
                      >
                        No
                      </button>
                      <button
                        onClick={() => deletePost(postId)}
                        className="btn btn--blue"
                      >
                        Yes
                      </button>
                    </div>
                  )}
                </div>
              ) : null}

              {error ? (
                <div className="alert alert--err mb-md">{error}</div>
              ) : null}
              {loading && loadingType === "main" ? (
                <Loading
                  styles={{
                    width: "4rem",
                    alignSelf: "center",
                    marginTop: "2rem"
                  }}
                />
              ) : (
                <div className="dashboard__view-posts-grid">
                  {posts.map((post, index) => {
                    if (index + 1 === posts.length) {
                      return (
                        <PostCards
                          ref={lastPostElement}
                          key={post._id}
                          title={post.title}
                          postedDate={post.postedDate}
                          body={post.body}
                          edited={post.edited && post.edited.date}
                          id={post._id}
                          showDeleteAlert={showDeleteAlert}
                        />
                      );
                    } else
                      return (
                        <PostCards
                          key={post._id}
                          title={post.title}
                          postedDate={post.postedDate}
                          body={post.body}
                          edited={post.edited && post.edited.date}
                          id={post._id}
                          showDeleteAlert={showDeleteAlert}
                        />
                      );
                  })}
                  {loading && loadingType === "load more" ? (
                    <Loading styles={{ width: "4rem", margin: "0 auto" }} />
                  ) : null}
                </div>
              )}
            </section>
          </React.Fragment>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ViewPosts;
