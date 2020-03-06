import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { FacebookShareButton, FacebookIcon } from "react-share";

// Components
import Loading from "../../components/loading/Loading";
import Overlay from "../../components/overlay/Overlay";

// Hooks
import useLoading from "../../hooks/useLoading";
import useError from "../../hooks/useError";

// useContext
import { StateContext } from "../../context/StateProvider";

const ViewBlog = ({ match, history }) => {
  const [blog, setBlog] = useState({});
  const [url, setUrl] = useState("");
  const [deleteAlert, setDeleteAlert] = useState(false);

  const [loading, setLoading] = useLoading();
  const [error, setError] = useError();

  const { isAuth, token } = useContext(StateContext);

  useEffect(() => {
    const getPost = async () => {
      try {
        // Get blog post id from url params
        const blogId = match.params.id;

        // Set url
        setUrl(window.location.href);

        setLoading(true);
        const post = await fetch(
          `${process.env.REACT_APP_BASE_URL}/blog/post?blogId=${blogId}`
        );

        const postData = await post.json();

        // Check for any errors
        if (postData.status !== 200) {
          const error = new Error();
          error.message = postData.message;

          throw error;
        }

        // continue if there are no errors

        setBlog(postData.blog);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };

    getPost();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deletePost = async () => {
    try {
      setDeleteAlert(false);
      setLoading(true);

      const deletedPost = await fetch(
        `${process.env.REACT_APP_BASE_URL}/blog/posts?blogId=${blog._id}`,
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

      setLoading(false);
      history.push("/blog");
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <React.Fragment>
      {deleteAlert ? <Overlay classname="overlay--dark" /> : null}

      <section className="view-blog container">
        {error ? <div className="alert alert--err">{error}</div> : null}

        {deleteAlert ? (
          <div className="view-blog__alert">
            <h2>Are you sure you want to delete this post?</h2>

            <button onClick={() => setDeleteAlert(false)}>No</button>
            <button onClick={deletePost}>Yes</button>
          </div>
        ) : null}

        {!loading ? (
          <React.Fragment>
            <h1>{blog.title}</h1>

            <h3>
              <Moment format="MMM D YYYY" withTitle>
                {blog.postedDate}
              </Moment>
            </h3>
            {blog.edited ? (
              <span className="view-blog__edited">
                <p>Edited</p>
                <Moment format="MMM D YYYY" withTitle>
                  {blog.edited.date}
                </Moment>
              </span>
            ) : null}

            <FacebookShareButton
              resetButtonStyle={false}
              className="share-btn"
              url={url}
              children={
                <div className="view-blog__share">
                  <span>
                    <p> Share post </p> <FacebookIcon size={25} round={true} />
                  </span>
                </div>
              }
            />

            {isAuth ? (
              <div className="view-blog__admin">
                <Link to={`/blog/edit/${blog._id}`}>Edit Post</Link>
                <button onClick={() => setDeleteAlert(true)}>
                  Delete Post
                </button>
              </div>
            ) : null}

            <div className="view-blog__content">{blog.body}</div>
          </React.Fragment>
        ) : (
          <Loading styles={{ width: "5rem", alignSelf: "center" }} />
        )}
      </section>
    </React.Fragment>
  );
};

export default ViewBlog;
