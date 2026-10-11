---
schema: 1
id: plan-umbrella-review
kind: prompt
title: Plan an umbrella review
description: Plans an umbrella review (review of systematic reviews) with eligibility, search, overlap handling, AMSTAR 2 or ROBIS appraisal, discordance checks and how findings are summarised and graded.
category: literature-review
version: 1.0.0
status: incubating
stage: [plan, design]
role: [researcher, student]
requires: [none]
inputs: [topic, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [umbrella-review, overview-of-reviews, systematic-review, evidence-synthesis, primary-study-overlap]
pairs_with:
  prompts: [write-systematic-review-protocol, build-search-string, appraise-study-quality, write-summary-of-findings-table]
  personas: [research-librarian, research-methodologist]
args:
  - name: question
    description: The broad question the umbrella review answers, for example "what interventions reduce loneliness in older adults living at home".
    type: text
    required: true
  - name: context
    description: Optional. What you already know (roughly how many reviews exist, known overlap), the team size, deadline and who will use the result.
    type: text
output_contract:
  format: markdown
  sections: [Is an umbrella review right, Question and eligibility, Search, Selection and extraction, Overlap and discordance, Quality and certainty, Synthesis and reporting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An umbrella review (overview of reviews) collects and evaluates systematic reviews rather than primary studies. It suits broad questions where several reviews already exist, for example comparing many interventions for one condition or many outcomes of one exposure. Its specific hazards are ones a standard review protocol does not cover: the same primary studies appear in several reviews, so counting reviews double-counts evidence (overlap is measured with a citation matrix and the corrected covered area, CCA); reviews disagree, and the reason is often eligibility, search dates or analysis choices rather than the evidence (discordance); reviews vary widely in quality, judged with AMSTAR 2 (confidence in the review) or ROBIS (risk of bias in the review), which are not the same thing; and authors must decide whether to re-analyse primary data or report the reviews' results as published. Reporting follows PRIOR (Preferred Reporting Items for Overviews of Reviews), with methods guidance in the Cochrane Handbook chapter on overviews and the JBI manual.
</context>

<task>
Plan an umbrella review for:
<question>
{{question}}
</question>
{{#context}}
<context_notes>
{{context}}
</context_notes>
{{/context}}

1. Test fit: say whether an umbrella review, a new systematic review, an update of an existing review or a scoping review fits better, given how many reviews likely exist and how current they are. Recommend one and stop at a short explanation if the umbrella review is the wrong choice.
2. Write the question in PICO, PECO or PCC form and the eligibility criteria for reviews: what counts as a systematic review (minimum methods, such as a documented search of at least two databases and inclusion criteria), review types included (with or without meta-analysis, qualitative syntheses), date limits with a reason, language.
3. Plan the search: databases that index reviews (for example MEDLINE, Embase, the Cochrane Database of Systematic Reviews, Epistemonikos, PROSPERO for ongoing reviews), a validated systematic-review search filter to look up, and how to handle review updates and multiple publications of one review.
4. Plan selection and extraction: two independent reviewers, the extraction form fields (review question, search date, number and design of included studies, populations, outcomes, effect estimates with CIs, heterogeneity, the review's own certainty ratings).
5. Plan overlap and discordance: build a citation matrix of primary studies by review, calculate CCA overall and per outcome, set a rule for which review to use when overlap is high (for example most recent, highest AMSTAR 2 rating, most complete), and plan how discordant conclusions are explained (a tool such as the Jadad decision algorithm or a structured comparison of eligibility, search date and analysis).
6. Plan appraisal and certainty: AMSTAR 2 or ROBIS with a reason for the choice, done in duplicate; how primary-study risk of bias reported in the reviews is used; GRADE per outcome, either taken from reviews or re-assessed, with a rule for when re-assessment is needed.
7. Plan synthesis and reporting: a summary table by outcome, whether any re-analysis is done and on what grounds, an evidence map if the scope is broad, PRIOR reporting and protocol registration.
</task>

<constraints>
- Do not name specific existing reviews, their results or counts unless the user supplied them; describe what to search for instead.
- Never treat the number of reviews reaching a conclusion as the strength of evidence; tie strength to unique primary studies and certainty.
- Keep AMSTAR 2 (overall confidence, with critical domains) and ROBIS (risk of bias) distinct and do not add up AMSTAR 2 items into a score.
- If the question is narrow enough that one or two good reviews answer it, say so instead of planning a large overview.
</constraints>

<output_format>
## Is an umbrella review right
Recommendation and a short comparison with the alternatives.
## Question and eligibility
The structured question and a table of criteria (criterion | include | exclude | reason).
## Search
Sources, filter approach and handling of updates.
## Selection and extraction
Process and the extraction field list.
## Overlap and discordance
Citation matrix, CCA thresholds and the decision rules.
## Quality and certainty
Tool choice, process and GRADE approach.
## Synthesis and reporting
Summary table template, re-analysis rule, PRIOR and registration.
</output_format>
