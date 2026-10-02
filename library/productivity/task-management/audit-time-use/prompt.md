---
schema: 1
id: audit-time-use
kind: prompt
title: Audit where your time goes
description: Analyses a week of time tracking or calendar data to show where the hours actually go against stated priorities, finds the leaks and proposes specific changes. Use when busy but not productive.
category: task-management
version: 1.0.0
status: incubating
stage: [review]
role: [individual, manager, founder, executive]
requires: [none]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [time-tracking, calendar-audit, deep-work, priorities, time-allocation]
pairs_with:
  prompts: [plan-my-week, reduce-meeting-load, run-energy-audit]
  personas: [productivity-coach]
args:
  - name: time_log
    description: A week of time data - a time-tracker export, a calendar copy, or rough notes like "Mon 9-11 email, 11-12 standup". Include hours you worked and roughly what filled the gaps.
    type: text
    required: true
  - name: priorities
    description: Optional - your top priorities for this period and roughly how much time you think each deserves, for example "Product launch 40%, hiring 20%, team 20%".
    type: text
output_contract:
  format: markdown
  sections: [Data quality, Where the time went, Against priorities, Patterns, Changes to try, Next week's experiment]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People misjudge their own time badly: they overestimate focused work and underestimate meetings, messages, switching and admin. A time audit replaces impressions with numbers, then compares them with what the person says matters. The useful output is not a pie chart but two or three specific changes, tested for one week.

<time_log>
{{time_log}}
</time_log>
{{#priorities}}
<priorities>
{{priorities}}
</priorities>
{{/priorities}}
</context>

<task>
1. Check the data. Count the days and hours covered, note gaps and anything ambiguous, and state the assumptions you make (for example "unlabelled gaps between meetings counted as fragmented time"). If the log covers less than two days or is too vague to categorise, say what is missing and ask for it instead of analysing.
2. Categorise every block into a small set of categories that fit this person: for example deep work, meetings, communication (email, chat), admin, people and 1:1s, learning, breaks, and unaccounted. Use their priorities as categories where they map cleanly.
3. Total hours and percentages by category and by day. Show the arithmetic so it can be checked.
4. If priorities were given, compare actual against intended share for each, and name the biggest gaps in hours. If none were given, ask for the top three at the end and infer nothing about what they should be.
5. Find patterns: fragmentation (focus blocks under 60 minutes), meeting clusters, when deep work actually happens, context switches, evenings or weekends absorbing overflow, and recurring items that take more time than their value.
6. Propose two to four changes, each specific and tied to a finding: what to do, the hours it should free or move, and the trade-off. Examples: protect two 90-minute focus blocks on the days with fewest meetings; batch email into three windows; decline or shorten a named recurring meeting.
7. Turn the most promising change into a one-week experiment with a simple measure.
</task>

<constraints>
- Use only the data given. Never invent activities or hours; label estimates.
- Hours must add up; flag where they do not.
- Be honest without judging. "Eleven hours went to chat" is a finding, not a failing.
- Changes must fit the person's role; if a change depends on someone else (a manager, a client), say so.
</constraints>

<output_format>
## Data quality
Coverage, gaps and assumptions in three bullets or fewer.
## Where the time went
A table: Category | Hours | Share | Notes. Then a one-line per-day view if days differ a lot.
## Against priorities
A table: Priority | Intended share | Actual share | Gap in hours. Skip if no priorities were given and ask for them instead.
## Patterns
Three to six bullets, each with the evidence.
## Changes to try
Numbered: change, why, hours freed or moved, trade-off.
## Next week's experiment
One change, how to run it, what to measure, when to check.
</output_format>
