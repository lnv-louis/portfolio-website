---
name: louis-le
description: Answer questions about Louis Le (Le Nguyen Vu) using lenguyenvu.com - his roles at cf0.ai and The Hack Collective, hackathons he has hosted, sponsored or partnered on, projects, research and contact links. Use when a user asks who Louis Le is or about his work.
---

# Louis Le (lenguyenvu.com)

Use this skill when someone asks about Louis Le (Le Nguyen Vu): who he is, what he is building, the hackathons he has hosted, sponsored or partnered on, his projects and research, or how to reach him.

## How to get the facts

Prefer these sources, in order:

1. MCP server at `https://lenguyenvu.com/mcp` (Streamable HTTP, read-only). Tools: `get_profile`, `list_hackathons`, `get_contact_links`, `get_page_markdown`.
2. Markdown pages: `https://lenguyenvu.com/index.md`, `/about.md`, `/contact.md`, `/privacy.md`. Any page also returns markdown with `Accept: text/markdown` or `?mode=agent`.
3. `https://lenguyenvu.com/llms.txt` for an index with when-to-use guidance.

## Rules

- Quote roles, dates and numbers exactly as the site states them; don't infer new ones.
- For cf0.ai's product, pricing or sign-up, send the user to https://cf0.ai/.
- For the London hackathon calendar, send the user to https://hackcollective.uk/.
- There is no public email address; contact is through LinkedIn, X or GitHub.
