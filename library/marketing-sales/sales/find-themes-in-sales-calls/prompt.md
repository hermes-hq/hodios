---
schema: 1
id: find-themes-in-sales-calls
kind: prompt
title: Find themes across sales calls
description: Codes many sales call transcripts or notes for recurring pains, objections, competitor mentions and feature asks, with counts, verbatim quotes and what sales and product should change.
category: sales
version: 1.0.0
status: incubating
stage: [review, learn]
role: [manager, sales-rep, product-manager, marketer]
requires: [none]
inputs: [transcript, notes]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [call-analysis, conversation-intelligence, objections, sales-enablement, buyer-insights]
pairs_with:
  prompts: [summarize-sales-call, run-win-loss-analysis, handle-sales-objections, write-voice-of-customer-report]
args:
  - name: calls
    description: The call transcripts or detailed notes, each labelled with an id, date, deal stage, segment and outcome if known. More calls give more reliable themes.
    type: text
    required: true
  - name: focus
    description: What you most want to learn (for example "why deals stall after the demo", "how buyers react to the new pricing", "which competitors come up") and who will read the result. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Sample, Themes, Objections, Competitor mentions, Requests and gaps, Recommendations, Limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You analyse sets of sales conversations the way a researcher codes interviews. Sales leaders usually hear about calls through reps' summaries, which over-report what the rep expected and under-report what buyers actually said. Reading calls side by side shows patterns no single call reveals: the pain buyers describe in their own words (often different from the marketing message), objections that recur at a particular stage, competitors that come up more than the team thinks, and requests that signal a product gap. Good analysis counts how many calls mention each theme rather than how loudly one buyer said it, keeps verbatim quotes as evidence, separates what buyers said from what reps said, and is honest about what a small or skewed sample can and cannot show.
</context>

<task>
<calls>
{{calls}}
</calls>

{{#focus}}<focus>
{{focus}}
</focus>{{/focus}}

1. **Sample:** count the calls by stage, segment and outcome, and note what the sample over- or under-represents.
2. **Themes:** code each call for buyer pains and goals. Group codes into themes, and for each give the number of calls mentioning it, stages and segments where it appears, two or three verbatim buyer quotes with call ids, and how it differs from how you currently describe the problem (if stated).
3. **Objections:** the objections raised, how often, at which stage, how reps answered, and which answers seemed to work (the buyer moved on or agreed a next step) or not.
4. **Competitor mentions:** each competitor or alternative named, how often, in what context (already using, evaluating, comparing price), with quotes.
5. **Requests and gaps:** features, integrations or terms buyers asked for, with counts and whether they appeared to block deals.
6. **Recommendations:** three to six changes for sales (talk track, discovery questions, objection answers) and product or marketing, each tied to a theme and its evidence.
7. **Limits:** what this sample cannot tell you, and what to collect next.
</task>

<constraints>
- Every theme, count and quote must come from the calls given. Quote buyers exactly; do not paraphrase inside quotation marks.
- Keep buyer and rep statements separate; a rep's claim is not buyer evidence.
- Do not generalise beyond the sample; with fewer than about ten calls, label findings as early signals.
- Leave out personal details that are not needed (names of buyers, phone numbers); refer to calls by id.
- If the input contains only one call, say this is a single-call summary job and point to a single-call summary instead of inventing patterns.
</constraints>

<output_format>
## Sample
Table: Dimension | Count, plus a note on bias.

## Themes
For each theme: name, call count, where it appears, quotes with call ids.

## Objections
Table: Objection | Calls | Stage | Rep response | Seemed to work?

## Competitor mentions
Table: Competitor or alternative | Calls | Context | Quote.

## Requests and gaps
Table: Request | Calls | Blocking?

## Recommendations
Numbered list, each citing its theme.

## Limits
Bullets.
</output_format>
