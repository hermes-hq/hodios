---
schema: 1
id: tell-partner-about-debt
kind: prompt
title: Tell your partner about a debt
description: Prepares someone to tell their partner about a debt they have kept quiet - the full picture first, how to open the conversation, what to say about the plan, and how to handle the reaction.
category: debt
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, script, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [money-conversations, disclosure, couples, debt-shame]
pairs_with:
  prompts: [plan-debt-payoff, plan-couple-money-conversation, prepare-for-debt-advice-appointment]
  personas: [personal-finance-coach]
args:
  - name: debt
    description: What you owe, to whom, how it built up, how long it has been hidden, and whether anything joint (a mortgage application, shared account) is affected.
    type: text
    required: true
  - name: relationship
    description: How long you have been together, whether you share finances, how your partner tends to react to money news, and what you fear will happen. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before you talk, The full picture on one page, Opening the conversation, What to say, Handling the reaction, After the talk]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people tell a partner about a debt they have kept secret. Hidden debt is common and usually grows from small decisions and shame rather than bad intent, but partners often say the secrecy hurts more than the amount. Conversations go better when the person brings the complete picture on paper (so a second disclosure does not follow), takes responsibility without over-explaining, has a first step of a plan ready (ideally having already contacted free debt advice), and gives the partner time to react. Practical facts matter too: in most places a partner is not liable for debts in the other's sole name, but joint applications (a mortgage, a joint account overdraft) will reveal it and can be affected by it.
</context>

<task>
The debt:

<debt>
{{debt}}
</debt>
{{#relationship}}

The relationship:

<relationship>
{{relationship}}
</relationship>
{{/relationship}}

1. Before you talk: list everything to gather (every balance, rate, arrears and letters) and suggest contacting free debt advice first so there is a plan to share. If anything joint is affected, say why that makes telling them soon more important.
2. Build the full picture on one page: a table of the debts, totals, monthly payments, and what is behind.
3. Opening the conversation: when and where (private, unhurried, not during a crisis or before an event), and two or three opening lines in plain words that the person can adapt.
4. What to say: what happened, briefly and honestly; responsibility without self-punishment; whether the partner is liable or affected, stated carefully; and the plan or first step. Include what not to do: minimise, drip-feed, or blame.
5. Handling the reaction: expect anger, hurt or silence; how to listen; offering time; and questions the partner may ask with honest ways to answer them.
6. After the talk: agree next steps together if they want to be involved (a money date, joint advice appointment), or respect their need for space; and how to rebuild trust (transparency, regular updates).
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not help the person keep hiding the debt or mislead the partner about its size.
- Do not state that a partner is or is not liable as fact; give the general rule and mark it "verify locally", especially for married couples in community-property systems.
- If the person fears violence or control from their partner, stop the disclosure plan, put safety first and point to specialist support.
- Be warm and shame-free.
{{> output/uncertainty}}
</constraints>

<output_format>
## Before you talk
Checklist.

## The full picture on one page
Table: debt | owed to | balance | monthly | behind.

## Opening the conversation
Timing advice and two or three opening lines.

## What to say
Bullets, plus a short "avoid" list.

## Handling the reaction
Bullets and likely questions with honest answers.

## After the talk
Bullets.
</output_format>
