---
schema: 1
id: ask-family-for-financial-help
kind: prompt
title: Ask family for financial help
description: Plans how to ask a parent, sibling or relative for money, with the exact amount and purpose, whether it is a gift or a loan, repayment terms in writing, and how to take a no without damage.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student, parent]
requires: [none]
inputs: [text]
output: [script, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [money, family-dynamics, family-loans, asking-for-help, repayment]
pairs_with:
  prompts: [ask-for-a-favor, ask-for-money-back, plan-family-inheritance-conversation]
  personas: [communication-coach]
args:
  - name: need
    description: What the money is for, how much, by when, what you have already tried or can cover yourself, and how you would repay it if it is a loan.
    type: text
    required: true
  - name: relative
    description: Who you would ask, your relationship, their likely situation as far as you know, and any money history between you (past loans, siblings who might feel it is unfair).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Before you ask, The ask, Terms to agree, If they say no, Keeping it healthy]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Money between family members goes wrong mostly through vagueness: an unclear amount, no agreement on whether it is a gift or a loan, repayment "when you can", and siblings who find out later. Those gaps turn into years of resentment. A good ask is specific (the exact amount, what it is for, by when), shows what you have already done yourself, makes it easy to say no, and, for a loan, comes with a written repayment plan you can actually keep, with what happens if you miss a payment. Asking in person or by call, at a calm time, works better than a text; giving the person time to think rather than a same-day decision is respectful. Large family loans or gifts can have tax, benefit or mortgage-lender implications in some countries, which are worth checking, and other family members may expect to be told.
</context>

<task>
Help me ask for financial help.

<need>
{{need}}
</need>

<relative>
{{relative}}
</relative>

1. If the amount, purpose or repayment ability is unclear, ask up to three short questions and stop.
2. Before I ask: check whether the amount is realistic for them as far as I know, whether there are better options to consider first or alongside (payment plans, hardship funds, advice services), and whether this should be a gift or a loan. Say honestly if the plan has a weak spot, such as a repayment I cannot afford.
3. Write the ask: when and how to raise it, an opener, the specific amount and purpose, what I have done myself, the gift-or-loan offer, and an explicit easy way to say no or to think about it. Under about 120 spoken words.
4. For a loan, draft the terms to agree in writing: amount, purpose, repayment amount and schedule, start date, what happens if I miss one, and whether other family should know. Note that for large sums they may want to check tax, benefit or lender rules locally.
5. Write replies for likely responses: yes, partial amount, questions about past money, "what about your brother?", and no. Make the no response gracious and relationship-protecting.
6. Give a few habits that keep it healthy afterwards: repaying on time, updating them early if anything changes, not avoiding them, saying thank you.
</task>

<constraints>
- Do not give tax, legal or investment advice; flag what to check locally for large amounts.
- No guilt, pressure or emotional leverage in the script.
- If my situation suggests debt problems, a crisis or urgent need (eviction, no food, a loan shark), also point to free debt advice or emergency support in my country.
- Do not invent figures; use the amount and plan I gave.
</constraints>

<output_format>
## Before you ask
Realism check, alternatives, gift or loan.
## The ask
When, how and the words.
## Terms to agree
A short written agreement, for a loan.
## If they say no
Table: If they say… | You can say…
## Keeping it healthy
Short list.
</output_format>
