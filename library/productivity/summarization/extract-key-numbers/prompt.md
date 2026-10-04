---
schema: 1
id: extract-key-numbers
kind: prompt
title: Extract the key numbers from a report
description: Pulls every statistic from a report or article into a table with value, unit, date, population and cited source, noting where context changes what a number means.
category: summarization
version: 1.0.0
status: incubating
stage: [discover]
role: [individual, data-analyst, researcher]
requires: [none]
inputs: [document, text]
output: [table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [figures, data-extraction, reports, numbers-table]
pairs_with:
  prompts: [check-statistics-in-article, summarize-long-document]
args:
  - name: content
    description: The report, article or briefing, including tables and footnotes as text.
    type: text
    required: true
  - name: focus
    description: Which numbers to keep, for example "costs only", "anything about under-18s", "2025 figures". Use all for every number.
    type: string
    default: all
output_contract:
  format: markdown
  sections: [Count, Numbers, Repeated or conflicting figures, Figures missing context]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The reader needs the numbers from a document in one place, ready to quote, chart or check, without rereading it. A number torn from its sentence often changes meaning: a projection quoted as a result, a share of one group quoted as a share of everyone, a monthly figure read as annual. The table must carry enough context that each number can be used correctly on its own. This is extraction, not critique: record and annotate, do not judge the statistics.

<content>
{{content}}
</content>
Focus: {{focus}}
</context>

<task>
1. Find every quantitative statement that matches the focus: counts, amounts, percentages, rates, ratios, ranges, rankings, dates used as quantities, and numbers written as words ("a third", "nearly half", "doubled").
2. For each, record:
   - **Value** exactly as written, keeping words like "about", "up to", "more than".
   - **Unit** (EUR, %, percentage points, people, per 100,000). Write "not stated" if missing.
   - **What it measures**, in a short phrase.
   - **Date or period** it refers to, which may differ from the publication date.
   - **Population or scope** (who or what was counted: "UK adults surveyed", "the 12 pilot sites").
   - **Source cited** in the document for this number, or "none given".
   - **Location** (section, page, table, or paragraph number).
   - **Context note** only when context changes the meaning: projection or target rather than measurement; estimate or modelled; survey or self-reported; relative change with no baseline; nominal money not adjusted for inflation; partial period; subgroup only; definition differs from the usual one.
3. Group rows by topic or section if there are more than about 15.
4. Flag figures that appear more than once with different values, or the same quantity described in different units, quoting both.
5. Before answering, recheck every value and unit against the original text.
</task>

<constraints>
- Copy values exactly. Do not round, convert, annualise or compute new figures. If the document itself gives a calculation, record it as given.
- Do not assess whether the numbers are right or misleading beyond the context note; that is a separate critique.
- Do not fill a missing date, unit or source from your own knowledge.
- If the document contains no numbers matching the focus, say so in one line.
</constraints>

<output_format>
## Count
One line: how many figures were extracted, and for which focus.
## Numbers
Table: # | Value | Unit | What it measures | Date or period | Population or scope | Source cited | Location | Context note.
## Repeated or conflicting figures
Bullets quoting both versions with locations. "None found" if none.
## Figures missing context
Bullets: row numbers with no date, unit, population or source, and which is missing.
</output_format>
