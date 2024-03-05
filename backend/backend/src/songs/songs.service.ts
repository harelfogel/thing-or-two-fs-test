import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import * as csvParser from 'csv-parser';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './entities/song.entity';

interface SongData {
  name: string;
  band: string;
  year: number;
}

/**
 * Service responsible for handling song data operations, including parsing CSV files,
 * adding songs to the database, retrieving all songs, and clearing the songs table.
 */
@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}

  /**
   * Parses a CSV file and extracts song data.
   * Throws a BadRequestException if the CSV file is empty or if there are any rows with invalid year values.
   *
   * @param fileBuffer - The buffer containing CSV file content.
   * @returns A promise that resolves with an array of SongData extracted from the CSV file.
   */
  async parseCsv(fileBuffer: Buffer): Promise<SongData[]> {
    if (fileBuffer.length === 0) {
      throw new BadRequestException('The CSV file is empty.');
    }

    return new Promise((resolve, reject) => {
      const songs: SongData[] = [];
      const stream = require('stream');
      const bufferStream = new stream.PassThrough();
      bufferStream.end(fileBuffer);

      bufferStream
        .pipe(csvParser())
        .on('data', (row) => {
          const year = parseInt(row['Year'], 10);
          if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
            reject(
              new BadRequestException(
                `Invalid year value in CSV: ${row['Year']}`,
              ),
            );
            return;
          }
          const songData: SongData = {
            name: row['Song Name'],
            band: row['Band'],
            year,
          };
          songs.push(songData);
        })
        .on('end', () => resolve(songs))
        .on('error', (error) =>
          reject(
            new InternalServerErrorException(
              `Failed to parse CSV: ${error.message}`,
            ),
          ),
        );
    });
  }

  /**
   * Adds an array of songs to the repository. Duplicate songs (by name and band) are skipped.
   *
   * @param songsData - An array of song data to add to the database.
   */
  async addSongs(songsData: SongData[]): Promise<void> {
    for (const songData of songsData) {
      const existingSong = await this.songRepository.findOne({
        where: { name: songData.name, band: songData.band },
      });

      if (!existingSong) {
        const newSong = this.songRepository.create(songData);
        try {
          await this.songRepository.save(newSong);
        } catch (error) {
          if (error.code === '23505') {
            throw new ConflictException(
              `Song already exists: ${songData.name} by ${songData.band}`,
            );
          } else {
            throw new InternalServerErrorException(
              `Failed to save song: ${error.message}`,
            );
          }
        }
      }
    }
  }

  /**
   * Retrieves all songs from the database.
   *
   * @returns A promise that resolves with an array of all Song entities in the database.
   */
  async getAllSongs(): Promise<Song[]> {
    return this.songRepository.find();
  }

  /**
   * Clears all songs from the database.
   */
  async clearAllSongs(): Promise<void> {
    await this.songRepository.clear();
  }
}
