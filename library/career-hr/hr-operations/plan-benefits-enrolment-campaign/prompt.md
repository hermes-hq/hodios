---
schema: 1
id: plan-benefits-enrolment-campaign
kind: prompt
title: Plan a benefits enrolment campaign
description: Plans the staff campaign for benefits enrolment or renewal - what changed, who must act, a dated message sequence across channels, decision aids, support and tracking of who has not enrolled.
category: hr-operations
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [operations-manager, founder, executive]
requires: [none]
inputs: [document, text]
output: [plan, copy, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [open-enrolment, benefits-renewal, employee-communications, benefits-choices, enrolment-deadline]
pairs_with:
  prompts: [design-benefits-package, write-total-rewards-statement, plan-hr-annual-calendar, answer-employee-hr-question]
  personas: [hr-business-partner]
args:
  - name: changes
    description: The benefits offered this year and what changed from last year (providers, premiums or contributions, new options, removed options), from the provider or broker summary.
    type: text
    required: true
  - name: logistics
    description: Enrolment window dates, how people enrol (portal, form, provider site), what happens if they do nothing, headcount, locations, shift or offline workers, languages and channels you can use.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Who needs to act, Key messages, Campaign calendar, Decision aids, Support and tracking, Check before launch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan benefits enrolment communications the way an experienced HR operations lead does. What goes wrong: employees ignore the emails, miss the window, and find out months later that they are not covered or are paying for something they did not want. The fix is segmentation and the default: the most important message is what happens if someone does nothing, and different groups need different calls to action (people whose plan was removed must act; people happy with their current choice may not need to). Frontline, shift and offline staff need channels other than email, and managers and team briefings matter. Decision aids should compare options with worked examples in the employee's terms (what a typical doctor's visit or hospital stay costs under each), not the provider's jargon. Facts must come from the provider documents; a wrong figure in a benefits email becomes a complaint or a liability.

<changes>
{{changes}}
</changes>

<logistics>
{{logistics}}
</logistics>
</context>

<task>
1. Who needs to act: segments (must act, should review, no action needed, new joiners, people on leave) and the default for each if they do nothing.
2. Key messages: three to five plain-language points, starting with the deadline and the default.
3. Campaign calendar: dated touches from pre-announcement to the post-deadline confirmation, by channel (email, intranet, posters, team briefings, text message, manager talking points) and segment.
4. Decision aids: a comparison table of options with the figures from the provider summary and one or two worked examples marked as illustrative; a short FAQ outline.
5. Support and tracking: drop-in sessions or provider webinars, who answers questions, how to track who has not completed enrolment, and the reminder rule for them.
6. Check before launch: every figure checked against the provider documents, accessibility and translation, and privacy (no health information in tracking lists).
</task>

<constraints>
- Use only figures in the provider summary; mark missing ones [FIGURE NEEDED]. Never invent premiums, deductibles or contribution rates.
- Do not recommend which option a given employee should choose; explain trade-offs.
- Keep tracking to enrolment status only; no health or claims data.
- Plain language, no provider jargon without a definition.
{{> output/uncertainty}}
</constraints>

<output_format>
## Who needs to act
Table: Segment | Action | Default if no action.
## Key messages
## Campaign calendar
Table: Date | Channel | Segment | Message.
## Decision aids
## Support and tracking
## Check before launch
Checklist.
</output_format>
