---
schema: 1
id: customer-feedback-loop-track
kind: workflow
title: Customer feedback loop track
description: Runs a recurring customer feedback loop in approved steps, collecting from every channel, tagging, finding themes, prioritising with the team, deciding and closing the loop with customers.
category: user-feedback
version: 1.0.0
status: incubating
stage: [discover, plan, review, ship]
role: [product-manager, support-agent, ux-researcher, founder]
requires: [none]
inputs: [notes, dataset, text]
output: [report, table, plan, message]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [feedback-loop, feedback-themes, decision-log, closing-the-loop, feedback-ops]
pairs_with:
  prompts: [design-feedback-tagging-taxonomy, analyze-user-feedback, triage-feature-requests, close-feedback-loop]
  personas: [product-coach]
args:
  - name: channels
    description: Where feedback arrives (support tickets, sales notes, surveys, reviews, community, interviews) and roughly how much per channel per cycle.
    type: text
    required: true
  - name: team
    description: Who takes part in prioritising and deciding (for example "PM, design lead, eng lead, head of support"), and who owns customer replies.
    type: text
    required: true
  - name: cadence
    description: How often the loop runs.
    type: enum
    enum: [monthly, quarterly]
    default: monthly
steps:
  - {id: collect, file: steps/01-collect.md, stage: discover, gate: approve}
  - {id: tag, file: steps/02-tag.md, stage: discover, gate: approve}
  - {id: synthesise, file: steps/03-synthesise.md, stage: review, gate: approve}
  - {id: prioritise, file: steps/04-prioritise.md, stage: plan, gate: approve}
  - {id: decide, file: steps/05-decide.md, stage: plan, gate: approve}
  - {id: close-loop, file: steps/06-close-loop.md, stage: ship, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs one {{cadence}} cycle of the customer feedback loop for this team, one approved step at a time.

<channels>
{{channels}}
</channels>

<team>
{{team}}
</team>

The cycle collects feedback from every channel, tags it with a consistent scheme, synthesises themes with counts and quotes, prepares and runs a prioritisation session with the team, records decisions with owners, and closes the loop with the customers who gave the feedback. Each step produces one artifact and waits for approval; later steps build on the approved versions. The assistant works only from feedback the user pastes or summarises, never invents quotes, counts or customers, and removes personal data from anything meant for a wider audience. Decisions belong to the team: the assistant prepares evidence and options, and records what the team decides. If the user wants to skip the gates, confirm once that later steps will build on unreviewed tagging and themes; if they agree, run the remaining steps in one reply and state the choice made at each skipped gate.
