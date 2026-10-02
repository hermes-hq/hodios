---
schema: 1
id: prepare-pediatric-visit
kind: prompt
title: Prepare for a child's doctor visit
description: Prepares a parent or carer for a child's doctor visit with a symptom timeline, growth and development questions, vaccines to ask about, and age-appropriate ways to prepare the child.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
subject: [medicine]
requires: [none]
inputs: [notes, text]
output: [summary, questions, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [pediatrics, well-child-visit, child-development, vaccinations, carers]
pairs_with:
  prompts: [prepare-doctor-questions, build-symptom-log, build-medication-list]
  personas: [health-navigator]
  workflows: [doctor-visit-track]
args:
  - name: child_age
    description: The child's age, for example "7 weeks", "18 months", "9 years", "14". For babies born early, add how early.
    type: string
    required: true
  - name: reason
    description: Why you are going, for example "routine 1-year check", "ear pain and fever for 2 days", "worried about speech", plus anything you have noticed and medicines given.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Don't wait if, Your opening, Symptom timeline, Growth and development, Vaccines, Questions, Preparing your child, Bring]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents and carers get the most from a child's appointment. Children cannot always describe symptoms, so the parent's observations (feeding, drinking, wet nappies or toilet trips, sleep, energy, behaviour and play) are the history. Routine checks also cover growth, development, vaccines and everyday questions that parents often forget to ask. Preparing the child in words they understand makes the visit easier for everyone.

Child's age: {{child_age}}
Reason for the visit: {{reason}}
</context>

<task>
1. Safety check first, adapted to the age. Signs that mean seek urgent care now rather than waiting: a baby under 3 months with a temperature of 38°C (100.4°F) or more; difficulty breathing, grunting, or the skin between the ribs pulling in; blue or grey lips; a rash that does not fade when a glass is pressed on it; being floppy, very drowsy or hard to wake; a seizure; signs of dehydration (far fewer wet nappies, no tears, sunken eyes, or a sunken soft spot in babies); persistent vomiting, or green vomit; severe pain (including sudden pain in the testicles); or a stiff neck with fever. For older children and teenagers, also: being very thirsty and weeing much more than usual together with weight loss, vomiting, tummy pain, fast or deep breathing or drowsiness, which needs a same-day assessment rather than waiting for a routine appointment. If any is present, say so first and keep the rest brief. If none is present but the notes mention only part of such a pattern (for example tiredness and weight loss), list those extra signs under "Don't wait if" without suggesting a cause.
2. Write a short opening the parent can say at the start: the main concern, how long, and what they want from the visit.
3. If the visit is for an illness, build a timeline from their notes: when it started, temperatures and how measured, eating and drinking, wet nappies or toileting, sleep, behaviour and play, other symptoms, contacts who are ill, and medicines given with amounts and times. Mark missing details as [not noted: check before the visit].
4. Growth and development: questions suited to the age about growth on the chart, feeding or eating, sleep, movement, speech and language, play and social skills, behaviour, and school or learning for older children. Frame milestones as questions ("Is [skill] on track for her age?"), and note that the range of normal is wide and that corrected age is used for children born early.
5. Vaccines: ask which vaccines are due at this age on their country's schedule, whether any were missed and can be caught up, what reactions to expect, and about seasonal vaccines. Suggest bringing the vaccination record. Do not list a schedule as fact.
6. Write other questions: what to watch for and when to come back, how to manage symptoms at home safely, and any concerns the parent raised. For teenagers, mention that clinicians often offer some time alone with the young person and that this is normal.
7. Preparing the child: honest, age-appropriate words about what will happen (including "a quick pinch" for injections, never "it won't hurt"), a comfort item, distraction ideas for the age, feeding or holding a baby during vaccines if the clinic allows, and a small plan for afterwards.
8. What to bring: the child's health record or vaccination book, medicines or photos of labels, a list of questions, spare clothes, nappies, snacks, and something to do while waiting.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not suggest what the illness might be, and do not advise medicine doses; ask the parent to bring what they have given so the clinician can advise.
- Keep the parent's words. Do not add or downplay symptoms.
- If anything suggests a child is being harmed or is unsafe at home, say it should be raised with the doctor or local child-protection services.
- If the age or reason is missing, ask for it.
- Keep it to about one printed page plus the preparing-your-child section.
</constraints>

<output_format>
## Don't wait if
Urgent action if a sign is present; otherwise one line listing the signs.
## Your opening
## Symptom timeline
Table: When | What happened. Only for illness visits.
## Growth and development
Questions for this age.
## Vaccines
## Questions
Top 3, then the rest.
## Preparing your child
## Bring
Checklist.
</output_format>
