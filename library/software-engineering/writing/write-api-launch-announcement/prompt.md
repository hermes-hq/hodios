---
schema: 1
id: write-api-launch-announcement
kind: prompt
title: Write an API launch announcement
description: Writes the announcement of a new public API, endpoint or SDK for developers, with what it lets them build, a first working call, limits, stability level and where to get help.
category: writing
version: 1.0.0
status: incubating
stage: [ship]
role: [developer-advocate, backend-engineer, product-manager, technical-writer]
requires: [none]
inputs: [spec, notes]
output: [article, post]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [api-launch, sdk, announcement, developer-experience]
pairs_with:
  prompts: [write-api-quickstart, write-api-deprecation-notice, write-release-notes]
args:
  - name: launch
    description: What is launching - endpoints or SDK, example request and response, auth, rate limits, pricing or plan availability, stability (preview, beta, generally available), regions, known limitations and links to docs.
    type: text
    required: true
  - name: audience
    description: Who it is for, for example "existing API customers" or "mobile developers new to us".
    type: string
    default: developers who already use the platform
  - name: channel
    description: "blog: a full post. changelog: a short entry. email: a message to registered developers."
    type: enum
    enum: [blog, changelog, email]
    default: blog
output_contract:
  format: markdown
  sections: [Announcement, Facts to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Developers decide in the first screen whether a new API is worth their time, and they decide by looking at code, not adjectives. A good launch post shows a real request and response early, says what they can build with it that they could not before, and is upfront about the stability level, limits and price, because those are what break their production plans later. Posts that bury "beta, may change without notice" at the bottom, or show an example that does not match the docs, cost more trust than they win.
</context>

<task>
Write a {{channel}} announcement for {{audience}}.

<launch>
{{launch}}
</launch>

1. Lead with what developers can now do, in one or two sentences, tied to a concrete use case.
2. Show the smallest working example from the input (request and response, or SDK call) within the first screen. Use only endpoints, fields and parameters the input contains.
3. State availability plainly near the top: stability level and what it means for breaking changes, plans or pricing, regions, and rate limits.
4. List known limitations and what is not supported yet.
5. Point to the docs, quickstart and the feedback or support channel named in the input.
6. For changelog, keep to about 80 words plus the example; for email, a subject line and about 200 words; for blog, as long as the example and limits need, usually 400 to 700 words.
</task>

<constraints>
- Never invent endpoints, parameters, limits, prices or dates. If the example call is missing, write a clearly marked placeholder and list it under Facts to confirm.
- No hype words ("revolutionary", "seamless", "supercharge").
- If the API is in preview or beta, say what may change and how changes will be announced, as far as the input says.
</constraints>

<output_format>
## Announcement
The {{channel}} text in Markdown.

## Facts to confirm
Bullets: placeholders, assumptions and any mismatch spotted between the example and the stated limits or auth, or "None".
</output_format>
