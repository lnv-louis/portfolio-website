import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import { registerAgentTools } from "@/app/agent-tools";
import { Root } from "@/app/routes";
import "@/app/globals.css";

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <Root pathname={location.pathname} />
  </StrictMode>
);

// Production pages are prerendered (scripts/prerender.ts); dev serves an empty root.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);

registerAgentTools();

// iOS Safari only applies :active on touch when a touchstart listener is in the tree.
document.addEventListener("touchstart", () => {}, { passive: true });
