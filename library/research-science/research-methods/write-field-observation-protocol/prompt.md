---
schema: 1
id: write-field-observation-protocol
kind: prompt
title: Write a field observation protocol
description: Writes a field observation protocol for a setting and research question, covering the observer's role, what to record, sampling of times and events, ethics, and field note templates.
category: research-methods
version: 1.0.0
status: incubating
stage: [design]
role: [researcher, student, ux-researcher]
requires: [none]
inputs: [text]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [observation, ethnography, field-notes, observation-protocol, qualitative-research, fieldwork]
pairs_with:
  prompts: [design-case-study-research, write-ethics-application, build-qualitative-codebook, write-research-interview-protocol]
  personas: [research-methodologist]
args:
  - name: setting
    description: Where you will observe and how you get access, for example "two hospital emergency department waiting rooms, with management approval" or "a public playground".
    type: text
    required: true
  - name: research_question
    description: What you want to learn, and whether you need open, descriptive notes, a structured count of behaviours, or both.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Approach, Observer role and access, What to record, Sampling plan, Ethics and safety, Field note templates, Data handling and reflexivity, Pilot checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Observation captures what people do, not what they say they do, but only if the observer knows what to look at, when, and how to write it down. Approaches range from unstructured participant observation (thick description, jottings expanded into full field notes the same day) to structured observation with a coding scheme and time or event sampling that yields counts. Either way, a protocol fixes the observer's role on the participant-observer spectrum, the sampling of times, places and events, the separation of description from interpretation in notes, and the ethics of observing people who may not have consented individually. Observation goes wrong when notes mix what happened with what the observer thought it meant, when only the busy or convenient times are sampled, and when covert observation is used without justification and approval.
</context>

<task>
Write an observation protocol.
<setting>
{{setting}}
</setting>
<research_question>
{{research_question}}
</research_question>

1. Recommend the approach (unstructured, semi-structured, structured, or a combination) and explain what each would give for this question.
2. Define the observer's role (complete observer, observer as participant, participant as observer, complete participant), whether observation is overt, how access and gatekeepers are handled, and how the observer's presence may change behaviour.
3. Translate the research question into what to record: a sensitising framework (for example space, actors, activities, objects, acts, events, time, goals, feelings), and, for structured observation, a coding scheme with operational definitions, examples and non-examples for each code.
4. Plan sampling: which sites, days and time blocks and why; continuous, time-interval or event sampling; session length; and how to cover quiet and busy periods.
5. Plan ethics and safety: consent route (individual, notices, gatekeeper, waiver) as the ethics committee will judge it, what never to record (identifiable details, children's faces, overheard health information), what to do if asked to stop, observer safety, and when to intervene or report.
6. Write field note templates: a jotting sheet for the field and an expanded note template that separates description, verbatim quotes, observer comments and analytic memos; for structured observation, a coding sheet.
7. Plan data handling, reliability (for structured coding, double-coding a sample and inter-rater agreement), and reflexive notes.
</task>

<constraints>
- Keep description and interpretation in separate fields in every template.
- Do not recommend covert observation unless the question cannot be answered otherwise; if so, say it needs explicit ethics approval and justification.
- Mark where details from the approved ethics documents and site agreements must be inserted.
- Codes in a structured scheme must be observable behaviours, not inferred states ("leaves the queue", not "is frustrated").
</constraints>

<output_format>
## Approach
The recommendation and reasoning.
## Observer role and access
Role, overt or covert, access steps and reactivity.
## What to record
The sensitising framework and, if structured, a code table: code | definition | example | non-example.
## Sampling plan
A table: site | day | time block | sampling method | duration.
## Ethics and safety
Consent, exclusions from notes, stopping, safety and escalation.
## Field note templates
The jotting sheet, expanded notes template and coding sheet in code blocks.
## Data handling and reflexivity
Storage, reliability checks and reflexive prompts.
## Pilot checklist
What to test in a first session.
</output_format>
