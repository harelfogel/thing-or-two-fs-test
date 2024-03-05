import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ControlPanel from "./ControlPanel";
import DataTable from "./DataTable";
import FileUploadModal from "./FileUploadModal";
import { songColumns } from "../types/songColumns";
import SearchContainer from "./SearchContainer";
import {
  clearAllSongs,
  fetchSongs,
  onFileUpload,
} from "../services/songService";
import { sortSongs } from "../utils/util";
import { Song } from "../types/songTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const handleClearAll = async () => {
    try {
      await clearAllSongs();
      setSongs([]);
    } catch (error) {
      console.error("Clear error:", error);
      toast.error("Failed to clear songs.");
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      const updatedSongs = await onFileUpload(file);
      setSongs(updatedSongs);
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed. Please ensure the file is a valid CSV.");
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
          onClearAll={handleClearAll}
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
          onFileUpload={handleFileUpload}
        />
      </Box>
    </Box>
  );
};

export default MainContent;
