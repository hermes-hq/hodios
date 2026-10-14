---
schema: 1
id: write-campaign-results-report
kind: prompt
title: Write a campaign results report
description: Writes a post-campaign wrap-up report comparing results with the objectives set before launch, full cost per result, incremental impact where measurable, what worked and lessons for next time.
category: reporting
version: 1.0.0
status: incubating
stage: [review]
role: [marketer, manager, consultant, founder]
inputs: [dataset, document, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [campaign-wrap-up, incrementality, cost-per-result, marketing-measurement, lessons-learned]
pairs_with:
  prompts: [analyze-ad-performance, analyze-email-campaign-report, write-marketing-performance-report, anticipate-report-questions]
args:
  - name: campaign_brief
    description: "The campaign's objectives and targets as agreed before launch, audience, channels, dates, budget, and how success was meant to be measured."
    type: text
    required: true
  - name: results
    description: "Results by channel, audience and creative: spend, reach, impressions, frequency, clicks, conversions, sales or sign-ups, plus total costs outside media (production, agency, fees) and any baseline, control group or brand lift data."
    type: text
    required: true
  - name: audience
    description: Who reads it (marketing team, client, leadership) and what decision follows (repeat, scale, stop). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Objectives versus results, Cost and efficiency, Incremental impact, What worked and what did not, Lessons for next time, Data notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A campaign report is judged against the objectives set before launch, not against whatever metric turned out best. Experienced marketers guard against the usual distortions. Swapping the goal after the fact (reporting reach because sales disappointed) destroys trust. Platform-attributed conversions include people who would have bought anyway, especially from retargeting and brand search, so the real question is incremental impact: compare with a holdout or control region, a pre-campaign baseline adjusted for seasonality, or a brand lift study, and say plainly when none existed. Cost per result must use full cost, including production and agency fees, not media alone. Creative and audience comparisons are only lessons when the samples are large enough and the cells were run fairly; small differences between ads with a few dozen conversions each are noise. Frequency matters: very high frequency on a small audience often explains falling response late in a campaign. Good wrap-ups end with a few transferable lessons and a clear call: repeat, change or stop.

{{#audience}}Audience: {{audience}}{{/audience}}
</context>

<task>
<campaign_brief>
{{campaign_brief}}
</campaign_brief>

<results>
{{results}}
</results>

1. Restate the objectives and targets from the brief and score each one as met, partly met or missed, using the measure the brief specified.
2. Compute media and full cost per result for the primary objective and for each channel.
3. Assess incremental impact using any holdout, control, baseline or lift data; if none exists, say the results are attributed, not proven incremental, and estimate nothing beyond what the data supports.
4. Compare channels, audiences and creatives, marking which differences are large enough to act on and which are within noise.
5. Write three to five lessons that would change the next campaign, and a recommendation to repeat, change or stop.
</task>

<constraints>
- Judge against the pre-agreed objectives; do not replace a missed objective with a different success metric.
- Do not present platform-attributed conversions as incremental without evidence.
- Include all costs supplied in cost per result, and show media-only figures separately.
- Do not declare a creative or audience winner from small samples; state the counts.
- Do not invent benchmarks or results.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three to five sentences: objectives met or missed, full cost per result, the strength of the evidence, the recommendation.

## Objectives versus results
Table: Objective | Target | Result | Status.

## Cost and efficiency
Table: Channel | Spend | Full cost share | Results | Media cost per result | Full cost per result.

## Incremental impact
What the evidence shows and how strong it is.

## What worked and what did not
Bullets, each with the figure and sample size.

## Lessons for next time
Numbered lessons and the recommendation.

## Data notes
Bullets: attribution, missing controls, data gaps.
</output_format>
