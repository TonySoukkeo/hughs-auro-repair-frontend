import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

// Components
import Banner from "../components/home/Banner";
import Intro from "../components/home/Intro";
import Service from "../components/home/Service";
import Testimonials from "../components/home/Testimonials";
import Blog from "../components/home/Blog";
import Gallery from "../components/home/Gallery";

const Home = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviews = await fetch(
          `${process.env.REACT_APP_BASE_URL}/reviews?limit=${2}`
        );

        const reviewsData = await reviews.json();

        if (reviewsData.status !== 200) {
          const error = new Error();
          error.message = reviewsData.message;

          throw error;
        }

        setReviews(reviewsData.reviews);
      } catch (err) {
        console.log(err);
      }
    };

    getReviews();

    // Cleanup
    return () => {
      setReviews([]);
    };
  }, []);
  return (
    <section className="home">
      <Helmet>
        <title>
          Hugh's diesel and auto repair | Quality auto repair service that you
          can trust | Great falls, Montana
        </title>
        <meta
          name="description"
          content="Hugh's diesel and auto repair services. Located in Great Falls, Montana, where you'll find quality vehicle service that you can trust. We offer repair services for heavy truck and equipment, automotive, onan generators, and trailer repair. Request a free quote today to get started, or give us a call at (406)866-0113. We are open Mon - Fri, 8am to 5pm"
        />
      </Helmet>

      <Banner />
      <Intro />
      <Service />
      <Testimonials reviews={reviews} />
      <Blog />
      <Gallery />
    </section>
  );
};

export default Home;
