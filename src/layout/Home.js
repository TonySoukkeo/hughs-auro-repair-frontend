import React from "react";

// Components
import Banner from "../components/home/Banner";
import Intro from "../components/home/Intro";
import Service from "../components/home/Service";

const Home = () => {
  return (
    <section className="home">
      <Banner />
      <Intro />
      <Service />
    </section>
  );
};

export default Home;
