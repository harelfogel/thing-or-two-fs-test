import React, { useState, useCallback } from "react";
import { Modal, Box, Typography, CircularProgress } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useSpring, animated } from "react-spring";

interface FileUploadModalProps {
  open: boolean;
  handleClose: () => void;
  acceptedFileType?: string;
  onFileUpload: (file: File) => Promise<void>;
  uploadMessage?: string;
  dropMessage?: string;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
};

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  open,
  handleClose,
  acceptedFileType = "text/csv",
  onFileUpload,
  uploadMessage = "Uploading...",
  dropMessage = "Drag and drop a file here",
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const animation = useSpring({
    from: { transform: "translateY(0px)" },
    to: { transform: "translateY(-20px)" },
    loop: { reverse: true }, // Ensure the animation loops and reverses direction
    config: { duration: 500 }, // Adjust the duration of the animation
  });

  const handleFileDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      // Explicitly type the event parameter
      e.preventDefault();
      setIsUploading(true);
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        if (file.type === acceptedFileType) {
          onFileUpload(file)
            .then(() => {
              setIsUploading(false);
              handleClose();
            })
            .catch((error) => {
              console.error(error);
              alert("Upload failed.");
              setIsUploading(false);
            });
        } else {
          alert(`Please upload a file of type: ${acceptedFileType}.`);
          setIsUploading(false);
        }
      }
    },
    [acceptedFileType, onFileUpload, handleClose]
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="file-upload-modal-title"
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
