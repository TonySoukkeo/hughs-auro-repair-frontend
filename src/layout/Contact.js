import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

// Components
import Loading from "../components/loading/Loading";

// Custom hooks
import useError from "../hooks/useError";
import useLoading from "../hooks/useLoading";

const Contact = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [messageSent, setMessageSent] = useState(false);

  const [loading, setLoading] = useLoading();
  const [error, setError] = useError();

  const { name, email, message } = input;

  const onChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setInput(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const postMessage = async e => {
    try {
      e.preventDefault();

      setLoading(true);
      setMessageSent(false);

      // Check if any fields are empty
      if (!name || !message || !email) {
        const error = new Error();
        error.message = "All fields must be filled out";

        throw error;
      }

      const messageSent = await fetch(
        `${process.env.REACT_APP_BASE_URL}/form/question`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            message
          })
        }
      );

      const messageSentData = await messageSent.json();

      // Check for any errors
      if (messageSentData.status !== 200) {
        const error = new Error();
        error.message = messageSentData.message;

        throw error;
      }

      setLoading(false);
      setMessageSent(true);
      setError("");
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  // Invalid variable to disable submit btn
  let disabled = true;

  if (name && email && message) disabled = false;

  return (
    <section className="contact">
      <Helmet>
        <title>Hugh's diesel and auto repair | Contact us for any questions or request a free auto quote today</title>
        <meta 
        name="description"
        content="Hugh's diesel and auto repair, located in Great Falls, Montana. We deliver the best quality auto repair service you can find! Have any questions or concerns? Drop us a message here. Or if your car needs any repair, request a free quote today!"
        />
      </Helmet>
      <div className="contact__form-container">
        {!messageSent ? (
          <form
            onSubmit={e => {
              e.persist();

              postMessage(e);
            }}
            className="contact__form container"
          >
            <h2>Any questions or comments?</h2>
            <p>Feel free to drop us a line, down below</p>

            {error ? (
              <div className="alert alert--err mb-md">{error}</div>
            ) : null}

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
                name="message"
                cols="30"
                onChange={onChange}
                value={message}
              ></textarea>
            </div>

            {loading ? (
              <Loading styles={{ width: "3rem" }} />
            ) : (
              <button
                disabled={disabled}
                className={disabled ? "btn btn--disabled" : "btn btn--blue"}
                type="submit"
              >
                Submit
              </button>
            )}
          </form>
        ) : (
          <div className="contact__success container">
            <span>
              <i className="far fa-paper-plane"></i>
            </span>

            <p>Message Sent! We will get back to you as soon as we can!</p>
          </div>
        )}

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
