---
schema: 1
id: audit-input-handling
kind: prompt
title: Audit how an app handles untrusted input
description: Inventories every place untrusted input enters a codebase and follows each to its sinks, checking for injection, XSS, path traversal and type confusion, with a fix per input vector.
category: security
version: 1.0.0
status: incubating
aliases: [sec-input]
stage: [review]
role: [security-engineer, software-engineer, backend-engineer]
stack: []
requires: [repo-read]
inputs: [repo, file]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [input-validation, injection, xss, path-traversal, owasp]
pairs_with:
  personas: [security-auditor]
  prompts: [audit-app-security, review-pr-for-security, implement-form-validation]
  rules: [secure-coding-rules]
args:
  - name: target
    description: The repository, service, module or endpoints to audit.
    type: text
    required: true
  - name: stack_notes
    description: Framework, template engine, ORM and anything that already sanitises input, if you know.
    type: text
output_contract:
  format: markdown
  sections: [Input vectors, Findings, Fixes, Not covered]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most injection bugs are the same mistake: data from outside reaches a place where it is interpreted as code or a path. The reliable way to find them is to list every source of untrusted data, follow each to every sink, and check what stands between them. Validation (is this the right shape?) and output encoding or parameterisation (can this be interpreted as code here?) are different defences; a sink needs the right one for its context.
</context>

<task>
Audit input handling in {{target}}.
{{#stack_notes}}Stack notes: {{stack_notes}}
{{/stack_notes}}
1. List the sources: path and query parameters, request bodies, headers and cookies, file uploads and file names, webhook payloads, message queue payloads, environment and config read at runtime, data read back from the database that users wrote earlier, and third-party API responses.
2. List the sinks: SQL and NoSQL queries, shell commands and process spawning, file system paths, HTML templates and DOM writes, redirects and URLs fetched by the server, deserialisers, regular expressions built from input, log lines, and dynamic code evaluation.
3. For each source, follow the data to every sink it reaches, through helpers and layers. Record what validation and encoding happen on the way.
4. Check each source-to-sink path for the matching defence:
   - injection: parameterised queries or safe query builders, argument arrays instead of shell strings;
   - XSS: context-aware auto-escaping; raw HTML insertion only after sanitising with an allow-list;
   - path traversal: resolve the path and confirm it stays inside the allowed directory; never trust upload file names;
   - type confusion: schema validation of type, range and length at the boundary, so an array, object or huge string cannot reach code expecting a short string;
   - open redirect and SSRF: allow-lists for destinations.
5. For each vector, give its status and the fix, preferring one shared validation layer at the boundary over checks scattered in handlers.
</task>

<constraints>
- Every finding names the source, the sink and the file and line of each; drop paths you could not trace.
- Do not count client-side validation as a defence.
- Do not recommend blocklists of "bad characters" as the main defence; use parameterisation, encoding and allow-lists.
- Keep proofs to inputs the team can try on their own environment, with no destructive payloads.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Input vectors
Table: source, where it enters (file:line), sinks reached, validation present, encoding present, status (safe, at risk, vulnerable).
## Findings
Most severe first. Each: **[critical | high | medium | low]** source → sink — the flaw — an example input that shows it — impact.
## Fixes
The fix for each finding as code or a diff, and any shared validation layer to add.
## Not covered
Sources or sinks you could not follow, and why.
</output_format>
