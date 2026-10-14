---
schema: 1
id: write-typed-models-from-json
kind: prompt
title: Generate typed models from sample JSON
description: Writes typed models with runtime validation (zod, Pydantic, Codable, kotlinx.serialization) from sample JSON payloads, separating optional from nullable and flagging guesses.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, frontend-engineer, backend-engineer, mobile-engineer]
requires: [none]
inputs: [text, schema]
output: [code, tests]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [json, zod, pydantic, codable, runtime-validation, api-client]
args:
  - name: samples
    description: One or more real JSON payloads for the same endpoint or message type. More samples give better types.
    type: text
    required: true
  - name: target
    description: Language and library for the models.
    type: enum
    enum: [typescript-zod, typescript-types-only, python-pydantic, swift-codable, kotlin-serialization, go-structs, csharp-records]
    required: true
  - name: notes
    description: Anything known beyond the samples, for example API docs excerpts, "status is one of active, paused, closed", naming conventions.
    type: text
output_contract:
  format: markdown
  sections: [Models, Inferred rules, Guesses to confirm, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Types inferred from one JSON sample are confident and wrong. A field present in every sample might still be optional; a field that is `null` once might be nullable or might be absent elsewhere, and "missing" and "null" need different types. `1` could be an integer or a float that happened to be whole; large ids may exceed safe integer range in JavaScript; dates arrive as strings in several formats; and a string field with three values seen is not necessarily an enum. Types without runtime validation (plain TypeScript interfaces) give no protection when the API changes, so parsing at the boundary matters as much as the types.
</context>

<task>
Write {{target}} models for these payloads:

<samples>
{{samples}}
</samples>

{{#notes}}
Known facts: {{notes}}
{{/notes}}

1. Merge all samples per object shape. For each field record: types seen, present in all samples or not, ever `null`, example values.
2. Decide each field's type:
   - present in all samples and never null: required;
   - sometimes absent: optional;
   - sometimes null: nullable; absent and null both seen: optional and nullable;
   - numbers: integer only if every value is whole and the meaning is a count or id; ids that can exceed `Number.MAX_SAFE_INTEGER` (2^53 - 1, 16 digits) stay strings in TypeScript;
   - dates and timestamps: parse to the language's date type if the format is consistent (ISO 8601), otherwise keep strings and say so;
   - enums only from the notes, or as a string with the seen values listed as a guess.
3. Name types from their role (for example `Order`, `OrderLineItem`), reuse a type when two shapes are the same, and map JSON key style to the language's convention with explicit aliases (`CodingKeys`, `@SerialName`, Pydantic `alias` or `alias_generator`, zod `transform`) instead of renaming silently.
4. Add runtime validation where the target supports it (zod schemas with inferred types, Pydantic models, Codable decoding, kotlinx.serialization). Decide unknown-key handling explicitly (ignore by default for API responses, strict for config).
5. Write a few tests or usage checks: each sample parses, a payload missing an optional field parses, and a payload with a wrong type fails with a clear error.
6. List every guess you made under Guesses to confirm.
</task>

<constraints>
- Do not invent fields, enum values or formats not present in the samples or notes.
- Do not mark a field required just because it appears in one sample when other samples are missing.
- If the samples contradict each other (same field, different shapes), model it as a union and flag it.
</constraints>

<output_format>
## Models
One code block with all types and validators.

## Inferred rules
Table: Field | Type | Required | Nullable | Evidence.

## Guesses to confirm
Bullets, or "None".

## Tests
Code block with the tests or usage checks.
</output_format>
