---
schema: 1
id: build-exam-pressure-practice
kind: prompt
title: Build exam pressure practice
description: Builds a graded ladder of practice under exam conditions for students who know the material but freeze or blank in exams, plus a pre-exam routine and an in-room reset. Not therapy.
category: exam-prep
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [student]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [exam-nerves, blanking, pressure-practice, mock-conditions, retrieval-practice, arousal-reappraisal]
pairs_with:
  prompts: [manage-event-anxiety, plan-exam-day-strategy, generate-practice-exam]
args:
  - name: what_happens
    description: What happens in exams that does not happen when you revise, for example "my mind goes blank on the first question", "I rush and misread", "I panic when I see a topic I didn't revise". Include the subject and type of exam.
    type: text
    required: true
  - name: exam_date
    description: Optional. When the exam is, for example "in 5 weeks", "12 June".
    type: string
  - name: age_group
    description: teen for students under 18 (more adult support in the plan); adult otherwise.
    type: enum
    enum: [teen, adult]
    default: adult
output_contract:
  format: markdown
  sections: [What is going on, Your pressure ladder, Pre-exam routine, If you blank in the room, When to get more support]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many students revise well and then underperform in the exam room. Usually the knowledge is there but has only been practised in calm conditions: rereading notes at home, untimed, with answers nearby. Under pressure, attention narrows and recall from weakly practised material fails first. What helps, with good research support: practising retrieval (testing yourself, not rereading), doing it repeatedly under conditions that get closer to the real exam, reading a racing heart as the body getting ready rather than as danger, and having a rehearsed routine for the first minutes and for a blank. Avoiding all pressure until the day makes it worse.

This is a study-skills plan, not therapy. It must notice when nerves are more than nerves.
</context>

<task>
Build an exam pressure practice plan from what the student describes.

<what_happens>
{{what_happens}}
</what_happens>
{{#exam_date}}Exam date: {{exam_date}}.{{/exam_date}} Age group: {{age_group}}.

1. What is going on: in three or four sentences, reflect back their pattern in their own words and explain the likely mechanism plainly (knowledge practised only in calm conditions, a racing heart read as danger, a bad first question setting the tone). No labels or diagnoses.
2. Pressure ladder: five or six rungs from easy to exam-like, each done at least twice before moving up. For example: closed-book recall at home; a timed short set at home; a timed set somewhere unfamiliar (library, another room); a timed set with someone watching or a small stake; a full timed mock in exam conditions; a second full mock. For each rung say exactly what to do, how long, and what "ready to move up" looks like. Fit the rungs to their exam type and their specific pattern. {{#exam_date}}Schedule the rungs backwards from {{exam_date}}, leaving the last few days light.{{/exam_date}}
3. Pre-exam routine: a 10-minute routine to rehearse before every mock so it is automatic on the day: a short written brain dump of worries or key facts, slow breathing with a longer out-breath for about a minute, and a reframing line they choose ("my body is getting ready").
4. If you blank in the room: a 60-second reset they practise on the ladder: pen down, feet flat, three slow breaths with long out-breaths; write anything related to the question; move to an easier question and come back; remember that marks are counted question by question.
5. When to get more support: signs that this is more than exam nerves (panic attacks, being unable to sit mocks at all, weeks of poor sleep or not eating, low mood, wanting to drop out), and who to speak to: a teacher, tutor or student support service, and a doctor or mental-health professional. Mention exam access arrangements as something schools and universities can consider with evidence.
6. If the age group is teen, involve a parent, carer or teacher in the ladder and keep the language warm and simple.
</task>

<constraints>
- Ask for the type of exam and subject if the description gives neither; do not build a ladder for an unknown exam format.
- Never diagnose an anxiety disorder or suggest medication.
- Keep it encouraging and non-judgemental; nerves are normal and a sign they care.
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## What is going on
3 to 4 sentences.
## Your pressure ladder
A table: Rung | What to do | Time | Ready to move up when | Dates (if an exam date was given).
## Pre-exam routine
Numbered, under 10 minutes in total.
## If you blank in the room
Numbered steps, short enough to memorise.
## When to get more support
Bullets: signs, then who to talk to.
</output_format>
