import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetScore } from "@/hooks/useBackend";
import { useQuizStore } from "@/hooks/useQuizStore";
import { useNavigate } from "@tanstack/react-router";
import { Home, RotateCcw, Trophy, Zap } from "lucide-react";
import { useEffect } from "react";

function getRank(percentage: number): { label: string; color: string } {
  if (percentage >= 90)
    return { label: "Pokémon Master", color: "text-secondary" };
  if (percentage >= 75) return { label: "Ace Trainer", color: "text-accent" };
  if (percentage >= 50)
    return { label: "Pokémon Trainer", color: "text-primary" };
  return { label: "Rookie Trainer", color: "text-muted-foreground" };
}

export default function Results() {
  const navigate = useNavigate();
  const { sessionId, score, setScore, answers, resetQuiz } = useQuizStore();

  // Try to fetch score if not in store yet
  const { data: fetchedScore } = useGetScore(score ? null : sessionId);

  useEffect(() => {
    if (fetchedScore && !score) {
      setScore(fetchedScore);
    }
  }, [fetchedScore, score, setScore]);

  // Redirect if no data
  useEffect(() => {
    if (!score && !fetchedScore && !sessionId) {
      navigate({ to: "/" });
    }
  }, [score, fetchedScore, sessionId, navigate]);

  const activeScore = score ?? fetchedScore;
  if (!activeScore) {
    return (
      <div
        className="flex-1 flex items-center justify-center"
        data-ocid="results.loading_state"
      >
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground text-sm">Loading results…</p>
        </div>
      </div>
    );
  }

  const pct = Number(activeScore.percentage);
  const rank = getRank(pct);
  const correct = Number(activeScore.score);
  const total = Number(activeScore.total);

  function handlePlayAgain() {
    resetQuiz();
    navigate({ to: "/" });
  }

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center px-4 py-12 bg-background"
      data-ocid="results.page"
    >
      <div className="w-full max-w-md space-y-6">
        {/* Trophy header */}
        <div className="text-center space-y-2">
          <div className="w-20 h-20 rounded-full bg-secondary/20 border-2 border-secondary/40 flex items-center justify-center mx-auto">
            <Trophy className="h-10 w-10 text-secondary" />
          </div>
          <h1 className="font-display text-3xl font-bold">Quiz Complete!</h1>
          <p className={`font-bold text-lg ${rank.color}`}>{rank.label}</p>
        </div>

        {/* Score card */}
        <Card className="quiz-card space-y-6" data-ocid="results.score_card">
          {/* Big percentage */}
          <div className="text-center">
            <span
              className="font-display text-7xl font-black text-foreground"
              data-ocid="results.percentage"
            >
              {pct}
              <span className="text-3xl text-muted-foreground">%</span>
            </span>
          </div>

          {/* Score breakdown */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-lg bg-muted/20 border border-border">
              <p className="text-2xl font-display font-black text-secondary">
                {correct}
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Correct
              </p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/20 border border-border">
              <p className="text-2xl font-display font-black text-primary">
                {total - correct}
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Wrong
              </p>
            </div>
          </div>

          {/* XP earned */}
          <div className="flex items-center justify-center gap-2 py-2 bg-secondary/10 rounded-lg border border-secondary/30">
            <Zap className="h-4 w-4 text-secondary" />
            <span className="font-bold text-secondary text-sm">
              {correct * 150} XP Earned
            </span>
          </div>

          {/* Per-question breakdown */}
          {answers.length > 0 && (
            <div
              className="space-y-1 max-h-40 overflow-y-auto"
              data-ocid="results.answer_list"
            >
              {answers.map((a, i) => (
                <div
                  key={`answer-${i}-${a.result.correct ? "correct" : "wrong"}`}
                  className={`flex items-center gap-2 px-2 py-1 rounded text-xs ${
                    a.result.correct
                      ? "text-[oklch(var(--success))]"
                      : "text-primary"
                  }`}
                  data-ocid={`results.answer.${i + 1}`}
                >
                  <span
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      a.result.correct
                        ? "bg-[oklch(var(--success))]"
                        : "bg-primary"
                    }`}
                  />
                  <span>
                    Q{a.questionIndex + 1}:{" "}
                    {a.result.correct ? "Correct" : "Wrong"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/" })}
            data-ocid="results.home_button"
            className="flex-1 gap-2 border-border hover:border-primary/50"
          >
            <Home className="h-4 w-4" /> Home
          </Button>
          <Button
            onClick={handlePlayAgain}
            data-ocid="results.play_again_button"
            className="button-primary flex-1 gap-2"
          >
            <RotateCcw className="h-4 w-4" /> Play Again
          </Button>
        </div>
      </div>
    </div>
  );
}
