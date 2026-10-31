import type { ComponentType } from "react";

import { App } from "@/app/app";
import { AboutPage } from "@/pages/about-page";
import { ContactPage } from "@/pages/contact-page";
import { DevelopersPage } from "@/pages/developers-page";
import { NotFoundPage } from "@/pages/not-found-page";
import { PrivacyPage } from "@/pages/privacy-page";

export const ORIGIN = "https://lenguyenvu.com";

export interface Route {
  Component: ComponentType;
  title: string;
  description: string;
  // Prerendered file in dist/, and its markdown twin for agents (null for 404).
  file: string;
  markdown: string | null;
}

export const ROUTES: Record<string, Route> = {
  "/": {
    Component: App,
    title: "Louis Le (Le Nguyen Vu) | AI and Real Estate, cf0.ai",
    description:
      "Louis Le is Co-Founder & CTO of cf0.ai, building production AI systems for real estate, and co-founder of The Hack Collective, London's hackathon community.",
    file: "index.html",
    markdown: "/index.md",
  },
  "/about": {
    Component: AboutPage,
    title: "About | Louis Le",
    description:
      "About Louis Le: Co-Founder & CTO of cf0.ai, UCL Computer Science student, co-founder of The Hack Collective, with projects, research and community work.",
    file: "about.html",
    markdown: "/about.md",
  },
  "/contact": {
    Component: ContactPage,
    title: "Contact | Louis Le",
    description: "How to reach Louis Le in London: LinkedIn, X, GitHub and The Hack Collective.",
    file: "contact.html",
    markdown: "/contact.md",
  },
  "/privacy": {
    Component: PrivacyPage,
    title: "Privacy | Louis Le",
    description: "Privacy policy for lenguyenvu.com: no accounts, no forms, no cookies.",
    file: "privacy.html",
    markdown: "/privacy.md",
  },
  "/developers": {
    Component: DevelopersPage,
    title: "For developers and agents | Louis Le",
    description:
      "Read-only interfaces to lenguyenvu.com: MCP server at /mcp, markdown versions of every page, llms.txt, WebMCP tools and discovery files.",
    file: "developers.html",
    markdown: "/developers.md",
  },
  "/404": {
    Component: NotFoundPage,
    title: "Page not found | Louis Le",
    description: "There is nothing at this address on lenguyenvu.com.",
    file: "404.html",
    markdown: null,
  },
};

export function routeFor(pathname: string): Route {
  const path = pathname.replace(/\.html$/, "").replace(/\/index$/, "/").replace(/(.)\/$/, "$1") || "/";
  return ROUTES[path] ?? ROUTES["/404"];
}

export function Root({ pathname }: { pathname: string }) {
  const { Component } = routeFor(pathname);
  return <Component />;
}
