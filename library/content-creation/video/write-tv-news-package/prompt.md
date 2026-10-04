---
schema: 1
id: write-tv-news-package
kind: prompt
title: Write a news video package
description: Writes a local TV news package in two-column style, with anchor intro, voice-over to named b-roll, timed sound bites, a stand-up and a tag, plus a vertical social cut.
category: video
version: 1.0.0
status: incubating
stage: [build]
role: [writer, editor, student]
requires: [none]
inputs: [notes, transcript]
output: [script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [broadcast-news, two-column-script, sound-bites, b-roll, stand-up, attribution]
pairs_with:
  prompts: [write-news-story, write-short-form-script]
args:
  - name: reporting_notes
    description: Your reporting - what happened, facts with their sources, who you interviewed with name and role, and the b-roll you shot.
    type: text
    required: true
  - name: tape_log
    description: Optional. Logged sound bites with timecode in, timecode out and exact words, for example "02:14-02:22 Ana Ruiz, nurse - 'We had ten minutes to move everyone.'"
    type: text
  - name: length_seconds
    description: Target package length in seconds, not counting the anchor intro and tag.
    type: number
    default: 90
output_contract:
  format: markdown
  sections: [Anchor intro, Package script, Tag, Social cut, Fact and rights check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a producer on a local newscast. A package tells the story in pictures first: the voice-over is written to the b-roll, sound bites carry emotion and expertise rather than facts the reporter can state, and every fact is attributed. Weak packages have an anchor intro that repeats the reporter's first line, voice-over that ignores the pictures, long bites that state numbers, a stand-up for vanity rather than for a moment that cannot be shown, and no clear "what happens next". Broadcast copy is read aloud: short sentences, active verbs, present tense where accurate, numbers rounded and spoken plainly, at about three words per second.

Package length: about {{length_seconds}} seconds.
</context>

<task>
<reporting_notes>
{{reporting_notes}}
</reporting_notes>
{{#tape_log}}
<tape_log>
{{tape_log}}
</tape_log>
{{/tape_log}}

1. Choose the focus: the single newest, most local fact, and a character whose bite or scene can open the package.
2. Anchor intro (10-20 seconds): the news in one or two sentences, a throw to the reporter. Do not repeat the package's first line.
3. Package in two columns. Left: VIDEO (named b-roll shots, lower-third supers with name and role, graphics). Right: AUDIO (VO lines, SOT with exact in-words, out-words and duration, NAT sound breaks). Structure: natural-sound open or a strong bite, VO with the main fact and attribution, 2-3 bites of 5-12 seconds each, a stand-up placed where there is no picture (a bridge, a number, a place you are standing), the reaction or response, and the next step. Close with the reporter sign-off.
4. Time it: VO at about 3 words per second, bites at their logged durations. Show running time per row and a total within 5 seconds of target.
5. Tag (5-10 seconds): what happens next or where viewers can find more, read by the anchor.
6. Social cut: 30-45 seconds, vertical 9:16, burned-in captions, the strongest visual or bite in the first 2 seconds, and on-screen text carrying the key facts so it works muted.
</task>

<constraints>
- Use only the reporting notes and tape log. Quote bites word for word; if no tape log is given, mark bites as [SOT: paraphrase from notes - pull exact words] and do not put words in quotation marks.
- Attribute every figure and claim; never state an allegation as fact. Anyone criticised needs a response or a line saying they were asked; flag if the notes do not show they were.
- Do not name minors, victims of crimes or private people not central to the story unless the notes say it is cleared.
- No invented b-roll: list only shots in the notes; mark needed shots as [SHOOT].
- If the core facts (what, where, when, sources) are missing, ask for them and stop.
</constraints>

<output_format>
## Anchor intro
The read, with its time.

## Package script
Table: running time | VIDEO | AUDIO. Total at the bottom.

## Tag
The anchor read.

## Social cut
Table: seconds | visual | on-screen text | audio.

## Fact and rights check
Bullets: each fact and its source, bites to verify, response gaps, people to blur or not name, and third-party footage or music used.
</output_format>
