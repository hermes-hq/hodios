---
schema: 1
id: respond-to-design-feedback
kind: prompt
title: Respond to stakeholder design feedback
description: Sorts stakeholder feedback on a design into act, discuss and decline, finds the concern behind each comment, resolves conflicts between reviewers, and drafts replies and a change list.
category: ui-design
version: 1.0.0
status: incubating
stage: [review, design]
role: [designer, product-manager]
requires: [none]
inputs: [text, notes, message]
output: [table, message, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [design-feedback, stakeholders, design-review, conflicting-feedback]
pairs_with:
  prompts: [write-design-rationale, run-design-critique-session, untangle-conflicting-client-feedback, critique-design-with-me]
  personas: [product-designer]
args:
  - name: feedback
    description: The feedback comments as received, each with who gave it and their role (for example "CEO in Slack", "Engineering lead in review"), plus any comments that contradict each other.
    type: text
    required: true
  - name: design_context
    description: What the design is, its goal, the evidence behind key decisions, the deadline, and anything fixed.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Triage, Underlying concerns, Conflicts, Change list, Replies, Discussion agenda]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Design feedback usually arrives as solutions ("make the button bigger", "use our brand red", "add a chart here") rather than problems. Implementing each literally produces a worse design; dismissing them loses real concerns and goodwill. The skill is to find the concern under each comment (the CEO who wants a bigger button is worried people miss the action), then decide: act if the concern is valid and the fix is sound, act differently if the concern is valid but the suggested fix is not, discuss if it conflicts with evidence or another reviewer, decline politely if it is out of scope or contradicts the goal. Replies acknowledge the concern, say what will happen and why, and refer to the goal and evidence rather than to taste or rank.
</context>

<task>
<feedback>
{{feedback}}
</feedback>

<design_context>
{{design_context}}
</design_context>

If the design's goal is unknown, ask and stop.

1. **Triage.** For each comment, assign one of: act as suggested, act on the concern differently, discuss, decline or defer. Give a one-line reason tied to the goal, evidence or constraints.
2. **Underlying concerns.** For each comment, the likely concern behind it, marked as an inference. Group comments that share a concern.
3. **Conflicts.** Where reviewers contradict each other or the evidence, set out both positions, what each protects, and a proposed resolution or who should decide.
4. **Change list.** The changes to make, in priority order, each traced to the comments it answers.
5. **Replies.** A short reply to each reviewer (or one per person covering their comments): acknowledge the concern, say what will change or why not, and offer a next step. Match the channel and seniority without being deferential or defensive.
6. **Discussion agenda.** For items marked discuss: the question to decide, the options, the evidence each needs, and a proposed time box.
</task>

<constraints>
- Do not dismiss feedback because of who gave it or accept it because of rank; judge it against the goal and evidence.
- Mark each underlying concern as an inference; do not attribute motives as fact.
- Replies are courteous and specific; no passive-aggressive phrasing, no over-apology.
- Do not invent evidence to win an argument; if a point is judgement, say so.
{{> output/uncertainty}}
</constraints>

<output_format>
## Triage
| Comment | From | Decision | Reason |
## Underlying concerns
## Conflicts
## Change list
## Replies
One block per reviewer, ready to send.
## Discussion agenda
</output_format>
