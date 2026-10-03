---
schema: 1
id: write-fan-fiction-story
kind: prompt
title: Write a fan fiction story
description: Writes an original fan fiction story within a canon's world, true to the characters' established voices, with no copied passages and any divergence from canon stated up front.
category: fiction
version: 1.0.0
status: incubating
stage: [build]
role: [writer, individual]
requires: [none]
inputs: [topic, text]
output: [rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [fan-fiction, fanfic, canon-divergence, character-voice, short-fiction]
pairs_with:
  prompts: [write-short-story, develop-character, punch-up-dialogue]
  personas: [fiction-writing-mentor]
args:
  - name: canon
    description: The source work or series - book, film, show, game or comic - and which point in it the story is set (after a certain book or season, during a gap, an alternate universe).
    type: string
    required: true
  - name: premise
    description: What happens in your story - the characters involved, the situation, the relationship or question it explores, any pairing, and anything to include or avoid.
    type: text
    required: true
  - name: words
    description: Target length of the story in words.
    type: number
    default: 2000
  - name: rating
    description: general (suitable for all ages) or teen (mild language, non-graphic violence and romance, darker themes handled with care).
    type: enum
    enum: [general, teen]
    default: general
output_contract:
  format: markdown
  sections: [Story notes, Story, Canon check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write fan fiction that fans of a canon would recognise as true to its characters. Good fan fiction does something the canon did not: fills a gap, explores a minor character, asks "what if", follows a relationship further. It earns readers' trust by getting voices, relationships and world rules right, and by flagging up front where it diverges. It respects the source by being original writing: it does not reproduce passages, scenes or dialogue from the canon.

Canon: {{canon}}.
<premise>
{{premise}}
</premise>
Length: about {{words}} words. Rating: {{rating}}.
</context>

<task>
1. Check what you know. If you do not know the canon well enough to write its characters faithfully, say so, ask the user for short character notes (voice, relationships, where they are in the story) and stop. If the premise involves real people (actors, musicians, streamers), decline that part and offer to write about fictional characters instead.
2. Story notes: one or two lines each on where in the canon this is set, what is canon-compliant and what diverges, and the main characters' state of mind at that point.
3. Write the story at about {{words}} words. Open inside a scene; keep each character's established voice (vocabulary, humour, what they would never say); obey the world's rules (magic, technology, geography) unless the divergence changes them; give the story its own arc with a turn and an ending.
4. Keep to the {{rating}} rating: general has no sexual content, mild peril only and no strong language; teen allows non-graphic violence, mild language and romance that stops at kissing, and handles darker themes with care.
5. Canon check: list the canon facts relied on and any you were unsure of, so the user can verify them.
6. Check before output: no sentence or line of dialogue is copied from the canon; characters act consistently with who they are at that point, or the divergence explains why not; the story reaches its own ending.
</task>

<constraints>
- No reproduced text from the source: no quoted passages, song lyrics, or recreated scenes line by line. Short references to famous events or catchphrases are fine.
- No sexual content at any rating, and no sexualisation of characters who are minors in canon.
- No real-person fiction.
- Do not present the story as official or by the original creator.
</constraints>

<output_format>
## Story notes
Setting in canon, divergence, characters' state.

## Story
A title, then the story.

## Canon check
Bullets of canon facts relied on, marking any you were unsure of.
</output_format>
