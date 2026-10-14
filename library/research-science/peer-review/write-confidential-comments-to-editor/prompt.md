---
schema: 1
id: write-confidential-comments-to-editor
kind: prompt
title: Write the confidential comments to the editor
description: Writes the confidential comments to the editor that go with a referee report, explaining the recommendation, your confidence and expertise limits, and concerns not shared with the authors.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher]
requires: [none]
inputs: [document, notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
depth: specific
tags: [referee-report, editorial-process, confidential-comments, reviewer-recommendation]
pairs_with:
  prompts: [write-peer-review, choose-review-recommendation, write-misconduct-concern-to-editor]
  personas: [peer-reviewer]
args:
  - name: report
    description: Your report to the authors, or its main points.
    type: text
    required: true
  - name: recommendation
    description: Your recommendation (accept, minor revision, major revision, reject) and anything you are unsure about.
    type: string
    required: true
  - name: private_notes
    description: Optional. Things you want only the editor to know, for example parts outside your expertise, a possible conflict, overlap with a paper you reviewed elsewhere, or a worry about the data.
    type: text
output_contract:
  format: markdown
  sections: [Comments to the editor, Consistency check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Editors read the confidential comments first and often weigh them most, because they say what the reviewer really thinks. Handling editors find them useful when they are short and contain what the report cannot: the recommendation and the one or two issues it hinges on; how confident the reviewer is and which parts fell outside their expertise (so the editor can find another reviewer for the statistics or the clinical part); whether the problems are fixable in one revision; a disclosure the reviewer only noticed while reading (a possible conflict, having reviewed the paper for another journal, suspecting who the authors are in a double-blind process); and any concern about integrity, stated factually. Editors dislike confidential comments that contradict the report (a gentle report with "reject" privately), new criticisms the authors never see and so cannot answer, and remarks about the authors as people. If something matters to the decision, the authors should usually see it too.
</context>

<task>
Write my confidential comments to the editor.
<report>
{{report}}
</report>
Recommendation: {{recommendation}}
{{#private_notes}}
<private_notes>
{{private_notes}}
</private_notes>
{{/private_notes}}

1. State the recommendation and the one to three issues it rests on, pointing to the report rather than repeating it.
2. Say how confident the reviewer is and which parts they could not assess, and suggest the expertise of an additional reviewer if needed.
3. Say whether the problems seem fixable in one revision, and what the editor should look for in a revised version.
4. Add disclosures and concerns from the private notes, factually and briefly. For a suspected integrity problem, state what was observed and where, and suggest the editor checks it; recommend a separate detailed note if the concern is substantial.
5. Check consistency between the report, the recommendation and these comments, and list any mismatch to fix (for example a mild report with a reject recommendation, or a decisive issue mentioned only here).
</task>

<constraints>
- Keep it short: usually 100 to 250 words.
- Do not introduce decision-changing criticisms that are absent from the author report; flag them to be added to the report instead.
- No remarks about the authors' identity, nationality, language background, seniority or motives.
- State integrity concerns as observations with locations, never as accusations.
- Do not invent anything not in the report or notes.
</constraints>

<output_format>
## Comments to the editor
The text, ready to paste.
## Consistency check
Bullets: mismatches between report, recommendation and comments, and what to change, or "Consistent".
</output_format>
