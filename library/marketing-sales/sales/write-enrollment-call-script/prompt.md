---
schema: 1
id: write-enrollment-call-script
kind: prompt
title: Write an enrolment call script
description: Writes a consultative script for a booked call selling a coaching, consulting or course offer, with diagnosis, a fit check, price presentation and a no-pressure close.
category: sales
version: 1.0.0
status: incubating
stage: [build]
role: [consultant, founder, teacher, content-creator]
requires: [none]
inputs: [text, notes]
output: [script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [sales-call, coaching-business, high-ticket, consultative-selling, discovery-questions]
pairs_with:
  prompts: [present-pricing-on-call, handle-sales-objections, write-cold-call-script]
  personas: [sales-coach]
args:
  - name: offer
    description: The programme or service - what it includes, length, format, price and payment options, who it is for and who it is not for, and any genuine results or guarantees.
    type: text
    required: true
  - name: typical_client
    description: Who usually books the call, what they are struggling with, and what they usually ask or worry about.
    type: text
    required: true
  - name: call_length
    description: Call length in minutes.
    type: number
    default: 45
output_contract:
  format: markdown
  sections: [Call structure, Script, Fit check, Price and options, Objections, Ethics check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach coaches, consultants and course creators on their sales calls. The good version of this call is a short consultation: the prospect describes where they are, where they want to be and what has stopped them; the seller checks honestly whether the offer fits; and price is presented plainly with time to think. The bad version is the high-pressure "enrolment" script that manufactures pain, uses fake scarcity, pushes people to borrow or use credit they cannot afford, and treats every hesitation as an objection to overcome. That version produces refunds, chargebacks, complaints and a bad reputation.

Clients buy when they feel understood and see a clear path. The seller's job is to ask good questions, reflect back what they heard, explain how the offer addresses it (or say it does not), and make the decision easy, including an easy no.
</context>

<task>
Write a {{call_length}}-minute call script.

<offer>
{{offer}}
</offer>

<typical_client>
{{typical_client}}
</typical_client>

1. Lay out the call structure with timings: set the agenda and get permission, current situation, goal, obstacles and what they have tried, impact and priority, fit check, offer and price, questions, decision or next step.
2. Write the script with open questions for each stage and follow-ups that go deeper, plus a short summary-back line before presenting the offer.
3. Write the fit check: questions that reveal when the offer is not right (wrong stage, no time to do the work, needs a different professional), and a respectful line for recommending something else.
4. Write the price presentation: how to state the price and payment options plainly, what is included, then stop and let them respond.
5. Answer the common hesitations (price, time, need to talk to a partner, "I'll think about it") with questions and honest answers, including an easy way to decide later.
6. Add an ethics check the user can run against their own call.
</task>

<constraints>
- No fake scarcity or deadlines that are not real, no "if you don't do this you'll fail" framing, and no encouraging people to take on debt or use money they need for essentials.
- Use only the results and guarantees given; never invent testimonials, income claims or success rates.
- If the offer touches health, mental health, money or legal matters, include a line that the programme is not a substitute for a qualified professional where relevant.
- State the refund or cancellation terms plainly if given; if not given, tell the user to state them on the call.
- If the offer has a payment plan or third-party finance, state the total cost of each option and do not present finance as the default; note that consumer credit, cancellation and refund rules vary by country and the user should confirm what applies to them.
</constraints>

<output_format>
## Call structure
Table: Minutes | Stage | Goal.

## Script
Lines and questions by stage.

## Fit check
Questions and the "not a fit" line.

## Price and options
The presentation lines.

## Objections
Table: Hesitation | Question | Honest response.

## Ethics check
Checklist.
</output_format>
