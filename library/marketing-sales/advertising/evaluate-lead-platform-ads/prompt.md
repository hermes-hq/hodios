---
schema: 1
id: evaluate-lead-platform-ads
kind: prompt
title: Evaluate pay-per-lead platforms
description: Evaluates pay-per-lead and listing platforms for trades and local services on cost per won job, lead quality, response demands, refund rules and lock-in, from the trader's own numbers.
category: advertising
version: 1.0.0
status: incubating
stage: [plan, review]
role: [founder, individual, operations-manager]
subject: [construction]
requires: [none]
inputs: [text, document]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [pay-per-lead, cost-per-job, lead-quality, trade-directories, quote-marketplaces, local-services]
pairs_with:
  prompts: [plan-local-advertising, calculate-break-even-roas, schedule-ads-around-phone-hours]
  personas: [local-ads-advisor]
args:
  - name: trade_and_area
    description: Your trade or service, the area you cover, how many more jobs a month you can actually take, and how you get work now (word of mouth, website, repeat customers).
    type: text
    required: true
  - name: platform_offers
    description: The platforms you are considering or already using, with what each charges (per lead, per month, per contact, membership), contract length, refund or dispute rules and any results so far. Paste the sales pitch or terms if you have them.
    type: text
    required: true
  - name: job_economics
    description: Average job value, your margin or what you keep after materials and labour, how many quotes you usually win out of ten, and how long a quote visit takes. Optional but it makes the verdict reliable.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Cost per won job, Platform comparison, Contract and rules risks, Trial plan, Questions to ask each platform]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user is a plumber, electrician, builder, cleaner, mover or similar trader comparing platforms that sell leads or listings: search-engine local service ads that charge per lead, trade directories with monthly membership, and quote marketplaces where several traders pay to contact the same customer. Sales pitches quote cost per lead; what matters is cost per won job against what a job earns. Traders lose money on these platforms in predictable ways: leads shared with three to five competitors so the win rate collapses, slow response (many platforms rank or reward whoever replies in minutes), small or out-of-area jobs, refund rules that are hard to use, and annual contracts signed before testing.
</context>

<task>
<trade_and_area>
{{trade_and_area}}
</trade_and_area>

<platform_offers>
{{platform_offers}}
</platform_offers>

{{#job_economics}}
<job_economics>
{{job_economics}}
</job_economics>
{{/job_economics}}

1. If the trader has no spare capacity, say that first: more leads will not help. If the platforms' prices and terms are missing, ask for them, the area, the average job value and the win rate in one message and stop. If only the average job value or win rate is missing, ask for those two numbers, give the contract risks and questions to ask now, and leave cost per won job as a formula with [JOB VALUE] and [WIN RATE] placeholders and the verdict as "pending these numbers".
2. For each platform, work out cost per won job: cost per lead (or monthly fee divided by expected leads) divided by expected win rate on that platform. Adjust the trader's normal win rate down for shared leads (a lead sent to four traders rarely converts like a referral) and say the adjustment is an assumption. Add the time cost of quote visits.
3. Compare cost per won job with what a job leaves after materials and labour. A platform is worth testing only if cost per won job is comfortably below that margin, with room for no-shows and tyre-kickers.
4. Assess lead quality signals: exclusive or shared, job size filters, area filters, whether the customer verified a phone number, and the platform's response-time expectations against when the trader can actually answer.
5. Read the terms for risks: contract length and notice, automatic renewal, minimum spend, refund or credit rules for bad leads and how fast disputes must be raised, who owns the reviews and profile, and whether pricing can change mid-contract.
6. Recommend: which platform to trial (at most two at once), for how long (usually 30 to 60 days or a set number of leads), the stop rule in cost per won job, and a simple log (date, lead source, job type, area, quoted, won, value).
</task>

<constraints>
- Use only the prices and terms the user supplied; do not invent platform fees, policies or results. Where you use a typical figure, label it an assumption to check.
- Do not name a platform as best overall; judge each on this trader's numbers.
- Flag any term that locks the trader in before results are known, and suggest asking for a monthly or trial option in writing.
- If the user's numbers show the platforms cannot work, say so plainly and point to cheaper channels (referrals, map listing, repeat customers).
</constraints>

<output_format>
## Verdict
Two or three lines: which platform to trial, which to skip, and the single number that decides it.

## Cost per won job
The arithmetic for each platform, step by step, with assumptions labelled.

## Platform comparison
A table: Platform | Pricing model | Cost per lead | Expected win rate | Cost per won job | Margin per job | Lead quality notes | Fit.

## Contract and rules risks
Bullets per platform.

## Trial plan
Duration, budget cap, stop rule, the lead log columns.

## Questions to ask each platform
Five to eight questions to get answered in writing before signing.
</output_format>
