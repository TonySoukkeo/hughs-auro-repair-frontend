import React, { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../images/logo.png";

const NavigationDesktop = () => {
  const [aboutSub, setAboutSub] = useState(false);

  const toggleAboutSub = () => {
    setAboutSub(prevState => !prevState);
  };

  const disableSubNav = () => {
    setAboutSub(false);
  };

  return (
    <nav className="navigation-desktop">
      {/*** Logo bar ***/}
      <Link to="/home" className="navigation-desktop__logo">
        <img src={Logo} alt="Hughs auto repair" />

        <h2>Hugh's Diesel & Auto Repair</h2>
      </Link>

      {/*** Social and Tel bar ***/}
      <div className="navigation-desktop__social container">
        <a href="tel: 111-111-1111">
          <i className="fas fa-phone"></i>{" "}
          <span className="navigation-desktop__social--phone">
            111-111-1111
          </span>
        </a>
        <a href="https://www.facebook.com" target="_blank">
          <i className="fab fa-facebook-square"></i>
        </a>
      </div>

      {/*** Main nav links ***/}
      <ul className="navigation-desktop__list container">
        <Link
          onClick={disableSubNav}
          to="/"
          className="navigation-desktop__item navigation-desktop__item--active"
        >
          Home
          <span></span>
        </Link>

        <Link
          onClick={disableSubNav}
          to="/services"
          className="navigation-desktop__item"
        >
          Services
          <span></span>
        </Link>

        <div onClick={toggleAboutSub} className="navigation-desktop__item">
          About
          <div className="dropdown-arrow dropdown-arrow--active"></div>
          <span></span>
          {/*** Sub navigation ***/}
          {aboutSub ? (
            <ul className="navigation-desktop__sub-list">
              <Link to="/about" className="navigation-desktop__sub-item">
                Our story
              </Link>

              <Link to="gallery" className="navigation-desktop__sub-item">
                Gallery
              </Link>
            </ul>
          ) : null}
        </div>

        <Link
          onClick={disableSubNav}
          to="/blog"
          className="navigation-desktop__item"
        >
          Blog
          <span></span>
        </Link>

        <Link
          onClick={disableSubNav}
          to="/contact"
          className="navigation-desktop__item"
        >
          Contact
          <span></span>
        </Link>

        <Link onClick={disableSubNav} to="/quote" className="btn btn--blue">
          Get a quote
          <span></span>
        </Link>
      </ul>
    </nav>
  );
};

export default NavigationDesktop;
