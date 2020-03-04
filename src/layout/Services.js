import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

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
        content="Hugh's diesel and auto repair service, located in Great Falls, Montana. We offer services for a variety of things including: heavy truck and equipment, automotive, onan generators, and trailer repair. Request a free quote today to get started!"
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
