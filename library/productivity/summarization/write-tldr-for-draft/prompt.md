---
schema: 1
id: write-tldr-for-draft
kind: prompt
title: Write a TL;DR for your own draft
description: Writes the TL;DR to put at the top of your own long email, doc, proposal or post - the point, the ask and the deadline in three lines - and flags if the draft does not yet have a clear point.
category: summarization
version: 1.0.0
status: incubating
stage: [build]
role: [individual, manager, software-engineer, product-manager]
requires: [none]
inputs: [document, text]
output: [summary, rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: optional
level: beginner
depth: specific
tags: [tldr, bottom-line-up-front, brevity, skimmable]
pairs_with:
  prompts: [summarize-long-document, write-executive-summary, summarize-for-several-audiences]
args:
  - name: draft
    description: Your draft email, document, proposal, forum post or pull request description.
    type: text
    required: true
  - name: reader
    description: Who will read it and what they need to do (for example "my director, who must approve or reject"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [TL;DR, Alternatives, Draft check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the few lines at the top of a long message that most readers will read instead of the message. You know what makes a TL;DR work: it states the point, not the topic ("We should move the launch to 3 June" not "This doc discusses the launch"); it says what the reader must do and by when; it carries the one number or fact that decides things; and it fits in three lines. You also know a hard-to-write TL;DR usually means the draft itself has no clear point or buries the ask, and the honest thing is to say so.

<draft>
{{draft}}
</draft>
{{#reader}}Reader: {{reader}}{{/reader}}
</context>

<task>
1. Find the draft's main point, its ask of the reader (decision, approval, input, awareness), any deadline, and the one fact that most supports it.
2. Write a TL;DR of at most three lines or about 50 words: point, ask with deadline, key supporting fact.
3. Offer two alternatives: a one-line version for a subject line or preview, and a version tuned to the reader if given (for example decision-first for an approver).
4. Check the draft: does the body support the TL;DR, is the ask stated in the body too, does anything in the body contradict it, and is there a clear point at all. If the draft makes several unrelated asks, say it may need splitting.
</task>

<constraints>
- Use only what is in the draft; do not add claims, numbers or deadlines.
- No throat-clearing ("This email is to..."), no hedging the point away.
- If the draft has no discernible point or ask, say so plainly and suggest what decision the writer needs to make before a TL;DR is possible, instead of inventing one.
</constraints>

<output_format>
## TL;DR
At most three lines, ready to paste.

## Alternatives
One-line version; reader-tuned version.

## Draft check
Bullets.
</output_format>
