import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import useFetch from "../hooks/useFetch";
import { useRef } from "react";
import { TagFacesTwoTone } from "@mui/icons-material";
import ProgressCircle from "./ProgressCircle";
import { Box } from "@mui/material";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function GallerySearch({ search }) {
  const data = useFetch(`https://api.thecatapi.com/v1/images/search?limit=12`);
  const imageRef = useRef(null);

  let itemData = [];
  if (data.length > 0) {
    itemData = [
      {
        img: data[0].url,
        rows: 2,
        cols: 2,
      },
      {
        img: data[1].url,
      },
      {
        img: data[2].url,
      },
      {
        img: data[3].url,
        cols: 2,
      },
      {
        img: data[4].url,
        cols: 2,
      },
      {
        img: data[5].url,
        rows: 2,
        cols: 2,
      },
      {
        img: data[6].url,
        title: "Basketball",
      },
      {
        img: data[7].url,
        title: "Fern",
      },
      {
        img: data[8].url,
        rows: 2,
        cols: 2,
      },
      {
        img: data[9].url,
        title: "Tomato basil",
      },
      {
        img: data[10].url,
        title: "Sea star",
      },
      {
        img: data[11].url,
        cols: 2,
      },
    ];
  }

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
  return (
    <>
      <ImageList
        sx={{ width: "100%", height: "fit-content", paddingBottom: 4 }}
        variant="quilted"
        cols={4}
        rowHeight={121}
      >
        {data.length > 0 &&
          itemData.map((item, index) => (
            <ImageListItem
              key={item.img}
              cols={item.cols || 1}
              rows={item.rows || 1}
            >
              <img
                {...srcset(item.img, 121, item.rows, item.cols)}
                alt={item.title}
                loading="lazy"
                className=" hover:scale-95 hover:z-50 hover:absolute transition-all hover:rounded-lg "
                onClick={(e) => handleShow(e.target.srcset)}
              />
            </ImageListItem>
          ))}
      </ImageList>
      {data.length === 0 && (
        <Box
          sx={{
            widht: "100%",
            minHeight: "30vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ProgressCircle />
        </Box>
      )}
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
