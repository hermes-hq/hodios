---
schema: 1
id: request-exam-access-arrangements
kind: prompt
title: Request exam access arrangements
description: Helps a student or parent work out which exam access arrangements to ask about, what evidence is usually needed and who decides, then builds a dated plan and drafts the request.
category: exam-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [student, parent]
requires: [none]
inputs: [text]
output: [plan, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [access-arrangements, reasonable-adjustments, extra-time, disability, learning-differences]
pairs_with:
  prompts: [adapt-study-for-learning-difference, plan-exam-day-strategy]
args:
  - name: needs
    description: What makes exams harder and how it shows up - diagnosis or condition if any, what happens in timed work, current support in class, existing reports or letters.
    type: text
    required: true
  - name: exam_type
    description: The exam and country, such as "GCSEs in England", "SAT in the US", "IB Diploma", "university finals in Ireland", "a professional certification".
    type: string
    required: true
  - name: exam_date
    description: Optional date or month of the first exam. Deadlines for applications are often months before.
    type: string
output_contract:
  format: markdown
  sections: [What to ask about, Evidence to gather, Who decides, Dated plan, Draft request, Questions to check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Access arrangements (also called accommodations or reasonable adjustments) let candidates with a disability, learning difference, medical condition or injury show what they know: extra time, rest breaks, a reader or computer reader, a scribe or speech-to-text, a word processor, a separate or smaller room, modified papers (enlarged, coloured, braille), a prompter. The rules belong to the exam body and the school or centre, and they share three features worth knowing early: the arrangement should match the candidate's normal way of working, so it must already be in use in class and in mocks; most need evidence (specialist assessment, medical letter, teacher observations); and there are deadlines, often months before the exam. Families lose arrangements by asking too late, asking for the wrong thing, or asking the exam body directly when the centre's coordinator must apply.

Exam: {{exam_type}}.{{#exam_date}} First exam: {{exam_date}}.{{/exam_date}}
</context>

<task>
<needs>
{{needs}}
</needs>

1. Map each difficulty described to the arrangements that usually address it (for example slow processing or writing speed to extra time or a word processor; reading decoding to a reader; anxiety or concentration to rest breaks or a smaller room; pain or fatigue to rest breaks and seating). Say which are commonly granted and which need stronger evidence.
2. For each, list the evidence usually needed for this kind of exam, as you understand it, marked "check with the centre": assessment by a qualified assessor, medical letter, history of need, normal way of working in class.
3. Name who decides and who applies: usually the school's or centre's exams officer or special educational needs coordinator (or a university disability service, or the testing organisation's accommodations office for tests taken independently).
4. Build a dated plan working back from the first exam date (if no date was given, ask for it and use relative timings such as "at least 6 months before" meanwhile): first contact now, assessments, trial in mocks, application deadline to confirm, confirmation in writing before the exam. Say plainly if time looks short and what to do (ask about late or temporary arrangements).
5. Draft a short, polite request to the right person: the student's needs in plain words, the arrangements to consider, the evidence attached or being arranged, a request for the deadline and next steps.
</task>

<constraints>
- Do not promise any arrangement will be granted or state eligibility thresholds (such as test scores) as fact; rules vary by exam body and change yearly. Say where to check.
- If the country or exam is unclear, ask, because processes differ a lot.
- Do not diagnose. If no assessment exists and difficulties are significant, suggest asking the school or a qualified assessor about an assessment.
- Respectful language about disability; the student's own description of their needs comes first.
- Never invent policies, deadlines or contact names; use placeholders like [exams officer name].
</constraints>

<output_format>
## What to ask about
Table: Difficulty | Arrangement to discuss | Usually needs.

## Evidence to gather
Checklist.

## Who decides
Two or three lines.

## Dated plan
Table: By when | Action | Who.

## Draft request
The message, under 200 words, with [placeholders].

## Questions to check
Bullets to ask the centre.
</output_format>
