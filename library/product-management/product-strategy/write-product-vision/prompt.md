---
schema: 1
id: write-product-vision
kind: prompt
title: Write a product vision
description: Writes a memorable three-to-five-year product vision covering the customer's future, the change the product makes, guiding principles and what it means for next year's work.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, executive, founder]
requires: [none]
inputs: [text, notes]
output: [docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [product-vision, product-principles, narrative, alignment]
pairs_with:
  prompts: [write-product-strategy, write-prfaq, build-outcome-roadmap, define-north-star-metric]
args:
  - name: product
    description: The product today - what it does, for whom, where it is strong and weak, and any traction numbers you want reflected.
    type: text
    required: true
  - name: customers
    description: Who the customers are and what you know about their world, goals and frustrations, ideally from research. Optional.
    type: text
  - name: company_strategy
    description: The company mission, strategy, business model and any constraints the vision must fit. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Vision statement, The customer's world in the future, The change we make, Principles, What this vision is not, What it means for the next 12 months, Signals we are getting closer, Assumptions and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product leader who has written visions that teams actually used to make decisions. A product vision describes the future you are trying to create for customers, three to five years out: ambitious enough to inspire, concrete enough to rule things out, and short enough that people can repeat it from memory. It is not a strategy (how you will win), not a roadmap (what you will build when) and not a mission (why the company exists), though it must fit all three. Visions fail when they are generic ("the best platform for everyone"), describe features instead of customer outcomes, or cannot help anyone choose between two options.
{{#customers}}

Customers:

<customers>
{{customers}}
</customers>
{{/customers}}
{{#company_strategy}}

Company strategy:

<company_strategy>
{{company_strategy}}
</company_strategy>
{{/company_strategy}}
</context>

<task>
The product today:

<product>
{{product}}
</product>

1. Identify the core customer and the job they hire the product for. If the input leaves the target customer or the problem unclear, write the vision for the most plausible customer, say so, and list the question under Assumptions and questions.
2. Describe the customer's world in three to five years if the product succeeds: a short, concrete narrative of a specific person in a specific moment, showing what is easier, faster or possible that is not today. Ground it in the customers' real frustrations from the input.
3. State the change the product makes as a from-to contrast: three to five rows of "today customers… / in the future they…".
4. Write the vision statement: one sentence, under 25 words, in plain language, naming the customer and the outcome. Offer two alternatives with a different emphasis and say which you recommend and why.
5. Write three to five principles that guide decisions towards the vision. Each principle must rule something out ("We automate the routine before we add new reports, even when customers ask for reports first"). Include the trade-off it resolves.
6. State what this vision is not: adjacent customers, markets or product types you will not pursue, so the vision has edges.
7. Translate it into the next 12 months: the two or three capabilities or shifts that would move furthest towards the vision, what current work it would deprioritise, and the riskiest belief to test first. Stay at the level of direction, not a feature list.
8. Propose signals that the product is getting closer: two to four observable customer behaviours or metrics.
9. Check the draft against these tests and fix it before answering: Can someone repeat the statement after one reading? Does each principle help choose between two real options? Would a competitor's team be able to sign the same vision unchanged? (If yes, make it more specific.) Does it fit the company strategy given?
</task>

<constraints>
- No buzzwords ("seamless", "world-class", "leverage", "empower", "revolutionise") and no technology for its own sake: say what customers can do, not which technique delivers it.
- Do not invent market sizes, growth rates, customer numbers or quotes. Use only what the input provides; mark anything else as an assumption.
- Keep the whole document readable in five minutes: about 600 words before the assumptions section.
- Ambitious but credible: if the vision requires things the company clearly cannot do, say so in the assumptions.
</constraints>

<output_format>
## Vision statement
The recommended statement in bold, then the two alternatives and one line on the choice.

## The customer's world in the future
A short narrative paragraph.

## The change we make
Table: today | in the future.

## Principles
Numbered, each with the trade-off it settles.

## What this vision is not
Bullets.

## What it means for the next 12 months
Bullets: shifts to make, work to deprioritise, riskiest belief to test.

## Signals we are getting closer
Bullets.

## Assumptions and questions
Bullets, including anything you had to infer.
</output_format>
