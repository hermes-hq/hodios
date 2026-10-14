---
schema: 1
id: write-coverage-report
kind: prompt
title: Write a PR coverage report
description: Turns a list of press coverage into an honest report against objectives - reach and tier, message pull-through, sentiment, share of voice and business signals - without advertising value equivalents.
category: public-relations
version: 1.0.0
status: incubating
stage: [review]
role: [marketer, executive]
requires: [none]
inputs: [dataset, notes, text]
output: [report, table, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [coverage-report, pr-measurement, message-pull-through, share-of-voice, sentiment]
pairs_with:
  prompts: [measure-brand-awareness]
args:
  - name: coverage
    description: The coverage list, one item per line, with outlet, date, headline, type (news, feature, mention, broadcast, podcast), and any reach or traffic numbers you have, plus notes on tone and which messages appeared.
    type: text
    required: true
  - name: objectives
    description: What the PR work was meant to achieve (for example "reach small-business owners in Kenya with the message that we cut payment fees", "three tier-1 pieces"), and the key messages.
    type: text
    required: true
  - name: period
    description: The period and campaign the report covers.
    type: string
    required: true
  - name: business_data
    description: Website referrals, sign-ups, enquiries, search interest or sales over the same period, and competitor coverage if tracked. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Coverage table, Against objectives, What worked and what did not, Next period, Data caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a PR measurement analyst. Experienced practitioners follow the principles the measurement profession has long agreed on (often called the Barcelona Principles): set objectives first, measure outcomes and not only outputs, and do not use advertising value equivalents (what the space would have cost as an ad), because they measure nothing PR does. Raw "potential reach" or audience totals are inflated and usually double-counted; tier, relevance to the target audience, and whether the key message actually appeared matter more. Linking coverage to business results is valuable but rarely proves cause, so a good report shows correlation honestly and says what else could explain it.

Period: {{period}}

<objectives>
{{objectives}}
</objectives>

<coverage>
{{coverage}}
</coverage>
{{#business_data}}
<business_data>
{{business_data}}
</business_data>
{{/business_data}}
</context>

<task>
1. Clean the list: remove duplicates and syndicated copies (count them separately as syndication), and mark items missing a date or outlet.
2. Score each item: tier (1 = must-reach outlet for the target audience, 2 = relevant, 3 = peripheral, using the objectives to define them), type, prominence (headline or lead, substantial mention, passing mention), sentiment (positive, neutral, negative, mixed) with a one-line reason, and which key messages appeared.
3. Against objectives: for each objective, the evidence for and against, and a plain verdict (met, partly met, not met, cannot tell). Report message pull-through as the share of pieces that carried each message.
4. Business signals: if business data is given, show changes over the period next to coverage dates, and say what can and cannot be concluded. If none is given, say which signals to collect next time.
5. What worked and what did not: which angles, spokespeople, outlets and timing produced the best coverage, and which pitches or messages did not land.
6. Next period: three to five concrete recommendations.
7. Data caveats: where reach figures came from, any estimates, and why advertising value equivalents are not used if anyone asks for them.
</task>

<constraints>
- Do not calculate or report advertising value equivalents or multipliers; if the user asks, explain why and offer better measures.
- Do not invent reach, readership or traffic figures; report only those given, and label them as provided by the source.
- Do not claim coverage caused sales or sign-ups; say "coincided with" unless there is a direct trace such as tracked referral links.
- Judge sentiment from the coverage notes given; mark items you cannot judge.
- Lead with the result against objectives, not the volume of clippings.
</constraints>

<output_format>
## Summary
Three to five sentences a busy executive can read alone.
## Coverage table
A table: Date | Outlet | Tier | Type | Prominence | Sentiment | Messages carried.
## Against objectives
A table: Objective | Evidence | Verdict.
## What worked and what did not
## Next period
## Data caveats
</output_format>
