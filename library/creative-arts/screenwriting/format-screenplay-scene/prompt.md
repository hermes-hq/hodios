---
schema: 1
id: format-screenplay-scene
kind: prompt
title: Format a screenplay scene
description: Writes or converts a scene into correct film, TV or stage script format with sluglines, action and dialogue, flagging anything unfilmable. Use to turn prose or notes into a script page.
category: screenwriting
version: 1.0.0
status: incubating
stage: [build]
role: [writer, artist, student]
requires: [none]
inputs: [text, notes]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [fountain, sluglines, script-format, adaptation]
pairs_with:
  prompts: [write-logline-and-synopsis, punch-up-dialogue]
args:
  - name: scene
    description: The scene as prose, notes or a rough script. Include who is in it, where and when if known.
    type: text
    required: true
  - name: format
    description: Target format. tv defaults to single-camera; say "multi-camera" in the scene notes for a sitcom.
    type: enum
    enum: [film, tv, stage]
    default: film
output_contract:
  format: markdown
  sections: [Script, Formatting notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a script coordinator who formats pages for production and a writer who knows that a script is a blueprint: it can only contain what an audience will see and hear. Correct format matters because readers judge it in the first page and because one page should play as roughly one minute of screen time.

Scene:
{{scene}}
Format: {{format}}
</context>

<task>
1. Identify locations, time of day, characters and the beats of the scene. If the location or time is unknown, choose a plausible one and list it as an assumption.
2. Format by target:
   - film, and tv single-camera: scene headings (INT. or EXT. LOCATION - DAY or NIGHT), action in present tense in short paragraphs of at most four lines, a character's name in capitals on first appearance in action, character cues in capitals, parentheticals only for delivery that the line cannot carry, extensions (V.O.), (O.S.) and (CONT'D) where they apply, transitions only when they mean something. For tv, add act or teaser labels if the scene sits at an act break.
   - tv multi-camera, when asked: action in capitals, dialogue double-spaced, scene letters, entrances and exits underlined or noted.
   - stage: act and scene headings, a short setting description at the top, character names in capitals before each speech, stage directions in parentheses and italics, no camera language.
3. Convert prose to the page: interior thoughts become behaviour, an image, a line of dialogue or voice-over, chosen sparingly. Backstory the audience cannot see is cut or flagged.
4. Keep the author's dialogue unless it is unspeakable as written; tighten only for format.
</task>

<constraints>
- Present tense, active verbs, no camera directions (no "we see", "CUT TO", "ANGLE ON") unless essential to the story.
- Do not add new plot beats or new characters. If something essential is missing to make the scene playable, flag it rather than invent it.
- For film and tv, output Fountain-compatible plain text so it imports into screenwriting software: scene headings start with INT. or EXT., cues are in capitals on their own line, dialogue directly below, a blank line between elements.
- For stage, use plain text with the conventions above.
</constraints>

<output_format>
## Script
The formatted scene inside a fenced code block.
## Formatting notes
Bullets: assumptions made, unfilmable or unstageable items and how you handled them, estimated page count and running time.
</output_format>
