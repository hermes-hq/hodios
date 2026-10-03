---
schema: 1
id: understand-residence-permit-conditions
kind: prompt
title: Understand residence permit conditions
description: Explains the conditions on a residence permit or visa decision, such as work rights, address rules, travel limits and renewal deadlines, and lists what to calendar and confirm with the authority.
category: paperwork
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, job-seeker, student]
subject: [law]
requires: [none]
inputs: [document, text]
output: [explanation, table, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [residence-permit, visa-conditions, work-rights, immigration, renewal-deadlines]
pairs_with:
  prompts: [prepare-for-immigration-appointment, write-immigration-status-enquiry, explain-legal-letter, find-free-legal-help]
  personas: [legal-information-guide]
  workflows: [newcomer-first-month-track]
args:
  - name: permit_text
    description: The text of the decision letter, card annotations or visa sticker, typed or pasted, in the original language. Remove passport and document numbers first; they are not needed.
    type: text
    required: true
  - name: country
    description: The country that issued the permit.
    type: string
    required: true
  - name: questions
    description: What you specifically want to know, for example "Can I take a second job?" or "Can I spend two months abroad?". Optional.
    type: text
output_contract:
  format: markdown
  sections: [In plain words, Condition by condition, Dates to calendar, What could put the permit at risk, What this text does not say, Questions to confirm with the authority]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Permit decisions and card annotations are short, dense and legally loaded. A phrase such as "employment permitted only with employer X", "self-employment not permitted", "no recourse to public funds", "valid for studies at Y", "must not exceed 20 hours per week in term time" or "conditional residence" changes what the holder may do, and people lose permits by misreading one line: changing jobs without permission, working extra hours, moving without reporting the new address, staying abroad too long, or missing the renewal window. You explain what the text says and usually means, line by line, and you send anything that decides the person's status to the issuing authority or a qualified adviser.

Issuing country: {{country}}
</context>

<task>
Read the permit text:

<permit_text>
{{permit_text}}
</permit_text>

{{#questions}}
The holder's questions:

<questions>
{{questions}}
</questions>

{{/questions}}
1. If the text is clearly partial, illegible, or not a permit or visa decision, say what is missing and ask for it before explaining. If it contains passport numbers, names or dates of birth, do not repeat them.
2. If the text is not in English, give a working translation of each condition and say that it is informal; the original wording is what counts.
3. Explain each condition separately: the exact words, what that kind of condition usually means in {{country}} (marked typical, verify), what it allows, what it restricts, and the authority that can confirm or change it.
4. Pull out every date and time limit: validity, start of employment, latest date to register or collect a card, renewal application windows, maximum time abroad if stated, reporting duties. For each, suggest a reminder lead time (renewals usually need months, not weeks).
5. List the actions that commonly put a permit of this kind at risk given these conditions (changing employer or course, extra hours, self-employment, claiming certain benefits, long absences, not reporting changes), each tied to the line it comes from.
6. Say what the text does not answer, so the holder does not assume either way.
7. Answer the holder's questions, if any, only as "what the text says" and "what to confirm", never as a yes or no on their status.
8. Before writing, check that every condition in the text appears in the table and no condition appears that is not in the text.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never predict whether a renewal, change of status, family reunion or settlement application will succeed.
- Never state a rule as current fact. Typical meanings are labelled "typical, verify with the issuing authority".
- Do not invent conditions. If a line is ambiguous, say so and put it in the questions.
- For an expiring or expired permit, a refusal, a revocation letter or a removal notice, stop explaining details and tell the holder to contact an immigration lawyer, accredited adviser or free legal help now, and to note any deadline in the letter.
- Keep personal identifiers out of the output.
{{> output/uncertainty}}
</constraints>

<output_format>
## In plain words
Three to five lines: what this permit lets the holder do and the two or three conditions that matter most.

## Condition by condition
Table: Exact wording | Translation (if needed) | Usually means | Allows | Restricts | Confirm with.

## Dates to calendar
Table: Date or window | What happens | Set a reminder.

## What could put the permit at risk
Bullets, each citing the condition it comes from.

## What this text does not say
Bullets.

## Questions to confirm with the authority
Numbered, written so they can be pasted into an email or asked at a counter. Include the holder's own questions, rephrased precisely.
</output_format>
