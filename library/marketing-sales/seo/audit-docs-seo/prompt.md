---
schema: 1
id: audit-docs-seo
kind: prompt
title: Audit SEO for a project's documentation site
description: Audits a developer docs site for search, covering task pages, error-message pages, titles, versioned duplicates, sitemaps and internal links, and returns ranked fixes and a page plan.
category: seo
version: 1.0.0
status: incubating
stage: [review, plan]
role: [maintainer, developer-advocate, software-engineer]
requires: [none]
inputs: [url, dataset, text]
output: [report, plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [open-source, docs-seo, diataxis, search-console, versioned-docs, error-pages]
pairs_with:
  prompts: [audit-documentation, write-honest-comparison-page, analyze-search-console-data, write-troubleshooting-guide]
  personas: [technical-writer]
args:
  - name: site
    description: The docs URL and structure (a sitemap, nav tree or page list), the docs generator, and how versions are published.
    type: text
    required: true
  - name: search_data
    description: Search Console queries and pages, site-search logs, or the questions people ask in issues and chat, if you have them.
    type: text
  - name: priority
    description: What success means for the docs.
    type: string
    default: more new users finding the project through search for the problems it solves
output_contract:
  format: markdown
  sections: [Verdict, Technical issues, Content gaps, Page plan, Measuring]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Documentation is where developers learn most (the Stack Overflow developer survey puts technical documentation at the top), and docs are often the main search entry point for an open-source project. Developers search with tasks ("rate limit express routes"), error messages pasted verbatim, comparisons and "how to migrate from". Common docs-site problems: every version of every page indexed as a duplicate with no canonical; titles that repeat the product name and say nothing ("Introduction | Foo"); single-page apps that render nothing without JavaScript; reference pages with no prose; answers buried in Discord or GitHub Discussions where search engines reach them poorly. Diátaxis (tutorials, how-to guides, reference, explanation) is a widely used way to make sure each need has a page. Google's guidance rewards people-first pages and treats mass-produced pages made to rank as low quality.
</context>

<task>
<site>
{{site}}
</site>
{{#search_data}}
Search and question data:
{{search_data}}
{{/search_data}}
Priority: {{priority}}.

If you cannot see the site structure or page list, ask for a sitemap or nav tree and stop.

1. **Technical issues.** Check, from what you can see: indexability (robots, noindex, JavaScript-only rendering), canonical tags across versions and a "latest" alias, sitemap coverage and freshness, title and meta description patterns, heading structure, broken links and redirects after renames, page speed red flags, structured data if relevant, and whether the docs live on the project's own domain. Mark anything you could not check as UNVERIFIED and say how to check it.
2. **Content gaps.** Map the existing pages onto Diátaxis and onto the searches people make. Use the search data if given; otherwise derive likely queries from the project's features, its common errors and its alternatives, and label them as hypotheses. List missing pages: task how-tos, pages for the most common error messages (with the exact message in the title), migration guides from the main alternatives, comparison pages, and answers that exist only in chat or issues.
3. **Page plan.** The ten highest-value pages to create or fix, each with the target query, the page type, a title under 60 characters that starts with the task, a meta description, the outline and the internal links to and from it.
4. **Measuring.** What to watch monthly: impressions and clicks per page and query, the share of traffic landing on docs from search, docs-to-install clicks, and questions that stop recurring in issues. Use privacy-friendly analytics only.
</task>

<constraints>
- No keyword stuffing, doorway pages or auto-generated thin pages per keyword.
- Do not invent traffic numbers or search volumes; label estimates as estimates.
- Recommend moving answers out of chat only with the authors' consent or by rewriting them in your own words.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
The three changes that matter most.
## Technical issues
| Issue | Evidence | Fix | Effort |
## Content gaps
| Need or query | Existing page | Gap |
## Page plan
| # | Target query | Type | Title | Links |
Outlines below the table.
## Measuring
</output_format>
