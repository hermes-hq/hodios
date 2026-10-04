---
schema: 1
id: plan-wedding-budget
kind: prompt
title: Plan a wedding budget
description: Builds a wedding budget around the couple's priorities - category split, hidden costs, a monthly savings plan, a deposit schedule and the trade-offs that protect what matters most to them.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [wedding, event-budget, savings-plan, vendor-deposits, couples]
pairs_with:
  prompts: [plan-wedding, plan-savings-goal, plan-couple-money-conversation]
args:
  - name: total_budget
    description: The total you can spend with its currency, and where it comes from (your savings, monthly saving, family contributions). Say if family money comes with expectations.
    type: string
    required: true
  - name: guests
    description: Expected number of guests, including children and anyone who needs travel or accommodation help.
    type: number
    required: true
  - name: priorities
    description: What matters most and least to you both, for example "great food and photos matter, flowers and favours don't". Also the location, season and style if known.
    type: text
    required: true
  - name: months_until
    description: Months until the wedding date (or the date you are aiming for).
    type: number
    required: true
output_contract:
  format: markdown
  sections: [Reality check, Your budget split, Costs couples forget, Savings plan, Deposit and payment schedule, Trade-offs that protect your priorities, Rules to stay on budget]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help couples set a wedding budget they can actually keep. Weddings overrun for predictable reasons: the budget is split by habit instead of priorities, guest count is set before the cost per head is known, taxes, service charges, delivery and overtime fees are left out, and deposits fall due before the money has been saved. The most useful moves are to fix a contingency up front, tie every category to the couple's stated priorities, and work out cost per guest, because guest count drives most of the spend. This prompt is about the money side; venue choice, schedule and logistics are a different job.

Total budget: {{total_budget}}
Guests: {{guests}}
Months until the wedding: {{months_until}}
</context>

<task>
Priorities:

<priorities>
{{priorities}}
</priorities>

1. If the total, the source of the money or the location is unclear, ask in one short list and stop.
2. Give a reality check: the total divided by {{guests}} guests gives a rough all-in budget per guest; compare that with what the stated priorities usually cost, and say plainly if the budget, the guest list or the priorities need to give. Say that typical costs vary hugely by country, region and season and you are using broad shares, not local prices.
3. Set aside a contingency first (commonly 5 to 10 percent), then split the rest across categories: venue and catering, drinks, photo and video, attire and beauty, music and entertainment, flowers and decor, stationery, rings, officiant and legal fees, transport, accommodation, favours and gifts, and any cultural or religious ceremony costs the couple mentions. Shift the split towards the top priorities and away from the low ones, and show the amount for each.
4. List the costs couples forget: service charges and taxes on quotes, gratuities where customary, overtime, delivery and set-up fees, alterations, marriage licence or notice fees, insurance, vendor meals, postage, the morning-after brunch, and payment card surcharges.
5. Build a monthly savings plan over {{months_until}} months: how much is already available, how much is still to save, the amount per month, and what happens if the date stays fixed but saving falls short.
6. Build a deposit and payment schedule: typical booking order (venue and caterer first, then photographer and key vendors, then the rest), deposit and balance points by month, and a check that each payment is covered by cash saved by then. Flag any month where payments exceed savings.
7. Give trade-offs that protect the priorities: guest count, day of week and season, ceremony and reception in one place, fewer courses, digital invitations, and so on, with a rough effect on the total.
8. Add rules to stay on budget: one shared tracker, a rule for upgrades (only by cutting elsewhere), read cancellation and refund terms before paying deposits, and avoid funding the wedding with high-interest credit.
9. Check before answering: every category amount adds up to the total including contingency, monthly saving times months covers the gap, and the schedule never pays out more than has been saved.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not quote local vendor prices as facts. Use shares of the total and the couple's own numbers, and label any typical figure as a rough guide to check locally.
- Do not recommend borrowing for the wedding. If the plan only works with credit, say so plainly and show the alternatives.
- Respect cultural, religious and family traditions the couple mentions; build their costs in rather than treating them as optional.
- If family contributions come with conditions or disagreement, suggest agreeing the amount and expectations in writing early, without taking sides.
- Round amounts to whole currency units and make the totals reconcile.
</constraints>

<output_format>
## Reality check
Three or four sentences including the per-guest figure.

## Your budget split
Table: category | share | amount | priority (high / medium / low). Contingency and total rows.

## Costs couples forget
Checklist.

## Savings plan
Short table: available now | still to save | per month | months.

## Deposit and payment schedule
Table: month | payment | amount | saved by then | covered?

## Trade-offs that protect your priorities
Bullets with rough savings.

## Rules to stay on budget
Four to six bullets.
</output_format>
