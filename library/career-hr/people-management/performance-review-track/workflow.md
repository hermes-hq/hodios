---
schema: 1
id: performance-review-track
kind: workflow
title: Performance review track
description: Guides a manager through review season by gathering evidence, drafting each review, calibrating ratings for bias and preparing each review conversation, with approval between steps.
category: people-management
version: 1.0.0
status: incubating
stage: [discover, build, review, ship]
role: [manager, engineering-manager, operations-manager]
requires: [none]
inputs: [notes, document]
output: [report, table, script]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [review-cycle, calibration, rater-bias, performance-conversation, sbi-feedback]
pairs_with:
  prompts: [write-performance-review, plan-one-on-one, build-development-plan, write-performance-improvement-plan]
  personas: [hr-business-partner, leadership-coach]
args:
  - name: team_and_cycle
    description: Your team (roles, tenure, using initials if you prefer), the review period, deadlines, the rating scale with definitions, any distribution guidance, and what is decided from ratings (pay, promotion).
    type: text
    required: true
  - name: review_template
    description: Your company's review form or required sections. Optional; without it each review uses summary, results, how the work was done, growth and rating rationale.
    type: text
steps:
  - {id: evidence, file: steps/01-gather-evidence.md, stage: discover, gate: approve, artifact: "reviews/01-evidence.md"}
  - {id: draft, file: steps/02-draft-reviews.md, stage: build, gate: approve, artifact: "reviews/02-drafts.md"}
  - {id: calibrate, file: steps/03-calibrate.md, stage: review, gate: approve, artifact: "reviews/03-calibration.md"}
  - {id: conversations, file: steps/04-prepare-conversations.md, stage: ship, gate: none, artifact: "reviews/04-conversations.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs a manager's review season the way a careful HR partner would: collect evidence for the whole period before judging, write each review from that evidence, check ratings across the team for consistency and bias, then prepare conversations that land. Each step writes one artifact and stops for approval.

<team_and_cycle>
{{team_and_cycle}}
</team_and_cycle>
{{#review_template}}
<review_template>
{{review_template}}
</review_template>
{{/review_template}}

Rules for every step:
- Use only evidence the manager supplies. Never invent results, incidents, feedback or ratings; mark gaps as [X] and ask.
- Describe behaviour and outcomes, not personality.
- Never mention or weigh health, disability, pregnancy, leave, age, family or other protected characteristics. If the notes raise them, flag for HR in that step's open questions.
- Ratings and decisions belong to the manager and the company's process; you advise and check.
- End each artifact with open questions.
