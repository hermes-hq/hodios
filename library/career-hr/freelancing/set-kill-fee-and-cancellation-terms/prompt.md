---
schema: 1
id: set-kill-fee-and-cancellation-terms
kind: prompt
title: Set kill fee and cancellation terms
description: Designs a freelancer's terms for when a client cancels, postpones or shrinks a project - kill fee tiers, deposit treatment, rescheduling and payment for work done - in plain clauses to check.
category: freelancing
version: 1.0.0
status: incubating
stage: [plan]
role: [consultant, designer, writer, artist]
advice_risk: [legal]
requires: [none]
inputs: [text, preferences]
output: [table, copy, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [kill-fee, cancellation-policy, postponement, deposit, terms-of-business]
pairs_with:
  prompts: [write-statement-of-work, negotiate-client-payment-terms, review-freelance-contract, write-client-welcome-pack]
  personas: [freelance-business-advisor]
args:
  - name: work
    description: What you sell (service, typical project size and length, how far ahead clients book you), and how you price it (fixed fee, day rate, milestones).
    type: text
    required: true
  - name: exposure
    description: What a cancellation costs you - turned-down work, booked dates, third-party costs such as printers, venues or subcontractors - plus any cancellation that has hurt you before and your country.
    type: text
    required: true
  - name: current_terms
    description: Your current deposit and cancellation wording, if any. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What you are protecting, Terms design, Draft clauses, How to explain them, Check before using]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a freelancer decide what happens when a client cancels, pauses or cuts a project. What experienced freelancers know: the real loss is the reserved time they cannot resell at short notice, plus costs already committed, so fair terms scale with how late the cancellation comes and how much work is done. Three separate things get confused: the deposit (often non-refundable because it secures the slot), payment for work completed to date (always owed), and a kill fee for the remaining reserved time. Postponement needs its own rule, or "pause indefinitely" becomes a free cancellation. Ownership matters too: rights in partly finished work usually stay with the freelancer until paid. Clauses that look like penalties rather than a genuine pre-estimate of loss may not be enforceable in some places.

<work>
{{work}}
</work>

<exposure>
{{exposure}}
</exposure>
{{#current_terms}}
<current_terms>
{{current_terms}}
</current_terms>
{{/current_terms}}
</context>

<task>
1. What you are protecting: the freelancer's real losses at different notice points, in their numbers where given. Mark gaps.
2. Terms design: a table of scenarios (cancellation before start with long notice, with short notice, mid-project, at final delivery; postponement; scope cut) with what is paid and why. Separate the deposit, work completed and the kill fee. Set a postponement window after which the project counts as cancelled.
3. Draft clauses: plain-English wording for each term, including what happens to rights in unfinished work and to third-party costs. Keep them short enough to sit in a proposal or statement of work.
4. How to explain them: two or three sentences the freelancer can say when a client queries the terms, framed as protecting the booked slot.
5. Check before using: points to confirm with a local lawyer or contract template, including enforceability and consumer rules if any clients are individuals.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never call a clause enforceable or legally sound; tie each kill fee to a stated loss and flag it for local checking.
- Do not invent industry-standard percentages; if the user wants a benchmark, say it varies and suggest asking peers or a trade body.
- Keep terms proportionate: work done is always paid, and a kill fee is not a profit on the cancelled work.
- Flag different treatment for consumer clients versus businesses.
{{> output/uncertainty}}
</constraints>

<output_format>
## What you are protecting
Bullets.

## Terms design
Table: Scenario | Deposit | Work done | Kill fee | Notes.

## Draft clauses
Numbered clauses.

## How to explain them
Short script.

## Check before using
Numbered.
</output_format>
