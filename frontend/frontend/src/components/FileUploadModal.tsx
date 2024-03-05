import React, { useState, useCallback } from "react";
import { Modal, Box, Typography, CircularProgress } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ErrorIcon from "@mui/icons-material/Error";
import { useSpring, animated } from "react-spring";
import { toast } from "react-toastify";

interface FileUploadModalProps {
  open: boolean;
  handleClose: () => void;
  acceptedFileType?: string;
  onFileUpload: (file: File) => Promise<void>;
  uploadMessage?: string;
  dropMessage?: string;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  open,
  handleClose,
  acceptedFileType = "text/csv",
  onFileUpload,
  uploadMessage = "Uploading...",
  dropMessage = "Drag and drop a file here",
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isInvalidFile, setIsInvalidFile] = useState(false);

  const animation = useSpring({
    from: { transform: "translateY(0px)" },
    to: { transform: "translateY(-20px)" },
    loop: { reverse: true },
    config: { duration: 500 },
  });

  const handleFileDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsUploading(true);
      setIsDragOver(false);
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        if (file.type === acceptedFileType) {
          try {
            await onFileUpload(file);
            setIsUploading(false);
            handleClose();
            toast.success("File uploaded successfully!");
          } catch (error) {
            if (error instanceof Error) {
              console.error("Upload error:", error);
              toast.error(`Upload failed: ${error.message}`);
            } else {
              console.error("Upload error:", error);
              toast.error("Upload failed.");
            }
            setIsUploading(false);
          }
        } else {
          toast.error(`Please upload a file of type: ${acceptedFileType}.`);
          setIsUploading(false);
        }
      }
    },
    [acceptedFileType, onFileUpload, handleClose]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(true);

      const files = e.dataTransfer.items;
      if (files && files.length > 0) {
        const fileType = files[0].type;
        setIsInvalidFile(fileType !== acceptedFileType);
      }
    },
    [acceptedFileType]
  );

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    setIsInvalidFile(false);
  }, []);

  const style = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    opacity: isDragOver ? 0.7 : 1,
    backgroundColor: isDragOver ? "#e0e0e0" : "background.paper",
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="file-upload-modal-title"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <Box
        sx={style}
        onDrop={handleFileDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {isUploading ? (
          <>
            <CircularProgress />
            <Typography>{uploadMessage}</Typography>
          </>
        ) : isInvalidFile ? (
          <>
            <ErrorIcon color="error" sx={{ fontSize: 60 }} />
            <Typography color="error">Invalid file type!</Typography>
          </>
        ) : (
          <>
            <animated.div style={animation}>
              <FileUploadIcon sx={{ fontSize: 60 }} />
            </animated.div>
            <Typography
              id="file-upload-modal-title"
              variant="h6"
              component="h2"
            >
              {dropMessage}
            </Typography>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default FileUploadModal;
