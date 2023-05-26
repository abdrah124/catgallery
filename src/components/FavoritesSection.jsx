import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import useFetch from "../hooks/useFetch";
import { Favorite } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";

export default function FavoritesSection() {
  const itemData = useFetch(
    "https://api.thecatapi.com/v1/images/search?limit=30"
  );
  const handlePost = async (id) => {
    const rawBody = JSON.stringify({
      image_id: id,
      sub_id: crypto.randomUUID(),
    });

    const newFavourite = await fetch(
      "https://api.thecatapi.com/v1/favourites",
      {
        method: "POST",
        headers: {
          "x-api-key":
            "live_xZzRUeyu7VvyLR4w6NpOJKwINtu7It7xSgcIDgvtZiffDkz0KFH55ykKiiIKXaGg",
          "Content-Type": "application/json",
        },
        body: rawBody,
      }
    );

    console.log(newFavourite.status);
    console.log(await newFavourite.text());
  };

  return (
    <ImageList sx={{ width: "100%" }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">Random Cats</ListSubheader>
      </ImageListItem>
      {itemData.map((item) => (
        <ImageListItem key={item.id}>
          <img
            src={`${item.url}?w=248&fit=crop&auto=format`}
            srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.id}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={item.author}
            actionIcon={
              <>
                <Button
                  variant="text"
                  aria-label={`info about cat`}
                  endIcon={<Favorite color="error" />}
                  sx={{ color: "white" }}
                  onClick={() => handlePost(item.id)}
                >
                  Favorite
                </Button>
              </>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
