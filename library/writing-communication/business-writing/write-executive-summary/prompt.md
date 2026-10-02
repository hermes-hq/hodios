---
schema: 1
id: write-executive-summary
kind: prompt
title: Write an executive summary
description: Writes an executive summary of a long document that leads with the bottom line, the key points and the ask, using only facts from the source. Use before sending a report to busy readers.
category: business-writing
version: 1.0.0
status: experimental
stage: [build]
role: [manager, executive, consultant, business-analyst]
requires: [none]
inputs: [document]
output: [summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [executive-summary, bluf, pyramid-principle]
pairs_with:
  prompts: [write-project-proposal, write-status-report, tighten-prose]
args:
  - name: document
    description: The full text of the report, proposal, study or memo to summarise.
    type: text
    required: true
  - name: audience
    description: Who will read the summary and what they care about, for example "CFO deciding on next year's budget" or "board, non-specialist".
    type: string
    required: true
  - name: max_words
    description: Maximum length of the summary in words.
    type: number
    default: 250
output_contract:
  format: markdown
  sections: [Executive summary, Source check, Left out]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An executive summary is read instead of the document, not before it. Many readers stop after the first paragraph, so it must stand alone: what the document concludes, why that matters to this reader, and what the reader is being asked to do. Weak summaries describe the document ("This report examines…") instead of stating its findings, follow the document's chronology instead of its importance, bury the ask, or quietly change numbers and certainty while compressing.
</context>

<task>
Write an executive summary of the document below for {{audience}}, at most {{max_words}} words.

<document>
{{document}}
</document>

1. If the document is empty or is only a title or topic, ask for the full text and stop.
2. Find the governing thought: the single conclusion or recommendation the whole document supports. If the document has none, say so and summarise its main findings instead; do not invent a recommendation.
3. Find the ask: the decision, approval, money or action the reader is expected to give, with any deadline. If there is no ask in the document, state "No action requested" rather than making one up.
4. Pick the three to five points that most support the governing thought for this audience. Prefer points with numbers, consequences, costs or risks. Drop methodology and history unless the audience needs them to trust the result.
5. Order by importance, top-down: bottom line first, then the supporting points, then the ask and next steps.
6. Translate jargon the audience does not share into its consequence, and keep the document's level of certainty (an estimate stays an estimate, a pilot result stays a pilot result).
7. Count the words and cut until you are within the limit.
</task>

<constraints>
- Use only facts, figures and claims from the document. Copy numbers exactly; never round, recompute or combine them.
- Do not open with "This document", "This report" or a restatement of the title. The first sentence is the bottom line.
- Keep risks and caveats the document gives if they would change the reader's decision.
- If the document contradicts itself on a key figure, do not pick one: write "[CHECK: …]" and list the conflict under Left out.
- Plain, active sentences. No bullet longer than two lines.
</constraints>

<output_format>
## Executive summary
**Bottom line:** one or two sentences.
**Key points:** three to five bullets, most important first.
**The ask:** the decision or action needed, from whom and by when, or "No action requested".
Then the line "Word count: N / {{max_words}}".
## Source check
A table: claim or number in the summary | where it appears in the document (section heading or a short quoted phrase).
## Left out
Bullets: material you cut that a reader might expect, and any conflicts or gaps you found. "None" if nothing material.
</output_format>
