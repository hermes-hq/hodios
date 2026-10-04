---
schema: 1
id: assess-page-helpfulness
kind: prompt
title: Assess page helpfulness
description: Assesses a page against people-first quality questions such as first-hand experience, original information, clear authorship and finishing the searcher's task, and rewrites thin or padded parts.
category: seo
version: 1.0.0
status: incubating
stage: [review]
role: [writer, content-creator, marketer]
requires: [none]
inputs: [document, text]
output: [report, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [helpful-content, first-hand-experience, thin-content, eeat]
pairs_with:
  prompts: [audit-on-page-seo, refresh-decaying-content]
args:
  - name: page_content
    description: The full page text, including headings, author line, dates and any notes on images, tables or tools on the page.
    type: text
    required: true
  - name: target_query
    description: The main search the page should answer (for example "how to descale a combi boiler").
    type: string
    required: true
  - name: author_info
    description: Who wrote or reviewed it and what first-hand experience or data they have, which may not be on the page yet. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Scorecard, Weak sections, Rewrites, What only you can add]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review pages the way search quality guidelines ask raters to think: does this page leave the searcher satisfied, and does it show experience and effort that a summary of other pages would not? Pages fail this test when they restate what already ranks, pad the answer below long introductions, hedge every sentence, use stock phrases that sound machine-written, hide who wrote them, or claim experience they do not show. The fix is rarely more words; it is the answer first, then evidence only this author has: their own photos, numbers, tests, mistakes and judgement.
</context>

<task>
<page_content>
{{page_content}}
</page_content>

Target query: {{target_query}}

{{#author_info}}<author_info>
{{author_info}}
</author_info>{{/author_info}}

1. State what someone searching the target query wants to do or know, and whether the page answers it within the first screen.
2. Score the page 1-5 on each question, quoting the line that justifies the score:
   - Task: would the searcher finish without needing to search again?
   - Original: does it offer information, data, analysis or examples not found on every other page?
   - Experience: does it show first-hand use, testing or practice (specifics, photos, measurements, what went wrong)?
   - Who and why: is it clear who wrote it, why they are credible, and why the page exists (to help, not just to rank)?
   - Accuracy: are claims specific, current and sourced where they need to be?
   - Effort and presentation: is it organised, scannable and free of padding?
3. Flag weak sections: padded introductions, filler (stock openers, empty transitions, "it is important to note"), generic lists without specifics, unexplained jargon, word count padding, and claims needing a source.
4. Rewrite the weakest three sections: answer first, concrete, shorter. Where a rewrite needs first-hand material the author has not supplied, insert a clear placeholder such as [X: your photo of the scale build-up] instead of inventing it.
5. List what only this author or business can add.
</task>

<constraints>
- Never invent experience, test results, credentials, quotes or data. Placeholders only.
- Do not claim to detect AI authorship; comment on how the text reads and what it lacks.
- Judge against the target query, not general writing taste; keep the author's voice.
- If the page or the target query is missing, ask for it and stop.
</constraints>

<output_format>
## Verdict
Two to three lines: does the page satisfy the query, and the main gap.

## Scorecard
Table: Question | Score 1-5 | Evidence from the page | Fix.

## Weak sections
Table: Section or quote | Problem | Change.

## Rewrites
Each of the three weakest sections, before (first line only) and after (full).

## What only you can add
Bullets.
</output_format>
