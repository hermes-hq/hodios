---
schema: 1
id: write-retail-sales-approach
kind: prompt
title: Write an in-store sales approach
description: Writes a helpful in-store sales approach for retail staff with greetings by shopper type, needs questions, product matching, objection handling and a no-pressure close.
category: sales
version: 1.0.0
status: incubating
stage: [build]
role: [sales-rep, manager, founder]
requires: [none]
inputs: [text, notes]
output: [script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [retail-sales, in-store-selling, consultative-selling, staff-training, customer-experience]
pairs_with:
  prompts: [handle-sales-objections, build-sales-playbook]
  personas: [sales-coach]
args:
  - name: store_type
    description: The kind of store and its setting, for example independent bike shop, mid-range furniture showroom, specialty tea shop, phone carrier store.
    type: string
    required: true
  - name: products
    description: The main product lines, price ranges, what customers usually come in for, common questions, add-ons that genuinely help, and anything staff often get wrong. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The approach in one line, Greeting, Discovery questions, Matching products, When they hesitate, Closing, Never say, Practice drills]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a retail sales trainer who has run shop floors and coached new staff. Good in-store selling feels like getting help from a knowledgeable friend: the shopper is acknowledged quickly, left alone when they want to browse, asked a few good questions when they are ready, shown two or three options that fit what they said, and allowed to leave without buying and without feeling bad. Pushy tactics win one sale and lose the customer and their friends. Staff need lines they can actually say, adapted to the store, not a corporate script.
</context>

<task>
Write an in-store sales approach for this store: {{store_type}}

{{#products}}
<products>
{{products}}
</products>
{{/products}}

1. State the approach in one line staff can remember.
2. Greeting: when to greet (acknowledge everyone quickly, approach later), and three or four natural opening lines for different shoppers: browsing, on a mission for something specific, buying a gift, returning with a problem or a return. Replace "Can I help you?" with openers that invite a real answer.
3. Discovery: six to eight short questions about use, who it is for, what they have now and what they dislike about it, must-haves, and budget asked comfortably. Mark the two to ask first.
4. Matching: how to turn answers into a recommendation. Show at most three options, link each to something the shopper said, use the "because you mentioned..." pattern, let them handle the product, and suggest add-ons only when they solve a stated need. Give two worked examples from this store's products.
5. Hesitation: short, honest responses for "just looking", "it's too expensive", "I need to think about it", "I can get it cheaper online" and "I need to check with my partner".
6. Closing: low-pressure ways to ask (offering a choice, summarising and asking if it fits, offering to hold the item), and how to end well when they do not buy.
7. List phrases and behaviours staff should never use.
8. Write three role-play drills for a team huddle, each with a shopper brief and what good looks like.
</task>

<constraints>
- No false urgency or scarcity, no misleading claims about stock, price or warranties, and no add-on pressure.
- Respect "just looking": one friendly offer of help, then space, then a later check-in.
- Lines are short, spoken and plain, so a new hire can say them on day one.
- Use only products and details from the input. If the products are not given, keep examples generic to {{store_type}} and say staff should swap in real ones.
- Include one reminder about serving shoppers with disabilities or language barriers respectfully, such as speaking to the customer and not their companion.
</constraints>

<output_format>
## The approach in one line
## Greeting
Timing guidance, then openers by shopper type.
## Discovery questions
Numbered, with the first two marked.
## Matching products
The method, then two worked examples.
## When they hesitate
A table: Shopper says | Staff can say.
## Closing
Ways to ask, and how to end without a sale.
## Never say
Bulleted.
## Practice drills
Three drills.
</output_format>
