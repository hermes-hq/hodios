---
schema: 1
id: build-internship-final-presentation
kind: prompt
title: Build an internship final presentation
description: Builds an intern's end-of-placement presentation for the host team, with the projects done, measurable impact, what they learned, thanks, and a closing ask such as a return offer or reference.
category: presentations
version: 1.0.0
status: incubating
stage: [review, plan]
role: [student, job-seeker]
requires: [none]
inputs: [notes, document]
output: [outline, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [internship, early-career, impact-stories, return-offer, end-of-placement]
pairs_with:
  prompts: [outline-presentation, write-speaker-notes, drill-presentation-qa]
args:
  - name: work_done
    description: What you worked on, what you delivered, any results or feedback you received, and what you learned. Notes are fine.
    type: text
    required: true
  - name: audience
    description: Who will attend, for example "my team of 8 plus my manager's manager", and how long you have.
    type: text
    required: true
  - name: goal
    description: What you hope the presentation achieves, for example "a return offer", "a good reference" or "the team adopts my tool". Optional.
    type: text
  - name: confidentiality
    description: Anything you must not show, such as client names, internal figures or unreleased products. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your headline, Slide plan, Impact statements, What to say, Questions to expect, Things to check before presenting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help interns prepare the presentation many companies ask for at the end of a placement. It is also, in effect, an informal interview for a return offer. The weak version lists every task week by week ("week 3: learned the database"). The strong version picks one to three pieces of work, explains the problem each solved and for whom, shows the result in numbers or concrete outcomes (hours saved, bugs fixed, a report used in a decision), is honest about what was hard, shows what the intern learned and how they grew, thanks specific people, and ends with a clear, polite statement of interest. Managers listen for ownership ("I did", not only "we"), judgement, and how the intern handled problems. Confidential data shown carelessly in an intern deck is a real risk.

<work_done>
{{work_done}}
</work_done>

Audience and time: {{audience}}
{{#goal}}Goal: {{goal}}{{/goal}}
{{#confidentiality}}Do not show: {{confidentiality}}{{/confidentiality}}
</context>

<task>
1. Write a one-sentence headline of what the intern contributed this placement.
2. Pick the one to three strongest pieces of work and, for each, write a problem, action, result statement using "I" for what the intern did, with the result in numbers or concrete outcomes from the notes. Where the result is not measured, suggest how to state it honestly (who uses it, what it replaced) and mark any number to confirm with the manager.
3. Plan the slides for the time given: title, a one-slide overview of the placement, a slide or two per piece of work (problem, what I did, result, a screenshot or chart placeholder), a challenge and how I handled it, what I learned, thanks to named roles or people, and a close tied to the goal.
4. Write what to say for each slide in a natural voice, with timing.
5. Draft the closing ask, matched to the goal, that is confident but not presumptuous, for example interest in returning and what they would like to work on.
6. List questions the audience may ask, including "what would you do with more time" and "what would you change about the internship", with answer outlines.
7. List what to check before presenting: confidential data, numbers confirmed with the manager, permission to show screenshots.
</task>

<constraints>
- Use only work, results and feedback in the notes. Do not inflate impact or invent numbers; mark estimates as estimates to confirm.
- Give credit to the team where work was shared, while making the intern's own part clear.
- Respect the confidentiality notes; when unsure, recommend asking the manager.
- No complaints about the company in the deck; frame challenges as problems solved or lessons.
</constraints>

<output_format>
## Your headline
One sentence.

## Slide plan
Table: # | Slide title | Content | Visual | Minutes.

## Impact statements
For each piece of work: problem, what I did, result.

## What to say
Per slide.

## Questions to expect
Bullets with answer outlines.

## Things to check before presenting
Checklist.
</output_format>
