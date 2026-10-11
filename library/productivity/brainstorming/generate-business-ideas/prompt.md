---
schema: 1
id: generate-business-ideas
kind: prompt
title: Generate business ideas that fit you
description: Generates business or side-income ideas from your skills, interests, contacts, time and money, scores them on fit and demand signals, and picks three to test cheaply before committing.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover]
role: [individual, founder, job-seeker, student]
requires: [none]
inputs: [topic, preferences, text]
output: [ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [business-ideas, side-income, founder-market-fit, self-employment]
pairs_with:
  prompts: [validate-business-idea, plan-side-business, turn-annoyances-into-ideas]
args:
  - name: about_me
    description: Your skills, work experience, interests, people you know or serve, hours per week available, money you could put in, country or region, and anything you will not do.
    type: text
    required: true
  - name: direction
    description: Optional - any direction you lean towards, such as "online only", "local service", "something with food", "keep my day job".
    type: text
output_contract:
  format: markdown
  sections: [Your assets, Idea list, Scoring, Three to test, Before you spend money]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Lists of "100 business ideas" fail because they ignore the person. Ideas that survive usually start from what the founder already has: skills people pay for, access to a group of customers, knowledge of a problem from the inside, and enough time and money to reach the first sales. Experienced founders also look for demand that is already visible (people paying for a worse solution, asking for help in forums, hiring someone informally) before building anything. Common traps are ideas that need large upfront capital, ideas that compete only on price, and ideas that clash with an employment contract or local licensing.

<about_me>
{{about_me}}
</about_me>
{{#direction}}
Direction: {{direction}}
{{/direction}}
</context>

<task>
1. Summarise the person's assets: skills, knowledge, access to customers, time, money, constraints, and anything they will not do. If there is too little to go on (for example only "I want to make money"), ask three short questions about skills, hours and budget, and stop.
2. Generate 15 to 20 ideas across different models: service, product, teaching or content, marketplace or matching, and buy-improve-resell. Each one line, tied to a named asset.
3. Score each idea from 1 to 5 on fit with skills, access to first customers, visible demand signals, startup cost (5 is cheapest), and time to first sale. Explain any 1 or 5.
4. Pick three ideas to test, balancing quick wins and bigger upside. For each: who exactly would buy, a demand signal to look for, a test that costs little and takes under two weeks, and a go or no-go threshold set in advance.
5. List checks before spending money: employment contract and conflict of interest, local registration, licences or insurance that may apply, and tax registration, as things to verify locally, not as rules stated as fact.
</task>

<constraints>
- Do not invent income figures, prices or market sizes; give ranges only when clearly marked as rough assumptions for the user to check.
- Do not promise earnings or recommend investments, loans or get-rich-quick schemes.
- No ideas that rely on deception, regulated activities without a licence, or unsafe practices; flag regulated areas (food, childcare, health, finance, transport) as needing local checks.
- Respect the person's stated limits and will-not-do list.
</constraints>

<output_format>
## Your assets
Bulleted summary.

## Idea list
Numbered list: idea, model, asset it uses.

## Scoring
Table: # | Fit | Access | Demand signals | Cost | Speed | Total.

## Three to test
For each: buyer, demand signal, two-week test, go or no-go threshold.

## Before you spend money
Checklist of things to verify locally.
</output_format>
