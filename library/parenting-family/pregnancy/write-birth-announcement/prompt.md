---
schema: 1
id: write-birth-announcement
kind: prompt
title: Write a birth announcement
description: Writes birth announcements for different audiences, from close family to work and social media, with the details each should get, a line on visits and privacy, and a version for a difficult birth.
category: pregnancy
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, parent]
requires: [none]
inputs: [preferences, text]
output: [message, post]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [birth-announcement, family-news, visitor-boundaries, social-posts, privacy]
pairs_with:
  prompts: [shortlist-baby-names]
args:
  - name: details
    description: What you want to share, for example the baby's name, date, time, weight, who the parents are, how everyone is doing, and anything you want to keep private (birth story, photos, exact time, hospital).
    type: text
    required: true
  - name: audiences
    description: Who you will tell and how, for example "grandparents by phone, family group chat, work email, Instagram". Optional.
    type: text
  - name: tone
    description: How it should sound, for example warm, funny, simple, religious, formal. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Who hears what, Messages, Visits and privacy line, Who sends it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write birth announcements for tired new parents. What helps: telling the closest people personally before anything goes in a group chat or online; matching detail to audience (grandparents want the weight and a photo, work needs the date and that you are on leave, the internet does not need the birth time or hospital); one clear line on visits so the parents are not negotiating thirty times; and a trusted person who sends the messages. When the birth was hard, the baby is in neonatal care, or there is sad news alongside the happy, people need words that share what the parents want shared and tell others how to help.

<details>
{{details}}
</details>
{{#audiences}}Audiences: {{audiences}}{{/audiences}}
{{#tone}}Tone: {{tone}}{{/tone}}
</context>

<task>
1. Who hears what: a table of each audience, the order to tell them in, the channel, and which details each gets. If audiences were not given, use a sensible default (closest family by call, wider family and friends, work, social media) and say so.
2. Messages: ready-to-send text for each audience in the requested tone, short enough to read on a phone. The social media version shares no exact birth time, hospital, or anything they marked private.
3. Visits and privacy line: one or two lines they can add, for example "we are resting this week and will be in touch about visits", "please don't share photos online", "if you'd like to help, a meal would be wonderful".
4. Who sends it: a suggestion that a named helper role (birth partner, grandparent, friend) sends the wider messages and fields the replies.
If the details mention a difficult birth, the baby in neonatal care, or a loss, write gentler versions that share only what they chose, say how people can help, and say whether replies or visits are welcome.
</task>

<constraints>
- Use only details given. Do not invent weights, times, names or how people are feeling.
- Keep privacy by default online; the parents choose what to share.
- No clichés stacked on clichés; one warm line beats five.
- If the details suggest a parent or baby is unwell now, or a parent sounds overwhelmed, add one kind line suggesting they lean on their midwife, health visitor or doctor.
</constraints>

<output_format>
## Who hears what
Table: Order | Audience | Channel | Details shared.
## Messages
One heading per audience, message in a code block.
## Visits and privacy line
## Who sends it
</output_format>
