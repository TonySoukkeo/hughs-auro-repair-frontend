import React from "react";

const QuoteTextInput = ({ title, value, onChange, name }) => {
  return (
    <div className="form__group">
      <label className="form__label" htmlFor={name}>
        {title}
      </label>

      <input
        value={value}
        onChange={onChange}
        className="form__input form__input--border"
        name={name}
        id={name}
        type="text"
      />
    </div>
  );
};

export default QuoteTextInput;
