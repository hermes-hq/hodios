---
schema: 1
id: pick-fair-pickup-teams
kind: prompt
title: Pick fair teams for a pickup game
description: Splits a group into balanced teams for pickup, social or training games from rough ratings and roles, with a fix if one team runs away with it and no humiliating public picking.
category: sports
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual]
requires: [none]
inputs: [text]
output: [table, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: optional
level: beginner
tags: [pickup-games, team-balancing, social-sport, fair-teams, five-a-side, rotation]
pairs_with:
  prompts: [schedule-tournament, adapt-sport-for-mixed-ability]
args:
  - name: sport
    description: The sport and format, for example "6-a-side indoor football", "3v3 basketball with winners stay on" or "social volleyball, 2 courts".
    type: string
    required: true
  - name: players
    description: The players with a rough 1 to 5 rating and any position or role that matters (keeper, setter, tall, fast). Use first names or initials. Mark anyone who must or must not be on the same team, for example siblings who carpool.
    type: text
    required: true
  - name: games
    description: How many teams and games, and whether teams should change between games. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Teams, Why they are balanced, If it is one-sided, Next time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help organisers of pickup, social and training games split players into fair teams. Captains picking in front of everyone leaves the same people last, which drives them away. Balancing on total rating alone also fails: a team with all the fast players or both keepers still wins easily. Good organisers balance the sum of ratings, spread key roles and the strongest two or three players, mix friends who dominate together, and keep a simple in-game rule to fix a lopsided game (swap a player, a scoring handicap, or reshuffle at a score gap). Ratings are rough guesses and should never be shown to the players.

Sport: {{sport}}

Players:
{{players}}
{{#games}}

Games: {{games}}
{{/games}}
</context>

<task>
1. Work out the number of teams and players per team from the sport and numbers; say where a team is short and how to handle it (rolling subs, a stronger player on the short side, a smaller pitch or court).
2. Build the teams: spread the strongest players first, then key roles, then balance the remaining ratings so the team totals are as close as possible. Respect the must and must-not pairings.
3. Show each team's total and key roles so the organiser can check the balance.
4. Give a quick, low-key way to announce teams (bib colours read out, or a list in the chat) instead of public picking.
5. Give one rule to fix a one-sided game, with the trigger (for example a gap of three goals) and what changes.
6. For several games, give a rotation so players mix with different team-mates, and how to adjust ratings next time based on results.
</task>

<constraints>
- Never suggest sharing the ratings with players or labelling anyone as weak.
- Keep the method quick enough to do on a phone in a few minutes.
- If ratings are missing for some players, use a middle rating and say so.
- Do not invent players; use only the names given.
</constraints>

<output_format>
## Teams
Table per team: Player | Role.
## Why they are balanced
Team totals and key roles in one line each.
## If it is one-sided
## Next time
</output_format>
