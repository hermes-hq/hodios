---
schema: 1
id: screen-studies
kind: prompt
title: Screen titles and abstracts
description: Screens titles and abstracts against inclusion and exclusion criteria with a decision and reason for each record, and lists uncertain ones for a second reviewer. For review teams.
category: literature-review
version: 1.0.0
status: incubating
stage: [discover]
role: [researcher, student]
requires: [none]
inputs: [text, document]
output: [table, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [screening, eligibility-criteria, systematic-review, prisma, dual-screening]
pairs_with:
  prompts: [build-search-string, appraise-study-quality, build-literature-matrix]
  workflows: [literature-review-track]
args:
  - name: criteria
    description: Your inclusion and exclusion criteria (population, intervention or exposure, comparator, outcomes, study designs, languages, years, publication types), ideally copied from the protocol.
    type: text
    required: true
  - name: records
    description: The records to screen, each with an ID, title and abstract, for example pasted from a reference manager or screening tool export.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Criteria as applied, Screening decisions, For second reviewer, Counts]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Title and abstract screening removes clearly irrelevant records so that only plausible ones go to full-text review. Good practice is to be inclusive at this stage: a record moves forward unless the title and abstract show that it fails a criterion, because a missed study cannot be recovered later, while an extra full text costs only time. Decisions must be consistent and traceable, with one exclusion reason per record taken from a fixed, ordered list, so that the counts can be reported in a PRISMA flow diagram. Systematic reviews screen in duplicate; an assistant's decisions are one reviewer's input, never the final word.
</context>

<task>
Screen these records.
<criteria>
{{criteria}}
</criteria>
<records>
{{records}}
</records>

1. Restate the criteria as a numbered checklist and fix an order of exclusion reasons (usually wrong population, wrong intervention or exposure, wrong comparator, wrong outcome, wrong study design, wrong publication type, out of date or language range). If a criterion is ambiguous enough to cause inconsistent decisions, say how you will apply it and flag it for the team to confirm.
2. For each record, decide:
   - **Include**: meets all criteria as far as the title and abstract show, or fails none clearly.
   - **Exclude**: clearly fails at least one criterion. Give the first reason in the fixed order and quote or paraphrase the words that show it.
   - **Uncertain**: the abstract is missing, too short, or genuinely ambiguous on a criterion. Say what the full text needs to show.
3. Spot likely duplicates (same title, authors and year, or a conference abstract and the later full paper) and mark them instead of screening them twice.
4. Collect every Uncertain record, and every Include or Exclude where you were not confident, for the second reviewer.
5. Count the decisions.
</task>

<constraints>
- Decide only from the title and abstract provided. Do not use what you remember about a paper or its authors.
- When in doubt, do not exclude: use Uncertain, which moves the record to full-text review.
- Never add, drop or renumber records. Keep the user's IDs exactly, and if a record has no ID, number it in order and say so.
- One exclusion reason per record, from the fixed list, so counts add up.
- Apply criteria the same way to every record. If you change how you read a criterion partway through, say so and re-check earlier records.
- If there are more records than you can screen carefully in one reply, screen the first batch, say where you stopped, and ask for the rest.
</constraints>

<output_format>
## Criteria as applied
Numbered checklist and the ordered exclusion reasons, plus any interpretation the team should confirm.
## Screening decisions
Table: ID | short title | decision | reason (criterion number) | evidence from the abstract | confidence (high, medium, low).
## For second reviewer
Bullets: ID, what is unclear, what to check in the full text.
## Counts
Records screened, duplicates flagged, included, excluded by reason, uncertain.
</output_format>
