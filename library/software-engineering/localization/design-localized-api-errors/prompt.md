---
schema: 1
id: design-localized-api-errors
kind: prompt
title: Design localized API error messages
description: Designs API errors that clients can show in any language, with stable codes, structured parameters, field paths and a clear rule on whether the server or the client translates the text.
category: localization
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, fullstack-engineer, architect]
requires: [none]
inputs: [spec, file, text]
output: [plan, code, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [api-design, error-handling, validation-messages]
pairs_with:
  prompts: [write-icu-plural-messages, implement-locale-formatting]
args:
  - name: api
    description: The API style and stack, the clients that consume it (web, mobile, third parties) and examples of current error responses.
    type: text
    required: true
  - name: locales
    description: Locales the clients support.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Decision, Error shape, Code catalog, Validation errors, Client handling, Migration]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most APIs return an English sentence in `message`, and clients either show it raw to every user or pattern-match the text to decide what to do, so any copy change breaks them. A localizable error has a stable machine code, the values needed to build a message (`{"code": "quantity_too_high", "params": {"max": 10}}`), and a path to the field it concerns. Then the decision is who renders it: the client, which already has the user's locale and catalog and can phrase it for its own UI; or the server, which suits third-party consumers and many small clients but needs the locale on every request (`Accept-Language`) and returns `Content-Language`. Parameters must be raw values, never pre-formatted strings, or "10.5" arrives in a German UI that expects "10,5". Standard shapes such as RFC 9457 problem details give a home for this.
</context>

<task>
Design localized errors for this API:

{{api}}

Locales: {{locales}}.

1. Decide who renders text: client-side from codes, server-side via `Accept-Language`, or both (server sends a default-locale `message` for logs and third parties, first-party clients render from `code`). State the reason for this API.
2. Define the error shape: a stable `code` (snake_case or dotted, never the HTTP status alone), human `message` for developers, `params` with raw values (numbers as numbers, dates as ISO 8601, money as amount plus currency code), `field` or a JSON pointer for validation errors, and a `trace_id`. If the API uses or could use RFC 9457 problem details, map the shape onto it.
3. Build the code catalog for the errors shown in the input: code, HTTP status, params, the user-facing message in the source locale as an ICU message, and whether the message is safe to show end users.
4. Validation errors: return all field errors at once, each with its own code and params; describe constraints in params (`min`, `max`, `pattern_name`) instead of in English text; never return a regex as user text.
5. Client handling: lookup by code in the client catalog, fallback when a code is unknown (a generic localized message plus the trace id, not the raw English `message`), and formatting params with the user's locale.
6. If server-side rendering is chosen, describe locale negotiation, `Content-Language`, `Vary: Accept-Language` for caches, and the fallback chain.
7. Migration: how to add codes without breaking clients that read `message` today, and how to deprecate text matching.
</task>

<constraints>
- Codes are part of the API contract: never reuse or rename one; add new codes instead.
- Never put secrets, internal identifiers or stack traces in user-facing messages or params.
- Do not pre-format numbers, dates or money in params.
{{> output/uncertainty}}
</constraints>

<output_format>
## Decision
Who renders text, and why.

## Error shape
Schema and one example response.

## Code catalog
| Code | Status | Params | Source message (ICU) | Show to users |

## Validation errors
Example response with several fields.

## Client handling
Lookup, fallback and formatting, with a short code sample.

## Migration
Ordered steps.
</output_format>
