---
schema: 1
id: write-cta-variations
kind: prompt
title: Write call-to-action variations
description: Writes call-to-action button text and the supporting line around it for a page, email or ad, matched to the reader's commitment level and what happens after the click, with variants to test.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, founder, designer]
requires: [none]
inputs: [text]
output: [copy, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [call-to-action, button-copy, conversion, ab-test, friction-reducers]
pairs_with:
  prompts: [write-headline-variations, write-landing-page-copy, critique-marketing-copy, write-ux-microcopy]
  personas: [copywriter]
args:
  - name: context
    description: Where the call to action appears (landing page hero, pricing card, email, ad, end of a blog post), the offer, and exactly what happens after the click (form, checkout, calendar, download, account creation).
    type: text
    required: true
  - name: audience
    description: Who sees it and how warm they are (for example "first-time visitors from a Google search", "trial users on day 12").
    type: string
    required: true
  - name: readiness
    description: How ready the reader is. cold for people who do not know you yet, considering for people comparing options, ready for people who have decided and need a final push.
    type: enum
    enum: [cold, considering, ready]
    default: considering
  - name: current_cta
    description: The current button text and its performance if known. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Commitment check, CTA options, Supporting lines, Test plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write calls to action. A button's words are a promise about what happens next. "Submit", "Learn more" and "Get started" fail because they say nothing about what the reader gets. Strong calls to action name the value or the next concrete step ("Get my quote", "See pricing", "Book a 20-minute call"), and match how much the reader is being asked to commit to how ready they are: a cold visitor will not "Buy now", but may "See how it works"; a ready buyer is slowed down by a vague "Explore".

The line next to the button matters as much as the button: it removes the specific fear at that moment ("No card needed", "Cancel anytime", "Takes 2 minutes", "We reply within one working day"), but only when it is true. And the button must match the next screen; a "Get free guide" button that leads to a demo-booking form breaks trust and conversion.
</context>

<task>
<context_details>
{{context}}
</context_details>

Audience: {{audience}}
Readiness: {{readiness}}

{{#current_cta}}Current CTA: {{current_cta}}{{/current_cta}}

1. If it is unclear what happens after the click, ask and stop, because the button must describe it.
2. Commitment check: what the click asks of the reader (time, money, personal data, a call with sales), whether that fits the readiness level, and the main fear at this moment. If the ask is too big for the readiness, say so and suggest a lower-commitment primary or secondary action.
3. Write eight to ten button options, each two to five words, starting with a verb, labelled by type (value, next step, first person such as "Get my plan", low commitment, specific time or number).
4. Write supporting lines (one per main fear) to place under or next to the button, using only facts in the inputs.
5. If there is a current call to action, say what it does wrong or right in one or two lines.
6. Recommend a control and two challengers to test, with the hypothesis for each and what to measure (click rate and the completion of the next step, not clicks alone).
</task>

<constraints>
- Button text two to five words, starts with a verb, describes what the reader gets or does next. No "Submit", "Click here" or "Learn more" unless you explain why it fits.
- Supporting lines only state facts from the inputs (free, no card, cancel anytime, response time). Mark anything unconfirmed as [CONFIRM: ...].
- No fake urgency or guilt ("Last chance!", "Don't miss out" without a real deadline).
- Keep the button consistent with the next screen; flag any mismatch in the inputs.
</constraints>

<output_format>
## Commitment check
Bullets: the ask, fit with readiness, the main fear, any recommended change.

## CTA options
A table: Button text | Type | Best when.

## Supporting lines
A table: Fear | Supporting line.

## Test plan
A table: Version | Button and supporting line | Hypothesis | Measure.
</output_format>
