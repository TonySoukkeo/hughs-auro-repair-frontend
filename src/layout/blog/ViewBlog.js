import React, { useState, useEffect, useContext } from "react";
import Moment from "react-moment";
import { FacebookShareButton, FacebookIcon } from "react-share";

// Components
import Loading from "../../components/loading/Loading";

// Hooks
import useLoading from "../../hooks/useLoading";
import useError from "../../hooks/useError";

// useContext
import { StateContext } from "../../context/StateProvider";

const ViewBlog = ({ match }) => {
  const [blog, setBlog] = useState({});
  const [url, setUrl] = useState("");

  const [loading, setLoading] = useLoading();
  const [error, setError] = useError();

  const { isAuth } = useContext(StateContext);

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
  }, []);

  return (
    <section className="view-blog container">
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
              Edited
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

          <div className="view-blog__content">{blog.body}</div>
        </React.Fragment>
      ) : (
        <Loading styles={{ width: "5rem", alignSelf: "center" }} />
      )}
    </section>
  );
};

export default ViewBlog;
