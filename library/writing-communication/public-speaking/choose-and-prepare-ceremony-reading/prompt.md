---
schema: 1
id: choose-and-prepare-ceremony-reading
kind: prompt
title: Choose and prepare a ceremony reading
description: Helps you choose a reading for a wedding, funeral or naming ceremony that fits the people and the setting, then prepares you to read it aloud with markup, pacing and a short practice plan.
category: public-speaking
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [script, plan]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [ceremony-reading, wedding-reading, funeral-reading, reading-aloud, naming-ceremony]
pairs_with:
  prompts: [mark-up-script-for-delivery, write-funeral-order-of-service, warm-up-voice-before-speaking]
args:
  - name: ceremony
    description: The ceremony and its setting, for example "civil wedding in a register office", "Catholic funeral Mass", "humanist naming ceremony", "outdoor wedding, no microphone".
    type: string
    required: true
  - name: about
    description: "Who it is for (the couple, the person who died, the baby), what they were like or love, whether the couple or family asked for something specific, how long the slot is, and your own comfort reading aloud."
    type: text
    required: true
  - name: reading_text
    description: Optional. The text of a reading you have already chosen or been given, so it can be marked up for delivery.
    type: text
output_contract:
  format: markdown
  sections: [Options, Marked-up reading, Introduction line, Practice plan, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Being asked to read at a wedding or funeral is common, and most people who do it are not used to reading aloud. Two separate jobs are involved. First, choosing: the reading should suit the people, the tone of the day and the rules of the venue. Civil ceremonies in some countries do not allow religious content; many churches expect scripture, or approve non-scripture readings only with the officiant's agreement; humanist ceremonies use poetry, prose and lyrics. A reading the couple or family chose always wins, and so does length: one to three minutes is typical. Second, reading it: nervous readers rush, drop their voice at line ends, read poetry with a sing-song beat at every line break instead of following the sentences, and look up at the wrong moments. Good readers find where each sentence actually ends, slow down to about two thirds of their normal pace, take a breath at punctuation not at line breaks, and look up only at the end of a sentence. Printing it large, with marks, and practising aloud several times is what makes the difference. Many modern poems and song lyrics are under copyright; reading aloud at a private ceremony is generally fine, but printing them in an order of service or streaming may need permission depending on the country.
</context>

<task>
Ceremony: {{ceremony}}.
<about>
{{about}}
</about>
{{#reading_text}}
<reading_text>
{{reading_text}}
</reading_text>
{{/reading_text}}

1. If no reading text is supplied, suggest four to six options that fit the ceremony type, the person and the tone, each with author, source, approximate reading time, why it fits and any venue caution (religious or not). Only suggest works you are confident exist and are correctly attributed; do not quote long passages of copyrighted works, and tell the user to get the exact text from a reliable copy. Ask which they choose and stop.
2. When reading_text is supplied, check its length against the slot, and note if it is likely to need the officiant's approval at this venue.
3. Mark up the reading: `/` for a short pause, `//` for a full stop pause, **bold** for words to stress (sparingly), [breathe] at natural points, [look up] at no more than three sentence ends, and a note where line breaks should be read through without stopping.
4. Write a one-line introduction if the ceremony expects the reader to give the title and author.
5. Give a practice plan: read aloud slowly five times over the days before, once standing with the printed copy, once in the venue or a similar room if possible, and one quiet run on the day.
6. List practical checks: microphone or not, where to stand, who has the printed copy, font size, and what to do if emotion takes over (pause, breathe, continue; the room waits).
</task>

<constraints>
- Never invent or misattribute a reading; if unsure who wrote a well-known piece, say so.
- Do not reproduce the full text of copyrighted modern works in Options; give title, author and source. Mark up only text the user supplied.
- Do not choose scripture or prayers for a religious service on the officiant's behalf; offer options and say they need the officiant's approval.
- Keep markup light enough to read at a glance.
</constraints>

<output_format>
## Options
Table: Reading | Author and source | Length | Why it fits | Caution. Or "Using the reading supplied".
## Marked-up reading
The supplied text with marks, or "Waiting for your choice".
## Introduction line
One line, or "Not needed".
## Practice plan
Short numbered plan.
## Checks
Practical checklist for the day.
</output_format>
