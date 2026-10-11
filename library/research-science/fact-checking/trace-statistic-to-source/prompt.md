---
schema: 1
id: trace-statistic-to-source
kind: prompt
title: Trace a statistic to its original source
description: Traces a widely repeated number back to the study or dataset it came from, shows how it changed as it was retold, and says whether it still supports the claim it is used for.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [writer, editor, researcher, content-creator]
requires: [web]
inputs: [text]
output: [report]
risk: network
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [number-laundering, primary-sources, source-trail, misleading-statistics]
pairs_with:
  prompts: [trace-quote-origin, check-statistics-in-article, fact-check-claims]
  rules: [source-citation-rules]
args:
  - name: statistic
    description: The number as you saw it, with the sentence around it, for example "90% of startups fail in their first year".
    type: text
    required: true
  - name: seen_in
    description: Where you saw it (a slide, an article, a report), with any citation it gave.
    type: string
output_contract:
  format: markdown
  sections: [Verdict, Source trail, What the original says, How to use it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Popular statistics are often laundered: a number from a small survey, a vendor white paper or an offhand estimate gets cited by a blog, then by a news story citing the blog, then by a report citing the news story, until it reads as established fact. On the way it drifts: "up to 40%" becomes "40%", "in our sample of 300 UK firms" disappears, a 2009 figure is presented as current, and a share of one group becomes a share of everyone. Some circulating numbers have no traceable origin at all. The useful question is not only "is it true?" but "what exactly was measured, by whom, when, and does it support the sentence it is now used in?"
</context>

<task>
Trace this statistic:
<statistic>
{{statistic}}
</statistic>
{{#seen_in}}Seen in: {{seen_in}}{{/seen_in}}

1. Restate precisely what the number claims: the quantity, the population, the place, the period and the unit.
2. Follow the citation chain backwards. For each hop, record who cited whom and with what wording. Search for distinctive phrasings and the number itself with date limits to find the earliest appearance.
3. Identify the origin: a named study, official dataset, survey, report or a statement with no underlying data. Record its author, funder or commissioner, date, method and sample.
4. Compare the original with the version you were given: wording, qualifiers ("up to", "as many as"), population, date, definition, and whether a range or estimate became a point fact.
5. Judge whether the original supports the sentence it now appears in, and whether newer or better data exist.
</task>

<constraints>
- Cite only pages you opened in this session, with URL and date. Never cite from memory, never construct a URL, and never invent a study, author or sample size.
- If you have no web access, say so at the top, give no verdict, and list the searches and likely primary sources to check, with what to look for at each.
- Several outlets repeating one source count as one source. Name circular citations when you find them.
- "No original found" is a valid finding. Say how far back you searched rather than declaring the number false.
- Note when the origin has a commercial or advocacy interest in the number, without treating that alone as proof it is wrong.
</constraints>

<output_format>
## Verdict
One rating in bold (Accurately cited, Distorted, Outdated, Unsourced, Origin found but does not support the claim), then two or three sentences on the main evidence and your confidence.
## Source trail
Table: date | source (linked) | exact wording | cites.
## What the original says
The original measurement: who, what, where, when, how, sample, and the exact figure with its qualifiers.
## How to use it
An accurate sentence that uses the number honestly, or the reason to drop it, plus better data if you found any.
</output_format>
