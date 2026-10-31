// WebMCP: read-only tools a browser agent can call on this page.
// https://webmachinelearning.github.io/webmcp/ — registered via document.modelContext,
// with navigator.modelContext as a fallback for earlier implementations.
// The same tools are served over MCP at /mcp (src/mcp.ts).
import { AGENT_TOOLS, MARKDOWN_PAGES, staticToolResult } from "@/content/profile";

interface ToolResult {
  content: { type: "text"; text: string }[];
}

interface WebMcpTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: { readOnlyHint?: boolean };
  execute: (input: Record<string, unknown>) => Promise<ToolResult> | ToolResult;
}

interface ModelContext {
  registerTool: (tool: WebMcpTool) => unknown;
}

const text = (value: string): ToolResult => ({ content: [{ type: "text", text: value }] });

async function execute(name: string, input: Record<string, unknown>): Promise<ToolResult> {
  const data = staticToolResult(name, input);
  if (data !== undefined) return text(JSON.stringify(data, null, 2));
  const page = MARKDOWN_PAGES.find((p) => p === input.page) ?? "/index.md";
  return text(await (await fetch(page)).text());
}

export function registerAgentTools() {
  const context =
    (document as Document & { modelContext?: ModelContext }).modelContext ??
    (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
  if (!context?.registerTool) return;
  for (const tool of AGENT_TOOLS) {
    context.registerTool({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
      annotations: { readOnlyHint: true },
      execute: (input) => execute(tool.name, input),
    });
  }
}
