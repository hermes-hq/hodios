---
schema: 1
id: write-api-quickstart
kind: prompt
title: Write an API quickstart
description: Writes an API quickstart that gets a developer to a first successful call in minutes, with credentials, one request, the expected response and common errors. Use for a new or hard-to-adopt API.
category: docs
version: 1.0.0
status: incubating
stage: [build]
role: [technical-writer, developer-advocate, backend-engineer, product-manager]
stack: []
requires: [none]
inputs: [spec, document, text]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [quickstart, api-docs, developer-experience, getting-started]
pairs_with:
  personas: [technical-writer]
  prompts: [write-code-samples, document-public-api]
args:
  - name: api_description
    description: The API - base URL, authentication method and how to get credentials, a sandbox if any, and the reference or OpenAPI spec for the endpoints a first call could use.
    type: text
    required: true
  - name: languages
    description: Languages to show besides curl, for example "Python, JavaScript". Defaults to curl and one language matching the API's main SDK.
    type: text
output_contract:
  format: markdown
  sections: [Quickstart, Gaps to confirm]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A quickstart has one job: the reader makes a real call and sees it work, usually within five minutes. Developers judge an API by this page, and most quickstarts fail it by opening with concepts and architecture, offering choices before anything works ("you can authenticate three ways"), using a first call that needs data the reader does not have yet, hiding the expected response, or leaving the key hardcoded in the sample. Everything not needed for the first success belongs in links at the end.
</context>

<task>
Write a quickstart for:
<api_description>
{{api_description}}
</api_description>
{{#languages}}Show samples in curl and {{languages}}.{{/languages}}

1. Pick the first call: read-only or sandboxed, no side effects on real data, needs no prior setup beyond credentials, and returns something recognisable. Say in one sentence why you picked it. If the description has no endpoint that qualifies or lacks how to get credentials, ask and stop.
2. Structure the page:
   1. One sentence on what the reader will have at the end, and the time it takes.
   2. Prerequisites: an account, and a tool or runtime version only if required.
   3. Get credentials: the exact place to create a key or token and its scopes, stored in an environment variable (for example `export ACME_API_KEY=...`). Use the sandbox or test key if one exists.
   4. Install the SDK (pinned major version) if a language sample uses one; curl needs nothing.
   5. Make the call: one copy-pasteable block per language, reading the key from the environment.
   6. The expected response, exactly as the API returns it (trimmed with a comment if long), and one sentence pointing at the field that proves it worked.
   7. If it did not work: a table of the three or four likeliest errors (for example 401, 403, 404 on the wrong base URL, 429) with the cause and the fix.
   8. Next steps: three links at most, ordered by what most readers do next.
3. Use second person and present tense, short sentences, and no marketing language.
</task>

<constraints>
- Use only endpoints, fields, headers and responses that appear in the description or spec. Where something is missing, write a visible placeholder like `<RESPONSE_FROM_SPEC>` and list it under Gaps to confirm.
- Never put a real-looking key in a sample; use the environment variable everywhere.
- No optional branches before the first success; alternatives go after the next steps or on other pages.
- Keep the page short enough to read in two minutes.
</constraints>

<output_format>
## Quickstart
The complete page in Markdown, starting with its own H1 title, with fenced code blocks labelled by language.
## Gaps to confirm
Numbered list of placeholders and assumptions, or "None".
</output_format>
