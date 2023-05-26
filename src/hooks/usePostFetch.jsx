import { useState, useEffect } from "react";

const usePostFetch = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let ignore = false;

    fetch(url, {
      method: "POST",
      headers: {
        "x-api-key":
          "live_xZzRUeyu7VvyLR4w6NpOJKwINtu7It7xSgcIDgvtZiffDkz0KFH55ykKiiIKXaGg",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (!ignore) {
          setData(json);
        }
      })
      .catch((error) => console.log(error.message));

    return () => (ignore = true);
  }, [url]);

  return data;
};

export default usePostFetch;
