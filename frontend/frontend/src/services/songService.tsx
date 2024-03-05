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
