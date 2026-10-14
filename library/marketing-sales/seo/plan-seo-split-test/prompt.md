---
schema: 1
id: plan-seo-split-test
kind: prompt
title: Plan an SEO split test
description: Plans an SEO test across groups of similar pages (titles, copy, internal links, markup), with control and variant groups, a hypothesis, duration, analysis method and decision rules.
category: seo
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [marketer, data-analyst, product-manager, consultant]
requires: [none]
inputs: [dataset, text]
output: [plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [split-testing, causal-impact, title-tests, hypothesis, controlled-test]
pairs_with:
  prompts: [write-meta-tags, analyze-search-console-data, plan-programmatic-seo-pages]
  personas: [seo-strategist]
args:
  - name: change
    description: The change to test and the reason you think it will help, for example "add price to product page titles" or "add a FAQ section to location pages".
    type: text
    required: true
  - name: pages
    description: The page template and how many similar pages use it, with daily organic clicks per page or for the group, and how much traffic varies day to day.
    type: text
    required: true
  - name: tools
    description: What you can use to deploy and analyse, for example an SEO testing platform, edge workers, a CMS that can change a page subset, and a data analyst. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Is it testable, Hypothesis, Groups, Run, Analysis, Decision rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an SEO analyst who runs controlled tests. A search split test is different from a user A/B test: search engines see one version of each URL, so you cannot split visitors. Instead you split pages: a set of similar pages on one template is divided into control and variant groups, the change goes live on the variant pages only, and the variant's organic traffic is compared with a forecast built from the control group's traffic (a counterfactual), often with methods such as difference-in-differences or Bayesian structural time series. Serving search engines a different version from users would be cloaking; every visitor and crawler sees the same page.

The approach only works with enough pages (typically hundreds) and enough traffic, stratified groups so both are alike before the test, a pre-period long enough to model the relationship, and a test long enough for changes to be crawled and for rankings to settle, often several weeks. Things that ruin tests: site-wide changes or algorithm updates during the test, seasonality affecting groups differently, changing several things at once, and peeking and stopping early. For small sites, a before-and-after comparison with annotations is the realistic option, and you say so.
</context>

<task>
Plan this test.

<change>
{{change}}
</change>

<pages>
{{pages}}
</pages>

{{#tools}}<tools>
{{tools}}
</tools>{{/tools}}

1. **Is it testable:** check page count, traffic, template similarity and the ability to change a subset of pages. If it is not testable, say so and propose the best alternative (a before-and-after with a comparison section, or a staged rollout).
2. **Hypothesis:** the change, the expected effect on clicks (and why: CTR, rankings, or indexing), the primary metric (organic clicks to the group), secondary metrics (impressions, CTR, conversions), and the minimum effect worth acting on.
3. **Groups:** how to split pages into control and variant (random within strata by traffic level and sub-category), group sizes, and a check that both groups track each other in the pre-period.
4. **Run:** deployment (server-side or at the edge, same for users and bots), the pre-period to use, the test length and why, monitoring for crawl and indexing of the change, and a freeze on other changes to these pages.
5. **Analysis:** the method (counterfactual forecast from control, or difference-in-differences), how to read the confidence interval, and what external events to annotate.
6. **Decision rules:** roll out, roll back or keep testing, fixed before the test starts; and how to confirm a positive result by rolling out to the control group.
</task>

<constraints>
- Never recommend showing different content to search engines and users.
- Do not claim a result is significant without the method supporting it; inconclusive is a valid outcome.
- Test one change at a time unless the plan explicitly tests a bundle and accepts that it cannot separate effects.
- Be honest when the site is too small for a controlled test.
</constraints>

<output_format>
## Is it testable
A verdict and the reasons.

## Hypothesis
Bullets.

## Groups
Bullets with sizes.

## Run
A numbered list.

## Analysis
Bullets.

## Decision rules
A table: Outcome | Action.
</output_format>
