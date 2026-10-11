---
schema: 1
id: present-pricing-on-call
kind: prompt
title: Present pricing on a sales call
description: Prepares how to present price and options in a live sales meeting - what to recap first, the order of options, the exact words, the pause, and responses to the buyer's first reaction.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [sales-rep, founder, consultant]
requires: [none]
inputs: [text, notes]
output: [script, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [pricing-conversation, anchoring, good-better-best, value-recap, sales-call]
pairs_with:
  prompts: [handle-sales-objections, prepare-deal-negotiation, write-sales-proposal]
  personas: [sales-coach]
args:
  - name: deal
    description: The buyer, what they told you in discovery (problem, impact, priorities, decision process, budget hints) and who will be in the meeting.
    type: text
    required: true
  - name: pricing
    description: Your price list or the options you plan to offer, with what each includes, any discount authority you have, and payment terms.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Before the number, Options and order, Talk track, First reactions, Do not]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach sellers on the moment they say the price. Many deals are lost here, not in negotiation later: the seller apologises for the number, rushes through it, offers a discount before the buyer has reacted, or presents a price list with no link to what the buyer said they need. Experienced sellers recap the buyer's problem and its cost first, present a small number of options (usually two or three, with a clear recommendation), state the number plainly once, and then stop talking.

Option order matters. Presenting the fuller option first tends to set the reference point, and a recommended middle option often gets chosen when it clearly maps to the buyer's stated needs. But anchors must be real: an inflated "decoy" price the buyer sees through destroys trust. The buyer's first reaction ("that's more than we expected", silence, "can you do better?") is information, not yet a negotiation, and the right move is usually a question.
</context>

<task>
Prepare the pricing moment for this meeting.

<deal>
{{deal}}
</deal>

<pricing>
{{pricing}}
</pricing>

1. Write what to say before the number: a 30-second recap of the buyer's problem, its impact in their words or numbers, and what they said a good outcome looks like. Mark where to check agreement ("Did I get that right?").
2. Choose the options to show (two or three), the order, and which to recommend and why, tied to what the buyer said. If the price list does not support good options, say so.
3. Write the talk track: the exact words for presenting each option and the price, the recommendation, and the pause.
4. Prepare responses to likely first reactions: silence, "too expensive", "we only have X", "can you do better?", "need to check with finance", and enthusiasm. Each response starts with a question and protects price unless something is traded.
5. List what not to do in this specific meeting.
</task>

<constraints>
- Use only the prices and options given. Never invent discounts, list prices or ROI numbers; if the buyer's impact numbers are missing, use their words and suggest asking.
- No fake anchors or decoy options with prices you would never charge.
- No discount offered before the buyer has responded, and any concession must be traded for something (term, volume, timing, case study) within the user's stated authority.
- Keep the talk track spoken and short; no slide-reading.
</constraints>

<output_format>
## Before the number
The recap script.

## Options and order
Table: Order | Option | What it includes | Price | Why for this buyer. Then the recommendation.

## Talk track
Spoken lines with [pause] marks.

## First reactions
Table: Reaction | Question to ask | Response.

## Do not
Bullets.
</output_format>
