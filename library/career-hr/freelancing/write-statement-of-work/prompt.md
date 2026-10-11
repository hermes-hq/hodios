---
schema: 1
id: write-statement-of-work
kind: prompt
title: Write a statement of work
description: Writes a freelance statement of work from an agreed proposal - deliverables, acceptance criteria, exclusions, client inputs, milestones, revision limits and how changes are priced.
category: freelancing
version: 1.0.0
status: incubating
stage: [plan, build]
role: [consultant, designer, writer, software-engineer]
requires: [none]
inputs: [text, document, notes]
output: [docs, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sow, scope-definition, acceptance-criteria, change-control, milestones]
pairs_with:
  prompts: [write-freelance-proposal, estimate-freelance-dev-project, write-scope-change-email, review-freelance-contract]
args:
  - name: agreement
    description: The accepted proposal, call notes or email thread describing the work, price, timeline and anything promised. Paste as much as you have.
    type: text
    required: true
  - name: master_terms
    description: Whether this SOW sits under an existing contract or terms of business (and their name), or stands alone. Optional.
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [Gaps to settle first, Statement of work, Change control, Notes for the freelancer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn an agreed freelance deal into a statement of work, the document that says exactly what will be delivered. Most freelance disputes are scope disputes, and they come from the same gaps: deliverables described as activities ("design support") instead of outputs, no acceptance criteria so "done" is a feeling, no list of what is excluded, client inputs and their deadlines missing so the client's delays become the freelancer's, unlimited revisions by omission, and no rule for pricing changes. A good SOW is specific enough that a stranger could check whether each deliverable was met. It usually sits under a master contract or terms of business that hold the legal clauses (liability, IP, termination); the SOW holds the project facts.

Master terms: {{master_terms}}
</context>

<task>
<agreement>
{{agreement}}
</agreement>

1. List gaps to settle first: anything the agreement leaves vague or contradictory (deliverable formats, number of revisions, who provides content, start date, payment trigger). Ask the most important ones as questions; draft the rest with [X] placeholders.
2. Write the SOW with these parts: parties and reference to the master terms; background in two sentences; objectives; deliverables as a numbered list of outputs, each with format and acceptance criteria; exclusions; client responsibilities with dates; timeline with milestones and what the timeline depends on; revision rounds and what counts as a revision versus a change; fees and payment schedule tied to milestones; assumptions; sign-off.
3. Write a change-control section: how a change is requested, how it is estimated, that work starts only after written approval, and how delays in client inputs move dates.
4. Notes for the freelancer: the clauses that belong in the master contract rather than here (IP transfer, liability, termination, late payment) and a reminder to have contract terms checked where money or rights are significant.
</task>

<constraints>
- Use only facts from the agreement. Never invent prices, dates or deliverables; use [X].
- Write deliverables as checkable outputs, not effort ("up to 3 logo concepts as PDF", not "logo exploration").
- Do not draft legal clauses as final legal text; the SOW records project facts and points to the master terms.
- Plain English, short numbered clauses, no legalese.
{{> output/uncertainty}}
</constraints>

<output_format>
## Gaps to settle first
Numbered questions.

## Statement of work
The full document with numbered sections, and a deliverables table: # | deliverable | format | acceptance criteria | due.

## Change control
Numbered clauses.

## Notes for the freelancer
Bullets.
</output_format>
