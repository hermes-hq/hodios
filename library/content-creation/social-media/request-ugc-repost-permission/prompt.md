---
schema: 1
id: request-ugc-repost-permission
kind: prompt
title: Request permission to repost customer content
description: Writes the messages asking a customer or fan for permission to reuse their photo or video, a record of what was agreed, and the credited repost caption. Use before resharing anyone's content.
category: social-media
version: 1.0.0
status: incubating
stage: [build, operate]
role: [marketer, founder, content-creator]
requires: [none]
inputs: [text]
output: [message, copy, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [user-generated-content, usage-rights, consent, photo-credit, reposting]
pairs_with:
  prompts: [write-instagram-caption, reply-to-comments]
args:
  - name: content_description
    description: What the content is and where you found it (for example "a customer's Instagram reel of our ramen, tagged us, public account, shows her and a friend"), plus your business name.
    type: text
    required: true
  - name: intended_use
    description: How you want to use it. Paid ads and website use need broader, clearer permission than an organic repost.
    type: enum
    enum: [organic-post, ads, website]
    default: organic-post
output_contract:
  format: markdown
  sections: [Permission request, Follow-ups, Consent record, Repost caption, Before you post]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A small business, venue or brand wants to share a photo or video a customer made. Being tagged is not permission: the creator owns their content, and the people in it have their own say. Asking well is quick and usually welcomed, but the request must be specific (where it will appear, for how long, whether it will be paid promotion or edited) so the yes means something, and the answer must be kept. Paid advertising and website use need clearer, written permission than a credited organic repost, and some platforms or countries have extra rules.

Intended use: {{intended_use}}
</context>

<task>
<content>
{{content_description}}
</content>

1. Identify who needs to agree: the creator, and anyone clearly identifiable in it (a parent or guardian for any child). Note music or other people's work inside the content that the creator may not be able to license.
2. Write a short, friendly permission request as a comment-then-DM pair or a DM alone, that thanks them specifically, asks to use this exact piece, says where ({{intended_use}}), for how long, whether it may be cropped or captioned, how they will be credited, and asks for a clear reply ("Reply YES to agree"). For ads or website use, also state whether you offer payment or a gift, and that they can say no without any problem.
3. Write a polite follow-up for no reply after a few days, and a gracious reply for a no.
4. Produce a consent record: who agreed, their handle, date, the exact message they agreed to, scope (channels, duration, edits, paid or not), credit wording, and how to withdraw.
5. Write the repost caption with the credit and tag in the first line, the creator's words quoted only if they agreed.
6. Add a short checklist before posting.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never suggest reposting without permission, using a hashtag as automatic consent, or removing a watermark or credit.
- Do not invent the creator's name or handle; use [handle] if not given.
- For paid ads, influencer-style deals, or anything involving children, say a written agreement is wiser and that local advertising and copyright rules should be checked with a qualified adviser.
- Messages warm and short: request under 70 words, follow-up under 40.
- If it is unclear what the content is or who made it, ask before drafting.
</constraints>

<output_format>
## Permission request
Ready to send.

## Follow-ups
No reply after a few days; reply to a yes; reply to a no.

## Consent record
Table: field | value (with [blanks]).

## Repost caption
Ready to paste.

## Before you post
Checklist.
</output_format>
