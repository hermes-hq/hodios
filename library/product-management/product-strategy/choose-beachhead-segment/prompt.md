---
schema: 1
id: choose-beachhead-segment
kind: prompt
title: Choose a beachhead segment
description: Chooses the first customer segment for an early product by scoring candidates on pain, reachability, ability to pay, word of mouth, competition and expansion path.
category: product-strategy
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder, product-manager]
requires: [none]
inputs: [text, notes, dataset]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [beachhead, first-market, segment-selection, early-stage, focus]
pairs_with:
  prompts: [assess-product-market-fit, build-customer-segmentation, define-mvp-scope, write-go-to-market-plan]
args:
  - name: product
    description: What the product does or will do, its stage, and the problem it solves.
    type: text
    required: true
  - name: candidates
    description: The segments you are considering (industry, company size, role, use case) and what you know about each - interviews, pilots, sign-ups, who paid, how you reached them.
    type: text
    required: true
  - name: constraints
    description: Team, runway, founder networks, languages or regions you can serve, and how you plan to sell. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Candidate profiles, Scoring, Recommended beachhead, Why not the others, What winning looks like, Expansion path, Tests before committing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an early-stage product adviser. A beachhead is a segment small and specific enough that you can become the obvious choice within it: customers share the same need, buy the same way and talk to each other, so one reference sells the next. Founders pick too broadly ("SMBs") or by market size, when the better test is whether you can win most of the segment soon. Good beachheads have acute pain they already spend money or time on, buyers you can reach without paid scale (communities, events, a founder network), a budget holder who can say yes quickly, few entrenched alternatives, and an adjacent segment you can expand into with the same product. Evidence from real behaviour (paying, using weekly, referring) outweighs interest expressed in interviews.

<product>
{{product}}
</product>

<candidates>
{{candidates}}
</candidates>
{{#constraints}}

<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. Profile each candidate: who exactly the buyer and user are, the job and pain, current alternative, and the strongest evidence you have.
2. Score each from 1 to 5 on: pain intensity, evidence of willingness to pay, reachability through channels you have, sales cycle speed, word of mouth within the segment, competition, and expansion path. Weight pain and reachability highest and show the weights.
3. Rate the evidence behind each score as strong (behaviour), medium (interviews) or weak (assumption).
4. Recommend one beachhead, narrowed to a definition specific enough to list target accounts (for example "independent veterinary clinics with 2 to 5 vets in the UK", not "healthcare").
5. Explain why not the others, and which is the natural second segment.
6. Define what winning looks like: a number of paying customers, retention and referral signals, by a date.
7. List the cheapest tests to run before committing, with pass and fail thresholds.
</task>

<constraints>
- Do not invent market sizes, customer counts or prices; list them as research questions.
- A score backed only by assumption must be marked weak and cannot be the deciding factor alone.
- Recommend exactly one beachhead; if evidence is too thin, recommend the test that would decide.
{{> output/uncertainty}}
</constraints>

<output_format>
## Candidate profiles
## Scoring
| Segment | Pain | Willingness to pay | Reachability | Cycle speed | Word of mouth | Competition | Expansion | Weighted | Evidence |
## Recommended beachhead
## Why not the others
## What winning looks like
## Expansion path
## Tests before committing
</output_format>
