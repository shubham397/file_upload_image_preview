import React, { useRef, useState } from "react";
import "./fileUpload.css";

interface FileUploadProps {
  accept?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ accept = "image/*" }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewURL(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className="file-upload"
      onClick={() => fileInputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {!previewURL ? (
        <div className="placeholder">
          <p>📁 Click or drag & drop to upload</p>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            hidden
          />
        </div>
      ) : (
        <div className="preview">
          <img src={previewURL} alt="Preview" />
          <div className="file-info">
            <span>{selectedFile?.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
            >
              ❌
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
