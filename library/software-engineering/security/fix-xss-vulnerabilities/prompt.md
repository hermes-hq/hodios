---
schema: 1
id: fix-xss-vulnerabilities
kind: prompt
title: Fix cross-site scripting (XSS)
description: Fixes reflected, stored and DOM XSS with output encoding for each context, an allowlist sanitizer for rich text and safe use of escape hatches like dangerouslySetInnerHTML or v-html.
category: security
version: 1.0.0
status: incubating
stage: [build, verify]
role: [frontend-engineer, fullstack-engineer, software-engineer, security-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, file, text]
output: [diff, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [xss, output-encoding, html-sanitization, owasp]
pairs_with:
  prompts: [audit-input-handling, render-user-markdown-safely, harden-web-app-config, write-exploit-regression-test]
  personas: [security-auditor]
  rules: [secure-coding-rules]
args:
  - name: target
    description: The pages, components, templates or scanner findings to fix.
    type: text
    required: true
  - name: stack
    description: Framework and template engine. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Sinks, Changes, Tests, Verification, Not fixed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Modern frameworks escape text by default, so real XSS lives where that default is switched off or does not apply. The common places are escape hatches (`dangerouslySetInnerHTML`, `v-html`, `[innerHTML]`, `bypassSecurityTrust*`, `|safe`, `{!! !!}`, `html_safe`, `raw`, `@Html.Raw`), direct DOM writes (`innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`, jQuery `.html()`), URLs placed in `href` or `src` that can be `javascript:` URLs, user data placed inside inline `<script>` blocks or event handler attributes, and server-rendered JSON that is not escaped for `</script>`. HTML-encoding is only correct in HTML text and quoted attributes; JavaScript, URL and CSS contexts each need their own handling. Rich text needs an allowlist sanitizer (DOMPurify in the browser, a maintained equivalent on the server) applied at render time, not a regex. A Content Security Policy is a second layer, not the fix.
</context>

<task>
Fix XSS in {{target}}.
{{#stack}}Stack: {{stack}}{{/stack}}

1. Read how the app renders output and whether a sanitizer or safe helper already exists; reuse it.
2. Find every sink: framework escape hatches, direct DOM writes, user-controlled URLs in `href`, `src`, `action` and redirects, user data in inline scripts, event handler attributes and `style`, and templates with autoescaping turned off. For each, trace where the data comes from, including data stored earlier by other users.
3. Fix each sink for its context:
   - plain text: render through the framework's normal escaping and remove the escape hatch;
   - rich text that must stay HTML: sanitize with an allowlist of tags and attributes at render time;
   - URLs: allow only `http`, `https` and `mailto` (or relative paths) after parsing;
   - data for scripts: pass it through a JSON data attribute or a script-safe serializer, not string building;
   - DOM code: use `textContent`, `setAttribute` on safe attributes, or element creation.
4. Add a test per fixed sink with payloads that fit its context (a `<script>` tag, an `onerror` image, a `javascript:` URL, a `</script>` breakout) and assert they render inert.
5. Run the tests, the linter and the type check. Suggest a lint rule that flags new escape hatches if the project has none.
</task>

<constraints>
- Never use regex or blocklist filtering as the fix.
- Do not sanitize on input and then trust the stored value forever; encode or sanitize at output.
- Keep legitimate formatting working; list any visible rendering change.
- Treat CSP as a recommendation next to the fix, never instead of it.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Sinks
Table: file:line, sink, context (HTML, attribute, URL, script, DOM), data source, status (fixed, already safe, not fixed).
## Changes
One line per file: `path`, what changed.
## Tests
One line per test with its payload.
## Verification
Commands run and their actual results.
## Not fixed
Anything left, why, and the proposed follow-up.
</output_format>
