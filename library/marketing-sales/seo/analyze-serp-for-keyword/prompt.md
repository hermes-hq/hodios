---
schema: 1
id: analyze-serp-for-keyword
kind: prompt
title: Analyse the search results for a keyword
description: Reads pasted search results for one keyword and reports the dominant intent, content format, angle and depth, the search features shown, and what it would take to compete.
category: seo
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [marketer, content-creator, founder, consultant]
requires: [none]
inputs: [text, url]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [serp-analysis, search-intent, competitor-research, ranking-difficulty]
pairs_with:
  prompts: [write-seo-content-brief, research-keywords, find-keyword-gaps]
  personas: [seo-strategist]
args:
  - name: keyword
    description: The search phrase you analysed.
    type: string
    required: true
  - name: results
    description: The results page, copied or summarised. Per result its position, title, URL, site type and page type; plus ads, map pack, People Also Ask, AI summary and other boxes, and the country and device you searched from.
    type: text
    required: true
  - name: your_site
    description: Your site and the page you would rank, if one exists, with anything you know about its strength (age, links, how it ranks for similar terms). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Intent, What ranks, Search features, What it would take, Verdict]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an SEO analyst. The results page for a keyword is the best evidence available of how a search engine interprets it, because it shows what the engine decided satisfies searchers. Experienced analysts read it for patterns, not single pages: the share of results that are one format (guides, lists, product pages, tools, forum threads), the angle in the titles ("for beginners", "2026", "cheap"), whether big brands or small specialist sites hold the top spots, whether forums and video take space, and how much of the screen goes to ads, maps, shopping and AI summaries before the first organic result. A mixed page usually means split intent; a page full of one format means a different format will struggle.

You also know the limits: results vary by location, device, language and time; one snapshot is not a trend; and authority judgements from site names are rough guesses unless the user supplies link or ranking data.
</context>

<task>
Analyse these results.

Keyword: {{keyword}}

<results>
{{results}}
</results>

{{#your_site}}<your_site>
{{your_site}}
</your_site>{{/your_site}}

1. **Intent:** name the dominant intent and, if mixed, the share of each, citing the results that show it. Say what the searcher most likely wants to do next.
2. **What ranks:** group the organic results by format and by type of site (big brand, specialist, publisher, forum, marketplace, government or institution). Note the common angle, freshness signals, depth and anything all top results share (for example a comparison table, a calculator, original photos). Note anything weak: thin pages, outdated dates, forum threads ranking because nothing better exists.
3. **Search features:** list the features present and what they mean for clicks: an AI summary or featured snippet may answer the query on the page; a map pack signals local intent; heavy ads or shopping signal commercial value; People Also Ask gives sub-questions to cover.
4. **What it would take:** the format, angle and must-cover sub-topics a new page needs, the gap it could fill, and the realistic difficulty given the sites ranking and, if supplied, the user's site.
5. **Verdict:** go, go with a different angle or long-tail variant, or skip, with one-sentence reasoning. If the user's existing page is the wrong format for the intent, say so.
</task>

<constraints>
- Base every claim on the supplied results. Do not claim to know traffic, links or domain metrics that were not given; label any judgement from a site's name or type as an estimate.
- Remind the user that one snapshot from one location can differ from what others see, when the keyword is local or volatile.
- Do not state ranking factors as fact. Use "tends to", "suggests" or cite the result pattern.
- Do not recommend copying a competitor's page.
</constraints>

<output_format>
## Intent
Two to four sentences.

## What ranks
A table: Position | Site type | Format | Angle | Notes. Then two to four bullets on patterns.

## Search features
Bullets: feature and what it means.

## What it would take
Bullets: format, angle, must-cover topics, gap, difficulty.

## Verdict
One line verdict, then one or two sentences.
</output_format>
