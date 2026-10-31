---
title: "For developers and agents | Louis Le"
description: "Read-only interfaces to lenguyenvu.com: MCP server at /mcp, markdown versions of every page, llms.txt, WebMCP tools and discovery files."
canonical: https://lenguyenvu.com/developers
last_updated: 2026-10-31
---

# For developers and agents

Everything on lenguyenvu.com is available to software as well as people: a read-only MCP server, markdown versions of every page, an llms.txt index and in-page WebMCP tools. No keys or sign-up; every interface is public and read-only.

## MCP server

`https://lenguyenvu.com/mcp` speaks the Model Context Protocol over Streamable HTTP. Send JSON-RPC with POST and get JSON back. Errors are JSON-RPC error objects. Server card: https://lenguyenvu.com/mcp/server-card

- `get_profile`: Louis Le's current roles, focus, location and the site's page URLs. Parameters: section: roles | pages.
- `list_hackathons`: hackathons Louis Le has hosted, sponsored or partnered on. Parameters: role: host | sponsor | partner, when: past | upcoming.
- `get_contact_links`: public contact channels. Parameters: channel: LinkedIn | X | GitHub | The Hack Collective.
- `get_page_markdown`: the markdown version of a page. Parameters: page: /index.md | /about.md | /contact.md | /privacy.md | /developers.md.

```bash
curl -X POST https://lenguyenvu.com/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call",
       "params":{"name":"list_hackathons","arguments":{"when":"upcoming"}}}'
```

## Markdown

Append `.md` to any page, send `Accept: text/markdown`, or add `?mode=agent`. Pages start with frontmatter (title, description, canonical, last updated).

```bash
curl https://lenguyenvu.com/about.md
curl -H "Accept: text/markdown" https://lenguyenvu.com/about
curl "https://lenguyenvu.com/?mode=agent"
```

## Discovery

- https://lenguyenvu.com/llms.txt: site index with when-to-use guidance; https://lenguyenvu.com/developers/llms.txt for these interfaces only.
- https://lenguyenvu.com/.well-known/ard.json and /.well-known/ai-catalog.json: catalog of the MCP server, agent skill and docs.
- https://lenguyenvu.com/.well-known/agent-skills/index.json: the louis-le agent skill, with its sha256 digest.
- WebMCP: the homepage registers the same tools through document.modelContext.
- Source and agent instructions: https://github.com/lnv-louis/portfolio-website (AGENTS.md).
