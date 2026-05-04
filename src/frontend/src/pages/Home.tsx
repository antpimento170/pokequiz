import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCreateSession } from "@/hooks/useBackend";
import { useQuizStore } from "@/hooks/useQuizStore";
import { useNavigate } from "@tanstack/react-router";
import { ChevronRight, Swords, Trophy, Zap } from "lucide-react";
import { useState } from "react";

const GENERATIONS = [
  { label: "All Gens", value: null },
  { label: "Gen I", value: 1 },
  { label: "Gen II", value: 2 },
  { label: "Gen III", value: 3 },
  { label: "Gen IV", value: 4 },
  { label: "Gen V", value: 5 },
  { label: "Gen VI", value: 6 },
  { label: "Gen VII", value: 7 },
  { label: "Gen VIII", value: 8 },
  { label: "Gen IX", value: 9 },
];

const QUESTION_COUNTS = [5, 10, 15, 20];

const FEATURES = [
  {
    icon: Swords,
    title: "9 Generations",
    desc: "Quiz across all Pokémon generations or focus on your favorites",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    desc: "Know right away if your answer was correct with clear visual cues",
  },
  {
    icon: Trophy,
    title: "Score Tracking",
    desc: "See your final score and percentage at the end of each quiz",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const createSession = useCreateSession();
  const { setConfig, setSessionId, setSession, resetQuiz } = useQuizStore();
  const [selectedGen, setSelectedGen] = useState<number | null>(null);
  const [questionCount, setQuestionCount] = useState(10);

  async function handleStartQuiz() {
    resetQuiz();
    const quizConfig: { generation: [] | [bigint]; questionCount: bigint } = {
      generation:
        selectedGen !== null ? ([BigInt(selectedGen)] as [bigint]) : ([] as []),
      questionCount: BigInt(questionCount),
    };
    setConfig(quizConfig);
    try {
      const session = await createSession.mutateAsync(quizConfig);
      setSessionId(session.id);
      setSession(session);
      navigate({ to: "/quiz" });
    } catch {
      // Will show error in store
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero section */}
      <section className="flex-1 flex flex-col items-center justify-center gap-8 px-4 py-16 bg-background relative overflow-hidden">
        {/* Background decoration */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          aria-hidden="true"
        >
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-accent blur-3xl" />
        </div>

        {/* Title */}
        <div className="text-center space-y-3 z-10">
          <Badge className="bg-primary/20 text-primary border-primary/40 text-xs font-bold uppercase tracking-widest">
            Pokémon Trivia
          </Badge>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight">
            <span className="text-primary">Poké</span>
            <span className="text-foreground">Quiz</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Test your Pokémon knowledge across all 9 generations. How well do
            you know the Pokédex?
          </p>
        </div>

        {/* Config card */}
        <Card className="quiz-card w-full max-w-lg z-10 space-y-6">
          {/* Generation select */}
          <div className="space-y-2">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider block">
              Generation
            </span>
            <div
              className="flex flex-wrap gap-2"
              data-ocid="home.generation_select"
            >
              {GENERATIONS.map((gen) => (
                <button
                  key={gen.label}
                  type="button"
                  onClick={() => setSelectedGen(gen.value)}
                  data-ocid={`home.gen.${gen.value ?? "all"}`}
                  className={`px-3 py-1.5 rounded-md text-sm font-semibold border transition-all duration-200 active:scale-95 ${
                    selectedGen === gen.value
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-muted/30 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {gen.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question count */}
          <div className="space-y-2">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider block">
              Questions
            </span>
            <div className="flex gap-2" data-ocid="home.question_count_select">
              {QUESTION_COUNTS.map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setQuestionCount(count)}
                  data-ocid={`home.count.${count}`}
                  className={`flex-1 py-2 rounded-md text-sm font-bold border transition-all duration-200 active:scale-95 ${
                    questionCount === count
                      ? "bg-secondary text-secondary-foreground border-secondary shadow-sm"
                      : "bg-muted/30 border-border text-muted-foreground hover:border-secondary/50 hover:text-foreground"
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Start button */}
          <Button
            onClick={handleStartQuiz}
            disabled={createSession.isPending}
            data-ocid="home.start_button"
            className="button-primary w-full h-12 text-base font-bold tracking-wide gap-2"
          >
            {createSession.isPending ? (
              "Starting Quiz…"
            ) : (
              <>
                Start Quiz <ChevronRight className="h-5 w-5" />
              </>
            )}
          </Button>

          {createSession.isError && (
            <p
              className="text-xs text-destructive text-center"
              data-ocid="home.error_state"
            >
              Failed to start quiz. Please try again.
            </p>
          )}
        </Card>
      </section>

      {/* Features section */}
      <section className="bg-muted/20 border-t border-border py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="flex flex-col items-center text-center gap-3 p-4"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-sm text-foreground">
                  {f.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
