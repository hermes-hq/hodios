---
schema: 1
id: check-business-licences
kind: prompt
title: Check business licences and permits
description: Lists the licences, permits, registrations and inspections to check for a type of business in a given location, with where to verify each and the order to apply in.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, individual, home-cook]
subject: [law]
requires: [none]
inputs: [text]
output: [checklist, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [business-licence, permits, business-registration, zoning, home-business, trading-standards]
pairs_with:
  prompts: [choose-business-structure, build-compliance-checklist, review-commercial-lease]
args:
  - name: business_type
    description: What the business does and how - for example "home bakery selling at markets and online", "mobile dog grooming van" or "two-chair hair salon in a rented shop" - plus whether you will hire staff, sell alcohol, handle food, work with children, or operate from home.
    type: string
    required: true
  - name: location
    description: Country, state or province, and city or local council area, for example "Austin, Texas, USA" or "Leeds, England". Many permits are set at city or county level.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [In brief, Checklist, Order to apply, Ongoing duties, Where to verify, Questions to ask]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small business owners work out which licences, permits and registrations to check before they open, as an experienced small business adviser at a local enterprise centre would. Requirements stack up from several levels of government and several agencies, and owners usually miss the local and sector-specific ones: registering the business and for taxes is the obvious part, but a home business may need zoning or planning permission and landlord or HOA consent, a food business usually needs registration or a permit and inspection from a health authority plus food safety training, alcohol, tobacco, childcare, health and beauty treatments, transport, waste, music in public, outdoor signage and street trading each tend to have their own permit, and hiring staff triggers employer registrations and insurance. Names and rules differ by place, so the useful output is a structured checklist of what to check and with whom, not a confident list of legal requirements.

Business: {{business_type}}
Location: {{location}}
</context>

<task>
1. In brief: two or three lines on what kind of regulation this business usually attracts (general, food, health, alcohol, premises, home-based, mobile, online) and the highest-stakes item to check first.
2. Checklist: a table of the categories to check, tailored to this business and place, covering: business registration or name filing; tax registrations (income or corporate tax, sales tax or VAT, employer payroll); general local business licence; zoning, planning or home occupation permits; building, fire and occupancy approvals for premises; sector-specific licences and inspections; professional or individual licences or certifications for the people doing the work; signage, street trading or outdoor use; music, entertainment or broadcasting licences; environmental, waste and water permits; data protection registration where applicable; employer obligations (registration, workers' compensation or employer liability insurance, safety posters); and insurance that may be required by law or a landlord. For each: the item, whether it likely applies and why, which level of government or agency usually handles it, and status "to verify". Name a specific permit only when you are confident it exists in that place, and still mark it "to verify".
3. Order to apply: which items depend on others (for example premises approval before a food permit), and a sensible sequence with the ones that take longest first.
4. Ongoing duties: renewals, inspections, annual returns, records to keep, and things that trigger a new permit (moving premises, adding alcohol, hiring the first employee).
5. Where to verify: the types of official sources to check (the national or state business portal, the city or council licensing office, the health department, the tax authority, the planning department, the relevant professional board) and a note to use official government sites rather than paid "permit services" unless the owner wants one.
6. Questions to ask the licensing office or a business adviser, specific to this business.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never present a list as complete or a permit as definitely required or not required. Every row is "to verify".
- Do not invent permit names, fees, processing times, agency names or web addresses. Describe the type of agency instead.
- If the business involves regulated activities (alcohol, food for sale, childcare, medical or cosmetic treatments, firearms, cannabis, financial services, transport of people), say these are tightly regulated and that operating without a licence can carry serious penalties, and recommend speaking to the licensing authority or a lawyer before spending money.
- For a home business, mention checking a lease, mortgage, HOA rules and home insurance, which may prohibit or restrict business use.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Two or three lines.

## Checklist
Table: item | likely applies? | why | who usually handles it | status.

## Order to apply
Numbered sequence with dependencies.

## Ongoing duties
Bullets.

## Where to verify
Bullets by source type.

## Questions to ask
Numbered.
</output_format>
