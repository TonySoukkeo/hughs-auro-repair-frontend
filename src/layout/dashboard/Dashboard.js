import React, { useContext } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import { SET_AUTH } from "../../reducers/constants/AuthConstants";
import { Helmet } from "react-helmet";

// Components
import Manage from "../../components/dashboard/Manage";
import DashNav from "../../components/dashboard/DashNav";

// Hooks
import useError from "../../hooks/useError";

// Context
import { StateContext, DispatchContext } from "../../context/StateProvider";

const Dashboard = () => {
  const { isAuth, user } = useContext(StateContext);

  const { authDispatch } = useContext(DispatchContext);

  const [error, setError] = useError();

  const signOut = () => {
    try {
      // Remove userId and token from LS
      localStorage.removeItem("userId");
      localStorage.removeItem("token");

      authDispatch({
        type: SET_AUTH,
        payload: {
          isAuth: false,
          token: ""
        }
      });

      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Route
      render={() =>
        isAuth ? (
          <section className="dashboard">
            <Helmet>
              <title>Hugh's diesel and auto repair | Admin Dashboard</title>
            </Helmet>
            <DashNav signOut={signOut} firstName={user.firstName} />

            <div className="container mb-sm">
              <Link className="dashboard__link" to="/dashboard/password">
                Change Password
              </Link>
            </div>

            <div className="dashboard__content container">
              {error ? (
                <div className="alert alert--err mb-sm">{error}</div>
              ) : null}
              <Manage type="blog" />
              <Manage type="gallery" />
            </div>
          </section>
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
};

export default Dashboard;
