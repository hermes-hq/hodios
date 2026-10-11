---
schema: 1
id: plan-online-participant-recruitment
kind: prompt
title: Plan online participant recruitment
description: Sets up an online study on a participant panel such as Prolific, with prescreening, fair pay, attention checks, bot and fraud screening and exclusion rules fixed before data collection.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [researcher, student]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [online-studies, crowdsourcing, data-quality, attention-checks, bot-detection, participant-panels]
pairs_with:
  prompts: [design-sampling-plan, write-participant-recruitment-materials, write-preregistration, design-behavioral-experiment]
  personas: [research-methodologist]
args:
  - name: study
    description: The study (survey or experiment), its length in minutes, the target population, sample size, budget, and the platform you plan to use if known.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Platform and sample, Prescreening, Pay and budget, Data quality safeguards, Exclusion rules, Launch checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Online panels make recruitment fast but bring predictable data-quality problems: bots and survey farms on open links, inattentive or speeding participants, people misreporting eligibility to qualify, professional participants who have seen classic paradigms many times, and samples that skew younger, more educated and from a few countries. Researchers who run these studies well rely on the platform's own prescreeners rather than in-survey eligibility questions that reveal the answer, pay at least the platform's recommended hourly rate based on a piloted median time, use fair attention checks (instructed items that a reading participant would pass, not trick questions), add open-text and consistency checks to detect bots and AI-generated answers, set exclusion rules before seeing results and preregister them, and run a small soft launch before the full sample. Platforms have rules on rejections and on what checks may be used; rejecting for failing a fair check is allowed on some platforms only under stated conditions.
</context>

<task>
Plan online recruitment for:
<study>
{{study}}
</study>

1. Recommend a platform type (research panel, general crowdsourcing marketplace, market research panel, own mailing list) for this population, and note sample composition risks.
2. Translate eligibility into platform prescreening filters, and list any eligibility that must be confirmed in-study without revealing the criterion.
3. Estimate pay: pilot to measure median completion time, then compute pay at or above the platform's recommended rate, plus platform fees and a buffer for exclusions; show the budget calculation with stated assumptions.
4. Design data-quality safeguards: one or two fair attention checks, a seriousness check, timing flags, open-text plausibility checks, consistency checks, duplicate and location checks, and bot or AI-text signals. Say which can be used to reject payment under typical platform policy and which only to exclude data.
5. Write exclusion rules to fix in advance, with thresholds, and the target sample after expected exclusions.
6. Plan the soft launch, monitoring during collection, how to message participants, and handling of complaints and withdrawal.
7. Note ethics points: consent, data protection, and not deceiving participants about length or pay.
</task>

<constraints>
- Do not quote specific platform fees, minimum pay rates or policies as current fact; tell the user to check the platform's current terms and mark figures as assumptions.
- No trick questions or deceptive attention checks; checks must be fair to attentive participants.
- Exclusion rules must be set before looking at outcome data.
- Do not advise collecting more personal data than the study needs.
</constraints>

<output_format>
## Platform and sample
Recommendation and composition risks.
## Prescreening
A table: criterion | platform filter or in-study check | how to avoid revealing it.
## Pay and budget
The calculation in a code block with assumptions marked.
## Data quality safeguards
A table: check | wording or rule | use (reject or exclude only).
## Exclusion rules
Numbered pre-set rules and the recruitment target.
## Launch checklist
A checklist for soft launch and monitoring.
</output_format>
