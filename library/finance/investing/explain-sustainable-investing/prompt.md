---
schema: 1
id: explain-sustainable-investing
kind: prompt
title: Explain sustainable investing
description: Explains ESG and sustainable investing approaches, what fund labels do and do not guarantee, greenwashing warning signs, and how to read a fund's sustainability disclosures against your values.
category: investing
version: 1.0.0
status: incubating
stage: [learn, review]
role: [individual]
requires: [none]
inputs: [text, document]
output: [explanation, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [esg, sustainable-investing, greenwashing, ethical-investing, impact-investing]
pairs_with:
  prompts: [explain-fund-document, check-portfolio-diversification, explain-investment-concept]
  personas: [investing-educator]
args:
  - name: fund_or_question
    description: A question about sustainable investing, or pasted text from a fund's factsheet, sustainability report or marketing (name, objective, exclusions, top holdings, label). Optional; a general explainer is given without it.
    type: text
  - name: values
    description: What you care about - for example no fossil fuels, no weapons, climate transition, social issues, active voting on company boards. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Short answer, Approaches compared, What labels do and do not guarantee, Checking this fund against your values, Greenwashing warning signs, Questions to ask the provider]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Sustainable", "ESG", "responsible", "green" and "impact" describe very different things. A fund that integrates ESG risk data may still own oil companies; an exclusion fund may only exclude companies earning more than a set share of revenue from an activity; an impact fund aims for measurable outcomes; a stewardship-led fund may hold controversial companies precisely to vote and engage. ESG ratings from different providers often disagree with each other. Regulatory labels and disclosure regimes (for example the EU's SFDR classifications, the UK's sustainability labels under its disclosure rules, and naming rules in several markets) set disclosure and naming standards, not a promise about what a fund owns. People get misled when they assume the word on the tin matches their values. The job is to translate their values into approaches and then check a fund's own documents against them.

{{#fund_or_question}}<input>
{{fund_or_question}}
</input>{{/fund_or_question}}
{{#values}}Values: {{values}}{{/values}}
</context>

<task>
1. Short answer: answer their question or summarise the fund in three or four sentences. If no input is given, give a compact explainer and ask what they care about.
2. Approaches compared: exclusion or negative screening, ESG integration, best-in-class or positive tilt, thematic, impact, and stewardship or engagement. For each: what it does, what it does not do, and how it maps to the person's stated values.
3. What labels do and do not guarantee: explain the regimes relevant to the person's region where you are confident (for example SFDR Article 8 and 9 as disclosure categories, the UK labels and anti-greenwashing rule, fund naming rules), note that these rules are being revised in several places and must be checked for the current version, and state plainly that no label guarantees the absence of any particular industry.
4. Checking this fund against your values: if fund text is given, check the stated objective, the exclusion list and its revenue thresholds, the index methodology if passive, top holdings and sector weights against the values, the voting and engagement policy, and costs versus a comparable non-ESG fund. Mark each as consistent, inconsistent, or cannot tell from this text. If no fund is given, give this as a checklist.
5. Greenwashing warning signs: vague claims without metrics, big words and small exclusions, a name stronger than the policy, cherry-picked case studies, holdings that contradict the marketing, no voting record, claims of guaranteed outperformance.
6. Questions to ask the provider: 6-8 specific questions (exact exclusion thresholds, share of assets meeting the sustainability objective, how ratings are sourced, voting record on climate and social resolutions, what happens if a holding breaches the policy).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Judge only from the text supplied plus general knowledge of how these approaches and regimes work. Do not claim to know a specific fund's current holdings, rating or label beyond the text.
- Do not recommend funds or claim sustainable funds will outperform or underperform; say the evidence is mixed and depends on period and method.
- Respect the person's values as theirs; do not argue for or against them.
- Mark regulatory details you are not sure are current as "check the current rules".
{{> output/uncertainty}}
</constraints>

<output_format>
## Short answer
Three or four sentences.

## Approaches compared
Table: approach | what it does | what it does not do | fit with your values.

## What labels do and do not guarantee
Bullets.

## Checking this fund against your values
Table: check | what the text says | verdict (consistent, inconsistent, cannot tell). Or a checklist if no fund was given.

## Greenwashing warning signs
Bullets, marking any found in the text.

## Questions to ask the provider
Numbered.
</output_format>
