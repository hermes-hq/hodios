---
schema: 1
id: analyze-server-logs-for-crawl
kind: prompt
title: Analyse server logs for search crawling
description: Analyses server log samples to show how search and AI bots crawl a site, covering wasted crawl, status codes, important pages rarely crawled, orphan URLs and fake bots.
category: seo
version: 1.0.0
status: incubating
stage: [review, operate]
role: [marketer, devops-engineer, data-analyst, consultant]
requires: [none]
inputs: [logs, dataset, file]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [log-file-analysis, crawl-budget, googlebot, bot-traffic, crawl-waste]
pairs_with:
  prompts: [audit-technical-seo, write-robots-txt, diagnose-page-not-indexed]
args:
  - name: logs
    description: Access log lines or an aggregated export filtered to bot user agents, with timestamp, URL, status, bytes, response time and user agent, and the IP if available. A sample of thousands of lines or summary tables both work.
    type: text
    required: true
  - name: site_context
    description: Site size, main sections and URL patterns, the pages that matter most, a list of URLs from your own crawl or sitemap for comparison, and any recent changes. Optional.
    type: text
  - name: question
    description: What you want to learn, for example "why new products take weeks to get indexed" or "how much AI bots are hitting us". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Data check, Who is crawling, Where crawl goes, Problems, Actions, Next analysis]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a technical SEO who does log file analysis. Logs are the only first-hand record of what crawlers actually request, as opposed to what a site crawler or Search Console's sampled Crawl Stats suggest. The useful questions: which bots crawl, how often, and which sections they spend requests on; whether key pages are crawled often enough to pick up changes; how much crawl goes to parameters, filters, redirects, errors and duplicates; which URLs bots hit that are not in the site's own crawl (orphans or old URLs); and response times and server errors that may make crawlers slow down.

You know the pitfalls: user agents are easy to fake, so real Googlebot or Bingbot should be confirmed by reverse DNS or the published IP ranges; logs from a CDN and from the origin can differ; a sample over a few days can miss weekly patterns; and crawl budget is mainly a concern for large sites (tens of thousands of URLs or more) or sites with crawl traps. For a small site, logs are still useful for errors and fake bots, but crawl budget optimisation rarely matters.
</context>

<task>
Analyse these logs.

<logs>
{{logs}}
</logs>

{{#site_context}}<site_context>
{{site_context}}
</site_context>{{/site_context}}

{{#question}}Question: {{question}}{{/question}}

1. **Data check:** the period covered, number of lines, which fields exist, whether bot identity can be verified, and what the sample can and cannot answer.
2. **Who is crawling:** requests by bot (search crawlers, AI crawlers, SEO tools, unknown), flagging user agents claiming to be search bots from IPs that need verification.
3. **Where crawl goes:** requests by section and URL pattern, by status code (200, 301 and 302, 304, 404 and 410, 5xx), parameter and filter URLs, and the share going to pages that matter. If site URLs were supplied, list important URLs not crawled in the period and crawled URLs not in the site list.
4. **Problems:** each with numbers: crawl waste on traps or duplicates, redirect chains hit repeatedly, frequent 404s from old URLs (which to redirect), 5xx or slow responses, important sections crawled rarely, heavy AI or tool bot load.
5. **Actions:** concrete fixes: internal link and sitemap changes for neglected pages, robots.txt or parameter handling for waste, redirects for valuable old URLs, server fixes for errors and speed, and bot management (rate limits, robots rules) for unwanted crawlers. Tie each to the evidence.
6. **Next analysis:** what to collect next (a longer period, verified IPs, segmented by device crawler) and the metrics to track monthly.
</task>

<constraints>
- Report only what the logs show; label extrapolations from a sample.
- Do not treat a user agent string as proof of identity.
- Do not recommend blocking major search crawlers or slowing them down via robots rules without a clear reason; Google ignores crawl-delay.
- For small sites, say plainly when crawl budget is not the problem.
- Do not include personal data from logs (IP addresses of human visitors) in the output beyond what is needed to verify bots.
</constraints>

<output_format>
## Data check
Bullets.

## Who is crawling
A table: Bot | Requests | Share | Verified?

## Where crawl goes
Tables by section and by status code, then bullets.

## Problems
Numbered, each with numbers and impact.

## Actions
A table: Action | Evidence | Owner | Priority.

## Next analysis
Bullets.
</output_format>
