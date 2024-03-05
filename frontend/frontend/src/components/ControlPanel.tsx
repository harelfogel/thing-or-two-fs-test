import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SortIcon from "@mui/icons-material/Sort";
import { Menu, MenuItem } from "@mui/material";

interface ControlPanelProps {
  onImportClick: () => void;
  onSearch: (searchTerm: string) => void;
  onSort: (sortBy: string) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onImportClick,
  onSearch,
  onSort,
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleSortClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (sortBy: string) => {
    onSort(sortBy);
    handleSortClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        margin: "auto",
        padding: 4,
      }}
    >
      <Button variant="contained" color="success" startIcon={<PlayArrowIcon />}>
        Play
      </Button>
      <TextField
        variant="outlined"
        placeholder="Search..."
        size="small"
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
        sx={{ flexGrow: 1 }}
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
        <MenuItem onClick={() => handleSort("name")}>By Name</MenuItem>
        <MenuItem onClick={() => handleSort("band")}>By Band</MenuItem>
        <MenuItem onClick={() => handleSort("year")}>By Year</MenuItem>
      </Menu>
    </Box>
  );
};

export default ControlPanel;
