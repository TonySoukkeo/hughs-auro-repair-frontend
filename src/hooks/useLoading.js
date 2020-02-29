import { useState } from "react";

const useLoading = () => {
  const [loading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState("");

  return [loading, setLoading, loadingType, setLoadingType];
};

export default useLoading;
