---
schema: 1
id: review-non-compete
kind: prompt
title: Review a non-compete clause
description: Reviews a non-compete or other restrictive covenant for scope, duration, geography, pay and enforceability questions, with points to negotiate before signing.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [individual, job-seeker]
subject: [law]
requires: [none]
inputs: [document, text]
output: [report, questions, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [non-compete, restrictive-covenants, non-solicitation, garden-leave, employment-terms]
pairs_with:
  prompts: [review-employment-contract, explain-contract-clause, negotiate-job-offer]
args:
  - name: clause
    description: The full text of the non-compete and any related clauses (non-solicitation, non-dealing, confidentiality, garden leave, definitions they refer to).
    type: text
    required: true
  - name: situation
    description: Your role and seniority, your industry, whether you are about to sign or already bound, why you are asking (new job offer, leaving, starting a business), and what work you want to be free to do.
    type: text
    required: true
  - name: jurisdiction
    description: Country and state or region where you work and whose law the contract names. Enforceability varies enormously.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What the clause stops you doing, Restriction by restriction, Enforceability questions for a lawyer, What to negotiate, Message to the employer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an employee or contractor understand a non-compete or related restrictive covenant. These clauses come in several kinds that are treated differently: a non-compete (not working for a competitor or in a field), non-solicitation of clients or staff (not approaching them), non-dealing (not working with former clients even if they approach you), and confidentiality (which usually survives regardless). Enforceability depends heavily on where you work: some places ban most employee non-competes outright, some require the employer to pay you during the restricted period, some enforce only what is reasonably necessary to protect a legitimate interest such as trade secrets or client connections, and some courts strike an over-broad clause entirely while others cut it down. What drives reasonableness is usually the duration, the geography, the activities covered, the seniority of the person and whether they had real access to confidential information or clients. Clauses often hide their reach in definitions ("Competitor", "Restricted Business", "Relevant Client") and in triggers (applies however the job ends, including if you are dismissed). Negotiating before signing is far easier than challenging a clause later.

Jurisdiction: {{jurisdiction}}

<clause>
{{clause}}
</clause>

<situation>
{{situation}}
</situation>
</context>

<task>
1. Summarise in plain language what the clause stops the person doing, for how long, where, and from when the clock starts, including anything pulled in through definitions.
2. Break it into separate restrictions (non-compete, non-solicit, non-dealing, confidentiality, garden leave) and for each give: what it covers, how broad it is for this person's role, and whether it would block the work they said they want to do.
3. List the enforceability questions that matter in {{jurisdiction}}, framed as questions for a lawyer, not conclusions: whether non-competes are restricted or banned for this kind of worker, pay or notice requirements, income thresholds, and how courts treat over-broad clauses. Mark every legal point "[to verify]".
4. Recommend negotiation points in priority order with fallback wording ideas: shorter duration, narrower definition of competitor or activity, named competitors instead of a whole industry, non-solicit instead of non-compete, payment during the restriction, the clause not applying if they are dismissed without cause, and removal of unnecessary territories.
5. Draft a short, polite message to the employer or recruiter asking for the most important changes, with a one-line reason for each.
6. Say when the person should see an employment lawyer before signing or before taking a new role, and what documents to bring.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never tell the person a clause is unenforceable and safe to ignore; describe the factors and the risk, and send the decision to a lawyer.
- Do not quote statutes, cases, income thresholds or durations as fact; mark them "[to verify]".
- Do not suggest hiding a new job, misleading the employer or taking confidential information.
- Quote the clause's own words when explaining a restriction so the person can check you.
{{> output/uncertainty}}
</constraints>

<output_format>
## What the clause stops you doing
Four to six plain-language lines.

## Restriction by restriction
Table: Restriction | What it covers | Breadth for your role | Blocks your plan?

## Enforceability questions for a lawyer
Numbered questions marked "[to verify]".

## What to negotiate
Numbered asks with fallback positions.

## Message to the employer
The draft, under 180 words.
</output_format>
