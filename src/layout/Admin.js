import React, { useState, useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Loading from "../components/loading/Loading";

// Custom hooks
import useError from "../hooks/useError";
import useLoading from "../hooks/useLoading";

// Actions
import { postLogin } from "../reducers/actions/AuthActions";

// Context
import { DispatchContext } from "../context/StateProvider";
import { StateContext } from "../context/StateProvider";

const Admin = ({ history }) => {
  const [login, setLogin] = useState({ email: "", password: "" });

  const { email, password } = login;

  const [error, setError] = useError();
  const [loading, setLoading] = useLoading();

  const { authDispatch } = useContext(DispatchContext);

  const { isAuth } = useContext(StateContext);

  const onChange = e => {
    const value = e.target.value;
    const name = e.target.name;

    setLogin(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Login submit
  const submitLogin = async e => {
    try {
      e.preventDefault();

      setLoading(true);
      const userLogin = await postLogin(email, password, authDispatch);

      // Check for any errors
      if (userLogin.status !== 200) {
        const error = new Error();
        error.message = userLogin.message;

        throw error;
      }

      // Continue if there are no errors

      // Reset errors and login fields
      setError("");
      setLogin({
        email: "",
        password: ""
      });

      setLoading(false);

      history.push("/");
    } catch (err) {
      setLoading(false);
      setLogin(prevState => ({
        ...prevState,
        password: ""
      }));
      setError(err.message);
    }
  };

  return (
    <Route
      render={() =>
        !isAuth ? (
          <section className="admin container">
            <h2>
              <span>
                <i className="fas fa-user-lock"></i>
              </span>
              Login
            </h2>

            <form onSubmit={submitLogin} className="form">
              {/*** Error Alert ***/}
              {error ? (
                <div className="alert alert--err mb-md">{error}</div>
              ) : null}

              <div className="form__group">
                <input
                  onChange={onChange}
                  value={email}
                  placeholder="Email"
                  name="email"
                  className="form__input form__input--border"
                  type="email"
                />
              </div>

              <div className="form__group">
                <input
                  onChange={onChange}
                  value={password}
                  placeholder="Password"
                  name="password"
                  className="form__input form__input--border"
                  type="password"
                />
              </div>
              {!loading ? (
                <button
                  disabled={!email || !password}
                  className={
                    !email || !password ? "btn btn--disabled" : "btn btn--blue"
                  }
                  type="submit"
                >
                  Login
                </button>
              ) : (
                <Loading styles={{ width: "3rem" }} />
              )}
            </form>
          </section>
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
};

export default Admin;
