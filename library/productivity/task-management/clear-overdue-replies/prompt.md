---
schema: 1
id: clear-overdue-replies
kind: prompt
title: Clear overdue replies
description: Triages the messages you owe replies to across email and chat, orders them by consequence, and drafts short catch-up replies without grovelling, so the pile of guilt clears in one sitting.
category: task-management
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, manager, founder, student]
requires: [none]
inputs: [message, text]
output: [table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [overdue-replies, catch-up, owed-replies, response-backlog, guilt-pile, correspondence]
pairs_with:
  prompts: [reply-after-long-delay, triage-inbox, track-waiting-for-items]
args:
  - name: owed
    description: The messages you owe replies to - paste them or summarise each (who, what they asked, when, which channel).
    type: text
    required: true
  - name: context
    description: Your role and anything that changes priority, for example "manager is waiting on two of these" or "client contracts at stake". Optional.
    type: text
  - name: voice
    description: How you usually write (formal, warm, very short). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Reply order, Drafts, Can close without replying, Stop it piling up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone clear a backlog of replies they owe. Overdue replies grow because each one feels like it needs a long apology and a perfect answer, so none get sent. Experienced communicators know the opposite works: a one-line acknowledgement of the delay at most, then the useful answer or a clear next step with a date. A reply that says "I can't do this, here's who can" or "I'll have this to you Thursday" closes the loop as well as a full answer. Some threads have expired and only need a short close, or no reply at all. Order matters: people blocked by you, money and deadlines first; social and nice-to-have last.

Messages owed:
<owed>
{{owed}}
</owed>
{{#context}}Context: {{context}}{{/context}}
{{#voice}}Voice: {{voice}}{{/voice}}
</context>

<task>
1. For each message, note who, the ask, how long overdue, and the consequence of further delay (someone blocked, money, deadline, relationship, none).
2. Classify the reply needed: full answer now, holding reply with a date, decline or redirect, short close because it has expired, or no reply needed.
3. Order the list: people blocked by the user and anything with money or deadlines first, then work relationships, then personal and social, then the rest.
4. Draft each reply in that order: at most one sentence on the delay (no excuses, no grovelling), then the answer or the next step with a specific date. Keep each draft short.
5. List the threads that can be closed without replying, with the reason.
6. Give two or three habits to stop the pile returning, fitted to what caused it.
</task>

<constraints>
- Never invent facts, decisions, dates or attachments the user has not given; put a [placeholder] where the user must supply the answer.
- Do not make promises on the user's behalf beyond "I'll reply by [date]" placeholders the user fills in.
- Match the channel: chat replies shorter than email; formal contacts get a formal tone.
- If a message looks sensitive (bereavement, complaint, legal or HR matter), flag it and draft with extra care, not a breezy catch-up.
- If more than about 25 messages are given, draft the top 10 and list the rest with their classification.
</constraints>

<output_format>
## Reply order
Table: # | Who | Ask | Overdue | Consequence | Reply type.

## Drafts
One small heading per message in order, with the draft.

## Can close without replying
Bullets with reasons.

## Stop it piling up
Two or three bullets.
</output_format>
