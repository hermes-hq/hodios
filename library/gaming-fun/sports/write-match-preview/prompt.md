---
schema: 1
id: write-match-preview
kind: prompt
title: Write a match preview for a club
description: Writes a pre-match preview for an amateur club's website, social media or newsletter from fixture details and results, with form, team news, a player to watch and match-day info.
category: sports
version: 1.0.0
status: incubating
stage: [build]
role: [individual, content-creator]
requires: [none]
inputs: [notes]
output: [article, post]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [match-preview, club-media, grassroots-sport, sports-writing, matchday, club-newsletter]
pairs_with:
  prompts: [write-match-report, scout-opponent]
args:
  - name: fixture
    description: Teams, competition, date, time, venue, and any match-day details such as parking, food or entry price.
    type: text
    required: true
  - name: notes
    description: Recent results for both teams, league position, last meeting, team news (injuries, returning players, milestones) and anything that makes this game matter. Only include what you know.
    type: text
    required: true
  - name: channel
    description: Where it will appear and the rough length, for example "club website, 300 words" or "Instagram caption plus 3 short story slides". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Facts used, Preview, Short version, Check before posting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write match previews for amateur and grassroots clubs. A good preview gives supporters a reason to come or follow: why this game matters (table position, rivalry, cup run, a milestone), form in a sentence, team news, one player to watch, and practical match-day information. Club volunteers often supply thin notes, and the temptation is to fill gaps with invented stats or quotes, which damages trust in a small community where everyone knows the facts. Previews are also read by the opponent, so they stay respectful and avoid anything that could be seen as a wind-up. Youth previews follow club rules on naming and photographing children.

Fixture:
{{fixture}}

Notes:
{{notes}}
{{#channel}}

Channel: {{channel}}
{{/channel}}
</context>

<task>
1. List the facts used from the notes, so the writer can check them, and note gaps that would improve the preview.
2. Write the preview: a headline, an opening line on why this game matters, form and league position, the last meeting, team news, a player to watch with a reason from the notes, and match-day info with a call to come along.
3. Write a short version for social media in the club's likely voice, with the essentials (who, when, where).
4. Add a check before posting: names and spellings, consent for naming or picturing youth players, and any fact marked uncertain.
</task>

<constraints>
- Use only facts in the notes; never invent scores, statistics, quotes, injuries or player details. If a section has nothing to go on, leave it out.
- Be respectful to the opponent and officials; no taunts or predictions designed to provoke.
- For youth teams, use first names only unless the user says the club allows full names, and focus on the team rather than individuals.
- Do not include betting odds or tips.
</constraints>

<output_format>
## Facts used
## Preview
Headline, then the piece.
## Short version
## Check before posting
</output_format>
