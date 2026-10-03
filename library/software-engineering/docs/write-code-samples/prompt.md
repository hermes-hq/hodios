---
schema: 1
id: write-code-samples
kind: prompt
title: Write code samples for an SDK or API
description: Writes runnable code samples for SDK or API operations across languages, with one shared structure, idiomatic error handling and expected output. Use when docs need multi-language samples.
category: docs
version: 1.0.0
status: incubating
stage: [build]
role: [technical-writer, developer-advocate, software-engineer]
stack: []
requires: [none]
inputs: [spec, document, text]
output: [code, docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [code-samples, sdk-docs, api-docs, developer-experience]
pairs_with:
  personas: [technical-writer]
  prompts: [write-api-quickstart, document-public-api]
args:
  - name: operations
    description: The operations to show, with the SDK reference or API spec for each - method names, parameters, return types, errors it can raise, pagination and rate limits.
    type: text
    required: true
  - name: languages
    description: The languages to cover, for example "Python, TypeScript, Go, Java", plus the SDK package and version per language if they differ.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Conventions, Samples, Testing the samples, Gaps to confirm]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Developers copy samples straight into their code, so a sample's habits become production code. Sample sets usually fail in three ways: they do not run (missing imports, invented method names, outdated SDK versions); they differ arbitrarily between languages, so readers cannot compare them; and they skip error handling and pagination, which are exactly the parts readers cannot guess. Each language also has its own idiom for errors and resources (exceptions in Python and Java, returned errors in Go, `try`/`catch` with async in TypeScript, context managers and `defer`), and a sample that fights the idiom reads as a port.
</context>

<task>
Write code samples for these operations:
<operations>
{{operations}}
</operations>
in these languages: {{languages}}.

1. If the SDK reference or spec for an operation is missing and you would have to guess method names, parameters or errors, ask and stop for that operation; do the others.
2. Fix shared conventions first and list them: the same scenario and example values in every language, client set up from an environment variable, the same variable names translated to each language's case style, and the same order (set up, call, use the result, handle errors).
3. For each operation and language, write a complete, runnable sample: imports, client construction, the call, a line that uses the result, and a `main` or entry point where the language needs one.
4. Handle errors idiomatically: catch the SDK's specific error types for the failures the reference lists (for example not found, validation, rate limit), print an actionable message, and let unexpected errors surface. Show pagination when the operation is paginated, and timeouts or retries only where the SDK leaves them to the caller.
5. Close or release resources the idiomatic way.
6. Add the expected output for each sample, using the example values.
7. Keep comments to the non-obvious: why a parameter matters, not what a line does.
</task>

<constraints>
- Use only methods, types and parameters present in the reference provided. Pin the SDK version each sample targets.
- Never include real keys, tokens or personal data; use environment variables and obviously fake values (`cus_123`, `user@example.com`).
- No helper libraries beyond the SDK and the standard library unless the reference requires them.
- Keep each sample under about 40 lines; split long flows into separate samples.
</constraints>

<output_format>
## Conventions
Bullets: scenario, example values, environment variables, SDK versions.
## Samples
For each operation an H3 heading, then one fenced block per language labelled with the language, each followed by "Expected output" in a fenced text block.
## Testing the samples
How to run every sample in CI against a sandbox (a test file per language or a script per sample), and what fails the build.
## Gaps to confirm
Numbered list of assumptions or missing reference details, or "None".
</output_format>
