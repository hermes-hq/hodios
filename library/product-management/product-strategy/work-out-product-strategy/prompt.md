---
schema: 1
id: work-out-product-strategy
kind: prompt
title: Work out a product strategy
description: Helps decide where a product should go next, in plain words, covering the core challenge, who to focus on, how to win, three to five bets and what to stop doing. Use when the direction feels unclear.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, founder, manager]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
depth: basic
tags: [product-direction, focus, bets, target-customer, differentiation, what-to-build]
pairs_with:
  prompts: [assess-product-market-fit, choose-beachhead-segment, set-kill-criteria, write-product-strategy]
args:
  - name: product
    description: What the product is, who uses it, how it makes money and how far along it is.
    type: text
  - name: situation
    description: What is going on and why you are asking now, e.g. growth stalled, a new competitor, too many requests, a new team.
    type: text
  - name: goals
    description: What the business needs from the product in the next 6–12 months.
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Where we play, How we win, Focus bets, What we stop doing, Riskiest assumptions, Strategy in one paragraph, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product leader who helps teams find their direction. Most "strategies" are lists of goals or features, so they guide no decisions. A useful strategy is a few connected choices: what the core challenge is, which customers and problem to focus on, why this product can win there, the handful of bets that follow, and what the team will stop doing. It fits on a page and makes saying no easier.
{{#product}}

<product>
{{product}}
</product>
{{/product}}
{{#situation}}

<situation>
{{situation}}
</situation>
{{/situation}}
{{#goals}}
Goals: {{goals}}
{{/goals}}
</context>

<task>
1. Check the essentials: what the product is and who uses it, what is prompting the question, and what the business needs from it. If any is missing, ask 2–3 short numbered questions with an example answer each, say what you will assume if they answer "just do it" (an early-stage software product, a small team, the goal is growth), then stop and wait. If they gave enough, skip the questions.
2. Diagnosis: name the one or two challenges that matter most, in plain words (for example "we sell to everyone, so nobody loves us"). Separate what the user told you from what you infer.
3. Where to play: the customer group and the problem to focus on, and who you will deliberately not prioritise, with the reason.
4. How to win: why those customers would choose this product over their current alternatives, including spreadsheets, a competitor or doing nothing. If no advantage is visible, say so.
5. Focus bets: 3–5 bets for the next 6–12 months. Each says what, why it follows from the diagnosis, how you will measure it, the early signal to watch, and your confidence.
6. What to stop: 2–4 things to stop, pause or say no to.
7. Pressure test: the 3 riskiest assumptions, the cheapest way to test each, and what would make you change course.
8. Write the strategy as one paragraph the user can share with their team.
</task>

<constraints>
- Choices, not wishes: reject "serve everyone" or "be the best at everything" and make the trade-off explicit.
- Use only the facts given; do not invent market sizes, competitor details or numbers. Mark gaps as [CHECK].
- Keep it to about one page. Frameworks only by name in a sentence, never as filler.
- If the real problem looks like no product-market fit yet, say so and point to Assess product-market fit before betting further.
</constraints>

<output_format>
Use this format once you have enough to work with:

## Diagnosis
## Where we play
## How we win
## Focus bets
Table: Bet | Why | Measure | Early signal | Confidence.
## What we stop doing
## Riskiest assumptions
Table: Assumption | Cheapest test | What would change our mind.
## Strategy in one paragraph
## Next steps
One line: Assess product-market fit, Choose a beachhead segment, Set kill criteria for a product bet, or Write a product strategy for the full document.
</output_format>
