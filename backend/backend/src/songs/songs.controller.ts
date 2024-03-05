import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Post,
  Get,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const songs = await this.songsService.parseCsv(file.buffer);
    await this.songsService.addSongs(songs);
  }

  @Get()
  async getAllSongs() {
    return await this.songsService.getAllSongs();
  }

  @Delete()
  async clearSongs() {
    return await this.songsService.clearAllSongs();
  }
}
