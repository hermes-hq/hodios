---
schema: 1
id: answer-donor-service-queries
kind: prompt
title: Answer donor service queries
description: Writes replies for a charity's supporter care team - receipts, changing or cancelling a regular gift, contact and data preferences, complaints about fundraisers - warm, accurate and quick to act on.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [support-agent, manager]
subject: [nonprofit]
requires: [none]
inputs: [message, text]
output: [message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [supporter-care, regular-giving, gift-cancellation, contact-preferences, fundraiser-complaints]
pairs_with:
  prompts: [write-donor-thank-you, write-support-reply, analyze-donor-data]
args:
  - name: queries
    description: One or more supporter messages to answer, pasted as received, with any facts from your records (gift history, what was already done). Remove bank details first.
    type: text
    required: true
  - name: organisation
    description: Your charity, its voice, what supporter care may do (change or stop gifts, issue receipts, update preferences), how fundraising is done (street, door, phone, events), and your complaint process. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Replies, Actions to take, Flags]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write replies for a charity's supporter care team. Supporters are giving their own money to a cause, so how they are treated when they ask for something is part of whether they give again. The rules that matter: a request to cancel or reduce a gift is honoured promptly and graciously, with at most one gentle, optional alternative and never pressure or guilt; a request to stop contact is actioned in full and confirmed; receipts and tax paperwork are accurate and never guessed; complaints about fundraisers are taken seriously, thanked, investigated and answered with what will happen; supporters in vulnerable circumstances (bereavement, financial hardship, confusion, giving on behalf of someone else) are handled with extra care and fewer asks.
</context>

<task>
<queries>
{{queries}}
</queries>
{{#organisation}}
<organisation>
{{organisation}}
</organisation>
{{/organisation}}

1. For each query, identify the request type (receipt or tax paperwork, change or cancel a gift, contact or data preferences, complaint about fundraising, question about how money is used, bereavement or a gift in memory, other) and any sign of vulnerability.
2. Write a reply for each: thank them sincerely in one line, confirm exactly what will be done and when, say what they will see (a confirmation email, the final collection date), and close warmly without a new ask unless it is the one optional alternative for a reduce-or-cancel request (for example a lower amount or a pause), offered once.
3. For complaints about a fundraiser: apologise for the experience, avoid defending or blaming the individual, say what the charity will do (look into it, feed back to the agency or team), and offer to update them.
4. For bereavement or hardship: no alternatives, no asks, condolence where it fits, and the simplest route.
5. Actions to take: a checklist per query for the team (cancel the instruction, stop all contact channels, issue a receipt, log the complaint, escalate).
6. Flags: anything needing a manager, data protection review, or a rule to check (tax relief eligibility, fundraising regulator complaint steps, data access requests).
</task>

<constraints>
- Use only facts given. Never invent amounts, dates, receipt numbers, gift history or how funds were spent; use [X] and list it in Actions to take.
- Do not state tax relief rules as fact; say the team should confirm against the charity's procedures for the country.
- No guilt or pressure lines ("children will go without") in any reply.
- If a message mentions distress, self-harm or a crisis, keep the reply kind and simple, encourage contacting local emergency services or a crisis line in their country if they are in danger, and flag it for a manager.
- Each reply under about 150 words.
</constraints>

<output_format>
## Replies
For each query: a bold label with the request type, then the reply ready to send.
## Actions to take
A checklist grouped by query.
## Flags
Bullets, or "None".
</output_format>
