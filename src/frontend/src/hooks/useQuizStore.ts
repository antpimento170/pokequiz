import type {
  AnswerState,
  QuizConfig,
  ScoreResult,
  SessionView,
} from "@/types/quiz";
import { create } from "zustand";

interface QuizStore {
  // State
  sessionId: bigint | null;
  session: SessionView | null;
  config: QuizConfig;
  currentQuestionIndex: number;
  answers: AnswerState[];
  score: ScoreResult | null;
  isLoading: boolean;
  error: string | null;
  pendingAnswerIndex: number | null;

  // Actions
  setSessionId: (id: bigint | null) => void;
  setSession: (session: SessionView | null) => void;
  setConfig: (config: Partial<QuizConfig>) => void;
  setCurrentQuestionIndex: (index: number) => void;
  addAnswer: (answer: AnswerState) => void;
  setScore: (score: ScoreResult | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPendingAnswerIndex: (index: number | null) => void;
  resetQuiz: () => void;
}

const defaultConfig: QuizConfig = {
  generation: [],
  questionCount: BigInt(10),
};

export const useQuizStore = create<QuizStore>((set) => ({
  sessionId: null,
  session: null,
  config: defaultConfig,
  currentQuestionIndex: 0,
  answers: [],
  score: null,
  isLoading: false,
  error: null,
  pendingAnswerIndex: null,

  setSessionId: (id) => set({ sessionId: id }),
  setSession: (session) => set({ session }),
  setConfig: (partial) =>
    set((state) => ({ config: { ...state.config, ...partial } })),
  setCurrentQuestionIndex: (currentQuestionIndex) =>
    set({ currentQuestionIndex }),
  addAnswer: (answer) =>
    set((state) => ({ answers: [...state.answers, answer] })),
  setScore: (score) => set({ score }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setPendingAnswerIndex: (pendingAnswerIndex) => set({ pendingAnswerIndex }),
  resetQuiz: () =>
    set({
      sessionId: null,
      session: null,
      config: defaultConfig,
      currentQuestionIndex: 0,
      answers: [],
      score: null,
      isLoading: false,
      error: null,
      pendingAnswerIndex: null,
    }),
}));
