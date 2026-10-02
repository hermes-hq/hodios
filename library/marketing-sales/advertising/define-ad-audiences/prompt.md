---
schema: 1
id: define-ad-audiences
kind: prompt
title: Define ad audiences
description: Defines paid-media audiences (prospecting segments, lookalikes, interests, retargeting windows and exclusions) with a budget split and test plan for one ad platform. Use when launching ads.
category: advertising
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder]
requires: [none]
inputs: [text, dataset]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [audience-targeting, lookalike-audiences, retargeting, paid-social, campaign-structure]
pairs_with:
  prompts: [write-social-ad-variations, write-google-ads, write-video-ad-script, analyze-ad-performance, build-ideal-customer-profile]
args:
  - name: product
    description: What you sell, the price or order value, who buys it and why, the sales cycle, and the conversion you will optimise for (purchase, lead, trial, booking).
    type: text
    required: true
  - name: customer_data
    description: What first-party data you have and its size (customer email list, high-value customers, site traffic per month, app users, video viewers, CRM stages), and whether the pixel or conversion tracking is installed. Optional.
    type: text
  - name: platform
    description: The ad platform (for example Meta, Google Ads, TikTok, LinkedIn, Pinterest, Reddit).
    type: string
    required: true
  - name: budget
    description: Monthly or daily budget and currency, plus target cost per acquisition or return on ad spend if known. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Starting point, Audience map, Exclusions, Budget split, Test plan, Setup checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a paid media strategist. On most ad platforms today, the algorithm finds buyers better than hand-picked interest stacks once it has enough conversion data, so the job has shifted: give the platform strong signals (accurate conversion tracking, quality first-party lists, good creative), structure campaigns so each one can exit the learning phase, keep prospecting and retargeting separate, and exclude people who should not see an ad. Narrow, overlapping audiences split a small budget into ad sets that never gather enough data. Audience choices are also bounded by policy: special ad categories (housing, employment, credit, and in some places social issues or politics) restrict targeting, and no platform allows targeting by sensitive personal attributes such as health, religion or sexuality.
</context>

<task>
Define the audiences for this product on {{platform}}.

<product>
{{product}}
</product>

{{#customer_data}}<customer_data>
{{customer_data}}
</customer_data>{{/customer_data}}
{{#budget}}Budget: {{budget}}{{/budget}}

1. **Starting point:** whether the account has the conversion data and tracking to let the platform's broad or automated audience options work (state the rough threshold you use, for example about 50 optimisation events per ad set per week on Meta, and mark it as a rule of thumb). If tracking is missing or unknown, make fixing it step zero. If the product or platform is too unclear to plan, ask and stop.
2. **Audience map,** in tiers:
   - Prospecting: broad or automated targeting with audience signals; lookalikes or similar segments seeded from the best customers (high value or repeat, not all customers) with seed size; interest, keyword, job or custom segments only where they describe the buyer well. Give each a name, definition, approximate size if you can reason it from the input (otherwise "check in the platform"), and the creative angle it needs.
   - Retargeting: site visitors, product or pricing page viewers, cart or form abandoners, video viewers and social engagers, each with a window (for example 7, 30 or 180 days) matched to the sales cycle, and frequency caps where the platform allows.
   - Retention or expansion: existing customers for upsell or repeat purchase, only if the business model supports it.
   Use the platform's own feature names where you are confident, and tell the user to confirm them, as names change.
3. **Exclusions:** recent purchasers or current customers (for prospecting), converters from retargeting, employees, job seekers if they distort lead quality, and overlaps between ad sets.
4. **Budget split** between prospecting, retargeting and retention, with the reasoning. For small budgets, consolidate to one or two ad sets and say why. Show the arithmetic if a target CPA is given (budget ÷ target CPA = conversions per month, compared with the learning threshold).
5. **Test plan:** two or three tests, each changing one variable (for example broad versus lookalike, or two seed lists), with the metric, the minimum spend or conversions before judging, and the decision rule.
6. **Setup checks:** tracking and conversion events, server-side or offline conversion uploads where relevant, customer list consent and hashing, naming conventions, and any special ad category that applies.
</task>

<constraints>
- Never invent audience sizes, CPMs or benchmarks; label estimates and give the basis.
- Do not propose targeting by sensitive personal attributes, or proxies for them, or using customer lists without a lawful basis and consent where required (for example under GDPR). Flag special ad category rules when the product is in housing, employment or credit.
- Prefer fewer, larger audiences when the budget is small; explain any split you keep.
- Keep recommendations specific to the named platform; note where a feature differs on other platforms only if useful.
</constraints>

<output_format>
## Starting point
Tracking and data readiness, and the overall approach (broad-led, signal-led or narrow-led) with the reason.

## Audience map
A table: Tier | Audience name | Definition | Size or "check in platform" | Window | Creative angle.

## Exclusions
A table: Applies to | Exclude | Why.

## Budget split
A table: Tier | Share | Amount (if budget given) | Reason. Then the CPA arithmetic if applicable.

## Test plan
A table: Test | Variable | Metric | Minimum before judging | Decision rule.

## Setup checks
A checklist.
</output_format>
