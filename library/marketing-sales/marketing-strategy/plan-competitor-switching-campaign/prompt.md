---
schema: 1
id: plan-competitor-switching-campaign
kind: prompt
title: Plan a campaign to win customers from a competitor
description: Plans a campaign to win customers from a named competitor, with switching triggers, reasons to switch backed by evidence, switching-cost removal, honest comparison content, targeting and legal checks.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, sales-rep]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [competitive-campaign, switching-costs, migration-offer, comparative-advertising, win-customers]
pairs_with:
  prompts: [write-honest-comparison-page, write-competitive-battlecard, analyze-competitor-reviews, plan-competitive-response]
args:
  - name: competitor_and_us
    description: The competitor, what both products do, where you are genuinely better and worse, prices, and why customers who switched to you did so (quotes if you have them).
    type: text
    required: true
  - name: trigger
    description: Any event that makes switching timely (competitor price rise, outage, acquisition, product sunset, contract renewal season), or "none".
    type: text
    required: true
  - name: resources
    description: Budget, team, channels you can use, and whether you can offer migration help or contract buy-outs. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Campaign summary, Who is likely to switch, Reasons to switch, Removing switching costs, Campaign assets, Targeting and channels, Sales follow-up, Legal and reputation checks, Measures]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a competitive marketing strategist. Customers rarely switch because a competitor is "worse in general"; they switch when a trigger (price rise, outage, contract renewal, a missing feature that now hurts, a new decision maker) meets a credible alternative and the cost of switching looks manageable. Winning campaigns target customers at those moments, lead with the one or two differences that matter to them, prove those differences with evidence (customer stories from switchers, side-by-side demos, verifiable facts), and remove the switching costs: data migration, contract overlap, retraining, risk. Attacking campaigns that misstate the competitor's product backfire, invite legal action under comparative advertising and unfair competition rules in many countries, and make buyers distrust you. Honest comparisons that admit where the competitor fits better are more persuasive.
</context>

<task>
<competitor_and_us>
{{competitor_and_us}}
</competitor_and_us>

Trigger: {{trigger}}

{{#resources}}
<resources>
{{resources}}
</resources>
{{/resources}}

1. If you cannot tell where you are genuinely better, ask and stop; a switching campaign without a real advantage wastes money.
2. Who is likely to switch: segments of the competitor's customers most affected by the trigger or by your advantages, and how to identify them (public signals, renewal timing, review sites, communities, your own lost deals).
3. Reasons to switch: the two or three differences that matter to those segments, each with the evidence you have and evidence still needed. Note where the competitor is the better fit, so you do not target those customers.
4. Removing switching costs: migration help, import tools, onboarding, contract overlap credit or buy-out, a trial on their real data, and the risk reducers you can afford.
5. Campaign assets: comparison or switching page, migration guide, switcher customer stories, a calculator if relevant, ad and email copy angles, sales talk track. Keep claims factual and dated.
6. Targeting and channels: search on competitor-related terms within platform rules, review site presence, communities, outbound to identified accounts, partners. Note trademark rules for using a competitor's name in ads.
7. Sales follow-up: qualification questions, objection handling for switching risk, and a migration plan offer.
8. Legal and reputation checks: verify every claim, date it, avoid disparagement, review comparative advertising and trademark rules for the user's country with a qualified person.
9. Measures: switch-intent leads, win rate versus the competitor, migrations completed, retention of switchers after 6 months.
</task>

<constraints>
- Never invent facts about the competitor; every claim must come from the user's input or be marked "to verify".
- No disparagement, fake reviews or misleading comparisons.
- Do not state advertising or trademark law as fact; flag what to check.
{{> output/uncertainty}}
</constraints>

<output_format>
## Campaign summary

## Who is likely to switch

## Reasons to switch
A table: Difference | Evidence we have | Evidence needed.

## Removing switching costs

## Campaign assets

## Targeting and channels

## Sales follow-up

## Legal and reputation checks

## Measures
</output_format>
