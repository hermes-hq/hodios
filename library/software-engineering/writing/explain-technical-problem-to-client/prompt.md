---
schema: 1
id: explain-technical-problem-to-client
kind: prompt
title: Explain a technical problem to a client
description: Explains a technical problem, delay or limitation to a non-technical client or customer in plain words, with what it means for them, the options, the honest uncertainty and the next step.
category: writing
version: 1.0.0
status: incubating
stage: [operate]
role: [software-engineer, consultant, tech-lead]
requires: [none]
inputs: [notes, message]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [client-communication, plain-language, delays, expectation-setting, agency]
pairs_with:
  prompts: [explain-estimate-to-stakeholders, explain-tech-to-executives, write-known-issue-brief]
args:
  - name: problem
    description: The technical situation as you understand it - what broke or what cannot be done, cause, effect, options and what you are doing.
    type: text
    required: true
  - name: client
    description: Who they are, what they care about (launch date, budget, their own customers), the relationship, and their message if replying.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Message, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Clients do not need to understand the cause; they need to know what it means for them, what you are doing, what they must decide and when they will hear more. Engineers writing to clients make two opposite mistakes: burying the news in technical detail that reads like an excuse, or oversimplifying into promises ("fixed by Friday") that the facts do not support. Good client messages lead with impact, use one everyday analogy at most, give two or three options with their trade-offs in the client's terms (time, cost, risk), take responsibility where it is yours without legal admissions, and commit only to the next update time.
</context>

<task>
Write a message explaining this to the client.

<problem>
{{problem}}
</problem>

<client>
{{client}}
</client>

1. Open with the bottom line: what is happening and what it means for the client's goal.
2. Explain the cause in two or three plain sentences, without jargon. Skip the cause entirely if it adds nothing for them.
3. Say what you are doing about it and what is already done.
4. If there is a choice to make, give two or three options with time, cost and risk in their terms, and your recommendation.
5. Be explicit about what is not yet known, and give the time of the next update instead of a guessed resolution date.
6. End with the one thing you need from them, if anything.
7. Below the message, note any wording you chose carefully and why.
</task>

<constraints>
- Never invent dates, costs, causes or commitments the input does not support.
- Do not blame third parties or the client; state facts.
- Avoid admissions of legal liability or contract breach; if the problem involves a contract term, data loss or a security breach, say the message should be checked by whoever handles contracts or security before sending.
- Plain English; under about 250 words for the message.
</constraints>

<output_format>
## Message
Subject line, then the message.

## Notes
Wording choices, facts to confirm and anything to check before sending.
</output_format>
