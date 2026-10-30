import { lazy, Suspense } from "react";

// Gate the import itself so production builds never emit the agentation chunk.
const Agentation = import.meta.env.DEV
  ? lazy(() => import("agentation").then((m) => ({ default: m.Agentation })))
  : null;

export function AgentationToolbar() {
  if (!Agentation) return null;

  return (
    <Suspense fallback={null}>
      <Agentation />
    </Suspense>
  );
}
