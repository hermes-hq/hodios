---
schema: 1
id: write-trends-and-predictions-post
kind: prompt
title: Write a trends and predictions post
description: Writes a trends or year-ahead predictions post where each trend rests on the writer's evidence, carries a confidence level and a sign it is wrong, and ends in what readers should do.
category: blogging
version: 1.0.0
status: incubating
stage: [build]
role: [writer, marketer, founder, consultant]
requires: [none]
inputs: [notes, text]
output: [article, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [predictions, year-ahead, industry-trends, confidence-levels, thought-leadership]
pairs_with:
  prompts: [find-timely-content-angles, write-data-story-article, write-op-ed]
args:
  - name: field
    description: The industry or field, the readers, and your observations - signals you have seen, data, client conversations, launches, regulation, behaviour changes - with sources where you have them.
    type: text
    required: true
  - name: horizon
    description: The period the post looks at, for example "next year" or "the next three years".
    type: string
    default: the next 12 months
  - name: past_predictions
    description: Predictions you made in an earlier post, if any, so the post can score them honestly.
    type: text
output_contract:
  format: markdown
  sections: [Post, Evidence and confidence, Verify before publishing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write trends and predictions posts for people who know their field. Most of these posts are vague, unfalsifiable and forgotten: "AI will change everything", "personalisation will matter more". The ones readers trust and return to separate trends (already happening and observable) from predictions (claims about the future); give the evidence behind each; explain the mechanism (why it is happening); state a confidence level and a timeframe; name what would show it is wrong; and say what readers should do now. Writers who score their previous predictions in public, including the misses, earn credibility that confident hype never does.
</context>

<task>
<field>
{{field}}
</field>

{{#past_predictions}}
<past_predictions>
{{past_predictions}}
</past_predictions>
{{/past_predictions}}

Horizon: {{horizon}}

1. Sort the writer's observations into candidate trends and predictions. Keep five to eight that have at least one concrete signal in the input; drop the rest or merge them.
2. If past predictions are given, open with an honest scorecard: right, partly right, wrong, too early to tell, with one line each.
3. For each trend or prediction write: a specific headline claim (not "X will grow" but what will change and for whom); the evidence from the input; the mechanism; confidence (high, medium, low) with a reason; the timeframe within the horizon; the sign that would prove it wrong; and what readers should do now, scaled to the confidence.
4. Order them by how much they matter to the reader, not by how exciting they sound.
5. Add a short section on a popular prediction the writer does not believe, with the reasoning, if the input supports one.
6. Close with how readers can track these signals themselves.
</task>

<constraints>
- Use only signals, data and examples from the input. Never invent statistics, market sizes, company plans, regulations or quotes. Where a claim needs external support, insert `[SOURCE NEEDED: ...]`.
- Do not present a prediction as certain. Every prediction has a confidence level and a falsifying sign.
- Do not give investment, legal or financial advice; actions are about the reader's work in this field.
- If the input has fewer than three concrete signals, say so and ask for more before writing.
</constraints>

<output_format>
## Post
Title, intro, the scorecard if any, numbered trend and prediction sections with the elements from step 3, the contrarian section if any, and the close. Word count at the end.

## Evidence and confidence
Table: # | claim | trend or prediction | evidence from input | confidence | timeframe | wrong if.

## Verify before publishing
Every `[SOURCE NEEDED]` item and any figure or event to double-check.
</output_format>
