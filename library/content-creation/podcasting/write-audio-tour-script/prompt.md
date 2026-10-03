---
schema: 1
id: write-audio-tour-script
kind: prompt
title: Write an audio tour script
description: Writes a walking or museum audio tour with stops, directions between them, timed narration per stop, stories, look-here prompts, accessibility notes and facts flagged to verify.
category: podcasting
version: 1.0.0
status: incubating
stage: [build]
role: [writer, traveler, teacher]
subject: [history]
requires: [none]
inputs: [topic, notes, document]
output: [script, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [audio-tour, walking-tour, museum-guide, wayfinding]
pairs_with:
  prompts: [write-solo-episode-script, write-tts-voiceover-script, write-audio-description-script]
args:
  - name: place
    description: "The town, neighbourhood, museum, garden or building, with the theme of the tour and any notes, sources or must-see stops you have. Paste your research for the most accurate script."
    type: string
    required: true
  - name: stops
    description: Number of stops.
    type: number
    default: 8
  - name: minutes_per_stop
    description: Target narration length per stop in minutes.
    type: number
    default: 2
  - name: audience
    description: "Who listens: general (curious visitors), kids (roughly 7 to 12, with questions and things to spot), experts (enthusiasts who want depth and sources)."
    type: enum
    enum: [general, kids, experts]
    default: general
output_contract:
  format: markdown
  sections: [Route, Stop scripts, Accessibility, Facts to verify, Production notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An audio tour is radio that has to work while someone stands in front of the thing being described, or walks between two places on a real street. It fails when the narration reads like a guidebook, tells listeners what they "can see" without telling them where to look, loses them between stops, runs long while they stand in the rain, or states local history that turns out to be a legend. Good tours open each stop with an instruction to look at something specific, tell one story rather than ten facts, give clear landmark-based directions with walking times, and are honest about what is documented and what is tradition.
</context>

<task>
Write a {{stops}}-stop audio tour of {{place}} for a {{audience}} audience, about {{minutes_per_stop}} minutes of narration per stop.

1. If the place is too broad (a whole city) or there is no theme, propose a theme and a compact route and say so; if the user gave notes, base the tour on them. Ask only if you cannot pick a sensible route.
2. **Route.** A table of stops in walking order with name, what to stand in front of, walking time from the previous stop, and a step-free alternative where steps, hills or narrow paths are likely. Keep the whole tour realistic for the audience (shorter walks and more breaks for kids).
3. **Stop scripts.** At about 140 words per minute, each stop gets roughly {{minutes_per_stop}} × 140 words:
   - **Look first:** an orienting line that tells the listener where to stand and what to look at ("Face the red door; look up at the carved face above it").
   - **One story:** the main story of the stop, told with a person, a moment and a detail, connected to the theme.
   - **Detail to notice:** one thing they would miss without the guide.
   - For kids: a question to answer or something to find, then the answer after a pause. For experts: dates, names, context and a pointer to where to read more.
   - **Directions to the next stop:** turn-by-turn using landmarks, with the walking time and a safety note at road crossings.
   Write for the ear: short sentences, no parentheses, numbers and dates said naturally.
4. **Accessibility.** Describe visual details in enough words that a blind or low-vision listener can follow (shape, colour, size, position) instead of "as you can see"; note seating and toilets where known; offer a transcript; keep directions usable for wheelchair users with the step-free alternatives from the route.
5. **Facts to verify.** Every date, name, number and historical claim that did not come from the user's notes, marked [VERIFY] in the script and listed here with what to check. Mark legends and local traditions as such in the script ("the story goes...").
6. **Production notes.** Recording tips (quiet room, consistent level, one file per stop named with stop number), a short intro track (welcome, total time, how to use the tour, a safety reminder), and an outro.
7. Before answering, check that each stop's word count fits {{minutes_per_stop}} minutes within about 20%, that every stop has a look-first line and directions, and that every unsupplied fact is flagged.
</task>

<constraints>
- Never present invented history or uncertain claims as fact. If you do not know something about the place, leave a [RESEARCH] placeholder rather than filling it in.
- Do not send listeners onto private property, closed areas or unsafe crossings; respect sites' rules on recording and visiting.
- No app, platform or version names.
</constraints>

<output_format>
## Route
Table: # | Stop | Stand here and look at | Walk from previous | Step-free alternative.
## Stop scripts
Intro, then one section per stop with its approximate word count, then outro.
## Accessibility
## Facts to verify
Table: Claim | Stop | What to check.
## Production notes
</output_format>
