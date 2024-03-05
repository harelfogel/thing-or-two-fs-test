// src/types/songTypes.ts
export interface Song {
  id: number;
  name: string;
  band: string;
  year: number;
  [key: string]: string | number;
}
