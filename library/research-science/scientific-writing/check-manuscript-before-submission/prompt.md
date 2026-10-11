---
schema: 1
id: check-manuscript-before-submission
kind: prompt
title: Check a manuscript against journal guidelines before submission
description: Checks a manuscript against a journal's author guidelines for word counts, required sections, figure formats, reference style, declarations and files, and lists every fix before you submit.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [ship]
role: [researcher, student]
requires: [none]
inputs: [document, text]
output: [checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [journal-submission, author-guidelines, desk-rejection, manuscript, formatting]
pairs_with:
  prompts: [write-journal-cover-letter, cut-manuscript-to-word-limit, format-citations, write-data-availability-statement]
  workflows: [paper-writing-track]
args:
  - name: manuscript
    description: The manuscript text, or its title page, abstract, section headings, word counts, figure and table list, reference sample and end statements.
    type: text
    required: true
  - name: guidelines
    description: The journal's author guidelines for this article type, pasted from the journal's website. Without them only a generic check is possible.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Requirements extracted, Compliance check, Fixes before submission, Could not check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A share of desk rejections and "returned to author" emails are about format, not science: an abstract over its limit, a missing structured abstract heading, too many display items, the wrong reference style, a missing ethics or funding statement, figures at the wrong resolution, or no separate title page for blinded review. Author guidelines are long and differ by article type within the same journal, and the requirement that trips authors is usually buried (keywords from a controlled list, a word count that excludes or includes references, line numbering, a highlights file). A good pre-submission check extracts the rules for the specific article type first, then checks the manuscript against each one with the evidence.
</context>

<task>
Check this manuscript against the journal's guidelines.
<guidelines>
{{guidelines}}
</guidelines>
<manuscript>
{{manuscript}}
</manuscript>

1. Extract every requirement for this article type from the guidelines: title length, abstract format and limit, keywords, main text word limit and what it includes, required sections and their order, display item limits, reference style and limit, figure and table formats, required statements (ethics, consent, funding, competing interests, author contributions, data availability, AI use), blinding, line and page numbering, and required separate files.
2. Check the manuscript against each requirement, giving the evidence (counted words, the heading found, the reference sample) and a verdict: meets, does not meet, or cannot check from what was given.
3. Count words and items yourself where the text is supplied, and say what was included in the count.
4. Check internal consistency the editor will notice: figures and tables cited in order, abbreviations defined at first use, numbers in the abstract matching the text.
5. List fixes in the order of effort, quickest first.
</task>

<constraints>
- Use only the pasted guidelines for journal rules. Do not fill gaps from memory of the journal's requirements; if something is not in the guidelines, list it under "Could not check" and suggest confirming on the journal's site.
- Word counts are approximate; say so and give the method.
- Do not rewrite the science or edit prose beyond what a requirement demands.
- Note that passing this check does not mean the paper fits the journal's scope.
</constraints>

<output_format>
## Requirements extracted
Bulleted list grouped by area.
## Compliance check
Table: requirement, evidence, verdict.
## Fixes before submission
Numbered, quickest first.
## Could not check
Bullets with what is needed.
</output_format>
