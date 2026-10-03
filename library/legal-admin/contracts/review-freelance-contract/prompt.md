---
schema: 1
id: review-freelance-contract
kind: prompt
title: Review a freelance services contract
description: Reviews a freelance or client services contract for scope, payment, IP, liability, termination and non-solicit issues, and lists the questions to raise before signing.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [consultant, founder, writer, designer]
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
level: beginner
tags: [freelancing, statement-of-work, ip-assignment, late-payment, scope-creep]
pairs_with:
  prompts: [redline-contract, draft-simple-agreement, explain-contract-clause]
  workflows: [contract-review-track]
args:
  - name: contract_text
    description: The full contract, statement of work or client terms, with clause numbers and any proposal or schedule it refers to. Remove bank details and ID numbers.
    type: text
    required: true
  - name: your_role
    description: "freelancer: you provide the services. client: you are hiring the freelancer or agency."
    type: enum
    enum: [freelancer, client]
    default: freelancer
output_contract:
  format: markdown
  sections: [The deal in brief, Issue table, What to push on, Missing terms, Questions to raise, Get advice first if]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review freelance and client services contracts the way a seasoned freelance business adviser does, reading from the side of the {{your_role}}. Most freelance disputes come from a few predictable places: a scope that grows without a change process, payment tied to vague "approval", IP that transfers before the invoice is paid, uncapped liability on a small fee, termination that leaves work unpaid, and non-solicit or exclusivity clauses wider than the project. Clients get hurt by the mirror image: no acceptance criteria, IP that never fully transfers, missing confidentiality and a freelancer who can walk away mid-project.
</context>

<task>
Contract:

<contract>
{{contract_text}}
</contract>

1. Summarise the deal: parties, services and deliverables, fee and structure (fixed, day rate, retainer, milestones), timeline, and governing law if stated. List any document the contract relies on that is not included (proposal, SOW, client policies).
2. Check each area below from the {{your_role}}'s side and record what the contract says, quoting the clause:
   - Scope: deliverables, revisions included, change requests and how they are priced, dependencies on the client.
   - Acceptance: criteria, review period, deemed acceptance if the client is silent.
   - Payment: amounts, deposit, invoice timing, payment term in days, late payment interest or fees, expenses, currency and who bears transfer fees, what happens if the project pauses.
   - IP: who owns deliverables, when ownership transfers (on creation or on payment), licence back for portfolio use, pre-existing tools and materials, third-party assets and fonts.
   - Liability and indemnity: caps, exclusions, indemnities each way, insurance requirements, warranties given.
   - Termination: for convenience and for cause, notice, cure period, payment for work done and kill fees.
   - Restrictions: non-solicit, non-compete, exclusivity, confidentiality term, publicity and portfolio rights.
   - Relationship: contractor status, control of how and when work is done, equipment, substitution, which can matter for tax and employment status.
3. Rate each finding green (fair and clear), amber (unclear or somewhat one-sided) or red (high exposure or likely to cause a dispute), with one line on why in practice.
4. For each amber and red item, suggest what to ask for in plain terms, one line each. Put the three most important first under "What to push on".
5. List common protections that are missing for this side.
6. Write questions to raise with the other party, each tied to a clause or a missing term.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote the contract's words with clause numbers for every finding. If a term is not in the text, write "not stated"; never assume a standard term into the contract.
- Do not invent laws, statutory interest rates, notice periods or tax rules. If contractor status or late-payment rules may matter, say what to check and where (a tax authority, a freelancers' union, an accountant or a lawyer).
- Do not say whether to sign. Present what the contract does and what to negotiate.
- Keep the tone practical and short: a freelancer reads this between projects.
- If the contract involves a large fixed fee, an IP assignment of something the business depends on, unlimited liability, or a non-compete, say early that a lawyer should look at it.
{{> output/uncertainty}}
</constraints>

<output_format>
## The deal in brief
Five lines: parties, what is delivered, fee and timing, governing law, missing documents.

## Issue table
Table: area | what it says (clause, short quote) | rating (green / amber / red) | why it matters | what to ask for.

## What to push on
The three most important changes, numbered, each with a one-sentence reason you could say to the other side.

## Missing terms
Bullets, or "None found".

## Questions to raise
Numbered, each tied to a clause or missing term.

## Get advice first if
Bullets naming the specific features of this contract that justify a lawyer or accountant review.
</output_format>
