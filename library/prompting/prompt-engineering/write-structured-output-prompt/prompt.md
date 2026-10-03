---
schema: 1
id: write-structured-output-prompt
kind: prompt
title: Write a structured output prompt
description: Writes a prompt that returns schema-valid JSON reliably, with a JSON Schema, field rules, examples, edge-case handling and a validate-and-retry plan. For extraction and app integrations.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [design, build]
role: [software-engineer, ml-engineer, data-engineer]
requires: [none]
inputs: [text, schema]
output: [prompt, code, tests]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [json-output, json-schema, structured-extraction, output-validation]
pairs_with:
  prompts: [write-batch-processing-prompt, create-few-shot-examples, build-prompt-test-set]
  personas: [prompt-engineer]
args:
  - name: task
    description: What the model reads and what the JSON is for, for example "pull order details out of customer emails for our order system".
    type: text
    required: true
  - name: schema
    description: "Optional: the target JSON Schema, a TypeScript type, or a sample object. If left out, a schema is proposed for you to approve."
    type: text
output_contract:
  format: markdown
  sections: [Schema, Prompt, Examples, Edge cases, Validation and retry, Test inputs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
JSON from a model fails in predictable ways: prose or code fences around the object, invented values for fields the input does not contain, free-text where an enum was expected, wrong types (a "12" string for a number), dates in mixed formats, and arrays collapsed to a single item. The reliable pattern combines four things: a precise schema with a description on every field, explicit rules for missing and ambiguous data, a native schema-constrained output mode when the platform has one, and code that validates every response and retries or flags failures. Native modes guarantee shape, not truth, so the field rules still matter.

<task_description>
{{task}}
</task_description>
{{#schema}}
<schema>
{{schema}}
</schema>
{{/schema}}
</context>

<task>
1. If no schema was given, propose one from the task and mark it as a proposal. If the task does not say what the JSON feeds or which fields matter, ask up to three questions and stop.
2. Write the schema as JSON Schema: types, required fields, enums for closed sets, formats for dates and emails, number ranges, and a one-line description per field that says where the value comes from in the input. Decide for each field whether a missing value is null, an empty array or a validation failure.
3. Write the prompt: the job and the reader of the JSON; the input in delimiters; field rules (copy values verbatim or normalise, units, date format, how to choose among conflicting values); the missing-data rule ("use null; never infer a value the input does not state"); and an instruction to return only one JSON object matching the schema, with no prose or code fences.
4. Write two or three examples: a complete input, a sparse input with nulls, and one awkward case from this task (multiple items, conflicting values, a different language). Keep examples short and consistent with every rule.
5. List edge cases and the expected output for each: empty input, irrelevant input, several candidates for one field, values outside an enum, very long input.
6. Give the validation and retry plan: validate against the schema in code, on failure send one retry with the validator error message, then log and route to a human or a fallback; plus semantic checks the schema cannot express (a total equals the sum of line items, a date is not in the future).
</task>

<constraints>
- Never let the prompt encourage invented values to satisfy "required". Prefer nullable fields to fabricated ones.
- Keep enum values identical in the schema, prompt and examples.
- Model-agnostic. Mention a native structured-output or tool-call mode as an operator option to confirm in the platform's documentation, not as the only safeguard.
- Keep the prompt under about 500 words excluding the schema and examples.
- Do not include real personal data in examples; use fictional values.
</constraints>

<output_format>
## Schema
JSON Schema in a fenced block.
## Prompt
The full prompt in a fenced block, with a clearly marked placeholder such as [INPUT] where the input goes.
## Examples
Input and expected JSON pairs.
## Edge cases
Table: Case | Expected output | Why.
## Validation and retry
Numbered steps, plus the semantic checks.
## Test inputs
Five inputs to run before shipping, each with what to check.
</output_format>
