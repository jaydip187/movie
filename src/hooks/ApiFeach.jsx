import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const ApiFeach = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading("....Loading");

    fetchDataFromApi(url)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((error) => {
        setLoading(false);
        setData(false);
        setError(error);
      });
  }, [url]);

  return { loading, data, error };
};

export default ApiFeach;
