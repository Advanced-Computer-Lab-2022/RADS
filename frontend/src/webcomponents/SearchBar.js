import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Navigate } from "react-router-dom";
import SearchPage from "./SearchPage";

const SearchBar = (props) => {
  return (
    <Box className="homesearch-component">
      <TextField
        hiddenLabel
        id="filled-search"
        type="search"
        size="small"
        variant="filled"
        placeholder="Search"
        InputProps={{
          startAdornment: <SearchIcon sx={{ marginRight: 2 }} />
        }}
        onKeyPress={(ev) => {
          console.log(`Pressed keyCode ${ev.key}`);
          if (ev.key === "Enter") {
            <Navigate to="/search" />;
            ev.preventDefault();
          }
        }}
      />
    </Box>
  );
};
 
export default SearchBar;