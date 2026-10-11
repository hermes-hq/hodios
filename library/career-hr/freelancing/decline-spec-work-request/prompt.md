---
schema: 1
id: decline-spec-work-request
kind: prompt
title: Respond to a request for free spec work
description: Helps a freelancer answer a prospect who wants a free sample, unpaid test task or speculative pitch, with a paid alternative such as a small discovery project, and a reply that keeps the lead.
category: freelancing
version: 1.0.0
status: incubating
stage: [discover]
role: [designer, writer, copywriter, software-engineer]
requires: [none]
inputs: [message, text]
output: [message, report]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [spec-work, free-sample, unpaid-test, paid-discovery, sales-qualification]
pairs_with:
  prompts: [screen-freelance-inquiry, write-freelance-proposal, respond-to-discount-request]
  personas: [freelance-business-advisor]
args:
  - name: request
    description: The prospect's message asking for free work, pasted in full, and what you know about them (size, how they found you, the project and its likely budget).
    type: text
    required: true
  - name: position
    description: How much you want this client, what portfolio pieces or case studies you already have that are relevant, and any small paid starter offer you could make.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What they really need, Options, Recommended reply, If they insist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a freelancer respond when a prospect asks for free work: a custom sample, a "quick test", logo concepts before signing, or a pitch against other freelancers. What experienced freelancers know: the prospect is usually trying to reduce risk ("will this person get it right?"), not trying to exploit them, so the best answer removes that risk another way: relevant past work, a walkthrough of how they would approach the problem, references, or a small paid first step (a discovery session, a one-page audit, a single paid test at a reduced scope). Free custom work also has a hidden cost: the client may use it, and it signals the freelancer's time is cheap. Some contexts are different: a short, clearly bounded hiring-style exercise for an agency or a marketplace skills check may be reasonable.
</context>

<task>
<request>
{{request}}
</request>

<position>
{{position}}
</position>

1. What they really need: the risk the prospect is trying to reduce, from their words, and any signs this is a fishing exercise (many freelancers asked, vague scope, a full deliverable requested).
2. Options: decline and offer proof instead; offer a paid starter (scoped, priced, credited against the main project if they go ahead); do a very small bounded exercise; or walk away. For each, the cost to the freelancer and the likely response.
3. Recommend one in two sentences, using how much the freelancer wants this client.
4. Write the reply: warm, confident, under 150 words; acknowledges the reason behind the request, explains in one line why custom work starts paid, points to the most relevant proof, and offers the next step.
5. If they insist: a short second reply and a polite walk-away line.
</task>

<constraints>
- Do not lecture the prospect about spec work or imply bad faith.
- Do not invent portfolio pieces, clients or results; use only what the freelancer lists, and say if their proof is thin.
- If recommending a small free exercise, cap it in hours and state that the client cannot use the output without paying.
- Do not give a price for the paid starter unless the freelancer has given rates; otherwise leave a [price] placeholder.
{{> output/uncertainty}}
</constraints>

<output_format>
## What they really need
Bullets.

## Options
Table: Option | Cost to you | Likely response.

## Recommended reply
Ready to send.

## If they insist
Short reply and walk-away line.
</output_format>
