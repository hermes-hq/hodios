---
schema: 1
id: prepare-seller-property-information
kind: prompt
title: Prepare a seller's property information pack
description: Gathers what a seller must disclose and supply before listing a home - known defects, works and permits, boundaries, disputes and documents - so the sale does not stall or unravel.
category: real-estate
version: 1.0.0
status: incubating
stage: [plan, build]
role: [sales-rep, individual]
subject: [real-estate]
requires: [none]
inputs: [notes, text]
output: [checklist, questions, report]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [home-selling, seller-disclosure, conveyancing, property-documents, sales-progression]
pairs_with:
  prompts: [prepare-home-for-sale, write-real-estate-listing]
  personas: [real-estate-agent]
  workflows: [property-sale-track]
args:
  - name: property
    description: The home - type, age, tenure (freehold, leasehold, condominium, co-op), and what the seller knows - works done and when, repairs, problems past or present, extensions, shared access, neighbour issues, guarantees.
    type: text
    required: true
  - name: jurisdiction
    description: Country and state or region. Disclosure duties and the standard forms differ a lot, from formal statutory disclosure to buyer-beware systems.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [How disclosure works here, Questions for the seller, Documents to gather, Issues to address early, Notes for the conveyancer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an agent or a seller assemble property information before a sale, the way an experienced sales progressor does. Sales most often fall through after an offer is accepted, and the causes are predictable: missing permits or completion certificates for past works, an undisclosed dispute or flood history the buyer's lawyer or surveyor uncovers, leasehold or association documents that take weeks to obtain, and boundary or access questions nobody asked. Gathering the answers and documents before launch shortens the sale and reduces renegotiation. Honest disclosure also protects the seller: in many places a seller who gives false or misleading answers can face a claim after completion, and "I didn't mention it" is a weaker position than "I disclosed it and priced it in".

<property>
{{property}}
</property>

Jurisdiction: {{jurisdiction}}
</context>

<task>
1. Explain in three or four sentences, as general orientation, how seller disclosure usually works in {{jurisdiction}} (for example statutory disclosure forms, standard property information questionnaires, or buyer-beware with replies to enquiries), marked `[CHECK with conveyancer or attorney]`.
2. List the questions the seller should answer in writing, grouped: boundaries and access, disputes and complaints, notices and proposals affecting the area, alterations and permits, guarantees and warranties, environmental issues (flooding, subsidence, radon, contamination where relevant), services and utilities, occupiers, and for leasehold or association homes, charges, disputes and planned major works.
3. List the documents to gather, with who usually holds each and how long they can take: title or deed, permits and completion certificates for works, guarantees, energy rating or other required certificates, service records, leasehold or association pack, and any surveys already done.
4. From what the seller has said, flag issues to address before launch (for example works without visible permits, a past insurance claim, a shared driveway with no written agreement) and the usual options to investigate for each, without choosing for them.
5. Write notes for the conveyancer or attorney: open questions and anything that may need a specialist.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never help a seller hide, minimise or word around a known defect or dispute. If asked, decline that part and explain the risk of misrepresentation.
- Do not state which forms are legally required or what must be disclosed as fact; mark it `[CHECK with conveyancer or attorney]`.
- Use only what the seller has said; do not assume defects that were not mentioned, and list unknowns as questions.
{{> output/uncertainty}}
</constraints>

<output_format>
## How disclosure works here
Short orientation, marked as a check.

## Questions for the seller
Grouped checklists.

## Documents to gather
Table: document, who holds it, typical lead time.

## Issues to address early
Bullets: issue, why it matters, options to investigate.

## Notes for the conveyancer
Bullets.
</output_format>
