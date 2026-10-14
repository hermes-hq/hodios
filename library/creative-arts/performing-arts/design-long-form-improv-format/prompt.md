---
schema: 1
id: design-long-form-improv-format
kind: prompt
title: Design a long-form improv format
description: Designs a long-form improv show format for a troupe, with the opening, how scenes connect and return, edits and group games, a timed structure, rehearsal drills and a one-line pitch for venues.
category: performing-arts
version: 1.0.0
status: incubating
stage: [design]
role: [artist, teacher]
requires: [none]
inputs: [notes, preferences]
output: [plan, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [improv, long-form, show-format, troupe, comedy-shows]
pairs_with:
  prompts: [plan-improv-session, play-improv-scene-partner]
args:
  - name: troupe
    description: Number of performers, experience, what they are good at, the show length and the venue or audience.
    type: text
    required: true
  - name: idea
    description: The feel or hook you want (a whole-show narrative, a genre, scenes from one suggestion, a show built on an interview). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Concept, Structure, Rules of the format, Edits and transitions, Rehearsal drills, Pitch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design long-form improv formats. A format is a structure that helps a troupe build a satisfying show from one suggestion: it decides how the show opens (an opening that generates ideas, a monologue, an interview, or straight into a scene), how scenes relate (separate scenes linked by theme, returning to earlier scenes in later "beats", or one continuous story), when the group comes together (group games or ensemble scenes), and how scenes end (sweep edits, tag-outs, lights). Good formats give the audience a payoff: things introduced early come back, connect, or heighten. Formats fail when the structure is so complicated the troupe thinks about rules instead of listening, when they need more performers than the troupe has, or when they leave nowhere for the show to go after twenty minutes. Well-known formats exist and can be adapted; a new format is often a known structure with one distinctive twist that suits the troupe.

Troupe: {{troupe}}
{{#idea}}Idea: {{idea}}{{/idea}}
</context>

<task>
1. Concept: the format's name placeholder, its hook in one line, and how it suits this troupe's size and strengths.
2. Structure: a timed outline of the show from suggestion to ending: opening, scene beats, group moments, returns and the ending, fitting the stated show length.
3. Rules of the format: the few rules performers must hold (for example "second beats heighten the first scene's game", "the third beat connects two worlds"), kept to as few as possible.
4. Edits and transitions: which edits to use when, and how the lighting or host knows the show is ending.
5. Rehearsal drills: four to six drills that train the specific skills the format needs, each with how to run it.
6. Pitch: a one-line and a three-line description for venues and festival listings.
</task>

<constraints>
- Fit the troupe size and experience; do not design for more performers than given.
- If you adapt a known format, say so rather than presenting it as new.
- Keep the rules list short; complexity should serve the show.
- Do not promise bookings or audience numbers.
</constraints>

<output_format>
## Concept
## Structure
A table: Time | Section | What happens.
## Rules of the format
## Edits and transitions
## Rehearsal drills
## Pitch
</output_format>
