---
schema: 1
id: decide-when-to-go-full-time
kind: prompt
title: Decide when to go full time
description: Decides when to quit a job for your startup or side business, with traction thresholds, savings runway, a fallback plan and a dated go or wait decision.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, individual]
advice_risk: [financial]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [quit-your-job, personal-runway, traction-thresholds, fallback-plan, go-no-go]
pairs_with:
  prompts: [plan-side-business, decide-whether-to-quit, set-founder-salary, assess-founder-fit]
  personas: [startup-mentor]
args:
  - name: business_status
    description: Where the business is now - months running, monthly revenue and profit (or users, pre-orders, pilots), the trend over the last three to six months, and hours a week you put in.
    type: text
    required: true
  - name: personal_finances
    description: Savings you could live on, monthly personal living costs, debts, dependants, a partner's income, and benefits you would lose such as health cover or pension contributions.
    type: text
    required: true
  - name: job_situation
    description: Your job, notice period, how easy it would be to get a similar job back, and whether part-time, unpaid leave or a sabbatical is possible.
    type: text
output_contract:
  format: markdown
  sections: [Where you stand, Thresholds to hit, Runway, Fallback plan, Decision, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders decide when to leave a salaried job. The common mistakes are quitting on excitement after a good month, quitting because the job is miserable rather than because the business is ready, and staying part-time forever without a rule that ends the waiting. A sound decision rests on four things: evidence the business grows when it gets more hours (not just that it exists), months of personal runway after counting lost benefits and taxes, a fallback the founder could actually use, and a date set in advance. Middle routes often beat a clean jump: cutting to four days, a sabbatical, contract work, or a partner's income for a fixed period.

<business_status>
{{business_status}}
</business_status>

<personal_finances>
{{personal_finances}}
</personal_finances>
{{#job_situation}}
<job_situation>
{{job_situation}}
</job_situation>
{{/job_situation}}
</context>

<task>
1. Summarise where the business stands: revenue or traction trend, what is limited by the founder's hours versus by demand, and whether more time would plausibly turn into more revenue. Say what the evidence does and does not show.
2. Set go thresholds the founder can measure: for example a monthly profit level covering a stated share of living costs, sustained for a stated number of months, plus a pipeline or growth signal. Explain each number from their figures.
3. Calculate runway: personal monthly costs including lost benefits (health cover, pension, insurance) and money to set aside for tax, divided into savings and other income. Show the sum, then the runway with the business's current profit added.
4. Fallback plan: the trigger (for example runway falling below a set number of months) and what happens then - return to work, contracting, part-time. Note how notice periods and re-hiring chances affect this.
5. Decision: go now, go on a set date if thresholds are met, take a middle route, or not yet. Give a date for the next review and the one thing to achieve before it.
6. Ask up to five questions whose answers would change the decision.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use the founder's numbers. Do not assume income, savings or growth that was not stated, and mark any assumption.
- Do not recommend quitting when runway would be under a few months with no fallback and dependants rely on the income; say so clearly and offer a middle route.
- Tax, social insurance, health cover and benefit effects depend on the country; list them as items to check with an accountant or the relevant authority.
- Check the employment contract for notice, outside-work and intellectual property clauses before announcing the move; present this as a check, not a legal view.
</constraints>

<output_format>
## Where you stand
Short paragraph.
## Thresholds to hit
Table: Measure | Threshold | Current | Why this number.
## Runway
The sum line by line, then months of runway with and without business profit.
## Fallback plan
Trigger and action.
## Decision
Verdict, review date and the one goal before it.
## Questions
At most five.
</output_format>
