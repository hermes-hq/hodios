---
schema: 1
id: build-steering-committee-update
kind: prompt
title: Build a steering committee update
description: Builds a short steering committee or programme board deck with an honest status rating, progress against milestones, top risks and issues, and the decisions and help needed from the committee.
category: presentations
version: 1.0.0
status: incubating
stage: [operate, review]
role: [project-manager, manager, consultant]
requires: [none]
inputs: [notes, document]
output: [outline, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [governance, rag-status, programme-board, risks-and-issues, escalation, executive-audience]
pairs_with:
  prompts: [build-decision-request-deck, present-missed-target, plan-backup-slides]
  personas: [presentation-designer]
args:
  - name: status_notes
    description: Progress since last meeting, milestone dates (planned versus forecast), budget spent versus plan, risks, issues and anything you need from the committee.
    type: text
    required: true
  - name: rating_rules
    description: How your organisation defines red, amber and green, if it does, for example "amber = milestone at risk but recoverable within the phase". Optional.
    type: text
  - name: minutes
    description: Your slot on the agenda in minutes.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [Status at a glance, Slide plan, Milestones, Risks and issues, Asks of the committee]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help project and programme leads prepare updates for steering committees and programme boards. A steering committee exists to make decisions, unblock and own the big risks; it does not need a tour of activity. Updates go wrong when the status is "watermelon" (green outside, red inside), when amber is used for everything, when risks are listed without owners or actions, when the ask is missing, or when the deck has twenty slides for a fifteen-minute slot. A good update gives the overall status with a one-line reason, trend since last time, milestones planned versus forecast, money spent versus plan where relevant, the top three risks and issues with owners and mitigations, and the specific decisions or help needed, with the ask near the front. A risk is something that may happen; an issue has happened.

<status_notes>
{{status_notes}}
</status_notes>

{{#rating_rules}}Rating rules: {{rating_rules}}{{/rating_rules}}
Slot: {{minutes}} minutes
</context>

<task>
1. Propose an overall status rating with a one-line reason and trend (better, same, worse). Apply the rating rules if given; otherwise state the rule you used. If the notes show a forecast date past a committed milestone or overspend beyond plan, do not rate green; say why.
2. Build a milestone table: milestone, planned date, forecast date, status, comment. Use only dates in the notes; mark missing ones.
3. Separate risks from issues. For the top three of each, give impact, owner and action; mark missing owners as [owner needed].
4. Write the asks: decisions, approvals, escalations or help needed from the committee, each phrased so the committee can say yes or no. If none, say so explicitly.
5. Plan three to five slides for {{minutes}} minutes: status at a glance with the asks, milestones, risks and issues, and an optional appendix. Give assertion titles.
</task>

<constraints>
- Do not soften the rating to avoid an awkward conversation; base it on the evidence in the notes.
- Never invent dates, figures, owners or actions.
- Keep the main deck to five slides or fewer.
</constraints>

<output_format>
## Status at a glance
Rating, reason, trend and the asks in brief.

## Slide plan
Table: # | Slide title (assertion) | Content | Minutes.

## Milestones
Table: Milestone | Planned | Forecast | Status | Comment.

## Risks and issues
Two tables: Risks and Issues, each with Item | Impact | Owner | Action.

## Asks of the committee
Numbered list.
</output_format>
