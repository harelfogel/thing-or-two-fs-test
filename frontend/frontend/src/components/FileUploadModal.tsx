import React, { useState, useCallback, useRef } from "react";
import {
  Modal,
  Box,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ErrorIcon from "@mui/icons-material/Error";
import { useSpring, animated } from "react-spring";
import { toast } from "react-toastify";
import {
  ACCEPTED_FILE_TYPE,
  UPLOAD_MESSAGE,
  DROP_MESSAGE,
  MODAL_STYLE,
} from "../utils/constants/modalConfig";

interface FileUploadModalProps {
  open: boolean;
  handleClose: () => void;
  onFileUpload: (file: File) => Promise<void>;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  open,
  handleClose,
  onFileUpload,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [hasError, setHasError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const animation = useSpring({
    from: { transform: "translateY(0px)" },
    to: { transform: "translateY(-20px)" },
    loop: { reverse: true },
    config: { duration: 500 },
  });

  const handleFileProcess = async (file: File) => {
    setHasError(false); // Reset error state before processing
    if (file.type !== ACCEPTED_FILE_TYPE) {
      toast.error(`Please upload a file of type: ${ACCEPTED_FILE_TYPE}.`);
      setHasError(true); // Set error state
      return;
    }
    setIsUploading(true);
    try {
      await onFileUpload(file);
      toast.success("File uploaded successfully!");
      handleClose();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        `Upload failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      setHasError(true); // Set error state
    } finally {
      setIsUploading(false);
    }
  };

  const onFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      await handleFileProcess(event.target.files[0]);
    }
  };

  const onBrowseFiles = () => {
    fileInputRef.current?.click();
  };

  const onModalDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        await handleFileProcess(files[0]);
      }
    },
    [handleFileProcess]
  );

  const onModalDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const onModalDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="file-upload-modal-title"
      onDragOver={onModalDragOver}
      onDragLeave={onModalDragLeave}
    >
      <Box
        sx={{ ...MODAL_STYLE, opacity: isDragOver ? 0.7 : 1 }}
        onDrop={onModalDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={onFileInputChange}
          accept={ACCEPTED_FILE_TYPE}
        />
        {isUploading ? (
          <>
            <CircularProgress />
            <Typography>{UPLOAD_MESSAGE}</Typography>
          </>
        ) : hasError ? ( // Check if there is an error
          <>
            <ErrorIcon color="error" sx={{ fontSize: 60 }} />
            <Typography color="error">File upload failed!</Typography>
          </>
        ) : (
          <>
            <animated.div style={animation}>
              <FileUploadIcon sx={{ fontSize: 60 }} />
            </animated.div>
            <Typography variant="h6">{DROP_MESSAGE}</Typography>
            <Button variant="contained" onClick={onBrowseFiles}>
              Browse Files
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default FileUploadModal;
