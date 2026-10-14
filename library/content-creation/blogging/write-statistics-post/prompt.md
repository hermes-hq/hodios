---
schema: 1
id: write-statistics-post
kind: prompt
title: Write a statistics roundup post
description: Writes a statistics roundup post from figures the writer has gathered, with each stat traced to its original source, dated, described accurately and caveated, plus a verification checklist.
category: blogging
version: 1.0.0
status: incubating
stage: [build]
role: [writer, marketer, content-creator]
requires: [none]
inputs: [text, notes]
output: [article, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [statistics-roundup, primary-sources, source-verification, link-building, data-caveats]
pairs_with:
  prompts: [write-data-story-article, calibrate-claim-strength, refresh-old-blog-post]
args:
  - name: stats
    description: Each statistic you want to include, with where you found it, the original source if known (publisher, report or study title, date, link), and the sample or method if stated.
    type: text
    required: true
  - name: topic
    description: The topic of the roundup and the reader it is for.
    type: text
    required: true
  - name: year
    description: The year the post is published, used in the title and to judge how dated each figure is.
    type: string
output_contract:
  format: markdown
  sections: [Stat audit, Post, Verification checklist, Dropped or flagged]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write statistics roundup posts ("50 email marketing statistics for this year"), a format that earns links and citations when it is trustworthy and spreads errors when it is not. Many figures circulating online are "zombie stats": quoted from a blog that quoted another blog, traced back to a dead link, rounded or reworded until they no longer say what the original said, a decade old, or from a small vendor survey presented as if it described a whole population. A trustworthy roundup gives, for each figure: exactly what was measured, who was measured (population and sample size), when the data was collected, and the original publisher, linked directly. It groups figures by theme, puts the most useful first, and tells readers how to use the numbers carefully. You cannot check sources yourself, so you organise and describe what the writer supplies and make the verification work explicit.
</context>

<task>
<stats>
{{stats}}
</stats>

<topic>
{{topic}}
</topic>

Publication year: {{year}}

1. Stat audit: for each figure supplied, record what is known: the claim, the original source or only a secondary one, the data collection date, the population and sample, and the type of source (official statistics, peer-reviewed study, industry report, vendor survey, other). Flag figures that are only secondary, undated, older than about five years for fast-moving topics, from small or self-selected samples, or worded more strongly than the source description supports.
2. Decide what goes in: keep figures with a known original source; put secondary-only figures in the post only as "to verify" in the checklist, not in the published text; drop or flag the rest.
3. Write the post: a title with the publication year, a short intro on what the roundup covers and how figures were chosen, a "key statistics" list of the five to ten most useful, then themed sections. Each stat is one sentence that states exactly what was measured, with the source name and data year in the sentence, followed by a one-line note on what it means for the reader or a caveat.
4. Add a short "how to use these statistics" section: cite the original source, check the date and sample, do not combine figures from different methods.
5. End with a methodology note: how figures were collected and when the post was last updated.
</task>

<constraints>
- Never add statistics that are not in the input, and never supply, complete or correct a source, date, sample size or link from memory. Missing details become `[CHECK: ...]` items.
- Never strengthen a figure's wording ("68% of marketers say" must not become "68% of businesses").
- Label vendor and self-selected surveys as such in the sentence.
- If fewer than about eight figures survive the audit, say so and suggest the post be smaller or wait for more research rather than padding.
</constraints>

<output_format>
## Stat audit
Table: # | figure | original source known? | data date | sample | source type | status (keep, verify, drop) | reason.

## Post
The full post in Markdown, ready for links to be added to each source name.

## Verification checklist
A checklist per kept figure: open the original source, confirm wording, date and sample, add the direct link.

## Dropped or flagged
Each dropped or flagged figure with the reason and what would let it back in.
</output_format>
