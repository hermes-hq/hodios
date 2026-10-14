---
schema: 1
id: decide-rewrite-or-refactor
kind: prompt
title: Decide whether to rewrite or refactor
description: Decides whether to rewrite a struggling system or improve it in place, testing rewrite claims against risk and feature-freeze cost, and laying out an incremental path.
category: architecture
version: 1.0.0
status: incubating
stage: [plan, design]
role: [tech-lead, engineering-manager, architect, founder]
requires: [none]
inputs: [text, repo, notes]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [legacy-code, technical-debt, strangler-fig, risk-assessment, decision-analysis, modernization]
pairs_with:
  personas: [software-architect, staff-engineer]
  prompts: [plan-incremental-migration, review-codebase-architecture]
args:
  - name: system
    description: What the system does, its age, size, stack, who uses it, and what is wrong with it.
    type: text
    required: true
  - name: proposal
    description: What is being proposed (full rewrite, new stack, partial rewrite) and the reasons given for it.
    type: text
  - name: constraints
    description: Team size, business roadmap pressure, deadlines, and how much feature work can pause.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Claims tested, Hidden costs, Recommended path, Evidence to gather, Stop or switch criteria]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Full rewrites fail more often than they succeed. The old system encodes years of edge cases, bug fixes and integrations that nobody documented; the new one must reach parity while the business keeps asking for features on the old one, so two systems are maintained at once and the finish line moves. Teams usually underestimate data migration and the long tail of behaviour users depend on. The arguments for a rewrite are often about the codebase being unpleasant, which is real but is not a business case. Rewrites are justified when the platform is truly dead (unsupported runtime, no security updates, no hiring pool), when the product is changing so much that little of the old behaviour is needed, or when the system is small enough to rewrite in weeks. Otherwise, incremental replacement wins: put tests and seams around the old system, route a slice of traffic or one capability to new code (the strangler fig approach), and retire old parts piece by piece, delivering value and learning along the way. The decision should rest on evidence: change failure rate, lead time for changes, incident causes, and where defects cluster.
</context>

<task>
<system>
{{system}}
</system>
{{#proposal}}
<proposal>
{{proposal}}
</proposal>
{{/proposal}}
{{#constraints}}
Constraints: {{constraints}}
{{/constraints}}

1. If a repository is available, look at test coverage, size, dependency age, and where recent changes and bugs cluster before judging. State what you checked.
2. List each claim for the rewrite (speed, quality, hiring, performance, stack end of life) and test it against evidence. Separate "unpleasant to work in" from measurable business cost.
3. List what a rewrite must reproduce: features, implicit behaviour, integrations, reports, data and its quirks. Estimate the parity scope roughly and say what is unknown.
4. Estimate the cost of a feature freeze or of running two systems in parallel.
5. Choose rewrite, refactor in place, or incremental replacement, and say what would have to be true for the other options.
6. Lay out the path in shippable phases with the first phase small (for example characterisation tests and one extracted capability).
7. List evidence to gather in the next two weeks and the criteria to stop or switch approach midway.
</task>

<constraints>
- Do not endorse a rewrite on code aesthetics alone.
- Do not invent effort estimates as facts; give ranges with the assumptions.
- Acknowledge cases where a rewrite is right; this is not a reflexive "never rewrite".
- No phase may require a long period with nothing shipped.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
Rewrite, refactor in place, or replace incrementally, with the main reason, in at most five lines.
## Claims tested
Table: claim made for the rewrite, evidence for, evidence against, verdict.
## Hidden costs
What a rewrite would need to reproduce (undocumented behaviour, integrations, data migration) and the feature freeze it implies.
## Recommended path
Numbered phases, each shippable, with the first one small.
## Evidence to gather
Measurements or spikes that would settle open points within two weeks.
## Stop or switch criteria
Signals that would change the decision midway.
</output_format>
