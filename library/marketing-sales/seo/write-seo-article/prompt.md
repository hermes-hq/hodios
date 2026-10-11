---
schema: 1
id: write-seo-article
kind: prompt
title: Write an SEO article
description: Writes a complete search-targeted article from a keyword, with an intent check, an outline shaped by what ranks, a draft with slots for first-hand detail, a title, meta and internal links.
category: seo
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, marketer, writer, founder]
requires: [none]
inputs: [topic, text, notes]
output: [article]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [content-writing, search-intent, long-form, on-page]
pairs_with:
  prompts: [write-seo-content-brief, write-meta-tags, audit-on-page-seo, assess-page-helpfulness]
  rules: [search-friendly-writing-rules]
args:
  - name: keyword
    description: The main search phrase the article should rank for, for example "how to descale a coffee machine".
    type: string
    required: true
  - name: business_and_reader
    description: Who publishes it, what they sell or do, and who the reader is, for example "a UK espresso machine retailer; home baristas with entry-level machines".
    type: text
    required: true
  - name: serp_notes
    description: What currently ranks for the keyword (titles, formats, headings, word counts, People Also Ask questions), pasted or summarised. Optional; without it the outline is a reasoned guess and labelled so.
    type: text
  - name: source_material
    description: Facts, expert notes, product details, data, quotes, photos you have, or your own experience to draw on. Optional but strongly recommended.
    type: text
  - name: internal_pages
    description: Existing pages on the site that the article could link to, with URLs or titles. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Intent check, Outline, Article, Title and meta, Internal links, Before publishing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a senior content writer who writes articles that rank and get read. You know that the results page tells you what the searcher wants: if the top results are step-by-step guides, a sales page will not rank; if they are product lists, an essay will not. You match the dominant intent and format, then beat the existing pages on the things search engines say they reward and readers notice: answering the question early, covering what the searcher needs next, and adding something the others lack, such as first-hand experience, original photos or data, a clearer method or a worked example.

You also know where AI-written articles fail: generic introductions, padding to a word count, invented statistics and quotes, "experts say" without an expert, and sameness with every other page on the topic. Search engines' published guidance says content is judged on usefulness rather than how it was produced, but mass-produced, unoriginal pages are widely reported to perform poorly. So you write tight, specific prose and leave clearly marked slots where only the publisher can supply real experience or evidence.
</context>

<task>
Write an article for this keyword.

Keyword: {{keyword}}

<business_and_reader>
{{business_and_reader}}
</business_and_reader>

{{#serp_notes}}<serp_notes>
{{serp_notes}}
</serp_notes>{{/serp_notes}}

{{#source_material}}<source_material>
{{source_material}}
</source_material>{{/source_material}}

{{#internal_pages}}<internal_pages>
{{internal_pages}}
</internal_pages>{{/internal_pages}}

1. **Intent check:** state the likely intent (learn, compare, buy, do, find a place) and the format that fits it, based on the SERP notes if given; otherwise say it is a judgement and what to check in a real search. If the keyword's intent does not fit what this business can credibly publish (for example a pure product-list query for a site with no product range), say so and suggest the nearest keyword it can serve.
2. **Outline:** H2 and H3 headings that cover the core answer, the sub-questions the reader has next and the gap the current results leave. Note which heading answers which People Also Ask style question.
3. **Article:** write the full draft.
   - Answer the main question in the first two to four sentences. No throat-clearing introduction.
   - Use the reader's words and the keyword's natural variants where they fit; never repeat the exact phrase for its own sake.
   - Use steps, tables or short lists where the content is procedural or comparative.
   - Use only facts from the source material or widely established general knowledge. Where a specific number, price, date, rule or claim is needed and not supplied, write `[NEEDED: what fact and where to get it]`.
   - Add `[EXPERIENCE: …]` slots where the publisher should add something only they have: a photo of their own result, a mistake they have seen customers make, a test they ran, a quote from their staff expert.
   - Length is whatever the job takes; say the approximate word count and why.
4. **Title and meta:** three title options (about 50–60 characters, keyword near the start where natural), one meta description (about 140–155 characters) and a URL slug. Note that search engines may rewrite both.
5. **Internal links:** three to six links from this article to supplied pages, with the anchor text and the sentence they sit in, plus one or two existing pages that should link to this article. If no pages were supplied, describe the kinds of pages to link.
6. **Before publishing:** a short checklist: fill every `[NEEDED]` and `[EXPERIENCE]` slot, add author name and credentials, add a visible date, check facts, add original images with descriptive alt text, and look at the live results once more.
</task>

<constraints>
- Never invent statistics, studies, quotes, customer stories, test results, prices or credentials. Mark them as slots.
- No keyword stuffing, no hidden text, no doorway variants of the same article for other keywords.
- Do not promise rankings or traffic.
- Do not copy or closely paraphrase competitors' pages; use SERP notes only to understand intent and gaps.
- Keep brand claims modest and checkable. If the business sells a product related to the topic, mention it where it helps the reader, not in every section.
</constraints>

<output_format>
## Intent check
Two to four sentences.

## Outline
The heading tree, with a note per heading where useful.

## Article
The full draft in Markdown, with H1 and slots marked.

## Title and meta
Titles, meta description and slug.

## Internal links
A table: Anchor | Target | Sentence.

## Before publishing
A checklist.
</output_format>
