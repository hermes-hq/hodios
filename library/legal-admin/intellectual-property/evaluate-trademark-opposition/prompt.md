---
schema: 1
id: evaluate-trademark-opposition
kind: prompt
title: Evaluate a trademark opposition
description: Weighs whether to oppose a newly published trademark like yours, or how to answer an opposition to your application - similarity, goods overlap, settlement options and deadlines.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [review, plan]
role: [founder, marketer]
subject: [law]
requires: [none]
inputs: [text, document]
output: [report, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [trademark, opposition, coexistence-agreement, likelihood-of-confusion, brand-protection]
pairs_with:
  prompts: [respond-to-trademark-office-action, respond-to-cease-and-desist, apply-for-trademark]
args:
  - name: situation
    description: Which side you are on (you want to oppose, or someone opposed you), both marks, their classes and goods or services, filing and publication dates, the office, your registration status and use history, and any contact with the other side.
    type: text
    required: true
  - name: stakes
    description: How important the mark is to you (core brand, product line, side project), your budget for a dispute, and what outcome you would accept.
    type: text
output_contract:
  format: markdown
  sections: [Deadlines, Comparison, Preliminary view, Options, What to prepare, Questions for a trademark attorney]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a business decide what to do in a trademark opposition, either as the earlier owner thinking of opposing a newly published application or as the applicant being opposed. Oppositions are decided mostly on the similarity of the marks (look, sound, meaning, overall impression), the similarity of the goods and services, and in some systems the reputation of the earlier mark; actual market facts (different customers, channels) matter less than many expect because the comparison is often between the specifications as filed. Opposition windows after publication are short and strict in most offices, though some offer a cooling-off period for settlement. Many disputes end without a decision: a coexistence agreement that splits goods, territories or styling, or a narrowed specification. Fighting to a decision costs time and money and the loser may pay costs in some systems.
</context>

<task>
<situation>
{{situation}}
</situation>
{{#stakes}}

<stakes>
{{stakes}}
</stakes>
{{/stakes}}

{{> guardrails/professional-limits}}

1. Deadlines: the opposition or defence deadline from the dates given, whether an extension or cooling-off period may exist (to verify with the office), and that this comes before anything else. If dates are missing, say what to look up.
2. Comparison: the marks side by side (visual, aural, conceptual, dominant elements) and the goods and services side by side, marking where they overlap, are related, or differ.
3. Preliminary view: how strong the opposition looks for each side on these factors, labelled as preliminary, with the facts that could change it (prior use, reputation, weak shared elements used by many traders).
4. Options for the user's side: oppose or defend fully, approach the other side for a coexistence agreement, narrow or ask them to narrow the specification, a letter before opposing, or let it go and monitor. For each: likely cost driver, time, and risk.
5. What to prepare: evidence of use and dates, examples of confusion if any, specifications, the other side's activity, and a short brief for an attorney.
6. Questions for a trademark attorney.
</task>

<constraints>
- Do not predict the outcome; give factors and a preliminary view.
- Do not invent earlier marks, case law, deadlines or office fees.
- Do not suggest contacting the other side in a threatening way or making claims about rights not held; recommend an attorney before sending anything substantive.
{{> output/uncertainty}}
</constraints>

<output_format>
## Deadlines
Bullets.

## Comparison
Two tables: marks (aspect | yours | theirs | similarity) and goods (yours | theirs | overlap).

## Preliminary view
Short paragraph.

## Options
Table: option | cost driver | time | risk | fits your stakes?

## What to prepare
Checklist.

## Questions for a trademark attorney
Numbered.
</output_format>
