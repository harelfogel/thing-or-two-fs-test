import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Song } from './songs/entities/song.entity'; // Import the Song entity
import { SongsModule } from './songs/songs.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [Song], // Include the Song entity here
        synchronize: true, // Note: set to false in production
      }),
    }),
    SongsModule, // Ensure the SongsModule is imported here
  ],
  controllers: [AppController], // Include AppController in the controllers array
  providers: [AppService], // Include AppService in the providers array
})
export class AppModule {}
