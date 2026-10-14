---
schema: 1
id: extract-recommendations-from-report
kind: prompt
title: Extract recommendations into a tracker
description: Pulls every recommendation from an audit, inspection, review or consultant report into a tracker with reference, priority, owner, response and due date, quoting the source wording.
category: summarization
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, operations-manager, project-manager, executive]
requires: [none]
inputs: [document]
output: [table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [action-tracker, audit-findings, inspection, management-response, follow-up]
pairs_with:
  prompts: [extract-open-questions, extract-deadlines, turn-content-into-actions]
args:
  - name: report
    description: The full report text, including any summary, findings sections and appendices with recommendation lists.
    type: text
    required: true
  - name: organisation
    description: Optional - your teams or roles, so owners can be suggested (for example "facilities, HR, IT, finance").
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Overview, Recommendation tracker, Duplicates and overlaps, Unclear or untestable recommendations, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn a report's recommendations into something an organisation can track to closure. Recommendations hide in many places: the executive summary, the end of each finding, numbered appendices, and soft phrases inside the text ("management should consider..."). Reports often repeat the same recommendation in two places with different wording, give priorities in a separate key, or set deadlines relative to the report date. People who skim the summary miss half of them, and trackers fail when a recommendation is vague ("improve governance") because nobody can say when it is done. You capture every one, keep the report's own wording and priority, and make each one checkable.

<report>
{{report}}
</report>

{{#organisation}}Teams or roles available as owners: {{organisation}}{{/organisation}}
</context>

<task>
1. Read the whole report, including the summary, every finding and every appendix.
2. List every recommendation, including implied ones ("should consider", "it would be good practice to"), and mark implied ones as such.
3. Give each a reference: the report's own number if it has one, otherwise a new number with the section it came from.
4. Record the report's priority or risk rating exactly as given; if none, write "not rated" rather than inventing one.
5. Quote the recommendation's wording, then restate it as a checkable action with a "done when" condition.
6. Suggest an owner from the roles given, marked as a suggestion; leave blank if no roles were given.
7. Record any deadline the report sets, converting relative deadlines ("within 3 months of this report") using the report date if stated.
8. Leave a response column (accept, partly accept, reject) blank for management to fill.
9. Merge duplicates in a separate list, keeping both references, and flag recommendations too vague to test.
</task>

<constraints>
- Quote exactly. Do not upgrade or downgrade the report's priority.
- Do not invent deadlines, owners or ratings.
- Do not judge whether a recommendation is right; that is management's response.
- If the report seems truncated or refers to an appendix that is missing, say so.
</constraints>

<output_format>
## Overview
Count of recommendations by priority and by section.

## Recommendation tracker
Table: Ref | Section | Priority (as given) | Report wording | Action, done when | Suggested owner | Deadline | Response (blank)

## Duplicates and overlaps
Bullets with the references that overlap.

## Unclear or untestable recommendations
Bullets with a question to clarify each.

## Next steps
Three to five steps to agree responses and owners.
</output_format>
