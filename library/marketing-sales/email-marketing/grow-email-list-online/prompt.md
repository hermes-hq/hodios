---
schema: 1
id: grow-email-list-online
kind: prompt
title: Grow a business email list online
description: Plans online email list growth for a shop or business - sign-up placements, incentive economics, popups, quizzes and partner swaps - with consent wording to check and a weekly tracker.
category: email-marketing
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder]
subject: [ecommerce, retail, hospitality]
requires: [none]
inputs: [text]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [list-growth, signup-forms, lead-magnet, popups, sign-up-incentive]
pairs_with:
  prompts: [grow-email-list-in-store, write-double-opt-in-emails, write-welcome-series]
args:
  - name: business
    description: What the business sells, average order value and margin, monthly website visitors and main traffic sources, current list size and sign-up rate, and the email platform.
    type: text
    required: true
  - name: assets
    description: Things you could offer or use - discounts you can afford, guides, quizzes, samples, giveaways, partner brands, social following, checkout. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Growth tactics, Incentive maths, Copy, Tracking]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan list growth for a business website. Most sites convert well under a few percent of visitors into subscribers because the only form is a footer box saying "Subscribe to our newsletter", which offers no reason to sign up. Experts give a specific reason (a real benefit, not "news"), place forms where intent is high (a timed or exit popup, product pages, checkout opt-in, a quiz or fit finder, content pages), and work out what an incentive costs per subscriber against what a subscriber is worth, because a discount most people would not have needed can cost more than it brings. Growth tactics that bring the wrong people (giveaways for a free phone, bought lists, contest sharing) inflate the list and damage deliverability. Consent must be clear at every form: what people will receive, a separate opt-in at checkout where required, and no pre-ticked boxes where those are not allowed, which the user should check for their customers' countries.
</context>

<task>
Plan online list growth.

<business>
{{business}}
</business>
{{#assets}}
<assets>
{{assets}}
</assets>
{{/assets}}

1. **Starting point:** current sign-up rate (subscribers per visitor) and a realistic target for the next 90 days, with the assumption shown.
2. **Growth tactics:** rank six to eight tactics for this business by expected sign-ups, cost and effort, from: popup (timing, frequency, mobile behaviour), embedded forms on high-intent pages, checkout opt-in, quiz or product finder, a useful lead magnet, social and bio links, partner swaps or co-hosted giveaways with relevant brands, and offline-to-online hand-offs. Skip any that do not fit.
3. **Incentive maths:** for any discount or free gift, estimate the cost per subscriber (redemption rate times average discount) against the likely value of a subscriber, and suggest a cheaper non-discount alternative to test.
4. **Copy:** headline, one-line benefit, button label and consent line for the main popup and the checkout opt-in, plus a lead magnet title if one is used.
5. **Tracking:** weekly sign-ups by source, sign-up rate per form, and the quality check that matters: what share of new subscribers click or buy in their first 30 days.
</task>

<constraints>
- Use the supplied traffic and margin; label estimates and do not invent benchmarks as fact.
- No bought, rented or scraped lists; no pre-ticked consent; no giveaways that attract people who do not want the product.
- Popups must be easy to close on mobile and not shown on every page view.
- Consent wording is a starting point; tell the user to check the requirements for their customers' countries.
</constraints>

<output_format>
## Starting point
Current rate, target and assumptions.

## Growth tactics
A table: Rank | Tactic | Where | Expected effect | Cost | Effort.

## Incentive maths
A short worked calculation.

## Copy
Popup, checkout opt-in and lead magnet copy.

## Tracking
Bullets.
</output_format>
