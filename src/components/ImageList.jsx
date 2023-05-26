import { useRef, useState } from "react";
import { HeartBrokenOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function StandardImageList({ itemData, onClickDelete }) {
  const imageRef = useRef(null);

  const handleShow = (id) => {
    imageRef.current.style.width = "100%";
    imageRef.current.style.height = "100vh";
    imageRef.current.children[0].src = id;
  };

  const handleUnshowImage = (e) => {
    e.stopPropagation();
    e.target.style.width = "0";
    e.target.style.height = "0";
    imageRef.current.children[0].src = "";
  };

  const handleDelete = async (id) => {
    const favouriteId = id;
    var requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "live_xZzRUeyu7VvyLR4w6NpOJKwINtu7It7xSgcIDgvtZiffDkz0KFH55ykKiiIKXaGg",
      },
    };

    await fetch(
      `https://api.thecatapi.com/v1/favourites/${favouriteId}`,
      requestOptions
    );
    await onClickDelete((c) => !c);
  };

  return (
    <>
      <ImageList sx={{ width: "100%" }} cols={3}>
        {itemData.length > 0 &&
          itemData.map((item) => (
            <ImageListItem key={item.id}>
              <img
                src={`${item.image.url}?w=40&h=40&fit=crop&auto=format`}
                srcSet={`${item.image.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.id}
                loading="lazy"
                className="hover:scale-95 transition-all hover:rounded-lg"
                onClick={() => handleShow(item.image.url)}
              />
              <Button
                color="error"
                variant="contained"
                disableElevation
                sx={{ borderRadius: "0 0 5px 5px" }}
                endIcon={<HeartBrokenOutlined />}
                onClick={() => handleDelete(item.id)}
              >
                Unfav
              </Button>
            </ImageListItem>
          ))}
      </ImageList>
      <div
        ref={imageRef}
        className="w-0 h-0 fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-opacity-75 bg-black flex justify-center items-center z-50 transition-transform"
        onClick={(e) => handleUnshowImage(e)}
      >
        <img
          className="w-11/12 h-11/12 max-h-96 max-w-sm object-cover object-center rounded-md"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </>
  );
}
