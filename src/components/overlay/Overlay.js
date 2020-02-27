import React from "react";

const Overlay = ({ classname, onClick }) => {
  return <div onClick={onClick} className={`overlay ${classname}`}></div>;
};

export default Overlay;
