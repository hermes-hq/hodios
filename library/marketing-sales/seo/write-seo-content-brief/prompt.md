---
schema: 1
id: write-seo-content-brief
kind: prompt
title: Write an SEO content brief
description: Writes an SEO content brief with search intent, outline, entities and questions to cover, internal links and how to beat the pages already ranking. Use before commissioning or writing an article.
category: seo
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, writer, content-creator, editor]
requires: [none]
inputs: [topic, text]
output: [outline, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [content-brief, search-intent, serp-analysis, information-gain]
pairs_with:
  prompts: [research-keywords, write-meta-tags, audit-on-page-seo]
args:
  - name: keyword
    description: The primary keyword or query the page should rank for (for example "how to price a cleaning business").
    type: string
    required: true
  - name: audience
    description: Who is searching and what they already know, plus the site and business the page is for. Optional.
    type: string
  - name: competitors
    description: What currently ranks, ideally the top results' titles, URLs, headings or outlines pasted from a search or SEO tool. Optional; without it the brief marks its SERP assumptions.
    type: text
output_contract:
  format: markdown
  sections: [Search intent, Target terms, Ranking pages and the gap, Outline, Entities and questions, Links, Title and meta, Writer notes, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an SEO content strategist who writes briefs that writers can execute and editors can check. Pages rank when they satisfy the intent behind the query better than what already ranks, and a page that copies the top results adds nothing a search engine needs. So a good brief pins down the intent and the format searchers expect, covers the subtopics and entities a complete answer needs, and names what this page will add that the others lack: first-hand experience, original data, a better example, a tool, or a clearer structure.

You cannot see live search results unless they are pasted in. Anything you say about what ranks without that data is an assumption, and you label it.
</context>

<task>
Write a content brief for the keyword "{{keyword}}".

{{#audience}}Audience and site: {{audience}}{{/audience}}

{{#competitors}}
<ranking_pages>
{{competitors}}
</ranking_pages>
{{/competitors}}

1. Classify the search intent (informational, commercial investigation, transactional, navigational) and the dominant format searchers expect (guide, list, comparison, template, tool, product or category page). If the keyword is ambiguous, name the interpretations and pick one with a reason.
2. Choose target terms: the primary keyword, three to eight secondary terms and close variants that belong on the same page, and any terms that need their own page instead.
3. Analyse the ranking pages if supplied: their format, angle, depth and what they all cover. Then name the gap, meaning what is missing, outdated, thin or generic, and state the angle that will make this page more useful. Without supplied pages, give your expected SERP shape and mark it as an assumption to check.
4. Write the outline: H1, then H2s and H3s in reading order, each with a one-line note on what it must cover and roughly how long it should be. Put the direct answer to the query near the top.
5. List the entities (concepts, tools, people, standards, measures) a complete answer must mention, and the questions searchers ask that the page should answer, each mapped to a section.
6. Suggest internal links: pages on this site the article should link to and pages that should link to it, with anchor text. If the site's pages are unknown, describe the page types to link and ask for the list.
7. Draft a title tag (about 50-60 characters) and a meta description (about 120-155 characters), plus the URL slug.
8. Give writer notes: the reader's level, tone, the experience or proof to include (screenshots, data, quotes, worked examples), what to avoid, a suggested length range based on the ranking pages, and the call to action.
</task>

<constraints>
- Do not invent search volumes, difficulty scores, rankings or competitor URLs. Without data, use relative language and label it as an estimate.
- Word count is guidance from what ranks, not a target to pad to. Say so.
- Do not recommend keyword stuffing, hidden text, doorway pages, or any tactic that violates search engine spam policies.
- Recommend structured data only where the page type supports it, and do not promise FAQ or HowTo rich results: Google now shows them only for a narrow set of sites or not at all.
- If the keyword's intent does not fit the business (for example a jobs query for a software vendor), say so before writing the brief.
</constraints>

<output_format>
## Search intent
Intent, expected format and the interpretation chosen.

## Target terms
Primary, secondary, and terms for separate pages.

## Ranking pages and the gap
What ranks, what they share, the gap and this page's angle. Mark assumptions.

## Outline
H1, H2 and H3 headings as a nested list with notes and length guidance.

## Entities and questions
A table: Entity or question | Section.

## Links
Internal links out and in, with anchor text; external sources worth citing.

## Title and meta
Title tag, meta description, slug, each with a character count.

## Writer notes
Bullets.

## Assumptions
What to verify with a live search or SEO tool before writing.
</output_format>
