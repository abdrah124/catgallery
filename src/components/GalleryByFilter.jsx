import React from "react";
import RandomGallery from "./RandomGallery";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useFetch from "../hooks/useFetch";

function BasicSelect({ setBreeds }) {
  const [age, setAge] = React.useState("");

  const breeds = useFetch("https://api.thecatapi.com/v1/breeds");
  console.log(breeds);
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, alignSelf: "start", marginBottom: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Breeds</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          {breeds.length > 0 &&
            breeds.map((breed) => (
              <MenuItem
                value={breed.id}
                key={breed.id}
                onClick={() => setBreeds(breed.id)}
              >
                {breed.name}
              </MenuItem>
            ))}

          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

const GalleryByFilter = () => {
  const [breeds, setBreeds] = React.useState("beng");

  return (
    <>
      <BasicSelect setBreeds={setBreeds} />
      <RandomGallery
        url={`https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breeds}&api_key=REPLACE_ME`}
      />
    </>
  );
};

export default GalleryByFilter;
