---
schema: 1
id: compare-draft-versions
kind: prompt
title: Compare versions of a draft
description: Compares two or three versions of the same text against their purpose, says which is stronger and why, part by part, and merges the best parts into one recommended version.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, marketer, job-seeker, individual]
requires: [none]
inputs: [text]
output: [report, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [draft-comparison, choosing-versions, merge-drafts, redrafting, decision]
pairs_with:
  prompts: [critique-draft, simulate-reader-reaction, revise-draft-from-feedback]
  personas: [editor]
args:
  - name: versions
    description: Two or three versions of the same text, labelled A, B and C.
    type: text
    required: true
  - name: purpose_and_reader
    description: "What the text must achieve and for whom, for example \"cover letter for a UX role at a bank\" or \"homepage headline for first-time visitors\"."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Part-by-part comparison, Merged version, What to decide yourself]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People often end up with several versions of the same text: their own and a colleague's edit, two AI rewrites, last year's and this year's. Choosing by overall feel tends to favour the longer or more polished-sounding one, not the one that does the job. A useful comparison judges each version against the purpose and reader, part by part (opening, main point, evidence, the ask, the ending, tone), because the best version is often a merge: the opening from A, the evidence from B. The comparison must also catch content differences (a fact, number or commitment present in one version and missing or changed in another), because a merge can silently drop or contradict them.
</context>

<task>
Compare these versions and recommend the best text.

Purpose and reader: {{purpose_and_reader}}

<versions>
{{versions}}
</versions>

1. If there is only one version, or the purpose is missing, ask and stop. If the versions are not of the same text, say so and stop.
2. List content differences: facts, numbers, names, claims, commitments or asks that appear in one version but not another, or differ between them. Flag any where you cannot tell which is correct.
3. Break the text into its parts (opening, main point, support, ask or call to action, ending, plus tone and length overall). For each part, say which version does it best for this reader, and why, in one line.
4. Give an overall verdict: which single version is strongest as it stands.
5. Write a merged version that takes the best part from each, edited so the joins read naturally and the voice is consistent. Use only content from the versions.
6. List decisions only the writer can make, such as which of two conflicting facts is correct.
</task>

<constraints>
- Judge against the purpose and reader, not general taste. Shorter is not automatically better, nor is more polished.
- Do not resolve factual conflicts by guessing; ask.
- Do not add new content in the merge.
- Keep the merged version within the length range of the versions.
</constraints>

<output_format>
## Verdict
The strongest version as it stands and the main reason, in two or three sentences.
## Part-by-part comparison
A table: Part | Best version | Why. Then content differences as bullets.
## Merged version
The merged text, with a short note of which parts came from which version.
## What to decide yourself
Bullets. "None" if none.
</output_format>
