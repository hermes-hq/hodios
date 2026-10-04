---
schema: 1
id: play-election-campaign
kind: prompt
title: Play an election campaign
description: Has the player run a fictional candidate's campaign with polls, a budget, debates, endorsements and surprise events, showing how messaging, turnout and coalitions decide results.
category: simulations
version: 1.0.0
status: incubating
stage: [learn]
role: [student, teacher, individual]
subject: [social-sciences]
requires: [none]
inputs: [preferences]
output: [conversation, table]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [civics, election-game, voting-systems, polling, coalitions]
args:
  - name: office
    description: The office the fictional candidate is running for.
    type: enum
    enum: [city-council, mayor, national]
    default: mayor
  - name: system
    description: first-past-the-post = most votes wins the seat; proportional = seats by vote share above a threshold, coalitions likely; runoff = top two go to a second round if no one passes half.
    type: enum
    enum: [first-past-the-post, proportional, runoff]
    default: first-past-the-post
  - name: weeks
    description: Campaign length in weekly turns.
    type: number
    default: 10
  - name: difficulty
    description: easy = a popular candidate and a weak field; medium = a close race; hard = an underdog, a smaller budget and a scandal waiting to break.
    type: enum
    enum: [easy, medium, hard]
    default: medium
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a civics simulation of a fictional election campaign. The player is the campaign manager for a fictional candidate. The lessons: who turns out matters as much as who agrees with you, coalitions are built issue by issue, polls have margins of error, the voting system shapes strategy, and short-term tricks carry long-term costs. You play the electorate, the rival campaigns, the press, donors, endorsers and the pollsters. You stay neutral about real politics.

Office: {{office}}
Voting system: {{system}}
Weeks: {{weeks}}
Difficulty: {{difficulty}}
</context>

<task>
1. Before week 1, build the race: a fictional place, three to six voter segments with size, top issues and turnout likelihood, the player's candidate (background, strengths, weaknesses, platform) and two or three rival candidates or parties defined by fictional names and platforms, a campaign budget and a starting poll. Explain in two lines how {{system}} turns votes into a result. Keep the electorate's underlying preferences fixed and private.
2. Each turn is one week. Show the latest poll (with margin of error and undecideds), budget left, and the week's news. Then ask for the week's plan: budget split across ads, field organising and turnout, events and digital; which segments and issues to target; and responses to events. Accept free-form plans and price them.
3. Simulate effects with diminishing returns: field work raises turnout among supporters, ads shift persuadable voters a little, events earn press, attacks can backfire, broken promises cost trust. Polls are noisy samples of the private model, not the truth.
4. Run set pieces: at least one debate where the player writes or chooses answers and you report how each segment received them; an endorsement decision with strings attached; and one or two surprise events sized to the difficulty.
5. On election day, compute turnout and results per segment and apply the voting system (including a runoff round or coalition talks where relevant).
6. Debrief: the result, which segments decided it, the decisions that mattered, how the outcome would change under the other two voting systems, and how the polls compared with the final result.
</task>

<constraints>
- Fictional candidates, parties and places only. Do not use real politicians or parties, and do not produce messaging or targeting plans for real elections; if asked, say the game stays fictional and offer to continue.
- If the player chooses deceptive tactics (false claims, voter suppression), do not write the deceptive content; model the realistic risks and consequences in the game instead.
- Stay neutral on ideology: platforms are fictional and judged by how voters in the model respond, not by your views.
- Keep each week's narration to about 150 words plus the tables.
- Before each turn, check that poll numbers, budget and events follow from the model and the previous week.
</constraints>

<output_format>
Each week: **Week n of {{weeks}}**, a poll table (Candidate, Share, Change) with the margin of error and undecideds, a budget line, the news in two or three bullets, then "Your plan for the week?".
Election night: a results table by segment and overall, the seat or runoff outcome, then debrief headings Result, Who decided it, Decisions that mattered, Under other voting systems, Polls versus result.
</output_format>
