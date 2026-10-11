---
schema: 1
id: choose-review-recommendation
kind: prompt
title: Choose the right recommendation for a referee report
description: Calibrates a referee recommendation (accept, minor, major revision or reject) from the issues found, the journal's standards and whether the flaws can be fixed, and checks it matches the report.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher]
requires: [none]
inputs: [notes, document]
output: [report]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [reviewer-recommendation, referee-report, editorial-decisions, revise-and-resubmit]
pairs_with:
  prompts: [write-peer-review, write-confidential-comments-to-editor, review-revised-manuscript]
  personas: [peer-reviewer]
args:
  - name: issues
    description: The issues you found, ideally already split into major and minor, or your draft report.
    type: text
    required: true
  - name: journal
    description: The journal or venue and what you know of its standards, for example "selective general journal, novelty weighed heavily" or "sound-science journal that does not judge importance".
    type: string
    required: true
  - name: round
    description: Optional. Which review round this is, for example "first submission" or "second revision".
    type: string
output_contract:
  format: markdown
  sections: [Recommendation, How the issues sort, Why not the neighbouring options, What would change it, Report alignment]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Reviewers' recommendations vary widely for the same paper, and new reviewers in particular tend to recommend "major revision" by default or reject for fixable problems. Editors find a recommendation useful when it follows a clear logic. The deciding question is not how many issues there are but what kind. A fatal flaw (a design that cannot answer the question, a confound built into the data, a central claim the data contradict) points to reject, because no revision fixes it without a new study. Problems that need new analyses, new data within reach, or a substantial reframing of claims point to major revision. Clarifications, extra robustness checks and presentation point to minor revision. The venue matters: a sound-science journal does not reject for low novelty, while a selective journal may reject a sound paper whose contribution is too small for its readership, and the reviewer should say which criterion drives the call. Later rounds change the calculus: in a second revision, the question is whether the earlier issues were resolved, not whether new improvements are possible, and moving the goalposts is a common complaint about reviewers.
</context>

<task>
Help me choose my recommendation for {{journal}}{{#round}} ({{round}}){{/round}}.
<issues>
{{issues}}
</issues>

1. Sort each issue into fatal (cannot be fixed without a new study), major fixable (needs new analysis, data within reach or substantial rewriting of claims), minor, or a matter of taste or preference. Explain any that are hard to classify.
2. Weigh them against the venue's criteria: soundness only, or soundness plus novelty and importance.
3. For a later round, separate earlier issues (resolved or not) from new ones, and say whether new ones were caused by the revision or could have been raised earlier.
4. Recommend one option and say why not each neighbouring option.
5. State what would change the recommendation, for example a specific analysis result.
6. Check that the draft report, if supplied, matches the recommendation in tone and in the issues it calls major.
</task>

<constraints>
- Base the recommendation on the issues given. Do not invent new flaws or assess parts of the paper you have not seen.
- Never treat the authors' prestige, nationality or language as a factor.
- Do not default to "major revision" to avoid a decision; if the issues point to minor revision or reject, say so.
- Remind the user that the editor makes the decision and that the recommendation should be stated with its reasons.
</constraints>

<output_format>
## Recommendation
In bold, with two sentences.
## How the issues sort
Table: issue | category (fatal, major fixable, minor, preference) | reason.
## Why not the neighbouring options
## What would change it
## Report alignment
Mismatches between the report and the recommendation, or "Not supplied" or "Aligned".
</output_format>
