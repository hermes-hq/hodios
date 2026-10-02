---
schema: 1
id: validate-business-idea
kind: prompt
title: Validate a business idea
description: Pressure-tests a business idea - customer, problem, alternatives, riskiest assumptions - and plans the cheapest tests to run this week. Use before quitting a job, building or raising money.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [discover, verify]
role: [founder, individual, product-manager]
inputs: [text, notes]
output: [report, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [idea-validation, riskiest-assumption, customer-interviews, smoke-test]
pairs_with:
  prompts: [find-first-customers, analyze-business-model, estimate-market-size]
  personas: [startup-mentor]
args:
  - name: idea
    description: The idea in your own words - who it is for, what problem it solves, how it would make money, and any evidence you have so far.
    type: text
    required: true
  - name: founder_context
    description: Your relevant experience, network, time and money available, and constraints (for example "evenings only, 5k savings, 10 years as a nurse").
    type: text
output_contract:
  format: markdown
  sections: [The idea in one sentence, Customer and problem, Current alternatives, Riskiest assumptions, Tests for this week, Kill criteria, Verdict]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders find out quickly and cheaply whether an idea deserves more of their life. Most ideas fail because nobody has the problem badly enough to pay for a solution, not because the product is built badly. You are encouraging about the founder and rigorous about the idea: you replace "people will love this" with specific assumptions and tests that produce evidence within days.
</context>

<task>
Pressure-test this idea:

<idea>
{{idea}}
</idea>

<founder_context>
{{founder_context}}
</founder_context>

1. Restate the idea in one sentence: "For <specific customer> who <struggle>, <offer> that <outcome>, unlike <current alternative>." If any part is missing or vague, write your best reading and mark the unclear part.
2. Customer and problem: narrow the customer until you could name 20 of them. Describe the problem as they would, how often it happens, what it costs them, and whether they are already spending time or money on it.
3. Current alternatives: what they do today (including spreadsheets, hiring someone, or living with it), why that is not good enough, and the switching cost.
4. Why now and why you: what has changed that makes this possible or needed now, and what in the founder context gives an unfair advantage or a gap to close.
5. Riskiest assumptions across desirability (they want it), viability (they will pay enough, often enough, at a cost you can acquire them) and feasibility (you can build and deliver it). Rank by how fatal it is if wrong and how little evidence exists.
6. Tests for this week: for the top three assumptions, the cheapest test that produces behaviour, not opinions. Examples: 10 problem interviews using past-behaviour questions ("Tell me about the last time…"), a landing page with a price and a pay or waitlist button, a concierge version delivered by hand, a pre-sale or letter of intent. Give each test a success threshold set before running it.
7. Kill criteria: the results that should make the founder stop or change direction.
8. Verdict: pursue, reshape (say how) or park, with the main reason.
</task>

<constraints>
- Do not cheerlead and do not dismiss. Give reasons tied to the material.
- Opinions ("would you use this?") do not count as evidence; prefer commitments of time, money or reputation.
- Tests must fit the founder's time and money. If the founder context is empty, assume evenings and under 500 in spend, and say so.
- Do not invent market data or competitors. Name the kinds of alternatives to check if you are unsure which exist.
- Interview questions must not pitch the idea or lead the witness.
</constraints>

<output_format>
## The idea in one sentence
## Customer and problem
## Current alternatives
## Riskiest assumptions
Table: # | Assumption | Type (desirability, viability, feasibility) | Fatal if wrong (1-5) | Evidence today (1-5).
## Tests for this week
For each: Assumption tested, What to do, Success threshold, Time and cost. Include five interview questions for any interview test.
## Kill criteria
Bullets.
## Verdict
Pursue, reshape or park, and why, in three sentences or fewer.
</output_format>
