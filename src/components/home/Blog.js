import React from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <div className="home__blog">
      <span>
        <i className="fas fa-blog"></i>
      </span>

      <h3>Stay updated through our blog</h3>

      <Link to="/blog" className="btn btn--blue">
        View
      </Link>
    </div>
  );
};

export default Blog;
