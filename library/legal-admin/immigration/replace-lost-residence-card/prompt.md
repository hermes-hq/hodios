---
schema: 1
id: replace-lost-residence-card
kind: prompt
title: Replace a lost residence card
description: Plans what to do when a residence card or permit document is lost, stolen or damaged, at home or abroad, from the police report to replacement, proving status meanwhile and getting back in.
category: immigration
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student, traveler]
subject: [law]
requires: [none]
inputs: [text]
output: [plan, checklist, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [lost-residence-card, stolen-documents, replacement-permit, proof-of-status, re-entry-document]
pairs_with:
  prompts: [handle-emergency-abroad, write-immigration-status-enquiry, prepare-for-immigration-appointment]
args:
  - name: country
    description: The country that issued the card, and the card or permit type with its expiry date.
    type: string
    required: true
  - name: what_happened
    description: Lost, stolen or damaged; when and where; whether you are in that country or abroad; whether your passport went too; and anything urgent such as a flight, a job start or a right-to-work check.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Do first, Replacement steps, Proving your status meanwhile, If you are abroad, Message to send]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Losing a residence card is stressful but usually fixable; the risks come from doing things in the wrong order. Most authorities expect a police report for a theft or loss, sometimes within days, and a replacement application that may require the report, photos, a fee and an appointment. While the replacement is pending, the person may need to prove their status to an employer, landlord or bank, which an online status check, a copy of the decision letter or a certificate from the authority can sometimes do. Abroad, the situation is harder: an airline may refuse boarding without the card, and some countries require a special re-entry document or visa from their consulate. Cards that are stolen can be misused, so reporting the theft also protects the person.

Country and card: {{country}}

<what_happened>
{{what_happened}}
</what_happened>
</context>

<task>
1. Do first: the two or three steps for today, such as reporting the loss or theft to the police and getting the report reference, and, if a passport was also lost, the passport steps.
2. Replacement steps: the usual replacement process (where to apply, documents, photos, fees, appointment) marked "typical, confirm with the authority".
3. Proving your status meanwhile: options commonly available (online status record or share code, copy of the decision, a certificate from the authority, the police report) and what to give an employer or landlord.
4. If you are abroad: contacting the issuing country's consulate or embassy about a re-entry document or visa, talking to the airline before going to the airport, and keeping copies. Skip this section if they are in the country.
5. Message to send: a short message to the authority, employer or consulate, whichever is most urgent, with placeholders for reference numbers.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Mark procedures, deadlines and fees "typical, confirm with the authority"; do not state them as fact.
- Do not invent office names or websites; refer to "the immigration authority" or "the consulate".
- If the card expired or the person's status is in doubt, say so and recommend a regulated adviser.
- Keep ID numbers out of the message; use placeholders.
{{> output/uncertainty}}
</constraints>

<output_format>
## Do first
Numbered.
## Replacement steps
## Proving your status meanwhile
## If you are abroad
## Message to send
</output_format>
