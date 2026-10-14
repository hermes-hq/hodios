---
schema: 1
id: render-user-markdown-safely
kind: prompt
title: Render user-written Markdown safely
description: Renders user-written Markdown or rich text without XSS, using a parser, an allowlist HTML sanitizer, safe link handling, and the same output on server and client, with attack tests.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer, security-engineer]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [xss, sanitization, rich-text, dompurify, user-generated-content]
args:
  - name: where
    description: Where users write and where it is shown, for example "comments rendered in a React app and in notification emails".
    type: text
    required: true
  - name: allowed_formatting
    description: Formatting users may use, for example "bold, italics, links, lists, code blocks, no images". Leave empty for a conservative default.
    type: text
output_contract:
  format: markdown
  sections: [Pipeline, Changes, Allowlist, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Markdown is not safe by itself: raw HTML is part of the Markdown spec and several parsers pass it through by default (marked does; markdown-it only with `html: true`), and links accept `javascript:` and `data:` URLs. Escaping is easy to undo by accident: sanitizing before Markdown parsing, then letting the parser produce new HTML; sanitizing on the server with one config and rendering with another on the client; or using React's `dangerouslySetInnerHTML` with unsanitized output. Links users post can open pages that reach back through `window.opener` or lend the site's reputation to spam. Images from arbitrary hosts track readers and can break mixed-content rules.
</context>

<task>
Make rendering of user-written content safe here:

{{where}}

{{#allowed_formatting}}
Allowed formatting: {{allowed_formatting}}
{{/allowed_formatting}}

1. Find every place this content is rendered (web views, server templates, emails, notifications, exports) and how: which parser, which options, and whether any output is inserted as raw HTML.
2. Store the raw Markdown as written. Render to HTML on output, not on input, so rules can be tightened later.
3. Build one pipeline used everywhere: parse with the project's Markdown library with raw HTML disabled if the formatting does not need it (for example markdown-it `html: false`, or react-markdown without `rehype-raw`), then sanitize the HTML output with an allowlist sanitizer (DOMPurify in the browser or with jsdom on the server, sanitize-html, rehype-sanitize, `nh3` in Python (bleach is deprecated), or the stack's maintained equivalent).
4. Allowlist only the tags and attributes the formatting needs. Allow `href` only with `http`, `https` and `mailto` schemes; drop `style`, event handler attributes, `iframe`, `form`, `svg` and `object` unless explicitly needed.
5. Rewrite links: add `rel="noopener noreferrer nofollow ugc"` and `target="_blank"` if the product wants new tabs. If images are allowed, restrict their sources or proxy them.
6. In React or Vue, prefer rendering to components (react-markdown) over raw HTML; if raw HTML is unavoidable, insert only sanitizer output.
7. Add a Content-Security-Policy note or change as defence in depth if the project manages CSP, without loosening it.
8. Write tests with known payloads: `<script>`, `<img src=x onerror=...>`, `[x](javascript:alert(1))`, encoded `javascript:` variants, `<a href="data:text/html,...">`, `<svg onload>`, nested and malformed tags, and normal formatting that must still render. Run them for every output path.
</task>

<constraints>
- Do not write your own regex-based sanitizer.
- Do not sanitize only on input and then trust stored HTML forever.
- Keep the sanitizer library maintained and pinned; note if the current one is unmaintained.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Pipeline
Steps from stored Markdown to displayed HTML, per output path.

## Changes
One line per file: `path`, what changed.

## Allowlist
Tags, attributes and URL schemes allowed, and why.

## Tests
Table: Payload | Expected output.

## Verification
Commands run and their real results.
</output_format>
