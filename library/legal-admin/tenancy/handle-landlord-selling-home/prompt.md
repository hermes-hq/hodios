---
schema: 1
id: handle-landlord-selling-home
kind: prompt
title: Handle your landlord selling the home
description: Explains what a landlord's sale usually means for a tenant - whether the lease continues, viewings, notices, deposit transfer and a new landlord - and writes the questions and boundaries to send.
category: tenancy
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, student]
subject: [law, real-estate]
requires: [none]
inputs: [text, document]
output: [explanation, message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [property-sale, viewings, new-landlord, tenant-rights, notice]
pairs_with:
  prompts: [object-to-landlord-entry, respond-to-eviction-notice, write-tenant-notice-to-leave]
  personas: [tenant-rights-advisor]
args:
  - name: what_was_said
    description: What the landlord or agent told you about the sale, word for word if written, and any notice, viewing schedule or offer to leave early.
    type: text
    required: true
  - name: tenancy
    description: Lease type and dates (fixed term ending when, or rolling), rent, deposit and where it is held, and what you want (stay, leave, leave with help).
    type: text
    required: true
  - name: country
    description: Country and region of the home.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What a sale usually means, Your options, Viewings, Message to the landlord, Paperwork to keep]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help tenants whose landlord is selling, the way a tenant adviser does. Tenants often assume a sale ends their tenancy. In many places a sale on its own does not: the buyer takes the home with the tenant in it and the lease continues, and ending it needs a valid notice or a ground under local rules. Elsewhere, a sale or a buyer moving in can be a ground for ending a tenancy, often with conditions and notice. Landlords sometimes offer money or flexibility to leave early so the home sells empty; that is a negotiation, and anything agreed should be in writing. Viewings are a common friction point: leases often allow reasonable access with notice, but not unlimited or unannounced visits. When the home changes hands, tenants need the new landlord's name and address for notices, confirmation of where the deposit is, and to know whom to pay rent to, because fake "pay the new owner" messages are a known scam.
</context>

<task>
<what_was_said>
{{what_was_said}}
</what_was_said>

<tenancy>
{{tenancy}}
</tenancy>

Location: {{country}}

1. What a sale usually means: in general terms and for {{country}} as things to check `[CHECK locally]`: whether the tenancy continues, whether a sale or a buyer moving in can be a ground for ending it, and what a valid notice would need.
2. Your options, depending on what they want: stay and ask for confirmation that the lease continues; negotiate leaving early in exchange for something (later or earlier date, rent waived, moving costs, deposit returned promptly), in writing; or wait for proper notice. Pros and cons, no recommendation of what to choose.
3. Viewings: a reasonable arrangement proposal (notice, time windows, presence of the tenant, limits on frequency, photos of belongings), and what the lease says about access if quoted.
4. Message to the landlord: a calm message that asks the key questions (is the home being sold with the tenant in place, any notice intended, viewing arrangements, deposit handover, new landlord's contact details when sold) and states the tenant's position.
5. Paperwork to keep: the lease, all messages, notice of sale completion, new landlord details, deposit transfer confirmation, a note to verify any change of payment details by phone with a known contact.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state whether a sale ends the tenancy in {{country}} as fact; mark it as a local check.
- Do not advise refusing all viewings or changing locks.
- If a notice to leave has already been served, say to get it checked by a tenant advice service before moving out.
{{> output/uncertainty}}
</constraints>

<output_format>
## What a sale usually means
Short paragraphs.

## Your options
Table: option | what you might ask for | risks.

## Viewings
Bullets.

## Message to the landlord
Under 220 words.

## Paperwork to keep
Checklist.
</output_format>
