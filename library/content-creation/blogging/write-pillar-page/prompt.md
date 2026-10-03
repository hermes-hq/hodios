---
schema: 1
id: write-pillar-page
kind: prompt
title: Write a pillar page
description: Writes a comprehensive pillar page that covers a broad topic in depth, links out to cluster posts at the right moments and opens with a navigable summary. Use when anchoring a topic cluster.
category: blogging
version: 1.0.0
status: incubating
stage: [design, build]
role: [writer, marketer, content-creator, founder]
inputs: [topic, notes, url]
output: [article, outline, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [topic-cluster, internal-linking, long-form, content-hub]
pairs_with:
  prompts: [write-seo-content-brief, build-internal-linking-plan, define-content-pillars]
args:
  - name: topic
    description: The broad topic the page owns, what you or your business know about it first-hand, and any notes, data or examples to include.
    type: text
    required: true
  - name: cluster_posts
    description: Existing or planned cluster posts, one per line as title plus URL or "planned". Leave empty to get a proposed cluster.
    type: text
  - name: audience
    description: Who lands on the page and what they are trying to do or decide.
    type: string
output_contract:
  format: markdown
  sections: [Page plan, Pillar page, Link map, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a content strategist and long-form editor who builds topic hubs. A pillar page covers a broad topic well enough to be the best single starting point on it, and hands readers off to narrower cluster posts for depth. Its job is both editorial and structural: readers need a summary they can navigate and a page that answers the main questions without forcing them to click, while the site needs each cluster post linked from the place in the pillar where a reader would naturally want more, and linked back. Pillars fail when they are a thin index of links, when they try to contain every cluster post in full and become unreadable, or when they repeat the clusters word for word so that the pages compete with each other.
</context>

<task>
Write a pillar page on the topic below.

Audience: {{audience}}

<topic_and_material>
{{topic}}
</topic_and_material>

<cluster_posts>
{{cluster_posts}}
</cluster_posts>

1. If the audience is empty, infer the most likely reader and their goal and state it.
2. **Page plan.** List the six to ten questions a reader new to this topic needs answered, in the order they would ask them. Map each to a pillar section. For each cluster post, choose the single section where it belongs; if cluster posts are missing, propose cluster topics for the uncovered questions and mark them "planned".
3. **Write the pillar page:**
   - H1 and a two-to-three sentence intro that says who the page is for and what they will be able to do.
   - "On this page" summary: one line per section, phrased as the answer or benefit, linking to anchors.
   - Sections in the planned order. Each answers its question fully enough to stand alone at an overview level (roughly 150 to 400 words), then hands off: "For a step-by-step guide, see [cluster title](URL)". Place links in the sentence where depth is needed, with descriptive anchor text, never "click here".
   - Use tables, short lists or a simple decision guide where readers compare options.
   - A closing section on where to start depending on the reader's situation.
4. **Link map.** A table of every cluster post: the pillar section and anchor text that link to it, and the sentence in the cluster post that should link back.
5. **Gaps.** Questions the material could not answer, and claims needing sources.
</task>

<constraints>
- Overview depth in the pillar; detail in the clusters. Do not paste cluster content into the pillar.
- Use the author's material and first-hand knowledge as the backbone. Statistics, dates, regulations and product specifics not in the material become `[SOURCE NEEDED: …]`; never invent them or their sources.
- Never invent URLs. Use the URLs given; for planned posts write `[URL: planned]`.
- Plain language, short paragraphs, descriptive H2s that state the point. No keyword stuffing.
</constraints>

<output_format>
## Page plan
The reader, the question list mapped to sections, and the cluster assignments.

## Pillar page
The full page in Markdown.

## Link map
| Cluster post | Pillar section | Anchor text | Link-back sentence |

## Gaps
Bulleted open questions and claims to source.
</output_format>
