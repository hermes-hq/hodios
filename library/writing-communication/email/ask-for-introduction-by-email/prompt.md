---
schema: 1
id: ask-for-introduction-by-email
kind: prompt
title: Ask a contact for an introduction
description: Asks a mutual contact to introduce you to someone for a job, client, expert or partner conversation, with why this person, an easy opt-out and a short blurb they can forward as is.
category: email
version: 1.0.0
status: incubating
stage: [build]
role: [individual, job-seeker, founder, sales-rep]
requires: [none]
inputs: [notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [warm-introduction, forwardable-blurb, referral-request, relationship-building, mutual-contact]
pairs_with:
  prompts: [write-introduction-email, write-networking-message, write-investor-intro-request]
args:
  - name: connector
    description: The mutual contact you are asking, how well you know them and when you last spoke.
    type: string
    required: true
  - name: target
    description: The person you want to meet, their role and organisation, and how you know the connector knows them (worked together, LinkedIn connection only, friends).
    type: string
    required: true
  - name: purpose
    description: Why you want to talk to them, what you hope to get from it, what is in it for them, and who you are in one or two lines.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Email to the connector, Forwardable blurb, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Experienced connectors forward a request only when it costs them nothing and will not embarrass them. That is why the best intro requests come with a self-contained "forwardable blurb": three or four sentences the connector can paste to the target to ask whether they are open to an introduction (the double opt-in). The request itself should be specific about why this person, not "anyone in marketing", should check how well the connector actually knows the target, and should make it easy to say "I don't know them well enough". A request that asks for a weak connection to be stretched, or that hides a sales pitch, uses up the connector's goodwill. For fundraising introductions to investors there is a separate, more specialised entry.
</context>

<task>
Write a request to {{connector}} for an introduction to {{target}}.

<purpose>
{{purpose}}
</purpose>

1. If the purpose is vague ("pick their brain", "anyone useful"), ask up to two questions that would make it specific and stop.
2. Subject: "Would you be open to introducing me to [target first name]?"
3. Email to the connector (under about 150 words): a short personal opening if they have not spoken recently, the ask in the first two sentences, why this particular person (one or two reasons), what you would like (a 20-minute call, an email exchange), and what is in it for the target.
4. Ask how well they know the target and give an easy out: "If you don't know them well enough or it isn't a good time, no problem at all."
5. Say you have written a blurb they can forward, so they only need to ask the target whether they are open to it.
6. Forwardable blurb (under about 90 words), written in the third person about you or in your voice as the connector would forward it: who you are, the specific reason to talk, the small ask, and a line that it is fine to say no.
7. Under Notes, warn if the connector link looks weak (for example only a LinkedIn connection) and suggest a softer ask, or a direct approach instead.
</task>

<constraints>
- Use only the facts given. Never invent shared history, results, mutual friends or credentials.
- Do not disguise a sales pitch as advice-seeking; if the real goal is selling, say it honestly in the blurb.
- No pressure, no "I've already told them you'll introduce us".
- One clear ask; do not stack several requests.
</constraints>

<output_format>
## Email to the connector
Subject, then body.
## Forwardable blurb
The blurb, ready to paste.
## Notes
Strength of the connection and any warnings. "None" if nothing.
</output_format>
