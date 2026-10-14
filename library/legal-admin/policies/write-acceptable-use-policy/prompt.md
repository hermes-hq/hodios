---
schema: 1
id: write-acceptable-use-policy
kind: prompt
title: Write an acceptable use policy
description: Drafts an acceptable use policy for an online service, community or hosting platform, with prohibited uses tied to real risks, enforcement steps, appeals and reporting.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, product-manager, operations-manager, legal-professional]
subject: [law, saas]
requires: [none]
inputs: [text]
output: [docs, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [acceptable-use, prohibited-conduct, enforcement-ladder, abuse-reporting, platform-rules]
pairs_with:
  prompts: [write-terms-of-service, write-community-guidelines, write-copyright-takedown-policy]
args:
  - name: service
    description: What the service does and what users can do on it (upload files, run code, send email, post publicly, message each other, use an API), who the users are (consumers, businesses, children possible or not), and any abuse you have already seen.
    type: text
    required: true
  - name: jurisdictions
    description: Where the company is based and where most users are, for example "Netherlands, users across the EU and US".
    type: string
    required: true
  - name: enforcement_capacity
    description: Who handles abuse today and how (a founder reading an inbox, a trust and safety team, automated filters). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Risk map, Policy, Enforcement ladder, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An acceptable use policy (AUP) is the rulebook the terms of service point to. It works when its prohibitions match what the service can actually be abused for: a file host worries about malware, illegal content and copyright; an email tool about spam and phishing; a compute platform about crypto-mining, scanning and attacks; a community about harassment and doxxing. Generic AUPs copied from a hyperscaler list fifty things nobody enforces and miss the abuse this product attracts. Two other common faults: the policy promises enforcement steps the team cannot deliver, and it has no route for users to report abuse or appeal a decision. In several places, rules for online platforms now set duties on notice handling, statements of reasons and appeals (for example the EU Digital Services Act for intermediary services); which apply depends on the service type and size, so treat them as points to confirm.

Jurisdictions: {{jurisdictions}}
</context>

<task>
Service:
<service>
{{service}}
</service>
{{#enforcement_capacity}}

Enforcement today:
<enforcement>
{{enforcement_capacity}}
</enforcement>
{{/enforcement_capacity}}

1. Risk map: from the features described, list the realistic abuse types (each tied to a feature), how likely and how harmful each is, and whether it is illegal content, a security abuse, harm to others, or a resource or commercial abuse.
2. Draft the policy in plain language:
   - Purpose and who it applies to, including users' own end users or team members where the service is resold or shared.
   - Prohibited uses grouped by the risk map: illegal content and activity, harm to others (harassment, threats, doxxing, impersonation), security abuse (malware, scanning, credential attacks, circumventing limits), spam and deceptive practices, infringement, and resource abuse. Give a concrete example for each, specific to this service.
   - Rules for automated access and the API, if any.
   - How to report abuse: a channel in [BRACKETS], what to include, and a separate urgent route for content involving children or imminent harm.
   - What the provider may do: remove content, restrict features, suspend, terminate, preserve records, and report to authorities where required.
   - Notice, reasons and appeals: what the user is told and how to contest a decision.
   - Changes to the policy and how users are notified.
3. Enforcement ladder: a table matching violation severity to the first response, with an immediate-action tier for illegal or dangerous content, sized to the team's real capacity.
4. Points to confirm: every legal duty assumed (notice and action, statements of reasons, reporting obligations, data retention for investigations) marked "confirm for [jurisdiction]".
</task>

<constraints>
{{> guardrails/professional-limits}}
- Tie every prohibition to the service's features; do not pad the list with abuse that cannot happen on this service.
- Do not promise response times or reviews the stated team cannot deliver; if capacity is unknown, use [TIMEFRAME] placeholders.
- Do not cite statutes, article numbers or thresholds as fact unless the user supplied them; describe the obligation and mark it to confirm.
- Never invent contact addresses, regulator names or law enforcement channels; use [BRACKETS].
- Keep reporting to authorities factual: say the provider may report where the law requires or permits, without overstating it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Risk map
Table: feature | abuse type | likelihood | harm | category.

## Policy
The full AUP with headings.

## Enforcement ladder
Table: severity | examples | first response | repeat response | who decides.

## Points to confirm
Numbered.
</output_format>
