---
schema: 1
id: prepare-audiobook-narration
kind: prompt
title: Prepare to narrate your own audiobook
description: Prepares a self-published author to narrate their own audiobook with a pronunciation guide, character voice notes, chapter timing, room setup and retailer specs to confirm.
category: podcasting
version: 1.0.0
status: incubating
stage: [plan, build]
role: [writer]
subject: [literature]
requires: [none]
inputs: [document, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [audiobook, narration, self-publishing, character-voices]
pairs_with:
  prompts: [write-tts-voiceover-script, choose-podcast-setup, create-podcast-edit-list]
args:
  - name: manuscript_excerpt
    description: A representative excerpt (a chapter or a few thousand words) with dialogue, names and any invented words, plus the total word count of the book if you know it.
    type: text
    required: true
  - name: characters
    description: "The main characters with age, background, personality and how they speak, e.g. 'Mara, 70s, retired sea captain, gruff, few words'."
    type: text
    required: true
  - name: chapters
    description: Number of chapters in the book, including prologue and epilogue.
    type: number
    required: true
output_contract:
  format: markdown
  sections: [Pronunciation guide, Character voice sheet, Marked-up excerpt, Chapter timing, Room and kit, Recording workflow, Specs to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Authors who narrate their own audiobooks know the text better than anyone, but narration is a performance and a technical job. Common problems: names pronounced differently in chapter 3 and chapter 19, character voices that drift or slide into caricature, reading too fast, a noisy room, inconsistent levels between sessions, and files rejected by the retailer for loudness or noise floor. Preparation fixes most of these before the first take: a pronunciation guide, a voice sheet for every speaking character, a marked-up script, a realistic schedule, a treated recording space and the retailer's technical requirements checked in advance.
</context>

<task>
Prepare the author to narrate a {{chapters}}-chapter audiobook.

<manuscript_excerpt>
{{manuscript_excerpt}}
</manuscript_excerpt>

<characters>
{{characters}}
</characters>

1. If the excerpt has no dialogue or names to work from, or the characters are not described, ask for a fuller excerpt or descriptions in one message and stop.
2. **Pronunciation guide.** Every name, place, invented word, foreign phrase and unusual term in the excerpt, with a plain respelling (stressed syllable in capitals) and a note on how the author intends it; mark any you are guessing as "author to confirm". Leave space to add terms from other chapters.
3. **Character voice sheet.** For each character, a voice that can be held for hours without strain: pitch relative to the narrator's natural voice (slightly higher, lower), pace, energy, texture (breathy, clipped, warm), a few signature speech habits taken from the text, and an emotional range. Recommend restraint: small shifts in pitch, pace and attitude rather than heavy accents, and no accents that mock a group. Note pairs of characters who talk together often and how to keep them distinct.
4. **Marked-up excerpt.** Return a short passage (a page or so) marked for performance: [pause] at scene changes, slashes for breath points in long sentences, underlined or *starred* stress words, and character tags before dialogue lines where attribution is unclear.
5. **Chapter timing.** Estimate finished audio at about 9,000 to 9,500 words per hour (roughly 150 to 160 words per minute). If the total word count is known, give the finished length, the average per chapter, and the studio time (raw recording often takes two to three times the finished length, and editing more). If not, show the formula and ask for the word count.
6. **Room and kit.** A quiet, small, soft space (a closet of clothes or blankets around the mic works), away from fridges, traffic and air conditioning; a decent microphone at a consistent distance with a pop filter; headphones; a stand or holder for the text (tablet on silent mode to avoid page noise); water at room temperature. Record room tone.
7. **Recording workflow.** Warm up the voice; record one chapter per file; keep the same mic position, gain and time of day across sessions; use punch-and-roll or mark retakes with a clap or verbal slate; keep a pickup list of errors to fix; do opening and closing credits and a retail sample as separate files; listen back to the first chapter fully before recording the rest.
8. **Specs to confirm.** List the technical specifications retailers commonly require (file format and bitrate, sample rate, mono or stereo, loudness range, peak level, noise floor, room tone at head and tail, one chapter per file, maximum file length), give typical values as examples only, and tell the author to check the exact current requirements of each retailer or distributor before recording, because they differ and change.
9. Before answering, check that every name in the excerpt appears in the pronunciation guide and every listed character has a voice entry.
</task>

<constraints>
- Do not rewrite the author's text; mark it up only.
- Do not suggest a synthetic clone of the author's or anyone else's voice unless the author explicitly asks about it for their own voice, and then mention consent and retailer rules on synthetic narration.
- No retailer, tool or version names; refer to "your retailer or distributor".
</constraints>

<output_format>
## Pronunciation guide
Table: Word | Say it as | Notes.
## Character voice sheet
Table: Character | Pitch | Pace | Texture | Habits | Range.
## Marked-up excerpt
## Chapter timing
## Room and kit
Checklist.
## Recording workflow
Numbered steps.
## Specs to confirm
Table: Spec | Typical example | Confirm with retailer.
</output_format>
