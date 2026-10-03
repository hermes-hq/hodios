---
schema: 1
id: write-team-newsletter
kind: prompt
title: Write an internal team newsletter
description: Writes an internal team or company newsletter from updates, wins and dates, with a lead story chosen for readers, short sections and recognition that names specific contributions.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [manager, operations-manager, executive, individual]
requires: [none]
inputs: [notes, text]
output: [article]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [internal-comms, company-update, recognition, shout-outs]
pairs_with:
  prompts: [write-internal-announcement, write-status-report]
args:
  - name: updates
    description: Raw material for this issue, such as project news, wins, people news, upcoming dates, asks and anything people should know. Paste notes, Slack messages or bullets.
    type: text
    required: true
  - name: audience
    description: Who receives it, for example "the 12-person design team" or "the whole company across three offices".
    type: string
    default: whole company
  - name: length
    description: Short is a two-minute read (up to about 350 words); standard is up to about 700 words.
    type: enum
    enum: [short, standard]
    default: short
output_contract:
  format: markdown
  sections: [Subject lines, Newsletter, Check before sending]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Internal newsletters compete with every other message in the inbox and usually lose. The ones people read lead with the item that matters most to the reader (not to the most senior person), keep each item short with a link for more, and make recognition specific enough that the person recognised feels seen and others learn what good looks like. "Thanks to the ops team for their hard work" is noise; "Priya rebuilt the returns process so refunds now take two days instead of nine" is news. Newsletters also go wrong by leaking things not yet announced, praising only the visible roles, or burying the one action people need to take.
</context>

<task>
Write a {{length}} newsletter for {{audience}} from these updates:

<updates>
{{updates}}
</updates>

1. If the updates are too thin to fill even a short issue (fewer than two real items), say what is missing and suggest the kinds of items to gather, then stop.
2. Choose the lead story by impact on the readers: what changes their work, what they will be asked about, or a win that affects many of them. Explain the choice in one line under Check before sending.
3. Write the lead in three to five sentences: what happened, why it matters to the reader, and what happens next or where to learn more.
4. Group the rest into short sections, using only those that have content: Updates · Wins and shout-outs · People news · Coming up (dates in date order) · One ask (the single action readers should take, if any).
5. For each shout-out, name who did what and the effect, using only details in the updates. If the updates thank someone without saying what they did, write `[add: what they did and the effect]` rather than generic praise.
6. Write three subject line options: specific, under 60 characters, no clickbait.
</task>

<constraints>
- Use only facts in the updates; never invent numbers, names, quotes or dates.
- Short: up to about 350 words for short, about 700 for standard. Each item two to four sentences.
- Warm and plain, like a well-written note from a colleague. No "exciting times ahead", no exclamation marks in every line.
- Flag anything that looks confidential or not yet announced (unreleased financials, unannounced departures or hires, customer names under NDA, personal health or family details) instead of publishing it.
- If recognition clusters on one team or role, note the imbalance under Check before sending.
</constraints>

<output_format>
## Subject lines
Three numbered options.
## Newsletter
The issue with a short title, the lead story, then the sections in order.
## Check before sending
Bullets: why this lead, items flagged as possibly confidential, `[add: …]` placeholders to fill, recognition balance, and links to add. "Nothing to check" if none.
</output_format>
