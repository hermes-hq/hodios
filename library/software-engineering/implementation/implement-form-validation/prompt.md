---
schema: 1
id: implement-form-validation
kind: prompt
title: Implement form validation
description: Implements form validation on client and server from one shared schema, with accessible errors, inclusive rules for names and addresses, a server error contract and tests. Use when building forms.
category: implementation
version: 1.0.1
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer, backend-engineer]
stack: []
requires: [none]
inputs: [spec, text, file]
output: [code, tests, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [web-forms, input-validation, schema-validation, error-messages, wcag]
pairs_with:
  prompts: [fix-form-accessibility, design-form-experience, build-ui-component, build-rest-endpoint]
  personas: [frontend-engineer]
args:
  - name: form_fields
    description: The form's purpose and each field with its rules, for example "email (required), password (min 12), date of birth (18+), country (select), phone (optional, international)". Include any cross-field rules and checks that need the server (unique username).
    type: text
    required: true
  - name: stack
    description: Frontend and backend stack, for example "React 19 with React Hook Form, Express API" or "Next.js server actions", or "Vue 3 with a Django REST API".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Field rules, Shared schema, Client, Server, Error contract, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Links the form accessibility and form experience entries."}
---
<context>
You are a full-stack engineer who cares about forms people can actually complete. The server is the authority; client validation exists to give fast, helpful feedback, and anything the client checks the server checks again. Rules should live in one schema used by both sides where the stack allows (for example Zod or Valibot shared between a TypeScript client and server), or be generated from one source (JSON Schema, OpenAPI) when the languages differ.

Accessible errors (WCAG 2.2) mean: each input has a visible label; an error is shown as text next to the field, linked with `aria-describedby`, the field marked `aria-invalid="true"`, and not signalled by colour alone; on submit, focus moves to an error summary or the first invalid field; required fields are marked in text; `autocomplete` attributes are set so browsers and password managers help. Timing matters: validate a field on blur, then on each change once it has shown an error, and everything on submit. Do not disable the submit button to signal invalid input; people cannot tell why.

Over-validation excludes real people: names with apostrophes, hyphens, spaces, non-Latin scripts or a single word; addresses without postcodes or states; international phone numbers (validate with a library such as libphonenumber, store in E.164); email checks beyond "has an @ and a domain" reject valid addresses, and only a confirmation email proves one works.
</context>

<task>
Implement validation for this form.

Fields:
{{form_fields}}

Stack:
{{stack}}

1. If a field's rule is ambiguous in a way that would reject real users (for example "name: letters only"), say so, propose an inclusive rule and use it.
2. Write the rules table, including normalisation (trim, Unicode normalisation, lower-casing emails for uniqueness) and the exact user-facing message for each failure. Messages say what to do, not just what is wrong ("Enter a date in the past", not "Invalid date").
3. Write the shared schema, or the single source and how each side consumes it.
4. Write the client: field components with labels, hints, `autocomplete`, inline errors with the ARIA wiring above, the error summary and focus handling on submit, and debounced async checks (such as username availability) that never block submission alone.
5. Write the server handler: parse with the same schema, re-run async checks, and return errors in the contract below. Map server errors back onto the right fields on the client.
6. Write tests.
</task>

<constraints>
- Always validate on the server, even if asked for client-only validation; explain why in one sentence if the user asked otherwise.
- Do not leak information through errors (for example "this email is already registered" on a public sign-up form without a reason to); offer the safer wording when relevant.
- Follow the stack's existing form library and conventions when they are named.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Field rules
Table: Field | Rules | Normalisation | Message.
## Shared schema
Code.
## Client
Code.
## Server
Code.
## Error contract
The HTTP status and JSON shape for validation errors, with an example.
## Tests
Schema unit tests, a server test that bypasses the client, and an accessibility test (for example with axe) for the error state.
</output_format>
