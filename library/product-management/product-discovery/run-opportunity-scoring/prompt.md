---
schema: 1
id: run-opportunity-scoring
kind: prompt
title: Run opportunity scoring
description: Runs outcome-driven opportunity scoring from importance and satisfaction ratings, showing the calculation per outcome, to find underserved and overserved needs and what to do next.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover]
role: [product-manager, ux-researcher, data-analyst, founder]
requires: [none]
inputs: [text, dataset]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [opportunity-scoring, outcome-driven-innovation, jobs-to-be-done, survey-analysis, underserved-needs]
pairs_with:
  prompts: [define-jobs-to-be-done, prioritize-features, map-opportunity-solution-tree, map-value-proposition-canvas]
args:
  - name: survey_data
    description: For each outcome statement, the importance and satisfaction ratings. Ideally the share of respondents giving the top two scores, or the full distribution; means work with a caveat. Include sample size, scale, and segment splits if any.
    type: text
    required: true
  - name: scale
    description: The rating scale used in the survey.
    type: enum
    enum: [1-5, 1-7, 1-10]
    default: 1-5
output_contract:
  format: markdown
  sections: [Data check, Results, Underserved outcomes, Overserved outcomes, Segment differences, Caveats, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product researcher who runs outcome-driven opportunity scoring. Customers rate desired outcomes of a job (for example "minimise the time it takes to reconcile a bank statement") on importance and on how satisfied they are with current solutions. Outcomes that are important but poorly satisfied are opportunities; outcomes where satisfaction exceeds importance are overserved and may allow simpler or cheaper solutions.

The method:
- Importance and satisfaction are each expressed on a 0 to 10 scale as the share of respondents giving the top two ratings (on a 1 to 5 scale, a 4 or 5) divided by 10. Example: 82% rate it 4 or 5 → importance 8.2.
- Opportunity = Importance + max(Importance − Satisfaction, 0).
- Common reading (a heuristic): above 15 extreme opportunity, 12 to 15 high, 10 to 12 worth considering, below 10 not an opportunity; satisfaction above importance means overserved.
</context>

<task>
<survey_data>
{{survey_data}}
</survey_data>

Scale: {{scale}}.

If the data has no satisfaction ratings or no importance ratings, explain that both are needed per outcome and stop.

1. **Data check.** Sample size overall and per segment (below about 30 per segment, treat results as directional), whether outcome statements are well formed (a direction, a metric, an object, and no solution baked in), and whether ratings are top-two-box shares, distributions or means. For a 1 to 7 scale use the top two (6 or 7); for a 1 to 10 scale use the top three (8 to 10) unless the user says otherwise, and say which you used. If only means are given, convert them with a linear rescale to 0 to 10, label the result as an approximation, and say that top-box data would be more reliable.
2. **Results.** For each outcome: importance, satisfaction, the gap, the opportunity score with the arithmetic shown, and the band. Sort from highest to lowest opportunity.
3. **Underserved outcomes.** The top ones, what they suggest about where current solutions fail, and the kinds of solutions worth exploring (as directions, not features to commit to).
4. **Overserved outcomes.** Where the product or market over-delivers and where simplification or cost reduction could be possible.
5. **Segment differences.** If segments are given, compute scores per segment and highlight outcomes that are opportunities for one segment but not another; this often reveals a segment to target.
6. **Caveats.** Sampling, wording and scale effects, the heuristic nature of the bands, and that a high score shows where to look, not what to build.
7. **Next steps.** Follow-up interviews on the top outcomes, concept tests, and which outcomes to measure again after changes.
</task>

<constraints>
- Compute only from the data given; show every calculation so it can be checked. Never invent ratings or respondents.
- Round scores to one decimal place.
- Present the bands as a rule of thumb, not a law.
{{> output/uncertainty}}
</constraints>

<output_format>
## Data check
## Results
| Outcome | Importance | Satisfaction | Gap | Opportunity (calculation) | Band |
## Underserved outcomes
## Overserved outcomes
## Segment differences
## Caveats
## Next steps
</output_format>
