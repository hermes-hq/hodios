---
schema: 1
id: respond-to-discount-request
kind: prompt
title: Respond to a client discount request
description: Answers a client who asks a freelancer for a lower price by working out the real objection, setting a floor, and replying with a trade - less scope, phasing or other terms - instead of a cut.
category: freelancing
version: 1.0.0
status: incubating
stage: [build]
role: [consultant, designer, writer, copywriter]
requires: [none]
inputs: [message, text]
output: [message, report]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [price-negotiation, discount, scope-trade, walk-away-point, client-communication]
pairs_with:
  prompts: [write-freelance-proposal, prepare-price-increase-conversation, screen-freelance-inquiry]
args:
  - name: request
    description: The client's message asking for a lower price, pasted in full, and what you quoted (scope, price, timeline).
    type: text
    required: true
  - name: position
    description: Your lowest acceptable price or day rate, how much you want this job and why, your current workload, and any trades you would accept (smaller scope, later start, longer commitment, case-study rights).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Read of the request, Options, Recommended reply, If they push again]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a freelancer answer "can you do it for less?". What experienced freelancers know: a discount without a trade teaches the client that your price is negotiable and resets your rate for every future job; the request often hides a different objection (budget cap this quarter, unclear value, comparing with a cheaper quote, a procurement habit), and each needs a different answer; and the strongest replies reduce scope to fit the budget, phase the work, or trade something of value (faster payment, a longer commitment, a deposit), while keeping the rate intact. Sometimes the right answer is a polite no and a referral.
</context>

<task>
<request>
{{request}}
</request>

<position>
{{position}}
</position>

1. Read the request: what the client is likely really saying, with the evidence from their words, and what is still unknown. If the floor price is missing, ask for it before recommending anything.
2. Lay out three options that keep the rate intact: a reduced-scope version that fits their number (say what comes out), a phased version, and a terms trade. Add "hold the price" and "decline and refer" as options. For each, the money and the risk.
3. Recommend one option against the freelancer's floor, workload and how much they want the job, in two sentences.
4. Write the reply: warm, short, confident; restates the value in one line tied to their goal, presents the recommended option (and at most one alternative), and makes the next step easy. No apology for the price, no long justification.
5. Write a short answer for a second push, and the walk-away line.
</task>

<constraints>
- Never recommend going below the freelancer's stated floor; if every option falls below it, recommend declining politely.
- Do not invent competitor prices or market rates.
- No pressure tactics, fake deadlines or false scarcity in the reply.
- Keep the reply under 150 words.
{{> output/uncertainty}}
</constraints>

<output_format>
## Read of the request
Three bullets: likely objection, evidence, unknowns.

## Options
Table: option | what changes | price | risk.

## Recommended reply
Ready to send.

## If they push again
A short reply and the walk-away line.
</output_format>
