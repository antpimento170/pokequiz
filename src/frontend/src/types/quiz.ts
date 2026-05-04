// Backend-matching types for PokeQuiz

export type QuestionKind =
  | { __kind__: "WhoIsThisPokemon" }
  | { __kind__: "WhatTypeIsThis" }
  | { __kind__: "WhichMoveDoesItLearn" }
  | { __kind__: "WhatIsThisMove" };

export interface QuizConfig {
  generation: [] | [bigint];
  questionCount: bigint;
}

export interface QuestionView {
  id: bigint;
  pokemonId: bigint;
  kind: QuestionKind;
  prompt: string;
  options: string[];
}

export type SessionStatus = { __kind__: "Active" } | { __kind__: "Completed" };

export interface SessionView {
  id: bigint;
  questions: QuestionView[];
  status: SessionStatus;
}

export interface AnswerResult {
  correct: boolean;
  correctIndex: bigint;
}

export interface ScoreResult {
  score: bigint;
  total: bigint;
  percentage: bigint;
}

export type SessionId = bigint;

// UI-level state types
export interface AnswerState {
  questionIndex: number;
  chosenIndex: number;
  result: AnswerResult;
}

export interface QuizStoreState {
  sessionId: SessionId | null;
  session: SessionView | null;
  config: QuizConfig;
  currentQuestionIndex: number;
  answers: AnswerState[];
  score: ScoreResult | null;
  isLoading: boolean;
  error: string | null;
}
