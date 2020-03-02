import React from "react";
import { Link } from "react-router-dom";

const Manage = ({ type }) => {
  return (
    <div className="dashboard__content-manage">
      <div className="dashboard__content-manage__header">
        {type === "blog" ? (
          <p>Manage Blog Posts</p>
        ) : (
          <p>Manage Gallery Images</p>
        )}
      </div>

      <div className="dashboard__content-actions">
        {type === "blog" ? (
          <React.Fragment>
            <Link to="/dashboard/add-post">
              <i className="fas fa-plus-square"></i>
              <p>Add new Post</p>
            </Link>

            <Link to="/dashboard/view-posts">
              <i className="far fa-edit"></i>
              <p>View / Edit Posts</p>
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link to="/dashboard/manage-gallery" style={{ margin: "0 auto" }}>
              <i className="far fa-edit"></i>
              <p>Manage Images</p>
            </Link>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Manage;
