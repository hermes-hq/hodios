---
schema: 1
id: design-quiz-scoring-rules
kind: prompt
title: Design scoring rules for a quiz night
description: Designs the scoring for a quiz night, with points per round, jokers, bonus rounds, team-size and age handicaps, a phone policy, a tie-break order and a scoresheet, all explainable in one minute.
category: trivia
version: 1.0.0
status: incubating
stage: [design]
role: [individual, teacher, manager]
requires: [none]
inputs: [preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [scoring-rules, jokers, handicaps, tie-break, scoresheet, pub-quiz]
pairs_with:
  prompts: [host-trivia-night, rule-on-disputed-quiz-answer]
args:
  - name: format
    description: The night's structure, for example "6 rounds of 10, a picture round handout and a music round".
    type: text
    required: true
  - name: teams
    description: Expected teams and team sizes, plus anything uneven, such as "8 teams of 2 to 8, one all-children team".
    type: string
    required: true
  - name: goals
    description: What matters most, for example "keep it close to the end", "simple to mark", "fair for kids", "fundraising extras". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Rules in one minute, Points, Jokers and bonuses, Handicaps, Fair play, Tie-breaks, Scoresheet]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design scoring for quiz nights. Scoring decides whether the evening stays exciting: a fixed point per answer lets one strong team pull away by round three; a joker (double points on one round chosen in advance) lets weaker teams gamble; a closing round worth more keeps the result open. But every extra rule costs explanation time and marking errors, so a host should use only the rules that serve the night's goals. Fairness problems usually come from team size (eight players know more than two), mixed ages, phones, and late answer sheets.

Format: {{format}}
Teams: {{teams}}
{{#goals}}Goals: {{goals}}{{/goals}}
</context>

<task>
1. Propose points per round, including any picture or music round and partial credit rules (for example half a point for surname only, one each for artist and title).
2. Pick at most two extras from: a joker round, a final round with higher stakes or a wager, a bonus for the hidden link, a "buy a hint" for fundraising. Say what each adds and its marking cost.
3. Handle uneven teams: a cap on team size, or a simple handicap (for example bonus points for teams of two or three, or a children's team getting one free "phone a parent" per round). Keep handicaps small and explained up front.
4. Write fair-play rules: phones away, how answer sheets are handed in, late sheets, swapping marking between teams or host marking, and who rules on disputes.
5. Define a tie-break order: a numeric closest-guess question first, then a second if still tied; never decide by joker results or age.
6. Lay out a scoresheet: rows per team, columns per round, joker marker, running total, rank after each round.
7. Write the rules the host reads aloud, under one minute.
</task>

<constraints>
- Keep the system simple enough to mark during the next round; drop any rule that does not serve the stated goals.
- If a wager round or fundraising extras involve money, note that paid games and raffles can be regulated in some places and the organiser should check local rules.
- Make the rules identical for every team except stated handicaps.
</constraints>

<output_format>
## Rules in one minute
The script to read aloud.
## Points
Table: Round | Points per answer | Partial credit | Max.
## Jokers and bonuses
Each extra, what it adds, how to mark it.
## Handicaps
The rule and why.
## Fair play
Bullets.
## Tie-breaks
Ordered steps.
## Scoresheet
A table template.
</output_format>
