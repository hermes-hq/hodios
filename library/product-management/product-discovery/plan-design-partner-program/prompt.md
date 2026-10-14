---
schema: 1
id: plan-design-partner-program
kind: prompt
title: Plan a design partner programme
description: Plans a design partner programme for a new B2B product with partner criteria, recruiting pitch, give-and-get terms, cadence, feedback capture and exit criteria.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder, product-manager, executive]
requires: [none]
inputs: [text]
output: [plan, message, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [design-partners, b2b-products, early-customers, customer-co-development, pilot-to-paid]
pairs_with:
  prompts: [audit-idea-evidence, structure-paid-pilot, map-buying-committee, write-interview-outreach-messages]
args:
  - name: product
    description: The product you are building, what exists today and what you expect to build over the programme.
    type: text
    required: true
  - name: target_customer
    description: The customer profile you intend to sell to at scale (industry, size, role of user and buyer).
    type: text
    required: true
  - name: partner_count
    description: How many design partners you are aiming for.
    type: number
    default: 5
  - name: duration_months
    description: How long the programme should run in months.
    type: number
    default: 4
output_contract:
  format: markdown
  sections: [Programme goals, Partner criteria, Recruiting pitch, Give and get, Cadence and feedback capture, Exit and conversion, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an advisor who has helped B2B startups and new product teams run design partner programmes. Design partners are a small group of target customers who commit time and real problems while the product is being shaped, in exchange for influence, early access and usually favourable commercial terms. Programmes go wrong in known ways: picking partners because they are friendly or famous rather than representative of the target customer; letting one large partner turn the product into custom work; only hearing from the executive sponsor and never from daily users; giving everything free with no agreed path to paying, so "partner" becomes "free user"; not writing down expectations; and no exit, so weak partners linger. A good programme has clear learning goals, selection criteria, a written give-and-get agreement, a steady cadence, a shared feedback log, and pre-agreed conversion terms.

Target partners: {{partner_count}}
Programme length: {{duration_months}} months
</context>

<task>
Product and current state:

<product>
{{product}}
</product>

Target customer at scale: {{target_customer}}

1. Set programme goals: the three to five things the programme must learn or prove (problem fit, workflow fit, must-have capabilities, integration needs, willingness to pay, a reference case), and how the team will know.
2. Write partner criteria: must-haves (matches the target customer profile, has the problem now with evidence, a named executive sponsor and two or more daily users who will take part, able to share real data or workflows), nice-to-haves, and red flags (wants a custom build, no daily users available, procurement that will take longer than the programme, a direct competitor of another partner). Recommend the mix so no single partner dominates.
3. Write the recruiting pitch: a short email or call script to the sponsor explaining what the programme is, what they get, what it asks of them, the time commitment in hours per month, and how many places there are (truthfully).
4. Set the give and get: what partners get (input into priorities without a guarantee, early access, direct line to the team, a discount or locked price for a set period after launch) and what they give (named participants, sessions at the agreed cadence, real data or test environments, feedback within an agreed time, a case study or reference if successful). Suggest putting it in a short written agreement and having it reviewed by whoever handles contracts, especially for data sharing, confidentiality and ownership of feedback.
5. Plan the cadence and feedback capture: kickoff, a fixed rhythm (for example fortnightly 45-minute working sessions plus a monthly sponsor check-in), usage observation, a shared feedback log tagged by partner and theme, how to decide what to build from it (patterns across partners, not one partner's request), and how to close the loop.
6. Define exit and conversion: milestones that mean the programme succeeded for a partner, the conversion offer agreed in advance (price or discount, start date), what happens if a partner disengages (two missed sessions trigger a conversation), and how to end the programme gracefully.
7. List the main risks for this case and their mitigations.
</task>

<constraints>
- Do not invent prices or discount levels; give a structure with placeholders and the trade-offs of each option.
- Never promise partners specific features or delivery dates; promise influence and transparency.
- Recommend legal review of the agreement rather than drafting binding contract terms; note that data sharing rules differ by country and sector.
- Keep the programme small enough for the team to serve well; if {{partner_count}} is too many for the team or the product's state, say so.
- If the product is not B2B or there is no clear target customer, say design partners may not fit and suggest an alternative (beta group, customer advisory board, co-design sessions).
</constraints>

<output_format>
## Programme goals
Numbered goals with how success is judged.

## Partner criteria
Must-haves, nice-to-haves, red flags, and the recommended mix.

## Recruiting pitch
Ready-to-send email and a short call script.

## Give and get
Two-column table: partner gets | partner gives.

## Cadence and feedback capture
Calendar of sessions and the feedback log fields.

## Exit and conversion
Bullets: success milestones, conversion offer structure, disengagement rule, ending.

## Risks
Table: risk | sign it is happening | mitigation.
</output_format>
