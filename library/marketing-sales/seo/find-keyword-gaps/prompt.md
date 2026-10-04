---
schema: 1
id: find-keyword-gaps
kind: prompt
title: Find keyword gaps
description: Compares keyword or ranking exports for your site and two or three competitors, finds the topics they rank for that you lack and that fit your business, and ranks them into a content plan.
category: seo
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [marketer, consultant, founder]
requires: [none]
inputs: [dataset, text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [competitor-analysis, keyword-gap, page-prioritisation, ranking-exports]
pairs_with:
  prompts: [research-keywords, write-seo-content-brief, mine-customer-language-for-keywords]
args:
  - name: your_keywords
    description: Your site's ranking keywords export - keyword, position, ranking URL, and volume if the tool gives it.
    type: text
    required: true
  - name: competitor_keywords
    description: The same export for two or three competitors, labelled by competitor.
    type: text
    required: true
  - name: business
    description: What you sell, to whom and where, and what you do not offer, so irrelevant gaps can be dropped.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Data check, Gaps, Filtered out, Clusters, Content plan, Caveats]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run keyword gap analyses for small business marketers and freelancers. Raw gap reports are mostly noise: competitors' brand names, products you do not sell, places you do not serve, job and careers searches, and one-off phrases. Chasing them wastes months. A useful gap analysis keeps only gaps that fit the business, groups them into pages rather than single keywords, and ranks them by how close they are to revenue and how winnable they look from the data. Business: {{business}}.
</context>

<task>
<your_keywords>
{{your_keywords}}
</your_keywords>

<competitor_keywords>
{{competitor_keywords}}
</competitor_keywords>

1. Data check: tool, country or database and date of each export if stated; volumes are tool estimates. Exports are comparable only when they cover the same country and were pulled within a few months of each other, ideally from the same tool. If they are not comparable, or an export is a description with no keyword rows, say what differs, ask for matching exports and stop before classifying.
2. Classify every competitor keyword against your export:
   - missing: a competitor ranks in the top 20 and you do not rank in the top 100;
   - weak: a competitor ranks top 10 and you rank 11-50;
   - shared: both rank top 10 (not a gap);
   - competitor-only strength: two or more competitors rank top 10 and you do not (strongest signal).
3. Filter out: competitor brand and product names, products or services you do not offer, locations you do not serve, careers, login and support navigation, and terms with an intent your site cannot satisfy. List what was removed and why.
4. Cluster remaining gaps into topics that one page could answer, naming the main keyword, the intent (learn, compare, buy, local), and the competitor URL that ranks.
5. Score each cluster: fit with what you sell (high, medium, low), intent value (closer to buying scores higher), winnability (how many competitors rank, your weak positions to build on), and effort (new page, expand existing page). Favour weak gaps on existing pages first: they are usually the quickest wins.
6. Turn the top clusters into a content plan: page, new or existing, main keyword, supporting keywords, what the page must do better than the competitor page.
</task>

<constraints>
- Use only keywords and numbers in the exports; volumes and difficulty come only from the tool and are labelled as estimates. Do not invent keywords or competitor URLs.
- If an export is missing or the business description does not say what is sold, ask and stop.
- Do not recommend copying competitor content; recommend what the business can do better from its own experience.
</constraints>

<output_format>
## Data check
Bullets.

## Gaps
Table: Keyword | Type (missing, weak, competitor-only strength) | Your position | Competitor positions | Volume (tool estimate). At most 30 rows, ordered by fit then intent value; say how many more gaps were found.

## Filtered out
Table: Keyword or group | Reason. Group similar removals (for example "12 competitor brand terms") rather than listing every row.

## Clusters
Table: Cluster | Main keyword | Intent | Competitor URL | Fit | Intent value | Winnability | Effort.

## Content plan
Numbered list in priority order with page, new or existing, keywords, and how to beat the ranking page.

## Caveats
Bullets.
</output_format>
