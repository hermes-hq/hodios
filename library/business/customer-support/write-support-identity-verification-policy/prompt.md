---
schema: 1
id: write-support-identity-verification-policy
kind: prompt
title: Write a support identity verification policy
description: Writes the identity checks support runs before account changes, tiered by risk and channel, with social-engineering red flags, scripts and what to do when checks fail.
category: customer-support
version: 1.0.0
status: incubating
stage: [build, operate]
role: [operations-manager, support-agent, founder, security-engineer]
requires: [none]
inputs: [text, notes]
output: [docs, checklist, script]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [identity-checks, social-engineering, account-security, risk-tiers, agent-scripts]
pairs_with:
  prompts: [handle-hacked-account-report, write-call-centre-script, build-support-macros]
  rules: [support-commitment-rules]
args:
  - name: business
    description: What you sell, what customer accounts hold (money, personal data, subscriptions, deliveries), the channels support uses (phone, chat, email, social, in person) and team size.
    type: text
    required: true
  - name: data_available
    description: What agents can see and check - email, phone, address, order history, payment last digits, account age, login history, app verification codes, ID documents.
    type: text
    required: true
  - name: incidents
    description: Any past fraud, impersonation or complaints about checks being too strict. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Principles, Risk tiers, Checks by channel, Red flags, Scripts, When checks fail, Exceptions and records]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write identity verification policy for support teams. Support is the softest way into a customer account: attackers phone in with stolen personal details, invent urgency, play upset or important, and try agent after agent until one gives way. The strongest checks are things only the real owner can do now (approve a code or prompt sent to a contact on file that has not changed recently, reply from the registered email), not facts that leak in data breaches (date of birth, address, mother's maiden name). Good policy scales checks to what the request could cost: reading an order status needs little, changing the email, phone or payout details needs the most. It also protects agents by making "I can't do that without verification" a rule, not a personal judgement, and gives genuinely locked-out customers a slower, safe route instead of no route.
</context>

<task>
<business>
{{business}}
</business>

<data_available>
{{data_available}}
</data_available>

{{#incidents}}
<incidents>
{{incidents}}
</incidents>
{{/incidents}}

1. State four to six principles in plain words (for example: verify the account, not the story; never verify using information the caller just gave you; one agent's refusal stands for all agents).
2. Define three or four risk tiers by request type, from general questions and order status up to contact, payment or ownership changes and data exports. Give examples from this business.
3. For each tier, list the checks for each channel the business uses, using only data the agents actually have. Put possession-based checks (codes, replies from the email on file) above knowledge-based ones, and mark details that should never count as proof because they leak easily or are visible to whoever holds the account.
4. List red flags that trigger the next tier or a pause: recent contact-detail changes, urgency or anger aimed at skipping steps, a third party speaking for the holder, requests to send codes or links to new details, caller reading answers aloud slowly, repeated attempts across agents.
5. Write short agent scripts: asking for verification, refusing politely when it fails, handling "I'm the account holder's husband / assistant / accountant", and handling pressure.
6. Describe the route when checks fail: what the customer can do instead, how long it takes, who reviews it, and how to avoid locking out real owners.
7. Cover exceptions and records: who can override, how it is logged, what agents record after every high-tier check, and when to review the policy.
</task>

<constraints>
- Use only the data and channels the business says it has; if a stronger check needs a capability it lacks, list it separately as a recommendation.
- Do not name specific laws or regulators unless the user gave them; note that data protection and power-of-attorney rules differ by country and should be checked.
- Do not require ID document uploads by default; they create stored-data risk. Suggest them only for the highest tier, with handling rules.
- Keep scripts short enough to say aloud, polite and firm, and free of accusations.
- Include a route for customers with accessibility needs or no access to the registered phone or email.
</constraints>

<output_format>
## Principles
Numbered list.

## Risk tiers
Table: tier | example requests | minimum checks.

## Checks by channel
Table or sub-lists per channel, with "never accept as proof" marked.

## Red flags
Bullets, each with the action it triggers.

## Scripts
Short labelled lines for each situation.

## When checks fail
The safe fallback route.

## Exceptions and records
Override rules, logging and review cadence.
</output_format>
