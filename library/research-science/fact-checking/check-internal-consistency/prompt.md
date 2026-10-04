---
schema: 1
id: check-internal-consistency
kind: prompt
title: Check a document for internal contradictions
description: Checks a long document for internal contradictions in numbers, dates, names, definitions and claims, listing each conflict with both locations and the arithmetic where relevant.
category: fact-checking
version: 1.0.0
status: incubating
stage: [review, verify]
role: [editor, legal-professional, researcher]
requires: [none]
inputs: [document]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [consistency-check, contradictions, cross-references, document-qa]
pairs_with:
  prompts: [compare-documents, interrogate-a-document, extract-key-numbers]
args:
  - name: document
    description: The full document (report, contract, proposal, thesis chapter, grant application, manual). Keep section numbers and table labels.
    type: text
    required: true
  - name: focus
    description: all = every kind of conflict; numbers = figures, totals and percentages; dates = dates, sequences and durations; terms = names, defined terms and definitions.
    type: enum
    enum: [all, numbers, dates, terms]
    default: all
output_contract:
  format: markdown
  sections: [Summary, Conflicts, Arithmetic checks, Checked and consistent, Questions for the author]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Long documents written by several people or over several drafts contradict themselves: the executive summary says 1,200 participants and the methods say 1,250; the contract defines "Business Day" and then uses "working day"; a timeline puts the review before the submission it reviews. Each slip undermines trust in the whole document, and in contracts or reports a single one can change meaning. The reader needs every conflict found, located twice, and left for the author to resolve, because you cannot know which version is right.

<document>
{{document}}
</document>
Focus: {{focus}}
</context>

<task>
1. Note how the document labels its parts (section numbers, headings, clause numbers, pages). If it has none, number the paragraphs P1, P2, ... and say so.
2. Build an inventory as you read, section by section, for the focus areas:
   - **Numbers:** every figure with what it measures; totals against the sum of their parts; percentages against their counts and against 100%; the same metric stated in two places.
   - **Dates:** every date and duration; sequences (does A happen before B everywhere?); dates against stated weekdays; durations against start and end dates.
   - **Terms:** names of people, organisations and products (spelling, title, role); defined terms and whether later use matches the definition; synonyms used for the same thing where precision matters.
   - **Claims** (with all): statements in one place that another place contradicts; cross-references to sections, tables or annexes that do not exist or say something else.
3. Compare each item with every other mention. For each conflict record both locations with short quotes, what conflicts, and the severity:
   - **Material:** changes a number someone will rely on, an obligation, a date, or the meaning of a claim.
   - **Minor:** cosmetic or obviously a typo, with no effect on meaning.
4. Show the arithmetic for every numeric check you make, including checks that pass.
5. Note differences that are probably intentional (different periods, a draft figure updated later, rounding) as "possible explanation", without dropping them.
6. Before answering, recheck each conflict by rereading both passages, and remove any that disappear on a careful reading.
</task>

<constraints>
- Do not decide which version is correct. Ask the author.
- Report conflicts, not style or vagueness. An unclear sentence is not a contradiction.
- Do not check facts against the outside world; only the document against itself.
- If the document appears truncated, or references annexes that are not included, say so and list what could not be checked.
- Be exhaustive within the focus. If the list is long, keep the table complete and put material conflicts first.
</constraints>

<output_format>
## Summary
Counts of material and minor conflicts, and the two or three that matter most.
## Conflicts
Table: # | Type | Location A: quote | Location B: quote | The conflict | Severity | Possible explanation.
## Arithmetic checks
Bullets: the calculation and pass or fail.
## Checked and consistent
Bullets: what was checked and found consistent, so the reader knows the coverage.
## Questions for the author
Numbered, one per material conflict: "Which is correct, X (§A) or Y (§B)?"
</output_format>
