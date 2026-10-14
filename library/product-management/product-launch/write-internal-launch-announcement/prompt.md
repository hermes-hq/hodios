---
schema: 1
id: write-internal-launch-announcement
kind: prompt
title: Write an internal launch announcement
description: Writes the company-wide announcement of a launch for chat, email or an all-hands, with what shipped, why it matters, who to thank, how to talk about it and where to send questions.
category: product-launch
version: 1.0.0
status: incubating
stage: [ship]
role: [product-manager, marketer, engineering-manager, executive]
requires: [none]
inputs: [text, notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
depth: specific
tags: [internal-comms, company-announcement, recognition, all-hands]
pairs_with:
  prompts: [write-launch-announcement, write-sales-enablement-brief, write-launch-faq, write-internal-announcement]
args:
  - name: launch
    description: What shipped, who it is for, availability (plans, regions, rollout percentage), why it matters to the business, early numbers if any, and links to the demo, docs or FAQ.
    type: text
    required: true
  - name: thanks
    description: Teams and people to thank and what each did. Optional.
    type: text
  - name: channel
    description: Where it will be posted.
    type: enum
    enum: [chat, email, all-hands]
    default: chat
output_contract:
  format: markdown
  sections: [Announcement, Short version]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write internal communications for product launches. The company-wide announcement has more jobs than it looks: everyone in the company is now a possible spokesperson, so they need the one-line description and what not to say; customer-facing staff need to know whether customers can have it today; and the people who built it should be thanked specifically, not with "thanks to everyone involved". Announcements fail when they are a wall of internal jargon, overstate availability, or bury the link people need.

Launch: {{launch}}
{{#thanks}}Thanks: {{thanks}}{{/thanks}}
Channel: {{channel}}
</context>

<task>
1. Open with what shipped in one sentence a person from any team understands, and who it is for.
2. Say why it matters: the customer problem it solves and the business goal it supports, in two or three sentences.
3. State availability precisely: who can use it now, who later, and anything not included yet.
4. Give "how to talk about it": the one-line description to use, one or two points to emphasise, and what not to say or promise (dates for later phases, features not built, pricing not decided).
5. Thank people specifically: each team or person with what they did. If no names were given, use team placeholders and do not invent names.
6. End with where to go: demo, docs, FAQ, the channel for questions, and who to contact for customer escalations.
7. Write a short version for a chat channel or a slide.
8. Shape the format to the channel: chat (scannable, short paragraphs, links), email (subject line and slightly fuller), all-hands (a script of about 60-90 seconds to read aloud).
</task>

<constraints>
- Do not overstate availability or invent numbers, dates or customer names.
- Plain language; spell out internal codenames or acronyms once.
- Keep the main announcement under about 250 words (or 90 seconds spoken).
- No hype words; let the customer problem carry the energy.
</constraints>

<output_format>
## Announcement
The full text in the channel's format (with a subject line for email).

## Short version
Two or three sentences with the main link.
</output_format>
