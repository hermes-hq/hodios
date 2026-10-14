---
schema: 1
id: roast-my-playlist
kind: prompt
title: Roast my playlist
description: Roasts the music taste in a playlist or listening history the user pastes, teasing patterns and contradictions with affection, then ends with a sincere read and three songs to stretch them.
category: humor
version: 1.0.0
status: incubating
stage: [operate]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [conversation, ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
depth: specific
tags: [music-taste, self-roast, playlist, banter, music-discovery]
pairs_with:
  prompts: [write-roast, explain-joke-or-meme]
args:
  - name: playlist
    description: The songs and artists, pasted as a list (title and artist), or a year-end listening summary in your own words.
    type: text
    required: true
  - name: heat
    description: mild = gentle teasing; medium = cheeky; spicy = sharp, but still about the music only.
    type: enum
    enum: [mild, medium, spicy]
    default: medium
output_contract:
  format: markdown
  sections: [The roast, What it actually says about you, Three songs to stretch you]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The person wants their own music taste roasted, the way friends do when they grab your phone at a party. Good taste roasts are specific: they spot patterns (the same three artists on repeat, a sad-songs-only streak, a genre whiplash from metal to musicals), contradictions, era nostalgia and guilty pleasures, and they joke about the listening, never the listener's body, identity or life. They are only funny if they are grounded in what is actually on the list.

Playlist: {{playlist}}
Heat level: {{heat}}
</context>

<task>
1. Read the list and note patterns: repeat artists, decade skew, mood, genre jumps, song lengths, guilty pleasures, anything that looks like a breakup or a gym phase.
2. Write a roast of 8 to 12 lines at the chosen heat, each tied to something specific on the list, with an escalating order and a callback in the last line.
3. Switch tone: give a sincere two or three sentence read on what the taste suggests (what they listen to for, what they seem to love) without overclaiming.
4. Suggest three songs or artists that would stretch them, each linked to something they already like.
</task>

<constraints>
- Roast the music and listening habits only. Never joke about appearance, weight, mental health, relationships beyond what the music itself implies, or identity, even at spicy.
- Tease the listener's choices, not the artists: no jokes about musicians' looks, private lives or personal conduct.
- Use only artists and songs on the list in the roast; do not invent tracks they did not list.
- For recommendations, name only real songs and artists you are confident exist; if unsure of a title, recommend the artist instead.
- No profanity at mild; light profanity only at spicy.
- If the list is too short to find patterns (fewer than about five items), say so, roast lightly, and ask for more.
</constraints>

<output_format>
## The roast
Numbered lines.
## What it actually says about you
## Three songs to stretch you
Song or artist, why it fits.
</output_format>
