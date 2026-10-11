---
schema: 1
id: plan-peer-buddy-scheme
kind: prompt
title: Plan a peer buddy scheme for inclusion
description: Plans a peer buddy or circle-of-friends scheme so pupils with special educational needs take part in break times, clubs and lessons, with recruitment, training, structured activities and safeguards.
category: special-education
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [notes, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [education-sector]
tags: [peer-support, social-inclusion, circle-of-friends, playtime, friendship-skills]
pairs_with:
  prompts: [write-social-story, plan-sensory-friendly-classroom]
  personas: [special-education-advisor]
args:
  - name: context
    description: School type and ages, the pupils the scheme is for (needs described, initials only), when isolation happens (lunch, break, clubs, group work), what has been tried, and staff time available.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Aims, Model, Recruiting buddies, Training, Structured activities, Safeguards, Measuring success, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a school plan peer support for pupils with special educational needs who are isolated, often at unstructured times like lunch and break. Schemes go wrong when buddies are assigned as "helpers", which turns the pupil into a project and peers into carers; when there is nothing to do together; or when the scheme fades after a month. Experienced inclusion leads design for mutual friendship and shared interest: structured activities and clubs where everyone has a role, a small group rather than one buddy (so no child carries it alone), short training on communication and being a good friend, the focus pupil's consent and say in it, and an adult who checks in without hovering.

Context: {{context}}
</context>

<task>
1. Aims: two or three outcomes, for example "J. spends lunchtime with peers at least three days a week" or "J. names two friends".
2. Model: choose and justify a model (small circle of friends, lunchtime club built around shared interests, rotating playground buddies, structured games station, buddying in group work), possibly combining two. Explain how the focus pupil is involved in choosing it and in what is shared with peers about their needs, only with their and their family's consent.
3. Recruiting buddies: how to invite volunteers (not assign them), how many, a mix of ages or classes, and how to rotate so it does not become a burden.
4. Training: a 30-minute session outline for buddies on inclusion, communication (clear language, waiting time, visual supports, the pupil's preferred ways to communicate), what to do if the pupil is upset, and when to fetch an adult.
5. Structured activities: a weekly menu of activities matched to the pupils' interests and sensory needs (games with clear rules, building, drawing, music, quiet options), with what adults set up.
6. Safeguards: buddies are never responsible for care or behaviour management, the pupil can opt out, adults watch for unkind dynamics, privacy about needs, and how buddies are thanked and recognised.
7. Measuring success: simple observation (who the pupil spends time with), the pupil's own view, and a review after six weeks.
8. Open questions.
</task>

<constraints>
- Initials only. Do not share a pupil's diagnosis or needs with peers without the pupil's and family's consent.
- Do not frame buddies as carers or praise them for "helping" a disabled child; frame it as friendship and shared activity.
- Do not diagnose or suggest diagnoses.
- Keep demands on staff realistic for the time stated.
</constraints>

<output_format>
## Aims
## Model
## Recruiting buddies
## Training
A session outline with timings.
## Structured activities
Table: Day | Activity | Set-up | Quiet option.
## Safeguards
Checklist.
## Measuring success
## Open questions
</output_format>
