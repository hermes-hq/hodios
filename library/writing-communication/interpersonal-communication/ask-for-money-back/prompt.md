---
schema: 1
id: ask-for-money-back
kind: prompt
title: Ask a friend or relative to repay money
description: Writes how to ask a friend or relative to repay money they owe, with the amount, a proposed repayment plan and a kind but clear tone that protects the relationship.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [message, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [personal-loans, money-and-friends, repayment-plan, awkward-situations]
pairs_with:
  prompts: [set-boundary, reply-to-tricky-message, prepare-difficult-conversation]
  personas: [communication-coach]
args:
  - name: amount_and_context
    description: "How much, when and why you lent it, what was agreed about repayment (even loosely), and whether any has been paid back, for example \"600 pounds in March for his car repair, he said he'd pay back by summer, nothing yet\"."
    type: text
    required: true
  - name: relationship
    description: "Who they are to you, for example \"my close friend since school\", \"my younger brother\", \"my aunt\"."
    type: string
    required: true
  - name: history
    description: Optional, anything relevant, such as earlier reminders and how they went, their current situation, or whether you need the money soon.
    type: text
  - name: channel
    description: How you will ask.
    type: enum
    enum: [message, in-person, email]
    default: message
output_contract:
  format: markdown
  sections: [Decide first, The ask, A gentler or firmer version, If they reply, Follow-up plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Asking for money back is awkward because it mixes a debt with a relationship, and the lender often waits too long, then asks with resentment or vague hints ("things are a bit tight for me at the moment…"). What protects the relationship is a request that is specific (the amount, what it was for, what was agreed), assumes good faith, makes repaying easy with a concrete proposal (a date, or instalments), and is private. Deciding beforehand what you will accept, including whether you would forgive part of it, keeps the conversation calm when they say they cannot pay it all.
</context>

<task>
Help me ask for this money back, by {{channel}}, from {{relationship}}.

<amount_and_context>
{{amount_and_context}}
</amount_and_context>
{{#history}}
<history>
{{history}}
</history>
{{/history}}

1. If the amount or what was agreed is unclear, write the ask with `[amount]` or `[what we agreed]` placeholders and list what I should confirm. Never invent amounts, dates or agreements.
2. Decide first: list the two or three choices I should make before asking: the deadline I need, whether I would accept instalments and how small, whether I would forgive any of it, and what I will do if they do not pay.
3. Write the ask for the channel:
   - a friendly opening that is not a fake catch-up;
   - the specific amount, what it was for, and what was agreed;
   - a concrete proposal: the full amount by a date, or instalments of a set amount on set dates, and how to pay me (`[bank details or payment app]`);
   - an easy way for them to suggest another plan;
   - a warm close that separates the money from the relationship.
   For a message or email, keep it short enough to read on a phone. For in person, give a few short lines to say and when to raise it (privately, not at a family event).
4. Write a gentler and a firmer version, so I can match my history with them. The firmer one is still respectful.
5. If they reply: short responses for "I forgot", "I can't pay it all now", "I thought it was a gift", silence, and getting defensive.
6. Follow-up plan: when and how to remind them, how to keep a friendly written record of what was agreed, and what my options are if they never pay, including deciding to let it go.
</task>

<constraints>
- No guilt-tripping, sarcasm, threats, or comments about how they spend money.
- Never suggest raising it in a group chat, on social media, or through other relatives, unless I say they arranged the loan.
- Do not give legal advice. If I mention legal action, say only that small-claims options and rules differ by country, that it usually ends the relationship, and that local advice services can explain the options.
- Match my voice and how we normally talk.
</constraints>

<output_format>
## Decide first
Two to four bullets.
## The ask
The message (in a quote block) or the in-person lines.
## A gentler or firmer version
Both versions, each labelled, in quote blocks.
## If they reply
Bold situation label, then a one- or two-line response, for each case.
## Follow-up plan
Three to five bullets with timing.
</output_format>
