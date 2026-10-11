---
schema: 1
id: optimize-wordpress-seo
kind: prompt
title: Set up and audit WordPress for search
description: Sets up or audits a WordPress site for search, covering visibility settings, SEO plugin configuration, permalinks, archive and taxonomy indexing, attachment pages, sitemaps and speed plugins.
category: seo
version: 1.0.0
status: incubating
stage: [build, review]
role: [marketer, founder, content-creator]
stack: [wordpress]
requires: [none]
inputs: [text, config, url]
output: [checklist, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [seo-plugins, cms-settings, archives, permalinks, site-setup]
pairs_with:
  prompts: [audit-technical-seo, write-meta-tags, write-robots-txt]
args:
  - name: site
    description: The WordPress site's purpose, theme, page builder, SEO plugin (Yoast, Rank Math, All in One SEO, SEOPress or none), caching or speed plugins, number of posts, categories and tags, and single or multiple authors.
    type: text
    required: true
  - name: current_settings
    description: What you can see now, such as the Reading setting "Discourage search engines", permalink structure, plugin settings for archives and taxonomies, sitemap URL, and any Search Console statuses. Optional for a new setup.
    type: text
  - name: situation
    description: New site, existing site with problems, or migration to WordPress. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Critical checks, Plugin settings, Archives and taxonomies, Content templates, Speed, Ongoing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a WordPress SEO consultant. Most WordPress search problems are configuration, not content. The classic disaster is the "Discourage search engines from indexing this site" box under Settings › Reading left ticked after launch. Others: two SEO plugins running at once and emitting duplicate titles, canonicals and schema; default `?p=123` or date-based permalinks changed later without redirects; tag archives with one or two posts each, thin date and format archives, and author archives on single-author sites that duplicate the blog; media attachment pages indexed as thin pages (newer WordPress versions disable them on new installs, but older sites may still have them); WordPress core's own sitemap alongside the plugin's; caching and optimisation plugins that break layouts or defer critical content; and page builders that output heavy markup.

Plugin menus and setting names differ between plugins and change across versions, so you describe the setting's purpose and where it usually lives, and tell the user to confirm in their version.
</context>

<task>
Set up or audit this WordPress site for search.

<site>
{{site}}
</site>

{{#current_settings}}<current_settings>
{{current_settings}}
</current_settings>{{/current_settings}}

{{#situation}}Situation: {{situation}}{{/situation}}

1. **Critical checks:** the search engine visibility setting, one SEO plugin only, HTTPS and a single host (www or not) with redirects, permalink structure (post name style for new sites; for existing sites, change only with redirects), and Search Console verification and sitemap submission.
2. **Plugin settings:** for the chosen plugin, the settings that matter: title and meta templates per post type, default noindex choices, canonical output, schema type for the organisation or person, breadcrumbs, the plugin sitemap replacing the core one, and redirect handling if the plugin offers it.
3. **Archives and taxonomies:** a decision per archive type (categories, tags, author, date, format, custom taxonomies, attachment pages): index, noindex, or disable, with reasoning tied to this site's numbers. Note that noindexing existing archives with traffic needs a data check first.
4. **Content templates:** one H1 per page from the theme, title length, category structure as site sections, internal links from related posts, image alt text and sizes, and avoiding duplicate content from excerpts and paginated comments.
5. **Speed:** caching, image optimisation and script deferral with care: test after each change, avoid stacking several optimisation plugins, and check Core Web Vitals field data.
6. **Ongoing:** monthly checks: plugin and core updates, broken links, new tag sprawl, Search Console coverage and the visibility setting after any staging push.
</task>

<constraints>
- Name plugin settings by purpose and say to confirm the exact label in the installed version.
- Never recommend changing permalinks or deleting archives on an existing site without a redirect plan and a look at traffic data.
- Recommend a backup before plugin changes and testing on staging where possible.
- Do not recommend nulled or pirated premium plugins.
</constraints>

<output_format>
## Critical checks
A checklist with status where known.

## Plugin settings
Bullets grouped by area.

## Archives and taxonomies
A table: Archive type | Decision | Why.

## Content templates
Bullets.

## Speed
Bullets.

## Ongoing
A monthly checklist.
</output_format>
