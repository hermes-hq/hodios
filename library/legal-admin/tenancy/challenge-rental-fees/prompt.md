---
schema: 1
id: challenge-rental-fees
kind: prompt
title: Challenge unfair rental fees
description: Checks fees a landlord or letting agent charged or demanded - application, admin, holding deposit, renewal, cleaning - against what you agreed and local rules, and writes the refund request.
category: tenancy
version: 1.0.0
status: incubating
stage: [review]
role: [individual, student]
subject: [law, real-estate]
requires: [none]
inputs: [text, document]
output: [report, message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [letting-agent-fees, holding-deposit, refund-request, junk-fees]
pairs_with:
  prompts: [review-lease, prepare-rental-application, demand-deposit-return]
args:
  - name: fees
    description: Each fee - name, amount, when it was asked for or taken, what it was said to be for, and whether it was in the listing or the lease. Paste the agent's message or invoice if you have it.
    type: text
    required: true
  - name: what_happened
    description: The stage you are at (applying, signed, mid-tenancy, renewing, leaving), and anything relevant, such as the landlord pulling out after you paid a holding deposit.
    type: text
    required: true
  - name: country
    description: Country, state or city of the rental. Fee rules vary widely.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Fee by fee, Rules to check, Refund request, If they refuse]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help tenants deal with letting fees the way a renters' advice worker does. Fee rules vary more than almost any other rental rule: some countries and cities ban most fees charged to tenants, cap holding deposits and set when they must be returned; others allow application or screening fees within limits; others leave fees to the contract. Common problems are fees not disclosed in the listing, "admin" or "reference" fees that duplicate rent, holding deposits kept when the landlord changed their mind, renewal fees for a tenancy that rolls on anyway, professional cleaning charges required regardless of condition, and fees for things the landlord must provide. A refund request is stronger when it identifies each fee, when it was disclosed, and the rule or agreement relied on, and gives a deadline.
</context>

<task>
<fees>
{{fees}}
</fees>

<what_happened>
{{what_happened}}
</what_happened>

Location: {{country}}

1. Fee by fee: what it was for, when it was disclosed, whether it appears in what the tenant signed, and a status of questionable, likely fine or unclear, with reasons.
2. Rules to check: the types of rules commonly found for {{country}} (fee bans, caps, holding deposit return rules, disclosure duties), each marked `[CHECK locally]`, and where to check (the official housing or consumer authority website, a tenant advice service).
3. Refund request: a short, polite and firm letter listing each fee contested, the amount, the reason, and a deadline for repayment, asking for a written breakdown of any fee they keep.
4. If they refuse: routes to check locally (trading standards or consumer authority, a redress or ombudsman scheme for agents, a tribunal or small claims), and how to keep evidence.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never say a fee is illegal as fact; say it may breach a rule to check and why.
- Do not invent fee caps, schemes or authorities.
- If the tenant is still applying and needs the home, mention that challenging a fee can affect the application and let them decide the timing.
{{> output/uncertainty}}
</constraints>

<output_format>
## Fee by fee
Table: fee | amount | disclosed? | status | why.

## Rules to check
Bullets.

## Refund request
Under 220 words, with [BRACKETS].

## If they refuse
Numbered routes.
</output_format>
