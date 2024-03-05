import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FileUploadIcon from "@mui/icons-material/FileUpload";

interface ControlPanelProps {
  onImportClick: () => void; // Add this prop for the import button click handler
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onImportClick }) => {
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
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
        sx={{ flexGrow: 1 }}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<FileUploadIcon />}
        onClick={onImportClick} // Use the passed prop here
      >
        Import
      </Button>
    </Box>
  );
};

export default ControlPanel;
