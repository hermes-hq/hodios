---
schema: 1
id: prepare-subject-deep-dive
kind: prompt
title: Prepare for a subject deep dive
description: Prepares a school subject lead for an inspection-style deep dive with curriculum intent in plain words, sequencing, assessment, adaptations, likely questions and evidence to have ready.
category: teaching
version: 1.0.0
status: incubating
stage: [review, plan]
role: [teacher, manager]
subject: [education-sector]
requires: [none]
inputs: [text, document]
output: [checklist, questions, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [school-inspection, subject-leadership, curriculum-intent, sequencing, work-scrutiny]
pairs_with:
  prompts: [align-lesson-to-standards, draft-school-improvement-plan, design-unit-plan]
  personas: [instructional-coach]
args:
  - name: subject
    description: The subject and school phase, e.g. "history in a 1-form-entry primary" or "secondary computing, Years 7-13".
    type: string
    required: true
  - name: curriculum_summary
    description: Your curriculum map or summary - what is taught in each year, why in that order, how it is assessed, how pupils with SEND are supported, CPD for staff, and anything you know is weak.
    type: text
    required: true
  - name: framework
    description: Optional. The inspection or review framework that applies, e.g. "Ofsted (England)", "Estyn", "an internal trust review". Rules change, so the plan stays generic if this is empty.
    type: string
output_contract:
  format: markdown
  sections: [Curriculum story, Sequencing rationale, Assessment, Adaptations for SEND and disadvantaged pupils, Likely questions, Evidence to have ready, Honest gaps and actions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A subject lead is preparing for a deep dive into {{subject}}: a review in which inspectors or reviewers talk to the subject leader, visit lessons, look at pupils' work, and talk to pupils and teachers to see whether the intended curriculum is what pupils actually learn and remember. Leads struggle when they describe activities instead of the knowledge and skills built over time, cannot explain why topics come in a particular order, claim things that lesson visits and books do not show, or hide known weaknesses that reviewers will find anyway.
{{#framework}}Framework: {{framework}}. Use its published criteria as the user describes them; do not quote criteria you are not given.{{/framework}}
</context>

<task>
<curriculum_summary>
{{curriculum_summary}}
</curriculum_summary>

1. Curriculum story: in about 150 words of plain speech the lead could say aloud, what pupils should know and be able to do by the end of the phase, the key concepts or threads, and why this curriculum suits these pupils.
2. Sequencing rationale: for two or three threads, show how knowledge builds year by year (what comes before, what it enables later), using the user's map. Flag places where the order is not explained.
3. Assessment: how teachers check that pupils have learned and remembered the core content, how that information changes teaching, and how workload is kept sensible.
4. Adaptations: how pupils with SEND and disadvantaged pupils access the same ambitious curriculum (scaffolds, pre-teaching, adapted resources) rather than a reduced one.
5. Likely questions: 12 to 15 questions across the subject lead conversation, teacher conversations, pupil conversations and work scrutiny, each with what a good answer draws on from this curriculum.
6. Evidence to have ready: specific documents and examples, and what to check beforehand (books from different attainment groups and pupils with SEND showing the sequence; pupils able to talk about prior learning).
7. Honest gaps and actions: weaknesses visible in the summary, what is already being done, and short-term actions, so the lead can talk about them openly.
</task>

<constraints>
- Use only the user's curriculum; do not invent content, data, outcomes or practice. Gaps become questions or actions.
- Do not advise staging evidence, coaching pupils with scripted answers, or claiming practice that does not happen.
- Do not state inspection criteria, grades or rules as fact unless the user supplied them; name the assumption and say to check the current published framework.
- Plain language; the lead should sound like themselves.
</constraints>

<output_format>
## Curriculum story
The spoken version, about 150 words.

## Sequencing rationale
Table: Thread | Earlier | This year | Later | Why this order.

## Assessment
Bullets.

## Adaptations for SEND and disadvantaged pupils
Bullets.

## Likely questions
Table: Who asks | Question | What a good answer draws on.

## Evidence to have ready
Checklist.

## Honest gaps and actions
Table: Gap | What is being done | Next action | By when.
</output_format>
