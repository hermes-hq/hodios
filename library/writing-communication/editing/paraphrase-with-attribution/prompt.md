---
schema: 1
id: paraphrase-with-attribution
kind: prompt
title: Paraphrase a source with attribution
description: Paraphrases a source passage in fresh wording and structure at the same meaning, adds the citation it needs and flags phrases that must stay quoted, so students avoid patchwriting.
category: editing
version: 1.0.0
status: incubating
stage: [build]
role: [student, researcher, writer]
requires: [none]
inputs: [text, document]
output: [rewrite, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [paraphrasing, patchwriting, citations, academic-integrity, apa, mla]
pairs_with:
  prompts: [summarize-paper, simplify-to-plain-language, proofread-text]
  personas: [editor]
args:
  - name: passage
    description: The source passage to paraphrase, copied exactly, including any page or paragraph number you have.
    type: text
    required: true
  - name: source
    description: "What the passage comes from: author, year, title, publisher or journal, and page. Give what you have, for example \"Okafor 2021, Journal of Urban Health, p. 14\"."
    type: string
    required: true
  - name: citation_style
    description: Citation style for the in-text citation and the reference entry. Use none for a signal phrase only.
    type: enum
    enum: [apa, mla, chicago, harvard, none]
    default: apa
output_contract:
  format: markdown
  sections: [Paraphrase, Keep in quotation marks, Reference entry, Meaning check, Overlap check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A paraphrase restates a source's idea in your own words and your own sentence structure, at the same meaning, and still credits the source. The common failure is patchwriting: keeping the source's sentence skeleton and swapping in synonyms. It reads as copied, plagiarism checkers flag it, and it often shifts the meaning because the synonyms are not exact. The other failures are dropping the citation because "it's in my own words", strengthening or weakening the author's claim (a "may" becomes a "does"), and paraphrasing a phrase so distinctive that it should have been quoted.
</context>

<task>
Paraphrase this passage and attribute it in {{citation_style}} style.

<passage>
{{passage}}
</passage>
<source>
{{source}}
</source>

1. If the passage is empty, ask for it and stop. If the source details are thin, continue, but use placeholders such as `[year]` or `[page]` for anything missing. Never invent an author, year, title or page.
2. If the passage is a single striking sentence, a definition, a famous line or wording whose force depends on its exact words, say that quoting it is better than paraphrasing, give the quotation with its citation, and then still offer a short paraphrase for comparison.
3. Read for meaning. List the idea units: each claim, its qualifier ("may", "most", "in rural areas"), each number and who it applies to, and the author's stance (reporting, arguing, doubting).
4. Decide what cannot be reworded:
   - technical terms and proper names with no true synonym stay as they are, without quotation marks;
   - coined terms, the author's distinctive phrases and exact definitions stay in quotation marks with a page reference.
5. Write the paraphrase from the idea list, not from the source sentences. Change the structure as well as the words: reorder the ideas, change the sentence subject, split or merge sentences, change voice where it reads naturally. Keep it at about the length of the original or shorter.
6. Attribute it: a signal phrase that names the author ("Okafor argues…", "According to…") and an in-text citation in {{citation_style}} style. With `none`, use the signal phrase alone. Include a page or paragraph locator when you have one, since many instructors expect it even for paraphrase.
7. Check against the source:
   - every idea unit is present at the same strength, and nothing has been added;
   - no run of four or more consecutive words is shared with the source, apart from technical terms, names, numbers and marked quotations;
   - no sentence follows the source sentence's order of clauses with words swapped.
   If a check fails, revise before answering.
</task>

<constraints>
- Do not add interpretation, evaluation or examples that are not in the source. A paraphrase is not a summary or a critique.
- Keep hedges and certainty exactly as strong as the author's.
- Use the citation format of the current edition of the style (APA 7, MLA 9, Chicago 17 or 18 notes-bibliography, Harvard author-date as commonly taught). If the student's institution uses a variant, the institution's guide wins; say so once.
- Never help hide the source. If the request is to avoid citing it, or to get past a plagiarism checker, provide the cited paraphrase and say in one line that paraphrased ideas still need a citation.
- Write in the same English variety as the passage unless the student's text shows another.
</constraints>

<output_format>
## Paraphrase
The paraphrase with its signal phrase and in-text citation, ready to paste. If quoting is better, the quotation first, labelled, then the paraphrase.
## Keep in quotation marks
A table: Phrase | Why it stays quoted. "None" if nothing must stay quoted. Below it, one line listing the technical terms kept unquoted.
## Reference entry
The full reference list or bibliography entry in the chosen style, with `[placeholders]` for missing details. For Chicago, give the footnote and the bibliography entry. Omit this section for `none`.
## Meaning check
A table: Idea in the source | Where it is in the paraphrase | Same strength (yes or note).
## Overlap check
Any wording still shared with the source and why it is acceptable, or "No shared strings of four or more words."
</output_format>

<examples>
Source: "Remote workers in the study reported significantly higher job satisfaction, although the effect weakened after the first year." (Lee, 2022, p. 41)
Patchwriting (avoid): "Remote employees in the research said they had much greater job satisfaction, but the effect got weaker after the first year."
Paraphrase: "Lee (2022) found that the satisfaction boost people reported from working remotely was strongest at first and faded over the following years (p. 41)."
</examples>
