import { useState, useEffect } from "react";

const useDelete = (
  url,
  key = `live_xZzRUeyu7VvyLR4w6NpOJKwINtu7It7xSgcIDgvtZiffDkz0KFH55ykKiiIKXaGg`,
  trigger
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
  }, [url, key, trigger]);

  return fetchData;
};

export default useDelete;
