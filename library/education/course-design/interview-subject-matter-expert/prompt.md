---
schema: 1
id: interview-subject-matter-expert
kind: prompt
title: Interview a subject matter expert
description: Writes an interview guide for drawing out a subject matter expert's tasks, decisions, cues, common novice errors and real examples for a course, with follow-up probes and a capture template.
category: course-design
version: 1.0.0
status: incubating
stage: [discover, design]
role: [teacher, manager]
requires: [none]
inputs: [topic, text]
output: [questions, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [sme-interview, cognitive-task-analysis, critical-incidents, tacit-knowledge, learning-and-development, needs-gathering]
pairs_with:
  prompts: [chunk-expert-content-into-modules, design-branching-scenario, write-learning-objectives]
args:
  - name: topic
    description: The skill or job the course will teach, for example "triaging customer complaints", "commissioning a heat pump", "running a month-end close".
    type: string
    required: true
  - name: audience
    description: Who the course is for and their starting level.
    type: string
    required: true
  - name: expert
    description: Optional. The expert's role and anything known about them (time available, how they explain things, whether they have trained people before).
    type: text
  - name: minutes
    description: Length of the interview in minutes.
    type: number
    default: 60
output_contract:
  format: markdown
  sections: [Interview plan, Before the interview, Questions, Probes, Capture template, After the interview]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an instructional designer trained in cognitive task analysis. Experts are poor at describing what they do: much of their skill is automatic, so asked "what should learners know?" they produce a list of topics and leave out the judgement calls, the cues they notice and the shortcuts that make them good. The way round this is to ask about real cases ("tell me about the last time...", "a time it went wrong"), walk through a task step by step, and probe each decision point: what did you notice, what else could it have been, what would a novice do here, how do you know it is done. Asking for artefacts (checklists, examples of good and bad work, logs) gives material for practice. Interviews also fail when they overrun the expert's time, so the guide is prioritised.

Topic: {{topic}}
Audience: {{audience}}
Interview length: {{minutes}} minutes.
{{#expert}}About the expert: {{expert}}{{/expert}}
</context>

<task>
1. **Interview plan:** the goal of the interview, the sections with minutes per section summing to {{minutes}}, and which questions to drop first if time runs short.
2. **Before the interview:** what to send the expert in advance (purpose, two or three prompts to think about, artefacts to bring) as a short message they can read in a minute.
3. **Questions:** grouped as task overview (main tasks and how often), walk-through of one real task from start to finish, decision points and cues, common novice errors and how they show, a critical incident (a time it went badly or very well), and what good looks like. Write each in plain words, open-ended, one idea per question.
4. **Probes:** for each group, three to five follow-ups to use when answers are general ("can you give me the last example?", "what did you see that told you that?", "what would a beginner do instead?").
5. **Capture template:** a table to fill in during or after the interview: task step, decision, cues, common error, example, artefact.
6. **After the interview:** how to check the notes with the expert, how to spot gaps, and when a second expert is needed to confirm a practice that may be personal habit.
</task>

<constraints>
- Do not include questions that ask the expert to design the course or list topics to cover; ask about the work.
- No leading questions that assume an answer.
- Keep the plan within {{minutes}} minutes, with the critical incident and decision points protected.
- Do not invent facts about the topic; the guide asks, it does not answer.
</constraints>

<output_format>
## Interview plan
Table: Section | Minutes | Goal. Then the drop-first list.
## Before the interview
The message to send.
## Questions
Numbered, grouped under bold group names.
## Probes
Bullets per group.
## Capture template
Empty table with the columns named.
## After the interview
Bullets.
</output_format>
