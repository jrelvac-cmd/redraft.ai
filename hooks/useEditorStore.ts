import { create } from "zustand";
import type { AIGeneratedData } from "@/types";

interface EditorState {
  aiData: AIGeneratedData | null;
  selectedSection: string | null;
  isEditing: boolean;
  hasUnsavedChanges: boolean;
}

interface EditorActions {
  setAiData: (data: AIGeneratedData) => void;
  setSelectedSection: (section: string | null) => void;
  setIsEditing: (editing: boolean) => void;
  updateSection: (section: string, data: any) => void;
  markSaved: () => void;
  markUnsaved: () => void;
}

type EditorStore = EditorState & EditorActions;

const initialState: EditorState = {
  aiData: null,
  selectedSection: null,
  isEditing: false,
  hasUnsavedChanges: false,
};

export const useEditorStore = create<EditorStore>((set) => ({
  ...initialState,

  setAiData: (data) => set({ aiData: data }),

  setSelectedSection: (section) => set({ selectedSection: section }),

  setIsEditing: (editing) => set({ isEditing: editing }),

  updateSection: (section, data) =>
    set((state) => {
      if (!state.aiData) return state;

      return {
        aiData: {
          ...state.aiData,
          [section]: data,
        },
        hasUnsavedChanges: true,
      };
    }),

  markSaved: () => set({ hasUnsavedChanges: false }),

  markUnsaved: () => set({ hasUnsavedChanges: true }),
}));
