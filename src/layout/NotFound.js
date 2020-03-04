import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

const NotFound = () => {
  return (
    <section className="not-found container">
      <Helmet>
        <title>Hugh's diesel and auto repair | Page not found</title>
      </Helmet>
      <h1>404</h1>
      <p>Page not found!</p>

      <Link to="/">Go back to home</Link>
    </section>
  );
};

export default NotFound;
