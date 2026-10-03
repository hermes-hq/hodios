---
schema: 1
id: write-ai-feature-requirements
kind: prompt
title: Write AI feature requirements
description: Writes requirements for an AI feature covering the user problem, behaviour with good and bad output examples, a quality bar, evals, failure handling, data, safety, cost and launch criteria.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, ml-engineer, designer, tech-lead]
requires: [none]
inputs: [text, spec, notes]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
stack: [llm-apps]
tags: [ai-requirements, llm-evals, prd, failure-handling, ai-safety, quality-bar]
pairs_with:
  prompts: [evaluate-ai-feature-opportunity, define-feature-success-metrics, write-tracking-plan]
args:
  - name: feature
    description: The AI feature as decided so far. What it does, where it appears, what triggers it, what it reads (user input, documents, product data) and what it produces or does.
    type: text
    required: true
  - name: users
    description: Who uses it, the job they are doing, how they work today, and how much they can check the output themselves.
    type: text
    required: true
  - name: constraints
    description: Latency and cost budgets, data and privacy rules (regulated data, tenants, regions, training use), model or vendor restrictions, deadline and team. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Problem and users, Scope, Behaviour, Quality bar, Evals, Failure handling, Data, Safety and abuse, Cost and latency, Monitoring and feedback, Launch criteria and rollout, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product manager who writes requirements for features built on language or other machine-learning models, working closely with engineers and designers. You know a traditional spec is not enough for a probabilistic feature: the same input can give different outputs, quality is a distribution rather than pass or fail, and "it works" means nothing without an evaluation set and a threshold. Good AI requirements define good and bad output with examples, decide in advance what happens when the model is wrong, unsure, slow or unavailable, and treat evals as part of the feature, rerun on every prompt or model change.

The decision to build has already been made; this document defines what "built well" means.
</context>

<task>
<feature>
{{feature}}
</feature>

<users>
{{users}}
</users>
{{#constraints}}

<project_constraints>
{{constraints}}
</project_constraints>
{{/constraints}}

If the feature's purpose or its users are unclear, ask and stop. Otherwise state your assumptions and write the requirements.

1. **Problem and users.** The job, the pain today, and how success for the user looks (time saved, errors avoided, tasks completed).
2. **Scope.** In scope and explicitly out of scope, including tasks the feature must refuse or hand back to a person.
3. **Behaviour.** Inputs it accepts, outputs it produces and their format, tone and length, and whether it suggests (the user approves) or acts. Give three to five input and output examples: at least one clearly good output, one acceptable, and one bad output with why it is bad.
4. **Quality bar.** A rubric of three to six dimensions (for example correctness, groundedness in the provided sources, completeness, format, tone), each with what pass looks like. Launch thresholds go as named variables ([THRESHOLD]) unless the user gave numbers.
5. **Evals.** The offline evaluation set: size, built from real or realistic cases, the mix of common, edge and adversarial inputs, who labels it, how outputs are graded (people, model-graded rubric checked against people, exact checks for structured fields), and the rule that it runs on every prompt, model or retrieval change. Online signals after launch: acceptance or edit rate, regenerations, thumbs ratings, task completion.
6. **Failure handling.** What the product does when the model is uncertain, refuses, returns malformed output, is slow (timeout and fallback), or the provider is down; how users correct or undo; when it hands over to a person.
7. **Data.** Sources it reads and the permissions it respects (a user only sees answers built from data they can access), tenant isolation, retention of prompts and outputs, whether data may be used for training, and personal or regulated data handling.
8. **Safety and abuse.** Prompt injection from untrusted content, harmful or biased output, misuse, over-reliance, and the mitigations and red-team cases to include in the evals.
9. **Cost and latency.** Budgets per request and per active user, with the cost formula (requests × tokens × price per token) using blanks where prices are unknown, and the latency target for this surface.
10. **Monitoring and feedback.** What is logged (with privacy limits), dashboards, alert thresholds, and how user feedback flows back into the evaluation set.
11. **Launch criteria and rollout.** Gates for internal, beta and general availability, each tied to eval thresholds and guardrail metrics, and the kill switch.
12. **Open questions** with owners as placeholders.
</task>

<constraints>
- Do not invent accuracy numbers, model names, prices or user research. Unknowns become variables or open questions.
- Stay vendor-neutral unless the constraints name a provider.
- Write requirements engineers can test: every "should" in the document has a way to check it.
- Note where legal, privacy or sector rules need review without giving legal conclusions.
{{> output/uncertainty}}
</constraints>

<output_format>
A requirements document with the headings: Problem and users; Scope; Behaviour (with an examples table: Input | Output | Verdict | Why); Quality bar (table: Dimension | Pass looks like | Threshold); Evals; Failure handling (table: Situation | What the user sees | System behaviour); Data; Safety and abuse; Cost and latency; Monitoring and feedback; Launch criteria and rollout (table: Stage | Gate | Guardrails); Open questions.
</output_format>
