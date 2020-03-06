import React from "react";

const Intro = () => {
  return (
    <div className="home__intro container">
      <div className="home__intro-content">
        <h2>
          Work you can depend on
          <span className="underline underline--blue"></span>
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores
          labore cumque iusto fugiat officiis saepe nulla corrupti cum, tempore,
          aspernatur nam consequuntur soluta, officia quibusdam laborum tenetur
          obcaecati ratione voluptatum?
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum,
          sapiente?Lorem ipsum dolor sit amet.
        </p>
      </div>

      <div className="home__intro-image">
        {/* <img className="object-fit__cover" src={Img} alt="Picture of a truck" /> */}
      </div>
    </div>
  );
};

export default Intro;
