---
schema: 1
id: handle-sales-objections
kind: prompt
title: Handle sales objections
description: Prepares responses to likely sales objections, with discovery questions that uncover the real concern behind each one and proof to use. Use before calls, for battlecards or for rep training.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [sales-rep, founder, consultant, manager]
requires: [none]
inputs: [spec, text]
output: [table, questions, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [objection-handling, battlecards, discovery-questions, sales-enablement]
pairs_with:
  prompts: [prepare-discovery-call, write-sales-follow-up, analyze-competitors]
  personas: [sales-coach]
args:
  - name: product
    description: What you sell, pricing, who buys it, main competitors or alternatives, and real proof (results, references, guarantees, security or compliance facts).
    type: text
    required: true
  - name: objections
    description: The objections you hear, in the buyer's words, one per line. Optional; without them the likely objections for this product and buyer are generated.
    type: text
  - name: buyer
    description: Who raises the objections (role, company size, industry) and where in the deal (first call, demo, procurement). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Objection map, Objection cards, Prevent them earlier]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a sales enablement lead who trains reps on objections. An objection is usually a symptom: "too expensive" can mean the value is unclear, the budget sits elsewhere, a competitor is cheaper, or the buyer is not convinced it will work for them. Reps who answer the surface objection with a rebuttal lose; reps who get curious, find the real concern and answer that one win, or learn quickly that the deal is not real.

So for each objection you prepare questions before answers, use proof instead of pressure, and know when the right move is to walk away.
</context>

<task>
Prepare objection handling.

<product>
{{product}}
</product>

{{#objections}}
<objections>
{{objections}}
</objections>
{{/objections}}

{{#buyer}}Buyer and stage: {{buyer}}{{/buyer}}

1. If no objections are given, list the six to eight most likely ones for this product, buyer and stage, written the way buyers say them.
2. Classify each objection: price or value, timing or priority, authority or process, need or status quo, trust or risk, competitor, or brush-off ("send me some information").
3. For each, write an objection card:
   - What might really be behind it: two or three hypotheses.
   - Acknowledge: one line that shows you heard it without agreeing or arguing.
   - Clarify: two or three open discovery questions that tell the hypotheses apart (for example "Compared to what?", "What would need to be true for this to be worth it?", "Who else weighs in on budget?").
   - Respond: a short answer for each likely real concern, built on proof from the product information.
   - Confirm: a question that checks the concern is resolved.
   - Walk away if: the signal that this is a real no, and how to exit gracefully.
4. List how to prevent the most common objections earlier in the sales process (in discovery, the demo or the proposal).
</task>

<constraints>
- Use only proof in the product information. Where a response needs proof that is missing (a reference customer, a security certificate, an ROI figure), write a [placeholder] and list it.
- No manipulation: no false scarcity, no pressure closes, no disparaging competitors, no discounts offered as the first response to a price objection. Wanting time to think or to consult a partner, spouse or colleague is legitimate; if asked to script around it so a buyer signs on the spot, decline that part and write the respectful version (clarify the concern, give the terms in writing, book a follow-up).
- Keep each spoken line natural and short enough to say on a call.
- If the product information is too thin to write credible responses, say what is missing and stop after the objection map.
</constraints>

<output_format>
## Objection map
A table: Objection (buyer's words) | Type | Most likely real concern.

## Objection cards
One card per objection with the labelled parts from step 3.

## Prevent them earlier
Bullets: objection, where to address it, how.
</output_format>
