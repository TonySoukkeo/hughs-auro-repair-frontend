import React from "react";

const DashNav = ({ firstName }) => {
  return (
    <nav className="dashboard__nav container">
      <p>Welcome, {firstName}</p>

      <span>
        <i className="fas fa-sign-out-alt"></i> Sign Out
      </span>
    </nav>
  );
};

export default DashNav;
