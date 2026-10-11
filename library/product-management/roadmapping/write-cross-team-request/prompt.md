---
schema: 1
id: write-cross-team-request
kind: prompt
title: Write a cross-team roadmap request
description: Writes a request asking another team to put your dependency on their roadmap, with the specific ask, why it matters, the cost of a no, the date needed and options that make yes easier.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, engineering-manager, tech-lead, project-manager]
requires: [none]
inputs: [text, notes]
output: [message, docs]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [dependency-request, cross-team, internal-ask, unblocking, platform-teams]
pairs_with:
  prompts: [map-cross-team-dependencies, plan-around-blocked-dependency, push-back-on-roadmap-request]
args:
  - name: need
    description: What you need from the other team, what it unblocks, the outcome or customer impact at stake, and the date you need it by.
    type: text
    required: true
  - name: other_team
    description: The team you are asking, what you know about their priorities and workload, and your relationship with them.
    type: text
    required: true
  - name: channel
    description: How the request will be sent.
    type: enum
    enum: [written-doc, email, chat-message, intake-form]
    default: written-doc
output_contract:
  format: markdown
  sections: [The request, Options that make yes easier, If they say no, Follow-up plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write a request to another team to put something you depend on onto their roadmap. These requests usually arrive as "can you build X by Friday?", with no reason the other team should rank it above their own commitments. Requests get accepted when they are specific (the smallest thing that unblocks you, with a clear interface or acceptance test), explain the impact in terms the other team's leaders care about, give a real date with the reason behind it, acknowledge the other team's priorities, and offer options: a smaller slice, your team doing part of the work with their review, a later date with a workaround. Escalation is a last resort that works better when the request was clear and reasonable first.
</context>

<task>
What you need:

<need>
{{need}}
</need>

The other team:

<other_team>
{{other_team}}
</other_team>

Channel: {{channel}}

1. Reduce the ask to the smallest specific thing that unblocks you, with an acceptance check the other team can verify (for example "an endpoint that returns X for Y").
2. Write the request in the chosen channel's format: the ask, why it matters (outcome, customers, revenue or risk, using only what the user gave), the date needed and why that date, and what you already tried or ruled out.
3. Acknowledge their priorities and offer options that make yes easier: a smaller slice, your team contributing code or testing, flexible timing, or taking on a related task of theirs.
4. Spell out what happens if they say no or not yet, honestly and without threat, so their decision is informed.
5. Propose a follow-up plan: when you will check back, who decides if the two teams disagree, and the latest date to escalate without causing a crisis.
</task>

<constraints>
- Use only the facts the user gave. Never invent revenue, customer names or deadlines.
- Respectful and direct; no guilt-tripping, no implied threats, no copying executives into the first request.
- Keep a chat message under 120 words and a written doc under one page.
- If the ask is vague, say what must be clarified before sending.
</constraints>

<output_format>
## The request
The ready-to-send text.

## Options that make yes easier
Bullets.

## If they say no
Short paragraph on impact and your fallback.

## Follow-up plan
Bullets: check-in date, decider, escalation date.
</output_format>
