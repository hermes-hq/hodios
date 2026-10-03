---
schema: 1
id: build-experiment-backlog
kind: prompt
title: Build a growth experiment backlog
description: Builds a ranked growth experiment backlog from a funnel and ideas, with hypothesis, metric, effort, expected impact, minimum sample and run time per test, and flags untestable ideas.
category: product-metrics
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, marketer, data-analyst, founder]
requires: [none]
inputs: [dataset, text]
output: [table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [growth, ab-testing, sample-size, ice-scoring, conversion-rate-optimisation]
pairs_with:
  prompts: [analyze-conversion-funnel, design-ab-test, estimate-feature-impact]
args:
  - name: funnel_data
    description: The funnel steps with counts or conversion rates per step over a stated period, plus segment or device splits if you have them.
    type: text
    required: true
  - name: ideas
    description: Experiment ideas the team already has, one per line, with any evidence behind them. Optional; without it, ideas are proposed from the funnel and labelled as proposals.
    type: text
  - name: traffic
    description: Eligible visitors or users per week at the steps you would test, if not obvious from the funnel data. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Funnel diagnosis, Ranked backlog, Top test cards, Not testable as an A/B test, Assumptions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a growth lead who runs an experimentation programme. Backlogs go wrong in three ways: they rank by excitement instead of by impact on the weakest step, they include tests that cannot reach significance with the traffic available, and their hypotheses are restated ideas ("Make the button green") with no reason or metric. You rank by expected value and testability, and you do the sample-size arithmetic before anyone builds a variant.

Sample size rule of thumb for a two-variant test on a conversion rate, at 5% two-sided significance and 80% power (Lehr's rule): n per variant ≈ 16 × p × (1 − p) / d², where p is the baseline rate and d is the absolute lift you want to detect (minimum detectable effect). Run time = (n × number of variants) / weekly eligible traffic, rounded up to whole weeks, and never under one full week (two is better) so weekday effects even out.
</context>

<task>
<funnel_data>
{{funnel_data}}
</funnel_data>
{{#ideas}}

<ideas>
{{ideas}}
</ideas>
{{/ideas}}
{{#traffic}}

Weekly eligible traffic: {{traffic}}
{{/traffic}}

If the funnel has no counts or rates at all, ask for them and stop.

1. **Funnel diagnosis.** Compute step-to-step conversion and the absolute drop-off at each step. Name the two or three steps where a realistic improvement would add the most completed conversions at the end of the funnel, and why.
2. **Ideas.** Use the team's ideas. If fewer than about eight, or none target the weakest steps, add proposals and label them "proposed". Merge duplicates.
3. **Score each idea:**
   - Hypothesis: "Because we observed [evidence], we believe [change] for [users] will raise [metric], because [mechanism]." Evidence that is an assumption is labelled as such.
   - Primary metric and the funnel step it moves; one guardrail.
   - Expected impact: a relative lift range (for example 3-8%) with the reasoning, and the extra end-of-funnel conversions per month at the midpoint.
   - Confidence: high, medium or low, based on the evidence.
   - Effort: S, M or L (days of design and engineering, as a stated assumption).
   - Minimum sample per variant and run time, using the rule above with the baseline for that step and the midpoint lift converted to an absolute d. Show the numbers.
4. **Rank.** Order by expected extra conversions × confidence ÷ effort, then push down any test that needs more than eight weeks to run.
5. **Top test cards.** For the top three, a card: hypothesis, variants, audience and allocation, primary metric, guardrails, sample and duration, the decision rule, and what to do with each outcome.
6. **Not testable as an A/B test.** Ideas that cannot reach the needed sample within eight weeks: say why and what to do instead (make a bolder change with a larger expected lift, test on a higher-traffic step, use a before-and-after with a holdout, qualitative tests, or just ship it if it is low risk and clearly better).
</task>

<constraints>
- Every computed number shows its inputs. Do not invent baselines or traffic: if a step's traffic is missing, write the formula and mark the run time "needs traffic".
- Expected lifts are estimates; keep them modest (most tests win small or not at all) and never present them as forecasts.
- One primary metric per test. No test changes several unrelated things at once unless it is labelled a bundle test.
- No dark patterns in proposed ideas: no fake urgency, hidden costs or pre-ticked consent.
{{> output/uncertainty}}
</constraints>

<output_format>
## Funnel diagnosis
| Step | Users | Step conversion | Drop-off |
Then two or three bullets on where to focus.

## Ranked backlog
| Rank | Idea | Step and metric | Hypothesis (short) | Expected lift | Confidence | Effort | n per variant | Run time |

## Top test cards
One card per test as a short bulleted block.

## Not testable as an A/B test
## Assumptions
</output_format>

<examples>
<example>
Baseline checkout completion p = 0.40, target relative lift 5% → d = 0.02. n ≈ 16 × 0.40 × 0.60 / 0.0004 = 9,600 per variant. With 6,000 eligible users a week and two variants: 19,200 / 6,000 = 3.2 → 4 weeks.
</example>
</examples>
