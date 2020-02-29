import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const BlogCards = ({ title, blogId, postedDate, body }) => {
  return (
    <div className="blog__grid--card">
      <div className="blog__grid--card-title">{title}</div>

      <div className="blog__grid--card-body">
        <p>{body}</p>
      </div>

      <div className="blog__grid--card-footer">
        <Link to={`/blog/${blogId}`}>Read More</Link>
        <span>
          <Moment format="MMM D YYYY" withTitle>
            {postedDate}
          </Moment>
        </span>
      </div>
    </div>
  );
};

export default BlogCards;
