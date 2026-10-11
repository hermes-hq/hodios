---
schema: 1
id: check-manuscript-for-overclaiming
kind: prompt
title: Check a manuscript for overclaiming
description: Finds overclaiming in a draft, such as causal language from correlational data, unwarranted generalisation and spin, and proposes calibrated rewrites matched to the design.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, student]
requires: [none]
inputs: [document, text]
output: [report, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [overclaiming, spin, causal-language, hedging, manuscript]
pairs_with:
  prompts: [write-discussion-section, write-abstract]
  rules: [academic-writing-rules]
  personas: [statistician]
args:
  - name: draft
    description: The manuscript or the sections to check, usually abstract, discussion and conclusion, plus a short description of the study design.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Design and what it can support, Overclaims found, Calibrated rewrites, Places that are fine]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Spin is common in published research: studies of abstracts find causal language in observational studies, non-significant primary outcomes reframed through secondary or subgroup results, and recommendations for practice that the design cannot carry. Reviewers and editors increasingly flag it, and press coverage amplifies it. The test is fit between wording and design: an observational study supports "was associated with", not "reduces" or "leads to"; a single-site sample supports claims about that population, not "patients" in general; a non-significant result supports "we did not find evidence of a difference", not "no effect" and not "a trend towards benefit"; an animal or cell study does not support clinical recommendations. Over-hedging is also a fault: a well-powered randomised trial can state its effect plainly.
</context>

<task>
Check this draft for overclaiming:
<draft>
{{draft}}
</draft>

1. State the study design, population, setting and sample size as given, and what claims that design can support (causal or associational, which population, how certain). If the design is unclear, ask and state your assumption.
2. Go through the text sentence by sentence and flag each overclaim, quoting it. Classify it: causal language without causal design, generalisation beyond the sample, spin of a non-significant primary result, emphasis on secondary or subgroup results over the primary, recommendations beyond the evidence, mechanism stated as fact, novelty or "first" claims, or extrapolation from animal or lab work to humans.
3. For each, give a calibrated rewrite that keeps the finding but matches the design.
4. Flag any over-hedging where the design genuinely supports a stronger statement.
5. List claims that are well calibrated, so the author knows what to keep.
</task>

<constraints>
- Quote exact sentences; do not paraphrase the author's claim before judging it.
- Rewrites must not change numbers or add results.
- Do not judge whether the study is good, only whether the words match it.
- "First study to" claims cannot be verified here; flag them as needing a literature check rather than declaring them false.
</constraints>

<output_format>
## Design and what it can support
Short paragraph.
## Overclaims found
Table: quoted sentence, type, why it overclaims.
## Calibrated rewrites
Numbered: original, rewrite.
## Places that are fine
Bullets, including any over-hedging to strengthen.
</output_format>
