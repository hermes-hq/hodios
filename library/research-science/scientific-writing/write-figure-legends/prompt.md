---
schema: 1
id: write-figure-legends
kind: prompt
title: Write figure legends for a manuscript
description: Writes self-contained figure legends for finished figures, stating what each panel shows, sample sizes, what error bars represent, the statistical tests and the meaning of symbols.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, student]
requires: [none]
inputs: [notes, text, image]
output: [article, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [figure-captions, error-bars, manuscript, reproducibility, journal-submission]
pairs_with:
  prompts: [design-scientific-figures, write-results-section, write-methods-section]
args:
  - name: figures
    description: For each figure, what each panel plots, the axes, sample sizes and what n counts (cells, animals, participants or experiments), units, what error bars and symbols mean, and the tests run. Images can be attached.
    type: text
    required: true
  - name: journal
    description: Optional. Journal legend rules, for example word limit per legend, whether a title sentence is bold, and statistics reporting requirements.
    type: text
output_contract:
  format: markdown
  sections: [Legends, Missing details, Checks against the text]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many readers look at the figures and legends before, or instead of, the text, so a legend must let the figure be understood alone. Journals in the life sciences now require legends to state, for every panel: what n is and what it counts (biological replicates, technical replicates, cells, animals, independent experiments), what the error bars represent (SD, SEM or 95% CI, which differ in meaning), the exact test used and whether it was one- or two-sided, correction for multiple comparisons, and the exact p values or what each asterisk means. Common failures: "data are mean ± error", n without a unit, legends that describe methods at length but never say what the panel shows, and legends that interpret ("showing that X drives Y"). The usual structure is a short title sentence stating the main finding or content, then a sentence per panel, then statistics.
</context>

<task>
Write legends for these figures:
<figures>
{{figures}}
</figures>
{{#journal}}
Journal rules: {{journal}}
{{/journal}}

1. For each figure, write a title sentence that states what the figure shows. Use a descriptive title unless the journal asks for a finding-style title.
2. Write one sentence per panel (a, b, c...) saying what is plotted, against what, in which samples or conditions, with units.
3. State n for each panel with what it counts, what error bars and shaded areas represent, the test, sidedness, multiple-comparison correction, and exact p values or the meaning of each symbol.
4. Define every abbreviation, colour and symbol used in the figure.
5. Point to the methods for long procedures instead of repeating them, unless the journal asks for methods in legends.
6. Flag every detail that is missing instead of guessing.
</task>

<constraints>
- Do not invent n, p values, test names or error-bar definitions; mark [MISSING: ...].
- No interpretation in legends beyond the title sentence; no "demonstrating" or "proving".
- Keep within the journal's word limit if given; say the count.
- If images are attached, describe only what is visible and ask about anything unreadable.
</constraints>

<output_format>
## Legends
Each legend headed "Figure N", ready to paste.
## Missing details
Per figure, each [MISSING] item.
## Checks against the text
Things to verify for consistency with methods and results, such as matching n and test names.
</output_format>
