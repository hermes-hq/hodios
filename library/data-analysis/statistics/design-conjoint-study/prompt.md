---
schema: 1
id: design-conjoint-study
kind: prompt
title: Design a conjoint study
description: Designs a choice-based conjoint study with attributes, levels, design, sample size and an analysis plan for preference shares and willingness to pay. Use before pricing decisions.
category: statistics
version: 1.0.0
status: incubating
stage: [design]
role: [product-manager, marketer, researcher, ux-researcher]
subject: [statistics]
inputs: [text]
output: [plan, table, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [conjoint-analysis, choice-modelling, pricing-research, willingness-to-pay]
pairs_with:
  prompts: [estimate-price-elasticity, write-survey-questionnaire, calculate-sample-size]
args:
  - name: product
    description: "The product or offer, the decision the study must inform (pricing, feature bundle, packaging), the target buyers, and the competitors or alternatives buyers consider."
    type: text
    required: true
  - name: attributes
    description: "Candidate attributes and levels you have in mind, including the price range. Leave empty to have them proposed from the product description."
    type: text
output_contract:
  format: markdown
  sections: [Method choice, Attributes and levels, Experimental design, Sample, Questionnaire flow, Analysis plan, Risks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a choice-modelling consultant who has run conjoint studies for software, consumer goods and services. You know that most of a conjoint's quality is decided before fielding: attributes that matter to buyers and to the decision, levels that are realistic and unambiguous, a price range that brackets the real market, and a design that lets every effect be estimated. You also know the analysis traps: importance scores that depend on the level ranges chosen, willingness-to-pay figures read as list prices, and simulated shares mistaken for market shares.
</context>

<task>
Design a conjoint study for this product.

<product>
{{product}}
</product>

<attributes>
{{attributes}}
</attributes>

1. Confirm the decision and pick the method: choice-based conjoint (CBC) by default; adaptive CBC when there are many attributes or levels; MaxDiff when the question is only ranking a list of features; a simple price test (Van Westendorp or Gabor-Granger) when price is the only question. Explain the choice in two sentences.
2. Define attributes and levels. Keep to about four to seven attributes and two to five levels each; levels mutually exclusive, concrete and realistic; similar numbers of levels across attributes where possible (attributes with more levels tend to look more important); price levels that span the realistic market range. If attributes were not given, propose them from the product and the competitive set, and mark them as assumptions to validate in a few buyer interviews.
3. Flag prohibited or implausible combinations and keep them to a minimum, since prohibitions reduce design efficiency. Consider alternative-specific attributes if, for example, brands have different price ranges.
4. Experimental design: number of tasks per respondent (about 8 to 15), concepts per task (2 to 4), a "none" option or dual-response none when the decision includes not buying, a randomised or efficient design with many versions, and one or two fixed holdout tasks for validation. Recommend checking design efficiency and standard errors with the platform's diagnostics or simulated data before fielding.
5. Sample size: apply the rule of thumb n ≥ 500 × c ÷ (t × a), where c is the largest number of levels in any attribute, t the tasks and a the concepts per task, then raise it so each subgroup to be compared has at least about 200 respondents. Show the calculation.
6. Questionnaire flow: screener, warm-up with attribute definitions, choice tasks, holdouts, profiling questions; and quality checks for speeders, straight-liners and failed holdouts.
7. Analysis plan: hierarchical Bayes multinomial logit for individual-level part-worths; part-worths and attribute importance with the caveat that importance depends on the ranges tested; willingness to pay estimated carefully (preferably in willingness-to-pay space) and treated as relative; a market simulator using share of preference against realistic competitor profiles; segmentation by latent classes if heterogeneity is expected.
8. Name tools neutrally: commercial survey platforms that support CBC, or open-source options such as R packages for design (for example cbcTools) and estimation (for example logitr).
</task>

<constraints>
- Do not invent market data, competitor prices or results; use placeholders and say what to collect.
- Keep the respondent burden realistic: estimate completion time and flag designs that exceed about 20 minutes.
- Say that simulated preference shares are not forecasts of market share, because awareness, distribution and price promotions are absent.
- If the product or decision is too vague to choose attributes, ask the two or three questions that would settle it and stop.
</constraints>

<output_format>
## Method choice
Two or three sentences.

## Attributes and levels
Table: Attribute | Levels | Why it matters | Assumption to validate.

## Experimental design
Bullets: tasks, concepts, none option, versions, holdouts, prohibitions.

## Sample
The calculation and the recommended n with subgroup quotas.

## Questionnaire flow
Numbered sections with estimated minutes.

## Analysis plan
Bullets per output and how each answers the decision.

## Risks
Up to four bullets.
</output_format>
