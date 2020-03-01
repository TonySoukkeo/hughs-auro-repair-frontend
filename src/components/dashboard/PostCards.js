import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const PostCards = ({ title, body, postedDate, edited, id }) => {
  const modifyBody = body.length > 360 ? body.slice(0, 360) + "..." : body;

  return (
    <div className="dashboard__view-posts__posts">
      <h3 className="dashboard__view-posts__header">{title}</h3>
      <div className="dashboard__view-posts__date">
        <p>
          <Moment format="MMM D YYYY" withTitle>
            {postedDate}
          </Moment>
        </p>

        {edited ? (
          <p>
            Edited on{" "}
            <Moment format="MMM D YYYY" withTitle>
              {edited}
            </Moment>
          </p>
        ) : null}
      </div>

      <p className="dashboard__view-posts__body">{modifyBody}</p>

      <div className="dashboard__view-posts__actions">
        <Link to={`/blog/${id}`} className="btn btn--white">
          View
        </Link>
        <button className="btn btn--red">Delete</button>
        <Link to={`/blog/edit/${id}`} className="btn btn--blue">
          Edit
        </Link>
      </div>
    </div>
  );
};

export default PostCards;
