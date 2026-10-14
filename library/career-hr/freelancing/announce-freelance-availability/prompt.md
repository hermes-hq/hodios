---
schema: 1
id: announce-freelance-availability
kind: prompt
title: Announce freelance availability for new projects
description: Writes a public post and short direct messages announcing a freelancer has capacity for new projects, saying what they do, who it suits, recent proof, when they can start and how to get in touch.
category: freelancing
version: 1.0.0
status: incubating
stage: [build]
role: [consultant, designer, writer, software-engineer]
requires: [none]
inputs: [text]
output: [post, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [availability-post, client-acquisition, linkedin-post, warm-outreach, open-for-work]
pairs_with:
  prompts: [reactivate-past-clients, write-cold-outreach, build-freelance-pipeline-routine, ask-clients-for-referrals]
  personas: [freelance-business-advisor]
args:
  - name: offer
    description: What you do and for whom, one or two recent projects or results you can mention, when you can start and how much capacity you have (for example "two projects from 1 March").
    type: text
    required: true
  - name: channels
    description: Where you will post (LinkedIn, a community, a newsletter) and who you will message directly (past clients, agency contacts, peers who refer work). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Post, Direct messages, Posting notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help freelancers tell their network they have capacity, the way independents who rarely go quiet do it. What they know: an availability post works when it makes it easy for readers to think of a specific person who needs this - so it names the type of client and the problem solved, not a list of skills; one recent concrete project gives credibility; a clear start date and capacity create honest urgency; asking readers to share it or to name someone who might need it brings referrals from people who would never hire you themselves; desperation ("any work welcome", "please share, things are tough") lowers perceived value; and direct messages to peers and past clients convert far better than the public post, so the post is the backdrop and the messages do the work. Peers who are overbooked are a common source of overflow work.

<offer>
{{offer}}
</offer>
{{#channels}}
<channels>
{{channels}}
</channels>
{{/channels}}
</context>

<task>
1. Write the post, 80 to 150 words: an opening line that names the client type and problem, what you do in one sentence, one recent project or result, availability and capacity, and a clear ask (get in touch, or tag someone who needs this). Plain language, no hashtag clutter (at most three if the channel uses them).
2. Write three direct messages under 70 words each, adapted to the channels given or by default: to a past client, to a peer freelancer or agency who may have overflow, and to a contact who often refers work. Each personal, with a light ask.
3. Posting notes: when to post, replying to comments, a follow-up post or message timing if nothing comes in, and what details to fill in.
</task>

<constraints>
- Use only the projects and results the user gave; never invent clients, numbers or testimonials.
- Confident, not desperate; no discounts or "cheap" positioning unless the user asks.
- Do not name past clients publicly unless the user says that is allowed; describe them by type otherwise.
{{> output/uncertainty}}
</constraints>

<output_format>
## Post
Ready to publish.
## Direct messages
Three messages with labels.
## Posting notes
Bullets.
</output_format>
