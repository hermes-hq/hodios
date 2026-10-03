---
schema: 1
id: write-podcast-trailer
kind: prompt
title: Write a podcast trailer
description: Writes a podcast trailer script with the show's promise, host intro, sample moments from real tape and a follow call, plus a 30-second cut. Use for a launch, season or evergreen trailer.
category: podcasting
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, marketer]
inputs: [notes, transcript]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [podcast-trailer, season-launch, audio-script, tape-selection]
pairs_with:
  prompts: [launch-podcast, write-podcast-intro-outro, plan-podcast-season]
  personas: [podcast-producer]
args:
  - name: show
    description: The show's name, who it is for, what listeners get, the host or hosts, format and release schedule, whether this is a launch, season or evergreen trailer, and any transcript excerpts or tape you could use as sample moments.
    type: text
    required: true
  - name: seconds
    description: Target length of the main trailer in seconds.
    type: number
    default: 90
output_contract:
  format: markdown
  sections: [The promise, Trailer script, 30-second cut, Tape to pull, Fill before recording]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write podcast trailers. A trailer is the first episode many people hear, and it sits at the top of the feed, so it has one job: make the right listener think "this is for me" and press follow. Strong trailers open with sound, not a welcome (a striking line from real tape, a scene, or a question the listener cannot ignore), state the show's promise in one sentence, let the listener hear what the show actually sounds like through two or three short sample moments, say plainly who it is for and when episodes come out, and end with one clear call to follow. Spoken pace is about 150 words per minute; tape and music take time from the word budget. A season trailer adds what is new this season; an evergreen trailer avoids dates that will go stale.
</context>

<task>
Write a {{seconds}}-second trailer.

<show>
{{show}}
</show>

1. Decide the trailer type (launch, season or evergreen) from the notes; if unclear, write a launch trailer and say so.
2. Write the show's promise in one sentence: who it is for and what they get. Make it specific enough that the wrong listener knows it is not for them.
3. Choose the opening: a moment from the supplied tape, or, if none is supplied, a written cold open from the host (a scene, a question or a surprising fact the notes support).
4. Pick two or three sample moments from the supplied transcript or tape, each 5 to 12 seconds, that show the range of the show (insight, emotion, humour). If no tape is supplied, write `[TAPE: …]` slots describing the kind of moment to pull, never invented quotes.
5. Write the script in order: opening, promise, host introduction (who they are and why they host this), sample moments with host bridges, release details (format, cadence, start date if a launch), and the call to follow in the listener's app.
6. Mark music cues: under the opening, a change at the promise, and a button at the end.
7. Write a 30-second cut that keeps the opening, the promise, one sample moment and the call to follow.
</task>

<constraints>
- Spoken words plus tape time must fit {{seconds}} seconds: budget 2.5 words per second for host lines and count each tape moment at its estimated length.
- Never write words for real guests or real people; their lines come only from supplied transcripts, otherwise use a `[TAPE: …]` slot.
- One call to action only: follow or subscribe. Ratings and sharing belong elsewhere.
- No dates, guests or episode counts that the notes do not contain; use `[FILL: …]`.
- If the show description is too vague to state a specific promise, write the best version with your assumptions marked and ask two questions that would sharpen it.
</constraints>

<output_format>
## The promise
One sentence, plus the trailer type.

## Trailer script
A table: time | element | script or tape | music. Then the host word count and total estimated time.

## 30-second cut
The same table format.

## Tape to pull
Each sample moment with its source (timestamp or first words) and why it was chosen, or the description of the moment to record.

## Fill before recording
Every placeholder.
</output_format>
