---
schema: 1
id: build-prompt-test-set
kind: prompt
title: Build a test set for a prompt
description: Builds a test set for a prompt with happy, edge and negative inputs, the expected behaviour for each and checkable pass criteria, so prompt versions can be compared objectively.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [verify]
requires: [none]
inputs: [text]
output: [tests, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [evals, golden-set, edge-cases, regression-check, prompt-design]
pairs_with:
  prompts: [write-judge-prompt, improve-prompt, diagnose-prompt-failures, red-team-prompt]
  workflows: [prompt-iteration-track]
args:
  - name: prompt
    description: The prompt to test, with its placeholders, plus a line on who uses it and what a good result is if that is not obvious.
    type: text
    required: true
  - name: real_inputs
    description: "Optional: real inputs the prompt has received, especially ones it handled badly. Remove personal data first."
    type: text
  - name: size
    description: How many test cases to write. 8 to 20 is a practical range for manual runs.
    type: number
    default: 12
output_contract:
  format: markdown
  sections: [What it must do, Coverage, Test cases, Scoring sheet, How to compare versions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most prompt changes are judged by running one or two inputs and eyeballing the result, so a fix for one case silently breaks three others. A small fixed test set changes that: every version runs on the same inputs and is scored against the same written criteria. A useful set covers the common case (most of real traffic), edge cases (empty, very long, ambiguous, mixed-language or oddly formatted input, boundary values), and negative cases (input the prompt should refuse, redirect, or answer with "not enough information"). Each case needs an expected behaviour written before running, and a pass criterion someone else could check the same way: an exact match or pattern where possible, a short rubric where judgement is needed.
</context>

<task>
Build a test set of {{size}} cases for this prompt.

<prompt>
{{prompt}}
</prompt>
{{#real_inputs}}
<real_inputs>
{{real_inputs}}
</real_inputs>
{{/real_inputs}}

1. If the prompt's purpose or expected output cannot be worked out, ask one question and stop.
2. List what the prompt must do: each requirement in it (format, length, content rules, refusal or ask rules, tone), numbered as R1, R2 and so on, plus implicit requirements a user would expect, labelled as implicit.
3. Plan coverage: about half happy-path cases spread across the realistic variety of inputs, about a third edge cases, and the rest negative cases. Make sure every requirement is exercised by at least one case.
4. Write each case with a full, realistic input (not a description of an input) for every placeholder. Base cases on the real inputs where given, varied rather than copied; mark synthetic ones.
5. For each case, write the expected behaviour and a pass criterion, choosing the cheapest reliable check: exact value, contains or does-not-contain, regex, length limit, valid JSON or schema, or a one-sentence rubric for a judge or human.
</task>

<constraints>
- Inputs must be complete and runnable as written. No "[insert long text here]"; if a long input is needed, write a realistic one or describe exactly how to build it, and flag it.
- Use fictional names, companies and data; no real personal data.
- Pass criteria must be specific to this prompt's requirements. Not "the output is good" or "the output is helpful".
- Do not test requirements the prompt does not have; note missing requirements you would add, separately, as suggestions.
- If {{size}} is too small to cover every requirement, say which requirements are untested.
</constraints>

<output_format>
## What it must do
Numbered requirements (R1…), with implicit ones labelled.
## Coverage
A small table: Type | Count | Requirements covered.
## Test cases
For each case: a heading with ID and short name, then Type, Requirements, Input (in a fenced block, one per placeholder), Expected behaviour, Pass criterion, Check type.
## Scoring sheet
A table with one row per case: ID | v1 pass? | v2 pass? | Notes, ready to copy into a spreadsheet.
## How to compare versions
Four or five bullets: same settings, several runs per case for variable outputs, compare pass counts per type, read every newly failing case, and do not adopt a version that breaks a negative case.
</output_format>
