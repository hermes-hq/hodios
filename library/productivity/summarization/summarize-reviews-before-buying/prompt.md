---
schema: 1
id: summarize-reviews-before-buying
kind: prompt
title: Summarise reviews before buying
description: Summarises many product, place or service reviews into consistent praise, complaints, deal-breakers and who it suits, and notes how representative the reviews seem.
category: summarization
version: 1.0.0
status: incubating
stage: [discover]
role: [individual, traveler, parent, home-cook]
requires: [none]
inputs: [text]
output: [summary, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [buying-decision, customer-reviews, review-analysis, fake-reviews, star-ratings]
pairs_with:
  prompts: [summarize-long-document, compare-documents]
args:
  - name: reviews
    description: The reviews, pasted with star ratings and dates where possible (from a shop, booking site, maps listing or forum). Note where they came from and roughly how many there are in total.
    type: text
    required: true
  - name: your_needs
    description: What matters to you and how you will use it (for example "quiet hotel room for a light sleeper", "laptop for travel, battery matters most", "builder for a small bathroom job"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Verdict for you, Consistent praise, Consistent complaints, Deal-breakers, Who it suits, How much to trust these reviews, Questions to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a consumer researcher who reads reviews for a living. Average star ratings hide what matters: the same three-and-a-half stars can mean "fine but slow delivery" or "great until it breaks in month two". Useful signals are patterns repeated across independent reviewers, problems that recur in recent reviews, how the seller responds, and whether a complaint applies to this buyer's use. Reviews are also biased: unhappy and delighted people write more than satisfied ones, some reviews are incentivised or fake, and old reviews may describe an earlier version.

<reviews>
{{reviews}}
</reviews>
{{#your_needs}}Buyer's needs: {{your_needs}}{{/your_needs}}
</context>

<task>
1. Count the reviews you were given and the rating spread if ratings are present. Note the date range.
2. Find themes: group points that several reviewers make independently. For each theme, count how many reviews mention it (for example "7 of 32") and quote one short phrase as evidence. Single mentions are listed only if they are serious (safety, fraud, health).
3. Separate consistent praise from consistent complaints, and flag deal-breakers: issues that would make the purchase a mistake for some buyers (safety, durability failure, hidden fees, poor refund handling, misleading listing).
4. Check recency: whether complaints are concentrated in recent reviews (a quality drop, a new version, a change of management) or old ones (since fixed). Note seller or owner responses if included.
5. Judge representativeness and trust: sample size, whether the reviews pasted might be a selection (for example only the top or only the most recent), and signs of fake or incentivised reviews (many short five-star reviews in a burst, generic wording, mentions of free products, reviewer patterns). Phrase these as signals, not proof.
6. Describe who it suits and who should avoid it. If the buyer's needs are given, give a verdict for them in two or three sentences and say which themes matter most for their use.
7. List questions to check before buying that the reviews do not answer (for example "Does the current model still have the hinge issue?").
</task>

<constraints>
- Use only what the reviews say; do not add outside knowledge of the product or brand, and do not invent specifications, prices or ratings.
- Always give counts with themes so the reader can judge weight. Do not turn "two people said" into "many people say".
- A verdict is an opinion based on these reviews, not a guarantee; say so in one line.
- If there are fewer than about five reviews, say the sample is too small for patterns and summarise each review briefly instead.
</constraints>

<output_format>
## Verdict for you
Two or three sentences (or a general verdict if no needs were given), plus a one-line caveat.

## Consistent praise
Bullets: theme · count · short quote.

## Consistent complaints
Bullets: theme · count · short quote · recent or old.

## Deal-breakers
Bullets, or "None found".

## Who it suits
"Good for…" and "Avoid if…", two to four bullets each.

## How much to trust these reviews
Sample, date range, representativeness and any fake-review signals.

## Questions to check
Bullets.
</output_format>
