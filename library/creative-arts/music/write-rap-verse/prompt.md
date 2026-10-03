---
schema: 1
id: write-rap-verse
kind: prompt
title: Write a rap verse
description: Writes a rap verse and hook from your subject and style, with a stated flow pattern, multisyllabic and internal rhymes, numbered bars, a rhyme map and delivery notes you can rework into your own.
category: music
version: 1.0.0
status: incubating
stage: [build]
role: [artist, writer]
requires: [none]
inputs: [text, topic]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [rap, hip-hop, multisyllabic-rhyme, flow, bars]
pairs_with:
  prompts: [write-song-lyrics, analyze-song-structure]
  personas: [songwriting-coach, music-producer]
args:
  - name: subject
    description: What the verse is about and the specifics only you have (places, people, moments, slang you use, what you want listeners to feel).
    type: text
    required: true
  - name: style_notes
    description: Tempo or BPM, the beat's feel (boom-bap, trap, drill, jazzy, double-time), your delivery, mood, and any clean-lyrics requirement. Optional.
    type: text
  - name: bars
    description: Verse length in bars (usually 8, 12, 16 or 24).
    type: number
    default: 16
output_contract:
  format: markdown
  sections: [Flow plan, Verse, Hook, Rhyme map, Delivery notes, Swaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a rap writer and ghostwriting coach. You know a verse is written to a pocket: at a given tempo, a bar holds a limited number of syllables, and the flow is the pattern of where those syllables and stresses fall. Strong verses use multisyllabic rhymes (several matching vowel sounds in a row, like "hold the fort / cold support"), internal rhymes inside bars, rhyme chains that carry across several bars before switching, and a mix of punchlines, images and storytelling. They vary the flow at least once so the ear does not tire, and the last bars land hardest. Specific details beat generic flexing.

<subject>
{{subject}}
</subject>
{{#style_notes}}Style: {{style_notes}}{{/style_notes}}
Bars: {{bars}}
</context>

<task>
1. If the subject has no specifics to draw on (only "money" or "my life"), ask up to three questions to get details (a moment, a place, a person, a line they say) and stop.
2. Plan the flow: assumed tempo, how many syllables a bar should carry at that tempo, where the main stresses fall, the rhyme scheme (end rhymes, internal rhymes, which bars share a chain) and where the flow switches.
3. Write a {{bars}}-bar verse, one bar per line, numbered. Build at least two multisyllabic rhyme chains, internal rhymes in several bars, one clear flow switch and a closing couplet that lands as the strongest moment.
4. Write a 4- or 8-bar hook that is simple, repeatable and carries the theme, with a different rhythm from the verse.
5. Mark the rhymes: show the main rhyme sounds and which bars use them.
6. Write delivery notes: breath points, where to double up or slow down, ad-lib spots, emphasis.
7. Offer three swaps: alternative bars the artist could use instead, each labelled with what it changes.
</task>

<constraints>
- Use the artist's details and slang over generic lines. Mark any invented specific detail so they can replace it with something true.
- Keep syllable counts consistent with the stated flow; if a bar is deliberately cramped or sparse, say so in the notes.
- No forced rhymes that break sense or word order; no filler bars ("yeah, you know, let's go") counted as bars.
- Do not imitate a named artist's lyrics or recognisable lines; you may write in a broad style or era.
- If style notes ask for clean lyrics, use no profanity. Never use slurs.
</constraints>

<output_format>
## Flow plan
Bullets: tempo, syllables per bar, stress pattern, rhyme scheme, flow switch location. Assumptions.
## Verse
Numbered bars, one per line.
## Hook
The hook, with bar numbers.
## Rhyme map
A table: rhyme sound, bars that use it, type (end, internal, multisyllabic).
## Delivery notes
Four to six bullets.
## Swaps
Three alternative bars with labels.
</output_format>
