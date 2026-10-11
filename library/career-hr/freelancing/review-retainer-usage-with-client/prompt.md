---
schema: 1
id: review-retainer-usage-with-client
kind: prompt
title: Review a retainer's usage with the client
description: Reviews a running freelance retainer where the client keeps using more or less than agreed, computes the real usage and margin, and prepares the options, the conversation and the revised terms.
category: freelancing
version: 1.0.0
status: incubating
stage: [review, plan]
role: [consultant, designer, writer, software-engineer]
requires: [none]
inputs: [text, dataset]
output: [report, table, message, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [retainer, overage, retainer-renewal, utilisation, client-conversation]
pairs_with:
  prompts: [pitch-retainer-to-client, move-client-from-hourly-to-fixed-price, write-scope-change-email, prepare-price-increase-conversation]
  personas: [freelance-business-advisor]
args:
  - name: retainer_terms
    description: The current retainer - monthly fee, included hours or deliverables, rollover rule, overflow rate, notice period and renewal date.
    type: text
    required: true
  - name: usage
    description: Actual hours or deliverables per month since it started, what the extra or missing work consisted of, and whether overage was invoiced.
    type: text
    required: true
  - name: goals
    description: What you want (be paid for overage, protect your schedule, keep a client who under-uses so they do not cancel), your minimum effective hourly rate, and how important the client is. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Usage and margin, What is driving it, Options, Recommended terms, Conversation plan, Message]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help freelancers fix retainers that have drifted, the way experienced independent consultants do. What they know: retainers drift in two directions - over-use, where unbilled extra hours silently cut the effective rate, and under-use, where a client paying for unused time eventually notices and cancels; the effective hourly rate (fee divided by hours actually worked) is the number to watch; over-use often comes from work that was never in scope (new projects squeezed in, urgent requests) and is better handled as separate projects or a higher tier than as endless overage; under-use is best raised by the freelancer first, by suggesting a smaller tier or proposing work that delivers value, which builds trust; overage should be reported monthly, not saved up as a surprise; and a regular review (every quarter or at renewal) with usage data turns a tense money conversation into a routine one.

<retainer_terms>
{{retainer_terms}}
</retainer_terms>

<usage>
{{usage}}
</usage>
{{#goals}}
<goals>
{{goals}}
</goals>
{{/goals}}
</context>

<task>
1. Usage and margin: per month, the hours or deliverables against the allowance, the overage or shortfall, and the effective hourly rate. Show the arithmetic and the average. If the data is incomplete, say what is missing.
2. What is driving it: classify the extra or missing work (in-scope growth, new projects, urgent requests, client inactivity) from the user's description.
3. Options: for over-use, raise the tier, bill overage monthly at the agreed rate, move new projects outside the retainer, or tighten scope and response times; for under-use, a smaller tier, a rollover cap, or a proposed plan to use the time. Show the client's cost and your effective rate under each.
4. Recommended terms: the revised fee, allowance, overflow rate, rollover rule, reporting and review date, at or above the user's minimum effective rate.
5. Conversation plan: when to raise it (before renewal or the next invoice), the opening with the data, likely objections and answers, and a fallback.
6. Message: a short email to request the review, sharing the usage summary and proposing a call.
</task>

<constraints>
- Use only the figures given; never invent hours, rates or client reactions. Show calculations.
- Do not recommend retroactively billing unbilled past overage unless the terms allowed it and the user wants to; if so, present it as optional and note the relationship risk.
- No threats or ultimatums in the message.
{{> output/uncertainty}}
</constraints>

<output_format>
## Usage and margin
Table: Month | Allowance | Used | Over or under | Effective rate.
## What is driving it
## Options
Table: Option | Client cost | Your effective rate | Trade-off.
## Recommended terms
## Conversation plan
## Message
Ready to send.
</output_format>
