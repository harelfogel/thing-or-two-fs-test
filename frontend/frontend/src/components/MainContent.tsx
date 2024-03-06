import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import ControlPanel from "./ControlPanel";
import DataTable from "./DataTable";
import FileUploadModal from "./FileUploadModal";
import { songColumns } from "../types/songColumns";
import SearchContainer from "./SearchContainer";
import {
  fetchSongs,
  onFileUpload,
  clearAllSongs,
} from "../services/songService";
import { useSongsContext } from "../contexts/SongsContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainContent: React.FC = () => {
  const { state, dispatch } = useSongsContext();
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const loadInitialSongs = async () => {
    try {
      const songsData = await fetchSongs();
      dispatch({ type: "SET_SONGS", payload: songsData });
    } catch (error) {
      console.error("Fetch songs error:", error);
    }
  };

  useEffect(() => {
    loadInitialSongs();
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

  const handleClearAll = async () => {
    try {
      await clearAllSongs();
      dispatch({ type: "SET_SONGS", payload: [] });
      toast.success("All songs cleared successfully!");
    } catch (error) {
      console.error("Clear error:", error);
      toast.error("Failed to clear songs.");
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      await onFileUpload(file);
      const updatedSongs = await fetchSongs();
      dispatch({ type: "SET_SONGS", payload: updatedSongs });
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
          setSearchTerm={handleSearch}
          onClearAll={handleClearAll}
        />
        <SearchContainer
          searchTerm={searchTerm}
          isLoading={isLoading}
          songs={state.songs}
        />
        <DataTable columns={songColumns} data={state.songs} />{" "}
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
