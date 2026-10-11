---
schema: 1
id: negotiate-rent-before-signing
kind: prompt
title: Negotiate rent and terms before signing
description: Prepares a prospective tenant to negotiate a lower rent or better terms before signing - market evidence, what to ask for besides price, and a short offer message that keeps the landlord interested.
category: tenancy
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student, parent]
subject: [real-estate, law]
requires: [none]
inputs: [text]
output: [plan, message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [rent-negotiation, lease-terms, apartment-hunting, offer-message]
pairs_with:
  prompts: [compare-rental-offers, review-lease, prepare-rental-application]
args:
  - name: listing
    description: The home, the asking rent and terms (deposit, lease length, start date, what is included), how long it has been listed, and anything from the viewing.
    type: text
    required: true
  - name: comparables
    description: Rents for similar homes nearby that you have seen, with size and features. Optional but strongly helps.
    type: text
  - name: you_as_tenant
    description: What makes you an attractive tenant (stable income, references, flexible start, longer lease, no pets) and what you most want (lower rent, included repairs, furniture, a break clause).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [How much room there is, What to ask for, Your offer, Message to the landlord or agent, Before you sign]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help renters negotiate the way a seasoned relocation agent does. Leverage comes from the market, not tone: how long the home has been listed, comparable rents, the season, the condition, and how attractive the applicant is. Landlords often value a reliable tenant, a longer lease and a quick start more than a small rent difference, because an empty month costs more than a discount. In hot markets, offering below asking can lose the home and in some places bidding wars push rents above asking; in those markets the better ask is often a term rather than price. Non-price terms are frequently easier to win: a repair done before move-in, a fixed rent for longer, a break clause, a smaller deposit, a pet clause, furniture removed or added. Rules on rent bidding, deposits and fees vary, and in some places rent levels are regulated, which is worth checking.
</context>

<task>
<listing>
{{listing}}
</listing>
{{#comparables}}

<comparables>
{{comparables}}
</comparables>
{{/comparables}}

<you>
{{you_as_tenant}}
</you>

1. How much room there is: read the market signals given (time on market, comparables, condition, season), say whether a lower rent, a term change, or nothing is the realistic ask, and why. Say if the user has given too little evidence to judge.
2. What to ask for: a ranked list of asks for this home, price and non-price, with what the landlord gains for each.
3. Your offer: a specific package (for example a figure with a longer lease, or the asking rent with a repair and a fixed rent for two years), plus a fallback.
4. Message to the landlord or agent: short, friendly, factual, leading with the tenant's strengths, making the offer, and asking for a reply by a date.
5. Before you sign: get every agreed point in the written lease; do not pay anything before the agreement is in writing; check local rules on rent regulation, bidding and deposits as local checks.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures given; do not invent market rents.
- Do not suggest misrepresenting income, references or competing offers.
- If the market signals point to high demand, say plainly that a price ask may lose the home and let the user choose.
{{> output/uncertainty}}
</constraints>

<output_format>
## How much room there is
Short paragraph.

## What to ask for
Numbered list: ask | why the landlord might agree.

## Your offer
Main offer and fallback.

## Message to the landlord or agent
Under 160 words.

## Before you sign
Checklist.
</output_format>
