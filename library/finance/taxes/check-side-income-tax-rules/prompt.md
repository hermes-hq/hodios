---
schema: 1
id: check-side-income-tax-rules
kind: prompt
title: Check tax rules on side income
description: Checks whether money from selling online, gig apps, renting things out or a hobby must be reported, which thresholds and allowances to verify, and what records to keep.
category: taxes
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, content-creator]
requires: [none]
inputs: [text]
output: [checklist, explanation, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [side-hustle, gig-economy, reselling, platform-reporting]
pairs_with:
  prompts: [plan-freelance-tax-set-aside, track-business-expenses, check-sales-tax-obligations]
  personas: [tax-educator]
args:
  - name: activities
    description: Each way you earn money on the side (selling used or handmade items, reselling, delivery or ride apps, renting a room, parking space, car or equipment, tutoring, content, crafts), with rough yearly amounts, how often, and whether you also have a job.
    type: text
    required: true
  - name: country
    description: Country (and state or region if relevant) where you are tax resident.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Activity by activity, Thresholds and allowances to verify, What platforms report, Registration and deadlines, Records to keep, Questions for the tax authority or an adviser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone work out whether their side income needs to be reported for tax. The questions that decide it are similar in most countries. Selling your own used belongings, usually for less than you paid, is generally not taxable income (though valuable items can be a capital gains question). Buying things to resell, or making things to sell, regularly and with the aim of profit usually counts as trading, which is taxable. Hobby-versus-business tests look at profit motive, regularity, organisation and scale. Some countries have small allowances below which trading or property income need not be reported, and rules for renting out a room in your home. Gig app work is usually self-employment, with expenses that can be deducted. Many countries now require online platforms to report sellers' and hosts' earnings to the tax authority, so the authority may already know about the income. Separate thresholds can apply for registering for sales tax or VAT and for social contributions.

Country: {{country}}
</context>

<task>
Activities:

<activities>
{{activities}}
</activities>

1. For each activity, say which category it most likely falls into (personal disposal, hobby, trading or self-employment, property or rental income, other) and why, using the facts given, and whether it is likely to need reporting. Where it depends on facts not given, ask.
2. Thresholds and allowances to verify in {{country}}: trading or property allowances, rent-a-room or home-sharing reliefs, hobby rules, minimum income for filing, sales tax or VAT registration, and social contributions. Name them only when confident, with the tax year and "verify"; otherwise describe what to look for.
3. What platforms report: whether marketplaces, gig apps and rental platforms in {{country}} report seller or host earnings to the tax authority, and what that means for the person. Mark it "verify" if unsure.
4. Registration and deadlines: whether the person may need to register as self-employed or file a return, and the typical deadlines to check.
5. Records to keep: income per platform, fees, costs of items sold, mileage or equipment, and evidence for personal items sold at a loss.
6. Questions for the tax authority or an adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent thresholds, allowances, rates or deadlines. Mark everything uncertain "verify" and point to the tax authority's guidance.
- Do not help hide or under-report income, split income to dodge thresholds, or avoid platform reporting. If asked, explain the risks plainly and help them report correctly.
- Do not give a final ruling on business status; say it depends on facts and the authority's tests.
- If the person may have missed past years, explain that voluntary disclosure routes often exist and usually lead to lower penalties than being found later, and suggest an adviser.
{{> output/uncertainty}}
</constraints>

<output_format>
## Activity by activity
Table: activity | likely category | likely to need reporting | why | facts to confirm.

## Thresholds and allowances to verify
Bullets marked "verify" with the tax year.

## What platforms report
Short bullets.

## Registration and deadlines
Bullets.

## Records to keep
Checklist.

## Questions for the tax authority or an adviser
Up to six questions.
</output_format>
