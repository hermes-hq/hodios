---
schema: 1
id: trace-concept-origins
kind: prompt
title: Trace the origins of a concept
description: Traces how a concept or theory developed across the papers you supply, ordering them into a lineage of origins, key shifts, rival definitions and current use, with each claim tied to a source.
category: literature-review
version: 1.0.0
status: incubating
stage: [discover, learn]
role: [researcher, student]
requires: [none]
inputs: [document, notes]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [conceptual-review, intellectual-history, theory-development, construct-definition, citation-history]
pairs_with:
  prompts: [chase-citations, write-literature-review-section, build-literature-matrix, summarize-paper]
  personas: [research-librarian]
args:
  - name: concept
    description: The concept, construct or theory, for example "psychological safety" or "the resource curse".
    type: string
    required: true
  - name: sources
    description: The papers or excerpts you have, each with a citation and year, and ideally the passage where the concept is defined or used.
    type: text
    required: true
  - name: purpose
    description: Optional. What the history is for, such as a thesis chapter's conceptual section or choosing a definition for a study.
    type: text
output_contract:
  format: markdown
  sections: [Timeline, Lineage, Definitions compared, Where it stands now, Gaps in the trail]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Concepts drift. The term a field uses today often started in another discipline with a narrower meaning, was popularised by a later paper that is cited as its origin, and now carries several competing definitions that studies measure differently. A good conceptual history separates who coined a term from who popularised it, notes when the meaning changed and why (a new measure, a new field adopting it, a critique), and shows which definition current studies actually operationalise. Common errors in concept histories are citing the popular paper as the origin, citing an origin nobody has read ("as first described by..."), assuming a term means the same across disciplines, and smoothing contested history into a neat line. These histories also go wrong when the writer fills gaps from memory and gets dates or attributions wrong, so this one works only from the supplied sources and marks where the trail needs checking.
</context>

<task>
Trace how "{{concept}}" developed using these sources:
<sources>
{{sources}}
</sources>
{{#purpose}}
Purpose: {{purpose}}
{{/purpose}}

1. Order the sources by year and, for each, record how it defines or uses the concept, quoting the defining sentence where one is given.
2. Identify roles: earliest use in the supplied sources, the source that popularised it (if the citations suggest it), sources that changed the meaning, critiques, and measurement or operationalisation papers.
3. Describe the lineage as a sequence of phases, each with what changed, why, and the sources that show it.
4. Compare definitions side by side: the core elements each includes, what each leaves out, and how each is measured.
5. Describe where the concept stands now in the supplied sources, including disputes and which definition seems dominant in empirical work.
6. Mark gaps in the trail: claims about origins that the sources cite but that are not among them, likely earlier uses to check, and other disciplines where the term may have a separate history.
7. If a purpose is given, recommend which definition to adopt and how to justify it.
</task>

<constraints>
- Work only from the supplied sources. Do not add papers, authors or dates from memory; list them as "to check" if they seem relevant.
- Quote definitions exactly and mark paraphrases as paraphrases.
- Separate "first in these sources" from "first ever"; never claim the first-ever use.
- Keep disputes visible rather than resolving them silently.
</constraints>

<output_format>
## Timeline
A table: year | source | role | definition or use (quote or paraphrase, marked).
## Lineage
Phases as short paragraphs, each citing sources.
## Definitions compared
A table: definition | core elements | excludes | measured by.
## Where it stands now
One or two paragraphs.
## Gaps in the trail
Bullets of items to check, then a recommended definition if a purpose was given.
</output_format>
