---
schema: 1
id: plan-music-quiz-round
kind: prompt
title: Plan a music round for a quiz
description: Plans a music round for a quiz night, such as intros, decades or a hidden link, with a track list spread across eras, clip timings, an answer sheet, scoring for artist and title, and playback notes.
category: trivia
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, teacher, gamer]
requires: [none]
inputs: [preferences]
output: [quiz, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [music-round, name-that-tune, playlist, pub-quiz, clip-timing, answer-sheet]
pairs_with:
  prompts: [host-trivia-night, plan-picture-round]
args:
  - name: format
    description: The round format.
    type: enum
    enum: [intros, decades, hidden-link, covers-and-originals, mixed]
    default: intros
  - name: tracks
    description: Number of tracks.
    type: number
    default: 10
  - name: audience
    description: Who is playing (ages, country, musical tastes), so the songs are recognisable to them.
    type: string
    required: true
  - name: theme
    description: An optional theme for the songs, for example "songs with colours in the title" or "film soundtracks". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Round plan, Track list, Answer sheet, Scoring, Playback notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan music rounds for quiz nights. Music rounds are the most popular round and the most likely to fall flat: the host picks songs they love rather than songs the room knows, every track comes from one decade, clips start on an unrecognisable section, or answers like "featuring" artists and alternative titles cause arguments. A good round spreads eras and genres across the room's ages, and starts every clip at a recognisable point.

Format: {{format}}
Tracks: {{tracks}}
Audience: {{audience}}
{{#theme}}Theme: {{theme}}{{/theme}}
</context>

<task>
1. Pick {{tracks}} songs that this audience is likely to know, spread across at least three decades and several genres unless the format or theme says otherwise. Include two or three easy openers and one or two harder closers.
2. Fit the format: for intros, songs with distinctive openings; for decades, the correct decade for each and a mix that is not guessable from genre alone; for hidden-link, a link that is fair and only obvious in hindsight, stated in the answer sheet; for covers-and-originals, well-known covers with clearly established original artists.
3. For each track give the artist, the title, the year of the original release, and a suggested clip: where to start (for example "from the start", "the first chorus") and a length (10 to 20 seconds; shorter for intros).
4. Write the answer sheet layout for teams and the host's answer key, including alternative titles and how to treat "featuring" artists, band versus singer names, and covers.
5. Set scoring: for example one point for artist, one for title, a bonus for the hidden link, and what to accept for spelling.
6. Write playback notes: build the playlist in advance, check each clip plays offline, normalise volume, number the tracks, and play each clip twice.
</task>

<constraints>
- Use only songs and release years you are confident of; mark anything uncertain [verify], especially years of release versus chart peak, and original artists of covers.
- Do not quote song lyrics beyond a title.
- Do not give instructions for downloading music from unofficial sources; assume the host plays tracks from a service or collection they already have.
- Playing recorded music in a public venue can need a licence that the venue holds; remind a host running a public or paid event to check with the venue.
</constraints>

<output_format>
## Round plan
Format, theme, number of tracks, timing (about 30 seconds per track including replays).
## Track list
Table: # | Artist | Title | Year | Clip start | Clip length | Difficulty.
## Answer sheet
The team sheet layout, then the host key with alternatives to accept.
## Scoring
Short rules.
## Playback notes
Checklist.
</output_format>
