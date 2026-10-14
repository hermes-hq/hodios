---
schema: 1
id: document-genuine-relationship
kind: prompt
title: Document a genuine relationship
description: Builds the evidence plan for a partner or spouse visa, organising proof of a genuine relationship by the aspects officers assess and spotting weak areas and context to explain.
category: immigration
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, parent]
subject: [law]
requires: [none]
inputs: [text]
output: [table, checklist, plan, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [partner-visa, spouse-visa, relationship-evidence, evidence-bundle, family-reunification]
pairs_with:
  prompts: [prepare-visa-application, practise-visa-interview, respond-to-request-for-evidence, prepare-financial-evidence-for-visa]
args:
  - name: relationship
    description: How and when you met, when you started living together or married, time spent together and apart, children, how you communicate and support each other, and anything unusual (age gap, arranged marriage, short courtship, living apart for work, no shared language at first).
    type: text
    required: true
  - name: visa
    description: The country and the partner route, for example "UK spouse visa", "Australian partner visa (onshore)", "family reunification in Germany".
    type: string
    required: true
  - name: evidence_available
    description: What you already have, for example marriage certificate, joint lease, shared bills, photos, travel records, messages, money transfers, statements from friends and family. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What officers usually assess, Evidence by aspect, Weak spots and how to address them, Context to explain, How to organise the bundle, Questions for an adviser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Partner routes usually turn on whether the relationship is genuine and continuing, and officers look at it from several angles: the history of the relationship, living together or time spent together, shared finances and responsibilities, the social side (whether family and friends know them as a couple) and commitment to a shared future. The strongest bundles show consistent evidence over time across several of these angles, selected and labelled, rather than hundreds of photos or chat screenshots. Real couples are often weak on one angle for innocent reasons: living apart for work or visa reasons, cultures where couples do not cohabit before marriage, arranged marriages, a language barrier at the start, or one partner without a bank account. Those are explained with context and alternative evidence, never covered up.

Route: {{visa}}

<relationship>
{{relationship}}
</relationship>
{{#evidence_available}}
<evidence_available>
{{evidence_available}}
</evidence_available>
{{/evidence_available}}
</context>

<task>
1. What officers usually assess for this kind of route, in general terms (marked typical; the exact requirements, such as a minimum cohabitation period, are to confirm on the official source).
2. Evidence by aspect: for each aspect, the best evidence the couple has or can get, spread over the relationship's timeline, with what each shows and how to present it (a selection with dates and captions, not everything).
3. Weak spots and how to address them: aspects with little evidence, gaps in time, inconsistencies between dates or addresses in different documents, and honest ways to strengthen or explain each.
4. Context to explain: cultural, religious, financial or practical reasons for anything unusual, and a short outline of a joint statement covering the relationship history in their own words.
5. How to organise the bundle: an index by aspect and date, page limits if the route has them (to confirm), translations, and file naming for online uploads.
6. Questions for an adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Never help invent, stage or backdate evidence, or describe a relationship that is not genuine. Decline and explain the consequences for both partners.
- Do not judge whether the relationship is genuine; organise the true evidence.
- If the user mentions abuse, coercion, a forced marriage or fear of the partner, put their safety first, point to local emergency services and specialist support, and mention that some systems have protections for victims of domestic abuse, to confirm with an adviser.
- Advise keeping private messages to a short representative sample and removing third parties' personal data where not needed.
{{> output/uncertainty}}
</constraints>

<output_format>
## What officers usually assess
## Evidence by aspect
Table: Aspect | Evidence | Period covered | What it shows | Status.
## Weak spots and how to address them
## Context to explain
## How to organise the bundle
## Questions for an adviser
</output_format>
