---
schema: 1
id: format-legal-citations
kind: prompt
title: Format legal citations
description: Formats case, statute and secondary-source citations to Bluebook, OSCOLA, AGLC, McGill or a stated house style, and flags every incomplete, inconsistent or unverifiable citation instead of guessing.
category: legal-practice
version: 1.0.1
status: incubating
stage: [review]
role: [legal-professional, student]
subject: [law]
requires: [none]
inputs: [text, document]
output: [table, rewrite, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [legal-citation, bluebook, oscola, cite-checking, footnotes]
pairs_with:
  prompts: [draft-legal-research-memo, brief-court-case, verify-citations, format-citations]
args:
  - name: citations
    description: The citations to format, one per line or pasted in context (footnotes or a table of authorities), including any short forms and pinpoints. Add the court or document type if the style depends on it.
    type: text
    required: true
  - name: style
    description: The citation style. Use "other" and name the house style or court rule in the citations input.
    type: enum
    enum: [bluebook, oscola, aglc, mcgill, other]
    required: true
output_contract:
  format: markdown
  sections: [Style assumptions, Formatted citations, Problems to resolve, Short-form and signal notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Pairs with the academic reference formatting prompt."}
---
<context>
You cite-check and format legal citations the way a law review editor or a careful associate does before filing. Formatting is mechanical, but the real risk is substantive: a citation with a wrong reporter, volume, year or pinpoint can send a judge to the wrong page, and citations to authorities that do not exist have led to sanctions. So formatting never fills a gap by guessing. Each style differs in typeface (italics or none for case names), punctuation, abbreviations of reporters and courts, neutral citations, year brackets, pinpoints and subsequent references (Id., ibid, short forms), and each has editions that change rules, so you name the edition assumed and mark rules you are not certain of.
</context>

<task>
Target style: {{style}}

Citations:
<citations>
{{citations}}
</citations>

1. Style assumptions: name the style and the edition you are following (for example the most recent edition you know, marked to confirm), whether you are formatting for court documents or academic footnotes where the style distinguishes them, and any house or court rule supplied.
2. For each citation, identify the authority type (case, statute, regulation, treaty, book, article, website) and its components (parties, year, volume, reporter or report series, neutral citation, court, first page, pinpoint, author, title, publisher).
3. Format each citation to the style. Keep the original next to the formatted version.
4. Never supply a missing component from memory. If the volume, page, year, court or pinpoint is missing, leave a [MISSING: component] marker in the formatted version.
5. Flag problems: missing components; internal inconsistencies (a year that does not match the reporter series, a neutral citation whose court does not match the court named, a pinpoint lower than the first page); citations that look malformed or that you do not recognise as a real report series; and citations that cannot be checked without the source. Recommend verification in an official source or citator for every case cited.
6. Note short forms and signals: how subsequent references should look in this style, and any signals (see, cf., but see) that need checking for correct use and typeface.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent, complete or "correct" substantive details (names, years, volumes, pages) from memory, even if you think you know the authority. Formatting only changes form; substantive fixes are flagged for the user.
- Never state that an authority exists, is good law, or says what it is cited for. That needs checking against the source.
- If a citation is ambiguous between two authority types or styles, show the alternatives and say what would decide it.
- When the style is "other" and no house rules are given, ask for them, and format to the closest standard style meanwhile, saying which.
- Keep explanations short; the table is the deliverable.
{{> output/uncertainty}}
</constraints>

<output_format>
## Style assumptions
Two to four bullets.

## Formatted citations
Table: # | original | formatted | type | notes.

## Problems to resolve
Numbered: citation # - problem - what to check.

## Short-form and signal notes
Bullets with an example of each short form.
</output_format>
