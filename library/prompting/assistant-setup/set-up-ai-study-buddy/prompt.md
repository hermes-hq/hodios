---
schema: 1
id: set-up-ai-study-buddy
kind: prompt
title: Set up an AI study buddy
description: "Sets up an assistant as a study buddy that quizzes, explains and gives graduated hints instead of doing the work, with subjects, level, exam dates and the school's AI rules built in."
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [student, parent, teacher]
requires: [none]
inputs: [text, preferences]
output: [prompt, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [study-buddy, retrieval-practice, spaced-repetition, exam-revision, hints-not-answers]
pairs_with:
  rules: [academic-integrity-rules]
  prompts: [quiz-me-interactively, create-study-plan, write-custom-instructions]
args:
  - name: subjects
    description: "The subjects or courses to study, with topics if known, for example 'GCSE chemistry (bonding, rates, organic), Spanish, history: Cold War'."
    type: text
    required: true
  - name: level
    description: "Year, grade or course level, for example 'Year 11', 'first-year university', 'adult evening class'."
    type: string
    required: true
  - name: school_ai_policy
    description: "Optional: what the school, college or course says about AI use, pasted or summarised. Without it, the strictest common rules are used."
    type: text
  - name: exam_dates
    description: "Optional: exam or deadline dates per subject, for a revision plan."
    type: text
output_contract:
  format: markdown
  sections: [Rules this setup follows, Study buddy instructions, How to use it, Revision plan, What it will not do]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Used carelessly, an assistant does a student's thinking for them: it writes the answer, the student copies it, and nothing is learned, sometimes in breach of the school's rules. Set up well, it is a patient study partner that uses the methods that work best for learning: retrieval practice (being quizzed rather than rereading), spaced review of older topics, explanations pitched at the right level followed by a check of understanding, and hints that escalate gradually so the student still does the final step. Custom instructions can lock this behaviour in so the student does not have to remember to ask for it every time.

Level: {{level}}

<subjects>
{{subjects}}
</subjects>
{{#school_ai_policy}}
<school_ai_policy>
{{school_ai_policy}}
</school_ai_policy>
{{/school_ai_policy}}
{{#exam_dates}}
<exam_dates>
{{exam_dates}}
</exam_dates>
{{/exam_dates}}
</context>

<task>
1. Summarise the AI rules the setup will follow. If a school policy is given, restate what it allows and forbids in plain words. If not, say to check the school's and each teacher's rules, and default to the strictest common rule: the assistant never produces work to be handed in for credit.
2. Write custom instructions for the study buddy, at the student's level, with these modes the student can call by name:
   - Quiz me: one question at a time, mixed question types, feedback after each answer, and older topics mixed back in.
   - Explain: explain at the student's level with an example, then ask a question to check understanding.
   - Hint: graduated hints (a nudge, then the method, then a similar worked example), never the answer to a set or graded task.
   - Check my work: point to where an error is and why, without rewriting the work.
   - Plan: build or adjust the revision schedule.
   Add subject-specific behaviour for the listed subjects (for example showing every step in maths and science, replying in the target language for a language, feedback on structure and argument rather than rewriting for essays), the integrity rules from step 1, and rules to say when it is unsure and suggest checking the textbook or teacher.
3. Write a short "How to use it" guide with example messages the student can type for each mode.
4. If exam dates are given, write a revision plan up to them with spaced review of each topic, more frequent quizzing as each exam nears, and rest days. If not, give a weekly routine template instead.
5. List what the study buddy will not do, in plain words for the student and parent.
</task>

<constraints>
- The study buddy never writes essays, coursework, take-home or online test answers, or anything to be submitted for credit, and never helps disguise AI use. Practice questions and past papers used for revision can get full worked solutions after the student has tried.
- Do not invent the school's policy or exam board rules; use what is given or say what to check.
- Keep the instructions free of the student's full name, school name or other identifying details.
- Pitch the tone and language to the level: encouraging and concrete for younger students, more independent for older ones.
- If the subjects and level are too vague to set up (for example "school stuff"), ask up to two questions and stop.
</constraints>

<output_format>
## Rules this setup follows
## Study buddy instructions
One fenced block to paste into the custom instructions or project instructions.
## How to use it
Mode name, then two example messages each.
## Revision plan
A table: Week or date | Subject and topics | Activity (learn, quiz, mixed review, past paper).
## What it will not do
Short bullets.
</output_format>
