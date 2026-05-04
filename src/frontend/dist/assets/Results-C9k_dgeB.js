import { c as createLucideIcon, u as useNavigate, a as useQuizStore, r as reactExports, j as jsxRuntimeExports, Z as Zap, b as Button } from "./index-D3hyRz7e.js";
import { T as Trophy, C as Card } from "./card-Cw6aLRjO.js";
import { b as useGetScore } from "./useBackend-DAUZn-o9.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode);
function getRank(percentage) {
  if (percentage >= 90)
    return { label: "Pokémon Master", color: "text-secondary" };
  if (percentage >= 75) return { label: "Ace Trainer", color: "text-accent" };
  if (percentage >= 50)
    return { label: "Pokémon Trainer", color: "text-primary" };
  return { label: "Rookie Trainer", color: "text-muted-foreground" };
}
function Results() {
  const navigate = useNavigate();
  const { sessionId, score, setScore, answers, resetQuiz } = useQuizStore();
  const { data: fetchedScore } = useGetScore(score ? null : sessionId);
  reactExports.useEffect(() => {
    if (fetchedScore && !score) {
      setScore(fetchedScore);
    }
  }, [fetchedScore, score, setScore]);
  reactExports.useEffect(() => {
    if (!score && !fetchedScore && !sessionId) {
      navigate({ to: "/" });
    }
  }, [score, fetchedScore, sessionId, navigate]);
  const activeScore = score ?? fetchedScore;
  if (!activeScore) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex-1 flex items-center justify-center",
        "data-ocid": "results.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent mx-auto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Loading results…" })
        ] })
      }
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex-1 flex flex-col items-center justify-center px-4 py-12 bg-background",
      "data-ocid": "results.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-secondary/20 border-2 border-secondary/40 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-10 w-10 text-secondary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Quiz Complete!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-bold text-lg ${rank.color}`, children: rank.label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "quiz-card space-y-6", "data-ocid": "results.score_card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "font-display text-7xl font-black text-foreground",
              "data-ocid": "results.percentage",
              children: [
                pct,
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl text-muted-foreground", children: "%" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 rounded-lg bg-muted/20 border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-black text-secondary", children: correct }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Correct" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 rounded-lg bg-muted/20 border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-black text-primary", children: total - correct }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Wrong" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 py-2 bg-secondary/10 rounded-lg border border-secondary/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 text-secondary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-secondary text-sm", children: [
              correct * 150,
              " XP Earned"
            ] })
          ] }),
          answers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "space-y-1 max-h-40 overflow-y-auto",
              "data-ocid": "results.answer_list",
              children: answers.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `flex items-center gap-2 px-2 py-1 rounded text-xs ${a.result.correct ? "text-[oklch(var(--success))]" : "text-primary"}`,
                  "data-ocid": `results.answer.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `w-3 h-3 rounded-full flex-shrink-0 ${a.result.correct ? "bg-[oklch(var(--success))]" : "bg-primary"}`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Q",
                      a.questionIndex + 1,
                      ":",
                      " ",
                      a.result.correct ? "Correct" : "Wrong"
                    ] })
                  ]
                },
                `answer-${i}-${a.result.correct ? "correct" : "wrong"}`
              ))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => navigate({ to: "/" }),
              "data-ocid": "results.home_button",
              className: "flex-1 gap-2 border-border hover:border-primary/50",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-4 w-4" }),
                " Home"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handlePlayAgain,
              "data-ocid": "results.play_again_button",
              className: "button-primary flex-1 gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }),
                " Play Again"
              ]
            }
          )
        ] })
      ] })
    }
  );
}
export {
  Results as default
};
