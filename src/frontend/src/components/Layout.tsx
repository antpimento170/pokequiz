import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/hooks/useQuizStore";
import { Link, useRouterState } from "@tanstack/react-router";
import { Moon, Sun, Zap } from "lucide-react";
import { useEffect, useState } from "react";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsDark((d) => !d)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      data-ocid="theme.toggle"
      className="rounded-full border border-border hover:bg-muted/40"
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-secondary" />
      ) : (
        <Moon className="h-4 w-4 text-accent" />
      )}
    </Button>
  );
}

function ScoreBadge() {
  const answers = useQuizStore((s) => s.answers);
  const session = useQuizStore((s) => s.session);
  const currentIdx = useQuizStore((s) => s.currentQuestionIndex);

  if (!session) return null;
  const correct = answers.filter((a) => a.result.correct).length;
  const total = session.questions.length;

  return (
    <Badge
      data-ocid="score.badge"
      className="badge-score gap-1.5 text-sm font-bold border border-secondary/40 bg-secondary/10 text-secondary"
    >
      <Zap className="h-3.5 w-3.5" />
      <span>
        {correct}/{Math.min(currentIdx + 1, total)} XP
      </span>
    </Badge>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const routerState = useRouterState();
  const isQuizRoute = routerState.location.pathname === "/quiz";
  const isResultsRoute = routerState.location.pathname === "/results";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header
        className="sticky top-0 z-50 bg-card border-b border-border shadow-xs"
        data-ocid="header"
      >
        <div className="container mx-auto flex items-center justify-between h-14 px-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 select-none"
            data-ocid="header.logo_link"
          >
            <img
              src="/assets/generated/pokeball-logo-transparent.dim_80x80.png"
              alt="PokeQuiz logo"
              className="h-8 w-8 drop-shadow-md"
            />
            <span className="font-display text-lg font-bold tracking-tight">
              <span className="text-primary">Poké</span>
              <span className="text-foreground">Quiz</span>
            </span>
          </Link>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            {(isQuizRoute || isResultsRoute) && <ScoreBadge />}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-4 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
