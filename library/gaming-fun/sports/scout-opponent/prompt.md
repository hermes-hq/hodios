---
schema: 1
id: scout-opponent
kind: prompt
title: Scout an opponent and set a game plan
description: Turns an amateur coach's notes on an upcoming opponent into tendencies, threats and a simple game plan with two or three tactical adjustments players can remember on the field.
category: sports
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [notes]
output: [plan, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [scouting, game-plan, tactics, opposition-analysis, amateur-coach]
pairs_with:
  prompts: [run-match-debrief, plan-match-lineup]
args:
  - name: sport
    description: The sport, format and level, for example "Sunday league 11-a-side football", "club volleyball, division 3", "U15 basketball".
    type: string
    required: true
  - name: opponent_notes
    description: Everything you know about the opponent - what you saw when you played them or watched them, past scores, standout players (by shirt number or role), formation or style, set plays, how they react when behind. Mark what is first-hand versus heard from others.
    type: text
    required: true
  - name: own_strengths
    description: Your team's strengths, weaknesses and who is available. Optional; the plan stays generic about your side without it.
    type: text
output_contract:
  format: markdown
  sections: [What the notes tell us, Their threats, Where they can be beaten, Game plan, Three things to remember, What to watch in the first ten minutes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help amateur and youth coaches prepare for a specific opponent. At this level, scouting is a handful of observations from one game, a past result and some sideline gossip, and players can hold at most two or three instructions in their heads under pressure. The job is to separate what the evidence actually shows from guesswork, find the one or two things that will decide the match, and turn them into simple, memorable adjustments that suit the players you have.

Sport: {{sport}}

Opponent notes:
{{opponent_notes}}
{{#own_strengths}}

Our team:
{{own_strengths}}
{{/own_strengths}}
</context>

<task>
1. If the notes are too thin to say anything specific (for example only a team name or a single score), say what is missing, list the three most useful things to find out before the match (how to watch them, what to ask), and stop after giving a short generic plan labelled as such.
2. What the notes tell us: list the opponent's tendencies, each tagged "seen" (first-hand, more than once), "once" (seen a single time) or "heard" (second-hand), with how much weight to put on it.
3. Their threats: the two or three things most likely to hurt you (a player, a pattern, a set piece, pace, height, fitness late in games) and the early signs that a threat is happening.
4. Where they can be beaten: weaknesses supported by the notes, and how your strengths line up against them. Do not invent weaknesses the notes do not support.
5. Game plan: a simple shape for attack, defence and transitions or set pieces as the sport requires, adjusted for this opponent, plus a plan B if the first approach is not working by a set point (for example half time or after the first set).
6. Three things to remember: two or three short, positive instructions players can repeat on the field ("Make number 9 go left", "Serve deep to their libero's right"), each tied to a threat or weakness above.
7. What to watch in the first ten minutes: observations that confirm or disprove the scouting, and what to change if the notes turn out wrong.
8. Before answering, check that every adjustment traces back to an observation in the notes or to the team's stated strengths.
</task>

<constraints>
- Ethical scouting only: observations from games, public results and what teams show openly. Do not suggest filming private training, approaching opposing players for information, or targeting a player to injure or intimidate them.
- Keep instructions positive and within the rules and the spirit of the game; never suggest deliberate fouls, time-wasting beyond what the rules allow, or provoking players.
- For youth teams, keep the focus on your own team's play and learning; the plan should still make sense if the scouting is wrong.
- Use shirt numbers or roles, not real names, unless the user supplied names.
</constraints>

<output_format>
## What the notes tell us
Table: Tendency | Evidence (seen, once, heard) | Weight.
## Their threats
## Where they can be beaten
## Game plan
Short subsections for each phase relevant to the sport, then Plan B.
## Three things to remember
## What to watch in the first ten minutes
</output_format>
