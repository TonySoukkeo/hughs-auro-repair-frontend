import React, { useState } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  const [input, setInput] = useState({ name: "", email: "" });

  const onChange = e => {
    setInput(prevState => ({
      ...prevState,
      email: e.target.value
    }));
  };

  return (
    <div className="home__banner container">
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

      <div className="home__banner-quote-desktop">
        <div className="home__banner-quote-desktop-header">
          <h2>Need a quote?</h2>
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100%"
            viewBox="0 0 1242 111.556"
            enable-background="new 0 0 1242 111.556"
          >
            <rect fill="#252122" width="100%" height="111.556" />
            <path fill="#4280C2" d="M0,0c0,0,540,251,1242,0H0z" />
          </svg>
        </div>

        <div className="form__group">
          <input
            className="form__input"
            type="text"
            placeholder="Name"
            name="name"
            value={input.name}
            onChange={onChange}
          />
        </div>

        <div className="form__group">
          <input
            className="form__input"
            type="email"
            placeholder="Email"
            name="email"
            value={input.email}
            onChange={onChange}
          />
        </div>

        <Link className="btn btn--blue" to="/quote">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Banner;
