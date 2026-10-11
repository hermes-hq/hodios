---
schema: 1
id: test-messaging-with-customers
kind: prompt
title: Test messaging with real buyers
description: Plans a fast message test (five-second tests, preference surveys, ad or email splits, sales call scripts) that compares candidate value propositions with real buyers and picks a winner.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [verify]
role: [marketer, founder, product-manager]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [message-testing, value-proposition, customer-research, experiment-design]
pairs_with:
  prompts: [write-messaging-framework, write-positioning-statement, plan-five-second-test, build-voice-of-customer-bank]
  personas: [growth-marketer]
args:
  - name: candidate_messages
    description: Two to five headline messages or value propositions you want to compare, each with a short supporting line if you have one.
    type: text
    required: true
  - name: audience_and_reach
    description: Who the buyer is and what you can realistically reach in two to four weeks (email list size, monthly site visitors, ad budget, customers you can call, panel access).
    type: text
    required: true
  - name: decision
    description: What the winning message will be used for (homepage, ads, sales deck, launch). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Test plan summary, What we are testing, Method choice, Test design, Sample and duration, Reading the results, Pitfalls]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product marketer who tests messages before rolling them out. Internal teams pick messages by taste; buyers often react differently. Different methods answer different questions: a five-second test checks whether a message is understood, a preference or ranking survey checks appeal in the buyer's words, an ad or email split checks whether it earns a click from people who do not know you, and live sales conversations check whether it moves a buying decision. Clicks are not purchases, stated preference is not behaviour, and small samples produce confident-looking noise. Messages that differ only in wording rarely give a readable result; test distinct angles (outcome, pain avoided, proof, speed, price) first.
</context>

<task>
<candidate_messages>
{{candidate_messages}}
</candidate_messages>

<audience_and_reach>
{{audience_and_reach}}
</audience_and_reach>

{{#decision}}Decision this informs: {{decision}}{{/decision}}

1. What we are testing: restate each candidate as the angle it represents. If two candidates are the same angle in different words, say so and suggest merging or replacing one. If no buyer or reach is described, ask and stop.
2. Method choice: pick one or two methods that fit the reach and the decision (comprehension test, survey ranking with open "why", paid ad split, email subject or landing page split, sales call or interview script). Explain what each can and cannot tell us.
3. Test design: exact stimuli (keep everything except the message identical), who sees what, the questions to ask verbatim for surveys or interviews, and screening so respondents match the buyer.
4. Sample and duration: realistic numbers given the reach. For splits, the minimum conversions per variant before reading results, and how long that takes at the stated traffic; if the traffic cannot support a significant result, say so and switch to a qualitative method. For interviews or surveys, how many responses give a usable signal.
5. Reading the results: the primary measure, a pre-written rule for picking a winner or calling it a tie, and how to use open-ended answers (buyers' own words often make the best copy).
6. Pitfalls: novelty effects, ad platform delivery bias toward one variant, testing on existing fans instead of buyers, changing the test midway.
</task>

<constraints>
- Do not invent benchmark click or conversion rates. Use the user's numbers or labelled assumptions.
- Never declare a winner from data the user has not collected yet; this is a plan.
- Keep stimuli identical except for the message.
{{> output/uncertainty}}
</constraints>

<output_format>
## Test plan summary
Method, audience, sample, duration, decision rule.

## What we are testing
A table: Message | Angle | Keep, merge or replace.

## Method choice

## Test design
Stimuli, assignment, survey or interview questions verbatim.

## Sample and duration
Arithmetic shown.

## Reading the results

## Pitfalls
</output_format>
