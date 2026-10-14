---
schema: 1
id: screen-manuscript-for-integrity-issues
kind: prompt
title: Screen a manuscript for research integrity red flags
description: Screens a manuscript for integrity red flags such as impossible numbers, tortured phrases, paper-mill patterns and citation oddities, and lists what to verify before raising a concern.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, editor]
requires: [none]
inputs: [document]
output: [report, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [research-integrity, paper-mills, data-anomalies, grim-test, image-integrity, manuscript]
pairs_with:
  prompts: [write-misconduct-concern-to-editor, review-statistical-methods, write-peer-review]
  personas: [peer-reviewer]
args:
  - name: manuscript
    description: The manuscript text, including tables, figure legends, references and declarations.
    type: text
    required: true
  - name: what_prompted_this
    description: What made you suspicious, if anything, so the screen can look there first.
    type: text
output_contract:
  format: markdown
  sections: [Scope of this screen, Findings, Innocent explanations, What to verify next, Bottom line]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Research-integrity sleuths and journal integrity teams look for patterns that are hard to produce honestly: means that cannot arise from integer data with the stated sample size (GRIM), standard deviations impossible for a bounded scale, percentages that do not match counts, p values that do not match their test statistics, identical decimals or standard deviations across groups, baseline tables too similar for randomisation, "tortured phrases" from paraphrasing tools ("counterfeit consciousness" for artificial intelligence), templated text and figures typical of paper mills, irrelevant or self-serving citation clusters, mismatched ethics approvals, and email domains or affiliations that do not fit. Each signal alone usually has an innocent explanation (rounding, a typo, a non-native writer, a shared template). What matters is a cluster of independent signals, documented carefully. Image duplication cannot be judged from text; it needs the original figures and specialist tools or the journal's integrity team.
</context>

<task>
Screen this manuscript for integrity red flags.
<manuscript>
{{manuscript}}
</manuscript>
{{#what_prompted_this}}
What prompted the check: {{what_prompted_this}}
{{/what_prompted_this}}

1. State what this screen can and cannot cover given that you only have the text (no images, raw data or similarity-check report).
2. Check numerical consistency: recompute percentages from counts, check sums and totals across tables, run GRIM-style checks on means of integer-scale data where n is given, check that SDs are possible for bounded scales, and recompute p values from reported test statistics and degrees of freedom. Show the working for each check.
3. Check the baseline table for implausible balance or identical values, and look for repeated decimals or identical SDs across conditions.
4. Check the language for tortured phrases, sudden style shifts, generic template sentences and leftover generation artefacts.
5. Check references for irrelevance to the claims, clusters of citations to one author or journal, and references that look malformed or unverifiable.
6. Check declarations: ethics approval details, consent, trial registration, funding, data availability and author contributions for gaps or mismatches with the study described.
7. For every finding, rate it as strong, moderate or weak, give the innocent explanation that should be ruled out, and say what would confirm or clear it.
</task>

<constraints>
- Report anomalies, not conclusions about misconduct. Never say or imply the authors fabricated data; say what is inconsistent and what would explain it.
- Show every calculation with its inputs. If a check needs data the text does not give, say so rather than guessing.
- Do not treat a single weak signal, non-native English or an unfamiliar institution as evidence of anything.
- Do not claim a reference is fake; say it could not be matched from the details given and should be checked in a database.
- Remind the user that concerns go confidentially to the editor, not to the authors, colleagues or social media, and that the manuscript is confidential.
</constraints>

<output_format>
## Scope of this screen
Two or three sentences.
## Findings
A table: check | finding | working | strength (strong, moderate, weak).
## Innocent explanations
For each moderate or strong finding, the explanation to rule out.
## What to verify next
Numbered, including what only the editor or integrity team can do (raw data, original images, similarity report).
## Bottom line
No concerns, minor inconsistencies to query, or a cluster worth a confidential note to the editor.
</output_format>
