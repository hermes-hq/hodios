---
schema: 1
id: design-date-and-time-storage
kind: prompt
title: Design date and time storage
description: Decides how a database should store each date and time field - instant, local time with zone, plain date or duration - and plans fixing existing columns with mixed or missing time zones.
category: data
version: 1.0.0
status: incubating
stage: [design, maintain]
role: [backend-engineer, data-engineer, dba, software-engineer]
stack: []
requires: [none]
inputs: [schema, text, dataset]
output: [report, code, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [time-zones, timestamps, datetime, daylight-saving, schema-design]
pairs_with:
  prompts: [design-database-schema, design-time-series-schema, plan-zero-downtime-schema-change, review-database-migration]
  personas: [database-administrator]
args:
  - name: fields
    description: The date and time columns or fields in question, with their current types, and what each one means in the product (when it happened, when it is due, a birthday, an opening hour).
    type: text
    required: true
  - name: database
    description: The database or warehouse and version, the languages and drivers that write to it, and the server and application time zone settings if known.
    type: string
  - name: symptoms
    description: Bugs seen so far, such as events off by an hour, reports split across days wrongly, or recurring meetings moving after a clock change. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Field classification, Recommended types, Write and read rules, Fixing existing data, Tests to add, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most date and time bugs come from storing every value the same way. There are at least four different kinds of value. An instant (an order was placed, a row was updated) is a point on the global timeline and belongs in a time-zone-aware type, normalised to UTC. A future local event (a meeting at 09:00 in Berlin next March, a shop opening hour) must be stored as local date and time plus an IANA zone name such as Europe/Berlin, because the offset for that date can change before it arrives; storing it as UTC breaks it when daylight saving rules or the user's zone change. A plain date (a birthday, an invoice date, a holiday) has no time zone at all, and storing it as midnight UTC shifts it by a day for half the world. A duration or interval is not a timestamp. Further traps: database types whose names mislead (a "timestamp" without zone that drivers silently convert using the server zone), offsets stored without zone names, epoch values in mixed seconds and milliseconds, and "day" boundaries in reports that must follow a business zone rather than UTC.

<fields>
{{fields}}
</fields>
{{#database}}Database and writers: {{database}}{{/database}}
{{#symptoms}}
<symptoms>
{{symptoms}}
</symptoms>
{{/symptoms}}
</context>

<task>
1. Classify every field as instant, future local event, plain date, local time of day, or duration, with one line explaining the meaning that decides it. Ask when the meaning is ambiguous.
2. Recommend a storage type for each in the stated database, plus any companion column (zone name, original offset for display). If the database is not given, describe the type by behaviour and give examples for two common databases.
3. Write rules for writing and reading: normalise instants at the boundary, session and server time zone settings, driver behaviour to check, how the API serialises each kind, and how reports pick the zone that defines a day.
4. Plan fixing existing data: how to find out which zone each existing value was actually written in (sampling, known write paths, comparison with logs), the conversion for each case, ambiguous and non-existent local times around clock changes, and a safe rollout that keeps readers working during the change.
5. List tests to add: daylight saving transitions, a user in a different zone from the server, dates near midnight, leap days, and recurring events across a rule change.
6. Open questions for product and data owners.
</task>

<constraints>
- Do not guess the zone that existing data was written in. Give the evidence to collect and treat it as unknown until checked.
- Do not state database type behaviour you are unsure of for a specific version; mark it "verify in your version's documentation".
- Never recommend storing future local events only as UTC, or plain dates as timestamps.
- Any migration of existing values must be reversible or keep the original column until verified.
{{> output/uncertainty}}
</constraints>

<output_format>
## Field classification
Table: Field | Kind | Why.
## Recommended types
Table: Field | Type | Companion column | Notes.
## Write and read rules
Bullets.
## Fixing existing data
Numbered steps, including the evidence to collect first and example SQL marked as untested.
## Tests to add
Checklist.
## Open questions
Numbered.
</output_format>
