---
schema: 1
id: write-trip-report
kind: prompt
title: Write a business trip report
description: Writes a report after a business trip, trade fair or supplier or client visit with the purpose, what was learned, contacts made, opportunities, costs against budget and recommended actions.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [manager, sales-rep, consultant, operations-manager]
requires: [none]
inputs: [notes, text]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [trip-report, trade-fair, business-travel, client-visit, travel-report]
pairs_with:
  prompts: [write-conference-trip-report, write-site-visit-report, write-status-report]
args:
  - name: trip_notes
    description: Your notes from the trip, such as meetings held, people met (roles and organisations), what you learned, prices or offers seen, problems, and ideas.
    type: text
    required: true
  - name: trip_basics
    description: Where and when, who travelled, the purpose agreed before going, and the budget and actual cost if you have them.
    type: text
    required: true
  - name: reader
    description: Who reads the report, for example "my manager", "the sales team", "the funder". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Trip report, Follow-ups to log]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Managers ask for trip reports to answer three questions: was the trip worth the money, what do we now know that we did not, and what should we do about it. Reports that disappoint are diaries ("Day 1: arrived, registered, visited stands"), list every business card without saying which matter, and end without actions. Useful reports start with the outcome against the purpose, rank contacts and opportunities by value, record market intelligence (competitor launches, prices, customer complaints) in a form others can use, compare cost with budget, and turn everything into follow-ups with owners and dates while contacts are still warm. For tech conferences aimed at engineering teams, a dedicated conference write-up fits better.
</context>

<task>
Write a trip report{{#reader}} for {{reader}}{{/reader}}.

<trip_basics>
{{trip_basics}}
</trip_basics>

<trip_notes>
{{trip_notes}}
</trip_notes>

1. If the notes have no content about what happened or what was learned, ask in one short message and stop.
2. Summary: purpose, whether it was achieved (fully, partly, not), the two or three most valuable outcomes, and the main recommended action.
3. Key learnings, grouped by theme (customers, competitors, market and prices, suppliers, technology or practice), each with its source (meeting, stand, talk).
4. Contacts and opportunities: a table ranked by value with organisation, person and role (as given), what was discussed, opportunity or risk, next step. Do not list contacts with no follow-up beyond a single "other contacts" line.
5. Problems or risks noticed.
6. Costs: budget against actual by category if given, with a one-line comment on value for money; otherwise mark `[NEEDED: costs]`.
7. Recommendations: actions with owner and date, and whether to attend or visit again, with the reason.
</task>

<constraints>
- Use only the notes. Never invent people, companies, prices, deals or costs; keep names exactly as written.
- Mark speculation from conversations as "said by" or "heard", not as confirmed fact.
- Under about 800 words; no day-by-day diary.
- Personal data on contacts limited to name, role, organisation and what was discussed.
</constraints>

<output_format>
## Trip report
Header (trip, dates, travellers, purpose); Summary; Key learnings; Contacts and opportunities (table); Problems and risks; Costs; Recommendations (table: Action · Owner · Due).
## Follow-ups to log
A short list of follow-ups ready to paste into a CRM or task list.
</output_format>
