import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Components
import QuoteTextInput from "../components/quote/QuoteTextInput";
import QuoteTextArea from "../components/quote/QuoteTextArea";
import Loading from "../components/loading/Loading";

// Custom hooks
import useLoading from "../hooks/useLoading";
import useError from "../hooks/useError";

const Quote = ({ location }) => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    vehicle: "",
    description: ""
  });
  const [quoteSent, setQuoteSent] = useState(false);

  const [loading, setLoading] = useLoading();
  const [error, setError] = useError();

  const { name, email, vehicle, description } = input;

  useEffect(() => {
    // Do stuff
    if (location.state && location.state.name) {
      setInput(prevState => ({
        ...prevState,
        name: location.state.name
      }));
    }

    if (location.state && location.state.email) {
      setInput(prevState => ({
        ...prevState,
        email: location.state.email
      }));
    }

    return () => {
      setInput({
        name: "",
        email: "",
        vehicle: "",
        description: ""
      });
    };
  }, []);

  const onChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setInput(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const submitQuote = async e => {
    try {
      e.preventDefault();
      setLoading(true);
      setQuoteSent(false);

      // Check for empty fields
      if (!name || !email || !vehicle || !description) {
        const error = new Error();
        error.message = "Please fill out all fields";

        throw error;
      }

      const sentQuote = await fetch(
        `${process.env.REACT_APP_BASE_URL}/form/quote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            vehicle,
            description
          })
        }
      );

      const sentQuoteData = await sentQuote.json();

      // Check for any errors
      if (sentQuoteData.status !== 200) {
        const error = new Error();
        error.message = sentQuoteData.message;

        throw error;
      }

      setLoading(false);
      setQuoteSent(true);
      setInput({
        name: "",
        email: "",
        vehicle: "",
        description: ""
      });
      setError("");
    } catch (err) {
      setQuoteSent(false);
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <section className="quote container">
      {error ? <div className="alert alert--err mb-sm">{error}</div> : null}
      {!quoteSent ? (
        <form
          onSubmit={e => {
            e.persist();
            submitQuote(e);
          }}
          className="form"
        >
          <h1 className="mb-sm">Request a free quote</h1>
          <QuoteTextInput
            name="name"
            value={name}
            onChange={onChange}
            title="Name"
          />

          <QuoteTextInput
            name="email"
            value={email}
            onChange={onChange}
            title="Email"
          />

          <QuoteTextInput
            name="vehicle"
            value={vehicle}
            onChange={onChange}
            title="Vehicle"
          />

          <QuoteTextArea
            name="description"
            value={description}
            onChange={onChange}
            title="Description of issue"
          />

          {loading ? (
            <Loading styles={{ width: "3rem" }} />
          ) : (
            <button className="btn btn--blue">Submit</button>
          )}
        </form>
      ) : (
        <div className="quote__success">
          <span>
            <i class="far fa-paper-plane"></i>
          </span>
          <p>
            Quote successfully sent! We will get back to you as soon as we can!
          </p>

          <Link to="/" className="btn btn--blue">
            Go back to home
          </Link>
        </div>
      )}
    </section>
  );
};

export default Quote;
