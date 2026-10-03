---
schema: 1
id: brief-court-case
kind: prompt
title: Brief a court case
description: Writes a case brief for law students or paralegals covering facts, procedural history, issues, holding, reasoning, separate opinions and significance, with pinpoint references to the text.
category: unsorted
proposed_category: legal-practice
version: 1.0.0
status: incubating
stage: [learn, discover]
role: [student, legal-professional]
subject: [law]
requires: [none]
inputs: [document]
output: [summary, explanation]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [case-brief, judicial-opinions, irac, holding-and-dicta]
pairs_with:
  prompts: [draft-legal-research-memo, summarize-paper]
  personas: [paralegal]
args:
  - name: case_text
    description: The full text of the judgment or opinion, including the case name, court, date and any headnote, with paragraph or page numbers if the source has them. A summary alone is not enough.
    type: text
    required: true
  - name: jurisdiction
    description: The legal system and court level, for example "US federal, Supreme Court", "England and Wales, Court of Appeal" or "Canada, Ontario Superior Court". Optional; usually readable from the text.
    type: string
output_contract:
  format: markdown
  sections: [Citation, Facts, Procedural history, Issues, Holding, Reasoning, Separate opinions, Rule, Significance, Questions for class or the attorney]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write case briefs the way a top law student or a litigation paralegal does for a supervising attorney: short, exact and anchored to the text. A brief is a tool for recall and argument, not a retelling. The parts that matter most are the precise issue the court decided, the holding stated narrowly enough to be accurate, the reasoning steps the court actually relied on, and how the case fits into the law around it. Common mistakes: stating the holding too broadly, confusing dicta with the holding, losing track of who is the appellant, and importing facts or later history that are not in the opinion.
{{#jurisdiction}}

Jurisdiction and court: {{jurisdiction}}
{{/jurisdiction}}
</context>

<task>
Opinion:

<case>
{{case_text}}
</case>

1. Citation: case name, court, date, and citation as given in the text. Do not create a citation that is not in the text; write "[citation not in text]".
2. Facts: the legally relevant facts only, in a short paragraph, with who the parties are and their roles (plaintiff or claimant, defendant, appellant, respondent).
3. Procedural history: how the case reached this court and what the lower courts decided.
4. Issues: each legal question the court answered, phrased as a yes or no question that combines the rule and the key facts ("Does X, where Y, ...?").
5. Holding: the answer to each issue, stated narrowly, plus the disposition (affirmed, reversed, remanded, allowed, dismissed).
6. Reasoning: the steps the court took, numbered, each with a pinpoint reference (paragraph or page) to the text. Separate the reasoning necessary to the decision from observations that look like dicta, and label them.
7. Separate opinions: concurrences and dissents, their main point and why they differ, with pinpoint references. If none, say so.
8. Rule: the legal rule the case stands for, in one or two sentences, worded as the opinion supports.
9. Significance: what the case changed or confirmed, based on what the opinion says about earlier law. Do not describe later treatment (overruled, followed, criticised) unless the user supplied it; add "check current treatment in a citator" instead.
10. Questions useful for class discussion or for the attorney: limits of the holding, how different facts would change it, tensions with other authority cited in the opinion.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the supplied text. Never invent facts, quotations, paragraph numbers, citations or later history. Quotations must be exact and short.
- Do not apply the case to anyone's real situation or say how a current dispute would be decided. If the user asks, say that is a question for a lawyer who knows the facts and current law.
- If the text is incomplete (missing pages, only a headnote or summary), say what is missing and brief only what the text supports.
- Keep the brief to about one page, excluding the questions.
{{> output/uncertainty}}
</constraints>

<output_format>
## Citation
One line.

## Facts
One short paragraph.

## Procedural history
Two to four bullets.

## Issues
Numbered questions.

## Holding
Numbered answers matching the issues, plus the disposition.

## Reasoning
Numbered steps with pinpoint references; dicta labelled.

## Separate opinions
Bullets or "None".

## Rule
One or two sentences.

## Significance
Two to four sentences, plus "check current treatment".

## Questions for class or the attorney
Three to five numbered questions.
</output_format>
