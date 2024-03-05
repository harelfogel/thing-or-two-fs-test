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

const sortOptions = [
  { value: "name", label: "By Name" },
  { value: "band", label: "By Band" },
  { value: "year", label: "By Year" },
];

interface ControlPanelProps {
  onImportClick: () => void;
  onSearch: (searchTerm: string) => void;
  onSort: (sortBy: string) => void;
  onClearAll?: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onImportClick,
  onSearch,
  onSort,
  onClearAll,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorEl(null);
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
        Filter
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleSortClose}
      >
        {sortOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => {
              onSort(option.value);
              handleSortClose();
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>

      {onClearAll && (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={onClearAll}
        >
          Clear
        </Button>
      )}
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
