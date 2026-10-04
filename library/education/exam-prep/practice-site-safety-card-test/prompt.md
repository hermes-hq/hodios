---
schema: 1
id: practice-site-safety-card-test
kind: prompt
title: Practise a construction site safety test
description: Quizzes construction workers for a site safety card test such as the CITB test for CSCS, with original questions on behaviour and hazards and the safe practice behind each answer.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [individual]
subject: [construction]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [site-safety, cscs-card, citb-test, working-at-height, hazard-awareness, site-induction]
pairs_with:
  prompts: [prepare-trade-licensing-exam, analyze-exam-mistakes]
args:
  - name: test_level
    description: operative for labourers and general site workers; specialist for supervisors or a specialist activity; manager for managers and professionals.
    type: enum
    enum: [operative, specialist, manager]
    default: operative
  - name: scheme
    description: The test or card scheme and country, such as "CITB HS&E test for CSCS, UK", "White Card, Australia", "Safe Pass, Ireland". Add the specialist topic if any.
    type: string
    default: "CITB HS&E test for CSCS, UK"
  - name: questions
    description: Number of questions in the set.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [Score, Topics, Safety rules to remember, Next set]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Site safety card tests check that a worker knows how to stay safe and keep others safe on site: personal responsibility, reporting, the hierarchy of control (remove the hazard first, PPE last), working at height, manual handling, hazardous substances and dust, asbestos, electricity, excavations, plant and vehicles, fire, noise, and health and welfare. Many questions are behavioural: "What should you do?" The safe answer is nearly always stop, do not guess, report it to your supervisor, and do not use equipment or enter areas you are not trained or authorised for. Candidates lose marks by choosing the quick practical fix over the safe procedure. Question formats, counts and pass marks vary by scheme and change, so the candidate must check the official test provider's information.
</context>

<task>
Run {{questions}} original questions.
Test level: {{test_level}}
Scheme: {{scheme}}

1. If the scheme is one you do not know well, say so and keep to general site safety principles that apply everywhere, noting that local rules must be checked.
2. Write every question yourself; never reproduce official revision question banks. Use real site situations (a missing guard rail, a cracked ladder rung, a suspected asbestos board, a reversing dumper, a trench with no support, silica dust from cutting). Mix knowledge items with behavioural "what should you do?" items, roughly half each. For `specialist` and `manager`, include supervision and planning items (permits to work, method statements, briefing a team, checking competence). Four options, one correct, unless the scheme uses multiple-answer items.
3. Ask one question per message, labelled "Question k of {{questions}}".
4. After each answer:
   - Mark it and give the answer.
   - Explain the safe practice behind it in plain site language, and the harm the rule prevents.
   - Say why the tempting wrong option is unsafe.
5. After the last question, give the review.
</task>

<constraints>
- Never invent regulation names, section numbers, exposure limits or pass marks; describe the duty instead and say to check the scheme's official material.
- Never present an unsafe shortcut as acceptable, even as a joke option explained badly.
- If the candidate describes a dangerous situation happening on their site now, tell them to stop work in that area and report it to their supervisor or site manager, and to contact emergency services if anyone is hurt or in immediate danger.
- Plain words; many candidates are new to construction or have English as a second language.
</constraints>

<output_format>
During the set: the marking and explanation, then the next question, in one message.

At the end, under these headings:
## Score
x / {{questions}}.
## Topics
A table: Topic | Asked | Correct.
## Safety rules to remember
One line per rule that came up in a miss.
## Next set
Topics to practise next.
</output_format>
