---
schema: 1
id: fit-content-into-required-template
kind: prompt
title: Fit content into a required template
description: Maps existing content into a required template or form, such as a funder form, report template or nomination, keeping limits and flagging what is missing and what fits nowhere.
category: editing
version: 1.0.0
status: incubating
stage: [build]
role: [individual, manager, writer, researcher]
requires: [none]
inputs: [document, text]
output: [rewrite, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [templates, application-forms, repurposing, word-limits, content-mapping]
pairs_with:
  prompts: [cut-text-to-length-limit, format-document-for-scanning, expand-notes-into-prose]
args:
  - name: content
    description: The material you already have, such as an old proposal, report, notes or a CV.
    type: text
    required: true
  - name: template
    description: The required structure, with every heading, field or question, its guidance text and any word or character limit, exactly as given.
    type: text
    required: true
  - name: purpose
    description: Who will read or score the completed template and what they are deciding. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Completed template, Mapping, Missing content, Content that did not fit, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People constantly move content they already have into a structure someone else set: a funder's application form, a company report template, an award nomination, a supplier questionnaire, a performance review form, a journal's structured abstract. The common failures are pasting the same paragraph into three fields, answering the heading instead of the guidance text under it, leaving a field half-answered because the content was written for another purpose, and blowing a character limit. Reviewers score templates section by section, often without reading the others, so each field must stand on its own and answer exactly what that field asks. The honest output also shows the gaps: what the template asks for that the content does not contain.

{{#purpose}}Purpose: {{purpose}}{{/purpose}}
<template>
{{template}}
</template>
<content>
{{content}}
</content>
</context>

<task>
1. If either the template or the content is missing, ask for it and stop.
2. Parse the template into fields. For each, note what the guidance text actually asks for (not just the heading), the limit and its unit (words or characters, with or without spaces if stated), and any required format such as bullets or a date.
3. Map each piece of the content to the field it best serves. Where one piece serves several fields, use it fully in one and refer to it or use a different angle in the others; do not paste duplicates.
4. Fill each field using only the content, adapting wording so it answers the field's question directly: first sentence answers the question, then evidence. Keep the content's facts, figures and names exactly.
5. Keep within each limit and give the count in the unit the template uses. If content must be cut, cut the least relevant material and list it.
6. Where a field cannot be answered from the content, write [TO ADD: what is needed] in the field rather than inventing anything.
7. List content that did not fit any field, and say whether it is worth keeping elsewhere (an attachment, an appendix) or can be dropped.
8. Ask the questions that would let the user fill the gaps.
</task>

<constraints>
- Never invent facts, numbers, outcomes, names, dates or commitments to fill a field.
- Do not change the template's headings, order or numbering.
- When the template says characters, count characters; do not convert to words.
- Keep the tone the template's reader expects (formal for funders and institutions) without adding promotional language the content does not support.
</constraints>

<output_format>
## Completed template
Each field heading as given, the filled text, and its count against the limit, for example "(143/150 words)".
## Mapping
Table: Template field | Source in the content | Notes (adapted, merged, cut).
## Missing content
Bullets: field and what it needs.
## Content that did not fit
Bullets with a keep or drop suggestion.
## Questions
Numbered questions for the user. "None" if none.
</output_format>
