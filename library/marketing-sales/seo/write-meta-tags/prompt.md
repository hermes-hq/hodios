---
schema: 1
id: write-meta-tags
kind: prompt
title: Write meta tags
description: Writes title tags and meta descriptions for a set of pages that match search intent, stay within display limits and are unique across the site. Use for new pages or a site-wide metadata cleanup.
category: seo
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, content-creator, founder]
requires: [none]
inputs: [text, url]
output: [table, copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [title-tags, meta-descriptions, serp-snippets, click-through-rate]
pairs_with:
  prompts: [audit-on-page-seo, write-seo-content-brief, research-keywords]
args:
  - name: pages
    description: One block per page with its URL or name, what the page is about, its target keyword if known, and any current title or description. A pasted crawl export works too.
    type: text
    required: true
  - name: brand
    description: The brand name to append to titles (for example "Northwind"). Optional; titles are written without a brand suffix if empty.
    type: string
output_contract:
  format: markdown
  sections: [Meta tags, Issues found]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a technical SEO specialist writing search snippets. The title tag is a ranking signal and the headline of the search result; the meta description is not a ranking signal, but it is the pitch that earns the click. Search engines rewrite titles and descriptions that are vague, stuffed or mismatched with the page, so the safest snippets describe the page accurately in the searcher's words.

Display is limited by pixel width, which works out to roughly 50-60 characters for titles and roughly 120-155 characters for descriptions before truncation. Text past that is not wasted for ranking but is often cut off on screen.
</context>

<task>
Write title tags and meta descriptions for these pages.

<pages>
{{pages}}
</pages>

{{#brand}}Brand: {{brand}}{{/brand}}

1. For each page, identify the search intent behind its target keyword (or the keyword it most plausibly targets, marked as inferred) and what a searcher needs to see to click.
2. Write the title tag:
   - Primary keyword near the start, written naturally.
   - A specific differentiator or qualifier where it helps (the year only for content that is genuinely updated yearly, a number, "for beginners", "free template", a price, a location).
   - The brand at the end after a separator ( | or - ) for inner pages if a brand is given; the brand first only on the home page.
   - About 50-60 characters. Count them.
3. Write the meta description:
   - Match the intent: answer or promise for informational pages; offer, proof and a call to action for commercial pages.
   - Include the primary keyword or a close variant once, since matching words are often bolded.
   - About 120-155 characters. Count them.
4. Make every title and description unique across the set. If two pages target the same keyword, flag them as competing with each other and suggest how to separate them.
</task>

<constraints>
- Describe only what the page contains. No promises the page does not keep (prices, "free", discounts, guarantees) unless they are in the page info.
- No keyword stuffing, no repeated keywords, no all caps, no emoji unless the brand clearly uses them.
- Avoid double quotation marks in descriptions, because some systems cut text at the quote.
- If a page's content is unclear from the input, write your best version and mark it "needs page review".
- Count characters precisely; when unsure, stay below the upper limit rather than above it.
</constraints>

<output_format>
## Meta tags
A table: Page | Intent | Title tag | Title characters | Meta description | Description characters.

## Issues found
Bullets: competing pages, pages whose content was unclear, current titles or descriptions that should change and why. Write "None" if there are none.
</output_format>
