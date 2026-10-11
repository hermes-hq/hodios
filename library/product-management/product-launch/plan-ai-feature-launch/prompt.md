---
schema: 1
id: plan-ai-feature-launch
kind: prompt
title: Plan an AI feature launch
description: Plans launching an AI feature with quality and safety review, expectation-setting copy, a labelled beta, staged access, cost guardrails, a bad-output feedback loop and launch metrics.
category: product-launch
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [product-manager, ml-engineer, marketer, founder]
requires: [none]
inputs: [text, spec]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ai-features, responsible-ai, staged-access, cost-controls]
pairs_with:
  prompts: [define-ai-feature-metrics, write-ai-feature-requirements, plan-product-launch, plan-staged-feature-rollout]
args:
  - name: feature
    description: What the AI feature does, who uses it, what data it reads, where outputs appear, whether a human reviews outputs before they take effect, and current quality evidence (evals, beta feedback).
    type: text
    required: true
  - name: audience
    description: Who gets it and how many - consumers, business customers, regulated industries, regions. Optional.
    type: string
  - name: launch_date
    description: Target date or window. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Launch summary, Risk review, Readiness checklist, Rollout stages, User expectations, Feedback and incident loop, Metrics, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product lead who has shipped AI features to real users. AI launches fail differently from normal ones: quality varies by input, so a demo that worked does not predict the long tail; one bad output shared publicly can define the feature; costs scale with usage and can surprise; users over-trust confident answers; and enterprise buyers ask where their data goes before they turn anything on. The launches that go well set honest expectations, start with users who tolerate errors, make it easy to report bad outputs, watch quality and cost daily, and can switch the feature off quickly.

Feature: {{feature}}
{{#audience}}Audience: {{audience}}{{/audience}}
{{#launch_date}}Launch date: {{launch_date}}{{/launch_date}}
</context>

<task>
1. Summarise the launch: the job the feature does, who it is for, where outputs go, and whether a human checks them before they have effect.
2. Risk review: rate the harm if an output is wrong (cosmetic, misleading, financial, safety, legal), the likelihood based on the quality evidence given, and specific risks: harmful or biased output, leaking data between users or accounts, prompt injection from content the feature reads, made-up facts presented as true, and cost spikes. Say what evidence is missing.
3. Readiness checklist: evaluation on a representative set including hard and adversarial cases, red-team pass, content filters, data handling and retention answer for customers, admin controls to turn it off, a kill switch, rate and spend limits per account, logging that respects privacy, support macros for wrong answers, and legal or privacy sign-off where data or regulated use is involved.
4. Rollout stages: internal, a small opt-in beta labelled as such, wider beta, general availability. For each: who, size, entry criteria based on quality and cost numbers, and what would stop the next stage.
5. User expectations: in-product copy that says what it is good at and not good at, a visible way to report a bad output, a reminder to check important outputs, and how it is described in marketing without overclaiming.
6. Feedback and incident loop: how bad-output reports are triaged, who reviews them daily during launch, what counts as an incident, how fast the kill switch is used, and how fixes are verified.
7. Metrics: usage and repeat usage, acceptance or edit rate of outputs, bad-output report rate, cost per active user against the budget, latency, and the business outcome it should move. Targets are proposals.
</task>

<constraints>
- Do not invent accuracy figures, benchmark results or model names; use the evidence given or mark it missing.
- Higher harm requires human review before outputs take effect, smaller first stages, and stricter go criteria; say so when the feature lacks them.
- Never recommend marketing claims like "accurate" or "never wrong"; flag any claim that needs evidence.
- Note that rules on AI disclosure and automated decisions differ by country and sector, and recommend a legal check for regulated uses rather than stating the law.
- If the feature description is too thin, ask up to three questions and stop.
</constraints>

<output_format>
## Launch summary
Four lines.

## Risk review
Table: risk | harm | likelihood | mitigation | evidence missing.

## Readiness checklist
Table: item | owner (role) | due | blocking (yes or no).

## Rollout stages
Table: stage | who and how many | entry criteria | stop criteria.

## User expectations
Draft in-product copy and marketing guidance.

## Feedback and incident loop
Numbered steps.

## Metrics
Table: metric | target (proposal) | window | owner.

## Open questions
Bullets, or "None".
</output_format>
