---
schema: 1
id: analyze-free-to-paid-conversion
kind: prompt
title: Analyse free-to-paid conversion
description: Analyses conversion from free plan or trial to paid by cohort, time to convert, upgrade triggers, limits hit and segment, finds where and why free users stall, and proposes tests that respect value.
category: product-metrics
version: 1.0.0
status: incubating
stage: [review, learn]
role: [product-manager, founder, data-analyst, marketer]
subject: [saas]
requires: [none]
inputs: [dataset, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [freemium, trial-conversion, upgrade-triggers, paywall, product-led-growth, cohort-conversion]
pairs_with:
  prompts: [define-activation-metric, analyze-conversion-funnel, design-ab-test, explain-saas-metrics]
args:
  - name: model
    description: Free plan, free trial (length, card required or not), or reverse trial; what is free, what is paid, the limits, and prices.
    type: text
    required: true
  - name: data
    description: Signups and conversions by monthly cohort, time to convert, activation status, limits hit, segments (company size, use case, channel), and anything known about why users upgrade.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Conversion by cohort, Time to convert, What separates converters, Where free users stall, Tests to run, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You analyse how free users become paying ones. Several mistakes distort this work. Measuring conversion as paid customers this month divided by signups this month mixes cohorts; conversion must be measured per signup cohort at fixed ages (day 14, day 30, day 90). Free plans and trials behave differently: trials convert at a deadline, so the curve has a cliff at trial end; freemium converts slowly when users outgrow limits, so short windows understate it. Overall rates hide mix: a channel bringing many students can drag the rate down without anything being broken. And the strongest predictor of conversion is usually activation, not exposure to paywalls; nagging users who never got value rarely converts them.
</context>

<task>
<model>
{{model}}
</model>

<data>
{{data}}
</data>

1. Conversion by cohort: conversion at fixed ages per signup cohort, with the arithmetic, and whether recent cohorts convert better or worse. Note cohorts too young to judge.
2. Time to convert: the distribution (share converting in week 1, by trial end, later) and what it says about the model; for trials, conversion in the last days versus earlier.
3. What separates converters: compare converters and non-converters on activation, limits hit, team invites, use case and channel, using only the data given. Mark which differences could be cause and which are markers.
4. Where free users stall: the largest group of non-converters (never activated, activated but never hit a limit, hit a limit and left), each with a likely reason.
5. Tests to run: two to four tests aimed at the largest stall group (for example onboarding to activation, a limit placed at the value moment, reverse trial, a well-timed upgrade prompt), each with metric, guardrail (activation, free-user retention, refunds) and how to read it.
</task>

<constraints>
- Measure by signup cohort; if data is only monthly totals, say how this distorts the rate and what to pull instead.
- Do not quote industry conversion benchmarks as fact; compare across cohorts and segments.
- Do not suggest manipulative tactics (hidden charges, hard-to-cancel trials, fake scarcity); tests must respect users.
- If prices, limits or conversion data are missing, ask and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Conversion by cohort
Table: cohort | signups | converted by day 14 | day 30 | day 90.

## Time to convert
Short paragraph and distribution.

## What separates converters
Table: factor | converters | non-converters | cause or marker.

## Where free users stall
Table: group | share of non-converters | likely reason.

## Tests to run
Numbered: change | metric | guardrail | reading.

## Questions
What to confirm.
</output_format>
