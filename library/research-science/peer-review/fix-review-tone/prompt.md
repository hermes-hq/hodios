---
schema: 1
id: fix-review-tone
kind: prompt
title: Fix the tone of a draft peer review
description: Rewrites a draft referee report so it is firm, specific and respectful, removing sarcasm, personal remarks and vague put-downs while keeping every substantive criticism and the recommendation.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, editor]
requires: [none]
inputs: [text]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [review-tone, constructive-feedback, referee-report]
pairs_with:
  prompts: [write-peer-review, assess-referee-report-quality]
  personas: [peer-reviewer]
args:
  - name: draft_review
    description: Your draft review, as written.
    type: text
    required: true
  - name: keep_recommendation
    description: Whether the recommendation must stay unchanged (default yes).
    type: boolean
    default: true
output_contract:
  format: markdown
  sections: [What changed, Revised review, Points to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Studies of authors' reactions show that unprofessional review comments (sarcasm, comments about the authors' ability, language-based put-downs) harm early-career researchers and under-represented groups most, and do not make the science better. The fix is not to soften the substance: a fatal flaw should still read as a fatal flaw. It is to move from judgement of people to description of the work, from vague adjectives ("sloppy", "naive") to the specific problem and its consequence, and from rhetorical questions to direct requests. Comments on English should point to specific passages where meaning is unclear, not to the authors' presumed nationality. Hedging everything is its own failure: a review full of "perhaps the authors might consider" hides what is essential.
</context>

<task>
Rewrite this draft review.
<draft_review>
{{draft_review}}
</draft_review>
Keep the recommendation unchanged: {{keep_recommendation}}

1. Read the whole draft and list every substantive point it makes, so none is lost.
2. Find problem phrases: sarcasm, personal remarks, assumptions about the authors (including about language or background), sweeping adjectives, rhetorical questions, and excessive hedging that hides what is required.
3. Rewrite each point as: what the issue is, where it is, why it matters, and what would fix it. Keep the strength of the criticism where it is deserved.
4. Keep the structure of the original (sections and numbering) unless it is disorganised, in which case group into major and minor issues.
5. Report what changed and flag any point where the original gave too little information to make it specific, so the reviewer can add it.
</task>

<constraints>
- Do not remove, weaken or add substantive criticisms; the science in the review must stay the same.
- Keep the recommendation unless told otherwise; if the substance does not support the recommendation, say so in "Points to check" rather than changing it.
- Do not invent locations, page numbers or evidence; use "[location]" placeholders where the original gives none.
- Avoid over-politeness: no compliments the reviewer did not express, and no "perhaps" on essential requests.
</constraints>

<output_format>
## What changed
A table: original phrase | problem | replacement.
## Revised review
The full rewritten review.
## Points to check
Bullets for the reviewer to complete or reconsider.
</output_format>
