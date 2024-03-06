import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import SortIcon from "@mui/icons-material/Sort";
import { Menu, MenuItem } from "@mui/material";
import { useSongsContext } from "../contexts/SongsContext";

const sortOptions = [
  { value: "name", label: "By Name" },
  { value: "band", label: "By Band" },
  { value: "year", label: "By Year" },
];

interface ControlPanelProps {
  onImportClick: () => void;
  setSearchTerm: (searchTerm: string) => void;
  onClearAll: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onImportClick,
  setSearchTerm,
  onClearAll,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { dispatch } = useSongsContext();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSort = (sortBy: string) => {
    dispatch({ type: "SORT_SONGS", payload: sortBy }); // Dispatch sort action
    setAnchorEl(null);
  };

  const handleClearAll = () => {
    dispatch({ type: "REMOVE_ALL_SONGS" });
  };

  return (
    <Box sx={styles.container}>
      <Button variant="contained" color="success" startIcon={<PlayArrowIcon />}>
        Play
      </Button>

      <TextField
        variant="outlined"
        placeholder="Search..."
        size="small"
        onChange={handleSearchChange}
        InputProps={{ startAdornment: <SearchIcon /> }}
        sx={styles.searchField}
      />

      <Button
        variant="contained"
        color="primary"
        startIcon={<FileUploadIcon />}
        onClick={onImportClick}
      >
        Import
      </Button>

      <Button
        variant="contained"
        color="primary"
        startIcon={<SortIcon />}
        onClick={handleSortClick}
      >
        Sort
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {sortOptions.map((option) => (
          <MenuItem key={option.value} onClick={() => handleSort(option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>

      <Button
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
        onClick={onClearAll}
      >
        Clear
      </Button>
    </Box>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
    margin: "auto",
    padding: 4,
  },
  searchField: {
    flexGrow: 1,
  },
};

export default ControlPanel;
