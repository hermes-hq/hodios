---
schema: 1
id: negotiate-shared-expenses-with-friends
kind: prompt
title: Negotiate shared expenses with friends
description: Plans how to raise splitting costs with friends for a trip, group dinner, gift, wedding party or shared house before it gets awkward, or fairly afterwards, with wording and fair split options.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student, traveler]
requires: [none]
inputs: [text]
output: [message, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [money, friend-groups, group-trips, bill-splitting, awkward-situations]
pairs_with:
  prompts: [ask-for-money-back, split-shared-expenses, set-boundary]
  personas: [communication-coach]
args:
  - name: situation
    description: The shared cost (trip, dinner, gift, hen or stag do, holiday rental), who is involved, amounts if known, and what is awkward (different budgets, someone who orders more, someone who has not paid, unequal use).
    type: text
    required: true
  - name: timing
    description: Whether you are raising it before the spending or sorting it out after.
    type: enum
    enum: [before, after]
    default: before
output_contract:
  format: markdown
  sections: [Fair options, Who should raise it, The message, If someone objects]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Money friction between friends comes from unspoken assumptions: one person assumed an even split, another assumed pay-for-what-you-had, a third quietly could not afford the villa everyone booked. Raising it before money is spent is far easier than after, and friends on tighter budgets are usually relieved when someone else brings it up. Fair options include an even split, itemised (each pays their share), a hybrid (share the common costs, pay your own extras like drinks), and tiered or opt-in plans for trips where budgets differ. Naming one person to hold the money, using a shared expense tracker, and setting a settle-up date prevents most disputes. After the event, a light, factual message with the numbers and a simple way to pay works better than hints in the group chat.
</context>

<task>
Help me raise the money side of this. Timing: {{timing}}.

<situation>
{{situation}}
</situation>

1. If key facts are missing (who is involved, rough amounts, what is awkward), ask up to two short questions and stop.
2. Lay out two or three fair split options for this situation, with a one-line pro and con each, and the simple maths if I gave amounts. Recommend one, taking different budgets and usage into account.
3. Say who should raise it and how: the organiser, the person with the tightest budget, or me; group chat or a private word first. If someone is likely to feel singled out, suggest raising it privately with them first.
4. Write the message: friendly, specific, proposing the split, a budget range or opt-in choices for a "before" plan, or the totals, each share and a settle-up date and method for an "after" message. Under about 90 words.
5. Write replies for likely objections: "let's just split it evenly", "I didn't drink", "I can't afford that", someone who goes quiet, and someone who has not paid after a reminder.
</task>

<constraints>
- Keep it light and friendly, never shaming anyone for budget or for owing money.
- Do not invent amounts; use mine or show the method with placeholders.
- Do not name specific apps as recommendations; describe "a shared expense tracker" generically.
- For a larger unpaid amount between close friends, suggest a private conversation rather than repeated group reminders.
</constraints>

<output_format>
## Fair options
Table: Option | How it works | Good for | Watch out for. Then a recommendation.
## Who should raise it
Who, where and when.
## The message
The message, ready to send.
## If someone objects
Table: If they say… | You can say…
</output_format>
