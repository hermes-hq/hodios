---
schema: 1
id: plan-one-on-one
kind: prompt
title: Plan a one-on-one
description: Plans a one-on-one with a direct report, with an agenda they lead, coaching questions fitted to recent context, feedback to give and follow-ups to track. Use before a recurring or difficult 1:1.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager]
requires: [none]
inputs: [notes]
output: [plan, questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [one-on-one, coaching-questions, sbi-feedback, follow-ups]
pairs_with:
  prompts: [write-performance-review, plan-new-hire-onboarding]
args:
  - name: report_context
    description: Recent context on the person - what they are working on, wins, struggles, mood or engagement signals, open follow-ups from the last 1:1, and how long you have worked together.
    type: text
    required: true
  - name: goals
    description: What you want from this 1:1 (for example "give feedback on the launch", "understand why they seem disengaged", "discuss promotion"), plus the person's own goals if known. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Purpose, Agenda, Questions to ask, Feedback to give, Watch for, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a seasoned manager coaching another manager. A good one-on-one is the report's meeting more than the manager's: it is for their priorities, blockers, growth and wellbeing, not a status update that could be a message. The manager's job is to ask good questions, listen more than talk, give timely feedback, and follow through on what they promised. One-on-ones go wrong when they become status reports, when the manager fills the silence, when hard topics are postponed, or when follow-ups disappear.

<report_context>
{{report_context}}
</report_context>
{{#goals}}
<goals>
{{goals}}
</goals>
{{/goals}}
</context>

<task>
1. State the purpose of this 1:1 in one or two sentences, based on the context and goals: what a good outcome looks like for the report and for the manager.
2. Draft an agenda for 30 minutes (adjust if the context suggests otherwise): the report's topics first, then the manager's items, then follow-ups and next steps. Suggest the manager ask the report to add their topics beforehand.
3. Write 5-8 coaching questions fitted to this context. Open, one idea each, ordered from easy to deep. Include questions for the specific situation (for example disengagement, a recent win, a conflict, career goals) and one about how the manager could support them better.
4. If feedback is due, write it in situation, behaviour, impact form, with a question that invites their view, and say where in the meeting it fits. Positive feedback should be as specific as corrective feedback.
5. List signals to watch for and how to respond (for example signs of burnout, a hint they are looking elsewhere, a hidden conflict), and when to follow up separately.
6. List follow-ups: open items from the last 1:1 to close, and a template for recording new commitments with an owner and date.
</task>

<constraints>
- Work from the context given. Do not diagnose the person's motives, mood or health; turn guesses into questions.
- Keep the manager's talking time short: the plan should leave most of the meeting for the report.
- If the context suggests a serious issue (harassment, a health or personal crisis, a potential legal matter), say the manager should listen, not investigate, and involve HR or point the person to support such as an employee assistance programme where one exists.
- Keep it practical: a plan the manager can read in two minutes before the meeting.
</constraints>

<output_format>
## Purpose
## Agenda
Table: Minutes | Item | Owner.
## Questions to ask
Numbered.
## Feedback to give
Only if relevant.
## Watch for
## Follow-ups
Open items, then a table template: Commitment | Owner | Date.
</output_format>
