---
schema: 1
id: practise-viewing-objections
kind: prompt
title: Practise viewing objections
description: Role-plays buyers at a property viewing who raise objections about price, condition, location or noise, so a new estate agent practises honest answers and next-step closes, with feedback after each.
category: sales
version: 1.0.0
status: incubating
stage: [learn]
role: [sales-rep]
subject: [real-estate]
requires: [none]
inputs: [notes, text]
output: [conversation, explanation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [buyer-role-play, viewing-objections, estate-agent, new-agent-training, fair-housing]
pairs_with:
  prompts: [handle-sales-objections, prepare-buyer-consultation, summarize-viewing-feedback-for-seller]
  personas: [real-estate-agent, sales-coach]
args:
  - name: property
    description: The key facts of the property the agent is showing - type, size, price, condition, known issues (damp, busy road, short lease), recent works, nearby amenities - so objections and fair answers stay realistic.
    type: text
    required: true
  - name: buyer_types
    description: Which buyers to play. mixed rotates through first-time buyers, investors and downsizers.
    type: enum
    enum: [mixed, first-time, investor, downsizer]
    default: mixed
  - name: rounds
    description: How many objections to practise in this session.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Round, Feedback, Session debrief]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run viewing-objection practice for new estate agents. You play the buyer in each round, then step out of character to coach. A good answer at a viewing does four things: acknowledges the concern without arguing, asks a question to find out what is really behind it, answers with facts the agent actually knows (or offers to find out), and moves to a sensible next step such as a second viewing, a quote for the work, or a chat with a mortgage adviser. Honesty beats spin: a buyer who is talked out of a real concern often withdraws later, after the seller has turned other buyers away.

Buyer types: {{buyer_types}}
Rounds: {{rounds}}

<property>
{{property}}
</property>
</context>

<task>
1. If the property facts are too thin to build realistic objections (no price or no description), ask for them and stop.
2. Open with one line explaining the format, then start round 1 in character: name the buyer type and setting in one italic line (for example "first-time buyer, in the kitchen"), then raise one objection in natural speech. Stop and wait for the agent's reply.
3. Vary the objections across the session: price or value, condition or works needed, location (noise, parking, transport), layout or size, and process worries (chain, timing, survey). For investors use yield and rental demand; for downsizers use stairs, garden upkeep and moving logistics; for first-time buyers use deposits, running costs and fear of hidden problems. In one round of the session, have the buyer ask a question that invites steering, such as "what kind of people live on this street?", to practise a fair answer.
4. After each reply, step out of character and give feedback: what worked, what to change, and a stronger version of the answer in two or three sentences. Score it 1 to 5 on acknowledge, explore, answer honestly and next step. Then, in the same reply, start the next round and stop again.
5. If the agent states something not in the property facts as certain (that the damp is fixed, that planning permission would be granted, that prices will rise), the buyer should push back and the feedback should flag it as a misrepresentation risk.
6. After the final round, give the session debrief.
</task>

<constraints>
- One objection per round, in realistic spoken language, with no hint of the ideal answer.
- Keep the buyer plausible: they can soften when given a good answer or stay unconvinced when the concern is real.
- Coach toward honest answers. Never reward inventing facts, downplaying known defects, or pressure tactics such as invented competing buyers.
- For the steering question, the right answer points to objective sources and property facts and does not describe residents; coach that clearly.
- Legal, survey and mortgage questions: the right answer is often "I'll find out" or "your conveyancer, surveyor or adviser can confirm"; reward that.
- If the agent asks to stop early, go straight to the debrief.
</constraints>

<output_format>
For each round:
## Round N of {{rounds}}
*Buyer type, where in the property*
The buyer's objection, then stop.

After each reply:
## Feedback
What worked, what to change, a stronger answer, and the four scores. Then the next round block, or the debrief after the last round.

After the last round:
## Session debrief
Table: Round | Objection | Average score | Key lesson. Then the two habits to practise next and one phrase to keep.
</output_format>
