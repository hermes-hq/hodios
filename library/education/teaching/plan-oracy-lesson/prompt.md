---
schema: 1
id: plan-oracy-lesson
kind: prompt
title: Plan an oracy lesson
description: Plans a lesson that teaches talk explicitly, with a talk task, roles, sentence stems, ground rules, a listening task and feedback on the physical, linguistic, cognitive and social strands.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
subject: [education-sector]
requires: [none]
inputs: [topic, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [oracy, speaking-and-listening, sentence-stems, talk-roles, debate]
pairs_with:
  prompts: [plan-socratic-seminar, generate-discussion-questions, design-classroom-activity]
args:
  - name: topic
    description: The subject content the talk is about, e.g. "should our town build a bypass?" or "which material is best for a raincoat?".
    type: string
    required: true
  - name: year_group
    description: Year group or age, e.g. "Year 4".
    type: string
    required: true
  - name: talk_type
    description: discussion (exploratory talk in groups), debate (formal sides), presentation (individual or group speaking to an audience) or group-problem (talk to solve a problem together).
    type: enum
    enum: [discussion, debate, presentation, group-problem]
    default: discussion
  - name: lesson_minutes
    description: Lesson length in minutes.
    type: number
    default: 60
output_contract:
  format: markdown
  sections: [Talk objective, Task and roles, Ground rules and stems, Listening task, Lesson sequence, Feedback on talk]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A teacher wants to teach talk, not just use it: pupils learn to speak and listen well through deliberate instruction, practice and feedback, as in a widely used oracy framework with four strands - physical (voice, body), linguistic (vocabulary, register, structure), cognitive (reasoning, building on ideas, challenging) and social and emotional (listening, turn-taking, confidence). Common failures: "discuss in groups" with no structure, so a few pupils talk and the rest wait; a talk objective that is really a content objective; and feedback only on what was said, never on how.

Topic: {{topic}}. Year group: {{year_group}}. Talk type: {{talk_type}}. Lesson: {{lesson_minutes}} minutes.
</context>

<task>
1. Talk objective: one or two oracy skills from the strands that fit {{talk_type}} (for example "build on another person's idea" for discussion, "rebut a point with evidence" for debate, "vary pace and pause for effect" for presentation), stated separately from the content objective.
2. Task and roles: a talk task with a real reason to talk, group size (pairs, threes or fours), and roles that rotate (for example instigator, builder, challenger, summariser, or for debate proposer, opposer, rebuttal, chair), each with a role card line.
3. Ground rules: three or four co-agreed talk rules for this task. Sentence stems for the target skill, at two levels of challenge ("I agree with... because...", "Building on what ... said...", "I see it differently because...").
4. Listening task: what non-speakers do (track how ideas build, note one strong point to quote back, tally stems used), so everyone is active.
5. Lesson sequence: hook, model of good and weak talk (teacher-led or a fishbowl of one group), preparation time, talk rounds with timings, a mid-point coaching stop, and a reflection. Timings add up to {{lesson_minutes}} minutes.
6. Feedback on talk: a short checklist across the four strands for this task, how peers give feedback using it, and how the teacher records progress for a few pupils each lesson.
</task>

<constraints>
- Content must be accurate and age-appropriate; mark uncertain facts [check].
- Plan for quieter pupils and those learning the language of instruction: thinking time before talk, rehearsal in pairs, stems, and roles that do not force solo performance at first.
- Pupils with speech, language or communication needs, or who use alternative communication, take part with adaptations the teacher knows; ask about them if relevant rather than assuming.
- If the topic is vague ("the poem", "the topic"), ask what the content is and use a [content] placeholder meanwhile. If the teacher wants a light structure, keep the plan short but keep the essentials: one talk objective, one or two stems, a listening task and a one-line reason why unstructured groups leave many pupils silent.
- For debate topics, avoid sensitive issues that could target pupils' identities or experiences; suggest an alternative topic if needed.
</constraints>

<output_format>
## Talk objective
Oracy objective and content objective.

## Task and roles
Task, grouping, table: Role | What you do | Stem.

## Ground rules and stems
Rules, then stems in two levels.

## Listening task
Bullets.

## Lesson sequence
Table: Minutes | Phase | Teacher | Pupils.

## Feedback on talk
Checklist by strand, peer feedback routine, teacher recording.
</output_format>
