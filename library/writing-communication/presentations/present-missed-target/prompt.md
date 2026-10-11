---
schema: 1
id: present-missed-target
kind: prompt
title: Present a missed target or delay
description: Plans the slides and words for telling leadership or a client that a target was missed or a date will slip, with the facts first, the cause, the recovery plan and what you need from them.
category: presentations
version: 1.0.0
status: incubating
stage: [plan, design]
role: [manager, project-manager, product-manager, consultant]
requires: [none]
inputs: [notes, document]
output: [outline, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [bad-news, missed-deadline, recovery-plan, accountability, stakeholders, executive-audience]
pairs_with:
  prompts: [drill-presentation-qa, outline-presentation, write-speaker-notes]
  personas: [presentation-designer]
args:
  - name: what_happened
    description: The target or date that was missed or will slip, by how much, and what you know about why. Include numbers.
    type: text
    required: true
  - name: audience
    description: Who you are presenting to and what the miss costs them, for example "client sponsor; their launch depends on our feature".
    type: text
    required: true
  - name: recovery_options
    description: What you can do now, with any costs or trade-offs you know. Optional; leave blank if you have not worked it out yet.
    type: text
  - name: time_slot
    description: How long you have, for example "a 10-minute slot in the monthly review".
    type: string
    default: 10 minutes
output_contract:
  format: markdown
  sections: [Headline, Slide plan, Opening words, Recovery plan, Questions to expect, What not to say]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people deliver bad news in a presentation without losing trust. Audiences forgive a miss far more easily than they forgive surprise, spin or a vague plan. What works: say the miss in the first thirty seconds with the number, own the part that was yours, explain the cause briefly and specifically (not a list of excuses), show a recovery plan with dates and owners, say what the audience needs to decide or provide, and say what early warning they will get next time. What fails: burying the number after three slides of context, blaming other teams or "unforeseen circumstances", an optimistic new date with no basis, and walls of detail meant to look diligent.

What happened: {{what_happened}}
Audience: {{audience}}
{{#recovery_options}}Recovery options: {{recovery_options}}{{/recovery_options}}
Time slot: {{time_slot}}
</context>

<task>
1. Write the headline: the target, the actual or forecast result, and the gap, in one sentence with numbers from {{what_happened}}. If the numbers or the size of the slip are missing, ask for them first and stop.
2. Separate the causes into what was within the presenter's control and what was not, using only what is given. Flag where the cause is still unknown and say how to present an unknown honestly ("we are still confirming; we will know by [date]").
3. Build a recovery plan: if recovery options were given, structure them with what changes, by when, owner and confidence; if not, list the questions the presenter must answer before the meeting and give a plan skeleton with placeholders. Any new date needs a basis; if there is none, say the date is not yet credible.
4. Plan four to six slides: the headline, impact on the audience, cause, recovery plan, what we need from you, and how you will hear early next time. Fit them in about two thirds of {{time_slot}}.
5. Write the spoken opening (under 60 words) that states the miss plainly and takes ownership without grovelling.
6. List the hardest questions this audience will ask, with a short honest answer for each.
7. List phrases and moves to avoid in this specific case.
</task>

<constraints>
- Do not invent causes, numbers, dates or commitments. Use placeholders for anything not given.
- Do not shift blame to named people or other teams; describe causes as events and decisions.
- Do not minimise the impact on the audience or reframe the miss as a success.
- Do not promise a new date the presenter has not given a basis for.
</constraints>

<output_format>
## Headline
One sentence with the numbers.

## Slide plan
Table: # | Slide title (assertion) | Content | Minutes.

## Opening words
The spoken opening, quoted.

## Recovery plan
Table: Action | What changes | By when | Owner | Confidence. Placeholders where unknown.

## Questions to expect
Question and short answer pairs.

## What not to say
Bullets with a better alternative for each.
</output_format>
