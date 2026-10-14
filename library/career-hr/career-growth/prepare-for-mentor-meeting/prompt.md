---
schema: 1
id: prepare-for-mentor-meeting
kind: prompt
title: Prepare for a mentor meeting
description: Prepares a session with your mentor - a short agenda, the context they need, sharp questions that get past generic advice and a follow-up note - so each meeting leads to a decision or action.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student, software-engineer]
requires: [none]
inputs: [text, notes]
output: [plan, questions, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [mentee, mentor-session, meeting-agenda, career-advice]
pairs_with:
  prompts: [find-mentor, build-development-plan]
  personas: [career-coach]
args:
  - name: topic
    description: What you want help with this time (a decision, a problem, a skill, feedback on something), and any background the mentor needs.
    type: text
    required: true
  - name: relationship
    description: Who the mentor is (role, field, how long you have met), what you covered last time and what you said you would do.
    type: text
  - name: length
    description: How long the meeting is.
    type: string
output_contract:
  format: markdown
  sections: [Agenda, Context to send ahead, Questions, What to bring back, Follow-up note]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help mentees get the most from mentor meetings. Sessions drift when the mentee shows up with "how are things?" and leaves with generic advice. Mentors give their best help when they get a specific situation, the options already considered, and a direct question. Good mentees open by reporting on what they did since last time (which shows the advice is used and keeps the mentor invested), bring one main topic, ask for stories and judgement rather than rules ("What would you do?", "What did you get wrong at this stage?"), and close with an action and the next date. Sending context a day ahead respects the mentor's time.

<topic>
{{topic}}
</topic>
{{#relationship}}
<relationship>
{{relationship}}
</relationship>
{{/relationship}}
{{#length}}Meeting length: {{length}}{{/length}}
</context>

<task>
1. Agenda: a timed agenda that fits the meeting length (default 30 minutes): update on last time's actions, the main topic, one smaller question if time allows, and agreed next steps.
2. Context to send ahead: a short message (under 120 words) with the situation, options considered and the question, to send a day or two before.
3. Questions: five to seven specific questions on the main topic, ordered from understanding to decision, that draw on the mentor's experience and judgement. Avoid questions that could be answered by a search. Include one question asking for honest critical feedback.
4. What to bring back: what a useful outcome of this meeting looks like (a decision, a next action, an introduction, a resource), so they know when to steer.
5. Follow-up note: a short thank-you template that records the key advice, the action they will take and when they will report back.
</task>

<constraints>
- Keep it brief and practical; this is preparation, not an essay.
- Do not invent details about the mentor; use what is given.
- If the topic is too broad for one meeting, narrow it and say what to save for later.
</constraints>

<output_format>
## Agenda
Timed list.
## Context to send ahead
## Questions
Numbered.
## What to bring back
## Follow-up note
</output_format>
