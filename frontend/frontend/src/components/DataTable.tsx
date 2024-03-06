import React, { useState } from "react";
import { Song } from "../types/songTypes";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
  IconButton,
  TextField,
} from "@mui/material";
import { Column } from "../types/commonTypes";
import {
  DEFAULT_PAGE,
  DEFAULT_ROWS_PER_PAGE,
  ROWS_PER_PAGE_OPTIONS,
} from "../utils/constants/paginationConfig";
import { addSong, deleteSong } from "../services/songService";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useSongsContext } from "../contexts/SongsContext";
import { toast } from "react-toastify";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

interface DataTableProps {
  columns: Column[];
  data: Song[];
}

const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
  const { dispatch } = useSongsContext();
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [isAdding, setIsAdding] = useState(false);
  const [newSong, setNewSong] = useState({
    name: "",
    band: "",
    year: new Date().getFullYear().toString(),
  });

  const displayData = isAdding ? [{ id: "new", ...newSong }, ...data] : data;
  const totalRowsCount = isAdding ? data.length + 1 : data.length;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, totalRowsCount - page * rowsPerPage);

  const handleAddSong = async () => {
    if (!newSong.name || !newSong.band || !newSong.year) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const addedSong = await addSong({
        ...newSong,
        year: parseInt(newSong.year),
      });
      dispatch({ type: "ADD_SONG", payload: addedSong });
      setIsAdding(false);
      setNewSong({
        name: "",
        band: "",
        year: new Date().getFullYear().toString(),
      });
      toast.success("Song added successfully!");
    } catch (error) {
      toast.error("Failed to add song.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setNewSong({ ...newSong, [field]: e.target.value });
  };

  const handleChangePage = (event: unknown, newPage: number) =>
    setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(DEFAULT_PAGE);
  };

  const handleDeleteSong = async (songId: number) => {
    try {
      await deleteSong(songId);
      dispatch({ type: "REMOVE_SONG", payload: songId });
      toast.success("Song deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete song.");
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map(({ id, align, minWidth, label }) => (
              <TableCell key={id} align={align} style={{ minWidth }}>
                {label}
              </TableCell>
            ))}
            <TableCell align="center">
              Actions
              {isAdding ? (
                <IconButton
                  onClick={() => setIsAdding(false)}
                  style={{ marginLeft: 10 }}
                >
                  <CancelIcon />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => setIsAdding(true)}
                  style={{ marginLeft: 10 }}
                >
                  <AddIcon />
                </IconButton>
              )}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isAdding && (
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <TextField
                    size="small"
                    value={newSong[column.id as keyof typeof newSong] || ""}
                    onChange={(e) => handleInputChange(e, column.id)}
                    placeholder={column.label}
                    type={column.id === "year" ? "number" : "text"}
                  />
                </TableCell>
              ))}
              <TableCell align="center">
                <IconButton onClick={handleAddSong}>
                  <CheckIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          )}

          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map(({ id, align }) => {
                  const value = row[id as keyof Song];
                  return (
                    <TableCell key={id} align={align}>
                      {value}
                    </TableCell>
                  );
                })}
                <TableCell align="center">
                  <IconButton onClick={() => handleDeleteSong(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={columns.length + 1} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
              colSpan={columns.length + 1}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
