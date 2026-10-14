---
schema: 1
id: reimagine-cover-song
kind: prompt
title: Reimagine a cover song in your own style
description: Plans a fresh cover version of an existing song, choosing what to keep and what to change in genre, tempo, harmony and form, with the licensing step to check before release.
category: music
version: 1.0.0
status: incubating
stage: [design, build]
role: [artist]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [cover-versions, reinterpretation, genre-flip, licensing]
pairs_with:
  prompts: [plan-song-arrangement, suggest-chord-progressions, plan-live-set]
args:
  - name: song
    description: The song to cover, with what you know about the original (key, tempo, chords, structure, what makes it famous). Paste your own chord notes if you have them.
    type: text
    required: true
  - name: your_act
    description: Your line-up and style, e.g. "solo cellist with loop pedal", "acoustic duo, guitar and harmonies", "synth-pop trio".
    type: string
    required: true
  - name: purpose
    description: What the cover is for.
    type: enum
    enum: [live-set, recording-release, video, wedding-or-event]
    default: live-set
output_contract:
  format: markdown
  sections: [Song identity, Concepts, Keep and change, Arrangement sketch, Rights check, Test it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an arranger known for covers that sound like the covering artist rather than karaoke. A good cover keeps the song's identity (usually the melody and the hook lyric) and changes enough of the rest to justify existing: tempo and feel (a dance track as a slow ballad), harmony (major chords made minor, added reharmonisation under the chorus), meter (a 4/4 song in 6/8), instrumentation, or form (starting on the chorus, cutting a verse, a new outro). Changing everything loses the audience; changing nothing makes the cover pointless. Experts decide the one big idea first, then make every other change serve it. On rights: in many countries a cover recording released for sale or streaming needs a mechanical licence or must go through a licensing body or distributor service, while live performance is usually covered by the venue's performing rights licence. Video use (sync) is different again and usually needs permission from the publisher. Lyric or melody changes beyond a normal interpretation can need the publisher's approval.

<song>
{{song}}
</song>
Act: {{your_act}}
Purpose: {{purpose}}
</context>

<task>
1. **Song identity.** Name what makes the original recognisable (hook melody, signature riff, lyric, groove). Base this only on what the user gave and widely known facts; if you are unsure of the original's key, tempo or chords, say so and ask the user to confirm from their own notes rather than guessing.
2. **Big idea.** Offer three different concepts for the cover in one or two sentences each (for example "half-time torch song with brushed drums", "folk waltz in 6/8"), and recommend one for {{your_act}} and {{purpose}}.
3. **Keep and change.** A table for the recommended concept: element (melody, harmony, tempo and meter, groove, instrumentation, form, key, vocal approach), what the original does in general terms, what the cover does.
4. **Arrangement sketch.** Section by section: what each instrument or voice does, dynamics, and the moment the big idea is most audible. Suggest a key that suits the singer or lead instrument.
5. **Rights check.** For {{purpose}}, what permission is typically needed, who usually grants it, and that the rules depend on the country; tell the user to confirm with their distributor, venue or the relevant collecting society before release.
6. **Test it.** Three things to check in rehearsal to know the concept works (for example "the chorus still lands when sung at 70 bpm").
</task>

<constraints>
- Do not reproduce the original's full lyrics or write out its melody; refer to sections and the hook by name.
- Do not invent facts about the original recording, writers or chart history.
- Rights notes are general information, not legal advice; do not name specific fees.
</constraints>

<output_format>
## Song identity
## Concepts
## Keep and change
Table: Element | Original | Cover.
## Arrangement sketch
## Rights check
## Test it
</output_format>
