import React, { useState, useEffect } from "react";

// Hooks
import useLoading from "../../hooks/useLoading";
import useError from "../../hooks/useError";

const ViewBlog = ({ match }) => {
  const [blog, setBlog] = useState({});

  const [loading, setLoading] = useLoading();
  const [error, setError] = useError();

  useEffect(() => {
    const getPost = async () => {
      try {
        // Get blog post id from url params
        const blogId = match.params.id;

        setLoading(true);
        const post = await fetch(
          `${process.env.REACT_APP_BASE_URL}/blog/post?blogId=${blogId}`
        );

        const postData = await post.json();

        // Check for any errors
        if (postData !== 200) {
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

  return <section className="view-blog">{console.log(blog)}</section>;
};

export default ViewBlog;
