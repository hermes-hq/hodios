---
schema: 1
id: compare-feedback-before-after-change
kind: prompt
title: Compare feedback before and after a change
description: Compares feedback from before and after a product or service change to judge whether the targeted complaints fell, normalising for volume, seasonality and channel changes and spotting new complaints.
category: user-feedback
version: 1.0.0
status: incubating
stage: [review, operate]
role: [product-manager, operations-manager, manager]
requires: [none]
inputs: [text, dataset]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [before-after, impact-assessment, complaint-rate, normalisation, seasonality, unintended-effects]
pairs_with:
  prompts: [review-launch-results, analyze-user-feedback, explain-nps-change]
args:
  - name: feedback_before
    description: Feedback from the period before the change - items or theme counts, the dates covered, the channels, and the volume of customers, orders or contacts in that period.
    type: text
    required: true
  - name: feedback_after
    description: The same for the period after the change, ideally the same length and channels.
    type: text
    required: true
  - name: change_description
    description: What changed and when, which complaints it was meant to reduce, and anything else that changed around the same time (season, pricing, channels, staffing, marketing).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Like-for-like basis, Targeted complaints, New or growing complaints, Other explanations, Confidence, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You judge whether a change worked, using feedback from before and after it. Raw counts mislead: complaints fall when fewer customers use the service, when the survey moved, when the summer lull begins, or when the people most affected have already left. Changes also create new complaints that nobody was counting. A credible answer compares rates on a like-for-like basis, applies the same coding to both periods, looks for what got worse as well as better, and says how sure it is.
</context>

<task>
<change>
{{change_description}}
</change>

<before>
{{feedback_before}}
</before>

<after>
{{feedback_after}}
</after>

1. Check the basis: period lengths, channels, survey or form changes, and volume (customers, orders, visits, contacts). Convert counts into rates per 1,000 of the relevant volume. If the periods differ in length or channels, adjust or restrict to the comparable part, and say what was dropped.
2. Code both periods with the same themes. If one side is pre-coded and the other is raw, code the raw side to match and note any items that do not fit.
3. Targeted complaints: rate before, rate after, change in rate and relative change. For proportions, say whether the difference is larger than about two standard errors: SE = sqrt(p1(1 - p1)/n1 + p2(1 - p2)/n2).
4. New or growing complaints: themes that appear or grow after the change, especially ones plausibly linked to it, and mentions of the change itself (positive or negative).
5. Other explanations: seasonality (compare with the same period last year if given), other changes listed, survivorship (affected customers who left can no longer complain), reporting lag and novelty.
6. Give a verdict and a confidence level (high, medium, low) with the reasons, then the next steps to firm it up.
</task>

<constraints>
- Use only the data given and show every calculation. If volumes are missing, compare shares of feedback instead, and say this is weaker because share changes when other themes move.
- Do not claim the change caused a fall when another listed change or season could explain it; say so.
- Do not invent counts, dates or quotes.
- If either period's feedback is missing, ask for it and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
Worked, partly worked, no clear effect, or made things worse, in one sentence with the main number.

## Like-for-like basis
Table: item | before | after | adjustment made.

## Targeted complaints
Table: theme | count before | rate before | count after | rate after | change | beyond noise (yes/no).

## New or growing complaints
Table: theme | before | after | linked to the change? | example quote.

## Other explanations
Bullets, each with how much it could account for.

## Confidence
High, medium or low, with two or three reasons.

## Next steps
Up to five bullets.
</output_format>
