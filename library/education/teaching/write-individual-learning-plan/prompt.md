---
schema: 1
id: write-individual-learning-plan
kind: prompt
title: Write an individual learning plan
description: Writes an individual learning plan for an adult or further-education learner from initial assessment notes, with a goal, SMART targets in the learner's words, support and review dates.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
subject: [education-sector]
requires: [none]
inputs: [notes, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [adult-learning, further-education, smart-targets, initial-assessment, learner-voice, rarpa]
pairs_with:
  personas: [vocational-college-lecturer]
  prompts: [write-one-page-pupil-profile]
args:
  - name: initial_assessment
    description: Initial assessment and induction notes - starting levels in English, maths or digital skills, prior learning, the learner's goals and words, barriers (work, childcare, confidence), and any declared support needs. Initials only.
    type: text
    required: true
  - name: course
    description: The course or programme, its length and level, e.g. "Level 2 Functional Skills English, 30 weeks, evenings" or "non-accredited Confidence with Computers, 10 weeks".
    type: string
    required: true
  - name: review_weeks
    description: How often targets are reviewed, in weeks.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [About the learner, Starting point, Main goal, Targets, Support, Reviews, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An adult education or further education tutor is turning initial assessment notes into an individual learning plan (ILP) for a learner on {{course}}. A useful ILP is owned by the learner: a goal that means something in their life, a few short-term targets they helped write and can explain, and support that removes their actual barriers. Weak ILPs are paperwork: targets copied from the qualification ("complete Unit 3"), written in tutor language, too many to track, and never reviewed. For non-accredited learning, progress needs to be recognised and recorded against the learner's own starting point (an approach often called RARPA).

Review every {{review_weeks}} weeks.
</context>

<task>
<initial_assessment>
{{initial_assessment}}
</initial_assessment>

1. About the learner: their reason for learning and what they want to be able to do, in their own words where the notes have them; strengths and prior experience.
2. Starting point: assessed levels and the specific gaps found (for example "uses full stops but not commas in lists", "cannot yet calculate percentages"), not just a level number.
3. Main goal: one longer-term goal that links the course to the learner's purpose (work, family, further study, independence).
4. Targets: three, at most four, short-term SMART targets: specific, measurable, achievable by the next review, relevant to the goal, time-bound. Write each in plain first-person words the learner could say ("By 14 March I can write a short email to my manager with paragraphs and correct punctuation"), with how it will be checked.
5. Support: what the tutor, the learner and others will do, including adjustments for declared needs, help with barriers (timing, travel, childcare, confidence) and referrals to the provider's learner support or advice services where relevant.
6. Reviews: dates every {{review_weeks}} weeks from the start of the course (as placeholders if no start date), and what each review covers: progress against each target, evidence, new targets, the learner's comment.
</task>

<constraints>
- Use only what the notes say. Do not assume a learning difficulty, disability or circumstance; if support needs are unclear, list a question.
- Adult, respectful tone; never childish wording.
- Do not give benefits, immigration or legal advice; refer to the provider's advice service.
- Initials only; personal circumstances only as far as needed for support.
- If starting levels or the learner's goal are missing, say so and mark targets [draft - agree with learner].
</constraints>

<output_format>
## About the learner
Short paragraph.

## Starting point
Table: Area | Assessed level | Specific gaps | Strengths.

## Main goal
One sentence.

## Targets
Table: Target (learner's words) | How it is checked | By when.

## Support
Bullets: tutor, learner, other.

## Reviews
Table: Review date | Focus | Learner comment (blank).

## Questions
What to agree with the learner.
</output_format>
