---
schema: 1
id: run-investment-property-due-diligence
kind: prompt
title: Run due diligence on an investment property
description: Builds a due diligence plan for buying a rental property - title, sitting tenancies, condition, compliance, rent evidence and finance - with red flags that should stop or reprice the deal.
category: real-estate
version: 1.0.0
status: incubating
stage: [discover, verify]
role: [individual, founder]
subject: [real-estate]
requires: [none]
inputs: [text, document]
output: [checklist, questions, report]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [buy-to-let, property-investing, due-diligence, sitting-tenants, red-flags]
pairs_with:
  prompts: [analyze-rental-property, check-landlord-obligations, evaluate-renovation-resale-deal]
args:
  - name: deal
    description: The property and deal - type, price, location, whether tenants are in place and on what terms, what the seller and agent have told you, documents seen so far, and how you plan to finance it.
    type: text
    required: true
  - name: country
    description: Country and state or region. Title systems, tenant protections and landlord duties differ a lot.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What could go wrong here, Due diligence checklist, Questions for the seller, Red flags, Findings log]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan due diligence for an investment property the way an experienced investor and their advisers do. The numbers in an investment analysis are only as good as the facts beneath them, and the seller's pack is written to sell. Buying with tenants in place is where most surprises hide: rent quoted may not be rent paid, the tenancy terms may give the tenant stronger rights than you assume, the deposit may not have been handled properly, and arrears or disputes transfer with the property in practice. Physical issues (damp, structure, roof, electrics, drainage) and compliance gaps (safety certificates, licensing, energy standards that block letting) can turn a good yield into a loss. The purpose of diligence is to find the reasons to walk away or reprice before you are committed.

<deal>
{{deal}}
</deal>

Location: {{country}}
</context>

<task>
1. Name the five things most likely to go wrong with this particular deal, given what has been said.
2. Write a due diligence checklist, grouped and marked with who usually does it (buyer, surveyor, lawyer, lender, accountant):
   - Title and legal: ownership, restrictions, rights of way, planning and permits for works, leasehold or association terms where relevant.
   - Existing tenancies: copies of every agreement, rent paid history (bank evidence, not a schedule), deposits and how they are held, notices served, arrears, disputes, what transfers on sale.
   - Physical: survey type appropriate to age and condition, specialist reports to consider.
   - Compliance: safety certificates, licensing, energy ratings and minimum standards, marked `[CHECK locally]`.
   - Rent evidence: achieved rents for comparable homes, independent of the agent.
   - Finance and tax: lender criteria for let property, insurance, how rental income is taxed `[CHECK with accountant]`.
3. Write the questions to send the seller or their agent, numbered, to get answers in writing.
4. List red flags that should stop the deal or change the price, each with what to do if it appears.
5. Provide a findings log template the investor fills in as answers arrive.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state title rules, tenant protections or licensing requirements as fact; mark them for local confirmation with a lawyer or the local authority.
- Do not reassure on facts not yet verified. Treat seller and agent statements as claims until evidenced.
- Do not suggest ways to remove sitting tenants as part of the plan; tenants' rights must be respected and checked locally.
{{> output/uncertainty}}
</constraints>

<output_format>
## What could go wrong here
Five numbered risks specific to the deal.

## Due diligence checklist
Grouped checklist with owner per item.

## Questions for the seller
Numbered questions.

## Red flags
Table: red flag, why it matters, what to do.

## Findings log
Table template: item, evidence received, date, finding, impact on price or decision.
</output_format>
