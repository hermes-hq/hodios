---
schema: 1
id: write-design-doc
kind: prompt
title: Write an engineering design doc
description: Writes an engineering design doc or RFC with context, goals and non-goals, options and trade-offs, the decision, risks and a rollout plan. Use before building a change that needs review or buy-in.
category: architecture
version: 1.1.0
status: experimental
aliases: [write-rfc]
stage: [design, plan]
role: [software-engineer, tech-lead, architect]
stack: []
requires: [none]
inputs: [spec, notes, text]
output: [docs, diagram]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [rfc, design-doc, trade-offs, rollout, proposal]
pairs_with:
  personas: [software-architect]
args:
  - name: problem
    description: The problem to solve and why now, with any data you have (incidents, load, customer requests, cost).
    type: text
    required: true
  - name: constraints
    description: Hard limits such as deadline, budget, team size, technologies that must or must not be used, compliance, compatibility.
    type: text
  - name: options
    description: Approaches already on the table, and any preference with its reason.
    type: text
  - name: template
    description: Your organisation's design doc or RFC template, if it has one. Its headings replace the default ones.
    type: text
output_contract:
  format: markdown
  sections: [Design doc, Open questions for the author]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.1.0, note: "Absorbs write-rfc: your organisation's template, the author's proposal kept with flaws raised openly, open questions addressed to owners, and a ten-minute reading target."}
  - {version: 1.0.0, note: "First version."}
---
<context>
A design doc exists to get the right decision made before code is written, and to record why. Reviewers need to see the problem with evidence, what is deliberately out of scope, at least two real options compared on the same criteria, and how the change will be rolled out and undone. Docs fail when they argue for a conclusion chosen in advance, when the alternatives are straw men, when numbers are invented, or when rollout and failure modes are left for later.
</context>

<task>
Write a design doc for:
{{problem}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
{{#options}}Options on the table: {{options}}{{/options}}
{{#template}}
Use this template's headings and fill each one:
{{template}}
{{/template}}

1. Before writing, check you have: who is affected and how much, the requirements that drive the design (scale, latency, consistency, availability, security, cost), and the deadline. If any of these would change the recommendation and is missing, ask up to five questions. If the user wants a draft anyway, write it with clearly marked assumptions.
2. Context: the current system and the problem, with the evidence given (incidents, metrics, user reports, cost), quoted as given. If there is no evidence, write the problem as an assumption and ask for data. No invented metrics; where a number is needed and missing, write `TBD: <what to measure>`.
3. Goals as verifiable statements ("p95 checkout latency under 300 ms at 2x current peak"), and non-goals that a reader might otherwise assume are included.
4. Options: at least two real alternatives plus "do nothing or the minimal change", each described well enough to be chosen, with its strongest honest case. Compare them in one table against the drivers from step 1, plus build cost, operating cost, reversibility and team familiarity.
5. Decision: the recommended option, why it wins on the drivers that matter most, and what was given up. If the author brought a proposal, it stays the subject of the doc: do not quietly design something else, and if another option scores better, say so plainly here and under Risks.
6. Detailed design of the recommendation: components and responsibilities, data model and ownership, API or interface changes, key flows (a sequence diagram in Mermaid where it helps), failure modes and how each is handled, security and privacy, and observability (what is measured and alerted).
7. Rollout and rollback: phases, feature flags or traffic shifting, data migration with backfill and verification, the rollback at each phase, and the signal that allows moving on.
8. Risks and drawbacks of the recommendation with likelihood, impact and mitigation; then open questions, each addressed to the person or team who can answer it, or an owner placeholder.
</task>

<constraints>
- Present options fairly. If the user prefers one, test it against the same criteria as the others, and say plainly if another option scores better.
- Keep the doc as short as the decision allows: a reviewer should be able to read it in about 10 minutes. Cut background that does not change the decision. Use tables and lists for comparisons, prose for reasoning.
- Never invent numbers, incidents, costs, team names or deadlines.
- Mark every assumption and every figure not supplied by the user.
{{> output/uncertainty}}
</constraints>

<output_format>
## Design doc
Markdown with these headings, or the template's when one is given: Title, Status (Draft), Summary (3 sentences), Context, Goals, Non-goals, Options considered (with comparison table), Decision, Detailed design, Rollout and rollback, Risks, Open questions.
## Open questions for the author
Questions the author must answer and data the author must supply before review, and every TBD and assumption in the doc.
</output_format>
