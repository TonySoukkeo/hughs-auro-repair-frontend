import React from "react";
import { Link } from "react-router-dom";

// Logo
import Logo from "../../images/logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="footer__list">
        <Link to="/contact" className="footer__item">
          Contact
        </Link>
        <Link to="/quote" className="footer__item">
          Request a quote
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
