---
schema: 1
id: set-up-small-business-assistant
kind: prompt
title: Set up an AI assistant for a small business
description: Sets up an AI assistant for a sole trader or small business with a dated fact sheet, voice guide and never-promise rules, so customer replies and posts never invent prices or policies.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, individual]
requires: [none]
inputs: [text, preferences]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: beginner
tags: [sole-trader, business-fact-sheet, customer-replies, brand-voice]
pairs_with:
  prompts: [build-project-instructions, prepare-knowledge-files]
  rules: [privacy-first-assistant-rules]
args:
  - name: business
    description: What you sell, to whom, where, how you work (hours, area, booking, delivery) and your main policies, as far as you know them.
    type: text
    required: true
  - name: tasks
    description: What you want the assistant to help with, for example customer replies, social posts, quotes, invoices chasing, product descriptions.
    type: text
    required: true
  - name: voice
    description: "Optional: two or three messages or posts you wrote that sound like you, or a description of how you talk to customers."
    type: text
output_contract:
  format: markdown
  sections: [Business fact sheet, Voice, Instructions, Task playbooks, Customer data, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
For a small business the costly assistant mistakes are confident inventions: a price that was never set, a refund the owner never offered, a delivery date, a guarantee, a claim about what the law requires. They come from the assistant filling gaps. The fix is a short, dated fact sheet as the only source for business facts, a "never promise" list, and gaps marked so the owner fills them before sending. A voice guide built from the owner's own messages keeps replies from sounding generic. Customer names, addresses and order details should be kept to what a task needs, and the account type matters for what may be pasted.

<business>
{{business}}
</business>
<tasks>
{{tasks}}
</tasks>
{{#voice}}
<voice_samples>
{{voice}}
</voice_samples>
{{/voice}}
</context>

<task>
1. If the input does not say what the business sells and to whom, ask for that in one question and stop.
2. Write the fact sheet: offer, prices with the date they were set, service area, hours, booking and payment, delivery or lead times, returns and cancellation policy, frequent questions with answers. Use only facts from the input; mark every gap [CONFIRM].
3. Write a voice guide: three to six concrete traits taken from the samples (greeting, sign-off, sentence length, words used and avoided, emoji or not). Without samples, write a neutral friendly default and say so.
4. Write the instructions: use only the fact sheet for business facts; if a fact is missing, write [CHECK: question] in the draft instead of guessing; never promise refunds, discounts, dates, guarantees or legal and tax positions that the sheet does not state; every customer-facing text is a draft for the owner; match the voice guide.
5. Write a playbook for each task: the prompt to use, what to paste in, and a two-line check before sending.
6. Say how to handle customer data: paste only what the task needs, remove payment and identity details, and check the provider's terms for business use.
7. Give four tests, including a customer asking for a discount the policy does not offer and a question the sheet cannot answer.
</task>

<constraints>
- Do not invent prices, policies, opening hours, legal obligations or certifications.
- Do not give tax or legal conclusions; mark them for the owner to check with an adviser.
- Keep the fact sheet and instructions short enough to paste, about 3,000 characters together, and suggest a knowledge file for longer price lists.
</constraints>

<output_format>
## Business fact sheet
One fenced block with [CONFIRM] gaps and a "last updated" line.
## Voice
Bullets.
## Instructions
One fenced block.
## Task playbooks
One short subsection per task.
## Customer data
Bullets.
## Tests
Four bullets: prompt and pass condition.
</output_format>
