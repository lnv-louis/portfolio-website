import { renderToStaticMarkup, renderToString } from "react-dom/server";

import { ROUTES, Root, type Route } from "@/app/routes";
import { Document, type DocumentAssets } from "@/document";

export { ROUTES, type Route, type DocumentAssets };
export { serverCard } from "@/mcp";

// One prerendered page: the document is static markup; only #root is hydrated.
export function renderPage(path: string, assets: DocumentAssets): string {
  const route = ROUTES[path];
  const app = renderToString(<Root pathname={path} />);
  const document = renderToStaticMarkup(
    <Document path={path} route={route} assets={assets}>
      <div id="root" dangerouslySetInnerHTML={{ __html: app }} />
    </Document>,
  );
  return `<!doctype html>${document}`;
}
