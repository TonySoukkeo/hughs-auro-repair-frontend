import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="home__banner">
      <div className="home__banner-header">
        <h1>Honest, top quality auto repair</h1>
        <Link className="btn btn--blue text-bold" to="/">
          Learn More &rarr;
        </Link>
      </div>

      {/*** Request quote mobile ***/}
      <div className="home__banner-quote-mobile">
        <div className="home__banner-quote-mobile--header">
          <div></div>
          <h4>Need a quote?</h4>
          <div></div>
        </div>

        <Link className="btn btn--tan text-bold" to="/quote">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Banner;
