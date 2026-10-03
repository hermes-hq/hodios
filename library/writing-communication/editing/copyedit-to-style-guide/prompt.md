---
schema: 1
id: copyedit-to-style-guide
kind: prompt
title: Copyedit to a style guide
description: Copyedits a text to a named style guide such as AP, Chicago, APA or a house guide, logs every change with the rule applied, queries the author on judgement calls and keeps voice and meaning.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [editor, writer, copywriter, technical-writer]
requires: [none]
inputs: [text, document]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [style-guide-compliance, ap-style, chicago-style, apa-style, house-style, author-queries]
pairs_with:
  prompts: [proofread-text, build-style-sheet, line-edit-prose]
  personas: [editor]
args:
  - name: text
    description: The text to copyedit.
    type: text
    required: true
  - name: style_guide
    description: The guide to follow, for example "AP", "Chicago 18th edition", "APA 7", "Oxford/New Hart's Rules", "Microsoft Writing Style Guide" or the name of your house guide.
    type: string
    required: true
  - name: house_rules
    description: House rules that override or add to the guide, for example "always 'email', no hyphen; sentence-case headings; use the Oxford comma".
    type: text
output_contract:
  format: markdown
  sections: [Edited text, Change log, Author queries, Style sheet]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Copyediting sits between line editing and proofreading. A copyeditor makes a text correct, consistent and compliant with a style guide (mechanics, usage, numbers, capitalisation, abbreviations, hyphenation, titles, dates, citations, headings) and checks internal consistency of facts within the text, without rewriting the author's sentences for taste. Authors and editors judge a copyedit by two things: it applied the guide correctly and consistently, and every change is visible and justified, so they can accept or reject each one. The worst failures are confidently "correcting" to a rule the guide does not contain, silently changing meaning, and inconsistency (applying a rule in one paragraph but not the next).

Typical differences to keep straight, for example: AP spells out one to nine and uses figures for 10 and above, omits the serial comma in simple series, and abbreviates some months with dates; Chicago spells out zero to one hundred in non-technical text and uses the serial comma; APA uses figures for 10 and above and for all measurements and statistics, and the serial comma. Apply whichever guide is named, not a blend.
</context>

<task>
Copyedit the text below to {{style_guide}}.{{#house_rules}} House rules, which override the guide where they conflict:
<house_rules>
{{house_rules}}
</house_rules>{{/house_rules}}

<text>
{{text}}
</text>

1. If the text is missing, ask for it and stop. If you do not know the named house guide's rules and no house rules are given, say so, apply only the general conventions it is likely based on, and list that assumption first under Author queries.
2. Read the whole text first and note the author's existing choices that the guide leaves open (spelling variety, terminology, capitalisation of product names). Keep them consistent rather than changing them.
3. Edit for:
   - grammar, spelling and punctuation errors;
   - the guide's rules on numbers, dates, times, abbreviations and acronyms (first use spelled out), capitalisation, titles of works, hyphenation and compounds, italics and quotation marks, lists and headings, and citations and references if present;
   - usage the guide addresses (for example "more than" or "over", "that" or "which", gender-neutral terms), only where the guide has a rule;
   - internal consistency of terms, names, figures and cross-references; flag, do not fix, any factual inconsistency (two different figures for the same thing).
4. Do not rewrite sentences for style, rhythm or concision unless a sentence is ungrammatical or ambiguous; then make the smallest fix and log it.
5. Log every change with the rule behind it. Describe the rule in words ("AP: spell out numbers below 10"). Cite a section number only if you are certain of it; never invent one.
6. Raise author queries for anything that needs the author's judgement: possible factual errors, unclear meaning, quotations that may be inaccurate, rules the guide leaves to the publisher.
7. Produce a style sheet of the decisions made, so the next copyeditor or the next chapter stays consistent.
</task>

<constraints>
- Every change in the edited text appears in the change log, and nothing changes that is not logged. Repeated identical changes may be logged once with a count.
- Do not change quotations, proper names, legal or technical terms, code, URLs or data, except for clear typographical errors, which you query rather than fix in quotations.
- Preserve the author's voice, register and argument.
- If a rule is disputed or has changed between editions of the guide, say which edition's rule you applied.
</constraints>

<output_format>
## Edited text
The full copyedited text.
## Change log
Table: # · Original · Edited · Rule applied. In order of appearance.
## Author queries
Numbered queries, each quoting the passage and asking one clear question. "None" if none.
## Style sheet
Bullets grouped as Spelling and terms · Capitalisation · Numbers and dates · Punctuation and hyphenation · Other.
</output_format>
