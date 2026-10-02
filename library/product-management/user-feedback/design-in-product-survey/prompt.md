---
schema: 1
id: design-in-product-survey
kind: prompt
title: Design an in-product survey
description: Designs an in-product survey or micro-poll around the one question that matters, with the trigger moment, sampling, response options, bias checks and how the answers feed decisions.
category: user-feedback
version: 1.0.0
status: incubating
stage: [design]
role: [product-manager, ux-researcher, designer]
requires: [none]
inputs: [text]
output: [plan, questions, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [micro-survey, in-app-survey, product-market-fit-survey, survey-sampling, customer-effort-score]
pairs_with:
  prompts: [write-survey-questionnaire, analyze-user-feedback, write-tracking-plan, analyze-survey-results]
args:
  - name: goal
    description: The decision you want the survey to inform (for example "decide whether to invest in the mobile app" or "find why trial users don't connect a data source").
    type: text
    required: true
  - name: product_moment
    description: Where and when in the product it could appear, who sees that moment, and rough daily volume. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Decision, The question, Response options and follow-up, Trigger and targeting, Sampling and volume, Bias checks, From answers to decisions, Implementation spec]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product researcher who designs in-product micro-surveys. In-product surveys work when they ask one clear question at the moment the user has just experienced the thing being asked about, to a sample that represents the users who matter, and when someone has decided in advance what they will do with the answers. They fail when they interrupt critical tasks, ask several questions at once, use leading or double-barrelled wording, ask people to predict their own future behaviour, or collect scores nobody acts on. Well-known formats include a product-market-fit question ("How would you feel if you could no longer use…?"), customer effort score, task-level satisfaction, and a single open "what almost stopped you…?" question; each fits different decisions.
{{#product_moment}}

Product moment:

<product_moment>
{{product_moment}}
</product_moment>
{{/product_moment}}
</context>

<task>
Goal:

<goal>
{{goal}}
</goal>

1. Restate the decision the survey informs and what answer would change it. If the goal is not tied to a decision, propose one and say so. If a survey is the wrong tool (for example the question is about actual behaviour that analytics can measure, or needs deep "why" that only interviews give), say so and recommend the better method, then still give the best survey version if one is useful.
2. Write the one question that matters, in plain words, about the user's own recent experience, not their future intentions. Explain why this wording, and give one alternative wording.
3. Define the response options: scale or choices (balanced, mutually exclusive, with an "other" or "not sure" where needed), and at most one optional follow-up, usually an open text "What's the main reason for your answer?" or a branch based on the answer.
4. Define the trigger and targeting: the exact event or moment that shows the survey (after the task completes, not during it), who is eligible (for example active for at least 14 days, or has used the feature three times), exclusions (new users in onboarding, users who just hit an error unless that is the topic, users surveyed recently), the delay after the trigger, placement and format, and a frequency cap across all surveys.
5. Size the sample: the number of responses needed for the decision (for example about 100 or more for a single proportion with a margin of error near plus or minus 10 points; more if segments must be compared), the assumed response rate (state it as an assumption, with a range), and the resulting exposures and time to collect at the given volume.
6. Run bias checks: leading or loaded words, double-barrelled questions, scale balance, order effects, who is likely to respond versus who is not (survivorship: churned users never see an in-product survey), and how to compare respondents with the eligible population.
7. Explain how answers become decisions: thresholds or patterns that trigger action, how open-text answers will be coded, who owns the results, the review cadence, and how to close the loop with respondents if appropriate.
8. Write the implementation spec: event trigger, eligibility rules, sampling percentage, copy for the prompt and thank-you message, data captured with each response (user and account IDs, plan, segment; no unnecessary personal data), consent or privacy notice where required, and when to switch it off.
</task>

<constraints>
- One primary question; never more than two questions in total.
- Do not invent response rates or volumes as facts; label them as assumptions.
- Never trigger in the middle of payment, setup or error recovery flows unless they are the subject, and then only after completion.
- Keep copy short: the question under about 20 words.
</constraints>

<output_format>
## Decision
Two sentences.

## The question
The wording, the reason, and one alternative.

## Response options and follow-up
The options and the follow-up.

## Trigger and targeting
Bullets.

## Sampling and volume
The arithmetic.

## Bias checks
Bullets.

## From answers to decisions
Bullets, including thresholds.

## Implementation spec
A compact table: field | value.
</output_format>
