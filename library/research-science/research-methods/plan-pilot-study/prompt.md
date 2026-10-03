---
schema: 1
id: plan-pilot-study
kind: prompt
title: Plan a pilot study
description: Plans a pilot or feasibility study for a main study with feasibility objectives, measurable progression criteria, the right sample size logic, and what will change for the main study.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan, design]
role: [researcher, student]
requires: [none]
inputs: [text, document]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pilot-study, feasibility-study, progression-criteria, participant-recruitment, consort-pilot]
pairs_with:
  prompts: [design-research-study, design-sampling-plan, write-preregistration, write-research-proposal]
  personas: [research-methodologist]
args:
  - name: main_study
    description: The planned main study - question, design, population, intervention or procedures, outcomes and instruments - and what worries you about running it.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Uncertainties, Pilot design, Feasibility objectives and progression criteria, Sample size, What will change, Reporting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A pilot study asks "can we do this study?", not "does the intervention work?". It tests recruitment, retention, adherence, procedures, instruments, data collection and acceptability, and it ends with a decision about the main study made against criteria set in advance. Current guidance (the CONSORT extension for pilot and feasibility trials, and work by Eldridge, Thabane and colleagues) recommends traffic-light progression criteria (go, amend, stop), sample sizes justified by the feasibility parameters to be estimated rather than by power for effectiveness, and caution with effect estimates from pilots. Common mistakes are calling an underpowered trial a pilot, testing hypotheses on efficacy, and using pilot effect sizes to power the main study.
</context>

<task>
Plan a pilot study for this main study:
<main_study>
{{main_study}}
</main_study>

1. List the uncertainties that could make the main study fail, and rank them by likelihood and consequence. If key details of the main study are missing, list them and state assumptions.
2. Choose the pilot type: an external pilot, an internal pilot that rolls into the main study, a feasibility study without randomisation, or a process-focused pilot. Explain the choice.
3. Write feasibility objectives, each tied to an uncertainty, with how it is measured (for example eligible per month screened, consent rate, retention at follow-up, adherence, completeness of the primary outcome, time per assessment, acceptability by interview).
4. Set progression criteria for the main ones as green (proceed), amber (proceed with changes) and red (stop or rethink) thresholds, justified by what the main study needs.
5. Justify the sample size by precision for the key feasibility parameter (for example a confidence interval around the expected consent or retention rate), or a common rule of thumb with its rationale, and say explicitly that the pilot is not powered for effectiveness.
6. Plan any qualitative component (participant and staff interviews) and what it will feed.
7. State what will be changed for the main study depending on results, and how any outcome data will be used (for example estimating SD for the main sample size with an upper confidence limit, not the effect size).
8. Note the reporting guideline and registration.
</task>

<constraints>
- No hypothesis tests of efficacy as objectives; effect estimates, if reported, are descriptive.
- Every progression criterion must be measurable and have numbers; mark numbers that depend on the main study's needs as assumptions.
- Do not invent recruitment rates or benchmarks from other studies; label any figure as an assumption to check against local data.
</constraints>

<output_format>
## Uncertainties
A ranked table: uncertainty | likelihood | consequence | tested by.
## Pilot design
The type, setting, procedures and timeline.
## Feasibility objectives and progression criteria
A table: objective | measure | green | amber | red | why this threshold.
## Sample size
The calculation or rationale in a code block.
## What will change
Decisions and changes per result.
## Reporting
Guideline, registration and what to report.
</output_format>
