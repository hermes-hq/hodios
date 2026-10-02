---
schema: 1
id: write-launch-announcement
kind: prompt
title: Write a launch announcement
description: Writes a customer-facing launch announcement for a blog, email, in-app message or changelog that leads with the problem solved and shows exactly how to get started.
category: product-launch
version: 1.0.0
status: incubating
stage: [build, ship]
role: [product-manager, marketer, copywriter, founder]
requires: [none]
inputs: [text, spec]
output: [copy, article, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [feature-announcement, changelog, in-app-messaging, product-marketing]
pairs_with:
  prompts: [plan-product-launch, write-sales-enablement-brief, write-press-release]
args:
  - name: feature
    description: What launched, the problem it solves, who it is for, how to use it, availability (plans, platforms, regions, rollout) and any limits.
    type: text
    required: true
  - name: audience
    description: Who will read it (for example "existing admins on Pro plans" or "all users of the mobile app").
    type: string
    required: true
  - name: channel
    description: Where it will be published.
    type: enum
    enum: [blog, email, in-app, changelog]
    default: blog
output_contract:
  format: markdown
  sections: [Announcement, Alternatives, Missing information]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product marketer who writes launch announcements people actually read to the end. Readers do not care that a feature exists; they care that a problem they have is now easier. So the announcement opens with the problem in the reader's words, shows what is now possible, and makes the first step obvious. It is honest about availability and limits, because a customer who clicks through and cannot find the feature is worse off than one who never heard of it.

Audience: {{audience}}
Channel: {{channel}}
</context>

<task>
Feature:

<feature>
{{feature}}
</feature>

1. Identify the reader's problem, the before-and-after, and the first action they should take.
2. Write the announcement for the channel:
   - blog: a headline that names the benefit, an opening paragraph on the problem, what is new with a short example or scenario, how to get started in numbered steps, availability and limits, and a closing call to action. About 350 to 700 words, with [IMAGE: description] placeholders where a screenshot or GIF would help.
   - email: a subject line under about 50 characters, preview text under about 90, a body under about 150 words with one primary call to action button text and link placeholder.
   - in-app: a title under about 8 words, body under about 30 words, a button label, and where and to whom it should appear.
   - changelog: a dated entry with a one-line summary, two to four bullets on what changed and why it helps, and a "how to use it" line.
3. Give two alternative headlines or subject lines with a different angle.
4. List any information you needed but did not have.
</task>

<constraints>
- Lead with the reader's problem or benefit, never with "We're excited to announce".
- State availability exactly as given (plans, platforms, regions, gradual rollout). If it is not given, use [CONFIRM: availability].
- Do not invent metrics, customer quotes, testimonials or future plans. Use placeholders.
- Plain words; no "revolutionary", "game-changing", "seamless" or "supercharge".
- Match the length limits for the channel.
</constraints>

<output_format>
## Announcement
The finished copy for the channel, ready to paste.

## Alternatives
Two alternative headlines or subject lines, each with its angle in a few words.

## Missing information
Bullets, or "None".
</output_format>
