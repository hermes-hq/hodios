---
schema: 1
id: audit-literature-review-draft
kind: prompt
title: Audit a literature review draft
description: Audits a draft literature review for description without synthesis, missing kinds of work, over-reliance on few sources, dated coverage and claims the citations may not carry.
category: literature-review
version: 1.0.0
status: incubating
stage: [review]
role: [student, researcher]
requires: [none]
inputs: [document]
output: [report, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [thesis, synthesis, draft-feedback, citation-audit]
pairs_with:
  prompts: [outline-literature-review, integrate-new-papers-into-review, write-literature-review-section]
  personas: [academic-writing-coach]
args:
  - name: draft
    description: The review draft with its in-text citations, and the reference list if you have it.
    type: text
    required: true
  - name: question
    description: The research question or aim the review is meant to lead to.
    type: text
  - name: level
    description: The level and setting, which sets the expected depth.
    type: enum
    enum: [undergraduate, masters, doctoral, journal-article]
    default: masters
output_contract:
  format: markdown
  sections: [Verdict, Priority issues, Synthesis check, Citation pattern, Coverage check, Paragraph fixes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Supervisors and reviewers flag the same literature review problems again and again. Serial summary: paragraphs that open with an author name and describe one study each, with no comparison. No argument: the review does not build towards the study's gap or question. Narrow citation base: a handful of sources carry most of the claims, or one author dominates. Dated coverage: little from the last five years, or landmark work missing. Uncritical use: findings reported without design or quality, contradictory evidence ignored, secondary citing ("cited in") instead of reading the original. Overclaiming: "research shows" on the back of one study, or a citation attached to a claim it may not support. An audit catches these from the draft itself by counting, quoting and pointing to paragraphs, so the writer knows exactly what to change.
</context>

<task>
Audit this literature review draft at the {{level}} level.
{{#question}}It should lead to this question: {{question}}{{/question}}
<draft>
{{draft}}
</draft>

1. Number the paragraphs and refer to them by number throughout.
2. Synthesis check: for each paragraph, classify it as synthesis (several sources compared or combined around an idea), serial summary (one source described) or unsupported (claims without sources). Count each type.
3. Argument check: does the review build to a gap and the question? Quote the gap statement if there is one and say whether the preceding sections set it up.
4. Citation pattern: count citations per source and per author, the share of the top three sources, the year distribution (and share from the last five years), and secondary citations. Flag over-reliance.
5. Coverage check: from the question and the field, list the kinds of work that seem missing (recent studies, key designs, other populations or countries, opposing evidence, theory). Name specific works only as "(verify)" leads you are confident exist.
6. Claim check: quote sentences whose strength exceeds what the cited evidence likely carries ("proves", "all studies", "research shows" with one citation) and sentences that need a citation and have none.
7. Give the priority issues in order of effect on the mark or review outcome, and rewrite two or three weak paragraphs as examples, keeping the writer's sources and voice.
</task>

<constraints>
- Base every finding on the draft: quote or cite the paragraph number. No generic advice without a location.
- You cannot check whether a cited source actually says what the draft claims; flag sentences where support is doubtful and say they need checking against the source.
- Do not add references to the rewrites. Use only the citations already in the paragraph, and mark where a new source is needed with [source needed].
- Pitch expectations to the level: an undergraduate review is not expected to cover a field exhaustively, a doctoral one is.
- Keep the voice and argument the writer's own; suggest, do not take over.
</constraints>

<output_format>
## Verdict
Two or three sentences.
## Priority issues
Numbered, most important first, each with paragraph numbers.
## Synthesis check
Table: paragraph | type | note. Then the counts.
## Citation pattern
Bullets with the counts and shares.
## Coverage check
Bullets of missing kinds of work.
## Paragraph fixes
For two or three paragraphs: original (quoted), problem, rewrite.
</output_format>
