---
schema: 1
id: check-dual-citizenship-impact
kind: prompt
title: Check what naturalising does to your other citizenship
description: Checks what taking a new citizenship may do to an existing one, comparing both countries' rules on dual nationality, renunciation, children, military service and travel, with what to confirm.
category: immigration
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, parent]
subject: [law]
requires: [none]
inputs: [text]
output: [table, explanation, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [dual-nationality, renunciation, naturalisation-decision, loss-of-citizenship, passport-planning]
pairs_with:
  prompts: [prepare-citizenship-application, trace-citizenship-by-descent, renew-passport-or-id-card]
  personas: [legal-information-guide]
args:
  - name: countries
    description: The citizenship you hold now (all of them) and the one you want to acquire.
    type: string
    required: true
  - name: situation
    description: How you would acquire it (naturalisation, marriage, descent), your children and their citizenships, and anything that matters to you, such as inheriting property, voting, working in the public sector or military service.
    type: text
    required: true
  - name: official_rules
    description: Any official text you have from either country on dual nationality or loss of citizenship. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The two questions, What each side commonly says, What it could mean for you, Children, What to confirm and with whom]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Whether someone can hold two citizenships depends on two separate sets of rules, and people often check only one. The new country may require renunciation of the old citizenship (sometimes with exceptions, for example for citizens of certain countries or where renunciation is impossible), or allow dual nationality freely. The old country may automatically withdraw citizenship when another is voluntarily acquired, require permission beforehand, allow it, or not recognise the second citizenship at all within its borders. Rules have changed in several countries in recent years, and transitional provisions can matter. Losing a citizenship can affect the right to live, inherit land, vote, or pass citizenship to children, and some countries treat dual nationals as their own citizens only, which affects consular help and military service.

Countries: {{countries}}

<situation>
{{situation}}
</situation>
{{#official_rules}}
<official_rules>
{{official_rules}}
</official_rules>
{{/official_rules}}
</context>

<task>
1. The two questions: does the new country require giving up the current citizenship, and does the current country allow keeping it on acquiring another.
2. What each side commonly says: for each country, the general position as you understand it, clearly marked "to confirm on the official source, rules change", and quoting the official text where supplied.
3. What it could mean for you: the practical effects on the things the person cares about (residence, property, inheritance, voting, public jobs, travel and passports, consular protection, military service), as questions to check.
4. Children: whether children's citizenships could be affected and whether they need separate action.
5. What to confirm and with whom: the official body of each country (for example the interior ministry, consulate), the precise questions to ask, and when a nationality lawyer is worth it.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Present every country's position as general information to confirm; rules change and exceptions are common. Use official text supplied over general knowledge.
- Do not tell the person to apply or not; give them what they need to decide.
- Do not suggest concealing a citizenship from either country.
{{> output/uncertainty}}
</constraints>

<output_format>
## The two questions
## What each side commonly says
Table: Country | Position | Exceptions | Confirm with.
## What it could mean for you
## Children
## What to confirm and with whom
Numbered.
</output_format>
