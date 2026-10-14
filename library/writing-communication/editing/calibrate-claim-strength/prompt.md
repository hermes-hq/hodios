---
schema: 1
id: calibrate-claim-strength
kind: prompt
title: Calibrate claim strength to the evidence
description: Matches the wording of each claim in a draft to the evidence behind it, softening overclaims like "proves" or "always" and firming needless hedges, with a table of every change and the reason.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, consultant, data-analyst, researcher]
requires: [none]
inputs: [text, document]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [hedging, overclaiming, evidence, credibility, precise-wording]
pairs_with:
  prompts: [replace-vague-claims-with-specifics, strengthen-argument-in-draft, check-summary-matches-document]
  personas: [editor]
args:
  - name: text
    description: The draft to calibrate, such as a report, proposal, article or analysis write-up.
    type: text
    required: true
  - name: evidence_notes
    description: Optional notes on what the evidence actually is, for example "survey of 40 customers, one month of data, no control group".
    type: text
output_contract:
  format: markdown
  sections: [Calibration summary, Changes, Edited text, Claims needing evidence]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Credibility comes from claims that say exactly as much as the evidence supports. Drafts miscalibrate in both directions. Overclaiming: "proves", "shows", "always", "will", causal verbs ("drove", "caused") for a correlation, a pilot result stated as a general law, one customer's comment presented as "customers say". Underclaiming: hedges stacked on solid facts ("it could potentially be argued that sales may have somewhat increased" when sales rose 12%), which make the writer sound unsure of their own data. Readers who catch one overclaim discount everything else. A useful scale: established fact, strong evidence ("shows"), moderate ("suggests", "is associated with"), weak ("may", "one possibility"), and opinion ("we believe"). Each claim should sit at the level its evidence earns, with one hedge, not three.
</context>

<task>
Calibrate the strength of every claim in this text to its evidence.

<text>
{{text}}
</text>
{{#evidence_notes}}
<evidence_notes>
{{evidence_notes}}
</evidence_notes>
{{/evidence_notes}}

1. If the text is empty, ask for it and stop.
2. List each claim and the evidence the text (or the evidence notes) gives for it: data and its size, timeframe and design; a source; an example; or nothing.
3. Rate the wording's current strength and the strength the evidence supports. Watch for causal language from correlations or before-and-after comparisons, generalisation from small or unrepresentative samples, certainty about the future, and universal words (all, always, never, everyone).
4. Rewrite miscalibrated claims at the right level: soften overclaims, add the scope that makes them true (in the pilot, among respondents, so far), and remove stacked hedges from well-supported facts. Use one precise hedge rather than several vague ones.
5. Mark opinion as opinion where it is presented as fact, or suggest stating the evidence.
6. List claims that have no evidence at all and say what evidence would support them.
</task>

<constraints>
- Judge only from the text and the evidence notes. Do not use outside knowledge to decide a claim is true or false; if you know of a likely problem, flag it as a question.
- Do not add new claims or evidence.
- Keep the author's argument and conclusions, only at the strength the evidence earns. If a conclusion cannot survive calibration, say so.
- Keep the author's voice; avoid replacing every verb with "suggests".
</constraints>

<output_format>
## Calibration summary
Two or three sentences: whether the text overclaims, underclaims or both, and the main pattern.
## Changes
A table: Original | Evidence given | Problem (overclaim, underclaim, scope missing, opinion as fact) | New wording.
## Edited text
The full edited text.
## Claims needing evidence
Bullets: claim, and what evidence would support it. "None" if none.
</output_format>
