import { Container } from "@mui/material";
import useFetch from "./hooks/useFetch";
import ImageList from "./components/ImageList";
import { useState } from "react";
import useDelete from "./hooks/useDelete";

const Favorites = () => {
  const [render, setRender] = useState(false);
  const favoriteCats = useDelete(
    "https://api.thecatapi.com/v1/favourites",
    `live_xZzRUeyu7VvyLR4w6NpOJKwINtu7It7xSgcIDgvtZiffDkz0KFH55ykKiiIKXaGg`,
    render
  );

  return (
    <Container
      maxWidth="sm"
      sx={{
        paddingTop: { xs: 9, sm: 11 },
        paddingBottom: 3,
      }}
    >
      <ImageList itemData={favoriteCats} onClickDelete={setRender} />
    </Container>
  );
};

export default Favorites;
