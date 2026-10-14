---
schema: 1
id: build-job-map
kind: prompt
title: Build a job map
description: Builds a job map of the steps a customer goes through to get a job done, with desired outcome statements per step and where today's solutions fail.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover, design]
role: [product-manager, designer, ux-researcher, founder]
requires: [none]
inputs: [text, notes, transcript]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [jobs-to-be-done, job-map, outcome-statements, outcome-driven-innovation, unmet-needs]
pairs_with:
  prompts: [define-jobs-to-be-done, run-opportunity-scoring, map-current-alternatives, build-user-journey-map]
args:
  - name: core_job
    description: The job the customer is trying to get done, as you understand it (for example "plan weekly meals for a family", "close the monthly books").
    type: text
    required: true
  - name: job_executor
    description: Who does the job (the person executing it, not the buyer).
    type: string
    required: true
  - name: evidence
    description: Interview notes, observations or research about how people do the job today. Without it the map is a hypothesis.
    type: text
output_contract:
  format: markdown
  sections: [Job definition, Job map, Outcome statements, Where solutions fail, Next research]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a jobs-to-be-done practitioner using the job mapping approach from outcome-driven innovation. A job map breaks the core functional job into the steps any executor goes through regardless of the solution they use, usually following a universal pattern: define (plan and set goals), locate (gather inputs and information), prepare (set up), confirm (check readiness), execute, monitor, modify (adjust when things go wrong) and conclude (finish and wrap up), with some steps not applying to every job. The map describes what the executor is trying to get done, not what they do in a product: "click export" is a solution step; "share results with stakeholders" is a job step. For each step, desired outcomes are the measures the executor uses to judge success, written in a consistent form: a direction (minimise), a metric (the time it takes, the likelihood), an object (to find a supplier who can deliver) and a clarifier (when the original supplier fails). Teams new to this put solutions, features or emotions into the map; the discipline is keeping it solution-free and stable over time.

Job executor: {{job_executor}}
</context>

<task>
Core job:

<core_job>
{{core_job}}
</core_job>

{{#evidence}}Evidence:

<evidence>
{{evidence}}
</evidence>{{/evidence}}

1. Define the job: restate the core functional job as verb + object + optional clarifier, solution-free and at the right level (not so broad it covers a whole life, not so narrow it names a product task). Name the job executor and, if different, the buyer and any related jobs (before and after) that are out of scope.
2. Build the job map: 8 to 12 steps in order using the universal pattern as a guide, each phrased as a verb plus object that would still hold if today's tools disappeared. Note steps that do not apply.
3. For each step, write 3 to 6 desired outcome statements in the form "Minimise the time it takes to..." or "Minimise the likelihood that...", each solution-free, measurable in principle and specific to the step. Mark each statement as grounded in the evidence (quote or note) or as a hypothesis.
4. Identify where today's solutions fail: steps where the evidence shows workarounds, delays, errors, extra people or tools, or emotional strain, and which outcome statements those failures relate to.
5. Suggest next research: which steps lack evidence, observation or interview questions to fill them, and whether the outcomes are ready for importance and satisfaction scoring.
</task>

<constraints>
- No product names, features, technologies or solution actions in job steps or outcome statements; rewrite any that slip in.
- Do not invent evidence. Without evidence, label the whole map a hypothesis to validate and keep the outcome lists shorter.
- Keep outcome statements to one metric each; split compound statements.
- Emotional and social jobs can be listed under the job definition but are not job map steps.
- If the core job given is a solution ("use a CRM") or a feature, reframe it to the underlying job and say so.
</constraints>

<output_format>
## Job definition
Core job, executor, buyer if different, related jobs out of scope.

## Job map
Numbered steps with one-line descriptions.

## Outcome statements
Per step: a list of outcome statements, each tagged grounded or hypothesis.

## Where solutions fail
Table: step | failure observed | workaround | related outcome.

## Next research
Bullets.
</output_format>
