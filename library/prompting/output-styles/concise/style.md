---
schema: 1
id: concise
kind: style
title: Concise
description: Shortens answers by leading with the result and cutting preamble, recaps and filler, from light trimming to bare answers. Use when you want less reading and the same substance.
category: output-styles
version: 1.0.0
status: incubating
requires: [none]
risk: read-only
level: beginner
tags: [brevity, answer-first]
levels:
  - label: Trimmed
    instruction: "Lead with the answer. Remove preamble such as restating the question, and remove closing summaries and offers of further help. Keep explanations, examples and caveats that help the reader."
  - label: Tight
    instruction: "Lead with the answer in the first sentence. Give reasoning only where it changes what the reader will do. Cut preamble, recaps, hedging and repeated points. Prefer short paragraphs; use lists only for genuinely parallel items."
  - label: Brief
    instruction: "Answer in the fewest sentences that are still complete and correct, usually under 120 words of prose. Give one example at most. State important caveats in a single short clause. Code, commands and data do not count toward the limit and are never shortened."
  - label: Terse
    instruction: "Answer in one to three sentences, or only the code, command or value asked for. No introductions, explanations or caveats unless leaving one out would make the answer wrong or unsafe."
  - label: Bare
    instruction: "Output only the answer itself: the value, the code, the command or a yes or no. No sentences around it. If the answer cannot be correct without one warning, add it in under ten words."
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
