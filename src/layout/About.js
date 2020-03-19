import React from "react";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <section className="about">
      <Helmet>
        <title>Hugh's diesel and auto repair | About us</title>
        <meta
          name="description"
          content="Hugh's diesel and auto repair service, located in Great Falls, Montana. Founded and ran by Hugh Engelby, we put in the care and effort to offer the upmost quality service that you would expect for any of your vehicle needs. Our services includes: Heavy truck and equipment, automotive, onan generators, and trailer repair. Request a free quote today or give us a call at (406)866-0113"
        />
      </Helmet>
      <header className="about__header">
        <h1>
          <span></span> Our mission <span></span>
        </h1>
        <p>Quailty service that you can trust.</p>
      </header>

      <div className="about__content container">
        <h1>About Hugh's Diesel & Auto Repair</h1>
        <p>
          Hugh’s Diesel & Auto Repair is new, but Hugh is not. Hugh grew up in
          the automotive and diesel industry. He started by helping his father
          at work every day, then became old enough to join the shop as an
          employee. From there he went to a shop that purely worked on semis and
          attended college at MSU-Northern, leaving with a degree in diesel
          technology.
        </p>

        <br />

        <p>
          Hugh worked at a few shops around town, but never felt fulfilled. He
          disliked not having a say on how to treat the customers. He felt that
          the industry was unfair to its customers and wanted mechanics to have
          a better name. Hugh is changing the auto and diesel industry’s
          reputation by having full transparency with his clientele. Our owner
          does not believe in sugar coating, but also does not believe in
          unnecessary up-charging. You will leave his shop knowing you got what
          you needed and nothing more.
        </p>
      </div>
    </section>
  );
};

export default About;
