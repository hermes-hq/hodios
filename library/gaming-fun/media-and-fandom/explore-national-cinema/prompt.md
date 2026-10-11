---
schema: 1
id: explore-national-cinema
kind: prompt
title: Explore a country's cinema
description: Builds a starter route into one country's or region's cinema, with landmark films across eras and movements, the context to enjoy them and a way to keep going.
category: media-and-fandom
version: 1.0.0
status: incubating
stage: [discover, learn]
role: [individual, student, traveler]
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
tags: [world-cinema, film-history, subtitles, viewing-route, film-movements]
pairs_with:
  prompts: [explore-directors-filmography, recommend-films-from-favorites, start-watching-classic-films]
  personas: [film-and-book-critic]
args:
  - name: country
    description: The country, region or language cinema you want to explore, for example "Iran", "Nigeria (Nollywood)", "Korea" or "Brazil".
    type: string
    required: true
  - name: tastes
    description: Films or genres you already enjoy, so the route starts near your taste, for example "slow character dramas, some thrillers".
    type: text
    default: no preference given
  - name: number_of_films
    description: How many films to include.
    type: number
    default: 8
  - name: why
    description: Optional reason, for example "trip there next year" or "learning the language", so the route can lean that way.
    type: string
output_contract:
  format: markdown
  sections: [The lay of the land, Starter route, Before you press play, Keep going]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You introduce a national or regional cinema the way a good festival programmer would. Every film culture has its own shape: periods of censorship or state funding, movements with names (Italian neorealism, the Iranian New Wave, Cinema Novo, the Korean boom after the late 1990s), popular genre industries that critics often ignore (Bollywood musicals, Nollywood home video, Hong Kong action), and diaspora filmmakers who are claimed by more than one country. A route that only lists festival prizewinners gives a false picture; one that only lists popular hits misses the films that shaped everything after. Newcomers also need practical help: subtitles, very different pacing norms, and context that a local audience would bring.

Cinema: {{country}}
Tastes: {{tastes}}
Films wanted: {{number_of_films}}
{{#why}}Reason: {{why}}{{/why}}
</context>

<task>
1. If the place is ambiguous (a region with several industries, or a country whose cinema you know little about), say what you can cover confidently and ask one question if needed.
2. Sketch the lay of the land: the main eras and movements, the popular genre industry if there is one, and the political or economic events that shaped what got made. Keep it to what helps a viewer.
3. Build a route of {{number_of_films}} films that mixes eras, art-house and popular work, and at least one film by a woman director where you can name one confidently. Start with the film closest to their stated tastes.
4. For each film give title (original and English if different), director, year, the movement or era it represents, why it is on the route and a spoiler-free hook.
5. Add "before you press play" notes: pacing or style conventions that surprise newcomers, context a local viewer would know, and any content notes.
6. If a reason was given, lean the route toward it, for example films set in places they will visit or with clear everyday speech for a learner.
7. Give a way to keep going: directors, one movement to dig into, and how to find more (festival lineups, national film archives, critics who specialise in this cinema) without naming paid services.
</task>

<constraints>
- Never invent films, directors or years; mark uncertainty "(check)" and prefer fewer films to wrong ones.
- Do not reduce a cinema to stereotypes or to one director.
- No claims about where a film streams or what it costs.
- No spoilers beyond the premise.
</constraints>

<output_format>
## The lay of the land
Short paragraph and a list of eras or movements.
## Starter route
Table: # | Title (original / English) | Director (year) | Era or movement | Why on the route | Hook.
## Before you press play
Bullets.
## Keep going
Bullets.
</output_format>
