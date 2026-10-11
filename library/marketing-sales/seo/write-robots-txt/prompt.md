---
schema: 1
id: write-robots-txt
kind: prompt
title: Write or review a robots.txt
description: Writes or reviews a robots.txt for a site's platform and needs, explains each rule, covers search and AI crawler choices, and says what robots.txt cannot do.
category: seo
version: 1.0.0
status: incubating
stage: [build, review]
role: [marketer, founder, frontend-engineer, devops-engineer]
requires: [none]
inputs: [config, text]
output: [config, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [robots-txt, crawling, ai-crawlers, crawl-budget, site-config]
pairs_with:
  prompts: [audit-technical-seo, optimize-for-ai-search]
args:
  - name: site
    description: The site's platform (WordPress, Shopify, custom app), main sections and URL patterns (search, filters, cart, account, admin, staging), and sitemap URL.
    type: text
    required: true
  - name: current_file
    description: The current robots.txt, if any, to review.
    type: text
  - name: goals
    description: What you want, for example "stop crawl of filter URLs", "allow AI search citations but not training", "block everything on staging". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Review, robots.txt, Rule by rule, AI crawlers, What robots.txt cannot do, Test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a technical SEO who writes robots.txt files. Robots.txt controls crawling, not indexing: a URL blocked in robots.txt can still appear in search results (without a snippet) if other pages link to it, and a noindex on a blocked page is never seen. It is a public file and a polite request that reputable crawlers follow; it is not security. Google and Bing follow the Robots Exclusion Protocol standard: groups by `User-agent`, `Allow` and `Disallow` with `*` and `$` wildcards, the most specific (longest) matching rule wins, paths are case-sensitive, and a crawler obeys only the most specific group that names it, not the `*` group as well. Google ignores `Crawl-delay` and `noindex` lines in robots.txt; some other crawlers honour `Crawl-delay`.

The common, costly mistakes: blocking CSS and JavaScript that pages need to render, a leftover `Disallow: /` from staging, blocking a section that holds the only links to important pages, using robots.txt to "remove" pages that should get noindex or a 404, and assuming a block on one bot covers its sibling bots. Platforms such as Shopify and WordPress generate a default file; changing it needs the platform's own method.
</context>

<task>
Write or review a robots.txt.

<site>
{{site}}
</site>

{{#current_file}}<current_file>
{{current_file}}
</current_file>{{/current_file}}

{{#goals}}<goals>
{{goals}}
</goals>{{/goals}}

1. **Review:** if a current file is given, list each problem: rules that block rendering resources or important pages, rules that do nothing, syntax errors, groups that override each other unexpectedly, and goals it does not meet.
2. **robots.txt:** the full proposed file, with short comments, ending with the `Sitemap:` line or lines. On platforms with a generated file, say how to edit it (for example a robots.txt template or an SEO plugin setting) and keep platform defaults that are sensible.
3. **Rule by rule:** what each group and rule does, with an example URL that is blocked and one that is allowed.
4. **AI crawlers:** explain the choice between crawlers that fetch pages for AI search answers or user-requested browsing, and crawlers or tokens used for model training, naming examples per vendor (such as OAI-SearchBot and ChatGPT-User versus GPTBot; Google-Extended as a training control token separate from Googlebot; Claude-SearchBot and Claude-User versus ClaudeBot; PerplexityBot; CCBot; Applebot-Extended). Say that names change and to confirm each against the vendor's current documentation, and that blocking a crawler does not remove content already collected.
5. **What robots.txt cannot do:** remove pages from the index, protect private content, or stop bad bots; name the right tool for each (noindex, 404 or 410, authentication, firewall or rate limits).
6. **Test:** how to check the file before and after deploying: Search Console's robots.txt report, a URL Inspection test on key URLs, and fetching the file to confirm it returns 200 with the right content type.
</task>

<constraints>
- Never block CSS, JavaScript or image paths that pages need to render unless the user explains why.
- Do not use robots.txt to hide sensitive URLs; listing them advertises them.
- For staging or development sites, recommend authentication over robots.txt, and warn about copying the staging file to production.
- Do not present AI crawler names or their behaviour as permanent fact; tell the user to verify.
</constraints>

<output_format>
## Review
Bullets, or "No current file supplied".

## robots.txt
A code block with the full file.

## Rule by rule
A table: Rule | Effect | Blocked example | Allowed example.

## AI crawlers
Bullets with the chosen setting and why.

## What robots.txt cannot do
Bullets.

## Test
A checklist.
</output_format>
