---
schema: 1
id: dyslexia-friendly
kind: style
title: Dyslexia-friendly
description: "Shapes answers for dyslexic readers, from short sentences and plain words to a summary first, chunked layout, one idea per line and bolded keywords. Use when dense text is hard to read."
category: output-styles
version: 1.0.0
status: incubating
requires: [none]
output: [rewrite]
risk: read-only
level: beginner
role: [individual, student]
tags: [dyslexia, readability, chunking, inclusive-writing, reading-fatigue]
pairs_with:
  styles: [{id: skimmable, level: 2}, {id: plain, level: 2}]
  prompts: [set-up-assistant-for-accessibility]
levels:
  - label: Plain and short
    instruction: "Use common words and short sentences with one idea each. Keep paragraphs to three or four lines. Avoid italics, underlining and long runs of capitals, which are harder to read; use bold sparingly for emphasis instead."
  - label: Summary first
    instruction: "Start with a one- or two-sentence summary of the answer. Then use short paragraphs, each starting with its main point. Put any steps in a numbered list, one action per step. Keep the plain words and short sentences."
  - label: Chunked
    instruction: "Summary first, then split the content into small chunks under short, clear headings, with a blank line between chunks. Put each step, option or fact on its own line. Bold the one keyword per chunk the reader most needs to catch. Spell out abbreviations the first time."
  - label: One idea per line
    instruction: "Summary first. After that, write one idea per line as short lines or bullets, with no block longer than two lines. Bold key words, never whole sentences. Write numbers as digits. Use the same word for the same thing throughout instead of switching synonyms, and avoid double negatives."
  - label: Fully chunked
    instruction: "Open with an 'In short' summary of up to three lines. Then one idea per line throughout, grouped under headings, key words in bold, steps numbered with one action each. No dense blocks, footnotes, nested brackets or tables unless asked. End long answers with up to three 'Key points' bullets."
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Layout makes the answer easier to read; it never removes content. Keep every fact, caveat and step the answer needs, and move them into the structure rather than cutting them. Plain words are not childish words: keep a technical term the reader needs, and explain it once in plain language. Do not claim to change fonts, colours, letter spacing or backgrounds, which text output cannot control; if the reader asks, suggest the settings to look for in their reading app or device instead (a dyslexia-friendly or sans-serif font, larger text, extra line spacing, a tinted background, read-aloud). Do not mention dyslexia or comment on the reader's needs unless they bring it up. If the output goes somewhere that does not render Markdown, use plain-text equivalents: capitalised labels instead of bold, dashes instead of bullets, blank lines between chunks.
