"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Download, Loader2, Code2 } from "lucide-react";
import type { CodeFile } from "@/types";

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

export function CodeExportModal({
  isOpen,
  onClose,
  projectId,
}: CodeExportModalProps) {
  const [files, setFiles] = useState<CodeFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const generateCode = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate code");
      }

      const { files: generatedFiles } = await response.json();
      setFiles(generatedFiles);
    } catch (error) {
      console.error("Error generating code:", error);
      alert("Erreur lors de la génération du code. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (content: string, fileName: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedFile(fileName);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const handleDownloadAll = () => {
    files.forEach((file) => {
      const blob = new Blob([file.content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.path.split("/").pop() || "file.tsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Exporter le code</DialogTitle>
        </DialogHeader>

        {files.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-12">
            {isLoading ? (
              <div className="text-center space-y-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
                <p className="text-muted-foreground">
                  Génération du code en cours...
                </p>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <Code2 className="w-12 h-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">
                  Cliquez sur le bouton ci-dessous pour générer le code
                </p>
                <button
                  onClick={generateCode}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Générer le code
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                {files.length} fichiers générés
              </p>
              <button
                onClick={handleDownloadAll}
                className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2 text-sm"
              >
                <Download className="w-4 h-4" />
                Tout télécharger
              </button>
            </div>

            <Tabs defaultValue={files[0]?.path} className="flex-1 flex flex-col overflow-hidden">
              <TabsList className="w-full justify-start overflow-x-auto">
                {files.map((file) => (
                  <TabsTrigger key={file.path} value={file.path} className="text-xs">
                    {file.path.split("/").pop()}
                  </TabsTrigger>
                ))}
              </TabsList>

              {files.map((file) => (
                <TabsContent
                  key={file.path}
                  value={file.path}
                  className="flex-1 overflow-hidden mt-4"
                >
                  <div className="h-full flex flex-col border border-border rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
                      <span className="text-sm font-mono">{file.path}</span>
                      <button
                        onClick={() => handleCopy(file.content, file.path)}
                        className="px-3 py-1 hover:bg-accent rounded transition-colors flex items-center gap-2 text-sm"
                      >
                        {copiedFile === file.path ? (
                          <>
                            <Check className="w-4 h-4 text-green-500" />
                            Copié
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copier
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="flex-1 overflow-auto p-4 bg-muted/30 text-sm font-mono">
                      <code>{file.content}</code>
                    </pre>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
