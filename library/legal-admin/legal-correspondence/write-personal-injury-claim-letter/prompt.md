---
schema: 1
id: write-personal-injury-claim-letter
kind: prompt
title: Write a personal injury claim letter
description: Drafts a letter of claim to a business, property owner or their insurer for a minor injury, with what happened, why they are responsible, injuries, losses, evidence and time limits to check.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
subject: [law]
requires: [none]
inputs: [text]
output: [message, checklist, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [personal-injury, letter-of-claim, slip-and-fall, negligence, compensation-claim, insurer]
pairs_with:
  prompts: [prepare-small-claims-case, write-settlement-offer-letter, find-free-legal-help]
args:
  - name: location
    description: Country and state or region where the injury happened; liability rules, claim procedures and time limits are local.
    type: string
    required: true
  - name: incident
    description: What happened, where and when, who owns or runs the place or activity, what caused it (wet floor, broken step, falling stock, dog bite), whether it was reported, witnesses, photos and CCTV, and anything you may have contributed.
    type: text
    required: true
  - name: losses
    description: Your injuries, treatment and recovery so far, time off work and lost pay, out-of-pocket costs (prescriptions, travel, damaged items, care from family), and how it affects daily life.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Should you write this yourself, What the claim rests on, Losses schedule, Letter of claim, Evidence to secure now, Time limits and next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people make a claim for a minor injury caused by someone else's carelessness: a slip in a shop, a trip on a broken pavement or step, an injury in a rented property, a dog bite, or something falling on them. What claims handlers know: the claim rests on showing the other party owed a duty, fell below a reasonable standard (a spill left for a long time, a known hazard not fixed or signed), and that this caused the injury; the first letter should be factual and complete enough for the insurer to investigate, with dates, location, a description of the hazard and the injuries; evidence disappears fast (CCTV is often overwritten within weeks, accident books, the hazard itself), so the letter should ask for it to be preserved; and medical records showing prompt treatment matter. Losses are usually split into the injury itself (pain, suffering and loss of amenity, valued by guidelines and a medical report) and financial losses (earnings, expenses, care), so a self-written letter lists financial losses with receipts and leaves the injury value open. Some countries have formal pre-action procedures, portals for small injury claims, or no-fault schemes; time limits (often a few years, shorter against public bodies in some places) are strict. Serious injuries need a lawyer, often available on conditional fee terms.

Location: {{location}}
</context>

<task>
Incident:

<incident>
{{incident}}
</incident>

Injuries and losses:

<losses>
{{losses}}
</losses>

1. Should you write this yourself? If the injury is serious, long-lasting, involves a child, a road accident, a workplace or medical treatment, or liability is complex, say a specialist lawyer is the better route and many work on no-win-no-fee or contingency terms (to verify). Mention any formal claims portal or pre-action procedure that commonly applies in {{location}}, to verify, and that the letter must follow it if one applies.
2. What the claim rests on: the duty, what went wrong, how it caused the injury, and the weak points (unclear cause, the person's own contribution, an obvious hazard), stated honestly.
3. Build a losses schedule: financial losses with amounts and receipts, and non-financial effects described; leave the value of the injury itself as "to be assessed" unless the person has medical and legal guidance.
4. Draft the letter of claim to the business, owner or their insurer: the person's details as [BRACKETS], date, time and exact place, what happened and the hazard, why the recipient is responsible, the injuries and treatment, the losses schedule, a request to pass the letter to their insurer and to acknowledge within a stated period, a request to preserve CCTV, accident reports, cleaning or inspection logs and maintenance records, and a request for their insurer's details.
5. Evidence to secure now: photos of the hazard and injuries, witness contact details, the accident report reference, medical records, a symptom and expense diary, the shoes or items involved.
6. Time limits and next steps: the general limitation period to verify for {{location}}, what to expect from the insurer (acknowledgement, investigation, admission or denial, medical report, offer), and to get advice before accepting any offer or signing a settlement.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not value the injury or predict the outcome; leave general damages to medical evidence and legal advice.
- Do not invent laws, portals, procedures or limitation periods; mark them "to verify".
- Never exaggerate injuries or losses, and warn that exaggerated claims can be thrown out entirely and lead to penalties.
- Warn against unsolicited claims companies and against signing anything from the insurer without advice.
{{> output/uncertainty}}
</constraints>

<output_format>
## Should you write this yourself
Two to four lines.

## What the claim rests on
Bullets, including weak points.

## Losses schedule
Table: loss | amount | evidence.

## Letter of claim
The complete letter with [BRACKETS].

## Evidence to secure now
Checklist.

## Time limits and next steps
Bullets marked to verify.
</output_format>
