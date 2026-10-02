---
schema: 1
id: measure-ux-with-sus
kind: prompt
title: Measure UX with SUS and task metrics
description: Plans a UX benchmark with SUS and task metrics, or scores supplied responses, compares them with norms and reports confidence intervals. Use to track UX across releases.
category: ux-research
version: 1.0.0
status: incubating
stage: [verify, plan]
role: [ux-researcher, designer, product-manager, data-analyst]
requires: [none]
inputs: [dataset, text]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sus, ux-benchmark, ux-metrics, task-success, confidence-intervals]
pairs_with:
  prompts: [write-usability-test-plan, synthesize-usability-findings]
  personas: [ux-researcher]
args:
  - name: product
    description: The product and version being measured, the tasks in scope, the user groups, and any earlier benchmark to compare against (scores, sample size, date).
    type: text
    required: true
  - name: responses
    description: Raw data to score - SUS answers per respondent (10 items, 1 to 5, in the standard order) and, if measured, task results (success, time in seconds, errors). Leave empty to get a benchmark plan.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Method, SUS results, Task results, Comparison, Data quality, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The System Usability Scale is the most widely used standard usability questionnaire, and the most often mis-scored. Teams average the raw 1-to-5 answers, forget that even-numbered items are negatively worded, read 68 as "68 per cent", compare two releases from eight people each without any error margin, and drop task metrics that would explain why the score moved. A credible benchmark uses the same tasks and the same kind of participants each time, scores correctly, and reports uncertainty honestly.
</context>

<task>
{{#responses}}
Score and report this UX benchmark.

<responses>
{{responses}}
</responses>
{{/responses}}
Product and scope:

<product>
{{product}}
</product>

If no responses were supplied, write a benchmark plan: the 5 to 8 core tasks with success criteria, metrics (task success, time on task for successful attempts, errors, the Single Ease Question after each task, SUS at the end), sample size per user group (20 or more for a stable benchmark, more to detect small differences between releases), unmoderated versus moderated, how to keep later rounds comparable (same tasks, recruitment criteria, environment and order of questionnaires), and a results template. Then stop.

If responses were supplied:
1. **Check the data.** Count respondents. Flag rows with missing items, values outside 1 to 5, and straight-lining (the same answer on all 10 items, which is inconsistent because half the items are negatively worded). Say how each is handled: exclude, or keep and flag. If the item order or wording is not the standard SUS, say the scores may not be comparable with norms.
2. **Score SUS correctly.** For each respondent: odd items (1, 3, 5, 7, 9) contribute answer minus 1; even items (2, 4, 6, 8, 10) contribute 5 minus answer; the sum is multiplied by 2.5, giving 0 to 100. Show a per-respondent table so the arithmetic can be checked. Then report the mean, standard deviation, median and range.
3. **Confidence interval.** Report the 95 per cent interval for the mean SUS: mean plus or minus t (with n minus 1 degrees of freedom) times SD divided by the square root of n. Show the values used.
4. **Compare with norms.** State that across large published datasets the average SUS is about 68, and that this is a score, not a percentage. Place the result relative to that average using the interval (clearly above, around, or below), and mention the Sauro-Lewis curved grading scale as a reference without over-reading the letter grade.
5. **Task metrics (if supplied).** Per task: success rate with an adjusted-Wald 95 per cent interval (suitable for small samples); time on task for successful attempts as the geometric mean with an interval computed on log times; mean errors per attempt; mean SEQ if collected. Flag tasks with low success or high time as the likely drivers of the SUS score.
6. **Compare with the earlier benchmark (if given).** Report the difference with a 95 per cent interval for the difference (Welch's t for independent samples, or a paired comparison if the same people took part). If the interval includes zero, say there is no clear evidence of change. Check that the rounds are comparable before comparing.
7. With more than about 40 respondents, compute the summary statistics, show the first 10 rows of the per-respondent table, and give a spreadsheet formula for the rest, for example with items in columns B to K: `=((B2-1)+(5-C2)+(D2-1)+(5-E2)+(F2-1)+(5-G2)+(H2-1)+(5-I2)+(J2-1)+(5-K2))*2.5`.
</task>

<constraints>
- Never average raw item answers as a score, and never present SUS as a percentage or a percentile.
- Show your working for every computed figure, and recompute any total you are unsure of. Do not round until the final figures (one decimal place).
- Do not invent norms, competitor scores or earlier results. With fewer than about 12 respondents, say the interval is wide and the score is indicative only.
- SUS measures perceived usability overall; it does not say what to fix. Use task data and observations for that.
- For formal hypothesis testing beyond these intervals, or high-stakes decisions, recommend review by a statistician.
{{> output/uncertainty}}
</constraints>

<output_format>
For a plan: `## Method`, `## Tasks` (table: task, success criterion, metric), `## Sample and recruitment`, `## Results template`.
For scored data:
## Summary
Three to five sentences: the SUS mean with its interval, where it sits against the average, the weakest tasks, and whether it changed since the last round.
## Method
## SUS results
Per-respondent table (respondent, item contributions, SUS), then summary statistics and the interval.
## Task results
| Task | n | Success (95% CI) | Geo-mean time, s (95% CI) | Errors | SEQ |
## Comparison
## Data quality
## Next steps
</output_format>
