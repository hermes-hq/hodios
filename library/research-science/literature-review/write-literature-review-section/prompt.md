---
schema: 1
id: write-literature-review-section
kind: prompt
title: Write a literature review section
description: Synthesises sources into a thematic literature review section with in-text citations and a reference list, organised by idea rather than paper by paper. Use for theses, articles and proposals.
category: literature-review
version: 1.0.0
status: experimental
stage: [build]
role: [researcher, student]
requires: [none]
inputs: [document, notes]
output: [article]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [synthesis, citations, thesis]
pairs_with:
  prompts: [build-literature-matrix, find-research-gaps]
  workflows: [literature-review-track]
  rules: [source-citation-rules]
args:
  - name: sources
    description: The sources to synthesise, each with full citation details and its abstract, notes or matrix row.
    type: text
    required: true
  - name: research_question
    description: The question or argument the section has to set up.
    type: text
    required: true
  - name: citation_style
    description: Citation style for in-text citations and the reference list.
    type: enum
    enum: [apa, mla, chicago, harvard, ieee, vancouver]
    default: apa
  - name: word_limit
    description: Maximum length of the section in words, excluding references.
    type: number
    default: 1200
output_contract:
  format: markdown
  sections: [Synthesis map, References, Check before submitting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The most common weakness in literature reviews is the "annotated bibliography": one paragraph per paper, each starting with an author's name. Examiners and reviewers want synthesis: paragraphs organised around ideas, where each topic sentence makes a claim about the literature, several sources are brought together as evidence, agreements and disagreements are explained, and the section builds a path to the gap the research question fills.
</context>

<task>
Write a literature review section of at most {{word_limit}} words that sets up this research question:
<research_question>
{{research_question}}
</research_question>

Using only these sources:
<sources>
{{sources}}
</sources>

1. Read all sources and group them into three to five themes that matter for the research question (for example findings, mechanisms, methods, populations, debates). A source can serve several themes.
2. Order the themes so the argument narrows from what is established, to what is contested, to what is missing.
3. Write each paragraph as: a topic sentence that makes a claim about the literature, evidence from two or more sources where possible, an explanation of why studies agree or differ (design, sample, measures, context), and a sentence linking to the next theme.
4. Weigh the evidence: signal when support comes from strong designs, small samples or a single study.
5. End by stating the gap or tension that the research question addresses, grounded in the sources.
6. Cite in {{citation_style}} style and build the reference list from the details provided.
</task>

<constraints>
- Cite only the sources provided, and attribute each claim only to a source whose text supports it. Never add a source from memory.
- If a citation detail is missing (year, pages, DOI, journal), keep the gap visible as "[missing: year]" rather than guessing it.
- Do not start paragraphs with author names or "Study X found". Lead with the idea.
- Report the strength of findings faithfully; do not turn "associated with" into "causes" or one study into "research shows".
- Stay within the word limit, and write in formal academic prose in the third person unless the sources show the field uses something else.
- If the sources do not bear on the research question, or are too few to synthesise (fewer than about four), say so first and write the best section possible, marked as a draft.
</constraints>

<output_format>
The section itself, with a short heading and optional theme subheadings, then:
## Synthesis map
A table: theme | sources (in-text citations) | the claim the section makes about them.
## References
The reference list in {{citation_style}} style, with "[missing: …]" markers where details were not provided.
## Check before submitting
The word count, plus bullets listing every "[missing: …]" marker and any claim that rests on a single source.
</output_format>
