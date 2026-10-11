---
schema: 1
id: revisit-architecture-decision
kind: prompt
title: Revisit an old architecture decision
description: Re-examines a past architecture decision or ADR against what has changed since, separates broken assumptions from mere discomfort, and recommends keep, amend or supersede with the cost of each.
category: architecture
version: 1.0.0
status: incubating
stage: [maintain, design]
role: [architect, tech-lead, engineering-manager]
requires: [none]
inputs: [document, text, notes]
output: [report, adr, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [adr-review, decision-review, technical-debt, superseding-decisions, sunk-cost]
pairs_with:
  personas: [software-architect, staff-engineer]
  prompts: [write-adr, compare-design-options, plan-incremental-migration]
args:
  - name: decision
    description: The original decision, ideally the ADR or design doc, including its context, the options it rejected and its date.
    type: text
    required: true
  - name: since_then
    description: What has changed and why it is being questioned now, for example new scale, team changes, incidents, vendor changes, pain reported by developers.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Assumptions then and now, What is really hurting, Options, Recommendation and next step, Draft ADR update]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Architecture decisions age. Some were right and still are, and the current complaints are about execution, missing tooling or the usual friction of any choice. Others rested on assumptions that no longer hold: a team size, a load estimate, a vendor's pricing, a product direction. A good revisit judges the original decision by the information available at the time (not hindsight), checks each of its stated assumptions against today, and weighs the cost of switching, not only the pain of staying. Two traps: sunk cost ("we invested too much to change") and grass-is-greener (comparing the known flaws of the current choice with the brochure of the alternative).
</context>

<task>
<decision>
{{decision}}
</decision>

<since_then>
{{since_then}}
</since_then>

1. Restate the original decision, its drivers and the assumptions it relied on, explicit and implicit. If the original reasoning is not available, reconstruct the likely drivers and label them as reconstructed.
2. For each assumption, say whether it still holds, partly holds or is broken, with the evidence from what changed. Note new forces that did not exist then.
3. Separate the complaints into: consequences of a broken assumption, consequences the original ADR accepted knowingly, and execution or tooling problems that switching would not fix.
4. Lay out the options: keep as is, keep and fix execution, amend (narrow the scope or add an exception), or supersede with an alternative. For each, the cost of switching (migration effort, risk, dual running, retraining), what it fixes, and the new problems it brings. Be as specific about the alternative's downsides as about the current choice's.
5. Recommend one, with the smallest next step that reduces uncertainty (a spike, a measurement, a pilot in one team) and the evidence that would reverse the recommendation.
6. Draft the ADR change: a status update and short note if kept or amended, or the opening of a new superseding ADR that links the old one.
</task>

<constraints>
- Judge the original decision on what was knowable then; do not blame it for later changes.
- Do not count sunk cost as a reason to keep, and do not compare the current choice's real problems with an alternative's best case.
- Do not invent facts about the alternative technology; mark claims to verify.
- Never rewrite the original ADR's content; decisions are superseded, not edited.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
Keep, keep and fix, amend or supersede, in one or two lines.
## Assumptions then and now
Table: assumption, then, now, status (holds, partly, broken), evidence.
## What is really hurting
Three short lists: broken assumptions, accepted consequences, execution problems.
## Options
Table: option, cost to switch, fixes, new problems, reversibility.
## Recommendation and next step
## Draft ADR update
</output_format>
