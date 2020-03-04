import React from "react";
import { Helmet } from "react-helmet";

// Components
import Banner from "../components/home/Banner";
import Intro from "../components/home/Intro";
import Service from "../components/home/Service";
import Testimonials from "../components/home/Testimonials";
import Blog from "../components/home/Blog";
import Gallery from "../components/home/Gallery";

const Home = () => {
  return (
    <section className="home">
      <Helmet>
        <title>
          Hugh's diesel and auto repair | Quality auto repair service that you can trust | Great falls, Montana
        </title>
        <meta name='description' content="Hugh's diesel and auto repair services. Located in Great Falls, Montana, where you'll find quality vehicle service that you can trust. We offer repair services for heavey truck and equipment, automotive, onan generators, and trailer repair. Request a free quote today to get started, or give us a call at (406)750-8751"/>
      </Helmet>

      <Banner />
      <Intro />
      <Service />
      <Testimonials />
      <Blog />
      <Gallery />
    </section>
  );
};

export default Home;
