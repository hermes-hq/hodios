---
schema: 1
id: get-meeting-back-on-track
kind: prompt
title: Get a derailed meeting back on track
description: Gives quick, live moves to rescue a meeting that has derailed - a tangent, a rabbit hole, a two-person debate, a surprise topic or running out of time - with the exact words to say and what to record.
category: meetings
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, project-manager, individual, teacher]
requires: [none]
inputs: [text]
output: [script, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: optional
level: beginner
tags: [facilitation, parking-lot, timeboxing, refocusing, chairing]
pairs_with:
  prompts: [cut-agenda-to-fit-time, facilitate-tense-meeting, practise-chairing-meeting]
args:
  - name: whats_happening
    description: What is going wrong right now or keeps happening (for example "two people are debating database choices and the other eight are on their phones", "a new crisis topic took over the agenda").
    type: text
    required: true
  - name: my_role
    description: Your role in the meeting (chair, organiser, participant, junior attendee). Optional.
    type: text
  - name: time_left
    description: Minutes left and what the meeting still has to achieve. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Say this now, What is going on, Next moves, Record, Prevent it next time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people rescue meetings that have gone off course, often while the meeting is still happening, so speed and usable words matter most. The common derailments are: a tangent that is interesting but not on the agenda; a rabbit hole of detail that only two people need; a debate between two people while the rest disengage; a new urgent topic that hijacks the agenda; repeating the same arguments; and running out of time with the main item untouched. The effective moves are few: name what is happening neutrally, return to the meeting's purpose, park the topic with an owner and a time, timebox the remaining discussion, take a decision on how to proceed (continue, park, take offline, reschedule), and write down what was parked. Anyone can make these moves, but a participant or junior attendee does better phrasing them as a question or a time check than as a ruling.

What is happening: {{whats_happening}}
{{#my_role}}My role: {{my_role}}{{/my_role}}
{{#time_left}}Time left and what is still needed: {{time_left}}{{/time_left}}
</context>

<task>
1. Give one or two sentences the user can say right now, matched to their role and the derailment, neutral and without blaming anyone.
2. Name what is going on in one line (tangent, rabbit hole, two-person debate, hijack, loop, time crunch).
3. Give the next two or three moves in order, for example: check the purpose, offer the group a choice (continue for five minutes and drop item X, or park this), park with an owner and a time, take it to a smaller group, or agree to reschedule the main item.
4. Say what to record so the parked topic does not disappear: topic, owner, when it will be picked up.
5. Give two or three ways to prevent this next time (outcomes on the agenda, a visible parking list, a timekeeper, an agreed rule for new urgent topics).
</task>

<constraints>
- Keep the whole answer short; the user may be reading it during the meeting. Put the words to say first.
- Phrasing must be polite and neutral, not sarcastic or humiliating.
- If the derailment is actually a serious problem (a safety issue, distress, harassment), say to stop and deal with that first rather than steer back to the agenda.
- Respect the user's role; do not script a junior attendee to overrule the chair.
</constraints>

<output_format>
## Say this now
One or two sentences in quotes.

## What is going on
One line.

## Next moves
Numbered, two or three.

## Record
One line template.

## Prevent it next time
Bullets.
</output_format>
