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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          quos accusamus hic corporis omnis asperiores id nam totam dolor! Quas
          error quos eveniet. Voluptate quis odit neque itaque illo eius
          architecto magnam repudiandae illum rem fuga nisi eos aspernatur
          blanditiis ad quidem quam, non, possimus repellat veniam! Asperiores,
          reprehenderit optio.
        </p>
      </div>

      <div className="home__services-options">
        <div className="home__services-options--showcase">
          <div className="home__services-options--showcase-card">
            <h1>
              Service 1<span className="underline underline--blue"></span>
            </h1>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus quod maxime eius est fugit porro, veritatis fuga
              ipsum? Ullam ea porro reprehenderit facere sed distinctio illo
              incidunt assumenda quasi aspernatur?
            </p>
          </div>

          <div className="home__services-options--showcase-card">
            <h1>
              Service 2<span className="underline underline--blue"></span>
            </h1>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus quod maxime eius est fugit porro, veritatis fuga
              ipsum? Ullam ea porro reprehenderit facere sed distinctio illo
              incidunt assumenda quasi aspernatur?
            </p>
          </div>

          <div className="home__services-options--showcase-card">
            <h1>
              Service 3<span className="underline underline--blue"></span>
            </h1>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus quod maxime eius est fugit porro, veritatis fuga
              ipsum? Ullam ea porro reprehenderit facere sed distinctio illo
              incidunt assumenda quasi aspernatur?
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
