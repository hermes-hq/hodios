---
schema: 1
id: integrate-quotes-into-prose
kind: prompt
title: Integrate quotations into a draft
description: Integrates quotations into an essay, report or article with signal phrases, grammatical blending, accurate trimming and explanation, so each quote supports the writer's point.
category: editing
version: 1.0.0
status: incubating
stage: [build]
role: [student, writer, researcher]
requires: [none]
inputs: [text, document]
output: [rewrite, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [quotations, signal-phrases, quote-sandwich, citations, essays]
pairs_with:
  prompts: [paraphrase-with-attribution, check-draft-for-patchwriting, format-citations]
args:
  - name: draft
    description: The draft with its quotations as they stand, including any citations.
    type: text
    required: true
  - name: citation_style
    description: Citation style to keep consistent, for example MLA, APA, Chicago or Harvard, or "journalistic" for articles without formal citations.
    type: string
    default: MLA
  - name: sources
    description: The original passages the quotations come from, if you want the quotes checked against them. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Revised draft, What changed, Quotes to reconsider, Citation gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teachers and editors see the same quotation problems constantly: "dropped" quotes that stand as their own sentence with no introduction; quotes that are never explained, so the reader cannot tell why they are there; long quotes doing the work the writer should do; quotes that do not fit the grammar of the sentence around them; and neutral signal verbs ("says") where the source's stance matters, or loaded ones ("admits", "claims") that misrepresent it. The standard fix is the quote sandwich: introduce the source and its context, give the quote blended into the sentence, then explain what it shows for the writer's argument. Alterations follow strict rules: square brackets for any changed or added words, ellipses for omissions, and no change may alter the source's meaning. Long quotations become block quotes past a threshold set by the citation style (for example MLA uses more than four lines of prose, APA 40 words or more).

Citation style: {{citation_style}}
<draft>
{{draft}}
</draft>
{{#sources}}
<sources>
{{sources}}
</sources>
{{/sources}}
</context>

<task>
1. If the draft is missing, ask for it and stop.
2. Find every quotation and classify how it is integrated: dropped, introduced but unexplained, well integrated, too long for its job, or grammatically mismatched.
3. For each quotation that needs work, revise around it: add a signal phrase naming the source (and its authority where it helps the reader), choose a signal verb that matches the source's actual stance (argues, notes, warns, concedes, questions), blend the quote into the sentence's grammar, and add one or two sentences of the writer's own explanation linking it to the paragraph's point. Write explanations as brief, clearly marked suggestions the writer should rewrite in their own words, for example [YOUR POINT: what this shows about ...].
4. Trim quotes to the words that carry the point, using ellipses and brackets correctly, and check that no trim changes the meaning.
5. Convert long quotes to block format when the style requires it, or suggest shortening them.
6. If sources are given, check each quote word for word against them and flag any mismatch.
7. Keep citations in the given style and point out any quotation that has none.
</task>

<constraints>
- Never change the words inside quotation marks except through marked brackets and ellipses; never invent quotations, page numbers or sources.
- Do not write the writer's argument for them; explanations are short, marked suggestions.
- Keep the writer's own sentences unchanged except where needed to fit a quote in.
- If a quote seems to misrepresent its source in context, say so rather than smoothing it over.
</constraints>

<output_format>
## Revised draft
The draft with integrated quotations.
## What changed
Table: Quote (first words) | Problem | Fix applied.
## Quotes to reconsider
Bullets: quotes that would work better paraphrased or cut, and why. "None" if none.
## Citation gaps
Bullets: quotes missing a citation or page number, and mismatches with the sources. "None" if none.
</output_format>
