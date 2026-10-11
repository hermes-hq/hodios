---
schema: 1
id: complain-about-police-conduct
kind: prompt
title: Complain about police conduct
description: Drafts a complaint about how police officers or staff treated you, with a precise dated account, the evidence to preserve quickly, the outcome wanted and the independent oversight route to check.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build, ship]
role: [individual]
subject: [law, public-sector]
requires: [none]
inputs: [text]
output: [message, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [police-complaint, oversight-body, civil-liberties, body-worn-video, public-accountability]
pairs_with:
  prompts: [request-my-personal-data, write-public-records-request, complain-to-ombudsman]
args:
  - name: incident
    description: What happened, in order - date, time, place, the officers' numbers or descriptions, what was said and done, any injury or damage, witnesses, and whether you were arrested, charged or given a notice.
    type: text
    required: true
  - name: outcome
    description: What you want - an explanation, an apology, the officer's conduct reviewed, a change in practice, return of property, or something else.
    type: text
    required: true
  - name: country
    description: Country and region, and the police force or agency. Optional, but oversight routes differ by place.
    type: string
output_contract:
  format: markdown
  sections: [Check first, Preserve evidence now, Complaint, Questions to answer, Route and time limits, Get advice if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a member of the public complain about police conduct: rudeness, discrimination, unnecessary force, an unlawful search, property not returned, failure to investigate, or poor service. Complaint handlers work from specifics: date, time, location, officer collar or badge numbers, what was said word for word where remembered, and witnesses. Some evidence disappears quickly: body-worn video, custody footage, nearby CCTV and phone records are often kept for limited periods unless someone asks for them to be preserved, so an early written request matters. Most places have a local complaints process run by the force, plus an independent oversight body for serious cases or reviews, and time limits for complaining. A complaint is different from a civil claim for damages and from defending a criminal charge; if the person has an open charge, anything they write can matter in that case.

{{#country}}Country and force: {{country}}{{/country}}
</context>

<task>
Incident:

<incident>
{{incident}}
</incident>

Outcome wanted:

<outcome>
{{outcome}}
</outcome>

1. Check first: if the person is injured, get medical care and a record of injuries. If they face a charge, a fixed penalty or an ongoing investigation, say clearly to speak to a criminal defence lawyer or duty solicitor before submitting a detailed written complaint, and explain why in one line.
2. Preserve evidence now: write down everything while fresh; photograph injuries and damage with dates; collect witness names and contacts; note nearby cameras; request preservation of body-worn video, custody records and CCTV in writing (draft a short preservation request); request the person's own data or records through the appropriate route.
3. Draft the complaint: the person's details as [BRACKETS]; date, time and place; officers' identifiers; a numbered factual account in order; the effect on the person; witnesses and evidence held; specific questions; the outcome wanted; and a request for written acknowledgment and the reference number.
4. Questions to answer: specific and neutral, such as the grounds for the search, whether body-worn video was recording, and where property is held.
5. Route and time limits: the local complaints process, the independent oversight body that may apply, how to request a review of the outcome, and time limits, all marked "verify". If the conduct may be a crime (serious assault, theft), note that it can be reported as such and that the oversight body may handle serious cases directly.
6. Say when legal advice is needed.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the facts given. Do not invent officer numbers, quotes, legal powers, statute names or body names; use [BRACKETS] and "verify".
- Keep the complaint factual and calm. No speculation about officers' motives beyond what was said or done; if discrimination is alleged, record the specific words or acts that suggest it.
- Do not advise on how to answer a criminal charge or on what to say in a police interview; refer to a defence lawyer.
- Do not encourage publishing officers' personal details or confronting officers.
- If the person is in danger now, tell them to contact emergency services first.
{{> output/uncertainty}}
</constraints>

<output_format>
## Check first
Bullets, urgent items first.

## Preserve evidence now
Checklist, plus a short preservation request.

## Complaint
Complete complaint with [BRACKETS].

## Questions to answer
Numbered list.

## Route and time limits
Ordered steps, marked verify.

## Get advice if
Bullets tied to this case.
</output_format>
