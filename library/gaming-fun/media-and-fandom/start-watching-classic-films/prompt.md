---
schema: 1
id: start-watching-classic-films
kind: prompt
title: Start watching classic films
description: Gives a newcomer a way into older films, silent to the 1970s, starting from films they already like, with what to expect and how to get past the habits that put modern viewers off.
category: media-and-fandom
version: 1.0.0
status: incubating
stage: [discover, learn]
role: [individual, student]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [classic-films, old-hollywood, silent-film, black-and-white, film-history, viewing-route]
pairs_with:
  prompts: [explore-directors-filmography, explore-national-cinema, recommend-films-from-favorites]
  personas: [film-and-book-critic]
args:
  - name: modern_favourites
    description: Recent films or series you love, for example "Knives Out, Mad Max Fury Road, Before Sunrise".
    type: text
    required: true
  - name: hesitations
    description: What puts you off old films, for example "black and white", "slow", "stagey acting", "dated attitudes", or "nothing".
    type: text
    default: nothing named
  - name: number_of_films
    description: How many films to start with.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Bridges from what you love, What to expect, Your first films, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most people who say they do not like old films have seen the wrong ones first, often a slow prestige drama assigned at school. The better route is through genre and lineage: a fan of a modern heist film is one step from Rififi, a fan of Knives Out from the 1930s and 1940s mysteries it pays homage to, a fan of fast dialogue from screwball comedies that talk faster than anything made now. Expectations matter too: older films have different acting conventions, slower openings, intermissions, academy-ratio frames, and attitudes to race, gender and violence that need naming honestly. Silent films are best tried with comedies or short features, often with a good score.

Modern favourites: {{modern_favourites}}
Hesitations: {{hesitations}}
Films wanted: {{number_of_films}}
</context>

<task>
1. Map each modern favourite to the older films or genre it descends from, and say what the link is (a remake, an homage, the same genre engine, a director's stated influence). Mark documented links versus your own comparison.
2. Address each hesitation directly with a practical tip, for example short runtimes first for "slow", a colour classic for "black and white", or what to know before a film with dated attitudes.
3. Pick {{number_of_films}} films, ordered from easiest to more demanding, spanning at least three decades and more than one country, including one silent film only if their hesitations allow it.
4. For each give title, director, year, runtime band (under 100 minutes, 100 to 130, over 130), which favourite it bridges from, a spoiler-free hook and an honest content note if attitudes or scenes have dated badly.
5. Suggest next steps: a director, a genre or a movement to follow from the film they are most likely to love.
</task>

<constraints>
- Only real films with correct directors and years; mark uncertainty "(check)".
- Do not lecture about why classics are important; make the case through the films.
- Name dated or offensive content plainly; do not hide it and do not dismiss the film for it.
- No streaming or price claims.
</constraints>

<output_format>
## Bridges from what you love
Bullets: favourite → older film or genre, with the link.
## What to expect
Bullets answering each hesitation.
## Your first films
Table: # | Title (year) | Director | Runtime | Bridges from | Hook | Content note.
## Next steps
Two or three bullets.
</output_format>
