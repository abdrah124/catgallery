import { useState, useEffect, useRef } from "react";
import Gallery from "./components/GallerySearch";
import { Container, Typography } from "@mui/material";
import RandomGallery from "./components/RandomGallery";
import NavBar from "./components/NavBar";
import GalleryByFilter from "./components/GalleryByFilter";
import FavoritesSection from "./components/FavoritesSection";

const api_key =
  "live_xZzRUeyu7VvyLR4w6NpOJKwINtu7It7xSgcIDgvtZiffDkz0KFH55ykKiiIKXaGg";

function App() {
  const [cats, setCats] = useState(0);

  return (
    <>
      <NavBar />
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: { xs: 9, sm: 11 },
          paddingBottom: 3,
        }}
      >
        <RandomGallery
          url={`https://api.thecatapi.com/v1/images/search?limit=5`}
        />
        <Gallery />
        {cats.length > 0 &&
          cats.map((e) => (
            <img
              src={e.url}
              key={e.id}
              className="w-10/12 h-40 sm:h-96 mx-auto object-cover object-center"
            />
          ))}
        <GalleryByFilter />
        <FavoritesSection />
      </Container>
    </>
  );
}

export default App;
