import React, { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    message: ""
  });

  const { name, email, message } = input;

  const onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    console.log({ name, value });
  };

  return (
    <section className="contact">
      <div className="contact__form-container">
        <form className="contact__form container">
          <h2>Any questions or comments?</h2>
          <p>Feel free to drop us a line, down below</p>

          <div className="form__group mb-md">
            <input
              type="text"
              placeholder="Name"
              value={name}
              name="name"
              onChange={onChange}
              className="form__input-noborder"
            />
          </div>

          <div className="form__group mb-md">
            <input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={onChange}
              className="form__input-noborder"
            />
          </div>

          <div className="form__group-textarea">
            <textarea
              className="form__input-textarea"
              placeholder="Message"
              name="Message"
              cols="30"
            ></textarea>
          </div>

          <button className="btn btn--blue" type="submit">
            Submit
          </button>
        </form>

        <div className="contact__form-question">
          <span>?</span>
        </div>
      </div>

      <div className="contact__quote">
        <h1>Need a quote?</h1>

        <Link to="/quote" className="btn btn--white">
          Get Started
        </Link>
      </div>

      <div className="contact__social">
        <h2>Follow us on social media!</h2>

        <a href="https://facebook.com" target="_blank">
          <i className="fab fa-facebook-square"></i>
        </a>
      </div>
    </section>
  );
};

export default Contact;
