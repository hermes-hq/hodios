---
schema: 1
id: pick-movie-for-group
kind: prompt
title: Pick a movie for the group
description: Helps a family, couple or friend group agree on what to watch tonight by collecting vetoes and moods, proposing a shortlist and running a quick vote.
category: media-and-fandom
version: 1.0.0
status: incubating
stage: [discover]
role: [individual, parent]
requires: [none]
inputs: [preferences, text]
output: [conversation, ideas]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [what-to-watch, movie-night, group-decision, family-movie]
pairs_with:
  prompts: [recommend-films-from-favorites, plan-watch-party, plan-family-game-night]
args:
  - name: people
    description: Who is watching, with ages for any children, for example "me and my partner (late 30s), kids aged 7 and 11".
    type: text
    required: true
  - name: time_available_minutes
    description: How many minutes you have from pressing play to bedtime or leaving.
    type: number
    default: 120
  - name: platforms
    description: Services or collections you can watch from, for example "Netflix, Disney+, our DVD shelf". Use "any" if open.
    type: string
    default: any
  - name: content_limits
    description: Content rules, for example "nothing scary" or "no sex scenes with the kids here". The default sets limits by the youngest viewer.
    type: string
    default: by-youngest-viewer
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a quick, fair game that gets a group from "what do you want to watch?" to pressing play in a few minutes. Groups stall because nobody wants to veto a suggestion out loud, the loudest person wins, and the scrolling eats the evening. A good host collects vetoes privately and up front, offers a short shortlist with something in it for everyone, and lets a simple vote decide.

People: {{people}}
Time available: {{time_available_minutes}} minutes
Platforms: {{platforms}}
Content limits: {{content_limits}}
</context>

<task>
Run the game in rounds, one round per turn, and wait for the group's answers between rounds.
1. Round 1, collect. If children are mentioned without ages, ask for their ages first and stop. Otherwise ask each person for one mood word, one hard veto (a genre, a theme, subtitles, scary scenes, a specific actor) and one film they enjoyed recently. Tell them one combined message is fine.
2. Round 2, shortlist. Offer four films that respect every veto and the content limits, and that end with at least ten minutes to spare before {{time_available_minutes}} minutes. For each, give the approximate running time and one short line per person on why they might enjoy it. Ask each person to say "out" for any film they cannot stand.
3. Round 3, vote. Remove the "out" films. Each person gives 3 points to their favourite of what is left, 2 to the next and 1 to the third. Tally and announce the winner. Break a tie with the shorter film, then by letting the youngest viewer choose.
4. If every film is knocked out, run one rescue round with three new picks that shift one dimension (era, animation or live action, comedy or adventure), then vote again.
5. End with the winner, its running time and one line to set the mood. Offer one backup in case it is unavailable.
</task>

<constraints>
- Never state an age rating as fact. Say what in the film might matter (scary scenes, language, violence) and tell them to check their local rating board's certificate.
- Do not claim a film is on a particular service. When platforms are named, say "check it is on your services" with each shortlist.
- Apply the content limits to every pick. With the default, judge by the youngest viewer named.
- Keep each turn short enough to read aloud: the shortlist and the tally fit on one screen.
- Do not reveal plot beyond the premise.
</constraints>

<output_format>
Round 1: a numbered question list addressed to the whole group.
Round 2: a table: # | Film (year) | Runtime | Why each person might like it | Heads-up.
Round 3: a tally table: Film | points per person | Total, then "Tonight: <film>".
Close: the winner, runtime, a backup, and a reminder to check availability and the local rating.
</output_format>
