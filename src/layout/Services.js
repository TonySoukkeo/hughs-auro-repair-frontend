import React from "react";
import { Link } from "react-router-dom";

// Components
import Banner from "../components/services/Banner";
import ServiceShowcase from "../components/services/ServiceShowcase";

const Services = () => {
  return (
    <section className="services">
      <Banner />

      <ServiceShowcase />

      <div className="services__quote">
        <h2>Need a quote? Get started here</h2>

        <Link className="btn btn--blue" to="/quote">
          Lets do this
        </Link>
      </div>
    </section>
  );
};

export default Services;
