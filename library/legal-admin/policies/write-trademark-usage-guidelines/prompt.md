---
schema: 1
id: write-trademark-usage-guidelines
kind: prompt
title: Write trademark usage guidelines
description: Drafts trademark and brand use guidelines for partners, resellers, communities or open-source users, with what is allowed without asking, what needs permission and how to describe compatibility.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, maintainer, legal-professional]
subject: [law]
requires: [none]
inputs: [text]
output: [docs, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [trademark-policy, brand-use, nominative-use, partner-guidelines, open-source-trademarks]
pairs_with:
  prompts: [apply-for-trademark, build-brand-guidelines, write-trademark-infringement-letter]
args:
  - name: marks
    description: The names, logos and slogans, where each is registered or just used, who needs to use them (resellers, integration partners, community events, forks, merchandise makers), and misuse you have seen.
    type: text
    required: true
  - name: goals
    description: What you want to encourage (community events, integrations, honest mentions) and prevent (confusing forks, fake official accounts, domain squatting). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Use cases, Guidelines, Permission request template, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A trademark use policy tells others how to refer to your brand without confusing the public. Trademark law generally lets people use a name truthfully to refer to your product (often called nominative or descriptive fair use): "works with X", "X training course", a review. What it restricts is use that suggests endorsement, official status or origin, such as a fork called "X Pro", a logo on someone's app icon, or a domain like x-official-support.com. Good guidelines encourage the uses that help the brand, set clear rules for the grey areas, and give an easy route to ask permission. They are not a licence by themselves. Open-source projects are a common case: the code licence allows forks, but the trademark policy can require a fork to use a different name. Guidelines also help consistency, which matters because uncontrolled licensing can weaken a mark in some systems.
</context>

<task>
Marks:
<marks>
{{marks}}
</marks>
{{#goals}}

Goals:
<goals>
{{goals}}
</goals>
{{/goals}}

1. Use cases: a table of the realistic ways others will use the marks and whether each is allowed without asking, allowed with conditions, needs permission, or not allowed, with the reason.
2. Guidelines in plain language:
   - The marks covered, with registration symbols used correctly (registered only where registered) and a placeholder list.
   - Uses allowed without asking: accurate references, compatibility statements in a set format ("[Product] for X", "compatible with X"), reviews and news, community mentions.
   - Uses that need permission: logos, events using the name, merchandise, training or certification claims.
   - Not allowed: names or domains that suggest official status, modified logos, use implying endorsement, use in a company or product name, confusing forks.
   - Forks and modified versions (if relevant): rename and how to credit the original.
   - Visual rules: no altering, clear space, colours (link to brand guidelines).
   - How to ask, how long it takes [DAYS], and what happens on misuse (a friendly request first).
3. Permission request template: a short form with the fields to collect.
4. Points to confirm: registrations per country, fair use scope in key markets, and any licence agreements needed.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not prohibit truthful references, reviews, criticism or comparisons; the guidelines cannot remove those rights where the law protects them.
- Use the registered symbol only for marks the user says are registered in that place.
- Do not present the guidelines as a licence agreement; recommend a written licence for merchandise and official partnerships.
- Do not invent registration numbers or classes; use [BRACKETS].
{{> output/uncertainty}}
</constraints>

<output_format>
## Use cases
Table: use | allowed? | conditions | why.

## Guidelines
The full guidelines with headings.

## Permission request template
Field list.

## Points to confirm
Numbered.
</output_format>
