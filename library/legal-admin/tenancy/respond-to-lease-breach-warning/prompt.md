---
schema: 1
id: respond-to-lease-breach-warning
kind: prompt
title: Respond to a lease breach warning
description: Helps a tenant who has received a warning about noise, guests, pets, smoking, cleanliness or another lease breach check what is alleged, fix or dispute it, and write a reply that protects the tenancy.
category: tenancy
version: 1.0.0
status: incubating
stage: [review]
role: [individual, student, parent]
subject: [law, real-estate]
requires: [none]
inputs: [document, text]
output: [report, message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [lease-breach, warning-letter, noise-complaint, tenant-rights, tenancy-risk]
pairs_with:
  prompts: [respond-to-eviction-notice, review-lease, ask-landlord-about-pet]
  personas: [tenant-rights-advisor]
args:
  - name: warning
    description: The letter or message, word for word, including any deadline, and the lease clause it refers to if you have it.
    type: text
    required: true
  - name: your_side
    description: What actually happened from your side, what is true, what is not, and any evidence (messages, photos, witnesses).
    type: text
    required: true
  - name: country
    description: Country and region. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What is alleged, How serious this is, Your response options, Reply, Evidence to keep]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help tenants handle breach warnings the way a tenant adviser does. A warning letter is usually an early step: landlords who later seek to end a tenancy for breach often need to show they warned the tenant and gave a chance to fix it. So the tenant's written reply becomes part of the record. Common mistakes: ignoring the letter, replying angrily, admitting more than is true, or denying something the landlord can prove. A good reply acknowledges receipt, addresses each allegation precisely (accepted and fixed, partly true with context, or disputed with evidence), sets out what the tenant has done or will do, and asks for specifics where the allegation is vague. Some alleged breaches may rest on a lease term that is unusual or may not be enforceable where they live, which is worth checking without assuming. A formal notice to end the tenancy is different from a warning and needs advice quickly.
{{#country}}

Location: {{country}}
{{/country}}
</context>

<task>
<warning>
{{warning}}
</warning>

<your_side>
{{your_side}}
</your_side>

1. What is alleged: each allegation separately, quoted, with the clause relied on and any deadline.
2. How serious this is: warning versus formal notice, and the signs of each in the wording; if it looks like a notice to end the tenancy, say first to get tenant advice now.
3. Your response options per allegation: accept and fix, explain, or dispute with evidence; and whether the clause itself may be worth checking locally.
4. Reply: a calm letter responding to each allegation in turn, stating actions taken, asking for details of anything vague (dates, times, who complained), and asking the landlord to confirm the matter is resolved.
5. Evidence to keep: what to gather now and going forward, depending on the allegation (noise log, guest dates, cleaning photos, vet or adjustment documents).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not help deny facts the user says are true; help them respond honestly.
- Do not state that a clause is unenforceable as fact.
- Keep the reply under 300 words, polite and specific.
{{> output/uncertainty}}
</constraints>

<output_format>
## What is alleged
Table: allegation | clause | deadline.

## How serious this is
Two or three lines.

## Your response options
Per allegation: bullets.

## Reply
The letter, with [BRACKETS].

## Evidence to keep
Checklist.
</output_format>
