---
schema: 1
id: write-animation-script
kind: prompt
title: Write an animation script
description: Writes an animated film or episode script with the visual detail storyboard artists need, gags described beat by beat, and a note of new assets each scene requires. Use for animated shorts and series.
category: screenwriting
version: 1.0.0
status: incubating
stage: [build]
role: [writer, artist]
requires: [none]
inputs: [text, notes]
output: [script, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [animation, storyboard-ready, visual-comedy, asset-list]
pairs_with:
  prompts: [write-beat-sheet, write-short-film-script, format-screenplay-scene]
  personas: [script-consultant]
args:
  - name: story
    description: The story or outline for the piece, with characters, the audience age, and the tone (slapstick, gentle preschool, adult comedy, drama).
    type: text
    required: true
  - name: runtime
    description: Target length, e.g. "2-minute short", "11-minute episode", "22-minute episode".
    type: string
    default: 11-minute episode
  - name: style
    description: The animation style and pipeline if known, e.g. 2D limited, 3D CG, stop motion, cut-out. Affects how many new sets and characters are affordable.
    type: string
    default: 2D
output_contract:
  format: markdown
  sections: [Approach, Script, Asset list, Production flags]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Animation scripts are read by storyboard artists, designers and directors who must draw everything that is written, so they differ from live-action scripts. Action lines describe the visual gag beat by beat (the set-up, the take, the payoff) because nothing happens on screen unless someone draws it. They call out expressions and physical comedy more than live action does, but they still do not direct camera shot by shot; the board artist owns staging. Page counts run differently: animation pages often play shorter or longer than a minute depending on action density, so the writer tracks runtime by action, not just pages. Every new character, location, prop and costume is a design and build cost; a strong episode reuses sets and limits new assets. Preschool scripts also need simple clear dialogue, no dangerous imitable behaviour, and repetition children enjoy.
</context>

<task>
Write an animation script for this {{runtime}} in {{style}}.

<story>
{{story}}
</story>

1. **Approach:** in three lines, the audience, the comedic or dramatic engine of the piece, and how you will keep the asset count low.
2. **Script:** write the full script in standard screenplay format. In action lines, describe each visual gag in sequence (set-up, reaction, payoff), give key expressions and physical business in plain terms, and keep each paragraph to three lines. Do not specify camera angles except where a gag depends on what the audience can or cannot see; then write it as a short note such as "we see" or "reveal". Size the script to {{runtime}}, noting that dense action plays long.
3. **Asset list:** a table of every character, location, prop and effect that appears, marked New or Reused, with the scenes where it appears. Flag any asset used only once.
4. **Production flags:** anything costly in {{style}} (crowds, water, hair and cloth, many costume changes), any behaviour a young audience might copy unsafely, and suggested cheaper alternatives.
</task>

<constraints>
- Keep the writer's story, characters and ending; mark any added gag as "(proposed)".
- Every joke must be visible or audible; no jokes that live only in description ("it's hilarious").
- For audiences under eight, avoid dangerous imitable actions or flag them.
- Do not imitate a specific studio's characters or catchphrases.
</constraints>

<output_format>
## Approach
## Script
## Asset list
Table: Asset | Type | New or Reused | Scenes.
## Production flags
</output_format>
