import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, d as createSlot, e as cn, u as useNavigate, a as useQuizStore, B as Badge, b as Button } from "./index-D3hyRz7e.js";
import { a as useSubmitAnswer, b as useGetScore } from "./useBackend-DAUZn-o9.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
function Quiz() {
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
    setPendingAnswerIndex
  } = useQuizStore();
  const submitAnswer = useSubmitAnswer();
  const { data: scoreData } = useGetScore(
    (session == null ? void 0 : session.status.__kind__) === "Completed" ? sessionId : null
  );
  reactExports.useEffect(() => {
    if (!session) {
      navigate({ to: "/" });
    }
  }, [session, navigate]);
  reactExports.useEffect(() => {
    if (scoreData) {
      setScore(scoreData);
      navigate({ to: "/results" });
    }
  }, [scoreData, setScore, navigate]);
  if (!session) return null;
  const questions = session.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const total = questions.length;
  const progress = currentQuestionIndex / total * 100;
  const lastAnswer = answers[answers.length - 1];
  const isAnswered = (lastAnswer == null ? void 0 : lastAnswer.questionIndex) === currentQuestionIndex;
  const isLastQuestion = currentQuestionIndex === total - 1;
  async function handleAnswer(chosenIndex) {
    if (!sessionId || isAnswered || submitAnswer.isPending) return;
    setPendingAnswerIndex(chosenIndex);
    const result = await submitAnswer.mutateAsync({
      sessionId,
      questionIndex: currentQuestionIndex,
      chosenIndex
    });
    if (result) {
      addAnswer({ questionIndex: currentQuestionIndex, chosenIndex, result });
    }
    setPendingAnswerIndex(null);
  }
  async function handleNext() {
    if (isLastQuestion) {
      navigate({ to: "/results" });
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }
  function getAnswerClass(optionIndex) {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex-1 flex flex-col items-center justify-center px-4 py-8 bg-background",
      "data-ocid": "quiz.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-2xl space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                className: "bg-muted/40 text-muted-foreground border-border font-bold text-xs uppercase tracking-wider",
                "data-ocid": "quiz.question_counter",
                children: [
                  "Question ",
                  currentQuestionIndex + 1,
                  "/",
                  total
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs", children: [
              answers.filter((a) => a.result.correct).length,
              " correct"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Progress,
            {
              value: progress,
              className: "h-2 bg-muted",
              "data-ocid": "quiz.progress"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "quiz-card text-center space-y-2",
            "data-ocid": "quiz.question_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest font-semibold", children: currentQuestion.kind.__kind__.replace(/([A-Z])/g, " $1").trim() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-bold leading-snug", children: currentQuestion.prompt })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 md:grid-cols-2 gap-3",
            "data-ocid": "quiz.answers",
            children: currentQuestion.options.map((option, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => handleAnswer(i),
                disabled: isAnswered || submitAnswer.isPending,
                "data-ocid": `quiz.answer.${i + 1}`,
                className: getAnswerClass(i),
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 h-7 rounded-full bg-muted/40 flex items-center justify-center text-xs font-bold flex-shrink-0", children: String.fromCharCode(65 + i) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0", children: option }),
                  isAnswered && i === Number(lastAnswer.result.correctIndex) && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-[oklch(var(--success))] ml-auto flex-shrink-0" }),
                  isAnswered && i === lastAnswer.chosenIndex && !lastAnswer.result.correct && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4 text-primary ml-auto flex-shrink-0" })
                ] })
              },
              `option-${i}-${option}`
            ))
          }
        ),
        isAnswered && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center justify-between p-3 rounded-lg border ${lastAnswer.result.correct ? "bg-[oklch(var(--success)/0.1)] border-[oklch(var(--success)/0.3)] text-[oklch(var(--success))]" : "bg-primary/10 border-primary/30 text-primary"}`,
            "data-ocid": "quiz.feedback",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm", children: lastAnswer.result.correct ? "✓ Correct!" : `✗ Correct answer: ${currentQuestion.options[Number(lastAnswer.result.correctIndex)]}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: handleNext,
                  size: "sm",
                  "data-ocid": "quiz.next_button",
                  className: "button-primary gap-1.5 ml-4",
                  children: [
                    isLastQuestion ? "See Results" : "Next",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
                  ]
                }
              )
            ]
          }
        ),
        submitAnswer.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-destructive text-center",
            "data-ocid": "quiz.error_state",
            children: "Failed to submit answer. Please try again."
          }
        )
      ] })
    }
  );
}
export {
  Quiz as default
};
