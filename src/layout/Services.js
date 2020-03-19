import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

// Components
import Banner from "../components/services/Banner";
import ServiceShowcase from "../components/services/ServiceShowcase";

const Services = () => {
  return (
    <section className="services">
      <Helmet>
        <title>Hugh's diesel and auto repair | Services</title>
        <meta
          name="description"
          content="Great Falls Montana, auto repair, diesel repair, trailer repair, onan generator repairs, electrical diagnostics and more!"
        />
      </Helmet>
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
