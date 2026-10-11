---
schema: 1
id: resolve-conflicting-stakeholder-priorities
kind: prompt
title: Resolve conflicting stakeholder priorities
description: Prepares a decision paper when two leaders want conflicting roadmap priorities, framing the options, trade-offs and evidence fairly, with a recommendation and the decision to escalate.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, engineering-manager, project-manager, executive]
requires: [none]
inputs: [text, notes, document]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [stakeholder-conflict, decision-paper, escalation, trade-offs, decision-rights]
pairs_with:
  prompts: [plan-stakeholder-alignment, push-back-on-roadmap-request, compare-roadmap-scenarios, write-roadmap-update]
args:
  - name: conflict
    description: Who wants what (for example the sales VP wants enterprise features, the CPO wants self-serve onboarding), their stated reasons, and what you have heard of their underlying concerns.
    type: text
    required: true
  - name: facts
    description: The evidence available - customer data, revenue, goals, capacity, sizes, deadlines - and what each option would displace.
    type: text
    required: true
  - name: decider
    description: Optional. Who has authority to decide, if known, and the decision deadline.
    type: string
output_contract:
  format: markdown
  sections: [The decision needed, What each side wants and why, Options, Trade-offs, Recommendation, Ask of the decider]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a product manager caught between two leaders who want incompatible things from the same roadmap. Trying to satisfy both usually means splitting capacity so neither goal is met, and quietly picking a side damages trust with the other. The way out is a short, fair decision paper: state each position in terms its owner would recognise, find the underlying concern (a revenue target, a churn problem, a board promise), look for options beyond the two positions (sequencing, a smaller slice of each, a time-boxed test), show the trade-offs with evidence, recommend one, and take the decision to the person with authority to make it. The product manager's job is to make the trade-off clear, not to absorb it.
{{#decider}}
Decider and deadline: {{decider}}
{{/decider}}
</context>

<task>
The conflict:

<conflict>
{{conflict}}
</conflict>

The facts:

<facts>
{{facts}}
</facts>

1. State the decision needed in one sentence, framed as a choice about the roadmap rather than about people.
2. Describe each side's position and the underlying concern behind it, in fair language both would accept. Note where the concerns are compatible.
3. Lay out three or four options: each side's preference, and at least one alternative such as sequencing, a reduced version of each, or a time-boxed test that settles the disagreement with data.
4. Compare options on outcomes, evidence, cost in capacity, what is displaced, and risks, using only the facts given.
5. Recommend one option with reasons, keeping the recommendation separate so readers can disagree.
6. Write the ask of the decider: the decision, by when, and what happens by default if no decision is made. If no decider is known, say who should decide and how to get it there.
</task>

<constraints>
- Represent both sides fairly; never caricature one to favour the other.
- Use only the evidence given; mark gaps and say how they could be filled quickly.
- Do not recommend splitting capacity evenly as a compromise unless the facts show both halves still deliver something useful.
- Keep the paper to about one page; it is for a busy decider.
{{> output/uncertainty}}
</constraints>

<output_format>
## The decision needed
One sentence.

## What each side wants and why
Two short paragraphs.

## Options
Numbered list with one-line descriptions.

## Trade-offs
Table: option | outcome | evidence | capacity | displaces | risks.

## Recommendation
Short paragraph.

## Ask of the decider
Decision, deadline, default if undecided.
</output_format>
