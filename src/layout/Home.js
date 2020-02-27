import React from "react";

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
