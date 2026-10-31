// Read-only MCP server for lenguyenvu.com, served by the Worker at /mcp.
// Streamable HTTP transport in its stateless JSON-response form: every request is a
// single JSON-RPC POST answered with application/json; no sessions, no SSE stream.
// Spec: https://modelcontextprotocol.io/specification/2025-06-18/basic/transports
import { AGENT_TOOLS, MARKDOWN_PAGES, staticToolResult } from "@/content/profile";

export const MCP_SERVER = {
  name: "com.lenguyenvu/mcp",
  title: "Louis Le",
  version: "1.0.0",
  description: "Read-only facts about Louis Le: profile, hackathons, contact links and page markdown.",
};

const PROTOCOL_VERSIONS = ["2025-06-18", "2025-03-26", "2024-11-05"];
const ORIGIN = "https://lenguyenvu.com";

interface Assets {
  fetch: (request: Request | URL | string) => Promise<Response>;
}

interface RpcRequest {
  jsonrpc: "2.0";
  id?: string | number | null;
  method: string;
  params?: Record<string, unknown>;
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Protocol-Version, Mcp-Session-Id",
  "Access-Control-Expose-Headers": "Mcp-Protocol-Version",
};

function json(body: unknown, status = 200, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...CORS, ...extra },
  });
}

function rpcError(id: RpcRequest["id"], code: number, message: string, data?: unknown) {
  return { jsonrpc: "2.0", id: id ?? null, error: { code, message, ...(data === undefined ? {} : { data }) } };
}

async function readMarkdown(assets: Assets, path: string): Promise<string> {
  const res = await assets.fetch(new URL(path, ORIGIN));
  if (!res.ok) throw new Error(`Could not read ${path} (${res.status})`);
  return res.text();
}

async function handle(rpc: RpcRequest, assets: Assets) {
  const params = rpc.params ?? {};
  switch (rpc.method) {
    case "initialize": {
      const requested = String(params.protocolVersion ?? "");
      return {
        protocolVersion: PROTOCOL_VERSIONS.includes(requested) ? requested : PROTOCOL_VERSIONS[0],
        capabilities: { tools: { listChanged: false }, resources: { listChanged: false } },
        serverInfo: { name: MCP_SERVER.name, title: MCP_SERVER.title, version: MCP_SERVER.version },
        instructions:
          "Use these tools to answer questions about Louis Le (Le Nguyen Vu): his roles at cf0.ai and The Hack Collective, the hackathons he has hosted or sponsored, and how to contact him. All tools are read-only.",
      };
    }
    case "ping":
      return {};
    case "tools/list":
      return {
        tools: AGENT_TOOLS.map((tool) => ({
          ...tool,
          annotations: { title: tool.title, readOnlyHint: true, idempotentHint: true, openWorldHint: false },
        })),
      };
    case "tools/call": {
      const name = String(params.name ?? "");
      const args = (params.arguments ?? {}) as Record<string, unknown>;
      if (!AGENT_TOOLS.some((tool) => tool.name === name)) {
        throw Object.assign(new Error(`Unknown tool: ${name}`), { code: -32602 });
      }
      const data = staticToolResult(name);
      if (data !== undefined) {
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }], structuredContent: { result: data } };
      }
      const page = MARKDOWN_PAGES.find((p) => p === args.page);
      if (!page) {
        return {
          isError: true,
          content: [{ type: "text", text: `Unknown page. Use one of: ${MARKDOWN_PAGES.join(", ")}` }],
        };
      }
      return { content: [{ type: "text", text: await readMarkdown(assets, page) }] };
    }
    case "resources/list":
      return {
        resources: MARKDOWN_PAGES.map((page) => ({
          uri: `${ORIGIN}${page}`,
          name: page.slice(1),
          title: page === "/index.md" ? "Home" : page.slice(1, -3).replace(/^./, (c) => c.toUpperCase()),
          mimeType: "text/markdown",
        })),
      };
    case "resources/read": {
      const uri = String(params.uri ?? "");
      const page = MARKDOWN_PAGES.find((p) => `${ORIGIN}${p}` === uri);
      if (!page) throw Object.assign(new Error(`Unknown resource: ${uri}`), { code: -32002 });
      return { contents: [{ uri, mimeType: "text/markdown", text: await readMarkdown(assets, page) }] };
    }
    default:
      throw Object.assign(new Error(`Method not found: ${rpc.method}`), { code: -32601 });
  }
}

export function serverCard() {
  return {
    $schema: "https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json",
    name: MCP_SERVER.name,
    title: MCP_SERVER.title,
    description: MCP_SERVER.description,
    version: MCP_SERVER.version,
    websiteUrl: `${ORIGIN}/`,
    remotes: [{ type: "streamable-http", url: `${ORIGIN}/mcp` }],
  };
}

export async function handleMcp(request: Request, assets: Assets): Promise<Response> {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (request.method !== "POST") {
    return json(rpcError(null, -32000, "Method not allowed: send JSON-RPC requests with POST."), 405, { Allow: "POST, OPTIONS" });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(rpcError(null, -32700, "Parse error: the request body must be JSON."), 400);
  }

  const rpc = body as RpcRequest;
  if (!rpc || rpc.jsonrpc !== "2.0" || typeof rpc.method !== "string") {
    return json(rpcError(null, -32600, "Invalid request: expected a JSON-RPC 2.0 object with a method."), 400);
  }
  // Notifications (no id) are acknowledged without a body.
  if (rpc.id === undefined) return new Response(null, { status: 202, headers: CORS });

  try {
    const result = await handle(rpc, assets);
    return json({ jsonrpc: "2.0", id: rpc.id, result });
  } catch (error) {
    const code = (error as { code?: number }).code ?? -32603;
    return json(rpcError(rpc.id, code, error instanceof Error ? error.message : "Internal error"));
  }
}
