---
schema: 1
id: present-financial-results-to-non-finance
kind: prompt
title: Present financial results to a non-finance audience
description: Plans how to present budget or financial results to people without a finance background, with plain terms, the few numbers that matter, clear visuals and what it means for them.
category: presentations
version: 1.0.0
status: incubating
stage: [plan, design]
role: [financial-analyst, manager, founder, executive]
requires: [none]
inputs: [dataset, notes, text]
output: [outline, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [financial-results, budget-update, plain-language, jargon-free, data-storytelling]
pairs_with:
  prompts: [explain-budget-variance, simplify-table-for-slide, plan-slide-visuals, write-speaker-notes]
  personas: [presentation-designer]
args:
  - name: figures
    description: The financial results or budget figures, with periods, comparisons (budget, last year) and any notes.
    type: text
    required: true
  - name: audience
    description: Who you are presenting to, such as all staff, department heads, a nonprofit board or volunteers, and what they care about.
    type: text
    required: true
  - name: minutes
    description: The time slot in minutes.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [The message, Slides, Plain-language terms, Speaker notes, Questions to expect]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help finance people and managers present numbers to audiences who do not read financial statements. Non-finance audiences switch off at full P&L tables, confuse revenue with profit and profit with cash, and do not know what "variance", "EBITDA", "accruals" or "run rate" mean. What works: start with the answer in one sentence ("we finished the year slightly ahead of budget, but cash is tight until March"), use at most three to five numbers, round them, compare each to something meaningful (budget, last year, per person), explain terms in everyday words once, show trends with simple bar or line charts instead of tables, and connect the numbers to the audience's world (hiring, projects, bonuses, prices). One-off items need to be called out, or people draw the wrong conclusion. Honest uncertainty ("this assumes the March contract renews") builds trust. Confidential figures must match what the audience is allowed to see.

Figures:
{{figures}}

Audience: {{audience}}
Time: {{minutes}} minutes
</context>

<task>
1. Read the figures and write the one-sentence message, plus what it means for this audience.
2. Choose the three to five numbers that support the message, with their comparison, rounded consistently. Recompute any change or percentage from the given figures and show the calculation in the notes.
3. Plan the slides to fit the time: the answer, the few key numbers, one or two simple charts (say type and data), one-off items explained, outlook and assumptions, what it means for the audience and what is asked of them.
4. Write a short glossary of the finance terms that cannot be avoided, in plain words.
5. Write speaker notes per slide in everyday language.
6. List the questions this audience is likely to ask (jobs, bonuses, budgets for their team) with honest answers drawn from the figures or a note to check with the right person.
</task>

<constraints>
- Use only the figures given; do not estimate missing numbers or forecasts.
- Rounding must not change the message; keep signs and directions exact.
- Do not give investment, tax or accounting advice; explain, do not advise.
- Flag figures that may be confidential for this audience.
</constraints>

<output_format>
## The message
One sentence plus what it means for the audience.

## Slides
Numbered slides with title, content and chart.

## Plain-language terms
A short glossary.

## Speaker notes
Notes per slide, with calculations shown.

## Questions to expect
Questions with answers or who to ask.
</output_format>
