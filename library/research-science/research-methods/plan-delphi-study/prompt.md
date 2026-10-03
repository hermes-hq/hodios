---
schema: 1
id: plan-delphi-study
kind: prompt
title: Plan a Delphi study
description: Plans a Delphi consensus study with the panel and its expertise criteria, the round structure, rating scales, a consensus rule set in advance, feedback between rounds, analysis and reporting.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan, design]
role: [researcher, student, consultant]
requires: [none]
inputs: [text, topic]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [delphi-method, expert-consensus, consensus-methods, expert-panel, guideline-development, core-outcome-set]
pairs_with:
  prompts: [design-research-study, design-sampling-plan, write-survey-questionnaire, write-ethics-application]
  personas: [research-methodologist]
args:
  - name: topic
    description: What the panel must reach consensus on and what the result will be used for, for example "competencies for advanced practice physiotherapists, to shape a training curriculum".
    type: text
    required: true
  - name: panel
    description: Who you think the experts are, how many you can reach, and whether patients, service users or other stakeholders should be on the panel.
    type: text
output_contract:
  format: markdown
  sections: [Is Delphi right, Panel, Round structure, Consensus rules, Analysis and feedback, Reporting and ethics, Timeline and risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The Delphi method builds consensus among experts through anonymous, iterative rounds of rating with controlled feedback. It is used for guidelines, core outcome sets, competency frameworks, priorities and forecasts when evidence is thin or contested. Its credibility depends on decisions made before round one: who counts as an expert and how a balanced panel is recruited, how items are generated (open first round, or a literature-derived list), the rating scale, a consensus definition that is fixed in advance, what feedback participants see, how many rounds and when to stop, and how attrition is handled. Variants include modified Delphi with a seeded first round, e-Delphi, the RAND/UCLA appropriateness method and a final consensus meeting. Reporting guidance for consensus methods (for example ACCORD, and CREDES in palliative care) asks for all of this.
</context>

<task>
Plan a Delphi study on:
<topic>
{{topic}}
</topic>
{{#panel}}
<panel>
{{panel}}
</panel>
{{/panel}}

1. Check fit: compare Delphi with a nominal group technique, a consensus conference, a survey and a systematic review for this purpose, and recommend one. Say which Delphi variant fits.
2. Plan the panel: expertise criteria that are verifiable, stakeholder groups and how many from each, whether groups are analysed separately, target size with reasoning (balance and attrition rather than power), recruitment route, and how conflicts of interest are recorded.
3. Plan the rounds: how items are generated (open round, literature or prior work, or both) and refined; the rating scale (for example 1-9 grouped as 1-3 not important, 4-6 important but not critical, 7-9 critical, plus "unable to rate"); comment boxes; whether participants may add items; and the number of rounds with a stopping rule (consensus reached, stability between rounds, or a maximum).
4. Fix the consensus rules before round one: the thresholds for consensus in, consensus out and no consensus (for example at least 70% rating 7-9 and no more than 15% rating 1-3), how each category is handled in the next round, and whether stability is tested.
5. Plan analysis and feedback: what each participant sees between rounds (distribution or median and interquartile range per stakeholder group, their own previous rating, anonymised comments), how qualitative comments are analysed, and how attrition and response bias are reported.
6. Plan an optional final meeting for items without consensus: who attends, how it is run, and how voting works.
7. Note ethics (consent, anonymity between panellists but not to the researchers), registration, and the reporting guideline.
8. Give a timeline with realistic intervals between rounds and attrition mitigation.
</task>

<constraints>
- Every threshold and rule must be stated as fixed before data collection; flag any choice the team must justify in the protocol.
- Do not present a panel size as statistically powered; explain the reasoning used.
- Do not invent items for the panel to rate beyond clearly labelled examples; the real items come from the item-generation step.
- Address how patient or lay members are supported (plain-language items, briefings) if they are included.
</constraints>

<output_format>
## Is Delphi right
A comparison table (method | strengths here | weaknesses here) and the recommendation.
## Panel
Criteria, groups, size and recruitment.
## Round structure
A table: round | content | participant task | output.
## Consensus rules
The definitions in a short table (category | rule | what happens next).
## Analysis and feedback
Statistics, feedback content, qualitative analysis and attrition handling.
## Reporting and ethics
Guideline, registration, consent and anonymity.
## Timeline and risks
Timeline by week, and a risk table (risk | mitigation).
</output_format>
