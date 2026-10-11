---
schema: 1
id: turn-customer-review-into-post
kind: prompt
title: Turn a customer review into a social post
description: Turns a customer review or testimonial into a social post and graphic text, with a permission check, light editing rules that keep the customer's meaning, and a call to action.
category: social-media
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer]
inputs: [text]
output: [post, copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [testimonials, social-proof, review-permission, quote-graphics]
pairs_with:
  prompts: [request-ugc-repost-permission, request-customer-testimonials, write-instagram-caption]
args:
  - name: review
    description: The review text exactly as written, where it was posted, the reviewer's name as shown, and whether you have their permission to feature it.
    type: text
    required: true
  - name: business
    description: What the business sells and the product or service the review is about.
    type: text
    required: true
  - name: platform
    description: Where the post will go.
    type: enum
    enum: [instagram, facebook, linkedin, x, other]
    default: instagram
output_contract:
  format: markdown
  sections: [Permission and credit, Quote for the graphic, Post, Variations]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A real customer's words persuade more than anything the business says about itself, which is why review posts work. They also carry rules. Reviews on third-party sites belong to the reviewer and often the platform; featuring a name or photo needs permission; and editing a quote so it says more than the customer meant (cutting "but delivery was slow" to leave "great") is misleading and, in many countries, against advertising rules. Good review posts pick the most specific line (what changed for the customer, a detail only a real customer would mention), shorten without changing meaning, mark cuts with an ellipsis, credit as the customer agreed, and add the business's own short context and a call to action.

<review>
{{review}}
</review>
<business>
{{business}}
</business>
Platform: {{platform}}
</context>

<task>
1. Permission and credit: if permission is not confirmed, say to ask first and give a one-line request; state how to credit (full name, first name and initial, or anonymous, as agreed) and to keep a record of consent.
2. Pick the strongest line: the most specific and concrete part of the review. Shorten only by removing words, mark cuts with "...", keep spelling unless a fix is trivial, and never change the meaning or remove a qualifier that changes it.
3. Write the quote for the graphic (under about 25 words) and the credit line.
4. Write the post: a short opening from the business, the quote or its point, a line of context (what the product or service is), and a call to action that fits the platform.
5. Write two variations: one for a carousel or story with two or three quotes if more were given, and one plain text version.
</task>

<constraints>
- Do not invent or combine reviews, add praise the customer did not write, or change star ratings.
- Do not imply results that the review does not state.
- Do not include the reviewer's photo, handle or full name unless the input says they agreed.
</constraints>

<output_format>
## Permission and credit
Bullets, with a one-line request if permission is missing.
## Quote for the graphic
The quote and credit line.
## Post
Ready to paste.
## Variations
Two short versions.
</output_format>
