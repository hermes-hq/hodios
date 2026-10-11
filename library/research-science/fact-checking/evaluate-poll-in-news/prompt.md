---
schema: 1
id: evaluate-poll-in-news
kind: prompt
title: Evaluate an opinion poll reported in the news
description: Evaluates an opinion poll as reported in a story or press release, covering who paid for it, question wording, sample, method and margin of error, and whether the headline follows from it.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [editor, writer, researcher, individual]
subject: [statistics, social-sciences]
requires: [none]
inputs: [document, text]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [opinion-polls, question-wording, margin-of-error, sampling-bias]
pairs_with:
  prompts: [check-statistics-in-article, compute-survey-margin-of-error, analyze-spin-in-article]
  personas: [statistician]
args:
  - name: poll_report
    description: The article or press release about the poll, plus any methodology note, data tables or question wording you have.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Poll basics, Problems, What the poll does support, Questions to ask the pollster]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A poll is only as good as its question, its sample and its reporting. Reputable pollsters publish who commissioned the poll, the exact question wording and order, the fieldwork dates, the population, the mode (phone, online panel, face to face), the sample size, how results were weighted and full data tables. Common distortions: a leading or loaded question; an opt-in website or social media poll reported as public opinion; a "lead" smaller than the margin of error presented as a lead; subgroup results from a few dozen respondents; "don't know" removed to inflate a majority; a single poll treated as a trend; and a press release from an interested party quoting only the favourable question. The margin of error covers random sampling only, not bad questions or unrepresentative panels.
</context>

<task>
Evaluate this poll as reported:
<poll_report>
{{poll_report}}
</poll_report>

1. Fill in the poll basics from the material: commissioner, pollster, population, mode, fieldwork dates, sample size, weighting, exact question wording. Mark each missing item "not stated".
2. Check the question: leading wording, false choices, missing "don't know", order effects, and whether the question asked matches the claim made.
3. Check the sample: opt-in or probability-based, population fit, and size for each subgroup reported. Where the sample size is stated, estimate the approximate margin of error for a 50% result (about 1 divided by the square root of n) and show the arithmetic.
4. Check the reporting: is any reported gap or change smaller than the uncertainty (the uncertainty on a lead between two options in one poll, or on a change between two polls, is larger than on a single share, up to roughly double), is a single poll called a trend, are "don't know" answers dropped, and does the headline go beyond the question asked?
5. State what the poll does support, worded accurately.
</task>

<constraints>
- Use only the material supplied. Do not supply missing wording, dates or sample sizes from your own knowledge; mark them "not stated" and say how that limits the judgement.
- The approximate margin of error is a rough guide for simple random samples; say that weighting and design effects usually make the real uncertainty larger.
- Do not dismiss a poll only because of who paid for it; check whether the method and question are sound.
- If the material contains no poll, say so and stop.
</constraints>

<output_format>
## Verdict
One rating in bold (Sound and fairly reported, Sound but over-reported, Weak method, Cannot judge from this material), then two sentences.
## Poll basics
Table: item | value or "not stated".
## Problems
Table: issue | evidence from the material | effect on the conclusion.
## What the poll does support
One or two accurate sentences, with the arithmetic for any margin of error.
## Questions to ask the pollster
Bullets: the missing items that would settle the open questions.
</output_format>
