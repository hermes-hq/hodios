---
schema: 1
id: topic-cluster-content-track
kind: workflow
title: Topic cluster content
description: Builds a topic cluster in gated steps, from choosing a topic the business can own to keyword clusters, a pillar and supporting page plan, briefs, linking and a 60-day measurement check.
category: seo
version: 1.0.0
status: incubating
stage: [discover, plan, build, review]
role: [marketer, writer, content-creator]
requires: [none]
inputs: [text, notes, dataset]
output: [plan, outline, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [topic-clusters, pillar-pages, content-briefs, internal-links]
pairs_with:
  prompts: [research-keywords, write-seo-content-brief, write-pillar-page, build-internal-linking-plan, mine-customer-language-for-keywords]
args:
  - name: business
    description: What the business sells, to whom and where, what it knows first-hand that competitors do not, existing content worth keeping, and any keyword or Search Console data you have.
    type: text
    required: true
  - name: topic_idea
    description: A topic you have in mind, if any (for example "home EV charging"). Leave as is to get candidates.
    type: string
    default: none yet
  - name: capacity
    description: How much content you can produce and when (for example "2 articles a month, one writer").
    type: string
    default: not stated
steps:
  - {id: choose, file: steps/01-choose-topic.md, stage: discover, gate: approve, artifact: "cluster/01-topic.md"}
  - {id: research, file: steps/02-research-keywords.md, stage: discover, gate: approve, artifact: "cluster/02-keyword-clusters.md"}
  - {id: map, file: steps/03-plan-pages.md, stage: plan, gate: approve, artifact: "cluster/03-page-map.md"}
  - {id: briefs, file: steps/04-write-briefs.md, stage: build, gate: approve, artifact: "cluster/04-briefs.md"}
  - {id: link-measure, file: steps/05-link-and-measure.md, stage: review, gate: none, artifact: "cluster/05-links-and-measurement.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Builds one topic cluster the way a content lead at a small business would: choose a topic the business can credibly cover and that leads to what it sells, find the real questions inside it, plan a pillar page and a few supporting pages with no overlap, brief each page, link them, and check results after 60 days. Each step writes one artifact and stops for approval.

<business>
{{business}}
</business>

Topic idea: {{topic_idea}}
Capacity: {{capacity}}

Rules for every step:
- If the business description does not say what it sells, to whom and where, ask for that before step 1 and stop.
- If capacity is not stated, ask for it in step 1's open questions. If it is still unknown at step 3, plan for two pages a month and label that as an assumption.
- Use only facts and data the user gave. Label search volumes and difficulty as tool estimates or "unknown until checked"; never invent them, or competitors, sources or statistics.
- One search intent per page. If two planned pages would answer the same query, merge them.
- Prefer fewer, deeper pages the business can actually produce within its capacity over a large plan it cannot finish.
- Plan content that shows first-hand experience; mark where the business must supply photos, data or examples with [X].
- No doorway pages, keyword stuffing or scaled thin content.
- End each artifact with open questions, then stop for approval.
