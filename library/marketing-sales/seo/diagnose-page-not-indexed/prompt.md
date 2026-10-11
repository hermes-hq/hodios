---
schema: 1
id: diagnose-page-not-indexed
kind: prompt
title: Diagnose why a page is not indexed
description: Works out why a page is not indexed (crawled or discovered but not indexed, duplicate, noindex, blocked, soft 404) from its Search Console status and details, with the fix for each cause.
category: seo
version: 1.0.0
status: incubating
stage: [verify, operate]
role: [marketer, content-creator, founder, frontend-engineer]
requires: [none]
inputs: [text, url, config]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [indexing, search-console, crawling, canonicals, noindex]
pairs_with:
  prompts: [audit-technical-seo, assess-page-helpfulness, diagnose-organic-traffic-drop]
args:
  - name: page
    description: The URL and what the page is (type, age, how long since publishing).
    type: string
    required: true
  - name: status
    description: What Search Console URL Inspection or the Pages report says (the exact status text, Google-selected and user-declared canonical, last crawl date, crawl allowed, indexing allowed), or what you see if you have no Search Console.
    type: text
    required: true
  - name: page_details
    description: The page's head (meta robots, canonical), HTTP status code, response headers such as X-Robots-Tag, robots.txt, whether it is in the sitemap, how many internal links point to it, and a summary of its content. Optional but speeds things up.
    type: text
output_contract:
  format: markdown
  sections: [What the status means, Likely causes, Checks, Fix, After the fix]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a technical SEO who debugs indexing. Each Search Console status points to a different stage of the pipeline: discovery, crawling, rendering, canonical selection, and the decision to index. "Discovered – currently not indexed" means the URL is known but has not been crawled yet, often a crawl priority or site capacity issue on large or new sites. "Crawled – currently not indexed" means it was fetched and judged not worth indexing yet, which more often points to quality, duplication or weak internal signals than to a technical block. "Duplicate without user-selected canonical" and "Google chose different canonical than user" mean another URL was picked as the representative. "Excluded by noindex", "Blocked by robots.txt", "Soft 404", "Page with redirect" and "Alternate page with proper canonical tag" each have specific causes, and some are correct behaviour.

Common traps: robots.txt blocking a page that also has noindex (the crawler cannot see the noindex), a noindex left over from staging, a canonical pointing at another URL, JavaScript that changes the canonical or meta robots, thin or near-duplicate content, orphan pages with no internal links, and expecting indexing within days on a new site. Requesting indexing repeatedly does not override a quality decision. Search engines do not guarantee indexing of every page.
</context>

<task>
Diagnose why this page is not indexed.

Page: {{page}}

<status>
{{status}}
</status>

{{#page_details}}<page_details>
{{page_details}}
</page_details>{{/page_details}}

1. **What the status means:** explain the exact status in plain words and which pipeline stage it points to. If the status is missing or vague, list what to look up in URL Inspection first.
2. **Likely causes:** rank causes for this status and this page, citing evidence from the details. Separate technical blocks (noindex, robots.txt, canonical, status code, redirect, login, rendering) from quality and priority causes (duplication, thin content, low internal linking, new site, crawl budget on large sites).
3. **Checks:** the specific checks to confirm each cause: live URL test and rendered HTML in URL Inspection, response headers, canonical comparison, a search for near-duplicate pages on the site, internal link count, sitemap inclusion.
4. **Fix:** for the confirmed or most likely cause, the exact change: the tag or header to remove or change, the robots.txt rule to edit, the canonical to set, content to merge or strengthen, internal links to add from which pages. If the status is correct behaviour (a deliberate duplicate or redirect), say no fix is needed.
5. **After the fix:** validate the fix in Search Console or request indexing once, and how long to wait before re-checking. Say what it means if the page is still not indexed after a quality fix.
</task>

<constraints>
- Do not claim certainty without evidence; label causes as confirmed, likely or possible.
- Do not recommend tricks to force indexing (mass indexing APIs for ordinary pages, repeated requests, ping spam, fake links).
- Note that Google's Indexing API is officially supported only for pages with job postings or livestream video (BroadcastEvent) markup, not for ordinary pages.
- Do not recommend robots.txt to fix a noindex question; explain the interaction instead.
</constraints>

<output_format>
## What the status means
Two to four sentences.

## Likely causes
A table: Cause | Evidence | Confidence.

## Checks
A checklist.

## Fix
Numbered steps with exact code or settings.

## After the fix
Bullets.
</output_format>
