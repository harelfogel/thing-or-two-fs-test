import { Injectable, ConflictException } from '@nestjs/common';
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
   * @param {string} Buffer - The path to the CSV file.
   * @returns {Promise<any[]>} - A promise that resolves with the array of transformed data.
   */
  async parseCsv(fileBuffer: Buffer): Promise<SongData[]> {
    return new Promise((resolve, reject) => {
      const songs: SongData[] = [];
      const stream = require('stream');
      const bufferStream = new stream.PassThrough();
      bufferStream.end(fileBuffer);

      bufferStream
        .pipe(csvParser())
        .on('data', (row) => {
          // Map the CSV row to your SongData interface
          const songData: SongData = {
            name: row['Song Name'], // Ensure this matches your CSV header for the song name
            band: row['Band'], // Ensure this matches your CSV header for the band name
            year: parseInt(row['Year'], 10), // Ensure this matches your CSV header for the year
          };
          songs.push(songData);
        })
        .on('end', () => {
          resolve(songs);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  async clearExistingSongs(): Promise<void> {
    await this.songRepository.delete({});
  }

  async addSongs(songsData: SongData[]): Promise<void> {
    for (const songData of songsData) {
      const existingSong = await this.songRepository.findOne({
        where: {
          name: songData.name,
          band: songData.band,
        },
      });

      if (!existingSong) {
        const newSong = this.songRepository.create(songData);
        try {
          await this.songRepository.save(newSong);
        } catch (error) {
          // You can throw a more specific error based on the error type
          throw new ConflictException(`Failed to save song: ${error.message}`);
        }
      }
    }
  }

  async getAllSongs(): Promise<Song[]> {
    const songs = await this.songRepository.find();
    return songs;
  }

  async clearAllSongs(): Promise<void> {
    await this.songRepository.clear();
  }
}
