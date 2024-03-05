import { Injectable, ConflictException } from '@nestjs/common';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './entities/song.entity';

interface SongData {
  name: string;
  band: string;
  year: number;
}

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
  ) {}

  /**
   * Parses a CSV file and transforms each row.
   * This method returns a promise that resolves with the transformed data.
   * The use of Promise here is due to the streaming and event-driven nature
   * of file reading and CSV parsing in Node.js.
   *
   * @param {string} filePath - The path to the CSV file.
   * @returns {Promise<any[]>} - A promise that resolves with the array of transformed data.
   */
  async parseCsv(filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const songs = [];
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
          const transformedRow = {
            name: row['Song Name'].toLowerCase(),
            band: row['Band'].toLowerCase(),
            year: parseInt(row['Year'], 10),
          };
          songs.push(transformedRow);
        })
        .on('end', () => {
          resolve(songs);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  async addSongs(songsData: SongData[]): Promise<void> {
    for (const songData of songsData) {
      const existingSong = await this.songRepository.findOne({
        where: {
          name: songData.name,
          band: songData.band,
          year: songData.year,
        },
      });

      if (!existingSong) {
        const newSong = this.songRepository.create(songData);
        await this.songRepository.save(newSong);
      } else {
        // Throw a ConflictException instead of logging
        throw new ConflictException(
          `Duplicate song detected: ${songData.name} by ${songData.band}`,
        );
      }
    }
  }

  async getAllSongs(): Promise<Song[]> {
    const songs = await this.songRepository.find();
    return songs;
  }
}
