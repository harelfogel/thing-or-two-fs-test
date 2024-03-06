import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Post,
  Get,
  Delete,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Param,
  Body,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongData } from './songs.dto';

/**
 * Controller that handles requests related to songs operations such as uploading songs via CSV,
 * retrieving all songs, and deleting all songs from the database.
 */
@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  /**
   * Handles POST requests to upload songs via a CSV file.
   * Utilizes FileInterceptor to handle multipart/form-data file upload.
   *
   * @param file - The uploaded CSV file as an Express Multer file object.
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const songs = await this.songsService.parseCsv(file.buffer);
      await this.songsService.addSongs(songs);
    } catch (error) {
      throw new HttpException(
        'Failed to upload and process the CSV file.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Handles GET requests to retrieve all songs from the database.
   *
   * @returns A list of all songs.
   */
  @Get()
  async getAllSongs() {
    try {
      return await this.songsService.getAllSongs();
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve songs.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Handles DELETE requests to remove all songs from the database.
   */
  @Delete()
  async clearSongs() {
    try {
      await this.songsService.clearAllSongs();
      return { message: 'All songs cleared successfully' };
    } catch (error) {
      throw new HttpException(
        'Failed to clear songs.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Handles DELETE requests to remove a specific song by ID from the database.
   * @param id - The ID of the song to be deleted.
   */
  @Delete(':id')
  async deleteSong(@Param('id') id: number) {
    try {
      await this.songsService.deleteSong(id);
      return { message: 'Song deleted successfully' };
    } catch (error) {
      throw new HttpException(
        'Failed to delete the song.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Handles POST requests to add a new song to the database.
   * Expects a request body matching the SongData interface.
   *
   * @param createSongDto - The data transfer object containing the new song's details.
   * @returns The newly created song object.
   */
  @Post()
  async addSong(@Body() createSongDto: SongData) {
    try {
      const newSong = await this.songsService.addNewSong(createSongDto);
      return newSong;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'Conflict',
            message: error.message,
          },
          HttpStatus.CONFLICT,
        );
      } else if (error instanceof BadRequestException) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Bad Request',
            message: error.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
