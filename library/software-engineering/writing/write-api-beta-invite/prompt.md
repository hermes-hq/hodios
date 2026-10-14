---
schema: 1
id: write-api-beta-invite
kind: prompt
title: Write an API beta invitation
description: Writes the invitation to a private API or SDK beta that sets honest expectations on breaking changes, support, data use and production use, says what feedback you need and how to opt out.
category: writing
version: 1.0.0
status: incubating
stage: [ship]
role: [developer-advocate, product-manager, backend-engineer]
requires: [none]
inputs: [notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [beta, early-access, expectations, feedback-request, breaking-changes]
pairs_with:
  prompts: [plan-beta-program, write-api-launch-announcement]
args:
  - name: beta
    description: What is in the beta, who is being invited and why them, how long it runs, stability and support level, whether production use is allowed, data and usage terms, cost, what feedback you want and how, and how to join or leave.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Invitation, Expectation checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A private beta invite is a contract in prose. Developers who join will build on what you ship, so the invite has to tell them, before they write a line of code, how much can break, how much notice they get, whether they may put it in production, what you do with their data and traffic, what it will cost later, and what you need from them in return. Invites that read like marketing get sign-ups who never send feedback and then feel betrayed by the first breaking change. A specific feedback ask (one scenario to try, a 20-minute call) gets far more useful responses than "let us know what you think".
</context>

<task>
Write the beta invitation.

<beta>
{{beta}}
</beta>

1. Open with why this developer was invited and what they get early access to, in two sentences.
2. Say what they can try, with the one or two scenarios you most want tested.
3. Set expectations in a short list: stability and breaking-change notice, support channel and response time, production use allowed or not, data and usage terms, cost during and after the beta, and the beta's end date or criteria.
4. Make the feedback ask specific: what, how and by when.
5. Give the steps to join and how to leave the beta, including what happens to their data or integration on leaving.
6. Write a subject line.
</task>

<constraints>
- Use only terms the input states. Where an expectation item is missing, put a placeholder such as `[production use: confirm]` and list it in the checklist; do not reassure on points the input does not cover.
- Under about 300 words.
- No pressure tactics or fake scarcity.
</constraints>

<output_format>
## Invitation
Subject line, then the message.

## Expectation checklist
| Item | Stated in input? | Text used |
Items: breaking changes, support, production use, data use, cost, end of beta, how to leave.
</output_format>
