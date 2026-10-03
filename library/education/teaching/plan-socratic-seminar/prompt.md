---
schema: 1
id: plan-socratic-seminar
kind: prompt
title: Plan a Socratic seminar
description: Plans a Socratic seminar on a text with student preparation, opening, core and closing questions, roles, discussion norms and a fair way to assess participation.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [topic, document]
output: [plan, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [socratic-seminar, student-discussion, fishbowl, close-reading, speaking-and-listening]
pairs_with:
  prompts: [generate-discussion-questions, create-rubric, design-self-and-peer-assessment]
  personas: [socratic-tutor]
args:
  - name: text
    description: The text for the seminar (title and author, a pasted excerpt, or a short summary), e.g. "'The Lottery' by Shirley Jackson" or a pasted speech.
    type: string
    required: true
  - name: grade_level
    description: Grade, year or course, e.g. "Grade 8 ELA", "Year 11 history", "AP Seminar".
    type: string
    required: true
  - name: learning_goal
    description: Optional goal for the seminar, e.g. "analyse how the setting builds tension" or "evaluate the strength of the author's argument".
    type: text
  - name: minutes
    description: Seminar length in minutes.
    type: number
    default: 45
output_contract:
  format: markdown
  sections: [Overview, Student preparation, Format and roles, Norms, Questions, Facilitation, Assessment, Debrief]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A Socratic seminar is a student-led discussion of a rich text where students build understanding together by asking questions, citing the text and responding to one another rather than to the teacher. It succeeds or fails in the preparation: students who have annotated the text and drafted their own questions talk about the text; students who have not, talk around it. Good questions are genuinely open (more than one defensible answer), anchored in specific passages, and sequenced from an opening question anyone can enter, through core questions that require close reading, to a closing question that connects the text to the wider world. Participation assessment is where seminars often become unfair: counting how many times someone spoke rewards dominance and penalises quiet thinkers.
</context>

<task>
Plan a {{minutes}}-minute Socratic seminar for **{{grade_level}}** on:

<text>
{{text}}
</text>
{{#learning_goal}}
Learning goal: {{learning_goal}}
{{/learning_goal}}

1. Check your knowledge of the text. If you do not know it reliably and no excerpt is given, do not invent quotations, page numbers or plot details: write the questions around passages the teacher will choose, mark them as "[passage: …]", and ask for the excerpt at the end. Never present a made-up quote as the author's words.
2. **Student preparation:** an annotation task with 3 or 4 specific focuses tied to the goal, plus a ticket to enter (each student brings two open questions and one passage they want to discuss, with a reason). Include what students do if they did not prepare.
3. **Format and roles:** choose a format that suits the class size and age (whole circle, inner and outer circle fishbowl, or triad with a "hot seat"), and explain the choice. Give outer-circle observers a specific task (tracking a partner's text references, building on others, questions asked).
4. **Norms:** 4 to 6 student-facing norms, with sentence stems for building on, disagreeing respectfully, asking for evidence and inviting others in.
5. **Questions:** one opening question, 4 to 6 core questions and one closing question. For each core question, give the passage it draws on and two contrasting positions students might take, so the teacher can recognise a productive discussion.
6. **Facilitation:** a timeline that adds up to {{minutes}} minutes, the teacher's minimal role (when to step in, how to redirect without taking over), and moves for common problems: silence, one student dominating, discussion drifting from the text, factual errors.
7. **Assessment:** a short rubric (3 to 4 criteria such as use of textual evidence, building on others, questioning, and reflective listening) scored on quality, not frequency, and an alternative route for students who contribute less orally (observer notes, written reflection).
8. **Debrief:** a 5-minute group reflection on the discussion process and an individual exit writing prompt.
</task>

<constraints>
- Questions are open and interpretive; avoid questions with a single factual answer, except one quick comprehension check during preparation.
- Keep the content suitable for {{grade_level}}. If the text deals with sensitive themes (violence, racism, suicide), add a short note on preparing students and keeping the discussion respectful and safe.
- Assessment must never rely on talk counts alone.
</constraints>

<output_format>
## Overview
Text, goal (stated or drafted), format chosen, assumptions.
## Student preparation
Annotation focuses, ticket to enter, plan for the unprepared.
## Format and roles
Layout, roles, observer task.
## Norms
Norms and sentence stems.
## Questions
Opening, core (with passage and two possible positions each), closing.
## Facilitation
Timeline table: Minutes | Phase | Students | Teacher. Then troubleshooting moves.
## Assessment
Rubric table and the alternative route.
## Debrief
Group reflection questions and exit prompt. If passages are placeholders, end by asking for the excerpt.
</output_format>
