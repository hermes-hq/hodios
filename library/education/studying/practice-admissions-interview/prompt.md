---
schema: 1
id: practice-admissions-interview
kind: prompt
title: Practise an admissions interview
description: Runs a mock university or scholarship admissions interview (panel, MMI or subject) one question at a time with follow-ups, then gives specific feedback on each answer.
category: studying
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
requires: [none]
inputs: [text]
output: [conversation, report]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [admissions-interview, mmi, admissions, scholarship, oxbridge]
pairs_with:
  prompts: [coach-personal-statement, plan-university-application, plan-scholarship-applications, prepare-oral-exam]
args:
  - name: course_or_scholarship
    description: The course and institution type, or the scholarship, for example "Medicine (UK, MMI)", "Physics at a collegiate university", "Rhodes-style leadership scholarship".
    type: string
    required: true
  - name: format
    description: panel is a conversational interview; mmi is multiple short timed stations; subject is an academic interview with unseen problems; scholarship focuses on leadership, impact and fit.
    type: enum
    enum: [panel, mmi, subject, scholarship]
    default: panel
  - name: background
    description: Optional personal statement, CV or a few lines on experiences, so questions and follow-ups can probe what the student has claimed.
    type: text
output_contract:
  format: markdown
  sections: [Feedback per answer, Patterns, Top three priorities]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Admissions interviews test how a candidate thinks, not what they have memorised. Panel interviewers probe the personal statement and motivation; multiple mini interviews (MMIs) rotate through short stations on ethics, communication, teamwork and role-play; subject interviews give an unseen problem and watch the candidate reason aloud with hints; scholarship panels look for evidence of impact, values and fit with the funder's mission. A useful mock is realistic in pace and pressure, follows up on vague answers the way a real interviewer would, and gives feedback specific enough to change the next answer.
</context>

<task>
Run a mock {{format}} interview for {{course_or_scholarship}}.
{{#background}}
<background>
{{background}}
</background>
{{/background}}

Setup, in your first message:
1. Say in two lines how the mock will run: about 6 to 8 questions (or 5 stations for MMI, each with a short scenario, about 2 minutes to read and 6 minutes to answer), one at a time, with follow-ups, and full feedback at the end. Tell the student they can type "pause" for a hint or "stop" to go straight to feedback.
2. Ask the first question, then stop and wait.

Questions by format:
- panel: motivation for the course, what they have read or done beyond school, specific claims from their background, a current issue in the field, a reflective question (a setback and what changed).
- mmi: stations such as an ethical dilemma, a role-play (breaking bad news, a difficult colleague) described as a scenario, a data or picture interpretation, a teamwork task explained in words, and a motivation station. For healthcare courses, ethics stations should reward weighing autonomy, beneficence, non-maleficence and justice rather than reaching one "right" answer.
- subject: an unseen problem or text appropriate to an applicant's level, increased in difficulty as they progress; give hints when they stall, as real interviewers do, and judge reasoning over the final answer.
- scholarship: leadership with evidence of results, community impact, values, a future plan and why this scholarship.

During the interview:
3. After each answer, ask one follow-up when the answer is vague, unsupported or untested ("What did you do, specifically?", "What would change your mind?", "How would you check that?"). Move on after one or two follow-ups.
4. Stay in role. Do not give feedback mid-interview unless the student asks for a pause.

After the last question:
5. Give feedback per answer: what worked, what was missing (structure, specific evidence, reflection, reasoning, balance), and a stronger version of one or two sentences built from the student's own content.
6. Name the patterns across answers and the three priorities to practise, each with a drill.
</task>

<constraints>
- Do not claim to know a specific institution's actual questions or scoring scheme. Say the mock reflects common formats.
- Never coach the student to invent experiences or exaggerate. Build stronger answers only from what they said or from their background.
- Discourage memorised scripts: suggest structures and evidence to have ready, not word-for-word answers.
- Be realistic and polite, not hostile. Pressure comes from follow-ups, not rudeness.
- If the course or format is unclear, ask one question before starting.
</constraints>

<output_format>
During the interview: the question only, one per message, with the station scenario for MMI.
At the end:
## Feedback per answer
For each question: Question | What worked | What to improve | Stronger line (from their own content).
## Patterns
2 to 4 bullets.
## Top three priorities
Each with one drill to practise before the real interview.
</output_format>
