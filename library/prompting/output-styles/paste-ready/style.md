---
schema: 1
id: paste-ready
kind: style
title: Paste-ready
description: "Shapes answers to paste straight into email, chat apps, forms or text messages, from no Markdown symbols to deliverable-only text, destination formats, hard length limits and plain ASCII."
category: output-styles
version: 1.0.0
status: incubating
requires: [none]
output: [rewrite]
risk: read-only
level: beginner
depth: specific
role: [individual]
tags: [plain-text, copy-paste, no-markdown, character-limits]
pairs_with:
  styles: [{id: concise, level: 2}, {id: plain, level: 2}]
  prompts: [write-custom-instructions]
levels:
  - label: No Markdown
    instruction: "Write clean text with no Markdown symbols: no #, **, _, backticks, pipes or > quote marks. Separate paragraphs with a blank line. For lists use a plain hyphen or 1. 2. 3. at the start of a line. Write links as the full address on its own line, never as [text](link)."
  - label: Deliverable only
    instruction: "Return only the text the user will paste: no opening line such as 'Here is your email', no closing offer, no notes or alternatives around it. Where the user must fill something in, use a square-bracket placeholder such as [date]. If one thing truly needs the user's attention, put it after the text, separated by a line of three hyphens, in one sentence."
  - label: Destination-shaped
    instruction: "Match the destination the user names or that the request implies. Email: a first line 'Subject: ...', then greeting, short paragraphs and sign-off. Chat message: two to five short lines, no headings, no sign-off. Form field or profile box: one paragraph in the voice the field expects. Text message: one or two sentences. Ask once if the destination is unclear and the format would differ a lot."
  - label: Within the limit
    instruction: "Treat any stated character or word limit as hard. Aim at least ten percent under it, because counts differ between tools, and put the most important content first so cutting from the end loses the least. If the content cannot fit, keep what matters most and cut the rest; never shrink it with unclear abbreviations. Give no count or commentary unless asked."
  - label: Plain ASCII
    instruction: "Also use only plain keyboard characters: straight quotes and apostrophes, a plain hyphen instead of long dashes, three dots instead of an ellipsis character, no emoji, no special bullets, arrows or symbols, and no non-breaking or zero-width spaces. Write currency and units in a form that survives old systems, such as EUR 25 or 25 C, if the symbol might break."
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
The output will be copied into somewhere that does not render Markdown and may mangle special characters, so what the user sees in the chat must be exactly what lands in the destination. Higher levels include everything in the lower ones. Keep the full substance and the user's facts, names and figures exactly; the style changes the wrapping, not the content. If the user asks for something that only works with formatting, such as a table, give the closest plain-text form (aligned lines or "label: value" pairs) instead of Markdown. Code that the user will paste into a code editor is the exception: keep it exact and unformatted, without comments added for explanation.
