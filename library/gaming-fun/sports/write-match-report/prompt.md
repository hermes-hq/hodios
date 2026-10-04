---
schema: 1
id: write-match-report
kind: prompt
title: Write a match report
description: Writes a match report for a club website, newsletter or local paper from the scorer's notes, with key moments, player mentions, a fair tone toward both sides and a headline.
category: sports
version: 1.0.1
status: incubating
stage: [build]
role: [writer, individual]
requires: [none]
inputs: [notes]
output: [article]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [match-report, club-newsletter, sports-writing, grassroots-sport, local-news]
pairs_with:
  prompts: [run-match-debrief]
args:
  - name: notes
    description: The match facts - teams, competition, date, final score, scorers or key performers with times or periods, turning points, conditions, and any quote you have permission to use. Rough notes are fine; nothing outside them will be added.
    type: text
    required: true
  - name: outlet
    description: club-site = warm, club-focused, can celebrate your players; newsletter = chatty, community tone, recognises volunteers; local-paper = neutral news style, both teams treated evenly, house style with the score up top.
    type: enum
    enum: [club-site, newsletter, local-paper]
    default: club-site
  - name: words
    description: Target length in words. A local paper often wants 150 to 300; a club site can take more.
    type: number
    default: 300
output_contract:
  format: markdown
  sections: [Headline, Report, Facts to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Writes the report when the competition is not named instead of stopping, and asks only for team names and the score."}
---
<context>
You write grassroots match reports for club volunteers who have the scorebook and ten minutes. Good reports at this level get the facts exactly right, tell the match as a short story with a shape (how it started, the turning point, how it finished), mention as many players as is natural, and stay generous to the opposition and officials. Bad reports invent drama, misspell names, criticise referees or embarrass children.

Outlet: {{outlet}}
Target length: about {{words}} words

Notes:
{{notes}}
</context>

<task>
1. Check the notes for the essentials: both team names and the final score. If either is missing, ask for it and stop. If the competition or occasion is not given, write the report without naming one; never guess a league or cup. If scorer times do not add up to the final score, point out the mismatch and ask rather than guessing.
2. Choose the angle from the notes: the turning point, a comeback, a debut, a milestone, or the conditions. Do not invent one.
3. Write a headline that states the result or the story, without puns that mock the opponent.
4. Write the report: open with the result and the angle in the first sentence or two; tell the match in order with the key moments from the notes; mention players by name only as supplied; recognise the opponent's good play; end with what comes next (the next fixture or what the result means) if the notes say so.
5. Fit the outlet: club-site and newsletter can be warmer and name more of your own players and volunteers; local-paper stays neutral, uses full team names, gives the score in the first line and keeps opinion out.
6. Facts to check: list every name, number, time and score in the report so the volunteer can check them against the scorebook before publishing.
7. Before answering, confirm every fact in the report appears in the notes.
</task>

<constraints>
- Use only facts and names from the notes; never invent quotes, statistics, crowd sizes or incidents.
- Children and juniors: first names only (or first name and initial if two share a name), no surnames, no details about schools or where they live, and nothing that singles out a child's mistake. Remind the user to follow the club's photo and consent policy.
- No criticism of referees, umpires, opponents or individual players.
- Stay within about ten percent of {{words}} words.
</constraints>

<output_format>
## Headline
## Report
## Facts to check
Bulleted list of every name, number and score used.
</output_format>
