import { renderToString } from "react-dom/server";

import { ROUTES, Root, type Route } from "@/app/routes";

export { ROUTES, type Route };
export { serverCard } from "@/mcp";

export function render(path: string): string {
  return renderToString(<Root pathname={path} />);
}
