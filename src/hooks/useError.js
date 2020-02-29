import { useState } from "react";

const useError = () => {
  const [error, setError] = useState("");

  const [errorType, setErrorType] = useState("");

  return [error, setError, errorType, setErrorType];
};

export default useError;
