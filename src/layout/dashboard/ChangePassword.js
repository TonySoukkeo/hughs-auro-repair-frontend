import React, { useState, useContext } from "react";
import { Redirect, Route } from "react-router-dom";

// Context
import { StateContext } from "../../context/StateProvider";

// Components
import Loading from "../../components/loading/Loading";

// Custom hooks
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";

const ChangePassword = () => {
  const [input, setInput] = useState({
    oldPW: "",
    newPW: "",
    confirmNewPW: ""
  });

  const [success, setSuccess] = useState("");

  const { oldPW, newPW, confirmNewPW } = input;

  const { isAuth, token } = useContext(StateContext);

  const [error, setError] = useError();
  const [loading, setLoading] = useLoading();

  const onChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setInput(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const submitChangePassword = async e => {
    try {
      e.preventDefault();
      setLoading(true);
      setError("");
      setSuccess("");

      // Check if new password matches confirmed new password
      if (newPW !== confirmNewPW) {
        const error = new Error();
        error.message = "Passwords do not match";

        throw error;
      }

      const pwChange = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/password-reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            oldPassword: oldPW,
            password: newPW
          })
        }
      );

      const pwChangeData = await pwChange.json();

      // Check for any errors;
      if (pwChangeData.status !== 200) {
        const error = new Error();
        error.message = pwChangeData.message;
        throw error;
      }

      setSuccess(pwChangeData.message);
      setLoading(false);
      setInput({
        oldPW: "",
        newPW: "",
        confirmNewPW: ""
      });
    } catch (err) {
      setLoading(false);
      setSuccess(false);
      setInput(prevState => ({
        ...prevState,
        newPW: "",
        confirmNewPW: ""
      }));
      setError(err.message);
    }
  };

  return (
    <Route
      render={() =>
        isAuth ? (
          <section className="dashboard__password container">
            {success ? (
              <div className="alert alert--success mb-sm">{success}</div>
            ) : null}

            {error ? (
              <div className="alert alert--err mb-sm">{error}</div>
            ) : null}

            <form
              onSubmit={e => {
                e.persist();
                submitChangePassword(e);
              }}
              className="form"
            >
              <div className="form__group">
                <input
                  className="form__input form__input--border"
                  type="password"
                  placeholder="Old Password"
                  name="oldPW"
                  value={oldPW}
                  onChange={onChange}
                />
              </div>

              <div className="form__group">
                <input
                  className="form__input form__input--border"
                  type="password"
                  placeholder="New Password"
                  name="newPW"
                  value={newPW}
                  onChange={onChange}
                />
              </div>

              <div className="form__group">
                <input
                  className="form__input form__input--border"
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmNewPW"
                  value={confirmNewPW}
                  onChange={onChange}
                />
              </div>

              {loading ? (
                <Loading styles={{ width: "3rem" }} />
              ) : (
                <button className="btn btn--blue">Submit</button>
              )}
            </form>
          </section>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ChangePassword;
