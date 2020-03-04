import React from "react";
import { Helmet } from 'react-helmet';

const About = () => {
  return (
    <section className="about">
      <Helmet>
        <title>Hugh's diesel and auto repair | About us</title>
        <meta 
        name ='description'
        content = "Hugh's diesel and auto repair service, located in Great Falls, Montana. Founded and ran by Hugh Engelby, we put in the care and effort to offer the upmost quality service that you would expect for any of your vehicle needs. Our services includes: Heavy truck and equipment, automotive, onan generators, and trailer repair. Request a free quote today or give us a call at (406)750-8751"
        />
      </Helmet>  
      <header className="about__header">
        <h1>
          <span></span> Our mission <span></span>
        </h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
      </header>

      <div className="about__content container">
        <h1>About</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
          provident harum ipsum explicabo commodi illum autem, neque quibusdam
          error modi. Dicta fuga ratione quia ipsum mollitia qui error vero
          autem!
        </p>

        <br />

        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          error blanditiis ab autem aliquid. Recusandae nulla dicta magnam
          suscipit eligendi, praesentium, accusantium nam quo doloremque ex
          deleniti nemo illo corrupti cupiditate at aperiam iusto corporis sint
          voluptas. Obcaecati reprehenderit repellendus ex at eligendi est
          commodi aspernatur, minima officiis numquam qui.
        </p>
      </div>
    </section>
  );
};

export default About;
