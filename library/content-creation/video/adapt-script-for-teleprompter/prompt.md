---
schema: 1
id: adapt-script-for-teleprompter
kind: prompt
title: Adapt a script for teleprompter
description: Adapts a script for teleprompter reading with short lines, spoken phrasing, spelled-out numbers and cues for emphasis, pauses and looks. Use before recording a talking-head video or presentation.
category: video
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, marketer, executive]
inputs: [document, text]
output: [script, rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [teleprompter, autocue, script-formatting, delivery-cues, read-aloud]
pairs_with:
  prompts: [write-youtube-script, write-explainer-video-script]
args:
  - name: script
    description: The script as written, in any format.
    type: text
    required: true
  - name: reading_speed
    description: How fast the presenter reads. Slow is about 120 words per minute, normal about 150 and fast about 170.
    type: enum
    enum: [slow, normal, fast]
    default: normal
output_contract:
  format: markdown
  sections: [Prompter text, Changes made, Timing, Read-aloud warnings]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare scripts for teleprompter (autocue) reading. A script written for the page reads badly on a prompter: long sentences make presenters run out of breath, line breaks in the middle of a phrase cause stumbles, and symbols, numbers and abbreviations force the reader to translate on the fly, which shows in their eyes. A good prompter script has short lines that each hold one phrase, breaks at natural breath points, every number and symbol written as it is said, and a small set of plain-text cues that any prompter app displays. Bold, italics and colours often do not survive the import, so cues must be plain text.
</context>

<task>
<script>
{{script}}
</script>

Reading speed: {{reading_speed}} (slow about 120, normal about 150, fast about 170 words per minute).

1. Rewrite for the ear without changing meaning, facts or the speaker's voice:
   - Split sentences longer than about 20 words; turn parentheses, semicolons and nested clauses into separate sentences.
   - Swap written-only phrasing for spoken phrasing ("the former" becomes the noun; "i.e." becomes "that is").
   - Write numbers, dates, currency, percentages, units, URLs and symbols as spoken ("1.5M USD" becomes "one point five million dollars"; "example.com/start" becomes "example dot com slash start").
   - Write acronyms the way they are said: letters with hyphens when spelled out ("A-P-I"), as a word when pronounced as one ("NASA").
   - Add a phonetic hint in brackets after names or terms that are easy to mispronounce, the first time they appear.
2. Break into prompter lines of about 4 to 7 words (30 to 40 characters), each a complete phrase. Never split a name, a number or a phrase like "in the end" across lines. Put a blank line between paragraphs or thoughts.
3. Add plain-text cues sparingly:
   - `//` for a breath or short pause, `[PAUSE]` for a deliberate beat.
   - UPPER CASE for at most one stressed word in a sentence, and only where stress changes meaning.
   - `[LOOK: camera 2]`, `[SMILE]`, `[SLOW]` or `[B-ROLL]` only where the script implies them.
4. Estimate the running time at the chosen reading speed and compare it with the original.
5. List tongue-twisters, awkward sound runs and lines that are hard to say naturally, with a suggested alternative for each. Apply an alternative only if it keeps the meaning exactly; otherwise leave the line and flag it.
</task>

<constraints>
- Preserve every claim, number and name. If the original is ambiguous ("1/2" could be a date or a fraction), keep the original in brackets and flag it.
- Do not add jokes, new content or calls to action.
- Keep cues to at most one per line on average; a prompter cluttered with marks is harder to read than none.
- If the script contains stage directions or speaker labels, keep them on their own lines in brackets.
- Output plain text inside the prompter block, with no Markdown styling.
</constraints>

<output_format>
## Prompter text
A plain-text code block with the formatted script.

## Changes made
Bullets grouped by type (sentences split, numbers spelled out, wording changed), with examples.

## Timing
Spoken word count and estimated running time at {{reading_speed}} speed.

## Read-aloud warnings
Each hard line, why it is hard, and the alternative.
</output_format>
