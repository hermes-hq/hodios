---
schema: 1
id: map-vocational-portfolio-evidence
kind: prompt
title: Map evidence to a vocational portfolio
description: Maps a learner's work tasks, photos and witness statements against a vocational qualification's assessment criteria, flagging missing or weak evidence and what to collect next.
category: studying
version: 1.0.0
status: incubating
stage: [review, plan]
role: [student, individual]
requires: [none]
inputs: [text, document]
output: [table, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [vocational-qualifications, portfolio-evidence, assessment-criteria, nvq]
pairs_with:
  prompts: [log-apprenticeship-learning-hours, write-reflective-account]
args:
  - name: criteria
    description: The assessment criteria or learning outcomes for the unit or units, with their numbers (e.g. 1.1, 1.2, 2.1), copied from the qualification handbook.
    type: text
    required: true
  - name: evidence_list
    description: What you have so far, each item with a short description - work products, photos, observations by your assessor, witness testimonies, professional discussions, written answers - and dates.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Coverage summary, Evidence map, Gaps and weak spots, What to collect next, Questions for your assessor]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Work-based vocational qualifications (NVQs, many BTEC and City and Guilds units, Australian Certificate courses and similar) are assessed from a portfolio of evidence matched to numbered criteria. Learners often collect plenty of evidence but cannot see which criteria are still uncovered, rely on photos that prove little on their own, or spread one strong piece of evidence across one criterion when it could cover several. Assessors commonly judge evidence as valid (it shows the criterion), authentic (it is the learner's own work), current (recent enough) and sufficient (enough of it, often across more than one occasion). This map applies those tests so the learner knows what to collect next. The assessor makes the judgement; this is preparation.
</context>

<task>
<criteria>
{{criteria}}
</criteria>

<evidence>
{{evidence_list}}
</evidence>

1. List every criterion by number. Note criteria that need a particular evidence type if the wording says so ("demonstrate" usually needs observation or a work product; "describe" or "explain" can be met by written or oral answers).
2. For each evidence item, list every criterion it could plausibly cover, including cross-referencing one item to several criteria.
3. Rate each criterion: Strong (valid, authentic, current and sufficient evidence), Partial (some evidence but a test fails, such as a photo without context, a single occasion where repetition is likely expected, or an unsigned witness statement) or None.
4. For Partial and None, say exactly what would close the gap: the evidence type (assessor observation, witness testimony from a supervisor, work product, professional discussion, question and answer, reflective account) and what it must show.
5. Order next steps by effort: first, one planned observation or task that would cover several gaps at once; then single gaps.
6. Note risks: authenticity (whose work is it, is it signed and dated), currency (old evidence), confidentiality (photos or documents showing clients, children, patients or personal data must be anonymised or not used).
</task>

<constraints>
- Do not decide pass or fail; use "likely" and say the assessor confirms.
- Use only the evidence listed; never invent evidence, dates or signatures.
- Do not draft witness statements or testimonies for other people to sign; the witness writes their own. You may list what a witness statement usually needs to include.
- If criteria are missing or not numbered, ask for the criteria from the handbook and stop.
</constraints>

<output_format>
## Coverage summary
One line: X of Y criteria Strong, Z Partial, W None. Then 2 or 3 bullets on the overall picture.

## Evidence map
Table: Criterion | Evidence items | Rating | Why.

## Gaps and weak spots
Table: Criterion | Problem | What would close it.

## What to collect next
Numbered, starting with the item that covers the most gaps.

## Questions for your assessor
3 to 5 bullets.
</output_format>
