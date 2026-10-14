---
schema: 1
id: write-expression-of-interest
kind: prompt
title: Write an expression of interest
description: Writes an expression of interest for a tender, framework, partnership or project call, showing fit with the stated requirements, capability, relevant evidence and contact, within the call's limits.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [founder, sales-rep, consultant, manager]
requires: [none]
inputs: [document, text, notes]
output: [docs, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [expression-of-interest, pre-qualification, bid-writing, partnership-call, capability-statement]
pairs_with:
  prompts: [respond-to-rfp, write-professional-bio, write-letter-of-support]
args:
  - name: call
    description: The call or notice text, including what is sought, eligibility, the questions or headings, word or page limits, and the deadline. Paste it.
    type: text
    required: true
  - name: our_organisation
    description: Who you are and why you fit, such as size, services, relevant past projects with results, accreditations, team, partners and locations.
    type: text
    required: true
  - name: angle
    description: Anything specific you want to stress or a partner you would bring in. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Expression of interest, Fit check, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An expression of interest (EOI) is a short first-stage submission used to build a shortlist for a tender, framework, partnership or funded project. Evaluators often score EOIs quickly against eligibility and a few criteria, so bids are lost on basics: missing a mandatory requirement, ignoring the headings or word limits, generic capability text that could be about any firm, and claims without evidence. Experienced bid writers mirror the call's language and order, answer each criterion with a specific example (what, for whom, result), state eligibility explicitly, keep within limits, and say why this organisation, now, in a few lines. If the call has a required form, the form's questions rule.
</context>

<task>
Write an expression of interest.

<call>
{{call}}
</call>

<our_organisation>
{{our_organisation}}
</our_organisation>
{{#angle}}Angle to stress: {{angle}}{{/angle}}

1. If the call text is missing, ask for it in one short message and stop.
2. Extract the call's requirements: eligibility, mandatory items, criteria, headings or questions, limits and deadline.
3. Run a fit check: for each requirement, whether the organisation meets it from the information given (yes, partly, no, unknown). If a mandatory eligibility requirement is clearly not met, say so before drafting and recommend not applying or finding a partner, then draft only if it still makes sense.
4. Draft the EOI using the call's headings in order, or if none: introduction and interest, understanding of the need, relevant capability and experience, proposed approach in outline, team or partners, eligibility confirmations, contact.
5. Back every capability claim with a specific example from the organisation's information. Where none exists, write `[ADD: example]` rather than a generic claim.
6. Keep to the word or page limits; state the word count per section if limits apply.
</task>

<constraints>
- Use only the information given. Never invent projects, clients, results, accreditations, staff or partners.
- Mirror the call's terms where accurate, but do not claim to meet requirements the organisation does not meet.
- Plain, confident language; no unsupported superlatives ("leading", "world-class").
- Respect every stated limit.
</constraints>

<output_format>
## Expression of interest
The submission text under the call's headings.
## Fit check
Table: Requirement · Mandatory? · Met? · Evidence or gap.
## Gaps to fill
Each `[ADD: …]` or `[NEEDED: …]`, plus attachments the call asks for. "None" if none.
</output_format>
