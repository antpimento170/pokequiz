import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface QuestionView {
    id: bigint;
    kind: QuestionKind;
    prompt: string;
    options: Array<string>;
    pokemonId: bigint;
}
export interface ScoreResult {
    total: bigint;
    score: bigint;
    percentage: bigint;
}
export type Generation = bigint;
export type SessionId = bigint;
export interface QuizConfig {
    generation?: Generation;
    questionCount: bigint;
}
export interface SessionView {
    id: bigint;
    status: SessionStatus;
    questions: Array<QuestionView>;
}
export interface AnswerResult {
    correctIndex: bigint;
    correct: boolean;
}
export enum QuestionKind {
    guessMove = "guessMove",
    guessName = "guessName",
    guessType = "guessType"
}
export enum SessionStatus {
    active = "active",
    completed = "completed"
}
export interface backendInterface {
    createSession(config: QuizConfig): Promise<SessionView>;
    getScore(sessionId: SessionId): Promise<ScoreResult | null>;
    getSession(sessionId: SessionId): Promise<SessionView | null>;
    submitAnswer(sessionId: SessionId, questionIndex: bigint, chosenIndex: bigint): Promise<AnswerResult | null>;
}
