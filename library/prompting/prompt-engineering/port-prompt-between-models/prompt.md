---
schema: 1
id: port-prompt-between-models
kind: prompt
title: Port a prompt to another model
description: Ports a working prompt to another model family or vendor, adjusting structure, examples, format instructions and call settings, with a parity test plan. For builders switching models.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [maintain]
role: [ml-engineer, software-engineer, product-manager]
requires: [none]
inputs: [text]
output: [prompt, table, tests]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [prompt-migration, model-switch, vendor-portability, parity-testing]
pairs_with:
  prompts: [adapt-prompt-for-reasoning-model, adapt-prompt-for-small-model, build-prompt-test-set]
  personas: [prompt-engineer]
args:
  - name: prompt
    description: The prompt that works today, including the system prompt, examples, output format and placeholders, plus the model family and how it is called now if you know.
    type: text
    required: true
  - name: target
    description: "The model family or vendor you are moving to and how it will be called, for example \"API with a JSON schema response format\", \"chat app custom instructions\", \"open-weights model served locally\"."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Portability audit, Ported prompt, Call settings, Parity test plan, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A prompt tuned on one model often degrades quietly on another. The words still make sense, but the parts that depended on the old model's habits break: how it treats a system prompt, whether it follows instructions literally or generously, how it reads XML tags versus Markdown headings, its default length and formatting, whether it supports response prefill, schema-constrained output, stop sequences or tool calls, and how strongly it copies few-shot examples. Porting means finding those dependencies, replacing them with explicit instructions or the target's own mechanism, and proving parity on the same test cases.

<current_prompt>
{{prompt}}
</current_prompt>

<target>
{{target}}
</target>
</context>

<task>
1. Identify the prompt's job, inputs, deliverable and hard requirements (format, fields, length, policies). If the current model or the call method is unknown and it matters for a specific line, list it under Open questions rather than guessing.
2. Audit every part of the prompt for portability and classify it:
   - portable as written;
   - relies on a source-model habit (implicit length, tone or format defaults, generous reading of vague rules, a quirk the author was working around);
   - relies on a source-platform feature (system/developer role semantics, prefill, stop sequences, logit or JSON modes, tool-call format, special tokens or chat template);
   - vendor-specific wording or tricks (model names, magic phrases, all-caps emphasis added to overcome a weakness).
3. Rewrite for the target: state implicit defaults explicitly, replace platform features with the target's equivalent or with plain instructions, use one consistent delimiter style for inputs, keep examples only where they carry format or judgement, and keep every placeholder and output field exactly.
4. Give the call settings to check on the target: where each part of the prompt goes (system, developer or user turn), structured-output or tool mechanism if the target has one, temperature or reasoning-effort setting, maximum output length, stop sequences.
5. Write a parity test plan: test cases drawn from the prompt's real inputs (happy, edge, negative, and one per audited risk), what counts as parity for each, and how many runs per case when outputs vary.
</task>

<constraints>
- Do not change what the prompt does. No new requirements, no removed requirements; if a requirement cannot be met on the target, say so under Open questions.
- Your knowledge of any vendor's current features may be out of date. State platform-specific claims as things to confirm in the target's current documentation, never as settled facts.
- Keep the ported prompt free of model names unless the output itself must mention one.
- Do not claim the ported prompt performs as well; say how to show it.
- If the prompt contains secrets, keys or personal data, flag them and replace with placeholders in the ported version.
</constraints>

<output_format>
## Portability audit
Table: Part of prompt (quoted, shortened) | Category | Risk on target | Action.
## Ported prompt
The full prompt in one fenced block, split into labelled system and user parts if the target uses roles.
## Call settings
Bullets, each marked "confirm in docs" where it depends on the target platform.
## Parity test plan
Table: Case | Input summary | Tests which risk | Parity criterion. Then runs per case and the bar for switching.
## Open questions
Only what you need from the user, or "None".
</output_format>
