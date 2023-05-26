import { useState, useEffect } from "react";

const useFetch = (
  url,
  key = `live_xZzRUeyu7VvyLR4w6NpOJKwINtu7It7xSgcIDgvtZiffDkz0KFH55ykKiiIKXaGg`
) => {
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    let ignore = false;

    fetch(url, {
      headers: {
        "x-api-key": key,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!ignore) {
          setFetchData(data);
        }
      })
      .catch((error) => console.log(error.message));

    return () => {
      ignore = true;
    };
  }, [url, key]);

  return fetchData;
};

export default useFetch;
