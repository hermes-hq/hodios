---
schema: 1
id: check-trend-claim-against-data
kind: prompt
title: Check a "rising" or "falling" claim against the data
description: Checks a claim that something is rising or falling, such as crime, prices or migration, against official data, choosing the dataset, rates or counts, the time window and revisions.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [writer, editor, individual, data-analyst]
subject: [statistics, social-sciences]
requires: [web]
inputs: [text]
output: [report]
risk: network
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [official-statistics, time-series, base-rates, cherry-picking, political-claims]
pairs_with:
  prompts: [trace-statistic-to-source, check-statistics-in-article, assess-dataset-reliability]
  personas: [fact-checker]
args:
  - name: claim
    description: The trend claim in the words used, with who said it and when, for example "Knife crime has doubled since 2015".
    type: text
    required: true
  - name: place
    description: The country, region or city the claim is about.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Verdict, What the claim says, What the data show, Why the picture can differ, Accurate version]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Trend claims are often technically defensible and still misleading because of the choices behind them. The usual levers are the start year (picking a low point makes any rise look large), counts versus rates (a growing population raises counts without any change in risk), which dataset (police-recorded crime reflects reporting and recording practice; victimisation surveys measure experience but miss some offences), changes in definitions or recording rules that create a break in the series, seasonal effects, small numbers that swing randomly, and provisional figures later revised. Two honest people can cite different official series and both be "right", so a good check names the measure that best fits the claim and shows what the alternatives say. The longer view and the comparison with similar places usually settle whether a change is unusual.
</context>

<task>
Check this trend claim about {{place}}.
<claim>
{{claim}}
</claim>

1. Restate the claim: the quantity, the direction, the size of change, the period and the place. Note what the speaker would need to be true.
2. Find the official or most authoritative data series for it (the national statistics office, the relevant ministry or agency, a recognised survey), and any second series that measures it differently.
3. Reproduce the claimed comparison exactly, then show the trend over a longer period, as a rate per head where population matters, and with the latest revised figures.
4. Check for breaks in the series: changes in definitions, recording practice or coverage, and whether the latest figures are provisional.
5. Give a verdict and an accurate one-sentence version of the claim.
</task>

<constraints>
- Use only figures from pages or datasets you opened in this session, with the table or release name, link and date. Never state a figure from memory.
- If you have no web access, say so, give no verdict, and name the series to check and the comparisons to run.
- Show your arithmetic for any percentage change or rate you compute, and state the population figures used.
- Where datasets disagree, report both and explain why, rather than picking the one that fits a conclusion.
- Do not judge the speaker's politics or the policy debate. Check the number.
</constraints>

<output_format>
## Verdict
One of: accurate, accurate but misleading, partly accurate, inaccurate, or cannot be checked with available data. Then two sentences.
## What the claim says
## What the data show
Table: year or period | value | rate (if relevant) | source. Then the arithmetic.
## Why the picture can differ
Bullets: start year, counts versus rates, dataset choice, recording changes, revisions, as they apply.
## Accurate version
One sentence.
</output_format>
