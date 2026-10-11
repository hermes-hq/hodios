---
schema: 1
id: run-tryout-evaluations
kind: prompt
title: Run fair tryout evaluations as a coach
description: Plans tryout evaluations for an amateur or youth team with stations, an anchored scoring rubric, evaluator instructions, a tie-break process and records that make selection defensible.
category: sports
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [tryout, team-selection, player-evaluation, rubric, fairness, club-coach]
pairs_with:
  prompts: [tell-player-not-selected, plan-team-season]
args:
  - name: sport
    description: Sport, age group and level, for example "U14 girls club basketball, competitive tier".
    type: string
    required: true
  - name: numbers
    description: How many players are expected, how many places there are, and how many sessions, minutes and evaluators you have.
    type: text
    required: true
  - name: priorities
    description: What the team needs and what the club values, for example "two keepers, strong defenders, attitude counts". Include any club policy on selection.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Selection criteria, Session plan, Scoring rubric, Evaluator instructions, Making the decision, Records and communication]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help coaches and club organisers run tryouts that are fair and defensible. Common failures: deciding on reputation or last season before anyone plays, scoring on vague impressions, judging only flashy skills, letting a parent-coach evaluate their own child, and players being seen for unequal amounts of time. Good tryouts publish the criteria in advance, use anchored rubrics (what a 1, 3 and 5 look like), give every player comparable reps in drills and small-sided games, use several evaluators who score independently, and record the reasons for each decision. Early-maturing players often look better in youth tryouts, so experienced evaluators look at decision-making and coachability, not only size and speed.

Sport: {{sport}}

Numbers and resources:
{{numbers}}

Team needs and club values:
{{priorities}}
</context>

<task>
1. Define five to seven selection criteria from the team needs and club values (for example core skills, game understanding, effort and coachability, position-specific skills), with weights, and a short public version to share with families in advance.
2. Plan the sessions: warm-up, skill stations, small-sided games and position-specific blocks, with timings, group sizes and rotation so every player gets comparable reps and is seen by more than one evaluator.
3. Write an anchored rubric for each criterion with what a 1, 3 and 5 look like in observable terms, and a short score sheet layout with a notes column.
4. Write evaluator instructions: score independently before discussing, use bib numbers not names where possible, no evaluator scores their own child or a player they coach privately, note the evidence behind extreme scores.
5. Explain how to reach decisions: combine scores, review borderline players with specific evidence, handle position needs and ties, consider relative age and late developers, and when to invite a player back for a second look.
6. List what to record and keep, how and when results are communicated, and how to handle appeals or requests for feedback.
</task>

<constraints>
- Follow any club or league selection and safeguarding policy the user mentions; do not override it.
- Use observable behaviour in the rubric, not personality labels or judgements about a child's body.
- Do not suggest selecting on ability to pay, family connections or anything unrelated to the published criteria.
- Keep scores and notes confidential to the selection group, and say to follow local data protection rules when storing records about children.
- Keep the plan realistic for the evaluators and time available; say what to drop if time is short.
</constraints>

<output_format>
## Selection criteria
Table: Criterion | Weight | What we look for. Then the family-facing version.
## Session plan
Table: Time | Block | Groups | Who evaluates.
## Scoring rubric
Table per criterion: 1 | 3 | 5.
## Evaluator instructions
## Making the decision
## Records and communication
</output_format>
