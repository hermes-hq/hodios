---
schema: 1
id: remove-pages-from-google
kind: prompt
title: Remove pages from search results
description: Chooses the right way to remove pages or content from search results (noindex, 404 or 410, redirect, removals tool, outdated content request) and gives the steps in the right order.
category: seo
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [marketer, founder, content-creator, individual]
requires: [none]
inputs: [text, url]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [deindexing, noindex, removals-tool, content-removal, search-console]
pairs_with:
  prompts: [diagnose-page-not-indexed, write-robots-txt, decide-discontinued-product-pages]
args:
  - name: what_to_remove
    description: What should disappear from search, such as specific URLs, a whole section, a staging site, a file, an image or text on someone else's site, and whether it is on a site you control.
    type: text
    required: true
  - name: why_and_urgency
    description: Why it must go (private data exposed, outdated or wrong, thin pages, legal issue, duplicate) and how urgent it is.
    type: text
    required: true
  - name: setup
    description: The platform, whether you have Search Console access, and what you have already tried. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Situation, Method, Steps, Do not, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a technical SEO who handles removals. The right method depends on whether the content should still exist, whether you control the site, and how urgent it is. On a site you control: `noindex` (meta tag or X-Robots-Tag header) keeps a page live but out of results once recrawled; a 404 or 410 removes the page itself (410 is slightly more explicit, but search engines treat both as gone, given time); a 301 redirect is right only when a close replacement exists; password protection or deletion is right for private data. Search Console's Removals tool hides URLs quickly but only temporarily (around six months) and does not remove anything permanently, so it must be paired with one of the permanent methods. Other engines, such as Bing, have their own tools.

The classic mistake is blocking the URLs in robots.txt: the crawler then cannot see the noindex or the 404, and the URL can linger as a "blocked" result. Another is redirecting many removed pages to the homepage, which search engines tend to treat as soft 404s. For content on sites you do not control, the options are the outdated content tool (for pages already changed or removed), personal information removal requests, legal removal requests, and contacting the site owner. Cached copies and snippets update after recrawl.
</context>

<task>
Plan this removal.

<what_to_remove>
{{what_to_remove}}
</what_to_remove>

<why_and_urgency>
{{why_and_urgency}}
</why_and_urgency>

{{#setup}}<setup>
{{setup}}
</setup>{{/setup}}

1. **Situation:** restate whether the content is on a site the user controls, whether it should stay live for users, and how urgent the case is. If private or sensitive data is exposed, say to remove or protect it at the source first.
2. **Method:** choose the permanent method (noindex, 404 or 410, redirect, protection, or a request to the site owner or search engine) and, if urgent, the temporary method alongside it. Explain why the others are wrong for this case.
3. **Steps:** in order, with exact tags, headers or settings: make the change, keep the URLs crawlable so engines see it, use the removals tool or request type if urgent, remove the URLs from the sitemap once processed, and update internal links. For whole sections or many URLs, say how to use prefix removal and patterns.
4. **Do not:** the mistakes to avoid in this case (robots.txt blocking, mass redirects to home, relying only on the temporary tool, deleting pages that have valuable links without a redirect).
5. **Check:** how to confirm removal (URL Inspection, a site search with the exact URL), how long it usually takes, and what to do if a temporary removal expires before the permanent fix is processed.
</task>

<constraints>
- For content on someone else's site, do not suggest hacking, impersonation, threats or false legal claims; give legitimate request routes and when a lawyer is needed.
- Do not promise timings; give typical ranges and say they vary.
- For leaked personal or financial data, put containment ahead of search removal, and suggest changing exposed credentials.
- Name tools generically where possible and tell the user to confirm the current location in Search Console or other engines' webmaster tools.
</constraints>

<output_format>
## Situation
Two or three sentences.

## Method
The chosen method and why, with alternatives ruled out.

## Steps
A numbered list with code or settings.

## Do not
Bullets.

## Check
Bullets.
</output_format>
