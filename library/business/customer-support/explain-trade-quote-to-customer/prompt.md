---
schema: 1
id: explain-trade-quote-to-customer
kind: prompt
title: Explain a trade quote to a customer
description: Writes a calm reply when a customer asks why a trade quote is high or differs from another - what is included, what cheaper quotes often omit, and honest ways to cut cost without a reflex discount.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [founder, sales-rep]
subject: [construction]
requires: [none]
inputs: [message, text]
output: [message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [quote, price-objection, like-for-like, scope-of-work]
pairs_with:
  prompts: [handle-workmanship-callback, resolve-invoice-dispute, triage-service-call]
args:
  - name: quote
    description: Your quote as sent - line items or a summary, materials and their grade, labour days, what is included and excluded, guarantee, tax, payment terms and validity.
    type: text
    required: true
  - name: customer_message
    description: What the customer said - for example "Another firm quoted 2,400, why are you 3,600?" - including any detail of the other quote they shared.
    type: text
    required: true
  - name: room_to_move
    description: Optional. What you are genuinely willing to change - scope you could drop, a cheaper material, flexible timing, phasing, the customer buying materials - and anything you will not do.
    type: text
output_contract:
  format: markdown
  sections: [What they are really asking, Reply, Like-for-like checklist, Options to reduce cost, Notes for you]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a tradesperson or small contractor answer a customer who is questioning a quote. Most price objections are really one of three things: the customer cannot see what they are paying for, they are comparing quotes that do not cover the same job, or the budget is genuinely lower than the job. Experienced contractors explain value plainly, help the customer compare like for like without running down the competitor, and reduce price only by reducing scope or cost, never by a reflex discount, which signals the first price was padded.
</context>

<task>
<quote>
{{quote}}
</quote>

<customer_message>
{{customer_message}}
</customer_message>

{{#room_to_move}}
<room_to_move>
{{room_to_move}}
</room_to_move>
{{/room_to_move}}

1. Name which of the three objections this is (visibility, comparison or budget) and any emotion behind it (worry about being overcharged, embarrassment, a deadline).
2. From the quote, pull the items that customers rarely see the cost of and that cheaper quotes often leave out or price later: preparation and protection, removal and disposal of waste, making good (plastering, decorating, flooring after the work), materials grade and brand, certification, testing or sign-off paperwork, permits, tax, insurance, guarantee length, contingency, and the number of people and days.
3. Write the reply:
   - thank them for asking and say it is a fair question;
   - explain in two to four plain bullets what the price covers that matters to them;
   - suggest they check the other quote covers the same items (offer the checklist) without saying the other firm is cutting corners;
   - offer real options if there is room to move, each tied to a scope or material change and its saving;
   - end with a next step (a call, a revised quote by a date, or a site meeting).
4. Build a like-for-like checklist the customer can hold against any quote.
5. List options to reduce cost from the room to move given; if none was given, suggest typical levers marked "only if you are willing" with no figures.
</task>

<constraints>
- Use only the figures and inclusions in the quote. Never invent prices, savings or the competitor's contents; mark unknown savings as [X].
- Never disparage another firm or imply they are dishonest.
- Do not offer a discount unless the room to move includes one; if it does, tie it to something (paying a deposit early, a flexible start date).
- If the customer's budget is far below the job, say so kindly and suggest phasing or a smaller first stage rather than a cheaper version of the whole job done badly.
- Keep the reply under about 200 words, warm and confident, no jargon.
</constraints>

<output_format>
## What they are really asking
Two lines: the objection type and what would reassure them.

## Reply
Ready to send.

## Like-for-like checklist
8-12 checkbox lines.

## Options to reduce cost
Table: option | what changes | saving | trade-off.

## Notes for you
Bullets: anything unclear in your own quote that invited the question, and how to word it next time.
</output_format>
