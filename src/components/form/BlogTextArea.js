import React from "react";

const BlogTextArea = ({ label, title, value, name, onChange, cols, rows }) => {
  return (
    <div className="form__group">
      <label className="blog__label" htmlFor={label}>
        {title}
      </label>
      <textarea
        className="blog__text-area"
        value={value}
        onChange={onChange}
        name={name}
        id={label}
        cols={cols}
        rows={rows}
      ></textarea>
    </div>
  );
};

export default BlogTextArea;
