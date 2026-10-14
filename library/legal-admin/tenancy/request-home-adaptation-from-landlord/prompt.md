---
schema: 1
id: request-home-adaptation-from-landlord
kind: prompt
title: Ask your landlord for a disability adaptation
description: Writes a disabled tenant's request to a landlord for an adaptation or a rule change - grab rails, a ramp, a parking space - with who pays, funding routes and how to handle a refusal.
category: tenancy
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, parent]
subject: [law, social-care]
requires: [none]
inputs: [text]
output: [message, checklist, explanation]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [disability, reasonable-adjustments, accessible-housing, adaptations, tenant-requests]
pairs_with:
  prompts: [plan-aging-in-place-modifications, review-lease]
  personas: [tenant-rights-advisor]
args:
  - name: need
    description: What you need and why in practical terms - the adaptation or rule change, how it helps daily life, any assessment or professional recommendation (occupational therapist, doctor), and whether it can be removed later.
    type: text
    required: true
  - name: tenancy
    description: Type of home and landlord (private, social, association-managed building), what the lease says about alterations, and anything already discussed with the landlord.
    type: text
    required: true
  - name: country
    description: Country and state or region. Rules on reasonable adjustments, accommodations or modifications, and on who pays, differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Type of request, Who usually pays, Funding to explore, Request letter, If the landlord refuses]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help disabled tenants, or family members helping them, ask for changes to a rented home the way a disability housing adviser does. Two kinds of request are often treated differently in law: a physical change to the home (a grab rail, a ramp, a stairlift, a level-access shower) and a change to a rule, policy or service (a parking space near the door, permission for an assistance animal, communication in an accessible format, more time to pay at a specific point). In many places landlords must not unreasonably refuse consent to some adaptations, and must make reasonable changes to policies; who pays varies, and for physical works it is often the tenant or a public grant rather than the landlord, sometimes with a duty to restore at the end. Public funding for adaptations often exists through local authorities or social care, usually after an occupational therapy assessment. A specific, practical request with a professional recommendation, a clear plan for the works and an offer to discuss reinstatement is far more likely to be agreed quickly. A tenant should not have to disclose more medical detail than is needed to show the link between the disability and the request.

<need>
{{need}}
</need>

<tenancy>
{{tenancy}}
</tenancy>

Location: {{country}}
</context>

<task>
1. Classify the request: physical adaptation, change to a rule or policy, or both, and why the distinction may matter locally `[CHECK locally]`.
2. Explain in general terms who usually pays and what is typically asked of the tenant (for example contractor standards, insurance, restoring at the end), marked `[CHECK locally]`.
3. List funding and support to explore: an occupational therapy assessment, local authority or social care adaptation grants, charities, and for social landlords their own adaptations budget or process.
4. Draft the request letter: what is requested, how it helps in practice, the professional recommendation if any, who will do and pay for the works, an offer to discuss details and reinstatement, a request for a written reply within a reasonable time. Under 250 words, with [BRACKETS] for gaps. Share only the medical detail the user chose to give.
5. If the landlord refuses or does not reply: ask for reasons in writing, offer alternatives, and contact a disability rights, equality or tenant advice service; mention any formal complaint routes to check locally.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state legal duties, grant eligibility or amounts as fact; mark them `[CHECK locally]`.
- Do not add medical details the user did not give, and suggest disclosing only what links the disability to the request.
- Use respectful, plain language; no pity framing.
{{> output/uncertainty}}
</constraints>

<output_format>
## Type of request
Two or three lines.

## Who usually pays
Bullets marked as checks.

## Funding to explore
Bullets.

## Request letter
The draft.

## If the landlord refuses
Numbered steps.
</output_format>
