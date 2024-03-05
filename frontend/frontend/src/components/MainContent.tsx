// MainContent.tsx
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ControlPanel from "./ControlPanel";
import DataTable from "./DataTable";
import FileUploadModal from "./FileUploadModal";
import { songColumns } from "../utils/constants/songColumns";
import SearchContainer from "./SearchContainer";
import { fetchSongs } from "../services/songService";
import { sortSongs } from "../utils/util";
import { Song } from "../types/songTypes";

const MainContent: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const loadSongs = async () => {
      const songsData = await fetchSongs();
      setSongs(songsData);
    };
    loadSongs();
  }, []);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSearch = (term: string) => {
    setIsLoading(true);
    setSearchTerm(term);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleSort = (sortBy: string) => {
    const sortedSongs = sortSongs(songs, sortBy);
    setSongs(sortedSongs);
    setSortBy(sortBy);
  };

  const onFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3000/songs/upload", {
        method: "POST",
        body: formData,
      });

      if (response.status === 409) {
        // Handle the conflict, e.g., by informing the user
        alert("The song you're trying to upload already exists.");
      } else if (!response.ok) {
        throw new Error("Upload failed");
      }

      // Fetch the updated songs list and update the state
      const updatedSongs = await fetchSongs();
      setSongs(updatedSongs); // Now this should be uncommented to update the state
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", marginTop: 2 }}>
      <Box component="aside" sx={{ marginRight: 2 }}></Box>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <ControlPanel
          onImportClick={handleOpenModal}
          onSearch={handleSearch}
          onSort={handleSort}
        />
        <SearchContainer
          searchTerm={searchTerm}
          isLoading={isLoading}
          songs={songs}
        />
        <DataTable key={sortBy} columns={songColumns} data={songs} />
        <FileUploadModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          onFileUpload={onFileUpload}
        />
      </Box>
    </Box>
  );
};

export default MainContent;
