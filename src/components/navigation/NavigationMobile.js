import React, { useState } from "react";

const NavigationMobile = () => {
  const [checked, setChecked] = useState(false);

  const toggleCheck = () => {
    setChecked(prevState => !prevState);
  };

  return (
    <nav className="navigation-mobile container">
      <h2>Hugh's Diesel & Auto Repair</h2>

      <div className="navigation-mobile__icon-container">
        <input
          onChange={toggleCheck}
          id="toggleNav"
          type="checkbox"
          checked={checked}
        />

        <label htmlFor="toggleNav">
          <span className="navigation-mobile__icon"></span>
        </label>
      </div>
      <ul
        className={
          checked
            ? "navigation-mobile__list navigation-mobile__list--active"
            : "navigation-mobile__list"
        }
      >
        <span onClick={toggleCheck}>
          <i className="fas fa-times"></i>
        </span>
        <li onClick={toggleCheck} className="navigation-mobile__item">
          item 1
        </li>
        <li onClick={toggleCheck} className="navigation-mobile__item">
          item 2
        </li>
        <li onClick={toggleCheck} className="navigation-mobile__item">
          item 3
        </li>
        <li onClick={toggleCheck} className="navigation-mobile__item">
          item 4
        </li>
        <li onClick={toggleCheck} className="navigation-mobile__item">
          item 5
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMobile;
