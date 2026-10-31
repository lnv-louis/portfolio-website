import * as stylex from '@stylexjs/stylex'

import { ProsePage, prose } from '@/components/prose-page'
import { proseCodeStyles as code } from '@/pages/developers-page.stylex'
import { AGENT_TOOLS } from '@/content/profile'

const MCP_EXAMPLE = `curl -X POST https://lenguyenvu.com/mcp \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call",
       "params":{"name":"list_hackathons","arguments":{"when":"upcoming"}}}'`

const MARKDOWN_EXAMPLE = `curl https://lenguyenvu.com/about.md
curl -H "Accept: text/markdown" https://lenguyenvu.com/about
curl "https://lenguyenvu.com/?mode=agent"`

function params(schema: Record<string, unknown>): string {
  const properties = (schema.properties ?? {}) as Record<string, { enum?: readonly string[] }>
  const names = Object.entries(properties).map(([name, p]) => (p.enum ? `${name}: ${p.enum.join(' | ')}` : name))
  return names.length ? names.join(', ') : 'none'
}

export function DevelopersPage() {
  return (
    <ProsePage path="/developers" title="For developers and agents">
      <p {...stylex.props(prose.p)}>
        Everything on lenguyenvu.com is available to software as well as people: a read-only MCP
        server, markdown versions of every page, an llms.txt index and in-page WebMCP tools. No
        keys or sign-up; every interface is public and read-only.
      </p>

      <h2 {...stylex.props(prose.h2)}>MCP server</h2>
      <p {...stylex.props(prose.p)}>
        <code {...stylex.props(code.inline)}>https://lenguyenvu.com/mcp</code> speaks the Model Context
        Protocol over Streamable HTTP. Send JSON-RPC with POST and get JSON back. Errors are JSON-RPC
        error objects. The server card is at{' '}
        <a href="/mcp/server-card" {...stylex.props(prose.link)}>
          /mcp/server-card
        </a>
        .
      </p>
      <ul {...stylex.props(prose.list)}>
        {AGENT_TOOLS.map((tool) => (
          <li key={tool.name}>
            <code {...stylex.props(code.inline)}>{tool.name}</code>: {tool.description} Parameters:{' '}
            {params(tool.inputSchema)}.
          </li>
        ))}
      </ul>
      <pre {...stylex.props(code.block)}>
        <code>{MCP_EXAMPLE}</code>
      </pre>

      <h2 {...stylex.props(prose.h2)}>Markdown</h2>
      <p {...stylex.props(prose.p)}>
        Append <code {...stylex.props(code.inline)}>.md</code> to any page, send{' '}
        <code {...stylex.props(code.inline)}>Accept: text/markdown</code>, or add{' '}
        <code {...stylex.props(code.inline)}>?mode=agent</code>. Pages start with frontmatter (title,
        description, canonical, last updated).
      </p>
      <pre {...stylex.props(code.block)}>
        <code>{MARKDOWN_EXAMPLE}</code>
      </pre>

      <h2 {...stylex.props(prose.h2)}>Discovery</h2>
      <ul {...stylex.props(prose.list)}>
        <li>
          <a href="/llms.txt" {...stylex.props(prose.link)}>/llms.txt</a>: site index with when-to-use
          guidance; <a href="/developers/llms.txt" {...stylex.props(prose.link)}>/developers/llms.txt</a>{' '}
          for these interfaces only.
        </li>
        <li>
          <a href="/.well-known/ard.json" {...stylex.props(prose.link)}>/.well-known/ard.json</a> and{' '}
          <a href="/.well-known/ai-catalog.json" {...stylex.props(prose.link)}>ai-catalog.json</a>: catalog of
          the MCP server, agent skill and docs.
        </li>
        <li>
          <a href="/.well-known/agent-skills/index.json" {...stylex.props(prose.link)}>
            /.well-known/agent-skills/index.json
          </a>
          : the louis-le agent skill, with its sha256 digest.
        </li>
        <li>WebMCP: the homepage registers the same tools through document.modelContext.</li>
        <li>
          Source and agent instructions:{' '}
          <a href="https://github.com/lnv-louis/portfolio-website" target="_blank" rel="noopener noreferrer" {...stylex.props(prose.link)}>
            github.com/lnv-louis/portfolio-website
          </a>{' '}
          (AGENTS.md).
        </li>
      </ul>
    </ProsePage>
  )
}
