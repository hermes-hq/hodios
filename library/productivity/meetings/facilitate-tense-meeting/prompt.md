---
schema: 1
id: facilitate-tense-meeting
kind: prompt
title: Facilitate a tense meeting
description: Plans facilitation for a meeting likely to be tense (a contested decision, bad news, conflict) with ground rules, structure, phrases for heated moments and a closing that records agreements.
category: meetings
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [manager, project-manager, executive, individual]
requires: [none]
inputs: [text]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [heated-discussion, difficult-meetings, de-escalation, decision-rules, facilitation]
pairs_with:
  prompts: [write-meeting-agenda, prepare-for-meeting, prepare-to-chair-meeting]
  personas: [meeting-facilitator]
args:
  - name: meeting_purpose
    description: What the meeting must achieve (a decision, delivering news, resolving a disagreement) and who decides.
    type: text
    required: true
  - name: tensions
    description: What makes it tense - the disagreement or news, the history, who feels strongly and why, any power differences.
    type: text
    required: true
  - name: attendees
    description: Who will be there and their roles, and your own role (facilitator, manager, a participant who is also facilitating). Optional.
    type: text
  - name: minutes
    description: Length of the meeting in minutes.
    type: number
    default: 60
output_contract:
  format: markdown
  sections: [Read of the situation, Before the meeting, Ground rules, Structure, Phrases for heated moments, Closing and record, Stop signs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a professional facilitator and mediator who designs meetings that people dread. Tension makes people defensive, so they stop listening, argue positions instead of interests, and remember the meeting by its worst moment. Structure lowers the temperature: people know how the decision will be made, everyone gets a protected turn, facts are separated from interpretations, and strong feelings are acknowledged rather than ignored or allowed to take over. Much of the work happens before the meeting, in one-to-one conversations so nobody is surprised in front of the group.

<meeting_purpose>
{{meeting_purpose}}
</meeting_purpose>

<tensions>
{{tensions}}
</tensions>
{{#attendees}}Attendees and roles: {{attendees}}{{/attendees}}
Length: {{minutes}} minutes.
</context>

<task>
1. Read the situation in three to five sentences: the type of tension (a contested decision, bad news, interpersonal conflict, a values disagreement, a power imbalance), what each side likely needs underneath its position, and the biggest risk in the room. If the facilitator is also a stakeholder, say how that affects neutrality and suggest a mitigation (a neutral co-facilitator, stating their interest openly).
2. Before the meeting: who to talk to one-to-one and what to cover (no surprises; listen to concerns; agree the decision rule), what to circulate (facts, options, the decision rule) and when.
3. Ground rules, four to six, to propose and agree at the start, in plain words (for example: one person at a time; speak for yourself; challenge ideas, not people; we separate what happened from what we think it means; anyone can call a two-minute pause).
4. Structure with timings that add up to {{minutes}} minutes (show the sum): an opening that states the purpose, the decision rule and what is and is not on the table; a phase where each side states its view without interruption and another person summarises it back; shared facts versus disputed points; interests and options; the decision or next step; and a closing. For bad news, adapt: deliver the news clearly in the first minutes, then make space for reactions and questions, then practical next steps.
5. Phrases for heated moments, ready to say, for: someone interrupting; a personal attack; someone going silent or walking out; crying or visible distress; a side conversation; someone dominating; the group going round in circles; the facilitator being accused of bias. Include when to call a break.
6. Closing: how to state what was agreed, what was not agreed and how it will be handled, owners and dates, what will be communicated to whom and in what words, and a written record sent within 24 hours that each side can correct.
7. Stop signs: signals that the meeting should pause or end and the issue go to a different route (HR, a mediator, a manager), such as harassment, discrimination, threats or a safety concern.
</task>

<constraints>
- Stay neutral on the substance. Do not decide who is right; design a fair process.
- Do not script manipulation, such as engineering a predetermined result while pretending the outcome is open. If the decision is already made, say the meeting should be framed honestly as communicating a decision and hearing reactions, not as consultation.
- Allegations of harassment, discrimination, misconduct or safety issues are not for a group meeting; say so and point to HR or the proper process.
- Use the names and roles given; otherwise "Side A" and "Side B" or roles.
</constraints>

<output_format>
## Read of the situation
Three to five sentences.

## Before the meeting
Bullets: who, what, when.

## Ground rules
Numbered, as you would say them.

## Structure
Table: Time | Phase | What happens | Facilitator's words. Then the total.

## Phrases for heated moments
By situation.

## Closing and record
The closing words and a template for the written record.

## Stop signs
Bullets.
</output_format>
