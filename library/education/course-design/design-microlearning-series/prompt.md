---
schema: 1
id: design-microlearning-series
kind: prompt
title: Design a microlearning series
description: Designs a series of five-minute lessons delivered over days, each with one objective, a hook, a practice item with feedback and spaced recall of earlier lessons.
category: course-design
version: 1.0.0
status: incubating
stage: [design, build]
role: [teacher, manager, consultant]
requires: [none]
inputs: [topic, preferences]
output: [plan, script, quiz]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [microlearning, spaced-repetition, retrieval-practice, learning-and-development, drip-course]
pairs_with:
  prompts: [write-learning-objectives, design-elearning-module, evaluate-training-effectiveness]
  personas: [instructional-designer]
args:
  - name: topic
    description: What the series teaches, e.g. "giving feedback with the SBI model", "spotting phishing emails", "basic food hygiene for new kitchen staff".
    type: string
    required: true
  - name: audience
    description: Who it is for and what they already know, e.g. "first-time team leads in retail, no management training".
    type: string
    required: true
  - name: lesson_count
    description: Number of lessons in the series.
    type: number
    default: 10
  - name: channel
    description: How lessons are delivered.
    type: enum
    enum: [email, chat, app, video]
    default: email
output_contract:
  format: markdown
  sections: [Series overview, Objectives map, Schedule, Lessons, Final check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Microlearning works when each piece is small because it is focused, not because a long course was chopped into slices. A good five-minute lesson has one objective, starts with a hook that makes the learner care (a scenario, a surprising fact, a mistake they recognise), teaches one idea with one concrete example, and asks the learner to do something with it straight away. Across a series, the strongest lever is retrieval spaced over time: each lesson asks a quick question about an earlier one, at growing intervals, so knowledge is pulled back before it fades. The channel shapes the format: an email can carry a short read, a chat message must be shorter still, a video lesson needs a script.
</context>

<task>
Design a {{lesson_count}}-lesson microlearning series on **{{topic}}** for **{{audience}}**, delivered by **{{channel}}**.

1. **Series overview:** the overall performance goal (what learners will do differently at work or in life), why microlearning suits it, the cadence (for example every working day), and the total time per lesson.
2. **Objectives map:** split the goal into {{lesson_count}} single objectives, one per lesson, each with an observable verb, sequenced so each builds on the last. Group them into 2 to 4 themes.
3. **Schedule:** the delivery day for each lesson and which earlier lessons each one recalls, using expanding gaps (for example recall lesson 1 in lessons 2, 4 and 8).
4. **Lessons:** for each lesson write:
   - title and objective;
   - the hook (one or two sentences);
   - the core content in the channel's format: email about 150 to 250 words; chat 3 to 5 short messages; app a few screens of text with a prompt; video a 60 to 120 second script with on-screen text cues;
   - one practice item (scenario question, choose the better response, spot the mistake, or a do-it-today task) with feedback for each answer, explaining why;
   - one spaced recall question on an earlier lesson, with the answer (from lesson 2 onwards);
   - a one-line "try this today" action.
5. **Final check:** a 5 to 8 item scenario-based check covering the whole series, with answers, and one reflection question about applying it.
</task>

<constraints>
- One idea per lesson; if the topic needs more than {{lesson_count}} lessons to do properly, say what you would cut or add.
- Keep each lesson to about five minutes of the learner's time, including the practice.
- Practice items test application in realistic situations, not recall of the lesson's wording. Distractors reflect real mistakes.
- Plain, friendly language for the audience; no jargon without a definition.
- Use only accurate content. For regulated topics (safety, food hygiene, compliance) state that content must be checked against the organisation's policies and local regulations, and do not invent specific legal requirements or figures.
- If the topic is too broad for a series (for example "management"), narrow it, say how, and design for the narrower topic.
</constraints>

<output_format>
## Series overview
Bullets.
## Objectives map
Table: Lesson | Theme | Objective.
## Schedule
Table: Lesson | Day | Recalls lessons.
## Lessons
One subsection per lesson with the parts in step 4, labelled.
## Final check
Numbered items with answers, then the reflection question.
</output_format>
