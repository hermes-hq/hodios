---
schema: 1
id: check-statistics-in-article
kind: prompt
title: Check the statistics in an article
description: Checks an article's numbers for misleading percentages, missing base rates, cherry-picked windows and correlation sold as causation, recomputing what it can. Use before quoting it.
category: fact-checking
version: 1.0.0
status: experimental
stage: [verify]
role: [writer, editor, researcher, data-analyst]
subject: [statistics]
requires: [none]
inputs: [document, text]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [statistical-literacy, base-rates, misleading-statistics]
pairs_with:
  prompts: [fact-check-claims, explain-research-to-public]
  personas: [statistician]
args:
  - name: article
    description: The article, report or post, including any figures, charts described in words, and footnotes.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Issues, Recalculations, Questions to ask]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most misleading statistics are not false numbers but true numbers framed to mislead: a relative risk without the base rate ("doubles your risk" from 1 in 10,000 to 2 in 10,000), percent confused with percentage points, a start date chosen to exaggerate a trend, an average skewed by a few extremes, a self-selected online poll reported as public opinion, or a correlation narrated as cause. A reader can catch most of these with a checklist and some arithmetic.
</context>

<task>
Check every statistic in this article:
<article>
{{article}}
</article>

1. List each number or statistical claim with the sentence it appears in.
2. Test each against this checklist and record only the problems that apply:
   - relative change without the absolute numbers or base rate;
   - percent change confused with percentage-point change;
   - missing or shifting denominators, and counts that should be rates (per person, per year);
   - cherry-picked time window or start point, or a one-off spike treated as a trend;
   - mean where the median would tell a different story, or a skewed distribution;
   - sample size, sampling method and margin of error; self-selected or unrepresentative samples;
   - correlation presented as causation, reverse causation, or an obvious confounder;
   - regression to the mean, survivorship bias, Simpson's paradox;
   - comparisons across different definitions, places or periods, or money not adjusted for inflation;
   - false precision, or numbers with no source.
3. Recompute what the article's own numbers allow (for example convert relative to absolute risk, percent to percentage points, totals to rates) and show the arithmetic.
4. Rewrite each problematic sentence so it is accurate.
</task>

<constraints>
- Use only the article's numbers and arithmetic. Do not bring in outside statistics; if a base rate or denominator is missing, say it is missing and what it would take to judge the claim.
- Distinguish "misleading as written" from "can't tell without more information". Do not accuse the article of an error you cannot show.
- Show every calculation step so a reader can check it.
- If the article contains no statistics, say so and stop.
</constraints>

<output_format>
## Verdict
Two or three sentences: how far the numbers support the article's main message.
## Issues
A table: # | quoted sentence | problem (from the checklist) | why it matters | accurate rewrite.
## Recalculations
Each recomputation with its arithmetic.
## Questions to ask
Bullets: the information the author or source should provide (denominators, sample details, full time series, definitions).
</output_format>
