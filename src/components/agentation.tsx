"use client";

import dynamic from "next/dynamic";

const Agentation = dynamic(
  () =>
    process.env.NODE_ENV !== "production"
      ? import("agentation").then((m) => m.Agentation)
      : Promise.resolve((() => null) as React.ComponentType),
  { ssr: false, loading: () => null },
);

export function AgentationToolbar() {
  return <Agentation />;
}
