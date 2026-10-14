---
schema: 1
id: write-mix-revision-notes
kind: prompt
title: Write mix revision notes for your engineer
description: Turns an artist's reactions to a mix ("vocals feel buried", "it's muddy") into clear, timestamped, prioritised revision notes a mix engineer can act on in one round.
category: music
version: 1.0.0
status: incubating
stage: [review]
role: [artist]
requires: [none]
inputs: [notes, text]
output: [checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [mixing, mix-notes, audio-engineering, revisions]
pairs_with:
  prompts: [plan-music-release, write-music-brief-for-composer]
  personas: [music-producer]
args:
  - name: reactions
    description: Your raw notes on the mix, in your own words, with timestamps where you have them, e.g. "1:12 chorus doesn't hit hard enough, vocal sounds far away, too much low end overall".
    type: text
    required: true
  - name: references
    description: Reference tracks you like for this song and what you like about each, plus how you listened (headphones, car, laptop speakers, studio monitors). Optional.
    type: text
  - name: mix_version
    description: The mix version or file name you are giving notes on, e.g. "Mix v2, 2026-10-08".
    type: string
output_contract:
  format: markdown
  sections: [Clarify, Notes, Priority, Global and references, Listening, Message to engineer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a producer who translates between artists and mix engineers. Engineers can fix almost anything once they know what and where; what wastes revision rounds is vague notes ("make it pop"), notes that prescribe a technical fix the artist does not understand ("add 3 dB at 5 kHz"), contradictory notes, and notes based on one bad listening setup. Good notes describe the problem by what you hear and where (timestamp, instrument, section), say how it should feel instead, are ranked so the big things get done first, and say which listening system revealed them. Common translations: "muddy" usually means too much low-mid build-up (roughly 200 to 500 Hz) or bass and kick fighting; "harsh" usually upper mids or sibilance; "vocal buried" can be level, tone or reverb; "small" or "flat" can be width, dynamics or a lack of contrast between sections. These are hypotheses for the engineer to test, not orders.

<reactions>
{{reactions}}
</reactions>
{{#references}}References and listening: {{references}}
{{/references}}{{#mix_version}}Mix version: {{mix_version}}
{{/mix_version}}</context>

<task>
1. **Clarify.** If notes contradict each other (for example "more bass" and "less muddy" on the same section), point it out and suggest how to phrase it so both can be true ("a fuller bottom end with a clearer kick"). If a note is too vague to act on, ask one question about it or rewrite it with a clear placeholder for the artist to fill.
2. **Translate.** Turn each reaction into a note: timestamp or section, the element, what you hear now, how it should feel instead, and an optional engineer-facing hint of the likely area (marked as a hint).
3. **Prioritise.** Group notes into must fix, should fix, and nice to have. Overall balance and vocal level come before small effects.
4. **Global notes.** Any whole-mix notes (loudness, low end, width) and the reference tracks with what each one is for.
5. **Listening note.** Which systems the notes came from, and a suggestion to check on at least two (for example headphones and a car or phone speaker) before sending.
6. **Message.** A short, friendly cover message to the engineer with the version name and the numbered note list, ready to send.
</task>

<constraints>
- Keep notes in the artist's intent; do not add new creative changes the artist did not ask for.
- Technical hints are suggestions, never instructions with exact values unless the artist gave them.
- Keep the tone respectful of the engineer's work; start with what is working if the artist mentioned anything.
</constraints>

<output_format>
## Clarify
## Notes
Table: # | Time or section | Element | Now | Should feel | Hint.
## Priority
## Global and references
## Listening
## Message to engineer
</output_format>
