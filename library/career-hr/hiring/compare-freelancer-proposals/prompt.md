---
schema: 1
id: compare-freelancer-proposals
kind: prompt
title: Compare freelancer proposals
description: Compares the proposals or quotes freelancers sent for one project on understanding of the brief, evidence of similar work, price and what it covers, timeline and risk, with follow-up questions.
category: hiring
version: 1.0.0
status: incubating
stage: [review]
role: [founder, manager, operations-manager, marketer]
requires: [none]
inputs: [document, text, spec]
output: [table, report, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [freelance-marketplace, proposal-comparison, hiring-a-freelancer, quote-comparison, vendor-selection]
pairs_with:
  prompts: [write-freelance-job-posting]
args:
  - name: project
    description: The project brief or post you published, with budget and deadline.
    type: text
    required: true
  - name: proposals
    description: The proposals or quotes received, pasted one after another with a label for each (for example the freelancer's first name or "Proposal A"), including price, timeline and any portfolio notes.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Comparison, Shortlist, Red flags, Questions to ask, Before you hire]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help clients choose between freelancers. The cheapest bid often becomes the most expensive project, and the most polished proposal is sometimes a template. The proposals that predict a good result show that the freelancer read the brief (they restate the problem in their own words, ask a sharp question or point out a risk), give evidence of similar work and their role in it, explain what the price covers (deliverables, revisions, what is extra), and propose a realistic timeline with milestones. Comparing price only works once you know what each price includes; a cheap quote that excludes revisions or content may cost more in the end.

<project>
{{project}}
</project>

<proposals>
{{proposals}}
</proposals>
</context>

<task>
1. Comparison: score each proposal 1-4 on understanding of the brief, relevant evidence, clarity of scope and price, realism of timeline, and communication quality, with a one-line reason per score drawn from the proposal text. Normalise the prices: what each includes and excludes, and the likely total once gaps are filled.
2. Shortlist: the two or three to talk to and why, and the ones to decline.
3. Red flags: per proposal, any warning signs (generic template, no reference to the brief, price far below others without explanation, vague timeline, asks to move off-platform or for full payment up front, claims that cannot be checked).
4. Questions to ask: for each shortlisted freelancer, three questions that test the gaps in their proposal.
5. Before you hire: a checklist covering a short call, checking past work and reviews, a written scope with milestones and payment tied to deliverables, revisions, file and IP ownership, and a small paid first milestone if the project is large.
</task>

<constraints>
- Base every score on what the proposal says; quote or point to the text and do not assume skills not shown.
- Do not invent market rates; compare prices only against each other and the stated budget.
- Do not judge freelancers on nationality, location, name, age or English accent; written clarity counts only where the project needs it.
- If the proposals are too thin to compare, say so and list what to ask for.
</constraints>

<output_format>
## Comparison
Table: Proposal | Brief | Evidence | Scope and price | Timeline | Communication | Likely total.
## Shortlist
## Red flags
## Questions to ask
## Before you hire
</output_format>
