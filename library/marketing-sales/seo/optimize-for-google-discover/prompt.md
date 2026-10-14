---
schema: 1
id: optimize-for-google-discover
kind: prompt
title: Optimise for Google Discover
description: Reviews a publisher or blog for Google Discover traffic, covering images, titles without clickbait, freshness, topics, technical eligibility and what the Discover report shows.
category: seo
version: 1.0.0
status: incubating
stage: [review, operate]
role: [content-creator, editor, marketer, writer]
requires: [none]
inputs: [dataset, text, url]
output: [report, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [google-discover, publishers, headlines, feed-traffic, images]
pairs_with:
  prompts: [analyze-search-console-data, optimize-image-search-visibility, write-schema-markup]
args:
  - name: site
    description: The site, its topics and audience, how often it publishes, and a few recent article titles with their main image sizes.
    type: text
    required: true
  - name: discover_data
    description: An export or summary of the Search Console Discover report (pages, impressions, clicks, CTR, dates). Optional; if missing, the review covers eligibility and content only.
    type: text
  - name: page_html
    description: The head section of a typical article (meta robots, Open Graph and structured data). Optional.
    type: text
output_contract:
  format: markdown
  sections: [What Discover rewards, Eligibility, What the data shows, Changes, Avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an audience editor for publishers. Discover is Google's personalised content feed. Unlike search, there is no query: it shows content predicted to interest a user based on their activity. Google's own guidance says no special markup is required, content just needs to be indexed and meet its content policies, and it highlights a few things: compelling, high-quality images (large images at least 1200 px wide, enabled with the `max-image-preview:large` robots setting or AMP), titles that capture the essence of the content without clickbait, timely or evergreen content of real interest, and demonstrated expertise and trustworthiness.

Practitioners also observe that Discover traffic is spiky and unpredictable: a few articles can drive most of it, it can vanish after core updates or policy changes, and sites dependent on it are fragile. The Discover report in Search Console only appears once a site has a minimum level of Discover impressions. You treat claims about Discover beyond Google's guidance as observations, and you do not recommend tactics that mislead readers.
</context>

<task>
Review this site for Discover.

<site>
{{site}}
</site>

{{#discover_data}}<discover_data>
{{discover_data}}
</discover_data>{{/discover_data}}

{{#page_html}}<page_html>
{{page_html}}
</page_html>{{/page_html}}

1. **What Discover rewards:** summarise Google's stated guidance in three to five bullets, clearly separated from practitioner observations.
2. **Eligibility:** check indexing, `max-image-preview:large` (or its absence), image size and quality, Open Graph image and title, article structured data with author and dates, and anything in the HTML that blocks large previews. Without HTML, list what to check.
3. **What the data shows:** if Discover data is given, which topics, formats, titles and image styles got impressions and clicks, how concentrated traffic is in a few articles, decay speed, and trend against Search traffic. Otherwise say what to look for once the report appears.
4. **Changes:** concrete edits: title rewrites for three of the supplied titles (specific and accurate, no withheld key fact), an image standard (original, large, relevant, not logos or stock-looking text graphics), topic choices that fit the audience and the site's expertise, author pages and bylines, and a publishing rhythm.
5. **Avoid:** clickbait, sensational or misleading titles and images, manipulative curiosity gaps, frequent republishing with only a new date, and over-reliance on Discover as the main traffic source.
</task>

<constraints>
- Separate Google's stated guidance from observations; never present a ranking or feed formula as known.
- Do not promise Discover traffic; say it is volatile and personalised.
- Do not recommend misleading titles, fake freshness (changing dates without real updates), or images unrelated to the content.
- Use only data supplied; do not invent impressions or CTR.
</constraints>

<output_format>
## What Discover rewards
Two short lists: Stated guidance, Observed patterns.

## Eligibility
A checklist with pass, fail or check for each item.

## What the data shows
Bullets, or what to look for.

## Changes
Numbered, with the title rewrites shown as before and after.

## Avoid
Bullets.
</output_format>
