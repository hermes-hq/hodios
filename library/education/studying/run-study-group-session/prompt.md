---
schema: 1
id: run-study-group-session
kind: prompt
title: Run a study group session
description: Plans a peer study group session with rotating roles, retrieval rounds, explain-to-the-group turns and a list of unresolved questions for the tutor, so the group tests rather than rereads.
category: studying
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [student]
requires: [none]
inputs: [topic, text]
output: [plan, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [study-group, peer-learning, retrieval-practice, revision-session]
pairs_with:
  prompts: [plan-group-project, prepare-office-hours-questions, make-flashcards]
  personas: [study-coach]
args:
  - name: topic
    description: "The topic or exam paper the session covers, e.g. Year 12 Biology (cell transport and membranes) or contract law (offer and acceptance)."
    type: string
    required: true
  - name: group_size
    description: How many people will attend.
    type: number
    default: 4
  - name: minutes
    description: Session length in minutes.
    type: number
    default: 75
output_contract:
  format: markdown
  sections: [Before the session, Roles, Agenda, Question stems, Unresolved questions for the tutor, After the session]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most study groups drift into rereading notes together, chatting, or one strong student explaining while the others nod. Groups help when members test each other, explain ideas aloud and catch each other's mistakes. That needs structure: preparation before the session, roles, timed retrieval rounds, short teach-back turns, a rule that answers are checked against the source rather than settled by whoever sounds most confident, and a list of what nobody could resolve to take to the tutor.

Topic: {{topic}}. Group size: {{group_size}}. Length: {{minutes}} minutes.
</context>

<task>
1. Write the pre-work each member does (about 30 minutes): one sub-topic to teach back, 5 retrieval questions with answers and a source reference, and one thing they find confusing.
2. Split the topic into sub-topics, one per member. If the topic is too broad for one session, say so and suggest which part to cover.
3. Define rotating roles: facilitator (keeps to the agenda), timekeeper, checker (has the textbook or notes open and confirms answers against them) and scribe (keeps the unresolved list). Groups of 3 combine timekeeper and scribe; groups over 6 split into pairs for the retrieval rounds.
4. Build a timed agenda that adds up exactly to {{minutes}} minutes. Default blocks, scaled to fit:
   - Settle in, roles, goal: 5 minutes.
   - Brain dump: everyone writes what they remember with notes closed: 5 to 10 minutes.
   - Quiz rounds: members ask their questions in turn, answer before discussion, checker confirms: 15 to 20 minutes.
   - Teach-backs: 3 minutes each, then each listener asks one "why" or "what if" question: about 4 to 5 minutes per member.
   - Exam-style question: everyone answers alone, then compares: 10 to 15 minutes.
   - Break: 5 minutes for sessions over 60 minutes.
   - Unresolved questions and next steps: 5 minutes.
5. Write question stems for the topic that members can use for their quiz questions (not answers), covering recall, explanation, application and comparison.
6. Give group rules: notes closed except the checker; answer before discussing; disagreements go to the checker or the unresolved list; equal airtime.
</task>

<constraints>
- Question stems only; do not write factual answers about the topic, since the group checks against its own course materials.
- The agenda's times must add up exactly to the session length.
- If the topic is missing or only a subject name ("biology"), ask for the unit or exam paper and stop.
- If the group plans to share or copy answers to assessed coursework, point out that collaboration rules vary by course and suggest they check them; keep the session to revision and practice questions.
</constraints>

<output_format>
## Before the session
Pre-work bullets and the sub-topic assigned to each member (Member 1, Member 2...).

## Roles
Table: Role | What they do | Rotates.

## Agenda
Table: Time (start to end) | Activity | Who | Materials. Total row at the end.

## Question stems
8 to 12 stems grouped by type.

## Unresolved questions for the tutor
A template: Question | What we tried | Where we got stuck | Who will ask.

## After the session
3 to 4 bullets: share the unresolved list, each member re-tests their missed questions within 2 days, date and topic of the next session, rotate roles.
</output_format>
