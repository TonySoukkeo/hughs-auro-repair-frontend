import React from "react";

const DashNav = ({ firstName, signOut }) => {
  return (
    <nav className="dashboard__nav container">
      <p>Welcome, {firstName}</p>

      <span onClick={signOut}>
        <i className="fas fa-sign-out-alt"></i> Sign Out
      </span>
    </nav>
  );
};

export default DashNav;
