---
schema: 1
id: plan-ai-feature-usability-study
kind: prompt
title: Plan a usability study for an AI feature
description: Plans usability research for an AI feature whose outputs vary, covering scripted versus live outputs, seeded errors, trust calibration, error recovery and how to judge results fairly.
category: ux-research
version: 1.0.0
status: incubating
stage: [verify]
role: [ux-researcher, designer, product-manager, ml-engineer]
requires: [none]
inputs: [text]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [ai-features, trust-calibration, error-recovery, wizard-of-oz, llm-products]
pairs_with:
  prompts: [design-inline-ai-assistance, define-ai-feature-metrics, write-usability-test-plan]
  personas: [ux-researcher]
args:
  - name: feature
    description: What the AI feature does, who uses it, where it can go wrong (wrong answers, made-up facts, slow responses), and what stage it is at (concept, prototype, live).
    type: text
    required: true
  - name: questions
    description: What the team wants to learn, for example "will people check the summary before sending it". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Research questions, Output strategy, Tasks and scenarios, What to observe, Interview prompts, Participants and ethics, Analysis]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Testing AI features with users differs from testing deterministic interfaces. Live models give different outputs to each participant, so a session may hit a great answer or a poor one by chance, and findings get confused with output quality. Teams handle this by scripting or curating outputs (including Wizard-of-Oz setups where a person produces responses) when testing the interaction, and using the live model when testing real-world quality, ideally with outputs logged. The most important questions are about calibration and recovery: do people over-trust plausible wrong output, do they notice and fix errors, do they understand what the feature can and cannot do, and how do they feel about control, credit and data. Seeding realistic errors on purpose is the only reliable way to see whether people catch them, and it requires a debrief. Novelty inflates first-session enthusiasm, so stated satisfaction is weak evidence.
</context>

<task>
<feature>
{{feature}}
</feature>
{{#questions}}

<questions>
{{questions}}
</questions>
{{/questions}}

1. Research questions: 4 to 6, covering understanding of capability, trust calibration, error detection and recovery, effort saved or added, and control.
2. Output strategy: scripted, curated, Wizard-of-Oz or live, with the reason; if live, how outputs are logged and attached to each session; a set of seeded errors (plausible factual error, omission, wrong tone) and where they appear.
3. Tasks and scenarios: realistic tasks with the participant's own or realistic material, including at least one where the AI output is wrong and one where it should decline or ask for more.
4. What to observe: checking behaviour (do they verify, edit, accept), time to notice an error, recovery path, prompt rephrasing, abandonment.
5. Interview prompts: neutral questions on expectations before use, what they think it did, how confident they are and why, and who is responsible for the result.
6. Participants and ethics: who, how many, a debrief that reveals seeded errors, consent for any data entered into a live model, and not using sensitive real data.
7. Analysis: separate interaction issues from output quality issues, report trust calibration (over- and under-trust) with examples, and note novelty effects.
</task>

<constraints>
- Do not treat participants' enthusiasm or satisfaction ratings as proof of value.
- Always debrief participants about seeded errors or human-generated outputs.
- Do not ask participants to enter confidential or personal data into a live model without explicit consent and approval from the team's data owner.
- Do not invent model capabilities or error rates.
</constraints>

<output_format>
## Research questions
## Output strategy
## Tasks and scenarios
## What to observe
| Behaviour | Signal | How to capture |
## Interview prompts
## Participants and ethics
## Analysis
</output_format>
