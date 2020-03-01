import React from "react";

const BlogInput = ({ label, title, value, onChange, name }) => {
  return (
    <div className="form__group">
      <label className="blog__label" htmlFor={label}>
        {title}
      </label>
      <input
        className="blog__input"
        id={label}
        value={value}
        onChange={onChange}
        type="text"
        name={name}
        autoComplete="off"
      />
    </div>
  );
};

export default BlogInput;
