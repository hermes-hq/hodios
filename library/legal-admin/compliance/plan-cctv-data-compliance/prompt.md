---
schema: 1
id: plan-cctv-data-compliance
kind: prompt
title: Plan CCTV data compliance
description: Sets up a shop, office, rental or community building's CCTV so it respects privacy rules, covering purpose, camera placement, audio, signs, retention, access, footage requests and a short policy.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [operations-manager, founder, individual]
subject: [law, retail, hospitality]
requires: [none]
inputs: [text]
output: [plan, checklist, docs]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [cctv, video-surveillance, camera-signage, footage-requests, workplace-privacy]
pairs_with:
  prompts: [handle-data-subject-request, write-data-retention-schedule, draft-dpia, assess-employee-monitoring-plan]
args:
  - name: setup
    description: Where the cameras are or will be - the premises, number of cameras, what each one points at (entrances, tills, staff rooms, street, neighbours), whether audio is recorded, who can view, where footage is stored, and the reason for having CCTV.
    type: text
    required: true
  - name: country
    description: Country and region. Rules for CCTV, audio and workplace cameras differ. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Purpose and necessity, Camera-by-camera review, Signs and notices, Retention and access, Footage requests, Short CCTV policy, Get advice if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small organisation or property owner run CCTV lawfully under data protection and surveillance rules. Footage of identifiable people is personal data in many places. Regulators and courts look for a clear purpose (security, crime prevention, safety), cameras positioned and limited to that purpose, no recording in places with high privacy expectations (toilets, changing rooms, staff rest areas), audio switched off unless strongly justified, visible signs naming who operates the system and how to contact them, a short retention period with automatic overwriting, restricted access and logs, and a way to handle requests for footage from people filmed, police and insurers. Cameras that capture neighbours' gardens, the street, or staff workstations continuously raise extra issues, and covert cameras are justified only in rare circumstances. Using CCTV to monitor staff performance when the stated purpose is security is a common complaint trigger.

{{#country}}Country and region: {{country}}{{/country}}
</context>

<task>
Setup:

<setup>
{{setup}}
</setup>

1. Purpose and necessity: state the purposes in specific terms, whether CCTV is necessary for them, and less intrusive alternatives (better lighting, locks, alarms). Note if a short documented assessment, or a DPIA for larger systems or staff monitoring, is advisable.
2. Camera-by-camera review: for each camera, its field of view, whether it fits the purpose, problems (private areas, neighbours, street, staff workstations, audio), and a fix (reposition, privacy masking, audio off, remove).
3. Signs and notices: draft sign wording and say where to place signs; note the fuller privacy notice to provide.
4. Retention and access: a retention period tied to how quickly incidents are normally noticed (stated as a proposal to verify), automatic deletion, who can view or export, logging, secure storage and passwords, and the system's own security (change default passwords, firmware updates).
5. Footage requests: how to handle requests from people filmed (identify them, find footage, blur others where needed, deadlines to verify), police requests (in writing, record the basis), and insurers; draft a short request log format.
6. Short CCTV policy: one page covering the above, ready to adapt.
7. Get advice if.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent statutory retention periods, registration duties or fines. Propose a period with reasoning and mark "verify locally".
- Never recommend cameras in toilets, changing areas or similar private spaces, or covert recording of staff without a specific, documented, rare justification and advice.
- Do not suggest recording audio by default.
- Recommend advice for covert monitoring, cameras in workplaces with a works council or union, or disputes with neighbours over cameras.
{{> output/uncertainty}}
</constraints>

<output_format>
## Purpose and necessity
Bullets.

## Camera-by-camera review
Table: camera | view | fits purpose? | issue | fix.

## Signs and notices
Sign wording and placement.

## Retention and access
Bullets.

## Footage requests
Steps and a log format.

## Short CCTV policy
One-page policy.

## Get advice if
Bullets.
</output_format>
