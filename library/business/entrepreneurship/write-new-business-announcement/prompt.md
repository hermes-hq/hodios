---
schema: 1
id: write-new-business-announcement
kind: prompt
title: Announce your new business to your network
description: Writes the messages telling friends, family, past colleagues, clients and local groups about your new business, each with one specific ask and nothing that feels like spam.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [ship]
role: [founder, individual]
requires: [none]
inputs: [text]
output: [message, post, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [launch-outreach, warm-network, referrals, personal-network, word-of-mouth]
pairs_with:
  prompts: [find-first-customers, write-elevator-pitch, write-launch-announcement]
args:
  - name: business
    description: What the business offers, who it is for, where, when it opens or launched, any launch offer, and how people buy or book.
    type: text
    required: true
  - name: audiences
    description: The groups you want to tell (for example close friends and family, former colleagues, past clients from your old job, a neighbourhood group, professional contacts on a networking site) and anything relevant about each. Optional.
    type: text
  - name: tone
    description: How you usually write to these people - casual, warm, professional - and the channels you use. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Who to tell and the ask, Messages, Follow-up plan, What not to do]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help new business owners tell the people who already know them. A founder's own network is usually the source of the first customers and referrals, but generic mass messages ("please like and share my page!") get ignored or annoy. What works is a personal note, sized to the relationship, that says plainly what the business does and who it is for, and makes one specific ask that suits that person: buy, book, refer one named type of person, share in a particular group, give feedback, or write a review. People who are not the customer can still introduce the founder to someone who is.

<business>
{{business}}
</business>
{{#audiences}}
<audiences>
{{audiences}}
</audiences>
{{/audiences}}
{{#tone}}
Tone and channels: {{tone}}
{{/tone}}
</context>

<task>
1. Group the audiences (use sensible defaults if none were given): close friends and family, wider social circle, former colleagues and professional contacts, past clients or customers, and local or online communities. For each, choose the single most useful ask.
2. Write one message per group in the right channel and length: a short personal text or direct message, an email, a professional network post, and a community post that follows typical group etiquette (ask the admin first where needed). Each message says what the business is in one line, who it is for, the ask, and how to act on it.
3. Add a personalisation line for messages to individuals (a placeholder like `[something you share with them]`) so the founder avoids copy-paste feel.
4. Follow-up plan: when to follow up once, how to thank people who help, and how to track who replied.
5. What not to do: a few short points, such as adding people to groups without asking or messaging former employer clients if a contract restricts it.
</task>

<constraints>
- Do not invent testimonials, offers, prices or opening details. Use placeholders for anything not given.
- Keep each message short: under 80 words for texts and direct messages, under 150 for emails and posts.
- If the founder may be contacting clients of a former employer, flag that they should check any non-solicitation clause first.
- Respect consent: suggest one-to-one messages rather than adding people to marketing lists without permission.
</constraints>

<output_format>
## Who to tell and the ask
Table: Group | Channel | The ask.
## Messages
One subsection per group with the draft.
## Follow-up plan
## What not to do
</output_format>
