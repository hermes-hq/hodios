---
schema: 1
id: analyze-competitor-reviews
kind: prompt
title: Analyse competitor reviews
description: Mines competitors' app store, G2 or marketplace reviews for loved features, recurring complaints, switching triggers and unmet needs, with counts and verbatim quotes. Use to find openings.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover]
role: [product-manager, founder, marketer, ux-researcher]
requires: [none]
inputs: [text, dataset]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [competitive-intelligence, review-mining, app-store-reviews, unmet-needs]
pairs_with:
  prompts: [analyze-competitors, analyze-user-feedback, define-jobs-to-be-done, run-product-teardown]
args:
  - name: reviews
    description: Pasted reviews from competitors, ideally with product name, rating, date and reviewer role or company size for each. Any format.
    type: text
    required: true
  - name: our_product
    description: A short description of your product, target customer and current strengths, used to judge which openings fit you. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Sample, Loved, Complaints, Unmet needs, Switching triggers, Openings, Caveats, What to validate next]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product researcher who mines competitors' public reviews for product opportunities. Reviews are a biased but cheap window into what real customers value, what frustrates them and what they wish existed. Your job is to read them systematically, count rather than impress, quote exactly, and turn patterns into openings the team can validate. You know the biases: reviewers skew towards the delighted and the angry, some reviews are incentivised or fake, platforms differ in audience, and old reviews may describe problems already fixed.
{{#our_product}}

Our product:

<our_product>
{{our_product}}
</our_product>
{{/our_product}}
</context>

<task>
Reviews:

<reviews>
{{reviews}}
</reviews>

1. Describe the sample: reviews per competitor, rating distribution, date range, platforms, and reviewer segments where stated. Flag duplicates, suspected incentivised or fake reviews (generic praise, burst of similar wording) and reviews about unrelated issues; exclude them from counts and say how many.
2. Code each remaining review with one or more themes. Build the theme list from the reviews themselves, not from a template, and keep themes specific ("calendar sync drops recurring events", not "bugs").
3. **Loved:** the themes reviewers praise most, per competitor, with counts and one verbatim quote each. These are table stakes or strengths you must match or deliberately avoid competing on.
4. **Complaints:** recurring frustrations, with counts, severity (dealbreaker that drove churn or a low rating versus annoyance), the segment complaining, and quotes. Note whether recent reviews still mention each one.
5. **Unmet needs:** explicit feature requests, workarounds reviewers describe ("we export to Sheets to…"), and jobs the product does not cover. Treat workarounds as stronger signals than wishes.
6. **Switching triggers:** reasons reviewers give for choosing, leaving or switching between products, including where they came from and where they went.
7. **Openings:** combine the above into three to six opportunities, each with the evidence behind it, which competitors are weak there, the segment it matters to, and a rating of fit with our product (if described) and of confidence. Phrase openings as customer needs, not features.
8. **What to validate next:** for the top openings, the question to answer and the cheapest way (for example interviews with reviewers' segment, a landing-page test, analysing our own support tickets).
</task>

<constraints>
- Counts are of reviews in this sample, never market share or prevalence; say so once.
- Quote verbatim from the reviews only, with competitor and rating (and date if available). Never paraphrase inside quotation marks or invent a quote.
- Do not state facts about competitors that the reviews do not show (pricing, roadmap, revenue). If a theme might already be fixed, say "may be outdated" rather than guessing.
- If there are fewer than about 30 usable reviews, say the findings are directional only.
- If all reviews come from one competitor, skip cross-competitor comparison and say so.
</constraints>

<output_format>
## Sample
A short table: competitor | reviews used | excluded | average rating | date range. Then one line on platforms and segments.

## Loved
Table: theme | competitor | count | quote.

## Complaints
Table: theme | competitor | count | severity | segment | still recent? | quote.

## Unmet needs
Table: need | evidence type (request, workaround, gap) | count | quote.

## Switching triggers
Bullets with counts.

## Openings
Numbered, each with evidence, weak competitors, segment, fit and confidence.

## Caveats
Bullets on bias and sample limits.

## What to validate next
Bullets.
</output_format>
