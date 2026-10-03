---
schema: 1
id: build-music-sound-kit
kind: prompt
title: Build a sound kit for AI music generation
description: Builds a reusable sound kit for AI music generation with fixed genre and mood tags, instrumentation, tempo ranges and words to avoid, so a creator's tracks sound like one artist.
category: music
version: 1.0.0
status: incubating
stage: [design]
role: [artist, content-creator]
requires: [none]
inputs: [text, preferences]
output: [prompt, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [sonic-identity, style-tags, ai-music, track-consistency]
pairs_with:
  prompts: [write-music-prompt, plan-music-release, write-background-music-cues]
args:
  - name: reference_description
    description: "Your sound in words: genres, era, instruments, vocal style, production feel, mood, and what you never want. Describe sounds, not artist names."
    type: text
    required: true
  - name: tracks_planned
    description: How many tracks the kit should cover (an EP, an album, a season of background music).
    type: number
    default: 6
  - name: vocals
    description: "Vocal policy for the kit: none (instrumental), male, female, mixed (both across tracks), any (decided per track)."
    type: enum
    enum: [none, male, female, mixed, any]
    default: any
output_contract:
  format: markdown
  sections: [Identity statement, Core tags, Palette, Tempo and key, Avoid list, Track plan, Prompt template, Consistency check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Generating one good song is easy; generating six that sound like the same artist is not. Each prompt written from scratch drifts in genre words, instrument choices, vocal type and mix, and the collection sounds like a playlist of strangers. Producers solve this with a sonic identity: a fixed core of descriptors that every track shares, a limited palette of instruments, tempo and key tendencies, a production signature, and a list of things the artist never does. Variation then happens inside those walls, in planned slots per track.
</context>

<task>
Build a sound kit for {{tracks_planned}} tracks. Vocal policy: {{vocals}}.

<reference>
{{reference_description}}
</reference>

1. If the reference is too thin to define a sound (a single word like "chill"), ask up to three questions in one message (genres and era, instruments, production feel) and stop. If it names real artists, translate each into sound descriptors and say you did so; artist names never go into the kit.
2. **Identity statement.** Two sentences describing the artist's sound as a producer would.
3. **Core tags.** 6 to 10 descriptors that appear, in the same order and wording, at the start of every style prompt: genre and subgenre, era feel, signature instrument, vocal type (per {{vocals}}), production character, mood. Order them most important first and keep them short enough to leave room for per-track words within typical style-field limits.
4. **Palette.** Instruments in three groups: core (on almost every track), colour (used on some tracks), never. Include playing style (fingerpicked, side-chained, brushed).
5. **Tempo and key.** A tempo range in BPM with a home tempo, preferred time feels (straight, swung, half-time), and key or mode tendencies (for example minor keys, Dorian colour), described plainly.
6. **Avoid list.** Words and sounds that pull the generator away from the identity (for example "epic", "EDM drop", "autotune" if they do not fit), for use in an exclude field or simply kept out of prompts.
7. **Track plan.** A table with one row per track: working title, role in the set (opener, single, ballad, closer), the variable slots (tempo within range, one colour instrument, mood shift, vocal choice under {{vocals}}), and the full style prompt built as core tags plus the slots.
8. **Prompt template.** A fill-in template: [core tags], [tempo] BPM, [colour instrument], [mood shift], [vocal], [structure note].
9. **Consistency check.** Before answering, confirm that every track prompt starts with the identical core tags, uses only palette instruments, stays within the tempo range and honours the vocal policy; then give the user a listening checklist to run on generated tracks (same vocal timbre, same drum sound family, same mix depth, nothing from the avoid list).
</task>

<constraints>
- Never include real artist names, band names or song titles in any prompt or tag.
- Do not promise that generators will hold an identical voice across tracks; suggest generating several takes and keeping the closest, and using the tool's own persona or reference features if it has them.
- No tool, model or version names.
</constraints>

<output_format>
## Identity statement
## Core tags
Code block.
## Palette
## Tempo and key
## Avoid list
Code block.
## Track plan
Table, then one code block per track prompt.
## Prompt template
Code block.
## Consistency check
</output_format>
