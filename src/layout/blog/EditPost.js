import React, { useState, useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";

// hooks
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";

// Components
import Loading from "../../components/loading/Loading";
import BlogInput from "../../components/form/BlogInput";
import BlogTextArea from "../../components/form/BlogTextArea";

// Context
import { StateContext } from "../../context/StateProvider";

const EditPost = ({ match, history }) => {
  const [input, setInput] = useState({
    title: "",
    body: ""
  });

  const [loading, setLoading, loadingType, setLoadingType] = useLoading();
  const [error, setError] = useError();

  const { token, isAuth } = useContext(StateContext);

  const { title, body } = input;

  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true);
        setLoadingType("load");

        const blogId = match.params.id;
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

        // set values of input
        setInput({
          title: postData.blog.title,
          body: postData.blog.body
        });

        setLoading(false);
      } catch (err) {
        setLoading(false);
        setLoadingType("");
        setError(err.message);
      }
    };

    getPost();

    return () => {
      setInput({
        title: "",
        body: ""
      });
    };
  }, []);

  const onChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setInput(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const updatePost = async e => {
    try {
      e.preventDefault();
      setLoadingType("update");
      setLoading(true);

      const update = await fetch(
        `${process.env.REACT_APP_BASE_URL}/blog/posts?blogId=${match.params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            title,
            content: body
          })
        }
      );

      const updateData = await update.json();

      // Check for any errors
      if (updateData.status !== 200) {
        const error = new Error();
        error.message = updateData.message;
        throw error;
      }

      setLoadingType("");
      setLoading(false);
      history.push(`/blog/${match.params.id}`);
    } catch (err) {
      setLoadingType("");
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <Route
      render={() =>
        isAuth ? (
          <section className="blog__edit container">
            {error ? (
              <div className="alert alert--err mb-md">{error}</div>
            ) : null}

            {loading && loadingType === "load" ? (
              <Loading styles={{ width: "3rem", alignSelf: "center" }} />
            ) : (
              <form
                onSubmit={e => {
                  e.persist();
                  updatePost(e);
                }}
                className="form"
              >
                <h2 style={{ marginBottom: "1rem" }}>Edit post</h2>

                <BlogInput
                  label="title"
                  title="Title*"
                  value={title}
                  onChange={onChange}
                  name="title"
                />

                <BlogTextArea
                  label="body"
                  title="Post body*"
                  value={body}
                  name="body"
                  onChange={onChange}
                  cols="30"
                  rows="10"
                />

                <div className="form__actions">
                  {loading && loadingType === "update" ? (
                    <Loading
                      styles={{
                        width: "2rem"
                      }}
                    />
                  ) : (
                    <React.Fragment>
                      <div
                        onClick={() => history.push(`/blog/${match.params.id}`)}
                        style={{ borderRadius: "5px", marginRight: "1rem" }}
                        className="btn btn--white"
                      >
                        Cancel
                      </div>

                      <button
                        style={{ fontSize: "1rem" }}
                        type="submit"
                        className="btn btn--blue"
                      >
                        Update
                      </button>
                    </React.Fragment>
                  )}
                </div>
              </form>
            )}
          </section>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default EditPost;
