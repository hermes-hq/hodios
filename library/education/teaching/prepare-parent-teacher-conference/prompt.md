---
schema: 1
id: prepare-parent-teacher-conference
kind: prompt
title: Prepare for parent-teacher conferences
description: Prepares a teacher for parent-teacher conferences with a timed brief per student covering strengths with evidence, one concern, a shared goal and questions to ask the family.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [notes]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [parent-teacher-conference, family-engagement, conversation-plan, student-progress]
pairs_with:
  prompts: [write-parent-email, write-report-card-comments, write-classroom-newsletter]
  personas: [instructional-coach]
args:
  - name: student_notes
    description: Notes per student, using initials or first names only, e.g. grades or assessment results, work habits, strengths, concerns, things the family raised before.
    type: text
    required: true
  - name: conference_length_minutes
    description: Length of each conference slot in minutes.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [Before the conferences, Student briefs, Handling hard moments, After the conferences]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A short conference goes well when the family leaves knowing three things: the teacher knows and likes their child, exactly how the child is doing with evidence they can see, and one thing the school and the family will each do next. Conferences go badly when the teacher reads out grades, raises five concerns, uses jargon, runs out of time before listening, or is surprised by a family's question. Preparation means choosing the one concern that matters most, bringing evidence (a work sample, a number), and planning time for the family to talk.
</context>

<task>
Prepare briefs for {{conference_length_minutes}}-minute conferences from these notes.

<student_notes>
{{student_notes}}
</student_notes>

1. **Before the conferences:** a short checklist (work samples to pull, data to print, room setup side by side rather than across a desk, interpreter bookings, timer).
2. **For each student, a brief that fits {{conference_length_minutes}} minutes:**
   - **Opening (1 minute):** a specific, genuine positive about the child as a person or learner.
   - **Strengths with evidence:** 2 points, each with the evidence to show (a work sample, a score, an observation).
   - **One concern:** the most important one only, as observable facts with evidence, what the teacher has tried, and why it matters. If the notes show no real concern, a next learning step instead.
   - **Questions to ask the family:** 2 or 3 open questions ("What does homework time look like at home?", "What does she say about school?"), and time to listen.
   - **Shared goal:** one goal with what the school will do and one simple thing home can do.
   - **Timing:** a minute-by-minute split that keeps at least a third of the time for the family to speak.
3. **Handling hard moments:** short scripts for a family that disagrees with a grade, one that becomes upset or angry, one that raises a concern about another child, and when to say "let's set up a longer meeting with [colleague]".
4. **After the conferences:** a follow-up note template and a tracking table of agreed actions.
</task>

<constraints>
- Use only the information in the notes. Where evidence is thin, say what to bring rather than inventing scores or incidents.
- No diagnoses, labels or speculation about home life or the child's health. Describe behaviour and learning, not character ("handed in 3 of 8 homework tasks", not "lazy").
- Never discuss other students. Use initials or first names only, as given.
- Plain language, no acronyms or education jargon. Note where an interpreter or translated summary may help.
- If the notes suggest a safeguarding or child-protection concern (signs of harm, neglect, a disclosure), do not include it in the conference plan: say it must go to the school's designated safeguarding lead under school procedures before the conference.
- If notes for a student are too thin to prepare, list what to gather for that student instead of padding.
</constraints>

<output_format>
## Before the conferences
Checklist.
## Student briefs
One section per student (### Initials) with: Opening · Strengths and evidence · Concern or next step · Questions to ask · Shared goal (school / home) · Timing.
## Handling hard moments
Situation → what to say, in quotes.
## After the conferences
Follow-up note template, then a table: Student | Agreed action | Who | By when.
</output_format>
