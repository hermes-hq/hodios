---
schema: 1
id: follow-up-with-nps-detractors
kind: prompt
title: Follow up with NPS detractors
description: Prioritises detractors and passives from an NPS or satisfaction survey and writes outreach messages and a call guide to learn the cause and recover the account without score-begging.
category: user-feedback
version: 1.0.0
status: incubating
stage: [operate]
role: [product-manager, support-agent, manager, founder]
requires: [none]
inputs: [dataset, text]
output: [message, questions, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [net-promoter-score, detractor-outreach, service-recovery, account-recovery, closed-loop]
pairs_with:
  prompts: [design-nps-program, analyze-user-feedback, close-feedback-loop]
args:
  - name: responses
    description: The detractor and passive responses to follow up, with score, comment, date and whatever account details you have (plan, revenue, tenure, owner).
    type: text
    required: true
  - name: context
    description: Who will do the outreach, what they can offer (fixes, training, credits, escalation), and the product or service. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Prioritised list, Outreach messages, Call guide, What you can and cannot offer, Logging and routing, Follow-through]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run closed-loop follow-up for customer satisfaction surveys. Following up with detractors works when it is fast (days, not weeks), personal, and aimed at understanding, not at changing the score. Asking someone to raise their score, or hinting that a better score would help, corrupts the data the whole programme depends on, and most survey programmes forbid it. Passives (7 and 8) are often easier to recover than detractors and are usually ignored. A score with no comment tells you nothing about cause; the first job is to ask. Many complaints are really support problems (an open bug, a billing error) that need routing today, while others point to product gaps that no single call can fix, and the honest answer then is what will happen next and when they will hear back.

Responses:

<responses>
{{responses}}
</responses>
{{#context}}

Context:

<context_notes>
{{context}}
</context_notes>
{{/context}}
</context>

<task>
1. Prioritise the responses into a contact list: urgent (open bug, billing error, threat to cancel, safety or data concern), high (high-value or long-tenure account, specific fixable complaint), normal, and email-only. Use account value, severity, recency and whether a comment exists. Say what you assumed where data is missing.
2. Route anything that is a live support issue to support now, with a one-line handover for each.
3. Write outreach messages: one personal email for detractors with a comment (refers to what they said, thanks them, asks for 15 minutes or a reply), one for detractors with no comment (asks one question about what drove the score), and one for passives (asks what would make it better). Plain text, under about 100 words each, from a named role.
4. Write a call guide: opening, permission to take notes, open questions about what happened and its impact, probes to reach the root cause (the last time it happened, what they did instead, how often), what not to do (argue, defend, promise roadmap dates, mention the score), and how to agree a concrete next step.
5. State what the caller can and cannot offer, based on the context given; if none was given, list common options and mark them as to be confirmed.
6. Define logging and routing: fields to record (root cause code, product area, severity, recoverable or not, next step, owner, date), and where product, support and account issues go.
7. Define follow-through: when the customer hears back, how to close the loop when a fix ships, and what to report monthly (contact rate, time to contact, root causes, saves).
</task>

<constraints>
- Never ask or nudge a customer to change their score.
- Do not promise features, dates or credits beyond what the context allows.
- Respect anyone who declines contact; one follow-up at most.
- Quote customers only from the responses given; do not invent comments.
</constraints>

<output_format>
## Prioritised list
A table: respondent | score | priority | reason | owner.

## Outreach messages
Three messages.

## Call guide
Numbered sections.

## What you can and cannot offer
Bullets.

## Logging and routing
A table: field | values.

## Follow-through
Bullets.
</output_format>
