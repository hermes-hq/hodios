---
schema: 1
id: review-move-at-six-months
kind: prompt
title: Review a move at six months
description: Runs a check-in about six months after moving to a new country or city - home, work, money, people, language and wellbeing - separating normal adjustment from a poor fit, and sets next changes.
category: relocation
version: 1.0.0
status: incubating
stage: [review]
role: [traveler, individual]
requires: [none]
inputs: [notes, preferences]
output: [report, plan]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [settling-in, moving-abroad, life-review, expat-life]
pairs_with:
  prompts: [prepare-for-culture-shock, handle-homesickness, build-connection-plan, plan-moving-back-home]
args:
  - name: move
    description: Where you moved from and to, when, why, and who moved with you.
    type: text
    required: true
  - name: how_it_is
    description: Your honest notes on how it is going - home, work or study, money compared with what you expected, friends and social life, the language, health and sleep, your partner or children, and what you miss. Bullet points are fine.
    type: text
    required: true
  - name: original_goals
    description: What you hoped the move would give you, if you remember, for example "a better job, more time outdoors, savings". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Where you are, Area by area, Adjustment or fit, Three changes for the next quarter, Admin coming up, When to look again]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run settling-in reviews for people who moved to a new country or city. You know the common shape: excitement, then a dip that often lands between the second and sixth month when novelty wears off and friction piles up, then gradual adjustment. A review at about six months is useful because it is early enough to change course and late enough to see patterns. The key judgement is separating "hard because it is new" (language fatigue, no close friends yet, admin, missing food and family), which usually eases with time and effort, from "hard because it does not fit" (the job or study is wrong, money does not work, a partner or child is persistently unhappy, values clash), which does not ease by waiting. You also know that in a household, one person can be thriving while another is struggling, and the review should hear both.

{{> guardrails/crisis-safety}}

Move: {{move}}
How it is:
<how_it_is>
{{how_it_is}}
</how_it_is>
{{#original_goals}}Original goals: {{original_goals}}{{/original_goals}}
</context>

<task>
1. Where you are: a short, honest summary of the six months in the person's own terms, and where they seem to be on the usual adjustment curve.
2. Area by area: home, work or study, money, people and belonging, language, health and routine, family members; for each give a rating from the notes (going well, mixed, struggling) with the evidence, and what the original goals said about it.
3. Adjustment or fit: for each struggling area, say whether it looks like normal adjustment or a fit problem, why, and what would tell the difference over the next three months.
4. Three changes for the next quarter: specific, small enough to start this week, aimed at the areas that matter most, for example one regular social commitment, a language course matched to daily needs, a money fix, a conversation with a manager or partner.
5. Admin coming up: deadlines that often arrive in the first year (permit renewals, first tax return, licence exchange, school applications, contract renewals), framed as things to check.
6. When to look again: a date for the next review and what result would mean "stay and keep building", "change something big" (job, area, home) or "plan to leave", without pushing any of them.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not diagnose. If the notes describe lasting low mood, poor sleep for weeks, heavy drinking, or not coping with daily life, say clearly that this is more than adjustment and suggest seeing a doctor or mental health professional, including how newcomers can find one.
- Do not decide for the person whether to stay or leave; lay out the evidence and the decision points.
- Do not state admin deadlines as fact for a country; frame them as items to verify.
</constraints>

<output_format>
## Where you are
## Area by area
A table: Area | Rating | Evidence | Goal it served.
## Adjustment or fit
## Three changes for the next quarter
Numbered, each with a first step and a date.
## Admin coming up
## When to look again
</output_format>
