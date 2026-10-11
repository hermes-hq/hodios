---
schema: 1
id: review-narrative-review-article
kind: prompt
title: Referee a narrative review article
description: Referees a submitted narrative or state-of-the-art review for its question and scope, how literature was found, balance, synthesis rather than listing, and whether the conclusions follow.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, editor]
requires: [none]
inputs: [document]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [narrative-review, review-articles, sanra, literature-synthesis, manuscript]
pairs_with:
  prompts: [review-systematic-review-manuscript, write-peer-review, review-conceptual-paper]
  personas: [peer-reviewer]
args:
  - name: manuscript
    description: The review manuscript, including any methods paragraph, figures, tables and the reference list.
    type: text
    required: true
  - name: journal_type
    description: Optional. The journal and article type, for example "invited review in a specialist journal" or "student-led mini-review".
    type: string
output_contract:
  format: markdown
  sections: [Summary, Purpose and scope, Literature search and selection, Balance and coverage, Synthesis, Conclusions and usefulness, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Narrative reviews are not failed systematic reviews; they serve different purposes (introducing a field, tracing how a debate developed, integrating findings across disciplines, proposing a framework) and should not be held to PRISMA. They do have standards. The SANRA scale captures the main ones: a justified importance for the readership, a clearly stated aim, a description of how the literature was found, appropriate referencing, sound reasoning about the evidence, and appropriate presentation of data such as effect sizes. The commonest failures are a review that is a list of study summaries ("Smith found... Jones found..."), selective citation that supports the authors' own position or their own past work, no account of the strength or quality of the cited evidence, outdated coverage that misses the last few years, heavy reliance on other reviews instead of primary studies, and conclusions or recommendations that go further than the evidence reviewed. A useful review leaves the reader with a structure: what is settled, what is contested and why, and what would settle it.
</context>

<task>
Referee this review{{#journal_type}} for {{journal_type}}{{/journal_type}}.
<manuscript>
{{manuscript}}
</manuscript>

1. Summarise the review's aim, scope and main conclusions.
2. Judge purpose and scope: is the topic important for the readership, is there an existing recent review that this duplicates (ask the authors to position it), and is the aim stated and met?
3. Judge how literature was found and selected: is the approach described, are dates and sources stated, and are inclusion choices explained?
4. Judge balance and coverage: important strands, opposing evidence or recent work missing; over-reliance on the authors' own work or on secondary sources; whether evidence quality is distinguished.
5. Judge synthesis: whether studies are compared, contrasted and organised into an argument or framework, rather than listed; whether figures or tables help.
6. Judge conclusions: whether they follow from the evidence presented, whether uncertainty is clear, and whether practice or policy recommendations are warranted.
7. Recommend a decision.
</task>

<constraints>
- Do not demand a systematic review methodology, unless the manuscript claims to be systematic or its conclusions need one.
- When pointing to missing literature, describe the gap (topic, period, opposing position); never name specific papers you cannot verify.
- Tie each issue to a section and propose a fix.
- Stay respectful and impersonal, and start with one line reminding the reviewer about confidentiality and the journal's AI-use policy.
</constraints>

<output_format>
One reminder line, then:
## Summary
## Purpose and scope
## Literature search and selection
## Balance and coverage
## Synthesis
## Conclusions and usefulness
Each section: numbered issues with location, problem and suggested fix, or "No concerns".
## Recommendation
</output_format>
