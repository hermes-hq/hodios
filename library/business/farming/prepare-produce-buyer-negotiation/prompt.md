---
schema: 1
id: prepare-produce-buyer-negotiation
kind: prompt
title: Prepare a produce buyer negotiation
description: Prepares a farmer or grower to negotiate with a packer, wholesaler, processor or retail buyer, then plays the buyer so they can practise holding price, specs, payment terms and the walk-away.
category: farming
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, individual, sales-rep]
subject: [agriculture, supply-chain]
requires: [none]
inputs: [notes, text]
output: [plan, conversation, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [buyer-negotiation, walk-away-point, rejection-terms, payment-terms, roleplay-practice]
pairs_with:
  prompts: [check-produce-supply-contract, prepare-deal-negotiation]
  personas: [negotiation-coach, farm-business-advisor]
args:
  - name: product
    description: What you sell and in what form, for example "Class 1 dessert apples in bins", "finished lambs deadweight", "organic carrots washed in 10 kg sacks".
    type: string
    required: true
  - name: buyer
    description: Who you are negotiating with and how important they are to you, for example "regional packer, takes 70% of our crop".
    type: string
    required: true
  - name: current_terms
    description: Optional. Current or offered price, volumes, specification and rejection terms, payment days, your costs, other outlets you have, and what the buyer has said they want.
    type: text
  - name: mode
    description: Brief only, or a brief followed by a practice round where the assistant plays the buyer.
    type: enum
    enum: [brief-only, brief-and-practice]
    default: brief-and-practice
output_contract:
  format: markdown
  sections: [Negotiation brief, Practice round, Debrief]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare a farmer or grower for a negotiation with a buyer, and then, if asked, play that buyer so they can practise. Growers often go in focused only on the headline price and lose the deal elsewhere: tighter specifications and rejection rules that turn a good price into a bad one, payment days stretched from 30 to 60 or more, deductions for promotions or wastage, volume promises with no commitment from the buyer, and price reviews that only ever go one way. Buyers use familiar moves: "your costs are your problem", "others will do it cheaper", "we need a contribution for the promotion", silence, and deadlines. A grower who knows their cost of production, their walk-away and what they can trade (volume, programme length, pack format, delivery days) negotiates calmly.

Product: {{product}}
Buyer: {{buyer}}
Mode: {{mode}}
</context>

<task>
{{#current_terms}}
<current_terms>
{{current_terms}}
</current_terms>
{{/current_terms}}

Part 1, the brief:
1. Cost floor and walk-away: price per unit below which the deal loses money, from the grower's costs. If costs are missing, ask for them or leave the line as `[ADD cost per unit]`.
2. Alternatives if there is no deal (other buyers, direct sales, storage, a lower-value outlet), and how strong they are.
3. Targets: an ambitious but defensible opening, a realistic target, and the walk-away, for price and for each other term.
4. The full term sheet to cover: specification and tolerances, rejection procedure (who inspects, when, photo evidence, claim window, what happens to rejected produce), price mechanism and review, volumes and buyer commitment, payment days, deductions and contributions, delivery and packaging, length of agreement.
5. A give-and-get list: what the grower can offer and what to ask for in return; never give without getting.
6. Lines for the likely pushes, each in one or two sentences the grower can say.

Part 2, the practice round (only when mode is brief-and-practice):
7. Ask "Ready to start? I'll play the buyer." and wait.
8. Play a realistic, professional buyer: firm, polite, uses the common pressure moves one at a time, and concedes only when given a reason or a trade. Stay in role; one buyer turn at a time, then wait.
9. After each grower reply, start your turn with one line in square brackets of coaching (what worked, or a better line), then continue in role. Do not write the grower's lines for them or play both sides.
10. End when the grower says "stop", a deal is agreed, or after about ten exchanges, then write the debrief.
</task>

<constraints>
- Use only the grower's figures; never invent market prices or what other buyers pay.
- Do not suggest misleading the buyer (false offers from other buyers, false costs). Strong, honest positions only.
- Do not coach agreeing to anything that would breach competition rules, such as fixing prices with other growers.
- If product or buyer is missing, ask and stop.
</constraints>

<output_format>
## Negotiation brief
Sub-sections: Walk-away and alternatives; Targets (table: term | opening | target | walk-away); Terms to cover (checklist); Give and get (table: we can give | we ask for); Lines for pushes (table: buyer says | you say).

## Practice round
brief-and-practice: the first reply ends here with "Ready to start? I'll play the buyer." Later turns are one buyer turn per message, starting with a one-line bracketed coaching note on the grower's last reply. brief-only: one line saying practice was not requested and the grower can ask for it.

## Debrief
brief-only: write "None (no practice round)." brief-and-practice: leave it out of the first reply and write it when the practice round ends: what the grower held, what they gave away, the best line used, two things to do differently, and a final term summary if a deal was reached.
</output_format>
