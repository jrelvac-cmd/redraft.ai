import { create } from "zustand";

interface GeneratorState {
  currentStep: number;
  totalSteps: number;
  answers: Record<string, any>;
  detectedInfo: Record<string, any>;
  isLoading: boolean;
  error: string | null;
}

interface GeneratorActions {
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  updateAnswer: (key: string, value: any) => void;
  setDetectedInfo: (info: Record<string, any>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetTunnel: () => void;
  shouldSkipQuestion: (questionKey: string) => boolean;
}

type GeneratorStore = GeneratorState & GeneratorActions;

const initialState: GeneratorState = {
  currentStep: 1,
  totalSteps: 10,
  answers: {},
  detectedInfo: {},
  isLoading: false,
  error: null,
};

export const useGeneratorStore = create<GeneratorStore>((set, get) => ({
  ...initialState,

  setCurrentStep: (step) => set({ currentStep: step }),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.totalSteps),
    })),

  previousStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),

  updateAnswer: (key, value) =>
    set((state) => ({
      answers: { ...state.answers, [key]: value },
    })),

  setDetectedInfo: (info) => set({ detectedInfo: info }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  resetTunnel: () => set(initialState),

  shouldSkipQuestion: (questionKey) => {
    const { detectedInfo, answers } = get();
    
    if (answers[questionKey]) {
      return false;
    }

    switch (questionKey) {
      case "productName":
        return !!detectedInfo.productName;
      case "objective":
        return !!detectedInfo.objective;
      case "marketingAngle":
        return !!detectedInfo.marketingAngle;
      case "colors":
        return !!detectedInfo.hasImages;
      case "copywritingFramework":
        return !!detectedInfo.suggestedFramework;
      case "competitors":
        return !!detectedInfo.competitors && detectedInfo.competitors.length > 0;
      default:
        return false;
    }
  },
}));
