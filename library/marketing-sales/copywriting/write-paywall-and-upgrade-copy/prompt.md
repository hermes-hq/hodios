---
schema: 1
id: write-paywall-and-upgrade-copy
kind: prompt
title: Write paywall and upgrade prompt copy
description: Writes app paywall screens and in-product upgrade prompts at usage limits and locked features, with honest trial, price and renewal terms, a visible dismiss option, and compliance checks.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [product-manager, marketer, copywriter, founder]
requires: [none]
inputs: [text, spec]
output: [copy, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [paywall, upgrade-prompt, freemium, free-trial, subscription-terms]
pairs_with:
  prompts: [write-pricing-page-copy, write-ux-microcopy, review-design-for-dark-patterns, write-in-app-announcement]
  personas: [copywriter]
args:
  - name: product
    description: The app or software, who uses it, and what the paid tier unlocks.
    type: text
    required: true
  - name: plans
    description: Free versus paid differences, prices and billing periods, trial length, what happens when the trial ends, renewal and how to cancel (in the app store or on the web).
    type: text
    required: true
  - name: moments
    description: Where upgrade prompts appear - for example the onboarding paywall, hitting a usage limit, tapping a locked feature, trial ending - and anything known about where users upgrade today.
    type: text
    required: true
  - name: market
    description: Countries you sell in and the stores you sell through (Apple App Store, Google Play, web checkout). Optional but needed for the compliance checks.
    type: string
output_contract:
  format: markdown
  sections: [Upgrade moments, Paywall copy, In-product prompts, Terms wording, Compliance checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write upgrade copy for apps and subscription software. Upgrades happen at moments of intent: the user just hit a limit, tapped a feature they want, or saw value and wants more. Prompts that interrupt at random, list every paid feature, or block the user from closing them annoy people and get poor reviews. Strong prompts name the one thing the user was trying to do, show what the paid tier gives them right now, state the price and terms in plain words, and make "not now" easy.

Subscription terms are where trust and law meet. Users must be able to see, before they pay, what they will be charged, when, how often, when a free trial converts to a paid plan, and how to cancel. App stores have their own subscription disclosure rules, and many countries and US states have auto-renewal and consumer-protection rules. Hiding the renewal price, pre-selecting the most expensive option without saying so, shaming the user for declining ("No, I prefer to stay disorganised") or burying the close button are dark patterns that also cause refunds and store rejections.
</context>

<task>
<product>
{{product}}
</product>

<plans>
{{plans}}
</plans>

<moments>
{{moments}}
</moments>

{{#market}}Markets and stores: {{market}}{{/market}}

1. If prices, billing period or trial terms are missing, ask for them and stop, because terms wording cannot be written without them.
2. Map the upgrade moments: for each, what the user was trying to do, the one benefit to lead with, and the format (full paywall, modal, inline banner, locked-state message).
3. Write the main paywall: headline tied to what the user gets, three benefit lines (not a full feature list), plan options with price per billing period and any per-month equivalent marked as such, trial terms, the call to action, a visible dismiss or "continue with free" option, restore purchases if relevant, and links to terms and privacy.
4. Write in-product prompts for each other moment: headline, one or two lines, call to action and a neutral dismiss label.
5. Write the terms wording shown near the purchase button: price, billing period, trial end date or length, auto-renewal, and how to cancel, in plain language.
6. Write compliance checks to run with the store rules and local law for the markets given.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never hide or minimise the price, renewal or trial conversion. They appear on the same screen as the purchase button.
- Dismiss labels are neutral ("Not now", "Continue with free"); no confirmshaming and no hidden or delayed close button.
- Use only the plans and terms supplied; never invent discounts, trial lengths or features.
- Do not state store rules or consumer laws as fact for a specific country; list what to check and suggest legal review for the subscription terms.
- Benefit lines describe what the user can do, tied to the moment, not generic "unlock premium power".
</constraints>

<output_format>
## Upgrade moments
A table: Moment | What the user was doing | Benefit to lead with | Format.

## Paywall copy
The main paywall, ready to paste, with each element labelled.

## In-product prompts
One block per moment: headline, body, CTA, dismiss label.

## Terms wording
The text near the purchase button for each plan option.

## Compliance checks
Checklist of points to confirm for the stores and markets given.
</output_format>
