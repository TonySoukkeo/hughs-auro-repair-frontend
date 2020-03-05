import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import Logo from "../../images/logo.png";

// Context
import { StateContext } from "../../context/StateProvider";

// Custom hooks
import useNavigation from "../../hooks/useNavigation";

const NavigationDesktop = () => {
  const [aboutSub, setAboutSub] = useState(false);

  const {
    home,
    services,
    about,
    blog,
    contact,
    admin,
    setNav
  } = useNavigation();

  const { isAuth } = useContext(StateContext);

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
        <a href="tel:406-866-0113">
          <i className="fas fa-phone"></i>{" "}
          <span className="navigation-desktop__social--phone">
            406-866-0113
          </span>
        </a>
        <a href="https://www.facebook.com" target="_blank">
          <i className="fab fa-facebook-square"></i>
        </a>
      </div>

      {/*** Main nav links ***/}
      <ul className="navigation-desktop__list container">
        <Link
          onClick={() => {
            setNav("home");
            setAboutSub(false);
          }}
          to="/"
          className={
            home
              ? "navigation-desktop__item navigation-desktop__item--active"
              : "navigation-desktop__item"
          }
        >
          Home
          <span></span>
        </Link>

        <Link
          onClick={() => {
            setNav("services");
            setAboutSub(false);
          }}
          to="/services"
          className={
            services
              ? "navigation-desktop__item navigation-desktop__item--active"
              : "navigation-desktop__item"
          }
        >
          Services
          <span></span>
        </Link>

        <div
          onClick={toggleAboutSub}
          className={
            about
              ? "navigation-desktop__item navigation-desktop__item--active"
              : "navigation-desktop__item"
          }
        >
          About
          <div className="dropdown-arrow dropdown-arrow--active"></div>
          <span></span>
          {/*** Sub navigation ***/}
          {aboutSub ? (
            <ul className="navigation-desktop__sub-list">
              <Link
                onClick={() => setNav("about")}
                to="/about"
                className="navigation-desktop__sub-item"
              >
                Our story
              </Link>

              <Link
                onClick={() => setNav("about")}
                to="/gallery"
                className="navigation-desktop__sub-item"
              >
                Gallery
              </Link>

              <Link
                onClick={() => setNav("about")}
                to="/testimonials"
                className="navigation-desktop__sub-item"
              >
                Testimonials
              </Link>
            </ul>
          ) : null}
        </div>

        <Link
          onClick={() => {
            setNav("blog");
            setAboutSub(false);
          }}
          to="/blog"
          className={
            blog
              ? "navigation-desktop__item navigation-desktop__item--active"
              : "navigation-desktop__item"
          }
        >
          Blog
          <span></span>
        </Link>

        <Link
          onClick={() => {
            setNav("contact");
            setAboutSub(false);
          }}
          to="/contact"
          className={
            contact
              ? "navigation-desktop__item navigation-desktop__item--active"
              : "navigation-desktop__item"
          }
        >
          Contact
          <span></span>
        </Link>

        {isAuth ? (
          <Link
            onClick={() => {
              setNav("admin");
              setAboutSub(false);
            }}
            to="/dashboard"
            className={
              admin
                ? "navigation-desktop__item navigation-desktop__item--active"
                : "navigation-desktop__item"
            }
          >
            Admin
            <span></span>
          </Link>
        ) : null}

        <Link onClick={disableSubNav} to="/quote" className="btn btn--blue">
          Get a quote
          <span></span>
        </Link>
      </ul>
    </nav>
  );
};

export default NavigationDesktop;
