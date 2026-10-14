---
schema: 1
id: write-documentary-reenactment-prompts
kind: prompt
title: Write documentary reconstruction prompts
description: Writes generated reconstruction shots for a history or documentary video that suggest rather than fake, using details, silhouettes and labels, checked against the sources you supply.
category: video-generation
version: 1.0.0
status: incubating
stage: [plan, build]
role: [content-creator, researcher, teacher]
subject: [history]
requires: [none]
inputs: [text, document, notes]
output: [prompt, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [documentary, historical-reconstruction, archival-ethics, period-detail]
pairs_with:
  prompts: [write-documentary-outline, write-b-roll-prompts, convert-article-to-video-scenes]
args:
  - name: topic
    description: The events or period the video covers and the moments you want to illustrate.
    type: text
    required: true
  - name: sources
    description: Facts from your research about the moments to illustrate (dates, places, clothing, objects, buildings, weather), with where each comes from.
    type: text
    required: true
  - name: tone
    description: "The film's tone, e.g. 'sober and respectful', 'curious and warm', 'tense'."
    type: text
    default: sober and respectful
output_contract:
  format: markdown
  sections: [What to show, Shot prompts, Period check, Labelling]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Documentary makers have long used reconstruction, and the careful ones keep it impressionistic: hands writing a letter, boots on a road, a silhouette at a window, a lamp in a dark room, a ship's hull in fog. That style tells the audience "this is an evocation", not "this is what happened". Generated video makes it easy to produce photoreal footage that looks archival, which is where the harm starts: viewers, and later other creators, take it as a record. Generated faces of real historical people put invented features on them, and period details are often wrong (anachronistic clothing, buildings, vehicles, uniforms). A responsible reconstruction is grounded in the sources, avoids identifying faces of real people, avoids mimicking archival film stock in a way that could be mistaken for it, and is labelled on screen.
</context>

<task>
Write reconstruction shots for this film.

<topic>
{{topic}}
</topic>

<sources>
{{sources}}
</sources>

Tone: {{tone}}.

1. **What to show.** For each moment, choose an impressionistic treatment: details and hands, objects, silhouettes, backs, out-of-focus figures, environments, light. State what will not be shown (identifiable faces of real people, the suffering of real victims, invented actions by real people) and why.
2. **Shot prompts.** One prompt per shot: framing, the impressionistic subject, period details drawn only from {{sources}}, light and weather, a {{tone}} camera language, and a look that is cinematic rather than a mimic of archival film stock.
3. **Period check.** A table of every period detail in the prompts (clothing, objects, vehicles, architecture, signage) with the source that supports it. Mark any detail you added without a source as "unsourced" and suggest removing it or checking it. Note details the generator is likely to get wrong and how to spot them.
4. **Labelling.** Where and how to label reconstructions on screen (for example a small "reconstruction" caption on first use and in the credits), and a reminder to keep generated footage clearly separate from real archival material in the edit and in any files shared later.
5. Before answering, check that no prompt shows an identifiable real person's face and that every period detail traces to the sources or is marked unsourced.
</task>

<constraints>
- Do not invent historical facts, dates, names or quotes; use only what the sources give and say where they are thin.
- Do not create footage designed to pass as archival film, photographs or news of real events.
- Do not depict real victims of violence, atrocities or disasters; evoke through place and objects instead.
- No tool, model or version names.
</constraints>

<output_format>
## What to show
Table: Moment | Treatment | Not shown and why.
## Shot prompts
Numbered code blocks.
## Period check
Table: Detail | Shot | Source or "unsourced" | Likely generator error.
## Labelling
Bullets.
</output_format>
