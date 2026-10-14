---
schema: 1
id: decide-on-umbrella-liability
kind: prompt
title: Decide on umbrella or extra liability cover
description: Works out whether a household needs umbrella or excess personal liability cover by mapping its liability risks, the limits in its home and car policies, and what it could lose in a large claim.
category: insurance
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, document]
output: [report, table, questions]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [umbrella-policy, personal-liability, liability-limits, excess-liability, asset-protection]
pairs_with:
  prompts: [review-insurance-coverage, respond-to-liability-claim, compare-car-insurance]
args:
  - name: exposures
    description: What could lead to a claim against your household - teenage or new drivers, a pool, trampoline or dog, a rental property you let out, volunteering on a board, hosting events, boats, horses, online posting, a home business.
    type: text
    required: true
  - name: current_limits
    description: Liability limits on your car, home or renters, and any other policies, if known.
    type: text
  - name: assets
    description: Rough picture of what could be at risk - home equity, savings, investments, future earnings - in bands if you prefer.
    type: text
  - name: country
    description: Country and region. Umbrella policies are common in some markets and rare in others, and typical court awards and compulsory limits vary.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Summary, Your liability exposures, Current limits, Where a large claim would land, Umbrella or alternatives, Questions for a broker]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Personal liability claims are rare but can be large, especially serious injuries caused by a car, a dog, a pool or a guest. Home and car policies each have a liability limit; above it, the household pays. An umbrella policy (common in the United States and some other markets) adds a layer, often in steps of a million, above the underlying home and car policies, and may cover some claims they exclude, such as defamation or certain liabilities abroad. It usually requires minimum limits on the underlying policies, so buying one can mean raising those too. In many other countries, car liability for injury is unlimited or very high by law and home policies already carry substantial personal liability cover, so the gap may be small; there the question is often whether the home policy's limit and exclusions fit the household's real risks. Umbrella policies normally exclude business activities, professional advice, deliberate acts, and often rental properties, boats or board roles unless declared.

Country: {{country}}
{{#current_limits}}

<current_limits>
{{current_limits}}
</current_limits>
{{/current_limits}}
{{#assets}}

<assets>
{{assets}}
</assets>
{{/assets}}
</context>

<task>
<exposures>
{{exposures}}
</exposures>

1. Your liability exposures: list each one with the kind of claim it could cause and a rough severity (minor, serious, catastrophic). Ask about common exposures not listed.
2. Current limits: table of each policy's liability limit, or "unknown, check the schedule", and note which exposures fall under no policy at all.
3. Where a large claim would land: for a serious claim from the top two exposures, which policy responds first, where its limit runs out, and what would be left for the household to pay, in general terms.
4. Umbrella or alternatives: whether umbrella cover exists and fits in this country, the underlying limits it would require, what it would and would not cover here, and alternatives (raising home or car limits, declaring exposures such as a rental property or board role to the right policy, specific cover for business or boats).
5. Questions for a broker, specific to the exposures.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent premiums, typical court awards or legal limits; describe them as things to check locally.
- Do not tell the household it must buy cover; set out the exposure and the options.
- Do not suggest moving or hiding assets to avoid claims; that is outside this prompt and may be unlawful.
- Mark when an exposure belongs on a business or professional policy rather than personal cover.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
The largest exposures, whether current limits look thin for them, and the main option.

## Your liability exposures
Table: exposure | possible claim | severity.

## Current limits
Table: policy | liability limit | exposures it covers.

## Where a large claim would land
Short worked examples.

## Umbrella or alternatives
Bullets.

## Questions for a broker
Numbered.
</output_format>
