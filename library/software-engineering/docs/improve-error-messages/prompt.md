---
schema: 1
id: improve-error-messages
kind: prompt
title: Improve error messages in code
description: Rewrites error messages in a module, CLI or API to say what happened, why and how to fix it, in a consistent voice, without leaking internals or breaking callers.
category: docs
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, backend-engineer, maintainer, technical-writer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [error-copy, actionable-errors, developer-experience, cli-ux]
pairs_with:
  prompts: [document-error-codes, review-error-handling, write-troubleshooting-guide, design-localized-api-errors]
args:
  - name: scope
    description: The files, module, command or API area whose messages to improve.
    type: text
    required: true
  - name: audience
    description: Who reads these messages - end users, developers calling a library or API, or operators reading logs.
    type: text
  - name: style
    description: Existing error style rules, if any, such as sentence case, no trailing period, or a required error code prefix.
    type: text
output_contract:
  format: markdown
  sections: [Before and after, Compatibility, Leaks removed, Verification, Not changed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An error message is the documentation people read most, at the moment they are most stuck. Useful messages answer three questions: what happened (in the reader's terms, not the code's), why (the specific input, file, value or limit involved), and what to do next (a concrete action, a valid range, or where to look). Typical bad messages: "Invalid input", "Something went wrong", a raw exception type, or a stack trace shown to an end user. The opposite failure is leaking internals: SQL, file paths on the server, hostnames, tokens or other users' data in a message that reaches a client. Changing messages is not free. Tests, client code and log alerts sometimes match on message text, and API clients should match on stable codes rather than text, so a rewrite must check for those dependents and keep codes stable.
</context>

<task>
Improve the error messages in: {{scope}}
{{#audience}}Audience: {{audience}}{{/audience}}
{{#style}}House style: {{style}}{{/style}}

1. Find every user-facing error in scope: raised exceptions with messages, returned error objects, CLI stderr output, API error bodies and validation messages. Note who sees each one (end user, API caller, operator log).
2. Find existing conventions (error code format, casing, punctuation, an errors module or message catalogue) and follow them. If messages are localised, edit the source strings in the catalogue, not the call sites.
3. Search the repository for anything that depends on the current text: tests asserting on messages, client code or docs quoting them, log-based alerts or dashboards filtering on them. List each dependent.
4. Rewrite each weak message: state what failed, include the offending value or name when it is safe to show, and give the next step. Keep it short; one or two sentences. Keep any error code, type and status exactly as they are.
5. Remove internals from messages that reach clients; keep the detail in server-side logs instead, with a correlation id if the code already has one.
6. Update tests that asserted on the old text, run the test suite, and report results.
</task>

<constraints>
- Do not change error codes, exception types, HTTP status codes or control flow; this is a wording change.
- Do not include secrets, credentials, personal data or full internal paths in any message, even for developers.
- Do not suggest a fix in the message that the code does not support (for example a flag that does not exist).
- Where external clients may match on the old text, list it under compatibility and leave the decision to the owner instead of changing it silently.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Before and after
Table: location, audience, old message, new message.
## Compatibility
Tests, alerts, docs or clients that depend on message text, and what was updated or needs a decision.
## Leaks removed
Messages that exposed internals, and where that detail now goes.
## Verification
Test commands run and their real results.
## Not changed
Messages left alone and why.
</output_format>
