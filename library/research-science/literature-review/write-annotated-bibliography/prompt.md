---
schema: 1
id: write-annotated-bibliography
kind: prompt
title: Write an annotated bibliography
description: Writes an annotated bibliography with a summary, evaluation and relevance note per source in the chosen citation style, flagging missing details instead of inventing them. For students.
category: literature-review
version: 1.0.0
status: incubating
stage: [discover, build]
role: [student, researcher]
requires: [none]
inputs: [document, text]
output: [article, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [annotated-bibliography, source-evaluation, apa, mla, citations]
pairs_with:
  prompts: [format-citations, summarize-paper, build-literature-matrix]
  rules: [source-citation-rules]
args:
  - name: sources
    description: The sources to annotate. For each, give the citation details and the text, abstract or your notes; annotations can only be as good as what you provide.
    type: text
    required: true
  - name: topic
    description: The research question or assignment topic the bibliography supports, used to judge each source's relevance.
    type: text
    required: true
  - name: style
    description: Citation style, for example APA, MLA, Chicago or Harvard, plus any assignment rules such as word count per annotation.
    type: string
    default: APA
output_contract:
  format: markdown
  sections: [Annotated bibliography, Missing details, Gaps in the set]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An annotated bibliography shows that the writer has read and judged each source, not just found it. Each annotation does three jobs: it summarises the source's argument, method and main findings; it evaluates the source's authority, evidence and limits; and it explains how the source serves the writer's question, including how it relates to the other sources. Weak annotations restate the abstract, praise every source and never say why it matters. Citation details must be accurate; an invented page range or DOI is worse than a visible gap.
</context>

<task>
Write an annotated bibliography in {{style}} style for this topic:
<topic>
{{topic}}
</topic>
<sources>
{{sources}}
</sources>

1. Format each citation in {{style}} from the details given. Wherever a required element is missing (authors, year, title, journal, volume, issue, pages, DOI or URL, publisher), insert a visible marker such as [missing: issue number] and list it under Missing details.
2. For each source, write an annotation of about 120–180 words (or the length the user's assignment sets) in three parts:
   - **Summary:** the question or argument, the type of source and method, and the main findings or claims, from the material given.
   - **Evaluation:** the author's expertise or the venue as far as the material shows, the strength and limits of the evidence, currency, and any bias or conflict of interest stated.
   - **Relevance:** how it answers or complicates the topic, what part of the user's paper it could support, and how it agrees or disagrees with other sources in this list.
3. Order entries alphabetically by first author unless the style or user asks otherwise.
4. After the list, note gaps in the set as a whole: perspectives, methods, time periods or kinds of evidence that are missing for this topic.
</task>

<constraints>
- Use only what the user provides about each source. If you only have a citation and no content, write the citation and say that an annotation needs the abstract or text; do not summarise from memory.
- Never invent DOIs, page numbers, issue numbers or URLs.
- Apply the citation style's rules for author names, capitalisation, italics and punctuation consistently. If the style edition matters (for example APA 7 versus APA 6), use the latest edition unless told otherwise and say which.
- Keep the evaluation fair: name real strengths as well as limits.
- Write in the third person and in the user's academic register, not in marketing language.
</constraints>

<output_format>
## Annotated bibliography
For each source: the formatted citation on its own line (apply the hanging indent when you paste it into your document), then the annotation as one paragraph or three short labelled paragraphs if the user asked for labels.
## Missing details
Table: source | missing element | where to find it.
## Gaps in the set
Two to five bullets.
</output_format>
