---
schema: 1
id: design-student-voice-survey
kind: prompt
title: Design a student feedback survey
description: Designs a short student feedback survey for a teacher or course, with unbiased questions, a plan for reading the results and a script for responding to the class. Use mid-term or at course end.
category: teaching
version: 1.0.0
status: incubating
stage: [verify, review]
role: [teacher]
requires: [none]
inputs: [topic, preferences]
output: [questions, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [student-voice, course-evaluation, mid-term-feedback, survey-design, you-said-we-did]
pairs_with:
  prompts: [design-formative-assessment, write-survey-questionnaire, analyze-class-assessment-results]
  personas: [instructional-coach]
args:
  - name: course
    description: The class or course and how it is taught, e.g. "Year 10 chemistry, 28 students, lots of practicals" or "online MBA finance module".
    type: string
    required: true
  - name: focus
    description: Optional aspects you most want feedback on, e.g. "pace, homework load, whether group work helps".
    type: text
  - name: grade_level
    description: Optional age or grade of the students, so wording and length fit, e.g. "Grade 4", "first-year university".
    type: string
output_contract:
  format: markdown
  sections: [Survey, Administration notes, Reading the results, Responding to the class]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Student feedback is most useful mid-course, when the teacher can still act on it, and when it asks about specific, changeable things (what helps you learn, what gets in the way, the pace, the clarity of instructions) rather than popularity. Short surveys get honest answers; long ones get straight-lining. Students answer more candidly when the survey is anonymous and they believe something will happen. Closing the loop matters as much as the questions: telling the class what you heard, what you will change, and what you will not change and why, builds trust and better feedback next time.
</context>

<task>
Design a student feedback survey for **{{course}}**.
{{#grade_level}}Students: {{grade_level}}.{{/grade_level}}
{{#focus}}
Focus areas:
<focus>
{{focus}}
</focus>
{{/focus}}

1. Write 6 to 10 questions, completable in about 5 minutes (fewer and simpler for young children). Include:
   - 4 to 6 rating items about specific, changeable aspects of the teaching (clarity, pace, feedback, activities, workload, classroom climate), using a consistent scale with labelled points; for children under about 9, use 3 faces or "yes / sometimes / not yet";
   - 2 or 3 open questions, such as "What is one thing that helps you learn in this class?", "What is one thing that makes learning harder?", "What is one change that would help you?";
   - focus-area questions if given.
2. Check every item: one idea per question (no double-barrelled items), no leading or loaded wording, age-appropriate vocabulary, and nothing that asks students to judge the teacher as a person or reveal sensitive personal information.
3. **Administration notes:** when to run it, anonymity (how to collect without names or identifiable handwriting), how to introduce it to students in 2 or 3 sentences, and accessibility (read aloud, translated versions).
4. **Reading the results:** how to summarise ratings (distribution, not just averages), how to code open comments into themes in 20 minutes, how to separate actionable patterns from one-off comments, and how not to over-react to a few harsh responses.
5. **Responding to the class:** a short "You said, I'll do" script template with three parts: what you heard (themes with rough proportions), what you will change and when, and what you will keep or cannot change and why. Include a quick follow-up check two or three weeks later.
</task>

<constraints>
- Keep the survey short; cut any question whose answer the teacher would not act on.
- Do not include demographic questions unless the teacher asks; with small classes they can identify students.
- Never ask students to rate peers or name other students.
- Match reading level to the stated grade; if no grade is given, write for about age 12 and say so.
</constraints>

<output_format>
## Survey
Introduction text for students, then numbered questions with response options.
## Administration notes
Bullets.
## Reading the results
Numbered steps, with a small theme-coding table example.
## Responding to the class
The script template, then the follow-up check.
</output_format>
