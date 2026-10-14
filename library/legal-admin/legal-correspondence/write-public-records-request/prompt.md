---
schema: 1
id: write-public-records-request
kind: prompt
title: Write a freedom of information request
description: Drafts a freedom of information or public records request to a public body, worded narrowly enough to be answered, with a search-friendly scope, format, deadline and the appeal route to check.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, researcher, writer]
subject: [law, public-sector]
requires: [none]
inputs: [text, topic]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [freedom-of-information, foia, public-records, transparency, access-to-information]
pairs_with:
  prompts: [request-my-personal-data, complain-to-ombudsman, write-letter-to-elected-official]
args:
  - name: what_you_want
    description: The information you are after and why, in your own words - for example "how much the council spent on consultants for the bridge project", "inspection reports for the care home on my street".
    type: text
    required: true
  - name: public_body
    description: The public body you will ask - council, ministry, police force, school district, agency, university - and the country or state.
    type: string
    required: true
  - name: known_details
    description: Anything that helps them find it - project names, date ranges, document titles, departments, earlier press stories or meeting minutes. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Law that likely applies, Request, Why it is worded this way, Before you send, If they refuse or go quiet]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people use access-to-information laws (freedom of information, public records, right to information or transparency laws), which exist in many countries and in most US states, each with its own rules on deadlines, fees and exemptions. Officers who handle requests say the same things: broad requests ("all emails about X") get refused for cost or delayed, while narrow ones that name a record type, a date range and the team likely to hold it get answered. Asking for existing records works better than asking questions that need opinion or new analysis. Requests about yourself usually go through a data protection route instead. Requests do not normally need to say why the information is wanted, though a short reason can help the officer search, and asking for a fee waiver can be possible for public-interest or media requests.

Public body: {{public_body}}
</context>

<task>
What the person wants:

<want>
{{what_you_want}}
</want>
{{#known_details}}

Details that may help locate it:
<details>
{{known_details}}
</details>
{{/known_details}}

1. Name the access-to-information law that likely applies to this body, as an assumption to verify, with the commonly stated response period and whether fees are common. If the body may not be covered (for example a private company or a court in some systems), say so and suggest an alternative route. If the request is really about the person's own data, point to a personal-data access request instead.
2. Narrow the request: turn the wish into one to three specific items, each naming a record type (contracts, invoices, inspection reports, minutes, policy documents, statistics already held), a date range, and the department likely to hold it. Prefer "a copy of records showing" over open questions.
3. Draft the request: addressed to the body's records or information officer, citing the law in general terms, the numbered items, the preferred format (electronic, spreadsheet for data), a request to be told if any item would exceed cost limits so it can be narrowed, a request for partial release with redactions rather than full refusal, and contact details as [BRACKETS].
4. Explain briefly why each choice in the wording helps.
5. Pre-send checklist: correct address or online portal, keep a dated copy, diary the response date.
6. Explain what usually happens if they refuse, apply an exemption, ask for a fee or do not reply: internal review or administrative appeal, then an information commissioner, ombudsman or court depending on the country, each marked "verify".
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent the name of a law, section numbers, deadlines or fee amounts. Name the likely law as an assumption and mark periods "verify".
- Do not draft requests designed to harass staff or bulk requests meant to overwhelm a body; if the input suggests that, say how vexatious-request rules may apply and help narrow it.
- Do not ask for other people's personal data in a way that would identify private individuals unless there is a clear public-interest angle; note that such data is usually withheld.
- Keep the request polite, short and specific. No accusations.
{{> output/uncertainty}}
</constraints>

<output_format>
## Law that likely applies
Two or three bullets, marked verify.

## Request
The complete request text.

## Why it is worded this way
Short bullets.

## Before you send
Checklist.

## If they refuse or go quiet
Ordered steps, marked verify.
</output_format>
