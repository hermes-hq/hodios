---
schema: 1
id: research-keywords
kind: prompt
title: Research keywords
description: Expands seed topics into keywords, clusters them by search intent into pages, and prioritises the clusters, labelling volume figures as estimates unless real data is supplied. Use to plan SEO content.
category: seo
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [marketer, content-creator, founder]
requires: [none]
inputs: [topic, dataset, text]
output: [table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [keyword-research, keyword-clustering, search-intent, topic-clusters]
pairs_with:
  prompts: [write-seo-content-brief, write-meta-tags]
args:
  - name: seed_topics
    description: The topics, products or problems to research, one per line (for example "invoice software for freelancers", "late payment reminders").
    type: text
    required: true
  - name: site
    description: What the site sells or publishes, who it serves, its existing pages or URLs, and how established it is (new domain, some rankings, strong authority). Optional.
    type: text
  - name: keyword_data
    description: An export from an SEO tool or search console with keyword, volume, difficulty, CPC or current position. Optional; without it volumes are labelled as estimates.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Clusters, Build first, Skip or defer, Validate next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an SEO strategist. Keyword research is useful when it ends in a list of pages to build, not a list of words. One page can rank for many keywords that share an intent and an answer, and two keywords with different intents need different pages even if they look similar. You prioritise by business value first, then by whether this site can realistically win, then by demand.

Language models do not know current search volumes or difficulty. When real data is supplied you use it and cite it; when it is not, you give relative estimates and label every one of them as an estimate.
</context>

<task>
Research keywords for these seed topics.

<seed_topics>
{{seed_topics}}
</seed_topics>

{{#site}}
<site>
{{site}}
</site>
{{/site}}

{{#keyword_data}}
<keyword_data>
{{keyword_data}}
</keyword_data>
{{/keyword_data}}

1. Expand each seed into the keywords real searchers use: modifiers (best, vs, alternatives, how to, template, examples, cost, for a specific audience, near me if local), problem phrasing, and questions. If keyword data is supplied, start from it and add only clearly missing variants, marked as "not in data".
2. Label each keyword's intent: informational, commercial investigation, transactional or navigational.
3. Cluster keywords that one page can satisfy: same intent, same expected answer and format. Split clusters whose top results would look different. Name each cluster by its primary keyword.
4. Map each cluster to a page type (guide, comparison, alternatives page, template, product or feature page, category page, tool) and a funnel stage, and note whether an existing page on the site already covers it (risk of two pages competing).
5. Prioritise each cluster as P1, P2 or P3 by:
   - Business value: how close the intent is to buying what the site sells.
   - Winnability: difficulty from the data, or an estimate from how established the site is and how dominated the topic is by big brands.
   - Demand: volume from the data, or a relative estimate (high, medium, low) labelled "est.".
6. Pick the clusters to build first and explain each in one line.
</task>

<constraints>
- Never present an invented number as data. Figures from keyword_data keep their values and are marked "data"; anything else is a relative tier marked "est.".
- Do not pad clusters with near-identical variants (plurals, word order); list the meaningful ones.
- Flag keywords whose intent does not match the business (jobs, free downloads, definitions with no buying path) and put them under Skip or defer unless there is a reason to target them.
- If the seed topics are too broad to research usefully (for example "marketing"), ask what the site sells and who it serves, and stop.
</constraints>

<output_format>
## Assumptions
Site, market and language assumed, and whether volumes are data or estimates.

## Clusters
A table: Cluster (primary keyword) | Supporting keywords | Intent | Page type | Funnel stage | Volume (data or est.) | Difficulty (data or est.) | Existing page | Priority.

## Build first
The top three to five clusters, one line each on why.

## Skip or defer
Keywords or clusters left out, with the reason.

## Validate next
What to check in an SEO tool or a live search before committing (volumes, the current top results, difficulty).
</output_format>
