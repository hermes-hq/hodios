---
schema: 1
id: plan-beta-to-ga-transition
kind: prompt
title: Plan the move from beta to general availability
description: Plans graduating a product or feature from beta to general availability with exit criteria, what changes for beta users (price, limits, support, SLA), their communications and a GA checklist.
category: product-launch
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [product-manager, project-manager, founder]
requires: [none]
inputs: [text, dataset]
output: [plan, checklist, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [general-availability, beta, exit-criteria, beta-users, sla]
pairs_with:
  prompts: [plan-beta-program, plan-product-launch, run-launch-go-no-go-review, write-launch-announcement]
args:
  - name: beta
    description: What is in beta, how long it has run, how many users or accounts, what they were promised (free, discount, feedback), and current quality, usage and support numbers.
    type: text
    required: true
  - name: ga_changes
    description: What will be different at GA - pricing, limits, plan availability, support level, SLA, data or API changes. Optional; if missing, the plan lists what to decide.
    type: text
  - name: target_date
    description: Target GA date. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Readiness against exit criteria, What changes at GA, Beta user transition, Communications, GA checklist, Risks and open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product lead who has taken products out of beta. "GA" is a promise: the product is supported, priced, documented, stable enough for an SLA if one applies, and will not change without notice. Betas often drift for months because nobody defined exit criteria, then end abruptly with a pricing email that angers the most engaged users. Good transitions decide the criteria in advance, check them with data, treat beta users as the first customers (honouring what they were promised and rewarding their help), and give notice before anything they rely on changes.

Beta: {{beta}}
{{#ga_changes}}Changes at GA: {{ga_changes}}{{/ga_changes}}
{{#target_date}}Target GA date: {{target_date}}{{/target_date}}
</context>

<task>
1. Set or confirm exit criteria and check the beta against them: reliability and performance, severity of open bugs, feature completeness for the main use cases, retention or repeat usage of beta users, support load per user, documentation, security and privacy review, billing ready, and scale for expected GA volume. Mark each met, not met or unknown, citing the numbers given.
2. Give a verdict: ready, ready with conditions, or not ready, and what would change it.
3. List what changes at GA for beta users: price, discounts, limits, data retention, features removed or moved to other plans, support level, SLA, API stability, and the "beta" label. Where the input does not say, list it as a decision to make.
4. Plan the beta user transition: what they keep (honour every promise made), any thank-you offer (discount period, extended trial, credit, founder badge), the notice period before paid changes, what happens if they do nothing, and how to handle beta users who rely on something being removed.
5. Communications: a sequence for beta users (advance notice, reminder, GA day), internal teams (support, sales, success), and the public announcement. Draft the advance notice to beta users.
6. GA checklist: label removal, docs and pricing pages, billing switch-over tested, support routing, SLA and terms published if applicable, monitoring and on-call, analytics for GA metrics.
</task>

<constraints>
- Never recommend breaking a promise made to beta users; if a GA change conflicts with one, flag it and propose a way to honour it.
- Paid changes need advance notice; suggest a period (commonly 30 days or one billing cycle) and note that contracts or local consumer rules may require more.
- Do not invent metrics; mark missing data as unknown and say how to get it.
- If the beta numbers show it is not ready, say so plainly rather than planning GA anyway.
</constraints>

<output_format>
## Readiness against exit criteria
Table: criterion | threshold | current | status. Then the verdict.

## What changes at GA
Table: area | beta | GA | decision needed.

## Beta user transition
Bullets.

## Communications
Table: when | audience | channel | message. Then the draft notice to beta users.

## GA checklist
Checklist with owner roles.

## Risks and open questions
Bullets.
</output_format>
