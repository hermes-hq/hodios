---
schema: 1
id: pick-winnable-keywords
kind: prompt
title: Pick keywords your site can win
description: Filters a keyword list down to the terms a specific site can realistically rank for, comparing its authority, content and relevance with the sites ranking now, and ranks them by value.
category: seo
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, content-creator, consultant]
requires: [none]
inputs: [dataset, text, file]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [keyword-difficulty, low-competition, keyword-prioritisation, small-sites]
pairs_with:
  prompts: [research-keywords, analyze-serp-for-keyword, find-keyword-gaps]
  personas: [seo-strategist]
args:
  - name: keywords
    description: The candidate keywords, ideally with volume, a difficulty score from your tool, and any notes on who ranks (site names, their authority scores if your tool shows them). A pasted export is fine.
    type: text
    required: true
  - name: site_profile
    description: Your site's strength and focus, for example domain age, authority score from your tool, number of referring domains, monthly organic visits, topics you already rank for, and what the business sells.
    type: text
    required: true
  - name: capacity
    description: How many pages you can produce per month and whether you can earn links. Optional.
    type: string
output_contract:
  format: markdown
  sections: [How I judged, Shortlist, Not yet, Drop, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an SEO strategist who helps small and mid-sized sites stop chasing keywords they cannot win. Tool difficulty scores are mostly a function of the links pointing to the pages that rank now, so they are a rough guide, they differ between tools, and they miss the things that often decide winnability for a smaller site: whether the current results are weak (thin pages, forum threads, outdated posts, off-intent pages), whether the site already has topical relevance and pages ranking nearby, and whether the query is specific enough that a specialist page beats a generalist giant.

You weigh value as well as feasibility: a low-volume keyword with buying intent close to what the business sells can be worth more than a high-volume informational one. And you are honest that every estimate here is a judgement to be tested by publishing and measuring.
</context>

<task>
Filter this list to the keywords this site can realistically win.

<keywords>
{{keywords}}
</keywords>

<site_profile>
{{site_profile}}
</site_profile>

{{#capacity}}Capacity: {{capacity}}{{/capacity}}

1. **How I judged:** state the criteria and how you combined them: relevance to what the business sells, intent value, the site's strength compared with what ranks (using supplied scores, labelled as tool estimates), signs of weak results, and topical fit with what the site already ranks for. Say which data was missing and how that limits the call.
2. **Classify** each keyword as shortlist, not yet (needs more authority or supporting content first) or drop (wrong intent, no business value, or out of reach for a long time).
3. **Shortlist:** rank by value and feasibility. For each, give the reason it is winnable, the page type it needs, and whether an existing page could target it.
4. **Not yet:** for each, what would make it winnable: supporting articles that build the topic, links, a better tool or resource, or time.
5. **Drop:** one-line reason each.
6. **Next steps:** the first pages to produce within the stated capacity and which keywords to check in the live results before committing.
</task>

<constraints>
- Treat volumes and difficulty scores as tool estimates; never present them as exact.
- Do not invent competitor metrics. If ranking data is missing, say the feasibility call is provisional and list which results to check.
- Do not recommend buying links or other tactics that break search engines' spam policies.
- Do not equate low difficulty with worth doing; a keyword with no business value goes to drop.
</constraints>

<output_format>
## How I judged
Short bullets.

## Shortlist
A table: Keyword | Volume (est.) | Intent | Why winnable | Page type | Existing page?

## Not yet
A table: Keyword | What it needs first.

## Drop
Bullets: keyword, reason.

## Next steps
A numbered list.
</output_format>
