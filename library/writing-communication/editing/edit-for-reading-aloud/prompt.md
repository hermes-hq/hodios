---
schema: 1
id: edit-for-reading-aloud
kind: prompt
title: Edit a text for reading aloud
description: Edits a text written for the page so it works when heard, such as an announcement, a report summary read at a meeting or a voiceover, with shorter sentences, spoken numbers and no tangles.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, manager, teacher, individual]
requires: [none]
inputs: [text]
output: [rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [writing-for-the-ear, spoken-word, announcements, voiceover, listenability]
pairs_with:
  prompts: [simplify-to-plain-language, tighten-prose, rewrite-for-tone]
  personas: [editor]
args:
  - name: text
    description: The text that will be read aloud.
    type: text
    required: true
  - name: setting
    description: Who reads it, to whom and how, for example "read by me at the start of a staff meeting" or "recorded voiceover for a museum audio guide". Optional.
    type: text
  - name: target_seconds
    description: Time limit in seconds, if there is one. Optional.
    type: number
output_contract:
  format: markdown
  sections: [Read-aloud version, Timing, What changed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You edit written text so it works for listeners. A listener cannot re-read, see headings, skim a table or look at brackets and footnotes. What reads well on paper often fails aloud: long sentences with the verb at the end, nested clauses, parentheses, lists of more than three items, abbreviations, exact figures with decimals, URLs, and visual references ("see below", "as shown in the table"). Text for the ear puts the subject and verb early, one idea per sentence, repeats key points, signposts structure ("three changes; the first..."), rounds numbers where precision is not needed and says them as they are spoken, and avoids words that are hard to say together or easy to mishear. Speakers read at about 130 to 160 words per minute; a target time sets the word budget.

<text>
{{text}}
</text>

{{#setting}}Setting: {{setting}}{{/setting}}
{{#target_seconds}}Time limit: {{target_seconds}} seconds{{/target_seconds}}
</context>

<task>
1. Identify the core message and the facts that must survive: names, dates, amounts, deadlines, actions listeners must take.
2. Rewrite for the ear: short sentences with the main point first, subject and verb early, parentheses and footnotes turned into separate sentences or dropped if non-essential, lists of more than three items grouped, and visual references removed.
3. Write numbers, dates, abbreviations and symbols as they should be said (for example "about two and a half million" instead of "2,487,300" when precision is not needed, "the twelfth of March" or "March twelfth" to suit the reader's variety). Keep exact figures where precision matters, such as amounts owed or deadlines.
4. Add signposting and, for actions, repeat the key instruction at the end.
5. Replace any URL or long reference with something sayable and mark it [give link in writing].
6. Estimate the reading time at 140 words per minute. If a time limit is given and the text is over it, cut lower-priority content and say what was cut.
7. Mark pronunciation for unusual names or terms in square brackets if the text contains them.
</task>

<constraints>
- Keep every fact, obligation, date and amount that listeners need; do not add new information.
- Keep the author's tone and register.
- Do not round numbers where the exact figure matters to the listener.
</constraints>

<output_format>
## Read-aloud version
The edited text, with paragraph breaks where the reader should pause.

## Timing
Word count and estimated time{{#target_seconds}} against {{target_seconds}} seconds{{/target_seconds}}.

## What changed
Bullets with the main changes and anything cut.
</output_format>
