---
schema: 1
id: manuscript-fact-check-track
kind: workflow
title: Manuscript fact-check track
description: Fact-checks a nonfiction book, long feature or report before publication in gated steps, from claim log and source requests to checking, author queries and a sign-off report.
category: fact-checking
version: 1.0.0
status: incubating
stage: [plan, verify, review, ship]
role: [editor, writer, researcher]
requires: [none]
inputs: [document, notes]
output: [table, checklist, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [claim-log, author-queries, pre-publication, long-form]
pairs_with:
  prompts: [prioritize-claims-to-check, verify-quotes-against-source, verify-citations, check-internal-consistency]
  personas: [fact-checker]
args:
  - name: manuscript
    description: The manuscript or the chapter to check, with any notes or endnotes.
    type: text
    required: true
  - name: deadline_days
    description: Working days until the text must be final.
    type: number
    default: 10
  - name: publication_context
    description: Who is publishing it and where, including the country, since that affects legal review.
    type: string
    required: true
steps:
  - {id: claim-log, file: steps/01-claim-log.md, stage: plan, gate: approve}
  - {id: source-requests, file: steps/02-source-requests.md, stage: plan, gate: approve}
  - {id: checking, file: steps/03-checking.md, stage: verify, gate: approve}
  - {id: author-queries, file: steps/04-author-queries.md, stage: review, gate: approve}
  - {id: sign-off, file: steps/05-sign-off.md, stage: ship, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Fact-checks this manuscript for {{publication_context}} within {{deadline_days}} working days:
<manuscript>
{{manuscript}}
</manuscript>

Each step produces one artifact and stops for approval; later steps update the same claim log instead of starting over.

Rules for every step: check against sources the author or user supplies, or sources you actually retrieve if you have web access; never mark a claim verified from memory, and never invent a source, interview or document. A claim with no source stays open, not verified. Keep the claim log as the single record: every claim, its source, its status and every change. Flag claims about identifiable living people that could harm their reputation, and private details, for the publisher's legal reviewer; do not give a legal opinion. If the user asks to skip a gate, confirm once that later steps will rest on an unreviewed log, then continue and note it.
