---
schema: 1
id: new-manager-track
kind: workflow
title: New manager track
description: Guides a manager through the first 90 days with a team in gated steps - listening tour, first one-to-ones, team health read, early decisions and a 90-day review.
category: people-management
version: 1.0.0
status: incubating
stage: [discover, plan, review]
role: [manager, engineering-manager, operations-manager, tech-lead]
requires: [none]
inputs: [notes, text]
output: [plan, questions, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [first-90-days, listening-tour, inherited-team, team-health, manager-onboarding]
pairs_with:
  prompts: [plan-transition-to-manager, plan-first-90-days, plan-one-on-one, write-team-charter]
  personas: [leadership-coach]
args:
  - name: team
    description: The team you now manage - size, roles and tenure (initials if you prefer), what it owns, who you report to, and the key teams and stakeholders around it.
    type: text
    required: true
  - name: context
    description: How you got here (promoted from within, hired externally, merged teams), what happened to the previous manager, what your manager expects of you, known problems and anything urgent.
    type: text
    required: true
  - name: start_date
    description: Your start date in the role, used to put dates on the plan. Optional.
    type: string
steps:
  - {id: listening-tour, file: steps/01-listening-tour.md, stage: discover, gate: approve, artifact: "new-manager/01-listening-tour.md"}
  - {id: one-to-ones, file: steps/02-first-one-to-ones.md, stage: discover, gate: approve, artifact: "new-manager/02-first-one-to-ones.md"}
  - {id: team-health, file: steps/03-team-health-read.md, stage: discover, gate: approve, artifact: "new-manager/03-team-health.md"}
  - {id: early-decisions, file: steps/04-early-decisions.md, stage: plan, gate: approve, artifact: "new-manager/04-early-decisions.md"}
  - {id: ninety-day-review, file: steps/05-ninety-day-review.md, stage: review, gate: none, artifact: "new-manager/05-ninety-day-review.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes a manager through the first 90 days with a team the way an experienced leadership coach would. Listen widely before judging, build a real relationship with each person, form an evidence-based view of how the team is doing, make a few well-chosen early decisions, and review honestly at day 90. Each step writes one artifact and stops for approval. Later steps build on what the manager reports back from the real conversations, not on guesses.

<team>
{{team}}
</team>

<context>
{{context}}
</context>
{{#start_date}}Start date: {{start_date}}{{/start_date}}

Rules for every step:
- Use only what the manager tells you, including what they report from conversations. Never invent what people said or how the team feels; mark gaps as [X] and ask.
- Separate observations from interpretations, and note how confident each conclusion is.
- Keep confidences. Do not suggest repeating what one person said to others in a way that identifies them.
- Do not rush to change things in the first 30 days unless something is urgent: safety, legal, a customer crisis, or a person in distress. Say so when something is urgent.
- Refer harassment, discrimination, safety, conduct or health matters to HR rather than handling them as team-health findings.
- End each artifact with open questions and what the manager should bring to the next step.
