---
schema: 1
id: assess-dataset-reliability
kind: prompt
title: Assess a dataset before you cite or analyse it
description: Assesses whether a dataset is fit to cite or analyse, covering who collected it and why, coverage, definitions, method changes, revisions, missing data and known limitations.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [writer, researcher, data-analyst, student]
requires: [web]
inputs: [dataset, url, text]
output: [report, checklist]
risk: network
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [data-provenance, data-quality, official-statistics, metadata, data-journalism]
pairs_with:
  prompts: [check-trend-claim-against-data, evaluate-source-credibility, trace-statistic-to-source]
  personas: [fact-checker]
args:
  - name: dataset
    description: The dataset's name, publisher and link, and its documentation or a sample of rows if you have them.
    type: text
    required: true
  - name: planned_use
    description: What you want to say or compute with it, for example "compare hospital waiting times across regions since 2018".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Who made it and how, Fitness for your use, Known limitations, Checks before use]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Data journalists and analysts treat every dataset as a source with its own interests and blind spots. Data collected for administration (tax records, police reports, hospital admissions) measures activity of the organisation, not the underlying reality, so it changes when practice changes. Survey data has sampling error, nonresponse and question-wording effects. Scraped, crowdsourced and vendor datasets often have undocumented coverage and no method notes. The common traps are a definition that does not match the planned use, coverage gaps (regions, years or groups missing), a break in the series after a method change, provisional figures later revised, duplicate or placeholder values (zeros, 999), units that change between years, and aggregation that hides the variation that matters. The documentation (methodology notes, release notes, quality reports, data dictionaries) usually states these limits; reading it before analysis is the step most people skip.
</context>

<task>
Assess this dataset for this use: {{planned_use}}
<dataset>
{{dataset}}
</dataset>

1. Establish provenance: publisher, who collected the data and for what purpose, how (administrative, survey, sensor, scraped, modelled), how often it is updated, and whether it is an official or accredited statistic.
2. Read the documentation you can find: definitions of the key variables, units, coverage (places, periods, populations), sampling and response rates for surveys, and revision policy.
3. Look for breaks and changes: method or definition changes, boundary changes, new data sources, and periods marked provisional or experimental.
4. If rows were supplied, check them for missing values, placeholder codes, duplicates, impossible values and unit inconsistencies, and say what the sample suggests.
5. Judge fitness for the planned use, naming the specific comparisons that are safe and those that are not.
6. List the checks still needed before publishing anything from it, including whom to ask (the publisher's statistics contact).
</task>

<constraints>
- Describe documentation only from pages you opened in this session, with links. Never invent a methodology, sample size or revision history.
- If you have no web access, say so and limit the assessment to the supplied material, listing what to look up.
- Separate what the documentation states from what you infer from the data sample.
- Do not reject a dataset for having limits; every dataset does. Say what it can support.
- Do not run or suggest analyses beyond the fitness question unless asked.
</constraints>

<output_format>
## Verdict
One of: fit for this use, fit with stated caveats, fit only for a narrower use, or not fit. Then two sentences.
## Who made it and how
## Fitness for your use
Safe comparisons and unsafe comparisons, as two bullet lists.
## Known limitations
Table: limitation | effect on your use | source.
## Checks before use
Checklist.
</output_format>
