---
schema: 1
id: write-music-brief-for-composer
kind: prompt
title: Write a music brief for a composer
description: Writes a brief for a composer or a music-library search with purpose, mood references described in words, length, sync points, deliverables, usage rights and budget.
category: music
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, game-developer]
requires: [none]
inputs: [text, notes]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [music-brief, sync-points, music-licensing, commissioning]
pairs_with:
  prompts: [write-background-music-cues, build-music-sound-kit]
args:
  - name: project
    description: "The project in a sentence or two: what it is, who it is for, and its tone, e.g. 'a 12-minute documentary about a village bakery for a regional TV slot'."
    type: string
    required: true
  - name: uses
    description: "Where the music plays and for how long: scenes with timecodes, menu loops, an ad and its cut-downs, a podcast theme."
    type: text
    required: true
  - name: rights
    description: "The media the music will be used in: web (online video and social), broadcast (TV and radio), game (in a game and its trailers), all-media."
    type: enum
    enum: [web, broadcast, game, all-media]
    default: web
  - name: budget
    description: "Your budget and currency, or a range. Write 'unknown' to get a note on what to decide."
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Brief, Cue list, Deliverables, Rights and terms, Library search version, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most bad commissioned music comes from bad briefs. "Make it emotional but not too much, like that famous film" leaves the composer guessing; temp tracks lead to imitation and "temp love"; missing sync points mean rewrites; and unclear rights lead to disputes when the client later wants to use the music somewhere else. A good brief explains what the music must do for the story or product, describes the sound in words (with references as examples of a quality, not templates to copy), lists every cue with exact timings and hit points, names the deliverables, and states the rights, deadlines and budget plainly so the composer can quote honestly. The same brief, condensed into keywords, works for searching a production music library.
</context>

<task>
Write a music brief for "{{project}}". Rights needed: {{rights}}. Budget: {{budget}}.

<uses>
{{uses}}
</uses>

1. If the uses give no lengths or no idea of where the music sits, ask in one message for timings and placements and stop.
2. **Brief.** In plain language:
   - purpose: what the music must do (carry emotion, set pace, brand recognition, sit under dialogue);
   - story or product context and audience;
   - mood and sound described in words: tempo feel, instrumentation, energy arc, era, what it must not sound like;
   - references: if the user names any tracks or artists, describe the specific quality wanted from each (the pulse, the sparse piano, the build) and add a line that the composer should not imitate them;
   - how it will be mixed (under dialogue, featured, looped).
3. **Cue list.** A table with cue number, name, in and out timecode or length, placement, function, sync points (hits with timecodes), mood, and whether it plays under speech.
4. **Deliverables.** Full mix, instrumental or no-melody version where useful, stems (for example drums, bass, harmony, melody), cut-downs (for ads: 60, 30, 15, 6 seconds), loop versions with clean loop points for games, file format and sample rate to confirm, and a cue sheet for performing-rights reporting if the work will be broadcast.
5. **Rights and terms.** For {{rights}}: the media, territory, term (period of use), exclusivity, whether the client gets a licence or buys out the rights, who owns the master and the composition, credit wording, and how many revision rounds are included. Mark this section as points to agree in a written contract, not legal advice, and suggest legal review for broadcast, game or all-media deals.
6. **Budget and timeline.** State the budget as given and what it is meant to cover (composition, recording live players, revisions, rights). If the budget is "unknown", list the factors that drive cost and suggest deciding a range before approaching composers. Add milestones: brief, first sketch, feedback, final delivery, with dates if the user gave a deadline.
7. **Library search version.** A short keyword block (genre, mood, tempo, instruments, energy, length, vocal or instrumental) and the licence type to filter for in a production music library.
8. Before answering, check that every use from the input appears in the cue list, that timings are consistent, and that no reference is phrased as "copy this".
</task>

<constraints>
- Do not ask the composer to replicate an existing track. Describe qualities.
- Do not state what rights cost or what the law requires in a given country; flag these to confirm.
- No tool, model or version names.
</constraints>

<output_format>
## Brief
## Cue list
Table: # | Name | In / out or length | Placement | Function | Sync points | Mood | Under speech.
## Deliverables
Checklist.
## Rights and terms
## Library search version
Code block.
## Open questions
Anything the composer will need that the user has not decided.
</output_format>
