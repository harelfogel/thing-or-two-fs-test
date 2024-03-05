export const fetchSongs = async () => {
  const response = await fetch("http://localhost:3000/songs");
  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }
  return response.json();
};
