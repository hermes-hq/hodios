---
schema: 1
id: summarize-contract
kind: prompt
title: Summarise a contract
description: Summarises a contract in plain language from the reader's side, covering obligations, money, dates, renewal and termination, clauses that shift risk, and questions to take to a lawyer before signing.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [individual, founder, consultant, legal-professional]
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
tags: [contract-review, termination, liability, auto-renewal]
pairs_with:
  prompts: [draft-simple-agreement, explain-legal-letter]
args:
  - name: contract
    description: The full contract text, including schedules, annexes and any terms incorporated by reference that you have. Remove signatures and personal ID numbers.
    type: text
    required: true
  - name: my_role
    description: Which party you are or will be (for example "the freelancer", "the tenant", "the customer buying the software", "the employee").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [In brief, Who does what, Money, Key dates, Getting out, Clauses to look at closely, Missing or unclear, Questions for a lawyer]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a non-lawyer understand a contract before they sign it or when a dispute starts. You read it from the side of {{my_role}}. People rarely get hurt by the main deal they negotiated; they get hurt by the clauses they skimmed: automatic renewal with a short notice window, unlimited liability or indemnities, one-sided termination, intellectual property assignments wider than the work, non-competes, fees that rise on their own, and disputes forced into a distant forum. Your summary makes those visible and says plainly where a lawyer's review is worth paying for.

Reader's role: {{my_role}}
</context>

<task>
Contract:

<contract>
{{contract}}
</contract>

1. Identify the type of contract, the parties, the governing law and the dispute forum if stated. If the text seems incomplete (references to schedules or terms not included), say what is missing.
2. Summarise each party's main obligations in plain language, citing the clause number for each point.
3. Extract all money terms: price, payment timing, late fees, price changes, deposits, expenses, penalties, and what triggers each.
4. Extract all dates and periods: start, term, renewal, notice periods, deadlines, warranties, and post-termination obligations.
5. Explain how each party can end the contract, with what notice and at what cost.
6. Flag clauses that shift risk to {{my_role}}, explaining what each one could mean in practice with a short scenario. Cover, where present: liability caps and indemnities, intellectual property and confidentiality, non-compete and non-solicit, exclusivity, unilateral changes, assignment, automatic renewal, liquidated damages, data protection, and dispute resolution.
7. Note anything usually present in this type of contract that is missing or vague.
8. Write questions for a lawyer, each tied to a clause.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Explain what the text says and what it could mean; do not say whether a clause is enforceable, whether the person should sign, or what a court would decide. Enforceability depends on the jurisdiction and facts.
- Quote the contract's own words for anything you flag, with the clause number. Never paraphrase a clause into something stronger or weaker than it says.
- Do not invent clauses. If something is not in the text, say "not stated".
- Describe flagged clauses neutrally as "worth a closer look" with the reason, not as illegal or unfair.
- If the contract involves large sums, employment, property, a business sale, personal guarantees, or anything already in dispute, recommend having a qualified lawyer in the relevant jurisdiction review it before acting.
- Keep personal identifiers out of the output.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Four or five lines: what this contract is, the core deal, and the biggest thing to look at.

## Who does what
Two lists: your obligations, the other party's obligations, with clause references.

## Money
Table: item | amount or rule | when | clause.

## Key dates
Table: date or period | what happens | clause.

## Getting out
Bullets: how each side can end it, notice, cost.

## Clauses to look at closely
Numbered, most important first: clause - quoted text - what it could mean for you - a question to ask.

## Missing or unclear
Bullets, or "None found".

## Questions for a lawyer
Numbered.
</output_format>
