---
schema: 1
id: prepare-customer-reference-call
kind: prompt
title: Prepare a customer reference call
description: Prepares both sides of a sales reference call once a customer has agreed - a briefing for the reference, a question guide for the prospect, what to cover and what to avoid, and the thank-you.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [sales-rep, founder, consultant]
requires: [none]
inputs: [notes, text]
output: [plan, message, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [customer-references, reference-calls, social-proof, late-stage-deals, customer-advocacy]
pairs_with:
  prompts: [request-customer-reference, inspect-deal-qualification, plan-competitive-deal-strategy]
args:
  - name: reference
    description: The reference customer - their company, the person's role, what they bought, when they started, results they have seen (in their words if possible), any problems along the way, and how often they have already been asked to do references.
    type: text
    required: true
  - name: prospect
    description: The prospect - their situation, the concerns or doubts the reference call should address, who will join, competitors they are considering, and where the deal stands.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Why this match, Briefing for the reference, Questions the prospect will likely ask, Guide for the prospect, Logistics, Thank-you]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare reference calls in late-stage B2B deals. Buyers trust a peer more than any seller, so a good reference call can settle the doubt that is holding a deal back, and a poorly matched or unprepared one can raise new doubts. Sellers who manage references well match on what matters to the prospect (similar size, industry, problem, or the same switch from the same competitor), brief the reference on the prospect's real concerns without scripting their answers, let the reference be honest about problems (buyers distrust references that sound perfect), stay off the call or leave early when the prospect wants candour, and protect their references from overuse: a happy customer asked too often becomes an unhappy one.
</context>

<task>
<reference>
{{reference}}
</reference>

<prospect>
{{prospect}}
</prospect>

1. **Why this match:** what the reference and prospect share and the specific doubt this call should address. If the match is weak, say so and what a better match would look like.
2. **Briefing for the reference:** a short message to the reference covering who the prospect is, what they are worried about, the topics that would help, a reminder to be candid including about challenges, what not to share (your pricing, other customers' details, anything under their own confidentiality obligations), and the practical details. Under 200 words.
3. **Questions the prospect will likely ask:** eight to ten questions they will probably ask, based on their concerns, so the reference is not surprised.
4. **Guide for the prospect:** a short note suggesting questions they might ask, and offering to leave the call so they can speak freely.
5. **Logistics:** length (20 to 30 minutes), who joins, whether the seller stays, scheduling, and what the seller does right after (debrief with the prospect).
6. **Thank-you:** a thank-you message to the reference sent the same day, and a suggestion for recognising their help appropriately, checking whether their employer allows gifts.
</task>

<constraints>
- Never put words in the reference's mouth or ask them to overstate results; suggest topics, not scripted answers.
- Use only the facts given about the reference's results. Do not invent figures.
- Do not share the prospect's confidential details with the reference beyond what is needed and what the prospect agreed to.
- If the reference has been asked many times recently, flag the overuse risk and suggest alternatives.
</constraints>

<output_format>
## Why this match
Two or three sentences.

## Briefing for the reference
The message.

## Questions the prospect will likely ask
Numbered list.

## Guide for the prospect
The note.

## Logistics
Bullets.

## Thank-you
The message and the recognition suggestion.
</output_format>
