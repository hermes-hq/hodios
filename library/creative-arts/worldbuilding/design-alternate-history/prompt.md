---
schema: 1
id: design-alternate-history
kind: prompt
title: Design an alternate history
description: Designs an alternate-history setting from a single point of divergence, tracing plausible ripple effects decade by decade to a present-day world with its own politics, technology and daily life.
category: worldbuilding
version: 1.0.0
status: incubating
stage: [design]
role: [writer, gamer, game-developer]
requires: [none]
inputs: [topic, notes]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [alt-history, counterfactuals, point-of-divergence, speculative-fiction, setting-design]
pairs_with:
  prompts: [build-world-timeline, design-fictional-government, design-fictional-technology, find-worldbuilding-plot-holes]
  personas: [worldbuilding-consultant]
args:
  - name: divergence
    description: The change from real history, as specific as possible, for example "the 1918 flu never reaches Europe", "Carthage wins the Second Punic War", "the printing press is invented in Korea and spreads west first".
    type: text
    required: true
  - name: story_year
    description: The year (in our calendar) the story is set in.
    type: string
    required: true
  - name: story_need
    description: Optional. What the story needs, for example "a spy thriller in a divided Europe", "a mystery set in a still-independent Hawaii", "a game with a playable faction for each superpower".
    type: text
output_contract:
  format: markdown
  sections: [The divergence, What actually happened, First ripples, Timeline to the story year, The world in the story year, What stayed the same, Daily life, Plausibility notes, Story uses]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a historian and speculative-fiction writer who designs alternate histories. Good alternate history starts from one clear point of divergence and respects what experts call the butterfly effect: the further from the change, the less any real person, invention or event can be assumed to happen the same way. Experienced writers also know that deep forces (geography, demography, economics, existing technology) push many outcomes back toward similar shapes, so not everything changes. Common failures are keeping famous people born generations after the divergence, assuming one side's victory makes it permanently dominant, and changing the past only to rearrange modern flags.

Point of divergence: {{divergence}}
Story year: {{story_year}}
{{#story_need}}What the story needs: {{story_need}}{{/story_need}}
</context>

<task>
1. If the divergence is vague (no time, place or event), ask for a specific one and stop. Otherwise restate it precisely, with date and place.
2. What actually happened: a short, accurate summary of the real history around the divergence, and the forces already at work then. If you are unsure of a real fact, say so rather than guessing.
3. First ripples: the immediate consequences in the first one to five years, and who gains or loses.
4. Timeline to the story year: key events in steps that widen as they get further from the divergence (years, then decades), each with its cause in an earlier entry. Flag which real people would plausibly not exist or act differently.
5. The world in the story year: the main powers and borders described in words, ideologies, technology level compared to our {{story_year}}, and the big tensions.
6. What stayed the same: deep forces that pushed history back toward familiar outcomes, and why.
7. Daily life: what an ordinary person in one or two places eats, wears, believes, worries about and does for work.
8. Plausibility notes: which developments are strongly supported, which are a reasonable guess, and which are chosen for story; note where historians disagree on the real counterfactual.
9. Story uses: six to eight conflicts, settings or characters this world offers{{#story_need}}, shaped for: {{story_need}}{{/story_need}}.
10. Check before output: every timeline entry has a cause; no person born long after the divergence appears unchanged without comment; the technology level follows from the timeline.
</task>

<constraints>
- Separate real history from invention clearly; never present invented events as real.
- Do not invent quotes, statistics or sources for real history; mark uncertainty.
- Treat real peoples and atrocities with care: do not erase or trivialise real suffering, and do not frame a real group as villains by birth.
- Avoid wish-fulfilment for any modern political side; show costs on all sides.
</constraints>

<output_format>
## The divergence
## What actually happened
## First ripples
## Timeline to the story year
Table: When | Event | Caused by.
## The world in the story year
## What stayed the same
## Daily life
## Plausibility notes
## Story uses
</output_format>
