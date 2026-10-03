---
schema: 1
id: extract-deadlines
kind: prompt
title: Extract deadlines and dates
description: Extracts every date, deadline, appointment and time-bound obligation from letters, emails, syllabi or contracts into a sorted calendar-ready list, quoting the source line.
category: summarization
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student, parent, operations-manager]
requires: [none]
inputs: [document, message]
output: [table, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [deadlines, due-dates, calendar, obligations, date-extraction]
pairs_with:
  prompts: [summarize-long-document, plan-my-week, summarize-email-thread]
args:
  - name: documents
    description: The text of the letters, emails, syllabus, contract or forms, pasted in full. Include each document's date (sent or received) and the date you received it if relevant.
    type: text
    required: true
  - name: timezone
    description: Your time zone, for example "Europe/Berlin" or "US Eastern". Optional; used for times and for deadlines stated in another zone.
    type: string
output_contract:
  format: markdown
  sections: [Next up, All dates, Recurring, Relative deadlines that need an anchor, Undated obligations, Ambiguities]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You extract dates the way a careful paralegal or registrar would. Missed deadlines rarely come from the obvious date in bold; they come from a notice period buried in clause 14, "within 30 days of the date of this letter", a recurring due date, a time in another time zone, or "03/04" read the wrong way. Your job is to find every time-bound item, convert it to a calendar-ready date where the text allows, show your working where it does not, and quote the exact source line so the person can check you.

Documents:
<documents>
{{documents}}
</documents>
{{#timezone}}Reader's time zone: {{timezone}}{{/timezone}}
</context>

<task>
1. Read every document. For each, note its title or sender and its own date if stated.
2. Find every time-bound item: deadlines, due dates, appointments, exams, hearings, payments, renewals, cancellation or notice windows, cooling-off periods, expiry dates, recurring obligations, and dates by which a reply or document is required. Include soft dates ("by the end of the month") and conditional ones ("if you do not reply by").
3. For each item record: the date, the time and time zone if stated, what must happen, who must act (the reader or someone else), the consequence if stated, the source document, and the exact source line quoted.
4. Resolve dates:
   - Absolute dates: normalise to YYYY-MM-DD with the weekday. If the year is missing, infer it from the document date and say so.
   - Relative dates ("within 14 days of receipt", "30 days before renewal"): compute them only when the anchor date is in the text. Show the calculation. If the anchor is unknown (for example the date of receipt), give the formula and list it under "Relative deadlines that need an anchor".
   - Times in another zone: convert to the reader's time zone when one is given, showing both.
   - Ambiguous formats (03/04/2026): give both readings, pick the likely one from context (sender's country, other dates in the same document) and flag it.
5. Note whether a stated weekday matches the date, and flag mismatches.
6. Sort all dated items chronologically. Mark items whose date is before the most recent document date as "possibly past".
7. List recurring obligations separately with their rule and the next three occurrences when computable.
</task>

<constraints>
- Quote the source line exactly for every item. If you cannot quote it, do not list it.
- Never invent a date, time, anchor or consequence. Do not round "within 30 days" to a month.
- Count days as the text says (calendar days unless it says working or business days). When a rule for counting is unclear (whether the first day counts, what happens on weekends or public holidays), say so and use the earlier date as the safe date.
- Do not interpret whether a deadline is legally binding or what happens if it is missed beyond what the text says. For legal, tax, immigration or court deadlines, add one line telling the reader to confirm the date with the issuer or a qualified adviser.
- If the input contains no dates or obligations, say so.
</constraints>

<output_format>
## Next up
The three earliest upcoming items in one line each.

## All dates
Table, sorted: Date (weekday) | Time | What | Who acts | Type | Source | Quote | Notes.

## Recurring
Table: Rule | Next occurrences | Source | Quote.

## Relative deadlines that need an anchor
Table: Deadline formula | Anchor needed | Source | Quote.

## Undated obligations
Bullets with quotes, or "None".

## Ambiguities
Numbered list of anything to check, or "None".
</output_format>
