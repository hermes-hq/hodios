---
schema: 1
id: map-reviews-to-service-touchpoints
kind: prompt
title: Map reviews to service touchpoints
description: Maps public reviews of an in-person service such as a hotel, restaurant, clinic, gym or garage onto journey stages, with sentiment, counts, quotes and the process or role behind each touchpoint.
category: user-feedback
version: 1.0.0
status: incubating
stage: [discover, review]
role: [manager, founder, operations-manager, product-manager]
subject: [hospitality, retail, healthcare]
requires: [none]
inputs: [text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [online-reviews, customer-journey, service-design, touchpoints, review-mining, guest-experience]
pairs_with:
  prompts: [analyze-user-feedback, respond-to-online-review, build-user-journey-map]
args:
  - name: reviews
    description: The reviews pasted in, ideally with star rating and date for each. 30-300 reviews works best. Remove reviewers' names.
    type: text
    required: true
  - name: business_type
    description: What the business is and how a visit works (for example "60-room city hotel with restaurant, most guests stay 1-2 nights").
    type: text
    required: true
  - name: journey_stages
    description: Optional. Your own list of journey stages. Leave empty to use a default journey adapted to the business.
    type: text
output_contract:
  format: markdown
  sections: [Coverage, Journey map, Touchpoint detail, Where it breaks, Fixes to test, Limits and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help the manager or owner of an in-person service see where in the customer journey the experience goes right or wrong. A list of "top complaints" says what people dislike; a journey map of reviews says at which moment it happens and which process or role owns that moment, which is what a manager can change.

Things a plain summary gets wrong: one review usually mentions several moments, so it must be split; star ratings follow the last and the worst moment more than the average one, so a smooth stay with a slow checkout reads as a bad stay; a handful of recent reviews can show a new problem that older praise hides; and reviewers name staff, which should become a role or process in the analysis, not a person to blame.
</context>

<task>
Business: {{business_type}}

<reviews>
{{reviews}}
</reviews>

{{#journey_stages}}
<journey_stages>
{{journey_stages}}
</journey_stages>
{{/journey_stages}}

1. Set the journey. Use the stages given, or adapt this default to the business: find and choose, book or reserve, arrive and get in, welcome, the core service, waiting, extras and add-ons, pay, leave, after the visit (follow-up, complaints, refunds). Keep 6-10 stages.
2. Split every review into mentions, each tied to one stage, with sentiment (positive, negative, mixed) and a short paraphrase. Keep a few verbatim fragments per stage. Mentions that fit no stage go to "general".
3. For each stage, count positive and negative mentions, and the share of all reviews that mention it. Note how many of the 1-2 star reviews mention it, and compare the last 90 days with older reviews when dates are given.
4. For each stage, name what sits behind it: the role (reception, kitchen, therapist), the process (booking system, cleaning schedule, billing), the facility (parking, rooms, signage) or a policy (deposits, cancellation). Use roles, not staff names.
5. Find where it breaks: stages with the most negative mentions per review, stages over-represented in low ratings, and hand-offs between stages (booking to arrival, service to payment) where information is lost.
6. Propose fixes to test for the top three breaking points: the change, who owns it, how to tell within 4-8 weeks if it worked (from new reviews or a simple count).
</task>

<constraints>
- Count only what is in the reviews. Do not invent reviews, quotes, ratings or causes; label any cause you infer as a hypothesis.
- Replace any staff or customer name with a role in the output.
- Flag reviews that look fake or off-topic (no detail, mismatched business, copy-pasted text) and leave them out of the counts, saying how many.
- With fewer than 30 reviews, give counts but call the findings directional.
- If the business type or the reviews are missing, ask for them and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Coverage
Reviews analysed, date range, average rating, number excluded and why.

## Journey map
Table: stage | mentions | % of reviews | positive | negative | in 1-2 star reviews | trend (last 90 days vs older) | owner (role, process, facility, policy).

## Touchpoint detail
For each stage with at least three mentions: two to four bullets on what people praise and what they criticise, each with a short verbatim fragment.

## Where it breaks
The top three breaking points, each with evidence and the likely cause marked as hypothesis.

## Fixes to test
Table: breaking point | change | owner | how to check | when.

## Limits and questions
Who reviews and who does not, and anything to confirm.
</output_format>
