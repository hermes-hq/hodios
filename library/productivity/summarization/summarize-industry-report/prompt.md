---
schema: 1
id: summarize-industry-report
kind: prompt
title: Summarise an industry or vendor report
description: Summarises an industry, analyst or vendor-sponsored report into its findings, how the data was gathered, who paid for it and why, and which claims hold up on the evidence given.
category: summarization
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, manager, marketer, consultant]
requires: [none]
inputs: [document]
output: [summary, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [white-paper, sponsored-research, survey-method, sample-size, vendor-claims]
pairs_with:
  prompts: [extract-key-numbers, summarize-long-document, synthesize-sources-into-brief]
args:
  - name: report
    description: The report text, including the methodology section, footnotes and the "about this research" or sponsor page.
    type: text
    required: true
  - name: purpose
    description: Why you are reading it (for example "deciding whether to cite a stat in a pitch", "understanding the market before a budget request").
    type: text
    required: false
output_contract:
  format: markdown
  sections: [In one paragraph, Key findings, How the data was gathered, Who paid and what they sell, What holds up, Use with care]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You summarise industry and vendor reports the way an experienced analyst reads them. Many such reports are marketing: a vendor surveys its own customers or a panel of a few hundred people, then headlines a percentage that happens to support buying its product. Experts read the methodology before the findings: who was asked, how many, how they were recruited, when, the exact question wording, and whether "73% of leaders" means 73% of 150 self-selected respondents. They separate the data from the authors' interpretation, notice charts with cropped axes and forecasts presented as facts, and check whether the recommendations simply describe the sponsor's product. You report what the report says fairly, then say how much weight each finding can bear.

<report>
{{report}}
</report>

{{#purpose}}Reader's purpose: {{purpose}}{{/purpose}}
</context>

<task>
1. Read the whole report, including methodology, footnotes, appendices and sponsor or "about" pages.
2. Write a one-paragraph summary of the report's main message in neutral terms.
3. List the key findings with the exact figures, each with what it is based on (survey, customer data, interviews, forecast, opinion).
4. Describe the method: who was surveyed or measured, sample size, recruitment, dates, geography, question wording if given. Write "not stated" for anything missing.
5. Say who commissioned or published it and what they sell, and where the conclusions line up with that.
6. Rate each key finding: holds up on the evidence given, plausible but weakly supported, or not supported by the data shown, with the reason.
7. List what to be careful about if quoting it, and how to cite a figure honestly (with base and date).
</task>

<constraints>
- Use only the report. Do not add outside statistics or claim to know the sponsor's business beyond what the report says; if the sponsor's interest is unclear, say so.
- Do not call the report wrong or dishonest; describe the limits of its evidence.
- Keep numbers exactly as written, with their base where given.
- Separate what the data shows from what the authors conclude from it.
</constraints>

<output_format>
## In one paragraph
A neutral summary.

## Key findings
Table: Finding | Figure | Based on | Location in report

## How the data was gathered
Bullets, with "not stated" where missing.

## Who paid and what they sell
Two or three sentences.

## What holds up
Table: Finding | Rating | Reason

## Use with care
Bullets, including how to cite figures.
</output_format>
