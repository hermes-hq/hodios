---
schema: 1
id: consolidate-scattered-tasks
kind: prompt
title: Consolidate scattered tasks
description: Merges to-dos spread across email flags, notes apps, chat, paper and sticky notes into one deduplicated list grouped by project, with stale items flagged and a rule for where new tasks go.
category: task-management
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, manager, student, founder]
requires: [none]
inputs: [text, notes]
output: [table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [single-list, deduplication, task-capture, scattered-lists, inbox-sources, list-merge]
pairs_with:
  prompts: [process-brain-dump, set-up-task-system, migrate-task-app]
args:
  - name: lists
    description: Paste or type each list with where it came from (for example "Notes app:", "flagged emails:", "sticky notes on monitor:", "Slack saved items:").
    type: text
    required: true
  - name: projects
    description: Your current projects or areas of life, if you have names for them. Optional; the model will propose groups.
    type: text
  - name: destination
    description: Where the single list will live (an app, a spreadsheet, a notebook). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Merged list, Duplicates merged, Stale or unclear, Sources to retire, Capture rule]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You merge task lists that have spread across many places into one trusted list. Scattered lists cause two problems: the same task appears three times in different words, so the load looks bigger than it is, while other tasks sit in a forgotten app and are missed. A merge that sticks does four things: it rewrites every item as a concrete next action, it matches duplicates by meaning not wording and keeps the most specific version and the earliest real deadline, it flags items that are probably stale instead of silently dropping them, and it decides which sources get retired so the scatter does not come back.

Lists:
<lists>
{{lists}}
</lists>
{{#projects}}Projects or areas: {{projects}}{{/projects}}
{{#destination}}Destination: {{destination}}{{/destination}}
</context>

<task>
1. Read every item and note its source.
2. Find duplicates and near-duplicates by meaning; merge each set into one item that keeps the most specific wording, the earliest stated deadline and all sources.
3. Rewrite each item as a next action starting with a verb; split items that are really projects into the project name plus a first action.
4. Group items by the user's projects or areas (or propose five to eight groups), and keep deadlines and waiting-on notes.
5. Flag items that look stale, done, or too vague to act on, with a question for each, rather than deleting them.
6. Recommend which sources to retire and which (if any) remain as capture points that are emptied into the main list, and write a one-line capture rule.
</task>

<constraints>
- Do not drop any item silently; every input item must appear in the merged list, the duplicates table or the stale list.
- Do not invent deadlines, people or details; keep dates exactly as given.
- If two items look similar but may differ (for example two different "call Sam"), keep both and ask.
- Do not recommend a particular app; work with the destination given.
- Report the counts: items in, unique items out, duplicates merged, flagged.
</constraints>

<output_format>
## Merged list
One subheading per group; table: Next action | Deadline | Sources | Note.

## Duplicates merged
Table: Kept as | Merged from (with sources).

## Stale or unclear
Table: Item | Why flagged | Question.

## Sources to retire
Bullets: source, retire or keep as capture point.

## Capture rule
One line, then the counts.
</output_format>
