---
schema: 1
id: settle-coding-convention-dispute
kind: prompt
title: Settle a coding convention dispute
description: Settles a recurring team argument about a coding convention by laying out each option's real costs, recommending one, and writing the decision record, the enforcement and the migration plan.
category: conventions
version: 1.0.0
status: incubating
stage: [plan]
role: [tech-lead, software-engineer, engineering-manager]
requires: [none]
inputs: [notes, file, config]
output: [adr, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [team-decisions, bikeshedding, linting, consistency, decision-record]
pairs_with:
  prompts: [write-team-coding-standards, write-adr, fix-lint-violations-repo-wide]
args:
  - name: dispute
    description: The convention in dispute and the positions, for example "early returns vs single exit", "barrel files or not", "exceptions vs result types", with the arguments people make.
    type: text
    required: true
  - name: codebase_facts
    description: What the codebase does today (counts if you have them), the language and tooling, team size and how often the topic comes up in review.
    type: text
output_contract:
  format: markdown
  sections: [Options, Recommendation, Decision record, Enforcement and migration]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many convention arguments (tabs or spaces, trailing commas, import order) have no meaningful technical difference, and the cost is the argument itself repeated in every review. Others do have real consequences: barrel files and build performance, exceptions versus result types and error visibility, default exports and refactoring tools, abbreviations and searchability. A good settlement separates the two kinds, decides cheap ones quickly ("pick one, let the formatter enforce it"), decides consequential ones on evidence, and then removes the topic from review by automating it or writing it down once. The decision should also say what happens to existing code, because a rule that conflicts with half the codebase invites new arguments.
</context>

<task>
Help settle this dispute.

<dispute>
{{dispute}}
</dispute>
{{#codebase_facts}}
<codebase_facts>
{{codebase_facts}}
</codebase_facts>
{{/codebase_facts}}

1. Classify the dispute: preference-only (no meaningful difference), or consequential (affects correctness, performance, tooling, readability at scale or onboarding). Say why.
2. Lay out each option fairly: its real benefits and costs, steelmanning each side's best argument, and which arguments are taste presented as fact.
3. Recommend one option. For preference-only disputes, recommend the option closest to what the codebase and the ecosystem's dominant tooling already do. For consequential ones, base it on the costs above{{#codebase_facts}} and the codebase facts{{/codebase_facts}}.
4. Write a short decision record: context, decision, reasons, consequences, and when to revisit.
5. Plan enforcement: the formatter or lint setting that enforces it (or the review checklist line if no tool can), and how to stop the topic from coming back in review.
6. Plan migration of existing code: leave as is, fix on touch, or one mechanical change in its own commit with the formatting commit added to the blame-ignore list.
</task>

<constraints>
- Do not claim performance or correctness effects without a mechanism; mark anything that needs measuring as such.
- Do not invent lint rule names; describe the check and mark `[confirm rule name]` when unsure.
- Neutral tone: do not mock either side.
</constraints>

<output_format>
## Options
| Option | Real benefits | Real costs | Arguments that are taste |

## Recommendation
Two or three sentences, including whether the dispute is preference-only.

## Decision record
Context, Decision, Reasons, Consequences, Revisit when.

## Enforcement and migration
Bullets: tool setting, review guidance, migration approach.
</output_format>
