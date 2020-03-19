import React from "react";
import { Link } from "react-router-dom";

const Service = () => {
  return (
    <div className="home__services container">
      <div className="home__services-description">
        <div className="home__services-description--header">
          <h5>What we offer</h5>
          <h4>Our service plans to meet all of your demands</h4>
        </div>

        <p>
          We offer several services that accomodate your needs! Repairs aren't
          just limited to automotive, as they include electrical and mechanical
          diagnostics, equipment repairs, transimission repairs, onan genrators
          repairs, and more!
        </p>
      </div>

      <div className="home__services-options">
        <div className="home__services-options--showcase">
          <div className="home__services-options--showcase-card">
            <h1>
              Trailer Repair<span className="underline underline--blue"></span>
            </h1>

            <p>
              DOT regulations need to be followed in order to pull a trailer.
              Our shop makes sure you are passing all requirements safely and
              legally. We offer repairs that will keep you safe and without any
              traffic violations.
            </p>
          </div>

          <div className="home__services-options--showcase-card">
            <h1>
              Electrical Diagnostics
              <span className="underline underline--blue"></span>
            </h1>

            <p>
              We have the latest diagnostics equipment to properly diagnose and
              repair all make and models on the road today. (cars, trucks,
              trailers, equipment, etc.)
            </p>
          </div>

          <div className="home__services-options--showcase-card">
            <h1>
              Diesel and auto<span className="underline underline--blue"></span>
            </h1>

            <p>
              We work on everything that drives or needs to be pushed into our
              doors.
            </p>
          </div>
        </div>

        <Link to="/services" className="btn btn--blue">
          See all services
        </Link>
      </div>
    </div>
  );
};

export default Service;
