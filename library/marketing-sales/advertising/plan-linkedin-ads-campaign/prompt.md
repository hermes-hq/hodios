---
schema: 1
id: plan-linkedin-ads-campaign
kind: prompt
title: Plan a LinkedIn ads campaign
description: Plans a B2B LinkedIn ads campaign with company and role targeting, format choice, lead gen forms versus site, budget and bids, and pipeline-based measurement.
category: advertising
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, consultant]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
stack: [linkedin]
tags: [linkedin-ads, b2b, matched-audiences, lead-gen-forms, job-titles, pipeline]
pairs_with:
  prompts: [design-lead-form-ads, write-social-ad-variations, plan-media-budget, set-up-offline-conversion-import]
  personas: [paid-media-specialist]
  workflows: [ad-campaign-launch-track]
args:
  - name: offer
    description: What you sell, price or contract value, and the offer the ads will push (demo, trial, guide, webinar, event).
    type: text
    required: true
  - name: icp
    description: Ideal customer profile, company size, industries, countries, the roles that buy and the roles that influence, and any named target account list.
    type: text
    required: true
  - name: budget
    description: Monthly budget and currency.
    type: string
    required: true
  - name: sales_cycle
    description: Typical time from first touch to closed deal, lead-to-opportunity rate if known, and how leads are followed up.
    type: string
  - name: assets
    description: Content and creative available (guides, case studies, videos, founder posts), CRM in use, and whether the Insight Tag is installed. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Audience build, Campaign plan, Formats and offers, Budget and bids, Measurement and first 30 days]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user sells to businesses and wants to run LinkedIn ads. LinkedIn's value is targeting by employer, function, seniority and company list; its cost per click is usually far higher than other social platforms, so waste hurts fast. What experts know: job title targeting alone is narrow and inconsistent (people write titles freely), so function plus seniority, or skills, with company filters usually reaches more of the right people; audience expansion and the LinkedIn Audience Network (off-platform delivery) are often switched off at the start to keep spend on the chosen audience; small audiences hit high frequency within weeks and need rotation; native lead gen forms convert better than landing pages but produce lower-intent leads that need fast follow-up and qualification; cold audiences rarely book demos from one ad, so a content offer first and a demo ask to engaged people often works better; and results must be judged on pipeline and revenue months later, not cost per lead, which means sending CRM outcomes back.
</context>

<task>
Offer: {{offer}}
Ideal customer: {{icp}}
Budget: {{budget}}
{{#sales_cycle}}Sales cycle: {{sales_cycle}}{{/sales_cycle}}
{{#assets}}Assets: {{assets}}{{/assets}}

1. State assumptions about deal value, lead-to-opportunity rate and cost per lead, labelled as assumptions, and work back to how many leads and opportunities the budget could plausibly produce. If the budget is too small to test meaningfully, say so and propose a narrower plan.
2. Audience build: one or more audiences using company filters (size, industry, or an uploaded account list), job function and seniority, and titles or skills only where they add precision. Give exclusions (competitors, current customers, own employees, students and entry level if irrelevant). Tell the user to check estimated audience size in Campaign Manager and give the direction to widen or narrow.
3. Campaign plan: separate campaigns for cold awareness or content, retargeting of engaged people (video viewers, form openers, site visitors, company page engagers), and conversion offers. For each: objective, audience, offer, and why.
4. Formats and offers: which formats fit each stage (single image, document, video, thought leader posts from a person's profile, conversation or message ads, lead gen forms) and the offer for each. Recommend lead gen form questions that qualify without killing volume.
5. Budget and bids: split by campaign, bid approach to start, settings to switch off at launch (audience expansion, LinkedIn Audience Network) and when to revisit them, frequency to watch.
6. Measurement and first 30 days: Insight Tag and conversion events, CRM fields to capture, how fast to follow up leads, what to report weekly (cost per lead, cost per qualified lead, opportunities, pipeline value) and decision rules for pausing or shifting budget.
</task>

<constraints>
- Do not invent LinkedIn costs, benchmarks, minimum budgets or audience size rules. Use the user's numbers, or clearly labelled assumptions, and point to Campaign Manager forecasts and the user's own results as the benchmark.
- Feature names and settings change; tell the user to confirm options in the current Campaign Manager.
- Do not optimise for cheapest leads at the expense of qualification; always include a lead quality check.
- Keep targeting consistent with the platform's rules on sensitive categories and with privacy law where the user operates; do not suggest scraping contact data.
</constraints>

<output_format>
## Assumptions
Bullets with the funnel arithmetic.

## Audience build
A table: Audience | Company filters | Role filters | Exclusions | Purpose.

## Campaign plan
A table: Campaign | Objective | Audience | Offer | Share of budget.

## Formats and offers
Per stage, formats and the lead form questions.

## Budget and bids
Split, bid approach, settings to turn off and when to revisit.

## Measurement and first 30 days
Tracking checklist, follow-up rule, weekly metrics and decision rules.
</output_format>
