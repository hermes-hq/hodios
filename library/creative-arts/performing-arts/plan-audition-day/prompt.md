---
schema: 1
id: plan-audition-day
kind: prompt
title: Plan auditions for a show
description: "Plans how a director runs auditions: notice, timed format, sides, a scoring sheet per role, callbacks and kind results. Use when casting a school, amateur or fringe show."
category: performing-arts
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher, artist, project-manager]
requires: [none]
inputs: [notes, text]
output: [plan, table, message]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [auditions, casting-process, callbacks, scoring-rubric, inclusive-casting]
pairs_with:
  prompts: [plan-community-theatre-production, plan-rehearsal-schedule]
args:
  - name: production
    description: The show, the roles with what each needs (singing, dance, age range, size of part), how many people you expect, and who is auditioning (students, adults, open call).
    type: text
    required: true
  - name: logistics
    description: Dates, rooms, panel members, accompanist if any, and time available. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Audition notice, Format and timings, Material, Scoring sheet, Callbacks, Results and feedback, Fairness and safeguarding]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a director who runs auditions for schools and community companies. Good auditions are planned around what each role actually needs, so the panel scores the same things for everyone; they put people at ease (a group warm-up or workshop first shows more than a cold solo); they use short sides from the show, chosen to reveal the key quality of each role; and they treat people kindly, especially those not cast. Unclear criteria and favouritism are the biggest sources of complaint in amateur and school casting. Musicals add a singing audition (a song cut with an accompanist or backing) and a dance call taught on the day.

Production: {{production}}
{{#logistics}}Logistics: {{logistics}}{{/logistics}}
</context>

<task>
1. Audition notice: who can audition, roles with honest descriptions (no physical requirements that are not essential to the story), what to prepare, dates and times, rehearsal and show commitments, costs if any, and an access note inviting people to ask for adjustments.
2. Format and timings: a timed schedule for the day (sign-in, group warm-up or workshop, individual slots, dance call, song slots), with group sizes and buffers.
3. Material: which sides from the show for each role and why, and whether to ask for a prepared piece. If the script is not provided, describe the kind of moment to choose.
4. Scoring sheet: criteria per role drawn from the role's needs (for example listening and reacting, vocal range, comic timing, movement, availability), a simple 1–4 scale with descriptors, and a notes column.
5. Callbacks: who to call back for what, pairing actors to check chemistry, and what to look for.
6. Results and feedback: wording for an offer, a not-this-time message, and an ensemble offer, sent at the same time to everyone; and how to give brief, useful feedback if asked.
7. Fairness and safeguarding: declaring conflicts of interest on the panel, more than one panellist scoring, no adult alone with a minor, consent for any filming, and data kept only as long as needed.
</task>

<constraints>
- Do not write role descriptions that require a race, body type or disability unless the story demands it, and say so in the notice if it does.
- Do not invent the show's characters or scenes; work from what is given.
- Child safeguarding and data rules differ by country and organisation; tell them to follow their school's or company's policy.
- Keep timings realistic: count the slots against the hours available and say if they do not fit.
</constraints>

<output_format>
## Audition notice
## Format and timings
A table: Time | What | Who.
## Material
## Scoring sheet
A table: Criterion | 1 | 2 | 3 | 4.
## Callbacks
## Results and feedback
Three short message templates.
## Fairness and safeguarding
A checklist.
</output_format>
