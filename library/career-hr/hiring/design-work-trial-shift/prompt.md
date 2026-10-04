---
schema: 1
id: design-work-trial-shift
kind: prompt
title: Design a fair paid trial shift
description: Designs a fair, paid trial shift for retail, hospitality, salon or trades hiring with timed tasks, what to observe, a scoring rubric, pay and legal points to check, and how to give feedback.
category: hiring
version: 1.0.0
status: incubating
stage: [design]
role: [founder, operations-manager, manager]
requires: [none]
inputs: [text, spec]
output: [plan, table, checklist, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [trial-shift, working-interview, hospitality-hiring, retail-hiring, skills-assessment, scoring-rubric]
pairs_with:
  prompts: [write-job-description, write-phone-screen-script, write-candidate-rejection, plan-new-hire-onboarding]
  personas: [recruiter]
args:
  - name: role
    description: The job and setting, for example "line cook in a 60-cover bistro", "barista in a busy station kiosk", "junior stylist", "electrician's mate".
    type: string
    required: true
  - name: hours
    description: Length of the trial in hours. Shorter is usually fairer; most skills can be seen in two to four hours.
    type: number
    default: 3
  - name: must_have_skills
    description: The skills and behaviours the person must show, for example "knife skills, speed under pressure, cleaning as you go, taking direction", and any nice-to-haves.
    type: text
    required: true
  - name: country
    description: Country (and state or region) where the trial happens, so the pay, paperwork and safety points to check can be named. Leave empty for general guidance.
    type: string
output_contract:
  format: markdown
  sections: [Before the trial, Candidate message, Trial plan, Scoring rubric, Safety and fairness, Decision and feedback]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A trial shift shows what an interview cannot: whether someone can actually make the coffee, plate the dish, colour the hair or carry the ladder, and how they behave on a busy floor. It goes wrong when it turns into free labour, when every candidate gets a different shift so comparisons mean nothing, when nobody knows what they are looking for, or when the candidate gets hurt or never hears back. In many places any productive work must be paid at least the minimum wage, and insurance, right-to-work and safety rules can apply from the first hour.

Role: {{role}}
Trial length: {{hours}} hours
<must_have_skills>
{{must_have_skills}}
</must_have_skills>
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
1. If the must-have skills are too vague to observe (for example "good attitude"), turn them into observable behaviours and say how you did it; if the role is unclear, ask one question and stop.
2. Before the trial: what to arrange and check - pay at least the applicable minimum wage for all hours (state it as something to confirm for the country), how it will be paid, insurance cover, right-to-work or ID checks if required before any work, a short safety and hygiene induction, who supervises, and the same trial content for every candidate.
3. Candidate message: a short message confirming date, start and end time, address and who to ask for, what to wear and bring, that the trial is paid and at what rate, what they will be doing, any adjustments they can ask for, and when they will hear back.
4. Trial plan: a timeline that fits {{hours}} hours, with a brief welcome and induction, three to five tasks that each show one or more must-have skills (mixing a set task, a real-but-supervised task, and a moment of pressure or interruption), a short break, and a wrap-up chat where the candidate can ask questions.
5. Scoring rubric: for each must-have skill, what 1 (not yet), 2 (developing), 3 (meets) and 4 (strong) look like in observable behaviour on this trial, and who scores it. Include one row for how they take feedback mid-shift.
6. Safety and fairness: no unsupervised use of dangerous equipment, chemicals, ladders or hot oil without training; rules for under-18 candidates to check; reasonable adjustments for disability; the same tasks and scoring for everyone; not judging on things unrelated to the job.
7. Decision and feedback: how to decide (score sheet plus one discussion between observers, same day if possible), a script for offering the job, and a kind, specific script for a no that gives one useful piece of feedback. Commit to a reply deadline.
8. Before answering, check that the timeline adds up to {{hours}} hours and that every must-have skill is observed by at least one task and scored in the rubric.
</task>

<constraints>
- The trial must be paid and short. If {{hours}} is more than a single shift's worth (over about eight hours) or the plan would cover a real staffing gap, say so and recommend shortening it.
- Do not state minimum wage figures, legal thresholds or tax rules as fact; say what to check with the official labour authority for the country.
- Keep tasks representative of the real job, not tests designed to trip people up.
- Do not include anything that would screen out people for protected characteristics or ask about health, family plans or similar topics.
- Use only the information given; mark anything that depends on the business as [X].
</constraints>

<output_format>
## Before the trial
Checklist, with legal and pay points marked "to check".
## Candidate message
Ready to send.
## Trial plan
Table: Time | Task | Skills shown | Observer.
## Scoring rubric
Table: Skill | 1 Not yet | 2 Developing | 3 Meets | 4 Strong.
## Safety and fairness
## Decision and feedback
Yes script and No script.
</output_format>
