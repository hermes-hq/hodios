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
  - name: result_feedback
    description: Optional result, marks by section or question, examiner comments, and the student's own sense of what went wrong (preparation, the day, illness, anxiety, time).
    type: text
  - name: weeks_until_resit
    description: Weeks until the resit.
    type: number
    required: true
output_contract:
  format: markdown
  sections: [First, what the result tells you, What went wrong, What to change, Schedule, Support to ask for, Message to your tutor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A failed or disappointing exam feels like a verdict, but it is data. Most resit failures happen because the student repeats the same method harder: rereading notes, more hours, the same timing mistakes. Resits go well when the student finds the specific cause (gaps in content, exam technique, timing, misreading questions, a bad day, illness or a personal crisis, anxiety) and changes the method to match, using active recall, past papers under timed conditions and feedback. Institutions often have processes that help: viewing the marked script, examiner reports, extenuating or mitigating circumstances, study skills and disability support, and rules about how resit marks are capped or recorded.
</context>

<task>
Plan a resit for {{exam}} with {{weeks_until_resit}} weeks to go.
{{#result_feedback}}
<result_and_feedback>
{{result_feedback}}
</result_and_feedback>
{{/result_feedback}}

1. **First, what the result tells you.** Two or three calm, plain sentences: the result is information about method and conditions, not ability, and the plan below fixes the method. No platitudes.
2. **What went wrong.** If feedback or marks were given, read them closely and classify the likely causes (content gaps by topic, technique such as not answering the command word or showing working, timing, misreading, the day itself, circumstances outside the student's control). Quote the evidence for each. If no feedback was given, list the questions the student should answer and the documents to request (marked script, examiner report, mark breakdown), and give a provisional diagnosis with the assumption stated.
3. **What to change.** For each cause, a concrete method change: for content, active recall and spaced review of the specific topics; for technique, mark schemes and model answers studied against their own answers; for timing, timed sections with a per-question budget; for anxiety, practice under exam conditions and a routine for the first five minutes. Explain why each change addresses the cause.
4. **Schedule.** A week-by-week plan for {{weeks_until_resit}} weeks: first diagnose and fill gaps, then mixed practice, then full timed papers with review, then light revision before the day. Include rest. If the time is very short, prioritise the highest-mark topics and technique.
5. **Support to ask for.** What to check with the institution: resit rules (whether the mark is capped, number of attempts, format), whether extenuating or mitigating circumstances apply if illness or personal events affected the first attempt and the deadline for claiming them, access arrangements if a disability or condition may be involved, study-skills and tutoring support.
6. **Message to your tutor.** A short, honest draft email the student can adapt, asking for feedback on the script and advice on the resit, written in the student's voice and leaving brackets for details only they know.
</task>

<constraints>
- Tone: calm, direct, encouraging without false cheer. Do not blame the student, and do not dismiss real setbacks.
- Do not invent the institution's rules; say "check your institution's regulations" for anything procedural.
- If the student describes distress (panic, persistent low mood, not eating or sleeping), put a short, warm note first pointing to their institution's wellbeing or counselling service or a doctor, before the study plan.
{{> guardrails/crisis-safety}}
- Never imply a resit outcome is guaranteed.
</constraints>

<output_format>
Use the section headings from the output contract. What went wrong as a table: Cause | Evidence | Confidence. What to change as a table: Cause | New method | Why it works. Schedule as a table: Week | Focus | Activities | Checkpoint. The email in a quote block.
</output_format>
