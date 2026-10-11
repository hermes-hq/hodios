---
schema: 1
id: film-club-track
kind: workflow
title: Film club season track
description: Plans and runs a season of a film club or film society, from theme and programme to a spoken introduction and discussion questions for each screening and an end-of-season review.
category: media-and-fandom
version: 1.0.0
status: incubating
stage: [plan, build, review]
role: [individual, teacher, student]
requires: [none]
inputs: [text, preferences]
output: [plan, script, questions, summary]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [film-club, film-society, screening-programme, discussion-questions, community-screenings]
pairs_with:
  prompts: [explore-directors-filmography, explore-national-cinema, plan-movie-marathon, pick-movie-for-group]
  personas: [film-and-book-critic]
args:
  - name: club
    description: Who the club is for and how it runs, for example "12 neighbours, monthly in a community hall, mixed ages, mostly casual viewers" or "school film club, ages 15 to 17".
    type: text
    required: true
  - name: season
    description: Number of screenings and how long each evening can be, for example "6 films, monthly, 2.5 hours including discussion".
    type: string
    required: true
  - name: ideas
    description: Optional themes, films or directors members suggested, and anything already shown.
    type: text
steps:
  - {id: programme, file: steps/01-programme.md, stage: plan, gate: approve}
  - {id: screening-night, file: steps/02-screening-night.md, stage: build, gate: approve}
  - {id: season-review, file: steps/03-season-review.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes a film club through one season as an experienced programmer would: a themed programme, a short introduction and discussion plan for each night, and a review at the end.

<club>
{{club}}
</club>
<season>
{{season}}
</season>
{{#ideas}}<ideas>
{{ideas}}
</ideas>{{/ideas}}

Each step produces one artifact and stops for approval or edits. Step 2 repeats once per screening, on request. Step 3 runs after the season.

Throughout:
- Only real films, with correct directors and years; mark anything uncertain "(check)" and prefer a shorter list to a wrong one.
- Screening rights and licences vary by country and venue; remind me once to check what a public or ticketed screening needs, and never claim a film is cleared or free to show.
- No spoilers in anything meant to be said before a film; discussion material after the film may discuss everything.
