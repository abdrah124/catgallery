import useFetch from "../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import { Box, ButtonGroup, IconButton, Stack } from "@mui/material";
import { ArrowBack, ArrowForward, HideImage } from "@mui/icons-material";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

function CircularIndeterminate() {
  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

const RandomGallery = ({ url, breeds }) => {
  const cats = useFetch(url);
  const imageRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (breeds) {
      setIndex(0);
    }
  }, [breeds]);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((c) => {
        if (c === cats.length - 1) {
          return (c = 0);
        }
        return c + 1;
      });
      setLoaded(false);
    }, 10000);
    return () => {
      clearInterval(id);
    };
  }, [cats.length]);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleClickArrow = (num) => {
    setLoaded(false);

    setIndex((c) => {
      if (c === cats.length - 1 && num === 1) {
        return c - c;
      }
      return c + num;
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginBottom: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          position: "relative",
          backgroundColor: "rgba(40,40,40)",
          height: "288px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {cats.length > 0 ? (
          <img
            ref={imageRef}
            src={cats.length > 0 && cats[index]?.url}
            className=" h-full rounded-sm shadow-custom w-full mb-1 object-cover object-center"
            onLoad={handleLoad}
          />
        ) : (
          <HideImage sx={{ width: 50, height: 50, color: "white" }} />
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            left: 0,
            position: "absolute",
            bottom: "-50%",
            top: "-50%",
            marginLeft: 1,
          }}
        >
          <IconButton
            onClick={() => handleClickArrow(-1)}
            disabled={index === 0 || (!loaded && cats.length < 0)}
            size="medium"
            sx={{
              width: "fit-content",
              height: "fit-content",
              backgroundColor: "rgba(255,255,255,.4)",
            }}
          >
            <ArrowBack />
          </IconButton>
        </Box>

        <Box
          sx={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            right: 0,
            top: "-50%",
            bottom: "-50%",
            marginRight: 1,
          }}
        >
          <IconButton
            onClick={() => handleClickArrow(1)}
            disabled={!loaded && cats.length < 0}
            sx={{
              backgroundColor: "rgba(255,255,255,.4)",
              height: "fit-content",
            }}
          >
            <ArrowForward />
          </IconButton>
        </Box>

        {!loaded && cats.length > 0 && <CircularIndeterminate />}
        <Stack
          direction="row"
          sx={{
            position: "absolute",
            bottom: 10,
            left: "-50%",
            right: "-50%",
            justifyContent: "center",
          }}
        >
          <Stack direction="row" spacing={1} sx={{ width: "fit-content" }}>
            {cats.map((e, i) => (
              <span
                key={e.url}
                className={`dot transition-all shadow-sm ${
                  i === index ? "bg-red-400" : "bg-gray-500"
                } p-1 rounded-full w-2 h-2`}
              ></span>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default RandomGallery;
