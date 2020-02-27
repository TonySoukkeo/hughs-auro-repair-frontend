import React from "react";
import { Link } from "react-router-dom";

import TruckImg from "../../images/testimonials_truck_image.png";

const Testimonials = () => {
  return (
    <div className="home__testimonials container">
      {/*** Truck image ***/}
      <img className="home__testimonials--bgimage" src={TruckImg} alt="truck" />

      <div className="home__testimonials-header">
        <h5>Testimonials</h5>
        <h4>See what others have to say about us</h4>
      </div>

      <div className="home__testimonials-comments">
        <div className="home__testimonials-comments--container">
          <h5>John Doe</h5>

          <div className="home__testimonials-comments--content">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem
              nulla minus qui tempore libero temporibus? Lorem ipsum dolor sit
              amet consectetur adipisicing elit.
            </p>

            <br />

            <p>
              Blanditiis dolore, odio adipisci dolorum, excepturi totam
              distinctio pariatur nulla voluptatem dignissimos officia. Totam
              temporibus, illo quae expedita fuga corporis unde nesciunt!
            </p>
          </div>
        </div>

        <div className="home__testimonials-comments--container">
          <h5>John Doe</h5>

          <div className="home__testimonials-comments--content">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem
              nulla minus qui tempore libero temporibus? Lorem ipsum dolor sit
              amet consectetur adipisicing elit.
            </p>

            <br />

            <p>
              Blanditiis dolore, odio adipisci dolorum, excepturi totam
              distinctio pariatur nulla voluptatem dignissimos officia. Totam
              temporibus, illo quae expedita fuga corporis unde nesciunt!
            </p>
          </div>
        </div>
      </div>
      <Link to="/testimonials">View All</Link>
    </div>
  );
};

export default Testimonials;
