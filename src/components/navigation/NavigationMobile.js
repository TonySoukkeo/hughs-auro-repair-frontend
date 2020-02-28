import React, { useState } from "react";
import { Link } from "react-router-dom";

// Components
import Overlay from "../overlay/Overlay";

import Logo from "../../images/logo.png";

const NavigationMobile = () => {
  const [checked, setChecked] = useState(false);
  const [aboutSub, setAboutSub] = useState(false);

  const toggleCheck = () => {
    setChecked(prevState => !prevState);
  };

  const toggleAboutSub = () => {
    setAboutSub(prevState => !prevState);
  };

  return (
    <React.Fragment>
      {checked ? (
        <Overlay onClick={toggleCheck} classname="overlay--dark" />
      ) : null}
      <nav className="navigation-mobile container">
        <Link to="/">
          <h2>Hugh's Diesel & Auto Repair</h2>
        </Link>

        <div
          onClick={toggleCheck}
          className="navigation-mobile__icon-container"
        >
          <input
            onChange={toggleCheck}
            id="toggleNav"
            type="checkbox"
            checked={checked}
          />

          <label htmlFor="toggleNav">
            <span className="navigation-mobile__icon"></span>
          </label>
        </div>
      </nav>

      <ul
        className={
          checked
            ? "navigation-mobile__list navigation-mobile__list--active"
            : "navigation-mobile__list"
        }
      >
        <span onClick={toggleCheck}>
          <i className="fas fa-times"></i>
        </span>
        <Link to="/" onClick={toggleCheck} className="navigation-mobile__item">
          Home
        </Link>

        <Link
          to="/services"
          onClick={toggleCheck}
          className="navigation-mobile__item"
        >
          Services
        </Link>

        <li
          style={{ cursor: "pointer" }}
          onClick={toggleAboutSub}
          className="navigation-mobile__item"
        >
          About
          <div
            className={
              aboutSub
                ? "dropdown-arrow dropdown-arrow--active"
                : "dropdown-arrow"
            }
          ></div>
          <div
            className={
              aboutSub
                ? "navigation-mobile__sub navigation-mobile__sub--active"
                : "navigation-mobile__sub"
            }
          >
            <Link
              style={aboutSub ? { padding: "1rem 0" } : null}
              to="/about"
              onClick={toggleCheck}
              className="navigation-mobile__item navigation-mobile__item--sub"
            >
              Our story
            </Link>

            <Link
              style={aboutSub ? { padding: "1rem 0" } : null}
              to="/gallery"
              onClick={toggleCheck}
              className="navigation-mobile__item navigation-mobile__item--sub"
            >
              Gallery
            </Link>
          </div>
        </li>

        <Link
          to="/blog"
          onClick={toggleCheck}
          className="navigation-mobile__item"
        >
          Blog
        </Link>

        <Link
          to="/contact"
          onClick={toggleCheck}
          className="navigation-mobile__item"
        >
          Contact
        </Link>

        {/*** LOGO ***/}
        <div className="flex flex--center mt-sm">
          <img
            className="navigation-mobile__logo"
            src={Logo}
            alt="Hughs auto repair"
          />
        </div>

        {/*** Social media / phone ***/}
        <div className="flex flex--space-around mt-sm">
          <a
            href="https://www.facebook.com"
            target="_blank"
            className="navigation-mobile__actions"
          >
            <i className="fab fa-facebook-square"></i>
          </a>
          <a href="tel:406-899-8999" className="navigation-mobile__actions">
            <i className="fas fa-phone-square"></i>
          </a>
        </div>
      </ul>
    </React.Fragment>
  );
};

export default NavigationMobile;
