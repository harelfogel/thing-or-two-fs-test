# Project Overview

This project is a full-stack application developed with React and NestJS, showcasing functionalities such as adding a new song, deleting a song, and importing songs from a CSV file. The application's database is containerized using Docker, ensuring ease of deployment and consistency across different environments.

## Key Features

- **Add a New Song**: Users can add a new song by specifying the song's name, band, and release year.
- **Delete a Song**: Users have the ability to remove a song from the list.
- **CSV Import**: The application supports importing songs through a CSV file. The expected columns in the CSV file are "Song Name", "Band", and "Year".
- **UI Components**: The application features a play button and navigation elements for aesthetic purposes, although these are currently static.

## Technical Note

During the development and upload process to GitHub, the project folders were inadvertently named `frontend/frontend` and `backend/backend` instead of the intended `frontend` and `backend`. I apologize for any confusion this may cause when navigating the repository.

## Running the Project

The project includes a `docker-compose.yml` file for the database, simplifying the setup process. To get the application up and running, follow these steps:

1. Ensure Docker is installed and running on your machine.
2. Navigate to the project root and run `docker-compose up` to start the database.
3. Follow the instructions in the `frontend` and `backend` README files for setting up and starting the respective services.

## Conclusion

This application demonstrates basic CRUD operations within a React and NestJS framework, with additional functionality for CSV file processing. The inclusion of Docker for database management exemplifies a modern development workflow suitable for both development and production environments.
