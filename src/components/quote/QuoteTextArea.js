import React from "react";

const QuoteTextArea = ({ name, onChange, value, title }) => {
  return (
    <div className="form__group">
      <label className="form__label" htmlFor={name}>
        {title}
      </label>

      <textarea
        className="form__input form__input--border"
        name={name}
        onChange={onChange}
        value={value}
        id={name}
        cols="30"
        rows="10"
      ></textarea>
    </div>
  );
};

export default QuoteTextArea;
