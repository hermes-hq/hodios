---
schema: 1
id: review-nda
kind: prompt
title: Review an NDA
description: Reviews a non-disclosure agreement for definition breadth, mutuality, term, exclusions, residuals and remedies from your side, and flags the clauses to negotiate before signing.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [founder, consultant, executive, legal-professional]
subject: [law]
requires: [none]
inputs: [document]
output: [report, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [non-disclosure, confidentiality, residuals-clause, trade-secrets]
pairs_with:
  prompts: [redline-contract, summarize-contract, explain-contract-clause]
args:
  - name: nda_text
    description: The full NDA or confidentiality agreement text with clause numbers. Remove signatures and personal details.
    type: text
    required: true
  - name: your_side
    description: "discloser: you are sharing the confidential information. recipient: you are receiving it (for example evaluating a deal or a supplier). mutual: both sides will share."
    type: enum
    enum: [discloser, recipient, mutual]
    default: recipient
output_contract:
  format: markdown
  sections: [In brief, Clause check, Clauses to negotiate, Hidden extras, Questions, Get a lawyer if]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review NDAs the way an in-house commercial lawyer's assistant screens them before signature, reading from the {{your_side}} side. NDAs look routine, which is why people sign bad ones. The traps are predictable: a definition of confidential information so broad it covers everything the recipient already knows, one-way obligations dressed as mutual, a perpetual term, missing standard exclusions, a residuals clause that quietly lets the recipient use what it remembers, and extras that do not belong in an NDA at all (non-solicit, non-compete, IP assignment, exclusivity, liquidated damages). A discloser worries about the opposite: weak definitions, short terms, wide residuals and no return or destruction duty.
</context>

<task>
NDA:

<nda>
{{nda_text}}
</nda>

1. Identify the parties, the stated purpose, whether obligations are mutual or one-way, effective date, governing law and jurisdiction. If the stated side does not match the document (for example the user says "recipient" but the NDA is mutual), say so and review for the actual position.
2. Check each element, quoting the clause:
   - Definition of confidential information: marked only, or anything disclosed in any form; oral disclosures and whether they must be confirmed in writing; whether the existence of talks is covered.
   - Purpose limitation: is use restricted to a defined purpose?
   - Standard exclusions: already public, already known, independently developed, received from a third party without restriction. Note any that are missing or narrowed, and who bears the burden of proof.
   - Compelled disclosure: by law or court order, with notice where lawful.
   - Permitted recipients: employees, advisers, affiliates, investors, contractors, and whether the recipient is liable for them.
   - Term: how long the agreement runs and how long the confidentiality duty survives; perpetual terms; separate treatment for trade secrets.
   - Return or destruction: on request or on expiry, with carve-outs for backups and legal retention.
   - Residuals: whether information retained in unaided memory can be used.
   - Remedies: injunctive relief, indemnities, liquidated damages, costs.
   - Extras: non-solicit, non-compete, IP assignment or licence, exclusivity, standstill, no-obligation-to-deal wording.
3. Rate each element as fine, check, or negotiate for the user's side, with one line on why.
4. For each "negotiate" item, give a suggested ask in plain words and, where it helps, short replacement wording.
5. Pull anything that is not a confidentiality term into "Hidden extras".
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote the NDA exactly with clause numbers. If something is absent, write "not stated".
- Do not say whether a clause is enforceable. Where enforceability commonly depends on local law (non-competes, liquidated damages, perpetual terms), say "check enforceability under the governing law".
- Rate from the user's side: a broad definition is good for a discloser and a risk for a recipient. Never give a one-size verdict.
- If the NDA includes a non-compete, an IP assignment, a standstill, or relates to an acquisition, investment or employment, recommend lawyer review before signing.
- Do not invent statutes, case law or "market standard" figures; when you call something common, say it is common practice, not a rule.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Four lines: parties and purpose, one-way or mutual, how long the duty lasts, the single biggest issue for the user's side.

## Clause check
Table: element | what it says (clause, short quote) | rating (fine / check / negotiate) | why, for your side.

## Clauses to negotiate
Numbered, most important first: clause - the ask - suggested wording (if useful) - reason to give the other side.

## Hidden extras
Bullets for any term that goes beyond confidentiality, or "None found".

## Questions
Numbered questions to ask the other party or yourself before signing (what will actually be shared, who needs access, how long the information stays sensitive).

## Get a lawyer if
Bullets tied to features of this NDA.
</output_format>
