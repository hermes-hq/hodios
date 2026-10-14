---
schema: 1
id: survey-non-converting-trial-users
kind: prompt
title: Learn why trial users did not convert
description: Plans how to learn why trial users did not buy, checking usage data first, then an exit question, a reply-worthy email, short interviews and a frame for coding the reasons.
category: user-feedback
version: 1.0.0
status: incubating
stage: [discover]
role: [product-manager, founder, marketer, ux-researcher]
requires: [none]
inputs: [text, dataset]
output: [plan, questions, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [free-trial, trial-conversion, lost-users, exit-survey, saas-growth]
pairs_with:
  prompts: [analyze-cancellation-feedback, design-in-product-survey, write-customer-interview-guide]
args:
  - name: product_and_trial
    description: The product, trial length and type (opt-in or card required, freemium), what counts as converting, and monthly trial volume and conversion rate if known.
    type: text
    required: true
  - name: what_you_know
    description: Data or hunches you already have, for example activation rates, steps where trial users stop, or reasons sales hears. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What to learn, Segments, Behavioural check first, Exit question, Email, Interviews, Coding the reasons, Timeline and owners]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help software teams understand trial users who never paid. People who leave a trial owe you nothing and rarely explain themselves, and when they do, the reason they give ("too expensive", "no time") is often a polite cover for "I never got it working" or "it was not for me". Most non-converters never reached the moment the product delivers value, so the first split is behavioural: never activated, activated but did not buy, and still evaluating when the trial ended. Each group needs a different question. Usage data answers "what did they do"; asking answers "why" and "what did they use instead". Response rates from non-converters are low, so a short exit question, a plain personal email and a handful of recruited interviews work better than a long survey.

Product and trial:

<product_and_trial>
{{product_and_trial}}
</product_and_trial>
{{#what_you_know}}

What we already know:

<what_you_know>
{{what_you_know}}
</what_you_know>
{{/what_you_know}}
</context>

<task>
1. State what to learn and the decision it feeds (onboarding changes, trial length, pricing, targeting, sales assist). Name the two or three hypotheses worth testing first, based on what was given.
2. Define segments using behaviour: never activated (define the activation event for this product, or propose one and mark it as a proposal), activated but did not buy, and evaluating or blocked by procurement at trial end. Add any segment split that matters (self-serve versus sales-assisted, company size, signup source).
3. List the usage checks to run before asking anyone: where each segment stopped, time to first value, features touched, team invites, and whether conversion differs by signup source. Say what each check would show.
4. Write the exit question shown at trial end or on downgrade: one single-select question with 6 to 8 reasons in plain words (including "I never got it set up", "It did not do what I needed", "Price", "Timing or approval", "Chose another tool", "Still deciding", "Other") and an optional text box.
5. Write a plain-text email from a real person to each main segment, with one question and an easy reply, sent within a few days of trial end.
6. Plan short interviews: 5 to 8 per key segment as a working number, 20 minutes, a modest incentive since they have no relationship with you, and a guide that walks the timeline (what triggered the signup, what they tried, where it stalled, what they use now, what would have had to be true to pay). No pitching.
7. Give a coding frame for reasons: categories with definitions and examples (wrong fit, never reached value, missing capability, price or packaging, timing or approval, chose a competitor, not a real buyer), how to code stated versus observed reasons, and how to report counts with the small sample in mind.
8. Lay out a timeline and owners for four to six weeks.
</task>

<constraints>
- Never treat a stated reason as the true cause without checking behaviour.
- No sales pitch in research emails or interviews; do not offer discounts as part of research.
- Label any response rate or sample size as an assumption.
- Respect opt-outs and contact rules; do not email people who did not agree to contact where local law requires it.
</constraints>

<output_format>
## What to learn
Decision and hypotheses.

## Segments
A table: segment | definition | likely question.

## Behavioural check first
Bullets.

## Exit question
The question and options.

## Email
One email per main segment.

## Interviews
Recruitment, incentive and the guide.

## Coding the reasons
A table: code | definition | example.

## Timeline and owners
A short table by week.
</output_format>
