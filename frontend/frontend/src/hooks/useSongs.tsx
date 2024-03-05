import { useState, useEffect } from "react";
import { fetchSongs } from "../services/songService";

const useSongs = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const getSongs = async () => {
      try {
        const fetchedSongs = await fetchSongs();
        setSongs(fetchedSongs);
      } catch (error) {
        console.error(error);
      }
    };

    getSongs();
  }, []);

  return songs;
};

export default useSongs;
