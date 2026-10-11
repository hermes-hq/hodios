---
schema: 1
id: build-impact-presentation-for-funders
kind: prompt
title: Build an impact presentation for funders
description: Builds a presentation for funders or donors showing outcomes against what was promised, one beneficiary story told with consent, how the money was used, lessons learned and the next ask.
category: presentations
version: 1.0.0
status: incubating
stage: [review, plan]
role: [manager, operations-manager, founder]
requires: [none]
inputs: [document, dataset, notes]
output: [outline, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [funder-reporting, outcomes, donor-relations, beneficiary-story, fundraising-ask]
pairs_with:
  prompts: [write-impact-report, plan-funder-stewardship, prepare-funder-site-visit, drill-presentation-qa]
  personas: [presentation-designer]
args:
  - name: programme
    description: The programme or organisation, what the funding was for, and what was promised (targets, outcomes, milestones) in the grant or appeal.
    type: text
    required: true
  - name: results
    description: What happened, outputs, outcomes, numbers, spending against budget, what did not go to plan, and any stories you have consent to share.
    type: text
    required: true
  - name: audience
    description: Who you are presenting to, for example "foundation programme officer and two trustees" or "donor evening, about 60 people", and how long you have.
    type: text
    required: true
  - name: next_ask
    description: What you will ask for next, such as renewal, a larger grant, introductions or a pledge. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The message, Slide plan, Promised versus delivered, Story and consent check, Money slide, The ask, Questions to prepare for]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help charities, social enterprises and community groups present results to the people who fund them. Funders lose trust when presentations show activity counts as if they were impact ("we ran 40 workshops"), skip what was promised, hide what went wrong, use a moving story without consent or in a way that strips the person's dignity, or end without a clear ask. Experienced fundraisers separate outputs (what you did) from outcomes (what changed for people) and are honest about attribution: "participants reported" is not "we caused". They report against the original promises, explain under-delivery and what was learned (funders respect candour more than spin), show where the money went in simple terms, use one story that illustrates a typical outcome rather than the exception, and make a specific next ask. A trustee panel wants evidence and governance; a donor event wants emotion backed by a few credible numbers.

Programme and promises: {{programme}}

<results>
{{results}}
</results>

Audience and time: {{audience}}
{{#next_ask}}Next ask: {{next_ask}}{{/next_ask}}
</context>

<task>
1. Write the core message in one sentence: what changed because of this funding.
2. Build a promised-versus-delivered table from the programme and results: each promise, what happened, and a short honest explanation where it differs.
3. Separate outputs from outcomes, and word outcome claims at the strength the evidence supports (measured change, self-reported change, anecdote).
4. Choose one beneficiary story from the results that represents a typical outcome. Check it against consent and dignity: first name or pseudonym only with consent, no identifying details otherwise, the person shown as active rather than a victim. If no consented story is provided, use a placeholder and say what consent is needed.
5. Plan the slides for the audience and time: thank you and the message, the need in brief, the story, results against promises, money used, what we learned, what is next, and the ask. Give each slide an assertion title, content and visual (photo with consent, simple chart, quote).
6. Write the money slide in plain terms: spending by category against budget, with any variance explained, using only the figures given.
7. Write the ask: specific, linked to what more the money would achieve, with the amount or form if given.
8. List the hard questions funders will ask (cost per outcome, sustainability, what you would do differently, why targets were missed) with answer outlines.
</task>

<constraints>
- Never invent outcomes, numbers, percentages, quotes or stories. Mark missing data as [data needed].
- Do not present outputs as outcomes or claim causation the evidence does not support.
- Include shortfalls and lessons; do not hide under-delivery.
- Protect beneficiaries: no full names, photos or identifying details without stated consent; no pity framing.
- Keep the ask consistent with what the results can justify.
</constraints>

<output_format>
## The message
One sentence.

## Slide plan
Table: # | Slide title (assertion) | Content | Visual | Minutes.

## Promised versus delivered
Table: Promise | Delivered | Explanation.

## Story and consent check
The story outline and a consent and dignity checklist.

## Money slide
Table: Category | Budget | Spent | Note.

## The ask
The words to use.

## Questions to prepare for
Bullets: question, answer outline.
</output_format>
