---
schema: 1
id: write-data-story-article
kind: prompt
title: Write a data-driven article
description: Writes an article built on data that leads with the finding, explains method and caveats in plain words, and specifies the charts. Use for data journalism and research-based posts.
category: blogging
version: 1.0.0
status: incubating
stage: [build, verify]
role: [writer, data-analyst, marketer, researcher]
inputs: [dataset, notes, document]
output: [article, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [statistics]
tags: [data-journalism, chart-specs, method-notes, caveats, original-research]
pairs_with:
  prompts: [tell-data-story, write-explainer-article, write-article-headlines-and-standfirsts]
args:
  - name: findings
    description: The analysis results, with the actual numbers (tables, summary statistics, comparisons over time), how they were calculated, and any notes on what surprised you.
    type: text
    required: true
  - name: data_source
    description: Where the data comes from, who collected it, when, how (survey, administrative records, scraped, own product data), the sample size, and known limitations.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The finding, Article, Charts, Numbers check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a data journalist and editor. A data story is a story first: it leads with the single most important finding in plain words and a concrete number, then shows the evidence, then explains what could make the finding wrong. Readers lose trust when an article overstates the data: calling a correlation a cause, comparing raw counts where rates are needed, hiding a small sample, quoting a percentage change on a tiny base, or treating a non-representative survey as the population. Good data stories put a short methods note in plain language where readers can find it, show uncertainty honestly, and use charts that each make one point stated in an action title.
</context>

<task>
Write a data-driven article from the findings below.

<findings>
{{findings}}
</findings>

<data_source>
{{data_source}}
</data_source>

1. **The finding.** Check the findings before writing:
   - State the single most newsworthy finding in one sentence with its number.
   - Check each claim against the data: absolute versus relative change, rates versus counts, base sizes, time periods compared, whether the sample can support generalising, and whether a causal claim is justified. List problems found and how the article will phrase the claim instead.
2. **Article:**
   - Headline that states the finding accurately, without causal words the data cannot support.
   - Lede with the finding and the number in human terms (for example "one in four" alongside the percentage).
   - Second paragraph: why it matters and to whom.
   - Body: two to four supporting findings in order of importance, each with its number and comparison point; a human example or quote only if the notes provide one.
   - "How we did this" paragraph in plain language: source, period, sample size, method, and the main limitations.
   - What the data cannot tell us, and what would answer it.
3. **Charts.** Specify two to four charts: chart type, data series, axis labels and units, the action title (a sentence stating the takeaway), and any annotation. Explain where each sits in the article.
4. **Numbers check.** A list of every number in the article with where it comes from in the findings and any rounding applied.
</task>

<constraints>
- Every number must come from the findings or be a direct, shown calculation from them. Do not invent figures, benchmarks or comparisons.
- Use causal language ("caused", "led to", "because") only when the method supports it; otherwise use "is linked to", "coincided with", "is higher among".
- Give base sizes for percentages from samples under a few hundred, and say when a change is within the margin of error if the findings report one.
- Round sensibly and consistently, and never round in the direction that makes the story stronger.
- Plain language: explain any statistical term in a clause.
</constraints>

<output_format>
## The finding
The headline finding and the claim checks.

## Article
The full article in Markdown.

## Charts
Numbered chart specifications.

## Numbers check
A table: number in article | source in findings | calculation or rounding.
</output_format>
