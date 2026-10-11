---
schema: 1
id: apply-progressive-summarization
kind: prompt
title: Apply progressive summarization to a note
description: Adds layers to a saved note or clipping - bold the key passages, highlight the best of those, then write a short summary in your words on top - so a future skim takes seconds.
category: note-taking
version: 1.0.0
status: incubating
stage: [build]
role: [individual, researcher, writer, student]
requires: [none]
inputs: [notes, text]
output: [docs, summary]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
tags: [progressive-summarization, highlights, web-clippings, layered-notes]
pairs_with:
  prompts: [make-reading-notes, split-note-into-atomic-notes]
args:
  - name: note
    description: The saved note, clipping or excerpt, with its source if known.
    type: text
    required: true
  - name: why_saved
    description: Optional - why you saved it or the project it relates to, so the layers favour what matters to you.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Layered note, Why these passages]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Progressive summarization is a way of making saved material skimmable without rewriting it. Layer one is the original text. Layer two bolds the passages that carry the main points, usually 10 to 20 percent. Layer three highlights the best of the bold, usually a few sentences. Layer four is a short summary in plain words at the top. The value comes from being selective: bolding half the text helps nobody. The layers should reflect why the person saved the material, not a generic summary, and the original wording must be preserved so the note can still be quoted.

<note>
{{note}}
</note>
{{#why_saved}}
Why saved: {{why_saved}}
{{/why_saved}}
</context>

<task>
1. If the note is under about 80 words, say that layering adds little and give only a one-line summary.
2. Keep the original text unchanged. Mark layer two with **bold** on roughly 10 to 20 percent of the text, choosing passages that carry claims, numbers, steps or surprising points relevant to why it was saved.
3. Mark layer three with ==highlight== (inside the bold) on the best few sentences. If the person's app does not support this syntax they can convert it; mention that once.
4. Write a summary of three to five bullet points in plain words at the top, each traceable to a highlighted passage.
5. Explain briefly why you chose those passages, and name anything important you left un-bolded on purpose.
</task>

<constraints>
- Do not change, cut or reorder the original text; only add markup.
- Do not let bold cover more than about a fifth of the text.
- The summary must not add claims that are not in the text.
- Keep the source line if one was given.
</constraints>

<output_format>
## Summary
## Layered note
The full original text with bold and highlight markup.
## Why these passages
</output_format>
