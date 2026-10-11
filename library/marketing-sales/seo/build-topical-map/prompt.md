---
schema: 1
id: build-topical-map
kind: prompt
title: Build a topical map
description: Builds a topical map for a content site or niche, with core entities, subtopics, a page list with intent and page type, internal links and the order to publish for topical depth.
category: seo
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, marketer, founder, writer]
requires: [none]
inputs: [topic, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [topical-authority, content-architecture, entities, publishing-order, niche-sites]
pairs_with:
  prompts: [research-keywords, build-internal-linking-plan, write-seo-content-brief]
  workflows: [topic-cluster-content-track]
  personas: [seo-strategist]
args:
  - name: niche
    description: The subject area the site wants to be known for, for example "sourdough baking at home" or "accounting for UK sole traders".
    type: string
    required: true
  - name: site_and_audience
    description: Who the site is for, what it sells or how it makes money, what it already covers, and where its real expertise lies.
    type: text
    required: true
  - name: keyword_data
    description: Keyword research or competitor topic lists you already have. Optional; without it, topics are proposed from domain knowledge and labelled as unvalidated.
    type: text
  - name: capacity
    description: How many pages you can publish per month. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Scope, Entity map, Page list, Linking, Publishing order, Validate before writing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a content strategist who plans niche sites. A topical map lists every page a site needs to cover a subject thoroughly and shows how the pages connect. The working theory among practitioners, consistent with search engines' emphasis on helpful, expert content, is that sites which cover a subject in depth, with pages that link sensibly to each other, tend to rank more easily for new pages on that subject than sites with scattered posts. It is a widely observed pattern, not a published ranking formula, and you say so.

Experienced planners build the map from the subject's entities and the reader's journey rather than from a keyword export alone: the core things (concepts, tools, processes, problems), the attributes and questions around each, and the stages from beginner to advanced and from learning to buying. They decide scope deliberately, since a map that wanders outside the site's expertise dilutes it, and they publish in an order that builds clusters to completeness rather than scattering one post across many clusters.
</context>

<task>
Build a topical map.

Niche: {{niche}}

<site_and_audience>
{{site_and_audience}}
</site_and_audience>

{{#keyword_data}}<keyword_data>
{{keyword_data}}
</keyword_data>{{/keyword_data}}

{{#capacity}}Capacity: {{capacity}}{{/capacity}}

1. **Scope:** define what is in and out of the niche for this site and why, based on its expertise and business model. Name adjacent topics to leave alone for now.
2. **Entity map:** the core entities and the four to eight pillar topics they group into; for each pillar, its main sub-topics and typical reader questions.
3. **Page list:** every page the map needs, grouped by pillar: working title, primary query (marked unvalidated unless supported by the keyword data), intent, page type (pillar guide, how-to, comparison, glossary, tool, product or service page), and funnel stage. Mark which existing pages already cover an item.
4. **Linking:** how pillars link to their sub-pages and back, which cross-links between pillars make sense, and where commercial pages sit in the structure.
5. **Publishing order:** batches that complete one cluster before starting the next, starting where the site's expertise and business value are highest; fit them to the stated capacity.
6. **Validate before writing:** what to check for each batch (search the main queries and confirm intent and format, check for overlap with existing pages) and when to review the map.
</task>

<constraints>
- Mark every query and volume as unvalidated unless the user supplied the data. Do not invent volumes.
- Do not plan near-duplicate pages for keyword variants; one page per intent.
- Do not recommend mass-producing pages beyond what the site can make genuinely useful; quality and first-hand expertise matter more than page count.
- Stay inside the niche's stated expertise; for health, money or legal topics, flag pages that need a qualified reviewer.
</constraints>

<output_format>
## Scope
In, out and why, in bullets.

## Entity map
Pillars with their sub-topics, as a nested list.

## Page list
One table per pillar: Title | Primary query | Intent | Page type | Stage | Exists?

## Linking
Bullets.

## Publishing order
Numbered batches with page counts.

## Validate before writing
A checklist.
</output_format>
