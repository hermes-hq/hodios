---
schema: 1
id: answer-price-shopper-calls
kind: prompt
title: Answer price shopper calls
description: Writes phone and message scripts for "how much for...?" enquiries that give an honest price range, ask two scoping questions, explain what is included and move to a quote visit or booking.
category: sales
version: 1.0.0
status: incubating
stage: [build]
role: [individual, founder, support-agent]
requires: [none]
inputs: [text, notes]
output: [script, message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [price-enquiries, front-desk, phone-script, price-ranges, booking-conversion, scoping-questions]
pairs_with:
  prompts: [present-repair-options, triage-open-quotes, answer-group-booking-enquiry, reply-to-inbound-lead]
  personas: [small-business-selling-mentor]
args:
  - name: service_and_pricing
    description: Your main services with the price ranges you actually charge and what moves the price (size, access, materials, urgency), what is included, call-out or consultation fees, and how quotes or bookings work.
    type: text
    required: true
  - name: common_questions
    description: The price questions you hear most and the follow-ups ("do you charge VAT?", "is that per hour?", "someone else said 80"). Optional.
    type: text
  - name: who_answers
    description: Who takes the calls (owner on the tools, receptionist, front desk), which shapes how much detail the script can hold.
    type: string
    default: owner or front desk
output_contract:
  format: markdown
  sections: [Price ranges, Call script, Message replies, Follow-up questions, Do and don't]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a trade, garage, salon, clinic front desk or removals firm handle the "how much for...?" call or message. Businesses lose these callers in two ways: refusing to give any figure ("we'd need to come and see"), which sounds evasive so the caller rings the next number, or quoting the lowest possible price to sound competitive, then losing trust when the real quote is higher. The honest middle works: a typical range with what moves it, two quick questions to narrow it, what is included that cheaper options often leave out, and an easy next step (book, quote visit, photo for a firmer price).

Who answers: {{who_answers}}
</context>

<task>
<service_and_pricing>
{{service_and_pricing}}
</service_and_pricing>

{{#common_questions}}<common_questions>
{{common_questions}}
</common_questions>{{/common_questions}}

1. For each main service, write a speakable range ("most boiler services are between 80 and 110; it depends on the boiler type and whether it's been serviced recently"), the two biggest price drivers, and what is included. Only use the ranges given; any missing range is [X].
2. Choose two scoping questions per service that change the price most and are easy to answer on the phone.
3. Write the call script: greeting, acknowledge the question, give the range, ask the two questions, narrow the range where the answers allow, state what is included, then offer the next step with two time options. Add the exit line for "I'm just ringing round".
4. Write message replies (text, WhatsApp, social DM) for the same question: under 400 characters, range plus one question plus next step, and a version asking for a photo when that would firm up the price.
5. Write replies for the common follow-ups, including "someone else quoted less" (ask what is included, explain differences only in terms of your own inclusions, no knocking competitors) and "can you do it cheaper?" (a reduced scope, timing or option, not a bare cut).
6. List do and don't habits for whoever answers.
</task>

<constraints>
- Never quote a figure outside the ranges given or promise a final price on the phone when the business says it needs a visit.
- Ranges must be honest: if the low end is rare, say what it applies to.
- Do not criticise competitors or claim what their prices include.
- Keep spoken parts short (each turn under 20 seconds) and natural for {{who_answers}}.
- Tax: say whether prices include sales tax or VAT only if the user states it; otherwise mark [check whether prices include tax].
- If no services or prices are given, ask for them and stop.
</constraints>

<output_format>
## Price ranges
Table: Service | Typical range | What moves the price | Included | Two scoping questions.

## Call script
The script with the caller's likely lines, plus the "ringing round" exit.

## Message replies
A standard reply and a photo-request reply per main service.

## Follow-up questions
Table: They ask | You say.

## Do and don't
Up to six bullets.
</output_format>
