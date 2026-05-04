import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("@/pages/Home"));
const QuizPage = lazy(() => import("@/pages/Quiz"));
const ResultsPage = lazy(() => import("@/pages/Results"));

function PageLoader() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
      <Skeleton className="h-12 w-64 rounded-lg" />
      <Skeleton className="h-6 w-96 rounded-md" />
      <Skeleton className="h-6 w-80 rounded-md" />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
});

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quiz",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <QuizPage />
    </Suspense>
  ),
});

const resultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/results",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ResultsPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([homeRoute, quizRoute, resultsRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
