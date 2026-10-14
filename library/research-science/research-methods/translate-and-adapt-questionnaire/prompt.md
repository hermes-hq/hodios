---
schema: 1
id: translate-and-adapt-questionnaire
kind: prompt
title: Translate and adapt a questionnaire
description: Plans the cross-cultural translation and adaptation of a questionnaire with forward and back translation, expert committee review, cognitive testing, a pilot and the checks to report.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan, design]
role: [researcher, student]
requires: [none]
inputs: [text, document]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [cross-cultural-adaptation, questionnaire-translation, back-translation, measurement-invariance, cognitive-debriefing]
pairs_with:
  prompts: [find-validated-scale, validate-measurement-instrument, plan-cognitive-interviews]
  personas: [research-methodologist]
args:
  - name: instrument
    description: The questionnaire or scale, its source language and target language and country, the population, and whether the original authors' permission has been obtained.
    type: text
    required: true
  - name: resources
    description: Budget, number of bilingual people available, timeline.
    type: text
output_contract:
  format: markdown
  sections: [Before you start, Translation steps, Testing and validation, Item issue log, Reporting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A questionnaire translated by one bilingual colleague is not a validated measure in the new language. Established guidance (for example from Beaton and colleagues, the ISPOR task force for patient-reported outcomes, and the TRAPD model used in cross-national surveys) uses two or more independent forward translations, reconciliation, back translation or team review, an expert committee that judges semantic, idiomatic, experiential and conceptual equivalence, cognitive interviews with the target population, and then psychometric testing. Experts know that literal accuracy is not the goal: an item about "climbing a flight of stairs" or "feeling blue" may need a culturally equivalent example, response labels must keep equal-seeming steps, and back translation alone can hide awkward target-language wording. Many developers hold copyright and require their own process or an existing official translation, so checking for one comes first.
</context>

<task>
Plan the translation and adaptation of:
<instrument>
{{instrument}}
</instrument>
{{#resources}}
Resources: {{resources}}
{{/resources}}

1. Before starting: check whether an official or validated version already exists in the target language and country, obtain the developer's permission and any required procedure, and confirm the conceptual definition still fits the target culture.
2. Plan the team: two forward translators (one aware of the construct, one naive), back translators blind to the original, a reconciliation lead, and an expert committee; say who could fill each role with the stated resources.
3. Lay out the steps: forward translation, synthesis, back translation or team review, expert committee review against the four equivalences, harmonisation of response scales and instructions.
4. Plan cognitive interviews with the target population: number, sampling for diversity in education and region, probes, and how findings change items.
5. Plan the field pilot and psychometric testing: sample size logic, factor structure, reliability, and measurement invariance if comparing groups across languages.
6. Provide an item issue log template and the decision rules for changing an item.
7. List what to report and which guideline to follow.
</task>

<constraints>
- Do not translate the instrument yourself as a final version; drafts are inputs to the human process only.
- Do not claim the adapted version is validated before psychometric testing.
- Flag copyright and permission explicitly; never advise skipping it.
- Where resources are too thin for the full process, say what is lost by each shortcut rather than presenting it as equivalent.
</constraints>

<output_format>
## Before you start
A checklist.
## Translation steps
Numbered steps with roles, inputs and outputs.
## Testing and validation
Cognitive interviewing and psychometric testing plan.
## Item issue log
A table template: item | original | forward versions | issue | equivalence type | decision | rationale.
## Reporting
What to report and the guideline.
</output_format>
