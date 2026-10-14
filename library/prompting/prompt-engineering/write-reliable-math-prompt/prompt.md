---
schema: 1
id: write-reliable-math-prompt
kind: prompt
title: Write a reliable maths prompt
description: Writes a prompt that gets correct numbers from an AI for quotes, budgets and conversions - code or calculator use, shown workings, units, rechecked totals and flagged estimates.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [design, build]
role: [individual, operations-manager, financial-analyst, business-analyst]
requires: [none]
inputs: [text]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [arithmetic-errors, calculations, unit-handling, show-workings, rounding]
pairs_with:
  prompts: [diagnose-prompt-failures, write-data-analysis-prompt, practise-spotting-ai-errors]
  personas: [prompt-engineer]
args:
  - name: calculation
    description: The kind of calculation you ask an AI for again and again, for example "job quotes from materials and labour hours", "recipe scaling with unit conversion", "loan repayment comparisons".
    type: text
    required: true
  - name: inputs_example
    description: One realistic set of inputs with the answer you know is right, if you have it.
    type: text
    required: true
  - name: tool
    description: Optional - which assistant you use and whether it can run code or use a calculator.
    type: text
output_contract:
  format: markdown
  sections: [Where the numbers go wrong, Prompt, Check routine, Test cases]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write prompts that make an AI calculate reliably. Language models predict digits rather than compute them, so mental arithmetic in a chat reply fails quietly: long multiplications and sums drift by a few units, percentages are applied to the wrong base (a 20% discount then 20% tax is not zero change), VAT or sales tax is added to a price that already included it, units are mixed (hours and minutes, square metres and metres, monthly and annual rates), rounding happens too early, and a final total does not match the line items above it. The answer still looks precise. Reliable prompts make the model restate the inputs with units, write the formula before computing, use a code tool or calculator when available (and say so when not), carry units through every step, round only at the end, recompute the result a second way, and label anything estimated or assumed. For money and dosage-like calculations, a person checks the final figure.

Calculation: {{calculation}}

Example inputs: {{inputs_example}}
{{#tool}}

Tool: {{tool}}
{{/tool}}
</context>

<task>
1. Where the numbers go wrong: the specific error risks in this calculation (percent bases, tax-inclusive versus exclusive, unit conversions, time periods, rounding, compounding, edge values like zero or negative).
2. Write the prompt. It tells the assistant to: restate every input with its unit and source (given or assumed); ask for any missing input instead of inventing it; write the formula in words and symbols; compute with code or a calculator tool if available, otherwise step by step with every intermediate result; carry units; round only at the end to a stated precision; recompute the final result by a different route (reverse calculation, line items summed versus formula); report any mismatch; and output a short table of inputs, steps and the result, with assumptions listed.
3. Check routine: a quick checklist the user runs on any answer (inputs match, units consistent, order of magnitude sensible, total equals sum of lines, one figure verified independently in a spreadsheet or calculator).
4. Test cases: the user's example with its known answer, a case with a percentage trap, a unit conversion, an edge value, and a missing input that must trigger a question.
</task>

<constraints>
- Do not state tax rates, interest rates, fees or conversion factors as facts; the prompt asks the user to supply them or labels them as assumptions to check, because they vary by country and change.
- For medication doses, structural loads, electrical sizing or other safety-critical numbers, the prompt says the result must be checked by a qualified professional and is not to be used on its own.
- For financial decisions, results support but do not replace advice from a qualified professional.
- Model-agnostic; say how the prompt changes when no code tool is available.
</constraints>

<output_format>
## Where the numbers go wrong
Bullets.
## Prompt
In a fenced code block with [INPUTS] placeholder.
## Check routine
Numbered checklist.
## Test cases
Table: Case | Inputs | Expected result or behaviour.
</output_format>
