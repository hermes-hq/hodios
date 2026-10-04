---
schema: 1
id: document-error-codes
kind: prompt
title: Document error codes
description: Turns the error codes and messages in a codebase or API into an error catalog with cause, fix, retry safety and a stable URL per error that the message can link to. Use for APIs, SDKs and CLIs.
category: docs
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [backend-engineer, maintainer, technical-writer, support-agent]
stack: []
requires: [none]
inputs: [file, text, logs]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [error-catalog, error-messages, retries, support-deflection, error-codes]
pairs_with:
  prompts: [write-troubleshooting-guide, write-cli-reference, document-public-api]
args:
  - name: errors_source
    description: Where errors are defined - an error enum or constants file, exception classes, API error responses, problem+json types, or a grep of raise/throw sites with their messages. Notes on when each happens help.
    type: text
    required: true
  - name: audience
    description: developers integrating an API or SDK, end-users of an app, or support staff answering tickets.
    type: enum
    enum: [developers, end-users, support]
    default: developers
  - name: url_pattern
    description: How error pages should be addressed, for example "https://docs.example.com/errors/{code}". Leave empty to propose one.
    type: string
    default: not set
output_contract:
  format: markdown
  sections: [Catalog, Entry pages, Message changes, Code issues]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An error message is the moment a user is most likely to read documentation, and the most likely thing they paste into a search engine or a ticket. Error docs fail when they restate the message ("E1042: invalid token - the token is invalid"), lump distinct causes under one code, never say whether retrying is safe, and use URLs that change when the docs are reorganised. A good catalog gives each code a stable page that explains causes in order of likelihood, the fix, and retry guidance, and the message itself links to it. Audience: {{audience}}.
URL pattern for error pages: {{url_pattern}}. If it is "not set", propose one in step 4.
</context>

<task>
<errors_source>
{{errors_source}}
</errors_source>

1. Extract every error: code or type, HTTP status or exit code if any, the message template with placeholders, where it is raised, and the conditions that trigger it as far as the source shows.
2. Group codes by family (authentication, validation, rate limits, conflicts, upstream failures, internal) and flag codes that look duplicated or that cover several unrelated causes.
3. For each error write an entry:
   - meaning in one plain sentence (not a restatement of the message);
   - likely causes in order, each with how to confirm it;
   - how to fix, as steps or a code change, matched to the audience (for end-users: what to do in the app; for support: what to check and what to tell the customer);
   - retry guidance: safe to retry as is, retry with backoff (and whether a Retry-After or similar header applies), retry only after a change, or never retry; and whether the operation might have partly succeeded (idempotency);
   - related errors.
4. Assign each a stable URL from the pattern (or propose a pattern based on the code, never on the page title) and say the code itself must never be reused for a different meaning.
5. Rewrite weak messages: say what happened, why if known, and what to do, include the code and link, and keep values that help debugging while removing secrets and personal data.
6. List code issues: errors that leak internals or stack traces, generic catch-all errors that hide distinct causes, inconsistent status codes, and missing machine-readable codes.
</task>

<constraints>
- Causes and fixes come from the source and its context. Mark anything inferred with "(inferred)" and do not present it as confirmed.
- Never include secrets, tokens or customer data in examples; use placeholders.
- Do not change the meaning of an existing code in the catalog; propose a new code instead.
- If the source has no codes at all, propose a scheme (prefix by family plus number) and mark it as a proposal.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Catalog
Table: code, status, family, short meaning, retry, URL.
## Entry pages
One subsection per error headed by the code and message, with Meaning, Causes, Fix, Retry, Related.
## Message changes
Table: code, current message, proposed message.
## Code issues
Bullets with file or location. Or "None found".
</output_format>
