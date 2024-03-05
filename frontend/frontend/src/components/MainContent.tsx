// MainContent.tsx
import React, { useState } from "react";
import Box from "@mui/material/Box";
import ControlPanel from "./ControlPanel";
import DataTable from "./DataTable";
import FileUploadModal from "./FileUploadModal";
import useSongs from "../hooks/useSongs";
import { songColumns } from "../utils/constants/songColumns";

const MainContent: React.FC = () => {
  const songs = useSongs();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  // Mock implementation of onFileUpload
  const onFileUpload = async (file: File) => {
    console.log("Uploading file:", file.name);
    // Simulate a file upload process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("File uploaded successfully");
  };

  return (
    <Box sx={{ display: "flex", marginTop: 2 }}>
      <Box component="aside" sx={{ marginRight: 2 }}></Box>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <ControlPanel onImportClick={handleOpenModal} />
        <DataTable columns={songColumns} data={songs} />
        <FileUploadModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          onFileUpload={onFileUpload} // Pass the onFileUpload function here
        />
      </Box>
    </Box>
  );
};

export default MainContent;
