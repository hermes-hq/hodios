---
schema: 1
id: check-employer-retirement-match
kind: prompt
title: Check you are getting your full employer retirement match
description: Reads your employer's retirement match or contribution rules, works out what you must pay in to get the full match, explains vesting, and shows in money what missing it costs.
category: investing
version: 1.0.0
status: incubating
stage: [learn, review]
role: [individual]
requires: [none]
inputs: [document, text]
output: [explanation, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [employer-match, vesting, workplace-pension, retirement-contributions, employee-benefits]
pairs_with:
  prompts: [understand-pension-fund-choices, compare-retirement-accounts]
  personas: [investing-educator]
args:
  - name: plan_rules
    description: The match or employer contribution wording from your benefits guide, offer letter or plan summary, including any vesting schedule. Paste it as written.
    type: text
    required: true
  - name: pay
    description: Your salary or pay before tax, how often you are paid, and your country.
    type: text
    required: true
  - name: current_contribution
    description: What you pay in now (percentage or amount), and when in the year you might hit any contribution limit. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What the rule says in plain words, What you need to pay in, Vesting, What missing it costs, Traps in this kind of plan, Questions for HR or the plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An employer match is usually the highest guaranteed return available to an employee, yet many people contribute less than the amount that captures it, often because the formula is worded confusingly. "100% of the first 3% plus 50% of the next 2%" means you must pay in 5% of pay to get the full 4% from the employer; "50% up to 6%" means paying 6% to get 3%. Other traps: matches calculated per pay period with no year-end true-up, so someone who hits an annual limit early in the year loses the match for the remaining months; matches based on a band of earnings or basic salary only, not bonuses; caps on the pay the match applies to; automatic enrolment default rates set below the rate that captures the full match; vesting schedules (cliff or graded) that take back employer money if you leave early; and salary sacrifice or salary exchange arrangements that can also save social security contributions, sometimes with the employer sharing that saving. Rules and terms differ by country and employer.

<plan_rules>
{{plan_rules}}
</plan_rules>

Pay: {{pay}}
{{#current_contribution}}Current contribution: {{current_contribution}}{{/current_contribution}}
</context>

<task>
1. Restate the rule in plain words, then as a small table: what you pay in (several levels, including zero and their current rate) against what the employer adds, in percentage and in money per pay period and per year.
2. State the contribution rate that captures the full match, and whether their current rate gets there. If the rule is ambiguous (for example whether the percentage is of basic pay or total pay), show both readings and say which question settles it.
3. Vesting: explain the schedule given, what they would keep if they left after one, two or three years, and the date that matters most. If no vesting is mentioned, say to check.
4. What missing it costs: the yearly employer money left on the table at their current rate, and what that amount would grow to over 10 and 20 years at one illustrative return, labelled as an assumption, with the working.
5. Traps: check the wording for per-pay-period matching without a true-up, earnings bands, pay caps, waiting periods, auto-enrolment defaults below the full match, and salary sacrifice effects on take-home pay; note only the ones that apply or cannot be ruled out.
6. Give the questions to ask HR or the plan administrator.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Work only from the plan wording provided. Do not assume a "typical" match or vesting schedule; where the text is silent, say so.
- Show the arithmetic for every figure. Take-home pay effects depend on tax and social security rules; show them only as an estimate to verify unless the user gave their rates.
- Do not recommend funds or how much to save beyond explaining what captures the match. If paying in enough for the full match would strain their budget, say that an emergency fund and high-interest debt are common reasons people pause, and leave the choice to them.
{{> output/uncertainty}}
</constraints>

<output_format>
## What the rule says in plain words
One paragraph and a table: you pay | employer adds | per pay period | per year.

## What you need to pay in
One or two sentences, and whether you are there now.

## Vesting
Short paragraph or table by years of service.

## What missing it costs
Short table with working.

## Traps in this kind of plan
Bullets.

## Questions for HR or the plan
Bullets.
</output_format>
