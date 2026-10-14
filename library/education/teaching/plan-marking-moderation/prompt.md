---
schema: 1
id: plan-marking-moderation
kind: prompt
title: Plan a marking moderation meeting
description: Plans a marking moderation or standardisation meeting with sample selection, blind marking, a discussion protocol, how disagreements are settled and agreed notes for consistent grades.
category: teaching
version: 1.0.0
status: incubating
stage: [review]
role: [teacher, manager]
requires: [none]
inputs: [notes, document]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [moderation, standardisation, marking-consistency, department-meeting]
pairs_with:
  prompts: [create-rubric, mark-student-work-against-rubric, run-plc-data-meeting]
args:
  - name: assessment
    description: The assessment being moderated, e.g. "Year 11 English mock, question 5 creative writing", "Grade 8 science lab reports".
    type: string
    required: true
  - name: markers
    description: Number of teachers marking and how much experience they have with this assessment.
    type: string
    required: true
  - name: mark_scheme
    description: The rubric or mark scheme, or a summary of it.
    type: text
    required: true
  - name: meeting_minutes
    description: Time available for the meeting.
    type: number
    default: 60
  - name: purpose
    description: standardise before marking (agree the standard first), or moderate after marking (check marks already given).
    type: enum
    enum: [standardise-before, moderate-after]
    default: standardise-before
output_contract:
  format: markdown
  sections: [Before the meeting, Agenda, Discussion protocol, Recording agreements, After the meeting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Marking is only fair if two teachers would give the same piece of work the same mark. Standardisation (before marking) agrees what each level looks like using sample scripts; moderation (after marking) checks a sample of marked work and adjusts. Both go wrong in familiar ways: the most senior person speaks first and everyone anchors on their mark; samples are all from the middle so boundaries are never tested; discussion drifts to the student instead of the evidence; and the agreements are never written down, so the next marker repeats the argument. Good sessions mark blind and independently first, choose samples at grade boundaries and with unusual responses, tie every judgement to specific wording in the mark scheme, and record "agreed interpretations" that markers use afterwards.
</context>

<task>
Plan a {{meeting_minutes}}-minute {{purpose}} session for **{{assessment}}**, with {{markers}}.
<mark_scheme>
{{mark_scheme}}
</mark_scheme>

1. **Before the meeting:** how many samples and which kinds (secure examples, boundary cases between levels, an unusual or off-task response, a very short response), how to anonymise them, and what markers do in advance (independent blind marks recorded privately).
2. **Agenda:** a timed agenda adding to {{meeting_minutes}} minutes: purpose, reveal marks, discussion per sample, agreed interpretations, next steps.
3. **Discussion protocol:** reveal all marks at once to avoid anchoring; the person with the furthest mark explains first, citing the mark scheme; the group agrees the mark with reference to specific descriptors; what tolerance counts as agreement (e.g. within one mark on a 20-mark question); how to resolve deadlock (head of department decides and records why).
4. **Recording agreements:** a template for agreed interpretations (descriptor, what it looks like, what does not count, example sample) and an annotated "anchor" script per level.
5. **After the meeting:** for standardise-before, how markers apply agreements and when to recheck; for moderate-after, the sample size to recheck per marker, what to do if a marker is consistently off (adjust their whole batch, not only the samples), and how to record moderation for audit.
6. Read the mark scheme and list 3 to 5 descriptors most likely to cause disagreement, with questions for the group to settle.
</task>

<constraints>
- Discussion focuses on the evidence in the work and the mark scheme, never on the student's identity or effort.
- Do not invent exam board rules; if the assessment is externally moderated, tell the teacher to follow the board's current requirements.
- Keep the agenda achievable in the time; fewer samples discussed well beats many rushed.
</constraints>

<output_format>
## Before the meeting
Sample selection and preparation.
## Agenda
A table: Time | Item | Lead.
## Discussion protocol
Numbered steps, tolerance, deadlock rule; descriptors likely to cause disagreement.
## Recording agreements
Template and anchor-script guidance.
## After the meeting
Bullets.
</output_format>
