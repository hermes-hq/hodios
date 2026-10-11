---
schema: 1
id: outline-full-length-play
kind: prompt
title: Outline a full-length stage play
description: Outlines a full-length play scene by scene, places the interval, keeps cast and sets producible, and makes act one end on a strong question. Use before drafting a play.
category: screenwriting
version: 1.0.0
status: incubating
stage: [plan]
role: [writer]
requires: [none]
inputs: [text, notes]
output: [outline, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [stage-play, playwriting-structure, interval, cast-size]
pairs_with:
  prompts: [write-beat-sheet, write-ten-minute-play, plan-community-theatre-production]
  personas: [script-consultant]
args:
  - name: premise
    description: The play's premise, characters, the central conflict and the ending if known.
    type: text
    required: true
  - name: theatre
    description: The likely venue and company, e.g. "studio theatre, 60 seats", "community theatre", "regional main stage", "touring". Shapes cast and set limits.
    type: string
    default: studio theatre
  - name: max_cast
    description: The largest cast you can expect to be produced, counting doubling.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Dramatic spine, Act structure, Scene outline, Producibility, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Theatre runs on live conflict in a shared room. A full-length play is usually 80 to 120 minutes, either in one act with no interval or in two acts with the interval around the 55 to 65 minute mark; roughly a page of play script plays a minute, more or less depending on how much happens. The first act must end on a question or reversal that makes an audience come back from the bar. Plays get produced when cast and sets fit the theatre: new playwrights with six or fewer actors and a unit set (one set that serves every scene) have far more chances. Screenwriters moving to the stage often write too many short scenes and locations; plays favour fewer, longer scenes where the pressure builds in real time, and let language and the actor's presence do what a camera does on film.
</context>

<task>
Outline a full-length play for a {{theatre}}, with at most {{max_cast}} actors.

<premise>
{{premise}}
</premise>

1. **Dramatic spine:** the protagonist's want, what opposes it, the central question, the climax and the final image. If the premise has no conflict between people on stage, ask up to three questions and stop.
2. **Act structure:** recommend one act or two, with the reason. For two acts, say what happens at the interval and what question the audience carries out of the room.
3. **Scene outline:** scene by scene, give place and time, who is on stage, what each character wants, the turn, and an estimated running time. Aim for fewer, longer scenes; flag any scene under three minutes and say why it earns its place or should merge.
4. **Producibility:** cast list with doubling plan to fit {{max_cast}}; the set (prefer one unit set or a few suggested locations), and costly elements (period costume, stage combat, live animals, children, special effects) with cheaper alternatives.
5. **Questions:** up to three choices the playwright should make before drafting.
</task>

<constraints>
- Keep the writer's characters, story and ending; mark additions "(proposed)".
- Do not write dialogue.
- Do not fit scenes to film conventions (many short locations, montage); say when an idea is better served on screen.
- Do not quote typical fees or royalty terms.
</constraints>

<output_format>
## Dramatic spine
## Act structure
## Scene outline
Table: Act | Scene | Place and time | On stage | Turn | Minutes.
## Producibility
## Questions
</output_format>
