import React, { useContext, useState } from "react";
import { Route, Redirect } from "react-router-dom";

// Components
import Manage from "../../components/dashboard/Manage";
import DashNav from "../../components/dashboard/DashNav";

// Context
import { StateContext } from "../../context/StateProvider";

const Dashboard = () => {
  const { isAuth, user } = useContext(StateContext);

  return (
    <Route
      render={() =>
        isAuth ? (
          <section className="dashboard">
            <DashNav firstName={user.firstName} />

            <div className="dashboard__content container">
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
