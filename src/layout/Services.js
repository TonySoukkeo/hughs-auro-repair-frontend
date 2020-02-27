import React from "react";

// Components
import Banner from "../components/services/Banner";

const Services = () => {
  return (
    <section className="services">
      <Banner />
      <div className="services__1 container">
        <span>
          <h2>Service 1</h2>
        </span>

        <div className="services__desc">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores
            illum nisi reprehenderit adipisci, asperiores aliquid, ad corporis
            molestias laboriosam reiciendis sed expedita laborum totam,
            doloremque ipsa quo. Voluptatibus enim quidem perspiciatis est
            facilis, ab ad nostrum repellat libero veritatis qui!
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis
            architecto quasi in quia voluptas distinctio modi fugiat voluptate
            veniam ipsum? Et fugit natus nostrum labore. Corporis obcaecati
            dolorum maiores corrupti.
          </p>
        </div>
      </div>

      <div className="services__2 container">
        <svg
          className="services__2--svg-top"
          version="1.1"
          id="Layer_2"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100%"
          viewBox="0 0 1242 136.482"
          enable-background="new 0 0 1242 136.482"
        >
          <polygon fill="#4280C2" points="0,-1 0,-1 1242,136.482 1242,-1 " />
        </svg>

        <svg
          className="services__2--svg-bottom"
          version="1.1"
          id="Layer_2"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100%"
          viewBox="0 0 1242 136.482"
          enable-background="new 0 0 1242 136.482"
        >
          <polygon
            fill="#323232"
            points="1242,136.982 1242,136.982 0,-0.5 0,136.982 "
          />
        </svg>

        <span>
          <h2>Service 2</h2>
        </span>

        <div className="services__desc">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores
            illum nisi reprehenderit adipisci, asperiores aliquid, ad corporis
            molestias laboriosam reiciendis sed expedita laborum totam,
            doloremque ipsa quo. Voluptatibus enim quidem perspiciatis est
            facilis, ab ad nostrum repellat libero veritatis qui!
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis
            architecto quasi in quia voluptas distinctio modi fugiat voluptate
            veniam ipsum? Et fugit natus nostrum labore. Corporis obcaecati
            dolorum maiores corrupti.
          </p>
        </div>
      </div>

      <div className="services__3 container">
        <span>
          <h2>Service 3</h2>
        </span>

        <div className="services__desc">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores
            illum nisi reprehenderit adipisci, asperiores aliquid, ad corporis
            molestias laboriosam reiciendis sed expedita laborum totam,
            doloremque ipsa quo. Voluptatibus enim quidem perspiciatis est
            facilis, ab ad nostrum repellat libero veritatis qui!
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis
            architecto quasi in quia voluptas distinctio modi fugiat voluptate
            veniam ipsum? Et fugit natus nostrum labore. Corporis obcaecati
            dolorum maiores corrupti.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
