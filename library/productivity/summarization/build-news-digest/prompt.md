---
schema: 1
id: build-news-digest
kind: prompt
title: Build a news digest
description: Turns several articles into a short briefing - key developments, where sources agree or disagree, what is genuinely new and what to watch next - with every point traced to its source.
category: summarization
version: 1.0.0
status: incubating
stage: [discover]
role: [individual, executive, researcher, consultant]
requires: [none]
inputs: [document, text]
output: [summary, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [news-briefing, multi-source, source-comparison, current-events, media-literacy]
pairs_with:
  prompts: [summarize-long-document, compare-documents, fact-check-claims]
args:
  - name: articles
    description: The full text of two or more articles, each with its outlet, date and headline if you have them. Separate articles clearly.
    type: text
    required: true
  - name: focus
    description: Optional - what you care about, for example "impact on EU fintech startups" or "what it means for my commute". Shapes what goes first.
    type: string
output_contract:
  format: markdown
  sections: [Bottom line, Key developments, Where sources agree, Where they differ, What is new, What to watch, Sources]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A useful digest saves the reader from reading every article without hiding how the coverage differs. It separates facts reported by several outlets from claims made by one, separates reporting from opinion, keeps attributions ("the ministry said", "according to two people familiar"), and is honest that the articles may be out of date or incomplete. It uses only the articles supplied.

<articles>
{{articles}}
</articles>
{{#focus}}
Reader's focus: {{focus}}
{{/focus}}
</context>

<task>
1. Number the articles [1], [2], … in the order given, and note each one's outlet, date and type (news report, analysis, opinion, press release) where you can tell. If dates are missing, say so.
2. Extract the developments: what happened, who did it, when, and the key numbers. Merge duplicates across articles and cite every source that reports each one.
3. Compare the coverage:
   - Agreement: facts reported consistently by two or more sources.
   - Differences: conflicting numbers, timelines or explanations; claims that appear in only one source; differences in framing or what each outlet emphasises. State both sides with citations and do not resolve a conflict the articles do not resolve.
4. What is new: if the articles span time, what changed in the latest ones compared with earlier ones. If they do not, say what is new compared with the background the articles themselves give.
5. What to watch: scheduled events, decisions or data mentioned in the articles, and the open questions they leave.
6. If a focus was given, order everything by relevance to it and add one line on why it matters for that focus. Do not speculate beyond what the articles support; mark any inference.
</task>

<constraints>
- Use only the supplied articles. Do not add facts from memory, and say when something the reader would expect (for example the other side's response) is missing from the coverage.
- Keep attribution: an outlet's claim is not a fact, and an anonymous source is labelled as such.
- Opinion and analysis pieces are labelled; their arguments are not reported as events.
- Keep numbers, hedges and qualifiers exact.
- If only one article is supplied, produce a summary and say comparison needs at least two sources.
</constraints>

<output_format>
## Bottom line
Two or three sentences.
## Key developments
Bullets, most important first, each ending with citations like [1][3].
## Where sources agree
Bullets with citations.
## Where they differ
Bullets: the point, what each source says, with citations.
## What is new
Bullets.
## What to watch
Bullets with dates where given.
## Sources
Numbered list: outlet, headline, date, type.

Aim for under 400 words before the source list.
</output_format>
