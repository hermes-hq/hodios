---
schema: 1
id: write-business-visa-invitation-letter
kind: prompt
title: Write a business visa invitation letter
description: Writes a company's invitation letter for a foreign business visitor's visa application with the visit's true purpose, dates, who pays, host details and the documents to attach.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, founder, executive, manager]
advice_risk: [legal]
requires: [none]
inputs: [notes]
output: [message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [business-visa, invitation-letter, visa-documents, business-travel, corporate-letters]
pairs_with:
  prompts: [write-visitor-invitation-letter, write-no-objection-certificate, prepare-visa-application]
args:
  - name: visitor
    description: The visitor's full name as in the passport, nationality, passport number, job title and employer.
    type: string
    required: true
  - name: visit
    description: The purpose (meetings, negotiations, a trade fair, training received, a site visit), the agenda or main meetings, dates of entry and exit, places, accommodation, and who pays for travel, stay and expenses.
    type: text
    required: true
  - name: host
    description: Your company's legal name, registration number, address, the relationship with the visitor's company, and the signatory's name, title and contact details.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Letter, Documents and checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write invitation letters that companies send to support a foreign visitor's business visa. Consular officers use the letter to check that the visit is genuinely for permitted business activities, that the dates and costs are clear, that the host is a real company that will be accountable, and that the visitor has reasons to leave. Most business visitor visas allow meetings, negotiations, conferences and trade fairs, but not productive work for the host, such as installing equipment, writing code or serving customers; a letter that says "she will work with our team on the project" can make an officer think a work permit is needed. Letters fail when the purpose is vague, dates or the passport number do not match the application, costs are not stated, the signatory has no title or contact details, or the letter promises things the host cannot guarantee. Rules on permitted activities differ by country, so the activities must be checked against the destination's guidance.

Visitor: {{visitor}}

<visit>
{{visit}}
</visit>

<host>
{{host}}
</host>
</context>

<task>
1. Check the purpose against typical business-visitor activities. If any planned activity sounds like productive work (doing paid work, hands-on installation, filling a role), say so first and recommend checking whether a work permit or a different visa is needed; do not disguise the activity.
2. Write the letter on company letterhead layout: date, addressed to the consulate or embassy of the destination country (placeholder), subject "Business visa invitation for [name], passport [number]".
3. Body:
   - Who the host company is, registration number, and its business relationship with the visitor's employer.
   - The visitor's details exactly as supplied.
   - The purpose and a short agenda of meetings or events with dates and places.
   - Entry and exit dates and accommodation.
   - Who pays for flights, accommodation and daily expenses; if the host pays, say what is covered.
   - That the visit is temporary and the visitor will return to their role with their employer, phrased as the host's understanding rather than a guarantee.
   - The signatory's contact details for verification.
4. Signature block with name, title and company stamp placeholder.
5. Documents and checks: documents the visitor and host usually attach (company registration, agenda, the visitor's employer letter), matching details against the application, and a reminder to check the destination's current rules on permitted business activities.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent passport numbers, registration numbers, dates or meetings; use [brackets].
- Describe the visit truthfully; never reword productive work to look like meetings.
- Do not state that a visa will be granted or that the host guarantees the visitor's departure.
- One page; formal, factual.
</constraints>

<output_format>
## Letter
The letter laid out for printing.
## Documents and checks
Bullets.
</output_format>
