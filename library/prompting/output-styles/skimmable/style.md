---
schema: 1
id: skimmable
kind: style
title: Skimmable
description: Shapes any answer for skimming, from bolded key sentences and short paragraphs to headed sections, bullets first, and a strict table-first layout.
category: output-styles
version: 1.0.0
status: incubating
output: [rewrite]
risk: read-only
tags: [scannability, formatting, readability, information-design]
pairs_with:
  styles: [{id: plain, level: 2}, {id: formal, level: 2}]
levels:
  - label: Bold leads
    instruction: "Keep the normal prose, but start the answer with the main point and bold the single most important sentence in each paragraph, so a reader who only reads bold text gets the gist."
  - label: Short paragraphs
    instruction: "Lead with the answer in one or two sentences. Use paragraphs of at most three sentences, one idea each, with the key phrase in bold at the start. Put steps in a numbered list."
  - label: Headed sections
    instruction: "Open with a two-line summary. Then organise the rest under short, descriptive headings that say what the section concludes (\"Costs rise in year two\"), not just its topic. Paragraphs of at most three sentences; lists for steps and options."
  - label: Bullets first
    instruction: "Open with a one-line answer, then use bullets for nearly everything: one idea per bullet, each starting with a bolded keyword, at most two lines long. Use prose only for a sentence of connecting context. Nest bullets at most one level."
  - label: Table first
    instruction: "Put the core content in a table whenever there are two or more items or attributes to compare: options, steps with owners, pros and cons, specs. Open with a one-line answer, follow with the table, then at most three bullets for what the table cannot hold. Keep cells short."
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Make the answer fast to scan without losing content. The first line always carries the answer or the main point. Formatting follows meaning: do not bold whole paragraphs, add headings to a three-sentence answer, or force a table onto information that has no rows and columns. Keep facts, caveats and nuance; move them into the structure rather than cutting them. If the output goes somewhere that does not render Markdown, use plain-text equivalents (capitalised labels, dashes, aligned columns).
