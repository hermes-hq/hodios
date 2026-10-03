---
schema: 1
id: expand-notes-into-prose
kind: prompt
title: Expand notes into prose
description: Turns bullet points or rough notes into flowing, well-ordered paragraphs that keep every fact, add no new claims, and flag gaps and unclear relationships instead of padding them.
category: editing
version: 1.0.0
status: incubating
stage: [build]
role: [individual, writer, student, manager]
requires: [none]
inputs: [notes]
output: [rewrite, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [bullets-to-prose, first-draft, fact-preservation, paragraphing, no-padding]
pairs_with:
  prompts: [tighten-prose, line-edit-prose, write-executive-summary]
args:
  - name: notes
    description: Your bullet points or rough notes, in any order. Abbreviations are fine.
    type: text
    required: true
  - name: purpose_and_reader
    description: What the prose is for and who reads it, for example "the background section of a grant report for the funder" or "an email update to parents".
    type: string
    required: true
  - name: target_length
    description: A rough length, for example "about 300 words" or "two paragraphs". If empty, the length follows from the notes.
    type: string
output_contract:
  format: markdown
  sections: [Prose, Coverage check, Gaps and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Notes record facts; prose has to show how the facts relate: which caused which, which matters more, what follows from what. When a model expands notes it is tempted to fill the gaps with plausible connections ("as a result", "which led to") and generic sentences ("This is an important step for the organisation"), so the prose reads well but claims things the writer never said. The useful version keeps every fact, makes only the connections the notes support, and tells the writer exactly where a link, a number or a reason is missing, so they can supply it instead of discovering an invented one after sending.
</context>

<task>
Turn these notes into prose for: {{purpose_and_reader}}.{{#target_length}} Target length: {{target_length}}.{{/target_length}}

<notes>
{{notes}}
</notes>

1. If the notes are empty, ask for them and stop.
2. Number the notes for yourself (N1, N2, …). Expand abbreviations only where the meaning is certain; otherwise keep them and ask.
3. Choose an order that suits the purpose and reader (most important first for busy readers, chronological for an account of events, problem then response for a case), and group the notes into paragraphs, each with one main point stated in its first sentence.
4. Write connected prose. Use connecting words that state a relationship (because, so, despite, as a result) only when the notes state or clearly imply that relationship. Where two facts sit side by side without a stated link, keep them side by side and add a gap marker `[?]` if a link seems expected.
5. Add nothing new: no facts, figures, examples, reasons, outcomes or evaluative claims beyond the notes. Framing sentences (an opening that states the topic, a closing that restates the point) are fine if they introduce no new claim.
6. If the target length cannot be reached without padding, stop short of it and say so; if the notes exceed it, keep every fact by tightening wording rather than dropping notes, and say if it still runs over.
7. Check coverage: every numbered note appears in the prose.
</task>

<constraints>
- Keep numbers, names, dates and technical terms exactly as written.
- Match the register to the reader; plain language by default.
- Keep the writer's point of view (I, we, they) and any opinions as the writer's, not stronger or weaker.
- No filler sentences, no "In today's fast-paced world", no summary that repeats the paragraph above.
</constraints>

<output_format>
## Prose
The paragraphs, with `[?]` where a link or fact is missing. Then "Words: N".
## Coverage check
Table: Note · Where it appears (paragraph and a few words) · Changed? (wording only, or how).
## Gaps and questions
Bullets: each `[?]`, unclear abbreviation, missing figure or unstated reason, phrased as a question to the writer. "None" if none.
</output_format>

<examples>
Notes: "- moved suppliers in March - costs down 8% - two late deliveries in April"
Padded (wrong): "Thanks to our strategic decision to move suppliers in March, costs fell by 8%, although two late deliveries in April showed some teething problems."
Faithful: "We moved suppliers in March, and costs are down 8% [?]. There were two late deliveries in April." Gap: "Is the 8% fall due to the supplier change, and are the late deliveries from the new supplier?"
</examples>
