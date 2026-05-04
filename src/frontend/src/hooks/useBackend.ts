import { createActor } from "@/backend";
import type {
  AnswerResult,
  QuizConfig,
  ScoreResult,
  SessionView,
} from "@/types/quiz";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery } from "@tanstack/react-query";

function unwrapOption<T>(
  opt:
    | { __kind__: "Some"; value: T }
    | { __kind__: "None" }
    | T[]
    | null
    | undefined,
): T | null {
  if (!opt) return null;
  // Backend returns Option as [] (None) or [value] (Some)
  if (Array.isArray(opt)) {
    return opt.length > 0 ? (opt[0] as T) : null;
  }
  if (typeof opt === "object" && "__kind__" in (opt as object)) {
    const typed = opt as { __kind__: "Some"; value: T } | { __kind__: "None" };
    return typed.__kind__ === "Some" ? typed.value : null;
  }
  return null;
}

export function useCreateSession() {
  const { actor } = useActor(createActor);
  return useMutation<SessionView, Error, QuizConfig>({
    mutationFn: async (config: QuizConfig) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await (
        actor as unknown as {
          createSession: (config: QuizConfig) => Promise<SessionView>;
        }
      ).createSession(config);
      return result;
    },
  });
}

export function useGetSession(sessionId: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SessionView | null>({
    queryKey: ["session", sessionId?.toString()],
    queryFn: async () => {
      if (!actor || sessionId === null) return null;
      const result = await (
        actor as unknown as {
          getSession: (id: bigint) => Promise<Array<SessionView>>;
        }
      ).getSession(sessionId);
      return unwrapOption<SessionView>(result);
    },
    enabled: !!actor && !isFetching && sessionId !== null,
  });
}

export function useSubmitAnswer() {
  const { actor } = useActor(createActor);
  return useMutation<
    AnswerResult | null,
    Error,
    { sessionId: bigint; questionIndex: number; chosenIndex: number }
  >({
    mutationFn: async ({ sessionId, questionIndex, chosenIndex }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await (
        actor as unknown as {
          submitAnswer: (
            sessionId: bigint,
            questionIndex: bigint,
            chosenIndex: bigint,
          ) => Promise<Array<AnswerResult>>;
        }
      ).submitAnswer(sessionId, BigInt(questionIndex), BigInt(chosenIndex));
      return unwrapOption<AnswerResult>(result);
    },
  });
}

export function useGetScore(sessionId: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ScoreResult | null>({
    queryKey: ["score", sessionId?.toString()],
    queryFn: async () => {
      if (!actor || sessionId === null) return null;
      const result = await (
        actor as unknown as {
          getScore: (id: bigint) => Promise<Array<ScoreResult>>;
        }
      ).getScore(sessionId);
      return unwrapOption<ScoreResult>(result);
    },
    enabled: !!actor && !isFetching && sessionId !== null,
  });
}
