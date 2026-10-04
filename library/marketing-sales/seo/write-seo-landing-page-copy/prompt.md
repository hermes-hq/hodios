---
schema: 1
id: write-seo-landing-page-copy
kind: prompt
title: Write SEO landing page copy
description: Writes landing page copy built for search and conversion - title tag, meta description, H1, sections, CTAs and alt text - around a primary keyword and its search intent, without stuffing.
category: seo
version: 1.0.0
status: incubating
aliases: [product-landing-page-seo]
stage: [build]
role: [marketer, copywriter, founder, product-manager]
requires: [none]
inputs: [text]
output: [copy, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [landing-page, meta-description, title-tag, search-intent, conversion-copy]
pairs_with:
  prompts: [research-keywords, write-landing-page-copy, audit-on-page-seo, write-schema-markup]
  personas: [seo-strategist, copywriter]
args:
  - name: product
    description: What the product or offer is, who it is for, the main benefits, proof you can use (numbers, customers, reviews you are allowed to quote) and the conversion goal of the page.
    type: text
    required: true
  - name: keywords
    description: The primary keyword and three to six secondary keywords or questions, ideally from keyword research, with the search intent if known.
    type: text
    required: true
  - name: voice
    description: Brand voice notes or a sample of existing copy.
    type: text
output_contract:
  format: markdown
  sections: [Search intent, Page copy, SEO notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A landing page ranks when it is the best answer to what the searcher wants, and converts when it makes the offer clear and credible. Keywords tell search engines and readers that the page is relevant; repeating them does not. The copy should satisfy the intent behind the primary keyword first, cover the secondary questions people ask, and lead to one clear action.
{{#voice}}
Voice: {{voice}}
{{/voice}}
</context>

<task>
Product:
<product>
{{product}}
</product>

Keywords:
<keywords>
{{keywords}}
</keywords>

1. Name the search intent behind the primary keyword (informational, commercial, transactional or navigational) and what the searcher needs to see to stay. If the keyword's intent does not match a landing page for this product, say so and suggest a better keyword or page type.
2. Write the page, ready to paste:
   - Title tag: under 60 characters, primary keyword near the front, compelling.
   - Meta description: 150 to 160 characters, includes the primary keyword and a reason to click.
   - H1: one, with the primary keyword used naturally, speaking to the intent.
   - Hero copy: two or three sentences with the core value proposition.
   - Three to five H2 sections that map to secondary keywords or the questions searchers ask, each with two to four sentences of body copy.
   - Proof: where and how to use the evidence given.
   - CTAs: primary and secondary button text and the microcopy around them.
   - Alt text for the key images.
3. Mark the primary keyword as **[P]** and secondary keywords as **[S]** inline where they appear.
4. Add short SEO notes: why each section exists, internal links to add, and the structured data type that fits the page.
</task>

<constraints>
- Read naturally; never stuff keywords. Use each keyword where it helps the reader.
- Use only proof that is in the input; do not invent statistics, customers, reviews or awards. Use [BRACKETS] for proof to add.
- Respect the character limits and count them.
- Keep one primary conversion goal.
</constraints>

<output_format>
## Search intent
Two or three sentences.
## Page copy
The page outline in order, with every element labelled and keywords marked.
## SEO notes
Short bullets.
</output_format>
