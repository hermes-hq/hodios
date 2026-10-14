---
schema: 1
id: write-company-profile
kind: prompt
title: Write a company profile document
description: Writes a factual company profile for tenders, distributors, banks or partners with history, services, capacity, credentials, clients and key facts, tailored to the reader.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager, sales-rep, executive]
requires: [none]
inputs: [notes, document]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [company-profile, tenders, distributors, credentials, b2b]
pairs_with:
  prompts: [write-capability-statement, write-about-page, respond-to-rfp]
args:
  - name: company_facts
    description: Everything you can share - legal name, year founded, ownership, locations, headcount, services or products, capacity, certifications, key clients, projects, equipment, financial highlights, contacts.
    type: text
    required: true
  - name: reader
    description: Who will read it and why, for example "a public tender evaluation panel", "a distributor in Kenya deciding whether to carry our products" or "a bank assessing a credit line".
    type: string
    required: true
  - name: length
    description: Target length.
    type: enum
    enum: [two-pages, four-pages, eight-pages]
    default: four-pages
output_contract:
  format: markdown
  sections: [Company profile, Facts to verify, Missing content this reader expects]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write company profiles that procurement officers, distributors and bankers actually use. These readers are checking, not browsing: they want registered details, how long the company has traded, who owns it, what it can deliver and at what scale, proof (certifications with numbers and expiry dates, named projects, client references) and who to contact. Adjectives like "leading", "world-class" or "innovative" are skipped or count against you; a number, a certificate or a named project does the work. Different readers weigh different things: tender panels look for compliance and comparable past work, distributors for capacity, margins, support and exclusivity terms, banks for ownership, stability, management and financial track record.

Reader: {{reader}}
Target length: {{length}}

<company_facts>
{{company_facts}}
</company_facts>
</context>

<task>
1. Choose the section order for this reader. A typical set: At a glance (a fact box: legal name, registration number, founded, ownership, head office, locations, employees, key certifications, contact), Who we are, What we do, Capacity and resources, Quality, safety and compliance, Selected projects or clients, Management team, Why work with us (three to five verifiable points), Contact.
2. Write each section in plain, confident sentences. Put numbers where the facts allow: years, units, sites, headcount, turnover band if supplied, delivery times.
3. Selected projects: for each, client or sector, what was delivered, scale, year and result. Name clients only if the user's notes show they may be named; otherwise describe them ("a national grocery chain").
4. Tailor: lead with what this reader checks first, and drop sections that do not serve them.
5. Facts to verify: every figure, date, certificate and client name you used, as a checklist, so the user can confirm before sending.
6. Missing content this reader expects: what the reader usually asks for that the notes do not cover (for example certificate expiry dates, insurance cover, audited accounts, references with contact details).
</task>

<constraints>
- Use only supplied facts. Never invent clients, certifications, awards, turnover, headcount or dates; put [to add] where something is needed.
- No superlatives that cannot be proven ("number one", "best in the region") unless the user supplies the evidence.
- Keep to the target length; use short paragraphs and a fact box rather than long prose.
- Write in the language of the user's notes unless asked otherwise.
</constraints>

<output_format>
## Company profile
The full profile with headings.
## Facts to verify
Checklist.
## Missing content this reader expects
Bullets.
</output_format>
