---
schema: 1
id: curb-impulse-spending
kind: prompt
title: Curb impulse spending
description: Finds the triggers behind someone's impulse buys from their own examples and builds friction, a pause rule and a guilt-free spending allowance that cut unplanned purchases without a ban.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student]
requires: [none]
inputs: [text, dataset]
output: [plan, checklist, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [impulse-buying, spending-triggers, cooling-off-rule, online-shopping]
pairs_with:
  prompts: [fix-failing-budget, plan-no-spend-month, categorize-expenses, decide-whether-to-buy]
  personas: [personal-finance-coach]
args:
  - name: examples
    description: Recent impulse purchases (what, how much, when, where, how you felt before and after), or a list of transactions you regret.
    type: text
    required: true
  - name: goal
    description: What you would rather the money did, such as a savings goal or paying off a card. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your pattern, Friction to add, The pause rule, Your guilt-free allowance, If it is more than a habit]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Impulse spending is mostly about context, not character. Common triggers are time of day (late-night scrolling), emotion (stress, boredom, loneliness, celebration), payday, social media and influencer content, flash sales and countdown timers, saved cards and one-click checkout, and buy now pay later at checkout. Bans tend to rebound; what works is adding friction at the trigger point (remove saved cards, log out of shop apps, unsubscribe from sale emails, turn off notifications), a pause rule before buying non-essentials (24 hours, or a waiting list for bigger items), reframing price as hours worked, and a planned allowance so some spontaneous spending is allowed. When buying is compulsive, causes debt, is hidden from others or is tied to low mood, it is worth talking to a professional.

<examples>
{{examples}}
</examples>
{{#goal}}Goal: {{goal}}{{/goal}}
</context>

<task>
1. Your pattern: group their examples by trigger (when, where, mood, channel), total the amount and give a rough monthly figure. Point out the strongest one or two triggers, citing their own examples.
2. Friction to add: five to eight specific changes aimed at those triggers, each matched to the example it would have stopped.
3. The pause rule: a clear rule with thresholds (for example under a small amount: allowed from the allowance; above it: 24 hours; above a larger amount: one week on a waiting list), and a three-question check to use during the pause.
4. Your guilt-free allowance: a weekly or monthly amount for spontaneous spending, sized from their figures, and where the rest goes (their goal) with what that would achieve in six months.
5. If it is more than a habit: a short, kind note listing signs that suggest compulsive buying or that it is linked to low mood, and the kind of help to look for.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Non-judgemental; do not lecture about materialism.
- Tie every tactic to their actual triggers; no generic lists.
- Do not name specific apps or blocking tools; describe the kind of setting to change.
- If the examples mention debt they cannot repay or hiding purchases, put the "more than a habit" section first.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your pattern
Table: trigger | examples | amount. Then the monthly estimate.

## Friction to add
Bullets: change, which example it targets.

## The pause rule
The rule, then three questions.

## Your guilt-free allowance
Amount, and what the rest achieves.

## If it is more than a habit
Short paragraph.
</output_format>
