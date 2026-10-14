---
schema: 1
id: write-care-update-for-family
kind: prompt
title: Write a care update for family
description: Turns a carer's rough notes into a clear update for siblings and relatives on how the person is, what changed, decisions coming up and specific asks, keeping the person's privacy and dignity.
category: caregiving
version: 1.0.0
status: incubating
stage: [operate]
role: [individual]
requires: [none]
inputs: [notes, text]
output: [message, summary]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [family-updates, siblings, carers, group-chat, shared-decisions]
pairs_with:
  prompts: [build-care-rota, plan-family-meeting]
  personas: [eldercare-advisor]
args:
  - name: notes
    description: Your rough notes since the last update, for example appointments, what doctors said, how they are eating, sleeping and feeling, incidents, costs, tasks done and tasks needing someone.
    type: text
    required: true
  - name: audience
    description: Who receives it and how, for example "my two brothers by email, one lives abroad and feels left out" or "family WhatsApp group including teenage grandchildren". Optional.
    type: text
  - name: person_wishes
    description: What the person cared for is happy to have shared, or anything they asked to keep private. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Update, What I need from you, Kept out and why]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help the main carer keep the wider family informed, the way a good care coordinator writes to families. Main carers often stop sending updates because they are exhausted, and relatives who are far away then feel shut out, question decisions or turn up with criticism. A regular, predictable update with the same structure lowers the temperature: how the person is in a sentence, what changed, what the doctors or care team said (as reported, not interpreted), decisions coming up with dates, and specific asks with owners. It also respects the person: they are an adult with a right to privacy about their body and their money, and the update should not discuss them in ways they would find humiliating.

<notes>
{{notes}}
</notes>
{{#audience}}Audience: {{audience}}{{/audience}}
{{#person_wishes}}What they are happy to share: {{person_wishes}}{{/person_wishes}}
</context>

<task>
1. Update: a short message in this order: how they are in one or two sentences; what changed since last time; appointments and what was said, reported as "the doctor said..." without adding meaning; how the carer is doing in one honest line; decisions coming up with dates. Tailor length and tone to the audience (a group chat with grandchildren needs a shorter, gentler version).
2. What I need from you: specific asks, each with a person or role and a date ("someone to cover Thursday's hospital appointment", "£X towards the stairlift by the 15th", "a weekly video call on Sundays"), and an invitation to the next family call if one is needed.
3. Kept out and why: anything from the notes you left out because of privacy, dignity or the person's wishes (for example continence details or money specifics), so the carer can decide.
</task>

<constraints>
- Report only what is in the notes. Do not interpret medical information, predict how things will go, or add diagnoses.
- Neutral and factual about family members; no guilt-tripping, sarcasm or blame, even if the notes are angry. Asks can be firm.
- Respect the person's privacy wishes; when not given, leave intimate care and detailed finances out of group messages and list them under "Kept out and why".
- If the notes mention something urgent (a fall with injury, sudden confusion, not eating or drinking, a safeguarding concern), say at the top of your reply to the carer that this needs the doctor or care team now, before family updates.
- Plain words, short paragraphs, readable on a phone.
</constraints>

<output_format>
## Update
The message in a code block.
## What I need from you
## Kept out and why
</output_format>
