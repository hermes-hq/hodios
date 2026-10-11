---
schema: 1
id: design-single-case-experiment
kind: prompt
title: Design a single-case experiment
description: Designs a single-case experimental study (reversal, multiple baseline or alternating treatments) with the target behaviour, measurement, phase rules, randomisation, visual and statistical analysis.
category: research-methods
version: 1.0.0
status: incubating
stage: [design, plan]
role: [researcher, student, teacher]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [single-case-design, multiple-baseline, n-of-1, applied-behaviour-analysis, visual-analysis]
subject: [psychology, education-sector]
pairs_with:
  prompts: [design-research-study, write-ethics-application, write-preregistration]
  personas: [research-methodologist, statistician]
args:
  - name: question
    description: The intervention, the target behaviour or outcome, and the participants (how many, setting), for example "a self-monitoring app to increase on-task behaviour of three pupils in one classroom".
    type: text
    required: true
  - name: constraints
    description: Optional. Whether the effect is reversible, ethical limits on withdrawing treatment, how often you can measure, and time available.
    type: text
output_contract:
  format: markdown
  sections: [Design choice, Target and measurement, Phases and decision rules, Randomisation, Analysis, Quality standards]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Single-case experimental designs (SCEDs) test interventions with one or a few participants by measuring a behaviour repeatedly and introducing the intervention in a controlled way, so each participant serves as their own control. They are used in special education, applied behaviour analysis, rehabilitation and clinical psychology. Experimental control comes from demonstrating an effect at least three times at different points in time: through withdrawal or reversal (ABAB), staggered introduction across participants, settings or behaviours (multiple baseline), or rapid alternation of conditions. The design must fit the behaviour: reversal is wrong for effects that should not reverse (skills learned) or where withdrawing treatment is unethical. Quality standards (for example the What Works Clearinghouse SCED standards, with phases of at least three and preferably five data points, and inter-observer agreement on at least 20% of sessions in each phase) and reporting guidance (SCRIBE) set the bar. Randomising phase start points or the order of conditions makes randomisation tests possible. Visual analysis of level, trend, variability, immediacy, overlap and consistency is primary, supplemented by effect sizes such as Tau-U or between-case standardised mean differences, each with known limits.
</context>

<task>
Design a single-case experiment for:
<question>
{{question}}
</question>
{{#constraints}}
Constraints: {{constraints}}
{{/constraints}}

1. Choose the design (reversal, multiple baseline across participants, settings or behaviours, alternating treatments, changing criterion) with reasons tied to reversibility, ethics and the number of participants. Say if a group design fits better.
2. Define the target behaviour operationally, the measurement system (event, duration, interval or rating), who observes, session frequency, and inter-observer agreement plan.
3. Define phases with minimum data points per phase, the rules for moving between phases (stability criteria or pre-set randomised start points), and treatment fidelity checks.
4. Plan randomisation: which element is randomised (start points, order) and the randomisation test it supports.
5. Plan analysis: visual analysis on the six features with how graphs are drawn, an effect size with its limits, and replication of effect across tiers or phases as the criterion for a functional relation.
6. Check against quality standards and the SCRIBE reporting items, and list ethics points (consent or assent, withdrawal phases, data on minors).
</task>

<constraints>
- Do not recommend a reversal design for behaviours that should not reverse or where withdrawal is harmful; explain the alternative.
- Do not claim generalisation to populations from a single-case study; discuss replication across cases instead.
- Do not invent baseline data or outcomes.
- Treat effect sizes as supplements to visual analysis and state their known problems.
</constraints>

<output_format>
## Design choice
Recommendation and reasons.
## Target and measurement
Definition, measurement system, observers and agreement plan.
## Phases and decision rules
A table: phase | condition | minimum points | move-on rule.
## Randomisation
What is randomised and the test.
## Analysis
Visual analysis plan and effect size.
## Quality standards
Checklist against standards, SCRIBE and ethics.
</output_format>
