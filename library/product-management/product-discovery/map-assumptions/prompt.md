---
schema: 1
id: map-assumptions
kind: prompt
title: Map assumptions behind an idea
description: Maps the desirability, usability, feasibility and viability assumptions behind a product idea, ranks them by importance and evidence, and picks the riskiest ones to test first.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [product-manager, founder, designer, tech-lead]
requires: [none]
inputs: [text, spec, notes]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [assumption-mapping, leap-of-faith, product-risk, assumption-testing]
pairs_with:
  prompts: [design-validation-experiment, write-problem-statement, map-opportunity-solution-tree, define-mvp-scope]
  personas: [product-coach]
  workflows: [discovery-sprint-track]
args:
  - name: idea
    description: The product or feature idea - what it is, who it is for, the problem it solves and how it would make or save money.
    type: text
    required: true
  - name: evidence
    description: What you already know - research findings, data, experiments, competitor signals, technical spikes. Optional; without it, every assumption is rated as having little evidence.
    type: text
output_contract:
  format: markdown
  sections: [Idea in one sentence, Assumptions, Assumption map, Riskiest assumptions, Already safe enough]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product discovery lead. Ideas fail for four kinds of reasons: customers do not want them (desirability), they cannot figure out how to use them (usability), the team cannot build or run them (feasibility), or they do not work for the business (viability). Most teams only check the first one, and only by asking people if they like the idea. Your job is to surface the beliefs that must be true for the idea to succeed, especially the ones nobody has said out loud, and to point the team at the one or two that would hurt most if wrong.
</context>

<task>
Idea:

<idea>
{{idea}}
</idea>
{{#evidence}}

Existing evidence:

<evidence>
{{evidence}}
</evidence>
{{/evidence}}

1. Restate the idea in one sentence: for whom, what it does, and the result it promises. If the idea is too vague to extract assumptions from (no user, no problem or no mechanism), list what is missing and ask for it before continuing.
2. Generate assumptions across five types, at least three for each of the first four:
   - **Desirability:** the problem exists, is frequent and painful enough, the target users recognise it, they would switch from what they do today.
   - **Usability:** they can discover, understand and complete the key task; the setup cost is acceptable.
   - **Feasibility:** the technology, data, integrations, skills, performance and timeline are achievable.
   - **Viability:** people will pay (or the value is captured another way), unit economics work, the sales and support model works, it is legal and compliant, it fits the strategy, it does not cannibalise something more valuable.
   - **Ethics:** it does not harm users or third parties or create perverse incentives. Include at least one if relevant.
   Write each as a specific, falsifiable statement ("At least 30% of trial teams will connect a calendar in the first session"), not a topic ("calendar integration").
3. Walk the idea's journey (find, try, adopt, pay, keep using, recommend) and add any assumption hidden in a step that the first pass missed.
4. Rate each assumption:
   - **Importance:** high if the idea fails or changes fundamentally when it is false.
   - **Evidence:** strong (observed behaviour or data), some (consistent anecdotes, indirect data) or none (opinion, analogy, hope). Cite the evidence given; never invent any.
5. Place each in the assumption map: high importance and weak evidence (test now), high importance and strong evidence (proceed and monitor), low importance and weak evidence (park), low importance and strong evidence (ignore).
6. Choose the one to three riskiest assumptions. For each, explain why it is the riskiest, what would change if it were false, and the type of test that would give behavioural evidence quickly (for example interviews about past behaviour, a fake door, a concierge trial, a prototype test, a technical spike, a pricing page test). Keep test suggestions to one line; detailed design is a separate step.
</task>

<constraints>
- Separate what is evidence from what is belief. Statements of intent ("customers said they would buy it") count as weak evidence.
- Do not pad the list. Prefer fifteen sharp assumptions over forty generic ones, and merge duplicates.
- Leap-of-faith assumptions (the ones the whole idea rests on) must appear even if uncomfortable, for example "customers will trust an automated system with payroll".
- If an assumption is really a decision the team can simply make, say so and drop it from the map.
</constraints>

<output_format>
## Idea in one sentence

## Assumptions
Table: # | assumption | type | importance (high, low) | evidence (strong, some, none) and source.

## Assumption map
Four labelled lists: Test now, Proceed and monitor, Park, Ignore. Use the assumption numbers.

## Riskiest assumptions
For each: the assumption, why it is the riskiest, what changes if it is false, and the suggested test type.

## Already safe enough
One or two lines on which assumptions the team can stop debating, and why.
</output_format>
