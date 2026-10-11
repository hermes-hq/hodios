---
schema: 1
id: facilitate-postmortem-review
kind: prompt
title: Facilitate a postmortem review meeting
description: Prepares the facilitator for a blameless postmortem meeting from the draft, with a timed agenda, questions per timeline gap, phrasing that steers off blame, and how to land owned action items.
category: incident
version: 1.0.0
status: incubating
stage: [operate, review]
role: [sre, engineering-manager, tech-lead]
stack: []
requires: [none]
inputs: [document, notes]
output: [plan, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [blameless, postmortem-meeting, facilitation, learning-review]
pairs_with:
  prompts: [write-postmortem, build-incident-timeline, audit-postmortem-action-items]
  personas: [site-reliability-engineer]
args:
  - name: postmortem_draft
    description: The draft postmortem or incident notes and timeline that will be reviewed.
    type: text
    required: true
  - name: meeting_setup
    description: Length of the meeting and who will attend by role, for example "45 minutes; on-call engineer, payments team lead, support lead, the engineer who shipped the change".
    type: text
    required: true
  - name: sensitivities
    description: Anything tense, for example "a senior engineer's change triggered it" or "this is the third similar incident and leadership is frustrated".
    type: text
---
<context>
You prepare someone to run a postmortem review meeting. The written postmortem records what happened; the meeting is where the team learns why it made sense at the time. Reviews go wrong in familiar ways: they replay the timeline minute by minute and run out of time; the person whose change triggered the incident becomes the focus; the group stops at the first cause ("human error", "missing test"); or action items are agreed with no owner. Good facilitators ask "what did you know at that point?" and "what made that the reasonable choice?" rather than "why didn't you?", look for the conditions that let the failure happen and slowed detection and recovery, and keep the number of action items small enough to actually be done.

<postmortem_draft>
{{postmortem_draft}}
</postmortem_draft>

Meeting: {{meeting_setup}}
{{#sensitivities}}Sensitivities: {{sensitivities}}{{/sensitivities}}
</context>

<task>
1. Read the draft and find what the meeting should spend time on: gaps and jumps in the timeline, decisions whose reasoning is not recorded, the detection delay, the mitigation delay, and anything that went well and should be kept.
2. Build a timed agenda that fits the meeting length: ground rules, a short timeline walk focused on decision points (not every event), discussion of contributing factors, what went well, action items, close. Give minutes per item.
3. Write the opening statement on blamelessness in two or three sentences the facilitator can say aloud.
4. For each decision point or gap, write two or three open questions, addressed to a role rather than a named person, that surface what people knew, expected and were unable to see.
5. Write redirect phrases for when the discussion turns to blame, to a single root cause, or to a solution debate that will not finish in the room.
6. Describe how to turn discussion into action items: each with a problem it addresses, an owner role, a size, and a due date to be agreed; cap them at a number the team can finish, and park the rest as follow-ups.
7. If sensitivities were given, say how to handle them: talking to the person beforehand, how to frame the repeated incident, what not to say.
8. List what the facilitator should send before the meeting and record during it.
</task>

<constraints>
- Do not assign blame or name individuals as causes, even if the draft does. Point out any blaming language in the draft and suggest neutral wording.
- Do not invent facts beyond the draft; mark open questions as questions.
- Keep the agenda within the stated time; if the draft is too big for it, say what to cut or split into a second session.
- Do not treat "human error" or "be more careful" as an acceptable contributing factor or action item.
</constraints>

<output_format>
## Focus areas
Bullets: what deserves time and why.
## Agenda
Table: minutes | item | goal.
## Opening statement
Short text to read aloud.
## Questions by decision point
Grouped by timeline point, with the role each is for.
## Redirects
Table: situation | phrase to use.
## Landing action items
Steps, plus the action item template.
## Handling sensitivities
Bullets, or "None given".
## Before and during
Checklist.
</output_format>
