import { c as createLucideIcon, u as useNavigate, a as useQuizStore, r as reactExports, j as jsxRuntimeExports, B as Badge, b as Button, Z as Zap } from "./index-D3hyRz7e.js";
import { C as Card, T as Trophy } from "./card-Cw6aLRjO.js";
import { u as useCreateSession } from "./useBackend-DAUZn-o9.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["polyline", { points: "14.5 17.5 3 6 3 3 6 3 17.5 14.5", key: "1hfsw2" }],
  ["line", { x1: "13", x2: "19", y1: "19", y2: "13", key: "1vrmhu" }],
  ["line", { x1: "16", x2: "20", y1: "16", y2: "20", key: "1bron3" }],
  ["line", { x1: "19", x2: "21", y1: "21", y2: "19", key: "13pww6" }],
  ["polyline", { points: "14.5 6.5 18 3 21 3 21 6 17.5 9.5", key: "hbey2j" }],
  ["line", { x1: "5", x2: "9", y1: "14", y2: "18", key: "1hf58s" }],
  ["line", { x1: "7", x2: "4", y1: "17", y2: "20", key: "pidxm4" }],
  ["line", { x1: "3", x2: "5", y1: "19", y2: "21", key: "1pehsh" }]
];
const Swords = createLucideIcon("swords", __iconNode);
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
  { label: "Gen IX", value: 9 }
];
const QUESTION_COUNTS = [5, 10, 15, 20];
const FEATURES = [
  {
    icon: Swords,
    title: "9 Generations",
    desc: "Quiz across all Pokémon generations or focus on your favorites"
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    desc: "Know right away if your answer was correct with clear visual cues"
  },
  {
    icon: Trophy,
    title: "Score Tracking",
    desc: "See your final score and percentage at the end of each quiz"
  }
];
function Home() {
  const navigate = useNavigate();
  const createSession = useCreateSession();
  const { setConfig, setSessionId, setSession, resetQuiz } = useQuizStore();
  const [selectedGen, setSelectedGen] = reactExports.useState(null);
  const [questionCount, setQuestionCount] = reactExports.useState(10);
  async function handleStartQuiz() {
    resetQuiz();
    const quizConfig = {
      generation: selectedGen !== null ? [BigInt(selectedGen)] : [],
      questionCount: BigInt(questionCount)
    };
    setConfig(quizConfig);
    try {
      const session = await createSession.mutateAsync(quizConfig);
      setSessionId(session.id);
      setSession(session);
      navigate({ to: "/quiz" });
    } catch {
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex-1 flex flex-col items-center justify-center gap-8 px-4 py-16 bg-background relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "absolute inset-0 pointer-events-none opacity-5",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-20 left-10 w-64 h-64 rounded-full bg-primary blur-3xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-20 right-10 w-64 h-64 rounded-full bg-accent blur-3xl" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3 z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/20 text-primary border-primary/40 text-xs font-bold uppercase tracking-widest", children: "Pokémon Trivia" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl md:text-7xl font-bold tracking-tight", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Poké" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Quiz" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-md mx-auto", children: "Test your Pokémon knowledge across all 9 generations. How well do you know the Pokédex?" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "quiz-card w-full max-w-lg z-10 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider block", children: "Generation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex flex-wrap gap-2",
              "data-ocid": "home.generation_select",
              children: GENERATIONS.map((gen) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSelectedGen(gen.value),
                  "data-ocid": `home.gen.${gen.value ?? "all"}`,
                  className: `px-3 py-1.5 rounded-md text-sm font-semibold border transition-all duration-200 active:scale-95 ${selectedGen === gen.value ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-muted/30 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"}`,
                  children: gen.label
                },
                gen.label
              ))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider block", children: "Questions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", "data-ocid": "home.question_count_select", children: QUESTION_COUNTS.map((count) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setQuestionCount(count),
              "data-ocid": `home.count.${count}`,
              className: `flex-1 py-2 rounded-md text-sm font-bold border transition-all duration-200 active:scale-95 ${questionCount === count ? "bg-secondary text-secondary-foreground border-secondary shadow-sm" : "bg-muted/30 border-border text-muted-foreground hover:border-secondary/50 hover:text-foreground"}`,
              children: count
            },
            count
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleStartQuiz,
            disabled: createSession.isPending,
            "data-ocid": "home.start_button",
            className: "button-primary w-full h-12 text-base font-bold tracking-wide gap-2",
            children: createSession.isPending ? "Starting Quiz…" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "Start Quiz ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5" })
            ] })
          }
        ),
        createSession.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-destructive text-center",
            "data-ocid": "home.error_state",
            children: "Failed to start quiz. Please try again."
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/20 border-t border-border py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto max-w-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: FEATURES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center text-center gap-3 p-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "h-5 w-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm text-foreground", children: f.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: f.desc })
        ]
      },
      f.title
    )) }) }) })
  ] });
}
export {
  Home as default
};
