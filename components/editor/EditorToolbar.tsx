"use client";

import { Code2, Download, Eye, Undo, Redo } from "lucide-react";

interface EditorToolbarProps {
  projectName: string;
  hasUnsavedChanges: boolean;
  onExportCode: () => void;
  onPreview: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
}

export function EditorToolbar({
  projectName,
  hasUnsavedChanges,
  onExportCode,
  onPreview,
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo,
}: EditorToolbarProps) {
  return (
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">{projectName}</h1>
        {hasUnsavedChanges && (
          <span className="px-2 py-1 bg-yellow-500/10 text-yellow-600 text-xs rounded-full">
            Non sauvegardé
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {onUndo && (
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="p-2 hover:bg-accent rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Annuler"
          >
            <Undo className="w-5 h-5" />
          </button>
        )}
        {onRedo && (
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="p-2 hover:bg-accent rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Rétablir"
          >
            <Redo className="w-5 h-5" />
          </button>
        )}

        <div className="w-px h-8 bg-border mx-2" />

        <button
          onClick={onPreview}
          className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>

        <button
          onClick={onExportCode}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Code2 className="w-4 h-4" />
          Exporter le code
        </button>
      </div>
    </div>
  );
}
