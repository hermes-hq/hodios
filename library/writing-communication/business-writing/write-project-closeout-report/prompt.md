---
schema: 1
id: write-project-closeout-report
kind: prompt
title: Write a project close-out report
description: Writes a close-out report for a non-software project covering objectives against results, budget and schedule variance, lessons learned and a handover of every open item to a named owner.
category: business-writing
version: 1.0.0
status: incubating
stage: [ship]
role: [project-manager, operations-manager, manager, consultant]
requires: [none]
inputs: [notes, document]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [project-closure, lessons-learned, variance, handover, benefits-realisation]
pairs_with:
  prompts: [write-status-report, write-handover-document, run-retrospective]
args:
  - name: project_notes
    description: What the project delivered, final dates and costs, the original plan figures if you have them, problems, decisions, feedback and anything still open.
    type: text
    required: true
  - name: original_goals
    description: The objectives, scope, budget and dates as originally approved (the charter or business case), if not already in the notes.
    type: text
  - name: audience
    description: Who signs off or reads it, for example the project sponsor, the board or the client.
    type: string
    default: sponsor
output_contract:
  format: markdown
  sections: [Close-out report, Calculations, Missing information]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A close-out report lets the sponsor formally accept the project, release the team and budget, and know who now owns what is left. It is also the organisation's memory: the next similar project (an office move, an event, a building refurbishment, a process change, a marketing campaign) should start from its lessons. Close-out reports go wrong when they are a victory lap, when variance is hidden or computed wrongly, when lessons are generic ("communication could be better"), and when open items are listed with no receiving owner, so they quietly die once the team disbands.

Variance conventions to apply and show:
- Schedule variance: actual end date minus planned end date, in days or weeks, and as a percentage of planned duration.
- Budget variance: actual cost minus approved budget, in currency and as a percentage of the approved budget. State whether the budget figure is the original or the re-baselined one, and give both if both exist.
</context>

<task>
Write a project close-out report for {{audience}}.

<project_notes>
{{project_notes}}
</project_notes>
{{#original_goals}}
<original_goals>
{{original_goals}}
</original_goals>
{{/original_goals}}

1. If neither the notes nor the original goals say what the project set out to achieve, ask for the objectives and approved budget and dates, then stop.
2. Compare each objective with the result: met, partly met or not met, with the evidence. If an objective can only be judged later (savings, satisfaction, adoption), mark it "to be measured", with when, how and who owns the measurement.
3. Report scope: delivered as planned, added, removed or deferred, each with the reason and who approved the change if known.
4. Compute schedule and budget variance using the conventions above. Show the arithmetic under Calculations. If figures are missing, use `[need: …]` and do not estimate.
5. Write lessons learned that the next project can act on. Each lesson states what happened, the effect, and a specific recommendation ("Book the venue's technical walkthrough four weeks before the event; this year it was three days before and the projector wiring had to be redone"). Include what worked well, not only problems. No blame on individuals.
6. List every open item (snags, warranty claims, outstanding invoices, documents, follow-up work, risks still live) with the receiving owner, due date and where the supporting information lives.
7. Write a summary the sponsor can read alone: overall outcome in one sentence, headline variance, the most important lesson, and what you need from the sponsor (acceptance, a decision on an open item, closing the budget code).
</task>

<constraints>
- Use only the supplied facts. Never invent figures, dates, approvals or feedback.
- State bad news plainly: an overrun is an overrun, with its cause, not "a reallocation".
- If the notes contradict each other (two different final costs), show both and ask which is right instead of picking one.
- Body under about 900 words; detail goes in tables.
</constraints>

<output_format>
## Close-out report
- **Summary**
- **Objectives and results:** table with Objective · Target · Result · Status · Evidence.
- **Scope:** table with Item · Change (delivered, added, removed, deferred) · Reason · Approved by.
- **Schedule and budget:** table with Measure · Planned · Actual · Variance · Variance % · Comment.
- **Benefits to be measured:** table with Benefit · Measure · When · Owner. Omit if none.
- **Lessons learned:** grouped under What worked and What to change, each with a recommendation.
- **Open items and handover:** table with Item · Receiving owner · Due · Where the information is.
- **Sign-off:** what is requested from {{audience}} and a line for acceptance.
## Calculations
The variance arithmetic, line by line.
## Missing information
Bullets: each `[need: …]` and each contradiction to resolve. "None" if complete.
</output_format>
