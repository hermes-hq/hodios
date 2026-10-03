---
schema: 1
id: adapt-prompt-for-small-model
kind: prompt
title: Adapt a prompt for a small model
description: Rewrites a prompt for a small or fast model with one job per call, simpler steps, explicit formats and more examples, plus a test that shows whether quality holds against the original.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [maintain]
role: [ml-engineer, software-engineer, data-engineer]
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
tags: [small-models, cost-reduction, latency, prompt-migration]
pairs_with:
  prompts: [adapt-prompt-for-reasoning-model, port-prompt-between-models, reduce-llm-costs]
  personas: [prompt-engineer]
args:
  - name: prompt
    description: The prompt that works on a larger model, with any examples, output format and placeholders, plus the task volume or latency target that motivates the switch.
    type: text
    required: true
  - name: failure_examples
    description: "Optional: inputs where the small model already fails and what it did wrong, for example \"returns two labels\", \"ignores the length limit\", \"misses the second question\"."
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Rewritten prompt, Changes, Quality test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Small and fast models are cheaper and quicker, but they hold fewer instructions at once, read nuance less reliably and copy examples more literally. Prompts written for frontier models often ask them to do too much in one call: several judgements, long lists of soft rules, open-ended formats. What helps: one job per call (split the rest into a chain or code), short positive instructions in the order they apply, closed label sets and exact output formats, the key instruction restated at the end, several short examples that mirror the real inputs, and deterministic work (counting, date maths, lookups) moved to code. Whether quality holds is a measurement, not a hope.

<prompt>
{{prompt}}
</prompt>
{{#failure_examples}}
<failure_examples>
{{failure_examples}}
</failure_examples>
{{/failure_examples}}
</context>

<task>
1. Identify the prompt's job, inputs, output and hard requirements. If the deliverable cannot be inferred, ask one question and stop.
2. Diagnose what will strain a small model: the number of separate judgements, rules that need fine judgement, vague words ("appropriate", "relevant"), open formats, long context, deterministic work the model is asked to do, and examples that are missing or unrepresentative.
3. Decide the structure: keep one call, split into a short chain (say what each call does and passes on), or move parts to code. Prefer the simplest structure that meets the requirements.
4. Rewrite: short sentences, one instruction per line in the order the model should apply them, positive phrasing ("reply with one label") over prohibitions, a closed list wherever possible, the exact output format with a filled example, three to six short examples covering the common case and the known failures, and a one-line restatement of the format at the end. Keep every placeholder and output field.
5. Map each failure example to the change that addresses it.
6. Write a quality test: 20 to 50 real inputs run on the original prompt with the larger model and on the rewrite with the small model, the agreement or pass rate to compare, the threshold for switching, and which cases to route back to the larger model if the small one cannot meet the bar.
</task>

<constraints>
- Do not drop a hard requirement to make the task easier; if the small model cannot meet it in one call, split or route instead, and say so.
- Model-agnostic; no model names in the rewritten prompt.
- Mention structured-output or grammar-constrained decoding only as an operator option to confirm for the serving platform.
- Do not claim the rewrite matches the original's quality; say how to measure it.
</constraints>

<output_format>
## Diagnosis
Table: Strain point | Where in the prompt | Fix.
## Rewritten prompt
The full prompt, or each prompt in the chain, in fenced blocks, with the code-side steps listed.
## Changes
Bullets, each tied to a failure example where one applies.
## Quality test
Numbered plan with the switching threshold and the fallback rule.
</output_format>
