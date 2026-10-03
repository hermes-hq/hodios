---
schema: 1
id: analyze-discount-effectiveness
kind: prompt
title: Analyse whether promotions paid off
description: Analyses promotion data for incremental lift, cannibalisation, pull-forward and margin impact against a fair baseline, and says which to repeat. Use after a sale, coupon or discount campaign.
category: data-exploration
version: 1.0.0
status: incubating
stage: [review]
role: [marketer, data-analyst, founder, business-analyst]
subject: [ecommerce]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [promotions, discounts, incrementality, cannibalization, gross-margin]
pairs_with:
  prompts: [estimate-price-elasticity, estimate-causal-effect, analyze-sales-data]
  personas: [data-analyst]
args:
  - name: promotion_data
    description: Each promotion's dates, products, discount depth and mechanic, plus sales units and revenue by day or week before, during and after, regular price and unit cost, promotion costs (ads, vendor funding), and similar products not on promotion.
    type: text
    required: true
  - name: baseline_period
    description: The period you consider normal for comparison (for example "the 6 weeks before each promotion" or "same weeks last year"), if you have a preference.
    type: string
output_contract:
  format: markdown
  sections: [Headline, Baseline method, Promotion scorecard, What drove the results, Repeat redesign or stop, Caveats, Next test]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a pricing and promotions analyst. A promotion's sales spike is not its result. Part of it would have happened anyway (subsidised baseline sales), part was taken from other products (cannibalisation), and part was borrowed from the following weeks (pull-forward, as customers stock up). What is left, valued at the promotional margin and net of promotion costs, is the real effect, and it is often negative. You estimate each piece openly and let the business decide with the numbers in view.
</context>

<task>
Evaluate these promotions.

<promotion_data>
{{promotion_data}}
</promotion_data>

<baseline_period>
{{baseline_period}}
</baseline_period>

1. Baseline: estimate what each promoted product would have sold without the promotion. Use the user's baseline period if given; otherwise choose and justify one of: pre-period average adjusted for trend and seasonality, the same period last year scaled by year-on-year growth, or a control group (comparable products or stores without the promotion), which is best when available. Exclude other promotion weeks and stockout weeks from the baseline.
2. For each promotion, compute:
   - Gross lift: promotion-period units minus baseline units.
   - Cannibalisation: the drop below baseline in substitutes (same category, other sizes or brands) during the promotion.
   - Pull-forward: the dip below baseline in the weeks after the promotion, for the promoted and substitute products.
   - Halo: lift in complementary products, only if the data shows it.
   - Net incremental units: gross lift minus cannibalisation minus pull-forward plus halo.
   - Incremental gross profit: promotion-period profit at the promotional price minus baseline profit at the regular price, adjusted for cannibalised and pulled-forward profit, minus promotion costs plus vendor funding.
   - Return: incremental gross profit divided by the cost of the discount given (discount per unit times all units sold on promotion, including baseline units).
3. If customer-level data is available, add the share of promotion buyers who were new, and their repeat rate afterwards against regular buyers.
4. Explain what drove the results across promotions: discount depth, mechanic (percentage off, multi-buy, coupon, free shipping), product type (stock-up-able versus perishable), timing, and whether lift grew less than proportionally with deeper discounts.
5. Verdict per promotion: repeat, redesign (with the change, such as a shallower discount or a different mechanic), or stop, each with the evidence.
</task>

<constraints>
- Show arithmetic for each promotion, and state every assumption, such as the post-period window used for pull-forward (default: as long as the promotion, up to four weeks).
- Do not attribute all the lift to the promotion when other things changed (advertising, a competitor stockout, weather, a holiday). Name them where the data or dates suggest them.
- If unit costs or substitutes are missing, compute what you can, label the missing parts, and ask for them rather than assuming a margin.
- Small numbers of promotions or noisy weekly sales make estimates rough; give ranges and say so.
</constraints>

<output_format>
## Headline
Three sentences: overall verdict, the best and worst promotion, the main lesson.

## Baseline method
The method, the periods used, and why.

## Promotion scorecard
Table: Promotion | Discount | Gross lift units | Cannibalised | Pulled forward | Net incremental units | Incremental gross profit | Return | Verdict.

## What drove the results
Bullets with evidence.

## Repeat, redesign or stop
Numbered, one per promotion, with the specific change for redesigns.

## Caveats
Bullets on confounders and data gaps.

## Next test
One holdout or A/B design (for example a randomised set of stores or customers without the promotion) that would measure incrementality directly next time.
</output_format>
