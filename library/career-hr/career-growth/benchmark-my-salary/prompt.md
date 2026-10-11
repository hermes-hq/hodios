---
schema: 1
id: benchmark-my-salary
kind: prompt
title: Benchmark my salary
description: Works out a fair pay range for your role, level and location from salary data you gather, how much to trust each source, and where your current pay sits in that range.
category: career-growth
version: 1.0.0
status: incubating
stage: [discover]
role: [individual, job-seeker, software-engineer]
requires: [none]
inputs: [text, notes]
output: [table, report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [salary-research, market-pay, compensation, pay-benchmark]
pairs_with:
  prompts: [ask-for-raise, negotiate-job-offer, answer-salary-expectations]
  personas: [career-coach]
args:
  - name: role
    description: Your job title, what you actually do, level or years of experience, industry, company size or type, and the city or country (or remote market) you are paid against.
    type: text
    required: true
  - name: data_points
    description: Salary figures you have gathered so far, each with its source and date (job ads with pay ranges, salary surveys, crowd-sourced sites, recruiter quotes, peers' figures). Paste them as they are.
    type: text
  - name: current_pay
    description: Your current base pay plus bonus, equity and notable benefits, with currency.
    type: string
output_contract:
  format: markdown
  sections: [Your job match, Sources to gather, Source quality, Your market range, Where you sit, Gaps and next checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people find out what their work is worth before a raise talk, an offer or a job move. Most people benchmark badly: they search their job title, take the first number they see and compare it with their base pay. Experts benchmark the job, not the title (a "senior analyst" at one company is a junior at another), match on level, location and company type, compare like with like (base with base, total cash with total cash), weigh each source by sample size, recency and who reported it, and express the answer as a range with a median and upper quartile rather than one figure. Job ad ranges show what employers say they will pay new hires; surveys show what people are paid; crowd-sourced figures skew toward certain companies and roles.

<role>
{{role}}
</role>
{{#data_points}}
<data_points>
{{data_points}}
</data_points>
{{/data_points}}
{{#current_pay}}Current pay: {{current_pay}}{{/current_pay}}
</context>

<task>
1. Your job match: restate the job by its real content (scope, level, people managed, specialism) and list two to four equivalent titles used in the market, so the search covers the job rather than one label. Flag anything that would put the role in a different pay band, such as managing people, a scarce specialism or a regulated licence.
2. Sources to gather: name the types of source to check for this role and location (job ads that publish pay ranges, especially where pay transparency laws require them; official wage statistics; professional body or industry salary surveys; recruiter salary guides and conversations; crowd-sourced compensation sites; peers in similar roles elsewhere). For each, say what figure to record (base, total cash, total compensation), the level and location to filter on, and the date.
3. Source quality: if data points were given, put each in a table and rate it high, medium or low on match to the job, sample size, recency and bias, with a one-line reason. Convert figures to the same basis (annual, same currency, base versus total) before comparing, and show the conversion.
4. Your market range: from the usable data only, give a low, median and upper-quartile figure for base pay and, if the data allows, for total cash. Show which data points produced each figure. If fewer than three good data points exist, say the range is provisional.
5. Where you sit: place their current pay in the range as a position (for example below the low end, around the median, near the top), and list the factors that justify sitting higher or lower (performance, scope, scarce skills, cost of living, the company's pay philosophy, equity or benefits that offset base).
6. Gaps and next checks: the missing data that would most change the answer, and two or three concrete checks to close the gap this week.
</task>

<constraints>
- Do not state market salary figures from memory as fact. Work only from the data points given; if you mention a typical range to orient them, label it unverified and do not use it in the calculation.
- Show every calculation (averages, conversions, percentages) so it can be checked. Do not mix base pay and total compensation in one number.
- Do not suggest obtaining colleagues' pay data in breach of confidentiality; voluntary sharing between peers is their choice and is legally protected in some countries, so tell them to check local rules.
- If location, level or the job content is missing, ask for it and keep the answer provisional.
</constraints>

<output_format>
## Your job match
Job content in one paragraph, then equivalent titles.
## Sources to gather
Table: Source type | Figure to record | Filters | Notes.
## Source quality
Table: Data point | Basis | Annualised figure | Match | Rating | Reason.
## Your market range
Table: Measure | Low | Median | Upper quartile | Based on.
## Where you sit
## Gaps and next checks
</output_format>
