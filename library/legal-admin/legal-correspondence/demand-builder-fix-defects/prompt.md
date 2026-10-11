---
schema: 1
id: demand-builder-fix-defects
kind: prompt
title: Demand a builder fix defective work
description: Writes a letter requiring a builder or tradesperson to return and fix defective or unfinished work, with a snagging schedule, a fair deadline and notice that someone else will be hired at their cost.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build, ship]
role: [individual]
subject: [law, construction]
requires: [none]
inputs: [text, document]
output: [message, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [builder-dispute, defective-work, snagging-list, home-renovation, tradesperson]
pairs_with:
  prompts: [hire-contractor, write-complaint-letter, prepare-small-claims-case]
  workflows: [dispute-resolution-track]
args:
  - name: job
    description: The job - what was agreed (quote, contract or messages), the price, what has been paid, the start and finish dates, and the builder's business name and address if known.
    type: text
    required: true
  - name: defects
    description: Each defect or unfinished item, where it is, when you noticed it, what the builder has said, and the evidence (photos, a surveyor or other trade's opinion).
    type: text
    required: true
  - name: stage
    description: first-request (invite them back to fix) or final-notice (they have ignored or refused, and you intend to hire someone else and claim the cost).
    type: enum
    enum: [first-request, final-notice]
    default: first-request
  - name: country
    description: Country and region. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Defects schedule, Letter, Money held back, Evidence, If they do not come back]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a homeowner get a builder or tradesperson to put right defective or incomplete work. In many places, a trader must carry out work with reasonable care and skill and to the standard agreed, and a customer who wants to claim the cost of putting it right is generally expected to give the original trader a fair chance to fix it first, unless trust has broken down for good reason or the work is dangerous. A numbered defects (snagging) schedule with locations and photos turns a vague row into a list the builder can price and work through. Customers often damage their own position by withholding far more money than the defects are worth, hiring someone else without notice, or letting the defect be covered up before it is recorded. Building control, warranty schemes, trade associations and the builder's insurance may also be routes.

Stage: {{stage}}
{{#country}}Country and region: {{country}}{{/country}}
</context>

<task>
The job:

<job>
{{job}}
</job>

Defects:

<defects>
{{defects}}
</defects>

1. Build the defects schedule: numbered items with location, description, what was agreed for that item, evidence reference, and the remedy requested. Mark items where the evidence is thin or where it may be a matter of taste rather than a defect.
2. Write the letter for the stage:
   - first-request: refer to the agreement, enclose the schedule, ask the builder to confirm within [7] days a date to return and to complete the work within a reasonable period, and ask how they will avoid further damage.
   - final-notice: summarise earlier requests with dates, give a final short deadline to confirm, and state that otherwise the homeowner will get quotes from another trader to complete or correct the work and will seek that cost (minus any balance unpaid) from the builder.
   Include safe access arrangements and a request to reply in writing.
3. Money held back: if a balance is unpaid, suggest holding back only an amount proportionate to the cost of fixing the defects, supported by a quote, and paying the rest if the contract requires it. Explain why over-withholding backfires.
4. Evidence: dated photos and video before any further work, two or three independent quotes, a surveyor or engineer report for structural, damp, electrical or gas items, and the original quote or contract.
5. If they do not come back: trade association or warranty scheme complaints, building control for regulated work, the builder's insurance, a card dispute if paid by card, mediation and small claims, all marked "verify locally".
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent building standards, regulations, warranty periods or scheme names. Mark local points "verify".
- Use only the facts given; [BRACKETS] for missing details. Do not inflate the cost of repairs.
- If an item may be dangerous (gas, electrics, structure, fire safety), say to stop using that part and get a qualified professional to make it safe now, before any letter.
- No threats beyond the lawful next step; no threats to post reviews in exchange for action, which can backfire.
- For large sums or structural failures, recommend a surveyor and legal advice.
{{> output/uncertainty}}
</constraints>

<output_format>
## Defects schedule
Table: # | location | defect | agreed standard | evidence | remedy requested.

## Letter
Complete letter for the stage with [BRACKETS].

## Money held back
Bullets.

## Evidence
Checklist.

## If they do not come back
Ordered bullets, marked verify.
</output_format>
