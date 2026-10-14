---
schema: 1
id: review-ml-conference-paper
kind: prompt
title: Review a machine learning conference paper
description: Reviews an ML conference submission for claims, baselines, ablations, data leakage, statistical reliability and compute, in the strengths, weaknesses, questions and score format.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, ml-engineer, data-scientist]
requires: [none]
inputs: [document]
output: [report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [ml-research, conference-review, ablation, benchmarks, data-leakage, openreview]
pairs_with:
  prompts: [respond-to-author-rebuttal, write-meta-review, assess-reproducibility]
  personas: [peer-reviewer]
args:
  - name: paper
    description: The submission text, including experiments, tables and the appendix you have.
    type: text
    required: true
  - name: venue_form
    description: The venue's review form fields and scoring scale, pasted, so the output matches it. If omitted, a common format is used.
    type: text
  - name: my_expertise
    description: Your area and how confident you are on this topic, to set the confidence score honestly.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Strengths, Weaknesses, Questions for the authors, Limitations and broader impact, Scores]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
ML conference reviewing has its own failure modes. Reviewers reject on "limited novelty" without saying what prior work it duplicates, or on "not state of the art" when the paper's claim is something else; they demand experiments on one more dataset regardless of relevance. Authors, meanwhile, over-claim from single-seed results, compare against weakly tuned baselines or numbers copied from older papers with different settings, tune on the test set, leak test data through pretraining corpora or preprocessing, omit ablations that isolate the claimed contribution, and hide compute budgets that make comparisons unfair. A useful review states the paper's actual claims, checks whether the experiments test those claims, asks specific questions whose answers could change the score, and gives a calibrated score with a confidence that reflects the reviewer's expertise.
</context>

<task>
Review this submission.
<paper>
{{paper}}
</paper>
{{#venue_form}}
<review_form>
{{venue_form}}
</review_form>
{{/venue_form}}
{{#my_expertise}}
My expertise: {{my_expertise}}
{{/my_expertise}}

1. State the paper's claims precisely, separating the main contribution from secondary ones.
2. For each claim, check whether the experiments test it: datasets and splits, baselines (are they current, tuned with comparable effort and compute, run by the authors or copied), ablations isolating the contribution, number of seeds and variance or confidence intervals, and significance of differences.
3. Check for leakage and evaluation problems: tuning on test data, overlap between training or pretraining data and benchmarks, metric choice, and cherry-picked qualitative examples.
4. Check novelty only against prior work the paper itself cites or that you can name confidently; otherwise ask the authors to position against a described line of work.
5. Check reproducibility: hyperparameters, compute, code and data availability, and enough detail to reimplement.
6. Check the limitations and broader-impact discussion for honesty.
7. Write questions whose answers could change your score, and say which would.
8. Give scores on the venue's scale (or a soundness, presentation, contribution and overall score with confidence) that follow from the weaknesses.
</task>

<constraints>
- Every weakness is specific and actionable; "limited novelty" must name the overlapping work or be dropped.
- Do not ask for experiments unrelated to the claims, or penalise a paper for not being state of the art when that is not its claim.
- Never invent citations, benchmark numbers or prior results. If you suspect prior work exists but cannot name it, say so as a question.
- Set confidence honestly from the stated expertise; do not default to high confidence.
- Start with one line reminding the reviewer that submissions are confidential and that many ML venues restrict or forbid LLM use in reviewing.
</constraints>

<output_format>
One reminder line, then:
## Summary
The claims in three to five sentences, without judgement.
## Strengths
Bullets.
## Weaknesses
Numbered, most serious first, each with a request.
## Questions for the authors
Numbered; mark those that could change the score.
## Limitations and broader impact
Two to four sentences.
## Scores
Each score with a one-line justification, then confidence.
</output_format>
