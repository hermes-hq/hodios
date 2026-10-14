---
schema: 1
id: write-architecture-principles
kind: prompt
title: Write architecture principles
description: Writes a short set of architecture principles for an engineering organisation, each with a rationale, implications and a test of when it applies, drawn from real decisions and incidents.
category: architecture
version: 1.0.0
status: incubating
stage: [plan, design]
role: [architect, tech-lead, engineering-manager]
requires: [none]
inputs: [notes, document, text]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [architecture-principles, engineering-strategy, design-review, technical-governance]
pairs_with:
  personas: [software-architect, staff-engineer]
  prompts: [write-adr, write-architecture-fitness-functions, write-code-review-guidelines]
args:
  - name: context
    description: The organisation, its products and stage, and what is going wrong without shared principles, for example "every team picks its own queue", "outages from shared databases".
    type: text
    required: true
  - name: evidence
    description: Recent architecture decisions, ADRs, incidents, post-mortems or recurring review debates the principles should come from. Paste summaries.
    type: text
    required: true
  - name: existing
    description: Any existing principles or standards, to revise rather than replace.
    type: text
output_contract:
  format: markdown
  sections: [Principles, Rejected candidates, How to use them, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Architecture principles are useful when they settle recurring arguments and let teams decide without escalating. Most published lists fail because they are platitudes nobody would argue against ("build for scale", "keep it simple"), so they never change a decision. A good principle is a choice with a credible opposite (for example "we prefer buying commodity capabilities over building them" has a reasonable opposite), comes from the organisation's own evidence, explains its rationale, spells out its implications including costs, and says when it does not apply. Five to ten principles is enough; more and nobody remembers them.
</context>

<task>
<context_of_org>
{{context}}
</context_of_org>

<evidence>
{{evidence}}
</evidence>

{{#existing}}
<existing>
{{existing}}
</existing>
{{/existing}}

1. Extract the recurring decisions and failures from the evidence: debates that keep coming back, incidents with the same root cause, choices teams made inconsistently.
2. Draft candidate principles from them. For each, apply the opposite test: if no sensible team would choose the opposite, it is a platitude; rewrite it as a real choice or drop it.
3. Keep five to ten. For each write: a short imperative statement, the rationale citing the evidence it came from, implications (what teams must do, what it will cost them), exceptions or when it does not apply, and a quick test a reviewer can apply to a design ("does this new service own its data store?").
4. Check the set for conflicts between principles and say which wins or how to resolve the tension.
5. If existing principles were given, mark each as kept, rewritten or retired, with the reason.
6. Describe how the principles are used: referenced in design docs and ADRs, how an exception is requested and recorded, who owns the list and when it is reviewed.
</task>

<constraints>
- Every principle must trace to something in the evidence or be labelled as a proposal without evidence.
- No platitudes; each principle must have a credible opposite.
- No vendor or product names in principle statements; they belong in standards, not principles.
- Plain language; each statement under 15 words.
</constraints>

<output_format>
## Principles
Numbered. Each: statement, rationale (with evidence), implications, exceptions, reviewer test.
## Rejected candidates
Bullets: the candidate and why it was dropped (platitude, no evidence, belongs in a standard).
## How to use them
Short paragraphs: referencing, exceptions, ownership, review cadence.
## Open questions
</output_format>
