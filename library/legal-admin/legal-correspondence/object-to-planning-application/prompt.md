---
schema: 1
id: object-to-planning-application
kind: prompt
title: Object to a planning application
description: Writes an objection to a planning or building permit application that sticks to grounds a planning authority can weigh, ties each to the plans and evidence, and drops the ones it must ignore.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [plan, build, ship]
role: [individual, parent]
subject: [law, public-sector, real-estate]
requires: [none]
inputs: [text, document]
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
tags: [planning-objection, zoning, building-permit, neighbour-development, consultation-response]
pairs_with:
  prompts: [write-neighbor-dispute-letter, write-letter-to-elected-official, write-public-records-request]
args:
  - name: application
    description: The application as published - reference number, address, what is proposed (height, use, size, access), the deadline for comments, and the authority. Paste the description from the notice or portal.
    type: text
    required: true
  - name: concerns
    description: Why you object, in your own words, and how you are affected - where you live relative to the site, what you see, hear or use.
    type: text
    required: true
  - name: country
    description: Country and region. Planning, zoning and permit systems differ widely. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Grounds that count, Grounds to leave out, Objection letter, Strengthen it, Before the deadline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a resident comment on a planning, zoning or building permit application. Planning officers summarise objections by ground, not by volume or anger, and in most systems they can only weigh issues relevant to land use, often called material or relevant planning considerations: overlooking and loss of privacy, loss of light or overshadowing, overbearing scale, noise and disturbance from the use, highway safety, parking and access, design and character, heritage, trees and ecology, flooding and drainage, and conflict with the local plan or zoning rules. They usually must ignore loss of property value, loss of a private view, competition with an existing business, the applicant's character, and private disputes such as boundaries or covenants, which belong elsewhere. A short, specific objection that cites the drawings ("the rear balcony on drawing 03 is about 8 metres from our kitchen window") beats a long general one. Objections are usually published, so personal details and tone matter.

{{#country}}Country and region: {{country}}{{/country}}
</context>

<task>
Application:

<application>
{{application}}
</application>

Concerns:

<concerns>
{{concerns}}
</concerns>

1. Sort the concerns into grounds the authority can likely weigh and grounds it likely cannot. For each that counts, name the type of consideration and what fact or measurement would support it. For each that does not, say why in one line and, where relevant, the other route (a private dispute, a building regulations or licensing issue).
2. Write the objection letter or online comment: application reference and address in the subject, who the writer is and where they live relative to the site, each ground in its own short paragraph tied to a specific part of the proposal and the effect on the writer, a reference to local policy only in general terms ("the local plan's policies on residential amenity") unless the person supplied a policy name, and a clear request (refuse, or, if relevant, conditions such as obscured glazing, hours of use, a construction management plan).
3. Suggest how to strengthen it: photos from the affected window or garden, measured distances, a sun-path sketch, traffic or parking observations at specific times, checking the local plan and any earlier decisions on the site, and asking to speak at the committee if the system allows.
4. Before the deadline: how to submit, that comments are often published, what personal details to leave out, and that neighbours should write their own letters in their own words rather than copies of one.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent policies, policy numbers, distances, heights or standards (such as minimum separation distances or daylight rules). Use the facts given and [BRACKETS], and mark anything general as "check your local plan".
- Do not include grounds the person has not raised as if they had observed them; you may suggest grounds to check, clearly labelled.
- Keep the tone factual and civil. No personal remarks about the applicant, and no allegations of wrongdoing without evidence.
- If the person wants to challenge a decision already made, explain that appeal or review rights for third parties are often limited and time-sensitive, and suggest a planning professional or advice service.
{{> output/uncertainty}}
</constraints>

<output_format>
## Grounds that count
Table: ground | type of consideration | evidence that would support it.

## Grounds to leave out
Bullets with the reason and any other route.

## Objection letter
Ready to submit, with [BRACKETS].

## Strengthen it
Bullets.

## Before the deadline
Checklist.
</output_format>
