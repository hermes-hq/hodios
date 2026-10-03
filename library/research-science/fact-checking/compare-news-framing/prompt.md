---
schema: 1
id: compare-news-framing
kind: prompt
title: Compare how outlets frame the same story
description: Compares how several news articles frame the same story, covering agreed facts, contradictions, emphasis, language, sources quoted and omissions, without labelling outlets by politics.
category: fact-checking
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, student, writer, editor]
requires: [none]
inputs: [text, document]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [media-literacy, framing-analysis, news-comparison, sourcing, omission]
pairs_with:
  prompts: [fact-check-claims, evaluate-source-credibility, check-science-news-against-paper]
  personas: [fact-checker]
args:
  - name: articles
    description: Two or more articles about the same event, each pasted in full with the outlet name, headline, date and author if known, separated and labelled (Article A, B, C).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The story, Facts in common, Factual differences, Framing comparison, What each reader would come away believing, How to resolve the differences]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Two accurate articles can leave readers with opposite impressions. Framing works through choices that are visible in the text: what goes in the headline and first paragraph, which facts are included or left out, which numbers are given context, whose voices are quoted and in what order, the words used for people and actions, and whether the story is told through an individual case or a broader pattern. Communication research describes common frames such as conflict, human interest, responsibility, economic consequences and morality. A useful comparison points to the exact words and choices, and separates factual disagreement (which can be checked) from difference in emphasis (which is a matter of judgement).
</context>

<task>
Compare these articles.
<articles>
{{articles}}
</articles>

1. Check that the articles cover the same event; if fewer than two articles are given, or they cover different events, say so and stop, asking for what is needed.
2. Summarise the event in one neutral sentence using only facts that all articles share.
3. List facts reported by all articles, and facts reported by only some (with which ones).
4. Identify factual contradictions (numbers, sequence of events, attributions) and say what source would settle each. Do not decide them unless one article gives a checkable primary source.
5. Compare framing article by article: headline and lead, the main frame, what is emphasised and what is placed late or left out, loaded or evaluative words (quoted exactly) and neutral alternatives, who is quoted and how many from each side, official versus affected voices, how numbers are contextualised, and images or captions if described.
6. Say, for each article, what a reader who read only that article would probably believe.
</task>

<constraints>
- Do not label outlets or authors as left, right, biased, propaganda or similar, and do not infer motive. Describe the text and let the reader judge.
- Quote exact words for every claim about language or emphasis; no impressions without evidence from the text.
- Treat omission carefully: say "not mentioned in this article" rather than "hidden", since length and timing differ.
- Note differences in publication time, article type (news, analysis, opinion) and length that may explain differences.
- Do not add facts from outside the articles unless clearly marked as context to verify.
</constraints>

<output_format>
## The story
One neutral sentence.
## Facts in common
Bulleted.
## Factual differences
A table: point | Article A | Article B | ... | how to resolve.
## Framing comparison
A table: dimension (headline, lead, main frame, emphasis, language, sources quoted, numbers, omissions) | Article A | Article B | ...
## What each reader would come away believing
One or two sentences per article.
## How to resolve the differences
The primary sources or records to check.
</output_format>
