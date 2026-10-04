---
schema: 1
id: triage-open-quotes
kind: prompt
title: Triage open quotes
description: Triages a trade or service business's list of unanswered quotes by value, age and odds, sets call-or-text chase steps for each, scripts the useful touches and says which files to close politely.
category: sales
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, founder]
subject: [construction]
requires: [none]
inputs: [text, notes]
output: [table, plan, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [quote-chasing, tradespeople, follow-up-cadence, too-expensive, close-the-file]
pairs_with:
  prompts: [present-repair-options, write-sales-follow-up, answer-price-shopper-calls]
  workflows: [quote-to-close-track]
args:
  - name: open_quotes
    description: Every quote still waiting for an answer, one per line - customer first name or reference, job, price, date sent, days since sent, how they found you, and anything you know (comparing quotes, wants it before summer, went quiet after the visit). Rough notes are fine.
    type: text
    required: true
  - name: business
    description: Your trade or service, how busy you are in the next few weeks, and how you usually contact customers (phone, text, WhatsApp, email).
    type: text
    required: true
  - name: weekly_minutes
    description: Minutes a week you can spend chasing quotes. Plans are sized to fit.
    type: number
    default: 30
output_contract:
  format: markdown
  sections: [Quote board, This week's chase list, Messages, Too expensive replies, Close politely, Routine]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a tradesperson or small service business (plumber, builder, landscaper, decorator, cleaner, event supplier) work through the pile of quotes that went out and never came back. Most owners either never chase, or send "just checking in" once and give up; both leave money on the table, because many customers simply have not decided yet, lost the quote, or have one question they did not ask. Three things separate a good chase from nagging: each touch adds something useful (an availability date, a scope question, a cheaper or phased option), the channel matches the job size (call for big jobs, text for small ones), and there is a clear point where the file is closed politely, which often brings a reply on its own.

Chasing time available: {{weekly_minutes}} minutes a week.
</context>

<task>
<open_quotes>
{{open_quotes}}
</open_quotes>

<business>
{{business}}
</business>

1. Read every quote. If a line lacks the price or the date sent, list it under questions instead of guessing.
2. Score each quote: value (high, medium, low against this list), age band (0-3 days: too early unless they asked for speed; 4-10 days: first chase; 11-21 days: second chase with an option; 22-45 days: last chase; over 45 days: close), and odds (higher when they asked for the visit, mentioned a deadline or replied before; lower when it was a price-check enquiry or they said they were getting several quotes).
3. Rank by value x odds, then cut the list to what fits the weekly minutes (about 4 minutes per call, 2 per text).
4. Pick the channel: call for high-value or complex jobs and anyone who prefers calls; text or WhatsApp for small jobs and busy customers; email only when the quote went by email and the job is commercial.
5. Plan three touches per live quote, each with a different reason: (a) a check that the quote arrived and an offer to answer one question; (b) something new: a start date you can hold, a scope question, or a good-better-best or phased option; (c) a friendly "closing the file" message that leaves the door open.
6. Write "too expensive" replies that ask what they are comparing against, explain what the price includes that cheaper quotes often leave out (only items in their quote), and offer a smaller scope or phasing, never a cut for the same work without a reason.
7. Say which quotes to close now and why.
</task>

<constraints>
- Use only the facts given. Never invent availability, discounts, competitor prices, reviews or deadlines; mark anything the owner must fill as [X].
- No fake urgency ("price goes up Friday") unless the owner states a real reason, such as a supplier price change.
- Messages are short: texts under 300 characters, call openers under 20 seconds, written as the owner would speak.
- Keep any discount suggestion tied to a change in scope, timing or materials.
- If the list is empty or has no prices, ask for it and stop.
</constraints>

<output_format>
## Quote board
Table: Quote | Value | Days out | Odds | Priority (1 = first) | Channel | Next touch and date.

## This week's chase list
The quotes that fit the weekly minutes, in order, with the touch number for each.

## Messages
Per quote on the list: touch 1, 2 and 3 texts or call openers, each with its useful reason.

## Too expensive replies
Three replies: a phone version, a text version and a "we went with someone cheaper" reply that keeps the relationship.

## Close politely
Quotes to close now, with the closing message.

## Routine
Five bullets: when to chase each week, how to log replies, and how to send quotes so fewer go quiet (booking the decision call at the visit, an expiry date, a clear accept button).
</output_format>
