---
schema: 1
id: build-litigation-deadline-calendar
kind: prompt
title: Build a litigation deadline calendar
description: Turns court orders, rules excerpts and trigger events into a deadline calendar with the counting shown step by step, reminders, dependencies and every assumption flagged for the attorney.
category: legal-practice
version: 1.0.0
status: incubating
stage: [plan]
role: [legal-professional]
subject: [law]
requires: [none]
inputs: [document, text]
output: [table, plan, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [docketing, court-deadlines, time-computation, scheduling-order, calendaring]
pairs_with:
  prompts: [extract-deadlines, draft-discovery-requests, write-client-status-update]
  personas: [paralegal]
args:
  - name: triggers
    description: The trigger events with exact dates and how each was served (for example complaint served by hand on 3 March, scheduling order entered 10 April), plus any order setting dates.
    type: text
    required: true
  - name: rules
    description: The text of the procedural rules, local rules or orders that set the time periods, pasted or summarised with their source. The prompt counts only from rules given here.
    type: text
    required: true
  - name: court
    description: The court and jurisdiction, and the list of court holidays or closure days if you have it.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Critical dates, Deadline calendar, How each date was counted, Assumptions to verify, Reminders]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Missed deadlines are among the most common sources of malpractice claims, and most are counting errors rather than ignorance of the rule: counting from the wrong trigger, forgetting extra days added for the method of service, landing on a weekend or court holiday, confusing calendar days with court days, counting backwards from a hearing incorrectly, or missing that one deadline moves when another does. A good docket entry shows its working so a second person can check it: the rule, the trigger, the period, the counting method, the adjustments and the result. Dates set by a court order override general rules, and some deadlines (to appeal, to remove a case, limitation periods) cannot be extended, so they must stand out.

Court: {{court}}

Trigger events:
<triggers>
{{triggers}}
</triggers>

Rules supplied:
<rules>
{{rules}}
</rules>
</context>

<task>
1. List every deadline the triggers and rules create, including response deadlines, deadlines counted backwards from hearings, and deadlines that depend on another one.
2. For each, count step by step: the rule relied on (quote it), the trigger date, the period and unit (calendar days, court days, months), whether the trigger day is excluded, any days added for the method of service, and the roll-forward when the last day falls on a weekend or court holiday.
3. Mark deadlines that are commonly jurisdictional or non-extendable as critical, as a flag to check rather than a ruling.
4. Note dependencies: which dates move if a trigger date changes or an extension is granted.
5. Propose reminders for each date (for example 14, 7 and 2 days before) and a second-person check for critical ones.
6. List every assumption: holidays not supplied, unclear service method, rules not provided for a deadline you can see is likely.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Count only from the rules and orders given. If a deadline obviously needs a rule that was not supplied, list it with the date as [RULE NEEDED] instead of using a period from memory.
- Show the arithmetic for every date. Never give a bare date.
- If no court holiday list was supplied, say the dates assume only weekends and must be checked against the court's calendar.
- Every date is a draft for the responsible attorney to verify before it is entered in the firm's docket.
{{> output/uncertainty}}
</constraints>

<output_format>
## Critical dates
Bullets of the non-extendable or highest-risk dates, soonest first.
## Deadline calendar
Table: Date | Deadline | Rule or order | Depends on | Critical?
## How each date was counted
One short block per deadline showing the counting steps.
## Assumptions to verify
Numbered.
## Reminders
Table: Deadline | Reminder dates | Second check by.
</output_format>
