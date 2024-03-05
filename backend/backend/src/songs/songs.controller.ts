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
} from '@nestjs/common';
import { SongsService } from './songs.service';

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
    } catch (error) {
      throw new HttpException(
        'Failed to clear songs.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
