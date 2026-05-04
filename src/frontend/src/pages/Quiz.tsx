import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useGetScore, useSubmitAnswer } from "@/hooks/useBackend";
import { useQuizStore } from "@/hooks/useQuizStore";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { useEffect } from "react";

export default function Quiz() {
  const navigate = useNavigate();
  const {
    sessionId,
    session,
    currentQuestionIndex,
    answers,
    pendingAnswerIndex,
    addAnswer,
    setCurrentQuestionIndex,
    setScore,
    setPendingAnswerIndex,
  } = useQuizStore();

  const submitAnswer = useSubmitAnswer();
  const { data: scoreData } = useGetScore(
    session?.status.__kind__ === "Completed" ? sessionId : null,
  );

  // Redirect if no session
  useEffect(() => {
    if (!session) {
      navigate({ to: "/" });
    }
  }, [session, navigate]);

  // Navigate to results when score is available
  useEffect(() => {
    if (scoreData) {
      setScore(scoreData);
      navigate({ to: "/results" });
    }
  }, [scoreData, setScore, navigate]);

  if (!session) return null;

  const questions = session.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const total = questions.length;
  const progress = (currentQuestionIndex / total) * 100;
  const lastAnswer = answers[answers.length - 1];
  const isAnswered = lastAnswer?.questionIndex === currentQuestionIndex;
  const isLastQuestion = currentQuestionIndex === total - 1;

  async function handleAnswer(chosenIndex: number) {
    if (!sessionId || isAnswered || submitAnswer.isPending) return;
    setPendingAnswerIndex(chosenIndex);

    const result = await submitAnswer.mutateAsync({
      sessionId,
      questionIndex: currentQuestionIndex,
      chosenIndex,
    });

    if (result) {
      addAnswer({ questionIndex: currentQuestionIndex, chosenIndex, result });
    }
    setPendingAnswerIndex(null);
  }

  async function handleNext() {
    if (isLastQuestion) {
      // Trigger score fetch by updating session status conceptually
      // We get the score which will redirect
      navigate({ to: "/results" });
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function getAnswerClass(optionIndex: number): string {
    const base = "answer-button relative text-left";
    if (!isAnswered) {
      if (pendingAnswerIndex === optionIndex) {
        return `${base} opacity-60 scale-95`;
      }
      return base;
    }
    const correctIdx = Number(lastAnswer.result.correctIndex);
    if (optionIndex === correctIdx) {
      return `${base} border-[oklch(var(--success))] bg-[oklch(var(--success)/0.1)] text-[oklch(var(--success))]`;
    }
    if (optionIndex === lastAnswer.chosenIndex && !lastAnswer.result.correct) {
      return `${base} border-primary bg-primary/10 text-primary`;
    }
    return `${base} opacity-40`;
  }

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center px-4 py-8 bg-background"
      data-ocid="quiz.page"
    >
      <div className="w-full max-w-2xl space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <Badge
              className="bg-muted/40 text-muted-foreground border-border font-bold text-xs uppercase tracking-wider"
              data-ocid="quiz.question_counter"
            >
              Question {currentQuestionIndex + 1}/{total}
            </Badge>
            <span className="text-muted-foreground text-xs">
              {answers.filter((a) => a.result.correct).length} correct
            </span>
          </div>
          <Progress
            value={progress}
            className="h-2 bg-muted"
            data-ocid="quiz.progress"
          />
        </div>

        {/* Question card */}
        <div
          className="quiz-card text-center space-y-2"
          data-ocid="quiz.question_card"
        >
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
            {currentQuestion.kind.__kind__.replace(/([A-Z])/g, " $1").trim()}
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold leading-snug">
            {currentQuestion.prompt}
          </h2>
        </div>

        {/* Answer options */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
          data-ocid="quiz.answers"
        >
          {currentQuestion.options.map((option, i) => (
            <button
              key={`option-${i}-${option}`}
              type="button"
              onClick={() => handleAnswer(i)}
              disabled={isAnswered || submitAnswer.isPending}
              data-ocid={`quiz.answer.${i + 1}`}
              className={getAnswerClass(i)}
            >
              <span className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-muted/40 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="min-w-0">{option}</span>
                {isAnswered && i === Number(lastAnswer.result.correctIndex) && (
                  <CheckCircle2 className="h-4 w-4 text-[oklch(var(--success))] ml-auto flex-shrink-0" />
                )}
                {isAnswered &&
                  i === lastAnswer.chosenIndex &&
                  !lastAnswer.result.correct && (
                    <XCircle className="h-4 w-4 text-primary ml-auto flex-shrink-0" />
                  )}
              </span>
            </button>
          ))}
        </div>

        {/* Answer feedback */}
        {isAnswered && (
          <div
            className={`flex items-center justify-between p-3 rounded-lg border ${
              lastAnswer.result.correct
                ? "bg-[oklch(var(--success)/0.1)] border-[oklch(var(--success)/0.3)] text-[oklch(var(--success))]"
                : "bg-primary/10 border-primary/30 text-primary"
            }`}
            data-ocid="quiz.feedback"
          >
            <span className="font-bold text-sm">
              {lastAnswer.result.correct
                ? "✓ Correct!"
                : `✗ Correct answer: ${currentQuestion.options[Number(lastAnswer.result.correctIndex)]}`}
            </span>
            <Button
              onClick={handleNext}
              size="sm"
              data-ocid="quiz.next_button"
              className="button-primary gap-1.5 ml-4"
            >
              {isLastQuestion ? "See Results" : "Next"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {submitAnswer.isError && (
          <p
            className="text-xs text-destructive text-center"
            data-ocid="quiz.error_state"
          >
            Failed to submit answer. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
