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

            <span>
              <i className="far fa-edit"></i>
              <p>View / Edit Posts</p>
            </span>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <span>
              <i className="fas fa-file-upload"></i>
              <p>Upload image</p>
              <span>* 1 image per upload</span>
            </span>

            <span>
              <i className="far fa-edit"></i>
              <p>View / Edit Images</p>
            </span>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Manage;
