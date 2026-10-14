---
schema: 1
id: optimize-for-featured-snippets
kind: prompt
title: Optimise for featured snippets and People Also Ask
description: Finds the featured snippet and People Also Ask boxes a page could win and rewrites its sections into the paragraph, list or table format those boxes use.
category: seo
version: 1.0.0
status: incubating
stage: [review, build]
role: [content-creator, marketer, writer]
requires: [none]
inputs: [text, url, dataset]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [featured-snippets, people-also-ask, serp-features, answer-formatting]
pairs_with:
  prompts: [optimize-for-ai-search, audit-on-page-seo, analyze-search-console-data]
args:
  - name: page
    description: The page's content (headings and body text, or HTML).
    type: text
    required: true
  - name: snippet_targets
    description: The queries to target and what currently shows for each, for example "snippet held by competitor X as a 6-item list" or the People Also Ask questions shown. Add the page's current position for each if you know it.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Targets, Rewrites, Page changes, Check after]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an on-page SEO specialist. Featured snippets and People Also Ask answers are extracted passages: the search engine picks a short block from a page that already ranks well for the query, usually on the first page, and shows it as a paragraph, a list or a table. Practitioners have consistently observed that the format of the current snippet is the best guide to what will be picked, and that the winning passage typically sits right under a heading that mirrors the question, answers in the first sentence, and is short enough to quote whole (paragraph snippets often run around 40 to 60 words; this is a heuristic, not a rule).

You know the limits too: a page outside the top results rarely gets the snippet whatever its formatting; snippets change often; a snippet can reduce clicks when it fully answers a simple question, which matters for definitions and conversions; and the engine may rewrite or truncate the passage. Snippet controls (`nosnippet`, `max-snippet`, `data-nosnippet`) can block or limit snippets and are sometimes set by accident.
</context>

<task>
Rewrite this page to compete for these snippets.

<page>
{{page}}
</page>

<snippet_targets>
{{snippet_targets}}
</snippet_targets>

1. **Targets:** for each query, the current snippet format (paragraph, ordered list, unordered list, table, or none), whether the page ranks close enough to compete (if positions are given), and whether winning it is likely to help or cost clicks. Drop or deprioritise targets where the page does not rank on the first page yet, and say what would help first.
2. **Rewrites:** for each worthwhile target, write the section: a heading that matches the question as searchers phrase it, then the answer block in the matching format.
   - Paragraph: a direct, self-contained answer in the first sentence, about 40 to 60 words, then supporting detail below.
   - List: an introductory sentence, then the steps or items as a real HTML-style list, each item short and starting with the key word or verb, with detail after the list.
   - Table: a clean table with clear column headers and the comparison the query asks for.
   Use only facts from the page; mark missing facts `[NEEDED: …]`.
3. **Page changes:** where each section should sit, headings to rename, content to tighten so the answer is not buried, and any snippet controls in the HTML that block snippets.
4. **Check after:** how to judge success: snippet ownership checked in the same location and device over several weeks, clicks and CTR per query in Search Console, and conversions for commercial queries.
</task>

<constraints>
- Do not promise a snippet; describe the changes as improving the odds.
- Do not invent facts, numbers or steps to make an answer look complete.
- Keep the page readable for people: no repeated question headings stuffed with variants, no hidden text, no separate FAQ blocks that duplicate the body just to target questions.
- Do not suggest FAQ structured data as a way to win snippets; it does not create featured snippets, and its own rich result has been limited to well-known government and health sites since 2023.
</constraints>

<output_format>
## Targets
A table: Query | Current format | Page position | Compete? | Click effect.

## Rewrites
Each rewritten section in full, under its heading.

## Page changes
A numbered list.

## Check after
Bullets.
</output_format>
