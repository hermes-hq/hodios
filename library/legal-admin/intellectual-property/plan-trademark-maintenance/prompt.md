---
schema: 1
id: plan-trademark-maintenance
kind: prompt
title: Plan trademark upkeep after registration
description: Builds an upkeep plan for registered trademarks - renewal dates, use requirements, evidence of use, changes of owner or address, watching for copycats and marking - so marks are not lost by neglect.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [founder, operations-manager, marketer]
subject: [law]
requires: [none]
inputs: [text, dataset]
output: [plan, checklist, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [trademark-renewal, proof-of-use, brand-protection, ip-calendar]
pairs_with:
  prompts: [apply-for-trademark, audit-small-business-ip, evaluate-trademark-opposition]
args:
  - name: marks
    description: Each registered or pending mark - the mark, owner name on the register, office or country, registration number if you have it, filing and registration dates, classes and goods, and the representative on file if any.
    type: text
    required: true
  - name: business_changes
    description: How each mark is used today (which products, which countries, since when), any rebrand, logo change, paused product lines, change of company name, address, owner or sale of the business.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Portfolio at a glance, Use and vulnerability, Evidence of use to keep, Records to update, Watching and enforcement, Calendar]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small businesses keep the trademarks they already paid for. Registrations are lost quietly: a renewal date nobody diarised, a mark not used for the goods it covers for several years and then cancelled when a competitor attacks it for non-use, a register still showing a dissolved company or an old address so office letters never arrive, a modernised logo that is no longer the registered form, or a copycat application nobody opposed in time. Many offices also have use-declaration or proof-of-use steps at set points. Unsolicited invoices that look like official renewal notices are common and are not from the office. A good upkeep plan is boring and dated: a calendar, a folder of dated evidence, and someone responsible.
</context>

<task>
<marks>
{{marks}}
</marks>

<business_changes>
{{business_changes}}
</business_changes>

1. Portfolio at a glance: one row per mark with owner on record, office, status, classes, and the next known renewal or declaration window, worked out from the dates given where the usual cycle is known, and marked `[CHECK with the office]`.
2. Use and vulnerability: for each mark and class, compare the registered goods with real use. Flag goods not used, marks used only in a changed form, and use only in some countries, and explain the general non-use risk without stating a period as fact for any office. Options to discuss: start real use, refile for the current logo or narrower goods, or accept the risk.
3. Evidence of use to keep: a dated evidence routine (invoices, packaging, catalogues, web pages with dates, advertising, sales figures by country) and how to store it so it can be produced quickly.
4. Records to update: owner, address, representative and any assignment after a sale or name change, and why the register must match.
5. Watching and enforcement: low-cost ways to spot copycat filings and marketplace use, what to do when one appears, and the warning about fake renewal invoices.
6. Calendar: dated tasks for the next 24 months, plus a recurring yearly check.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state renewal periods, grace periods, non-use periods or fees for a specific office as fact; mark each as a check with the office or the representative.
- Do not invent registration numbers, dates or owners. Use [BRACKETS] where something is missing.
- If a mark is core to the business and has goods unused for years, an owner mismatch or a pending challenge, recommend a trademark attorney.
{{> output/uncertainty}}
</constraints>

<output_format>
## Portfolio at a glance
Table: mark | owner on record | office | status | classes | next window.

## Use and vulnerability
Bullets per mark.

## Evidence of use to keep
Checklist.

## Records to update
Bullets.

## Watching and enforcement
Bullets.

## Calendar
Table: date | task | owner.
</output_format>
