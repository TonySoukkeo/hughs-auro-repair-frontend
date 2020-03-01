import React, { useContext, useState } from "react";
import { Route, Redirect, Link } from "react-router-dom";

// Context
import { StateContext } from "../../context/StateProvider";

// Custom hooks
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";

// Components
import Loading from "../../components/loading/Loading";

const AddPost = () => {
  const [input, setInput] = useState({
    title: "",
    body: ""
  });
  const [blogId, setBlogId] = useState("");

  const { isAuth, token } = useContext(StateContext);

  const [error, setError] = useError();
  const [loading, setLoading] = useLoading();

  const { title, body } = input;

  const onChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setInput(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const addPost = async e => {
    try {
      e.preventDefault();
      setLoading(true);

      // Check if title or body is empty
      if (!title || !body) {
        const error = new Error();
        error.message = "Both fields must be filled out";

        throw error;
      }

      // API call
      const post = await fetch(`${process.env.REACT_APP_BASE_URL}/blog/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          content: body
        })
      });

      const postData = await post.json();

      if (postData.status !== 200) {
        const error = new Error();
        error.message = postData.message;

        throw error;
      }

      setInput({
        title: "",
        body: ""
      });
      setBlogId(postData.id);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
    e.preventDefault();
  };

  return (
    <Route
      render={() =>
        isAuth ? (
          <section className="dashboard__add-post container">
            {!blogId ? (
              <div className="dashboard__add-post__header">
                <h2>Add a new post</h2>
              </div>
            ) : null}

            {error ? (
              <div className="alert alert--err mb-md">{error}</div>
            ) : null}

            {!blogId ? (
              <form
                onSubmit={e => {
                  e.persist();
                  addPost(e);
                }}
              >
                <div className="form__group">
                  <label htmlFor="title">Title*</label>
                  <input
                    id="title"
                    value={title}
                    onChange={onChange}
                    type="text"
                    name="title"
                    autoComplete="off"
                  />
                </div>

                <div className="form__group">
                  <label htmlFor="body">Post body*</label>
                  <textarea
                    value={body}
                    onChange={onChange}
                    name="body"
                    id="body"
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>

                {!loading ? (
                  <button
                    disabled={!title || !body}
                    type="submit"
                    className={
                      !title || !body ? "btn btn--disabled" : "btn btn--blue"
                    }
                  >
                    Add Post
                  </button>
                ) : (
                  <Loading styles={{ width: "2rem", alignSelf: "flex-end" }} />
                )}
              </form>
            ) : (
              <div className="dashboard__success">
                <h3>Post added!</h3>

                <p onClick={() => setBlogId("")}>Add another post</p>

                <Link to={`/blog/${blogId}`}>View Post</Link>
              </div>
            )}
          </section>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default AddPost;
