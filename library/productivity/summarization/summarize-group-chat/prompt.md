---
schema: 1
id: summarize-group-chat
kind: prompt
title: Summarise a group chat
description: Summarises a busy group chat or channel since you last read it into decisions, questions for you, plans with dates and what can safely be ignored.
category: summarization
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, parent, manager, student]
requires: [none]
inputs: [message, text]
output: [summary, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [group-chat, catch-up, whatsapp, unread-messages, mentions]
pairs_with:
  prompts: [summarize-email-thread, catch-up-after-leave, extract-deadlines]
args:
  - name: chat_log
    description: The messages you missed, copied or exported with names and times (a WhatsApp, Signal, Slack, Teams or Discord export works).
    type: text
    required: true
  - name: your_name
    description: Your name or handle exactly as it appears in the chat, so mentions and questions to you are found.
    type: string
    required: true
  - name: priorities
    description: What you care about in this chat (for example "anything about the school trip and money", "only decisions about the release"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [For you, Decisions, Plans and dates, Still open, What you can skip]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a sharp assistant who catches people up on group chats they could not keep up with: family groups, parent groups, friend trips, clubs, project channels. Busy chats mix decisions with jokes, plans that change three times, questions that get lost, and long side threads. The reader wants to know, in under a minute, what they must answer or do, what was decided, what is happening when, and what they can ignore without missing anything.

<chat_log>
{{chat_log}}
</chat_log>

Reader: {{your_name}}
{{#priorities}}Reader's priorities: {{priorities}}{{/priorities}}
</context>

<task>
1. Read the whole log in time order. Recognise the reader's name, handle and obvious variants (first name, @mention, "you" in a direct reply to them).
2. **For you:** every direct question or request to the reader, any mention of them, anything they promised earlier that comes up, and anything that needs a reply or action from everyone (a poll, "everyone please confirm by Friday", a payment). Note whether someone else already answered on their behalf.
3. **Decisions:** what was agreed and by whom. If a plan changed, give the latest version and note it changed ("Dinner moved from Friday to Saturday, confirmed by Ana at 21:14"). Do not treat a suggestion with no replies as a decision.
4. **Plans and dates:** events, deadlines, payments and logistics with date, time, place and amount, in date order.
5. **Still open:** questions nobody answered, polls still running, disagreements not settled.
6. **What you can skip:** a one-line description of the threads that need no action (jokes, memes, a side debate), so the reader trusts they did not miss anything.
7. Rank by the reader's priorities if given; otherwise put anything with a deadline first.
</task>

<constraints>
- Use only what is in the chat. Keep names, times, amounts and places exactly as written; if a message is ambiguous ("tomorrow"), resolve it from the message timestamp and show how, or flag it.
- Do not repeat gossip, private details or emotional exchanges beyond what the reader needs; summarise tone neutrally ("a disagreement about cost, unresolved").
- Keep it short: the whole summary should be readable in about a minute. Quote a message only when the exact wording matters.
- If the log has no names or times, say that the summary may be less reliable and why.
</constraints>

<output_format>
## For you
Bullets, most urgent first, each with who asked and when. "Nothing for you" if none.

## Decisions
Bullets: decision · who · when.

## Plans and dates
Table: When | What | Where / amount | Status.

## Still open
Bullets.

## What you can skip
One or two lines.
</output_format>
