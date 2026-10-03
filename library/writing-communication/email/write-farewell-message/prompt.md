---
schema: 1
id: write-farewell-message
kind: prompt
title: Write a farewell message
description: Writes a goodbye message to colleagues, clients or a community when leaving a job or team, with specific thanks, handover pointers and a way to stay in touch, and nothing that burns bridges.
category: email
version: 1.0.1
status: incubating
stage: [ship]
role: [individual, job-seeker, manager, consultant]
requires: [none]
inputs: [text, notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [farewell, leaving-job, goodbye-email, handover-contacts, last-day]
pairs_with:
  prompts: [write-handover-document, write-thank-you-note]
args:
  - name: context
    description: Where you are leaving and when, how long you were there, who and what you want to thank (specific moments help), who takes over your work, and how people can reach you. Say if you are leaving on difficult terms.
    type: text
    required: true
  - name: audience
    description: Your immediate team, the whole company, your clients, or a community you have been part of.
    type: enum
    enum: [team, company, clients, community]
    default: team
  - name: tone
    description: Warm and personal, brief and professional, or light and funny.
    type: enum
    enum: [warm, brief, funny]
    default: warm
output_contract:
  format: markdown
  sections: [Message, Before sending]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.1, note: "Grammar fixes in the instructions."}
  - {version: 1.0.0, note: "First version."}
---
<context>
A farewell message is read by everyone, remembered by some, and occasionally forwarded. The good ones are short, thank people for specific things, make it obvious who to contact now, and leave a door open. The bad ones list every project ever touched, thank everyone generically, hint at grievances, or (with clients) announce where the person is going in a way that breaches their contract or looks like poaching. Specific thanks ("Leo, for the night you stayed until 2 a.m. to get the Lisbon launch out") mean far more than a list of names, but naming a few people in a company-wide email can make others feel left out, so the specific thanks belong in team messages or separate notes.
</context>

<task>
Write a {{tone}} farewell message for {{audience}}.

<leaving_details>
{{context}}
</leaving_details>

1. If you cannot tell where the person is leaving from or roughly when, ask and stop.
2. Shape the message by audience:
   - **team:** personal; specific thanks to named people or moments from the leaving details; who takes over what; a way to stay in touch.
   - **company:** shorter; thanks to groups and the organisation rather than a long list of names; what you are proud of in one line; contact details.
   - **clients:** professional; thanks for the relationship; the date your involvement ends; the named successor and their contact; reassurance on continuity. Do not mention where you are going unless the leaving details say your employer has agreed.
   - **community:** what the community gave you, a nod to what continues, how to find you.
3. Include, in this order: the news and your last day; thanks with specifics from the leaving details; handover pointers (who to contact for what); how to stay in touch; a short warm close.
4. Match the tone: warm is personal and sincere; brief is three to five sentences; funny uses one or two light touches drawn from the leaving details, never jokes at someone's expense.
5. Write a subject line.
</task>

<constraints>
- Use only details from the leaving details. Never invent anecdotes, names, achievements or contact details; use `[your personal email]`, `[successor name]` and similar placeholders.
- No grievances, criticism or hints about why you are leaving, even if the leaving details mention a hard exit. If the person was made redundant or is leaving on difficult terms, keep it gracious and neutral, and say so under Before sending.
- No confidential information about projects, clients or the reasons for leaving.
- Under about 200 words for team and community, about 150 for company and clients.
</constraints>

<output_format>
## Message
Subject line, then the message.
## Before sending
Bullets: placeholders to fill, timing (usually on the last day or the day before, after your manager and close colleagues know), whether to send individual thank-you notes to people not named, and for clients, whether your employer must approve the message first.
</output_format>
