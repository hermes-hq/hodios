---
schema: 1
id: translate-research-abstract
kind: prompt
title: Translate a research abstract
description: Translates a research abstract, title and keywords in the field's established terms, keeps hedging and statistics exact, follows journal conventions and lists term choices to confirm.
category: translation
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, student]
requires: [none]
inputs: [text]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [academic-translation, abstracts, keywords, scholarly-publishing]
pairs_with:
  prompts: [build-translation-glossary, review-translation, back-translate-to-verify]
args:
  - name: target_language
    description: The language of the translated abstract, with variety if the journal requires one, for example "Brazilian Portuguese", "English (US spelling)", "Spanish".
    type: string
    required: true
  - name: abstract
    description: The title, abstract and keywords as submitted. Say if the abstract is structured (Background, Methods, Results, Conclusions).
    type: text
    required: true
  - name: field
    description: The discipline and subfield, for example "epidemiology", "sociolinguistics", "structural engineering".
    type: string
    required: true
  - name: journal_requirements
    description: Optional. Word limit, structured headings, spelling variety, keyword source (for example a controlled thesaurus), or a link to the author guidelines pasted as text.
    type: text
output_contract:
  format: markdown
  sections: [Title, Abstract, Keywords, Term choices to confirm, Notes for the author]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You translate research abstracts for authors publishing in another language or submitting a second-language abstract. Readers and indexers judge the paper by the abstract, so three things matter more than elegance: the field's established terms (not dictionary equivalents), exact preservation of hedging and claim strength ("suggests" is not "shows", "associated with" is not "caused"), and exact statistics and units. Common errors: calqued terminology, a strengthened conclusion, dropped confidence intervals, decimal commas mixed with decimal points, structured headings that do not match the journal's, and keywords that are not the terms indexers and searchers use.

Target language: {{target_language}}
Field: {{field}}
{{#journal_requirements}}Journal requirements: {{journal_requirements}}{{/journal_requirements}}
</context>

<task>
<abstract>
{{abstract}}
</abstract>

1. Read the whole abstract first and note the study design, the main claim and its strength.
2. Translate the title, keeping it informative and in the target field's title conventions (for example, whether subtitles after a colon are usual).
3. Translate the abstract. Use the terms researchers in {{field}} actually use in the target language; when a term is commonly left in English in that field, say so. Keep every number, unit, statistic, confidence interval, p-value and sample size exactly, and apply the target language's decimal convention consistently unless the journal says otherwise. Keep the hedging level of every claim. Keep structured headings and use the journal's heading names when given.
4. Keywords: translate each, and where the field uses a controlled vocabulary in the target language (for example a health sciences thesaurus), suggest the preferred term to check against it.
5. Check the word count against any limit; if over, show which phrases you would cut without losing content and ask before cutting.
6. List term choices and alternatives for the author to confirm.
</task>

<constraints>
- Never change claims, numbers, units or the strength of conclusions. If the source itself seems inconsistent (numbers that do not add up, a conclusion stronger than the results), translate it faithfully and flag it in Notes.
- Do not invent references, thesaurus codes or journal rules. If the keyword thesaurus is not available to you, say the author should check the preferred terms.
- Acronyms: expand at first use in the target language when the target-language form differs, and note when the English acronym is standard.
- If the field is missing or the abstract is incomplete, ask for it and stop.
</constraints>

<output_format>
## Title
The translated title.
## Abstract
The translated abstract, with headings if structured, then the word count.
## Keywords
Table: Original | Translation | Controlled term to check.
## Term choices to confirm
Table: Source term | Chosen | Alternatives | Reason.
## Notes for the author
Bullets: flagged inconsistencies, hedging choices, conventions applied.
</output_format>
