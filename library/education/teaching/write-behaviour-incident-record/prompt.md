---
schema: 1
id: write-behaviour-incident-record
kind: prompt
title: Write a behaviour incident record
description: Turns a teacher's rough notes into a factual behaviour incident record with time, place, people, what was seen and heard, actions and follow-up, separating fact from opinion.
category: teaching
version: 1.0.0
status: incubating
stage: [build]
role: [teacher]
subject: [education-sector]
requires: [none]
inputs: [notes, text]
output: [report, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [incident-log, behaviour, record-keeping, objective-language, safeguarding]
pairs_with:
  prompts: [plan-restorative-conversation, plan-student-behavior-support, write-parent-email]
args:
  - name: notes
    description: Your notes on the incident, as rough as they are - when and where, who was involved (initials or roles), what you saw and heard, what you did, and anything others told you.
    type: text
    required: true
  - name: required_fields
    description: Optional. The fields your school's behaviour system or form requires, e.g. "category, location, staff involved, sanction, parent contacted Y/N".
    type: text
output_contract:
  format: markdown
  sections: [Incident record, Fact and opinion check, Missing details, Follow-up, Safeguarding check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A teacher, teaching assistant or pastoral lead needs to log a behaviour incident. Incident records may be read later by parents, senior leaders, governors, other agencies or a tribunal, so they must be accurate, factual and fair. The common faults: opinion written as fact ("he was being defiant", "she was trying to hurt him"); labels and loaded words ("aggressive child", "kicked off"); mixing what the writer saw with what others said; vague times; and leaving out what staff did, including de-escalation.
</context>

<task>
<notes>
{{notes}}
</notes>
{{#required_fields}}
<required_fields>
{{required_fields}}
</required_fields>
{{/required_fields}}

1. Extract the facts: date, time (as exact as the notes allow), location, people involved by initials or role, witnesses, and the sequence of events in order.
2. Write what was seen and heard in neutral, specific language: actions ("pushed J.K. on the shoulder with both hands") rather than interpretations ("attacked"). Quote words that were said exactly, in quotation marks, including swearing, if the notes give them.
3. Mark the source of each statement: seen or heard by the writer, or reported by someone else (named by initials or role).
4. Record what staff did, in order: de-escalation, instructions given, help sought, first aid, removal from the room, and who was informed.
5. Record follow-up already done and still needed, with owners where known.
6. Fill the school's required fields if given; leave anything not in the notes as [not recorded].
7. List every opinion, label or assumption you removed or reworded, so the writer can check the record still says what they meant.
8. Safeguarding check: say whether the notes contain anything that suggests harm, a disclosure or risk, which must be passed on separately.
</task>

<constraints>
- Do not add details, motives, diagnoses or outcomes that are not in the notes. Ask about gaps instead.
- Initials or roles only; no full names of pupils.
- Do not decide sanctions; that follows the school's behaviour policy. If a sanction was given for behaviour linked to a disclosure or possible harm (for example refusing to change because of injuries), flag it for review with the designated safeguarding lead.
- If the notes include a disclosure of abuse, harm at home, self-harm or a serious injury, put a clear line at the top: this must be reported today to the designated safeguarding lead through the school's safeguarding procedure, not only in the behaviour log, and record the pupil's exact words.
{{> guardrails/crisis-safety}}
- If physical intervention was used, note it must also be recorded on the school's reasonable-force or physical intervention form and families informed per policy.
</constraints>

<output_format>
## Incident record
Fields: Date | Time | Location | Pupils involved | Staff involved | Witnesses, then "What happened" as numbered, timed points with sources, then "Actions taken by staff".

## Fact and opinion check
Table: Original wording | Changed to | Why.

## Missing details
Bullets: what the record still needs.

## Follow-up
Table: Action | Who | By when | Done.

## Safeguarding check
One line: none found, or what must be passed on and to whom.
</output_format>
