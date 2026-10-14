---
schema: 1
id: align-roadmap-to-okrs
kind: prompt
title: Align a roadmap to OKRs
description: Maps each roadmap item to the objective or key result it should move, flags orphan items and key results with no work behind them, and proposes what to add, cut or reword.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan, review]
role: [product-manager, engineering-manager, executive, manager]
requires: [none]
inputs: [text, document, notes]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [okrs, key-results, goal-alignment, orphan-work, traceability]
pairs_with:
  prompts: [critique-roadmap, run-quarterly-planning, build-outcome-roadmap, write-roadmap-update]
args:
  - name: okrs
    description: The objectives and key results for the period, with baselines and targets where known.
    type: text
    required: true
  - name: roadmap
    description: The roadmap items for the same period, with a short note of what each is and its size if known.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Alignment map, Orphan items, Uncovered key results, Weak links, Proposed changes, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You check whether a roadmap actually serves the goals it is supposed to serve. Teams often write OKRs and a roadmap in separate meetings, so items get attached to key results after the fact with weak or wishful links. The common problems: items that serve no key result, key results with nothing on the roadmap that could move them, many items piled on one key result while another is ignored, items linked to a key result they cannot plausibly move within the period, and key results that are really output lists ("launch X") rather than measurable outcomes. Legitimate work without a key result also exists (maintenance, compliance, commitments) and should be named as such rather than forced into a link.
</context>

<task>
OKRs:

<okrs>
{{okrs}}
</okrs>

Roadmap:

<roadmap>
{{roadmap}}
</roadmap>

1. For each roadmap item, name the key result it most plausibly moves and rate the link: direct (the item changes the measured behaviour), indirect (it helps through a chain of steps you name), or none. Explain each rating in one line.
2. List orphan items with no plausible link. For each, say whether it is legitimate non-OKR work (maintenance, compliance, a commitment) or a candidate to cut or defer.
3. List key results with no direct work behind them and say whether the target is at risk.
4. Flag weak links: items that cannot move their key result within the period, effort concentrated on one key result, and key results written as outputs rather than outcomes, with a reworded version.
5. Propose specific changes: items to add, cut, defer or re-scope, and OKR rewording, with the expected effect on coverage.
6. List the questions the team needs to answer, for example missing baselines.
</task>

<constraints>
- Judge links by mechanism, not by matching words. Explain the causal path for each indirect link.
- Do not invent baselines, targets or metrics. If a key result has no baseline, say so.
- Do not label maintenance, security or legal work as waste just because it lacks a key result.
- Proposals must name the item and the key result they affect.
{{> output/uncertainty}}
</constraints>

<output_format>
## Alignment map
Table: roadmap item | key result | link (direct, indirect, none) | reason.

## Orphan items
Table: item | legitimate non-OKR work or cut candidate | reason.

## Uncovered key results
Bullets: key result, what is missing, risk to the target.

## Weak links
Bullets.

## Proposed changes
Numbered list.

## Questions
Bullets.
</output_format>
