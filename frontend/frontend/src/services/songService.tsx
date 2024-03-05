export const fetchSongs = async () => {
  const response = await fetch("http://localhost:3000/songs");
  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }
  return response.json();
};

const onFileUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://localhost:3000/songs/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    // Optionally, fetch the updated songs list and update the state
    const updatedSongs = await fetchSongs();
    // Update the state or context that holds the songs data
    // setSongs(updatedSongs); // Make sure to define setSongs or update your context
  } catch (error) {
    console.error("Upload error:", error);
  }
};
