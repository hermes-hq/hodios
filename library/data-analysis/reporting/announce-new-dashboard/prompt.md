---
schema: 1
id: announce-new-dashboard
kind: prompt
title: Launch a new dashboard and drive adoption
description: Plans the launch of a new dashboard so people use it instead of the old reports, with messages per audience, a demo, a parallel run, retiring the old report and adoption checks.
category: reporting
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [data-analyst, business-analyst, manager, data-engineer]
inputs: [notes, text]
output: [plan, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [dashboard-launch, user-adoption, change-management, report-retirement]
pairs_with:
  prompts: [prune-report-inventory, write-data-methodology-note, announce-metric-definition-change]
args:
  - name: dashboard
    description: "What the new dashboard does, who it is for, what it replaces (old reports, spreadsheets, emails), and any known differences between its numbers and the old ones."
    type: text
    required: true
  - name: launch_constraints
    description: Launch date, channels available (email, chat, team meetings), and whether usage data can be seen in the BI tool. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Launch summary, Audiences, Messages, Demo plan, Old report retirement, Adoption checks, Timeline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A new dashboard fails quietly: it launches with one email, people open it once, notice a number that differs from the spreadsheet they trust, and go back to the spreadsheet. Two things decide adoption. First, trust: the launch must explain in advance where and why the new numbers differ from the old report (different definition, cut-off, source or exclusions), with a reconciliation people can check. A difference users discover on their own reads as an error. Second, habit: people keep using the old report as long as it exists and still lands in their inbox, so a launch needs a short parallel run with a fixed end date and then a real switch-off. Adoption is measured by the right people coming back: weekly unique viewers from the target audience and return visits, not total views from the launch week. A named champion in each team and a short live demo built around each audience's own weekly question work better than a general tour of every button.
</context>

<task>
<dashboard>
{{dashboard}}
</dashboard>
{{#launch_constraints}}

<launch_constraints>
{{launch_constraints}}
</launch_constraints>
{{/launch_constraints}}

1. Summarise the launch in three sentences: what launches, for whom, and what it replaces.
2. List the audiences, and for each the question they will bring to the dashboard, what they use today, and what is in it for them.
3. Draft messages: a launch announcement (under 150 words) that leads with what the dashboard answers, says where to find it, explains any number differences from the old report and when the old one stops; and one shorter message per audience if their needs differ. Include a reminder message for the end of the parallel run.
4. Plan a demo of 15 to 20 minutes built around the audiences' real questions, with the order of views, one exercise for attendees, and a recording or short written walkthrough for those who miss it.
5. Plan old report retirement: parallel run length, a reconciliation note people can check, the switch-off date, what replaces any scheduled emails or exports, and how to handle people who ask to keep the old report.
6. Define adoption checks at 2, 6 and 12 weeks: weekly unique viewers from the target audience, return rate, questions or issues raised, and whether the old report is still requested; with a threshold that triggers follow-up and what that follow-up is.
7. Lay out the timeline from two weeks before launch to twelve weeks after.
</task>

<constraints>
- Do not claim the new numbers match the old ones unless the input says they were reconciled; if differences are unknown, make reconciliation a launch prerequisite.
- If usage data is not available in the tool, say so and propose a fallback (champion check-ins, a short pulse survey).
- Keep messages plain and short; no hype words.
- Do not set a switch-off date that leaves a team without data they rely on; list what must exist first.
</constraints>

<output_format>
## Launch summary
## Audiences
Table: audience | their question | what they use today | benefit.

## Messages
Each message as a short block ready to send.

## Demo plan
Ordered list with timings.

## Old report retirement
Steps with dates relative to launch.

## Adoption checks
Table: week | measure | threshold | follow-up.

## Timeline
Table: when | action | owner role.
</output_format>
