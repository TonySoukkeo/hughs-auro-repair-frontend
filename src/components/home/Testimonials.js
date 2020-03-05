import React from "react";
import { Link } from "react-router-dom";

import TruckImg from "../../images/testimonials_truck_image.png";

// Components
import ReviewCard from "../../components/reviews/ReviewCard";

const Testimonials = ({ reviews }) => {
  return (
    <div className="home__testimonials container">
      {/*** Truck image ***/}
      <img className="home__testimonials--bgimage" src={TruckImg} alt="truck" />

      <div className="home__testimonials-header">
        <h5>Testimonials</h5>
        <h4>See what others have to say about us</h4>
      </div>

      <div className="home__testimonials-comments">
        {reviews.map(item => (
          <ReviewCard key={item._id} name={item.name} review={item.review} />
        ))}
      </div>
      <Link to="/testimonials">View All</Link>
    </div>
  );
};

export default Testimonials;
