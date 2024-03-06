import { SONGS_API } from "../utils/constants/apiUrls";

export const fetchSongs = async () => {
  const response = await fetch(SONGS_API.FETCH_SONGS);
  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }
  return response.json();
};

export const onFileUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(SONGS_API.UPLOAD_SONGS, {
      method: "POST",
      body: formData,
    });

    if (response.status === 409) {
      alert("The song you're trying to upload already exists.");
    } else if (!response.ok) {
      throw new Error("Upload failed");
    }

    const updatedSongs = await fetchSongs();
    return updatedSongs;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

export const clearAllSongs = async () => {
  try {
    const response = await fetch(SONGS_API.CLEAR_SONGS, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to clear songs");
    }
  } catch (error) {
    console.error("Clear error:", error);
    throw error;
  }
};

export const addSong = async (songData: {
  name: string;
  band: string;
  year: number;
}) => {
  try {
    const response = await fetch(SONGS_API.FETCH_SONGS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(songData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add the song");
    }

    return await response.json();
  } catch (error) {
    console.error("Add song error:", error);
    throw error;
  }
};

export const deleteSong = async (songId: number) => {
  try {
    const response = await fetch(`${SONGS_API.FETCH_SONGS}/${songId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete the song");
    }
    return true;
  } catch (error) {
    console.error("Delete song error:", error);
    throw error;
  }
};
