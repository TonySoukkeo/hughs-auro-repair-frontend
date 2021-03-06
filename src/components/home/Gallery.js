import React from "react";
import { Link } from "react-router-dom";

import Gallery1 from "../../images/gallery_1.jpg";
import Gallery2 from "../../images/gallery_2.jpg";
import Gallery3 from "../../images/gallery_3.jpg";

const Gallery = () => {
  return (
    <div className="home__gallery container">
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100%"
        viewBox="0 0 1242 111.556"
        enableackground="new 0 0 1242 111.556"
      >
        <rect fill="#FFFFFF" width="1242" height="111.556" />
        <path fill="#323232" d="M1242,111.556c0,0-540-251-1242,0H1242z" />
      </svg>

      <div className="home__gallery-header">
        <h5>Gallery</h5>
        <h4>Work you can appreciate</h4>
      </div>

      <div className="home__gallery-showcase">
        <img src={Gallery1} alt="Showcase 1" />
        <img src={Gallery2} alt="Showcase 2" />
        <img src={Gallery3} alt="Showcase 4" />
      </div>

      <Link to="/gallery">See more</Link>
    </div>
  );
};

export default Gallery;
