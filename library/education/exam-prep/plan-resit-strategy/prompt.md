---
schema: 1
id: plan-resit-strategy
kind: prompt
title: Plan a resit
description: Plans a resit after failing or underperforming in an exam, with a calm diagnosis of what went wrong, a changed study method, a schedule and how to ask tutors for support.
category: exam-prep
version: 1.0.0
status: incubating
stage: [plan, review]
role: [student]
requires: [none]
inputs: [preferences, text]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [resit, failed-exam, examiner-feedback, study-method, academic-support, retake]
pairs_with:
  prompts: [analyze-exam-mistakes, create-study-plan, analyze-past-papers]
args:
  - name: exam
    description: The exam or module being resat, with the level and the format (written, practical, oral; length; question types) if known.
    type: string
    required: true
  - name: weeks_until_resit
    description: Weeks until the resit.
    type: number
    required: true
  - name: result_feedback
    description: Optional result, marks by section or question, examiner comments, and the student's own sense of what went wrong (preparation, the day, illness, anxiety, time).
    type: text
  - name: hours_per_week
    description: Optional realistic study hours per week for this resit, after work, other modules and caring duties. Without it the plan states the hours it assumed.
    type: number
output_contract:
  format: markdown
  sections: [What the result tells you, What went wrong, What to change, Schedule, Support to ask for, Message to your tutor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A failed or disappointing exam feels like a verdict, but it is evidence about method and conditions. Most second failures come from repeating the first attempt harder: rereading the same notes for more hours, then making the same timing and technique mistakes on the day. Resits go well when the student names the specific cause and changes the method to match it. The usual causes are content gaps in particular topics; technique, such as ignoring the command word, not showing working or writing description where analysis was asked; timing, such as running out before the high-mark questions; misreading questions; and the conditions of the day, such as illness, a personal crisis or anxiety. The methods that work are active recall, spaced review, past papers under timed conditions, and marking one's own answers against mark schemes.

Institutions usually have processes that change the plan: viewing the marked script, examiner or module reports, extenuating or mitigating circumstances claims (often with a short deadline), study-skills and disability support, and rules on resit format, number of attempts and whether the resit mark is capped. A student who has just failed rarely knows these exist.
</context>

<task>
Plan a resit for {{exam}} with {{weeks_until_resit}} weeks to go.
{{#hours_per_week}}Study time available: about {{hours_per_week}} hours a week.{{/hours_per_week}}
{{#result_feedback}}
<result_and_feedback>
{{result_feedback}}
</result_and_feedback>
{{/result_feedback}}

Before planning, read what the student wrote for signs of distress.
- Hopelessness or danger signals ("I don't see the point of anything", not sleeping or eating for days, giving up on everything, any mention of self-harm): do not start with the plan. Reply first in a few warm, plain sentences: reflect what they said, ask directly and kindly whether they are having thoughts of harming themselves, point to emergency services or a crisis line now if they are or might be, and in any case to their institution's wellbeing service, a doctor or someone they trust. Say the resit can wait a day. Give only a small first step: one message to send (to the tutor or the wellbeing service) and the two most useful actions for the coming week. Offer the full plan when they feel ready.
- Ordinary upset (disappointment, embarrassment, worry): acknowledge it in one sentence and write the full plan.

The full plan:

1. **What the result tells you.** Two or three plain sentences: what the result does and does not show, and that the plan changes the method rather than adding hours. No platitudes.
2. **What went wrong.** If marks or feedback were given, classify the likely causes and quote the evidence for each (a section score, an examiner comment, blank questions). Read score patterns: "70% on short answers, 10% on long questions, two left blank" points to long-answer technique and timing, not general weakness. If no feedback was given, give a provisional diagnosis with the assumption stated, the questions the student should answer about the first attempt, and the documents to request: the marked script, the mark breakdown and the examiner or module report.
3. **What to change.** For each cause, one concrete method change and why it fixes that cause: content gaps, active recall and spaced review on the named topics; technique, their own answers marked against the mark scheme and a model answer; timing, timed sections with a per-question budget set from the marks available; misreading, a routine of marking the command word and the limits of each question; anxiety, practice under exam conditions and a plan for the first five minutes of the paper.
4. **Schedule.** Week by week across {{weeks_until_resit}} weeks: get the script and feedback and fill the top gaps first, then mixed practice on weak areas, then full timed papers with self-marking, then light review before the day, with one rest day a week. Fit it to the hours available; if no weekly hours were given, state the hours you assumed. If the time is very short, put the highest-mark topics and technique first and say what is being left out.
5. **Support to ask for.** Questions to put to the institution: the resit format and date, whether the mark is capped, the number of attempts left, whether extenuating or mitigating circumstances apply to the first attempt and the deadline for claiming them, access arrangements if a disability or health condition may be involved, and study-skills or tutoring support.
6. **Message to your tutor.** A short, honest email in the student's voice asking to go through the script and for advice on the resit, with brackets for details only they know.
</task>

<constraints>
- Tone: calm, direct and respectful. No blame, no false cheer, and no dismissing real setbacks such as illness or bereavement.
- Never invent the institution's rules, deadlines or caps; phrase them as things to check in the regulations or with the tutor.
- Never imply the resit outcome is guaranteed.
- Base the diagnosis on the evidence given, and label guesses provisional.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
Use the section headings from the output contract. When the distress branch applies, give only the short caring reply and the first step, with no headings. What went wrong as a table: Cause | Evidence | Confidence (high / medium / provisional). What to change as a table: Cause | New method | Why it works. Schedule as a table: Week | Focus | Activities | Checkpoint. The email in a quote block.
</output_format>
