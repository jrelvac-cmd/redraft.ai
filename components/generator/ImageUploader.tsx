"use client";

import { useState } from "react";
import { Upload, X, FileText } from "lucide-react";

interface UploadedFile {
  file: File;
  preview: string;
  type: "image" | "pdf";
}

interface ImageUploaderProps {
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
}

export function ImageUploader({
  files,
  onFilesChange,
  maxFiles = 5,
  maxSizeMB = 10,
}: ImageUploaderProps) {
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const totalFiles = files.length + selectedFiles.length;

    if (totalFiles > maxFiles) {
      setError(`Maximum ${maxFiles} fichiers autorisés`);
      return;
    }

    const newFiles: UploadedFile[] = [];

    selectedFiles.forEach((file) => {
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`Le fichier ${file.name} dépasse ${maxSizeMB} MB`);
        return;
      }

      const fileType = file.type.startsWith("image/") ? "image" : "pdf";

      if (fileType === "image") {
        const reader = new FileReader();
        reader.onloadend = () => {
          newFiles.push({
            file,
            preview: reader.result as string,
            type: fileType,
          });
          if (newFiles.length === selectedFiles.length) {
            onFilesChange([...files, ...newFiles]);
          }
        };
        reader.readAsDataURL(file);
      } else if (file.type === "application/pdf") {
        newFiles.push({
          file,
          preview: "",
          type: "pdf",
        });
        if (newFiles.length === selectedFiles.length) {
          onFilesChange([...files, ...newFiles]);
        }
      } else {
        setError("Format non supporté. Utilisez PNG, JPEG ou PDF");
      }
    });

    setError(null);
  };

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
        <input
          type="file"
          accept="image/png,image/jpeg,application/pdf"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          disabled={files.length >= maxFiles}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Cliquez pour uploader ou glissez vos fichiers ici
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PNG, JPEG, PDF • {files.length}/{maxFiles} fichiers
          </p>
        </label>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative border rounded-lg p-2 group"
            >
              {file.type === "image" ? (
                <img
                  src={file.preview}
                  alt={file.file.name}
                  className="w-full h-24 object-cover rounded"
                />
              ) : (
                <div className="w-full h-24 flex items-center justify-center bg-muted rounded">
                  <FileText className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
              <button
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
              <p className="mt-1 text-xs truncate">{file.file.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
