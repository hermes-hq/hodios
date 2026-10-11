---
schema: 1
id: decide-whether-to-lend-money
kind: prompt
title: Decide whether to lend money to family or a friend
description: Decides whether to lend, give or decline money to a friend or relative who asked, using what you could afford to lose and the relationship, then sets terms and a script for each answer.
category: decision-making
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
advice_risk: [financial]
inputs: [text, message]
output: [report, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [lending, family-money, personal-loans, boundaries, gift-or-loan]
pairs_with:
  prompts: [decline-to-lend-money, decide-on-cosigning-loan, decide-whether-to-say-yes]
args:
  - name: request
    description: Who asked, how much, what for, by when, and what they said about paying it back.
    type: text
    required: true
  - name: your_position
    description: Your savings and what this sum means to you, any past loans to this person and how they went, and how close you are.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The real question, Can you afford to lose it, The relationship test, Options, Recommendation, If you lend, What to say]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone decide what to do when a friend or relative asks for money. Your limits:
{{> guardrails/professional-limits}}

Personal loans fail more often than people expect, and the damage is usually to the relationship rather than the bank balance: the lender starts noticing the borrower's holidays and new phone, the borrower avoids the lender, and nobody talks about it. The standard advice from people who deal with this is to lend only what you could afford never to see again, and to decide in advance whether you would rather lose the money or the relationship if it is not repaid. Often a gift of a smaller amount works better than a loan of the full amount. The reason for the request matters: a one-off emergency is different from a pattern of shortfalls, and a request to cover gambling, debts to dangerous lenders or another person's control may signal a bigger problem that money will not fix. If lending, clear written terms (amount, repayment schedule, what happens if a payment is missed) protect both sides; they are a kindness, not an insult. Co-signing or guaranteeing a debt is a separate and bigger commitment.

Request:
<request>
{{request}}
</request>

Your position:
<your_position>
{{your_position}}
</your_position>
</context>

<task>
1. State the real question: what is being asked, and whether it is really a loan, a gift or a guarantee.
2. Can you afford to lose it: compare the sum with savings and upcoming needs, and say whether losing it entirely would hurt the person's own security.
3. The relationship test: history of past loans, whether the need is one-off or recurring, how it would feel if not repaid, and any warning signs (pressure, secrecy, gambling, unsafe lenders).
4. Lay out the options: lend in full, lend part, give a smaller gift, help another way (pay a bill directly, help with a budget, point to free debt advice), or decline.
5. Recommend one option with the reason.
6. If lending: simple written terms to agree (amount, schedule, start date, missed-payment plan, what happens if circumstances change), and a reminder that formal agreements and any interest may have legal or tax effects to check locally.
7. What to say: a short, warm script for the recommended answer and for one alternative (for example a yes-with-terms and a kind no).
</task>

<constraints>
- Do not pressure the person to lend or to refuse; base the recommendation on their stated finances and relationship.
- Do not assume bad intent by the borrower; name warning signs neutrally.
- If the borrower seems to be in debt crisis, at risk from lenders or in an unsafe situation, suggest free debt advice or support services for them.
- Keep scripts honest, with no invented excuses.
</constraints>

<output_format>
## The real question
One or two lines.

## Can you afford to lose it
Short assessment.

## The relationship test
Bullets.

## Options
Table: Option | Pros | Cons.

## Recommendation
One option and why.

## If you lend
Terms checklist.

## What to say
Two short scripts.
</output_format>
