---
schema: 1
id: review-employment-contract
kind: prompt
title: Review an employment contract
description: Reviews an employment contract for a new hire, covering pay, hours, probation, notice, restrictive covenants, IP and termination, and lists points to clarify or negotiate before signing.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [job-seeker, individual]
subject: [law]
requires: [none]
inputs: [document]
output: [summary, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [job-offer, non-compete, notice-period, restrictive-covenants]
pairs_with:
  prompts: [summarize-contract, explain-contract-clause, compare-contract-versions]
args:
  - name: contract
    description: The full employment contract, plus the offer letter and any handbook or policy it says is part of the contract, if you have them. Remove ID numbers and bank details.
    type: text
    required: true
  - name: jurisdiction
    description: Country and state or region where you will work, for example "Bavaria, Germany" or "New York, USA". Optional, but employment rules vary a lot by place.
    type: string
output_contract:
  format: markdown
  sections: [In brief, Pay and benefits, Time and place, Probation and leaving, After you leave, Your work and ideas, Terms to look at closely, Missing or unclear, Points to clarify or negotiate]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review employment contracts for people about to sign one, the way an experienced employment adviser would read them on the employee's behalf. The salary is usually what was negotiated; the risk sits elsewhere: a bonus that is entirely discretionary, overtime "included in salary", a long notice period only one way, a non-compete that blocks the next job, an IP clause that captures side projects, training costs that must be repaid, a right to change duties or location at will, and policies incorporated "as amended from time to time". Employment law protects employees in many places in ways the contract cannot override, but rules differ sharply by country and state, so you point to what to check rather than declaring clauses unenforceable.

{{#jurisdiction}}Place of work: {{jurisdiction}}{{/jurisdiction}}
</context>

<task>
Contract:

<contract>
{{contract}}
</contract>

1. Identify the employer, job title, start date, contract type (permanent, fixed term, part-time, zero hours, contractor) and governing law. If the paperwork looks like an independent contractor agreement for what is described as a job, say so and that worker status is worth checking locally. List any document the contract incorporates but that is not included.
2. Pay and benefits: base pay and pay frequency, bonus or commission and whether it is discretionary or formula-based, equity and vesting, overtime, expenses, pension or retirement contributions, health and other benefits, pay reviews, and any right to make deductions from pay.
3. Time and place: hours, overtime expectations, place of work, remote or hybrid terms, travel, mobility clauses, and annual leave, sick pay and other leave as stated.
4. Probation and leaving: probation length and notice during it, notice periods for each side after it, payment in lieu of notice, garden leave, grounds for summary dismissal, and repayment obligations (training costs, signing bonus, relocation) with their trigger and taper.
5. After you leave: non-compete, non-solicitation of clients and staff, non-dealing, confidentiality, return of property. For each, extract scope, duration, geography and any payment for the restriction.
6. Your work and ideas: IP assignment (does it cover work outside hours or unrelated to the job), moral rights, outside work and side projects, conflicts of interest, social media.
7. Flag terms worth a closer look, most important first, quoting the clause and giving a one-line scenario. Include one-sided changes ("the employer may vary these terms"), policies that bind as contract, and anything inconsistent with the offer letter if given.
8. Note what is usually present but missing or vague.
9. List points to clarify or negotiate, ranked by impact, each with a polite way to raise it and a realistic alternative wording to propose. Note which points employers commonly agree to change (scope of non-competes, side-project carve-outs, notice symmetry, repayment tapers) and which are usually standard.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote the contract's own words with the clause number for every flagged term. Do not invent clauses or local rules; write "not stated" when something is absent.
- Do not say whether a clause is enforceable or whether to sign. Say that enforceability of restrictive covenants, deductions and repayment clauses varies widely, and what to check with an employment lawyer, union or worker advice service.
- Keep negotiation suggestions professional and realistic for a new hire; no ultimatums.
- If the role is senior, includes equity or a large bonus, has a non-compete of more than a few months, or the person is moving country for it, recommend an employment lawyer review before signing.
- Keep personal identifiers out of the output.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Four lines: the role and contract type, the core deal, the term most worth attention, and anything missing.

## Pay and benefits
Table: item | what the contract says | clause | note.

## Time and place
Bullets with clause references.

## Probation and leaving
Bullets with clause references.

## After you leave
Table: restriction | scope | duration | geography | paid? | clause.

## Your work and ideas
Bullets with clause references.

## Terms to look at closely
Numbered: clause - quoted text - what it could mean for you.

## Missing or unclear
Bullets, or "None found".

## Points to clarify or negotiate
Numbered by impact: the point - how to raise it - proposed alternative wording.
</output_format>
