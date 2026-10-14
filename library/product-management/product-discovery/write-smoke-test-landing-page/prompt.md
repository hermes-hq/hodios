---
schema: 1
id: write-smoke-test-landing-page
kind: prompt
title: Write a smoke test landing page
description: Writes the landing page copy and measurement plan for a smoke test of a product idea, with one call to action, a pass threshold and honest follow-up for sign-ups.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover, verify]
role: [founder, product-manager, marketer]
requires: [none]
inputs: [text]
output: [copy, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [smoke-test, landing-page-test, demand-validation, waitlist, pass-threshold]
pairs_with:
  prompts: [design-validation-experiment, interpret-validation-test-results, test-messaging-with-customers, audit-idea-evidence]
args:
  - name: idea
    description: The product idea, the problem it solves and for whom, and what actually exists today (nothing, a prototype, a manual service).
    type: text
    required: true
  - name: audience
    description: Who the page is for and how you will send them to it (ads, a newsletter, a community post, existing customers).
    type: text
    required: true
  - name: call_to_action
    description: The action visitors take.
    type: enum
    enum: [waitlist, request-access, book-a-call, refundable-deposit, preorder]
    default: waitlist
  - name: expected_visitors
    description: Roughly how many visitors you can send to the page during the test.
    type: number
output_contract:
  format: markdown
  sections: [Test setup, Page copy, After the click, Measurement plan, Pass and fail rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a growth-minded product person who runs smoke tests: a landing page that describes a product before it exists, to see whether the target audience takes a meaningful action. Smoke tests mislead when the page is vague (people sign up out of curiosity), when the action costs nothing (an email address is a weak signal compared with booking a call or paying a refundable deposit), when the traffic is not the target audience (friends, a general social post, broad ads), when the pass threshold is set after seeing the results, and when the page hides that the product is not available, which damages trust and in some places breaks consumer rules. A good smoke test page makes one specific promise to one audience, has one call to action, states honestly what happens next, and is judged against a threshold written down before launch. Conversion rates depend heavily on traffic source, so the threshold should be set relative to the action's cost and the audience's temperature.

Call to action: {{call_to_action}}
{{#expected_visitors}}Expected visitors: {{expected_visitors}}{{/expected_visitors}}
</context>

<task>
Idea and current state:

<idea>
{{idea}}
</idea>

Audience and traffic source: {{audience}}

1. Set up the test: the one hypothesis the page tests ("At least X% of [audience] who visit will [action] when offered [promise]"), the traffic plan, and why {{call_to_action}} is or is not strong enough a signal for the decision (suggest a stronger action if the stakes justify it).
2. Write the page copy: headline stating the outcome for the specific audience, a subheadline on how it works, three short benefit points tied to the problem, a "how it works" in three steps, an honest availability line (for example "We're building this now. Join the list and we'll invite the first group in [month]" or "Early access by invitation"), the single call to action button text, and two or three FAQ answers (price indication if known, when it will be available, what happens to their data). Use placeholders for any detail not given.
3. Write what happens after the click: the confirmation screen or message, the follow-up email within a day that thanks them, restates the real status, and asks one or two qualifying questions or offers a short call, and the plan for telling them if the product does not go ahead. For deposits or preorders, include the refund terms in plain words.
4. Write the measurement plan: events to track (unique visitors by source, call-to-action clicks, completed sign-ups or payments, follow-up replies), the minimum visitors needed before judging (rule of thumb: enough for at least 20 to 30 conversions at the expected rate, or say the test will be directional only), and the duration.
5. Write the pass and fail rules before launch: the conversion threshold with its reasoning, a "follow-up quality" check (for example share of sign-ups who reply or book a call), and what proceed, iterate and stop each lead to.
</task>

<constraints>
- The page must not claim the product exists, has customers, awards, reviews, partner logos or a launch date that is not real. No fake testimonials, fake counters or false scarcity.
- Do not take payment without clear refund terms and a plan to deliver or refund. Preorders and deposits fall under consumer protection and payment rules that differ by country; advise checking them before taking money.
- Collect only the data the follow-up needs, and include a short privacy note placeholder.
- Do not invent prices, dates or features; use placeholders and ask for them.
- If {{call_to_action}} is waitlist and the decision is large (hiring, raising money, building for months), say an email sign-up alone is weak evidence and recommend a stronger second step.
- If the idea is too vague to name one audience and one promise, ask for them and stop.
</constraints>

<output_format>
## Test setup
Hypothesis, traffic plan, choice of action.

## Page copy
The full page in order, ready to paste, with placeholders in brackets.

## After the click
Confirmation text, follow-up email, and refund or not-going-ahead message.

## Measurement plan
Table: metric | how measured | needed before judging.

## Pass and fail rules
Thresholds and what proceed, iterate and stop mean, written as if signed off before launch.
</output_format>
