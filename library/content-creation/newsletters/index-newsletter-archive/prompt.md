---
schema: 1
id: index-newsletter-archive
kind: prompt
title: Index a newsletter archive
description: Extracts a structured index from newsletter issue texts, with date, topics, evergreen or dated status, best lines, links likely to rot and reuse ideas per issue, as a table or JSON.
category: newsletters
version: 1.0.0
status: incubating
stage: [maintain]
role: [writer, content-creator, editor]
requires: [none]
inputs: [document, text]
output: [table, summary]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [archive-index, content-inventory, evergreen-content, link-rot, content-reuse]
pairs_with:
  prompts: [turn-newsletter-archive-into-ebook, build-evergreen-issue-bank, write-year-in-review-issue]
args:
  - name: issues
    description: The issue texts to index, pasted one after another with a clear separator and, if possible, each issue's title and send date. Batches of 10-20 issues work best.
    type: text
    required: true
  - name: format
    description: table gives a readable markdown table; json gives one object per issue for a spreadsheet or database.
    type: enum
    enum: [json, table]
    default: table
output_contract:
  format: markdown
  sections: [Index, Themes, Reuse shortlist, Notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You index a writer's own newsletter archive so they can find and reuse their best work: for best-of collections, welcome sequences, refreshes and evergreen reserves. An archive index is only useful if it is consistent (the same fields for every issue, the same topic labels across issues) and honest about what has aged: a piece built around a news event, a price, a tool version or a link to a fragile page is not evergreen even if the writing is good. Output format: {{format}}.
</context>

<task>
<issues>
{{issues}}
</issues>

1. Split the input into issues. If separators or dates are unclear, number the issues in order and note it.
2. Build a topic list first: read all issues, then define 5-15 short topic labels that cover the archive, reused across issues (not a new label per issue).
3. For each issue extract:
   - number, title, date (as given, or null / "unknown");
   - one-sentence summary of its main point;
   - topics (1-3 labels from the list);
   - format (essay, how-to, roundup, interview, personal story, news analysis, Q&A, other);
   - status: evergreen, needs refresh (and what: a figure, a tool, an event reference) or dated;
   - best line: one sentence quoted exactly from the issue;
   - fragile links: links to social posts, news pages, tools, prices or announcements likely to change or vanish (you cannot check them; say "check");
   - reuse ideas: one or two (welcome sequence, best-of, refresh, social thread, ebook chapter, combine with issue N).
4. Summarise themes: how many issues per topic, and which topics are under-served or over-served.
5. Shortlist the five to ten issues most worth reusing, with the reason.
</task>

<constraints>
- Index only the writer's own archive or work they have the rights to reuse. If the issues are another writer's (scraped, forwarded or paid content), say you will not prepare them for republishing, and offer to index the writer's own issues or plan credited, permission-based reuse.
- Quote best lines exactly; never paraphrase inside quotation marks.
- Do not invent dates, titles, links or reader reactions. Use null in JSON or "unknown" in tables.
- Do not judge a link as dead; only flag it as fragile to check.
- If the input is cut off mid-issue, index what is complete and say where it stopped.
- For json: output valid JSON in a single code block, an array of objects with keys number, title, date, summary, topics, format, status, refresh_note, best_line, fragile_links, reuse_ideas.
</constraints>

<output_format>
## Index
The table (columns: # | title | date | summary | topics | format | status | best line | fragile links | reuse ideas) or the JSON block.

## Themes
Table: topic | issues | notes.

## Reuse shortlist
Numbered list with reasons.

## Notes
Parsing assumptions, issues with unknown dates, and where input stopped if truncated.
</output_format>
