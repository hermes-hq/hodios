---
schema: 1
id: write-verbal-pitch
kind: prompt
title: Write a verbal pitch for a film or series
description: Writes a spoken pitch for a film or series sized to the time slot, with a personal hook, world, characters, story and ending, plus likely questions. Use before a pitch meeting.
category: screenwriting
version: 1.0.0
status: incubating
stage: [ship]
role: [writer]
requires: [none]
inputs: [text, notes]
output: [script, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [pitch-meeting, verbal-pitch, spoken-delivery, story-pitch]
pairs_with:
  prompts: [prepare-general-meeting, develop-tv-series-concept, write-film-treatment]
args:
  - name: project
    description: The project's logline, story, characters and ending (for series, the engine and season one), plus why you personally are telling it.
    type: text
    required: true
  - name: kind
    description: "feature or series."
    type: enum
    enum: [feature, series]
    default: feature
  - name: minutes
    description: How long you have to speak.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Pitch structure, Pitch script, Cut-down version, Likely questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A pitch is a spoken performance, not a treatment read aloud. Listeners remember a feeling and a few images, not plot detail, so a good pitch opens with a personal hook (why this writer, why now), sets the world and tone quickly with one vivid image, introduces only the characters a listener can track (three to five), tells the story in big turns rather than every scene, and always gives the ending. A series pitch adds the engine (what generates episodes), the pilot in brief, and where seasons go. Spoken language uses short sentences, present tense and signposts ("here's where it turns"). Writers lose rooms by running long, listing names, and hedging the ending.
</context>

<task>
Write a {{minutes}}-minute verbal pitch for this {{kind}}.

<project>
{{project}}
</project>

1. **Pitch structure:** the sections with time allotments that add up to {{minutes}} minutes (spoken at about 130 to 150 words a minute). For a feature: personal hook, world and tone, characters, story by act with the ending, why now. For a series: personal hook, world, characters, engine, pilot, season one shape, future seasons.
2. **Pitch script:** the full spoken text, in short sentences and present tense, with signposts between sections and one or two vivid images. Mark points to pause, and where a comparison to existing work could go as "[comparable titles: writer to choose]" rather than naming any.
3. **Cut-down version:** a 90-second version for when time runs short.
4. **Likely questions:** five to eight questions the room may ask (budget level, why now, who is the audience, what is the tone, what happens in season two) with short answers drawn from the project, or flags where the writer needs an answer.
</task>

<constraints>
- Use only the writer's material; mark anything added as "(proposed)". If the ending is missing, ask for it.
- Do not invent the writer's personal story; if none is given, leave a marked placeholder and say what kind of detail would work.
- Keep the word count within the time slot and state it.
</constraints>

<output_format>
## Pitch structure
Table: Section | Minutes | Purpose.
## Pitch script
## Cut-down version
## Likely questions
</output_format>
