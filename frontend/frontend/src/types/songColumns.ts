import { Column } from "./commonTypes";

export const songColumns: Column[] = [
  { id: "name", label: "Song Name", minWidth: 150 },
  { id: "band", label: "Band", minWidth: 150, align: "right" },
  { id: "year", label: "Year", minWidth: 110, align: "right" },
];
