import React, { useState } from "react";
import { Link } from "react-router-dom";

// Logo
import Logo from "../../images/logo.png";

const Footer = () => {
  const [aboutSub, setAboutSub] = useState(false);

  const toggleAboutSub = () => {
    setAboutSub(prevState => !prevState);
  };

  return (
    <footer className="footer">
      <ul className="footer__list--mobile">
        <Link to="/contact" className="footer__item">
          Contact
        </Link>
        <Link to="/quote" className="footer__item">
          Request a quote
        </Link>
      </ul>

      <ul className="footer__list--desktop">
        <Link to="/home" className="footer__item">
          Home
        </Link>

        <Link to="/services" className="footer__item">
          Services
        </Link>

        <div onClick={toggleAboutSub} className="footer__item">
          About
          <div className="dropdown-arrow dropdown-arrow--active"></div>
          {aboutSub ? (
            <ul className="footer__item--sub">
              <Link to="/about" className="navigation-desktop__sub-item">
                Our story
              </Link>

              <Link to="gallery" className="navigation-desktop__sub-item">
                Gallery
              </Link>
            </ul>
          ) : null}
        </div>

        <Link to="/blog" className="footer__item">
          Blog
        </Link>

        <Link to="/contact" className="footer__item">
          Contact
        </Link>
      </ul>

      <img
        className="footer__logo"
        src={Logo}
        alt="Hugh's diesel & auto repair"
      />

      <p className="footer__copyright">
        &copy; 2020 Hugh's Diesel & Auto Repair
      </p>
    </footer>
  );
};

export default Footer;
