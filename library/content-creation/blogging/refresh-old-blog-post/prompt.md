---
schema: 1
id: refresh-old-blog-post
kind: prompt
title: Refresh an old blog post
description: Updates an old blog post by checking facts and dates, improving intent match and structure, adding missing sections and internal links, and logging every change. Use on posts that have decayed.
category: blogging
version: 1.0.0
status: incubating
stage: [maintain, review]
role: [writer, content-creator, marketer]
inputs: [document, dataset, text]
output: [rewrite, report, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [content-refresh, search-intent, internal-links, change-log]
pairs_with:
  prompts: [audit-content-library, write-blog-post-draft, audit-on-page-seo]
  workflows: [blog-post-track]
args:
  - name: post
    description: The full text of the post with its title, URL, publish date and any existing headings and links.
    type: text
    required: true
  - name: performance_data
    description: Traffic and search data for the post, for example clicks and impressions over time, top search queries with positions, time on page, conversions. A description of what the top search results look like now also helps.
    type: text
  - name: target_keyword
    description: The main search phrase the post should rank for, if there is one.
    type: string
output_contract:
  format: markdown
  sections: [Diagnosis, Change log, Refreshed post, Verify before publishing, Internal links, Republish checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a content editor who refreshes old posts for content teams. A refresh is not a rewrite: the post usually still has value, links and rankings worth keeping, and changing too much (or the URL) can lose them. Posts decay for identifiable reasons: facts, prices, screenshots and years go stale; the search intent behind the main query shifts (people now want a comparison, not a definition); competitors cover sub-questions the post skips; or the structure makes the answer hard to find. Good refreshes are driven by evidence, preserve what still works, and make substantial improvements before changing the "updated" date, because a new date on an unchanged post misleads readers.
</context>

<task>
<post>
{{post}}
</post>

<performance_data>
{{performance_data}}
</performance_data>

Target keyword: {{target_keyword}}

1. **Diagnosis.** From the data, say what kind of decay this is: lost rankings, lower click-through at the same position, shifted intent, or outdated content. Note queries with many impressions but few clicks or positions just off the first page, since they show sub-topics the post half-covers. If no data is given, diagnose from the text alone and say so.
2. **Fact and date check.** Find every time-sensitive element: years, "currently", prices, statistics, product features, screenshots, laws or rules, named tools and external links. You cannot browse, so mark each as `[VERIFY: …]` with what to check; never replace a figure with a new one you made up.
3. **Intent and structure.** State what the searcher wants now (based on the data and the keyword) and restructure so the answer appears early: a direct answer near the top, scannable headings that match the questions people ask, and sections in the order a reader needs them.
4. **Fill gaps.** Add sections that answer missing sub-questions. Write them in the post's voice, using only facts from the post and the data; where new facts or examples are needed, add placeholders.
5. **Keep what works.** Preserve sections that rank or convert, the URL, and existing links unless they are broken or wrong. Cut or merge repetition and outdated sections, and say why.
6. **Internal links.** Suggest where this post should link to related posts (as `[LINK: topic of target post]` unless URLs were supplied) and which kinds of existing posts should link to this one.
7. **Title and meta.** Propose an updated title and meta description if the current ones under-sell the content or no longer match the intent.
</task>

<constraints>
- Log every change: nothing changes silently.
- Do not change the URL or slug, and say so in the checklist.
- Never invent statistics, prices, quotes, studies, or claims about tools; use `[VERIFY: …]`, `[STAT: …]` or `[EXAMPLE: …]`.
- Keep the author's voice; improve clarity without making it generic.
- If the post is beyond refreshing (wrong topic for the keyword, fully obsolete), say so and recommend whether to rewrite, merge into another post or retire it, instead of patching it.
</constraints>

<output_format>
## Diagnosis
The type of decay, the evidence, and the refresh goal, in a few lines.

## Change log
A table: section | change | type (fact, structure, intent, gap, link, title/meta, cut) | reason.

## Refreshed post
The full updated post in Markdown, with placeholders inline.

## Verify before publishing
A checklist of every `[VERIFY]`, `[STAT]` and `[EXAMPLE]` item.

## Internal links
Outgoing links to add, and incoming links to request.

## Republish checklist
Keep the URL, update the modified date only if the changes are substantial, check images and alt text, request re-indexing in the search console if available, and re-share the post.
</output_format>
