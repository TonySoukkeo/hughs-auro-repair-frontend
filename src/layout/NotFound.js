import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="not-found container">
      <h1>404</h1>
      <p>Page not found!</p>

      <Link to="/">Go back to home</Link>
    </section>
  );
};

export default NotFound;
