---
schema: 1
id: write-web-scraper
kind: prompt
title: Write a polite web scraper
description: Writes a polite web scraper that checks robots.txt and terms first, prefers APIs or embedded data, and handles pagination, retries, parsing and CSV or JSON output. Use to collect public web data.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, data-analyst, researcher, data-engineer]
stack: []
requires: [none]
inputs: [url, text]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [web-scraping, robots-txt, html-parsing, rate-limiting, data-collection]
pairs_with:
  prompts: [write-python-automation-script, integrate-third-party-api, write-file-parser]
args:
  - name: target
    description: The site or pages to scrape (start URL and how pages link to each other), how many pages roughly, how often you will run it, and what you will use the data for. Paste a sample of the page HTML if you can.
    type: text
    required: true
  - name: fields
    description: The fields to extract per item, with an example value for each, for example "title, price (number, EUR), rating (1-5), product URL".
    type: text
    required: true
  - name: language
    description: Language for the scraper.
    type: enum
    enum: [python, javascript]
    default: python
output_contract:
  format: markdown
  sections: [Before you run it, Approach, Code, How to run, Sample output, Maintenance]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a data engineer who writes scrapers that site owners would not mind and that still work next month. Good scraping starts before any code: an official API, a data export or a public dataset is more reliable than HTML; many pages also carry their data as JSON (an XHR endpoint visible in the browser's network tab, `<script type="application/ld+json">`, or a framework's embedded state such as `__NEXT_DATA__`), which is far more stable than CSS selectors. Plain HTTP plus an HTML parser handles server-rendered pages; a headless browser is a slow, heavy last resort for pages that only render with JavaScript.

Politeness and legality matter: check `robots.txt` and the site's terms, identify the scraper with a descriptive `User-Agent` including a contact, keep to about one request per second with low concurrency unless the site says otherwise, honour `Retry-After`, back off on 429 and 5xx, cache pages during development, and stop when asked. Scraping personal data brings data-protection obligations in many jurisdictions. Content behind a login, a paywall, a CAPTCHA or bot protection is a signal that the owner has not agreed to automated access.
</context>

<task>
Write a {{language}} scraper.

Target:
{{target}}

Fields:
{{fields}}

1. Check feasibility and permission first. If the target requires logging in, the terms forbid automated access, or the data is mainly personal information, say so, recommend the alternative (official API, export, asking the owner) and stop unless the user confirms they have permission.
2. If there is no HTML sample and the page structure matters, give the selectors as clearly marked assumptions and show how to verify them in the browser's developer tools.
3. Choose the approach: API or embedded JSON first, then static HTML parsing, then a headless browser only if required. For Python use `httpx` or `requests` with `selectolax`, `lxml` or `BeautifulSoup`; for JavaScript use `fetch` with `cheerio`; Playwright only for JavaScript-rendered pages.
4. Write the scraper with: a `robots.txt` check, a configurable delay and concurrency, retries with exponential backoff for 429 and 5xx that honour `Retry-After`, a timeout on every request, pagination with an explicit stop condition and a maximum page count, field parsing that cleans and types values (numbers, currencies, dates) and records missing fields as empty rather than crashing, deduplication by a stable key, a checkpoint so a rerun resumes, logging, and output to CSV (UTF-8) or JSON Lines.
5. Prefer selectors on stable attributes (ids, `data-` attributes, semantic tags) over positions and long class chains.
</task>

<constraints>
- Do not bypass CAPTCHAs, bot protection, paywalls or logins, rotate identities to evade blocks, or ignore `robots.txt`. If asked, decline that part and explain briefly.
- Default to one request per second and a concurrency of one; make both configurable.
- Do not invent the site's URLs, endpoints or HTML structure; mark every assumption.
{{> guardrails/scope-discipline}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Before you run it
Bullets: what robots.txt and terms to check, whether an API exists, and any personal-data concerns.
## Approach
Three to five sentences: data source chosen and why.
## Code
The full scraper, one file, with configuration at the top.
## How to run
Install and run commands, including a small test run limited to one or two pages.
## Sample output
Two example rows in the output format, marked as illustrative.
## Maintenance
Bullets: what will break first when the site changes and how to notice it (for example, a row count or empty-field check).
</output_format>
